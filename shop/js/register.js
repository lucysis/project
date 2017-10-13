$(function(){

	//验证
	var password,password2,username,usermessage;
	if($.cookie('usermessage'))
		usermessage = JSON.parse($.cookie('usermessage'));
	else
		usermessage = {};
	$("input").val("");
	$("#username").blur(function(){
		$(this).next().hide();
		username = $(this).val();
		if(username.length < 5){
			$(this).next().show();
			$(this).next().find('span').text('格式有误，请使用正确的邮箱地址或手机号码');
		}
		if(usermessage[username]){
			$(this).next().show();
			$(this).next().find('span').text('该用户已存在，请重新输入');
		}
		else{
			if(username.indexOf("@") > 0){
				if(!(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(username))){
					$(this).next().show();
					$(this).next().find('span').text('格式有误，请使用正确的邮箱地址或手机号码');
				}
			}else{
				if(!(/^1[3|5|8]\d{9}$/i.test(username))){
					$(this).next().show();
					$(this).next().find('span').text('格式有误，请使用正确的邮箱地址或手机号码');
				}
			}
		}

	});

	
	$("#password").blur(function() {
		$(this).next().hide();
		password = $(this).val();
		if(!(/^[a-zA-Z0-9]{6,16}$/.test(password))){
			$(this).next().show();
			$(this).next().find('span').text('格式有误，请重新输入');
		}
	});

	$("#password2").blur(function() {
		$(this).next().hide();
		password2 = $(this).val();
		if(!(password2 === password)){
			$(this).next().show();
			$(this).next().find('span').text('两次密码不一致，请重新输入');
		}
	});

	$("#code").blur(function() {
		$(this).next().hide();
		var code = $(this).val();
		if(!(code === '5115')){
			$(this).next().show();
			$(this).next().find('span').text('输入错误，请重新输入');
		}
	});

	$("#register-btn").click(function() {
		usermessage[username] = password;
		$.cookie("usermessage", JSON.stringify(usermessage), {path: "/",expiress: 7});
	});



});