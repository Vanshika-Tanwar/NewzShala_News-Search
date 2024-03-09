const apiKey = '941955d92a5a42fb8523db946abc9a0d';
const newsContainer = document.getElementById("news-container");

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

async function fetchRandomNews(){
    try{
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=in&pageSize=15&apikey=${apiKey}`; 
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch(err){
        console.error("Error fetching Random News", err);
        return [];
    }
}

const handleSearch = async () => {
    const query = searchInput.value.trim();
    if(query !== ""){
        try {
            const articles = await fetchNewsQuery(query);
            displayNews(articles);
        } catch(err) {
            console.error("Error fetching news by query", err);
        }
    }
    /* else{
        try{
            const articles = await fetchRandomNews();
            displayNews(articles);
        } catch(err){
            console.error("Error fetching random news", err);
        }
    } */
}

searchButton.addEventListener("click", handleSearch);

searchInput.addEventListener("keydown", async (event) => {
    if (event.keyCode === 13) { 
        await handleSearch();
    }
});


/* searchButton.addEventListener("click", async () => {
    const query = searchInput.value.trim();
    if(query !== ""){
        try{
            const articles = await fetchNewsQuery(query)
            displayNews(articles);
        }catch(err){
            console.error("Error fetching news by query", err)
        }
    }
})
 */ 
const handleInputChange = async () => {
    const query = searchInput.value.trim();
    if (query === "") {
        // If the query is empty, fetch random news
        try {
            const articles = await fetchRandomNews();
            displayNews(articles);
        } catch(err) {
            console.error("Error fetching random news", err);
        }
    }
}

searchInput.addEventListener("input", handleInputChange);

async function fetchNewsQuery(query){
    try{
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=15&apikey=${apiKey}`; 
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch(err){
        console.error("Error fetching Random News", err);
        return [];
    }
}

function displayNews(articles){
    newsContainer.innerHTML = "";
    articles.forEach((article) => {
        const newsCard = document.createElement("div");
        newsCard.classList.add("news-card");
        const img = document.createElement("img")
        img.src = article.urlToImage;
        img.alt = article.title;
        const title = document.createElement("h2");
        const truncatedTitle = article.title.length>30 ? article.title.slice(0,30) + "...": article.title;
        title.textContent = truncatedTitle;
        const content =  document.createElement("p");
        const truncatedContent= article.content && article.content.length>120 ? article.content.slice(0,120) + "...": article.content;
        content.textContent = truncatedContent;

        newsCard.appendChild(img);
        newsCard.appendChild(title);
        newsCard.appendChild(content);
        newsCard.addEventListener('click', () => {
            window.open(article.url, "_blank")
        })
        newsContainer.appendChild(newsCard)
    })
}

(async ()=>{
    try{
        const articles = await fetchRandomNews();
        displayNews(articles)
    } catch(err){
        console.error("Error fetching Random News", err);
    }
}) (); 