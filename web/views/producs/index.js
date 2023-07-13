
import { lode } from "/web/util/lode.js"
//加载导航栏
lode("topbar-Products-Services")

async function renler() {
    let url = "http://localhost:3000/products"
    let arr = await fetch(url).then(res => res.json())
    let imglist = arr.map(item => `
    <div class="swiper-slide myslide" style="background-image:url(${item.cover});width: 100%;background-size: cover;height: calc(100vh - 50px);">
    <div class="mytxt">
        <p>${item.title}</p>
        <p>${item.introduction + "," + item.detail}</p>
    </div>
    </div>`)
    console.log(imglist)
    document.getElementById("swiper-wrapper").innerHTML = imglist.join("")
    var mySwiper = new Swiper('.swiper', {
        //direction: 'vertical', // 垂直切换选项
        loop: true, // 循环模式选项

        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
        },
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        //如果需要前进后退按钮
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // 如果需要滚动条
        // scrollbar: {
        //     el: '.swiper-scrollbar',
        // },
    })
}
renler()

