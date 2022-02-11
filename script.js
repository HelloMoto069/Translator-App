var translate = document.getElementById('translate');
translate.addEventListener("click", translator);

async function translator() {
    var input = document.getElementById('input').value;

    function input_data() {
        var input_language = document.getElementById('input_language').value;
        return input_language;
    }

    function output_data() {
        var output_language = document.getElementById('output_language').value;
        return output_language;
    }

    var inp = input_data();
    var out = output_data();

    const res = await fetch("https://libretranslate.de/translate", {
            method: "POST",
            body: JSON.stringify({
                q: input,
                source: inp,
                target: out,
            }),
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then((res) => {
            var result = res.json()
                .then((data) => {
                    var output = document.getElementById('output');
                    if (data.translatedText == undefined) {

                        output.innerText = '';
                    } else {
                        output.innerText = data.translatedText;
                    }
                })
        }).catch((err) => {
            // console.log('err', err);
        });
}

// Voice recognization 

var recording = document.getElementById("rec_btn");
recording.addEventListener('click', recVoice);

function recVoice() {
    var speechRecog = new webkitSpeechRecognition();
    speechRecog.lang = "en-GB";
    speechRecog.onresult = function(event) {

        let input = document.getElementById('input');
        input.innerText = event.results[0][0].transcript;
    }
    speechRecog.start();

}

// Text copy

var copy_btn = document.getElementById('copy_btn');
copy_btn.addEventListener('click', copyText);

function copyText() {
    let out_text = document.getElementById('output');
    out_text.select();
    navigator.clipboard.writeText(out_text.value);
}