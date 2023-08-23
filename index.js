// SIMPLE QUEUE
import Bull from "bull";
import dotenv from "dotenv";
import { promisify } from "util";
const sleep = promisify(setTimeout);

dotenv.config();
const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;
const redisOptions = {
  redis: { host: REDIS_HOST, port: REDIS_PORT, password: REDIS_PASSWORD },
};

// DEFINE QUEUE
const burgerQueue = new Bull("burger", redisOptions);

// REGISTER PROCESSER
burgerQueue.process(async (payload, done) => {
  try {
    // STEP 1
    payload.log("Grill the patty.");
    payload.progress(20);
    await sleep(5000);
    // STEP 2
    payload.log("Toast the buns.");
    payload.progress(40);
    await sleep(5000);
    // STEP 3
    payload.log("Add toppings.");
    payload.progress(60);
    await sleep(5000);
    // STEP 4
    payload.log("");
    payload.log("Assemble layers.");
    payload.progress(80);
    await sleep(5000);
    // STEP 5
    payload.log("Burger ready.");
    await payload.progress(100);
    done();
  } catch (err) {
    done(err);
  }
});

//ADD JOB TO THE QUEUE
burgerQueue.add({
  bun: "🍔",
  cheese: "🧀",
  toppings: ["🍅", "🫒", "🥒", "🌶️"],
});
