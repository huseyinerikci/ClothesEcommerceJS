//Locale veri ekleme
export const saveToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

//Locale verileri alan

export const getFromLocalStorage = () => {
  const data = localStorage.getItem("cart");
  return data ? JSON.parse(data) : [];
};

//sepet toplamı bulma
export const calculateCartTotal = (cart) => {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

//sepetteki ürün miktarını güncelleme
export const updateCartIcon = (cart) => {
  const i = document.querySelector(".bxs-shopping-bag");

  let totalQuantity = cart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);
  i.setAttribute("data-quantity", totalQuantity);
};
