
import axios from "@/aixos.js"
const Qs = require('qs');
var api = {
    addPoblemTitle(val){
        // return axios.post("/article/v1/Article/addPoblemTitle",Qs.stringify({ ...val }))
        return axios.get("/article/v1/Article/addPoblemTitle",{ params:{...val} })
    },
    updatePoblemTitle(val){
        // return axios.post("/article/v1/Article/updatePoblemTitle",Qs.stringify({ ...val }))
        return axios.get("/article/v1/Article/updatePoblemTitle",{ params:{...val} })
    },
    queryblemTitle(val){
        // return axios.post("/article/v1/Article/queryblemTitle",Qs.stringify({ ...val }))
        return axios.get("/article/v1/Article/queryblemTitle",{ params:{...val} })
    },
    deletePoblemTitle(val){
        // return axios.post("/article/v1/Article/deletePoblemTitle",Qs.stringify({ ...val }))
        return axios.get("/article/v1/Article/deletePoblemTitle",{ params:{...val} })
    },
    queryCommonProblemGroup(val){
        return axios.post("/article/v1/Article/queryCommonProblemGroup",Qs.stringify({ ...val }))
    },
    addCommonProblemGroup(val){
        return axios.post("/article/v1/Article/addCommonProblemGroup",Qs.stringify({ ...val }))
    },
    updateCommonProblemGroup(val){
        return axios.post("/article/v1/Article/updateCommonProblemGroup",Qs.stringify({ ...val }))
    },
    deleteCommonProblemGroup(val){
        return axios.post("/article/v1/Article/deleteCommonProblemGroup",Qs.stringify({ ...val }))
    },
    queryCommonProblemContents(val){
        return axios.post("/article/v1/Article/queryCommonProblemContents",Qs.stringify({ ...val }))
    },
    addCommonProblemContents(val){
        return axios.post("/article/v1/Article/addCommonProblemContents",Qs.stringify({ ...val }))
    },
    updateCommonProblemContents(val){
        return axios.post("/article/v1/Article/updateCommonProblemContents",Qs.stringify({ ...val }))
    },
    deleteCommonProblemContents(val){
        return axios.post("/article/v1/Article/deleteCommonProblemContents",Qs.stringify({ ...val }))
    },
}
export default api;
