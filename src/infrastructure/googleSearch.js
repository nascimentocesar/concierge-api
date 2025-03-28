const axios = require("axios").default;

async function searchFlights({
  adults,
  arrivalAirportCode,
  children,
  departureAirportCode,
  departureDate,
  returnDate,
}) {
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

  return axios
    .get("https://serpapi.com/search.json", { params })
    .then((response) => ({
      flights: [
        ...response.data.best_flights,
        ...response.data.other_flights,
      ].map((data) => ({ data })),
    }))
    .catch((error) => {
      console.error(
        "Error fetching Google Flights API response:",
        error.message
      );
      throw error;
    });
}

module.exports = {
  searchFlights,
};
