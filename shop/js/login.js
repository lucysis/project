$(function(){


	//登录
	var usermessage,username,password;
	$("input").val("");
	$("#username").blur(function() {
		$(this).next().hide();
		username = $(this).val();
		if($.cookie('usermessage'))
			usermessage = JSON.parse($.cookie('usermessage'));
		else{
			$(this).next().show();
			$(this).next().find('span').text('用户名不存在，请重新输入');
			return;
		}
		if(usermessage[username] == null){
			$(this).next().show();
			$(this).next().find('span').text('用户名不存在，请重新输入');
		}
	});

	$("#password").blur(function() {
		$(this).next().hide();
		password = $(this).val();
		if(!(password == usermessage[username])){
			$(this).next().show();
			$(this).next().find('span').text('密码不正确，请重新输入');
		}
	});

	$("#login-btn").click(function(){
		$.cookie('loginuser', username, {path: "/",expiress: 7});
	});

});