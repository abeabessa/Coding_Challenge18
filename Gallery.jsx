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

