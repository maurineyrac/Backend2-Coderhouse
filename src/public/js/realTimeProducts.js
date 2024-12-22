
const socket = io();
const productForm = document.getElementById("productForm");

productForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const price = parseFloat(document.getElementById("price").value);
  const description = document.getElementById("description").value;
  const code = parseInt(document.getElementById("code").value, 10);
  const stock = parseInt(document.getElementById("stock").value, 10);
  const category = document.getElementById("category").value;

  const product = { title, description, price, code, stock, category};

  // Enviar datos mediante HTTP POST

  try {
    const response = await fetch('/realtimeproducts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (response.ok) {
      console.log('Product added successfully via HTTP POST');
      const data = await response.json();
      console.log('Respuesta del servidor:', data)
      // Resetear el formulario después de que el producto se haya añadido con éxito
      productForm.reset();
    } else {
      console.log('Error adding product via HTTP POST');
      const data = await response.json();
      console.log(data);
    }
  } catch (error) {
    console.log('Network error:', error);
  }
});

const renderProducts = (products) => {
  const productList = document.getElementById('productList');
  productList.innerHTML = '';
  products.forEach(product => {
    const li = document.createElement('li');
    li.setAttribute('data-id', product._id);
    li.classList.add('flex', 'justify-center');
    li.innerHTML = `
            <div
  class="border text-card-foreground w-full max-w-sm bg-[#f4f0f7] rounded-lg shadow-lg mb-4"
>
  <div class="p-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-2xl font-bold text-[#6c5b7b]">${product.title}</h2>
      <span class="text-lg font-semibold text-[#9a7d9a]">$ ${product.price}</span>
    </div>
    <p class="text-[#8d7b99] mb-4">
      ${product.description}
    </p>
    <div class="flex items-center justify-between text-sm text-[#9a7d9a] mb-4">
      <span>Product Code: ${product.code} </span>
      <span>Stock: ${product.stock}</span>
    </div>
    <div class="flex items-center justify-between text-sm text-[#9a7d9a]">
      <span>Category: ${product.category}</span>
      <button class="delete-button inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 rounded-full">
        Delete
      </button>
    </div>
  </div>
</div>
        `;
    productList.appendChild(li);
  });
}

socket.on('products', (updatedProducts) => {
  console.log('Products updated via Socket.io', updatedProducts);
  products = updatedProducts;
  renderProducts(products);
});

// Manejar la eliminación de productos mediante HTTP DELETE
document.getElementById('productList').addEventListener('click', async (e) => {

  if (e.target.classList.contains('delete-button')) {
    const productItem = e.target.closest('li');
    const productId = productItem.getAttribute('data-id');

    try {
      const response = await fetch('/realtimeproducts', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: productId }),
      });

      if (!response.ok) {
        console.log('id:', productId);
        console.log('Error deleting product via HTTP DELETE');
      }
    } catch (error) {
      console.log('Network error:', error);
    }
  }
});
