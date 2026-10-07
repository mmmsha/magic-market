const productList = document.getElementById('product-list');

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

    card.append(image, title, price, button);
    productList.append(card);
});