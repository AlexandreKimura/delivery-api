import { promises as fs } from "fs";

const { readFile, writeFile } = fs;

async function createOrder({ cliente, produto, valor }) {
  const data = JSON.parse(await readFile(global.filename));

  const newOrder = {
    id: data.nextId++,
    cliente,
    produto,
    valor,
    entregue: false,
    timestamp: new Date(),
  };

  data.pedidos.push(newOrder);

  await writeFile(global.filename, JSON.stringify(data, null, 2));

  return newOrder;
}

async function updateOrder({ id, cliente, produto, valor, entregue }) {
  const data = JSON.parse(await readFile(global.filename));
  const orderIndex = data.pedidos.findIndex(
    (pedido) => pedido.id === Number(id)
  );

  if (orderIndex === -1) {
    throw new Error("Pedido não encontrado!");
  }

  data.pedidos[orderIndex].cliente = cliente;
  data.pedidos[orderIndex].produto = produto;
  data.pedidos[orderIndex].valor = valor;
  data.pedidos[orderIndex].entregue = entregue;

  await writeFile(global.filename, JSON.stringify(data, null, 2));

  return data.pedidos[orderIndex];
}

async function updateDeliveryOrder({ id, entregue }) {
  const data = JSON.parse(await readFile(global.filename));
  const orderIndex = data.pedidos.findIndex(
    (pedido) => pedido.id === Number(id)
  );

  if (orderIndex === -1) {
    throw new Error("Pedido não encontrado!");
  }

  data.pedidos[orderIndex].entregue = entregue;

  await writeFile(global.filename, JSON.stringify(data, null, 2));

  return data.pedidos[orderIndex];
}

async function deleteOrder({ id }) {
  const data = JSON.parse(await readFile(global.filename));
  data.pedidos = data.pedidos.filter((pedido) => pedido.id !== Number(id));
  await writeFile(global.filename, JSON.stringify(data, null, 2));
}

async function getPedido({ id }) {
  const data = JSON.parse(await readFile(global.filename));
  const pedido = data.pedidos.find((pedido) => pedido.id === Number(id));

  if (!pedido) {
    throw new Error("Pedido não encontrado");
  }

  return pedido;
}

async function getValorTotalPorCliente({ cliente }) {
  const data = JSON.parse(await readFile(global.filename));
  const valor = data.pedidos.reduce((acc, value) => {
    if (
      value.cliente &&
      value.cliente.toLowerCase() === cliente.toLowerCase() &&
      value.entregue
    ) {
      return acc + value.valor;
    } else {
      return acc;
    }
  }, 0);
  return valor;
}

async function getValorTotalPorProduto({ produto }) {
  const data = JSON.parse(await readFile(global.filename));
  const valor = data.pedidos.reduce((acc, value) => {
    if (
      value.produto &&
      value.produto.toLowerCase() === produto.toLowerCase() &&
      value.entregue
    ) {
      return acc + value.valor;
    } else {
      return acc;
    }
  }, 0);
  return valor;
}

async function getProdutosMaisVendidos() {
  const products = [];
  const productsFormat = [];
  const data = JSON.parse(await readFile(global.filename));

  data.pedidos.forEach((pedido) => {
    let index = products.findIndex((p) => p.product === pedido.produto);
    if (pedido.entregue) {
      if (index === -1) {
        products.push({ product: pedido.produto, qtd: 1 });
      } else {
        products[index].qtd++;
      }
    }
  });

  products.sort((a, b) => b.qtd - a.qtd);

  products.forEach((product) => {
    productsFormat.push(`${product.product} - ${product.qtd}`);
  });

  return productsFormat;
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
