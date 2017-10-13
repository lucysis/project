$(function(){


	//放大镜
	$("#main .next").click(function(){
		$("#main .pic-list ul").css('margin-left', '-85px');
		$(this).addClass('over');
		$("#main .prev").removeClass('over');
	});
	$("#main .prev").click(function(){
		$("#main .pic-list ul").css('margin-left', '0px');
		$(this).addClass('over');
		$("#main .next").removeClass('over');
	});

	$("#main .pic-list li").hover(function(){
		var index = $(this).index();
		$(this).addClass('active').siblings().removeClass('active');
		$("#main .album-view img").attr('src', '../img/promiddle' + (index + 1) + '.jpg');
		$("#main .pro-main .bigmirror img").attr('src', '../img/probig' + (index + 1) + '.jpg');
	});


	var box = $("#main .album-pic"),
		mover = $("#main .album-pic .mask"),
		big = $("#main .pro-main .bigmirror"),
		moverHeight = mover.height(),
		moverWidth = mover.width(),
		boxSize = box.width(),
		boxOffsetTop = box.offset().top,
		boxOffsetLeft = box.offset().left,
		rateX = big.width() / moverWidth,
		rateY = big.height() / moverHeight;

	$("#main .album-pic").hover(function(){
		$(this).find('.mask').show();
		$("#main .pro-main .bigmirror").show();
	}, function(){
		$(this).find('.mask').hide();
		$("#main .pro-main .bigmirror").hide();
	}).mousemove(function(e) {
		mover.offset({
			left: e.pageX - moverWidth / 2, 
			top: e.pageY - moverHeight / 2
		});
		var Top = parseInt(mover.css('top')),
			Left = parseInt(mover.css('left'));

		Top = Top < 0? 0 : (Top >= boxSize - moverHeight ? boxSize - moverHeight : Top);
		Left = Left < 0? 0 : (Left >= boxSize - moverWidth ? boxSize - moverWidth : Left);

		mover.css({
			top: Top,
			left: Left
		});

		big.find('img').css({
			top: -Top * rateY,
			left: -Left * rateX
		});

	});

	//扫码
	$("#main .proinformation .code-pro button").hover(function(){
		$(this).next().show();
	}, function(){
		$(this).next().hide();
	});

	//选择数量
	$("#main .proinformation .probuynum a:eq(0)").click(function(){
		var num = $(this).next().val();
		if(num == 1)
			return;
		else
			$(this).next().val(--num);
	});
	$("#main .proinformation .probuynum a:eq(1)").click(function(){
		var num = $(this).prev().val();
		$(this).prev().val(++num);
	});

	//加入购物车
	$("#main .proinformation #addtocart").click(addToCart);
	$("#pro-tags .tags-addtocart .btn").click(addToCart);

	function addToCart(){
		var proname = $("#main .pro-main .protitname").text(),
			proprice = $("#main .pro-main .detailprice ins").text(),
			pronum = $("#main .pro-main .probuynum input").val(),
			proimg = $("#main .promaincontent .album-list li:eq(0) img").attr('src'),
			pro = {'proname': proname, 'proprice': proprice, 'pronum': pronum,'proimg': proimg};
		$.cookie('pro', JSON.stringify(pro), {path: "/",expiress: 7});
	}

	//滚动固定 楼层导航
	$(window).load(function() {
		var navTop = $("#pro-tags").offset().top,
			navLeft = $("#pro-tags").offset().left,
			navHeight = $("#pro-tags").height(),
			hd_parametersH = $("#pro-parameters").offset().top,
			hd_detailH = $("#pro-detail").offset().top,
			hd_picsH = $("#pro-pics").offset().top,
			hd_recommentH = $("#pro-comment").offset().top,
			scrHeight = $(window).height(),
			isClick = false;

		//点击切换楼层
		$("#pro-tags div:lt(-1)").click(function(){
			isClick = true;
			$(this).addClass('active').siblings().removeClass('active');
		});

		$("#hd_parameters").click(function(){
			$("html,body").animate({'scrollTop': hd_parametersH - navHeight}, 1000, function(){isClick = false});
		});

		$("#hd_detail").click(function(){
			$("html,body").animate({'scrollTop': hd_detailH - navHeight}, 1000, function(){isClick = false});
		});

		$("#hd_pics").click(function(){
			$("html,body").animate({'scrollTop': hd_picsH - navHeight}, 1000, function(){isClick = false});
		});

		$("#hd_recomment").click(function(){
			$("html,body").animate({'scrollTop': hd_recommentH - navHeight}, 1000, function(){isClick = false});
		});

		
		$(window).scroll(function() {
			if(!isClick){
				if($(window).scrollTop() >= hd_recommentH - scrHeight / 2){
					$("#pro-tags div:lt(-1):eq(3)").addClass('active').siblings().removeClass('active');
					fixed();
				} else if($(window).scrollTop() >= hd_picsH - scrHeight / 2){
					$("#pro-tags div:lt(-1):eq(2)").addClass('active').siblings().removeClass('active');
					fixed();
				} else if($(window).scrollTop() >= hd_detailH - scrHeight / 2){
					$("#pro-tags div:lt(-1):eq(1)").addClass('active').siblings().removeClass('active');
					fixed();
				} else {
					$("#pro-tags div:lt(-1):eq(0)").addClass('active').siblings().removeClass('active');
					fixed();
				}
			}
		});

		function fixed(){
			if ($(window).scrollTop() >= navTop) {
				$("#pro-tags").css({
					position: 'fixed',
					top: 0,
					left: navLeft,
					zIndex: 100
				});
			} else {
				$("#pro-tags").css({
					position: 'static'
				});
			}
		}
		fixed();
	});

});