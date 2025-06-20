"use client";
import {
  Wifi,
  Bed,
  Calendar,
  Clock,
  MapPin,
  Bath,
  Check,
  Kanban,
} from "lucide-react";

interface Props {
  desc: string;
  features: string[];
  totalRooms: number;
  availableRooms: number;
  reservedRooms: number;
  availableStatus: boolean;
  price: number;
}

const featureIcons: Record<string, JSX.Element> = {
  FREE_WIFI: <Wifi className="h-5 w-5 text-primary" />,
  BED: <Bed className="h-5 w-5 text-primary" />,
  BATH: <Bath className="h-5 w-5 text-primary" />,
  CALENDAR: <Calendar className="h-5 w-5 text-primary" />,
  CLOCK: <Clock className="h-5 w-5 text-primary" />,
  LOCATION: <MapPin className="h-5 w-5 text-primary" />,
  KANBAN: <Kanban className="h-5 w-5 text-primary" />,
};

const readableFeatures: Record<string, string> = {
  FREE_WIFI: "Free Wi-Fi",
  BED: "Comfortable Beds",
  BATH: "Private Bathroom",
  CALENDAR: "Flexible Booking",
  CLOCK: "24h Check-in",
  LOCATION: "Central Location",
  KANBAN: "Room Service",
};

const HotelDescription = ({
  desc,
  features,
  totalRooms,
  availableRooms,
  reservedRooms,
  availableStatus,
  price,
}: Props) => {
  return (
    <div className="container md:py-16 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Description */}
        <div className="md:col-span-2">
          <h3 className="heading-three mb-6">About property</h3>
          <p className="text-darkText leading-relaxed">{desc}</p>
        </div>

        {/* Sidebar */}
        <div className="bg-gray-50 rounded-xl p-6 shadow-sm space-y-6">
          <div>
            <h3 className="heading-three mb-4">Facilities</h3>
            <div className="space-y-3">
              {features?.map((feature, index) => (
                <div className="flex items-center gap-3" key={index}>
                  <div className="bg-blue-100 p-2 rounded-full">
                    {featureIcons[feature] || <Check className="h-5 w-5 text-primary" />}
                  </div>
                  <span className="text-sm text-gray-800">
                    {readableFeatures[feature] || feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-4 space-y-2 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Total rooms:</span>
              <span>{totalRooms}</span>
            </div>
            <div className="flex justify-between">
              <span>Available rooms:</span>
              <span>{availableRooms}</span>
            </div>
            <div className="flex justify-between">
              <span>Reserved rooms:</span>
              <span>{reservedRooms}</span>
            </div>
            <div className="flex justify-between">
              <span>Status:</span>
              <span className={availableStatus ? "text-secondary" : "text-red-500"}>
                {availableStatus ? "Available" : "Unavailable"}
              </span>
            </div>
            <div className="flex justify-between font-semibold pt-2">
              <span>Price:</span>
              <span>${price}/night</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDescription;
