import { Hono } from "hono";

const randomNumber = () => {
  return Math.ceil(Math.random() * 100);
};

export const authDataRouter = new Hono().get("/", (c) => {
  const authUserMessage = `User auth data is equal ${randomNumber()}`;
  return c.json({
    authUserMessage,
  });
});
