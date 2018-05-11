<template>
    <div class="protocol-box">
        <input type="checkbox" id="protocolInput" checked="" v-if="isChecked" @change="handleChange"/>
        <input type="checkbox" id="protocolInput" v-else @change="handleChange"/>
        <label class="protocol-label" for="protocolInput"></label>
        <a class="protocol-href" href="javascript:;">已阅读并同意「用户协议」</a>
    </div>
</template>
<script>
export default {
    props: {
        isChecked: {
            type: Boolean,
            default() {
                return true;
            }
        },
        name: {
            type: String,
            default() {
                return 'protocolbox';
            }
        }
    },
    methods: {
        handleChange(e) {
            this.$emit('validate', this.name, e.target.checked);
        }
    }
};
</script>
