const axios=require('axios')

// var taobao= async ()=>{
//   return axios.get('https://ald-lamp.alicdn.com/bottom/8507459/frontCatId=jingxuan/page=1/data.jsonp?callback=callback_8507459_frontCatId_jingxuan_page_1')

// }
var result = async (page)=>{
  return axios.all([
    axios({url:'https://ai.m.taobao.com/'}),
    axios({url:'https://api.m.jd.com/api?appid=myQA&functionId=getPCCouponConfig&client=pc',headers:{
      'Referer':'https://a.jd.com',
      'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0'
    }}),
    axios.get(`https://ald-lamp.alicdn.com/bottom/8507459/frontCatId=jingxuan/page=1/data.jsonp?callback=callback_8507459_frontCatId_jingxuan_page_1`),
    axios({url:`https://a.jd.com/indexAjax/getCouponListByCatalogId.html?callback=jQuery6433803&catalogId=118&page=${page}&pageSize=20`,headers:{
      'Referer':'https://a.jd.com',
      'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0'
    }}),
    axios.get(`https://act.you.163.com/act/napi/goodsrcmd/guessyou.do?size=20&page=${page}&recNum=300`),

  ])
}
var search =async (pw,page)=>{
  pw=encodeURIComponent(pw)
  return axios.all([
    axios({url:`https://search.jd.com/Search?keyword=${pw}&page=${page}`,headers:{
      'Referer':'https://a.jd.com',
      'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0'
    }}),
    axios.get(`https://you.163.com/xhr/search/search.json?page=1&size=40&keyword=${pw}`),
  ])
}

module.exports={
  result,
  search
}