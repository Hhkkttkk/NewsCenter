
import { lode } from "/web/util/lode.js"
//加载导航栏
lode("topbar-news")

let list = []
let pat = "/web/views/detail/detail.html?id="
serch.oninput = async function () {
    let val = serch.value
    if (val == "") {
        document.querySelector(".list-group").style.display = "none"
        return
    } else {
        document.querySelector(".list-group").style.display = "block"
    }
    let url = "http://localhost:3000/news?title_like=" + val
    let res = await fetch(url).then(res => res.json())
    document.querySelector(".list-group").innerHTML = res.map(item => `
        <a href="${pat + item.id}">
            <li class="list-group-item">
                <i class="iconfont icon-31sousuo"></i>${item.title}
            </li>
        </a>
    `).join("")
}

serch.onblur = function () {
    setTimeout(() => {
        document.querySelector(".list-group").style.display = "none"
        serch.value = ""
    }, 300)
}


async function render() {
    await renderList()
    renderTab()
}

async function renderList() {
    let url = "http://localhost:3000/news"
    let cardContainer = document.querySelector(".cardContainer")
    list = await fetch(url).then(res => res.json())
    list.reverse()
    cardContainer.innerHTML = list.slice(0, 4).map(item => `
    <div class="card">
        <a href="${pat + item.id}">
        <div class="cardBackground" style="background-image: url(${item.cover});"></div>
        <div class="card-body">
            <h5 class="card-title" style="text-overflow: ellipsis;white-space: nowrap;overflow: hidden;">${item.title}</h5>
            <p class="card-text">作者：${item.author}</p>
        </div>
        </a>
    </div>
    `).join("")
}
function mymap(cla,lab) {
    let table = document.getElementById(cla)
    table.innerHTML = lab.map(item=>`
    <a href="${pat + item.id}">
        <div class="listItem">
             <img src="${item.cover}" alt="">
             <div>${item.title}</div>
             <p class="card-text">作者：${item.author}</p>
        </div>
    </a>`).join("")
}

function renderTab() {
    let l1 = []
    let l2 = []
    let l3 = []
    list.map(item=>{
        if(item.category==0){
            l1.push(item)
        }
        if(item.category==1){
            l2.push(item)
        }
        if(item.category==2){
            l3.push(item)
        }
    })
    mymap("nav-home",l1)
    mymap("nav-profile",l2)
    mymap("nav-contact",l3)
    console.log(l1,l2,l3)
}

render()

