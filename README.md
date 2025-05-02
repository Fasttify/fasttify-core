<p align="center">
   <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://www.dev.fasttify.com/icons/fasttify-white.webp">
      <source media="(prefers-color-scheme: light)" srcset="https://www.dev.fasttify.com/icons/fasttify-white.webp">
      <img alt="Fasttify logo" src="https://www.dev.fasttify.com/icons/fasttify-white.webp" width="100" />
    </picture>
</p>

<h1 align="center">
  Fasttify-Core
</h1>

<h4 align="center">
  Sistema Multi-Tenant con Medusa
</h4>

<p align="center">
  Permite crear y administrar múltiples tiendas desde una única instancia de Medusa.
</p>

> [!NOTE]
> Este proyecto se encuentra actualmente en fase **beta** y está en desarrollo activo. Puede haber cambios significativos y funcionalidades incompletas.

<p align="center">
 <a href="https://github.com/Fasttify/fasttify-core/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Fasttify is released under the MIT license." />
  </a>
  <a href="https://github.com/Fasttify/fasttify-core/CONTRIBUTING.md">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat" alt="PRs welcome!" />
  </a>
</p>

## ¿Qué es Fasttify-Core?

Fasttify-Core es un proyecto que busca implementar una arquitectura multi-tenant sobre una única instancia de MedusaJS. El objetivo principal es permitir que múltiples usuarios puedan crear, configurar y administrar sus propias tiendas de comercio electrónico de forma independiente, compartiendo la misma infraestructura base de Medusa pero manteniendo sus datos (productos, pedidos, clientes, etc.) completamente aislados.

Esto ofrece una solución escalable y eficiente para proveedores de plataformas o agencias que deseen ofrecer servicios de e-commerce a diversos clientes sin la necesidad de desplegar y mantener una instancia de Medusa separada para cada uno.

## Instalación

Sigue estos pasos para configurar Fasttify-Core en tu entorno local.

### Prerrequisitos

Asegúrate de tener instalados los siguientes requisitos previos:

- **Git:** Para clonar el repositorio.
- **Node.js:** Versión 20 o superior.
- **PostgreSQL:** Base de datos para Medusa.
- **Yarn:** Gestor de paquetes (alternativamente puedes usar npm).

### Pasos

1.  **Clona el repositorio:**

    ```bash
    git clone https://github.com/Fasttify/fasttify-core.git
    ```

2.  **Navega al directorio del proyecto:**

    ```bash
    cd fasttify-core
    ```

3.  **Instala las dependencias:**

    ```bash
    yarn install
    ```

4.  **Configura la base de datos:**
    Asegúrate de que tu servidor PostgreSQL esté en ejecución y configura las credenciales en un archivo `.env` basado en `.env.template`. Luego, ejecuta:

    ```bash
    npx medusa db:setup
    ```

5.  **Siembra datos iniciales (opcional pero recomendado):**

    ```bash
    yarn seed
    # o si usas npm:
    # npm run seed
    ```

6.  **Crea un usuario administrador:**

    ```bash
    npx medusa user -e admin@medusajs.com -p supersecret
    ```

    _Reemplaza `admin@medusajs.com` y `supersecret` con tu correo electrónico y contraseña deseados._

7.  **Inicia el servidor de desarrollo:**

    ```bash
    yarn dev
    ```

¡Ahora deberías poder acceder a tu instancia de Fasttify-Core!
