function addTask(){
  
//pegando o valor do input
const input=document.getElementById('taskInput');
  const taskText=input.value.trim();
  
  //verifica se está vazio
  if(!taskText) return;
  
  //criar item da lista
  const li=document.createElement("li");
  
  //criar texto da tarefa
  const span=document.createElement("span");
  span.textContent=taskText;
  
  //marcar como tarefa concluida
  
  span.onclick=()=>
  span.classList.toggle("completed");
  
  //botão editar
  const editBtn=document.createElement("button");
  editBtn.textContent="✏";
  editBtn.onclick=()=>{
    const newText=prompt("editar tarefa:", span.textContent);
    if(newText)span.textContent=newText;
  };
  
  //botão de deletar
  const deleteBtn=document.createElement("button");
  deleteBtn.textContent="❌";
  deleteBtn.onclick=()=> li.remove();
  
  //adicionar elementos a tela
  li.append(span, editBtn, deleteBtn);
  document.getElementById("taskList").appendChild(li);
  
  //limpar o campo de texto
  input.value="";
}