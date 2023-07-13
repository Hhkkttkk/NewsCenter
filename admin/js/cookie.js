//Cookie保存用户名
function setCookie(cname,cvalue,exdays){
    let t = new Date()
    t.setTime(t.getTime()-(exdays*24*60*60*1000))
    let expires = "expires"+t.toGMTString()
    document.cookie = `username=${cvalue};${expires}`
}
//setCookie("username","zzz",60)
