// Get elements
const cartButton = document.querySelector('.cart-button');
const cartBadge = document.querySelector('.cart-badge');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.close');
const buyButton = document.querySelector('.buy-btn');
const cartItemsList = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const itemsGrid = document.querySelector('.items-grid');
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
const addBalanceButton = document.querySelector('.balance_button');
const balanceModal = document.querySelector('.balance_modal');
const modalCloseBalance = document.querySelector('.balance_close');
const balance = document.querySelector('.balance');
const depositButton = document.querySelector('.depositButton');
const depositAmount = document.querySelector('.depositAmount');
const removeButton = document.querySelectorAll('.remove-item-btn');

let items = [
{
    id: 1,
    name: 'Apple',
    price: 1,
    picture: "https://www.shutterstock.com/image-photo/red-apple-isolated-on-white-600nw-1727544364.jpg",
},
{
    id: 2,
    name: 'Banana',
    price: 10,
    picture: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banana-Single.jpg/2324px-Banana-Single.jpg",
},
{
    id: 3,
    name: 'Orange',
    price: 15,
    picture: "https://t3.ftcdn.net/jpg/00/56/01/00/360_F_56010077_UA98ADMw95rEB2hCuAlFOJkjdirrAAPV.jpg",
},
{
    id: 4,
    name: 'Cherry',
    price: 4,
    picture: "https://images.unsplash.com/photo-1528821154947-1aa3d1b74941?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hlcnJpZXN8ZW58MHx8MHx8fDA%3D",
},
{
    id: 5,
    name: 'Potato',
    price: 2,
    picture: "https://t3.ftcdn.net/jpg/00/85/79/92/360_F_85799278_0BBGV9OAdQDTLnKwAPBCcg1J7QtiieJY.jpg",
},
{
    id: 6,
    name: 'Carrot',
    price: 3,
    picture: "https://t4.ftcdn.net/jpg/02/28/90/67/360_F_228906712_r4bb71gSmKvyDHq54JvjXAhKWpQiqWvX.jpg",
},
];
    
    let cart = [];
    let badgeCount = 0;
    let cartBalance = 0;
    let walletAmount = 100;

// An example function that creates HTML elements using the DOM.
function fillItemsGrid() {
    for (const item of items) {
        let itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.innerHTML = `
            <img src="${item.picture}" alt="${item.name}">
            <h2>${item.name}</h2>
            <p>$${item.price}</p>
            <button class="add-to-cart-btn" data-id="${item.id}">Add to cart</button>
        `;

        itemElement.querySelector('.add-to-cart-btn').addEventListener('click', function(event){
            addToCart(item.name);
            badgeCount++;
            cartBadge.textContent = badgeCount;
    })
    itemsGrid.appendChild(itemElement);
}
}

function addToCart(itemName) {
    
    const index = items.findIndex((item) => item.name.toLowerCase() === itemName.toLowerCase());

    const item = items[index];
    
    
    const cartIndex = cart.findIndex((item) => item.name.toLowerCase() === itemName.toLowerCase());
    if (cartIndex == -1) {
        const cartItem = Object.assign({},item);
        cartItem.amount = 1;
        cartBalance = cartBalance + cartItem.price;
        cart.push(cartItem);
        
    }
    else {
        const cartItem = cart[cartIndex]
        cartItem.amount++;
        cartBalance = cartBalance + cartItem.price;
    }

}

function displayCartItems() {
    // Clear previous content
    cartItemsList.innerHTML = '';

    // Iterate over each item in the cart and create HTML elements to display them
    cart.forEach((item) => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <span>${item.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span>${item.amount}</span>
            <button class="remove-item-btn" data-id="${item.id}">-</button>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Price: ${(item.price * item.amount).toFixed(2)}</span>
        `;
        cartItemElement.querySelector('.remove-item-btn').addEventListener('click', function(event){
            remove(item.name);
            badgeCount--;
            cartBadge.textContent = badgeCount;
            displayCartItems();
    })
        cartItemsList.appendChild(cartItemElement);
    });
}

function remove(itemName)
{
    const index = cart.findIndex((item) => item.name.toLowerCase() === itemName.toLowerCase());
    const item = cart[index];
        if (item.amount == 1) {
            cart.splice(index, 1);
            cartBalance = cartBalance - item.price;
            
            }
        else {
            item.amount--;
            cartBalance = cartBalance - item.price;
            
        }

    
    
    cartTotal.textContent = cartBalance.toFixed(2);
        
}

// Adding the .show-modal class to an element will make it visible
// because it has the CSS property display: block; (which overrides display: none;)
// See the CSS file for more details.
function toggleModal() {
  modal.classList.toggle('show-modal');
  cartTotal.textContent = cartBalance.toFixed(2);
  cartBadge.textContent = badgeCount;
  displayCartItems();
}

function toggleBalanceModal(){
    balanceModal.classList.toggle('show-modal');
}

function buy()
{
    if(cart.length == 0){
        alert("Your cart is empty!");
        return;
    }
    
    
    let result = confirm("Are you sure you want to buy items from your cart?");
    if (result === true) {
        if (walletAmount >= cartBalance) {
            walletAmount = walletAmount - cartBalance;
            cart.splice(0, cart.length);
            cartBalance = 0;
            alert("You bought items from cart.");
            balance.textContent = walletAmount.toFixed(2);
            cartTotal.textContent = cartBalance.toFixed(2);
            badgeCount = 0;
            cartBadge.textContent = badgeCount;
            toggleModal();
            return;
        }
        else {
            alert("You don't have enough money.");
            toggleModal();
            return;
        }
    }
   
}

    function deposit()
    {
        
        if(depositAmount.value == "")
        {
            alert("Enter a number you want to deposit.");
            
        }
        else{

        let number = parseFloat(depositAmount.value);
        let result = confirm(`Are you sure you want to deposit $${number}?`);

        if(result == true)
        {
            alert("You deposited money.");
            toggleBalanceModal();
            walletAmount = parseFloat(walletAmount) + number;
            balance.textContent = walletAmount.toFixed(2);
            depositAmount.value = "Enter amount";
            return;
        }
        else{
            return;
        }
    }
    }
// Call fillItemsGrid function when page loads
fillItemsGrid();
balance.textContent = walletAmount.toFixed(2);

// Example of DOM methods for adding event handling
cartButton.addEventListener('click', toggleModal);
modalClose.addEventListener('click', toggleModal);
addBalanceButton.addEventListener('click', toggleBalanceModal);
modalCloseBalance.addEventListener('click', toggleBalanceModal);
buyButton.addEventListener('click', buy);
depositButton.addEventListener('click', deposit);