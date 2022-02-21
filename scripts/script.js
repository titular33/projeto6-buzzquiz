
const URL_API = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes"; /* group tip */
let yourCreatedQuizzes_ids = []; /* stores user-created quiz ids */
let allCreatedQuizzes_data = []; /* stores others users-created quiz data */
let allQuizzes_HTML = "";
let allCreatedQuizzes_ids = [];

getQuizzes()

function getQuizzes() {
    const promisse = axios.get(`${URL_API}`);
    promisse.then(renderHomePage);
    promisse.catch(error1);
}

/* checks which home page will be rendered */
function renderHomePage (response){
    let yourQuizzCheck = false;
    response.data.forEach(elementQuizz => {
        if(checkYourQuizzesAlreadyExists(elementQuizz.data)){
            yourQuizzCheck = true; 
        } else {yourQuizzCheck = false} 
    }); 
    if (yourQuizzCheck) {renderState1(response)} /* state 1 is the visualization form ~with~ created quizzes */
    else {renderState0(response)} /* state 0 is the visualization form ~without~ created quizzes */
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
    let i = 0;
    response.data.forEach(elementQuizz => {
        if (!allCreatedQuizzes_ids.includes[elementQuizz.id]){
            allQuizzes_HTML += `
            <div class="quizz" onclick="selectQuizz(${elementQuizz.id}) searchQuiz(${elementQuizz.id})" >
                <img src="${elementQuizz.image}" alt="">
                <h3>${elementQuizz.title}</h3>
            </div>
            `
            allCreatedQuizzes_ids[i] = elementQuizz.id;
            i++
        } else {}
    })
    const containerScreen0 = document.querySelector(".container-screen0");
    containerScreen0.innerHTML = `
    <section id="your-quizzes" class="wrapper">
        <div id="state0">
            <h4>Você não criou nenhum quizz ainda :(</h4>
            <button type="button" onclick="firstCreationSheet()">Criar Quizz</button>
        </div>
    </section>
    `
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

function selectQuizz(id){
    const requisition = axios.get(`${URL_API}/${id}`);

    requisition.then(renderQuiz);
}

function renderQuiz(answer) {

    const quizSelected = answer.data;


      let questions1 = "";

    quizSelected.forEach((quest, indice) => (questions1 += renderQuestion(quest, indice)));

    main.innerHTML = `
    <div class="banner">
      <img src="${quizSelected.image}">
      <div class="title">${quizSelected.title}</div>
    </div>
    // <div class="questions1">
        ${questions1}
    </div>
    <div class="level"></div>
    `
}

function renderQuestion(quest, indice) {

    let answers1 = "";

    quest.answers.forEach( (answer) => { answers1 += renderAnswers(answer, indice) });
    
    return (`
    <div class="quest quest-${indice}">
        <div class="title" style="background-color:${quest.color}">
        ${quest.title}
        </div>
        <div class="answers1">
        ${answers1}
        </div>
    </div>
    `)
}
function renderAnswers(answer, indice) {
    
}
/* -----------------------------------------------creation sheets----------------------------------------------- */

function firstCreationSheet (){
    const containerScreen0 = document.querySelector('.container-screen0');
    const containerScreen1 = document.querySelector('.container-screen1');
    let teste = "oi"
    console.log(teste)
    /containerScreen0.classList.add('hidden');
    /* containerScreen2.classList.remove('hidden'); ainda preciso ver se usarei isso */
    containerScreen1.innerHTML += `
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
    const titleQuizz = document.querySelector(".title-quizz"); /* deve ter no mínimo 20 e no máximo 65 caracteres */
    const imageQuizz = document.querySelector(".image-quizz"); /* deve ter formato de URL */
    const qttQuestions = document.querySelector(".qtt-questions"); /* no mínimo 3 perguntas */
    const qttLevels = document.querySelector(".qtt-levels"); /* no mínimo 2 níveis */
    if (titleQuizz.value === '' || imageQuizz.value === '' || qttQuestions.value === '' || qttLevels.value === ''){
        alert("Impossível continuar, campo vazio");
    }
    else if(qttQuestions.value < 3 || isNaN(qttQuestions.value) || qttLevels.value < 2 || isNaN(qttLevels.value)){
        alert("Quantidade de perguntas ou níveis inválida");
    } 
    else if((titleQuizz.value.length < 20 || titleQuizz.value.length > 65) || !URLimagemPrincipal.value.includes("https:") ){
        alert("Título ou URL inválida");
    }
    else {
        secondCreationSheet(titleQuizz, imageQuizz, qttQuestions, qttLevels)
    }
}

function secondCreationSheet (titleQuizz, imageQuizz, qttQuestions, qttLevels){
    const containerScreen1 = document.querySelector('.container-screen1');
    const containerScreen2 = document.querySelector('.container-screen2');
    containerScreen1.classList.add('hidden');
    containerScreen2.innerHTML = `
    <h2 class="title-section"><strong>Crie suas perguntas</strong></h2>
    `
    let j = 0;
    for ( let i = 1; i <= qttQuestions.value; i++){
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
    <button onclick="validationSecondCreationSheet(titleQuizz, imageQuizz, qttQuestions, qttLevels)">Prosseguir para criar perguntas</button>
    `
}

function validationSecondCreationSheet(titleQuizz, imageQuizz, qttQuestions, qttLevels){
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
        backgroundColorAsk[i].value = backgroundColorAsk[i].value.replace(/[^0-9a-f]/gi, '');
        isValideHex = backgroundColorAsk[i].value.length === 6 || backgroundColorAsk.value.length === 3;
        if (!isValideHex || !correctURLimgAnswer[i].value.includes("https:")){
            alert("Impossível continuar, url ou valor de cor hexadecimal errados");
        }
        else if (textAsk[i].value === '' || backgroundColorAsk[i].value === '' || correctAnswer[i].value === '' || correctURLimgAnswer[i].value === ''){
            alert("Impossível continuar, campo vazio");
        }
        else if (textAsk[i].value.length < 20){
            alert("Impossível continuar, pergunta com menos de 20 caracteres");
        }
        else thirdCreationSheet(titleQuizz, imageQuizz, qttQuestions, qttLevels)
    }
}

