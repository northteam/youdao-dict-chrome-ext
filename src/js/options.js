

function $(id)
{
  return document.getElementById(id);
}

function i18n_init()
{
  var i18n_eles = document.querySelectorAll("[i18n-content]");
  for (var i = 0; i < i18n_eles.length; i++)
  {
    var ele = i18n_eles[i];
    var i18n_name = ele.getAttribute("i18n-content");
    if (i18n_name)
    {
      var message = chrome.i18n.getMessage(i18n_name);
      if (message)
      {
        ele.innerText = message;
      }
    }
  }
}

function option_init()
{
  chrome.storage.sync.get("tab_open_mode", function(obj) {
    var tab_open_mode = obj.tab_open_mode;
    if (tab_open_mode == "option-open-in-new-tab")
    {
      $("option-open-in-existing-tab").checked = true;
    }
    else
    {
      $("option-open-in-new-tab").checked = true;
    }
  });
}

function handle_tab_open_mode_change(event)
{
  chrome.storage.sync.set({"tab_open_mode": event.target.id});
}

function register_option_listener()
{
  $("option-open-in-new-tab").onchange = handle_tab_open_mode_change;
  $("option-open-in-existing-tab").onchange = handle_tab_open_mode_change;
}

function init()
{
  i18n_init();
  option_init();
  register_option_listener();
}


document.addEventListener('DOMContentLoaded', init);

// vim: sw=2 ts=2 sta et
