import { useRouter } from "next/router";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/event-search";

export default function EventsPage(props) {
  const { events } = props;
  const router = useRouter();

  if (!events) {
    return <p>Loading</p>;
  }

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }
  return (
    <>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
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
