const ably = new Ably.Realtime('1J1JrA.0vWXTg:bSj24qsYkxhGzVF0SIL2iAqbzFIYfYQC-rRjk-wqgnc');
ably.connection.on("connected", ()=>{
    console.log("Ably connected");
});
const channel = ably.channels.get('quickstart');

var img = new Image();
img.src = "box.jpg";

// window.addEventListener("click", ()=>{
//     channel.publish("click", "h");
// });

// channel.subscribe("click", ()=>{
//     console.log("hi")
// })

var userName = document.getElementById("userName");
var pass = document.getElementById("pass");

document.getElementById("login").onclick = () =>{
    channel.publish("click", { userName : userName.value, pass : pass.value });
}

channel.subscribe("click", (data)=>{
    console.log(data.data)
});



