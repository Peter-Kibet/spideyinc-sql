import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import UserRoutes from "./routes/UserRoutes";
import ProductRoutes from "./routes/ProductRoutes";
import OrderRoutes from "./routes/OrderRoutes";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/users", UserRoutes);
app.use("/api/products", ProductRoutes);
app.use("/api/orders", OrderRoutes);

createConnection().then(() => {
  app.listen(5000, () => {
    console.log("Server is running on port 5000");
  });
});
