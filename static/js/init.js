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
});