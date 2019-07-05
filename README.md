# 一指香飞 自述文件 ( markdown格式)
***************************************
`新闻发布`，是有uni-app开发的一个掌上点餐系统。也称`news-publish`。
#### 安卓手机app已经打包发布在百度网盘,欢迎下载安装体验。
```

发布新闻，添加图片，图片批量压缩，新闻列表，新闻详情，新闻评论

[git源码下载地址](链接：https://github.com/tanyichen/uni-app-news-publish.git)
```

#### 测试通过：
```
1、安卓；
3、微信小程序；
5、h5；

```
#### 使用说明
1. 下载编辑器HBuilderX.
2. 下载微信开发者工具.
3. 点击HBuilderX顶部菜单->文件->导入->从git导入.
4. 鼠标点击App.vue获取焦点,无需打开文件.
5. 点击HBuilderX编辑器顶部菜单->运行->运行到小程序模拟器.
6. 如果启动不了微信开发者工具，请手动启动微信开发者工具，手动添加项目(项目路径为unpackage/dev/mp-weixin)
7. 打包:
7.1 打包app：点击HBuilderX顶部导航->发行->原生APP云打包.
7.2 打包微信小程序：把项目路径unpackage/dev/mp-weixin文件夹拷贝出来即可。
#### 打包前注意
```
页面路径配置文件 pages.json内"condition"节点是用来调试的。current=0,代表当前启动首页是(list 节点下的的索引项);
发表项目一定要删除condition节点
```
## 特点
1. 一套代码多端通用
   支持编译封装成h5app安卓端/苹果端,微信小程序等终端运行程序。
2. 组件开发模式，复用性强
   采用mvvm组件开发模式，只要了解过vue和微信小程序的编程模式，即可看懂程序代码。
## 目录结构
```
┌─components            uni-app组件目录
│	│─uni-load-more				加载
│	│	└─uni-load-more		    加载圈
│	│─uni-media-list			     图文列表
│	│	└─uni-media-list				图文列表
│	└─template			 可复用的模板组件目录
│		│─comments				评论目录
│		│	└─comments		评论模板
│		│─image			图片模板目录
│		│	│─choose        选择图片
│		│	│─compress      压缩图片
│		│	└─cut		    可视化裁剪图片
├─common				可复用公共工具插件类
│	│─uni.css			uni-app官方默认css
│	│─uni.js			uni-app官方默认js
│	└─yc_js				yichen的公共js工具插件目录
│		│─Base64.js		base64编码转换工具
│		│─Id.js		    id生成
│		│─Img.js		图片处理
│		│─index.js		入口
│		│─Json.js		json处理转换
│		│─Md5.js			Md5编码转换工具
│		│─Obj.js			数组对象处理
│		│─Storage.js		Storage缓存工具
│		│─Time.js			时间格式转换处理工具
│		│─Url.js			Url地址处理工具
│		└─Validate.js		input输入验证器
│     
├─request               AJAX请求封装
│	├─data				模拟请求所需的数据目录，实际开发中，请删除。
│	│	│─xxx.js			模拟数据
│	│	└─xxx.js			…………
│	└─AJAX.js			AJAX请求封装
│    
├─store     vuex
│	├─goods.js			商户商品购物车处理
│	│─index.js          vuex主入口封装
│	│—win.js		    窗口宽高元素处理
│	└─store.js        	登陆状态 用户信息处理
│ 
├─platforms             存放各平台专用页面的目录，[详见](https://uniapp.dcloud.io/platform)
│     
├─pages                 业务页面文件存放的目录
│	│─news				消息对话
│	│	│─detail.vue         详情
│	│	│—list.vue		    列表
│	│	└─order.vue         订单消息
│     
├─static                存放应用引用静态资源（如图片、视频等）的地方，注意：静态资源只能存放于此
│	├─image				图片目录
│	│	└─xxx.jpg			图片
│	└─audio				媒体目录
│		└─xxx.mp3    		音频
│     
├─main.js               Vue初始化入口文件
│     
├─App.vue               应用配置，用来配置App全局样式以及监听 应用生命周期
│     
├─manifest.json         配置应用名称、appid、logo、版本等打包信息，详见
│     
└─pages.json            配置页面路由、导航条、选项卡等页面类信息，详见
```

#### 参与贡献

#### 项目创建人
tanyichen

## 结语
我们非常确定，`uni-app-news-publish`将帮助移动端开发人员大幅提升开发效率。
希望您也能加入到`uni-app`程序的开发中来
技术交流QQ群：714566447
