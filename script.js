// your JS code here. If required.

const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "httpsum.photos/id/239/200/300" },
];

// function to download a single image (promise)
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = () => resolve(img);
    img.onerror = () => reject("Failed to load image: " + url);
  });
}

// main function to download all images
function downloadImages() {
  // Reset UI
  output.innerHTML = "";
  errorDiv.innerHTML = "";
  loading.style.display = "block";

  const allDownloads = images.map((item) => downloadImage(item.url));

  Promise.all(allDownloads)
    .then((loadedImages) => {
      loadedImages.forEach((img) => output.appendChild(img));
    })
    .catch((err) => {
      errorDiv.innerHTML = err;
    })
    .finally(() => {
      loading.style.display = "none";
    });
}

btn.addEventListener("click", downloadImages);
