/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  //temp data; will eventually get from express server via AJAX GET request
  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  };

/* 
  <article class="tweet">
    <header>
      <div class="userInfo hide">
        <img class="avatar" src="/images/profile-hex.png">
        <span>Micky</span>
      </div>
      <small class="user-handle hide">@MArugala</small>
    </header>
    <div class="tweet-text">
      <p>Testing tweet functionality</p>
    </div>
    <footer>
      <small>1 hour ago</small>
      <span class="reaction">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </span>
    </footer>
  </article>
*/

  //take in tweet object, return tweet <article> element containing entire HTML structure
  const createTweetElement = (tweetData) => {
    const {
      name,
      avatars,
      handle
    } = tweetData.user;
    const { text } = tweetData.content;
    //don't put createdTime in object!! (undefined)
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
  
const $tweet = createTweetElement(tweetData);

console.log($tweet);
$('#tweet-container').append($tweet);
});