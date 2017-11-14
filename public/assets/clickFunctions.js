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
            success: function(thisUser) {
                console.log("***We are in success****")
                console.log(thisUser)

                if(thisUser.errors){
                    console.log("Errors do perhaps exist maybe");
                    var errorString = ""
                               
                $.each(thisUser.errors, function(error) {
                    console.log(error)
                    console.log(this.msg)
                    errorString += (this.msg + '\n')                      
                })
                console.log("final message " + errorString)
            }
            else{
                location.href = '/completeReg/' + thisUser.user.username;
                console.log("No errors!")
            }
        }

        })
    })


}) //End of document.ready