//import {create_task} from './task.js'

//ZA DATUM------------------------------------------
const date = new Date();
let dan_in_week = date.getDay();
let dd = date.getDate();
let mm = date.getMonth() + 1;
let yyyy = date.getFullYear();
let dan = document.querySelector('#day-in-week');
let long = document.querySelector('#long-day');

switch(dan_in_week){
    case 1:
        dan.innerHTML = 'Monday';
        break;
    case 2:
        dan.innerHTML = 'Tuesday';
        break;
    case 3:
        dan.innerHTML = 'Wednesday';
        break;
    case 4:
        dan.innerHTML = 'Thursday';
        break;
    case 5:
        dan.innerHTML = 'Friday';
        break;
    case 6:
        dan.innerHTML = 'Saturday';
        break;
    case 0:
        dan.innerHTML = 'Sunday';
        break;
    default:
        dan.innerHTML = 'err';
}

if(dd < 10){
    dd = '0' + dd;
}
if(mm < 10){
    mm = '0' + mm;
}

let today = mm+'.'+dd+'.'+yyyy;
long.innerHTML = today;

//----------------------------------------------
//add new task


class Todo{
    constructor(){
        this.arr = [];
        this.input = false;
    }

    add_to_arr(item_id){
        this.arr.push(item_id);
    }

    remove_from_arr(id){
        for(let i=0; i<this.arr.length; i++){
            if(this.arr[i] == id){
                this.arr.splice(i, 1);
                break;
            }
        }
    }
    print(){
        for(let i=0; i<this.arr.length; i++){
            console.log(this.arr[i]);
        }
    }
}

class Todo_item{
    constructor(value){
        this.value = value;
        this.ul = document.getElementById('tasks-ul');
        this.id = new Date().getUTCMilliseconds();
    }

    create_item(){
        let li = document.createElement('li');
        li.className = `task uncomplete`
        li.id = this.id;
        let item_css = `
                <label><input type="checkbox" onclick="checkboxClicked(event)">
                <span class="check"></span></label>
                <p>${this.value}</p>
                <span class="close" onclick="deleteTask(event)"></span>`;
        li.innerHTML = item_css;
        this.ul.appendChild(li);
    }

    print(){
        alert(this.value);
    }
}

const todo = new Todo();

//gumb za dodajanje
const add = () => {
    if(todo.input === false){
        document.getElementById('group').innerHTML = input_templet;
        document.getElementById('item_input').focus();
        todo.input = true;
    }else{
        alert("After hit ENTER");
        document.getElementById('item_input').focus();
    }
}

//funckija za izbris itema in v array-u
const deleteTask = (e) => {
    let btn = e.target;
    todo.remove_from_arr(btn.parentNode.id);
    btn.parentNode.parentNode.removeChild(btn.parentNode);
    
}

const checkboxClicked = (e) => {
    let checkbox = e.target;
    if(checkbox.checked){
        checkbox.parentNode.parentNode.className = `task complete`;
    }else{
        checkbox.parentNode.parentNode.className = `task uncomplete`;
    }
}

//funkcija za izbirs input
const remove_input = () => {
    if(todo.input){
        document.getElementById('item_input').value = "";
        document.getElementById('item_input').remove();
        todo.input = false;
    }
}

//  funkcija za preverjanje če je input outoffocus
const onfocusout = () => {
    if(document.getElementById('item_input').value === ""){
        remove_input();
    }
}

const onenterhit = (e) => {
    if(e.keyCode === 13){
        document.getElementById('item_input').blur();
        if(document.getElementById('item_input').value != ""){
            let value = document.getElementById('item_input').value;
            remove_input();
            let todo_item = new Todo_item(value);
            todo_item.create_item();
            todo.add_to_arr(todo_item.id);
            todo.print();
        }
    }
}

//templet za kreiranje inputa
const input_templet = `
    <input id="item_input"type="text" name="item_input" placeholder="What do you need to do" onfocusout="onfocusout()" onkeypress="onenterhit(event)"/>
`;

let add_btn = document.getElementById('add_btn');
add_btn.addEventListener('click', add, false);



