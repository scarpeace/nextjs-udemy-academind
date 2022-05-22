import { useRouter } from "next/router";
import Head from "next/head";

import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/event-search";

import { getAllEvents } from "../../helpers/api-utils";

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
      <Head>
        <title>NextJS Featured Events</title>
        <meta
          name="description"
          content="Find events and filter them by date to attend them all"
        />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events: events,
    },
  };
}
