let tables = document.querySelectorAll(".table")

let HMW_popup_wrapper = document.getElementById("HMW-popup-wrapper")

tables.forEach((table) => {
    table.addEventListener("click", () => {
        //alert(table.innerHTML)
        HMW_popup_wrapper.style.display = "block"
        table.style.backgroundColor = "green"
    })
})