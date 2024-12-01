// URL depende se as rotas vão ser pelo express ou diretamente pelos arquivos (usando live server)
const backURL = "http://localhost:3000/api/login";

let email = document.querySelector("#email");
let senha = document.querySelector("#senha");
let sendBtn = document.querySelector("#enviar");
let resposta = document.querySelector("#resposta");

sendBtn.addEventListener("click", (e) => {
    e.preventDefault();
    resposta.style = "color: red";
    if(!email.value || !senha.value) {
        resposta.textContent = "Preencha todos os campos antes de continuar!";
        return;
    }
    fetch(backURL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email.value || null,
            senha: senha.value
        })
    }).then((res) => {
        return res.json();
    }).then((dados) => {
        console.log(dados);
        if(dados.success) {
            resposta.style = "color: green";
        }
        resposta.innerHTML = dados.mensagem;
    })
});