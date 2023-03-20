import axios from 'axios'

// axios.defaults.baseURL ="https://keep.gxhxinfo.com/";
axios.defaults.baseURL ="https://wudao.gxhxinfo.com/";

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// response.setHeader("Access-Control-Allow-Origin", "*");
axios.interceptors.request.use(function (config) {

    config.params = {
        ...config.params,
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
}
)

export default axios;
