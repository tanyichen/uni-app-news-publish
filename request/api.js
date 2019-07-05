import config from '../config/index.js'
var API = config.API;
var userAPI = config.userAPI;

export default {
    // 新闻列表
    News_list: {
        url: API + "/news/list",
        // url:"https://unidemo.dcloud.net.cn/api/news",
        // method: 'POST',
        data: {
            // access_token: true
        }
    },News_detail: {
        url: API + "/news/detail",
        data: {
            // access_token: true
        }
    }
  
}
