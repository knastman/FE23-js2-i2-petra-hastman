import { getTasks, assignNameToTask, changeTaskStatus, deleteTask} from "./fetchFunctions.js";

const toDoTasksContainer = document.querySelector('#toDoTasks');
const inProgressTasksContainer = document.querySelector('#inProgressTasks');
const doneTasksContainer = document.querySelector('#doneTasks');

/*********************************
  Display Tasks
**********************************/


export function clearAndGetTasks(){
  clearAll();
  getTasks()
    .then(displayTasks)
    .catch(displayError)
}

export function displayTasks(tasks){
  for(const id in tasks){
    const task = tasks[id];
    displayTask(task, id);
  }
}

function displayTask(task, id){
  const taskCard = document.createElement('article'); 
  const taskTextContainer = createAppendAddClass('div', taskCard, 'tasktext');
 
  const status = task.status; 
  let tasksContainer;
  if (status == "to do"){
    tasksContainer = toDoTasksContainer;
    const assignForm = createAssignForm(taskCard);
    
    assignForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const nameInput = assignForm.querySelector('#assignName');
      const assignedName = nameInput.value.trim();

      const newAssignee = {
        assigned: assignedName,
        status: "in progress"
      }

      assignNameToTask(id, newAssignee)
        .then(clearAndGetTasks)
        .catch(displayError)

      assignForm.reset();
 
    });

  }


  if (status == "in progress"){
    tasksContainer = inProgressTasksContainer;
    const taskAssignedContainer = createAppendAddClass('div', taskCard, 'assigned');
    const doneBtnContainer = createAppendAddClass('div', taskCard, 'doneContainer');
    const doneBtn = createAppendAddClass('button', doneBtnContainer,'doneBtn' );
    doneBtn.innerText = 'Done';

    taskAssignedContainer.innerText = task.assigned;

    doneBtn.addEventListener('click', (event) => {
      event.preventDefault();

      const newStatus = {
        status: "done"
      } 

      changeTaskStatus(id, newStatus)
        .then(clearAndGetTasks)
        .catch(displayError)

    });
  }


  if (status == "done"){
    tasksContainer = doneTasksContainer;
    const taskButtonContainer = createAppendAddClass('div', taskCard);
    const removeBtn = createAppendAddClass('button', taskButtonContainer, 'deleteBtn');
    removeBtn.innerText = 'Remove';

    removeBtn.addEventListener('click', () => {
      deleteTask(id)
      .then(clearAndGetTasks)
      .catch(displayError)
    })

  }

  let cssCategory;
  if (task.category == "ux"){
    cssCategory = 'uxColor';
  }
  if (task.category == "dev backend"){
    cssCategory = 'devBackColor';
  }
  if (task.category == "dev frontend"){
    cssCategory = 'devFrontColor';
  }

  taskCard.classList.add('task', cssCategory);
  taskCard.setAttribute("id", id);
  taskTextContainer.innerText = task.task;
  tasksContainer.append(taskCard);
}



/********************************************
   Create form (Assign)
*********************************************/

function createAssignForm(taskCard) {
  const taskAssignContainer = createAppendAddClass('div', taskCard, 'taskassign');
  const assignForm = createAppendAddClass('form', taskAssignContainer, 'assignform');
  const nameInput = createAppendAddClass('input', assignForm, 'assignNameInput');
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("name", "AssignName");
  nameInput.setAttribute("placeholder", "Enter name");
  nameInput.setAttribute("id", "assignName"); 
  const  nameSubmitBtn = createAppendAddClass('button', assignForm, 'assignBtn');
  nameSubmitBtn.innerText = 'Assign';
  return assignForm;
}



/********************************************
   Create/Append & Clear functions
*********************************************/

export function createAppendAddClass(type, container, className){
  const el = document.createElement(type);
  container.append(el);
  if(className !== undefined) {
    el.classList.add(className);
  }
  return el;
}


export function clearAll (){
  toDoTasksContainer.innerHTML = '';
  inProgressTasksContainer.innerHTML = '';
  doneTasksContainer.innerHTML = '';
}

/********************************************
   Error messages
*********************************************/

export function displayError(error) {
  const errorContainer = document.querySelector('#errorContainer');
  errorContainer.classList.remove('hide');
  const message = `ERROR! Server responded with ${error}.`;
  errorContainer.innerText = message;

}





