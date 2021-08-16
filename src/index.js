import express from "express";
import { promises as fs } from "fs";
import ordersRoutes from "../src/routes/ordersRoutes.js";

const { readFile, writeFile } = fs;

global.filename = "pedidos.json";

const app = express();
app.use(express.json());
app.use("/order", ordersRoutes);

app.listen(3000, async () => {
  try {
    await readFile(global.filename);
    console.log("Server started!");
  } catch (err) {
    const initialJson = {
      nextId: 1,
      pedidos: [],
    };
    await writeFile(global.filename, JSON.stringify(initialJson))
      .then(() => {
        logger.info("API started and File Created!");
      })
      .catch((err) => {
        logger.error(err);
      });
  }
});
