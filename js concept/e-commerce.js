let totalAddClicks = 0;
  let wishlist=new Set();
  let cart={}

  // step2
const products={
  1:{dataid:"1",name:"product1",price:"150",image:"image/web2.avif",},
  2:{dataid:"2",name:"product2",price:"170",image:"image/web3.avif"},
  3:{dataid:"3",name:"product3",price:"270",image:"image/web13.avif"},
  4:{dataid:"4",name:"product4",price:"60",image:"image/web10.avif"},
  5:{dataid:"5",name:"product5",price:"190",image:"image/web8.avif"},
  6:{dataid:"6",name:"product6",price:"180",image:"image/web 12.avif"},
  7:{dataid:"7",name:"product7",price:"50",image:"image/home-8-img-shop-1-800x800.jpg"},
  8:{dataid:"8",name:"product8",price:"55",image:"image/home-8-img-shop-4-800x800.jpg"},
  9:{dataid:"9",name:"product9",price:"40",image:"image/home-8-img-shop-9.jpg"},
}
 
    function toggleWishlist(dataid) {
  const icon = document.querySelector(`.product-card[dataid="${dataid}"] .wishlist-icon i`);

  if (wishlist.has(dataid)) {
    wishlist.delete(dataid);
    icon.classList.remove("fa-heart");
    icon.classList.add("fa-heart-o");
  } else {
    wishlist.add(dataid);
    icon.classList.remove("fa-heart-o");
    icon.classList.add("fa-heart");
   }

  updatebadge();
  saveToLocalStorage();
}

 // addToCart========
    function addToCart(dataid) {
        if (!cart[dataid]) {
            cart[dataid] = { ...products[dataid], qty: 1 };
        } else {
        cart[dataid].qty++;
        }
             updatebadge();
             saveToLocalStorage();
             
      }

//  updates=============

     function updatebadge(){
        document.getElementById("wishcount").innerText = wishlist.size;
         let totalQty = 0;
    for (const id in cart) {
        totalQty += cart[id].qty;
    }
    document.querySelector(".cartCount").innerText = totalQty;

    //payment=====
    const summary = document.getElementById("cart-summary");

      const itemsBox = document.getElementById("summary-items");
      itemsBox.innerHTML = "";

      let totalAmount = 0;

      Object.values(cart).forEach(item => {
        totalAmount += item.qty * item.price;
        itemsBox.innerHTML += `
        <div class="cart=item">
          <img src="${item.image}" width="50%" height="100%">
          <p><strong>${item.name}</strong></p>
          <p>₹${item.price}</p>
        
            <button class="btn btn-outline-secondary fw-bold" style="width: 40px; height: 40px;" onclick="changeQty(${item.dataid}, -1)">−</button>
            <span class="mx-3 fw-bold fs-5">${item.qty}</span>
            <button class="btn btn-outline-secondary fw-bold fs-5" style="width: 40px; height: 40px;" onclick="changeQty(${item.dataid}, 1)">+</button>
            </div>`;
        
          });

      document.getElementById("total-amount").innerText = totalAmount;
      summary.style.display = Object.keys(cart).length ? 'block' : 'none';


    }
    

function changeQty(dataid, delta) {
  if (cart[dataid]) {
    cart[dataid].qty += delta;

    // If quantity drops to 0 or less, remove the item from the cart
    if (cart[dataid].qty <= 0) delete cart[dataid];
  

    saveToLocalStorage();
    updatebadge();
  }
}




    //=========


 function saveToLocalStorage() {
  localStorage.setItem("wishlist", JSON.stringify([...wishlist]));
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("totalAddClicks",totalAddClicks);
}

function loadFromLocalStorage() {
  const storedWishlist = localStorage.getItem("wishlist");
  const storedClicks = localStorage.getItem("totalAddClicks");
  if (storedWishlist) {
    wishlist = new Set(JSON.parse(storedWishlist));
    wishlist.forEach(dataid => {
      const icon = document.querySelector(`.product-card[dataid="${dataid}"] .wishlist-icon`);
      if (icon) {
        icon.classList.add('active');
      }
    });
  }

  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    cart = JSON.parse(storedCart);
  }
  if(storedClicks){
    totalAddClicks=parseInt(storedClicks);
  }

  updatebadge();
}
function payNow() {
      if (Object.keys(cart).length === 0) {
        alert("Cart is empty.");
      } else {
        alert("Payment successful! Thank you.");
        cart = {};
        saveToLocalStorage();
        updatebadge();
      }
    }

    window.onload = loadFromLocalStorage;  
function closecart() {
  const cartSummary = document.getElementById("cart-summary");
  if (cartSummary) {
    cartSummary.style.display = "none";
  }
}


//========================================
window.onload = function () {
  loadFromLocalStorage();
document.getElementById("details").addEventListener("click",()=>{
  window.location.href="ShopCart.html";
  
});
document.getElementById("wishdetails").addEventListener("click",()=>{
  window.location.href="wishlist.html";
})
}

