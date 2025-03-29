const Trip = require("../models/trip");
const { sendPromptToChatGPT } = require("../infrastructure/openai");
const {
  GenerateItineraryRecommendationsSchema,
} = require("../schemas/itinerary.schema");

const generateItineraryRecommendations = async (tripId) => {
  const trip = await Trip.findById(tripId);
  const prompt = `${trip.prompt} [flightOptionsData] = ${JSON.stringify(trip.flights)}`;
  const instructions = `
    You are a professional concierge and travel planner.
    Your task is to generate detailed travel itineraries based on a given [trip description].
    You will receive a [trip description] that includes details such as the number of adults and children, the destination, and the travel dates.
    You will receive [flightOptionsData] that includes a list of available [flight options].
    Each [flight option] contains:
      - [_id]: the flight option id;
      - [data]: details about the flight segments, including departure and arrival times, flight duration, price, and layover information;
    Based on [trip description], create three [itinerary options]:
      - a budget-friendly option focused on affordable experiences;
      - a luxury option featuring premium experiences;
      - a balanced option that combines elements of both;
    Each [itinerary option] is composed of:
      - one option from [flightOptionsData] that best fits the [itinerary option] in terms of price and convenience;
      - a daily list of [activities] such as local attractions, cultural experiences, meals, and transportation when necessary for the duration of the trip;
      - a captivating summary and title;
      - an estimated total cost;
    Each [activity] contains information such as name, description, cost estimate, duration, and location.
    Important notes:
      - Consider USD as default currency;
      - Use the [_id] property from [flightOptionsData] to reference the [flight option] in the [itinerary option];
      - Consider commuting time and distance between [activities], as well as arrival and departure times;
      - [Activities] should be suitable for the number of adults and children specified in the [trip description];
      - Provide the date, start time and end time for each [Activity] using ISO format and considering UTC timezone;
      - Consider free time for leisure and exploration;
  `;
  const { updateTrip } = require("./trip.service");
  sendPromptToChatGPT(
    prompt,
    instructions,
    GenerateItineraryRecommendationsSchema,
    "itineraries"
  ).then((data) => updateTrip(tripId, data));
};

module.exports = {
  generateItineraryRecommendations,
};
