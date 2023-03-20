
import axios from "@/aixos.js"
const Qs = require('qs');
var api = {
    queryGreetings(val){
        return axios.get("/customerservice/v1/ReplyMessage/queryGreetings",{ params:{...val} })
    },
    login(val){
        return axios.post("/customerservice/v1/Login/login",Qs.stringify({ ...val }))
    },
}
export default api;
