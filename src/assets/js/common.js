var emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


function postAJAX(url, queryString, containerId, positiveResultProcessor, modalClassName, negativeResultUrl) {
		$.post(url+"?viewID="+window.name+((queryString)?"&"+queryString:""), function(data) {
			positiveResultProcessor(containerId, data, modalClassName);
		}).fail(function(xhr, status, error) {
	         if(error!=null)
               $('<form method="post" action="'+negativeResultUrl+'"><input type="hidden" name="viewID" value="'+window.name+'"/></form>').appendTo('body').submit();
               return false;
        });
}

function fillInData(containerId, data) {
	//setTimeout(function() {
		$("#" + containerId).html(data);
		$("body").removeClass("overflow");
		$(".darkness").delay(150).animate({"opacity": "hide"}, 450);
	//}, 2000);
}

function fillInDataThenAnimate(containerId, data, modalClassName) {
    //setTimeout(function(){
		if (data.indexOf('Default') !== -1){
			$('<form method="post" action="/GPEWebPortal/'+data+'"><input type="hidden" name="viewID" value="'+window.name+'"/></form>').appendTo('body').submit();
			return false;
		}
    	$("#"+containerId).html(data);
    	//alert("animate");
    	$(modalClassName).animate({"top": "50%"}, 450);
    //}, 2000);

}

function fillInDataThenDisplay(containerId, data, modalClassName) {
    //setTimeout(function(){
    	$("#"+containerId).css("display","block");
    	$("body").removeClass("overflow");
    	$(".darkness").delay(150).animate({"opacity": "hide"}, 450);
    //}, 2000);

}


function commonJSButtonClick(event){
	 eval($(this).attr('jsFunction'));	        
     return false;
}


function commonPreConfirmButtonClick(event){
    var current_form = $(this).attr('formId');
    //var action =  $('#'+current_form).attr("action");
    var sectionId =  $(this).attr("sectionId");
    $('#'+current_form).attr("action", "/GPEWebPortal/" + $(this).attr('commandName'));
    $('#'+current_form +' input[name=elementId]').val($(this).attr('elementId')); 
    if (sectionId != null)
      $('#'+current_form +' input[name=sectionId]').val(sectionId);
    
    
      if($(this).attr("commandName").indexOf("Unregistered") != -1)
      	addAmountsToFormIfNesessary($(this), "unregisteredAmountsForm", current_form);
      else if ($(this).attr("commandName").indexOf("Registered") != -1)
       	addAmountsToFormIfNesessary($(this), "registeredAmountsForm", current_form);
}

function commonConfirmButtonClick(event){

	$(this).closest("form").submit();
}

function blockScreen(){
	$("body").addClass("overflow");
    $(".darkness").animate({"opacity": "show"}, 450);
} 

function unblockScreen(){
	$("body").removeClass("overflow");
	$(".darkness").animate({"opacity": "hide"}, 450);
}

function preProcessFormSubmit() {
	var currentForm = $(this).closest("form");	
    var recaptchaRequired = currentForm.attr("recaptchaRequired") == "true"; 
    $("#"+currentForm.attr('id') + " .error").remove();
	if (requiredFieldValidationPassed(currentForm)) {
	  if (recaptchaRequired) {
		  if (captchaIsOn) {
			blockScreen();
	    	$(".captcha_modal").removeClass("hidden");
	    	return false;
		  }
	  }
      currentForm.submit(); 
	}
}

