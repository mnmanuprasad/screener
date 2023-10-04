(()=>{

    let mediaRecorder;
    let stream;
    let videoBlob;
    let recordedChunks = [];

    chrome.runtime.onMessage.addListener(async (obj, sender, response)=>{
        console.log("From content script: ", obj)
        // startRecording({callback: response});
        startRecording();
    })

    async function startRecording(){
        stream = await navigator.mediaDevices.getDisplayMedia({'video': true});
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = (event)=>{
            console.log(event)
            if(event.data && event.data.size > 0){
                console.log("Recorded data size :", event.data.size);
                recordedChunks.push(event.data);
            }
        }

        mediaRecorder.onstop = ()=>{
            console.log("Recording has been stoppped");
            videoBlob = new Blob(recordedChunks, {type: 'video/webm'})
            const recordURL = URL.createObjectURL(videoBlob);
            console.log(recordURL)
            // data.callback(recordURL)
           
        }
        mediaRecorder.start();
    }
})();