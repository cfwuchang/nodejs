const { type } = require('express/lib/response')
const {parseString} =require('xml2js')
module.exports={
    getUserDataAsyas(req){
        return new Promise((resolve,reject)=>{
            let xmlData=''
            req
            .on('data',data=>{
                // 流式数据以data触发
                xmlData+=data
            })
            .on('end',()=>{
                // 流式数据close结束触发
                resolve (xmlData)
            })
        })
    },
    //将xml解析为js对象
    parseXMLAsy(xmlData){
        return new Promise((resolve,reject)=>{
            parseString(xmlData,{trim:true},(err,data)=>{
                if(!err){
                    resolve(data)
                }else{
                    reject('parseXMLAsy有问题'+err)
                }
            })
        })
    },
    // 格式话数据
    formatMessage(jsData){
        let message=[]
        jsData=jsData.xml
        if (typeof jsData==='object'){
            for (const key in jsData) {
                let value=jsData[key]
                if (Array.isArray(value) && value.length>0){
                    message[key]=value[0]
                }
            }
        }
        return message
    }
}