function requiredFieldValidationPassed(currentForm) {
    currentForm.find(".alert").removeClass("alert");
    if (!jsValidationIsOn)
    	return true;
    var customValidator = currentForm.attr("customValidator");
	if (customValidator != null) {
		window[customValidator](currentForm);

	} else {
	    //var currentForm = $("#"+event.target.id);
	    //var currentForm = $(this).closest("form");	

	    for (var i = 0; i < currentForm.find("textarea, input[data-required=1]").length; i++) {
		  if (currentForm.find("textarea, input[data-required=1]").eq(i).val() == "") {
			  currentForm.find("textarea, input[data-required=1]").eq(i).parents("li").addClass("alert");
			  currentForm.find("textarea, input[data-required=1]").eq(i).parents("li").find("em").text(getErrorByKey("gwp.jsValidation.fieldIsEmpty"));
	      }
	    }
	    
	    for (var i = 0; i < currentForm.find("input[data-check=mobilePhone]").length; i++) {
	    	var phoneRegExp = new RegExp("^\\d{"+currentForm.find("input[data-check=mobilePhone]").eq(i).data("length")+"}$");
	    	var data = currentForm.find("input[data-check=mobilePhone]").eq(i).val().replace("+", "");
	    	 if (currentForm.find("input[data-check=mobilePhone]").eq(i).val() != "" && !phoneRegExp.test(data) ) { // (currentForm.find("input[data-check=mobilePhone]").eq(i).val()).length < currentForm.find("input[data-check=mobilePhone]").eq(i).data("min") ) {
				  currentForm.find("input[data-check=mobilePhone]").eq(i).parents("li").addClass("alert");
				  if (currentForm.find("input[data-check=mobilePhone]").eq(i).data("length") == 12)
				    currentForm.find("input[data-check=mobilePhone]").eq(i).parents("li").find("em").text(getErrorByKey("gwp.jsValidation.wrongFormat"));
				  if (currentForm.find("input[data-check=mobilePhone]").eq(i).data("length") == 7)
                    currentForm.find("input[data-check=mobilePhone]").eq(i).parents("li").find("em").text(getErrorByKey("gwp.jsValidation.wrongMobileShortPhoneFormat"));
		      }
		    }
	    
//		if ((currentForm.find("input.phone").length) && (currentForm.find("input.phone").val()).length < currentForm.find("input.phone").data("min")) {
//		currentForm.find("input.phone").parent().addClass("alert");
//		currentForm.find("input.phone").prev().children("em").text(getErrorByKey("gwp.jsValidation.wrongMobilePhoneFormat"));
//    }
	    
	    for (var i = 0; i < currentForm.find("input[data-check=email]").length; i++) {
          if (currentForm.find("input[data-check=email]").eq(i).val() != "" && !emailRegExp.test(currentForm.find("input[data-check=email]").eq(i).val())) {
        	  currentForm.find("input[data-check=email]").eq(i).parents("li").addClass("alert");
        	  currentForm.find("input[data-check=email]").eq(i).parents("li").find("em").text(getErrorByKey("gwp.jsValidation.wrongFormat"));
          }
		}
		  
//		  if (currentForm.find("input.email").val() != "" && !emailRegExp.test(currentForm.find("input.email").val())) {
//			  currentForm.find("input.email").parent().addClass("alert");
//		  }
	    
	    //.register_next form
	    for (var i = 0; i < currentForm.find("input[data-required="+currentForm.find("select[name=activationMethod]").val()+"]").length; i++) {
	        if (currentForm.find("input[data-required="+currentForm.find("select[name=activationMethod]").val()+"]").eq(i).val() == "" ) {
	        	currentForm.find("input[data-required="+currentForm.find("select[name=activationMethod]").val()+"]").eq(i).parents("li").addClass("alert");
	        	currentForm.find("input[data-required="+currentForm.find("select[name=activationMethod]").val()+"]").eq(i).parents("li").find("em").text(getErrorByKey("gwp.jsValidation.fieldIsEmpty"));
	        }
	      }

//	    for (var i = 0; i < currentForm.find("textarea, input[data-required=1], select[data-required=1]").length; i++) {
//	        if (currentForm.find("textarea, input[data-required=1]").eq(i).val() == "") {
//	        	currentForm.find("textarea, input[data-required=1]").eq(i).parent().addClass("alert");
//	            currentForm.find("input[data-required=1]").eq(i).parents("li").addClass("alert");
//	        }
//	      }
	//    


	}


    if (currentForm.find(".alert").length > 0) {
    	return false;
    }
    return true;
}

  function infositeContactForm2Validate(currentForm) {
      for (var i = 0; i < currentForm.find("textarea, input[data-required=1]").length; i++) {
        if (currentForm.find("textarea, input[data-required=1]").eq(i).val() == "") {
        	currentForm.find("textarea, input[data-required=1]").eq(i).parent().addClass("alert");
        	currentForm.find("textarea, input[data-required=1]").eq(i).parent().find("em").text(getErrorByKey("gwp.jsValidation.fieldIsEmpty"));
                }
              }
  
      for (var i = 0; i < currentForm.find("select[data-required=1]").length; i++) {
        if (currentForm.find("select[data-required=1]").eq(i).find("option:selected").index() == "0") {
        	currentForm.find("select[data-required=1]").eq(i).parent().parent().addClass("alert");
        	currentForm.find("select[data-required=1]").eq(i).parent().parent().find("em").text(getErrorByKey("gwp.jsValidation.fieldIsEmpty"));
        }
      }
      
	    for (var i = 0; i < currentForm.find("input[data-check=email]").length; i++) {
	          if (currentForm.find("input[data-check=email]").eq(i).val() != "" && !emailRegExp.test(currentForm.find("input[data-check=email]").eq(i).val())) {
	        	  currentForm.find("input[data-check=email]").eq(i).parent().addClass("alert");
	        	  currentForm.find("input[data-check=email]").eq(i).parent().find("em").text(getErrorByKey("gwp.jsValidation.wrongFormat"));
	          }
			}
    	
	    for (var i = 0; i < currentForm.find("input[data-check=mobilePhone]").length; i++) {
	    	var phoneRegExp = new RegExp("^\\d{"+currentForm.find("input[data-check=mobilePhone]").eq(i).data("length")+"}$");
	    	var data = currentForm.find("input[data-check=mobilePhone]").eq(i).val().replace("+", "");
			  if (currentForm.find("input[data-check=mobilePhone]").eq(i).val() != "" &&  !phoneRegExp.test(data) ) {  //(currentForm.find("input[data-check=mobilePhone]").eq(i).val()).length < currentForm.find("input[data-check=mobilePhone]").eq(i).data("min")) {
				  currentForm.find("input[data-check=mobilePhone]").eq(i).parent().addClass("alert");
				  if (currentForm.find("input[data-check=mobilePhone]").eq(i).data("length") == 12)
				    currentForm.find("input[data-check=mobilePhone]").eq(i).parent().find("em").text(getErrorByKey("gwp.jsValidation.wrongFormat"));
				  if (currentForm.find("input[data-check=mobilePhone]").eq(i).data("length") == 7)
                  currentForm.find("input[data-check=mobilePhone]").eq(i).parent().find("em").text(getErrorByKey("gwp.jsValidation.wrongMobileShortPhoneFormat"));
		      }
		    }
  }

