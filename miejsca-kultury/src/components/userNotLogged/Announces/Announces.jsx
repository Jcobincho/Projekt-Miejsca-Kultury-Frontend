import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import EventCard from "./AnnounceCart";

const App = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("today");
  const [isLoading, setIsLoading] = useState(false);

  const filterToState = {
    past: 1,
    today: 2,
    future: 3,
  };

  const fetchEvents = async (state) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/announcement/${state}`
      );
      const data = await response.json();
      console.log(data); 
      setEvents(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchEvents(filterToState[filter]);
  }, [filter]);

  useEffect(() => {
    fetchEvents(2); 
  }, []);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-center my-4">
        <button
          className={`btn mx-2 ${
            filter === "past" ? "btn-primary" : "btn-secondary"
          }`}
          onClick={() => handleFilterChange("past")}
        >
          Stare wydarzenia
        </button>
        <button
          className={`btn mx-2 ${
            filter === "today" ? "btn-primary" : "btn-secondary"
          }`}
          onClick={() => handleFilterChange("today")}
        >
          Dzisiejsze wydarzenia
        </button>
        <button
          className={`btn mx-2 ${
            filter === "future" ? "btn-primary" : "btn-secondary"
          }`}
          onClick={() => handleFilterChange("future")}
        >
          Planowane wydarzenia
        </button>
      </div>
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div>
          {events.map((event) => (
            <EventCard
              key={event.id}
              localization={event.localization}
              date={event.date}
              dataDescription={event.dataDescription}
              description={event.description}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
