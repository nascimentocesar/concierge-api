const { OpenAI } = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const sendPromptToChatGPT = async (prompt, instructions, format) => {
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
    response_format: format,
  });

  return completion.choices[0].message.parsed;
};

module.exports = {
  sendPromptToChatGPT,
};
