import OrdersRepository from "../repositories/ordersRepository.js";

async function createOrder({ cliente, produto, valor }) {
  return await OrdersRepository.createOrder({
    cliente,
    produto,
    valor,
  });
}

async function updateOrder({ id, cliente, produto, valor, entregue }) {
  return await OrdersRepository.updateOrder({
    id,
    cliente,
    produto,
    valor,
    entregue,
  });
}

async function updateDeliveryOrder({ id, entregue }) {
  return await OrdersRepository.updateDeliveryOrder({
    id,
    entregue,
  });
}

async function deleteOrder({ id }) {
  await OrdersRepository.deleteOrder({
    id,
  });
}

async function getPedido({ id }) {
  return await OrdersRepository.getPedido({
    id,
  });
}

async function getValorTotalPorCliente({ cliente }) {
  return await OrdersRepository.getValorTotalPorCliente({
    cliente,
  });
}

async function getValorTotalPorProduto({ produto }) {
  return await OrdersRepository.getValorTotalPorProduto({
    produto,
  });
}

async function getProdutosMaisVendidos() {
  return await OrdersRepository.getProdutosMaisVendidos();
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
