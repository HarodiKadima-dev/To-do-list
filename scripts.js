// Captura os elementos do HTML
const input = document.getElementById('addTarefa');
const addButton = document.getElementById('addButton');
const buttonTodos = document.getElementById('todas');
const buttonPendentes = document.getElementById('pendentes');
const buttonConcluidas = document.getElementById('concluidas');
const listaTarefas = document.getElementById('mostrarTarefa');
const pesquisar = document.getElementById("pesquisar");

// Recupera as tarefas salvas no localStorage.
// Se não existir nenhuma, cria um array vazio.
const tarefas = JSON.parse(localStorage.getItem('minhasTarefas')) || [];

// Função responsável por criar uma tarefa na tela
function criarTarefa(tarefa){
  

  // Cria um item da lista (<li>)
  const li = document.createElement("li");

  // Cria o elemento que exibirá o texto da tarefa
  const span = document.createElement('span');

  // Define o texto da tarefa
  span.textContent = tarefa.texto;

  // Guarda o texto atual para facilitar edição e remoção
  const idAtual = tarefa.id;

  if (tarefa.concluida) {
  span.classList.add('completed');
}
  // Marca ou desmarca a tarefa como concluída
  span.addEventListener('click', () => {
    span.classList.toggle('completed');
     const indice = tarefas.findIndex(t=>
    t.id===idAtual
    );
    
    tarefas[indice].concluida=!tarefas[indice].concluida;
    
    //atualizar a tarefa
    localStorage.setItem('minhasTarefas', JSON.stringify(tarefas));
  });
  
  //mostrar data 
  const small = document.createElement("small");
  small.textContent= `Criada em: ${tarefa.createdAt}`;

  // Cria o botão de editar
  const editarBtn = document.createElement('button');
  editarBtn.textContent = "Editar";
  editarBtn.classList.add('editar');

  // Evento responsável por editar a tarefa
  editarBtn.addEventListener('click', () => {

    // Solicita um novo texto ao utilizador
    const novoTexto = prompt("Editar tarefa:", span.textContent);

    // Atualiza apenas se o utilizador não cancelar
    // e não deixar o texto vazio
    if (novoTexto !== null && novoTexto.trim() !== "") {

      // Atualiza o texto na tela
      span.textContent = novoTexto.trim();
      
      const indice = tarefas.findIndex(tarefa=>
      tarefa.id===idAtual);
      

      // Atualiza a tarefa dentro do array
      tarefas[indice].texto = novoTexto.trim();

      // Salva o array atualizado no localStorage
      localStorage.setItem('minhasTarefas', JSON.stringify(tarefas));
      
    }

  });

  // Cria o botão de deletar
  const removeButton = document.createElement('button');
  removeButton.textContent = "Deletar";
  removeButton.classList.add('deletar');

  // Cria a div dos botões
const botoes = document.createElement("div");
botoes.classList.add("botoes");

// Coloca os botões dentro da div
botoes.append(editarBtn, removeButton);
 
  // Remove a tarefa da tela, do array e do localStorage
  removeButton.addEventListener('click', () => {
    
// Encontra a posição da tarefa no array
    const indice = tarefas.findIndex(tarefa=>
    tarefa.id===idAtual);

    // Remove a tarefa do array
    tarefas.splice(indice, 1);

    // Atualiza o localStorage
    localStorage.setItem('minhasTarefas', JSON.stringify(tarefas));

    // Remove a tarefa da interface
    li.remove();
  });

  // Adiciona os elementos dentro da <li>
  li.append(span, small ,botoes);

  // Adiciona a <li> na lista de tarefas
  listaTarefas.appendChild(li);
}

function mostrarTarefas(lista){
  listaTarefas.innerHTML="";
  lista.forEach((tarefa)=>{
    criarTarefa(tarefa);
  });
}
//botão para mostrar todas as tarefas
buttonTodos.addEventListener('click',()=>{
    mostrarTarefas(tarefas);
  });

//botão para mostrar só as pendentes
buttonPendentes.addEventListener('click',()=>{
  
const pendentes = tarefas.filter(p=> p.concluida===false);
  mostrarTarefas(pendentes);
  });

//botão para mostrar só as concluidas
buttonConcluidas.addEventListener('click',()=>{
  const concluidas = tarefas.filter(p=> p.concluida===true);
  mostrarTarefas(concluidas);
})
// Evento do botão "Adicionar"
addButton.addEventListener('click', () => {

  // Remove espaços antes e depois do texto digitado
  const textoInput = input.value.trim();

  // Impede adicionar tarefas vazias
  if (!textoInput) return;
  
  const novaTarefa=
  {
    id: Date.now(),
    texto:textoInput,
    createdAt:new Date().toLocaleString(),
    concluida:false
  };
  
  // Adiciona a tarefa ao array
  tarefas.push(novaTarefa);

  // Salva o array atualizado no localStorage
  localStorage.setItem('minhasTarefas', JSON.stringify(tarefas));

  // Cria a tarefa na interface
  mostrarTarefas(tarefas);

  // Limpa o campo de texto
  input.value = '';
});
//para pesquisar por tarefas
if(pesquisar){
  pesquisar.addEventListener('input',(e)=>{
    const termo = e.target.value.toLowerCase().trim();
    const resultado = tarefas.filter(tarefa=>
    tarefa.texto.toLowerCase().includes(termo));
    mostrarTarefas(resultado);
  });
}
// Ao abrir a página, recria todas as tarefas salvas
mostrarTarefas(tarefas);
      
