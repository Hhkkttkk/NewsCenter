import { lode } from "/admin/util/lode.js"

//加载导航栏
lode("sidemenu-addUser")

let photo = ""
andUserForm.onsubmit = async function (evt) {
    console.log(username.value)
    //阻止submit的默认刷新行为
    evt.preventDefault()
    let url = "http://localhost:3000/users"
    let res  = await fetch(url,{
        method:"post",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            username : username.value,
            password : password.value,
            introduction:introduction.value,
            photo
        })
    }).then(res=>res.json())
    location.href = "/admin/views/user-manage/userList/index.html"
}

photofile.onchange = function (evt) {
    let reader = new FileReader()
    //将图片信息（二进制）转为base64编码
    reader.readAsDataURL(evt.target.files[0])
    reader.onload = function (e) {
        photo = e.target.result
    }
}