
import axios from "@/aixos.js"
const Qs = require('qs');
var api = {
    query(val){
        return axios.get("/user/v1/Admin/userList",{ params:{...val} })
    },
    add(val){
        return axios.post("/member/v1/Admin/addCourse",Qs.stringify({ ...val }))
    },
    update(val){
        return axios.post("/member/v1/Admin/updateCourse",Qs.stringify({ ...val }))
    },
    delete(val){
        return axios.post("/member/v1/Admin/deleteCourse",Qs.stringify({ ...val }))
    },
    //购买会员卡记录
    getUserCard(val){
        return axios.get("/user/v1/Admin/getUserCard",{ params:{...val} })
        // return axios.post("/user/v1/Admin/getUserCard",Qs.stringify({ ...val }))
    },
    //约课记录
    getUserMark(val){
        return axios.get("/user/v1/Admin/getUserMark",{ params:{...val} })
        // return axios.post("/user/v1/Admin/getUserMark",Qs.stringify({ ...val }))
    },
    //出卡记录
    cardChangeListUser(val){
        return axios.get("/member/v1/Admin/cardChangeListUser",{ params:{...val} })
        // return axios.post("/user/v1/Admin/getUserMark",Qs.stringify({ ...val }))
    },
}
export default api;
