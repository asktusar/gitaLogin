$(document).ready(function(){
	if (localStorage.getItem("username") === null) {
		//$('#login_btn').click(function(){
		$("#loginForm").on( 'submit', function(){
			var form = $("#loginForm");    
			var e = $("#email").val();
			var p = $("#password").val();
			//console.log("click");
			if(e != "" && p != "") {
				$.ajax({ 
					 type: 'POST', 
					 url: 'http://pixelmarketing.biz/clientservertest/UserLogin.php', 
					 crossDomain: true,
					 data:  {email: e, password :p},
					 dataType: 'json', 
					 async: false,
					 success: function (response){ 
						//alert ("response"); 
						if (response.success) { 
							//alert("you're logged in");
							window.localStorage["email"] = e;
							window.localStorage["password"] = p;
							localStorage.setItem('username','e');							
							$("#loginPage").hide();
							$.mobile.changePage( "index.html#page2", {
								transition: "slide",
								reverse: false,
								changeHash: false
							});
						} 
						else {
							alert("Your login failed! Invalid Credentials");
							//window.location("main.html");
						}

				 },
							 error: function(error){
								alert('Could not connect to the database' + error);
								//window.location = "main.html";
							}
				}); 
		}
		else {
			//if the email and password is empty
			alert("You must enter email and password");
		
		}
		return false;
		});
	} else{
		$("#loginPage").hide();
		$.mobile.changePage( "index.html#page2", {
			transition: "slide",
			reverse: false,
			changeHash: false
		});
	}
});