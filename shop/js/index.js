
$(function(){

	//banner 轮播
	var timer,index = 1,
		lis = $("#banner ul li"),
		btns = $("#banner ol li");
	function move(){
		if (index == lis.length)
			index = 0;
		lis.eq(index).css('z-index', 2).siblings().css('z-index', 1);
		btns.eq(index).addClass('active').siblings().removeClass('active');
		lis.eq(index).animate({opacity: 1}, 600, function(){
			lis.eq(index - 1).siblings().css('opacity', 0);
		});
		index++;
	}
	btns.each(function(ind){
		btns.eq(ind).hover(function(){
			index = ind;
			move();
		})
	});
	timer = setInterval(move, 3000);

	$("#banner #banner-box").hover(function(){
		clearInterval(timer);
	}, function(){
		timer = setInterval(move, 3000);
	});


	//左侧边栏
	$(window).scroll(function(){
		var showHeight = $("#mustcheck").position().top,
			limitHeight = $("#limitedoffer").position().top,
			hotHeight = $("#hotbrands").position().top,
			scrTop = $(window).scrollTop(),
			scrHeight = $(window).height();

		if(scrTop >= showHeight - scrHeight / 2 && scrTop < limitHeight - scrHeight / 2){
			$("#floor").fadeIn(1000);
			$("#floor li:eq(0)").addClass('current').siblings().removeClass('current');
		}
		else if(scrTop >= limitHeight - scrHeight / 2 && scrTop < hotHeight - scrHeight / 2){
			$("#floor").fadeIn(500);
			$("#floor li:eq(1)").addClass('current').siblings().removeClass('current');
		}
		else if(scrTop >= hotHeight - scrHeight / 2){
			$("#floor").fadeIn(500);
			$("#floor li:eq(3)").addClass('current').siblings().removeClass('current');
		}
		else
			$("#floor").fadeOut(500);

		if(scrTop >= showHeight)
			$("#float-search").fadeIn(1000);
		else
			$("#float-search").fadeOut(500);

	});

	var isCurrent = false;
	$("#floor li").hover(function(){
		if($(this).attr('class') == 'current')
			isCurrent = true;
		$(this).addClass('current');
	}, function(){
		if(!isCurrent)
			$(this).removeClass('current');
		isCurrent = false;
	});


	//limitedoffer 限时特卖
	$("#limitedoffer li").hover(function(){
		$(this).find('.buynow').show();
		$(this).find('img').addClass('blur');
	}, function(){
		$(this).find('.buynow').hide();
		$(this).find('img').removeClass('blur');
	});


	//hotbrands 热门品牌
	
	$("#hotbrands .brand-tab li:not(:last)").hover(function(){
		var liWidth = $("#hotbrands .brand-tab li").eq(0).outerWidth(),
			_index = $(this).index(),
			logoli = $("#hotbrands .brand-logo");

		$("#hotbrands #brand-py").css('left', liWidth * _index);
		$("#hotbrands ul:gt(0)").css('display', 'none');
		$("#hotbrands .brand-logo").eq(_index).css('display', 'block');
	})

});























