// URL depende se as rotas vão ser pelo express ou diretamente pelos arquivos (usando live server)
const backURL = "http://localhost:3000/api/cadastro";

let nome = document.querySelector("#nome");
let email = document.querySelector("#email");
let senha = document.querySelector("#senha");
let sendBtn = document.querySelector("#enviar");
let resposta = document.querySelector("#resposta");

sendBtn.addEventListener("click", (e) => {
    e.preventDefault();
    
    resposta.style = "color: red";

    nome.style = "border: none";
    email.style = "border: none";
    senha.style = "border: none";
    resposta.style = "color: red";

    if(nome.value.length < 3) {
        nome.style = "border: 1px solid red";
        resposta.textContent = "Nome inválido, o nome deve conter no mínimo 3 caracteres.";
        return;
    }
    if(!email.value.includes("@") || email.value.length < 3) {
        resposta.textContent = "Email inválido, o email deve conter no mínimo 3 caracteres sendo um deles o '@'.";
        email.style = "border: 1px solid red";
        console.log("email válido!");
        return;
    }
    if(senha.value.length < 3) {
        senha.style = "border: 1px solid red";
        resposta.textContent = "Senha inválida, a senha deve conter no mínimo 3 caracteres.";
        return;
    }

    fetch(backURL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            usuario: nome.value,
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