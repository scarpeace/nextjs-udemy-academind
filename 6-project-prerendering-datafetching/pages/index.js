import EventList from "../components/events/event-list";

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
