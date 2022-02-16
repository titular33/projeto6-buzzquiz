const container = document.querySelector('.container');
const listMyQuiz = [];
const listQuiz = [];
searchQuiz()

function searchQuiz (){
    const promisse = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes');
    promisse.then(renderHomePage);
    promisse.catch(errorRenderHomePage);
}

function renderHomePage(response){
    const listQuiz = response.data;
    const containerListQuiz = container.querySelector('.list-quiz');
    renderMyQuiz();
    for (let i = 0; i < listaQuiz.lenght; i++)
    { 
     containerListQuiz.innerHTML +=`
      <div class = "quiz" onClick="openQuiz(${listQuiz[i].id})">
      <img src="${listQuiz[i].image}" alt="">

          <p>$"${listQuiz[i].title}" </p>
          </div> `
    }

}
function renderMyQuiz() {
    container.innerHTML =`   
        <div class="my-quiz"></div>        
        <div class="title">
            <strong>Todos os quizzes</strong>
        </div>
        <div class="list-quiz"></div>`;
    const containerMyQuiz = document.querySelector('.my-quiz');
    if(listQuiz.length === 0) {
        containerMyQuiz.innerHTML += 
            `<p>Você não criou nenhum quizz ainda :(</p>
            <button>Criar Quizz</button>`
;
    } else {
        for (let index = 0; index < listQuiz.length; index++) {
        containerMyQuiz.innerHTML = `
        <div class="quiz" onclick="openQuiz(${listMyQuiz[index].id})">
            <img src="${listMyQuiz[index].image}" alt="">
            <div class="overlay"</div>
            <p> <strong>${listMyQuiz[index].title}</strong> </p>
        </div>
        <button class="button"> + </button>`; 
        }
    }
}

function errorRenderHomePage (){
    alert("Failed to load server");
    console.log(error.response);
    /* num commit futuro eu vou testar se dar um setinterval e chamar novamente a searchquiz funciona */
}
function openQuiz(id) {
    const requisition = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`);

    requisition.then(render);
}


function render(response) {

    const quizSelected = response.data;

    console.log(quizSelected);
    let questions = "";

    quizSelected.questions.forEach((question, indice) => (questions += renderQuestion(question, indice)));;

    container.innerHTML = `
    <div class="banner">
      <img src="${quizSelected.image}">
      <div class="title">${quizSelected.title}</div>
    </div>
    // <div class="question">
        ${questions}
    </div>
    <div class="level"></div>
    `
}
function renderQuestion(question, indice) {

    let answers = "";

    question.answers.forEach( (response) => { answers += renderizarAnswers(response, indice) });
    
    return (`
    <div class="question question-${indice}">
        <div class="title" style="background-color:${question.color}">
        ${question.title}
        </div>
        <div class="answers">
        ${answers}
        </div>
    </div>
    `)
}
function createdQuiz() {

    renderFirstSection();
    container.innerHTML = ``;
}


function renderFirstSection() {
    
    container.innerHTML = `
        <h2 class="title-section"> <strong> Comece pelo começo </strong> </h2>
        
        <form>
            <input class="title-quiz" placeholder="Título do seu quizz"></input>
            <input class="image-quiz" placeholder="URL da imagem do seu quizz"></input>
            <input class="qtd-questions" placeholder="Quantidade de perguntas do Quizz"></input>
            <input class="qtd-levels" placeholder="Quantidade de níveis do Quizz"></input>
        </form>
        
        <button>Prosseguir para criar perguntas</button>
        `;
}

