const url="https://dummyjson.com/products"
const mainElem=document.querySelector(".main");
const myBasList=document.querySelector(".basket")

const myBasElem=document.querySelector(".mybas")

const showMyBasElem=document.querySelector(".mybas .disp")





function domRender(url) {
    fetch(url).then(resp=> resp.json()).then(data=>{
        productsobj=data.products
        data.products.forEach(element => {
         mainElem.innerHTML+=`
            <div class="product">
            <div class="image">
                <img src="${element.thumbnail}" alt="">
                <div class="icons">
                    <i onclick="basketrender(${element.id})" class="fa-solid fa-cart-plus"></i>
                </div>

            </div>
            <div class="info">
            <h5>Brand:<span id="productName">${element.brand}</span></h5>
            <p>Model:<span id="productModel">${element.title}</span></p>
            <h3>Price:<span id="productPrice">${element.price}</span></h3>
            </div>
            </div>
            `
        });
    })
}

domRender(url)


myBasList.addEventListener("click",()=>{
    myBasElem.classList.toggle("active")
})

let productsobj=[]
let mycarts=[]
let mystorage=JSON.parse(localStorage.getItem("myproduct"));

   if (mystorage) {
        mycarts=mystorage
        mycarts.forEach(item=>{
            showMyBasElem.innerHTML+=`
                 <div class="product">
                 <button onclick="deleteElem(${item.id})"><i class="fa-solid fa-xmark"></i></button>
                 <div class="image">
                 <img src="${item.thumbnail}" alt="">
                 <div class="info">
                 <h5>Brand:<span id="productName">${item.brand}</span></h5>
                 <p>Model:<span id="productModel">${item.title}</span></p>
                 <h3>Price:<span id="productPrice">${item.price}</span></h3>
                 </div>
                 </div>
                 `
             });
    }

function basketrender(id) {
    let foundBasket=productsobj.find(item=> item.id===id)

    mycarts.push(foundBasket)

    localStorage.setItem("myproduct",JSON.stringify(mycarts))
    showMyBasElem.innerHTML=""
 
        mycarts.forEach(item=>{
            showMyBasElem.innerHTML+=`
                 <div class="product">
                 <button onclick="deleteElem(${item.id})"><i class="fa-solid fa-xmark"></i></button>
                 <div class="image">
                 <img src="${item.thumbnail}" alt="">
                 <div class="info">
                 <h5>Brand:<span id="productName">${item.brand}</span></h5>
                 <p>Model:<span id="productModel">${item.title}</span></p>
                 <h3>Price:<span id="productPrice">${item.price}</span></h3>
                 </div>
                 </div>
                 `
             });
    }

    function deleteElem(id) {
        mycarts.forEach((item, index) => {
            if (item.id === id) {
                mycarts.splice(index, 1);
                localStorage.setItem("myproduct",JSON.stringify(mycarts))
                showMyBasElem.innerHTML=""
                mycarts.forEach(elem=>{
                    showMyBasElem.innerHTML+=`
                         <div class="product">
                         <button onclick="deleteElem(${elem.id})"><i class="fa-solid fa-xmark"></i></button>
                         <div class="image">
                         <img src="${elem.thumbnail}" alt="">
                         <div class="info">
                         <h5>Brand:<span id="productName">${elem.brand}</span></h5>
                         <p>Model:<span id="productModel">${elem.title}</span></p>
                         <h3>Price:<span id="productPrice">${elem.price}</span></h3>
                         </div>
                         </div>
                         `
                     });
            }
        });
    }
    