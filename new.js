import make from "./generator.js";

let monthElem = document.getElementById("month");
let yearElem = document.getElementById("year");
let calendar = document.getElementById("calendar");
let monthInput = document.getElementById("monthInput");
let yearInput = document.getElementById("yearInput");
let returnbtn = document.getElementById("return");

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

let current = new Date();
let currentmonth = current.getMonth();
let currentyear = current.getFullYear();

monthInput.addEventListener("change", inputListener);
yearInput.addEventListener("change", inputListener);
returnbtn.addEventListener("click", btnListener);

function btnListener() {
	let calendar = make();
	monthInput.value = currentmonth + 1;
	yearInput.value = currentyear;
    render(calendar);
}

function inputListener() {
	let y = yearInput.value;
	let m = monthInput.value;
	let calendar = make(months[m - 1] + " 1, " + y);
    render(calendar);
}

function render(c){
    yearElem.textContent = c.year;
    monthElem.textContent = c.monthName;
    calendar.innerHTML = "";
    c.days.forEach(day => {
        let div = document.createElement("div");
		div.innerText = day.d;
        if(!day.info.isImportant) div.classList.add("additionalDate");
        if(day.info.isToday) div.id = "today";
		calendar.appendChild(div);
    });
}

monthInput.value = currentmonth + 1;
yearInput.value = currentyear;

render(make());