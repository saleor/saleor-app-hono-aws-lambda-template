import { Hono } from "hono";
import { orderCreatedWebhook } from "./order-created";

const app = new Hono();
app.post("/order-created", (c) => {
  return orderCreatedWebhook.createHandler((request, ctx) => {
    const {
      /**
       * Access payload from Saleor - defined above
       */
      payload,
      /**
       * Saleor event that triggers the webhook (here - ORDER_CREATED)
       */
      event,
      /**
       * App's URL
       */
      baseUrl,
      /**
       * Auth data (from APL) - contains token and saleorApiUrl that can be used to construct graphQL client
       */
      authData,
    } = ctx;

    /**
     * Perform logic based on Saleor Event payload
     */
    console.log(`Order was created for customer: ${payload.order?.userEmail}`);

    return new Response("Accepted", { status: 200 });
  })(c.req.raw);
});

export default app;
