const products=[
 {id:1,name:"Minecraft Java & Bedrock",desc:"نسخة رقمية للكمبيوتر",price:25000,icon:"⛏️"},
 {id:2,name:"Fortnite V-Bucks",desc:"شحن عملات Fortnite",price:15000,icon:"🪙"},
 {id:3,name:"Steam Wallet",desc:"بطاقة شحن Steam",price:20000,icon:"🎮"},
 {id:4,name:"Game Pass",desc:"اشتراك رقمي",price:30000,icon:"🎫"},
 {id:5,name:"PlayStation Gift Card",desc:"بطاقة رقمية",price:25000,icon:"🎁"},
 {id:6,name:"EA Sports FC",desc:"مفتاح لعبة رقمي",price:45000,icon:"⚽"},
 {id:7,name:"Discord Nitro",desc:"اشتراك رقمي",price:22000,icon:"💜"},
 {id:8,name:"Windows License",desc:"ترخيص رقمي",price:35000,icon:"💻"}
];
let cart=[];
const fmt=n=>new Intl.NumberFormat('en-US').format(n)+" IQD";
function render(){
 document.getElementById("products").innerHTML=products.map(p=>`<article class="product"><div class="pic">${p.icon}</div><div class="info"><h3>${p.name}</h3><p>${p.desc}</p><div class="price"><strong>${fmt(p.price)}</strong><button class="add" onclick="add(${p.id})">+ أضف للسلة</button></div></div></article>`).join("");
 document.getElementById("cartCount").textContent=cart.length;
}
function add(id){cart.push(products.find(p=>p.id===id));render();openCart()}
function openCart(){document.getElementById("cartModal").classList.add("open");renderCart()}
function closeCart(){document.getElementById("cartModal").classList.remove("open")}
function renderCart(){
 const box=document.getElementById("cartItems");
 if(!cart.length){box.innerHTML='<p style="color:#a7a4bb">السلة فارغة حاليًا.</p>';document.getElementById("total").textContent="0 IQD";return}
 box.innerHTML=cart.map((p,i)=>`<div class="cart-row"><span>${p.name}</span><span>${fmt(p.price)} <button onclick="removeItem(${i})" style="border:0;background:none;color:#ff8b9d">×</button></span></div>`).join("");
 document.getElementById("total").textContent=fmt(cart.reduce((s,p)=>s+p.price,0));
}
function removeItem(i){cart.splice(i,1);render();renderCart()}
function checkout(){
 if(!cart.length){alert("السلة فارغة.");return}
 closeCart();
 document.getElementById("checkoutModal").classList.add("open");
}
function closeCheckout(){document.getElementById("checkoutModal").classList.remove("open")}
function submitOrder(e){
 e.preventDefault();
 const orders=JSON.parse(localStorage.getItem("sayanzOrders")||"[]");
 const id="SYZ-"+Date.now().toString().slice(-7);
 const order={
   id,
   customer:{
     name:document.getElementById("customerName").value,
     email:document.getElementById("customerEmail").value,
     phone:document.getElementById("customerPhone").value
   },
   payment:"Mastercard",
   paymentRef:document.getElementById("paymentRef").value,
   products:cart.map(p=>({id:p.id,name:p.name,price:p.price})),
   total:cart.reduce((s,p)=>s+p.price,0),
   status:"بانتظار الدفع",
   createdAt:new Date().toISOString()
 };
 orders.push(order);
 localStorage.setItem("sayanzOrders",JSON.stringify(orders));
 document.getElementById("orderNumber").textContent="رقم الطلب: "+id;
 document.getElementById("checkoutModal").classList.remove("open");
 document.getElementById("successModal").classList.add("open");
 cart=[]; render(); renderCart();
 document.getElementById("orderForm").reset();
}
function closeSuccess(){document.getElementById("successModal").classList.remove("open")}
render();
