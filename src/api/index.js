import axios from 'axios'

const baseURL = 'http://localhost:8888/api/private/v1/'
axios.defaults.baseURL = baseURL

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 将token给予Authorization发给后台进行验证
    let token = localStorage.getItem('mytoken');
    if(token){
        config.headers['Authorization'] = token;
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });


//登录验证
export const checkUser = param => {
    return axios.post('login',param).then(res => res.data);
};

// 请求用户数据列表
export const getUserList = param => {
    return axios.get('users',param).then(res => res.data);
};