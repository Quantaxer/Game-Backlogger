gameList = []

function updateTable() {
    tempGameList = [];
    let i = 1;
    $('#gameTable').find("tr:gt(0)").remove();
    gameList.forEach(function(game) {

        game = game.data;
        if (tempGameList.indexOf(game.title) === -1) {
            tempGameList.push(game.title);
            $('#gameTable').append(
                `<tr>
                    <td>${i}</td>
                    <td>${game.title}</td>
                    <td>${game.summary}</td>
                    <td>${game.categories}</td>
                    <td><a href="${game.url}">Wikipedia Article</a></td>
                </tr>`
            );

            i++;
        }
        else {
            $('#wikiResults').html("That game is already in your list!");
        }
    });
}

$(document).ready(function () {
    console.log("Peter Hudel, 1012673");

    $('#login-submit').click(function () {
        event.preventDefault();
        $.ajax({
            type: 'POST',
            data: {username: $('#username').val(), password: $('#password').val()},
            url: '/login',
            success: function (data) {
                if (data.status === "Successfully logged in") {
                    location.reload();
                }
                else{
                    $('#dbResults').html(data.status);
                }
            }
        });
    });

    $('#registerUser').click(function () {
        $.ajax({
            type: 'GET',
            url: '/switchCreateUserState',
            success: function (data) {
                location.reload();
            }
        });
    });

    $('#logout').click(function () {
        $.ajax({
            type: 'GET',
            url: '/logout',
            success: function (data) {
                location.reload();
            }
        });
    });

    $('#goBack').click(function () {
        $.ajax({
            type: 'GET',
            url: '/switchCreateUserState',
            success: function (data) {
                location.reload();
            }
        });
    });

    $('#r-submit').click(function () {
        event.preventDefault();
        $.ajax({
            type: 'POST',
            data: {username: $('#r-username').val(), password: $('#r-password').val(), confirm: $('#r-password2').val()},
            url: '/register',
            success: function (data) {
                if (data.status === "Created new user") {
                    $(location).attr('href', '/')
                }
                else{
                    $('#dbResults').html(data.status);
                }
            }
        });
    });
    
    $('#query-db-row').click(function () {
		$.ajax({
            type: 'GET',
            contentType: 'application/json',
            url: '/query',
            success: function (data) {
                if (data.numrows > 0) {
                    $("#videogame-name").text("Name: " + data.res[0][1]);
                    $("#videogame-description").text("Description: " + data.res[0][2]);
                    $("#videogame-priority").text("Priority to play: " + data.res[0][3]);
                }
                else {
                    $("#videogame-name").text("Name: ");
                    $("#videogame-description").text("Description: ");
                    $("#videogame-priority").text("Priority to play: ");
                }
                $('#dbResults').html(data.status);
            }
        });
    });

    $('#add-db-row').click(function () {
		$.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: '/add',
            success: function (data) {
                $('#dbResults').html(data.status);
            }
        });
    });

    $('#modify-db-row').click(function () {
        $.ajax({
            type: 'PUT',
            contentType: 'application/json',
            url: '/modify',
            success: function (data) {
                $('#dbResults').html(data.status);
            }
        });
  });

    $('#delete-db-row').click(function () {
        $.ajax({
            type: 'DELETE',
            contentType: 'application/json',
            url: '/delete',
            success: function (data) {
                $('#dbResults').html(data.status);
            }
        });
    });

    $('#wiki-title-submit').click(function () {
        event.preventDefault();
        $.ajax({
            type: 'POST',
            data: {title: $('#wikiTitle').val(), sentences: $('#numSentenceSummary').val()},
            url: '/searchTheWiki',
            success: function (data) {
                let categoryString = "";
                let i = 0;
                if (Object.entries(data.categories).length > 0) {
                    for (let category of data.categories) {
                        categoryString = categoryString + category['title'].split("Category:")[1] + ', ';
                        if (i > 5) {
                            break;
                        }
                        i++;
                    }
                }
                data.categories = categoryString;
                gameList.push({data});
                updateTable();
            }
        });
    })

    $(document).on("click", "#gameTable tr td", function(e) {
        let row = $(this).closest("tr");
        let title = row.find("td:eq(1)").text();
        gameList.forEach(function(game) {

            game = game.data;
            if (title === game.title) {
                $("#wiki-image").attr("src", game.image);
                $('#selectedGame').html(game.title);

            }
        });
    });

    $('#deleteSelected').click(function() {
        let title = $('#selectedGame').text();

        gameList = gameList.filter(function( obj ) {
            return obj.data.title !== title;
        });

        updateTable();
        $("#wiki-image").attr("src", "");
        $('#selectedGame').html("");
    });

    $('#sampleGames').change(function() {
        $('#wikiTitle').val($('#sampleGames').val());
    });
});

var slider = document.getElementById("numSentenceSummary");
var output = document.getElementById("sliderOutput");
output.innerHTML = "Number of sentences in video game summary: " + slider.value;

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = "Number of sentences in video game summary: " + this.value;
}
