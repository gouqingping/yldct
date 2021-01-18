import { defineComponent, ref, withDirectives, vShow, reactive } from 'vue';
import router from "/@/router";
import CustomComponent from "/@/customComponent"
export default defineComponent({
    setup() {
        const count = ref(0);
        let state = reactive({
            value: ""
        });
        const handleClick = () => {
            count.value++;
            goto()
        }

        function goto() {
            router.push("/index");
        }

        function getValue(v: any) {
            state.value = v
        }

        return () => (
            <>
                <CustomComponent.Test name="test onn" onchange={getValue} value="1222"></CustomComponent.Test>
                <button onClick={handleClick.bind(this)}>toggle</button>
                {state.value}
                {withDirectives(<h1>Count: {count.value}</h1> as any, [[
                    vShow, count.value % 2 === 0
                ]])}
            </>
        )
    }
})