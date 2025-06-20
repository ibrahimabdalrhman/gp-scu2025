import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFiles, Query, UseGuards, Request } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { UploadFilesDecorator } from 'src/common/decorators/upload-file.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { FeatureEnum } from './dto/FeatureEnum';
import { StayType } from './dto/StayType';
import { RatingEnum } from './dto/RatingEnum';

@Controller('hotel')
export class HotelController {
  constructor(private readonly hotelService: HotelService) { }

  @Post()
  @UploadFilesDecorator('images', './uploads/hotels', 6)

  create(@Body() createHotelDto: CreateHotelDto,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ) {
    return this.hotelService.create(createHotelDto,images);
  }
  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
    @Query('city') city?: string,
    @Query('country') country?: string,
    @Query('search') search?: string,
    @Query('featured') featured?: string | string[],
    @Query('stayType') stayType?: string | string[],
    @Query('rating') rating?: string | string[],
  ) {
    return this.hotelService.findAll({
      page: +page,
      limit: +limit,
      minPrice: minPrice ? +minPrice : undefined,
      maxPrice: maxPrice ? +maxPrice : undefined,
      city,
      country,
      search,
      featured: featured
        ? Array.isArray(featured)
          ? featured.map(s => s as FeatureEnum)
          : [featured as FeatureEnum]
        : undefined,
      stayType: stayType
        ? Array.isArray(stayType)
          ? stayType.map(s => s as StayType)
          : [stayType as StayType]
        : undefined,
      rating: rating
        ? Array.isArray(rating)
          ? rating.map(r => +r as RatingEnum)
          : [+rating as RatingEnum]
        : undefined,
    });
  }
  
  
  

  @Get(':id')
  findOne(@Param('id') id: string ,@Request() req:any) {
    const user = req.user;
    return this.hotelService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHotelDto: UpdateHotelDto) {
    return this.hotelService.update(id, updateHotelDto);
  }
  

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hotelService.remove(id);
  }
}
