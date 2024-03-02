import { getTasks, assignNameToTask, changeTaskStatus, deleteTask} from "./fetchFunctions.js";


const toDoSection = document.querySelector('#toDo');
const inProgressSection = document.querySelector('#inProgress');
const doneSection = document.querySelector('#done');


/*********************************
  Display Tasks
**********************************/

export function displayTasks(tasks){
  for(const id in tasks){
    const task = tasks[id];
    displayTask(task, id);
  }
}

function displayTask(task, id){
  const taskCard = document.createElement('article'); 
  const taskTextContainer = createAppendAddClass('div', taskCard, 'tasktext');

  let section = toDoSection;
  const status = task.status; 
  
  if (status == "to do"){
    const taskAssignContainer = createAppendAddClass('div', taskCard, 'taskassign');
    const assignForm = createAppendAddClass('form', taskAssignContainer, 'assignform');
    const nameInput = createAppendAddClass('input', assignForm, 'assignNameInput');
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("name", "AssignName");
    nameInput.setAttribute("placeholder", "Enter name");
    nameInput.setAttribute("id", "assignName"); 
    const  nameSubmitBtn = createAppendAddClass('button', assignForm, 'assignBtn');
    nameSubmitBtn.innerText = 'Assign';
  
    assignForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const assignedName = nameInput.value.trim();

      const newAssignee = {
        assigned: assignedName,
        status: "in progress"
      }

      assignForm.reset();
   
      assignNameToTask(id, newAssignee)
      .then(()=>{
        clearAll();
        getTasks()
        .then(displayTasks)
        .catch(displayError);
      })

    });

  }


  if (status == "in progress"){
    section = inProgressSection;
    const taskButtonContainer = createAppendAddClass('div', taskCard);
    const assignedToContainer = createAppendAddClass('p', taskButtonContainer, 'assigned');
    const doneBtn = createAppendAddClass('button', taskButtonContainer, 'taskBtns' );
    doneBtn.innerText = 'Done';

    assignedToContainer.innerText = task.assigned;

    doneBtn.addEventListener('click', (event) => {
      event.preventDefault();

      const newStatus = {
        status: "done"
      } 

      changeTaskStatus(id, newStatus)
      .then(()=>{
        clearAll();
        getTasks()
        .then(displayTasks)
        .catch(displayError);
      })

    });
  }


  if (status == "done"){
    section = doneSection;
    const taskButtonContainer = createAppendAddClass('div', taskCard);
    const removeBtn = createAppendAddClass('button', taskButtonContainer, 'taskBtns');
    removeBtn.innerText = 'Remove';

    removeBtn.addEventListener('click', () => {
      deleteTask(id)
      .then(()=>{
        clearAll();
        getTasks()
        .then(displayTasks)
        .catch(displayError);
      })
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
  section.append(taskCard);
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
  toDoSection.innerHTML = '';
  inProgressSection.innerHTML = '';
  doneSection.innerHTML = '';
  const toDoHeader = createAppendAddClass('h2', toDoSection);
  toDoHeader.innerText = 'To do'; 
  const inProgressHeader = createAppendAddClass('h2', inProgressSection);
  inProgressHeader.innerText = 'In progress'; 
  const doneHeader = createAppendAddClass('h2', doneSection);
  doneHeader.innerText = 'Done'; 
}

/********************************************
   Error messages
*********************************************/

export function displayError(error) {
  let message;
  const errorContainer = document.querySelector('#errorContainer');
  errorContainer.classList.remove('hide');

  if (error === 404) { 
    message = 'No results found. Try again.';
  }
  else{ 
    message = 'Something went wrong, try again later.' 
  }
  
  const errorMessage = document.querySelector('#errorMessage');
  errorMessage.innerText = message;

}

