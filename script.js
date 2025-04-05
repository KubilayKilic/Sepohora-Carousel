(() => {
  const init = () => {
    buildCSS();
    setEvents();
  };

  const buildCSS = () => {
    // Custom CSS
    const css = `
    .wrapper {
      width: 1420px;
      height: 501px;
      display: inherit;
    }
    .slider-product-wrapper {
      display: flex;
    }
    .product-c-title {
      margin-bottom: 20px;
    }
    .slider-product-wrapper {
      display: flex;
      align-items: flex-start;
    }
    .product {
      padding: 20px;
      margin: 5px;
    }
    .product > a {
      height: 240px;
      width: 240px;
    }
    .product-name {
      font-size: 15px !important;
      font-weight: 600 !important;
      font-family: AvantGardeBold, Arial, sans-serif !important;
    }
    .product-price {
      font-size: 16px;
      font-weight: 800 !important;
      font-family: AvantGardeBold, Arial, sans-serif !important;
    }
    .product:hover {
      box-shadow: 0 6px 20px 1px rgba(32, 41, 49, .07);
    }
    .product:hover .sepet-btn {
      display: block;
    }
    .sepet-btn {
      display: none;
      padding: 0 10px;
      border: 2px solid black;
      width: 240px;
      margin: 10px 0;
      background-color: black;
      color: white;
    }
    .slider-buttons {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
      display: flex;
      justify-content: space-between;
      pointer-events: none;
    }
    .prev-btn,
    .next-btn {
      background-color: rgba(0, 0, 0, 0.5);
      color: white;
      border: none;
      padding: 10px;
      cursor: pointer;
      pointer-events: auto;
    }
    .slider {
      overflow: hidden; /* Otomatik kaydırmayı engelle */
    }
    .slider-product-wrapper {
      align-items: flex-start;
      overflow: hidden; /* Otomatik kaydırmayı engelle */
      flex-grow: 1;
      scroll-behavior: smooth; /* Kaydırma davranışını yumuşatır */
    }
    `;

    // Inject custom CSS into the page
    const styleElement = document.createElement("style");
    styleElement.innerHTML = css;
    document.head.appendChild(styleElement);
  };

  const setEvents = () => {
    const getSerumData = () => {
      const currentURL = window.location.href;
      const targetURL = "https://www.sephora.com.tr/p/";
      const sephoraSerumLink =
        "https://gist.githubusercontent.com/KubilayKilic/fce763d98f2f2a330a76a5c39e34a4ab/raw/2629cfa97b7fd81938afecd0d05d33e46599e0b4/sephora_serum.json";

      if (currentURL.startsWith(targetURL)) {
        fetch(sephoraSerumLink)
          .then((response) => {
            if (!response.ok)
              throw new Error("Veri alma işlemi başarısız oldu.");
            return response.json();
          })
          .then((data) => {
            localStorage.setItem("serumData", JSON.stringify(data));
            buildHTML(data);
            likeProduct();
          })
          .catch((error) => {
            console.error("Veri alma hatası:", error);
          });
      } else {
        console.error("Yanlış sayfadasınız.");
      }
    };

    // Check local storage for data
    const serumData = JSON.parse(localStorage.getItem("serumData"));

    if (serumData) {
      buildHTML(serumData);
      likeProduct();
    } else {
      getSerumData();
    }
  };

  const buildHTML = (data) => {
    const carouselData = data
      .map(
        (item) => `
        <li class="product" id="${item.id}">
          <div class="product-heart-icon">
            <svg xmlns="http://www.w3.org/2000/svg" id="${item.id}" width="20.576" height="19.483" viewBox="0 0 20.576 19.483">
              <path fill="none" stroke="#555" stroke-width="1.5px" d="M19.032 7.111c-.278-3.063-2.446-5.285-5.159-5.285a5.128 5.128 0 0 0-4.394 2.532 4.942 4.942 0 0 0-4.288-2.532C2.478 1.826.31 4.048.032 7.111a5.449 5.449 0 0 0 .162 2.008 8.614 8.614 0 0 0 2.639 4.4l6.642 6.031 6.755-6.027a8.615 8.615 0 0 0 2.639-4.4 5.461 5.461 0 0 0 .163-2.012z" transform="translate(.756 -1.076)"></path>
            </svg>
          </div>
          <a href="${item.url}" target="_blank">
            <img class="product-image" src="${item.img}" alt="${item.name}">
          </a>
          <div class="product-name">${item.name}</div>
          <div class="product-price">${item.price} TL</div>
          <button class="sepet-btn">Sepete Ekle</button>
        </li>`
      )
      .join("");

    const carouselHTML = `
    <div class="wrapper">
      <div class="product-c-title">
        <h2 class="p-c-title">Bu ürünlere bakmayı unutmayın!</h2>
      </div>
      <div class="slider">
        <ul class="slider-product-wrapper">
          ${carouselData}
        </ul>
        <div class="slider-buttons">
          <button class="prev-btn"><</button>
          <button class="next-btn">></button>
        </div>
      </div>
    </div>`;

    document.querySelector(".recommendations-section").innerHTML +=
      carouselHTML;

    getLikedItems();
    slider();
  };

  const getLikedItems = () => {
    const likedArray = JSON.parse(localStorage.getItem("liked"));

    if (likedArray) {
      likedArray.forEach((id) => {
        const path = document.querySelector(`svg[id="${id}"] path`);
        if (path) {
          path.setAttribute("fill", "#193db0");
          path.setAttribute("stroke", "#193db0");
        }
      });
    }
  };

  const slider = () => {
    const productWrapper = document.querySelector(".slider-product-wrapper");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    const productWidth = 230;

    nextBtn.addEventListener("click", () => {
      productWrapper.scrollBy({
        left: productWidth,
        behavior: "smooth",
      });
    });

    prevBtn.addEventListener("click", () => {
      productWrapper.scrollBy({
        left: -productWidth,
        behavior: "smooth",
      });
    });
  };

  const likeProduct = () => {
    document.querySelectorAll(".product-heart-icon svg").forEach((svg) => {
      svg.addEventListener("click", (event) => {
        const path = event.target.querySelector("path");
        const id = event.target.getAttribute("id");

        if (path.getAttribute("fill") === "#193db0") {
          path.setAttribute("stroke", "#555");
          path.setAttribute("fill", "#fff");

          const currentLikes = JSON.parse(localStorage.getItem("liked")) ?? [];
          const filtered = currentLikes.filter((index) => index !== id);

          localStorage.setItem("liked", JSON.stringify(filtered));
        } else {
          path.setAttribute("stroke", "#193db0");
          path.setAttribute("fill", "#193db0");

          const currentLikes = JSON.parse(localStorage.getItem("liked")) ?? [];
          if (!currentLikes.includes(id)) {
            const likedProducts = [...currentLikes, id].filter(Boolean);
            localStorage.setItem("liked", JSON.stringify(likedProducts));
          }
        }
      });
    });
  };

  init();
})();
