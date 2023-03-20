
import axios from "@/aixos.js"
const Qs = require('qs');
var api = {
    getAllRote(val){
        return axios.get("/user/v1/Admin/getAllRote",{ params:{...val} })
        // return axios.post("/user/v1/Admin/getAllRote", Qs.stringify({ ...val }))
    },
    login(val){
        return axios.post("/user/v1/Admin/login",Qs.stringify({ ...val }))
    },
    addRote(val){
        return axios.post("/user/v1/Admin/addRote", Qs.stringify({ ...val }))
    },
    updateRote(val){
        return axios.post("/user/v1/Admin/updateRote", Qs.stringify({ ...val }))
    },
    getAllUser1(val){
        return axios.get("/user/v1/Admin/getAllUser",{ params:{...val} })
        // return axios.post("/user/v1/Admin/getAllUser", Qs.stringify({ ...val }))
    },
    register(val){
        return axios.post("/user/v1/Admin/register", Qs.stringify({ ...val }))
    },
    updateUser(val){
        return axios.post("/user/v1/Admin/updateUser", Qs.stringify({ ...val }))
    },
    deleaccount(val){
        return axios.post("/user/v1/Admin/deleaccount", Qs.stringify({ ...val }))
    },
    getAllPower(val){
        return axios.get("/user/v1/Admin/getAllPower",{ params:{...val} })
        // return axios.post("/user/v1/Admin/getAllPower", Qs.stringify({ ...val }))
    },
    addPower(val){
        return axios.post("/user/v1/Admin/addPower", Qs.stringify({ ...val }))
    },
    updatePower(val){
        return axios.post("/user/v1/Admin/updatePower", Qs.stringify({ ...val }))
    },
    queryRecord(val){
        return axios.get("ljairport/v1/Journal/queryRecord",{ params:{...val} })
    },
    changeCloseOrderState(val){
        return axios.post("/ljapi/v1/Admin/changeCloseOrderState", Qs.stringify({ ...val }))
    },
    changeCloseSystem(val){
        return axios.post("/ljapi/v1/Admin/changeCloseSystem", Qs.stringify({ ...val }))
    },
    queryState(val){
        return axios.get("/ljapi/v1/Admin/queryState",{ params:{...val} })
    },
    AxbModeUnbundlingTest(val){
        return axios.get("/ljapi/v1/Debug/AxbModeUnbundlingTest",{ params:{...val} })
    },
    //部门权限
    getBranch(val){
        return axios.get("/power/v1/Admin/getBranch",{ params:{...val} })
    },
    addBranch(val){
        return axios.post("/power/v1/Admin/addBranch", Qs.stringify({ ...val }))
    },
    editBranch(val){
        return axios.post("/power/v1/Admin/editBranch", Qs.stringify({ ...val }))
    },
    delBranch(val){
        return axios.post("/power/v1/Admin/delBranch", Qs.stringify({ ...val }))
    },
    //部门人员权限
    getAllMenu(val){
        return axios.get("/power/v1/Admin/getAllMenu",{ params:{...val} })
    },
    getAllUser(val){
        return axios.get("/power/v1/Admin/getAllUser",{ params:{...val} })
    },
    getUserAdmin(val){
        return axios.get("/power/v1/Admin/getUserAdmin",{ params:{...val} })
    },
    editUserAdmin(val){
        return axios.post("/power/v1/Admin/editUserAdmin", Qs.stringify({ ...val }))
    },
    addUserAdmin(val){
        return axios.post("/power/v1/Admin/addUserAdmin", Qs.stringify({ ...val }))
    },
    delUserAdmin(val){
        return axios.post("/power/v1/Admin/delUserAdmin", Qs.stringify({ ...val }))
    },
    //模块
    getMenu(val){
        return axios.get("/power/v1/Admin/getMenu",{ params:{...val} })
    },
    addMenu(val){
        return axios.post("/power/v1/Admin/addMenu", Qs.stringify({ ...val }))
    },
    editMenu(val){
        return axios.post("/power/v1/Admin/editMenu", Qs.stringify({ ...val }))
    },
    delMenu(val){
        return axios.post("/power/v1/Admin/delMenu", Qs.stringify({ ...val }))
    },
    // 子列表
    getElement(val){
        return axios.get("/power/v1/Admin/getElement",{ params:{...val} })
    },
    addElement(val){
        return axios.post("/power/v1/Admin/addElement", Qs.stringify({ ...val }))
    },
    editElement(val){
        return axios.post("/power/v1/Admin/editElement", Qs.stringify({ ...val }))
    },
    delElement(val){
        return axios.post("/power/v1/Admin/delElement", Qs.stringify({ ...val }))
    },
    // 元素
    getButton(val){
        return axios.get("/power/v1/Admin/getButton",{ params:{...val} })
    },
    addButton(val){
        return axios.post("/power/v1/Admin/addButton", Qs.stringify({ ...val }))
    },
    editButton(val){
        return axios.post("/power/v1/Admin/editButton", Qs.stringify({ ...val }))
    },
    delButton(val){
        return axios.post("/power/v1/Admin/delButton", Qs.stringify({ ...val }))
    },
}
export default api;
