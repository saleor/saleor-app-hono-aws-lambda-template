import {
  createAppRegisterHandler,
  createManifestHandler,
} from "@saleor/app-sdk/handlers/fetch-api";
import { Hono } from "hono";
import { saleorApp } from "../saleor-app";
import webhookRotues from "./webhooks/index";
import { orderCreatedWebhook } from "./webhooks/order-created";
import { unpackHonoRequest } from "./utils";

const app = new Hono();

app.get(
  "/manifest",
  unpackHonoRequest(createManifestHandler({
    async manifestFactory({ appBaseUrl }) {
      const awsBaseUrl = `${appBaseUrl}/prod`;
      return {
        name: "Saleor App Template",
        tokenTargetUrl: `${awsBaseUrl}/api/register`,
        appUrl: `${awsBaseUrl}/app`,
        permissions: [
          "MANAGE_ORDERS",
        ],
        id: "saleor.app.hono-aws-lambda",
        version: "0.0.1",
        webhooks: [
          orderCreatedWebhook.getWebhookManifest(awsBaseUrl + "/"),
        ],
        extensions: [],
        author: "Jonatan Witoszek",
      };
    },
  })),
);

app.post(
  "/register",
  unpackHonoRequest(createAppRegisterHandler({
    apl: saleorApp.apl,
  })),
);

app.route("/webhooks", webhookRotues);

export default app;
