const inputTarefa = document.querySelector('.input-tarefa')
const btnTarefa = document.querySelector('.btn-tarefa')
const tarefas = document.querySelector('.tarefas')

function criaLi() {
  const li = document.createElement('li')
  return li
}

function criaTarefa(textoInput) {
  const li = criaLi()
  li.innerText = textoInput
  tarefas.appendChild(li)
  limpaInput()
  criarBotaoApagar(li)
  salvarTarefas()
}
inputTarefa.addEventListener('keypress', function (e) {
  if (e.keyCode === 13) {
    if (!inputTarefa.value) return
    criaTarefa(inputTarefa.value)
  }
})

function limpaInput() {
  inputTarefa.value = ''
  inputTarefa.focus()
}
function criarBotaoApagar(li) {
  li.innerText += ' '
  const botaoApagar = document.createElement('button', 'x')
  botaoApagar.innerText = 'x'
  botaoApagar.setAttribute('class', 'apagar')
  botaoApagar.setAttribute('title', 'Apagar esta tarefa')
  li.appendChild(botaoApagar)
}

btnTarefa.addEventListener('click', function () {
  if (!inputTarefa.value) return
  criaTarefa(inputTarefa.value)
})
document.addEventListener('click', function (e) {
  const el = e.target

  if (el.classList.contains('apagar')) {
    el.parentElement.remove()
    salvarTarefas()
  }
})
function salvarTarefas() {
  const liTarefas = tarefas.querySelectorAll('li')
  const listaDeTarefas = []

  for (let tarefa of liTarefas) {
    let tarefaTexto = tarefa.innerText
    tarefaTexto = tarefaTexto.replace('x', '').trim()
    listaDeTarefas.push(tarefaTexto)
  }
  const tarefasJSON = JSON.stringify(listaDeTarefas)
  localStorage.setItem('tarefas', tarefasJSON)
}
function adicionaTarefasSalvas() {
  const tarefas = localStorage.getItem('tarefas')
  const listaDeTarefas = JSON.parse(tarefas)
  for (let tarefas of listaDeTarefas) {
    criaTarefa(tarefas)
  }
}
adicionaTarefasSalvas()
