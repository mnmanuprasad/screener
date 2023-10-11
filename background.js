
chrome.commands.onCommand.addListener(async (command) => {
    if(command == 'stop-recording'){
        let queryOptions = {active: true, currentWindow: true};
        let [tab] = await chrome.tabs.query(queryOptions);
        chrome.tabs.sendMessage(tab.id, {type: 'STOP'}) 
    }
    else{
        console.log(command)
    }
    
  });