

$(() => {
  $("#optionsForm").on("submit", function (event) {
    event.preventDefault();

    const form = $(this);
    console.log(form);

    let formInfo = form.serialize();
    console.log(formInfo);

    $.post(`/api/stories`, formInfo, (response) => {
      renderStories(response)
    });
  });
});
