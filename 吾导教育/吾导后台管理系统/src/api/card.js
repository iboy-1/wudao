
import axios from "@/aixos.js"
const Qs = require('qs');
var api = {
    query(val){
        return axios.get("/member/v1/Admin/queryCard",{ params:{...val} })
    },
    add(val){
        return axios.post("/member/v1/Admin/addCard",Qs.stringify({ ...val }))
    },
    update(val){
        return axios.post("/member/v1/Admin/updateCard",Qs.stringify({ ...val }))
    },
    delete(val){
        return axios.post("/member/v1/Admin/deleteCard",Qs.stringify({ ...val }))
    },
    //添加会员卡课程
    addCardCrouse(val){
        return axios.post("/member/v1/Admin/addCardCrouse",Qs.stringify({ ...val }))
    },
    //转卡列表
    cardListTransfer(val){
        return axios.get("/member/v1/Admin/cardListTransfer",{ params:{...val} })
    },
    cardChangeList(val){
        return axios.get("/member/v1/Admin/cardChangeList",{ params:{...val} })
    },
    transferCard(val){
        return axios.post("/member/v1/Admin/transferCard",Qs.stringify({ ...val }))
    },
    cardChangeListUser(val){
        return axios.post("/member/v1/Admin/cardChangeListUser",Qs.stringify({ ...val }))
    },
}
export default api;
