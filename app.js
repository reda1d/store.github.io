// --- State Management ---
let currentLang = 'ar'; // Default language
let cart = []; // Array of { product, quantity }
let currentPage = 'home';
let currentProductId = null;
let selectedWilayaZone = 0;

// --- i18n Logic ---
function toggleLanguage() {
    currentLang = currentLang === 'fr' ? 'ar' : 'fr';
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.getElementById('langBtn').innerText = currentLang === 'fr' ? 'عربي' : 'Français';
    updateTranslations();
    renderPage();
    updateCartUI();
}

function updateTranslations() {
    const t = translations[currentLang];
    
    // Header & Navigation
    document.querySelectorAll('.t-home').forEach(el => el.innerText = t.home);
    document.querySelectorAll('.t-shop').forEach(el => el.innerText = t.shop);
    document.querySelectorAll('.t-about').forEach(el => el.innerText = t.about);
    document.querySelectorAll('.t-delivery').forEach(el => el.innerText = t.delivery);
    document.querySelectorAll('.t-contact').forEach(el => el.innerText = t.contact);
    document.querySelectorAll('.t-announcementCOD').forEach(el => el.innerText = t.announcementCOD);
    document.querySelectorAll('.t-announcementDelivery').forEach(el => el.innerText = t.announcementDelivery);
    document.querySelectorAll('.t-bestSellers').forEach(el => el.innerText = t.bestSellers);
    
    // Cart & Checkout generic elements
    document.querySelectorAll('.t-orderSummary').forEach(el => el.innerText = t.checkout.orderSummary);
    document.querySelectorAll('.t-subtotal').forEach(el => el.innerText = t.checkout.subtotal);
    document.querySelectorAll('.t-checkout').forEach(el => el.innerText = t.checkout.title);
    
    // Footer
    document.querySelectorAll('.t-footer\\.newsletter').forEach(el => el.innerText = t.footer.newsletter);
    document.querySelectorAll('.t-footer\\.subscribe').forEach(el => el.innerText = t.footer.subscribe);
    document.querySelectorAll('.t-footer\\.terms').forEach(el => el.innerText = t.footer.terms);
    document.querySelectorAll('.t-footer\\.privacy').forEach(el => el.innerText = t.footer.privacy);
}

function formatPrice(price) {
    return `${price} ${translations[currentLang].currency}`;
}

// --- Cart Logic ---
function toggleCart() {
    document.getElementById('cartOverlay').classList.toggle('active');
    document.getElementById('cartDrawer').classList.toggle('active');
}

function addToCart(productId, qty = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.product.id === productId);
    if (existingItem) {
        existingItem.quantity += qty;
    } else {
        cart.push({ product, quantity: qty });
    }
    
    updateCartUI();
    toggleCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.product.id !== productId);
    updateCartUI();
    if(currentPage === 'checkout') renderPage();
}

function changeCartQty(productId, delta) {
    const item = cart.find(item => item.product.id === productId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
            if(currentPage === 'checkout') renderPage();
        }
    }
}

function getCartSubtotal() {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
}

function updateCartUI() {
    const cartBadge = document.getElementById('cartBadge');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.innerText = totalItems;
    
    const container = document.getElementById('cartItemsContainer');
    container.innerHTML = '';
    
    if (cart.length === 0) {
        container.innerHTML = `<p>${translations[currentLang].checkout.emptyCart}</p>`;
    } else {
        cart.forEach(item => {
            const el = document.createElement('div');
            el.className = 'cart-item';
            el.innerHTML = `
                <img src="${item.product.image}" alt="${item.product.title[currentLang]}">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.product.title[currentLang]}</div>
                    <div class="cart-item-price">${formatPrice(item.product.price)}</div>
                    <div class="cart-item-actions">
                        <button class="qty-btn" onclick="changeCartQty(${item.product.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="changeCartQty(${item.product.id}, 1)">+</button>
                        <button class="remove-btn" onclick="removeFromCart(${item.product.id})"><i class="ph ph-trash"></i></button>
                    </div>
                </div>
            `;
            container.appendChild(el);
        });
    }
    
    document.getElementById('cartSubtotalVal').innerText = formatPrice(getCartSubtotal());
}

function checkoutFromCart() {
    if (cart.length === 0) return;
    toggleCart();
    navigateTo('checkout');
}

// --- Navigation & Routing ---
function toggleMobileMenu() {
    document.getElementById('mobileNav').classList.toggle('active');
}

function navigateTo(page, id = null) {
    currentPage = page;
    currentProductId = id;
    renderPage();
    window.scrollTo(0, 0);
}

