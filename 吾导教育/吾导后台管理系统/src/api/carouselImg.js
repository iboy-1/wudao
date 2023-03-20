
import axios from "@/aixos.js"
const Qs = require('qs');
var api = {
    query(val){
        return axios.get("/article/v1/Banner/queryBanner",{ params:{...val} })
    },
    add(val){
        return axios.post("/article/v1/Banner/addBanner",Qs.stringify({ ...val }))
    },
    update(val){
        return axios.post("/article/v1/Banner/updateBanner",Qs.stringify({ ...val }))
    },
    delete(val){
        return axios.post("/article/v1/Banner/deleteBanner",Qs.stringify({ ...val }))
    },
}
export default api;
