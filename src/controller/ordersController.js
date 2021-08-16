import OrdersService from "../services/ordersService.js";

async function createOrder(req, res, next) {
  try {
    let order = req.body;

    if (!order.cliente || !order.produto || !order.valor) {
      throw new Error("Cliente, produto ou valor são obrigatórios");
    }

    order = await OrdersService.createOrder({
      cliente: order.cliente,
      produto: order.produto,
      valor: order.valor,
    });

    res.send(order);
  } catch (err) {
    next(err);
  }
}

async function updateOrder(req, res, next) {
  try {
    const { id } = req.params;
    let order = req.body;

    if (!order.cliente || !order.produto || !order.valor || !order.entregue) {
      throw new Error("Cliente, produto, valor e entrega são obrigatórios");
    }

    order = await OrdersService.updateOrder({
      id,
      cliente: order.cliente,
      produto: order.produto,
      valor: order.valor,
      entregue: order.entregue,
    });

    res.send(order);
  } catch (err) {
    next(err);
  }
}

async function updateDeliveryOrder(req, res, next) {
  try {
    const { id } = req.params;
    let order = req.body;

    if (!typeof order.entregue === "boolean") {
      throw new Error("Entrega é obrigatório");
    }

    order = await OrdersService.updateDeliveryOrder({
      id,
      entregue: order.entregue,
    });

    res.send(order);
  } catch (err) {
    next(err);
  }
}

async function deleteOrder(req, res, next) {
  try {
    const { id } = req.params;

    await OrdersService.deleteOrder({
      id,
    });

    res.end();
  } catch (err) {
    next(err);
  }
}

async function getPedido(req, res, next) {
  try {
    const { id } = req.params;

    const order = await OrdersService.getPedido({
      id,
    });

    res.send(order);
  } catch (err) {
    next(err);
  }
}

async function getValorTotalPorCliente(req, res, next) {
  try {
    const { cliente } = req.params;

    const value = await OrdersService.getValorTotalPorCliente({
      cliente,
    });

    res.json({ "valor total": value });
  } catch (err) {
    next(err);
  }
}

async function getValorTotalPorProduto(req, res, next) {
  try {
    const { produto } = req.params;

    const value = await OrdersService.getValorTotalPorProduto({
      produto,
    });

    res.json({ "valor total": value });
  } catch (err) {
    next(err);
  }
}

async function getProdutosMaisVendidos(req, res, next) {
  try {
    const value = await OrdersService.getProdutosMaisVendidos();

    res.send(value);
  } catch (err) {
    next(err);
  }
}

export default {
  createOrder,
  updateOrder,
  updateDeliveryOrder,
  deleteOrder,
  getPedido,
  getValorTotalPorCliente,
  getValorTotalPorProduto,
  getProdutosMaisVendidos,
};
