let tables = document.querySelectorAll(".table")
const html = document.querySelector("html")

let HMW_popup_wrapper = document.getElementById("HMW-popup-wrapper")
let HMW_popup_yes = document.getElementById("HMW-popup-yes")
let HMW_popup_no = document.getElementById("HMW-popup-no")
let HMW_popup_table = document.getElementById("selected-table")
let HMW_popup_title = document.getElementById("HMW-popup-title")

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
            togglePopUp(`Chiamare il tavolo <snap id='selected-table'>${table.id}</snap>?`, tableHTML, "BLUE", true)
        } else {
            togglePopUp(`Cancellare il tavolo <snap id='selected-table'>${table.id}</snap>?`, tableHTML, "notUpdate", true)
        }
    })
})

HMW_popup_no.addEventListener("click",() => {
    if(tableHTML.style.backgroundColor == "var(--GREEN)"){
        togglePopUp("" ,tableHTML, "notUpdate", false)
    } else {
        tableHTML.style.backgroundColor = "var(--RED)"  
        HMW_popup_wrapper.style.display = "none"
        tableHTML.style.zIndex = 0
        html.style.overflow = "auto"
    }
    
})

HMW_popup_yes.addEventListener("click", () => {
    if(tableHTML.style.backgroundColor != "var(--GREEN)"){
        addActiveTableAndContinue(tableHTML.id)
    }
})

function addActiveTableAndContinue(t){     //send table to php and continue formatting tables
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
            togglePopUp("", tableHTML, "GREEN", false)
        } else {
            alert("C'è stato un errore durante il caricamento del tavolo, riprova.")
            togglePopUp("", tableHTML, "notUpdate", false)          //to be checked
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

function togglePopUp(message, whole_table, tableColor, mode){
    HMW_popup_title.innerHTML = String(message)
    if(mode == true){       //show PopUP
        HMW_popup_table.innerText = whole_table.id
        html.style.overflow = "hidden"
        window.scroll(0, whole_table.offsetTop - 100)
        HMW_popup_wrapper.style.top = whole_table.offsetTop-100 + "px"
        HMW_popup_wrapper.style.display = "flex"
        whole_table.style.zIndex = 2
        if(tableColor != "notUpdate"){
            tableHTML.style.backgroundColor = `var(--${tableColor})`
        }
    } else if(mode == false){
        if(tableColor != "notUpdate"){
            tableHTML.style.backgroundColor = `var(--${tableColor})`
        }
        HMW_popup_wrapper.style.display = "none"
        whole_table.style.zIndex = 0
        HMW_popup_title.innerText = ""
        html.style.overflow = "auto"

    } else {
        console.error("Mode input not valid in togglePopUp")
    }

}
