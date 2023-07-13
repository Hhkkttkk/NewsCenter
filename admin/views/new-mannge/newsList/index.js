import {lode,isLogin} from "/admin/util/lode.js"

//加载导航栏
//sidemenu-newsList，高亮设置
lode("sidemenu-newsList")



//预览模态框
const mypreviewModal = new bootstrap.Modal(document.getElementById('previewModal'))
const mydelModal = new bootstrap.Modal(document.getElementById('delModal'))
let delid = -1

let list = []
let categorylist =  ['最新动态','典型案列','通知公告']
async function render(){
    let url = "http://localhost:3000/news"
    let author = JSON.parse(isLogin()).username
    url = url + `?author=${author}`
    list = await fetch(url).then(res=>res.json())
    //console.log(list)
    let index=0
    newsBody.innerHTML = list.map(item=>`
    <tr scope="row">
        <th scope="row">${index++}</th>
        <td  scope="row">${item.title}</td>
        <td>
            ${categorylist[item.category]}
        </td>
        <td>
        <button type="button" class="btn btn-success btn-sm btn-preview" data-myid="${item.id}" >预览</button>
        <button type="button" class="btn btn-primary btn-sm btn-edit" data-myid="${item.id}" >编辑</button>
        <button type="button" class="btn btn-danger btn-sm btn-del" data-myid="${item.id}">删除</button>
        </td>
    </tr>
    `).join("")
}
render()

newsBody.onclick = function(evt){
    if(evt.target.className.includes("btn-preview"))
    {
        mypreviewModal.toggle()
        let id = evt.target.dataset.myid
        let obj = list.filter(item=>item.id==id)
        //console.log(obj)
        rendPreviewModal(obj)
    }
    else if(evt.target.className.includes("btn-edit")){
        location.href = "/admin/views/new-mannge/editNews/index.html?id="+ evt.target.dataset.myid
    }
    else if(evt.target.className.includes("btn-del"))
    {
        delid = evt.target.dataset.myid
        mydelModal.toggle()
    }
}

function rendPreviewModal(obj){
    previewModalTitle.innerHTML = obj[0].title
    previewModalBody.innerHTML = obj[0].content
}


delConfirm.onclick = async function(){
    let url = "http://localhost:3000/news"
    //console.log(url+`/${delid}`)
    await fetch(url+`/${delid}`,{
        method:"delete"
    }).then(res=>res.json())
    mydelModal.toggle()
    render()
}