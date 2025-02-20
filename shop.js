let cartCount = 0;
let currentPage = 1;
const productsPerPage = 12;
let cartItems = [];
let filteredProducts = []; // Added for filtering

const products = [
  { id: 1, name: "Traditional Handicraft", price: 25.00, rating: 4.5, reviews: 128 },
  { id: 2, name: "Local Artwork", price: 35.00, rating: 4.8, reviews: 95 },
  { id: 3, name: "Handmade Jewelry", price: 45.00, rating: 4.7, reviews: 156 },
  { id: 4, name: "Socotra Dragon Blood", price: 30.00, rating: 4.9, reviews: 203 },
  { id: 5, name: "Handwoven Textile", price: 40.00, rating: 4.6, reviews: 87 },
  { id: 6, name: "Carved Wooden Box", price: 28.00, rating: 4.4, reviews: 67 },
  { id: 7, name: "Local Spices Set", price: 20.00, rating: 4.7, reviews: 189 },
  { id: 8, name: "Traditional Pottery", price: 32.00, rating: 4.5, reviews: 112 },
  { id: 9, name: "Woven Basket", price: 27.00, rating: 4.3, reviews: 78 },
  { id: 10, name: "Shell Necklace", price: 22.00, rating: 4.6, reviews: 145 },
  { id: 11, name: "Decorative Plate", price: 38.00, rating: 4.4, reviews: 92 },
  { id: 12, name: "Incense Holder", price: 18.00, rating: 4.8, reviews: 167 },
  { id: 13, name: "Embroidered Scarf", price: 29.00, rating: 4.7, reviews: 134 },
  { id: 14, name: "Ceramic Vase", price: 42.00, rating: 4.5, reviews: 89 },
  { id: 15, name: "Wooden Figurine", price: 33.00, rating: 4.6, reviews: 156 },
  { id: 16, name: "Traditional Hat", price: 24.00, rating: 4.4, reviews: 78 },
  { id: 17, name: "Beaded Bracelet", price: 15.00, rating: 4.8, reviews: 234 },
  { id: 18, name: "Metal Wall Art", price: 55.00, rating: 4.7, reviews: 98 },
  { id: 19, name: "Woven Rug", price: 65.00, rating: 4.9, reviews: 167 },
  { id: 20, name: "Decorative Mask", price: 48.00, rating: 4.5, reviews: 123 },
  { id: 21, name: "Stone Carving", price: 37.00, rating: 4.6, reviews: 145 },
  { id: 22, name: "Leather Pouch", price: 23.00, rating: 4.4, reviews: 89 },
  { id: 23, name: "Glass Ornament", price: 19.00, rating: 4.7, reviews: 178 },
  { id: 24, name: "Textile Wall Hanging", price: 44.00, rating: 4.8, reviews: 156 }
];

function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));

  document.getElementById(pageId).classList.add('active');
  document.querySelector(`[onclick="showPage('${pageId}')"]`)?.classList.add('active');

  if (pageId === 'checkout') {
    updateCartDisplay();
  }
}

function displayProducts(page) {
  const start = (page - 1) * productsPerPage;
  const end = start + productsPerPage;
  const pageProducts = filteredProducts.slice(start, end); // Use filteredProducts

  const productsHTML = pageProducts.map(product => `
    <div class="product-card">
      <img src="https://placehold.co/300x200" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>$${product.price.toFixed(2)}</p>
      <div class="product-rating">
        <span class="stars">${'★'.repeat(Math.floor(product.rating))}${product.rating % 1 ? '★' : ''}</span>
        <span class="rating">${product.rating.toFixed(1)}</span>
        <span class="reviews">${product.reviews} reviews</span>
      </div>
      <button class="write-review-btn" onclick="toggleReview(this)">Write a Review</button>
      <div class="review-form hidden">
        <div class="review-box">
          <h4>Write a Review</h4>
          <div class="rating-container">
            <div class="star-rating-wrapper">
              <select class="star-rating">
                <option value="5">⭐⭐⭐⭐⭐ Outstanding</option>
                <option value="4">⭐⭐⭐⭐ Very Good</option>
                <option value="3">⭐⭐⭐ Good</option>
                <option value="2">⭐⭐ Fair</option>
                <option value="1">⭐ Poor</option>
              </select>
            </div>
            <div class="review-metadata">
              <input type="text" placeholder="Your Name" class="reviewer-name">
              <input type="text" placeholder="Review Title" class="review-title">
            </div>
          </div>
          <textarea placeholder="What did you like or dislike about this product?" class="review-text"></textarea>
          <div class="review-actions">
            <button class="submit-review" onclick="submitReview(${product.id}, this.parentElement.parentElement.parentElement)">
              Post Review
            </button>
            <button class="cancel-review" onclick="toggleReview(this.parentElement.parentElement.parentElement.previousElementSibling)">
              Cancel
            </button>
          </div>
        </div>
      </div>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    </div>
  `).join('');

  document.querySelector('.products').innerHTML = productsHTML;
  updatePaginationButtons();
}

