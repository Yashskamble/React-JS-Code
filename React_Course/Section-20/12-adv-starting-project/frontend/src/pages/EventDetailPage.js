import { useParams } from "react-router-dom";

function EventDetailPage() {
    const params = useParams()
    return (
      <div>EventDetailPage {params.eventId}</div>
    );
  }
  
  export default EventDetailPage;