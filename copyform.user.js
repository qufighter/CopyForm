chrome.runtime.onMessage.addListener(
function(request, sender, sendResponse) {
	var active = document.activeElement;
	var parentForm = active.parentNode;
	while( parentForm.nodeName != 'FORM' ){
		parentForm = parentForm.parentNode;
	}
	if(request.pasteform){
		delete request.pasteform;
		for( i in request ){
			var n=parentForm.querySelector("[name='"+i+"']");
			if( n ){
				n.value = request[i];
			}
		}
		sendResponse({});
	}else if (request.copyform){
		var resp={};
		resp=appendFrmElms(resp,parentForm.getElementsByTagName('input'));
		resp=appendFrmElms(resp,parentForm.getElementsByTagName('select'));
		resp=appendFrmElms(resp,parentForm.getElementsByTagName('textarea'));
		sendResponse(resp);
	} 
});

function appendFrmElms(resp, formElms){
	for(var f=0,l=formElms.length; f<l; f++){
		resp[formElms[f].name] = formElms[f].value;
	}
	return resp;
}

