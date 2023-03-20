
import axios from "@/aixos.js"
const Qs = require('qs');
var api = {
    query(val){
        return axios.get("/member/v1/Admin/query",{ params:{...val} })
    },
    add(val){
        return axios.post("/member/v1/Admin/add",Qs.stringify({ ...val }))
    },
    update(val){
        return axios.post("/member/v1/Admin/update",Qs.stringify({ ...val }))
    },
    delete(val){
        return axios.post("/member/v1/Admin/delete",Qs.stringify({ ...val }))
    },
}
export default api;
