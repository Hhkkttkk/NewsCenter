
async function lode(id) {
    let url = "/web/comonents/topbar/topbar.html"
    let topbar = await fetch(url).then(res => res.text())
    document.querySelector(".topbar").innerHTML = topbar
    if(id){
        document.querySelector(`#${id}`).style.color = "#0a58ca"
    }
    
}

export {lode}