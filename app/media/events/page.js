import EventsList from "../../../components/EventsList"; 
import Image from 'next/image';

export default function Events() {
  return (
    <div className=" ">
      <div className="relative w-full h-auto">
      <img 
    src="/images/events.jpg" 
    alt="arrow"
    fill
          priority
          className="object-cover"
  />
  </div>
      <section className="mt-2">
          <EventsList/>
        </section>
        
         
    </div>
  );
}