var changePseudo = document.getElementById('changePseudo');

//on init update the UI checkbox based on storage
chrome.storage.sync.get('hide', function(data) {
  changePseudo.checked=data.hide;
});

changePseudo.onchange = function(element) {
  let value = this.checked;

  //update the extension storage value
  chrome.storage.sync.set({'hide': value}, function() {
    console.log('The value is'+ value);
  });

  //Pass init or remove message to content script 
  if(value){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {command: "init", hide: value}, function(response) {
        response &&= response.result
      });
    });
  }else{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {command: "remove", hide: value}, function(response) {
        response &&= response.result
      });
    });
  }

};


var w2pclick = document.getElementById('w2pclick');

w2pclick.onclick = function() {
  var pseudo = document.getElementById('addPseudo');
  var address = document.getElementById('addAddress');
  pseudo &&= pseudo.value;
  address &&= address.value;

  chrome.storage.sync.get('w2p', function(data) {
    var w2p = (data && data['w2p']) ? data['w2p'] : {}
    w2p[address] =  pseudo;

    chrome.storage.sync.set({'w2p': w2p}, function() {
      document.getElementById('addPseudo').value = ''
      document.getElementById('addAddress').value = ''
    });
  });

}

document.getElementById('options').onclick = function() {
  chrome.tabs.create({ url: "options.html" });
}
