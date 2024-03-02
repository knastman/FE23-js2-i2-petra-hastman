const baseUrl = 'https://scrum-board-4eb67-default-rtdb.europe-west1.firebasedatabase.app/tasks'
const header = {
    "Content-type": "application/json; charset=UTF-8"
}

/*********** 
 GET tasks
*************/

async function getTasks(){
  const url = baseUrl+'.json';

  const res = await fetch(url);

  if(res.ok){ 
    const tasks = await res.json();
    if(tasks.total_results == 0){
      throw 404;
    }
    return tasks;
  }
  else throw 'error';

}



/*********** 
 POST new task
*************/

async function postTask(task){
  const url = baseUrl + `.json`;

  const options = {
    method: "POST",
    body: JSON.stringify(task), 
    headers: header
  }

  const res = await fetch(url, options);

  const info = await res.json();
  console.log(info);

}


/*********** 
Patch - Assign 
*************/

async function assignNameToTask(id, assignedName){
  const url = baseUrl + `/${id}.json`;

  const options = {
      method: 'PATCH',
      body: JSON.stringify(assignedName),
      headers: header
  }

  const res = await fetch(url, options);
  const info = await res.json();
}

/*********** 
Patch - Change status
*************/

async function changeTaskStatus(id, status){
  const url = baseUrl + `/${id}.json`;

  const options = {
      method: 'PATCH',
      body: JSON.stringify(status),
      headers: header
  }

  const res = await fetch(url, options);
  const info = await res.json();
}


/*********** 
Delete task
*************/

async function deleteTask(id){
  const url = baseUrl + `/${id}.json`;
  const options = {
      method: "DELETE",
  }

  const res = await fetch(url, options);
  const info = await res.json();
}


export {getTasks, postTask, assignNameToTask, changeTaskStatus, deleteTask}

