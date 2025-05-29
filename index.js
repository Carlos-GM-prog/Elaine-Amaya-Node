import fetch from 'node-fetch';

const [,, method, resource, ...args] = process.argv;

const BASE_URL = 'https://fakestoreapi.com';

async function listarProductos() {
  const res = await fetch(`${BASE_URL}/products`);
  const productos = await res.json();
  console.log('Lista de productos:');
  productos.forEach(p => {
    console.log(`- ${p.title} - $${p.price}`);
  });
}

async function crearProducto(title, price, category) {
  try {
    const res = await fetch(`${BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        price: parseFloat(price),
        category,
        description: 'Producto creado desde CLI',
        image: 'https://i.pravatar.cc'
      })
    });
    const data = await res.json();
    console.log('Producto creado:', data);
  } catch (error) {
    console.error('Error creando producto:', error.message);
  }
}

async function main() {
  if (method === 'GET' && resource === 'products') {
    await listarProductos();
  } else if (method === 'POST' && resource === 'products') {
    const [title, price, category] = args;
    if (!title || !price || !category) {
      console.log('Faltan argumentos. Uso: npm run start POST products "title" price "category"');
      return;
    }
    await crearProducto(title, price, category);
  } else {
    console.log('Comando no reconocido. Usa: npm run start GET products');
  }
}

main();

