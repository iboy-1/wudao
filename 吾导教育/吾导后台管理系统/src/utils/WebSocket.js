export function initWebpack(){//初始化websocket
  const wsuri = 'ws://111.230.210.179:8282' 
  this.$root.websock = new WebSocket(wsuri);//这里面的this都指向vue
  // console.log(this.$root.websock)
  this.$root.websock.onopen = websocketopen;
  this.$root.websock.onmessage = websocketonmessage;
  this.$root.websock.onclose = websocketclose;
  this.$root.websock.onerror = websocketerror; 
}
function websocketopen(){//打开
  console.log("WebSocket连接成功")
} 


function websocketonmessage(e){ //数据接收
  console.log("WebSocket接受到数据")
  if(sessionStorage.getItem('number')==undefined){
    this.number = 1  
    //存session
    resetSetItem('number',this.number);
  }else if(sessionStorage.getItem('number')){ 
    var num = parseInt(sessionStorage.getItem('number'))
    num+=1
    //存session
    resetSetItem('number',num);
  }

}
function websocketclose(){  //关闭
  console.log("WebSocket关闭");
  // initWebpack(this.token)
}
 function websocketerror(){  //失败
  console.log("WebSocket连接失败");
}
export function close(){
  this.$root.websock.close()//关闭websocket
  this.$root.websock.onclose=function(e){
    console.log(e)//监听关闭事件
    console.log('关闭') 
  }
}