function updatePaginationButtons() {
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage); // Use filteredProducts
  document.getElementById('pagination').innerHTML = `
    <button onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>Previous</button>
    <span>Page ${currentPage} of ${totalPages}</span>
    <button onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>
  `;
}

function changePage(page) {
  if (page >= 1 && page <= Math.ceil(filteredProducts.length / productsPerPage)) { // Use filteredProducts
    currentPage = page;
    displayProducts(currentPage);
  }
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    cartItems.push(product);
    cartCount++;
    document.getElementById('cart-count').textContent = cartCount;
    saveCart();

    const cartIcon = document.getElementById('cart-icon');
    cartIcon.style.transform = 'scale(1.2)';
    setTimeout(() => {
      cartIcon.style.transform = 'scale(1)';
    }, 200);
  }
}

function saveCart() {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function loadCart() {
  const storedCart = localStorage.getItem('cartItems');
  if (storedCart) {
    cartItems = JSON.parse(storedCart);
    cartCount = cartItems.length;
    document.getElementById('cart-count').textContent = cartCount;
  }
}

function searchProducts(searchTerm, category) {
  filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || product.category === category;
    return matchesSearch && matchesCategory;
  });
  
  currentPage = 1;
  displayProducts(currentPage);
}


function updateCartDisplay() {
  const cartItemsDiv = document.getElementById('cart-items');
  const cartTotalDiv = document.getElementById('cart-total');

  if (cartItems.length === 0) {
    cartItemsDiv.innerHTML = '<p>Your cart is empty</p>';
    cartTotalDiv.innerHTML = '';
    return;
  }

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  cartItemsDiv.innerHTML = cartItems.map(item => `
    <div class="cart-item">
      <span>${item.name}</span>
      <span>$${item.price.toFixed(2)}</span>
    </div>
  `).join('');

  cartTotalDiv.innerHTML = `Total: $${total.toFixed(2)}`;
}

function handleContactSubmit(event) {
  event.preventDefault();
  alert('Thank you for your message! We will get back to you soon.');
  event.target.reset();
}

