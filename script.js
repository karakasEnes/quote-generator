const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Loading Spinner Shown
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Remove Loading Spinner
function complete() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

let quoteData = ""

// newQuote
function newQuote() {
  const randomNumber = Math.floor(Math.random() * quoteData.length);
  const newQuote = quoteData[randomNumber];

  // Check if Author field is blank and replace it with 'Unknown'
  if (data.quoteAuthor === '') {
    authorText.innerText = 'Unknown';
  } else {
    authorText.innerText = newQuote.quoteAuthor;
  }
  // Dynamically reduce font size for long quotes
  if (data.quoteText.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  quoteText.innerText = data.quoteText;

}



// Get Quote From API
async function getQuote() {
  loading();
  // We need to use a Proxy URL to make our API call in order to avoid a CORS error
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
//   const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  const apiUrl = "https://type.fit/api/quotes";

  try {
    // const response = await fetch(proxyUrl + apiUrl);
    const response = await fetch(apiUrl);
    const data = await response.json();
    quoteData = data;
    // Stop Loading, Show Quote
    newQuote();
    complete();
  } catch (error) {
    console.log("some Error happened!...")
  }
}

// Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();
