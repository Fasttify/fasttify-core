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
} from "@react-email/components";
import { BigNumberValue, OrderDTO } from "@medusajs/framework/types";

type OrderPlacedEmailProps = {
  order: OrderDTO;
};

function OrderPlacedEmailComponent({ order }: OrderPlacedEmailProps) {
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

          {/* Order Confirmation */}
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
              ¡Gracias por tu orden!
            </Heading>
            <Text
              style={{
                fontSize: "16px",
                lineHeight: "24px",
                margin: "0 0 24px",
              }}
            >
              Tu pedido{" "}
              <strong>#{order.display_id || order.id.substring(0, 8)}</strong>{" "}
              ha sido recibido y está pendiente de confirmación. Te
              notificaremos cuando sea procesado.
            </Text>

            <Text
              style={{
                fontSize: "16px",
                lineHeight: "24px",
                margin: "0 0 24px",
              }}
            >
              Hola{" "}
              <strong>
                {order.shipping_address?.first_name || order.email}
              </strong>
              , aquí está el resumen de tu compra:
            </Text>
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
              Resumen del Pedido
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

          {/* Shipping Information */}
          {order.shipping_address && (
            <Section style={{ marginBottom: "30px" }}>
              <Heading
                as="h2"
                style={{
                  fontSize: "18px",
                  margin: "0 0 15px",
                  fontWeight: "bold",
                }}
              >
                Información de Envío
              </Heading>
              <Text
                style={{ fontSize: "14px", lineHeight: "22px", margin: "0" }}
              >
                {order.shipping_address.first_name}{" "}
                {order.shipping_address.last_name}
                <br />
                {order.shipping_address.address_1}
                <br />
                {order.shipping_address.address_2 && (
                  <>
                    {order.shipping_address.address_2}
                    <br />
                  </>
                )}
                {order.shipping_address.city}, {order.shipping_address.province}{" "}
                {order.shipping_address.postal_code}
                <br />
                {order.shipping_address.country_code?.toUpperCase()}
              </Text>
            </Section>
          )}

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
              Si tienes alguna pregunta, responde a este correo o contáctanos en{" "}
              <Link
                href="mailto:soporte@tutienda.com"
                style={{ color: mainColor, textDecoration: "none" }}
              >
                soporte@tutienda.com
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export const orderPlacedEmail = (props: OrderPlacedEmailProps) => (
  <OrderPlacedEmailComponent {...props} />
);
