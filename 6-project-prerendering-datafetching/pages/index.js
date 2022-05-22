import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-utils";

export default function HomePage(props) {
  const { events } = props;
  const featuredEvents = events.filter((event) => event.isFeatured === true);

  if (!events) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}
