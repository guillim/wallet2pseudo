//find all the addresses and replace them with pseudo
var w2p = function(){
    chrome.storage.sync.get('w2p', function(data) {
        if(!data){
            return false;
        }
        for (const address in data['w2p']) {
            if (Object.hasOwnProperty.call(data['w2p'], address)) {
                var re = new RegExp(address, 'gi')
                $("body").html($("body").html().replace(re,data['w2p'][address]));
            }
        };
    });
}


var p2w=function(){
    console.log('todo : the reverse way... wait until people ask for it');
}

var addListeners=function(){
    w2p();
}

var removeListeners=function(){
    $(window).unbind('scroll');
    p2w();
}

//message listener for background
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)    {
    if(request.command === 'init'){
        addListeners();
    }else{
        removeListeners();
    }
    sendResponse({result: "success"});
});

window.onload=function(){  
    chrome.storage.sync.get('hide', function(data) {
        if(data.hide){
            addListeners();
        }else{
            removeListeners();
        } 
    });
}

