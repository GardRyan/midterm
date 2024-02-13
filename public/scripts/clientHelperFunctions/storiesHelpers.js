


// renders stories
//empties the story container and runs the createStoryElement function on each story
const renderStories = function (stories) {
  const $stories_container = $("#stories_container");

  $stories_container.empty();

  $.each(stories, function (index, storyObj) {
    $stories_container.append(createStoryElement(storyObj));
  });
};

//wip progress createStoryElement
const createStoryElement = function (storyObj) {

  const { id , title, username, created_date, completed_date, upvotes, downvotes, completed} = storyObj

  // the dates in the db are in in text so 
  const created_dateLocal = convertToLocaleTime(created_date)
  const completed_dateLocal = convertToLocaleTime(completed_date)
  
  const $story = $("<article>");
  const $div = $("<div>");

  const $pId = $("<p>");
  const $aTitle = $(`<a>`);
  const $pUsername = $("<p>");
  const $pCreated_date = $("<p>");
  const $pCompleted_date = $("<p>");
  const $pUpVotes = $("<p>");
  const $pDownVotes = $("<p>");
  const $pCompleted = $("<p>");

  $story.addClass("story_article")
  $div.addClass("story_content")
  $aTitle.attr("href", id)

  $pId.text(id);
  $aTitle.text(title);
  $pUsername.text(username);
  $pCreated_date.text(created_dateLocal);
  $pCompleted_date.text(completed_dateLocal);
  $pUpVotes.text(upvotes);
  $pDownVotes.text(downvotes);
  $pCompleted.text(completed);

  $div.append($pId);
  $div.append($aTitle);
  $div.append($pUsername);
  $div.append($pCreated_date);
  $div.append($pCompleted_date);
  $div.append($pUpVotes);
  $div.append($pDownVotes);
  $div.append($pCompleted);

  $story.append($div);

  return $story;
};


