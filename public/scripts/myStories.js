$(document).ready(function () {
  $.post("/api/stories/myStories/load", (response) => {
    renderStories(response);
  });
});
