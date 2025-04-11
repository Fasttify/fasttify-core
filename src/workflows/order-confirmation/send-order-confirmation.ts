import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { useQueryGraphStep } from "@medusajs/medusa/core-flows";
import { sendNotificationStep } from "./steps/send-notification";

type WorkflowInput = {
  id: string;
};

export const sendOrderConfirmationWorkflow = createWorkflow(
  "send-order-confirmation",
  ({ id }: WorkflowInput) => {
    // @ts-ignore
    const { data: orders } = useQueryGraphStep({
      entity: "order",
      fields: [
        "id",
        "email",
        "currency_code",
        "total",
        "items.*",
        "shipping_address.*",
      ],
      filters: {
        id,
      },
    });

    const { data: adminUsers } = useQueryGraphStep({
      entity: "user",
      fields: ["id", "email"],
    }).config({ name: "fetch-admin" });

    const customerNotification = sendNotificationStep([
      {
        to: orders[0]?.email ?? "",
        channel: "email",
        template: "order-placed",
        data: {
          order: orders[0],
        },
      },
    ]);

    const sellerNotification = sendNotificationStep([
      {
        to: adminUsers[0].email,
        channel: "email",
        template: "order-seller-notification",
        data: {
          order: orders[0],
        },
      },
    ]).config({ name: "send-seller-notification" });

    return new WorkflowResponse({
      customerNotification,
      sellerNotification,
    });
  }
);
