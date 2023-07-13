function isLogin() {
    return localStorage.getItem("token")
}

function renderTopbar(user) {
    let photo = document.querySelector("#topbar-photo")
    let currentUsername = document.querySelector("#currentUsername")
    let exit = document.querySelector("#exit")
    //console.log(user.photo)
    photo.src = user.photo
    //console.log(user.username)
    currentUsername.innerHTML = user.username
    exit.onclick = function () {
        localStorage.removeItem("token")
        location.href = "/admin/views/login/index.html"
    }

}


//权限管理
function renderSidemenu(user,id){
    document.querySelector("#"+id).style.color="#0a58ca"
    if(user.role!=="admin"){
        document.querySelector(".user-manage-item").remove()
    }
}

async function lode(id) {
    let user = isLogin()
    if (user) {
        let topbar = await fetch("/admin/comonents/topbar/topbar.html").then(res => res.text())
        let sidemenu = await fetch("/admin/comonents/sidemenu/sidemenu.html").then(res => res.text())
        document.querySelector(".topbar").innerHTML = topbar
        document.querySelector(".sidemenu").innerHTML = sidemenu
        renderTopbar(JSON.parse(user))
        
        renderSidemenu(JSON.parse(user),id)

    } else {
        location.href = '/admin/views/login/index.html'
    }
}

export { lode ,isLogin}