import { Hono } from "hono";

const randomNumber = () => {
  return Math.ceil(Math.random() * 100);
};

export const publicDataRouter = new Hono().get("/", (c) => {
  const publicMessage = `Hello Hono! Public data is ${randomNumber()}`;
  const authUserMessage = `Additional auth data is equal ${randomNumber()}`;

  return c.json({
    publicMessage,
    authUserMessage,
  });
});
