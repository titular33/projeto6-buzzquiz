const container = document.querySelector('.container');
const listMyQuizzes = [];


buscarQuizzes()

function buscarQuizzes() {
    const promisse = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v4/buzzquizz/quizzes');
    promisse.then(renderHomePage);
    promisse.catch(errorRenderHomePage);
}

function renderHomePage(answer) {
    const listQuiz = answer.data;

    renderMyQuiz();

    const containerListQuiz = container.querySelector('.list-quizz');
    for (let i = 0; i < listQuiz.length; i++) {
        containerListQuiz.innerHTML += `
            <div class="quizz" onclick="openQuiz(${listQuiz[i].id})">
                <img src="${listQuiz[i].image}" alt="">
                <div class="overlay"</div>
                <p> <strong>${listQuiz[i].title}</strong> </p>
            </div>`;
    }
}
function errorRenderHomePage (){
    alert("Failed to load server");
    console.log(error.response);
    /* num commit futuro eu vou testar se dar um setinterval e chamar novamente a searchquiz funciona */
}
function renderMyQuiz() {
    container.innerHTML =`   
        <div class="my-quizz"></div>        
        <div class="title">
            <strong>Todos os quizzes</strong>
        </div>
        <div class="list-quizz"></div>`;
    const containerMyQuiz = document.querySelector('.my-quizz');
    if(listMyQuizzes.length === 0) {
        containerMyQuiz.innerHTML += 
            `<p>Você não criou nenhum quizz ainda :(</p>
            <button onclick = "renderFirstSection()">Criar Quizz</button>`
;
    } else {
        for (let index = 0; index < listMyQuizzes.length; index++) {
        containerMyQuiz.innerHTML = `
        <div class="quizz" onclick="openQuiz(${listMyQuizzes[index].id})">
            <img src="${listMyQuizzes[index].image}" alt="">
            <div class="overlay"</div>
            <p> <strong>${listMyQuizzes[index].title}</strong> </p>
        </div>
        <button class="botao-adicionar" onclick = "renderFirstSection()">+</button>`; //criar essa classe no js
        }
    }
}


function openQuiz(id) {
    const requisition = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v4/buzzquizz/quizzes/${id}`);

    requisition.then(renderQuiz);
}


function renderQuiz(answer) {

    const quizSelected = answer.data;

    console.log(quizSelected);

      let questions1 = "";

    quizSelected.questions.forEach((quest, indice) => (questions1 += renderQuestion(quest, indice)));;

    container.innerHTML = `
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

function createdQuiz() {

    renderFirstSection();
    container.innerHTML = `
    `;
}


function renderFirstSection() {
    
    container.innerHTML = `
        <h2 class="title-secao"> <strong> Comece pelo começo </strong> </h2>
        
        <form>
            <input class="title-quizz" placeholder="Título do seu quizz"></input>
            <input class="imagem-quizz" placeholder="URL da imagem do seu quizz"></input>
            <input class="qtd-questions1" placeholder="Quantidade de perguntas do Quizz"></input>
            <input class="qtd-level" placeholder="Quantidade de níveis do Quizz"></input>
        </form>
        
        <button class="buttonCreation" onclick= "validation()">Prosseguir para criar perguntas</button>
        `;
}