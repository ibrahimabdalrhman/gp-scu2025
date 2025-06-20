import { IRoomProps } from "@/types";
import { Bed, Check, X } from "lucide-react";
import Image from "next/image";

export default function RoomCard({ room }: { room: IRoomProps }) {
  return (
    <div className="border rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="relative h-64 md:h-auto">
          <Image
            src={room.imageUrl}
            alt={room.name}
            fill
            loading="lazy"
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <p className="pop">★ {room.id} (Exceptional)</p>
        </div>

        {/* Details Section */}
        <div className="p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-4">{room.name}</h3>
            <div className="flex flex-wrap gap-4 text-gray-600 text-sm mb-6">
              <div className="flex items-center gap-2">
                <Bed className="h-4 w-4" />
                <span>guest</span>
              </div>
              <div className="flex items-center gap-2">
                <Bed className="h-4 w-4" />
                <span>25 meter</span>
              </div>
              <div className="flex items-center gap-2">
                <Bed className="h-4 w-4" />
                <span>2 beds</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Cancellation Policy</h4>
            <p
              className={`text-sm ${
                room.amenities.nonRefundable ? "text-red-600" : "text-green-600"
              }`}
            >
              {room.amenities.nonRefundable
                ? "Non-refundable"
                : "Free cancellation until 24 hours before check-in"}
            </p>
            {room.amenities.nonRefundable && (
              <p className="text-xs text-gray-500">
                Cancellation fee applies before 24h
              </p>
            )}
          </div>
        </div>

        <div className="p-6 bg-gray-50 flex flex-col justify-between">
          <div>
            <h4 className="font-semibold mb-4">Extras</h4>
            <div className="space-y-3 text-sm">
              {[
                { label: "Free WiFi", available: room.amenities.freeWifi },
                {
                  label: "Breakfast Included",
                  available: room.amenities.breakfastIncluded,
                  extra: "+ €10.00",
                },
                {
                  label: "Credit Card Required",
                  available: room.amenities.creditCardRequired,
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  {item.available ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <X className="h-4 w-4 text-red-600" />
                  )}
                  <span>{item.label}</span>
                  {item.available && item.extra && (
                    <span className="text-xs text-gray-500 ml-auto">
                      {item.extra}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="text-right mb-4">
              <span className="block text-sm text-gray-500">Price</span>
              <span className="text-2xl font-bold text-gray-900">
                ${room.price}
              </span>
            </div>
            <button className="py-2 px-4 bg-primary text-white rounded-md w-full">
              Reserve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
