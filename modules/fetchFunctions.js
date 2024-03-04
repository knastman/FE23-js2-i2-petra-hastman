const baseUrl = 'https://scrum-board-4eb67-default-rtdb.europe-west1.firebasedatabase.app/taskssss'
const header = {
    "Content-type": "application/json; charset=UTF-8"
}

/*********** 
 GET tasks
*************/

async function getTasks(){
  const url = baseUrl+'.json';

  const res = await fetch(url);
  console.log('res');
  console.log(res);
  
  if (res.ok){
    const tasks = await res.json();
    console.log('tasks');
    console.log(tasks);
    return tasks;
  }
  throw res.status;

}

  // throw res.statusText;
  
 
  
  // if(res.ok){    
  //   if(tasks.total_results == 0){
  //     throw 404;
  //   }
  //   return tasks;
  // }
  // throw res.status; 

  // else throw 'error';

 //Man kan throw rätt status(?)kod (tex 404)) 

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


  // if (res.ok){
  //   const tasks = await res.json();
  //   console.log('tasks');
  //   console.log(tasks);
  //   return tasks;
  // }
  // throw res.status;

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

