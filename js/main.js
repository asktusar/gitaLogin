$(document).ready(function(){
	if (localStorage.getItem("username") === null) {
		$('#login_btn').click(function(){
			$.mobile.loading( 'show', {
				text: 'foo',
				textVisible: true,
				theme: 'z',
				html: ""
			});
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
						$.mobile.loading( 'hide' );
						//alert ("response"); 
						if (response.success) { 
							//alert("you're logged in");
							window.localStorage["email"] = e;
							window.localStorage["password"] = p;
							localStorage.setItem('username','e');							
							$("#loginPage").hide();
							$.mobile.changePage( "page2.html", {
								transition: "slide",
								reverse: false,
								changeHash: false
							});
						} 
						else {
							$.mobile.loading( 'hide' );
							alert("Your login failed! Invalid Credentials");
							//window.location("main.html");
						}

				 },
							 error: function(error){
								$.mobile.loading( 'hide' );
								alert('Could not connect to the database' + error);
								//window.location = "main.html";
							}
				}); 
		}
		else {
			//if the email and password is empty
			$.mobile.loading( 'hide' );
			alert("You must enter email and password");
		
		}
		return false;
		});
	} else{
		$("#loginPage").hide();
		//$('#page2').show();
		$.mobile.changePage( "page2.html", {
			transition: "pop",
			reverse: false,
			changeHash: false
		});
	}
});