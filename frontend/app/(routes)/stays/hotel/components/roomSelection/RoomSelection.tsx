
import RoomCard from './RoomCard';
import { roomData } from '@/data';

const RoomSelection = () => {
  return (
    <section className="container md:py-16 py-6">
      <h3 className=" heading-three mb-6">Choose your Room</h3>
      
      <div className="space-y-6">
        {roomData.map(room => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </section>
  );
};

export default RoomSelection;