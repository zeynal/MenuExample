// khg-gpp_web_120520171405
$(document).ready(function(){

var jsValidationIsOn = true;
var captchaIsOn = false;


var _window = $(window);

/* Search workpiece begin */

	$(".search_block p a").click(function(){
		var _this = $(this),
		_this_text = _this.text();
		$(".search_block input").val(_this_text);
		return false;
	});
	

/* Search workpiece end */


/* Super bg Index begin */

	if ($("body").hasClass("index")) {
		window_width = $(window).width();
	    if (window_width > 1200) {
	    	$("body").css("background-position", "0 "+((1200-(window_width))/2)+"px");
	    }

		_window.resize(function(){
			window_width = $(window).width();
	        if (window_width > 1200) {
	        	$("body").css("background-position", "0 "+((1200-(window_width))/2)+"px");
	        }
		});		
	}

/* Super bg Index end */


/* Modal accordion begin */

	$(".services_modal .list ul li p a").click(function(){
		var _this = $(this);
		_this.parents("li").toggleClass("active");
		return false;
	});

/* Modal accordion end */


/* Modal popup begin */
	//unregistered
	$(".search_by_number .form .add").click(function(){
		$("body").addClass("overflow");
		modal_active = $(this);
		$(".darkness").animate({"opacity": "show"}, 450);
		$(".services_modal").animate({"top": "50%"}, 450);

		var window_height = _window.height();
		if (window_height < 600) {
			$(".services_modal").css("height", (window_height-70)+"px").css("margin-top", -((window_height-70)/2)+"px");
			$(".services_modal .list").css("height", (window_height-200)+"px");
		}
		
        addAmountsToFormIfNesessary($(this), "unregisteredAmountsForm", "serviceCodeListForm");
		
		return false;
	});

	//registered

	$("a.srvbtn").click(function(){
		var currentScrollPosition = $(document).scrollTop();
		//modal_active = $(this);
		$(".darkness").animate({"opacity": "show"}, 450);
		$(".services_modal").animate({"top": "50%"}, 450);
		

		var window_height = _window.height();
		if (window_height < 600) {
			$(".services_modal").css("height", (window_height-70)+"px").css("margin-top", -((window_height-70)/2)+"px");
			$(".services_modal .list").css("height", (window_height-200)+"px");
		}
		
		return false;
	});
	
	
	$(".personal_cabinet .payments_list .add a + a").click(function(){
		var currentScrollPosition = $(document).scrollTop();
		modal_active = $(this);
		$(".darkness").animate({"opacity": "show"}, 450);
		$(".services_modal").animate({"top": "50%"}, 450);
		

		var window_height = _window.height();
		if (window_height < 600) {
			$(".services_modal").css("height", (window_height-70)+"px").css("margin-top", -((window_height-70)/2)+"px");
			$(".services_modal .list").css("height", (window_height-200)+"px");
		}
		
		postAJAX('/GPEWebPortal/Registered/ShowServicesModal', 
				'scCode='+$(this).attr("scCode")+"&identificationSubtype="+$(this).attr("identificationSubtype")+"&code="
				//+$(this).attr("code"),
				+$(this).attr("code")+"&currentScrollPosition="+currentScrollPosition,  
				'servicesModal', 
				fillInDataThenAnimate,
				".services_modal");
		
		modal_active = $(this);


		var window_height = _window.height();
		if (window_height < 600) {
			$(".services_modal").css("height", (window_height-70)+"px").css("margin-top", -((window_height-70)/2)+"px");
			$(".services_modal .list").css("height", (window_height-200)+"px");
		}
		return false;
	});

	$(".services_modal a.close").click(function(){
		$(".services_modal").animate({"top": "-600px"}, 450);
		$(".darkness").delay(150).animate({"opacity": "hide"}, 450);
		$("body").removeClass("overflow");
		return false;
	});
	
	$(" .overheads_modal a.close").click(function(){
		$(".overheads_modal").animate({"top": "-600px"}, 450);
		$(".darkness").delay(150).animate({"opacity": "hide"}, 450);
		$("body").removeClass("overflow");
		return false;
	});
	
	$(".restore_password_modal a.close, .restore_password_modal button.close").click(function(){
		$(".restore_password_modal").animate({"top": "-600px"}, 450);
		$(".darkness").delay(150).animate({"opacity": "hide"}, 450);
		$("body").removeClass("overflow");
		return false;
	});
	
	
	

	$(".services_modal .submit a").click(function(){
		$(".services_modal").animate({"top": "-600px"}, 450);
		return false;
	});

	$(".services_modal .list ul li .checkboxes label input").change(function(){
		if ( modal_active != null ) {
		var checked_length = $(".services_modal .list ul li .checkboxes label input:checked").length;
		modal_active.text(checked_length);

		var checked_arr = [];

		for (var y = 0; y < checked_length; y++) {
			checked_arr.push($(".services_modal .list ul li .checkboxes label input:checked").eq(y).attr("id"));
		};
		modal_active.next().attr("data-ids", "{id:'"+checked_arr+"'}")
		}
	});

/* Modal popup end */


/* Modal Overheads begin */
	
	


	$(".info_blue .info a, .payment_archive_list .showInvoiceDetails").click(function(){
		postAJAX('/GPEWebPortal/'+$(this).attr('commandName'), 
				 null,  
				 'InvoiceDetails', 
				 fillInDataThenAnimate, 
				 ".overheads_modal");

		var window_height = _window.height();
		if (window_height < 700) {
			$(".overheads_modal > div").css("height", (window_height-70)+"px");
			$(".overheads_modal").css("height", (window_height-70)+"px").css("margin-top", -((window_height-70)/2)+"px");
		}
		return false;
	});

	// Result info for
	//edited for GPE
	$("a.show_income").click(function(){
		postAJAX('/GPEWebPortal/'+$(this).attr('commandName'), 
				'receiptNumber='+$(this).attr('receiptNumber') +'&sectionId='+$(this).attr('sectionId'),  
				'receipt', 
				fillInDataThenAnimate,
				".income_modal");

		var window_height = _window.height();
//		alert(window_height);
		if (window_height < 700) {
//			$(".income_modal > div").css("height", (window_height-70)+"px");
//			$(".income_modal").css("height", (window_height-70)+"px").css("margin-top", -((window_height-70)/2)+"px");
			$(".income_modal").css("margin-top", -((window_height-70)/2)+"px");
		}
		$(".pdfSave").attr("commandName", "Registered/Archive/ShowReceiptPdf/" + $(this).attr('receiptNumber') );
//		var x = $(".income_modal .printable").css("height");
//		alert(x);
//		$(".income_modal .printPoint").css("top", "300px");
		return false;
	});


	$(".income_modal a.close").click(function(){
		$(".income_modal").animate({"top": "-660px"}, 450);
		$(".darkness").delay(150).animate({"opacity": "hide"}, 450);
		$("body").removeClass("overflow");
		return false;
	});




/* Modal Overheads end */


/* Payment list begin */
//	$(".personal_cabinet .payments_list .add.added").click(function(){
//	}
	$(".personal_cabinet .payments_list .add a:first-child").click(function(){
		var currentScrollPosition = $(document).scrollTop();
		var _this = $(this);
		if (_this.parent().hasClass("added")) {
			
			$('<form method="post" action="/GPEWebPortal/'+$(this).attr("deleteCommandName")+'"><input type="hidden" name="currentScrollPosition" value="'+currentScrollPosition+'"/><input type="hidden" name="viewID" value="'+window.name+'"/></form>').appendTo('body').submit();
			return false;
			//_this.parent().removeClass("added");
		} else {
			//_this.parent().addClass("added");
		}

		if ($(".payments_list .added").length > 0) {
			$("footer.footer_result .links").addClass("selected");
		} else {
			$("footer.footer_result .links").removeClass("selected");
		}
		$("footer.footer_result .links a em").text($(".payments_list .added").length);
		
		postAJAX('/GPEWebPortal/Registered/Search', 
				'scCode='+$(this).attr("scCode")+"&identificationSubtype="+$(this).attr("identificationSubtype")+"&code="
				+$(this).attr("code")+"&currentScrollPosition="+currentScrollPosition,  
				'servicesModal', 
				fillInDataThenAnimate,
		        ".services_modal",
		        "/GPEWebPortal/Registered/Default");
		
		modal_active = $(this);


		var window_height = _window.height();
		if (window_height < 600) {
			$(".services_modal").css("height", (window_height-70)+"px").css("margin-top", -((window_height-70)/2)+"px");
			$(".services_modal .list").css("height", (window_height-200)+"px");
		}

		
		return false;
	});

	$("footer.footer_result .links a.remove").click(function(){
		$(".payments_list").toggleClass("editable");
		$(".personal_cabinet > header .edit a").toggleClass("active");
		//$(".personal_cabinet *").removeClass("added");
		//$("footer.footer_result .links").removeClass("selected");
		return false;
	});

/* Payment list end */


/* Editable price begin */

	$(".editable_price span").click(function() {
		var _this = $(this);
		_this.hide();
		_this.next().show();
		_this.next().focus();
		_this.next().attr("data-price", _this.next().val());
		//if (_this.next().val() == '0.00' || _this.next().val() == '0')
			_this.next().val("");

	});

	$(".editable_price input").focusout(function() {
		var _this = $(this),
		_this_text = _this.val();
		_this.hide();
		_this.prev().show();

		if (_this.val() == "") {
			_this.val(_this.data("price"));
		} 
		else {
			_this.prev().text(_this_text);
		}



	});
	
	$(".editable_price input").keypress(function(event){
		  this.oldvalue = this.value;
	});

	$(".editable_price input").keyup(function(event){
		var r = /^\d{0,5}[,]?\d{0,2}$/i;
        if (!r.test(this.value)) {
        	if (this.value.indexOf('.') != -1)
        	  this.value=this.oldvalue+",";
        	else	
              this.value=this.oldvalue;
        }
        
	});

//	$(".editable_price input").keypress(function(event){

        
//        if (event.charCode && (event.charCode < 48 || event.charCode > 57)) {
//         	if (event.charCode == 188) {
//         		console.log("zpt");
//         	} else {
//          		return false;
//         	}
//         }
//    });

/* Editable price end */


/* Table info show_hide begin */

	$(".payments_editable_list .func a.info").click(function(){
		var _this = $(this);
		/*
		if (_this.hasClass("active")) {
			_this.parents("tr").next().find(".info_blue").removeAttr("style");
		} else {
			_this.parents("tr").next().find(".info_blue").css("height", (_this.parents("tr").next().find(".info_blue > div").height() + 60)+"px");
		}
		_this.toggleClass("active");
		_this.parents("tr").next().find(".info_blue").toggleClass("showed");*/

		if (_this.hasClass("active")) {
      _this.parents("ul").next().slideUp();
      _this.toggleClass("active");
		} else {
      _this.parents("ul").next().slideDown();
      _this.toggleClass("active");
		}



		return false;
	});

	$(".payments_editable_list section table tbody tr > td").click(function(e){
		if(e.target != this) return;
		$(this).parent().find("a.info").click();
	});

	$(".payments_editable_list section .list ul > li").click(function(e){
		if (_window.width() > 1023) {
			if(e.target != this) return;
			$(this).parent().find("a.info").click();
		}
	});

/* Table info show_hide end */


/* Confirms begin */



	$(".confirm_modal a.close, .confirm_modal a.cancel ").click(function(){
		$(".darkness").delay(150).animate({"opacity": "hide"}, 450);
		$(".confirm_modal").animate({"top": "-220px"}, 450);
		$("body").removeClass("overflow");
		return false;
	});

	$(".search_number_result .remove_all a").click(function(){
		$("body").addClass("overflow");
		$(".darkness").animate({"opacity": "show"}, 450);
		$(".confirm_modal.clear_all").animate({"top": "50%"}, 450);
		return false;
	});

	$(".search_number_result .list a.remove").click(function(){
		$("body").addClass("overflow");
		$(".darkness").animate({"opacity": "show"}, 450);
		$(".confirm_modal.remove_from_search").animate({"top": "50%"}, 450);
		return false;
	});

	$(".payments_editable_list .remove_all a").click(function(){
		$("body").addClass("overflow");
		$(".darkness").animate({"opacity": "show"}, 450);
		$(".confirm_modal.clear_all").animate({"top": "50%"}, 450);
		return false;
	});

	$(".payments_editable_list .func a.remove").click(function(){
		$("body").addClass("overflow");
		$(".darkness").animate({"opacity": "show"}, 450);
		$(".confirm_modal.remove_from_search").animate({"top": "50%"}, 450);
		return false;
	});
	
	$(".personal_cabinet .payments_list section .list ul li .remove a").click(function(){
		$("body").addClass("overflow");
		$(".darkness").animate({"opacity": "show"}, 450);
		$(".confirm_modal.remove_from_search").animate({"top": "50%"}, 450);
		return false;
	});
	
	
	

/* Confirms begin */


/* Payments modal begin */

	$(".show_sclist_add_payments_modal").click(function(){

		$("body").addClass("overflow");
		$(".darkness").animate({"opacity": "show"}, 450);
		$(".sclist_add_payments").animate({"top": "50%"}, 450);

		var window_height = _window.height();
		if (window_height < 500) {
			$(".sclist_add_payments").css("height", (window_height-60)+"px").css("margin-top", -((window_height-60)/2)+"px");
			$(".sclist_add_payments .icons_grid").css("height", (window_height-180)+"px");
		}
		return false;
	});
	
	$(".show_sclist_add_accounts_modal").click(function(){

		$("body").addClass("overflow");
		$(".darkness").animate({"opacity": "show"}, 450);
		$(".sclist_add_accounts").animate({"top": "50%"}, 450);

		var window_height = _window.height();
		if (window_height < 500) {
			$(".sclist_add_accounts").css("height", (window_height-60)+"px").css("margin-top", -((window_height-60)/2)+"px");
			$(".sclist_add_accounts .icons_grid").css("height", (window_height-180)+"px");
		}
		return false;
	});

	$(".more_payments_modal a.close").click(function(){
		$(".darkness").delay(150).animate({"opacity": "hide"}, 450);
		$(".more_payments_modal").animate({"top": "-250px"}, 450);
		$("body").removeClass("overflow");
		return false;
	});

	$(".sclist_add_accounts .tabs .swipe a").click(function(){
		var _this = $(this),
		_this_index = _this.parent().index();
		$(".sclist_add_accounts .tabs .swipe a").removeClass("active");
		_this.addClass("active");
		$(".sclist_add_accounts .icons_grid .item").removeClass("active").eq(_this_index).addClass("active");
		return false;
	});
	
	$(".sclist_add_payments .tabs .swipe a").click(function(){
		var _this = $(this),
		_this_index = _this.parent().index();
		$(".sclist_add_payments .tabs .swipe a").removeClass("active");
		_this.addClass("active");
		$(".sclist_add_payments .icons_grid .item").removeClass("active").eq(_this_index).addClass("active");
		return false;
	});

	if ( $(".sclist_add_accounts ").length > 0) {
		//alert($(".more_payments_modal .tabs .slide").width() + "    " + $(".more_payments_modal .tabs .slide .swipe ul li").width());
		var tabs_lenght = $(".sclist_add_accounts .tabs .slide .swipe ul li").length,
		visible_tabs_lenght = $(".sclist_add_accounts .tabs .slide").width()/$(".sclist_add_accounts .tabs .slide .swipe ul li").width();
		bullets_lenght = Math.ceil(tabs_lenght/visible_tabs_lenght);
		//alert(tabs_lenght+"/"+visible_tabs_lenght+"="+bullets_lenght);
		for (var i = 0; i < bullets_lenght; i++) {
			$(".sclist_add_accounts .tabs .bullets").prepend("<a href='#'></a>");
		};
		$(".sclist_add_accounts .tabs .bullets a:first-child").addClass("active");
	}
	
	if ( $(".sclist_add_payments").length > 0) {
		//alert($(".more_payments_modal .tabs .slide").width() + "    " + $(".more_payments_modal .tabs .slide .swipe ul li").width());
		var tabs_lenght = $(".sclist_add_payments .tabs .slide .swipe ul li").length,
		visible_tabs_lenght = $(".sclist_add_payments .tabs .slide").width()/$(".sclist_add_payments .tabs .slide .swipe ul li").width();
		bullets_lenght = Math.ceil(tabs_lenght/visible_tabs_lenght);
		//alert(tabs_lenght+"/"+visible_tabs_lenght+"="+bullets_lenght);
		for (var i = 0; i < bullets_lenght; i++) {
			$(".sclist_add_payments .tabs .bullets").prepend("<a href='#'></a>");
		};
		$(".sclist_add_payments .tabs .bullets a:first-child").addClass("active");
	}

	$(".more_payments_modal .bullets a").click(function(){
		var _this = $(this),
		_this_index = _this.index();
		$(".more_payments_modal .bullets a").removeClass("active").eq(_this_index).addClass("active");
		$(".more_payments_modal .tabs .swipe").css("left", -(_this_index*$(".more_payments_modal .slide").width())+"px");
		return false;
	});

	$(".more_payments_modal .tabs select").change(function(){
	    var _this = $(this);
	    _this.prev().prev().find("li").eq(_this.find("option:selected").index()).find("a").click();
	});

/* Payments modal end */


/* Login modal begin */

	$(".sign_in a").click(function(){
		var window_height = _window.height();
		$(".darkness").animate({"opacity": "show"}, 450);
		$(".login_modal").animate({"top": "50%"}, 450);
		if (window_height < 500) {
			$(".login_modal").css("height", (window_height-70)+"px").css("margin-top", -((window_height-70)/2)+"px");
		}
		return false;
	});

	$(".login_modal a.close").click(function(){
		$(".login_modal .error").remove();
		$(".darkness").delay(150).animate({"opacity": "hide"}, 450);
		$(".login_modal").animate({"top": "-250px"}, 450);
		$("body").removeClass("overflow");
		return false;
	});

	// Restore
	$(".kod_restore").click(function(){
		$("body").addClass("overflow");
		$(".darkness").animate({"opacity": "show"}, 450);
		$(".login_modal").animate({"top": "-250px"}, 450);
		$(".restore_by_id").delay(450).animate({"top": "50%"}, 450);
		return false;
	});

	$(".restore_by_id a.close").click(function(){
		$("body").removeClass("overflow");
		$(".darkness").animate({"opacity": "hide"}, 450);
		$(".restore_by_id").animate({"top": "-150px"}, 450);
		return false;
	});

	$(".pass_restore").click(function(){
		$("body").addClass("overflow");
		$(".darkness").animate({"opacity": "show"}, 450);
		$(".login_modal").animate({"top": "-250px"}, 450);
		$(".restore_pass").delay(450).animate({"top": "50%"}, 450);
		return false;
	});

	$(".restore_pass a.close").click(function(){
		$("body").removeClass("overflow");
		$(".darkness").animate({"opacity": "hide"}, 450);
		$(".restore_pass").animate({"top": "-150px"}, 450);
		return false;
	});
	
	$(".pass_restore_choice").click(function(){
		$("body").addClass("overflow");
		$(".darkness").animate({"opacity": "show"}, 450);
		$(".login_modal").animate({"top": "-250px"}, 450);
		$(".restore_pass_choice").delay(450).animate({"top": "50%"}, 450);
		return false;
	});

	$(".restore_pass_choice a.close").click(function(){
		$("body").removeClass("overflow");
		$(".darkness").animate({"opacity": "hide"}, 450);
		$(".restore_pass_choice").animate({"top": "-150px"}, 450);
		return false;
	});
	
	$(".pass_restore_otp").click(function(){
		$("body").addClass("overflow");
		$(".darkness").animate({"opacity": "show"}, 450);
		$(".login_modal").animate({"top": "-250px"}, 450);
		$(".restore_pass_otp").delay(450).animate({"top": "50%"}, 450);
		return false;
	});

	$(".restore_pass_otp a.close").click(function(){
		$("body").removeClass("overflow");
		$(".darkness").animate({"opacity": "hide"}, 450);
		$(".restore_pass_otp").animate({"top": "-150px"}, 450);
		return false;
	});
	
	$(".asan_verification_code_link").click(function(){
		$("body").addClass("overflow");
		$(".darkness").animate({"opacity": "show"}, 450);
		$(".login_modal").animate({"top": "-250px"}, 450);
		$(".asan_verification_code").delay(450).animate({"top": "50%"}, 450);
		return false;
	});
	
	$(".asan_verification_code a.close").click(function(){
		$("body").removeClass("overflow");
		$(".darkness").animate({"opacity": "hide"}, 450);
		$(".asan_verification_code").animate({"top": "-150px"}, 450);
		$('<form method="post" action="/GPEWebPortal/Registered/CancelASANauthentication"><input type="hidden" name="viewID" value="'+window.name+'"/></form>').appendTo('body').submit();
		return false;
	});
	
	
	
	
	$(".MsgErrorLink").click(function(){
		$("body").addClass("overflow");
		$(".darkness").animate({"opacity": "show"}, 450);
		$(".MsgError").delay(450).animate({"top": "50%"}, 450);
		return false;
	});
	
	$(".MsgConfirmLink").click(function(){
		$("body").addClass("overflow");
		$(".darkness").animate({"opacity": "show"}, 450);
		$(".MsgConfirm").delay(450).animate({"top": "50%"}, 450);
		return false;
	});

/* Login modal end */


/* Login tabs begin */
	
	
	$(".loginTypeScroll").click(function(){
		var _this = $(".login_modal .tabs a.active"),
		_this_index = _this.parent().index();
		$(".login_modal .login_side .forms .swipe").css("left", -(($(".login_modal .login_side .forms").width()+20)*_this_index)+"px");
		return false;
	});
	
	$(".login_modal .tabs a").click(function(){
		var _this = $(this),
		_this_index = _this.parent().index();
		$(".login_modal .tabs a").removeClass("active").eq(_this_index).addClass("active");
		$(".login_modal .login_side .forms .swipe").css("left", -(($(".login_modal .login_side .forms").width()+20)*_this_index)+"px");
		return false;
	});
	


/* Login tabs end */



/* Mobile nav begin */
	
	$("a.toggler").click(function(){
		$(this).toggleClass("active");
		if ($(this).hasClass("active")) {
			$("body").css("overflow", "hidden");
			$("#aside_block").css("right", "0");
		} else {
			$("body").removeAttr("style");
			$("#aside_block").css("right", "-100%");
		}
		return false;
	});

/* Mobile nav end */


/* Payment tabs begin */

	$(".payment_choose .tabs a").click(function(){
		var _this = $(this),
		_this_index = _this.parent().index();
		$(".payment_choose .tabs a").removeClass("active");
		$(".payment_choose .tabs li").eq(_this_index).find("a").addClass("active");
		$(".payment_choose .slides .swipe").css("left", -($(".payment_choose .slides").width()*_this_index)+"px");
		return false;
	});

	$(".payment_choose .tabs select").change(function(){
	    var _this = $(this);
	    _this.prev().find("li").eq(_this.find("option:selected").index()).find("a").click();
	});

	$(".payment_choose").on("swipeleft",function(){
        if ($(window).width() < 768) {
            $(".payment_choose .tabs ul li a.active").parent().next().find("a").click();
        }
    }).on("swiperight",function(){
        if ($(window).width() < 768) {
            $(".payment_choose .tabs ul li a.active").parent().prev().find("a").click();
        }
    });
	
    $('.payment_choose  input[type=radio][name=favouritBankOrCardBinCode]').change(function() {
        if (this.value == 'favouritBank') {
        	$('.payment_choose  input[type=number][name=cardBinCode]').attr("disabled", true);
        	 $('.payment_choose  select[name=bankCode]').removeAttr('disabled');
        }
        else if (this.value == 'cardBinCode') {
        	 $('.payment_choose  input[type=number][name=cardBinCode]').removeAttr('disabled');
        	 $('.payment_choose  select[name=bankCode]').attr("disabled", true);
        }
    });
	

/* Payment tabs end */


/* Aside nav select begin */
	
	$(".template_block aside select").change(function(){
		var _this = $(this),
		_this_index = _this.find("option:selected").index(),
		link_href = $(".template_block aside ul li").eq(_this_index).find("a").attr("href");
	    location.href = link_href;
	});

/* Aside nav select end */


/* Statistic tabs select begin */

	$(".statistic .tabs select").change(function(){
		var _this = $(this),
		_this_index = _this.find("option:selected").index(),
		link_href = $(".statistic .tabs ul li").eq(_this_index).find("a").attr("href");
	    location.href = link_href;
	});

/* Statistic tabs  select end */




/* Super puper select yo yo yo begin */


	/* E-select mult begin */

    $(document).on( "mousedown", ".e_select_mult select", function() {

        if ($(window).width() > 123) {
            $(".multi_hint_select").remove();
            var _this = $(this),
            select_arr = [],
            milt_select_length = _this.find("optgroup").length;
            _this.addClass("mult_selected");
            $("body").append("<div class='multi_hint_select' style='left:"+(_this.offset().left)+"px; top:"+(_this.offset().top+ _this.height() + 12)+"px; width:"+(_this.parent().width())+"px'><ul></ul></div>");
            setTimeout(function(){
                $(".multi_hint_select").css("height", ($(".multi_hint_select ul").height() + 2)+"px");
            }, 10);
            setTimeout(function(){
            	$(".multi_hint_select").addClass("visi");
            }, 300);
            for (var z = 0; z < milt_select_length; z++) {
                select_arr.push(_this.find("optgroup").eq(z).attr("label"));
                $(".multi_hint_select ul").append("<li><a href='#'>"+_this.find("optgroup").eq(z).attr("label")+"</a></li>")
            };
            return false;
        }
    });


    // First choose
    $(document).on( "click", ".multi_hint_select ul:first-child li a", function() {

        var _this = $(this),
        _this_index = _this.parent().index(),
        optgroup_select_length = $("select.mult_selected optgroup").eq(_this_index).find("option").length;

        $(".multi_hint_select").removeClass("visi");


        $(".multi_hint_select").append("<ul></ul>");
        for (var f = 0; f < optgroup_select_length; f++) {
            $(".multi_hint_select ul + ul").append("<li><a href='#'>"+$("select.mult_selected optgroup").eq(_this_index).find("option").eq(f).text()+"</a></li>")
        };


        setTimeout(function(){
        	$(".multi_hint_select").addClass("go_left");
        	$(".multi_hint_select").css("height", ($(".multi_hint_select ul + ul").height())+"px");

        }, 100);


	    // Second choose
	    $(document).on( "click", ".multi_hint_select ul:first-child + ul li a", function() {


	        $(".mult_selected optgroup").eq(_this_index).find("option").eq($(this).parent().index()).prop({selected: true});
	        setTimeout(function(){
	            $("select.mult_selected").removeClass();
	        }, 150);
	        
	        return false;
	    });


        return false;
    });


    $(".e_select_mult select").mouseout(function(){
        $("body").on("click",onoClick);
    });
    $(".e_select_mult select").mouseover(function(){
        $("body").off("click",onoClick);
    })
    function onoClick(){
    	if ($(".go_left").length) {
        $(".multi_hint_select").remove();
	        setTimeout(function(){
	            $("select.mult_selected").removeClass();
	        }, 150);
    	} else {

    	}

    }

	/* E-select mult end */



    $(document).on( "mousedown", ".e_select select", function() {
        console.log('1');
        if ($(window).width() > 123) {
            $(".hint_select").remove();
            var _this = $(this),
            select_arr = [],
            select_length = _this.find("option").length;
            _this.addClass("selected");
            $("body").append("<div class='hint_select' style='left:"+(_this.offset().left)+"px; top:"+(_this.offset().top+ _this.height() + 12)+"px; '><ul></ul></div>");
            setTimeout(function(){
                $(".hint_select").css("height", ($(".hint_select ul").height() + 2)+"px");
            }, 10);
            setTimeout(function(){
            	$(".hint_select").addClass("visi");
            }, 300);
            for (var z = 0; z < select_length; z++) {
            	
            	 var attr = _this.find("option").eq(z).attr('visbl');
                 var _hide = '';
                 if (typeof attr !== typeof undefined && attr !== false) {

                  _hide = 'display:none;'

                 }
       
                if(_this.find("option").eq(z).hasClass('selectedOption')){
                  selectedOption = 'selected';
                }else{
                  selectedOption = '';
                }

                select_arr.push(_this.find("option").eq(z).text());
                var commandName = "";
                if (_this.attr('commandName') != null)
                  commandName = "commandName='"+_this.attr('commandName')+"/"+_this.find("option").eq(z).val()+"'";
                var targetid = "";
                if (_this.attr('targetid') != null)
                  targetid = "targetid='"+_this.attr('targetid')+"'";
                $(".hint_select ul").append("<li class='"+selectedOption+"' style='"+_hide+"'><a href='#' "+commandName + " " + targetid+">"+_this.find("option").eq(z).text()+"</a></li>")
                
             };
             console.log('2');
            return false;
        }
    });
    


    
// added specially for infositeContactForm2 begin
    $(".parent, .input ").mouseout(function(){
        $("body").on("click",onClick);
    });
    $(".parent, .input ").mouseover(function(){
        $("body").off("click",onClick);
    })
// added specially for infositeContactForm2 end    
    
    
    
    $(".e_select select").mouseout(function(){
    	console.log('mouseout');
        $("body").on("click",onClick);
    });
    $(".e_select select").mouseover(function(){
    	console.log('mousover');
        $("body").off("click",onClick);
    })
    
    function onClick(){
    	console.log('hint select remove');
        $(".hint_select").remove();
        setTimeout(function(){
            //$("select.selected").removeClass();
        	$("select.selected").removeClass('selected');
        }, 150);
    }



    $(document).on( "click", ".hint_select ul li a", function() {
    	
    	
    	$(".selected option").removeClass('selectedOption');
        if ( $(".selected").hasClass("by_number") ) {

         $(".selected option:selected").text( $(".selected option").eq($(this).parent().index()).attr('label') );

         $(".selected option").eq($(this).parent().index()).addClass('selectedOption');

      }else{
      
            $(".selected option").eq($(this).parent().index()).prop({selected: true}).addClass('selectedOption');         

     }
     setTimeout(function(){
               $("select.selected").removeClass('selected');
           }, 150);
     
        /*$(".selected option").removeClass('selectedOption');
        $(".selected option").eq($(this).parent().index()).prop({selected: true}).addClass('selectedOption');
        setTimeout(function(){
            $("select.selected").removeClass();
        }, 150);*/

        return false;
    });

/* Super puper select yo yo yo end */


/* Datapicker begin */


    pickmeup_lang = {
      az : {
        days: [ "Bazar","Bazar ertəsi","Çərşənbə axşamı","Çərşənbə","Cümə axşamı","Cümə","Şənbə" ],
        daysShort: [ "B","Be","Ça","Ç","Ca","C","Ş" ],
        daysMin: [ "B","Be","Ça","Ç","Ca","C","Ş" ],
        months: [ "Yanvar","Fevral","Mart","Aprel","May","İyun","İyul","Avqust","Sentyabr","Oktyabr","Noyabr","Dekabr" ],
        monthsShort: [ "Yan","Fev","Mar","Apr","May","İyun","İyul","Avq","Sen","Okt","Noy","Dek" ]
      },
      en:{
        days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        months: ['January','February','March','April','May','June', 'July','August','September','October','November','December'],
        monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      ru:{
        days: ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'],
        daysShort: ['Вос','Пон','Вто','Сре','Чет','Пят','Суб'],
        daysMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
        months: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
        monthsShort: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек']
      }
    };

    if ($('.pickmeup_1').length > 0) {
        $('.pickmeup_1').pickmeup({
        	//default_date    : null,
        	position        : 'bottom',
            hide_on_select  : true,
            //date: new Date(),
            format  : 'd.m.Y',
            locale: pickmeup_lang['az']
        });
//        $(".pickmeup_1").keydown(function(){
//            return false;
//        });
    }

/* Datapicker end */


/* Alerts begin */

	// Login modal
//    $(".login_modal form").submit(function(){
//        var currentForm = $(this).closest("form");
//        if (currentForm.find("input[name=loginIdOrEmail]") != null) {
//            if(currentForm.find("input[name=loginIdOrEmail]").val().indexOf("@") != -1) {
//            	currentForm.find("input[name=byEmail]").attr('checked', true);
//            	currentForm.find("input[name=byLoginId]").attr('checked', false);
//        		currentForm.find("input[name=email]").val(currentForm.find("input[name=loginIdOrEmail]").val());
//        	} else  {
//            	currentForm.find("input[name=byEmail]").attr('checked', false);
//            	currentForm.find("input[name=byLoginId]").attr('checked', true);
//        		currentForm.find("input[name=loginId]").val(currentForm.find("input[name=loginIdOrEmail]").val());
//        	}
//      	
//        }

        
//		$(".login_modal").animate({"top": "-250px"}, 450);
//    });

    $(".contact_form_second form").submit(function(){
        var currentForm = $(this).closest("form");
    	 $('#a_main').val($(".parent .selectedOption").val());
         $('#a_prefix').val('');
         $('#a_prefix').val($(".input .active .selectedOption").val());
         $('#a_input').val($(".input .active > input").val());
    });
    
    $(".personal_settings .editEmail").click(function(){
    	$(".personal_settings .email").attr("readonly", false); 
    	$(".personal_settings .email").focus();
    	$(".personal_settings .sentOptEmail").removeClass("hidden");
    });
    
   
    $(".personal_settings .editMobile").click(function(){
    	$(".personal_settings .prefix").attr("disabled", false);
    	$(".personal_settings .phone").attr("readonly", false);
    	$(".personal_settings .phone").focus();
    	$(".personal_settings .sentOptMobile").removeClass("hidden");
    });

/* Alerts end */


/* ESCAPE key pressed begin */

    $(document).keydown(function(e) {
        if (e.keyCode == 27) {
            $("a.close").click();
            $(".preloader").addClass("hidden");
           	$(".captcha_modal").addClass("hidden");
        }
    });

/* ESCAPE key pressed end */


/* Nicescroll begin */

	if ($(".scroll_block").length) {
		
		$(".scroll_block").niceScroll({cursorcolor:"#00427B"});
		
//		if( !window.matchMedia("only screen and (max-width: 768px)").matches ) {
//			$(".scroll_block").niceScroll({cursorcolor:"#00427B"});
//
//       }
		
	}

/* Nicescroll begin */


/* Cabinet editable begin */

	$(".personal_cabinet .edit a").click(function(){
		$(this).toggleClass("active");
		$(".payments_list").toggleClass("editable");
		return false;
	});

/* Cabinet editable end */


/* Search by number begin */
	$(document).on( "keyup", ".search_by_number form .input .active input", function() {
		$(".search_by_number .form form button").removeClass("hidden"); //css("display","block"); // this must be first
		$(".search_by_number .form form button.add").addClass("hidden"); //css("display","none");
		
	});
	
	
	$(document).on( "change", ".search_by_number form > .parent .e_select.parent select", function() {
		var _this = $(this),
		_this_index = _this.find("option:selected").index();
	    _this.parents("form").find(".input > div").removeClass("active");
	    _this.parents("form").find(".input > div").eq(_this_index).addClass("active");
	});

    $(document).on( "click", ".hint_select ul li a", function() {
    	if ($(".e_select .selected").parents(".bank_accounts").length ){
    		  // this must go before condition parents(".search_by_number") - has to be improved - not best practice!!!
    		var commandName = $(this).attr('commandName'); 
    		if (commandName != null) {
    		  postAJAX('/GPEWebPortal/'+$(this).attr('commandName'), '',  
  					$(this).attr('targetid'), fillInData);
    		  unblockScreen();
    		}
    	} else 	if ($(".e_select .selected").parents(".contact_form_second").length) {  // this must go before condition parents(".search_by_number") - has to be improved
    		var commandName = $(this).attr('commandName'); 
    		if (commandName != null) {
//    			if (commandName == 'Infosite/Feedback/appealType/complaint' ||
//    			    commandName == 'Infosite/Feedback/appealType/suggestion') 
//    				  $("#receiptAndScPanel").addClass("hidden");
//    			else
//    				$("#receiptAndScPanel").removeClass("hidden");ed
    		  postAJAX('/GPEWebPortal/'+$(this).attr('commandName'), '',  
  					$(this).attr('targetid'), fillInData);
    		  unblockScreen();
    		}
    		
  	    } else 	if ($(".parent .selected").parents(".search_by_number").length) {
			var _this = $(this),
			_this_index = $(".parent .selected option:selected").index();
		    $(".search_by_number .input > div").removeClass("active");
		    $(".search_by_number .input > div").eq(_this_index).addClass("active");
		    $(".search_by_number .input .active input").val("");
    		if ($(this).closest("li").attr("class") != 'selected') {
    			$(".search_by_number .form form button").removeClass("hidden");//css("display","block"); // this must be first
    			$(".search_by_number .form form button.add").addClass("hidden");//css("display","none");
    			
    			
    		}
    	}else if ($(".select .selected").parents(".personal_cabinet").length) {
        	$('<form method="post" action="/GPEWebPortal/'+$(this).attr("commandName")+'"><input type="hidden" name="viewID" value="'+window.name+'"/></form>').appendTo('body').submit();
  	    }else if ($(".e_select .selected").parents(".companies").length) {
        	$('<form method="post" action="/GPEWebPortal/'+$(this).attr("commandName")+'"><input type="hidden" name="viewID" value="'+window.name+'"/></form>').appendTo('body').submit();
  	    } else if ($(".input .selected").parents(".personalSettings").length) {
    		
    	} else if ($(".input .selected").parents(".search_by_number").length) {
    		
    	} else if ($(".select .selected").parents(".payment_archive").length) {
    		
    		
    	}

      console.log(_this_index);
        return false;
    });

/* Search by number end */


/* Payment success validation begin */

    $(".payment_success .email_form form").submit(function(){
             $(".payment_success .email_form").removeClass("alert");

//            var r = /^\w+\.?\w+\.?\w+@\w+\.\w{2,4}$/i;
//            if (!r.test($(".payment_success .email_form input").val())) {
//                $(".payment_success .email_form").addClass("alert");
//            }

            if ($(".payment_success .email_form.alert").length > 0) {
                return false;
            }else{
        }
    });

/* Payment success validation begin */


/* Autocomplete begin */
    
    if ($('#scs').val() != null) {
        var json_data = jQuery.parseJSON( $('#scs').val() );

        var options2 = {
            data: json_data,
        		getValue: "name",
        		list: {
        			onKeyEnterEvent: function() {
        			
        		      return false;
        		},
        			onChooseEvent: function() {
        			
        		       //alert( $("#countries").getSelectedItemData().websitelink);
        		       window.location.href = $("#countries").getSelectedItemData().websitelink;
        		},
        		match: {
        			enabled: true
        		}
        	},

        		template: {
                type: "links",
                fields: {
                    link: "websitelink"
                }
            },

            theme: "square"
        };
        


    $("#countries").easyAutocomplete(options2);
    }
    


/* Autocomplete end */


/* Currency show hide begin */

	$("header#header .currency a").click(function(){

		$("header#header .currency").toggleClass("active");
		return false;
	});

    $("header#header .currency").mouseout(function(){
        $("body").on("click",InCurrency);
    });
    $("header#header .currency").mouseover(function(){
        $("body").off("click",InCurrency);
    })
    function InCurrency(){
		$("header#header .currency").removeClass("active");
    }
/* Currency show hide end */


/* Help accrodeon begin */

	$(".faq_list ul li a").click(function(){
		var _this = $(this);
		if (_this.parent().hasClass("active")) {
			$(".faq_list ul li").removeClass("active");
			$(".faq_list ul li > div").removeAttr("style");
		} else {
			$(".faq_list ul li").removeClass("active");
			$(".faq_list ul li > div").removeAttr("style");
			_this.parent().addClass("active");
			_this.next().css("height", (_this.next().find("div").height())+"px");			
		}

		return false;
	});

/* Help accrodeon end */


/* Table tabs begin */

	$(".statistic .tabs ul li a").click(function(){
		var _this = $(this),
		_this_index = _this.parent().index();
		$(".statistic .tabs ul li a").removeClass("active");
		_this.addClass("active");
		$(".statistic_table table").removeClass("active").eq(_this_index).addClass("active");
		
		$("#infositeStatsitcsForm #type").val(_this.attr("type"));
		return false;
	});

/* Table tabs end */


/* Result remove hover begin */

	$("footer.footer_result .links a.remove").mouseover(function(){
		$(".payments_list").addClass("x_hovered");
	}).mouseleave(function(){
		$(".payments_list").removeClass("x_hovered");
	});



infotableUlSelectInit = function(){


  if($('.infotableSelect .dropdown').length){
    $('.infotableSelect .dropdown').remove();
    $('.infotableSelect ul').show();
    $('.infotableSelect ul').dropdown('destroy');
  }

  $('.infotableSelect').each(function(){
    $('ul',this).dropdown({
      speed : 0
    });
  });


  $('.infotableSelect ul').on( 'dropdown-before-select', function( e, item, previous, dropdown ) {
    //setTimeout(function () {
      html = $.parseHTML( item.text );
      $.each(html,function(){
        if($(this).attr('data-id')){
        	postAJAX('/GPEWebPortal/'+$(this).attr('commandName'), 
    				'updatingElementCode='+$(this).attr('data-id') +'&sectionId='+$(this).attr('sectionId')+'&elementId='+$(this).attr('elementId'),  
    				'InvoiceDetailsLink'+$(this).attr('adoptedElementId'),
    				fillInDataThenDisplay);
        }
      });
    //},400)
  });

  $('.infotableSelect').each(function() {
    selectedValue = $('ul li[data-selected="selected"]',this).text();
    selectedValueCat = $('ul li[data-selected="selected"]',this).html();
    input = $('ul li[data-selected="selected"]',this).parents('.infotableSelect').find('input');
    dropdown_text = $(this).find(' > div.dropdown .dropdown-toggle .dropdown-text');
    parsedVal = $.parseHTML( selectedValue );
    parsedValCat = $.parseHTML( selectedValueCat );

    //$.each(parsedVal,function(){
      _this = $(parsedVal);
      dropdown_text.html(_this[0]);
    //});
    //$.each(parsedValCat,function(){
    //  _this = $(this);
      if($(this).attr('data-id')){
      
        input.val($(this).attr('data-id'))
      }
    //});
  });
};


if($('.infotableSelect ul') != null ) {
	if($('.infotableSelect ul').length > 0){
		  infotableUlSelectInit();
		}

	
}


$('a.link').click(function (event) {
    event.preventDefault();
    
	var currentScrollPosition = $(document).scrollTop();//($(this).offset().top - $(window).height()/2);

    $('#mainForm').remove();
    $('<form id="mainForm" method="post" action="/GPEWebPortal/'+$(this).attr("commandName")+'"><input type="hidden" name="currentScrollPosition" value="'+currentScrollPosition+'"/><input type="hidden" name="viewID" value="'+window.name+'"/></form>').appendTo('body');
    addAmountsToFormIfNesessary($(this), "unregisteredAmountsForm", "mainForm");
    $('#mainForm').submit();
   });

$('#unregisteredSearchForm > button.search').click(function () {

    	$('#a_main').val($(".parent .selectedOption").val());
        $('#a_prefix').val('');
        $('#a_prefix').val($(".input .active .selectedOption").val());
        $('#a_input').val($(".input .active > input").val());

        addAmountsToFormIfNesessary($(this), "unregisteredAmountsForm", "unregisteredSearchForm");
});

$('#registeredSimpleSearchForm > button.search').click(function () {

    	$('#a_main').val($(".parent .selectedOption").val());
        $('#a_prefix').val('');
        $('#a_prefix').val($(".input .active .selectedOption").val());
        $('#a_input').val($(".input .active > input").val());

        addAmountsToFormIfNesessary($(this), "registeredSimpleAmountsForm", "registeredSimpleSearchForm");
});



$('#registeredAccountsSearchForm > button.search').click(function () {
    $('#a_main').val($(".parent .selectedOption").val());
    $('#a_prefix').val('');
    $('#a_prefix').val($(".input .active .selectedOption").val());
    $('#a_input').val($(".input .active > input").val());

    $('#registeredAccountsSearchForm').submit();

return false;
});


$('#ScrollToErrorLineLink').click(function () {
//	alert($(".payments_editable_list .single_alert .func a.info").offset().top);
//	alert($(window).scrollTop());
//	alert($(window).height());
    $('html, body').animate({
	     scrollTop: $(".payments_editable_list .single_alert .func a.info").offset().top - $(window).height()/2	
	   }, 500);
});

$('.printPoint').click(function () {
    // Opera 8.0+
    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

    // Firefox 1.0+
    var isFirefox = typeof InstallTrigger !== 'undefined';

    // Safari 3.0+ "[object HTMLElementConstructor]" 
    var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);

    // Internet Explorer 6-11
    var isIE = /*@cc_on!@*/false || !!document.documentMode;

    // Edge 20+
    var isEdge = !isIE && !!window.StyleMedia;

    // Chrome 1+
    var isChrome = !!window.chrome && !!window.chrome.webstore;
	
	
	
	
//	  window.print();
	   var divToPrint=$('.printable');
	   newWin= window.open("");
	   newWin.document.write("<link type='text/css' rel='stylesheet' href='/GPEWebPortal/resources/css/print.css'>");
	   newWin.document.write(divToPrint.html());
	   if (isChrome) {
		   var script = document.createElement('script');
		   script.src = '/GPEWebPortal/resources/js/printer.js';
		   newWin.document.head.appendChild(script);
	   }
	   newWin.document.close();

	   if (isIE || isFirefox || isEdge) {
	     newWin.print();
	     newWin.close();
	   }
	   
})

});