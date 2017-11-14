$(document).ready(function() {

    $("#submitReg").on("click", function(){
        event.preventDefault();

        var thisUser = {
            username: $("#username").val(),
            email: $("#email").val(),
            password: $("#password").val(),
            passwordMatch: $("#passwordMatch").val()
        }

        $.ajax({
            type: "POST", 
            url: "/api/newUser", 
            data: JSON.stringify(thisUser),
            dataType:'json', 
            contentType: 'application/json', 
            // success: console.log(thisUser)
            success: function(thisUser) {
                window.location.href = '/completeReg/' + thisUser.username
            }
        });
    })

}) //End of document.ready