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
            stopRecording();
        }
        
    })

    async function stopRecording(){
        mediaRecorder.stop();
    }

    async function startRecording(){
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
            console.log(recordURL)

            var elem = window.document.createElement('a');
            elem.href = window.URL.createObjectURL(videoBlob);
            elem.download = 'RecordedVideo2.webm';        
            document.body.appendChild(elem);
            elem.click();       
        }
        mediaRecorder.start();
    }
})();