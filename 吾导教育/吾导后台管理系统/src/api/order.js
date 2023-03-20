
import axios from "@/aixos.js"
const Qs = require('qs');
var api = {
    query(val){
        return axios.get("/order/v1/Admin/orderList",{ params:{...val} })
    },
    // markCourseUserList(val){
    //     return axios.get("/member/v1/Admin/markCourseUserList",{ params:{...val} })
    // },
    // markCourseSign(val){
    //     return axios.post("/member/v1/Admin/markCourseSign",Qs.stringify({ ...val }))
    // },
}
export default api;
