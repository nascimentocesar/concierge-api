const { OpenAI } = require("openai");
const { zodResponseFormat } = require("openai/helpers/zod");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const sendPromptToChatGPT = async (prompt, instructions, schema, key) => {
  try {
    const completion = await client.beta.chat.completions.parse({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: instructions,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: zodResponseFormat(schema, key),
    });

    return completion.choices[0].message.parsed;
  } catch (error) {
    console.error("Error fetching OpenAI response:", error.message);
    throw error;
  }
};

module.exports = {
  sendPromptToChatGPT,
};
