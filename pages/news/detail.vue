<template>
    <view>
        <view class="banner">
            <image mode="aspectFill" class="banner-img" :src="banner.image_url"></image>
            <view class="banner-title">{{banner.title}}</view>
        </view>
        <view class="article-meta">
            <text class="article-author">{{banner.nickname}}</text>
            <text class="article-text">发表于</text>
            <text class="article-time">{{banner.datetime}}</text>
        </view>

        <view class="article-content">
            <rich-text :nodes="content"></rich-text>
        </view>
        <view class="" style="padding: 30upx;">
            <image v-for="(img,idx) in banner.news_image" :key="idx" mode="aspectFill" class="banner-img" :src="img.src"></image>
        </view>
        <view class="comment-wrap"></view>
        <comments :comments="comments"></comments>
    </view>
</template>

<script>
    const FAIL_CONTENT = '<p>获取信息失败</p>';
    import Request from '../../request/index.js'
    import comments from "../../components/template/comments/comments.vue"
    import {
        Time
    } from '../../common/yc_js/index.js';
    export default {
        components: {
            comments
        },
        data() {
            return {
                banner: {},
                content: '',
                comments: [{
                    src: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
                    name: '小明',
                    content: '抢个沙发',
                    time: '12/5 11:23',
                    reply: null
                }, {
                    src: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
                    name: '小刚',
                    content: '还是你快呀',
                    time: '12/5 11:23',
                    reply: [{
                        src: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
                        name: '小明',
                        content: '再抢个沙发',
                        time: '12/5 11:23',
                        reply: []
                    }, {
                        src: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
                        name: '小刚',
                        content: '还是你快呀',
                        time: '12/5 11:23',
                        reply: []
                    }]
                }, {
                    src: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
                    name: '小溜溜',
                    content: '晚了一步。被你们抢先了',
                    time: '12/5 11:23',
                    reply: [{
                        src: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
                        name: '小明',
                        content: '抢个小沙发',
                        time: '12/5 11:23',
                        reply: []
                    }, {
                        src: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
                        name: '小刚',
                        content: '还是你快呀，又没抢到',
                        time: '12/5 11:23',
                        reply: []
                    }]
                }]
            }
        },
        onShareAppMessage() {
            return {
                title: this.banner.title,
                path: '/pages/detail/detail?query=' + JSON.stringify(this.banner)
            }
        },
        onLoad(event) {
            // 目前在某些平台参数会被主动 decode，暂时这样处理。
            try {
                this.banner = JSON.parse(decodeURIComponent(event.query));
            } catch (error) {
                this.banner = JSON.parse(event.query);
            }
            console.log(this.banner)
            this.getDetail(this.banner.id);
            uni.setNavigationBarTitle({
                title: this.banner.title
            });
        },
        methods: {
            getDetail(id) {
                Request('News_detail', {
                    data: {
                        id
                    },
                    // responseType: 'arraybuffer',
                }).then(result => {
                    console.log(JSON.stringify(result))
                    if (result.statusCode == 200) {
                        var data = result.data.data || {};
                        var imgs = data.news_image || [];
                        imgs = imgs.map(e => {
                            return {

                                src: this.$config.getFileUrl(e.src) + "",

                                // comment_count: news.comment,
                            };
                        })
                        console.log(imgs)
                        this.banner.news_image = imgs || [];
                        this.content = data.content;
                        // return {
                        //     id: news.id,
                        //     article_type: 1,
                        //     datetime: Time.dateTimeformat(news.create_time, "mm-dd hh:MM"),
                        //     // datetime: friendlyDate(new Date(news.published_at.replace(/\-/g, '/')).getTime()),
                        //     title: news.title + " | " + news.abstract,
                        //     image_url: this.$config.getFileUrl(news.image) + "",
                        //     // image_url:this.$config.getFileUrl(news.image)+"@min",
                        //     // image_url: news.cover,
                        //     source: news.author_name,
                        //     comment_count: news.comment,
                        //     post_id: news.post_id
                        // };



                    } else {
                        this.loadingText = '没有更多数据';
                        this.refreshing = false;
                    }
                })
            }
        }
    }
</script>

<style>
    .banner {
        height: 360upx;
        overflow: hidden;
        position: relative;
        background-color: #ccc;
    }

    .banner-img {
        width: 100%;
    }

    .banner-title {

        max-height: 84upx;
        overflow: hidden;
        position: absolute;
        left: 30upx;
        bottom: 30upx;
        width: 90%;
        font-size: 32upx;
        font-weight: 400;
        line-height: 42upx;
        color: white;
        z-index: 11;
    }

    .article-meta {
        line-height: 50upx;
        padding: 20upx 40upx;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        color: gray;
    }

    .article-text {
        font-size: 26upx;
        /* line-height: 50upx; */
        margin: 0 20upx;
    }

    .article-author,
    .article-time {
        font-size: 26upx;
    }

    .article-content {
        padding: 0 30upx;
        overflow: hidden;
        font-size: 30upx;
        margin-bottom: 30upx;
    }
</style>
