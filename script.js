const btnCart = document.querySelector('#cart-icon');
const cart = document.querySelector('.cart');
const btnClose = document.querySelector('#cart-close');

btnCart.addEventListener('click', () => {
    cart.classList.add('cart-active');
});


btnClose.addEventListener('click', () => {
    cart.classList.remove('cart-active');
});



document.addEventListener('DOMContentLoaded', loadFood);

function loadFood() {
    loadContent();
}


function loadContent() {
    //Remove Food Item From Cart
    let btnRemove = document.querySelectorAll('.cart-remove');
    btnRemove.forEach((btn) => {
        btn.addEventListener('click', removeItem);
    });

    //Product Item Change Event
    let qtyElement = document.querySelectorAll('.cart-quantity');
    qtyElement.forEach((input) => {
        input.addEventListener('click', changeQty);
    });

    //product cart 
    let cartBtn = document.querySelectorAll(".add-cart");
    cartBtn.forEach((btn) => {
        btn.addEventListener('click', addCart);
    });

    updatetotal();
}

//remove Item
function removeItem() {
    if (confirm('Are You Sure to Remove')) {
        let title = this.parentElement.querySelector('.cart-food-title').innerHTML;
        itemList = itemList.filter(el => el.title != title)
        this.parentElement.remove();
        loadContent();
    }
}



//Change Quantity
function changeQty() {
    if (isNaN(this.value) || this.value < 1) {
        this.value = 1;
    }
    loadContent();
}


let itemList = [];


//Add Cart
function addCart() {
    let food = this.parentElement;
    let title = food.querySelector('.food-title').innerHTML;
    let price = food.querySelector('.food-price').innerHTML;
    let imgSrc = food.querySelector('.food-img').src;
    let newProduct = { title, price, imgSrc }

    //Check Product already Exist in Cart
    if (itemList.find(el => el.title == newProduct.title)) {
        alert("Product Already in Cart");
        return
    } else {
        itemList.push(newProduct);
    }

    let newProductElement = creatCartProdect(title, price, imgSrc);
    let element = document.createElement('div');
    element.innerHTML = newProductElement;
    let cartBasket = document.querySelector('.cart-content');
    cartBasket.append(element);
    loadContent();
}

function creatCartProdect(title, price, imgSrc) {
    return `
    <div class="cart-box">
         <img src="${imgSrc}" class="cart-img">
        <div class="detail-box">
            <div class="cart-food-title">${title}</div>
              <div class="price-box">
               <div class="cart-price">${price}</div>
              <div class="cart-amt">${price}</div>
            </div>
         <input type="number" value="1" class="cart-quantity">
        </div>
         <ion-icon name="trash" class="cart-remove"></ion-icon>
    </div>`;
}

function updatetotal() {
    const cartItems = document.querySelectorAll('.cart-box');
    const totalValue = document.querySelector('.total-price');

    let total = 0;

    cartItems.forEach(product => {
        let priceElement = product.querySelector('.cart-price');
        let price = parseFloat(priceElement.innerHTML.replace("Rs.", ""));
        let qty = product.querySelector('.cart-quantity').value;
        total += (price * qty);
        product.querySelector('.cart-amt').innerText = "Rs." + (price * qty);
    });

    totalValue.innerHTML = 'Rs.' + total;

    //Add Product Count in Cart Icon
    const cartCount = document.querySelector('.cart-count');
    let count = itemList.length;
    cartCount.innerHTML = count;

    if (count = 0) {
        cartCount.style.display = 'none';
    } else {
        cartCount.style.display = 'block';
    }
}




