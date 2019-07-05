<template>
    <view>
        <view class="uni-padding-wrap">
            <view class="">
                {{title}}
            </view>
            <!-- 评论区 start -->
            <view class="uni-comment">
                <view class="uni-comment-list" v-for="(item,idx) in comments" :key="idx">
                    <view class="uni-comment-face">
                        <image :src="item.src" mode="widthFix"></image>
                    </view>
                    <view class="uni-comment-body">
                        <view class="uni-comment-top">
                            <text>{{item.name}}</text>
                        </view>
                        <view class="uni-comment-content">{{item.content}}</view>
                        <view class="uni-comment-date">
                            <view>{{item.time}}</view>
                            <view @tap="tapReply(item,idx)" v-if="item.reply && item.reply.length" class="uni-comment-replay-btn">{{item.reply.length}}回复</view>
                        </view>
                        <view v-if="idx==index" class="uni-comment-list" v-for="(item2,idx2) in item.reply" :key="idx2">
                            <view class="uni-comment-face">
                                <image :src="item2.src" mode="widthFix"></image>
                            </view>
                            <view class="uni-comment-body">
                                <view class="uni-comment-top">
                                    <text>{{item2.name}}</text>
                                </view>
                                <view class="uni-comment-content">{{item2.content}}</view>
                                <view class="uni-comment-date">
                                    <view>{{item2.time}}</view>

                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <!-- 评论区 end -->
        </view>
    </view>
</template>

<script>
    export default {
        props: {
            comments: {
                type: Array,
                default: function() {
                    return [{
                        src: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
                        name: '小明',
                        content: '抢个沙发',
                        time: '12/5 11:23',
                        reply: []
                    }]
                }
            }
        },
        data() {
            return {
                title: "评论",
                index: 0
            }
        },
        methods: {
            tapReply(e, idx) {
                if (this.index != idx) {
                    this.index = idx
                    // console.log(e)
                }else{
                    this.index=null
                }
            }
        }
    }
</script>

<style>
    .uni-comment-list {

        /*    background:rgba(0,0,0,0.1);
    padding:0 10upx; */
    }

    .uni-comment-body {
        background: rgb(240, 240, 240);
        padding: 0 10upx;
    }

    .uni-comment-face {
        background: #FFFFFF;
    }

    .uni-comment-content {
        /*    background: #EEEEEE;
    padding:0 10upx; */
    }
</style>
