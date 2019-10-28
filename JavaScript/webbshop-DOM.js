//Brian Gabriel Bartha Veliz

function Product(id, productName, price, color, size, img){
    this.id = id;
    this.productName = productName;
    this.price = price;
    this.color = color;
    this.size = size;
    this.img = img;
}

let jacket = new Product(1, "Jacket", 300, "brown", "Medium", '<img src="Img/jacka.jpg">');
let tShirt = new Product(2, "tShirt", 50, "black", "Large", '<img src="Img/tshirt.jpg">');
let chain = new Product(3, "Chain", 100, "Gold", "One Size", '<img src="Img/chain.jpg">');
let pants = new Product(4, "Pants", 150, "black", "Medium", '<img src="Img/byx1.jpg">');
let glasses = new Product(5, "Glasses", 100, "Gold", "One Size", '<img src="Img/glass.jpg">');
let clock = new Product(6, "Clock", 135, "Brown", "small", '<img src="/Img/clock.jpg">'); 

let items = [jacket, tShirt, chain, pants, glasses, clock];

function getProduct(b){
    if(b > 0){
        console.log(items[b-1]);
    }else{
        console.log(items);
    }
};
// getProduct();
// getProduct(2);

let basket = {Myitems:[], totalPris:0};
function addToBasket(id, amount){
    for(let i = 0; i< amount; i++){
     basket.Myitems.push(items[id-1])
    }
};
// addToBasket(2, 5);

function getBasket(){
    basket.Myitems.forEach(element => { basket.totalPris += element.price;});
    console.log(basket);
    
};
// getBasket();

function emptyBasket(){
    basket.length = 0;
    console.log(basket);
}
// emptyBasket();

//********************************* Events ************************************** */
//Products Selectors
let clothesBox = document.getElementById("Clothes");
let buyBtn = document.getElementsByClassName("buyBtn");
//Cart Box Selectors
let cartList = document.getElementById("list-items");
let myItems = cartList.getElementsByClassName("item");
let cartDeletBtn = document.getElementsByClassName("delete");
let clearCart = document.getElementById("clearBtn");
//Cart Icon Selectors
let iconCart = document.getElementById("nav7");
let countCart = document.getElementById("countItems");
//Total Price Selectors
let totalPriceV2 = document.getElementById("totalPrice");
let countPrice = 0;

// Open / Close Cart
let cartBox = document.getElementById("cart-Box");
iconCart.addEventListener("click", openCart);
function openCart(e){
    if(cartBox.style.display == "" || cartBox.style.display == "none"){
        cartBox.style.display = "block";
        //Disapear buy Btn When cartBox Open(Fixed);
        for(let i = 0; i< buyBtn.length; i++){
            buyBtn[i].style.display = "none";
        }
        //Quick Fix Quantity position
        let howManyItemsFix = document.getElementsByClassName("SelectQuatity");
        let fixTransparent = Array.from(howManyItemsFix);
        fixTransparent.forEach((element)=>{ element.style.display = "none"});
    }else{
        cartBox.style.display = "none";
        for(let i = 0; i< buyBtn.length; i++){
            buyBtn[i].style.display = "block";
        };
    };
    e.preventDefault();
};

//Adding Info-Box to the Products! 
for(let n = 0; n < clothesBox.children.length; n++){
    if(clothesBox.children[n].children[2].className == items[n].id){
        clothesBox.children[n].children[2].innerHTML = `ID: ${items[n].id} <br>
        Name: ${items[n].productName} <br>
        Price: ${items[n].price} <br>
        Color: ${items[n].color} <br>
        Size: ${items[n].size}`
   };
};

//Add Multiples Event Via Event Deligation :D!
document.addEventListener('click',function(e){
    // Item Delet button 
    if(e.target && e.target.className == 'btn btn-danger btn-sm delete'){
        e.target.parentElement.remove();
        //Minus Count Cart Icon
        countCart.innerHTML -= 1;

        //Minus Count Total
        let testZ = e.target.parentElement.children[3].innerText.replace("Price:", " ")
        let teXZ = parseFloat(testZ);
        countPrice -= teXZ;
        totalPriceV2.innerHTML = countPrice;
     };

    // Clear Cart Items Button 
    if(e.target && e.target.id == 'clearBtn'){
        while (cartList.firstChild) {
            cartList.removeChild(cartList.firstChild);
          }
        // Clear all items (Displayed by Icon Cart)
        countCart.innerHTML = 0;
        // reset Total by Clear button
        countPrice = 0;
        totalPriceV2.innerHTML = countPrice;
    }; 

    //Complete order by Clicking on buy Button
    if(e.target && e.target.id == 'buyBtn'){
        let completeBox = document.getElementById("orderComplete");
        completeBox.style.display = "block";
        //Close Windows of "Succesfully Buyed!"
        completeBox.children[0].onclick = ()=>{
            completeBox.style.display = "none";
        };
        //Clear Cart by Pressing Cart "Buy" Button
        while (cartList.firstChild) {
            cartList.removeChild(cartList.firstChild);
          };
        //Reset Total Price By Pressing Cart "Buy" Button
        countPrice = 0;
        totalPriceV2.innerHTML = countPrice;
        //Reset Cart Icon By Pressing Cart "Buy" Button
        countCart.innerHTML = 0;
        //Reset Value of Quantity once Buyed! :D
        let resetValue = document.querySelectorAll(".AddThisManyItems");
        for(let i = 0; i < resetValue.length; i++){
            resetValue[i].value = 1;
        };
    };
 });

//Adding Items to Cart V2
clothesBox.addEventListener("click", addToCartFunctionV2);
function addToCartFunctionV2(e){
    //Display Quantity Div-Box When "Buy" Circle Btn Pressed
    if(e.target.className == "btn btn-outline-dark buyBtn"){
        let howManyItems = e.target.parentElement.children[3];
        howManyItems.style.display = "block";
    };
    //Add Items By Pressing the Green Add Button & Select Quantity
    if(e.target.className == "btn btn-success buyBtn"){
        // Selecting Quantity of Items
        let ThisManyItems = e.target.previousElementSibling.value;
        //Adding the Items into Cart
        for(let g = 0; g < ThisManyItems; g++){
            for(let i = 0; i < items.length; i++){
                if(e.target.id == items[i].id){
                    let cartList = document.getElementById("list-items");
                    let newItem = document.createElement("div");
                    newItem.className = "item item-wrapper";
                    newItem.innerHTML = `${items[i].img}
                    <h2>${items[i].productName}</h2>
                    <p>ID:${items[i].id}</p> 
                    <p>Price:${items[i].price} </p>
                    <p>Color: ${items[i].color}</p>
                    <span>${items[i].size}</span> <br>
                    <button id="asd123" class="btn btn-danger btn-sm delete">Delete</button>` 
                    cartList.appendChild(newItem);
                    
                    //count Items inside Cart
                    let count = Array.from(cartList.children);
                    countCart.innerHTML = count.length;
    
                    //Total Price of items inside Cart
                    countPrice += items[i].price;
                    totalPriceV2.innerHTML = countPrice;
                };
            };
        };
        //Reset "Succefull Buy" Box once "Buy" circle btn clicked
        let completeBox = document.getElementById("orderComplete");
        completeBox.style.display = "none";
        //Reset Quantity Box
        let howManyItemsReset = e.target.parentElement;
        howManyItemsReset.style.display = "none";
    };
};

//Roligt Upgift! ^ _ ^/
