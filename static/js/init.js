$(document).ready(function () {
    console.log("Peter Hudel, 1012673");
    console.log("----COOKIE SETTING DECISION----");
    console.log(`I chose to set cookies on the server side on my Flask app because it was simply more convenient for authentication in my case. 
    Because I do my authentication on a sql database, rather than setting a flag to tell the client that the authentication was successful, I'd rather set the
    cookie as soon as I know that the login was good. From there, I can simply refresh the user's page to display the correct webpage. IF they do not have
    the cookie, then they will be booted back to the login screen. I figured that this would make the app a bit more secure.`)

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