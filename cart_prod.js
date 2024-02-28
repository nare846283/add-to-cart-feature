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
  }
}
// ... (previous code)

function updateCartDisplay() {
  var cartProdContainer = document.querySelector("#cartProdContainer");
  cartProdContainer.innerHTML = ""; // Clear the cart container

  // Filter products that are added to the cart
  var addedProducts = products.filter(function (product) {
    return product.added === true;
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
        <div class="offer">
          <h2>No Offer</h2>
        </div>
        <div class="close-prod" onclick="removeFromCart('${addedProd.productName}')">
          <i class="ri-close-line"></i>
        </div>
      </div>`;
  });
}

// ... (rest of the code)

function removeFromCart(productName) {
  // Find the product to remove by matching the product name
  var productToRemove = products.find(function (product) {
    return product.productName === productName;
  });

  // If the product is found, update the 'added' property and call the function to update the cart display
  if (productToRemove) {
    productToRemove.added = false;
    updateCartDisplay();
  }
}
