const socket = new WebSocket("ws://localhost:5050");
let element = document.getElementById("message");
socket.onmessage = ({data}) => {
  element.innerHTML = data;
};

let button=document.getElementById('button')
button.addEventListener('click',()=>{
    const text=document.getElementById('inputfield').value
    socket.send(text)
})

