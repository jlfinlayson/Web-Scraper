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
        url: "/removed/" + articleID,
        data: {
            saved: false
        }
    })
    .then(function (result) {
        console.log(result);
        location.reload();
    });
});

//Scrape Button

//Clear Button

//Add Comment

//Remove Comment