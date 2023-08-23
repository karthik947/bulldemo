// SIMPLE QUEUE
import Bull from "bull";
import dotenv from "dotenv";

dotenv.config();
const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;
const redisOptions = {
  redis: { host: REDIS_HOST, port: REDIS_PORT, password: REDIS_PASSWORD },
};

// DEFINE QUEUE
const burgerQueue = new Bull("burger", redisOptions);

// REGISTER PROCESSER
burgerQueue.process((payload, done) => {
  console.log("Preparing the burger!");
  setTimeout(() => {
    console.log("Burger ready!");
    done();
  }, 4000);
});

//ADD JOB TO THE QUEUE
burgerQueue.add({
  bun: "🍔",
  cheese: "🧀",
  toppings: ["🍅", "🫒", "🥒", "🌶️"],
});
