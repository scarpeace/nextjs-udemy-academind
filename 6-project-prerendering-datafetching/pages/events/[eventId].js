import EventContent from "../../components/event-detail/event-content";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventSummary from "../../components/event-detail/event-summary";
import ErrorAlert from "../../components/ui/error-alert";
import {
  getEventById,
  getAllEvents,
  getFeaturedEvents,
} from "../../helpers/api-utils";

export default function EventPage(props) {
  const { event } = props;

  if (!event) {
    return (
      <div className="center">
        <p>Loading</p>
      </div>
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

export async function getStaticProps(context) {
  const { eventId } = context.params;

  const event = await getEventById(eventId);
  return {
    props: {
      event: event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  const ids = [];

  const pathWithParams = events.map((event) => ({
    params: { eventId: event.id },
  }));

  return {
    paths: pathWithParams,
    fallback: true,
  };
}
