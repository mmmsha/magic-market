const productList = document.getElementById('product-list');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

const checkoutButton = document.getElementById('checkout-button');
const orderSection = document.getElementById('order-section');
const orderForm = document.getElementById('order-form');
const orderMessage = document.getElementById('order-message');

const savedCart = localStorage.getItem('cart');
let cart = savedCart ? JSON.parse(savedCart) : [];

products.forEach((product) => {
    const card = document.createElement('article');

    const image = document.createElement('img');
    image.src = product.image;
    image.alt = product.name;

    const title = document.createElement('h3');
    title.textContent = product.name;

    const price = document.createElement('p');
    price.textContent = `${product.price} ₽`;

    const button = document.createElement('button');
    button.textContent = 'Добавить в корзину';
    button.type = 'button';

    button.addEventListener('click', () => {
        addToCart(product);
    });

    card.append(image, title, price, button);
    productList.append(card);
});

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(product) {
    const cartProduct = cart.find((item) => item.id === product.id);

    if (cartProduct) {
        cartProduct.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    saveCart();
    renderCart();
}

function increaseQuantity(id) {
    const cartProduct = cart.find((item) => item.id === id);

    if (cartProduct) {
        cartProduct.quantity += 1;
    }

    saveCart();
    renderCart();
}

function decreaseQuantity(id) {
    const cartProduct = cart.find((item) => item.id === id);

    if (cartProduct && cartProduct.quantity > 1) {
        cartProduct.quantity -= 1;
    }

    saveCart();
    renderCart();
}

function removeFromCart(id) {
    const productIndex = cart.findIndex((item) => item.id === id);

    if (productIndex !== -1) {
        cart.splice(productIndex, 1);
    }

    saveCart();
    renderCart();
}

function renderCart() {
    cartItems.textContent = '';

    let total = 0;

    cart.forEach((item) => {
        const cartItem = document.createElement('div');

        const name = document.createElement('p');
        name.textContent = item.name;

        const quantity = document.createElement('p');
        quantity.textContent = `Количество: ${item.quantity}`;

        const price = document.createElement('p');
        const itemTotal = item.price * item.quantity;
        price.textContent = `${itemTotal} ₽`;

        const decreaseButton = document.createElement('button');
        decreaseButton.textContent = '−';
        decreaseButton.type = 'button';

        decreaseButton.addEventListener('click', () => {
            decreaseQuantity(item.id);
        });

        const increaseButton = document.createElement('button');
        increaseButton.textContent = '+';
        increaseButton.type = 'button';

        increaseButton.addEventListener('click', () => {
            increaseQuantity(item.id);
        });

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Удалить';
        removeButton.type = 'button';

        removeButton.addEventListener('click', () => {
            removeFromCart(item.id);
        });

        cartItem.append(
            name,
            quantity,
            price,
            decreaseButton,
            increaseButton,
            removeButton
        );

        cartItems.append(cartItem);

        total += itemTotal;
    });

    cartTotal.textContent = total;
}

checkoutButton.addEventListener('click', () => {
    orderSection.hidden = false;
});

orderForm.addEventListener('submit', (event) => {
    event.preventDefault();

    orderMessage.hidden = false;
});

renderCart();