
import axios from "@/aixos.js"
const Qs = require('qs');
var api = {
    query(val){
        return axios.get("/member/v1/Admin/queryCourse",{ params:{...val} })
    },
    add(val){
        return axios.post("/member/v1/Admin/addCourse",Qs.stringify({ ...val }))
    },
    update(val){
        return axios.post("/member/v1/Admin/updateCourse",Qs.stringify({ ...val }))
    },
    delete(val){
        return axios.post("/member/v1/Admin/deleteCourse",Qs.stringify({ ...val }))
    },
    addCourseVideo(val){
        return axios.post("/member/v1/Admin/addCourseVideo",Qs.stringify({ ...val }))
    },
}
export default api;
