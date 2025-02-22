import axios from "axios";
import Noty from "noty";

let addToCart = document.querySelectorAll(".add-to-cart");
let cartCounter = document.querySelector("#cartCounter");

function updateCart(pizza) {
  axios
    .post("/update-cart", pizza)
    .then((res) => {
      console.log(res);
      cartCounter.innerText = res.data.totalQty;
      new Noty({
        text: "Item added to cart",
        type: "success",
        timeout: 1000,
        progressBar: false,
        layout: "bottomRight",
      }).show();
    })
    .catch(() => {
      new Noty({
        text: "Someting went wrong",
        type: "error",
        timeout: 1000,
        progressBar: false,
        layout: "bottomRight",
      }).show();
    });
}

addToCart.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // console.log(e);
    let pizza = JSON.parse(btn.dataset.pizza);
    updateCart(pizza);
  });
});
