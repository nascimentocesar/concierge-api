const {
  GenerateFlightOptionsSchema,
} = require("../schemas/flightOption.schema");

const axios = require("axios").default;

async function fetchFlightOptions({
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
    departure_id: departureAirportCode,
    engine: "google_flights",
    outbound_date: departureDate,
    return_date: returnDate,
    type: 1,
  };

  return axios
    .get("https://serpapi.com/search.json", { params })
    .then((response) => {
      const flightOptions = response.data.best_flights.map((flightOption) => ({
        data: flightOption,
      }));
      return GenerateFlightOptionsSchema.parse({ flightOptions });
    })
    .catch((error) => {
      console.error("Error fetching flights data:", error.message);
      throw error;
    });
}

module.exports = {
  fetchFlightOptions,
};
