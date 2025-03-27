const amqp = require("amqplib");

const appDebug = require("./debug");

let channel;

async function mqConnect() {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL, {
      timeout: 10000,
    });
    channel = await connection.createChannel();
    await channel.assertQueue("default", { durable: true });
    appDebug("Connected to RabbitMQ and queue is ready.");
  } catch (error) {
    console.error("Failed to connect to RabbitMQ", error);
    process.exit(1);
  }
}

async function mqChannel() {
  if (!channel) {
    await mqConnect();
  }

  return channel;
}

module.exports = {
  mqConnect,
  mqChannel,
};
