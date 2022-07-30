const express = require('express')
const auth=require('./apps/wechat/auth')
const acessToken=require('./apps/wechat/WeChat')
const {result,search}=require('./data/index')
const cheerio=require('cheerio')
const axios=require('axios')
const app = express()

const bodyParser = require('body-parser');
const port = 80
// 配置模板资源目录

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./public'));
app.set('views','./static/template')
// 配置模板引擎
app.set('view engine','ejs')
// 页面路由
app.get('/search',(req,res)=>{
  var page=0
  if (!req.query.page){
    page=1
    
  }else{
    page=req.query.page
  }
  result(page).then(axios.spread((res1,res2,res3,res4,res5)=>{
    var aa=res3.data
    var aa1=aa.indexOf('](')
    var datas= aa.substring(aa1+2,aa.length-1)
    datas=JSON.parse(datas)
    $ = cheerio.load(res1.data);
    // console.log(res2.data);
    var list =  $('.slide').children('.slide-content').find('div')
    var bb=[]
    list.map((i,d)=>{
      var cc={}
      cc.url=$(d).children('a').attr('href')
      if ($(d).children('a').children('img').attr('data-src')){
        cc.tu_url=$(d).children('a').children('img').attr('data-src')
      }else{
        cc.tu_url=$(d).children('a').children('img').attr('src')
      }
      
      bb.push(cc)
    })
    var aa=res2.data.result.pcCouponConfig.pcTopBannerDomain
    if(aa !=null){
      aa=aa.leftBanner
      for (var j=0;j<aa.length;j++){
        bb.push({
          url:aa[j].jumpUrl,
          tu_url:aa[j].banner
        })
      }
    }
    datas.carousel=bb
    var bb=res4.data
    var dd=res4.config.url
    var a1=dd.indexOf('page=')
    var page=dd.substring(a1+5,a1+6)
    console.log(page);
    var bb1=bb.indexOf('({')
    var data1= bb.substring(bb1+1,bb.length-1)
    data1=JSON.parse(data1)
    datas.jd=data1
    datas.jd_url=Number(page)

    var cc=res5.data.result.result
    datas.yuanxuan=cc
    // console.log(datas.yuanxuan);
    res.render('search',{datas:datas})
}))

})

app.post('/result',(req,res)=>{
  // console.log(req.body.title);
  var pw=req.body.title
  search(pw).then(axios.spread((res1,res2)=>{
    $ = cheerio.load(res1.data);
    var list =  $('#J_goodsList').children('ul').find('li')
    var bb=[]
    list.map((i,d)=>{
      var cc={}
      cc.url=$(d).children('.gl-i-wrap').children('.p-img').children('a').attr('href')
      cc.tu_url=$(d).children('.gl-i-wrap').children('.p-img').children('a').children('img').attr('data-lazy-img')

      cc.coin=$(d).children('.gl-i-wrap').children('.p-price').children('strong').children('i').text()
      cc.uol_coin=$(d).children('.gl-i-wrap').children('.p-price').children('span').children('em').text()
      cc.titlt=$(d).children('.gl-i-wrap').children('.p-name-type-2').children('a').children('em').text()
      cc.shop_url=$(d).children('.gl-i-wrap').children('.p-shop').children('span').children('a').attr('href')
      cc.shop=$(d).children('.gl-i-wrap').children('.p-shop').children('span').children('a').text()
      cc.icons=[]
      var dd=$(d).children('.gl-i-wrap').children('.p-icons').find('i')
      dd.map((j,e)=>{
        var rr=$(e).text()
        cc.icons.push(rr)
      })
      // console.log(cc);
      if (cc.tu_url){
        bb.push(cc)
      }
      
    })
    var dd=res1.config.url
    var a1=dd.indexOf('page=')
    var page=dd.substring(a1+5,a1+6)
    console.log(page);
    var datas= res2.data.data.directly
    // datas=JSON.parse(datas)
    datas.jd=bb
    datas.jd_url=Number(page)
    // console.log(datas.jd);
    res.render('result',{datas:datas})
  }))
})



app.use(auth())


app.listen(port, () => console.log(`Example app listening on port ${port}!`))