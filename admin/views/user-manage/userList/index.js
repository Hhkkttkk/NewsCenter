import {lode} from "/admin/util/lode.js"

//加载导航栏
lode("sidemenu-userList")
const editModal = new bootstrap.Modal(document.getElementById('editModal'))
const delModal = new bootstrap.Modal(document.getElementById('delModal'))

let userList = []   //用户数据
let updataId = 0
let delId = 0
let photodata = ""
let url = "http://localhost:3000/users"
async function rende(){
    
    userList = await fetch(url).then(res=>res.json())
    //用户数据
    console.log(userList)
    let index = 1
    listBody.innerHTML = userList.map(item=>
    `
    <tr>
        <th>${index++}</th>
        <td>${item.username}</td>
        <td>
            <img src="${item.photo}" style="width:50px;"></img>
        </td>
        <td>
        <button type="button" class="btn btn-primary btn-edit" ${item.default?"disabled":""} data-myid="${item.id}">修改</button>
        <button type="button" class="btn btn-danger btn-del" ${item.default?"disabled":""} data-myid="${item.id}">删除</button>
        </td>
    </tr>
    `).join("")
}
rende()
listBody.onclick = function(evt){
    //编辑按钮
    if(evt.target.className.includes("btn-edit")){
        updataId = evt.target.dataset.myid
        //显示model
        //预填
        editModal.toggle()
        let {username,password,introduction,photo} = userList.filter(item=>item.id==updataId)[0]
        document.getElementById("username").value = username
        document.getElementById("password").value = password
        document.getElementById("introduction").value = introduction

        //暂存图片信息，如不跟新直接赋值
        photodata = photo
    }else if(evt.target.className.includes("btn-del")){
        delModal.toggle()
        delId = evt.target.dataset.myid
    }
    
}


editConfirm.onclick = async function(){
    await fetch(url+`/${updataId}`,{
        method:"PATCH",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            username : document.getElementById("username").value,
            password : document.getElementById("username").value,
            introduction:document.getElementById("introduction").value,
            photo:photodata
        })
    }).then(res=>res.json())
    rende()
    editModal.toggle()
}


delConfirm.onclick = async function(){
    await fetch(url+`/${delId}`,{
        method:"delete"
    }).then(res=>res.json())
    delModal.toggle()
    rende()
}

//如果图像信息发生变化
photofile.onchange = function (evt) {
    let reader = new FileReader()
    //将图片信息（二进制）转为base64编码
    reader.readAsDataURL(evt.target.files[0])
    reader.onload = function (e) {
        photodata = e.target.result
    }
}