let carts = document.querySelectorAll(".add-cart");

let products = [
  {
    name: "Stem Activity",
    tag: "b1",
    authoor: "Dr P.A and Dr S.T.",
    price: 32,
    incart: 0,
  },
  {
    name: "The Science Book",
    tag: "b2",
    authoor: "prof. Narayan Sukla",
    price: 45,
    incart: 0,
  },
  {
    name: "Material Science",
    tag: "b3",
    authoor: "S L kakani",
    price: 71,
    incart: 0,
  },
  {
    name: "What's Science",
    tag: "b4",
    authoor: "Sokuntola Debi",
    price: 31,
    incart: 0,
  },
  {
    name: "Galaxy Science",
    tag: "b14",
    authoor: "PROf Paritosh Gharoui",
    price: 70,
    incart: 0,
  },
  {
    name: "Computer Dictionary",
    tag: "b5",
    authoor: "DR Rahul Pandey",
    price: 20,
    incart: 0,
  },
  {
    name: "Math Foundation",
    tag: "b6",
    authoor: "Ramij Raja",
    price: 37,
    incart: 0,
  },
  {
    name: "Multimedia Programming",
    tag: "b7",
    authoor: "Akshay Kumar",
    price: 40,
    incart: 0,
  },
  {
    name: "Stephen Hawking",
    tag: "b8",
    authoor: "Ramij Raja",
    price: 50,
    incart: 0,
  },
  {
    name: "World of Science",
    tag: "b15",
    authoor: "Akshay Kumar",
    price: 26,
    incart: 0,
  },
  {
    name: "Extreme Science",
    tag: "b9",
    authoor: "Niraj pandey",
    price: 23,
    incart: 0,
  },
  {
    name: "Oxford Science",
    tag: "b10",
    authoor: "Mark jukarbarg",
    price: 89.00,
    incart: 0,
  },
  {
    name: "Transcending Science",
    tag: "b11",
    authoor: "DR k. Sadananda",
    price: 62.00,
    incart: 0,
  },
  {
    name: "Science Fiction",
    tag: "b12",
    authoor: "ANN and JEE vandermeer",
    price: 35.00,
    incart: 0,
  },
];

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartNumbers(products[i]);
    totalcost(products[i]);
  });
}

//to fixed the cart-value after refresh the page
function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartnumber");
  if (productNumbers) {
    document.querySelector(".cart span").textContent = productNumbers;
  }
}

//to add the product in cart-list after click (add to cart) button
function cartNumbers(product) {
  let productNumbers = localStorage.getItem("cartnumber");

  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem("cartnumber", productNumbers + 1);
    document.querySelector(".cart span").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartnumber", 1);
    document.querySelector(".cart span").textContent = 1;
  }

  setItems(product);
}

function setItems(product) {
  let cartitems = localStorage.getItem('productsincart');
  cartitems = JSON.parse(cartitems);

  if (cartitems != null) {
    if (cartitems[product.tag] == undefined) {
      cartitems = {
        ...cartitems,
        [product.tag]: product
      }
    }
    cartitems[product.tag].incart += 1;
  }
  else {
    product.incart = 1;
    cartitems = {
      [product.tag]: product
    }
  }

  localStorage.setItem('productsincart', JSON.stringify(cartitems));
}

function totalcost(product) {
  let cartcost = localStorage.getItem('totalcost');


  if (cartcost != null) {
    cartcost = parseInt(cartcost);
    localStorage.setItem('totalcost', cartcost + product.price);
  }
  else {
    localStorage.setItem('totalcost', product.price);
  }
  console.log(cartcost);

}

function displaycart() {
  let cartitems = localStorage.getItem('productsincart');
  cartitems = JSON.parse(cartitems);
  let cartcost = localStorage.getItem('totalcost');

  let productcontainer = document.querySelector('.product');

  if (cartitems && productcontainer) {
    productcontainer.innerHTML = '';
    Object.values(cartitems).map(item => {
      productcontainer.innerHTML += `
      <div class="product-title">
      <ion-icon name="close-circle-outline"></ion-icon>
      <img src="/image/eimage/${item.tag}.jpg">
      <span>${item.name}</span>
      <span>;${item.authoor}</span>
      </div>
      <div class="price">RS.${item.price}</div>
      <div class="quantity">
      <span>${item.incart}</span>
      </div>
      <div class="total">
      RS.${item.incart * item.price}
      </div>
      `
    });

    productcontainer.innerHTML += `
    <div class="baskettotalcontainer">
    <h4 class="baskettotaltitle">
    Basket Total
    </h4>
    <h4 class="baskettotal">
    RS.${cartcost}
    </h4>
    `;
  }
}

onLoadCartNumbers();
displaycart();

function success() {
  Swal.fire("ADD TO CART", "The Book is Successfuly in your cart", "success");
}
