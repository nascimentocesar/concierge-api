const { z } = require("zod");

const CreateFlightOptionSchema = z.object({
  data: z.record(z.string(), z.any()),
});

const GenerateFlightOptionsSchema = z.object({
  flightOptions: z.array(CreateFlightOptionSchema),
});

const SearchFlightOptionsSchema = z.object({
  query: z.object({
    adults: z.number(),
    arrivalAirportCode: z.string(),
    children: z.number(),
    departureAirportCode: z.string(),
    departureDate: z.string(),
    returnDate: z.string().optional(),
  }),
});

module.exports = {
  CreateFlightOptionSchema,
  GenerateFlightOptionsSchema,
  SearchFlightOptionsSchema,
};
