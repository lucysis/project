
$(function(){

	// topbar
	$("#topbar li").hover(function(){
		$(this).children('dl').slideDown(200);
	},function(){
		$(this).children('dl').slideUp(200);
	});
	$("#topbar dt a").hover(function() {
		// console.log($(this).index())
		if($(this).index() > 0){
			$(this).parents('dl').css({
				width: '210px',
			});
			$(this).parents('dl').children('dd').eq($(this).index() - 1).show();
		}

	}, function(){
		if($(this).index() > 0){
			$(this).parents('dl').css({
				width: '86px',
			});
			$(this).parents('dl').children('dd').eq($(this).index() - 1).hide();
		}
	});


	//header-main
	// $("#header-main #cart-bar").hover(function(){
	// 	$(this).children('.cartdetail').show();
	// }, function(){
	// 	$(this).children('.cartdetail').hide();
	// });


	//nav-bar
	$("#nav-bar ul.r li").hover(function(){
		$(this).css('width','115px').siblings().css('width','30px')
	});

	$("#nav-bar ul.l li").hover(function(){
		$(this).children('.nav-lstbox').slideDown(200);
	}, function(){
		$(this).children('.nav-lstbox').slideUp(200);
	});


	//nav-category
	var isOpen = false;
	$("#nav-category .all-category").hover(function(){
		if($(this).children('.category-box').css('display') == 'block')
			isOpen = true;
		$(this).children('.category-box').css('display', 'block');
	}, function(){
		if(!isOpen)
			$(this).children('.category-box').css('display', 'none');
	});

	$("#nav-category .category-box li").hover(function(){
		$(this).find(".other-box").show();
	}, function(){
		$(this).find(".other-box").hide();
	});


	$("#nav-category .tj-category li:not(:last)").hover(function(){
		var index = $(this).index(),
			step = $(this).outerWidth() + 15;
			//console.log(step)
		$("#nav-category #magic-line").show();
		$("#nav-category #magic-line").stop(true).animate({'left': step * index}, 500);
	}, function(){
		$("#nav-category #magic-line").hide();
	});


	//sidebar
	//运动提示
	$("#sidebar .mui-tab:not(:last)").hover(function(){
		$(this).children('.mui-tab-tip').css({
			display: 'block'
		}).stop(true).animate({
			'right': '38px',
			opacity: 1
			},300);
	}, function(){
		$(this).children('.mui-tab-tip').css({
			display: 'none'
		}).stop(true).animate({
			'right': '70px',
			opacity: 0
			},300);
	});
	$("#sidebar .mui-tab:last").hover(function(){
		$(this).children('.mui-tab-tip').css({
			display: 'block'
		}).stop(true).animate({
			'right': '88px',
			opacity: 1
			},300);
	}, function(){
		$(this).children('.mui-tab-tip').css({
			display: 'none'
		}).stop(true).animate({
			'right': '120px',
			opacity: 0
			},300);
	});

	//显示回到顶部按钮
	$(window).scroll(function(){
		var scrTop = $(window).scrollTop(),
		scrHeight = $(window).height();
		if(scrTop > scrHeight)
			$("#returnTop").css('visibility', 'visible');
		else
			$("#retunTop").css('visibility', 'hidden');
	});

	//回到顶部
	$("#sidebar #goTop").click(function(){
		var timer = setInterval(function () {
            var backtop = $(window).scrollTop(),
            	speedtop = backtop / 8;
            $("html,body").scrollTop(backtop - speedtop);
            if(backtop == 0){
                clearInterval(timer);
            }
        }, 30);
        
		// $("html,body").animate({scrollTop: 0}, 1000);
        
	});

	//购物车显示
	$("#sidebar #cartcont").click(function(){
		$("#sidebar #sidecart-cont").show();
		$("#sidebar #sidecart-cont .btn-close").click(function(){
			$("#sidebar #sidecart-cont").hide();
		});
	});

	
	// var pronum = parseInt($("#sidebar #cartnum").text());
	setInterval(function(){
		//购物车显示
		if($.cookie('pro')){
			$("#sidebar #cartnum").text(2);
		}

		//登录信息修改
		if($.cookie('loginuser')){
			if(!$.cookie('loginuser'))
				return;
			var loginuser = JSON.parse($.cookie('loginuser'));
			$("#topbar #login-bar .loginregister").hide();
			$("#topbar #login-bar .userlogin a:eq(0)").text(loginuser);
			$("#topbar #login-bar .userlogin").show();
		}
	},100);

	//注销
	$("#topbar #login-bar .userlogin .zhuxiao").click(function(){
		$.cookie('loginuser', "" ,{path: "/", expiress: -1});
		$("#topbar #login-bar .loginregister").show();
		$("#topbar #login-bar .userlogin").hide();
	});

});















