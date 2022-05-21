import { useRouter } from "next/router";
import EventContent from "../../components/event-detail/event-content";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventSummary from "../../components/event-detail/event-summary";
import ErrorAlert from "../../components/ui/error-alert";
import { getEventById } from "../../dummy-data";

export default function EventPage() {
  const router = useRouter();

  const eventId = router.query.eventId;
  const event = getEventById(eventId);

  if (!event) {
    return (
      <ErrorAlert>
        <p>No Event Found</p>
      </ErrorAlert>
    );
  }

  return (
    <div>
      <>
        <EventSummary title={event.title} />
        <EventLogistics
          date={event.date}
          address={event.location}
          image={event.image}
          imageAlt={event.title}
        />
        <EventContent>
          <p>{event.description}</p>
        </EventContent>
      </>
    </div>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    "https://nextjs-course-1cad3-default-rtdb.firebaseio.com/events.json"
  );

  const data = await response.json();

  const transformedEvents = [];

  for (const key in data) {
    transformedEvents.push({
      id: key,
      title: data[key].title,
      description: data[key].description,
      image: data[key].image,
      location: data[key].location,
      date: data[key].date,
      isFeatured: data[key].isFeatured,
    });
  }

  return {
    props: {
      events: transformedEvents,
    },
  };
}

export async function getStaticPaths() {
  const response = await fetch(
    "https://nextjs-course-1cad3-default-rtdb.firebaseio.com/events.json"
  );

  const data = await response.json();
  const ids = [];

  for (const key in data) {
    ids.push({
      id: key,
    });
  }

  const pathWithParams = ids.map((id) => ({ params: { eventId: String(id) } }));
  return {
    paths: pathWithParams,
    fallback: true,
  };
}
