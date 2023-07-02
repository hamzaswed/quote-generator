import { localQuotes } from "./quotes.js";

const newQuoteBtnEl = document.querySelector("[data-new-quote-btn]");
const quoteTextEl = document.querySelector("[data-quote-text]");
const quoteAuthorEl = document.querySelector("[data-quote-author]");
const twiiterBtnEl = document.querySelector("[data-twitter-btn]");
const quoteSpinner = document.querySelector("[data-quote-spinner]");
const quoteContent = document.querySelector("[data-quote-content]");

let allQuotes;
let currentQuote;
let initialLoading = true;

const isLoading = (loadingStatus) => {
  quoteSpinner.hidden = !loadingStatus;
  quoteContent.hidden = loadingStatus;
};

const shareOnTwitter = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${currentQuote.text} - ${currentQuote.author}`;
  window.open(twitterUrl, "_blank");
};

const printeQuote = (quote) => {
  quoteTextEl.textContent = quote.text;
  quoteAuthorEl.textContent = quote.author || "UnKnown";
};

const newQuote = () => {
  if (initialLoading) {
    initialLoading = false;
  } else {
    isLoading(true);
  }

  const randomNum = Math.trunc(Math.random() * allQuotes.length);
  const quote = allQuotes[randomNum];
  currentQuote = quote;

  // set timeout to see loading spener
  setTimeout(function () {
    isLoading(false);
  }, 500);

  printeQuote(currentQuote);
};

async function getQuotes() {
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Some thing went wrong");
    }
    const data = await response.json();
    allQuotes = data;
  } catch (error) {
    console.error(error);
    allQuotes = localQuotes;
  }

  newQuote();
}

// event listeners
newQuoteBtnEl.addEventListener("click", newQuote);
twiiterBtnEl.addEventListener("click", shareOnTwitter);

// on load
getQuotes();
isLoading(true);
