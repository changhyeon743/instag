document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('main').onload = function() {
        changeHeight()
      }
});

function changeHeight() {
    // document.getElementById("notice").innerHTML = document.body.style.height
    // document.getElementById("main").style.height=document.getElementById("main").contentDocument.body.scrollHeight +'px';
    if (document.documentElement.style.height == '130px') {
        document.documentElement.style.height = '500px'
        document.body.style.height = '500px'
    } else {
        document.documentElement.style.height = '130px'
        document.body.style.height = '130px'
    }
}
