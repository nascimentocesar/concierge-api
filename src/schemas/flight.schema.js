const { z } = require("zod");

const CreateFlightSchema = z.object({
  price: z.number(),
  segments: z.array(
    z.object({
      airline: z.string(),
      airlineLogo: z.string(),
      arrivalAirportCode: z.string(),
      arrivalAirportName: z.string(),
      arrivalDate: z.string(),
      departureAirportCode: z.string(),
      departureAirportName: z.string(),
      departureDate: z.string(),
      duration: z.number(),
      flightNumber: z.string(),
    })
  ),
  totalDuration: z.number(),
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
