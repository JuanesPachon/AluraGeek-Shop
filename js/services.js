const productsList = async () => {
  try {
    const res = await fetch("http://localhost:3000/products");
    return await res.json();
  } catch (err) {
    return console.log(err);
  }
};

const createProduct = async (name, price, image) => {
  try {
    return await fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        price,
        image,
      }),
    });
  } catch (err) {
    return console.log(err);
  }
};

const deleteProduct = async (productId) => {
  try {
    return await fetch(`http://localhost:3000/products/${productId}`, {
      method: "DELETE",
    });
  } catch (err) {
    console.error(err);
  }
};

export default {
  productsList,
  createProduct,
  deleteProduct,
};
