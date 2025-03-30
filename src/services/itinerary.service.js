const Trip = require("../models/trip");
const { sendPromptToChatGPT } = require("../infrastructure/openai");
const {
  GenerateItineraryRecommendationsSchema,
} = require("../schemas/itinerary.schema");

const generateItineraryRecommendations = async (tripId) => {
  const trip = await Trip.findById(tripId);
  const instructions = `
    You are a professional concierge and travel planner. Your task is to generate detailed travel itineraries based on a given [trip description]. The [trip description] includes details such as the number of adults and children, the destination, travel dates, and any other relevant information.

    Your output must be structured as a JSON object with exactly three itinerary options:
    1. **Budget-friendly option:** Focus on affordable experiences.
    2. **Luxury option:** Focus on premium experiences.
    3. **Balanced option:** Combine elements of both.

    Each itinerary option should include the following keys:
    - **title:** A short, captivating title for the itinerary.
    - **summary:** A one-paragraph summary highlighting the key aspects of the itinerary.
    - **estimate_cost:** An estimated total cost in USD.
    - **activities:** An array of activity objects scheduled for that day.

    Each activity object must contain:
    - **name:** The name of the activity.
    - **description:** A detailed description of the activity.
    - **cost:** A cost estimate in USD.
    - **duration:** The duration of the activity.
    - **location:** The location where the activity takes place.
    - **start_time:** The start time in ISO format (UTC).
    - **end_time:** The end time in ISO format (UTC).

    Important considerations:
    - Always provide exactly 3 itinerary options.
    - Always suggest multiple activities for each day.
    - Ensure to cover all days of the trip.
    - Ensure that the activities are suitable for the specified number of adults and children.
    - Account for commuting time and distance between activities as well as arrival and departure times.
    - Include free time for leisure and exploration.
    - Assume USD as the default currency.
    - All dates and times should be provided in ISO format and in UTC.
  `;
  const { updateTrip } = require("./trip.service");
  const data = await sendPromptToChatGPT(
    trip.prompt,
    instructions,
    GenerateItineraryRecommendationsSchema,
    "itineraries"
  );
  updateTrip(tripId, data);
};

module.exports = {
  generateItineraryRecommendations,
};
