// 自定义采购
module.exports={
    "button":[
        {
            "name":"领券中心",
            "sub_button":[
                {	
                    "type":"view",
                    "name":"淘宝领券中心",
                    "url":"https://ai.m.taobao.com/"
                    
                },
                {
                    "type":"view",
                    "name":"京东领券中心",
                    "url":"https://a.jd.com/"
                },
                {
                    "type":"view",
                    "name":"饿了么",
                    "url":"https://h5.ele.me"
                },
                
                {
                    "type":"view",
                    "name":"网易严选抄底",
                    "url":"https://act.you.163.com/act/pub/ssr/x3o4kGIbPc08.html?appConfig=1_1_1"
                },
            ]
        },
          {
            "name": "产品价格对比", 
            "sub_button": [
                {
                    "type": "pic_sysphoto", 
                    "name": "系统拍照发图", 
                    "key": "rselfmenu_1_0", 
                 }, 
                {
                    "type": "pic_photo_or_album", 
                    "name": "拍照或者相册发图", 
                    "key": "rselfmenu_1_1", 
                }, 
                {
                    "type": "pic_weixin", 
                    "name": "微信相册发图", 
                    "key": "rselfmenu_1_2", 
                },
                {
                    "name": "发送位置", 
                    "type": "location_select", 
                    "key": "rselfmenu_2_0"
                },
                // {
                //     "type": "view_limited", 
                //     "name": "图文消息", 
                //     "media_id": "MEDIA_ID2"
                //  },
            ]
        },
        {	
            "type":"click",
            "name":"产品价格对比",
            "key":""
        },

    ]
}