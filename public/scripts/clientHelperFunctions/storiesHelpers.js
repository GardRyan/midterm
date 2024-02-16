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
  const {
    id,
    title,
    username,
    created_date,
    completed_date,
    upvotes,
    downvotes,
    completed,
  } = storyObj;

  // the dates in the db are in in text so
  const created_dateLocal = convertToLocaleTime(created_date);
  const completed_dateLocal = convertToLocaleTime(completed_date);

  const $story = $("<article>");
  const $header = $("<header>");
  const $footer = $("<footer>")

  // const $pId = $("<p>");
  const $hTitle = $("<h2>");
  const $aTitle = $("<a>");
  const $pUsername = $("<p>");
  const $pCreated_date = $("<p>");
  const $pCompleted_date = $("<p>");
  const $pVotes = $("<p>");
  // const $pDownVotes = $("<p>");
  const $pCompleted = $("<p>");

  $story.addClass("story_article");
  $header.addClass("story_header");
  $footer.addClass("story_footer")
  $aTitle.attr("href", `/story/${id}`);

  // $pId.text(id);
  $aTitle.text(title);
  $pUsername.text(`by ${username}`);
  $pCreated_date.text(`created on ${created_dateLocal}`);
  $pCompleted_date.text(`completed on ${completed_dateLocal}`);
  $pVotes.text(`${upvotes} ${downvotes}`);
  // $pDownVotes.text(downvotes);

  if (completed) {
    $pCompleted.text("Finished");
  } else {
    $pCompleted.text("Ongoing");
  };

  $hTitle.append($aTitle);

  // $header.append($pId);
  $header.append($hTitle);
  $header.append($pUsername);
  $footer.append($pCreated_date);
  $footer.append($pCompleted_date);
  $footer.append($pVotes);
  // $footer.append($pDownVotes);
  $footer.append($pCompleted);

  $story.append($header);
  $story.append($footer);

  return $story;
};
// sidebar code heavily inspired by w3.css sidebar
const w3_open = function () {
  document.getElementById("mySidebar").style.display = "flex";
  document.getElementById("sidebar-open").style.display = "none"
};
const w3_close = function () {
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("sidebar-open").style.display = "flex"
};
