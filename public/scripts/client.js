/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
  
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

  return `<article class="tweet">
  <header>
    <div class="userInfo">
      <img class="avatar" src=${avatars}>
      <span>${name}</span>
    </div>
    <small class="user-handle hide">${handle}</small>
  </header>
  <div class="tweet-text">
    <p>${text}</p>
  </div>
  <footer>
    <small>${createdTime}</small>
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
$(document).ready(function() {

  $('form').on('submit', function (event) {
    event.preventDefault();
    const data = $('form').serialize();
    console.log(data);
    $.post('/tweets', data)
      .then(() => {
        $('#tweet-text').val('');
        loadTweets();
      });
  });

  loadTweets();
});