// --- Page Rendering ---
function renderPage() {
    const root = document.getElementById('app-root');
    root.innerHTML = '';
    
    if (currentPage === 'home') {
        root.appendChild(createHomeView());
    } else if (currentPage === 'shop') {
        root.appendChild(createShopView());
    } else if (currentPage === 'product') {
        root.appendChild(createProductView(currentProductId));
    } else if (currentPage === 'checkout') {
        root.appendChild(createCheckoutView());
    } else if (currentPage === 'success') {
        root.appendChild(createSuccessView());
    }
}

function createProductCard(product) {
    const t = translations[currentLang];
    const div = document.createElement('div');
    div.className = 'product-card';
    div.onclick = () => navigateTo('product', product.id);
    div.innerHTML = `
        <img src="${product.image}" alt="${product.title[currentLang]}" class="product-image">
        <div class="product-info">
            <h3 class="product-title">${product.title[currentLang]}</h3>
            <div class="product-price">${formatPrice(product.price)}</div>
            <button class="btn btn-primary btn-full" onclick="event.stopPropagation(); addToCart(${product.id})">
                <i class="ph ph-shopping-cart"></i> ${t.addToCart}
            </button>
        </div>
    `;
    return div;
}

function createHomeView() {
    const t = translations[currentLang];
    const div = document.createElement('div');
    
    // Hero
    div.innerHTML += `
        <section class="hero">
            <div class="hero-content">
                <h1>${t.hero.title}</h1>
                <p>${t.hero.subtitle}</p>
                <button class="btn btn-primary" onclick="navigateTo('shop')">${t.hero.cta}</button>
            </div>
        </section>
    `;
    
    // Featured Products
    const productsHtml = document.createElement('section');
    productsHtml.className = 'section container';
    productsHtml.innerHTML = `<h2 class="section-title">${t.bestSellers}</h2>`;
    const grid = document.createElement('div');
    grid.className = 'products-grid';
    products.slice(0, 4).forEach(p => grid.appendChild(createProductCard(p)));
    productsHtml.appendChild(grid);
    div.appendChild(productsHtml);
    
    // Benefits
    div.innerHTML += `
        <section class="section bg-gray">
            <div class="container">
                <h2 class="section-title">${t.benefits.title}</h2>
                <div class="benefits-grid">
                    <div class="benefit-item"><i class="ph ph-map-pin"></i><h4>${t.benefits.b1}</h4></div>
                    <div class="benefit-item"><i class="ph ph-hand-coins"></i><h4>${t.benefits.b2}</h4></div>
                    <div class="benefit-item"><i class="ph ph-truck"></i><h4>${t.benefits.b3}</h4></div>
                    <div class="benefit-item"><i class="ph ph-headphones"></i><h4>${t.benefits.b4}</h4></div>
                </div>
            </div>
        </section>
    `;
    
    // Reviews
    div.innerHTML += `
        <section class="section container">
            <h2 class="section-title">${t.reviews.title}</h2>
            <div class="reviews-grid">
                <div class="review-card">
                    <div class="stars">★★★★★</div>
                    <p class="review-text">"${t.reviews.r1}"</p>
                    <p class="mt-2">- Karim M.</p>
                </div>
                <div class="review-card">
                    <div class="stars">★★★★★</div>
                    <p class="review-text">"${t.reviews.r2}"</p>
                    <p class="mt-2">- Amina B.</p>
                </div>
                <div class="review-card">
                    <div class="stars">★★★★★</div>
                    <p class="review-text">"${t.reviews.r3}"</p>
                    <p class="mt-2">- Yacine S.</p>
                </div>
            </div>
        </section>
    `;
    
    // FAQ
    div.innerHTML += `
        <section class="section bg-gray">
            <div class="container" style="max-width: 800px;">
                <h2 class="section-title">${t.faq.title}</h2>
                <div style="background:var(--bg-color); padding: 2rem; border-radius: var(--border-radius); box-shadow: var(--shadow-soft);">
                    <h4 style="margin-bottom: 0.5rem;">${t.faq.q1}</h4>
                    <p style="color: #666; margin-bottom: 1.5rem;">${t.faq.a1}</p>
                    <h4 style="margin-bottom: 0.5rem;">${t.faq.q2}</h4>
                    <p style="color: #666;">${t.faq.a2}</p>
                </div>
            </div>
        </section>
    `;
    
    return div;
}

function createShopView() {
    const t = translations[currentLang];
    const div = document.createElement('div');
    div.className = 'container section';
    div.innerHTML = `<h1 class="section-title">${t.shop}</h1>`;
    
    const grid = document.createElement('div');
    grid.className = 'products-grid';
    products.forEach(p => grid.appendChild(createProductCard(p)));
    div.appendChild(grid);
    
    return div;
}

