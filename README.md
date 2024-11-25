# Coding_Challenge18
app.jsx
import React from "react";
import Gallery from "./Gallery";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Tour Comparison App</h1>
      </header>
      <Gallery />
    </div>
  );
}


export default App;

Gallery.jsx

import React, { useState, useEffect } from "react";

const Gallery = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch("https://course-api.com/react-tours-project");
        if (!response.ok) throw new Error("Failed to fetch tours");
        const data = await response.json();
        const updatedData = data.map((tour) => ({ ...tour, readMore: false }));
        setTours(updatedData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(true);
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  const removeTour = (id) => {
    setTours(tours.filter((tour) => tour.id !== id));
  };

  const toggleReadMore = (id) => {
    setTours((prevTours) =>
      prevTours.map((tour) =>
        tour.id === id ? { ...tour, readMore: !tour.readMore } : tour
      )
    );
  };

  if (loading) return <p>Loading tours...</p>;
  if (error) return <p>Error fetching tours.</p>;

  return (
    <div className="gallery">
      {tours.map((tour) => (
        <div key={tour.id} className="tour-card">
          <img src={tour.image} alt={tour.name} className="tour-image" />
          <h2>{tour.name}</h2>
          <p>${tour.price}</p>
          <p>
            {tour.readMore ? tour.info : `${tour.info.substring(0, 100)}...`}
            <button onClick={() => toggleReadMore(tour.id)}>
              {tour.readMore ? "Show Less" : "Read More"}
            </button>
          </p>
          <button className="not-interested" onClick={() => removeTour(tour.id)}>
            Not Interested
          </button>
        </div>
      ))}
    </div>
  );
};

export default Gallery;

App.css

body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

.App-header {
  text-align: center;
  padding: 1rem;
  background-color: #4caf50;
  color: white;
}

.gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1rem;
}

.tour-card {
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: 1rem;
  padding: 1rem;
  max-width: 300px;
  text-align: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}

.tour-card:hover {
  transform: scale(1.05);
}

.tour-image {
  width: 100%;
  border-radius: 5px;
}

.not-interested {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 1rem;
}

.not-interested:hover {
  background-color: #d32f2f;
}