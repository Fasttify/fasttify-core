import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { useQueryGraphStep } from "@medusajs/medusa/core-flows";
import { sendNotificationStep } from "../order-confirmation/steps/send-notification";

type WorkflowInput = {
  fulfillmentId: string;
};

export const sendShippingUpdateWorkflow = createWorkflow(
  "send-shipping-update",
  ({ fulfillmentId }: WorkflowInput) => {
    //@ts-ignore
    const { data: fulfillments } = useQueryGraphStep({
      entity: "fulfillment",
      fields: [
        "id",
        "shipped_at",
        "data",
        "provider_id",
        "labels.id",
        "labels.tracking_number",
        "labels.tracking_url",
        "labels.url",
        "order.id",
        "order.display_id",
        "order.email",
      ],
      filters: {
        id: fulfillmentId,
      },
    });

    const fulfillment = fulfillments[0];
    // @ts-ignore
    const { data: orders } = useQueryGraphStep({
      entity: "order",
      fields: [
        "id",
        "display_id",
        "email",
        "customer.first_name",
        "customer.last_name",
        "shipping_address.address_1",
        "shipping_address.address_2",
        "shipping_address.city",
        "shipping_address.country_code",
        "shipping_address.postal_code",
        "items.*",
        "items.id",
        "items.title",
        "items.quantity",
        "items.thumbnail",
        "items.variant.id",
        "items.variant.title",
        "items.variant.product.title",
      ],
      filters: {
        id: fulfillment.order?.id,
      },
    }).config({ name: "fetch-order" });

    const order = orders[0];

    const notification = sendNotificationStep([
      {
        to: order?.email ?? "",
        channel: "email",
        template: "shipping-update",
        data: {
          fulfillment: fulfillment,
          order: order,
        },
      },
    ]);

    return new WorkflowResponse(notification);
  }
);
