chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({hide: true}, function() {
    console.log("Wallet2Pseudo is on");
  });
});

chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  console.log("Wallet2Pseudo is onPageChanged");
  chrome.declarativeContent.onPageChanged.addRules([{
    conditions: [new chrome.declarativeContent.PageStateMatcher({
      pageUrl: {ports: [80,443]},
    })
    ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
  }]);
});

