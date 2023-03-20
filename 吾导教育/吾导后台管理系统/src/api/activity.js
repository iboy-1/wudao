
import axios from "@/aixos.js"
const Qs = require('qs');
var api = {
    queryActivity(val){
        return axios.get("/activity/v1/Admin/queryActivity",{ params:{...val} })
    },
    queryActivityUser(val){
        return axios.get("/activity/v1/Admin/queryActivityUser",{ params:{...val} })
    },
    addActivity(val){
        return axios.post("/activity/v1/Admin/addActivity",Qs.stringify({ ...val }))
    },
    deleteActivity(val){
        return axios.post("/activity/v1/Admin/deleteActivity",Qs.stringify({ ...val }))
    },
    updateActivity(val){
        return axios.post("/activity/v1/Admin/updateActivity",Qs.stringify({ ...val }))
    },

    queryActivityHaggle(val){
        return axios.get("/activity/v1/Admin/queryActivityHaggle",{ params:{...val} })
    },
    addActivityHaggle(val){
        return axios.post("/activity/v1/Admin/addActivityHaggle",Qs.stringify({ ...val }))
    },
    deleteActivityHaggle(val){
        return axios.post("/activity/v1/Admin/deleteActivityHaggle",Qs.stringify({ ...val }))
    },
    updateActivityHaggle(val){
        return axios.post("/activity/v1/Admin/updateActivityHaggle",Qs.stringify({ ...val }))
    },
}
export default api;
