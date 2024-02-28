var products = [
  {
    productImage:
      "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/l/r/h/-original-imags2yrpzcfyzzr.jpeg?q=70&crop=false",
    productName: "REDMI 12",
    productPrice: "₹10,499",
    productDetail: "REDMI 12 (Pastel Blue, 128 GB)  (6 GB RAM)",
    qyt: 1,
    added: false,
  },
  {
    productImage:
      "https://rukminim2.flixcart.com/image/128/128/xif0q/mobile/w/s/d/-original-imagxtngwgcfwvy5.jpeg?q=70&crop=false",
    productName: "Infinix HOT 40i",
    productPrice: "₹9,999",
    productDetail: "Infinix HOT 40i (Starlit Black, 256 GB)  (8 GB RAM)",
    qyt: 1,
    added: false,
  },
  {
    productImage:
      "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/a/h/w/-original-imags5yc5hgkscbr.jpeg?q=70&crop=false",
    productName: "POCO M6 Pro 5G",
    productPrice: "₹9,999",
    productDetail: "POCO M6 Pro 5G (Power Black, 128 GB)  (4 GB RAM)",
    qyt: 1,
    added: false,
  },
  {
    productImage:
      "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/w/1/p/-original-imagu8wbamw9eu94.jpeg?q=70&crop=false",
    productName: "vivo Y17s",
    productPrice: "₹10,499",
    productDetail: "vivo Y17s (Glitter Purple, 64 GB)  (4 GB RAM)",
    qyt: 1,
    added: false,
  },
  {
    productImage:
      "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/j/i/z/g14-payf0011in-motorola-original-imagrtypz3qqy3hg.jpeg?q=70&crop=false",
    productName: "Motorola g14",
    productPrice: "₹8,499",
    productDetail: "Motorola g14 (Sky Blue, 128 GB)  (4 GB RAM)",
    qyt: 1,
    added: false,
  },
];

// load To productsContainer id

function loadProducts() {
  var productsContainer = document.getElementById("productsContainer");
  var clattur = "";

  products.forEach(function (product) {
    clattur += `
      <div class="product-card">
        <div class="product-image">
            <img src=${product.productImage} alt="product-image" />
        </div>
        <div class="product-content">
          <h2>${product.productName}</h2>
            <p class="price">${product.productPrice}</p>
            <p class="detail">${product.productDetail}</p>
            <button onclick="addToCart('${product.productName}')">Add to Cart</button>
          </div>
        </div>
    `;
  });

  productsContainer.innerHTML = clattur;
}

// show shopping card

function showShoppingCard() {
  var shoppingCard = document.querySelector(".shopping-card");
  var cardBtn = document.querySelector("#cart");

  flag = 0;

  // Toggle shopping card on cart button click
  cardBtn.addEventListener("click", function () {
    if (flag == 0) {
      shoppingCard.style.top = "10vh";
      flag = 1;
    } else {
      shoppingCard.style.top = "-60%";
      flag = 0;
    }
  });

  // Hide shopping card on any click outside the card or cart button
  document.addEventListener("click", function (event) {
    var isClickInsideCard = shoppingCard.contains(event.target);
    var isClickOnCartButton = cardBtn.contains(event.target);

    if (!isClickInsideCard && !isClickOnCartButton && flag == 1) {
      shoppingCard.style.top = "-60%";
      flag = 0;
    }
  });
}

// add to card products
function addToCart(productName) {
  // Find the product to add by matching the product name
  var productToAdd = products.find(function (product) {
    return product.productName === productName;
  });

  // If the product is found and not already added, update the 'added' property
  if (productToAdd && !productToAdd.added) {
    productToAdd.added = true;

    // Now, call the function to update the cart display
    updateCartDisplay();

    // Save to localStorage
    saveToLocalStorage(products);
  }
}

// update localStorage with current products
function saveToLocalStorage(products) {
  localStorage.setItem("cartProducts", JSON.stringify(products));
}

