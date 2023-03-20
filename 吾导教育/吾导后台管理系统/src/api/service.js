
import axios from "@/aixos.js"
const Qs = require('qs');
var api = {
    queryKeFuRenYuan(val){
        return axios.get("/customerservice/v1/KeFuManage/queryKeFuRenYuan",{ params:{...val} })
    },
    queryKeFuGroups(val){
        return axios.get("/customerservice/v1/KeFuManage/queryKeFuGroups",{ params:{...val} })
    },
    getAllPower(val){
        return axios.get("/customerservice/v1/Login/getAllPower",{ params:{...val} })
    },
    addKeFuRenYuan(val){
        return axios.post("/customerservice/v1/KeFuManage/addKeFuRenYuan",Qs.stringify({ ...val }))
    },
    updateKeFuRenYuan(val){
        return axios.post("/customerservice/v1/KeFuManage/updateKeFuRenYuan",Qs.stringify({ ...val }))
    },
    changeKfPass(val){
        return axios.post("/customerservice/v1/KeFuManage/changeKfPass",Qs.stringify({ ...val }))
    },
    deleteKeFuRenYuan(val){
        return axios.post("/customerservice/v1/KeFuManage/deleteKeFuRenYuan",Qs.stringify({ ...val }))
    },
    addKeFuGroups(val){
        return axios.post("/customerservice/v1/KeFuManage/addKeFuGroups",Qs.stringify({ ...val }))
    },
    updateKeFuGroups(val){
        return axios.post("/customerservice/v1/KeFuManage/updateKeFuGroups",Qs.stringify({ ...val }))
    },
    deleteKeFuGroups(val){
        return axios.post("/customerservice/v1/KeFuManage/deleteKeFuGroups",Qs.stringify({ ...val }))
    },
    addPower(val){
        return axios.post("/customerservice/v1/Login/addPower",Qs.stringify({ ...val }))
    },
    updatePower(val){
        return axios.post("/customerservice/v1/Login/updatePower",Qs.stringify({ ...val }))
    },
}
export default api;
