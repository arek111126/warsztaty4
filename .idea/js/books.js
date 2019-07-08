$(function () {
    $.ajax({
        url: "http://localhost:8282/books",
        data: {},
        type: "GET",
        dataType: "json"
    }).done(function (result) {
        for (var i = 0; i < result.length; i++) {
            var newLi = $("<li>" + result[i].title + "</li>");
            $("ol").append(newLi);
            $("li").eq(i).after("<div></div>");
            $("li").eq(i).data("id", result[i].id);
        }


    })

    $("ol").on("click", "li", function () {

        var id = $(this).data("id");
        var newThis = $(this);
        var concatedUrl = "http://localhost:8282/books/" + id;

        $.ajax({
            url: concatedUrl,
            data: {},
            type: "GET",
            dataType: "json"
        }).done(function (result) {
            var author = result.author;
            var publisher = result.publisher;
            var type = result.type;
            var isbn = result.isbn;
            console.log(result);
            newThis.next().text(author + " " + publisher + " " + type + isbn);


        })

    })

    $("addBook").on("click",function () {

    })


})
