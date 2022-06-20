const nome = document.getElementById("nome");
const cpf = document.getElementById("cpf");
const rg = document.getElementById("rg");
const cns = document.getElementById("cns");
const dataNasc = document.getElementById("dataNasc");
const sintomas = document.getElementById("sintomas");
const tempoSintomas = document.getElementById("tempoSintomas");
const meioContaminacao = document.getElementById("meioContamincao");
const tratamento = document.getElementById("tratamento");
const duracaoTratamento = document.getElementById("duracaoTratamento");
const medicoResponsavel = document.getElementById("medicoResponsavel");
let prontuario = 0;

const emTratamento = document.getElementById("emTratamento");
const emObservacao = document.getElementById("emObservacao");
const pacienteCurado = document.getElementById("curados");

const paciente = [];
const pacienteEmObservacao = [];
const curado = [];
var dataFinal = [];

function adicionarPacinteContaminado() {
    if (verificarVazio() === 11) {
        let nomeOBJ = nome.value;
        let cpfOBJ = cpf.value;
        let rgOBJ = rg.value;
        let cnsOBJ = cns.value;
        let dataNascOBJ = dataNasc.value;
        let sintomasOBJ = sintomas.value;
        let tempoSintomasOBJ = tempoSintomas.value;
        let meioContaminacaoOBJ = meioContaminacao.value;
        let tratamentoOBJ = tratamento.value;
        let duracaoTratamentoOBJ = duracaoTratamento.value;
        let medicoResponsavelOBJ = medicoResponsavel.value;
        let idade = separarDataNasc(dataNasc.value);

        let objetoPaciente = {
            nome: nomeOBJ,
            cpf: cpfOBJ,
            rg: rgOBJ,
            cns: cnsOBJ,
            "data de nascimento": dataNascOBJ,
            idade: idade,
            sintomas: sintomasOBJ,
            "tempo de manifestação dos sintomas": tempoSintomasOBJ,
            "meio de contaminação": meioContaminacaoOBJ,
            tratamento: tratamentoOBJ,
            "duração do tratamento": duracaoTratamentoOBJ,
            "medico responsavel": medicoResponsavelOBJ,
            "numero de prontuario": prontuario,
        };
        prontuario++;
        paciente.push(objetoPaciente);
        atualizar();
        setTimeout(limpar(), 1000 * 1.5);
        verificacaoVazio = 0;
    }
}

