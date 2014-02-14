

function option_init_default()
{
  chrome.storage.sync.get("tab_open_mode", function(obj) {
    if (ojb.tab_open_mode == undefined)
    {
      chrome.storage.sync.set({"tab_open_mode": "option-open-in-existing-tab"});
    }
  });
}

function open_query_tab(info, original_tab)
{
  var query_url = "http://dict.youdao.com/search?le=eng&q=" + encodeURIComponent(info.selectionText);

  chrome.storage.sync.get("tab_open_mode", function(obj) {
    var tab_open_mode = obj.tab_open_mode;
    if (tab_open_mode == "option-open-in-existing-tab" && last_tab_id != null)
    {
      chrome.tabs.update(last_tab_id, {
        "url": query_url,
        "openerTabId": original_tab.id,
        "active": true
      }, function(tab) {
        chrome.tabs.move(tab.id, {
          "windowId": original_tab.windowId,
          "index": original_tab.index + 1
        });
      });
    }
    else
    {
      chrome.tabs.create({
        "url": query_url,
        "index": original_tab.index + 1,
        "openerTabId": original_tab.id,
        "active":true
      }, function(tab) {
        last_tab_id = tab.id;
      });
    }
  });
}


chrome.runtime.onInstalled.addListener(option_init_default);

var last_tab_id = null;
chrome.tabs.onRemoved.addListener(function(tab_id, obj) {
  if (tab_id == last_tab_id)
  {
    last_tab_id = null;
  }
});

var title = chrome.i18n.getMessage("context_title");
chrome.contextMenus.create({
  "title": title,
  "contexts": ["selection"],
  "onclick": open_query_tab
});




// vim: sw=2 ts=2 sta et
