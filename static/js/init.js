$(document).ready(function () {

  // Load Links
  clippy.load('Links', function(agent) {
    // Do anything with the loaded agent
    agent.show();

    $('#artsy-button').click(function () {
      agent.play('GetArtsy');
    });
  });
	
	//Replace with a Links animation
    $('#alert-button').click(function () {
		  alert("Alert!");
    });
        
});