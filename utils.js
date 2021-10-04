// format date function
export function formatDate(date) {
    const splitStringT = date.split("T");
    const splitStringDash = splitStringT[0].split("-");
    const newDate = new Date(splitStringDash[0], splitStringDash[1], splitStringDash[2]);
    const [day, month, year] = [newDate.getDate(), newDate.getMonth(), newDate.getFullYear()];
    const monthName = newDate.toLocaleString('default', { month: 'long' });

    return `${day}  ${monthName}  ${year}`;
}

//document.querySelector alias
export function qS(param) {
    return document.querySelector(param);
}