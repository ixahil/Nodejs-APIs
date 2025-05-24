// swagger.js
import morgan from "morgan";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Nodejs API Docs",
//       version: "1.0.0",
//       description: "A simple Express API with OTP based Authentication",
//     },
//     components: {
//       securitySchemas: {
//         bearerAuth: {
//           type: "http",
//           scheme: "bearer",
//           bearerFormat: "JWT",
//         },
//       },
//     },
//     security: [
//       {
//         bearerAuth: [],
//       },
//     ],
//     servers: [
//       {
//         url: "http://localhost:8000",
//       },
//     ],
//   },
//   apis: ["./routes/*.js"], // Path to your API routes
// };

// const specs = swaggerJsdoc(options);

// function swaggerDocs(app, port) {
//   app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

//   app.get("docs.json", (req, res) => {
//     res.status(200).json(specs);
//   });

//   morgan("tiny");
// }

// export default swaggerDocs;

// export { specs, swaggerUi };

import swaggerAutogen from "swagger-autogen";

// const options = {
//   openapi: "OpenAPI 3",
//   language: "en-US",
//   disableLogs: false,
//   autoHeaders: false,
//   autoQuery: false,
//   autoBody: false,
// };

const doc = {
  info: {
    version: "1.0.0", // by default: '1.0.0'
    title: "REST API", // by default: 'REST API'
    description: "", // by default: ''
    contact: {
      name: "Sahil Dev",
      email: "dev.sahil@icloud.com",
    },
  },
  host: "localhost:8000", // by default: 'localhost:3000'
  basePath: "/api/v1", // by default: '/'
  schemes: [], // by default: ['http']
  consumes: [], // by default: ['application/json']
  produces: [], // by default: ['application/json']
  tags: [
    // by default: empty Array
    {
      name: "Auth", // Tag name
      description: "Authentication Routes", // Tag description
    },
    {
      name: "User", // Tag name
      description: "User Routes", // Tag description
    },
    // { ... }
  ],
  components: {
    securitySchemas: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    responses: {
      UnAuthorizedError: {
        status: "401",
        data: "null",
        success: false,
        errors: [],
        isOperational: true,
        message: "UnAuthorized, You are not authorized",
      },
      BadRequest: {
        status: "400",
        data: "null",
        success: false,
        errors: [],
        isOperational: true,
        message: "Bad Request",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  securityDefinitions: {},
  // by default: empty object
  definitions: {
    User: {
      email: "String",
      isEmailVerified: "Boolean",
      createdAt: "Date",
      updatedAt: "Date",
    },
    RegisterRequest: {
      email: "user@example.com",
      password: "securepassword",
    },
    SuccessResponse: {
      status: "200/201",
      data: "{}",
      message: "Success!",
    },
    ErrorResponse: {
      status: "400/401/403/500",
      data: "null",
      success: false,
      errors: [],
      isOperational: true,
      message: "Message about the error",
    },
  }, // by default: empty object
};

const outputFile = "./swagger-output.json";
const routes = ["../routes/*.js"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen()(outputFile, routes, doc);