function thirdCreationSheet (titleQuizz, imageQuizz, qttQuestions, qttLevels){
    const containerScreen2 = document.querySelector('.container-screen2');
    const containerScreen3 = document.querySelector('.container-screen3');
    containerScreen2.classList.add('hidden');
    containerScreen3.innerHTML = `
    <h2 class="title-section"><strong>Agora, decida os níveis</strong></h2>
    `
    for ( let i = 1; i <= qttLevels.value; i++){
    containerScreen3.innerHTML +=`
        <form>
        <h3>Nível ${i}</h3>
            <input class="title-level" id="title-level${i}" placeholder="Título do nível"></input>
            <input class="min-rate-level" id="min-rate-level${i}" placeholder="% de acerto mínima"></input>
            <input class="URL-img-level" id="URL-img-level${i} placeholder="URL da imagem do nível"></input>
            <input class="description-level" id="description-level${i} placeholder="Descrição do nível"></input>
        </form>
    `}
    containerScreen3.innerHTML += `
    <button onclick="validationThirdCreationSheet(titleQuizz, imageQuizz, qttQuestions, qttLevels)">Finalizar Quizz</button>
    `
}

function validationThirdCreationSheet (titleQuizz, imageQuizz, qttQuestions, qttLevels){
    /* ... */
    fourthCreationSheet(titleQuizz, imageQuizz, qttQuestions, qttLevels)
}

function fourthCreationSheet(titleQuizz, imageQuizz, qttQuestions, qttLevels){
    const containerScreen3 = document.querySelector('.container-screen3');
    const containerScreen4 = document.querySelector('.container-screen4');
    containerScreen3.classList.add('hidden');
    containerScreen4.innerHTML = `
    <h2 class="title-section"><strong>Seu quizz está pronto!</strong></h2>
    <div class="your-created-quizz">
        <img src="${imageQuizz.value}" alt="">
        <h3>${titleQuizz.value}</h3>
    </div>
    <button onclick="acessCreatedQuizz()">Acessar Quizz</button>
    <button onclick="renderHomePage()">Voltar pra home</button>
    `
    const promisse = axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")
    promisse.then(sendQuizz);
}

/* -----------------------------------------------errors----------------------------------------------- */

function error1 (error){
    alert("Failed to load server");
    console.log(error.response);
}

