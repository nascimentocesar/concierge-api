const { sendPromptToChatGPT } = require("../infrastructure/openai");
const {
  SearchFlightsSchema,
  GenerateFlightRecommendationsSchema,
} = require("../schemas/flight.schema");
const { searchFlights } = require("../infrastructure/googleSearch");
const Trip = require("../models/trip");

const generateFlightRecommendations = async (tripId) => {
  const trip = await Trip.findById(tripId);
  const instructions = `
    You are a professional flight booking assistant.
    Your task is to generate [flight search queries] based on a given [trip description].
    You will receive a [trip description] that includes details such as the number of adults and children, the destination, and the travel dates.
    Important notes:
      - Always provide the [airport codes] for the departure and arrival airports based on the locations mentioned in the [trip description];
      - **Always use valid IATA airport codes** (the three-letter codes that represent airports);
      - Never generate or use made-up codes or abbreviations (e.g., "RIO", "SAO", "NYC" for multiple airports, etc.);
      - If the city has more than one airport, choose the **correct primary or international airport** and make sure you use the **official IATA airport code** (e.g., "GRU" for São Paulo, "JFK" for New York, etc.);
      - If unsure about the code, you should select the **most common or well-known airport code** for that city;
      - If the user does not specify the number of adults and children, assume **1 adult** and **0 children**;
      - Always provide the [dates] for [flight search queries] using **YYYY-MM-DD** format;
      - Always provide **departure and return dates**. If not specified, assume a **7-day stay starting one week from [current date]**;
      - [current date] is ${new Date().toISOString()};
  `;
  const { updateTrip } = require("./trip.service");
  sendPromptToChatGPT(trip.prompt, instructions, SearchFlightsSchema, "query")
    .then((response) => searchFlights(response.query))
    .then((data) =>
      GenerateFlightRecommendationsSchema.parse(parseFlightsData(data))
    )
    .then((data) => updateTrip(tripId, data));
};

const parseFlightsData = (flightsData) => {
  return {
    flights: flightsData.map((flightData) => ({
      price: flightData.data.price,
      segments: flightData.data.flights.map((segment) => ({
        airline: segment.airline,
        airlineLogo: segment.airline_logo,
        arrivalAirportCode: segment.arrival_airport.id,
        arrivalAirportName: segment.arrival_airport.name,
        arrivalDate: segment.arrival_airport.time,
        departureAirportCode: segment.departure_airport.id,
        departureAirportName: segment.departure_airport.name,
        departureDate: segment.departure_airport.time,
        duration: segment.duration,
        flightNumber: segment.flight_number,
      })),
      totalDuration: flightData.data.total_duration,
    })),
  };
};

module.exports = {
  generateFlightRecommendations,
};
