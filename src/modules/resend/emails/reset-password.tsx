import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type ResetPasswordEmailProps = {
  url: string;
};
export const resetPasswordEmail = ({ url }: ResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Restablece tu contraseña</Preview>
      <Body>
        <Container>
          <Heading>Restablecimiento de contraseña</Heading>
          <Section>
            <Text>
              Hemos recibido una solicitud para restablecer tu contraseña. Haz
              clic en el botón a continuación para crear una nueva contraseña:
            </Text>
            <Button href={url}>Restablecer contraseña</Button>
            <Text>
              Si no solicitaste este cambio, puedes ignorar este correo.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};
