import {lode,isLogin} from "/admin/util/lode.js"

//加载导航栏
lode("sidemenu-addNews")

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

andNewsForm.onsubmit = async function(evt){
    evt.preventDefault()
    console.log(title.value,txt,category.value,cover)
    await fetch(url,{
        method:"post",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            author:JSON.parse(isLogin()).username,
            title : title.value,
            content : txt,
            category:category.value,
            cover
        })
    }).then(res=>res.json())
    location.href = '/admin/views/new-mannge/newsList/index.html'
}