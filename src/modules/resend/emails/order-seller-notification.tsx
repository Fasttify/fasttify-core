import {
  Text,
  Column,
  Container,
  Heading,
  Html,
  Img,
  Row,
  Section,
  Body,
  Hr,
  Link,
  Button,
} from "@react-email/components";
import { BigNumberValue, OrderDTO } from "@medusajs/framework/types";

type OrderSellerNotificationProps = {
  order: OrderDTO;
};

function OrderSellerNotificationComponent({
  order,
}: OrderSellerNotificationProps) {
  const formatter = new Intl.NumberFormat([], {
    style: "currency",
    currencyDisplay: "narrowSymbol",
    currency: order.currency_code,
  });

  const formatPrice = (price: BigNumberValue) => {
    if (typeof price === "number") {
      return formatter.format(price);
    }

    if (typeof price === "string") {
      return formatter.format(parseFloat(price));
    }

    return price?.toString() || "";
  };

  const mainColor = "#4F46E5"; // Indigo color
  const backgroundColor = "#F9FAFB";
  const textColor = "#1F2937";
  const secondaryTextColor = "#6B7280";


  return (
    <Html>
      <Body
        style={{
          backgroundColor,
          color: textColor,
          fontFamily: "Arial, sans-serif",
          margin: "0",
          padding: "0",
        }}
      >
        <Container
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            padding: "20px",
            backgroundColor: "#FFFFFF",
          }}
        >
          <Hr style={{ borderColor: "#E5E7EB", margin: "0" }} />

          {/* Order Notification Header */}
          <Section style={{ padding: "30px 0 20px" }}>
            <Heading
              as="h1"
              style={{
                color: mainColor,
                fontSize: "24px",
                fontWeight: "bold",
                margin: "0 0 15px",
              }}
            >
              ¡Nuevo Pedido Recibido!
            </Heading>
            <Text
              style={{
                fontSize: "16px",
                lineHeight: "24px",
                margin: "0 0 24px",
              }}
            >
              Has recibido un nuevo pedido{" "}
              <strong>#{order.display_id || order.id.substring(0, 8)}</strong>{" "}
              que requiere tu atención. Por favor procésalo lo antes posible.
            </Text>

            <Text
              style={{
                fontSize: "16px",
                lineHeight: "24px",
                margin: "0 0 24px",
              }}
            >
              El cliente <strong>{order.email}</strong> ha realizado la
              siguiente compra. <br />
              <strong>Recuerda:</strong> Este es un pago manual, por lo que
              debes verificar si el dinero fue recibido antes de procesar el
              pedido.
            </Text>

            <Button
              href={`https://admin.tutienda.com/orders/${order.id}`}
              style={{
                backgroundColor: mainColor,
                borderRadius: "4px",
                color: "white",
                fontWeight: "bold",
                padding: "12px 20px",
                textDecoration: "none",
                textAlign: "center",
                display: "inline-block",
                marginBottom: "24px",
              }}
            >
              Ver Pedido en el Panel
            </Button>
          </Section>

          {/* Order Summary */}
          <Section
            style={{
              backgroundColor: backgroundColor,
              padding: "20px",
              borderRadius: "8px",
              marginBottom: "30px",
            }}
          >
            <Heading
              as="h2"
              style={{
                fontSize: "18px",
                margin: "0 0 15px",
                fontWeight: "bold",
              }}
            >
              Detalles del Pedido
            </Heading>

            {/* Order Items */}
            {order.items?.map((item) => (
              <Row key={item.id} style={{ marginBottom: "20px" }}>
                <Column style={{ width: "25%" }}>
                  <Img
                    src={
                      item.thumbnail ||
                      "https://via.placeholder.com/80?text=No+Image"
                    }
                    alt={item.product_title || "Product"}
                    width="80px"
                    height="80px"
                    style={{ borderRadius: "4px" }}
                  />
                </Column>
                <Column style={{ width: "75%", verticalAlign: "top" }}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      margin: "0 0 5px",
                    }}
                  >
                    {item.product_title}
                  </Text>
                  {item.variant_title && (
                    <Text
                      style={{
                        color: secondaryTextColor,
                        fontSize: "14px",
                        margin: "0 0 5px",
                      }}
                    >
                      {item.variant_title}
                    </Text>
                  )}
                  <Text style={{ fontSize: "14px", margin: "0 0 5px" }}>
                    Cantidad: {item.quantity}
                  </Text>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      margin: "0",
                    }}
                  >
                    {formatPrice(item.total)}
                  </Text>
                </Column>
              </Row>
            ))}

            <Hr style={{ borderColor: "#E5E7EB", margin: "20px 0" }} />

            {/* Order Totals */}
            <Row>
              <Column style={{ width: "50%" }}>
                <Text style={{ fontSize: "14px", color: secondaryTextColor }}>
                  Subtotal:
                </Text>
              </Column>
              <Column style={{ width: "50%", textAlign: "right" }}>
                <Text style={{ fontSize: "14px" }}>
                  {formatPrice(order.subtotal)}
                </Text>
              </Column>
            </Row>

            {Number(order.shipping_total) > 0 && (
              <Row>
                <Column style={{ width: "50%" }}>
                  <Text style={{ fontSize: "14px", color: secondaryTextColor }}>
                    Envío:
                  </Text>
                </Column>
                <Column style={{ width: "50%", textAlign: "right" }}>
                  <Text style={{ fontSize: "14px" }}>
                    {formatPrice(order.shipping_total)}
                  </Text>
                </Column>
              </Row>
            )}

            {Number(order.discount_total) > 0 && (
              <Row>
                <Column style={{ width: "50%" }}>
                  <Text style={{ fontSize: "14px", color: secondaryTextColor }}>
                    Descuento:
                  </Text>
                </Column>
                <Column style={{ width: "50%", textAlign: "right" }}>
                  <Text style={{ fontSize: "14px" }}>
                    -{formatPrice(order.discount_total)}
                  </Text>
                </Column>
              </Row>
            )}

            {Number(order.tax_total) > 0 && (
              <Row>
                <Column style={{ width: "50%" }}>
                  <Text style={{ fontSize: "14px", color: secondaryTextColor }}>
                    Impuestos:
                  </Text>
                </Column>
                <Column style={{ width: "50%", textAlign: "right" }}>
                  <Text style={{ fontSize: "14px" }}>
                    {formatPrice(order.tax_total)}
                  </Text>
                </Column>
              </Row>
            )}

            <Hr style={{ borderColor: "#E5E7EB", margin: "10px 0" }} />

            <Row>
              <Column style={{ width: "50%" }}>
                <Text style={{ fontSize: "16px", fontWeight: "bold" }}>
                  Total:
                </Text>
              </Column>
              <Column style={{ width: "50%", textAlign: "right" }}>
                <Text style={{ fontSize: "16px", fontWeight: "bold" }}>
                  {formatPrice(order.total)}
                </Text>
              </Column>
            </Row>
          </Section>

          {/* Customer Information */}
          <Section style={{ marginBottom: "30px" }}>
            <Heading
              as="h2"
              style={{
                fontSize: "18px",
                margin: "0 0 15px",
                fontWeight: "bold",
              }}
            >
              Información del Cliente
            </Heading>
            <Text
              style={{
                fontSize: "14px",
                lineHeight: "22px",
                margin: "0 0 5px",
              }}
            >
              <strong>Email:</strong> {order.email}
            </Text>
            {order.shipping_address && (
              <>
                <Text
                  style={{
                    fontSize: "14px",
                    lineHeight: "22px",
                    margin: "0 0 5px",
                  }}
                >
                  <strong>Nombre:</strong> {order.shipping_address.first_name}{" "}
                  {order.shipping_address.last_name}
                </Text>
                <Text
                  style={{ fontSize: "14px", lineHeight: "22px", margin: "0" }}
                >
                  <strong>Dirección de envío:</strong>
                  <br />
                  {order.shipping_address.address_1}
                  <br />
                  {order.shipping_address.address_2 && (
                    <>
                      {order.shipping_address.address_2}
                      <br />
                    </>
                  )}
                  {order.shipping_address.city},{" "}
                  {order.shipping_address.province}{" "}
                  {order.shipping_address.postal_code}
                  <br />
                  {order.shipping_address.country_code?.toUpperCase()}
                </Text>
              </>
            )}
          </Section>

          {/* Action Needed */}
          <Section
            style={{
              backgroundColor: "#FEF3C7",
              padding: "15px",
              borderRadius: "8px",
              marginBottom: "30px",
            }}
          >
            <Text
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "#92400E",
                margin: "0 0 5px",
              }}
            >
              Acción Requerida:
            </Text>
            <Text
              style={{
                fontSize: "14px",
                color: "#92400E",
                margin: "0",
              }}
            >
              Por favor, confirma este pedido y prepáralo para su envío lo antes
              posible.
            </Text>
          </Section>

          <Hr style={{ borderColor: "#E5E7EB", margin: "0 0 20px" }} />

          {/* Footer */}
          <Section style={{ textAlign: "center", padding: "0 0 20px" }}>
            <Text
              style={{
                fontSize: "14px",
                color: secondaryTextColor,
                margin: "0 0 10px",
              }}
            >
              Este es un correo automático del sistema. No responder a este
              mensaje.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export const orderSellerNotificationEmail = (
  props: OrderSellerNotificationProps
) => <OrderSellerNotificationComponent {...props} />;
