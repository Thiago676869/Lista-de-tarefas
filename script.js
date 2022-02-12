

// Referenciando o input atraves do name tarefa
let input = document.querySelector('input[name=tarefa]');


// Referenciando o botão pelo id
let btn = document.querySelector('#botao');


// Referenciando a lista pelo id
let lista = document.querySelector('#lista')


// Card
let card = document.querySelector('.card'); //recupera os card que são os pais dos spans

/*JS acessa o banco de dados(localStorage) e procura pelo banco de dados "tarefas" e cria um array
caso nao existe esse banco de dados crie um array vazio*/
let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

//Função para renderizar a pagina quando houver mudança em tarefas
function renderizarTarefas(){
    // limpar a listagem de itens antes de renderizar novamente a tela
    lista.innerHTML = '';
    for(tarefa of tarefas){
    //Criar o item da lista
    let itemLista = document.createElement('li');

    //Adicionar classes no item da lista
    itemLista.setAttribute('class', 'list-group-item list-group-item-action');
    
    //Adiciona evento de clique no item da lista
    itemLista.onclick = function(){
        deletarTarefa(this);
    }
    //Criar  um texto node(filho da lista)
    let itemTexto = document.createTextNode(tarefa);

    //Adicionar o texto no item da lista
    itemLista.appendChild(itemTexto);

    //Adicionar o item da lista na lista
    lista.appendChild(itemLista);
    }
}

// Executando a função para renderizar a lista 
renderizarTarefas();




//1)"Escutando" o evento de clique no botão
btn.onclick = function(){
    //2)capturando o valor digitado pelo usuario no input
    let novaTarefa = input.value;

    if (novaTarefa !==""){//se valor digitado for vazio
    //3)atualizando a nova tarefa na lista (array) de tarefas e renderizando a tela
    tarefas.push(novaTarefa);

    //Executando novamente função para renderizar as tarefas
    renderizarTarefas();

    //Limpar o input
    input.value = '';

    //limpar mensagens de erro (spans)
    removerSpans();

    //Salva os novos dados no banco de dados storage
    salvarDadosNoStorage();
    }else{
        //limpar mensagens de erro (spans)
        removerSpans();
        
        let span = document.createElement('span');//cria um documento span
        span.setAttribute('class', 'alert alert-warning');//class do bootstrap

        let msg = document.createTextNode('Você precisa informar a tarefa!');

        span.appendChild(msg); //adiciona como filho a mensagem

        card.appendChild(span);
    }
    
}



function removerSpans(){
    let spans = document.querySelectorAll('span');//busca todos span
    for(let i = 0; i < spans.length; i++){
        card.removeChild(spans[i]);
    //Salva os novos dados no banco de dados storage
    salvarDadosNoStorage();     
    }
}

function deletarTarefa(tar){
    //remove a tarefa do array
    tarefas.splice(tarefas.indexOf(tar.textContent), 1);// remove o texto do array, apenas um.
    //renderiza novamente a tela
    renderizarTarefas();
    //Salva os novos dados no banco de dados storage
    salvarDadosNoStorage();
}


function salvarDadosNoStorage(){
    //todo navegador web possui esta capacidade
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}


