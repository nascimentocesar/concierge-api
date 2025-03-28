const Trip = require("../models/trip");
const { sendPromptToChatGPT } = require("../infrastructure/openai");
const { GenerateItinerariesSchema } = require("../schemas/itinerary.schema");
const { appDebug } = require("../infrastructure/debug");

const generateItineraries = async (prompt, flightOptions) => {
  const instructions = `
    You are a professional concierge and travel planner.
    Your task is to generate detailed travel itineraries based on a given [trip description].
    You will receive a [trip description] that includes details such as the number of adults and children, the destination, and the travel dates.
    You will also receive [flightOptionsData] inside the [trip description] that is a list of [flight options].
    Each [flight option] contains:
      - [_id]: the flight option id;
      - [data]: details about the flight segments, including departure and arrival times, flight duration, and layover information.;
    Based on [trip description], create three [itinerary options]:
      - a budget-friendly option focused on affordable experiences;
      - a luxury option featuring premium experiences;
      - a balanced option that combines elements of both;
    Each [itinerary option] is composed of:
      - a [flight id] based on the [flightOptionsData] provided that best matches each [itinerary option] in terms of price and convenience;
      - a daily list of [activities] such as local attractions, cultural experiences, meals, and transportation when necessary for the duration of the trip;
      - a captivating summary;
      - an estimated total cost;
    Each [activity] contains information such as name, description, cost estimate, duration, and location.
    Important notes:
      - Use the [_id] property from [flightOptionsData] to reference the [flight option] in the [itinerary option].
      - Consider commuting time and distance between [activities], as well as arrival and departure times.
      - [Activities] should be suitable for the number of adults and children specified in the [trip description].
      - Provide the date, start time and end time for each [Activity] using ISO format and considering UTC timezone.
      - Each [flight option] should be selected based on the best price and convenience for each [itinerary option].
      - Consider free time for leisure and exploration.
  `;
  const promptWithFlights = `${prompt} [flightOptionsData] = ${JSON.stringify(flightOptions)}`;

  appDebug(promptWithFlights);
  return await sendPromptToChatGPT(
    promptWithFlights,
    instructions,
    GenerateItinerariesSchema,
    "itineraries"
  );
};

module.exports = {
  generateItineraries,
};
