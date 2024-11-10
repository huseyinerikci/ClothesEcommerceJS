import {
  calculateCartTotal,
  getFromLocalStorage,
  saveToLocalStorage,
  updateCartIcon,
} from "./utils.js";

//localden veri al
let cart = getFromLocalStorage();

// Eleman ekleme
export const addToCart = (event, products) => {
  //Tıklanan ürün id eriş int dönüştür
  const productId = parseInt(event.target.dataset.id);

  // id'ye sahip eleman bulma
  const product = products.find((product) => product.id === productId);
  if (product) {
    const exitingItem = cart.find((item) => item.id === productId);

    //ürün sepette varsa miktarı arttır
    if (exitingItem) {
      exitingItem.quantity++;
    } else {
      //sepete eklenecek obje oluştur
      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      };
      // sepete ekle
      cart.push(cartItem);

      //butona tıklanıldığında içeriğini güncelleme
      event.target.textContent = "Added";

      // local güncelle
      saveToLocalStorage(cart);

      //sepet ıcon güncelle
      updateCartIcon(cart);
    }
  }
};

//eleman silme fonksiyonu
const removeCart = (event) => {
  //id ulaş ve int çevir
  const productID = parseInt(event.target.dataset.id);
  //filter ile remove butonu ile ilgili verileri sil
  cart = cart.filter((item) => item.id !== productID);
  //silme işlemi sonrası local güncelle
  saveToLocalStorage(cart);
  //sayfa yenilenmesi sonrası render güncelle
  renderCartItems();
  //Total miktar güncelle
  displayCartTotal();
  //sepet ıcon güncelle
  updateCartIcon(cart);
};

//Ekrana verileri render etme
export const renderCartItems = () => {
  const cartItems = document.querySelector("#cartItems");

  //elemanın içeriğini güncelle
  cartItems.innerHTML = cart
    .map(
      (item) => `<div class="cart-item">
              <img src="${item.image}" alt="" />
              <div class="cart-item-info">
                <h2 class="cart-item-title">${item.title}</h2>
                <input
                  type="number"
                  class="cart-item-quantity"
                  min="1"
                  value=${item.quantity}
                  data-id="${item.id}"
                />
              </div>
              <h2 class="cart-item-price">$${item.price}</h2>
              <button class="remove-cart" data-id="${item.id}">Remove</button>
            </div>`
    )
    .join("");

  //Remove butona tıklayınca ilgili veriyi silme işlemi
  const removeBtns = document.querySelectorAll(".remove-cart");

  for (let i = 0; i < removeBtns.length; i++) {
    const removeBtn = removeBtns[i];
    removeBtn.addEventListener("click", removeCart);
  }

  //Quantity değeri ile veri güncelleme
  const quantityInputs = document.querySelectorAll(".cart-item-quantity");
  for (let i = 0; i < quantityInputs.length; i++) {
    const quantityInput = quantityInputs[i];
    quantityInput.addEventListener("change", onQuantityChange);
  }
};

//quantity değer değişikliği fonksiyonu
const onQuantityChange = (event) => {
  const newQuantity = +event.target.value;
  const productID = +event.target.dataset.id;
  if (newQuantity > 0) {
    const cartItem = cart.find((item) => item.id === productID);

    //eğer ürün sepette yoksa durdur
    if (!cartItem) return;
    //ürün miktar güncelle
    cartItem.quantity = newQuantity;
    // local güncelle
    saveToLocalStorage(cart);
    //total fiyat update
    displayCartTotal();
    //sepet ıcon güncelle
    updateCartIcon(cart);
  }
};
//Sepette toplam fiyat gösterme
export const displayCartTotal = () => {
  const cartTotal = document.querySelector("#cartTotal");
  const total = calculateCartTotal(cart);
  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
};
