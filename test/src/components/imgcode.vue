<template>
    <div class="code">
        <div class="code-box">
            <div class="close">X</div>
            <div class="img_code">
                <p class="title">请输入图片中数字</p>
                <div class="img">
                    <img :src="src" @click="handleFreshImg" />
                </div>
                <p class="refresh">看不清？点击刷新</p>
            </div>
            <label class="inputCodeLabel" for="inputCode">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </label>
            <input type="tel" maxlength="4" id="inputCode"/>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            src: '22222222'
        };
    },
    methods: {
        handleFreshImg() {
            console.log(333);
        }
    }
};
</script>
<style lang='less'>
@REM: 40rem;
@rem: 40rem;
.code {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 2;
    .code-box {
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        width: 500 / @rem;
        height: 450 / @rem;
        background: #fff;
        border-radius: 8 / @rem;
        .close {
            position: absolute;
            top: 0;
            right: 0;
            width: 70 / @rem;
            height: 70 / @rem;
            line-height: 70 / @rem;
            text-align: center;
            color: #dfdfdf;
            font-size: 24 / @rem;
        }
        p {
            line-height: 1;
            text-align: center;
            font-size: 24 / @rem;
        }
        .title {
            margin-top: 60 / @rem;
            color: #000;
            font-size: 36 / @rem;
        }
        .error-tip {
            margin-top: 22 / @rem;
            color: #ff2323;
            -webkit-animation-duration: 0.4s;
            animation-duration: 0.4s;
            -webkit-animation-fill-mode: both;
            animation-fill-mode: both;
        }
        .code-tip {
            margin-top: 30 / @rem;
            color: #8d8d8d;
            font-size: 28 / @rem;
        }
        .resend {
            width: 168 / @rem;
            height: 60 / @rem;
            line-height: 60 / @rem;
            text-align: center;
            margin-top: 20 / @rem;
            border-radius: 8 / @rem;
            font-size: 26 / @rem;
            border: 1px solid #ff3341;
            color: #ff3341;
            &.disabled {
                border: 1px solid #adadad;
                color: #adadad;
            }
        }
        .inputCodeLabel {
            font-size: 0;
            text-align: center;
            display: block;
            span {
                display: inline-block;
                width: 88 / @rem;
                height: 88 / @rem;
                line-height: 88 / @rem;
                text-align: center;
                border-radius: 8 / @rem;
                border: 1px solid #adadad;
                margin-right: 10 / @rem;
                font-size: 60 / @rem;
                vertical-align: middle;
                &:last-child {
                    margin-right: 0;
                }
                &.active {
                    border: 1px solid #ff3341;
                }
                &.hover {
                    border: 1px solid #ff3341;
                    &:before {
                        content: '|';
                        color: #ff3341;
                        font-size: 48 / @rem;
                        font-weight: lighter;
                        line-height: 80 / @rem;
                        display: block;
                        animation: 1s blink infinite steps(1);
                    }
                }
            }
        }
        #inputCode {
            margin: 0;
            padding: 0;
            width: 1px;
            opacity: 0;
            height: 1px;
            border: none;
            position: relative;
            z-index: -1;
            -webkit-transform: translate(-9999px, 0);
            transform: translate(-9999px, 0);
        }
        .sms_code {
            margin-bottom: 20 / @rem;
        }
        .img_code {
            margin-bottom: 24 / @rem;
        }
        .img {
            height: 90 / @rem;
            margin-top: 30 / @rem;
            img {
                width: 381 / @rem;
                height: 98 / @rem;
            }
        }
        .refresh {
            width: 355 / @rem;
            margin: 24 / @rem auto 0;
            text-align: right;
            color: #878787;
        }
        .loading {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.4);
            display: none;
        }
        &.sms {
            .error-tip {
                // margin-top: ;
            }
        }
    }
    &.loading {
        .loading {
            display: block;
        }
    }
    &.inputIos {
        .code-box {
            top: 70%;
        }
    }
}

@keyframes blink {
    50% {
        color: transparent;
    }
}

// loading
#floatingCirclesG {
    position: absolute;
    width: 90 / @rem;
    height: 90 / @rem;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    transform: scale(0.6);
    -webkit-transform: scale(0.6);
}

.f_circleG {
    position: absolute;
    background-color: rgb(255, 255, 255);
    height: 16 / @rem;
    width: 16 / @rem;
    border-radius: 8 / @rem;
    -webkit-border-radius: 8 / @rem;
    animation-name: f_fadeG;
    -webkit-animation-name: f_fadeG;
    animation-duration: 1.2s;
    -webkit-animation-duration: 1.2s;
    animation-iteration-count: infinite;
    -webkit-animation-iteration-count: infinite;
    animation-direction: normal;
    -webkit-animation-direction: normal;
}

#frotateG_01 {
    left: 0;
    top: 36 / @rem;
    animation-delay: 0.45s;
    -webkit-animation-delay: 0.45s;
}

#frotateG_02 {
    left: 10 / @rem;
    top: 10 / @rem;
    animation-delay: 0.6s;
    -webkit-animation-delay: 0.6s;
}

#frotateG_03 {
    left: 36 / @rem;
    top: 0;
    animation-delay: 0.75s;
    -webkit-animation-delay: 0.75s;
}

#frotateG_04 {
    right: 10 / @rem;
    top: 10 / @rem;
    animation-delay: 0.9s;
    -webkit-animation-delay: 0.9s;
}

#frotateG_05 {
    right: 0;
    top: 36 / @rem;
    animation-delay: 1.05s;
    -webkit-animation-delay: 1.05s;
}

#frotateG_06 {
    right: 10 / @rem;
    bottom: 10 / @rem;
    animation-delay: 1.2s;
    -webkit-animation-delay: 1.2s;
}

#frotateG_07 {
    left: 36 / @rem;
    bottom: 0;
    animation-delay: 1.35s;
    -webkit-animation-delay: 1.35s;
}

#frotateG_08 {
    left: 10 / @rem;
    bottom: 10 / @rem;
    animation-delay: 1.5s;
    -webkit-animation-delay: 1.5s;
}

@keyframes f_fadeG {
    0% {
        background-color: rgb(0, 0, 0);
    }

    100% {
        background-color: rgb(255, 255, 255);
    }
}

@-webkit-keyframes f_fadeG {
    0% {
        background-color: rgb(0, 0, 0);
    }

    100% {
        background-color: rgb(255, 255, 255);
    }
}

@keyframes shake {
    from,
    to {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }

    10%,
    30%,
    50%,
    70%,
    90% {
        -webkit-transform: translate3d(-10px, 0, 0);
        transform: translate3d(-10px, 0, 0);
    }

    20%,
    40%,
    60%,
    80% {
        -webkit-transform: translate3d(10px, 0, 0);
        transform: translate3d(10px, 0, 0);
    }
}

@-webkit-keyframes shake {
    from,
    to {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }

    10%,
    30%,
    50%,
    70%,
    90% {
        -webkit-transform: translate3d(-10px, 0, 0);
        transform: translate3d(-10px, 0, 0);
    }

    20%,
    40%,
    60%,
    80% {
        -webkit-transform: translate3d(10px, 0, 0);
        transform: translate3d(10px, 0, 0);
    }
}

.shake {
    -webkit-animation-name: shake;
    animation-name: shake;
}
</style>
