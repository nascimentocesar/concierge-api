const axios = require("axios").default;

const searchFlights = async ({
  adults,
  arrivalAirportCode,
  children,
  departureAirportCode,
  departureDate,
  returnDate,
}) => {
  const params = {
    adults,
    api_key: process.env.SERPAPI_API_KEY,
    arrival_id: arrivalAirportCode,
    children,
    currency: "USD",
    departure_id: departureAirportCode,
    engine: "google_flights",
    outbound_date: departureDate,
    return_date: returnDate,
    type: 1,
  };

  const departureFlight = await getBestFlight(params);
  const returnFlight = await getBestFlight({
    ...params,
    departure_token: departureFlight.departure_token,
  });

  return [departureFlight, returnFlight];
};

const getBestFlight = async (params) => {
  const flightsData = await sendRequest(params);
  const flights = [
    ...flightsData.data.best_flights,
    ...flightsData.data.other_flights,
  ];

  if (!flights.length) {
    throw new Error("No flights returned");
  }

  return flights[0];
};

const sendRequest = async (params) => {
  return axios
    .get("https://serpapi.com/search.json", { params })
    .catch((error) => {
      console.error("Error fetching Google API response:", error.message);
      throw error;
    });
};

module.exports = {
  searchFlights,
};
