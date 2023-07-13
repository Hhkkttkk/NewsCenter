import { lode } from "/web/util/lode.js"
//加载导航栏
lode("")

async function render(){
    let id  = new URL(location.href).searchParams.get("id")
    const url = "http://localhost:3000/news?id=" + id
    let news = await fetch(url).then(res=>res.json())
    let {title,content,cover,author} = {...news[0]}
    document.querySelector(".title").innerHTML = title
    document.querySelector(".author").innerHTML = author
    document.querySelector(".news").innerHTML = content
    //document.querySelector("").innerHTML = 
}

render()
