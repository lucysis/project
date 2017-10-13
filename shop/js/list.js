$(function(){

	//content
	var isRight = false,
		timeout1,timeout2;
	$("#content li").hover(function(){
		$(this).css('z-index', 100);
		var _this = $(this);
		timeout1 = setTimeout(function(){_this.find('.buybtn').show()},200);
		// _this.find('.buybtn').show();
		if($(this).attr('class') == 'right'){
			isRight = true;	
			$(this).find('.formall').stop(true).animate({'width': "338px",'height': '515px'},200);
			timeout2 = setTimeout(function(){_this.find('.formall-pic').show();},200);
		}
		else
			$(this).find('.formall').stop(true).animate({'height': '515px'},200);
	}, function(){
		$(this).find('.buybtn').hide();
		$(this).css('z-index', 2);
		clearTimeout(timeout1);
		
		if(isRight){
			clearTimeout(timeout2);
			$(this).find('.formall-pic').hide();
			// $(this).find('.formall').stop(true).animate({'width': "253px",'height': '482px'},200);
			$(this).find('.formall').stop(true).css({'width': '253px','height': '482px'});
			isRight = false;
		}
		else
			$(this).find('.formall').stop(true).animate({'height': '482px'},200);
	});




	$("#content .formall-pic img").hover(function(){
		$(this).parents('li').find('#goodsimg').attr('src', $(this).attr('src'));
	});

});