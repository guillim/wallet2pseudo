chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({hide: false}, function() {
    console.log("Wallet2Pseudo is on, use Ctrl+Shift+P to start it up, or switch to auto-mode");
  });
});

// regex follow re2 standard
chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  chrome.declarativeContent.onPageChanged.addRules([{
    conditions: [new chrome.declarativeContent.PageStateMatcher({
      pageUrl: {
        ports: [80,443],
        urlMatches: '.*bscscan.*|.*dextools.*|.*etherscan.*|.*xdao.*|.*blockchain.*|.*bitquery.*|.*poocoin.*|.*pancakeswap.*|.*apeswap*',
      },
    })
    ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
  }]);
});

chrome.commands.onCommand.addListener(function (command) {
  switch (command) {
      case 'launch':
          chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "w2p_start" });
          });
          break;
      default:
          console.log(`Command ${command} not found`);
  }
});