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

  const { id , title, username, created_date, completed_date, upvotes, downvotes, completed} = storyObj
  
  const $story = $("<article>");
  const $div = $("<div>");
  // const $span = $("<span>")
  const $pId = $("<p>");
  const $aTitle = $(`<a href='/story/${storyObj.id}'>`);
  const $pUsername = $("<p>");
  const $pCreated_date = $("<p>");
  const $pCompleted_date = $("<p>");
  const $pUpVotes = $("<p>");
  const $pDownVotes = $("<p>");
  const $pCompleted = $("<p>");

  $story.addClass("story_article")
  $div.addClass("story_content")
  
  $pId.text(storyObj.id);
  $aTitle.text(storyObj.title);
  $pUsername.text(storyObj.username);
  $pCreated_date.text(storyObj.created_date);
  $pCompleted_date.text(storyObj.completed_date);
  $pUpVotes.text(storyObj.upvotes);
  $pDownVotes.text(storyObj.downvotes);
  $pCompleted.text(storyObj.completed);

  $div.append($pId);
  $div.append($aTitle);
  $div.append($pUsername);
  $div.append($pCreated_date);
  $div.append($pCompleted_date);
  $div.append($pUpVotes);
  $div.append($pDownVotes);
  $div.append($pCompleted);
 
  // for testing
  // let storyString = `${id} ${title} ${username} ${created_date} ${completed_date} ${upvotes} ${downvotes} ${completed}`;
  

  // $span.text(storyString)
  // $div.append($span)



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