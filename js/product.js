// Ürünleri apı'dan alma
export const fetchProducts = async () => {
  try {
    const response = await fetch("db.json");
    //Eğer hata yoksa veriyi döndür
    if (!response.ok) {
      throw new Error("Yanlış URL");
    }
    return await response.json();
  } catch (error) {
    console.log(`Hataa : ${error}`);
    return [];
  }
};
// Apı'dan alınan ürünleri HTML basma (Render etme)
export const renderProducts = (products, addToCartCallback) => {
  const productList = document.querySelector("#product-list");
  productList.innerHTML = products
    .map(
      (product) => `
        <div class="product">
          <img src="${product.image}" alt="product-img" class="product-img" />
          <div class="product-info">
            <h2 class="product-title">${product.title}</h2>
            <p class="product-price">$${product.price}</p>
            <a class="add-to-cart" data-id='${product.id}'>Add to cart</a>
          </div>
        </div>`
    )
    .join(""); //virgül ile ayrılan dizi elemanarını boşluk ile ayırma (join)

  //Add to cart buton işlevi
  const addToCartButtons = document.getElementsByClassName("add-to-cart");

  for (let i = 0; i < addToCartButtons.length; i++) {
    const addToCartButton = addToCartButtons[i];

    addToCartButton.addEventListener("click", addToCartCallback);
  }
};
