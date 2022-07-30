const fs=require('fs')
module.exports=(options)=>{
    // 接受普通消息
    let content='你说的不是口令'
    if(options.MsgType==='text'){
        if(options.Content==='1'){
            content='回复内容1'
        }
        else if(options.Content==='2'){
            content='回复内容2'
        }
        else if(options.Content==='3'){
            content='回复内容3'
        }
        else if(options.Content.match('前端')){
            content='前端内容'
        }
        options.content=content
    }
    else if(options.MsgType==='image'){
        //返回原来的图片
    }
    else if(options.MsgType==='voice'){
        options.MsgType='text'
        if(options.Recognition='前端'){
            content='前端内容'
        }else{
            content='你说的不是口令'
        }
        options.content=content
    }
    else if(options.MsgType==='video'&& options.MsgType==='shortvideo'){
        options.MsgType='text'
        content='暂不支持回复这种消息'
        options.content=content
    }
    else if(options.MsgType==='location'){
        options.MsgType='text'
        content= `位置信息:${options.Label},纬度:${options.Location_X},经度:${options.Location_Y}}`
        options.content=content
    }
    else if (options.Event ==='CLICK'){
        content=`点击了按钮:${options.EventKey}`
    }
    // 接受事件推送
    else if(options.MsgType==='event'){
        //订阅推送
        if(options.Event==='subscribe'){
            // 回复普通文字消息
            options.MsgType='text'
            content= `欢迎你订阅本公众号，更多跟多内容等你探究`
            options.content=content
            // 回复图文消息
        }
        // 推定推送
        else if(options.Event==='unsubscribe'){
            // 回复普通文字消息，都关闭了发了个寂寞
            // options.MsgType='text'
            // content= `你真的要取消关注本公众号号码？`
            // options.content=content
            // 记录取关者的id
            // JSONOpenId={
            //     openid:options.FromUserName
            // }
            // aa=[]
            // fs.readFileSync('./static/open_id.txt',(err,data)=>{
            //     if(!err){
            //         console.log(data);
            //         aa=JSON.parse(data)
            //     }
            // })

            
            // aa.push(JSONOpenId)
            // let obj = {};
            // arr = aa.reduce((newArr, next) => {
            //     obj[next.openid] ? "" : (obj[next.openid] = true && newArr.push(next));
            //     return newArr;
            // }, []);

            // arr=JSON.stringify(arr)
            // console.log(arr);
            // fs.appendFileSync('./static/open_id.txt',arr,err=>{
            //     if(!err){
            //         console.log('成功');
            //     }else{
            //         console.log('失败');
            //     }
            // })
        }
    }
    return options
}