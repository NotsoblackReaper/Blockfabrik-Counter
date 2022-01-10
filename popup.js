function intToHex(i) {
    var hex = parseInt(i).toString(16);
    return (hex.length < 2) ? "0" + hex : hex;
}
    
function makeColor(value) {
    // value must be between [0, 510]
    value = Math.min(Math.max(0,value), 1) * 510;

    var redValue;
    var greenValue;
    if (value < 255) {
        redValue = 255;
        greenValue = Math.sqrt(value) * 16;
        greenValue = Math.round(greenValue);
    } else {
        greenValue = 255;
        value = value - 255;
        redValue = 255 - (value * value / 255)
        redValue = Math.round(redValue);
    }
    return "#" + intToHex(redValue) + intToHex(greenValue) + "00";
}

let url = "https://www.boulderado.de/boulderadoweb/gym-clientcounter/index.php?mode=get&token=eyJhbGciOiJIUzI1NiIsICJ0eXAiOiJKV1QifQ.eyJjdXN0b21lciI6IkJsb2NrZmFicmlrV2llbiJ9.yymz1Eg_-jX28iMdaq1aGVb0iD4-29uWVkuxZd7a_9U&raw=1";
let visitors = document.getElementById('visitors');
let free = document.getElementById('free');

var counter=-1;
var maxcount=-1;
chrome.storage.sync.get('act', function(data) {
    console.log("Set counter to "+data.act)
    counter=data.act;
    visitors.innerText=counter;
  });
chrome.storage.sync.get('max', function(data) {
    console.log("Set maxcount to "+data.max)
    maxcount=data.max;
    free.innerText=maxcount-counter;
  });

fetch(url)
.then(res => res.json())
.then((out) => {

data = JSON.stringify(out, null, 4);
var obj = JSON.parse(data);

counter = obj.counter;
maxcount = obj.maxcount;

visitors.innerText=counter;
free.innerText=maxcount-counter;

var percent = ((counter / maxcount) * 100) + 9;
if (percent > 105)
    percent = 105;
var percentile = percent + "%";

document.getElementById("arrow_bar").style.width = percentile; 

chrome.storage.sync.set({act: counter});
chrome.storage.sync.set({max: maxcount});

}).catch(err => { throw err });