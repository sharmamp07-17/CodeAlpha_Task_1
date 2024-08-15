const accessKey = "9oEo2vDYWF8uMdW7ORYxRWgUp004SqjYPpbNPo2y5tg";

const imageName = document.querySelector("input");
const imageBox = document.getElementById('image-list');

let keyword = "";
let page = 1;

async function loadImage() {
  keyword = imageName.value;

  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`

  let response = await fetch(url);
  let data = await response.json();

  const results = data.results;

  if (page === 1) {
    imageBox.innerHTML = '';
  };

  if (imageName.value === '') {
    document.getElementById('searchbtn').innerText = "Search";
  }

  results.map((result) => {
    const images = document.createElement("img");
    images.src = result.urls.small;

    const imageLink = document.createElement("a")
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.appendChild(images);

    imageBox.appendChild(imageLink);

    document.querySelector('.show').style.display = "block";
  });
  document.getElementById('searchbtn').innerText = "Search";
  document.getElementById('more').innerText = "Show More";
};

document.getElementById('searchbtn').addEventListener("click", (e) => {
  document.getElementById('searchbtn').innerText = "Searcing...."
  e.preventDefault();
  page = 1;
  loadImage();
});

function showmore() {
  document.getElementById('more').innerText = "Loading...";
  page++;
  loadImage();
};

