<template>
    <div class="item phone" v-if="configObj.type==='phone_number'">
        <input type="tel"  @input="handlePhoneInput" maxlength="13" placeholder="请输入手机号领取" ref="$inputPhone"/>
        <div class="icon-del-wrap js-del-phone">
            <div class="icon-del_bg">
                <div class="icon-del"></div>
            </div>
        </div>
    </div>
    <div class="item pwd" v-else-if="configObj.type==='password'">
        <input type="password" @input="handlePasswordInput" placeholder="设置密码(6-20位字母或数字)" ref="$inputPwd" />
    </div>
</template>
<script>
export default {
    props: {
        configObj: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    data() {
        return {
            _temp_phone: null
        };
    },
    methods: {
        handlePhoneInput(e) {
            this.$inputPhone = this.$refs.$inputPhone;
            let inputValue = this.$inputPhone.value;
            if (inputValue.match(/\d{11,}/)) {
                if (!/1(40|70|71)\d{8}/g.test(inputValue) && this._temp_phone !== inputValue) {
                    this._temp_phone = inputValue;
                }
                this.$emit('validate', this.configObj.type, true);
            } else {
                this.$emit('validate', this.configObj.type, false);
            }
        },
        handlePasswordInput(e) {
            let value = this.$refs.$inputPwd.value;
            if (value) {
                this.$emit('validate', this.configObj.type, true);
            } else {
                this.$emit('validate', this.configObj.type, false);
            }
        },
        handleFocusPassword() {
            this.$refs.$inputPwd.focus();
        }
    }
};
</script>
