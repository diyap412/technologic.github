const cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(product) {
    const existingProduct = cart.find(item => item.name === product.name);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({...product, quantity: 1});
    }

    updateCartCount();
    saveCart();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }
}

function displayCartItems() {
    const cartItemsElement = document.getElementById('cart-items');
    const cartSummaryElement = document.getElementById('cart-summary');

    if (!cartItemsElement || !cartSummaryElement) return;

    cartItemsElement.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsElement.innerHTML = '<p>Your cart is empty.</p>';
        cartSummaryElement.innerHTML = '';
        return;
    }

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.innerHTML = `
            <div>
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p>Price: $${item.price.toFixed(2)}</p>
                <p>Quantity: ${item.quantity}</p>
            </div>
            <button onclick="removeFromCart('${item.name}')">Remove</button>
        `;
        cartItemsElement.appendChild(cartItem);
    });

    cartSummaryElement.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
}

function removeFromCart(productName) {
    const index = cart.findIndex(item => item.name === productName);
    if (index !== -1) {
        cart.splice(index, 1);
        saveCart();
        displayCartItems();
        updateCartCount();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    displayCartItems();
});
