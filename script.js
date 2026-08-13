// Product data

const products = [
    {
        id: 1,
        name: "Apple",
        category: "Fruit",
        price: 180,
        image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6",
        description: "Fresh and crispy apples. Perfect for a healthy snack."
    },

    {
        id: 2,
        name: "Banana",
        category: "Fruit",
        price: 60,
        image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e",
        description: "Fresh yellow bananas that are naturally sweet and healthy."
    },

    {
        id: 3,
        name: "Orange",
        category: "Fruit",
        price: 120,
        image: "https://images.unsplash.com/photo-1547514701-42782101795e",
        description: "Juicy and fresh oranges rich in Vitamin C."
    },

    {
        id: 4,
        name: "Mango",
        category: "Fruit",
        price: 150,
        image: "https://images.unsplash.com/photo-1553279768-865429fa0078",
        description: "Sweet and delicious fresh mangoes."
    },

    {
        id: 5,
        name: "Tomato",
        category: "Vegetable",
        price: 50,
        image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337",
        description: "Fresh red tomatoes suitable for cooking and salads."
    },

    {
        id: 6,
        name: "Carrot",
        category: "Vegetable",
        price: 70,
        image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37",
        description: "Fresh crunchy carrots full of nutrients."
    },

    {
        id: 7,
        name: "Potato",
        category: "Vegetable",
        price: 45,
        image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655",
        description: "Fresh potatoes perfect for everyday cooking."
    },

    {
        id: 8,
        name: "Broccoli",
        category: "Vegetable",
        price: 100,
        image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc",
        description: "Fresh green broccoli packed with nutrients."
    }
];


// Get cart from localStorage

let cart = JSON.parse(localStorage.getItem("cart")) || [];


// Display products

const productContainer = document.getElementById("productContainer");

if (productContainer) {
    displayProducts(products);
}


function displayProducts(productList) {

    productContainer.innerHTML = "";

    productList.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">

            <h3>${product.name}</h3>

            <p>${product.category}</p>

            <p class="price">₹${product.price} / kg</p>

            <button onclick="viewProduct(${product.id})">
                View Details
            </button>

            <button onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        `;

        productContainer.appendChild(card);
    });
}


// View product details

function viewProduct(id) {

    localStorage.setItem("selectedProduct", id);

    window.location.href = "product.html";
}


// Display product details

const productDetails = document.getElementById("productDetails");

if (productDetails) {

    const id = localStorage.getItem("selectedProduct");

    const product = products.find(item => item.id == id);

    if (product) {

        productDetails.innerHTML = `
            <div class="details-box">

                <img src="${product.image}" alt="${product.name}">

                <div class="details-info">

                    <h1>${product.name}</h1>

                    <h2 class="price">
                        ₹${product.price} / kg
                    </h2>

                    <p>
                        <strong>Category:</strong>
                        ${product.category}
                    </p>

                    <p>${product.description}</p>

                    <button onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>

                </div>

            </div>
        `;
    }
}


// Add product to cart

function addToCart(id) {

    const product = products.find(item => item.id === id);

    const existingProduct = cart.find(item => item.id === id);

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    saveCart();

    alert(product.name + " added to cart!");
}


// Save cart

function saveCart() {

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
}


// Cart count

function updateCartCount() {

    const cartCount = document.getElementById("cartCount");

    if (cartCount) {

        let count = 0;

        cart.forEach(item => {
            count += item.quantity;
        });

        cartCount.textContent = count;
    }
}

updateCartCount();


// Display cart

const cartContainer = document.getElementById("cartContainer");

if (cartContainer) {

    displayCart();
}


function displayCart() {

    cartContainer.innerHTML = "";

    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <h3>Your cart is empty.</h3>
        `;

        document.getElementById("cartTotal").textContent = "0";

        return;
    }

    let total = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `

            <img src="${item.image}" alt="${item.name}">

            <div>
                <h3>${item.name}</h3>
                <p>₹${item.price} / kg</p>
            </div>

            <div class="quantity">

                <button onclick="changeQuantity(${item.id}, -1)">
                    -
                </button>

                <span>${item.quantity}</span>

                <button onclick="changeQuantity(${item.id}, 1)">
                    +
                </button>

            </div>

            <p>
                ₹${item.price * item.quantity}
            </p>

            <button
                class="remove-btn"
                onclick="removeFromCart(${item.id})">
                Remove
            </button>
        `;

        cartContainer.appendChild(cartItem);
    });

    document.getElementById("cartTotal").textContent = total;
}


// Change quantity

function changeQuantity(id, amount) {

    const item = cart.find(product => product.id === id);

    if (!item) {
        return;
    }

    item.quantity += amount;

    if (item.quantity <= 0) {

        cart = cart.filter(product => product.id !== id);

    }

    saveCart();

    displayCart();
}


// Remove item

function removeFromCart(id) {

    cart = cart.filter(product => product.id !== id);

    saveCart();

    displayCart();
}


// Search

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("input", function () {

        const searchText = this.value.toLowerCase();

        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchText) ||
            product.category.toLowerCase().includes(searchText)
        );

        displayProducts(filteredProducts);

    });
}


// Checkout

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }

    alert("Thank you for shopping with FreshMart!");

    cart = [];

    saveCart();

    displayCart();
}