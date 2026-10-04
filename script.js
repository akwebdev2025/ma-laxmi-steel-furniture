const products = [
  {id:1,name:"Maharaja 3-Door Royal Steel Almirah",price:18499,old:24500,img:"assets/maharaja-hero.jpg",tag:"Heavy-Duty",desc:"Heavy gauge steel • 3 doors • deep storage"},
  {id:2,name:"Classic 2-Door Steel Almirah + Top",price:13200,old:17500,img:"assets/classic.jpg",tag:"Solid",desc:"Powder coated steel • adjustable shelves"},
  {id:3,name:"Imperial Metal King Bed - Hydraulic",price:16800,old:22000,img:"assets/bed.jpg",tag:"Heavy-Duty",desc:"72×78 inch • reinforced steel frame"},
  {id:4,name:"Hostel Double-Decker Bunk Bed",price:11500,old:14500,img:"assets/bunk.jpg",tag:"Hostel",desc:"Heavy steel frame • institutional grade"},
  {id:5,name:"Executive 6-Drawer Office Desk",price:29800,old:35000,img:"assets/office.jpg",tag:"Commercial",desc:"Six drawers • polished teak finish"},
  {id:6,name:"Heavy 4-Drawer Filing Cabinet",price:28200,old:32000,img:"assets/cabinet.jpg",tag:"Heavy-Duty",desc:"Lockable steel filing cabinet"},
  {id:7,name:"Heavy Steel Cash Vault Safe",price:21500,old:26000,img:"assets/safe.jpg",tag:"Security",desc:"Industrial steel body • secure locking"},
];

let cart = JSON.parse(localStorage.getItem("mlsCart") || "[]");
let currentPage = "home";

