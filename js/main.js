$(document).ready(function(){
	if (localStorage.getItem("username") === null) {
		$('#login_btn').click(function(){
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
							localStorage.setItem('username',e);							
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
	
	if (localStorage.getItem("username") != ''){
		
		var username = localStorage.getItem("username");
		
		// =================================================== //
		// Load the Latest notice
		// =================================================== //
		
		var noticeOutput = $('#noticesPage .content ul');
	
		$.ajax({
			url: 'http://pixelmarketing.biz/clientservertest/noticeboard.php',
			crossDomain: true,
			dataType: 'jsonp',
			cache : false,
			jsonp: 'jsoncallback',
			timeout: 5000,
			success: function(data, status){
				$.each(data, function(i,item){ 
					var landmark = '<li><p class="notice-title">'+item.notice_title+'</p><small>Posted on:'+item.posted_on+'</small><p class="notice-detail">'+item.notice_detail+'</p></li>';
				
					noticeOutput.append(landmark);
				});
			},
			error: function(){
			   noticeOutput.text('There was an error loading the data.');
			}
		});
		
		// =================================================== //
		// Load the Latest Events List
		// =================================================== //
		var eventsOutput = $('#eventsPage .content ul');
	
		$.ajax({
			url: 'http://pixelmarketing.biz/clientservertest/eventslist.php',
			crossDomain: true,
			dataType: 'jsonp',
			cache : false,
			jsonp: 'jsoncallback',
			timeout: 5000,
			success: function(data, status){
				$.each(data, function(i,item){ 
					var eventslist = '<li><p class="notice-title">'+item.event_title+'</p><small>Posted on:'+item.posted_on+'</small><p class="notice-detail">'+item.event_detail+'</p></li>';
				
					eventsOutput.append(eventslist);
				});
			},
			error: function(){
			   eventsOutput.text('There was an error loading the data.');
			}
		});
		// =================================================== //
		// Load the Latest Schedules List
		// =================================================== //
		var schedulesOutput = $('#schedulesPage .content ul');
	
		$.ajax({
			url: 'http://pixelmarketing.biz/clientservertest/schedules.php',
			crossDomain: true,
			dataType: 'jsonp',
			cache : false,
			jsonp: 'jsoncallback',
			timeout: 5000,
			success: function(data, status){
				$.each(data, function(i,item){ 
					var scheduleslist = '<li><p class="notice-title">'+item.schedule_title+'</p><small>Posted on:'+item.posted_on+'</small><p class="notice-detail">'+item.schedule_detail+'</p></li>';
				
					schedulesOutput.append(scheduleslist);
				});
			},
			error: function(){
			   schedulesOutput.text('There was an error loading the data.');
			}
		});
		
		// =================================================== //
		// Load the Latest attendance
		// =================================================== //
		var attendanceOutput = $('#attendancePage .content table');
	
		$.ajax({
			type: 'GET',
			url: 'http://pixelmarketing.biz/clientservertest/attendance.php',
			crossDomain: true,
			cache : false,
			dataType: 'jsonp',
			data:  {email: username},
			jsonp: 'jsoncallback',
			timeout: 5000,
			success: function(data, status){
				$.each(data, function(i,item){ 
					var attendance = '<tr><td>'+item.date+'</td><td>'+item.attendance+'</td></tr>';
				
					attendanceOutput.append(attendance);
				});
			},
			error: function(){
			   attendanceOutput.text('There was an error loading the data.');
			}
		});
	}
	document.addEventListener("backbutton", function(e){
		if($.mobile.activePage.is('#homepage')){
			e.preventDefault();
			navigator.app.exitApp();
		}
		else {
			navigator.app.backHistory()
		}
	}, false);
});