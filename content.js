//find all the addresses and replace them with pseudo
var w2p = function(){
    chrome.storage.sync.get('w2p', function(data) {
        if(!data){
            return false;
        }
        if($.fn){
            $ = jQuery
        }
        let newHtml = $("body");
        // removing scripts to avoid double declarations
        // newHtml = newHtml.find('script').remove();
        newHtml = newHtml.html();
        for (const address in data['w2p']) {
            if (Object.hasOwnProperty.call(data['w2p'], address)) {
                // regex explanation : regexr.com/6bmei
                const re = new RegExp('(?<=<\s*(div|span|a|p)[^<]*>[^<>]*)'+address+'(?=[^<>]*<\s*\/(span|a|div|p)\s*>)', 'gi')

                // for websites like xdao that only dipslay first and last digits
                const re2 = new RegExp('(?<=<\s*(div|span|a|p)[^<]*>[^<>]*)'+address.slice(0,5)+'.*'+address.slice(-3)+'(?=[^<>]*<\s*\/(span|a|div|p)\s*>)', 'gi')

                // for websites like xdao that only dipslay first digits
                const re3 = new RegExp('(?<=<\s*(div|span|a|p)[^<]*>[^<>]*)'+address.slice(0,10)+'(?=[^<>]*<\s*\/(span|a|div|p)\s*>)', 'gi')

                // for websites like xdao that only dipslay first digits, after the two first ones
                const re4 = new RegExp('(?<=<\s*(div|span|a|p)[^<]*>[^<>]*)'+address.slice(2,12)+'(?=[^<>]*<\s*\/(span|a|div|p)\s*>)', 'gi')

                const reFinal = new RegExp(re.source + "|" + re2.source + "|" + re3.source + "|" + re4.source, 'gi');
                // console.log('reFinal',reFinal);
                newHtml = newHtml.replace(reFinal,data['w2p'][address]);
            }
        };
        $("body").html(newHtml);        
    })
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
    }else if(request.action === 'w2p_start'){
        w2p();
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

