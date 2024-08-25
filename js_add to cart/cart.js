// let iconCart= document('.icon-cart ')
let closeCart = document.querySelector('.close')
let body = document.querySelector('body');
let listProductHTML= document.querySelector('.ListProduct');
let ListCartHTML = document.querySelector('.ListCart');
let iconCartSpan = document.querySelector('.cart-icon span');

let ListProduct = [];
let carts = [];



// iconCart.addEventListener('click', ()=>{
//     body.classList.toggle('showCart')

// })

// closeCart.addEventListener('click', ()=>{
//     body.classList.toggle('showCart')
// })

const  addDataToHTML =() => {
    listProductHTML.innerHTML = '';
    if(ListProduct.length> 0){
      ListProduct.forEach(product => {
let newProduct = document.createElement('div')
newProduct.classList.add('item');
newProduct.dataset.id = product.id;
newProduct.innerHTML = `
<img src="${product.image}" alt="">
<h2>${product.name}</h2>
<div class="price">${product.price}</div>
<button class="addCart">
    Add to cart
</button>
 `;
 listProductHTML.appendChild(newProduct)
      })  
    }
}

listProductHTML.addEventListener('click', (event) =>{
 let positionClick = event.target;
 if(positionClick.classList.contains('addCart')){
let product_id= positionClick.parentElement.dataset.id;
addToCart(product_id)
 }
})

const addToCart = (product_id) => {
let positionThisProductInCart = carts.findIndex((value) =>value.product_id == product_id);
  if(carts.length<=0){
  carts = [{
   product_id: product_id,
    quantity:1
  }]
}else if(positionThisProductInCart < 0){
carts.push({
product_id: product_id,
quantity:1
});
}else{
  carts[positionThisProductInCart].quantity =  carts[positionThisProductInCart].quantity +1;
}
addCartToHTML();
addCartToMemory();
}
const addCartToMemory = () => {
  localStorage.setItem('carts',JSON.stringify(carts));
}
const addCartToHTML = () => {
ListCartHTML.innerHTML = '';
let totalQuantity = 0;
if(carts.length> 0){
  totalQuantity = totalQuantity+carts.quantity;
  carts.forEach(carts => {
    let newCart = document.createElement('div');
newCart.classList.add('.item');
newCart.dataset.id = carts.product_id;
let positionProduct = ListProduct.findIndex((value)=> value.id == carts.product_id);
let info = ListProduct[positionProduct];
newCart.innerHTML = `
<div class="item">
    <div class="image">
            <img src="${info.image}" alt="">
        
    </div>
    <div class="name">
    ${info.name}
    </div>
    <div class="totalPrice">
    $${info.price * carts.quantity}
    </div>
    <div class="quantity">
        <span class="minus"><</span>
        <span>${carts.quantity}</span>
        <span class="plus">></span>


    </div>
</div>
`;
ListCartHTML.appendChild(newCart);
  })
}
iconCartSpan.innerText=totalQuantity;
}
ListCartHTML.addEventListener('click',(event) =>{
  let positionClick = event.target;
  if(positionClick.classList.contains('minus') || positionClick.classList.contains('minus')){
let product_id = positionClick.parentElement.dataset.id;
let type = 'minus';
if(positionClick.classList.contains('plus')){
  type = 'plus'
}
changeQuantity(product_id, type);
  }
})
const changeQuantity = (product_id, type) => {
  let positionItemInCart = carts.findIndex((value) => value.product_id = product_id)
  if(positionItemInCart >= 0){
    switch(type){
      case 'plus':
carts[positionItemInCart].quantity = carts[positionItemInCart].quantity + 1;
      break;

      default:
let  valueChange = carts[positionItemInCart].quantity -1;
if(valueChange>0){
  carts[positionItemInCart].quantity = valueChange;
}else{
  carts.splice(positionItemInCart, 1);
}
      break;
    }
  }
  addCartToMemory();
  addCartToHTML();
}
const initApp = () => {
// get product from json
fetch('product.json')
.then(Response=> Response.json())
.then(data =>{
    ListProduct = data;
    console.log(ListProduct);
    addDataToHTML();

  //get cart from memeory
  if(localStorage.getItem('carts')){
    carts = JSON.parse(localStorage.getItem('carts'));
    addCartToHTML();
  }
})
}
initApp();