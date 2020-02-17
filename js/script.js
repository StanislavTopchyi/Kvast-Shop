// item_xxx: [name, isNew, isDiscont, ingredients, alcohol, calories, price] ---------- income like this
const assortment = {
  item_001: [
    "Классика",
    false,
    true,
    "Хлеб, Во&shy;да, Со&shy;лод",
    "&lt;1,2%",
    "33",
    25
  ],
  item_002: [
    "Шабаш",
    false,
    false,
    "Хлеб, Во&shy;да, Ржа&shy;ной со&shy;лод",
    "&gt;1,2%",
    "45",
    30
  ],
  item_003: [
    "Вахтёр",
    true,
    false,
    "Ржа&shy;ной хлеб, Во&shy;да, Со&shy;лод, Соль",
    "&lt;1%",
    "35",
    40
  ],
  item_004: [
    "Романтик",
    true,
    false,
    "Ячмен&shy;ный хлеб, Во&shy;да, Со&shy;лод, Апель&shy;син",
    "&lt;0,5%",
    "27",
    40
  ]
};

const assortmentKeys = Object.keys(assortment);
const newProductSlider = document.querySelector(".new-products-slider");

//------------------------ NEW ITEMS SLIDER RENDERING --------------------
function newItemsRendering() {
  let bgIndicator = 1;
  for (let i = 0; i < assortmentKeys.length; i++) {
    if (assortment[assortmentKeys[i]][1] === true) {
      let slide = document.createElement("div");
      slide.className = "shop-item " + assortmentKeys[i];

      let itemBg = document.createElement("div");
      itemBg.className = "item-bg";
      if (bgIndicator % 2 == 0) {
        itemBg.style.backgroundImage = "url('img/new-items-bg-2.jpg')";
      }
      bgIndicator++;
      slide.appendChild(itemBg);

      let h3 = document.createElement("h3");
      h3.innerText = assortment[assortmentKeys[i]][0];
      slide.appendChild(h3);

      let bottleDiv = document.createElement("div");
      bottleDiv.className = "bottle";
      bottleDiv.style.backgroundImage =
        "url('img/bottle-" + assortmentKeys[i].slice(-3) + ".png')";
      slide.appendChild(bottleDiv);

      let table = document.createElement("table");
      table.innerHTML =
        "<tr><td>Алк: </td><td>" +
        assortment[assortmentKeys[i]][4] +
        "</td></tr><tr><td>Ккал: </td><td>" +
        assortment[assortmentKeys[i]][5] +
        "</td></tr>";
      slide.appendChild(table);

      let a = document.createElement("a");
      a.href = "#assortment";
      a.className = "btn item-buy";
      a.innerText = "Купить";
      slide.appendChild(a);

      let p = document.createElement("p");
      p.innerHTML =
        "Цена: <span>" + assortment[assortmentKeys[i]][6] + "грн.</span>";
      slide.appendChild(p);

      newProductSlider.appendChild(slide);
    }
  }
}
newItemsRendering();

//------------------------ ASSORTMENT TABLE RENDERING --------------------
const fullTable = document.querySelector(".assortment table tbody");

function tableRender(assortmentItem, assortmentKeys) {
  for (let i = 0; i < assortmentKeys.length; i++) {
    let assortmentItemTr = document.createElement("tr");
    assortmentItemTr.id = assortmentKeys[i];
    fullTable.appendChild(assortmentItemTr);

    assortmentItemTr = fullTable.querySelector("#" + assortmentKeys[i]);

    let assortmentItemTdName = document.createElement("td");
    assortmentItemTdName.className = "table-name";
    assortmentItemTdName.innerHTML =
      assortmentItem[assortmentKeys[i]][0] + '<span class="item-icon"></span>';
    if (assortmentItem[assortmentKeys[i]][1]) {
      assortmentItemTdName.querySelector(".item-icon").style.backgroundImage =
        'url("img/medium_new-product-review.png")';
    }
    if (assortmentItem[assortmentKeys[i]][2]) {
      assortmentItemTdName.querySelector(".item-icon").style.backgroundImage =
        'url("img/coupon.svg")';
    }
    assortmentItemTr.appendChild(assortmentItemTdName);

    let assortmentItemTdIngredients = document.createElement("td");
    assortmentItemTdIngredients.className = "table-ingredients";
    assortmentItemTdIngredients.innerHTML =
      assortmentItem[assortmentKeys[i]][3];
    assortmentItemTr.appendChild(assortmentItemTdIngredients);

    let assortmentItemTdAlcohol = document.createElement("td");
    assortmentItemTdAlcohol.className = "table-alcohol-percent";
    assortmentItemTdAlcohol.innerHTML = assortmentItem[assortmentKeys[i]][4];
    assortmentItemTr.appendChild(assortmentItemTdAlcohol);

    let assortmentItemTdCalories = document.createElement("td");
    assortmentItemTdCalories.className = "table-calories";
    assortmentItemTdCalories.innerHTML = assortmentItem[assortmentKeys[i]][5];
    assortmentItemTr.appendChild(assortmentItemTdCalories);

    let assortmentItemTdValue = document.createElement("td");
    assortmentItemTdValue.className = "table-value";
    assortmentItemTdValue.innerHTML =
      '<span class="minus-value"></span><input type="number" step="0.5" min="0" max="500" value="0"><span class="plus-value"></span>';
    assortmentItemTr.appendChild(assortmentItemTdValue);

    let assortmentItemTdPrice = document.createElement("td");
    assortmentItemTdPrice.className = "table-price";
    assortmentItemTdPrice.innerHTML =
      '<span class="basic-price">' +
      assortmentItem[assortmentKeys[i]][6] +
      "</span>" +
      '<span class="item-new-price"></span>';
    if (assortmentItem[assortmentKeys[i]][2]) {
      assortmentItemTdPrice.style.textDecoration = "line-through";
      assortmentItemTdPrice.querySelector(
        ".item-new-price"
      ).innerHTML = Math.round(
        (assortmentItem[assortmentKeys[i]][6] / 100) * 80
      );
    }
    assortmentItemTr.appendChild(assortmentItemTdPrice);
  }
}
tableRender(assortment, assortmentKeys);