function createProductView(id) {
    const t = translations[currentLang];
    const product = products.find(p => p.id === id);
    const div = document.createElement('div');
    div.className = 'container product-detail-section';
    
    div.innerHTML = `
        <div class="product-detail-grid">
            <div class="product-gallery">
                <img src="${product.image}" alt="${product.title[currentLang]}" class="product-main-image">
            </div>
            <div class="product-info-detail">
                <h1>${product.title[currentLang]}</h1>
                <div class="price">${formatPrice(product.price)}</div>
                <p class="desc">${product.description[currentLang]}</p>
                
                <div class="qty-selector">
                    <label>${t.quantity}</label>
                    <button class="btn btn-outline" onclick="document.getElementById('p-qty').value = Math.max(1, parseInt(document.getElementById('p-qty').value)-1)">-</button>
                    <input type="number" id="p-qty" value="1" min="1">
                    <button class="btn btn-outline" onclick="document.getElementById('p-qty').value = parseInt(document.getElementById('p-qty').value)+1">+</button>
                </div>
                
                <button class="btn btn-primary btn-full" style="font-size: 1.1rem; padding: 1rem;" 
                        onclick="addToCart(${product.id}, parseInt(document.getElementById('p-qty').value))">
                    <i class="ph ph-shopping-cart"></i> ${t.addToCart}
                </button>
                
                <div class="trust-badges">
                    <i class="ph ph-shield-check" style="font-size: 1.5rem;"></i>
                    <span>${t.announcementCOD}</span>
                    <i class="ph ph-truck" style="font-size: 1.5rem; margin-left: 1rem;"></i>
                    <span>${t.announcementDelivery}</span>
                </div>
            </div>
        </div>
    `;
    return div;
}

function handleWilayaChange(e) {
    const wilayaId = parseInt(e.target.value);

    updateCommunes(wilayaId);

    if (!wilayaId) {
        selectedWilayaZone = 0;
    } else {
        const wilaya = wilayas.find(w => w.id === wilayaId);
        selectedWilayaZone = wilaya ? wilaya.zone : 0;
    }

    updateCheckoutTotals();
}

function updateCheckoutTotals() {
    const subtotal = getCartSubtotal();
    const shipping = selectedWilayaZone ? shippingCosts[selectedWilayaZone] : 0;
    const total = subtotal + shipping;
    
    document.getElementById('c-subtotal').innerText = formatPrice(subtotal);
    document.getElementById('c-shipping').innerText = selectedWilayaZone ? formatPrice(shipping) : '-';
    document.getElementById('c-total').innerText = formatPrice(total);
}

async function submitCheckout(e) {
    e.preventDefault();
    const t = translations[currentLang].checkout;
    const form = e.target;
    let isValid = true;
    
    // Simple validation logic
   ['fullname', 'phone', 'address', 'commune', 'wilaya'].forEach(id => {
        const el = document.getElementById(id);
        const group = el.parentElement;
        if (!el.value.trim()) {
            group.classList.add('has-error');
            isValid = false;
        } else {
            group.classList.remove('has-error');
        }
    });
    
    if (isValid && cart.length > 0) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerText;
        submitBtn.innerText = 'Patientez... / يرجى الانتظار...';
        submitBtn.disabled = true;

        const wilayaSelect = document.getElementById('wilaya');
        const wilayaName = wilayaSelect.options[wilayaSelect.selectedIndex].text;
        
        const subtotal = getCartSubtotal();
        const shipping = selectedWilayaZone ? shippingCosts[selectedWilayaZone] : 0;
        const total = subtotal + shipping;

        const data = {
            id: Date.now().toString(),
            firstName: document.getElementById('fullname').value,
            lastName: "",
            phone: document.getElementById('phone').value,
            wilaya: wilayaName,
            address: document.getElementById('address').value + " - " + document.getElementById('commune').value,
            productName: cart.map(item => `${item.product.title.fr} (x${item.quantity})`).join(' + '),
            quantity: cart.reduce((sum, item) => sum + item.quantity, 0),
            total: total,
            status: "Nouvelle"
        };

        try {
            const response = await fetch("https://script.google.com/macros/s/AKfycbwAOtfaUGQH9Gw8XEX35IiMvvLi0YDzYJUFJM2oQqsHA6Za6CqmwvHlzw4ebixJ5NW6ew/exec", {
                method: "POST",
                headers: {
                    "Content-Type": "text/plain;charset=utf-8",
                },
                body: JSON.stringify(data)
            });
            
            // On vérifie le texte d'abord au cas où le serveur renvoie du HTML (erreur)
            const responseText = await response.text();
            let result;
            try {
                result = JSON.parse(responseText);
            } catch (e) {
                throw new Error("Réponse non-JSON du serveur : " + responseText.substring(0, 50));
            }

            if (result.success) {
                // Process order success
                cart = [];
                updateCartUI();
                navigateTo('success');
            } else {
                throw new Error(result.error || "Erreur serveur");
            }
        } catch (error) {
            console.error('Error submitting order:', error);
            alert('Erreur: ' + error.message + '\n\nخطأ في الإرسال. يرجى التحقق من اتصالك.');
            submitBtn.innerText = originalBtnText;
            submitBtn.disabled = false;
        }
    }
}

