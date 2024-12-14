const user = document.querySelector("#user");
const token = localStorage.getItem("token");
const backURL = "https://backend-greenmind-degdgcebgvesfua9.brazilsouth-01.azurewebsites.net/api/user";

const logoutBtn = document.querySelector("#logout-btn");

const nomeInput = document.querySelector("#nome-input");
const nomeBtn = document.querySelector("#nome-btn");
const emailInput = document.querySelector("#email-input");
const emailBtn = document.querySelector("#email-btn");
const senhaInput = document.querySelector("#senha-input");
const senhaBtn = document.querySelector("#senha-btn");

const divUsuarios = document.querySelector("#div-usuarios");

logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "../../index.html";
});

nomeBtn.addEventListener("click", () => {
    nomeInput.style = "border: 1px solid light-dark";
    if(nomeInput.value.length < 3) {
        nomeInput.style = "border: 1px solid red";
        alert("Nome inválido, o nome deve conter no mínimo 3 caracteres.");
        return;
    }

    fetch(backURL+"/changeusername", {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: nomeInput.value,
            token: localStorage.getItem("token")
        })
    }).then((res) => {
        return res.json();
    }).then((result) => {
        console.log(result);
        if(result.success) {
            alert("Nome trocado com sucesso");
        }
        else {
            alert("Erro");
            console.log(result.mensagem);
            console.log(result);
        }
    })
});

emailBtn.addEventListener("click", () => {
    emailInput.style = "border: 1px solid light-dark";
    if(!emailInput.value.includes("@") || emailInput.value.length < 3) {
        alert("Email inválido, o email deve conter no mínimo 3 caracteres sendo um deles o '@'.");
        emailInput.style = "border: 1px solid red";
        return;
    }

    fetch(backURL+"/changeemail", {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: emailInput.value,
            token: localStorage.getItem("token")
        })
    }).then((res) => {
        return res.json();
    }).then((result) => {
        console.log(result);
        if(result.success) {
            alert("Email trocado com sucesso");
        }
        else {
            alert("Erro");
            console.log(result.mensagem);
            console.log(result);
        }
    })
});

senhaBtn.addEventListener("click", () => {
    senhaInput.style = "border: 1px solid light-dark";
    if(senhaInput.value.length < 3) {
        senhaInput.style = "border: 1px solid red";
        alert("Senha inválida, a senha deve conter no mínimo 3 caracteres.");
        return;
    }

    fetch(backURL+"/changepassword", {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            senha: senhaInput.value,
            token: localStorage.getItem("token")
        })
    }).then((res) => {
        return res.json();
    }).then((result) => {
        console.log(result);
        if(result.success) {
            alert("Senha trocada com sucesso");
        }
        else {
            alert("Erro");
            console.log(result.mensagem);
            console.log(result);
        }
    })
});

function mostrarUsuarios(usuarios) {
    for(let i = 0; i < usuarios.length; i++) {
        let elemento = document.createElement('div');
        elemento.classList.add("usuario");
        elemento.innerHTML = `<div class="usuario">
                                <h3 class="nome-usuario">${usuarios[i].nome}</h3>
                                <p>${usuarios[i].email}</p>
                                <p>${usuarios[i].data_cadastro}</p>
                                <p>${usuarios[i].tipo_usuario}</p>
                                <button>Excluir usuário</button>
                              </div>`
        divUsuarios.appendChild(elemento);
    }
}

function getUsuarios() {
    document.getElementsByClassName("opcoes-admin")[0].style = "display: grid;";

    fetch(backURL+"/all", {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then((res) => {
        return res.json();
    }).then((result) => {
        if(result.success) {
            console.log(result);
            mostrarUsuarios(result.dados);
        }
        console.log(result.mensagem);
    })
}

if(token) {
    fetch(backURL, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then((res) => {
        return res.json();
    }).then((result) => {
        console.log(result);
        if(result.success) {
            user.innerText = result.dados[0].nome;
            if(result.dados[0].tipo_usuario == "admin") {
                getUsuarios();
            }
        }
        console.log(result.mensagem);
    })
}
else {
    window.location.href = "../../index.html";
}