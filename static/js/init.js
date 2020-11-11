gameList = []

function updateTable() {
    tempGameList = [];
    let i = 1;
    $('#gameTable').find("tr:gt(0)").remove();
    gameList.forEach(function(game) {
        game = game.data;
        if (tempGameList.indexOf(game.title) === -1) {
            tempGameList.push(game.title);
            $('#gameTable tbody').append(
                `<tr id="${"td_" + i}">
                    <td>${i}</td>
                    <td>${game.title}</td>
                    <td>${game.summary}</td>
                    <td>${game.categories}</td>
                    <td><a href="${game.url}">${game.url}</a></td>
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

    $('#wiki-title-submit').click(function () {
        event.preventDefault();
        $.ajax({
            type: 'POST',
            data: {title: $('#wikiTitle').val(), sentences: $('#numSentenceSummary').val()},
            url: '/searchTheWiki',
            success: function (data) {
                $('#wikiTitle').val("");
                $('#sampleGames').val("");
                if (data.status === "Success") {
                    let categoryString = "";
                    let i = 0;
                    if (Object.entries(data.categories).length > 0) {
                        for (let category of data.categories) {
                            categoryString = categoryString + category['title'].split("Category:")[1] + ', ';
                            if (i === 3) {
                                break;
                            }
                            i++;
                        }
                    }
                    data.categories = categoryString;
                    $('#wikiResults').html("Successfully added: " + data.title + ".");
                    gameList.push({data});
                    updateTable();
                }
                else {
                    $('#wikiResults').html(data.status);
                }
            }
        });
    })

    $(document).on("click", "#gameTable tbody tr td", function(e) {
        let row = $(this).closest("tr");
        let title = row.find("td:eq(1)").text();
        gameList.forEach(function(game) {

            game = game.data;
            if (title === game.title) {
                $("#wiki-image").attr("src", game.image);
                $('#selectedGame').html(game.title);
                $('#selectedText').html("Selected Game");
                $('#wikiResults').html("Selected " + game.title + ".");
            }
        });
    });

    $('tbody').sortable({
        update: function(event, ui) {
            let strippedArray = [];
            for (item of ($('tbody').sortable('toArray'))) {
                if (item !== "") {
                    strippedArray.push(item.split('_')[1]);
                }
            }
            console.log(gameList);
            let newGameList = [];

            for (let index of strippedArray) {
                newGameList.push(gameList[parseInt(index) - 1]);
            }
            gameList = newGameList;
            updateTable();
        }
    });

    $('#deleteSelected').click(function() {
        let title = $('#selectedGame').text();
        console.log(title);
        if (title === "") {
            $('#wikiResults').html("No game selected.");
        }
        else {
            gameList = gameList.filter(function( obj ) {
                return obj.data.title !== title;
            });

            updateTable();
            $("#wiki-image").attr("src", "");
            $('#wikiResults').html("Removed " + title + ".");
            $('#selectedGame').html("");
            $('#selectedText').html("");
        }
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
