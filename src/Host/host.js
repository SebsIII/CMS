let tables = document.querySelectorAll(".table")
const html = document.querySelector("html")

let HMW_popup_wrapper = document.getElementById("HMW-popup-wrapper")
let HMW_popup_yes = document.getElementById("HMW-popup-yes")
let HMW_popup_no = document.getElementById("HMW-popup-no")

let tableID, tableHTML, table

tables.forEach((table) => {
    table.addEventListener("click", () => {
        tableID = null
        tableHTML = null        //reset vars
        if(table.id == ""){
            tableID = table.innerHTML   //save ID to var
        } else {
            tableID = table.id      //the table already has ID
        }
        html.style.overflow = "hidden"
        
        table.setAttribute("id", tableID)   //add ID to table
        tableHTML = document.getElementById(tableID)    //whole tbale HTML doc

        window.scroll(0, tableHTML.offsetTop - 100)
        HMW_popup_wrapper.style.top = tableHTML.offsetTop-100 + "px"
        HMW_popup_wrapper.style.display = "flex"
        table.style.zIndex = 2
        table.style.backgroundColor = "var(--BLUE)"
        
    })
})

HMW_popup_no.addEventListener("click",() => {
    tableHTML.style.backgroundColor = "var(--RED)"
    HMW_popup_wrapper.style.display = "none"
    tableHTML.style.zIndex = 0
    html.style.overflow = "auto"
})

HMW_popup_yes.addEventListener("click", () => {
    addActiveTableAndContinue(tableID, tableHTML)
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
            tHTML.style.zIndex = -1
            html.style.overflow = "auto"
        } else {
            alert("C'è stato un errore durante il caricamento del tavolo, riprova.")
        }
        
    })
    .catch(error => console.error(error));
}
