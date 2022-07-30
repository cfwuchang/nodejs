const sha1 = require('sha1')
const cofig = require('../config/index')
const {getUserDataAsyas,parseXMLAsy,formatMessage} =require('../../static/utilt/tool')
const template=require('../../static/template/text')
const reply=require('../reply/index')
module.exports=()=>{
    return async (req,res,next)=>{
        //    console.log('111');
        // console.log(req.query);
        // const {signature,echostr,timestamp,nonce} = req.query;
        // const {token}=cofig;
        // const arr=[timestamp,nonce,token];
        // const arrSort=arr.sort();
        // const arrStr= arrSort.join('')
        // const shaStr=sha1(arrStr)
        // if (shaStr===signature){
        //     res.send(echostr)
        // }else{
        //     res.end('error')
        // }
        const {signature,echostr,timestamp,nonce} = req.query;
        const {token}=cofig;
        const shaStr=sha1([timestamp,nonce,token].sort().join(''))
        if(req.method==='GET'){
            if (shaStr===signature){
                res.send(echostr)
            }else{
                res.end('error')
            }
            
        }else if(req.method=='POST'){
            if (shaStr===signature){
                const xmlData=await getUserDataAsyas(req)
                const jsData=await parseXMLAsy(xmlData)
                const message=formatMessage(jsData)
                
                let options={
                    createTime:Date.now(),
                    // MsgType:message.MsgType
                    MsgType:'text',

                }
                options=Object.assign(options,message)
                options=reply(options)
                let replyMessage=template(options)
                res.send(replyMessage)
            }else{
                res.end('error')
            }
        }else{
            res.end('error')
        }
    }
}