function handleCheckout() {
  if (cartItems.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  
  const checkoutContent = document.getElementById('checkout');
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
  
  checkoutContent.querySelector('.content-container').innerHTML = `
    <h2>Checkout</h2>
    <form id="checkout-form" onsubmit="processCheckout(event)">
      <div class="form-section">
        <h3>Shipping Information</h3>
        <input type="text" name="fullName" placeholder="Full Name" required>
        <input type="email" name="email" placeholder="Email" required>
        <input type="text" name="address" placeholder="Street Address" required>
        <input type="text" name="city" placeholder="City" required>
        <input type="text" name="zipCode" placeholder="ZIP Code" required>
        <select name="country" required>
          <option value="">Select Country</option>
          <option value="US">United States</option>
          <option value="UK">United Kingdom</option>
          <option value="CA">Canada</option>
        </select>
      </div>
      
      <div class="form-section">
        <h3>Location</h3>
        <button type="button" onclick="getCurrentLocation()" class="location-btn">Use My Current Location</button>
        <div id="map" style="height: 300px; margin: 10px 0;"></div>
        <input type="text" id="latitude" name="latitude" readonly>
        <input type="text" id="longitude" name="longitude" readonly>
      </div>

      <div class="form-section">
        <h3>Payment Information (Optional)</h3>
        <input type="text" name="cardNumber" placeholder="Card Number" pattern="[0-9]{16}" maxlength="16">
        <div class="card-details">
          <input type="text" name="expiry" placeholder="MM/YY" pattern="(0[1-9]|1[0-2])\/([0-9]{2})" maxlength="5">
          <input type="text" name="cvv" placeholder="CVV" pattern="[0-9]{3,4}" maxlength="4">
        </div>
      </div>

      <div class="order-summary">
        <h3>Order Summary</h3>
        <div class="summary-items">
          ${cartItems.map(item => `
            <div class="summary-item">
              <span>${item.name}</span>
              <span>$${item.price.toFixed(2)}</span>
            </div>
          `).join('')}
        </div>
        <div class="summary-total">
          <strong>Total:</strong>
          <strong>$${total.toFixed(2)}</strong>
        </div>
      </div>

      <button type="submit" class="checkout-button">Complete Purchase</button>
    </form>
  `;
}

let map;
let marker;

function initMap(lat = 0, lng = 0) {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat, lng },
    zoom: 15
  });
  
  marker = new google.maps.Marker({
    position: { lat, lng },
    map: map,
    draggable: true
  });

  google.maps.event.addListener(marker, 'dragend', function() {
    const pos = marker.getPosition();
    document.getElementById('latitude').value = pos.lat();
    document.getElementById('longitude').value = pos.lng();
  });
}

function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        document.getElementById('latitude').value = lat;
        document.getElementById('longitude').value = lng;
        
        if (!map) {
          initMap(lat, lng);
        } else {
          map.setCenter({ lat, lng });
          marker.setPosition({ lat, lng });
        }
      },
      (error) => {
        alert('Error getting location: ' + error.message);
      }
    );
  } else {
    alert('Geolocation is not supported by your browser');
  }
}

function processCheckout(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const orderData = Object.fromEntries(formData.entries());
  
  // In a real application, you would send this data to a server
  console.log('Order processed:', orderData);
  
  alert('Thank you for your purchase! Order confirmed.');
  cartItems = [];
  cartCount = 0;
  document.getElementById('cart-count').textContent = '0';
  localStorage.removeItem('cartItems');
  showPage('home');
}

// Initialize the app
function submitReview(productId, formElement) {
  const rating = formElement.querySelector('.star-rating').value;
  const review = formElement.querySelector('.review-text').value;
  const name = formElement.querySelector('.reviewer-name').value;
  const title = formElement.querySelector('.review-title').value;
  
  if (!review.trim()) {
    alert('Please write a review');
    return;
  }

  if (!name.trim()) {
    alert('Please enter your name');
    return;
  }

  if (!title.trim()) {
    alert('Please enter a review title');
    return;
  }

  const product = products.find(p => p.id === productId);
  if (product) {
    product.reviews++;
    product.rating = ((product.rating * (product.reviews - 1)) + Number(rating)) / product.reviews;
    
    // Reset form
    formElement.querySelector('.review-text').value = '';
    formElement.querySelector('.reviewer-name').value = '';
    formElement.querySelector('.review-title').value = '';
    formElement.querySelector('.star-rating').selectedIndex = 0;
    
    displayProducts(currentPage);
    alert('Thank you for your review! Your feedback helps others make better choices.');
  }
}

function toggleReview(btn) {
  const reviewForm = btn.nextElementSibling;
  if (reviewForm.classList.contains('hidden')) {
    reviewForm.classList.remove('hidden');
    btn.style.display = 'none';
  } else {
    reviewForm.classList.add('hidden');
    btn.style.display = 'block';
  }
}

window.onload = () => {
  loadCart();
  filteredProducts = [...products];
  displayProducts(1);
  showPage('home');
};