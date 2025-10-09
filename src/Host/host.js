let tables = document.querySelectorAll(".table")
const html = document.querySelector("html")

let HMW_popup_wrapper = document.getElementById("HMW-popup-wrapper")
let HMW_popup_yes = document.getElementById("HMW-popup-yes")
let HMW_popup_no = document.getElementById("HMW-popup-no")

let tableHTML, table, alreadyActivetables

import {config} from "../backend/config.js"

updateTablesHost()
setInterval(() => {
    updateTablesHost()
}, config.updateTimeHOST * 1000)


async function updateTablesHost(){
    alreadyActivetables = await getActiveTables();
    tables.forEach((table) => {
        if(table.style.zIndex <= 1){        //table in SELECTION STATE (blue one) must not became red before sending the call
            table.style.backgroundColor = "var(--RED)"
            document.getElementById("time-" + table.id).innerText = ""
        }
    })
    for (let [key, value] of Object.entries(alreadyActivetables)){
        document.getElementById("time-" + key).innerText = value.split(" ").pop()
        table = document.getElementById(key)    
        table.style.backgroundColor = "var(--GREEN)"
    }
}
/*              That's something for a new version
let i = 0
setInterval((time) => {
    document.getElementById("time-1").innerText = i
    i ++
}, 1000)
*/

tables.forEach((table) => {     
    table.addEventListener("click", () => {
        tableHTML = document.getElementById(table.id)
        if(tableHTML.style.backgroundColor != "var(--GREEN)"){
            html.style.overflow = "hidden"
            window.scroll(0, tableHTML.offsetTop - 100)
            HMW_popup_wrapper.style.top = table.offsetTop-100 + "px"
            HMW_popup_wrapper.style.display = "flex"
            tableHTML.style.zIndex = 2
            tableHTML.style.backgroundColor = "var(--BLUE)"
        }
    })
})

HMW_popup_no.addEventListener("click",() => {
    tableHTML.style.backgroundColor = "var(--RED)"
    HMW_popup_wrapper.style.display = "none"
    tableHTML.style.zIndex = 0
    html.style.overflow = "auto"
})

HMW_popup_yes.addEventListener("click", () => {
    addActiveTableAndContinue(tableHTML.id, tableHTML)
})

function addActiveTableAndContinue(t, tHTML){     //send table to php and continue formatting tables
    fetch('../backend/saveTable.php', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `t=${t}`
    })
    .then(response => response.text())
    .then(data => {
        if(data == 1){
            tHTML.style.backgroundColor = "var(--GREEN)"
            HMW_popup_wrapper.style.display = "none"
            tHTML.style.zIndex = 0
            html.style.overflow = "auto"
        } else {
            alert("C'è stato un errore durante il caricamento del tavolo, riprova.")
        }
        
    })
    .catch(error => console.error(error));
}


async function getActiveTables(){ 
    try{
        const response = await fetch('../backend/getActiveTables.php', {
                method: 'GET', 
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        const data = await response.json()
        return JSON.parse(data)
        
    } catch (error) {
        console.error(error)
        return null;
    }
    
}

