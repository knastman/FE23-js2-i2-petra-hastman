import { displayTasks, createAppendAddClass, clearAll, displayError} from "./modules/displayTasks.js";
import { getTasks, postTask } from "./modules/fetchFunctions.js";

const form = document.querySelector('#addTasksForm');
const headerEl = document.querySelector('header');


getTasks()
.then(displayTasks)
.catch(displayError); //Funkar ej?


form.addEventListener('submit', (event) => {
  event.preventDefault();

  const task = document.querySelector('#addTask').value.trim();
  const category = document.querySelector('#devCategory').value.trim();

  const newTask = {
    assigned: "",
    category: category, 
    status: "to do", 
    task: task 
  }

  const noCategoryMessage = createAppendAddClass('div', headerEl, 'noCategoryMessage');
  noCategoryMessage.innerHTML = '';
  if (category == ""){
    noCategoryMessage.innerText = 'You have to choose a category'; //Funkar men texten försvinner inte när man väljer kategori
  }
  else{
    form.reset();
    noCategoryMessage.innerHTML = '';
    postTask(newTask)
    .then(()=>{
      clearAll();
      getTasks()
      .then(displayTasks)
      .catch(displayError);
    })
    
  }
  
})

