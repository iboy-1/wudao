import { apiWeChatAppShare } from '@/api/user.js'
var list = []
apiWeChatAppShare({}).success(res=>{
	list = res.data
})
export default{
    data(){
        return {
                       //设置默认的分享参数
            share:{
                title:'空地联运，一键畅行',
                path:'',
                imageUrl:'',
                desc:'',
                content:''
            }
        }
    },
    onShareAppMessage(res) {
		let index = Math.floor(Math.random() * list.length)
        return {
            title:list[index].title,
            path:this.share.path,
            imageUrl:list[index].urlPath,
            desc:this.share.desc,
            content:this.share.content,
            success(res){
                uni.showToast({
                    title:'分享成功'
                })
            },
            fail(res){
                uni.showToast({
                    title:'分享失败',
                    icon:'none'
                })
            }
        }
    }
}