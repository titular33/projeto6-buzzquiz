
/* fazer a conexão com o servidor */
/* checar se existem quizzes seus, se voce não tem nenhum quizz então aplicamos o estado 0, do contrário o estado 1 */
/* estado 0 é a tela onde não temos nenhum quizz nosso */
/* estado 1 é a tela onde temos quizzes nossos */
/* em ambos os estados nós podemos acionar as folhas de criação de quizzes */
/* as folhas são nomeadas como first, second, third e fourthCreationSheet */
/* todos os erros catch foram colocados no final do js */


const URL_API = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes"; /* group tip */
let yourCreatedQuizzes_ids = []; /* stores user-created quiz ids */
let allCreatedQuizzes_data = []; /* stores others users-created quiz data */
let allQuizzes_HTML = "";

getQuizzes()

function getQuizzes() {
    const promisse = axios.get(`${URL_API}`);
    promisse.then(renderHomePage);
    promisse.catch(error1);
}

/* checks which home page will be rendered */
function renderHomePage (response){
    response.data.forEach(elementQuizz => {
        if(checkYourQuizzesAlreadyExists(elementQuizz.data)){
            renderState1(response); /* state 1 is the visualization form ~with~ created quizzes */
        } else {renderState0(response)} /* state 0 is the visualization form ~without~ created quizzes */
    });
}

/* returns true if there are user quizzes, returns false otherwise */
/* stores the quiz data of other users in allCreatedQuizzes_data */
function checkYourQuizzesAlreadyExists(data){
    let yourQuizzesExists = false;
    let i = 0;
    yourCreatedQuizzes_ids.map(elementQuizz => {
        if(elementQuizz.data.id === id){ /* .data.id ou .id ? */ /* no final, armazenar os datas do usuário em yourCreatedQuizzes_ids */
            yourQuizzesExists = true;
        } else {
            allCreatedQuizzes_data[i] = elementQuizz.data;
            i++;
        }
    })
    return yourQuizzesExists;
}

/* os quizzes são separados em duas sections: your-quizzes e all-quizzes */
/* a class wrapper (embrulho) é para formatação no CSS do padrão de contorno apresentado no layout */
/* a class hidden (escondido) permite a aplicação das diferentes telas sem a necessidade de trocar de página */

/* state 0 = home page layout without user quizzes */
function renderState0 (response){
    var teste = response.data
    console.log(teste)
    response.data.forEach(elementQuizz => {
        allQuizzes_HTML += `
        <div class="quizz" onclick="selectQuizz() searchQuiz(${elementQuizz.id})" >
            <img src="${elementQuizz.image}" alt="">
            <h3>${elementQuizz.title}</h3>
        </div>
        `
    })
    const containerScreen0 = document.querySelector(".container-screen0");
    containerScreen0.innerHTML = `
    <section id="your-quizzes" class="wrapper">
        <div id="state0" class="hidden">
            <h4>Você não criou nenhum quizz ainda :(</h4>
            <button onclick="firstCreationSheet()">Criar Quizz</button>
        </div>
    </section>
    `
    /* .appendChild = is an alternative to .innerHTML += */
    containerScreen0.innerHTML += `
    <h1>Todos os Quizzes</h1>
    <section id="all-quizzes" class="wrapper">
        ${allQuizzes_HTML}
    </section>
    `
    /* criar funções selectquizz, searchquizz, firstcreationsheet, renderstate1*/
    /* desabilitar render state 0? limpar listas ao recarregar? checar melhor solução */
    
}

function renderState1 (response){
    /* ... */
}

/* -----------------------------------------------creation sheets----------------------------------------------- */

function firstCreationSheet (){
    const containerScreen0 = document.getElementsByClassName('container-screen0');
    const containerScreen1 = document.getElementsByClassName('container-screen1');
    containerScreen0.classList.add('hidden');
    /* containerScreen2.classList.remove('hidden'); ainda preciso ver se usarei isso */
    containerScreen1.innerHTML = `
    <h2 class="title-section"><strong>Comece pelo começo</strong></h2>
    <form>
        <input class="title-quizz" placeholder="Título do seu quizz"></input>
        <input class="image-quizz" placeholder="URL da imagem do seu quizz"></input>
        <input class="qtt-questions" placeholder="Quantidade de perguntas do Quizz"></input>
        <input class="qtt-levels" placeholder="Quantidade de níveis do Quizz"></input>
    </form>
    <button id="button btn-firstcreationsheet" onclick="validationFirstCreationSheet()">Prosseguir para criar perguntas</button>
    `;
}

function validationFirstCreationSheet (){
    const tittleQuizz = document.querySelector(".tittle-quizz"); /* deve ter no mínimo 20 e no máximo 65 caracteres */
    const imageQuizz = document.querySelector(".image-quizz"); /* deve ter formato de URL */
    const qttQuestions = document.querySelector(".qtt-questions"); /* no mínimo 3 perguntas */
    const qttLevels = document.querySelector(".qtt-levels"); /* no mínimo 2 níveis */
    if (tittleQuizz === '' || imageQuizz === '' || qttQuestions === '' || qttLevels === ''){
        alert("Impossível continuar, campo vazio");
    }
    else if(qttQuestions < 3 || isNaN(qttQuestions) || qttLevels < 2 || isNaN(qttLevels)){
        alert("Quantidade de perguntas ou níveis inválida");
    } 
    else if((tittleQuizz.length < 20 || tittleQuizz.length > 65) || !URLimagemPrincipal.includes("https:") ){
        alert("Título ou URL inválida");
    }
    else {
        secondCreationSheet()
    }
}

