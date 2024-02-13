// create story element



// renders stories
const renderStories = function (stories) {
  const $stories_container = $("#stories_container");

  $stories_container.empty();
  console.log(stories);

  $.each(stories, function (index, storyObj) {
    console.log("story in RenderStories", storyObj);
    $stories_container.append(createStoryElement(storyObj));
  });
};

//wip progress createStoryElement
const createStoryElement = function (storyObj) {

  const { id , title, username, created_date, completed_date, upvotes, downvotes, completed} = storyObj

  const created_dateLocal = new Date (created_date)
  const completed_dateLocal = new Date(completed_date)
  
  

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


  
  $pId.text(id);
  $aTitle.text(title);
  $pUsername.text(username);
  $pCreated_date.text(created_dateLocal);
  $pCompleted_date.text(completed_dateLocal);
  $pUpVotes.text(upvotes);
  $pDownVotes.text(downvotes);
  $pCompleted.text(completed);

  console.log(created_date);

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
