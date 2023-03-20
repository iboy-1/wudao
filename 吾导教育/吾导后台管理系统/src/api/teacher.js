
import axios from "@/aixos.js"
const Qs = require('qs');
var api = {
    query(val){
        return axios.get("/teacher/v1/Admin/query",{ params:{...val} })
    },
    getTeacher(val){
        return axios.get("/teacher/v1/Admin/getTeacher",{ params:{...val} })
    },
    add(val){
        return axios.post("/teacher/v1/Admin/add",Qs.stringify({ ...val }))
    },
    update(val){
        return axios.post("/teacher/v1/Admin/update",Qs.stringify({ ...val }))
    },
    delete(val){
        return axios.post("/teacher/v1/Admin/delete",Qs.stringify({ ...val }))
    },
    //轮播图
    queryImgs(val){
        return axios.get("/teacher/v1/Admin/queryImgs",{ params:{...val} })
    },
    addImgs(val){
        return axios.post("/teacher/v1/Admin/addImgs",Qs.stringify({ ...val }))
    },
    updateImgs(val){
        return axios.post("/teacher/v1/Admin/updateImgs",Qs.stringify({ ...val }))
    },
    deleteImgs(val){
        return axios.post("/teacher/v1/Admin/deleteImgs",Qs.stringify({ ...val }))
    },
    //评论列表
    commentList(val){
        return axios.get("/member/v1/Admin/commentList",{ params:{...val} })
    },
    commentReply(val){
        return axios.post("/member/v1/Admin/commentReply",Qs.stringify({ ...val }))
    },
    //钱包
    wallet(val){
        return axios.get("/teacher/v1/Admin/wallet",{ params:{...val} })
    },
    walletRecord(val){
        return axios.get("/teacher/v1/Admin/walletRecord",{ params:{...val} })
        // return axios.post("/teacher/v1/Admin/walletRecord",Qs.stringify({ ...val }))
    },
    withdrawList(val){
        return axios.get("/teacher/v1/Admin/withdrawList",{ params:{...val} })
    },
    withdraw(val){
        return axios.post("/teacher/v1/Admin/withdraw",Qs.stringify({ ...val }))
    },
    //提现列表
    withdrawalList(val){
        return axios.get("/member/v1/Admin/withdrawalList",{ params:{...val} })
    },
    applyWithdrawal(val){
        return axios.post("/member/v1/Admin/applyWithdrawal",Qs.stringify({ ...val }))
    },
    
}
export default api;
