
module.exports= (options)=>{
    let replyMessage=`<xml>
        <ToUserName><![CDATA[${options.FromUserName}]]></ToUserName>
        <FromUserName><![CDATA[${options.ToUserName}]]></FromUserName>
        <CreateTime>${options.createTime}</CreateTime>
        <MsgType><![CDATA[${options.MsgType}]]></MsgType>`
    if (options.MsgType=='text'){
        replyMessage+=`<Content><![CDATA[${options.content}]]></Content>`
    }
    else if(options.MsgType=='image'){
        replyMessage+=`<Image>
        <MediaId><![CDATA[${options.MediaId}]]></MediaId>
      </Image>`
    }
    else if(options.MsgType=='voice'){
        replyMessage+=`<Voice>
        <MediaId><![CDATA[${options.MediaId}]]></MediaId>
      </Voice>`
    }
    else if(options.MsgType=='video'){
        replyMessage+=`<Video>
        <MediaId><![CDATA[${options.MediaId}]]></MediaId>
        <Title><![CDATA[${options.Title}]]></Title>
        <Description><![CDATA[${options.Description}]]></Description>
      </Video>`
    }
    else if(options.MsgType=='music'){
        replyMessage+=`<Music>
        <Title><![CDATA[${options.TITLE}]]></Title>
        <Description><![CDATA[${options.DESCRIPTION}]]></Description>
        <MusicUrl><![CDATA[${options.MUSIC_Url}]]></MusicUrl>
        <HQMusicUrl><![CDATA[${options.HQ_MUSIC_Url}]]></HQMusicUrl>
        <ThumbMediaId><![CDATA[${options.MediaId}]]></ThumbMediaId>
      </Music>`
    }
    else if(options.MsgType=='news'){
        replyMessage+=`<ArticleCount>${options.content.lenth}</ArticleCount>
        <Articles>`
        options.content.forEach(i=>{
            replyMessage+=`<item>
            <Title><![CDATA[${i.title}]]></Title>
            <Description><![CDATA[${i.description}]]></Description>
            <PicUrl><![CDATA[${i.picurl}]]></PicUrl>
            <Url><![CDATA[${i.url}]]></Url>
          </item>`
        })
        replyMessage+=`</Articles>`
    }
    replyMessage+=`</xml>`
    return replyMessage
}

