import express from "express";
import "dotenv/config";
import { appRoutes } from "./route.js";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.urlencoded({ extended: true }));
// For parsing application/json
app.use(express.json());
app.use(cors());

app.get("/test", (req, res) => {
  res.send("cors is working");
});

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CMMS Node API",
      version: "1.0.0",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ["./modules/*/*.route.js"],
};

const swaggerSpec = swaggerJSDoc(options);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

//Route Handler
appRoutes(app);

app.listen(PORT, () => {
  console.log(`App is listing port : ${PORT}`);
});
