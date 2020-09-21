$(document).ready(function () {
    console.log("Peter Hudel, 1012673");
	
	//Replace with a Links animation
    $('#create-key').click(function () {
		$.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: '/addToObject',
            success: function (data) {
                console.log(data);
                $("#buttonText").text("Number of clicks: " + data.numberOfPresses);
            }
        });
    });

    $('#modify-key').click(function () {
        $.ajax({
            type: 'PUT',
            contentType: 'application/json',
            url: '/modifyObject',
            success: function (data) {
                console.log(data);
                $("#buttonText").text("Number of clicks: " + data.numberOfPresses);
            }
        });
  });

  $('#delete-key').click(function () {
    $.ajax({
        type: 'DELETE',
        contentType: 'application/json',
        url: '/deleteFromObject',
        success: function (data) {
            console.log(data);
            $("#buttonText").text("Number of clicks: " + data.numberOfPresses);
        }
    });
});
});