function money(n){return "₹"+n.toLocaleString("en-IN")}
function save(){localStorage.setItem("mlsCart",JSON.stringify(cart)); updateCartCount()}
function updateCartCount(){document.getElementById("cartCount").textContent=cart.reduce((a,b)=>a+b.qty,0)}
function product(id){return products.find(p=>p.id===id)}
function addToCart(id){
  const found=cart.find(x=>x.id===id);
  if(found) found.qty++;
  else cart.push({id,qty:1});
  save(); renderToast("Added to inquiry cart");
}
function changeQty(id,d){
  const item=cart.find(x=>x.id===id); if(!item)return;
  item.qty+=d; if(item.qty<=0)cart=cart.filter(x=>x.id!==id); save(); renderPage("cart");
}
function renderToast(msg){
  const t=document.createElement("div");t.textContent=msg;
  t.style.cssText="position:fixed;left:50%;bottom:145px;transform:translateX(-50%);background:#17213a;color:#fff;padding:10px 14px;border-radius:20px;font-size:10px;z-index:99";
  document.body.appendChild(t);setTimeout(()=>t.remove(),1500)
}
function productCard(p){
  return `<article class="product-card">
    <img src="${p.img}" alt="${p.name}">
    <div class="product-body">
      <span class="tag">${p.tag}</span>
      <h3>${p.name}</h3><p>${p.desc}</p>
      <div class="price">${money(p.price)} <span class="old">${money(p.old)}</span></div>
      <button class="card-btn" onclick="showPage('product',${p.id})">View / Add to inquiry</button>
    </div>
  </article>`;
}
function renderHome(){
 return `<div class="page">
  <div class="search">⌕ <input id="homeSearch" placeholder="Search almirahs, beds, office..." oninput="filterHome(this.value)"></div>
  <section class="hero">
    <div class="eyebrow">DIRECT FACTORY • ZERO MIDDLEMAN MARKUP</div>
    <h1>Heavy-Duty Steel Furniture Built to Last Generations.</h1>
    <p>Made for homes, hostels, schools, hospitals and commercial spaces.</p>
    <div class="stats"><div class="stat"><strong>35+</strong>yrs legacy</div><div class="stat"><strong>Solid</strong>steel</div><div class="stat"><strong>4.9★</strong>buyer rating</div></div>
    <div class="hero-actions"><button class="white-btn" onclick="showPage('catalog')">▣ Browse Catalog</button><button class="green-btn" onclick="openWhatsApp()">▣ Instant Quote</button></div>
  </section>
  <section class="section"><div class="section-head"><h2>Factory Categories</h2><a onclick="showPage('catalog')">View All →</a></div>
    <div class="chips"><div class="chip">🗄️ <strong>Almirahs</strong><span>42+ Products</span></div><div class="chip">🛏️ <strong>Metal Beds</strong><span>28+ Products</span></div><div class="chip">🏢 <strong>Office</strong><span>20+ Products</span></div></div>
  </section>
  <section class="section"><div class="section-head"><h2>Popular Factory Bestsellers</h2><a onclick="showPage('catalog')">View more</a></div><div class="grid">${products.slice(0,4).map(productCard).join("")}</div></section>
  <section class="section process"><h2>Direct Factory Order Process</h2>
    <div class="step"><span class="num">1</span><div><strong>Select Model & Steel Grade</strong><p>Choose the product and preferred steel specification.</p></div></div>
    <div class="step"><span class="num">2</span><div><strong>Add to Inquiry Cart</strong><p>Build your requirement with quantities.</p></div></div>
    <div class="step"><span class="num">3</span><div><strong>Factory Desk Reviews</strong><p>We confirm pricing, finish and dispatch details.</p></div></div>
    <div class="step"><span class="num">4</span><div><strong>Dispatch & Delivery</strong><p>Factory-packed order with direct support.</p></div></div>
  </section>
  <section class="section dark-panel"><h3>Hostel, Hospital & College Orders</h3><p>Special institutional pricing for bulk requirements. Ask the factory desk for a consolidated quote.</p><div class="hero-actions"><button class="white-btn" onclick="openWhatsApp()">Call Factory Desk</button><button class="green-btn" onclick="openWhatsApp()">WhatsApp RFQ</button></div></section>
  <section class="section map-card"><div class="section-head"><h2>Visit Factory & Live Showroom</h2><a>Open today</a></div><div class="map"><span class="pin">📍</span></div><p style="font-size:9px">Visit the showroom for live samples, finishes and custom requirements.</p></section>
 </div>`
}
function filterHome(q){
 const cards=[...document.querySelectorAll(".grid .product-card")];
 cards.forEach(c=>c.style.display=c.innerText.toLowerCase().includes(q.toLowerCase())?"":"none")
}
function renderCatalog(){
 return `<div class="page">
  <div class="search">⌕ <input placeholder="Search products..." oninput="filterCatalog(this.value)"></div>
  <div class="tabs"><button class="active">All</button><button>Almirahs</button><button>Beds</button><button>Office</button></div>
  <div class="section-head"><h2>Factory Product Catalog</h2><span style="font-size:8px;color:#777">7 products</span></div>
  <div class="grid" id="catalogGrid">${products.map(productCard).join("")}</div>
  <section class="section dark-panel"><h3>Hostel, School & Govt. Tender Supplies</h3><p>Bulk supply • institutional finish • direct factory quote.</p></section>
 </div>`
}
function filterCatalog(q){
 [...document.querySelectorAll("#catalogGrid .product-card")].forEach(c=>c.style.display=c.innerText.toLowerCase().includes(q.toLowerCase())?"":"none")
}
function renderProduct(id){
 const p=product(id)||products[0];
 return `<div class="page">
  <div class="detail-hero"><img class="detail-image" src="${p.img}" alt="${p.name}"><div class="detail-info">
   <div class="model">MODEL: ML-308-ROYA L • ★ 4.9 (184 Buyer Inquiries)</div>
   <h1 class="detail-title">${p.name}</h1>
   <div class="price-box"><div class="big-price">${money(p.price)} <span class="old">${money(p.old)}</span></div><small>24% Factory Direct • GST included</small></div>
  </div></div>
  <section class="spec-section"><h3>1. Select Steel Strength & Build</h3><div class="choice-row"><div class="choice selected"><b>Classic Home Grade</b><br>Standard Solid</div><div class="choice"><b>Heavy-Duty Armor</b><br>Extra Reinforced</div></div></section>
  <section class="spec-section"><h3>2. Baked Enamel Colourway</h3><div class="choice-row"><div class="choice selected">● Heritage Maroon</div><div class="choice">● Charcoal Black</div><div class="choice">● Navy Blue</div><div class="choice">● Ivory Cream</div></div></section>
  <section class="spec-section"><h3>3. Security & Locking Hardware</h3><div class="spec-list"><div class="spec-item">🔑 <b>Godrej Ultra 8-Lever Brass System</b><br>Duplicate-proof nickel-plated cylinder.</div><div class="spec-item">▣ <b>Digital Touch Keypad + Master Override</b><br>Anti-tamper alarm with PIN vault.</div></div></section>
  <section class="spec-section"><h3>Physical Dimensions & Mass</h3><div class="choice-row"><div class="choice"><b>78"</b><br>Height</div><div class="choice"><b>54"</b><br>Width</div><div class="choice"><b>21"</b><br>Depth</div><div class="choice"><b>98 KG</b><br>Net mass</div></div></section>
  <section class="spec-section"><h3>Structural Integrity & Vault Specs</h3><div class="spec-list"><div class="spec-item">✓ <b>350+ KG Dynamic Load Bearing</b><br>Reinforced channel base with heavy seasonal loading support.</div><div class="spec-item">✓ <b>Saint-Gobain 5mm Belgian Mirror</b><br>Zero-distortion reflective center panel.</div><div class="spec-item">✓ <b>Continuous Seamless Piano Hinges</b><br>Reinforced full-height steel hinges.</div><div class="spec-item">✓ <b>Integrated Hidden Locker</b><br>Double-bitted inner safe chamber.</div></div></section>
  <section class="spec-section"><h3>Buyer Showroom Feedback</h3><div class="review">★★★★★ Verified Purchase<br><br>“The build feels extremely solid. Factory delivery and packing were excellent.”<br><b>— S. Gurmeet Singh</b></div></section>
  <section class="section"><div class="section-head"><h2>Coordinated Heavy Steel Suite</h2><span style="font-size:8px">Matching Sets</span></div><div class="related">${products.slice(1,3).map(productCard).join("")}</div></section>
  <div style="height:80px"></div>
 </div>
 <div class="sticky-actions"><button class="red-btn" onclick="addToCart(${p.id})">🛒 Add to Inquiry</button><button class="green-btn" onclick="openWhatsApp()">▣ WhatsApp Direct</button></div>`
}
function renderCart(){
 if(!cart.length) return `<div class="page"><div class="empty"><strong>Your inquiry cart is empty</strong>Add factory products to build your requirement.<br><button class="card-btn" onclick="showPage('catalog')">Browse Catalog</button></div></div>`;
 const items=cart.map(x=>{const p=product(x.id);return `<div class="cart-item"><img src="${p.img}"><div><h3>${p.name}</h3><p>${p.desc}</p><b class="price">${money(p.price*x.qty)}</b></div><div class="cart-side">🗑<div class="qty"><button onclick="changeQty(${p.id},-1)">−</button><b>${x.qty}</b><button onclick="changeQty(${p.id},1)">+</button></div></div></div>`}).join("");
 const total=cart.reduce((s,x)=>s+product(x.id).price*x.qty,0);
 return `<div class="page"><div class="section-head"><h2>Inquiry Cart (${cart.length} Units)</h2><span style="font-size:8px">Direct Factory Quote</span></div><div class="cart-list">${items}</div>
 <section class="summary"><div class="row"><span>Factory pricing</span><b>${money(total)}</b></div><div class="row"><span>GST / logistics</span><b>Calculated by factory</b></div><div class="total">Estimated total <span style="float:right">${money(total)}</span></div><button class="green-btn" style="width:100%;border:0;border-radius:8px;padding:12px;margin-top:9px;font-weight:800" onclick="openWhatsApp()">▣ Send Inquiry via WhatsApp</button></section>
 <section class="section form"><h3 style="font-size:12px">Customer Details</h3><div class="field"><label>YOUR FULL NAME</label><input id="name" value="Rajesh Kumar"></div><div class="field"><label>WHATSAPP NUMBER</label><input id="phone" value="+91 98765 43210"></div><div class="field"><label>DELIVERY LOCALITY & CITY</label><input id="city" placeholder="Your city / area"></div><div class="field"><label>PROCUREMENT TYPE</label><select><option>Residential Home (Personal)</option><option>College / Hostel</option><option>Hospital</option><option>Government Tender</option></select></div></section>
 </div>`
}
function renderCustom(){
 return `<div class="page"><section class="dark-panel"><h3>Custom Factory Requirement</h3><p>Tell us the dimensions, quantity and finish. The factory desk will prepare a quote.</p></section><section class="section form"><div class="field"><label>PRODUCT / REQUIREMENT</label><input placeholder="e.g. 20 steel almirahs"></div><div class="field"><label>DIMENSIONS / SPECIAL NOTE</label><textarea placeholder="Need delivery to 2nd floor, custom shelf spacing, colour..."></textarea></div><div class="field"><label>QUANTITY</label><input type="number" value="1" min="1"></div><button class="green-btn" style="width:100%;border:0;border-radius:8px;padding:12px;font-weight:800" onclick="openWhatsApp()">Send Requirement to Factory</button></section></div>`
}
function openWhatsApp(){
 const msg=encodeURIComponent("Hello Maa Laxmi Steel Factory Desk, I am interested in steel furniture and would like a direct factory quote.");
 window.open("https://wa.me/?text="+msg,"_blank");
}
function setActive(page){
 document.querySelectorAll(".bottom-nav button").forEach(b=>b.classList.toggle("active",b.dataset.page===page))
}
function renderPage(page,arg){
 currentPage=page;const app=document.getElementById("app");
 app.innerHTML=page==="home"?renderHome():page==="catalog"?renderCatalog():page==="product"?renderProduct(arg):page==="cart"?renderCart():renderCustom();
 setActive(page==="product"?"catalog":page); updateCartCount(); window.scrollTo({top:0,behavior:"smooth"});
}
function showPage(page,arg){renderPage(page,arg)}
renderPage("home");
