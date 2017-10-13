
$(function(){

	//加入购物车
	function addToCart(){
		if(!($.cookie('pro') == null)){
			var pro = JSON.parse($.cookie('pro')),
				trnode = $("#content #cartdetail tbody tr").clone();
			
			var proname = pro.proname.split(" "),
				newProname = proname.slice(0, -1).join(""),
				guige = proname[proname.length-1].split(""),
				newGuige = guige.slice(1,-2).join("");

			trnode.find('.td1 img').attr('src', pro.proimg);
			trnode.find('.td2 a').text(newProname);
			trnode.find('.td2 .table-spec').text(newGuige);
			trnode.find('.price').text(pro.proprice);
			trnode.find('.td4 input').val(pro.pronum);
			trnode.find('.td5').text('￥' + (parseFloat(pro.proprice.substring(1)) * parseInt(pro.pronum)).toFixed(1))
			$("#content #cartdetail tbody").append(trnode);
		}
	}
	addToCart();

	//商品总价
	function proTotalPrice(){
		var trs = $("#content #cartdetail tbody tr"),
			totalPrice;
		trs.each(function(){
			var prePrice = parseFloat($(this).find('.price').text().substring(1)),
				pronum = parseInt($(this).find('.td4 input').val());

			totalPrice = "￥" + (parseFloat(prePrice * pronum)).toFixed(1);

			$(this).find('.td5').text(totalPrice);
		});
	}
	proTotalPrice()

	//数量的增减
	$("#content #cartdetail tbody .td4 .pronum").delegate('a:eq(0)', 'click', function(){
		var num = $(this).next().val();
		if(num == 1)
			return;
		else
			$(this).next().val(--num);
		var perPrice = parseFloat($(this).parents('td').prev().text().substring(1));
		$(this).parents('td').next().text("￥" + (perPrice * num).toFixed(1));
		totalPrice();
	});
	$("#content #cartdetail tbody .td4 .pronum").delegate('a:eq(1)', 'click', function(){
		var num = $(this).prev().val();
		$(this).prev().val(++num);
		var perPrice = parseFloat($(this).parents('td').prev().text().substring(1));
		$(this).parents('td').next().text("￥" + (perPrice * num).toFixed(1));
		totalPrice();
	});
	
	//删除商品
	$("#content #cartdetail tbody tr:eq(0) .delpro").click(function(){
		$(this).parent('tr').remove();
		totalPrice();
	});
	$("#content #cartdetail tbody tr:eq(1) .delpro").click(function(){
		$(this).parent('tr').remove();
		totalPrice();
		$.cookie('pro', null);
	});

	function totalPrice(){
		var trs = $("#content #cartdetail tbody tr"),
			totalPrice = 0,
			proNum = 0;
		trs.each(function() {
			var thisTotalPrice = parseFloat($(this).find('.td5').text().substring(1));
			totalPrice += thisTotalPrice;
			proNum++;
		});

		//免运费
		var freetran = 249 - totalPrice;
		if(freetran <= 0)
			freetran = 0;
		$("#content #cart-main tbody .freetrans span:eq(1)").text("￥" + freetran.toFixed(1));

		//总计
		$("#content #cart-main #order .prototalnum").text(proNum);
		$("#content #cart-main #order .money").text("￥" + totalPrice.toFixed(1));
	}
	totalPrice();

	$("#cart-main #order [type='submit']").click(function(){
		var trs = $("#content #cartdetail tbody tr"),
			goods = {};

		trs.each(function(){
			goods[$(this).find('.td2 a').text()] = {'proPic': $(this).find('.td1 img').attr('src'),'perPrice': $(this).find('.price').text(),'proNum': $(this).find('.td4 input').val()};
		});

		$.cookie('goods', JSON.stringify(goods), {expiress: 7, path: "/"});
		// return false;
	});

});




