const loginform =document.getElementById("loginform")
loginform.onsubmit  = async function(evt){
    //阻止submit的默认刷新行为
    evt.preventDefault()
    //正常 post请求
    let url = `http://localhost:3000/users?username=${username.value}&password=${password.value}`
    console.log(url)
    let res = await fetch(url).then(res=>res.json())
    console.log(res)
    //登录成功
    if(res.length>0){
        location.href = "/admin/views/home/index.html"
        localStorage.setItem("token",JSON.stringify({
            ...res[0],
            password:"*****"
        }))
    }
    else{
        alert("用户或密码错误")
    }
}
back.onclick = function(){
    location.href = '/web/views/producs/index.html'
}