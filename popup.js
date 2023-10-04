import { getActiveTab } from "./utils.js";

(function(){

        const startRecordBtn = document.getElementById('start-record');
        const stopRecordBtn = document.getElementById('stop-record');

        startRecordBtn.addEventListener('click',async ()=>{
            let tab = await getActiveTab();
            chrome.tabs.sendMessage(tab.id, {type: 'START'}, downloadVideo) 
        })
        
})();

function downloadVideo(url){
    if (url && typeof url === 'string') {
        chrome.downloads.download({
          saveAs: true,
          url: url
        });
    }
    else(
        chrome.downloads.download({
            saveAs: true,
            url: "https://images.pexels.com/photos/735911/pexels-photo-735911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        })
    );
  
}