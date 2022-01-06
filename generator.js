let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function isLeapYear(year) {
	if (year % 4 === 0) {
		if (year % 100 === 0) {
			if (year % 400 === 0) {
				return true;
			} else {
				return false;
			}
		} else {
			return true;
		}
	} else {
		return false;
	}
}

export default function createMonth(dateString = null) {
	let now = new Date();
	if (dateString) now = new Date(dateString);

	const year = now.getFullYear();
	const month = now.getMonth();
	
    const monthName = months[month];
	const previousMonth = (month - 1 < 0) ? 11: month - 1;
    const lastDayWasLeapDay = previousMonth === 1 && isLeapYear(year);
  
	const firstOfMonth = new Date(monthName + " 1, " + year);
	const firstDayOfMonth = firstOfMonth.getDay();
	const lastDayOfPreviousMonth = daysInMonths[previousMonth];

	let filledDates = 0;

    let extraDays = (firstDayOfMonth === 0) ? 7 : 0;
	if (lastDayWasLeapDay) extraDays--;

	let final = [];
	for (let i = 0; i < firstDayOfMonth + extraDays; i++) {
		let num = lastDayOfPreviousMonth - firstDayOfMonth - extraDays + i + 1;
		final.push({
            d:num,
            info:{
                isToday: false,
                isImportant: false,
        }});
		filledDates++;
	}
    if (lastDayWasLeapDay === true) {
		final.push({
            d: 29,
            info:{
                isToday: false,
                isImportant: false,
        }});
		filledDates++;
	}

    const current = new Date();
    const currentmonth = current.getMonth();
    const currentdate = current.getDate();
    const currentyear = current.getFullYear();
	for (let i = 1; i <= daysInMonths[month]; i++) {
		final.push({
            d: i,
            info:{
                isToday: ((currentyear === year) && (currentmonth === month) && (currentdate === i)),
                isImportant: true,
        }});
		filledDates++;
	}
    if (isLeapYear(year) && month === 1) {
		final.push({
            d: 29,
            info:{
                isToday: false,
                isImportant: true,
        }});
		filledDates++;
	}

    for (let i = 1; i <= 42 - filledDates; i++) {
		final.push({
            d: i,
            info:{
                isToday: false,
                isImportant: false,
        }});
	}
    
    return {
        year: year,
        month: month,
        monthName: monthName,
        days: final
    };
}