function startLoadingEffect() {
	if ($(this).find(".alert").length > 0) {
        return false;
    }
	
	if ($(this).attr("blockScreenNotRequired"))
	  return false;
	blockScreen();
    $(".preloader").removeClass("hidden");
}

function stopLoadingEffect() {
    //setTimeout(function(){
    	//unblockScreen();
    	$(".preloader").addClass("hidden");
    //}, 2000);
}    

function replaceCommatWithDotTrigger () {
	replaceCommatWithDot ($(this));
}

function replaceCommatWithDot(form) {
    for (var i = 0; i < form.find("input[name^='paymentAmountList']").length; i++) {
    	form.find("input[name^='paymentAmountList']").eq(i).val(form.find("input[name^='paymentAmountList']").eq(i).val().replace(',','.'));
      //alert($(this).find("input[name^='paymentAmountList']").eq(i).val());   
     }
}

function replaceAllInputsCommaWithDot(formName) {
	var form = $('#'+formName);
    for (var i = 0; i < form.find("input[name*='Amount']").length; i++) {
    	form.find("input[name*='Amount']").eq(i).val(form.find("input[name*='Amount']").eq(i).val().replace(',','.'));
      //alert($(this).find("input[name*='Amount']").eq(i).val());   
     }
//	$('#'+formName+'> input[type=text]').each(function(key, input) {
//		alert(input.name+input.value.indexOf(','));
//		if (input.name.contains('Amount'))
			//input.value.replace(',','.');
        //alert(key + '=' + value.val());
//    });
}

function addAmountsToFormIfNesessary(eventSource, sourceForm, targetForm) {
	if (eventSource.attr("sendAmounts")) {
	    $('#'+targetForm+' :input[isacopy]').remove();
	    $('#'+sourceForm+' :input').not(':submit').clone().hide().attr('isacopy','y').appendTo('#'+targetForm);
	    
	    replaceCommatWithDot($('#'+targetForm));
	}
}

function getErrorByKey(key) {
    var found = null;

    for (var i = 0; i < errors.length; i++) {
        var element = errors[i];

        if (element.key == key) {
           found = element;
       } 
    }

    return found.value;
}


