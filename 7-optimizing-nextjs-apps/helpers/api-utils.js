export async function getAllEvents() {
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

  return transformedEvents;
}

export async function getFeaturedEvents() {
  const events = await getAllEvents();

  const featuredEvents = events.filter((event) => event.isFeatured === true);

  return featuredEvents;
}

export async function getEventById(eventId) {
  const events = await getAllEvents();

  const event = events.find((event) => event.id === eventId);

  return event;
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;
  const allEvents = await getAllEvents();

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}