function atualizar() {
    emTratamento.innerHTML = " ";

    paciente.forEach((paciente, i) => {
        let html = `
        <li>
        <input type="radio" id="tab${i}" class="rd_tab" name="tabs" >
        <label for="tab${i}" class="tab_label">Prontuário: <i>${paciente.nome}</i> <div class="grupoBotao">
            <button class = "botaoMudar" onclick="colocarEmObservacao(${i})" class="btn btn1">
                Colocar em observação
            </button></div>   
        </label>
        <div class="tab-content">

            <h2>${paciente.nome}</h2>
            <article>
                <b> Nome: </b>${paciente.nome} <br> <hr>
                <b> CPF: </b>${paciente.cpf} <br> <hr>
                <b> RG: </b>${paciente.rg} <br> <hr>
                <b> CNS: </b>${paciente.cns} <br> <hr>
                <b> Data de nacimento: </b> ${paciente["data de nascimento"]}<br> <hr>
                <b> Idade: </b>${paciente.idade} <br> <hr>
                <b> Sintomas: </b> ${paciente.sintomas}<br> <hr>
                <b> Tempo de manifestação dos sintomas: </b>${paciente["tempo de manifestação dos sintomas"]} <br> <hr>
                <b> Meio de contaminação: </b>${paciente["meio de contaminação"]} <br> <hr>
                <b> Tempo de tratamento: </b> ${paciente["duração do tratamento"]}<br> <hr>
                <b> Medico responsavel: </b>${paciente["medico responsavel"]} <br> <hr>
                <b> Número de prontuario: </b>${paciente["numero de prontuario"]} 
            </article>
        </div>
        </li>
        `;
        emTratamento.innerHTML += html;
    });

    emObservacao.innerHTML = "";

    pacienteEmObservacao.forEach((paciente, i) => {
        let html = `
        <li>
        <input type="radio" id="tabs${i * -1}" class="rd_tab" name="tabs">
        <label for="tabs${i * -1}" class="tab_label">Prontuário: <i>${paciente.nome}</i>  <div class="grupoBotao">
            <button class = "botaoMudar" onclick="voltarTratamento(${i * -1})" class="btn btn1">
            voltar para tratamento
            </button>  
            <button class = "botaoMudar" onclick="colocarCurado(${i * -1})" class="btn btn1">
                paciente curado
            </button></div>  
        </label>
        <div class="tab-content">
            <h2>${paciente.nome}</h2>
            <article>
                <b> Nome: </b>${paciente.nome} <br> <hr>
                <b> CPF: </b>${paciente.cpf} <br> <hr>
                <b> RG: </b>${paciente.rg} <br> <hr>
                <b> CNS: </b>${paciente.cns} <br> <hr>
                <b> Data de nacimento: </b> ${paciente["data de nascimento"]}<br> <hr>
                <b> Idade: </b>${paciente.idade} <br> <hr>
                <b> Sintomas: </b> ${paciente.sintomas}<br> <hr>
                <b> Tempo de manifestação dos sintomas: </b>${paciente["tempo de manifestação dos sintomas"]} <br> <hr>
                <b> Meio de contaminação: </b>${paciente["meio de contaminação"]} <br> <hr>
                <b> Tempo de tratamento: </b> ${paciente["duração do tratamento"]}<br> <hr>
                <b> Medico responsavel: </b>${paciente["medico responsavel"]} <br> <hr>
                <b> Número de prontuario: </b>${paciente["numero de prontuario"]} 
            </article>
        </div>
        </li>
        `;
        emObservacao.innerHTML += html;
    });

    pacienteCurado.innerHTML = "";

    curado.forEach((paciente, i) => {
        let html = `
        <li>
        <input type="radio" id="tabsc${i}" class="rd_tab" name="tabs" >
        <label for="tabsc${i}" class="tab_label">Prontuário: <i>${paciente.nome}</i> </label>
        <div class="tab-content">
            <h2>${paciente.nome}</h2>
            <article>
                <b> Nome: </b>${paciente.nome} <br> <hr>
                <b> CPF: </b>${paciente.cpf} <br> <hr>
                <b> RG: </b>${paciente.rg} <br> <hr>
                <b> CNS: </b>${paciente.cns} <br> <hr>
                <b> Data de nacimento: </b> ${paciente["data de nascimento"]}<br> <hr>
                <b> Idade: </b>${paciente.idade} <br> <hr>
                <b> Sintomas: </b> ${paciente.sintomas}<br> <hr>
                <b> Tempo de manifestação dos sintomas: </b>${paciente["tempo de manifestação dos sintomas"]} <br> <hr>
                <b> Meio de contaminação: </b>${paciente["meio de contaminação"]} <br> <hr>
                <b> Tempo de tratamento: </b> ${paciente["duração do tratamento"]}<br> <hr>
                <b> Medico responsavel: </b>${paciente["medico responsavel"]} <br> <hr>
                <b> Número de prontuario: </b>${paciente["numero de prontuario"]} 
            </article>
        </div>
        </li>
        `;
        pacienteCurado.innerHTML += html;
    });
}

function colocarEmObservacao(i) {
    pacienteEmObservacao.push(paciente.splice(i, 1)[0]);
    atualizar();
}

function voltarTratamento(i) {
    paciente.push(pacienteEmObservacao.splice(i, 1)[0]);
    atualizar();
}

function colocarCurado(i) {
    curado.push(pacienteEmObservacao.splice(i, 1)[0]);
    atualizar();
}

const input = document.querySelectorAll("input");

function limpar() {
    toggle();
    for (let i = 0; i < 11; i++) {
        input[i].value = "";
    }
}

function separarDataNasc(dataNasc) {
    let Nasc = dataNasc;
    data = Nasc.split("-");
    console.log(data);
    let tamanho = data.length;
    let a = tamanho - 1;
    console.log(tamanho);
    for (let i = 0; i < tamanho; i++) {
        dataFinal[i] = data[a];
        a--;
    }

    return calcularIdade(dataFinal[0], dataFinal[1], dataFinal[2]);
}

function calcularIdade(dia_aniversario, mes_aniversario, ano_aniversario) {
    var d = new Date(),
        ano_atual = d.getFullYear(),
        mes_atual = d.getMonth() + 1,
        dia_atual = d.getDate(),
        ano_aniversario = +ano_aniversario,
        mes_aniversario = +mes_aniversario,
        dia_aniversario = +dia_aniversario,
        quantos_anos = ano_atual - ano_aniversario;

    if (
        mes_atual < mes_aniversario ||
        (mes_atual == mes_aniversario && dia_atual < dia_aniversario)
    ) {
        quantos_anos--;
    }

    return quantos_anos < 0 ? 0 : quantos_anos;
}

const main = document.querySelector("main");

function toggle() {
    const ficha = document.getElementById("fichaCadastro");
    ficha.classList.toggle("ativar");
    main.classList.toggle("blur");
}

const span = document.querySelectorAll("span");
const vazio = "Campo vazio";
var verificacaoVazio = 0;
function verificarVazio() {
    verificacaoVazio = 0
    for (let i = 0; i < 11; i++) {
        if (input[i].value === "") {
            input[i].classList.add("erro");

        } else {
            verificacaoVazio++;
            input[i].classList.remove("erro");
        }
    }
    return verificacaoVazio;
}