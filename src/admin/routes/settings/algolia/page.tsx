import { Container, Heading, Button, toast, Text } from "@medusajs/ui";
import { useMutation } from "@tanstack/react-query";
import { sdk } from "../../../lib/sdk";
import { defineRouteConfig } from "@medusajs/admin-sdk";

const AlgoliaPage = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      sdk.client.fetch("/admin/algolia/sync", {
        method: "POST",
      }),
    onSuccess: () => {
      toast.success("Sincroniización exitosa con Algolia");
    },
    onError: (err) => {
      console.error(err);
      toast.error("Error al sincronizar con Algolia");
    },
  });

  const handleSync = () => {
    mutate();
  };

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">Sincronización con Algolia</Heading>
      </div>
      <div className="px-6">
        <Text className="mb-4 mt-8">
          Algolia es una plataforma de búsqueda ultrarrápida que permite
          encontrar productos y contenido en tu tienda en tiempo real. Presiona
          el botón para sincronizar tus datos con Algolia y mejorar la
          experiencia de búsqueda.
        </Text>
      </div>
      <div className="px-6 py-8">
        <Button variant="primary" onClick={handleSync} isLoading={isPending}>
          Sincronizar datos con Algolia
        </Button>
      </div>
    </Container>
  );
};

export const config = defineRouteConfig({
  label: "Algolia",
});

export default AlgoliaPage;
