const amqp = require("amqplib");
const { appDebug } = require("./debug");

let channel;

const mqEvents = {
  tripPromptItinerary: "trip.promptItinerary",
};

async function mqConnect() {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();
    await channel.assertQueue("default", { durable: true });
    appDebug("Connected to RabbitMQ");
  } catch (error) {
    console.error("Error connecting to RabbitMQ:", error);
    process.exit(1);
  }
}

async function mqChannel() {
  if (!channel) {
    await mqConnect();
  }

  return channel;
}

async function mqSend(eventType, messageData) {
  try {
    const channel = await mqChannel();
    channel.sendToQueue("default", Buffer.from(JSON.stringify(messageData)), {
      headers: {
        eventType,
      },
      persistent: true,
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  mqConnect,
  mqChannel,
  mqEvents,
  mqSend,
};
