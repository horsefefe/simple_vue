<template>
    <div class="regiser-container" id="reg-container" @click="handleClick">
        <div class="form-box" v-bind:class="[isActive ? 'active':'']">
            <div class="form">
                <inputitem :configObj="phone_number_obj" @validate="handleFormValidate" />
                <inputitem :configObj="password_obj" @validate="handleFormValidate" ref="input_password"/>
            </div>
            <protocolbox v-if="configObj.protocol" ref="protocolbox" @validate="handleFormValidate"></protocolbox>
            <a href="javascript:;" class="btn reg2" v-if="configObj.has_regist_btn" @click="handleSubmit">立即注册</a>
            <a href="javascript:;" class="btn down2" v-if="configObj.has_dw_btn">下载提现22</a>
        </div>
        <imgcode v-if="showImgcode"></imgcode>
    </div>
</template>
<script>
import imgcode from './imgcode';
import inputitem from './inputitem';
import protocolbox from './protocolbox';
export default {
    props: {
        configObj: {
            type: Object,
            default() {
                return {
                    protocol: true,
                    has_regist_btn: true,
                    has_dw_btn: true
                };
            }
        },
        validateObj: {
            type: Object,
            default() {
                return {
                    phone_number: {
                        isValidate: false
                    },
                    password: {
                        isValidate: false
                    },
                    protocolbox: {
                        isValidate: false
                    }
                };
            }
        }
    },
    data() {
        return {
            phone_number_obj: {
                type: 'phone_number'
            },
            password_obj: {
                type: 'password',
                title: '测试'
            },
            showImgcode: false,
            isActive: true
        };
    },
    component: {
        imgcode,
        inputitem,
        protocolbox
    },
    methods: {
        handleClick() {
            this.showImgcode = !this.showImgcode;
        },
        listenerWinSize() {
            window.addEventListener(
                'orientationchange' in window ? 'orientationchange' : 'resize',
                (function() {
                    function a() {
                        let a = document.documentElement;
                        let b = a.clientWidth || 640;
                        a.style.fontSize = 20 * (b / 320) > 40 ? '40px' : 20 * (b / 320) + 'px';
                    }

                    a();
                    return a;
                })(),
                !1
            );
        },
        handleFormValidate(type, is_validate) {
            if (is_validate && type === 'phone_number') {
                this.$refs.input_password.handleFocusPassword();
            }
            this.validateObj[type]['is_validate'] = is_validate;
        },
        handleSubmit() {
            let keys = Object.keys(this.validateObj);
            for (let i = 0; i < keys.length; i++) {
                let temp = this.validateObj[keys[i]];
                if (temp['isValidate'] === false) {
                    console.log(keys[i], '没有找到');
                    return false;
                }
            }
        }
    },
    mounted() {
        // 兼容ios下:active失效问题
        document.body.addEventListener('touchstart', function() {});
        this.listenerWinSize();
    }
};
</script>
<style lang="less">
@import '../../../commonStyle/lib/var.less';
#reg-container {
    background: #fff;
    min-height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    //overflow-y: auto;
    -webkit-overflow-scrolling: touch;
} // 通用表单注册页样式
// 注册页container , 页面平级元素采用定位的方式
.regiser-container {
    // 表单位置 container
    width: 100%;
    height: 100%;
    background: #d71a1d !important;
    .form-box {
        // 水平居中
        position: absolute;
        top: 14rem;
        left: 50%;
        -webkit-transform: translate(-50%, 0);
        transform: translate(-50%, 0);
        z-index: 2;
    }
    .form {
        width: 13rem;
        background: #fff;
        border-radius: 0.5rem;
        overflow: hidden;
    }
    .item {
        // 给iconfont定位用的
        position: relative;
        // 定制input的样式
        input {
            width: 92%;
            font-size: 0.65rem;
            display: block;
            padding: 0.65rem 0 0.65rem 1rem;
            border-radius: 0;
            border: none;
            -webkit-user-select: auto;
            -moz-user-select: auto;
            -ms-user-select: auto;
            user-select: auto;
            margin: 0 4%;
            border-bottom: 1px solid #dbdbdb;
            background-color: transparent;
        }
        &:last-child {
            input {
                border-bottom: none;
            }
        }
    }
    // 表单 icon 小图标
    .item:before {
        content: '';
        position: absolute;
        // 相对于container的位置
        left: 0.5rem;
        // 图标字体的颜色
        color: #f65c60;
        font-family: 'iconfont' !important;
        font-size: 0.8rem;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        top: 50%;
        transform: translate(0, -50%);
        -webkit-transform: translate(0, -50%);
        z-index: 1;
    }
    // 手机号
    .item.phone:before {
        content: '\\e6a8';
    }
    // 验证码
    .item.pwd:before {
        content: '\\e6a7';
    }
    // active的效果
    .item:active {
        background: rgba(0, 0, 0, 0.1);
    }
    // 注册协议弹窗
    .protocol {
        left: 0;
        top: 16.125rem;
        width: 100%;
        height: 1.2rem;
        line-height: 1.2rem;
        text-align: center;
        background-size: 100%;
        font-size: 0.45rem;
        span {
            color: #efefef;
            vertical-align: middle;
        }
    }
    // 注册按钮
    .btn {
        width: 13.075rem;
        height: 2.25rem;
        line-height: 2.25rem;
        text-align: center;
        overflow: hidden;
        display: block;
        margin: 1rem auto 0;
        font-size: 0.8rem;
        &:active {
            opacity: 0.7;
        }
    }
    .down2 {
        background: none;
        border: 1px solid #fff;
        color: #fff;
        font-weight: bold;
        margin-top: 0.5rem;
        box-shadow: none;
        border-radius: 2.25rem;
        font-size: 0.8rem;
    }
    // 下载按钮
    .download2 a {
        display: block;
        float: left;
        width: 6.25rem;
        height: 100%;
        margin-left: 1.425rem;
        color: #a8ff88;
        &:last-child {
            margin-left: 0.5rem;
        }
    }
    // 注册协议 页面上
    .protocol-box {
        display: block;
        text-align: center;
        font-size: 0;
        margin-top: 0.5rem;
        opacity: 0.2;
        .protocol-label {
            display: inline-block;
            width: 0.5rem;
            height: 0.5rem;
            background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABc0lEQVQ4jaWUvUoDQRSFz250E/QNbAQbDT6BjY0RLA0mhcQH0BgQH8OUxk4fwUIfQxCEaKoUUSLEJ8gfymeRuzhs1mx+Lhxm586cb2d274wHKCYCSYemHUlrkr4lfUl6kvQg6VHSYMwJRJUHmiTHB1CI+t1OCrhyDA3gEsgCaWDFnitA3Zl3DXhxwBDWBc7sBXE7EOADZaBnnloUWLCBAZCbAIpq14EWQ2AAtC1ZmQEW6tS8bSAQULLEW8I2/5MHvBjj2LfSkKQ7ST9xNZQQSLq157yAd6Nn51hdqC1jtDygLyktKRNbqNNFRlJPUt+XNHSWPm8sWev7kjrW2VgAuG5tx5dUt87BAsCctc9u2bzOWTYp8wKcRAv7fA5g2byfQDpMFi05APZmgO2bB5yjF6pqA11Gx8mfAPIZHdMQVg3Hot+ixl80gAtgE1gGVoFtyzWceTfut497+xHTXbBNEi5YVwGjv38PtIChqWW5ks0Z8/4Cjo+1gujsv/UAAAAASUVORK5CYII=')
                no-repeat;
            background-size: 100% 100% !important;
            vertical-align: middle;
            margin-right: 0.3rem;
        }
        input[type='checkbox'] {
            display: none;
        }
        .protocol-href {
            color: #fff;
            font-size: 0.6rem;
            vertical-align: middle;
            text-shadow: 0 0 1rem #000;
        }
    }
    // 提示的文字
    .one-btn-tip {
        position: absolute;
        top: 23.25rem;
        color: #fff;
        text-align: center;
        left: 0;
        right: 0;
        font-size: 0.75rem;
    }
    // 默认注册按钮
    .reg2 {
        margin-top: 0.5rem;
        background: #fff438;
        color: #ff4c10;
        font-size: 0.8rem;
        font-weight: bold;
        position: relative;
        border-radius: 2.25rem;
    }
    .wrap {
        height: 1050 / @rem;
        background-size: 100% 100%;
    }
}
// checked box 换背景图
.regiser-container .protocol-box #protocolInput:checked + .protocol-label {
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABrklEQVQ4jaXUy4vOYRQH8DOM25QmymqUkiiXEs2fwE6zoIgoKWwoYzYsbFmSP4GFzMZO2dCUhVtZMEI0oTTvyq2My/hY/M6bp/d9zIWnzuI553y/55znnPP0ICqnNyKGUgYjYiAiFkVEKyIeRcSNiBiNiK9dSHTKLrww+3mPnZ348rIA5/ErAc8wgk1YgqVYj6N4kD6XZiK8nE5TOIneSvalbMsgVcLdSfYNO2YhqslK3MeFwGK8ScLhfyDrx8PEPwnsz8v4HMqskd1L/EsMBEZTcXqeZMtxN7GvsLr9hhOp3FI4D+LYDGR9GEvcBNaUTZlKQ38BaAc59xey22l/i7WlPfCpQrgHP1N/ttAvwy3NrL7DusJ2BsOB55WSA3sL0hHNNNzEtGZLNhS+qzLIl9macrAgfZqgFjZWgsNY4EABqI3N4SSaxmSlksCddlKdg32q4hya/Z3E1oqtPccfsaJsAvNfve34kNgT/uNz6Mn3/ZyYK6nr+r4u+nPGNY3arNmKPk1nj+Nx4XcVC9s8tehD5vbBtnCkndlMhJHl7sN1vMZ3/NA07xoOZcZd2N8Mw/i9al3DXQAAAABJRU5ErkJggg==')
        no-repeat;
}
.install {
    background: #d71a1d !important;
    .wrap {
        position: relative;
    }
    .cantDownTip {
        &:before {
            content: '';
            display: inline-block;
            width: 0.625rem;
            height: 1.25rem;
            background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAMAAADzN3VRAAAAS1BMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////+DmQsHAAAAGHRSTlMABeaZ6cweZs5JNQ75GL6GcvS1kHxCqFlg9w4zAAAAs0lEQVQoz32S7Q6DIAxFb4uICO7bre//pDPahi6RnX/N4ZYGCoVyiFw5hkzwUGIxODk3TuKZRhPzIL8MsyZUeLWnyFo957KsF21IAJKKFSgEhKNKALEmMEapCeV+TEjIGpn303dA+2UEM1tkg8wERDVWk04awV48CDd7CtRzIdVnhtKEsL/njaUVEaEV1/Lxs2Q5J4O4ZZZXu4aAJEZBESP5t/aZibr/0/3T7h78353+vn0BcTYm2WugQBMAAAAASUVORK5CYII=')
                no-repeat center;
            background-size: 0.625rem 0.625rem;
            vertical-align: middle;
            margin-right: 0.2rem;
        }
        position: absolute;
        bottom: 0.8rem;
        height: 1.4rem;
        border-radius: 1.4rem;
        width: 6.3rem;
        font-size: 0;
        border: 2px solid #fff;
        background-image: -webkit-linear-gradient(to bottom, #ff7242 0, #ff622e 100%);
        background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #ff7242), to(#ff622e));
        background-image: -webkit-linear-gradient(top, #ff7242 0, #ff622e 100%);
        background-image: linear-gradient(to bottom, #ff7242 0, #ff622e 100%);
        text-align: center;
        color: #fff;
        left: 0;
        right: 0;
        margin: 0 auto;
        display: none;
        -webkit-animation: pulse 0.25s;
        animation: pulse 0.25s;
        span {
            font-size: 0.6rem;
            vertical-align: middle;
        }
    }
    .downloadImg {
        width: 640 / @rem;
        height: 1030 / @rem;
        background-size: 100% 100%;
    }
}
@-webkit-keyframes pulse {
    0% {
        -webkit-transform: -webkit-scale3d(0.4, 0.4, 0.4);
        opacity: 0;
    }
    70% {
        -webkit-transform: -webkit-scale3d(1.1, 1.1, 1.1);
        opacity: 1;
    }
    100% {
        -webkit-transform: -webkit-scale3d(1, 1, 1);
        opacity: 1;
    }
}
@keyframes pulse {
    0% {
        -webkit-transform: scale3d(0.4, 0.4, 0.4);
        transform: scale3d(0.4, 0.4, 0.4);
        opacity: 0;
    }
    70% {
        -webkit-transform: scale3d(1.1, 1.1, 1.1);
        transform: scale3d(1.1, 1.1, 1.1);
        opacity: 1;
    }
    100% {
        -webkit-transform: scale3d(1, 1, 1);
        transform: scale3d(1, 1, 1);
        opacity: 1;
    }
}
.protocol .return-reg p {
    background: #d71a1d;
}
</style>