//-------------------------------- GO TO MODAL WINDOW --------------------------------
const makeOrderButton = document.querySelector(".make-order");
makeOrderButton.addEventListener("click", function(event) {
  event.preventDefault();
  renderOrderTable();
  modalOrder.style.display = "flex";
});

//-------------------------------- GO BACK FROM MODAL WINDOW --------------------------
const modalOrder = document.querySelector(".modal-order");
const requestZero = document.querySelector(
  ".modal-order-form .order-list .request-zero"
);
requestZero.addEventListener("click", function(event) {
  modalOrder.style.display = "none";
  requestZero.style.display = "none";
});
document.addEventListener("mouseup", function(event) {
  if (event.target == modalOrder) {
    modalOrder.style.display = "none";
    requestZero.style.display = "none";
  }
});
document.addEventListener("keydown", function(event) {
  if (event.keyCode === 27) {
    modalOrder.style.display = "none";
    requestZero.style.display = "none";
  }
});

//---------------------------------- ORDER TABLE RENDERING --------------------------
const orderTable = modalOrder.querySelector(".order-request");
function renderOrderTable() {
  orderTable.innerHTML = '<table class="order-request"></table>';
  const valueCols = fullTable.querySelectorAll(".table-value input");
  const orderRequestNames = fullTable.querySelectorAll(".table-name");
  let counter = 1;
  for (let i = 0; i < valueCols.length; i++) {
    if (valueCols[i].value > 0) {
      let orderRequestTr = document.createElement("tr");
      let orderRequestNumber = document.createElement("td");
      let orderRequestName = document.createElement("td");
      let orderRequestValue = document.createElement("td");
      orderRequestNumber.className = "order-request-number";
      orderRequestNumber.innerText = counter;
      counter++;
      orderRequestName.className = "order-request-name";
      orderRequestName.innerText = orderRequestNames[i].innerText;
      orderRequestValue.className = "order-request-value";
      orderRequestValue.innerText = valueCols[i].value + "л";
      orderRequestTr.appendChild(orderRequestNumber);
      orderRequestTr.appendChild(orderRequestName);
      orderRequestTr.appendChild(orderRequestValue);
      orderTable.appendChild(orderRequestTr);
    }
  }
  if (counter === 1) {
    requestZero.style.display = "block";
  }
}

//------------------------------- TOTAL VALUE COUNTING ------------------------------
const totalValueInput = document.querySelectorAll(".total-price input");
const valueCols = fullTable.querySelectorAll(".table-value input");
const priceCols = fullTable.querySelectorAll(".table-price .basic-price");
for (let i = 0; i < valueCols.length; i++) {
  valueCols[i].oninput = function() {
    if (valueCols[i].value == "") {
      valueCols[i].value = 0;
    }
    deletingZero();
    checkMinMax();
    oninputChanging();
  };
}

//------------------------------- DELETE 0 BEFORE ENTERING VALUE --------------------
function deletingZero() {
  for (let i = 0; i < valueCols.length; i++) {
    let value = valueCols[i].value;
    if (value > 0) {
      if (value[0] === "0") {
        valueCols[i].value = value.slice(1);
      }
    }
  }
}

//---------------------------------- PLUS/MINUS BUTTONS -----------------------------
const minusButtons = fullTable.querySelectorAll(".minus-value");
const plusButtons = fullTable.querySelectorAll(".plus-value");
for (let i = 0; i < minusButtons.length; i++) {
  minusButtons[i].addEventListener("click", function(event) {
    if (valueCols[i].value == "") {
      valueCols[i].value = 0;
    }
    valueCols[i].value = parseFloat(valueCols[i].value) - 0.5;
    checkMinMax();
    oninputChanging();
  });
  plusButtons[i].addEventListener("click", function(event) {
    if (valueCols[i].value == "") {
      valueCols[i].value = 0;
    }
    valueCols[i].value = parseFloat(valueCols[i].value) + 0.5;
    checkMinMax();
    oninputChanging();
  });
}

//---------------------------------- MIN/MAX VALUE CHECK----------------------------
function checkMinMax() {
  for (let i = 0; i < valueCols.length; i++) {
    if (valueCols[i].value < 0) {
      valueCols[i].value = 0;
    }
    if (valueCols[i].value > 500) {
      valueCols[i].value = 500;
    }
  }
}

//---------------------------------- ONINPUT CHENGING--------------------------------
function oninputChanging() {
  let totalPrice = 0;
  let totalValue = 0;
  for (let j = 0; j < priceCols.length; j++) {
    let itemPrice = priceCols[j].innerHTML * valueCols[j].value;
    if (assortment[assortmentKeys[j]][2]) {
      itemPrice = Math.round((itemPrice / 100) * 80);
    }
    totalPrice += itemPrice;
    totalValue += valueCols[j].value * 1;
  }
  if (totalValue >= 20) {
    totalPrice = Math.round((totalPrice / 100) * 90);
  }
  totalValueInput[0].value = totalPrice;
  totalValueInput[1].value = totalPrice;
}
