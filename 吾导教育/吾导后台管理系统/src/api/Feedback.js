
import axios from "@/aixos.js"
const Qs = require('qs');
var api = {
    feedback(val){
        return axios.get("/feedback/v1/FeedbackContent/feedback",{ params:{...val} })
    },
    add(val){
        return axios.post("/member/v1/Admin/addCard",Qs.stringify({ ...val }))
    },
    updateFeedback(val){
        return axios.post("/feedback/v1/FeedbackContent/updateFeedback",Qs.stringify({ ...val }))
    },
    delete(val){
        return axios.post("/member/v1/Admin/deleteCard",Qs.stringify({ ...val }))
    },
}
export default api;
