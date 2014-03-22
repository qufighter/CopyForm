var ctxid1, ctxid2, ctxid3, lastFormData={};

function ctxMenuOnClick(info, tab) {
	if( info.menuItemId == "copy_form" ){
		chrome.tabs.sendMessage(tab.id, {copyform:true}, function(response) {
			if( response ){
				lastFormData = response;
				console.log("Copied form successfully");
				chrome.contextMenus.update(ctxid3, {enabled:true});
				chrome.contextMenus.update(ctxid2, {enabled:true});
			}else{
				console.log("Sorry, you have to refresh the page before it will work when first installed.");
				alert("Sorry, you have to refresh the page before it will work when first installed.");
			}
		});
	}else if( info.menuItemId == "paste_form" ){
		lastFormData.pasteform = true;
		chrome.tabs.sendMessage(tab.id, lastFormData, function(response) {
			console.log("Pasted form successfully");
		});
	}else if( info.menuItemId == "clear_form_clipboard" ){
		lastFormData = {};
		chrome.contextMenus.update(ctxid2, {enabled:false});
		chrome.contextMenus.update(ctxid3, {enabled:false});
	}
}

chrome.contextMenus.onClicked.addListener(ctxMenuOnClick);

chrome.runtime.onInstalled.addListener(function() {
	ctxid1 = chrome.contextMenus.create({"title": "Copy Form", "id":"copy_form", "contexts":["editable"]});
	ctxid2 = chrome.contextMenus.create({"title": "Paste Form", "id":"paste_form", "contexts":["editable"], enabled:false});
	ctxid3 = chrome.contextMenus.create({"title": "Clear Form Clipboard", "id":"clear_form_clipboard", "contexts":["editable"], enabled:false});
});
