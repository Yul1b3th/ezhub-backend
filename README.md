# 🚀 API de Alquiler de Habitaciones

Este es el backend del proyecto que se encarga de gestionar los usuarios, propiedades, habitaciones y transacciones a través de una API RESTful. Utiliza Node.js, NestJS y TypeORM para interactuar con una base de datos MySQL. Las contraseñas de los usuarios se encriptan utilizando bcryptjs y la autenticación se maneja a través de JWT.

Para más detalles sobre los endpoints y cómo utilizarlos, consulta la [Documentación de la API](https://ezhub-backend.onrender.com/docs/).

## 🚀 Demo

Puedes ver la demostración de la aplicación en [EZHub App](https://ezhub.vercel.app/).

## 💻 Tecnologías Utilizadas

- [Node.js](https://nodejs.org/).
- [NestJS](https://nestjs.com/): Un marco de trabajo para construir aplicaciones de servidor eficientes, confiables y escalables en TypeScript.
- [TypeORM](https://typeorm.io/): Un ORM que puede ejecutarse en plataformas NodeJS y puede ser utilizado con TypeScript y JavaScript.
- [bcryptjs](https://docs.nestjs.com/security/encryption-and-hashing#hashing): Una biblioteca para encriptar contraseñas.
- [jsonwebtoken](https://docs.nestjs.com/security/authentication#jwt-token): Una implementación de tokens de acceso JSON Web Token.
- [MySQL](https://www.mysql.com/): Un sistema de gestión de bases de datos relacional.
- [Yarn](https://yarnpkg.com/): Un gestor de paquetes rápido, fiable y seguro.

## 📌 Instrucciones para Levantar el Servidor

Asegúrate de tener instalado Node.js y yarn antes de seguir estos pasos.

**✔️ Paso 1:** Clonar el Repositorio

```bash
git clone https://github.com/Yul1b3th/ezhub-backend.git
```

**✔️ Paso 2:** Ingresa al directorio del proyecto:

```bash
cd ezhub-backend
```

**✔️ Paso 3:** Instalar las Dependencias

```bash
npm install
```

**✔️ Paso 4:** Configuración de la Base de Datos

Este proyecto utiliza variables de entorno para la configuración de la base de datos. Estas variables se definen en un archivo `.env` que no se incluye en el repositorio por razones de seguridad. Sin embargo, se proporciona un archivo `.env.template` como ejemplo.

Copia el archivo `.env.template` y renómbralo a `.env`. Luego, reemplaza los valores de las variables con la información de tu base de datos:

```bash
cp .env.template .env
```

**Nota:** Asegúrate de reemplazar las variables con los valores correspondientes a tu configuración.

El proyecto utiliza el módulo `ConfigModule` de NestJS para leer las variables de entorno desde el archivo `.env`. Estas variables se utilizan para configurar la conexión a la base de datos en `app.module.ts` y para definir el puerto del servidor en `main.ts`.

**✔️ Paso 5:** Levantar el Servidor

```bash
yarn run start:dev
```

El servidor estará disponible en http://localhost:8000 por defecto.

## 🚧 Endpoints de la API

### Autenticación

- **POST /api/auth/register**: Registra un nuevo usuario.
- **POST /api/auth/login**: Inicia sesión con un usuario existente.
- **GET /api/auth/profile**: Obtiene el perfil del usuario actualmente autenticado.
- **GET /api/auth/check-token**: Verifica el token de sesión y devuelve un nuevo token JWT válido.

### Usuarios

- **GET /api/users**: Obtiene todos los usuarios.
- **GET /api/users/:id**: Obtiene un usuario por ID.
- **PATCH /api/users/:id**: Actualiza un usuario existente.
- **DELETE /api/users/:id**: Elimina un usuario.

**Nota:** Reemplaza **:id** con el ID del usuario correspondiente.

### Propiedades

- **GET /api/properties**: Obtiene todas las propiedades. (JWT requerido)
- **GET /api/properties/:id**: Obtiene una propiedad por ID. (JWT requerido)
- **POST /api/properties**: Crea una nueva propiedad. (JWT requerido)
- **PATCH /api/properties/:id**: Actualiza una propiedad existente. (JWT requerido)
- **DELETE /api/properties/:id**: Elimina una propiedad. (JWT requerido)

**Nota:** Reemplaza **:id** con el ID de la propiedad correspondiente.

### Propiedades Públicas

- **GET /api/properties**: Obtiene todas las propiedades públicas. (Sin JWT requerido)
- **GET /api/properties/:id**: Obtiene una propiedad pública por ID. (Sin JWT requerido)

**Nota:** Reemplaza **:id** con el ID de la propiedad correspondiente.

### Habitaciones

- **GET /api/rooms**: Obtiene todas las habitaciones. (JWT requerido)
- **GET /api/rooms/:id**: Obtiene una habitación por ID. (JWT requerido)
- **POST /api/rooms**: Crea una nueva habitación. (JWT requerido)
- **PATCH /api/rooms/:id**: Actualiza una habitación existente. (JWT requerido)
- **DELETE /api/rooms/:id**: Elimina una habitación. (JWT requerido)

**Nota:** Reemplaza **:id** con el ID correspondiente de la habitación.

### Habitaciones Públicas

- **GET /api/public-rooms**: Obtiene todas las habitaciones públicas. (Sin JWT requerido)
- **GET /api/public-rooms/:id**: Obtiene una habitación pública por ID. (Sin JWT requerido)

### Comodidades Públicas

- **GET /api/public-rooms/:id/amenities**: Obtiene todas las comodidades de una habitación pública por ID. (Sin JWT requerido)

**Nota:** Reemplaza **:id** con el ID correspondiente de la habitación.

## 🤝 Contribuciones

Si deseas colaborar en este proyecto o informar sobre problemas, no dudes en crear un "issue" o enviar un "pull request."
