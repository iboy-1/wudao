
import axios from "@/aixos.js"
const Qs = require('qs');
var api = {
    queryGreetings(val){
        return axios.get("/customerservice/v1/ReplyMessage/queryGreetings",{ params:{...val} })
    },
    addGreetings(val){
        return axios.post("/customerservice/v1/ReplyMessage/addGreetings",Qs.stringify({ ...val }))
    },
    setGreetingDisable(val){
        return axios.post("/customerservice/v1/ReplyMessage/setGreetingDisable",Qs.stringify({ ...val }))
    },
    setGreetingDefault(val){
        return axios.post("/customerservice/v1/ReplyMessage/setGreetingDefault",Qs.stringify({ ...val }))
    },
    updateGreetings(val){
        return axios.post("/customerservice/v1/ReplyMessage/updateGreetings",Qs.stringify({ ...val }))
    },
    deleteGreetings(val){
        return axios.post("/customerservice/v1/ReplyMessage/deleteGreetings",Qs.stringify({ ...val }))
    },
    queryQuickReplyGroup(val){
        return axios.get("/customerservice/v1/ReplyMessage/queryQuickReplyGroup",{ params:{...val} })
    },
    addQuickReplyGroup(val){
        return axios.post("/customerservice/v1/ReplyMessage/addQuickReplyGroup",Qs.stringify({ ...val }))
    },
    updateQuickReplyGroup(val){
        return axios.post("/customerservice/v1/ReplyMessage/updateQuickReplyGroup",Qs.stringify({ ...val }))
    },
    deleteQuickReplyGroup(val){
        return axios.post("/customerservice/v1/ReplyMessage/deleteQuickReplyGroup",Qs.stringify({ ...val }))
    },
    queryQuickReplyContentsByGroupId(val){
        return axios.get("/customerservice/v1/ReplyMessage/queryQuickReplyContentsByGroupId",{ params:{...val} })
    },
    addQuickReplyContents(val){
        return axios.post("/customerservice/v1/ReplyMessage/addQuickReplyContents",Qs.stringify({ ...val }))
    },
    updateQuickReplyContents(val){
        return axios.post("/customerservice/v1/ReplyMessage/updateQuickReplyContents",Qs.stringify({ ...val }))
    },
    deleteQuickReplyContents(val){
        return axios.post("/customerservice/v1/ReplyMessage/deleteQuickReplyContents",Qs.stringify({ ...val }))
    },
    getQuickReplyContentsToIM(val){
        return axios.get("/customerservice/v1/ReplyMessage/getQuickReplyContentsToIM",{ params:{...val} })
    },
}
export default api;
