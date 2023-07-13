import { lode, isLogin } from "/admin/util/lode.js"

//加载导航栏
lode("sidemenu-home")

let user = JSON.parse(isLogin())
let categorylist = ['最新动态', '典型案列', '通知公告']
document.querySelector(".userprofile").innerHTML = `
    <img src="${user.photo}" style="width:100px"></img>
    <div>
        <div>${user.username}</div>
        <div><pre>${user.introduction || "这个人很懒"}</pre></div>
    </div>`

async function analylist() {
    let url = "http://localhost:3000/news?author=" + user.username
    let res = await fetch(url).then(res => res.json())


    let obj = _.groupBy(res, item => item.category)
    let arr = []
    for (let i in obj) {
        arr.push({
            value: obj[i].length,
            name: categorylist[i],
        })
    }
    enderEcharts(arr)
    console.log(arr)
}
analylist()




function enderEcharts(data) {
    //图表
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));
    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '用户新闻',
            subtext: '类别占比',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                name: '新闻类别',
                type: 'pie',
                radius: '50%',
                data,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}
