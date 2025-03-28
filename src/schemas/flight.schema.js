const { z } = require("zod");

const CreateFlightSchema = z.object({
  data: z.record(z.string(), z.any()),
});

const GenerateFlightRecommendationsSchema = z.object({
  flights: z.array(CreateFlightSchema),
});

const SearchFlightsSchema = z.object({
  query: z.object({
    adults: z.number(),
    arrivalAirportCode: z.string(),
    children: z.number(),
    departureAirportCode: z.string(),
    departureDate: z.string(),
    returnDate: z.string(),
  }),
});

module.exports = {
  CreateFlightSchema,
  GenerateFlightRecommendationsSchema,
  SearchFlightsSchema,
};
