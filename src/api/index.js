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
export const checkUser = params => {
    return axios.post('login',params).then(res => res.data);
};

// 请求用户数据列表
export const getUserList = params => {
    return axios.get('users',params).then(res => res.data);
};

// 更改用户状态
export const changeUserState = params => {
    return axios.put(`users/${params.uid}/state/${params.type}`).then(res => res.data);  //es6字符串拼接   相当于===》"users/"+params.id+"/state/"+params.type
}

// 添加用户
export const addUser = params =>{
    return axios.post('users',params).then(res => res.data);
}