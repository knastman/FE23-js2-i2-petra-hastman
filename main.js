import { displayTasks, createAppendAddClass, clearAll, displayError, clearAndGetTasks} from "./modules/displayTasks.js";
import { getTasks, postTask } from "./modules/fetchFunctions.js";

const form = document.querySelector('#addTasksForm');
const headerEl = document.querySelector('header');


getTasks()
.then(displayTasks)
.catch(displayError); 


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

  form.reset();
  // noCategoryMessage.innerHTML = '';

  postTask(newTask)
    .then(clearAndGetTasks)

  
})


