import express from "express";
import { router } from "./src/routes/inventory.routes";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || (1000 as number);
app.use(express.json());
const serviceName = "InventoryService";



app.use("/api/v1", router);
app.listen(PORT, () => console.info(`${serviceName} listening on ${PORT}`));
