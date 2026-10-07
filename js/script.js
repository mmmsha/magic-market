const productList = document.getElementById('product-list');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

const cart = [];

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

    renderCart();
}

function renderCart() {
    cartItems.textContent = '';

    let total = 0;

    cart.forEach((item) => {
        const cartItem = document.createElement('div');

        const name = document.createElement('p');
        name.textContent = `${item.name} — ${item.quantity} шт.`;

        const price = document.createElement('p');
        const itemTotal = item.price * item.quantity;
        price.textContent = `${itemTotal} ₽`;

        cartItem.append(name, price);
        cartItems.append(cartItem);

        total += itemTotal;
    });

    cartTotal.textContent = total;
}