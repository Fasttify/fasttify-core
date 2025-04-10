import {
  Text,
  Column,
  Container,
  Heading,
  Html,
  Img,
  Row,
  Section,
  Button,
} from "@react-email/components";

type ShippingUpdateEmailProps = {
  fulfillment: {
    id: string;
    order_id: string;
    shipped_at: Date | null;
    data: Record<string, unknown> | null;
    provider_id: string;
    labels: Array<{
      id: string;
      tracking_number: string;
      tracking_url: string;
      url: string;
    }>;
  };
  order: {
    id: string;
    display_id: string;
    email: string;
    customer: {
      first_name: string;
      last_name: string;
    };
    shipping_address: {
      address_1: string;
      address_2: string;
      city: string;
      country_code: string;
      postal_code: string;
    };
    items: Array<{
      id: string;
      title: string;
      quantity: number;
      thumbnail: string;
      variant: {
        id: string;
        title: string;
        product: {
          title: string;
        };
      };
    }>;
  };
};

function ShippingUpdateEmailComponent({
  fulfillment,
  order,
}: ShippingUpdateEmailProps) {
  const fulfillmentLabels = fulfillment.labels || [];

  return (
    <Html>
      <Container style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <Heading style={{ textAlign: "center", color: "#333" }}>
          Tu pedido ha sido enviado
        </Heading>

        <Section style={{ marginBottom: "20px" }}>
          <Text>Hola {order.customer.first_name},</Text>
          <Text>
            ¡Buenas noticias! Tu pedido #{order.display_id} ha sido enviado y
            está en camino.
          </Text>
        </Section>

        <Section
          style={{
            marginBottom: "20px",
            backgroundColor: "#f7f7f7",
            padding: "15px",
            borderRadius: "5px",
          }}
        >
          <Heading as="h3">Información de seguimiento</Heading>
          {fulfillmentLabels.length > 0 ? (
            <>
              <Text>Información de seguimiento:</Text>
              {fulfillmentLabels.map((label, index) => (
                <div key={index}>
                  <Text style={{ margin: "5px 0" }}>
                    Número de seguimiento: {label.tracking_number}
                  </Text>
                </div>
              ))}
            </>
          ) : null}

          {fulfillment.shipped_at && (
            <Text>
              Fecha de envío:{" "}
              {new Date(fulfillment.shipped_at).toLocaleDateString()}
            </Text>
          )}
        </Section>

        <Section style={{ marginBottom: "20px" }}>
          <Heading as="h3">Dirección de envío</Heading>
          <Text>
            {order.shipping_address.address_1}
            <br />
            {order.shipping_address.address_2
              ? `${order.shipping_address.address_2}<br />`
              : ""}
            {order.shipping_address.city}, {order.shipping_address.postal_code}
            <br />
            {order.shipping_address.country_code}
          </Text>
        </Section>

        <Section>
          <Heading as="h3">Artículos enviados</Heading>
          {order.items.map((item) => (
            <Row
              key={item.id}
              style={{
                marginBottom: "15px",
                borderBottom: "1px solid #eee",
                paddingBottom: "15px",
              }}
            >
              <Column style={{ width: "20%" }}>
                {item.thumbnail && (
                  <Img
                    src={item.thumbnail}
                    alt={item.title}
                    width="80"
                    height="80"
                    style={{ borderRadius: "4px" }}
                  />
                )}
              </Column>
              <Column style={{ width: "80%" }}>
                <Text style={{ fontWeight: "bold", margin: "0" }}>
                  {item.variant?.product?.title ||
                    item.title ||
                    "Producto sin nombre"}
                </Text>
                <Text style={{ margin: "0" }}>
                  Variante: {item.variant?.title || "Estándar"}
                </Text>
                <Text style={{ margin: "0" }}>
                  Cantidad: {item.quantity || 0}
                </Text>
              </Column>
            </Row>
          ))}
        </Section>

        <Section style={{ textAlign: "center", marginTop: "30px" }}>
          <Button
            href={`https://tutienda.com/orders/${order.id}`}
            style={{
              backgroundColor: "#4a00e0",
              color: "#fff",
              padding: "12px 20px",
              borderRadius: "5px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Ver detalles del pedido
          </Button>
        </Section>

        <Section
          style={{
            marginTop: "30px",
            textAlign: "center",
            color: "#666",
            fontSize: "12px",
          }}
        >
          <Text>
            Si tienes alguna pregunta, responde a este correo o contáctanos.
          </Text>
          <Text>© 2023 Tu Tienda. Todos los derechos reservados.</Text>
        </Section>
      </Container>
    </Html>
  );
}
export const shippingUpdateEmail = (props: ShippingUpdateEmailProps) => (
  <ShippingUpdateEmailComponent {...props} />
);
