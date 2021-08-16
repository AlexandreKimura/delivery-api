import express from "express";
import OrdersController from "../controller/ordersController.js";

const router = express.Router();

router.post("/", OrdersController.createOrder);
router.put("/:id", OrdersController.updateOrder);
router.patch("/:id", OrdersController.updateDeliveryOrder);
router.delete("/:id", OrdersController.deleteOrder);
router.get("/vendas", OrdersController.getProdutosMaisVendidos);
router.get("/:id", OrdersController.getPedido);
router.get("/cliente/:cliente", OrdersController.getValorTotalPorCliente);
router.get("/produto/:produto", OrdersController.getValorTotalPorProduto);

export default router;
