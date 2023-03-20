
import axios from "@/aixos.js"
const Qs = require('qs');
var api = {
    queryCommonProblemGroup(val){
        return axios.get("/customerservice/v1/ReplyMessage/queryCommonProblemGroup",{ params:{...val} })
    },
    addCommonProblemGroup(val){
        return axios.post("/customerservice/v1/ReplyMessage/addCommonProblemGroup",Qs.stringify({ ...val }))
    },
    updateCommonProblemGroup(val){
        return axios.post("/customerservice/v1/ReplyMessage/updateCommonProblemGroup",Qs.stringify({ ...val }))
    },
    deleteCommonProblemGroup(val){
        return axios.post("/customerservice/v1/ReplyMessage/deleteCommonProblemGroup",Qs.stringify({ ...val }))
    },
    queryCommonProblemContents(val){
        return axios.get("/customerservice/v1/ReplyMessage/queryCommonProblemContents",{ params:{...val} })
    },
    addCommonProblemContents(val){
        return axios.post("/customerservice/v1/ReplyMessage/addCommonProblemContents",Qs.stringify({ ...val }))
    },
    updateCommonProblemContents(val){
        return axios.post("/customerservice/v1/ReplyMessage/updateCommonProblemContents",Qs.stringify({ ...val }))
    },
    deleteCommonProblemContents(val){
        return axios.post("/customerservice/v1/ReplyMessage/deleteCommonProblemContents",Qs.stringify({ ...val }))
    },
}
export default api;
