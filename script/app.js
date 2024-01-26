const product = {
  crazy: {
    name: "Crazy",
    price: 31000,
    img: "/images/products/burger-1.png",
    amount: 0,
    get totalSum() {
      return this.price * this.amount;
    },
  },
  light: {
    name: "Light",
    price: 26000,
    img: "/images/products/burger-2.png",
    amount: 0,
    get totalSum() {
      return this.price * this.amount;
    },
  },
  cheeseburger: {
    name: "CheeseBurger",
    price: 29000,
    img: "/images/products/burger-3.png",
    amount: 0,
    get totalSum() {
      return this.price * this.amount;
    },
  },
  dburger: {
    name: "dBurger",
    price: 24000,
    img: "/images/products/burger-4.png",
    amount: 0,
    get totalSum() {
      return this.price * this.amount;
    },
  },
};
const productBtn = document.querySelectorAll(".wrapper__list-btn"),
  basketBtn = document.querySelector(".wrapper__navbar-btn"),
  basketModal = document.querySelector(".wrapper__navbar-basket"),
  basketBtnCount = document.querySelector(".wrapper__navbar-count"),
  basketBtnClose = document.querySelector(".wrapper__navbar-close"),
  basketChecklist = document.querySelector(".wrapper__navbar-checklist"),
  totalPriceBasket = document.querySelector(".wrapper__navbar-totalprice");

productBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    plusOrMinus(this);
  });
});

function plusOrMinus(btn) {
  let parent = btn.closest(".wrapper__list-card"),
    parentId = parent.getAttribute("id");
  product[parentId].amount++;

  basket();
}

function basket() {
  const productArray = [];

  for (const key in product) {
    let totalCount = 0;
    const po = product[key];
    const productCard = document.querySelector(`#${po.name.toLowerCase()}`),
      parentIndicator = productCard.querySelector(".wrapper__list-count");

    if (po.amount) {
      productArray.push(po);
      basketBtnCount.classList.add("active");
      parentIndicator.classList.add("active");
      totalCount += po.amount;
      parentIndicator.innerHTML = totalCount;
    } else {
      parentIndicator.classList.remove("active");
      parentIndicator.innerHTML = 0;
    }
    basketBtnCount.innerHTML = totalCount;
  }

  basketChecklist.innerHTML = "";

  for (let i = 0; i < productArray.length; i++) {
    basketChecklist.innerHTML += cardItemBurger(productArray[i]);
  }

  totalPriceBasket.innerHTML = totalSumProduct();
  const allProduct = totalCountProduct();

  if (allProduct) {
    basketBtnCount.classList.add("active");
  } else {
    basketBtnCount.classList.remove("active");
  }
  basketBtnCount.innerHTML = allProduct;

  basket()
}

function totalSumProduct() {
  let total = 0;
  for (const key in product) {
    total += product[key].totalSum;
  }
  return total;
}

function totalCountProduct() {
  let total = 0;
  for (const key in product) {
    total += product[key].amount;
  }
  return total;
}

basketBtn.addEventListener("click", function () {
  basketModal.classList.toggle("active");
});

basketBtnClose.addEventListener("click", function () {
  basketModal.classList.remove("active");
});

function cardItemBurger(productData) {
  return `
  <div class="wrapper__navbar-product">
    <div class="wrapper__navbar-info">
          <img class="wrapper__navbar-productImage" src="./${
            productData.img
          }" alt="">
        <div>
            <p class="wrapper__navbar-infoName">${productData.name}</p>
            <p class="wrapper__navbar-infoPrice">${productData.price}</p>
        </div>
    </div>
    <div class="wrapper__navbar-option" id="${productData.name.toLowerCase()}_card">
        <button class="wrapper__navbar-symbol fa-minus" data-symbol="-">-</button>
        <span class="warapper__navbar-count">${productData.amount}</span>
        <button class="wrapper__navbar-symbol fa-plus" data-symbol="+">+</button>
    </div>
</div>
  `;
}

window.addEventListener("click", function (e) {
  const eTarget = e.target;

  if (eTarget.classList.contains("wrapper__navbar-symbol")) {
    const attr = eTarget.getAttribute("data-symbol");
    const parent = eTarget.closest(".wrapper__navbar-option");
    if (parent) {
      const idProduct = parent.getAttribute("id").split("_")[0];
      console.log(idProduct);
      if (attr == "-") product[idProduct].amount--;
      else if (attr == "+") product[idProduct].amount++;
      basket();
    }
  }
});
