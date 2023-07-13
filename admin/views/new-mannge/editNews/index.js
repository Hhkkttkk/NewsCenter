import {lode,isLogin} from "/admin/util/lode.js"

//加载导航栏
lode("sidemenu-newsList")

//获取id
const id = new URL(location.href).searchParams.get("id")

let txt = ""
let cover = ""
let url = "http://localhost:3000/news"
const { createEditor, createToolbar } = window.wangEditor
const editorConfig = {
    placeholder: '在此写入内容。。。',
    onChange(editor) {
      const html = editor.getHtml()
      //console.log('editor content', html)
      // 也可以同步到 <textarea>
      txt = html
    }
}
const editor = createEditor({
    selector: '#editor-container',
    html: '<p><br></p>',
    config: editorConfig,
    mode: 'default', // or 'simple'
})

const toolbarConfig = {}

const toolbar = createToolbar({
    editor,
    selector: '#toolbar-container',
    config: toolbarConfig,
    mode: 'default', // or 'simple'
})


//如果图像信息发生变化
coverfile.onchange = function (evt) {
    let reader = new FileReader()
    //将图片信息（二进制）转为base64编码
    reader.readAsDataURL(evt.target.files[0])
    reader.onload = function (e) {
        cover = e.target.result
        console.log(cover)
    }
}

editNewsForm.onsubmit = async function(evt){
    evt.preventDefault()
    console.log(title.value,txt,category.value,cover)
    await fetch(url+`/${id}`,{
        //更新新闻
        method:"PATCH",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            title : title.value,
            content : txt,
            category:category.value,
            cover
        })
    }).then(res=>res.json())
    location.href = '/admin/views/new-mannge/newsList/index.html'
}

async function render(){
    let obj = await fetch(url+`/${id}`).then(res=>res.json())
    console.log(obj)
    let {category,content,cover:img,title} = obj
    document.querySelector("#title").value = title
    document.querySelector("#category").value = category
    txt = content
    cover = img
    //设置编辑器内容
    editor.setHtml(content)
}
render()
 