$(document).ready(function() {
  const loggedInUserId = $("#loggedInUserId").text();

  if (loggedInUserId.length > 0) {
    let storyVote = undefined;
    let contributionVotes = {};

    const updateVote = function(vote, contributionId, callback) {
      let queryUrl = "";
      if (contributionId) {
        queryUrl = `http://localhost:8080/api/contributionVotes/${vote.id}`;
      } else {
        queryUrl = `http://localhost:8080/api/storyVotes/${vote.id}`;
      }
      $.ajax({
        url: queryUrl,
        data: vote,
        method: "POST",
        success: function(data) {
          if (contributionId) {
            contributionVotes[contributionId] = data;
          } else {
            storyVote = data;
          }
          callback(contributionId, true);
        },
        error: function(jqXHR) {
          console.log("error", jqXHR);
        },
      });
    };

    const insertVote = function(vote, contributionId, callback) {
      if (contributionId) {
        queryUrl = `http://localhost:8080/api/contributionVotes/new`;
      } else {
        queryUrl = `http://localhost:8080/api/storyVotes/new`;
      }
      $.ajax({
        url: queryUrl,
        data: vote,
        method: "POST",
        success: function(data) {
          if (contributionId) {
            contributionVotes[contributionId] = data;
          } else {
            storyVote = data;
          }
          callback(contributionId, true);
        },
        error: function(jqXHR) {
          console.log("error", jqXHR);
        },
      });
    };

    const deleteVote = function(vote, contributionId, callback) {
      if (contributionId) {
        queryUrl = `http://localhost:8080/api/contributionVotes/delete/${vote.id}`;
      } else {
        queryUrl = `http://localhost:8080/api/storyVotes/delete/${vote.id}`;
      }
      $.ajax({
        url: queryUrl,
        data: vote,
        method: "POST",
        success: function(data) {
          if (contributionId) {
            contributionVotes[contributionId] = data;
          } else {
            storyVote = data;
          }
          callback(contributionId, true);
        },
        error: function(jqXHR) {
          console.log("error", jqXHR);
        },
      });
    };

    const setVoteUp = function(contributionId) {
      let vote = undefined;
      if (contributionId) {
        vote = contributionVotes[contributionId];
      } else {
        vote = storyVote;
      }

      if (!vote) {
        vote = {
          voter_id: loggedInUserId,
          vote: true,
          deleted: false,
        };
        if (contributionId) {
          vote["contribution_id"] = contributionId;
        } else {
          vote["story_id"] = $("#storyId").text();
        }
        insertVote(vote, contributionId, markUpVote);
      } else {
        vote.vote = true;
        vote.deleted = false;
        updateVote(vote, contributionId, markUpVote);
      }
    };

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
    };

    const setVoteDown = function(contributionId) {
      let vote = undefined;
      if (contributionId) {
        vote = contributionVotes[contributionId];
      } else {
        vote = storyVote;
      }

      if (!vote) {
        vote = {
          voter_id: loggedInUserId,
          vote: false,
          deleted: false,
        };
        if (contributionId) {
          vote["contribution_id"] = contributionId;
        } else {
          vote["story_id"] = $("#storyId").text();
        }
        insertVote(vote, contributionId, markDownVote);
      } else {
        vote.vote = false;
        vote.deleted = false;
        updateVote(vote, contributionId, markDownVote);
      }
    };

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
    };

    $("#storyUp").on("click", () => {
      if (storyVote && storyVote.vote && !storyVote.deleted) {
        deleteVoteUp();
      } else {
        setVoteUp();
      }
    });

    $("#storyDown").on("click", () => {
      if (storyVote && !storyVote.vote && !storyVote.deleted) {
        deleteVoteDown();
      } else {
        setVoteDown();
      }
    });

    const markUpVote = function(contributionId, adjustCounts) {
      if (contributionId) {
        if (adjustCounts) {
          $(`#contributionUpVoteCount${contributionId}`).text(
            Number($(`#contributionUpVoteCount${contributionId}`).text()) + 1
          );
          if (
            $(`#contributionDown${contributionId}`).hasClass("voteSelected")
          ) {
            $(`#contributionDownVoteCount${contributionId}`).text(
              Number($(`#contributionDownVoteCount${contributionId}`).text()) -
                1
            );
          }
        }
        $(`#contributionUp${contributionId}`).addClass("voteSelected");
        $(`#contributionDown${contributionId}`).removeClass("voteSelected");
      } else {
        if (adjustCounts) {
          $("#storyUpVoteCount").text(
            Number($("#storyUpVoteCount").text()) + 1
          );
          if ($(`#storyDown`).hasClass("voteSelected")) {
            $("#storyDownVoteCount").text(
              Number($("#storyDownVoteCount").text()) - 1
            );
          }
        }
        $(`#storyUp`).addClass("voteSelected");
        $(`#storyDown`).removeClass("voteSelected");
      }
    };

    const clearUpVote = function(contributionId, adjustCounts) {
      if (contributionId) {
        if (adjustCounts) {
          $(`#contributionUpVoteCount${contributionId}`).text(
            Number($(`#contributionUpVoteCount${contributionId}`).text()) - 1
          );
        }
        $(`#contributionUp${contributionId}`).removeClass("voteSelected");
      } else {
        if (adjustCounts) {
          $("#storyUpVoteCount").text(
            Number($("#storyUpVoteCount").text()) - 1
          );
        }
        $(`#storyUp`).removeClass("voteSelected");
      }
    };

    const markDownVote = function(contributionId, adjustCounts) {
      if (contributionId) {
        if (adjustCounts) {
          $(`#contributionDownVoteCount${contributionId}`).text(
            Number($(`#contributionDownVoteCount${contributionId}`).text()) + 1
          );
          if ($(`#contributionUp${contributionId}`).hasClass("voteSelected")) {
            $(`#contributionUpVoteCount${contributionId}`).text(
              Number($(`#contributionUpVoteCount${contributionId}`).text()) - 1
            );
          }
        }
        $(`#contributionDown${contributionId}`).addClass("voteSelected");
        $(`#contributionUp${contributionId}`).removeClass("voteSelected");
      } else {
        if (adjustCounts) {
          $("#storyDownVoteCount").text(
            Number($("#storyDownVoteCount").text()) + 1
          );
          if ($(`#storyUp`).hasClass("voteSelected")) {
            $("#storyUpVoteCount").text(
              Number($("#storyUpVoteCount").text()) - 1
            );
          }
        }
        $(`#storyDown`).addClass("voteSelected");
        $(`#storyUp`).removeClass("voteSelected");
      }
    };

    const clearDownVote = function(contributionId, adjustCounts) {
      if (contributionId) {
        if (adjustCounts) {
          $(`#contributionDownVoteCount${contributionId}`).text(
            Number($(`#contributionDownVoteCount${contributionId}`).text()) - 1
          );
        }
        $(`#contributionDown${contributionId}`).removeClass("voteSelected");
      } else {
        if (adjustCounts) {
          $("#storyDownVoteCount").text(
            Number($("#storyDownVoteCount").text()) - 1
          );
        }
        $(`#storyDown`).removeClass("voteSelected");
      }
    };

    //load this users story vote for this story
    $.ajax({
      url: `http://localhost:8080/api/storyVotes/list/${$(
        "#storyId"
      ).text()}/${loggedInUserId}`,
      context: document.body,
      data: true,
      method: "GET",
      success: function(data) {
        storyVote = data[0];
        if (storyVote && !storyVote.deleted) {
          if (storyVote.vote) {
            markUpVote();
          } else {
            markDownVote();
          }
        }
      },
      error: function(jqXHR, textStatus) {
        if (jqXHR.status === 404) {
          return;
        }
        console.log("error getting story vote object", textStatus);
      },
    });

    //for each contribution, load this users vote for that contribution
    $.each($(".contribution"), function(i, val) {
      const contributionId = val.id;
      //load this users story vote for this story
      $.ajax({
        url: `http://localhost:8080/api/contributionVotes/list/${contributionId}/${loggedInUserId}`,
        context: document.body,
        data: true,
        method: "GET",
        success: function(data) {
          contributionVotes[contributionId] = data[0];
          if (
            contributionVotes[contributionId] &&
            !contributionVotes[contributionId].deleted
          ) {
            if (contributionVotes[contributionId].vote) {
              markUpVote(contributionId);
            } else {
              markDownVote(contributionId);
            }
          }
        },
        error: function(jqXHR, textStatus) {
          if (jqXHR.status === 404) {
            return;
          }
          console.log("error getting story vote object", textStatus);
        },
      });
      //need to add button scripts
      $(`#contributionUp${contributionId}`).on("click", () => {
        if (
          contributionVotes[contributionId] &&
          contributionVotes[contributionId].vote &&
          !contributionVotes[contributionId].deleted
        ) {
          deleteVoteUp(contributionId);
        } else {
          setVoteUp(contributionId);
        }
      });

      $(`#contributionDown${contributionId}`).on("click", () => {
        if (
          contributionVotes[contributionId] &&
          !contributionVotes[contributionId].vote &&
          !contributionVotes[contributionId].deleted
        ) {
          deleteVoteDown(contributionId);
        } else {
          setVoteDown(contributionId);
        }
      });
    });
  }
});
