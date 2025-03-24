// Http Methods //
let httpMethods = {
  get: "GET",
  post: "POST",
  patch: "PATCH",
  delete: "DELETE",
  put: "PUT",
};
// Http Methods //

let baseUrl = "https://newsapi.org/v2/everything?"; //everything" endpoint ka use kar rahe hain, jo humein kisi bhi topic ke related news dikhata hai.
let domains = "wsj.com";//Question mark (?) isliye lagaya gaya hai kyunki query parameters pass karne hain (jaise domain, API key, etc.). (WSJ) ki news ko fetch karna chah rahe hain.
let apiKey = "f8c7b131f64848b89da07714eeba4d7a";//Yeh ek unique API key hai jo NewsAPI.org se mili hai API key authentication ke liye hoti hai, taki server ko pata chale ke request authorized hai.

let fetchPost = async () => {
  let newsContainer = document.getElementById("newsArticle");
  let statusError = document.getElementById("erroringStatus");
  try {
    let apiUrl = `${baseUrl}domains=${domains}&apiKey=${apiKey}`;
    let serverResponse = await fetch(apiUrl);
    if (!serverResponse.ok) {
      throw new Error(`Error ${serverResponse.status}: Post Not Found!`);
    }

    let receiveData = await serverResponse.json();
    console.log("receiveData", receiveData);

    newsContainer.innerHTML = receiveData.articles
      .filter((news) => !!news.urlToImage && !!news.author && !!news.description)
      .map(
        (news) => `<div class="newsCard">
      <img src = "${news.urlToImage} class ="newsImage" width = "100%" height = "62%"/>"
      <h5 class = "newsAuthor">${news.author}</h5>
      <p class = "newsDes">${news.description}</p>
      <a href ="${news.url}" class = "newsRead" target = "blank"> Read More</a>
        </div>`
      );
  } catch (error) {
    statusError.innerText = error.message;
    statusError.style.color = "red";
  }
};

window.onload = fetchPost();
