import { useState } from "react";
import Places from "./Places.jsx";
import { useEffect } from "react";
import ErrorPage from "./ErrorPage.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "./http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvaialablePlaces] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const getAPIPlaces = async () => {
      setisLoading(true);
      try {
        const places = await fetchAvailablePlaces()

        navigator.geolocation.getCurrentPosition((position) => {
          const placesByDist = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );

          setAvaialablePlaces(placesByDist);
          setisLoading(false);
        });
      } catch (err) {
        setError({
          message: err.message || "Default Error",
        });
        setisLoading(false);
      }
    };

    getAPIPlaces();
  }, []);

  if (error) {
    return (
      <ErrorPage
        title="Error Occured"
        message={error.message}
        onConfirm={() => {}}
      />
    );
  }
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isLoading}
      loadingText="Fetching the available places...."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
