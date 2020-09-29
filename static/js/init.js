$(document).ready(function () {
    console.log("Peter Hudel, 1012673");
    console.log("----FINDINGS ABOUT QUERY SANITATION----");
    console.log("Findings about query sanitation: I learned that a user is able to directly inject their own query if you do not do this securely. This can be done by using parameterized statements.");
    console.log("For example: String sql = \"SELECT * FROM users WHERE email = '\" + email + \" is bad. It is better to do String sql = \"SELECT * FROM users WHERE email = %s, (email,). This way the query is entered safely rather than directly into the code");
    console.log("Reference: https://www.hacksplaining.com/prevention/sql-injection");
	
    $('#login-submit').click(function () {
        event.preventDefault();
        $.ajax({
            type: 'POST',
            data: {username: $('#username').val(), password: $('#password').val()},
            url: '/login',
            success: function (data) {
                $('#dbResults').html(data.status + " as " + data.user.username);
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