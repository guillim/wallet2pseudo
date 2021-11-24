chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({hide: true}, function() {
    console.log("Wallet2Pseudo is on");
  });
});

chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  chrome.declarativeContent.onPageChanged.addRules([{
    conditions: [new chrome.declarativeContent.PageStateMatcher({
      pageUrl: {hostEquals: 'www.quora.com'},
    })
    ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
  }]);
});

