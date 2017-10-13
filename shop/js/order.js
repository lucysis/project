$(function(){

	//省市区获取
	function addr(){
		// 保存请求资源的路径
		var url = "http://api.dangqian.com/apidiqu2/api.asp?format=json&callback=?&id=";

		function initProvince() {
			fillData(url, "#province");
		}

		function initCity() {
			// 获取当前选中省份的代码
			$("#order-main .addr #city").css('display','block');
			var id = $("#province").val();
			fillData(url+id, "#city")
		}

		function initDistrict() {
			// 获取选中省份中当前选中城市的代码
			$("#order-main .addr #district").css('display','block');
			var id = $("#city").val();
			fillData(url+id, "#district");
		}

		// ajax请求服务器资源
		function fillData(url, target, fn) {
			$.getJSON(url, function(data){
				var list = data.list;
				// $(target).empty();
				$(target).length = 1;
				for (var attr in list) {
					var obj = list[attr];
					$("<option value='"+ obj.daima +"'>" + obj.diming + "</option>").appendTo(target);
				}

				fn && fn();
			});
		}

		initProvince();

		$("#province").change(initCity);
		$("#city").change(initDistrict);
	}
	addr();


	//显示图片
	$("#cart-mian tbody tr .prodetail a").hover(function(){
		$(this).prev().css('display', 'block');
	}, function(){
		$(this).prev().css('display', 'none');
	});

	//单个商品小计
	function perPriceAll(){
		var trs = $("#cart-mian tbody tr"),
			totalPrice = 0;

		trs.each(function(){
			var perprice = parseFloat($(this).find(".pprice").text().substring(1)),
				pronum = parseInt($(this).find(".pnum").text());

			$(this).find(".pall").text("￥" + (parseFloat(perprice * pronum)).toFixed(1))
		});
	}
	perPriceAll();

	//商品总价
	function proTotalPrice(){
		var trs = $("#cart-mian tbody tr"),
			totalPrice = 0;

		trs.each(function(){
			var perprice = parseFloat($(this).find(".pall").text().substring(1));
			totalPrice += perprice;
		});

		//商品总值
		if(totalPrice == 0)
			$("#orderprice li:eq(1) span:eq(1)").text("￥" + totalPrice.toFixed(1));
		$("#orderprice li:eq(0) span:eq(1)").text("￥" + totalPrice.toFixed(1));
		$("#orderprice li:eq(2) span:eq(1)").text(parseInt(totalPrice));
		var allprice = parseFloat(totalPrice) + parseFloat($("#orderprice li:eq(1) span:eq(1)").text().substring(1));
		$("#orderprice li:eq(3) .pricetotal").text("￥" + allprice.toFixed(1));

		//结帐金额
		$("#order-main .order-section2:eq(2) .total-account").text("￥" + allprice.toFixed(1));
	}
	//proTotalPrice();

	//商品清单
	function proList(){
		var trs = $("#cart-mian tbody tr").clone(true);

		$("#cart-mian tbody tr:first").remove();
		if(!($.cookie('goods') == null)){
			var prolist = JSON.parse($.cookie('goods'));

			for(var attr in prolist){
				$("#cart-mian tbody").append(trs.clone(true));
				$("#cart-mian tbody tr:last").find('.p-info img').attr('src', prolist[attr].proPic);
				$("#cart-mian tbody tr:last").find('.p-info a').text(attr);
				$("#cart-mian tbody tr:last").find('.pprice').text(prolist[attr].perPrice);
				$("#cart-mian tbody tr:last").find('.pnum').text(prolist[attr].proNum);
				

				// trs.find('.p-info img').attr('src', prolist[attr].proPic);
				// trs.find('.p-info a').text(attr);
				// trs.find('.pprice').text(prolist[attr].perPrice);
				// trs.find('.pnum').text(prolist[attr].proNum);
				// $("#cart-mian tbody").append(trs);

				
			}
		}
		perPriceAll();
		proTotalPrice();

		// console.log(prolist)
	}
	proList();

});