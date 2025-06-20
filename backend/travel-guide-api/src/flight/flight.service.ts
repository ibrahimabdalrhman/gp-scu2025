import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Flight, FlightDocument } from './entities/flight.entity';
import { Model, Types } from 'mongoose'; 

@Injectable()
export class FlightService {
  constructor(
    @InjectModel(Flight.name) private flightModel: Model<FlightDocument>,
  ) {}

  async create(createFlightDto: CreateFlightDto): Promise<Flight> {
    const flight = new this.flightModel(createFlightDto);
    return flight.save();
  }

  async findAll(query: {
    from?: string;
    to?: string;
    page?: number;
    limit?: number;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    flightType?: any[];
    classType?: string[];
    // New filter parameters
    airline?: string | string[]; // Support single airline ID or array of IDs
    minDuration?: string; // Format: "2h 30m" or "150" (minutes)
    maxDuration?: string;
    stops?: number | number[]; // Exact stops or array of allowed stops
    minStops?: number;
    maxStops?: number;
    departureTimeStart?: Date | string; // Start of departure time range
    departureTimeEnd?: Date | string; // End of departure time range
    arrivalTimeStart?: Date | string; // Start of arrival time range
    arrivalTimeEnd?: Date | string; // End of arrival time range
    departureDate?: Date | string; // Specific departure date (ignores time)
    arrivalDate?: Date | string; // Specific arrival date (ignores time)
  }): Promise<{ data: Flight[]; total: number; page: number; limit: number }> {
    const { 
      from, 
      to, 
      page = 1, 
      limit = 10, 
      search, 
      minPrice, 
      maxPrice, 
      flightType, 
      classType,
      // New parameters
      airline,
      minDuration,
      maxDuration,
      stops,
      minStops,
      maxStops,
      departureTimeStart,
      departureTimeEnd,
      arrivalTimeStart,
      arrivalTimeEnd,
      departureDate,
      arrivalDate
    } = query;
    
    const skip = (page - 1) * limit;
    const filter: any = {};
  
    // Location filters (existing)
    if (from) filter.departure_airport = { $regex: from, $options: 'i' };
    if (to) filter.arrival_airport = { $regex: to, $options: 'i' };
  
    // Search filter (existing)
    if (search) {
      const searchRegex = { $regex: search, $options: 'i' };
      filter.$or = [
        { departure_airport: searchRegex },
        { arrival_airport: searchRegex },
        { description: searchRegex },
        { terminal: searchRegex },
        { gate: searchRegex },
      ];
    }
  
    // Price filter (existing)
    if (minPrice !== undefined || maxPrice !== undefined) {
      filter['price_per_passenger.price'] = {};
      if (minPrice !== undefined) filter['price_per_passenger.price'].$gte = minPrice;
      if (maxPrice !== undefined) filter['price_per_passenger.price'].$lte = maxPrice;
    }
  
    // Flight type filter (existing)
    if (flightType && flightType.length > 0) {
      filter.flight_type = { $in: flightType };
    }
  
    // Class type filter (existing)
    if (classType && classType.length > 0) {
      filter['price_per_passenger.class_type'] = { $in: classType };
    }
  
    // NEW FILTERS
  
    // Airline filter
    if (airline) {
      if (Array.isArray(airline)) {
        filter.airline = { $in: airline.map(id => new Types.ObjectId(id)) };
      } else {
        filter.airline = new Types.ObjectId(airline);
      }
    }
  
    // Duration filter - using regex approach for simplicity and reliability
    if (minDuration || maxDuration) {
      // Helper function to convert duration string to minutes
      const durationToMinutes = (duration: string): number => {
        if (/^\d+$/.test(duration)) {
          // If it's just numbers, assume minutes
          return parseInt(duration);
        }
        
        // Parse formats like "2h 30m", "1h", "45m"
        const hourMatch = duration.match(/(\d+)h/);
        const minuteMatch = duration.match(/(\d+)m/);
        
        const hours = hourMatch ? parseInt(hourMatch[1]) : 0;
        const minutes = minuteMatch ? parseInt(minuteMatch[1]) : 0;
        
        return hours * 60 + minutes;
      };
  
      // Create regex patterns for duration filtering
      const durationPatterns: string[] = [];
      
      if (minDuration && maxDuration) {
        const minMinutes = durationToMinutes(minDuration);
        const maxMinutes = durationToMinutes(maxDuration);
        
        // Generate patterns for all valid durations in range
        // This is a simplified approach - for production, consider adding duration_minutes field
        for (let minutes = minMinutes; minutes <= maxMinutes; minutes += 15) { // 15-minute intervals
          const hours = Math.floor(minutes / 60);
          const mins = minutes % 60;
          
          if (hours > 0 && mins > 0) {
            durationPatterns.push(`${hours}h ${mins}m`);
            durationPatterns.push(`${hours}h${mins}m`); // Without space
          } else if (hours > 0) {
            durationPatterns.push(`${hours}h`);
          } else if (mins > 0) {
            durationPatterns.push(`${mins}m`);
          }
        }
        
        if (durationPatterns.length > 0) {
          filter.duration = { $in: durationPatterns };
        }
      } else {
        // For single min/max, use a more flexible regex approach
        const regexPatterns: any[] = [];
        
        if (minDuration) {
          const minMinutes = durationToMinutes(minDuration);
          const minHours = Math.floor(minMinutes / 60);
          
          // Simple regex for durations >= minHours
          if (minHours > 0) {
            regexPatterns.push({ duration: { $regex: `^([${minHours}-9]\\d*h|\\d{${minHours.toString().length + 1},}h)` } });
          }
        }
        
        if (maxDuration) {
          const maxMinutes = durationToMinutes(maxDuration);
          const maxHours = Math.floor(maxMinutes / 60);
          
          // Simple regex for durations <= maxHours  
          if (maxHours > 0) {
            regexPatterns.push({ duration: { $regex: `^([0-${maxHours}]h|\\d{1,${maxHours.toString().length}}h)` } });
          }
        }
        
        if (regexPatterns.length > 0) {
          filter.$and = filter.$and || [];
          filter.$and.push(...regexPatterns);
        }
      }
    }
  
    // Stops filter
    if (stops !== undefined) {
      if (Array.isArray(stops)) {
        filter.stops = { $in: stops };
      } else {
        filter.stops = stops;
      }
    } else {
      // Range-based stops filter
      if (minStops !== undefined || maxStops !== undefined) {
        filter.stops = {};
        if (minStops !== undefined) filter.stops.$gte = minStops;
        if (maxStops !== undefined) filter.stops.$lte = maxStops;
      }
    }
  
    // Departure time filters
    if (departureTimeStart || departureTimeEnd || departureDate) {
      filter.departure_time = {};
      
      if (departureDate) {
        // Filter by specific date (ignore time)
        const date = new Date(departureDate);
        const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
        
        filter.departure_time.$gte = startOfDay;
        filter.departure_time.$lte = endOfDay;
      } else {
        // Filter by time range
        if (departureTimeStart) {
          filter.departure_time.$gte = new Date(departureTimeStart);
        }
        if (departureTimeEnd) {
          filter.departure_time.$lte = new Date(departureTimeEnd);
        }
      }
    }
  
    // Arrival time filters
    if (arrivalTimeStart || arrivalTimeEnd || arrivalDate) {
      filter.arrival_time = {};
      
      if (arrivalDate) {
        // Filter by specific date (ignore time)
        const date = new Date(arrivalDate);
        const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
        
        filter.arrival_time.$gte = startOfDay;
        filter.arrival_time.$lte = endOfDay;
      } else {
        // Filter by time range
        if (arrivalTimeStart) {
          filter.arrival_time.$gte = new Date(arrivalTimeStart);
        }
        if (arrivalTimeEnd) {
          filter.arrival_time.$lte = new Date(arrivalTimeEnd);
        }
      }
    }
  
    const [data, total] = await Promise.all([
      this.flightModel
        .find(filter)
        .populate('airline')
        .skip(skip)
        .limit(limit)
        .sort({ departure_time: 1 }) // Default sort by departure time
        .exec(),
      this.flightModel.countDocuments(filter).exec(),
    ]);
  
    return {
      data,
      total,
      page: Number(page),
      limit: Number(limit),
    };
  }

  async findOne(id: string): Promise<Flight> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Flight with id ${id} not found`);
    }
    const flight = await this.flightModel.findById(id).exec();
    if (!flight) {
      throw new NotFoundException(`Flight with id ${id} not found`);
    }
    return flight;
  }

  async update(id: string, updateFlightDto: UpdateFlightDto): Promise<Flight> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Flight with id ${id} not found`);
    }
    const updatedFlight = await this.flightModel
      .findByIdAndUpdate(id, updateFlightDto, { new: true })
      .exec();
    if (!updatedFlight) {
      throw new NotFoundException(`Flight with id ${id} not found`);
    }
    return updatedFlight;
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Flight with id ${id} not found`);
    }
    const result = await this.flightModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Flight with id ${id} not found`);
    }
    return { deleted: true };
  }
}
