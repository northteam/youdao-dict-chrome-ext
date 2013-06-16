

function openQueryTab(info, tab)
{
	var query_url = "http://dict.youdao.com/search?le=eng&q=" + info.selectionText;
	chrome.tabs.create({"url":query_url, "active":true});
}


var title = chrome.i18n.getMessage("contextTitle");
var ID = chrome.contextMenus.create({"title": title,
		"contexts": ["selection"],
		"onclick": openQueryTab});


