/*
 * @Autor        : Pat
 * @Description  : 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2021-01-14 16:36:31
 * @LastEditors  : Pat
 * @LastEditTime : 2021-01-27 16:12:26
 */
import lang from "/@/config/lang";
import { defineComponent, reactive, ref, Ref } from 'vue';
import { ElForm, ElFormItem } from "element-plus";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { setup, removeSub } from "/@/config/Storage"
import "/@/assets/scss/login.scss";
import { getAccountInfo } from "/@/api";
import type { useLogin } from "/@/api/type/use.d";

export default defineComponent({
    name: "useLogin",
    setup() {
        const router = useRouter(),
            store = useStore(),
            ruleForm: useLogin = reactive({
                userName: "",
                password: ""
            }), refs: Ref<null | any> = ref(null);
        removeSub("userInfo");
        function Login() {
            refs.value.validate(async (valid: any) => {
                if (valid) {
                    const { result } = await getAccountInfo(ruleForm);
                    store.dispatch("UserInfo/generateUser", result);
                    setup("userInfo", result);
                    router.push('/home');
                };
                return;
            })
        };

        return () => (
            <div class={"login"}>
                <div class="wrap">
                    <div class="container">
                        <h1>Welcome To</h1>
                        <h2>{lang.moduleName}</h2>
                        <ElForm
                            {...{
                                model: ruleForm,
                                rules: {
                                    userName: [{ required: true, message: lang.use.name.info, trigger: ['blur', 'change'] }],
                                    password: [{ required: true, message: lang.use.pasw.info, trigger: ['blur', 'change'] }]
                                }
                            }}
                            ref={refs} label-width="0" class="ruleForm">
                            <ElFormItem prop="userName">
                                <input type="text" placeholder="user name" {...{
                                    model: ruleForm.userName, onInput: (event: any) => {
                                        ruleForm.userName = event.target.value
                                    }
                                }}></input>
                            </ElFormItem>
                            <ElFormItem prop="password">
                                <input type="password" placeholder="password" {...{
                                    model: ruleForm.password, onInput: (event: any) => {
                                        ruleForm.password = event.target.value
                                    }
                                }}></input>
                            </ElFormItem>
                            <ElFormItem>
                                <button class="Login" {...{ onClick: Login.bind(this) }}>{lang.login}</button>
                            </ElFormItem>
                        </ElForm>
                    </div>
                    <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </div>
        )
    }
});