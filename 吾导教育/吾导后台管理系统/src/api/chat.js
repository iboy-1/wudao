
import axios from "@/aixos.js"
const Qs = require('qs');
var api = {
    getKeFuFuUser(val){
        return axios.get("/customerservice/v1/KeFuManage/getKeFuFuUser",{ params:{...val} })
    },
    addGreetings(val){
        return axios.post("/customerservice/v1/ReplyMessage/addGreetings",Qs.stringify({ ...val }))
    },
    getUserInfo(val){
        return axios.get("/customerservice/v1/KeFuManage/getUserInfo",{ params:{...val} })
    },
    addUserExtend(val){
        return axios.post("/customerservice/v1/UserManage/addUserExtend",Qs.stringify({ ...val }))
    },
    getChatRecord(val){
        return axios.get("/customerservice/v1/ChatManage/getChatRecord",{ params:{...val} })
    },
}
export default api;
