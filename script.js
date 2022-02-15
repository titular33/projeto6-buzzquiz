const listMyQuiz = [];

searchQuiz();

function searchQuiz (){
    const promisse = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes');
    promisse.then(renderHomePage);
    promisse.catch(errorRenderHomePage);
}

function renderHomePage(){
    const listQuiz = response.data;
    const containerListQuiz = container.querySelector('.list-quiz');
    for (let i = 0; i < listaQuiz.lenght; i++)
    { 
     containerListQuiz.innerHTML +=`
      <div class = "quiz" onClick="functionToBeCreated(${listQuiz[i].id})">
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
    if(listaQuiz.length === 0) {
        containerMyQuiz.innerHTML += 
            `<p>Você não criou nenhum quizz ainda :(</p>
            <button onclick = "#">Criar Quizz</button>`
;
    } else {
        for (let index = 0; index < listaQuiz.length; index++) {
        containerMyQuiz.innerHTML = `
        <div class="quiz" onclick="functionToBeCrated(${listaMeusQuizzes[index].id})">
            <img src="${listaMyQuiz[index].image}" alt="">
            <div class="overlay"</div>
            <p> <strong>${listaMyQuiz[index].title}</strong> </p>
        </div>
        <button class="button-add" onclick = "#">+</button>`; 
        }
    }
}

function errorRenderHomePage (){
    alert("Failed to load server");
    console.log(error.response);
    /* num commit futuro eu vou testar se dar um setinterval e chamar novamente a searchquiz funciona */
}