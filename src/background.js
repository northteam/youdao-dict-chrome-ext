

function openQueryTab(info, tab)
{
	var query_url = "http://dict.youdao.com/search?le=eng&q=" + encodeURIComponent(info.selectionText);
	var tab_index = tab.index + 1;
	chrome.tabs.create({"url":query_url, "index":tab_index, "active":true});
}


var title = chrome.i18n.getMessage("contextTitle");
var ID = chrome.contextMenus.create({"title": title,
		"contexts": ["selection"],
		"onclick": openQueryTab});


