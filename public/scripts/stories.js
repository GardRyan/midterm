

$(() => {
  $("#optionsForm").on("submit", function (event) {
    event.preventDefault();

    const form = $(this);
    console.log(form);

    let formInfo = form.serialize();

    $.post(`/api/stories`, formInfo, (response) => {
      renderStories(response)
    });
  });
});
