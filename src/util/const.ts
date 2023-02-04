let ApiHost = `https://pure360-api.pure-international.com/api/v3/`
export const apiList = {
    //default forget password
    default_forget_pw:`${domainUrl.default}/passwordpage`,
    //cn forget password
    cn_forget_pw:`${domainUrl.cn}/passwordpage`,
    //获取地点
    view_region: ApiHost + 'view_region',
    //登录
    sign_in: ApiHost + 'login',
    //切换国外登录
    default_login: apiUrl.default + 'login',
    //切换国内登录
    cn_login: apiUrl.cn + 'login',
    //登出
    sign_out: ApiHost + 'logout',
    //获取场所
    get_location_list: ApiHost + 'view_location',
    //获取课程类型
    get_class_type: ApiHost + 'view_classtype',
    //获取老师列表
    get_teacher_list: ApiHost + 'view_teacher',
    //获取支柱
    get_pillar_list: ApiHost + 'view_pillar',
    //获取等级
    get_level_list: ApiHost + 'view_level',
    //获取所有课程
    get_schedule: ApiHost + 'view_schedule',
    //获取用户信息
    get_client_info: ApiHost + 'get_client_info',
    //设置用户信息
    // update_client_info: ApiHost + 'update_client_info',  // replace with update_client_setting
    update_client_setting: ApiHost + 'update_client_setting',
    //修改用户头像
    update_profile: ApiHost + 'update_profile',
    //预约课程
    booking: ApiHost + 'booking',
    //取消预约
    cancel_booking: ApiHost + 'cancel_booking',
    //我的预约
    view_booking_history: ApiHost + 'get_booking_history',
    //签到历史
    get_visit_history: ApiHost + 'get_visit_history',
    //取消预约记录
    get_cancel_history: ApiHost + 'get_cancel_history',
    //获取所有外部链接
    view_urls: ApiHost + 'view_urls',
    //场所通告
    get_location_notice: ApiHost + 'location_alert/active',
    //用户通告
    get_region_notice: ApiHost + 'notice/home',
    //获取服务计划
    get_my_purchase: ApiHost + 'view_my_purchase',
    //mood class
    get_class_mood: ApiHost + 'view_class_mood',
    // popup modal
    get_popup_modal: ApiHost + 'get_popup_modal',
    // favourite
    get_favourite_class_type: ApiHost + 'get_favourite_class_type',
    get_favourite_teacher: ApiHost + 'get_favourite_teacher',
    get_favourite_location: ApiHost + 'get_favourite_location',
    add_favourite: ApiHost + 'add_favourite',
    remove_favourite: ApiHost + 'remove_favourite',
    // get opening hour
    get_location_opening_hour: ApiHost + 'get_location_opening_hour',
};

export const configAxios = axios.create({
    baseURL: ApiHost,
    headers: {
        'Content-Type': 'application/json',
        'X-Date': timestamp,
        "X-Token": token
    },
    timeout: 60000
});

// 响应拦截
configAxios.interceptors.response.use(response => {
    return response;
}, (error) => {
    // 处理响应失败
    return Promise.reject({ code: error.request.status, msg: error.message });
});



export const requestHeader = {
    'X-Date': timestamp,
    "X-Token": token,
    "X-Features": CONSTANT.features.toString(),
};