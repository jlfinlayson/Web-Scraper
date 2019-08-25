//Save Article
$(document).on("click", ".articleSave", function () {
    var articleID = $(this).attr("data-_id");
    $.ajax({
        method: "POST",
        url: "/saved/" + articleID,
        data: {
            saved: true
        }
    })
    .then(function (result) {
        console.log(result);
        location.reload();
    });
});

//Remove Article
$(document).on("click", ".articleRemove", function () {
    var articleID = $(this).attr("data-_id");
    $.ajax({
        method: "POST",
        url: "/remove/" + articleID,
        data: {
            saved: false
        }
    })
    .then(function () {
        location.reload();
    });
});

//Scrape Button

//Clear Button
$(document).on("click", "#clearBtn", function () {
    $.ajax({
        method: "GET",
        url: "/clear",
    })
    .then(function () {
        location.reload();
    });
});

//Add Comment

//Remove Comment