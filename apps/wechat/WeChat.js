const { request } = require("express")
const axios = require("axios");
const qs =require('qs')
const fs=require('fs')
const menu=require('../../static/menu/index')
const {appID,appsecret}=require('../config/index.js');
class Wechat{
    constructor(){

    }
    // 获取accecss_token
    getAccessToken (){
        const url= `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appID}&secret=${appsecret}`
        return new Promise((res,rej)=>{
            // axios
            axios({
                url: url, //需要访问的资源链接
                method: "GET",
                responseType: "json",
            }).then(r=>{
                console.log(r.data);
                // 修改成过期时间的时间戳
                r.data.expires_in=Date.now()+(r.data.expires_in-300)*1000
                console.log(r.data);
                res (r.data)
            }).catch(err=>{
                // console.log(err);
                rej ('getAccessToken有问题'+err)
            })
        })
        
        
    }

    // 保存 access_token
    saveAccessToken (accessToken){
        accessToken=JSON.stringify(accessToken)
        return new Promise((res,rej)=>{
            fs.writeFile('./static/accessToken.txt',accessToken,err=>{
                if(!err){
                    console.log('成功');
                    res()
                }else{
                    console.log('失败');
                    rej()
                }
            })
        })
        
    }
    // 读取文件
    readAccessToken (){
        return new Promise((res,rej)=>{
            fs.readFile('./static/accessToken.txt',(err,data)=>{
                if(!err){
                    console.log('读取成功');
                    console.log(data);
                    // data=JSON.parse(data)
                    res (data)
                }else{
                    console.log('读取失败');
                    rej('readAccessToken有问题'+err)
                }
            })
        })
        
    }

    // 判断 access_token是否过期
    isValidAccessToken (data){
        if(!data && !data.access_token && !data.expires_in){
            return false
        }
        return data.expires_in>Date.now();
    }

    fetchAccessToken(){
        if(this.access_token && this.expires_in && this.isValidAccessToken(this)){
            return Promise.resolve({
                access_token:this.access_token,
                expires_in:this.expires_in
            })
        }
        return this.readAccessToken()
        .then(async res=>{
                if(this.isValidAccessToken(res)){
                    return Promise.resolve(res)
                    // ressolve (res)
                }else{
                    const res= await this.getAccessToken()
                    await this.saveAccessToken(res)
                    return Promise.resolve(res)
                    // ressolve(res)
                    // .then(res=>{
                    //     this.saveAccessToken(res)
                    //     .then(()=>{
                    //         ressolve(res)
                    //     })
                    // })
                }
            }
        )
        .catch(async err=>{
            const res= await this.getAccessToken()
            await this.saveAccessToken(res)
            return Promise.resolve(res)
            // ressolve(res)
            // .then(res=>{
            //     this.saveAccessToken(res)
            //     .then(()=>{
            //         ressolve(res)
            //     })
            // })
        })
        .then(res=>{
            this.access_token=res.access_token
            this.expires_in=res.expires_in
            return Promise.resolve(res)
        })
    }
    // 创建菜单
    crreateMenu(menu){
        return new Promise(async(reslove,reject)=>{
            try{
                //获取全局的AccessToken
                const AccessToken= await this.fetchAccessToken()
                // url
                const url=`https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${AccessToken.access_token}`
                const result= await axios({
                    url: url,
                    method: "POST",
                    data:menu
                })
                console.log(result);
                reslove(result)
            }catch(e){
                reject( `crreateMenu错误`+e)
            }
            
        })
    }

    // 删除菜单
    deleteMenu(){
        return new Promise(async(reslove,reject)=>{
            try{
                const AccessToken= await this.fetchAccessToken()
                console.log(AccessToken.access_token);
                const url=`https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=${AccessToken.access_token}`
                
                const result= await axios({
                    url: url,
                    method: "GET",
                    
                })
                console.log(result);
                reslove(result)
            }catch(e){
                reject(`deleteMenu:错误`+e)
            }
            
        })
    }
    
}
// console.log(menu);
// const w=new Wechat
//     // let aa =w.deleteMenu()
//     // console.log(aa);
//     const bb= w.crreateMenu(menu)
//     console.log(bb);
// (async()=>{
//     const w=new Wechat
//     // let aa=await w.deleteMenu()
//     // console.log(aa);
//     const bb=await w.crreateMenu(menu)
//     console.log(bb);
// })
// new Promise((ressolve,reject)=>{
//     const w=new Wechat
//     w.readAccessToken().then(
//         res=>{
//             if(w.isValidAccessToken(res)){
//                 console.log(res);
//                 ressolve (res)
//             }else{
//                 w.getAccessToken().then(res=>{
//                     w.saveAccessToken(res)
//                     .then(()=>{
//                         ressolve(res)
//                     })
//                 })
//             }
//         }
//     ).catch(err=>{
//         w.getAccessToken().then(res=>{
//             w.saveAccessToken(res)
//             .then(()=>{
//                 ressolve(res)
//             })
//         })
//     })
// }).then(res=>{
//     console.log(res);
// })


