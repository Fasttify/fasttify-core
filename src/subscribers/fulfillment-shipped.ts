import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework";
import { sendShippingUpdateWorkflow } from "../workflows/shipping-order/send-shipping-update";

export default async function shipmentCreatedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  await sendShippingUpdateWorkflow(container).run({
    input: {
      fulfillmentId: data.id,
    },
  });
}

export const config: SubscriberConfig = {
  event: ["shipment.created"],
};
