// create story element
const createTweetElement = function (story) {
  
  const $story = $("<article>");
  const $span = $("<span>");

  $span.text(story.id)
  
  $story.append($span)

  return $story;
};

/* <section id="stories_container">
<% for (let story of stories) { %>
<article>
  <span>
    <%= story.id %>
    <%= story.title %>
    <%= story.username %>
    <%= story.created_date %>
    <%= story.completed_date %>
    <%= story.upvotes %>
    <%= story.downvotes %>
    <%= story.completed %><br>
  </span>
</article>
<% } %>
</section> */

// render stories

const renderTweets = function (stories) {

  const $stories_container = $("#stories_container");

  $stories_container.empty();

  $.each(stories, function (index, story) {
    $stories_container.append(createStoryElement(story));
  });

};

