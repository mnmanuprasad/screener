(()=>{

    let mediaRecorder;
    let stream;
    let videoBlob;
    let recordedChunks = [];

    chrome.runtime.onMessage.addListener(async (obj, sender, response)=>{
        if(obj['type']=='START'){
            startRecording(response);
        }
        if(obj['type']=='STOP'){
            stopRecording(response);
        }
        
    })

    async function stopRecording(response){
        mediaRecorder.stop();
    }

    async function startRecording(response){
        stream = await navigator.mediaDevices.getDisplayMedia({'video': true});
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = (event)=>{
            if(event.data && event.data.size > 0){
                recordedChunks.push(event.data);
            }
        }

        mediaRecorder.onstop = ()=>{
            console.log("Recording has been stoppped");
            videoBlob = new Blob(recordedChunks, {type: 'video/webm'})
            const recordURL = URL.createObjectURL(videoBlob);
           
        }
        mediaRecorder.start();
    }
})();