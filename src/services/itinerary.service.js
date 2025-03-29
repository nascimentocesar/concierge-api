const Trip = require("../models/trip");
const { sendPromptToChatGPT } = require("../infrastructure/openai");
const {
  GenerateItineraryRecommendationsSchema,
} = require("../schemas/itinerary.schema");

const generateItineraryRecommendations = async (tripId) => {
  const trip = await Trip.findById(tripId);
  const instructions = `
    You are a professional concierge and travel planner.
    Your task is to generate detailed travel itineraries based on a given [trip description].
    You will receive a [trip description] that includes details such as the number of adults and children, the destination, and the travel dates.
    Based on [trip description], create three [itinerary options]:
      - a budget-friendly option focused on affordable experiences;
      - a luxury option featuring premium experiences;
      - a balanced option that combines elements of both;
    Each [itinerary option] is composed of:
      - a daily list of [activities] such as local attractions, cultural experiences, meals, and transportation when necessary for the duration of the trip;
      - a captivating one paragraph long summary of the [itinerary option];
      - a title for the [itinerary option];
      - an estimated total cost;
    Each [activity] contains information such as name, description, cost estimate, duration, and location.
    Important notes:
      - Always provide 3 [itinerary options], no more, no less;
      - Consider USD as default currency;
      - Consider commuting time and distance between [activities], as well as arrival and departure times;
      - [Activities] should be suitable for the number of adults and children specified in the [trip description];
      - Provide the date, start time and end time for each [Activity] using ISO format and considering UTC timezone;
      - Consider free time for leisure and exploration;
  `;
  const { updateTrip } = require("./trip.service");
  sendPromptToChatGPT(
    trip.prompt,
    instructions,
    GenerateItineraryRecommendationsSchema,
    "itineraries"
  ).then((data) => updateTrip(tripId, data));
};

module.exports = {
  generateItineraryRecommendations,
};
