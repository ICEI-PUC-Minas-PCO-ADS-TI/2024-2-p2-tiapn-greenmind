// function confirmar_1(){
    //     const resposta_form_1 = document.querySelector('input[name="resposta_form_1"]:checked');
    //     if (resposta_form_1 === null){
        //         var erro = document.getElementById("mensagem_erro1");
        //         erro.style.display = "block"
        //         return;
        //     }
        //     if (resposta_form_1.value === "n"){
//         form.submit();
//         return;
//     }
//     form_1.style.display = "none";
//     form_2.style.display = "block";
//     calculo_barra(2);
// }

// function confirmar_2(){
    //     const resposta_form_2 = document.querySelector('input[name="resposta_form_2"]:checked');
    //     if (resposta_form_2 === null){
        //         var erro = document.getElementById("mensagem_erro2");
        //         erro.style.display = "block"
        //         return;
        //     }
        //     if (resposta_form_2.value === "n"){
            //         form.bairro.value = "n mora"
            //         form.submit();
            //         return;
            //     }
            //     form_2.style.display = "none";
            //     form_3.style.display = "block";
            //     calculo_barra(3);
            // }
            
const form = document.getElementById("formulario_variaveis");
const form_1 = document.getElementById("form_1_id");
const form_2 = document.getElementById("form_2_id");
const form_3 = document.getElementById("form_3_id");
const barra_resultado = document.getElementById("barra_resultado");

calculo_barra(1);
function sair() // botão: não quero contribuir
{
    form.submit();
    return
}

function confirmar_1() // botão: sim, quero contribuir
{
    form_1.style.display = "none";
    form_2.style.display = "block";
    calculo_barra(2);
}

function n_mora() // botão: não moro em volta redonda
{
    form.bairro.value = "n mora"
    form.submit();
    return;
}

function confirmar_2() // botão: moro em volta redonda e quero contribuir
{
    form_2.style.display = "none";
    form_3.style.display = "block";
    calculo_barra(3);
    return
}


function confirmar_3(){ // botão final
    const csn_checkbox = document.getElementById("csn");
    if (csn_checkbox.checked){
        form.unidade.value = "n trabalha";
    }else{
        const departamento_selecionado = document.getElementById("departamentos");
        form.unidade.value = departamento_selecionado.value;
    }
    const bairro_selecionado = document.getElementById("bairro_dropdown_id");
    form.bairro.value = bairro_selecionado.value;
    form.submit();
}

// realiza a pesquisa
$(document).ready(function() 
{
    $('.select2').select2();
});

// Calculo da barra
function calculo_barra(numero){
    barra_resultado.style.width = (((numero)/3)*100)+"%";
}

