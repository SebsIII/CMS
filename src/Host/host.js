let tables = document.querySelectorAll(".table")
const html = document.querySelector("html")

let HMW_popup_wrapper = document.getElementById("HMW-popup-wrapper")
let HMW_popup_yes = document.getElementById("HMW-popup-yes")
let HMW_popup_no = document.getElementById("HMW-popup-no")

let tableID, tableHTML

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
        
        HMW_popup_no.addEventListener("click",() => {
            table.style.backgroundColor = "var(--RED)"
            HMW_popup_wrapper.style.display = "none"
            table.style.zIndex = 0
            html.style.overflow = "auto"
        })

        HMW_popup_yes.addEventListener("click", () => {
            //table called

            html.style.overflow = "auto"
        })
    })
})


