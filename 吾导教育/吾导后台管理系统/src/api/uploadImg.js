import axios from "@/aixos.js"
const Qs = require('qs');
var api = {
    getToken(val){
        return axios.get("/admin/v1/Qiniuload/uploadToken",{ params:{...val} })
    },
    delPho(val){
    	return axios.get("/admin/v1/Qiniuload/delete",{ params:{...val} })
    },
    uploadPho(val){
    	return axios.get("/admin/v1/Qiniuload/upImage",{ params:{...val} })
    },
    upVideo(val){
    	return axios.post("/admin/v1/Qiniuload/upVideo",{ params:{...val} })
    },
    // upload(val){
    // 	return axios.get("/feedback/v1/Home/upload",{ params:{...val} })
    // },
    upload(val){
        return axios.post("/feedback/v1/Home/upload",Qs.stringify({ ...val }))
    },
    upfile(val){
        return axios.post("/feedback/v1/Home/upfile",Qs.stringify({ ...val }))
    },
}
export default api;

