// // Client facing scripts here

// //contributions AJAX
// $(document).ready(function () {

//   const renderContributions = function (contributions) {
//     const $contributionContainer = $(".contribution-container");
//     $contributionContainer.empty();

//     contributions.forEach((contribution) => {
//       const $contributing = createContributionElement(contribution);
//       $contributionContainer.prepend($contributing);
//     });
//   };

// $('.contribution-form').submit(function(event) {
//   event.preventDefault();

//   $.ajax({
//     url: '/story/:id',
//     method: 'POST',
//     data: formData,
//   })
//     .then(function(response) {
//       loadContributions();
//     })
//     .catch(function(error) {
//       console.error('Error saving contribution:', error);
//     });
// });


// const loadContributions = function () {

//   $.ajax({
//     method: "GET",
//     url: "/story/:id",
//   })
//     .then(function (response) {

//       renderContributions(response);
//     })
//     .catch(function (error) {
//       console.error("Error fetching contributions:", error);
//     });
// };

// loadContributions();
// });
