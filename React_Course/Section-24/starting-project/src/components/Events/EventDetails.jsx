import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';

import Header from '../Header.jsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { client, deleteEvent, fetchEvent } from '../utils/http.js';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EventDetails() {
  const params  = useParams();
  const navigate = useNavigate();
  const {data , isPending, isError, error} = useQuery({
    queryKey: ['events', params.id],
    queryFn: ({signal}) => fetchEvent({signal, id: params.id})
  })

  const {mutate} = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['events'],
        refetchType: 'none'
      })
      navigate('/events')
    }
  })

  const handleDelete = () => {
    mutate({id: params.id})
  }

  let content = <></>;

  if (isPending) {
    content = <div id="event-details-content"><LoadingIndicator /></div>;
  }

  if (isError) {
    content = (
      <div id="event-details-content"><ErrorBlock title="An error occurred" message={error.info?.message || "Failed to fetch Events."} /></div>
      
    );
  }

  if (data) {
    content = <div id="event-details-content">
    <img src={`http://localhost:3000/${data?.image}`} alt="" />
    <div id="event-details-info">
      <div>
        <p id="event-details-location">{data?.location}</p>
        <time dateTime={`Todo-DateT$Todo-Time`}>{data?.date} @ {data?.time}</time>
      </div>
      <p id="event-details-description">{data?.description}</p>
    </div>
  </div>
  }
  return (
    <>
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">
        <header>
          <h1>{data?.title}</h1>
          <nav>
            <button onClick={handleDelete}>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        {content}
      </article>
    </>
  );
}
