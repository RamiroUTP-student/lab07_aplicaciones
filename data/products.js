const products = Array.from({ length: 1000 }, (_, i) => ({
  id: i.toString(),
  name: `Producto ${i + 1}`,
  price: Math.floor(Math.floor(Math.random() * 1000)),
}));

export default products;