(function () {
  var startingTime = new Date().getTime();

  const ready = (fn) => {
    if (document.readyState !== "loading") {
      fn();
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  };

  const isLocalStorageAvailable = () => {
    if (typeof localStorage === "undefined") return false;

    try {
      const test = "__storage_test__";
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  };

  const init = () => {
    if (!isLocalStorageAvailable()) {
      console.error(
        "localStorage is not available. The app might not work as expected."
      );
    }

    if (window.location.hash.startsWith("#product/")) {
      buildCSS();
      initializeProductDetail();
    } else {
      initializeCarousel();
      buildCSS();
    }
  };

  const buildCSS = () => {
    const css = `
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Quicksand:wght@400;500;600;700&display=swap');

      .icon {
        width: 20px;
        height: 20px;
        display: inline-block;
        transition: all 0.3s ease;
      }

      .icon-heart {
        fill: #f28e00;
        width: 24px;
        height: 24px;
      }

      .heart.favorite .icon-heart {
        fill: #fff;
      }

      .icon-star {
        fill: #FED100;
        width: 16px;
        height: 16px;
      }

      .icon-arrow {
        fill: #f28e00;
        width: 24px;
        height: 24px;
      }

      .icon-arrow-down {
        fill: #fff;
        width: 12px;
        height: 12px;
      }

      section {
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
        position: relative;
        font-family: 'Poppins', sans-serif;
      }

      .carousel-container {
        margin: 20px auto;
        position: relative;
        box-shadow: 15px 15px 30px 0 #ebebeb80;
        background-color: #fff;
        border-bottom-left-radius: 35px;
        border-bottom-right-radius: 35px;
        border-radius: 40px;
        font-family: 'Poppins', sans-serif;
      }

      .title-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #fef6eb;
        padding: 25px 67px;
        border-top-left-radius: 35px;
        border-top-right-radius: 35px;
        font-family: 'Poppins', sans-serif;
        font-weight: 700;
      }

      .carousel-title {
          font-family: 'Quicksand', sans-serif;
          font-size: 1.80rem;
          font-weight: 700;
          line-height: 1.11;
          color: #f28e00;
          margin: 0;
      }

      .carousel-wrapper {
        display: flex;
        gap: 20px;
        overflow: hidden;
      }

      .product-item {
        z-index: 1;
        display: block;
        width: 232.2px;
        height: 557.6px;
        font-family: 'Poppins', sans-serif;
        font-size: 12px;
        padding: 5px;
        color: #7d7d7d;
        margin: 20px 0 20px 3px;
        border: 1px solid #ededed;
        border-radius: 10px;
        position: relative;
        text-decoration: none;
        background-color: #fff;
        transition: all 0.3s ease;
      }

      .product-item:hover {
        box-shadow: 0 0 0 0 #00000030, inset 0 0 0 3px #f28e00;
      }

      .heart {
        position: absolute;
        right: 15px;
        top: 10px;
        cursor: pointer;
        background-color: #fff;
        border-radius: 50%;
        box-shadow: 0 2px 4px 0 #00000024;
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;
        transition: all 0.3s ease;
      }

      .heart:hover {
        border: 1px solid #f28e00;
      }

      .heart i {
        color: #f28e00;
        font-size: 20px;
        transition: all 0.3s ease;
      }

      .heart.favorite {
        background-color: #f28e00;
        border: 1px solid #f28e00;
      }

      .heart.favorite i {
        color: #fff;
      }


      .product-link {
        text-decoration: none;
        color: inherit;
        display: block;
        flex: 1;
      }

      .product-figure {
          margin: 0;
          padding: 0;
          text-align: center;
          margin-bottom: 45px;
      }

          .product-image {
          width: 100% !important;
          height: 203px;
          margin-bottom: 65px;
          object-fit: contain;
      }


      .product-item-content {
          flex: 1;
          position: relative;
          display: flex;
          flex-direction: column;
          height: 43px;
          padding: 10px;
          gap: 15px;
      }   

      .product-brand-name {
          margin-bottom: 5px;
          text-align: left;
          height: 20px;
      }

      .product-brand-name .brand {
        font-weight: bold;
        text-transform: uppercase;
      }

      .product-stars {
        display: flex;
        gap: 2px;
        padding-top: 40px;
      }

      .product-stars i {
        color: #FED100;
        font-size: 14px;
      }

      .product-item-price {
          position: relative;
          height: 100%;
          text-align: start;
          font-size: 1.2rem;
          margin-top: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
          
      }

      .price-discount {
        display: flex;
        align-items: center;
        gap: 10px;
        height: 20px;
      }

      .original-price {
        text-decoration: line-through;
        color: #999;
        font-size: 14px;
        min-width: 80px;
      }

      .current-price,
      .discount-badge {
        font-weight: bold;
        color: #00A365;
        height: 20px;
      }

      .discount-badge {
        color: #00A365;
        display: flex;
        align-items: center;
        gap: 5px;
        min-width: 100px;
      }

      .discount-badge i {
        font-size: 12px;
      }

      .product-actions {
        margin-top: auto;
        width: 100%;
        display: flex;
        justify-content: center;
        padding-top: 15px;
      }

      .product-list-promo {
        min-height: 100px;
        padding-left: 7.5px;
      }

      .add-to-cart {
        width: 191.56px;
        padding: 15px 20px;
        border-radius: 37.5px;
        background-color: #fff7ec;
        color: #f28e00;
        font-family: 'Poppins', sans-serif;
        font-size: 0.84rem;
        font-weight: 700;
        border: none;
        cursor: pointer;
        transition: all 0.3s ease;
        margin: 0 auto;
        display: block;
      }

      .add-to-cart:hover {
        background-color: #f28e00;
        color: #fff;
      }

      .carousel-button {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        position: absolute;
        bottom: 50%;
        top: auto;
        background: #fff;
        border: 1px solid #ddd;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        z-index: 10;
      }

      .carousel-button:hover,
      .prev-button:hover, 
      .next-button:hover {
        background-color: #fff;
        border: 1px solid #f28e00;
      }

      .prev-button { left: 40px; background-color: #fef6eb; color: #f28e00; border: none; }
      .next-button { right: 40px; background-color: #fef6eb; color: #f28e00; border: none; }


      @media (min-width: 576px) {
          .container {
              max-width: 540px;
          }
      }
    

      @media (max-width: 768px) {
        .container {
          max-width: 720px;
          }

        .header-line-1, .header-line-2 {
          flex-direction: column;
          align-items: flex-start;
        }

        .search-container {
          width: 100%;
          margin: 10px 0;
        }

        .search-container input {
          width: 100%;
        }

        .button-container {
          width: 100%;
          justify-content: space-between;
        }

        .left-div, .right-div {
          flex-direction: column;
          gap: 5px;
        }

        .product-item {
          flex: 0 0 calc(100% - 16px);
          min-width: calc(100% - 16px);
          margin: 20px auto;
          max-width: 300px;
        }

        .carousel-container {
          padding: 0 15px;
        }

        .title-container {
          padding: 15px 20px;
        }

        .carousel-title {
          font-size: 1.4rem;
        }

        .carousel-wrapper {
          justify-content: center;
        }

      }

      @media (max-width: 480px) {
        .product-item {
          max-width: 250px;
        }

        .title-container {
          padding: 12px 15px;
        }

        .carousel-title {
          font-size: 1.2rem;
        }
      }

      @media (min-width: 992px) {
          .container {
              max-width: 960px;
          }
      }

      @media (min-width: 1280px) {
          .container {
              max-width: 1180px;
          }
      }
          

      @media (min-width: 1480px) {
          .container {
              max-width: 1296px; 
          }
      }

      @media (min-width: 1580px) {
          .container {
              max-width: 1320px;
          }
          .prev-button { left: 220px; }
          .next-button { right: 220px; }
      }


      .product-detail-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100vh;
        margin: 0 auto;
        padding: 20px;
        gap: 30px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        background-color: #fff;
        box-sizing: border-box;
      }

      .product-image-container {
        flex: 1;
        padding-right: 30px;
      }

      .image-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #ddd;
        border-radius: 10px;
        padding-top: 80px; 
        padding-bottom: 80px; 

      }

      .image-wrapper img {
        max-width: 100%;
        height: auto;
        border-radius: 10px;
      }

      .product-info-container {
        flex: 1;
        background-color: #fff7ec;
        padding: 20px;
        border-radius: 10px;
        box-sizing: border-box;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .product-brand {
        font-size: 24px;
        font-weight: bold;
        color: #333;
      }

      .product-name {
        font-size: 18px;
        color: #666;
        margin-top: 5px;
      }

      .product-detail-item-price {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 20px;
        flex-wrap: wrap;
      }

      .product-detail-price-wrapper {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .product-detail-current-price {
        font-size: 24px;
        font-weight: bold;
        color: #00A365;
      }

      .product-detail-original-price {
        font-size: 18px;
        text-decoration: line-through;
        color: #999;
      }

      .product-detail-stars {
        display: flex;
        gap: 5px;
        margin-left: auto;
      }

      .product-detail-stars .icon-star {
        width: 20px;
        height: 20px;
      }

      .delivery-info {
        font-size: 14px;
        color: #333;
        margin-top: 20px;
      }

      .product-detail-add-to-cart {
        width: 100%;
        padding: 15px;
        border-radius: 37.5px;
        background-color: #f28e00;
        color: #fff;
        font-family: 'Poppins', sans-serif;
        font-size: 1.2rem;
        font-weight: 700;
        border: none;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-top: 20px;
      }

      .product-detail-add-to-cart:hover {
        background-color: #f28e00;
        color: white;
      }

      .icon-decrease {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        background: #00A365;
        border-radius: 50%;
        position: relative;
        margin-right: 5px;
      }

      .icon-decrease i {
        color: #fff;
        font-size: 12px;
        position: relative;
        z-index: 1;
      }

      @media (max-width: 768px) {
        .product-detail-item-price {
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
        }

        .product-detail-stars {
          margin-left: 0;
        }
      }

      `;
    const style = document.createElement("style");
    style.innerHTML = css;
    document.head.appendChild(style);
  };

  class ProductCarousel {
    constructor() {
      this.productList = [];
      this.currentIndex = 0;
      this.itemsPerView = 5;
      this.favorites = this.getFavorites();
      this.svgIcons = {
        heart:
          '<svg class="icon icon-heart" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>',
        star: '<svg class="icon icon-star" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>',
        arrowLeft:
          '<svg class="icon icon-arrow" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>',
        arrowRight:
          '<svg class="icon icon-arrow" viewBox="0 0 24 24"><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg>',
        arrowDown:
          '<svg class="icon icon-arrow-down" viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>',
      };
    }

    getFavorites() {
      if (!isLocalStorageAvailable()) return [];

      try {
        const favorites = localStorage.getItem("favorites");
        return favorites ? JSON.parse(favorites) : [];
      } catch (error) {
        console.warn("Error reading favorites from localStorage:", error);
        return [];
      }
    }

    saveFavorites() {
      if (!isLocalStorageAvailable()) return;

      try {
        localStorage.setItem("favorites", JSON.stringify(this.favorites));
      } catch (error) {
        console.warn("Error saving favorites to localStorage:", error);
      }
    }

    getProducts() {
      if (!isLocalStorageAvailable()) return null;

      try {
        const products = localStorage.getItem("products");
        return products ? JSON.parse(products) : null;
      } catch (error) {
        console.warn("Error reading products from localStorage:", error);
        return null;
      }
    }

    saveProducts(products) {
      if (!isLocalStorageAvailable()) return;

      try {
        localStorage.setItem("products", JSON.stringify(products));
      } catch (error) {
        console.warn("Error saving products to localStorage:", error);
      }
    }

    isHomePage() {
      return !window.location.hash || window.location.hash === "#";
    }

    async initialize() {
      if (!this.isHomePage()) {
        console.log("Wrong page");
        return;
      }

      document.body.innerHTML = "";

      const cachedProducts = this.getProducts();
      if (cachedProducts) {
        this.productList = cachedProducts;
        this.renderCarousel();
        return;
      }

      try {
        const response = await fetch(
          "https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json"
        );
        this.productList = await response.json();
        this.saveProducts(this.productList);
        this.renderCarousel();
      } catch (error) {}
    }

    renderCarousel() {
      const section = document.createElement("section");
      const container = document.createElement("div");
      container.className = "container";

      const carouselContainer = document.createElement("div");
      carouselContainer.className = "carousel-container";

      const titleContainer = document.createElement("div");
      titleContainer.className = "title-container";

      const title = document.createElement("h2");
      title.className = "carousel-title";
      title.textContent = "Beğenebileceğinizi düşündüklerimiz";
      titleContainer.appendChild(title);
      carouselContainer.appendChild(titleContainer);

      const wrapper = document.createElement("div");
      wrapper.className = "carousel-wrapper";
      carouselContainer.appendChild(wrapper);
      container.appendChild(carouselContainer);
      section.appendChild(container);

      const prevButton = document.createElement("button");
      prevButton.className = "carousel-button prev-button";
      prevButton.innerHTML = this.svgIcons.arrowLeft;
      prevButton.onclick = () => this.prev();
      section.appendChild(prevButton);

      const nextButton = document.createElement("button");
      nextButton.className = "carousel-button next-button";
      nextButton.innerHTML = this.svgIcons.arrowRight;
      nextButton.onclick = () => this.next();
      section.appendChild(nextButton);

      document.body.appendChild(section);
      this.updateVisibleProducts();
      this.updateNavigationButtons();
    }

    updateVisibleProducts() {
      const wrapper = document.querySelector(".carousel-wrapper");
      wrapper.innerHTML = "";

      for (let i = 0; i < this.itemsPerView; i++) {
        const index = (this.currentIndex + i) % this.productList.length;
        const product = this.productList[index];

        const productItem = document.createElement("div");
        productItem.className = "product-item";

        const heartButton = document.createElement("div");
        heartButton.className = `heart ${
          this.isFavorite(product.id) ? "favorite" : ""
        }`;
        heartButton.innerHTML = this.svgIcons.heart;
        heartButton.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.toggleFavorite(product.id);
        };
        productItem.appendChild(heartButton);

        const productLink = document.createElement("a");
        productLink.className = "product-link";
        productLink.href = `#product/${product.id}`;

        const figure = document.createElement("figure");
        figure.className = "product-figure";

        const img = document.createElement("img");
        img.className = "product-image";
        img.src = product.img;
        img.alt = product.name;
        figure.appendChild(img);

        const productInfo = document.createElement("div");
        productInfo.className = "product-item-content";

        const brandName = document.createElement("div");
        brandName.className = "product-brand-name";

        const brandSpan = document.createElement("span");
        brandSpan.className = "brand";
        brandSpan.textContent = product.brand;

        const productNameText = document.createTextNode(` - ${product.name}`);

        brandName.appendChild(brandSpan);
        brandName.appendChild(productNameText);

        const starsContainer = document.createElement("div");
        starsContainer.className = "product-stars";
        for (let i = 0; i < 5; i++) {
          starsContainer.innerHTML += this.svgIcons.star;
        }

        const priceContainer = document.createElement("div");
        priceContainer.className = "product-item-price";

        if (product.price !== product.original_price) {
          const priceDiscount = document.createElement("div");
          priceDiscount.className = "price-discount";

          const originalPrice = document.createElement("span");
          originalPrice.className = "original-price";
          originalPrice.textContent = `${product.original_price} TL`;

          const discountBadge = document.createElement("span");
          discountBadge.className = "discount-badge";
          discountBadge.innerHTML = `
            %${Math.round(
              ((product.original_price - product.price) /
                product.original_price) *
                100
            )}
            <div class="icon-decrease">
              ${this.svgIcons.arrowDown}
            </div>
          `;

          priceDiscount.appendChild(originalPrice);
          priceDiscount.appendChild(discountBadge);
          priceContainer.appendChild(priceDiscount);

          const currentPrice = document.createElement("span");
          currentPrice.className = "current-price";
          currentPrice.textContent = `${product.price} TL`;
          priceContainer.appendChild(currentPrice);
        } else {
          const priceDiscount = document.createElement("div");
          priceDiscount.className = "price-discount";
          priceDiscount.style.height = "20px";
          priceContainer.appendChild(priceDiscount);

          const currentPrice = document.createElement("span");
          currentPrice.className = "current-price";
          currentPrice.textContent = `${product.price} TL`;
          currentPrice.style.color = "#7d7d7d";
          priceContainer.appendChild(currentPrice);
        }

        productInfo.appendChild(brandName);
        productInfo.appendChild(starsContainer);
        productInfo.appendChild(priceContainer);

        figure.appendChild(productInfo);

        const promo = document.createElement("div");
        promo.className = "product-list-promo";
        figure.appendChild(promo);

        productLink.appendChild(figure);
        productItem.appendChild(productLink);

        const actionsContainer = document.createElement("div");
        actionsContainer.className = "product-actions";

        const addToCart = document.createElement("button");
        addToCart.className = "add-to-cart";
        addToCart.textContent = "Sepete Ekle";
        addToCart.onclick = () => this.addToCart(product.id);

        actionsContainer.appendChild(addToCart);
        productItem.appendChild(actionsContainer);

        wrapper.appendChild(productItem);
      }
    }

    prev() {
      if (this.currentIndex === 0) return;

      this.currentIndex =
        (this.currentIndex - 1 + this.productList.length) %
        this.productList.length;
      this.updateVisibleProducts();
      this.updateNavigationButtons();
    }

    next() {
      this.currentIndex = (this.currentIndex + 1) % this.productList.length;
      this.updateVisibleProducts();
      this.updateNavigationButtons();
    }

    updateNavigationButtons() {
      const prevButton = document.querySelector(".prev-button");
      if (prevButton) {
        if (this.currentIndex === 0) {
          prevButton.style.opacity = "0.5";
          prevButton.style.cursor = "not-allowed";
        } else {
          prevButton.style.opacity = "1";
          prevButton.style.cursor = "pointer";
        }
      }
    }

    addToCart(productId) {}

    isFavorite(productId) {
      return this.favorites.some((p) => p.id === productId);
    }

    toggleFavorite(productId) {
      const product = this.productList.find((p) => p.id === productId);
      if (!product) {
        return;
      }

      if (this.isFavorite(productId)) {
        this.removeFromFavorites(productId);
      } else {
        this.addToFavorites(productId);
      }
      this.updateVisibleProducts();
    }

    addToFavorites(productId) {
      const product = this.productList.find((p) => p.id === productId);
      if (!product) {
        return;
      }

      if (!this.isFavorite(productId)) {
        this.favorites.push(product);
        this.saveFavorites();
      }
    }

    removeFromFavorites(productId) {
      const index = this.favorites.findIndex((p) => p.id === productId);
      if (index !== -1) {
        this.favorites.splice(index, 1);
        this.saveFavorites();
      }
    }
  }

  const initializeCarousel = () => {
    const carousel = new ProductCarousel();
    carousel.initialize();
  };

  const initializeProductDetail = () => {
    const hash = window.location.hash;
    const productId = parseInt(hash.split("/")[1]);

    if (!productId) {
      return;
    }

    let products = [];
    if (isLocalStorageAvailable()) {
      try {
        products = JSON.parse(localStorage.getItem("products")) || [];
      } catch (error) {
        console.warn("Error reading products from localStorage:", error);
      }
    }

    const product = products.find((p) => p.id === productId);

    if (!product) {
      return;
    }

    document.body.innerHTML = "";

    const backButton = document.createElement("button");
    backButton.innerHTML = new ProductCarousel().svgIcons.arrowLeft;
    backButton.style.position = "absolute";
    backButton.style.top = "20px";
    backButton.style.left = "20px";
    backButton.style.padding = "10px";
    backButton.style.borderRadius = "50%";
    backButton.style.border = "none";
    backButton.style.color = "white";
    backButton.style.cursor = "pointer";
    backButton.style.display = "flex";
    backButton.style.alignItems = "center";
    backButton.style.justifyContent = "center";
    backButton.onclick = () => {
      window.location.hash = "";
    };
    document.body.appendChild(backButton);

    buildCSS();

    const container = document.createElement("div");
    container.className = "product-detail-container";

    const imageContainer = document.createElement("div");
    imageContainer.className = "product-image-container";

    const imageWrapper = document.createElement("div");
    imageWrapper.className = "image-wrapper";

    const img = document.createElement("img");
    img.src = product.img;
    img.alt = product.name;

    imageWrapper.appendChild(img);

    imageContainer.appendChild(imageWrapper);

    container.appendChild(imageContainer);

    const infoContainer = document.createElement("div");
    infoContainer.className = "product-info-container";

    const brandInfo = document.createElement("div");
    brandInfo.className = "product-brand-info";

    const brand = document.createElement("div");
    brand.className = "product-brand";
    brand.textContent = product.brand;

    const name = document.createElement("div");
    name.className = "product-name";
    name.textContent = product.name;
    brandInfo.appendChild(brand);
    brandInfo.appendChild(name);
    infoContainer.appendChild(brandInfo);

    const divider = document.createElement("hr");
    divider.style.border = "1px solid #ddd";
    divider.style.margin = "10px 0";
    infoContainer.appendChild(divider);

    const priceContainer = document.createElement("div");
    priceContainer.className = "product-detail-item-price";

    const priceWrapper = document.createElement("div");
    priceWrapper.className = "product-detail-price-wrapper";

    const price = document.createElement("span");
    price.className = "product-detail-current-price";
    price.textContent = `${product.price} TL`;
    priceWrapper.appendChild(price);

    if (product.original_price && product.original_price !== product.price) {
      const originalPrice = document.createElement("span");
      originalPrice.className = "product-detail-original-price";
      originalPrice.textContent = `${product.original_price} TL`;
      priceWrapper.appendChild(originalPrice);
    }

    priceContainer.appendChild(priceWrapper);

    const starsContainer = document.createElement("div");
    starsContainer.className = "product-detail-stars";
    for (let i = 0; i < 5; i++) {
      const starSvg = document.createElement("div");
      starSvg.innerHTML = new ProductCarousel().svgIcons.star;
      starsContainer.appendChild(starSvg);
    }
    priceContainer.appendChild(starsContainer);

    infoContainer.appendChild(priceContainer);

    const deliveryInfo = document.createElement("div");
    deliveryInfo.className = "delivery-info";
    deliveryInfo.style.marginBottom = "20px";

    const deliveryText = document.createElement("p");
    deliveryText.textContent = "Teslimat Bilgileri";
    deliveryText.style.fontWeight = "bold";
    deliveryText.style.marginBottom = "5px";
    deliveryInfo.appendChild(deliveryText);

    const deliveryDateText = document.createElement("p");
    deliveryDateText.textContent =
      "Tahmini teslimat tarihini görmek için konumunuzu seçin.";
    deliveryDateText.style.color = "#666";
    deliveryInfo.appendChild(deliveryDateText);
    infoContainer.appendChild(deliveryInfo);

    const addToCartBtn = document.createElement("button");
    addToCartBtn.className = "product-detail-add-to-cart";
    addToCartBtn.textContent = "Sepete Ekle";
    infoContainer.appendChild(addToCartBtn);

    container.appendChild(infoContainer);
    document.body.appendChild(container);
  };

  ready(init);

  window.addEventListener("hashchange", () => {
    if (window.location.hash.startsWith("#product/")) {
      buildCSS();
      initializeProductDetail();
    } else {
      init();
    }
  });
})();
