// // Client facing scripts here

//const e = require("express");

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


$(document).ready(function () {
  

  const loggedInUserId = $('#loggedInUserId').text();

  if (loggedInUserId.length > 0) {

    let storyVote = undefined;
    let contributionVotes = {};

    const updateVote = function(vote, contributionId, callback) {
      let queryUrl = '';
      if (contributionId) {
        queryUrl = `http://localhost:8080/api/contributionVotes/${vote.id}`
      } else {
        queryUrl = `http://localhost:8080/api/storyVotes/${vote.id}`
      }
      $.ajax({
        url: queryUrl,
        data: vote,
        method: "POST",
        success: function(data, textStatus, jqXHR) {
          if (contributionId) {
            contributionVotes[contributionId] = data;
          } else {
            storyVote = data;
          }
          callback(contributionId);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log('problem', jqXHR);
        }
      });
    }

    const insertVote = function(vote, contributionId, callback) {
      if (contributionId) {
        queryUrl = `http://localhost:8080/api/contributionVotes/new`
      } else {
        queryUrl = `http://localhost:8080/api/storyVotes/new`
      }
      $.ajax({
        url: queryUrl,
        data: vote,
        method: "POST",
        success: function(data, textStatus, jqXHR) {
          if (contributionId) {
            contributionVotes[contributionId] = data;
          } else {
            storyVote = data;
          }
          callback(contributionId);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log('problem', jqXHR);
        }
      });
    }

    const deleteVote = function(vote, contributionId, callback) {
      if (contributionId) {
        queryUrl = `http://localhost:8080/api/contributionVotes/delete/${vote.id}`
      } else {
        queryUrl = `http://localhost:8080/api/storyVotes/delete/${vote.id}`
      }
      $.ajax({
        url: queryUrl,
        data: vote,
        method: "POST",
        success: function(data, textStatus, jqXHR) {
          if (contributionId) {
            contributionVotes[contributionId] = data;
          } else {
            storyVote = data;
          }
          callback(contributionId);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log('problem', jqXHR);
        }
      });
    }

    const setVoteUp = function(contributionId) {
      let vote = undefined;
      if (contributionId) {
        vote = contributionVotes[contributionId];
      } else {
        vote = storyVote;
      }
      
      if (!vote) {
        vote = { 
          story_id: $('#storyId').text(),
          voter_id: loggedInUserId,
          vote: true,
          deleted: false
        }
        insertVote(vote, contributionId, markUpVote);
      } else {
        vote.vote = true;
        vote.deleted = false;
        updateVote(vote, contributionId, markUpVote);
      }
    }

    const deleteVoteUp = function(contributionId) {
      let vote = undefined;
      if (contributionId) {
        vote = contributionVotes[contributionId];
      } else {
        vote = storyVote;
      }
      if (vote) {
        deleteVote(vote, contributionId, clearUpVote);
      }
    }

    const setVoteDown = function(contributionId) {
      let vote = undefined;
      if (contributionId) {
        vote = contributionVotes[contributionId];
      } else {
        vote = storyVote;
      }

      if (!vote) {
        vote = { 
          story_id: $('#storyId').text(),
          voter_id: loggedInUserId,
          vote: false,
          deleted: false
        }
        insertVote(vote, contributionId, markDownVote);
      } else {
        vote.vote = false;
        vote.deleted = false;
        updateVote(vote, contributionId, markDownVote);
      }
    }

    const deleteVoteDown = function(contributionId) {
      let vote = undefined;
      if (contributionId) {
        vote = contributionVotes[contributionId];
      } else {
        vote = storyVote;
      }
      if (vote) {
        deleteVote(vote, contributionId, clearDownVote);
      }
    }

    $('#storyUp').on("click", (event) => {
      if ((storyVote) && (storyVote.vote) && (!storyVote.deleted)) {
        deleteVoteUp();
      } else {
        setVoteUp();
      }
    });

    $('#storyDown').on("click", (event) => {
      if ((storyVote) && (!storyVote.vote) && (!storyVote.deleted)) {
        deleteVoteDown();
      } else {
        setVoteDown();
      }
    });

    const markUpVote = function(contributionId) {
      if (contributionId){
        console.log('upvote cont:', contributionId);
      } else{
        console.log('upvote: story');
      }
    }

    const clearUpVote = function(contributionId) {
      if (contributionId){
        console.log('clear upvote cont:', contributionId);
      } else{
        console.log('clear upvote: story');
      }
    }

    const markDownVote = function(contributionId) {
      if (contributionId){
        console.log('downvote cont:', contributionId);
      } else{
        console.log('downvote: story');
      }
    }

    const clearDownVote = function(contributionId) {
      if (contributionId){
        console.log('clear downvote cont:', contributionId);
      } else{
        console.log('clear downvote: story');
      }
    }

    //load this users story vote for this story
    $.ajax({
      url: `http://localhost:8080/api/storyVotes/list/${$('#storyId').text()}/${loggedInUserId}`,
      context: document.body,
      data: true,
      method: "GET",
      success: function(data, textStatus, jqXHR) {

        storyVote = data[0]; 
        if ((storyVote) && (!storyVote.deleted)) {
          if (storyVote.vote) {
            markUpVote();
          } else {
            markDownVote();
          }
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        if (jqXHR.status === 404) {
          return; 
        }
        console.log('error getting story vote object', textStatus);
      }
    });

    //for each contribution, load this users vote for that contribution
    $.each($('.contribution'), function(i, val) { 
      const contributionId = val.id;
      let contributionVote = {};
      //load this users story vote for this story
      $.ajax({
        url: `http://localhost:8080/api/contributionVotes/list/${contributionId}/${loggedInUserId}`,
        context: document.body,
        data: true,
        method: "GET",
        success: function(data, textStatus, jqXHR) {
          contributionVotes[contributionId] = data[0]; 
          if ((contributionVotes[contributionId]) && (!contributionVotes[contributionId].deleted)) {
            if (contributionVotes[contributionId].vote) {
              markUpVote(contributionId);
            } else {
              markDownVote(contributionId);
            }
          }
        },
        error: function(jqXHR, textStatus, errorThrown) {
          if (jqXHR.status === 404) {
            return; 
          }
          console.log('error getting story vote object', textStatus);
        }
      });
      //need to add button scripts
      $(`#contributionUp${contributionId}`).on("click", (event) => {
        if ((contributionVotes[contributionId]) && (contributionVotes[contributionId].vote) && (!contributionVotes[contributionId].deleted)) {
          deleteVoteUp(contributionId);
        } else {
          setVoteUp(contributionId);
        }
      });
  
      $(`#contributionDown${contributionId}`).on("click", (event) => {
        if ((contributionVotes[contributionId]) && (!contributionVotes[contributionId].vote) && (!contributionVotes[contributionId].deleted)) {
          deleteVoteDown(contributionId);
        } else {
          setVoteDown(contributionId);
        }
      });

    });
  }
});
