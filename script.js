//connecting elements to variables

let listElement = document.querySelector('#app ul');
let inputElement = document.querySelector('#app input');
let buttonElement = document.querySelector('#app button')

let tasklist = JSON.parse(localStorage.getItem("@data")) || []



function addTasks(){

    
    if(inputElement.value === ''){
        alert('Erro!! Digite algo')
        return false
    }

    else{
        var newTask = {
            text: inputElement.value,
            completed: false,
        }

        tasklist.push(newTask)
        inputElement.value = "";

        renderTasks();
        saveData();
    }
}

//calling function

buttonElement.onclick = addTasks

//renderin in UL

function renderTasks(){
    listElement.innerHTML = ""

    for (let i = 0; i < tasklist.length; i++){

        let divd = document.createElement("div");
        divd.setAttribute("class", "juntos");

        let checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.checked = tasklist[i].completed;

        checkbox.onchange = function (){
            tasklist[i].completed = this.checked
            saveData()
        };


        let CreateLi = document.createElement("li");

        let CreateText = document.createElement("span")
        CreateText.innerText = tasklist[i].text;

        let createA = document.createElement("a")
        createA.setAttribute("href", "#")
        createA.innerText = " ❌";
        createA.onclick = function () {
            deleteingTask(i)
        }

        divd.appendChild(checkbox);
        divd.appendChild(CreateText);


        CreateLi.appendChild(divd);
        CreateLi.appendChild(createA);
        listElement.appendChild(CreateLi);

    }
}

//deleting

function deleteingTask(position){
    tasklist.splice(position, 1)
    renderTasks();
    saveData()
}

function saveData(){
    localStorage.setItem("@data" , JSON.stringify(tasklist))
}  

renderTasks();