function createCheckoutView() {
    const t = translations[currentLang].checkout;
    const div = document.createElement('div');
    div.className = 'container section';

    if (cart.length === 0) {
        div.innerHTML = `
            <div class="text-center">
                <h2>${t.emptyCart}</h2>
            </div>
        `;
        return div;
    }

    const wilayaOptions = wilayas.map(w =>
        `<option value="${w.id}">${w.id} - ${w.name}</option>`
    ).join('');

    div.innerHTML = `
    <div class="modern-order-box">

        <h2 class="order-title">
            ${t.sectionDelivery}
        </h2>

        <form id="checkoutForm" onsubmit="submitCheckout(event)">

            <div class="modern-field">
                <label>الاسم الكامل *</label>
                <input
                    type="text"
                    id="fullname"
                    class="form-control"
                    placeholder="Nom complet"
                    required
                >
            </div>

            <div class="modern-field">
                <label>الهاتف *</label>
                <input
                    type="tel"
                    id="phone"
                    class="form-control"
                    placeholder="Numéro de téléphone"
                    required
                >
            </div>

            <div class="modern-field">
                <label>الولاية *</label>
                <select
                    id="wilaya"
                    class="form-control"
                    onchange="handleWilayaChange(event)"
                    required
                >
                    <option value="">Wilaya</option>
                    ${wilayaOptions}
                </select>
            </div>

            <div class="modern-field">
                <label>البلدية *</label>
               <select
                   id="commune"
                   class="form-control"
                   required
                >
                   <option value="">
                    اختر البلدية
                    </option>
                </select>
            </div>

            <div class="modern-field">
                <label>العنوان *</label>
                <input
                    type="text"
                    id="address"
                    class="form-control"
                    placeholder="Adresse de livraison"
                    required
                >
            </div>

            <div class="modern-summary">

                <div class="summary-line">
                    <span>سعر المنتج</span>
                    <span id="c-subtotal">
                        ${formatPrice(getCartSubtotal())}
                    </span>
                </div>

                <div class="summary-line">
                    <span>سعر التوصيل</span>
                    <span id="c-shipping">--</span>
                </div>

                <div class="summary-divider"></div>

                <div class="summary-total-line">
                    <span>المجموع</span>
                    <span id="c-total">
                        ${formatPrice(getCartSubtotal())}
                    </span>
                </div>

            </div>

            <button
                type="submit"
                class="modern-order-btn"
            >
                إشتري الآن
            </button>

        </form>

    </div>
    `;

    return div;
}

function createSuccessView() {
    const t = translations[currentLang].checkout;
    const div = document.createElement('div');
    div.className = 'container section text-center';
    div.innerHTML = `
        <div style="max-width: 600px; margin: 0 auto; padding: 4rem 2rem; background: var(--bg-color); border-radius: var(--border-radius-lg); box-shadow: var(--shadow-soft);">
            <i class="ph ph-check-circle" style="font-size: 5rem; color: #2E7D32; margin-bottom: 1rem;"></i>
            <h1 class="mb-2">${t.successTitle}</h1>
            <p style="color: #555; margin-bottom: 2rem; font-size: 1.1rem;">${t.successMessage}</p>
            <button class="btn btn-primary" onclick="navigateTo('home')">${t.continueShopping}</button>
        </div>
    `;
    return div;
}

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    updateTranslations();
    renderPage();
    updateCartUI();
});
let communesData = [];

async function loadCommunes() {
    try {
        const response = await fetch('communes.json');
        communesData = await response.json();
    } catch (error) {
        console.error('Erreur chargement communes:', error);
    }
}

loadCommunes();
function updateCommunes(wilayaId) {

    const communeSelect = document.getElementById('commune');

    communeSelect.innerHTML =
        '<option value="">اختر البلدية</option>';

    const filteredCommunes =
        communesData.filter(
            c => parseInt(c.wilaya_id) === parseInt(wilayaId)
        );
    console.log("Wilaya:", wilayaId);
    console.log("Communes trouvées:", filteredCommunes.length);
    filteredCommunes.forEach(commune => {

        const option =
            document.createElement('option');

        option.value = commune.ar_name;
        option.textContent = commune.ar_name;

        communeSelect.appendChild(option);
    });
}