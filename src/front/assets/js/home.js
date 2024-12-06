const token = localStorage.getItem('token');
const body = document.getElementsByTagName("body")[0];

if(token) {
    body.innerHTML = "<greenmind-header>perfil</greenmind-header>" + body.innerHTML;
}
else {
    body.innerHTML = "<greenmind-header></greenmind-header>" + body.innerHTML;
}