$(function () {
    showAll();
    function ajaxFunc(thisElem){
        var url = thisElem.data("url")
       var type =  thisElem.data("type");
       var id = thisElem.data("id");
       var data = thisElem.data("data");
       var dataType = thisElem.data("dataType");
       var contentType = thisElem.data("contentType");
       return  $.ajax({
            url: url+id,
            data: data,
            type: type,
            dataType: dataType,
            contentType: contentType,
        }).fail(function (xhr,status,err) {
           console.log("something went wrong");
           console.log(xhr);
           console.log(status);
           console.log(err);

       })
    }
    function showAll(){

     $(this).data("url","http://localhost:8282/books/");
     $(this).data("type","GET");
     $(this).data("id","");
     $(this).data("data","");
     $(this).data("dataType","json");
     $(this).data("contentType","application/json");


            $("li").remove();
            $("a").remove();
            $("div").remove();
            $.when(ajaxFunc($(this))).done(function(response){
                for (var i = 0; i < response.length; i++) {
                    var newLi = $("<li>" + response[i].title + "</li>");
                    var newA = $("<a>" + "usun" + "</a>");
                    $("ol").append(newLi);
                    $("li").eq(i).after(newA);
                    $("li").eq(i).after("<div></div>");
                    $("li").eq(i).data("id", response[i].id);
                }
        })




    }
    $("ol").on("click","a",function (event) {
        var id  = $(this).prev().prev().data("id");
        $(this).data("url","http://localhost:8282/books/");
        $(this).data("type","DELETE");
        $(this).data("id",id);
        $(this).data("data","");
        $(this).data("dataType","json");
        $(this).data("contentType","");
        console.log(id);
        $.when(ajaxFunc($(this))).done(function(response){
            showAll();
        })
    })
    $("ol").on("click", "li", function (event) {
        $(this).data("url","http://localhost:8282/books/");
        $(this).data("type","GET");
        $(this).data("id",$(this).data("id"));
        $(this).data("data","");
        $(this).data("dataType","json");
        $(this).data("contentType","");

        var newThis = $(this); //Nie można $(this) wywoołać w funkcji $.when bądź done gdyz wtedy będzie to this dotyczący żadania ajax. dlateog przypisuję this do finkcji przed zapytaniem ajax

        $.when(ajaxFunc($(this))).done(function (result) {

            var author = result.author;
            var publisher = result.publisher;
            var type = result.type;
            var isbn = result.isbn;
            newThis.next().text(author + " " + publisher + " " + type + isbn);


        })
    })

    $("button").on("click", function () {
        var isbn = $("input#isbn").val();
        var title = $("input#title").val();
        var author = $("input#author").val();
        var publisher = $("input#publisher").val();
        var type = $("input#type").val();
        $(this).data("url","http://localhost:8282/books/");
        $(this).data("type","POST");
        $(this).data("id","");
        $(this).data("data",JSON.stringify({

            "isbn": isbn,
            "title": title,
            "author": author,
            "publisher": publisher,
            "type": type
        }));
        $(this).data("dataType","json");
        $(this).data("contentType","application/json");

        $.when(ajaxFunc($(this))).done(function (result) {
            alert("Dodano książkę");
            showAll();
        })

    })


})
