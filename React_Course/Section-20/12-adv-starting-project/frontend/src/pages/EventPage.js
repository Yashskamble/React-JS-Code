// import { Link } from "react-router-dom";

// function EventPage() {

//     const DUMMTEVENTS = [
//       {
//         id:'e1',
//         title: "Event 1"
//       },
//       {
//         id:'e2',
//         title: "Event 2"
//       }
//     ]
//     return (
//       <>
//         EventPage
//         <ul>{DUMMTEVENTS.map((event) => 
//         <li><Link key= {event.id} to={event.id}>{event.title}</Link></li>)}</ul>
//       </>
//     );
//   }
  
//   export default EventPage;




import { useLoaderData } from 'react-router-dom';
import EventsList from '../components/EventsList';

function EventsPage() {
  const fetchedEvents = useLoaderData();
  return (
    <>            
     <EventsList events={fetchedEvents} />
    </>
  );
}

export default EventsPage;