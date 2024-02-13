// create story element



// render stories

const renderStories = function (stories) {
  const $stories_container = $("#stories_container");

  $stories_container.empty();
  console.log(stories);

  $.each(stories, function (index, storyObj) {
    console.log("story in RenderStories", storyObj);
    $stories_container.append(createStoryElement(storyObj));
  });
};

const createStoryElement = function (storyObj) {
  const $story = $("<article>");
  const $div = $("<div>");
  const $pId = $("<p>");
  const $pTitle = $("<p>");
  const $pUsername = $("<p>");
  const $pCreated_date = $("<p>");
  const $pCompleted_date = $("<p>");
  const $pUpVotes = $("<p>");
  const $pDownVotes = $("<p>");
  const $pCompleted = $("<p>");
  
  $pId.text(storyObj.id);
  $pTitle.text(storyObj.title);
  $pUsername.text(storyObj.username);
  $pCreated_date.text(storyObj.created_date);
  $pCompleted_date.text(storyObj.completed_date);
  $pUpVotes.text(storyObj.upvotes);
  $pDownVotes.text(storyObj.downvotes);
  $pCompleted.text(storyObj.completed);

  $div.append($pId);
  $div.append($pTitle);
  $div.append($pUsername);
  $div.append($pCreated_date);
  $div.append($pCompleted_date);
  $div.append($pUpVotes);
  $div.append($pDownVotes);
  $div.append($pCompleted);

  $story.append($div);

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