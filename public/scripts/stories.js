
//document ready for /stories
$(document).ready(function () {

  $.get('/stories/load', (response) => {
    renderStories(response);
  })
  
  // listens for submit on form
  $("#optionsForm").on("submit", function (event) {
    event.preventDefault();

    //serialize the form
    const form = $(this);
    let formInfo = form.serialize();

    // post form to /api/stories
    $.post(`/api/stories`, formInfo, (response) => {
      renderStories(response);
    });
  });


});
