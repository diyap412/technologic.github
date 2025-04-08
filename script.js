const cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(product) {
    const existing = cart.find(item => item.name === product.name);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    saveCart();
    updateCartCount();
    alert(`${product.name} added to cart`);
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.getElementById('cart-count');
    if (cartCount) cartCount.textContent = count;
}

function displayCartItems() {
    const itemsContainer = document.getElementById('cart-items');
    const summaryContainer = document.getElementById('cart-summary');
    if (!itemsContainer || !summaryContainer) return;

    itemsContainer.innerHTML = '';
    summaryContainer.innerHTML = '';

    if (cart.length === 0) {
        itemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.quantity * item.price;
        total += itemTotal;

        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <div>
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p>Price: $${item.price.toFixed(2)}</p>
                <p>Quantity: ${item.quantity}</p>
            </div>
            <button onclick="removeFromCart('${item.name}')">Remove</button>
        `;
        itemsContainer.appendChild(itemDiv);
    });

    summaryContainer.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
}

function removeFromCart(name) {
    const index = cart.findIndex(item => item.name === name);
    if (index !== -1) {
        cart.splice(index, 1);
        saveCart();
        updateCartCount();
        displayCartItems();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    displayCartItems();

    const buttons = document.querySelectorAll('.add-to-cart');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const product = {
                name: button.dataset.name,
                description: button.dataset.description,
                price: parseFloat(button.dataset.price),
                image: button.dataset.image
            };
            addToCart(product);
        });
    });

    const checkout = document.getElementById('checkout-button');
    if (checkout) {
        checkout.addEventListener('click', () => {
            alert('Thank you for your purchase!');
            localStorage.removeItem('cart');
            window.location.reload();
        });
    }
});