function updateQuantity(productName, action) {
  var productToUpdate = products.find(function (product) {
    return product.productName === productName;
  });

  if (productToUpdate) {
    if (action === "subtract" && productToUpdate.qyt > 1) {
      productToUpdate.qyt--;
    } else if (action === "add") {
      productToUpdate.qyt++;
    }

    updateCartDisplay();
  }
}

// Function to calculate total price of added products in the cart
function calculateTotalPrice() {
  var total = 0;

  // Loop through added products and calculate total
  products.forEach(function (product) {
    if (product.added) {
      total +=
        parseFloat(product.productPrice.replace("₹", "").replace(",", "")) *
        product.qyt;
    }
  });

  return total;
}

// Function to update total amount in HTML
function updateTotalAmount() {
  var totalAmountElement = document.querySelector(".amount");
  var total = calculateTotalPrice();
  totalAmountElement.textContent = total.toFixed(2); // Show total amount with two decimal places
}

function updateCartDisplay() {
  var addToCartContainer = document.querySelector("#addToCartContainer");
  addToCartContainer.innerHTML = ""; // Clear the cart container

  var cartProdContainer = document.querySelector("#cartProdContainer");
  cartProdContainer.innerHTML = ""; // Clear the cart container

  // Filter products that are added to the cart
  var addedProducts = products.filter(function (product) {
    return product.added === true;
  });

  // Display the added products in the cart container
  addedProducts.forEach(function (addedProd) {
    addToCartContainer.innerHTML += `
      <div class="add-product-card">
        <div class="product-image">
          <img src=${addedProd.productImage} alt="product-image" />
        </div>
        <div class="product-content">
          <h2>${addedProd.productName}</h2>
          <p class="price">${addedProd.productPrice}</p>
          <p class="detail">${addedProd.productDetail}</p>
          <button onclick="removeFromCart('${addedProd.productName}')">Remove</button>
        </div>
      </div>`;
  });

  // Display the added products in the cart container
  addedProducts.forEach(function (addedProd) {
    cartProdContainer.innerHTML += `
      <div class="cart-card">
        <div class="image-wrapper">
          <img src=${addedProd.productImage} alt="product-image" />
        </div>
        <div class="content-wrapper">
          <div class="prod-title">
            <h2>${addedProd.productName}</h2>
          </div>
          <div class="prod-desc">
            <p>${addedProd.productDetail}</p>
          </div>
        </div>
        <div class="qyt-wrapper">
          <span class="qyt-heading">
            <h2>Quantity</h2>
          </span>
          <span class="remove-qyt" onclick="updateQuantity('${addedProd.productName}', 'subtract')">
            <i class="ri-subtract-fill"></i>
          </span>
          <span class="qyt">
            <h3>${addedProd.qyt}</h3>
          </span>
          <span class="add-qyt" onclick="updateQuantity('${addedProd.productName}', 'add')">
            <i class="ri-add-line"></i>
          </span>
        </div>
        <div class="price">
          <h2>${addedProd.productPrice}</h2>
        </div>
        <div class="close-prod" onclick="removeFromCart('${addedProd.productName}')">
          <i class="ri-close-line"></i>
        </div>
      </div>`;
  });

  // Update total amount
  updateTotalAmount();
}

function removeFromCart(productName) {
  // Find the product to remove by matching the product name
  var productToRemove = products.find(function (product) {
    return product.productName === productName;
  });

  // If the product is found, update the 'added' property and call the function to update the cart display
  if (productToRemove) {
    productToRemove.added = false;
    updateCartDisplay();

    // Save to localStorage after removing from cart
    saveToLocalStorage(products);
  }
}
// load products from localStorage on page load
function loadProductsFromLocalStorage() {
  var savedProducts = localStorage.getItem("cartProducts");
  if (savedProducts) {
    products = JSON.parse(savedProducts);
    updateCartDisplay();
  }
}

loadProductsFromLocalStorage();
loadProducts();
showShoppingCard();
