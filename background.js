chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({hide: true}, function() {
    console.log("Wallet2Pseudo is on");
  });
});

// regex follow re2 standard
chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  chrome.declarativeContent.onPageChanged.addRules([{
    conditions: [new chrome.declarativeContent.PageStateMatcher({
      pageUrl: {
        ports: [80,443],
        urlMatches: '.*bscscan.*|.*dextools.*|.*etherscan.*|.*xdao.*|.*blockchain.*|.*bitquery.*|.*poocoin.*'
      },
    })
    ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
  }]);
});

