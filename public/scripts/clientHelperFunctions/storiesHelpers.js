// renders stories
//empties the story container and runs the createStoryElement function on each story
const renderStories = function(stories) {
  const $stories_container = $("#stories_container");

  $stories_container.empty();

  $.each(stories, function(index, storyObj) {
    $stories_container.append(createStoryElement(storyObj));
  });
};

const createStoryElement = function(storyObj) {
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

  const createdDateLocal = convertToLocaleTime(created_date);
  const completedDateLocal = convertToLocaleTime(completed_date);

  const $story = $("<article>");
  const $header = $("<header>");
  const $footer = $("<footer>");

  const $hTitle = $("<h2>");
  const $aTitle = $("<a>");
  const $pUsername = $("<p>");
  const $pCreatedDate = $("<p>");
  const $pCompletedDate = $("<p>");
  const $pVotes = $("<p>");
  const $pCompleted = $("<p>");

  $story.addClass("story_article");
  $header.addClass("story_header");
  $footer.addClass("story_footer");
  $aTitle.attr("href", `/story/${id}`);

  $aTitle.text(title);
  $pUsername.text(`by ${username}`);
  $pCreatedDate.text(`created on ${createdDateLocal}`);
  $pCompletedDate.text(`completed on ${completedDateLocal}`);
  $pVotes.text(`${upvotes} ${downvotes}`);

  if (completed) {
    $pCompleted.text("Finished");
  } else {
    $pCompleted.text("Ongoing");
  }

  $hTitle.append($aTitle);

  $header.append($hTitle);
  $header.append($pUsername);
  $footer.append($pCreatedDate);
  $footer.append($pCompletedDate);
  $footer.append($pVotes);
  $footer.append($pCompleted);

  $story.append($header);
  $story.append($footer);

  return $story;
};

// sidebar code heavily inspired by w3.css sidebar
const w3_open = function() {
  document.getElementById("mySidebar").style.display = "flex";
  document.getElementById("sidebar-open").style.display = "none";
};
const w3_close = function() {
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("sidebar-open").style.display = "flex";
};
