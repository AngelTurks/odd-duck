'us strict';

function Product(name, imagePath) {
    this.name = name;
    this.imagePath = imagePath;
    this.whenClicked = null;
    this.timesShown = 0;
  }

const products = [
  new Product("Bag", "img/bag.jpg"),
  new Product("Banana", "img/banana.jpg"),
  new Product("Bathroom", "img/bathroom.jpg"),
  new Product("Boots", "img/boots.jpg"),
  new Product("Breakfast", "img/breakfast.jpg"),
  new Product("Bubblegum", "img/bubblegum.jpg"),
  new Product("Chair", "img/chair.jpg"),
  new Product("Cthulhu", "img/cthulhu.jpg"),
  new Product("Dog", "img/dog-duck.jpg"),
  new Product("Dragon", "img/dragon.jpg"),
  new Product("Pen", "img/pen.jpg"),
  new Product("Pet-sweep", "img/pet-sweep.jpg"),
  new Product("Scissors", "img/scissors.jpg"),
  new Product("Shark", "img/shark.jpg"),
  new Product("Sweep", "img/sweep.png"),
  new Product("Tauntaun", "img/tauntaun.jpg"),
  new Product("Unicorn", "img/unicorn.jpg"),
  new Product("Water-can", "img/water-can.jpg"),
  new Product("Wine-glass", "img/wine-glass.jpg"),
];

let totalRounds = 25;

function displayRandomProducts() {
  const displayedProducts = [];
  while (displayedProducts.length < 3) {
    const randomIndex = Math.floor(Math.random() * products.length);
    const Product = products[randomIndex];
    if (!displayedProducts.includes(Product)) {
      displayedProducts.push(Product);
      Product.timesShown++;
    }
  }

  const imagesSection = document.getElementById("images");
  imagesSection.innerHTML = '';
  displayedProducts.forEach(product => {
    const img = document.createElement("img");
    img.src = product.imagePath;
    img.alt = product.name;
    imagesSection.appendChild(img);
  });
}

const imagesSection = document.getElementById("images");

function handleClick(event) {
  const clickedProductName = event.target.alt;
  const clickedProduct = products.find(product => product.name === clickedProductName);
  if (clickedProduct) {
    clickedProduct.timesClicked++;
    if (totalRounds <= 0) {
      imagesSection.removeEventListener("click", handleClick);
      const resultsButton = document.getElementById("viewResults");
      resultsButton.style.display = "block";
    }
    displayRandomProducts();
    totalRounds--;
  }
}

imagesSection.addEventListener("click", handleClick);

function displayResults() {
  const sortedProducts = [...products].sort((a, b) => b.timesClicked - a.timesClicked);
  for (const product of sortedProducts) {
    const votes = product.timesClicked;
    const timesShown = product.timesShown;
    console.log(`${product.name} had ${votes} votes, and was seen ${timesShown} times.`);
  }
}

document.getElementById("viewResults").addEventListener("click", displayResults);
displayRandomProducts();