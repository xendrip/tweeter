/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const validateTweet = (text) => {
  const errorMessage = $('.error');
  if (!text.length) {
    errorMessage.slideDown(500);
    errorMessage.text('Empty tweet, Try again');
    return false;
  }
  if (text.length > 140) {
    errorMessage.slideDown(500);
    errorMessage.text('Your tweet is too long');
    return false;
  }
  errorMessage.slideUp(500);
  return true;
};

const renderTweets = (tweets) => {
  for (let tweet of tweets) {
    const $tweetContent = createTweetElement(tweet);
    $('#tweet-container').prepend($tweetContent);
  }
};
//take in tweet object, return tweet <article> element containing entire HTML structure
const createTweetElement = (tweetData) => {
  const { name, avatars, handle } = tweetData.user;
  const { text } = tweetData.content;
  const createdTime = tweetData.created_at;

  //Source: https://web.compass.lighthouselabs.ca/days/w04d3/activities/497
  const escape = (str) => {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  return `<article class="tweet">
    <header>
      <div class="userInfo">
        <img class="avatar" src=${avatars}>
        <span>${name}</span>
      </div>
      <small class="user-handle hide">${handle}</small>
    </header>
    <div class="tweet-text">
      <p>${escape(text)}</p>
    </div>
    <footer>
      <small>${Math.round((Date.now() - new Date(createdTime)) / (1000 * 60 * 60 * 24))} days ago</small>
      <span class="reaction">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </span>
    </footer>
  </article>`;
};

const loadTweets = () => {
  $.get('/tweets')
    .then((data) => {
      $('#tweet-container').empty();
      renderTweets(data);
    });
};

// ------------------------ //
$(document).ready(function () {

  $('form').on('submit', function (event) {
    event.preventDefault();
    const data = $('form').serialize();
    const tweetText = $('#tweet-text').val();
    if (validateTweet(tweetText)) {
      $.post('/tweets', data)
        .then(() => {
          $('#tweet-text').val('');
          const charCount = $('.counter');
          const counter = 140;
          charCount.text(counter);
          loadTweets();
        });
    }
  });
  loadTweets();
});