function secondCreationSheet (){
    const containerScreen1 = document.getElementsByClassName('container-screen1');
    const containerScreen2 = document.getElementsByClassName('container-screen2');
    containerScreen1.classList.add('hidden');
    containerScreen2.innerHTML = `
    <h2 class="title-section"><strong>Crie suas perguntas</strong></h2>
    `
    let i = 1;
    let j = 0;
    for ( i; i <= qttQuestions.value; i++){
    containerScreen2.innerHTML += `
    <form>
        <h3>Pergunta ${i}</h3>
        <input class="text-ask" id="text-ask${i}" placeholder="Texto da pergunta"></input>
        <input class="background-color-ask" id="background-color-ask${i}" placeholder="Cor de fundo da pergunta"></input>
        <h3>Resposta correta</h3>
        <input class="correct-answer" id="correct-answer${i} placeholder="Resposta correta"></input>
        <input class="correct-URL-img-answer" id="correct-URL-img-answer${i} placeholder="URL da imagem"></input>
        <h3>Respostas incorretas</h3>
        <input class="incorrect-answer" id="incorrect-answer${j++} placeholder="Resposta incorreta 1"></input>
        <input class="incorrect-URL-img-answer" id="incorrect-URL-img-answer${j} placeholder="URL da imagem 1"></input>
        <input class="incorrect-answer" id="incorrect-answer${j++} placeholder="Resposta incorreta 2"></input>
        <input class="incorrect-URL-img-answer" id="incorrect-URL-img-answer${j} placeholder="URL da imagem 2"></input>
        <input class="incorrect-answer" id="incorrect-answer${j++} placeholder="Resposta incorreta 3"></input>
        <input class="incorrect-URL-img-answer" id="incorrect-URL-img-answer${j} placeholder="URL da imagem 3"></input>
    </form>
    `};
    containerScreen2.innerHTML += `
    <button onclick="validationSecondCreationSheet()">Prosseguir para criar perguntas</button>
    `
}

function validationSecondCreationSheet(){
    let textAsk, backgroundColorAsk, correctAnswer, correctURLimgAnswer = [];
    let incorrectAnswer, incorrectURLimgAnswer = [];
    let k = 1;
    let isValideHex = false;
    for (let i = 1; i <= qttQuestions.value; i++){
        textAsk[i] = document.querySelector(`#text-ask${i}`); /* no mínimo 20 caracteres */
        backgroundColorAsk[i] = document.querySelector(`#background-color-ask${i}`); /*  deve ser uma cor em hexadecimal (começar em "#", seguida de 6 caracteres hexadecimais, ou seja, números ou letras de A a F) */
        correctAnswer[i] = document.querySelector(`#correct-answer${i}`); /* não pode estar vazio */
        correctURLimgAnswer[i] = document.querySelector(`#correct-URL-img-answer${i}`); /* deve ter formato de URL */
        for (let j = 1; j <= 3; j++){
        incorrectAnswer[k] = document.querySelector(`#incorrect-answer${k}`); /* É obrigatória a inserção da resposta correta e de pelo menos 1 resposta errada. Portanto, é permitido existirem perguntas com só 2 ou 3 respostas em vez de 4. */
        incorrectURLimgAnswer[k] = document.querySelector(`#incorrect-URL-img-answer${k}`);
        k++;
        }
    }
    for (let i = 1; i <= qttQuestions.value; i++){
        backgroundColorAsk[i] = backgroundColorAsk[i].replace(/[^0-9a-f]/gi, '');
        isValideHex = backgroundColorAsk[i].length === 6 || backgroundColorAsk.length === 3;
        if (!isValideHex || !correctURLimgAnswer[i].includes("https:")){
            alert("Impossível continuar, campo vazio");
        }
        if (textAsk[i] === '' || backgroundColorAsk[i] === '' || correctAnswer[i] === '' || correctURLimgAnswer[i] === ''){
            alert("Impossível continuar, campo vazio");
        }
        if (textAsk[i].length < 20){
            alert("Impossível continuar, campo vazio");
        }
    }
    thirdCreationSheet()
}

function thirdCreationSheet (){
    /* hidden container 2 */
    /* ... */
    validationThirdCreationSheet()
}

function validationThirdCreationSheet (){
    /* ... */
    fourthCreationSheet()
}

function fourthCreationSheet(){
    /* hidden container 3 */
    /* ... */
    doneFouthCreationSheet()
}

function doneFouthCreationSheet(){
    /* hidden container 4 */
    /* chama verificação renderhomepage ou getquizzes? testar */

}


/* -----------------------------------------------errors----------------------------------------------- */

function error1 (error){
    alert("Failed to load server");
    console.log(error.response); /* check this!!!!!!!!!!!! */
}



/* 
const yourQuizzes = document.getElementById("your-quizzes");
const state0 = yourQuizzes.querySelector("#state0");
state0.classList.add("hidden"); hides state 0 and shows the first creation sheet */

/* gagaga */

