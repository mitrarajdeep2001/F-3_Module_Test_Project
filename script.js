let dateArr;
// On load event listener
window.addEventListener("load", () => {
  getCurrentImageOfTheDay();
  dateArr = localStorage.getItem("dates")
    ? localStorage.getItem("dates").split(",")
    : [];
  addSearchToHistory(dateArr);
});

// Fetch and display the current image of the day
async function getCurrentImageOfTheDay() {
  // Error handling
  try {
    const apiKey = "Ge8PSDaN6SFl9XLmjsVS1bdr6OhxsmOTBeQQHqwa";
    const currentDate = new Date().toISOString().split("T")[0];
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?date=${currentDate}&api_key=${apiKey}`
    );
    const data = await response.json();
    document.querySelector(
      "#current-image-container h1"
    ).innerHTML = `Image on ${currentDate}`;
    document.querySelector("#info img").src = `${data.hdurl}`;
    document.querySelector("#info h2").innerHTML = `${data.title}`;
    document.querySelector("#info p").innerHTML = `${data.explanation}`;
  } catch (error) {
    console.log(error);
  }
}

// Fetch and display the image of the selected day
(function getImageOfTheDay() {
  // Error handling
  try {
    document
      .querySelector("#get-img-btn")
      .addEventListener("click", async (e) => {
        e.preventDefault();
        const apiKey = "Ge8PSDaN6SFl9XLmjsVS1bdr6OhxsmOTBeQQHqwa";
        const D = document.querySelector("#search-input");
        const date = new Date(D.value).toISOString().split("T")[0];

        document.querySelector(
          "#info img"
        ).src = `https://static.vecteezy.com/system/resources/previews/001/826/199/original/progress-loading-bar-buffering-download-upload-and-loading-icon-vector.jpg`;

        const response = await fetch(
          `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`
        );
        const data = await response.json();
        if (data.hdurl) {
          document.querySelector(
            "#current-image-container h1"
          ).innerHTML = `Image on ${date}`;
          document.querySelector("#info img").src = `${data.hdurl}`;
          document.querySelector("#info h2").innerHTML = `${data.title}`;
          document.querySelector("#info p").innerHTML = `${data.explanation}`;
        } else {
          document.querySelector(
            "#info img"
          ).src = `https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png`;
          console.error("No image available!");
        }

        saveSearch(date);
        D.value = "";
      });
  } catch (error) {
    console.log(error);
  }
})();

// Save searched dates to local storage
function saveSearch(date) {
  if (date) {
    dateArr.push(date);
    localStorage.setItem("dates", dateArr);
    addSearchToHistory(localStorage.getItem("dates").split(","));
  }
}

// Display search history
function addSearchToHistory(dateList) {
  if (dateList.length !== 0) {
    const searchList = document.querySelector("#search-list");
    searchList.innerHTML = "";
    searchList.innerHTML += dateList.map((e) => `<li>${e}</li>`).join("");
  }
}
