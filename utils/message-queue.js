const amqp = require("amqplib");
const dotenv = require("dotenv");

dotenv.config();

const QUEUE_URL = process.env.QUEUE_URL;
const queueName = "messages";

console.log("Connecting to:", QUEUE_URL);

async function sendToQueue() {
  try {
    const connection = await amqp.connect(QUEUE_URL);
    const channel = await connection.createChannel();

    await channel.assertQueue(queueName, { durable: false });

    const payload = { name: "nishith" };

    const status = channel.sendToQueue(
      queueName,
      Buffer.from(JSON.stringify(payload)),
    );

    console.log("Message sent:", status);

    setTimeout(async () => {
      await channel.close();
      await connection.close();
      console.log("Connection closed");
    }, 500);
  } catch (error) {
    console.error("RabbitMQ error ❌", error);
  }
}

sendToQueue();
