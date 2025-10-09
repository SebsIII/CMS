let tables = document.querySelectorAll(".table")
let table,alreadyActivetables;

let updateTimeS = 10

updateTables()
setInterval(() => {
    updateTables()
},  updateTimeS * 1000)

async function updateTables(){
    alreadyActivetables = await getActiveTables();
    tables.forEach((table) => {
        table.style.backgroundColor = "var(--RED)"
        document.getElementById("time-" + table.id).innerText = ""
    })
    for (let [key, value] of Object.entries(alreadyActivetables)){
        document.getElementById("time-" + key).innerText = value.split(" ").pop()
        table = document.getElementById(key)    
        table.style.backgroundColor = "var(--GREEN)"
    }
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

tables.forEach((singleTable) => {
    singleTable.addEventListener("click", async () => {
        if(Object.keys(alreadyActivetables).includes(singleTable.id)){
            let DELoutput = await deleteTable(singleTable.id)
            if(DELoutput == 1){
                delete alreadyActivetables[singleTable.id]
                document.getElementById("time-" + singleTable.id).innerText = ""
                singleTable.style.backgroundColor = "var(--RED)"     
            } else {
                alert("c'è stato un errore nell'eliminazione del tavolo, riprova.")
            }
        } 
    })
})

async function deleteTable(table){ 
    try{
        const response = await fetch(`../backend/deleteTable.php?t=${table}`, {
                method: 'GET', 
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        const data = await response.text()
        return data
        
    } catch (error) {
        console.error(error)
        return null;
    }
    
}
