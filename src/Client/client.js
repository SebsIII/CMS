let tables = document.querySelectorAll(".table")
let table,alreadyActivetables;

let updateTimeS = 10

updateTables()
setInterval(() => {
    updateTables()
},  updateTimeS * 1000)

async function updateTables(){
    alreadyActivetables = await getActiveTables();
    console.log(alreadyActivetables)
    tables.forEach((table) => {
        table.style.backgroundColor = "var(--RED)"
    })
    for (let key in alreadyActivetables){
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
    singleTable.addEventListener("click", () => {
        singleTable.style.backgroundColor = "var(--RED)"
        console.log(deleteTable(singleTable.id))
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
        console.log(data)
        //return JSON.parse(data)
        
    } catch (error) {
        console.error(error)
        return null;
    }
    
}
