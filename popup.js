import { getActiveTab } from "./utils.js";

(function(){

        // const startRecordBtn = document.getElementById('start-record');
        // const stopRecordBtn = document.getElementById('stop-record');

        // startRecordBtn.addEventListener('click',async ()=>{
        //     let tab = await getActiveTab();
        //     chrome.tabs.sendMessage(tab.id, {type: 'START'}, downloadVideo) 
        // })
        
        // startRecordBtn.addEventListener('click', async()=>{
        //     let tab = await getActiveTab();
        //     chrome.tabs.sendMessage(tab.id, {type: 'STOP'}, downloadVideo)
        // })
})();

function downloadVideo(url){
    if (url && typeof url === 'string') {
        chrome.downloads.download({
          saveAs: true,
          url: url
        });
    }
    else(
        console.log(url)
    );
  
}