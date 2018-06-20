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

// 根据id获取用户信息
export const getUserById = params =>{
    return axios.get(`users/${params}`).then(res => res.data);
}

// 编辑用户信息
export const editUser = params =>{
    return axios.put(`users/${params.id}`,params).then(res => res.data);
}

//删除用户信息
export const deleteUser = params => {
    return axios.delete(`users/${params}`).then(res => res.data);
}

//获取角色列表
export const getRoleList = params => {
    return axios.get('roles').then(res => res.data);
}

//分配角色
export const grantUserRole = params => {
    return axios.put(`users/${params.id}/role`,{id:params.id,rid:params.rid}).then(res => res.data);
}

// 获取权限列表
export const getJurisdictionList = params => {
    return axios.get(`rights/${params.type}`).then(res => res.data);
}

// 删除角色指定权限
export const deleteRoleJurisdiction = params => {
    return axios.delete(`roles/${params.roleId}/rights/${params.jurisdictionId}`).then(res => res.data);
}

//角色授权
export const grantRoleJurisdiction = params => {
    return axios.post(`roles/${params.roleId}/rights`,params.rids).then(res => res.data);
}

// 添加角色
export const addRole = params => {
    return axios.post('roles',params).then(res => res.data);
}

//删除角色
export const deleteRole = params => {
    return axios.delete(`roles/${params.id}`).then(res => res.data);
}

// 根据id获取角色信息
export const getRoleById = params => {
    return axios.get(`roles/${params.id}`).then(res => res.data);
}

//编辑角色
export const editRole = params => {
    return axios.put(`roles/${params.id}`,params).then(res => res.data);
}

// 获取左侧菜单权限
export const getMenus = ()=>{
    return axios.get('menus').then(res => res.data);
}

// 获取商品分类信息
export const getCategory = params => {
    return axios.get('categories',params).then(res => res.data);
}

// 添加分类
export const addCategory = params => {
    return axios.post('categories',params).then(res => res.data);
}

// 删除分类
export const deleteCategories = params => {
    return axios.delete(`categories/${params}`).then(res => res.data);
}

// 根据id获取分类信息
export const getCategoriesById = params => {
    return axios.get(`categories/${params}`).then(res => res.data);
}

// 编辑提交分类
export const editCategories = params => {
    return axios.put(`categories/${params.cat_id}`,params).then(res => res.data);
}

// 获取商品列表信息
export const getGoods = params => {
    return axios.get('goods',params).then(res => res.data);
}

// 获取报表testing（接口不清楚）
export const getReport = params => {
    return axios.get(`reports/${params.type}`).then(res => res.data);
}

// 获取订单列表
export const getOrders = params => {
    return axios.get('get',params).then(res.data);
}