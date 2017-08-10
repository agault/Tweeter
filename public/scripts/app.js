
function createTweetElement (tweetObject) {
  var $article = $('<article class= "thebox"></article>');
  console.log('create', tweetObject)

    function date (d) {
      var today = new Date();
      var todaytime = today.getTime();
      console.log(todaytime)
      var secdiff = (todaytime - d);
      var newdate= ((((secdiff /1000) /60) /60 )/24);
        if (newdate < 1) {

          var hours = newdate * 24;

          if (hours >= 1) {
            return (Math.round(hours) + " hours ago");
          }
          if (hours < 1) {
            return (Math.round(hours*60) + " minutes ago");
          }
        } else {
         return (newdate + " Days ago");
        }
    }

  var $header = $(`
    <header class="header_tweet">
      <img class="image" src="${ tweetObject.user.avatars.regular }">
      <h3 class="name">${ tweetObject.user.name }</h3>
      <p class="handle"> ${ tweetObject.user.handle }</p>
    </header>`)

  var $body =$(`<p class= "tweetbox">${escape(tweetObject.content.text)}</p>`)

  var $footer=$(`<footer class="footer_tweet">
                    ${ date(tweetObject.created_at) }
                  <p class="invisible">
                    <i class="fa fa-heart" aria-hidden="true"></i>
                    <i class="fa fa-flag" aria-hidden="true"></i>
                    <i class="fa fa-retweet" aria-hidden="true"></i>
                  </p>
                 </footer>`)

  $article.append($header);
  $article.append($body);
  $article.append($footer);

return $article;

}
function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

$(document).ready(function(){
  function renderTweets(tweets) {
    $('.tweet-bodies').empty()
    tweets.forEach(function (tweetObject) {
      console.log(tweetObject)
      var $container = $('.tweet-bodies').append(createTweetElement(tweetObject));
    })
  }
  function loadTweets(){
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function (data) {
        console.log(data)
        renderTweets(data)
      }
    })
  }
loadTweets()
$('form').on('submit', function (event) {
    event.preventDefault();

  if($("#textBox").val().length === 0){
    alert("You gotta write something");
    return;
  }
  if($("#textBox").val().length > 140){
    alert("You talk too much");
    return
  }

    $.ajax({
        method: 'POST',
        url: '/tweets',
        data: $(this).serialize()
    }).done(function () {
      loadTweets()
    });
});

});

