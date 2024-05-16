import servicesProducts from "./services.js";

const emptyProducts = document.querySelector(".main__empty-products");
const cardContainer = document.querySelector(".products__container");
const form = document.querySelector(".form");
const productsSection = document.querySelector(".main__products");

verifyCards();

const createCard = (name, price, image, id) => {
  const card = document.createElement("article");
  card.classList.add("products__card");

  card.innerHTML = `

      <img class="card__image" src="${image}" alt="product image">
      <h3 class="card__name">${name}</h3>
      <div class="card__container">
        <p class="card__price">$${price}</p>
        <img class="card__delete-icon" data-id="${id}" src="img/delete.png" alt="delete icon">
      </div>`;

  cardContainer.appendChild(card);
  return card;

};

const render = async () => {
  try {
    const productList = await servicesProducts.productsList();

    productList.forEach((product) => {
      cardContainer.appendChild(
        createCard(product.name, product.price, product.image, product.id)
      );
    });
  } catch (error) {
    console.log(error);
  }

  verifyCards();
};

render();

document.addEventListener("click", async (event) => {
  if (event.target.classList.contains("card__delete-icon")) {
    event.preventDefault();
    const productId = event.target.dataset.id;
    try {
      await servicesProducts.deleteProduct(productId);
      event.target.closest(".products__card").remove();
      console.log(`Producto con ID ${productId} eliminado correctamente`);
      verifyCards();
      window.location.reload();
    } catch (error) {
      console.error(`Error al eliminar el producto con ID ${productId}:`, error);
    }
  }
});

console.log("funciona")

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const productName = document.querySelector(".form__input--name").value;
  const productPrice = document.querySelector(".form__input--price").value;
  const productImage = document.querySelector(".form__input--image").value;

  if (!isValidUrl(productImage)) {
    const errorMessage = document.querySelector(".form__error-message");
    errorMessage.style.display = "block";
    return;
  }

  servicesProducts
    .createProduct(productName, productPrice, productImage)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
});


function verifyCards() {
  if (cardContainer.children.length === 0) {
    emptyProducts.style.display = "block";
    productsSection.style.display = "none";
  } else {
    emptyProducts.style.display = "none";
    productsSection.style.display = "block";
  }
}

function isValidUrl(url) {
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  return urlRegex.test(url);
}
