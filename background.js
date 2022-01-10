chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({act: 0}, function() {
        console.log("Actual Count set to -1");
      });
      chrome.storage.sync.set({max: 160}, function() {
        console.log("Max Count set to 160");
      });
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
        })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
  });