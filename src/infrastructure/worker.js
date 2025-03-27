const { mqChannel } = require("./rabbitmq");
const appDebug = require("./debug");

const startWorker = async () => {
  const channel = await mqChannel();

  channel.consume(
    "default",
    (msg) => {
      channel.ack(msg);
    },
    { exclusive: true }
  );

  appDebug(`Worker listening on default queue`);
};

startWorker().catch((error) => {
  console.error("Error starting worker", error);
  process.exit(1);
});
