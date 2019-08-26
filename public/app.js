//Scrape Button
$("#scrapeBtn").on("click", function() {
    $.ajax({
        method: "GET",
        url: "/scrape",
    })
    .then(function (err,results) {
        if (err) {
            console.log(err);
        } else {
            console.log("scraping...");
            location.reload();
        };
    });
});

//Save Article
$(".articleSave").on("click", function () {
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
$(".articleRemove").on("click", function () {
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

// Add Comment
$(".saveComment").on("click", function () {
    var articleID = $(this).attr("data-_id");
    $.ajax({
        method: "POST",
        url: "/articles" + articleID,
        data: {
            author: $("#author").val(),
            comment: $("#commentT").val()
        }
    })
    .then(function(data){
        console.log(data);
        location.reload();
        $("#author").val("");
        $("#commentT").val("");
    }).catch(function(error){
        console.log(error);
    });
});


//Remove Comment

//Clear Button
$("#clearBtn").on("click", function () {
    $.ajax({
        method: "GET",
        url: "/clear",
    })
    .then(function () {
        location.reload();
    });
});
