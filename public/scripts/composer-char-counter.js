$(document).ready(function () {
  //stackoverflow 'how to get textarea text jquery'
  const textArea = $('#tweet-text');
  textArea.on('keyup', function () {
    const charCount = $('.counter');
    //stackoverflow 'jquery textarea character count'
    const tweetLength = $(this).val().length;
    //w3schools 'jquery changing color css'
    let counter = 140;
    if (counter - tweetLength < 0) {
      charCount.css('color', 'red');
    } else {
      charCount.css('color', '');
    }
    charCount.text(counter - tweetLength);
  });
});