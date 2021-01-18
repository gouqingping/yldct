import { defineComponent, reactive } from 'vue';
import { ElButton } from "element-plus";

let state = reactive({
    showElemennt: false
});

const handleClick = (e: MouseEvent) => {
    state.showElemennt = !state.showElemennt;
}
export default defineComponent({
    name: "Test",
    props: {
        value: {
            type: String,
            default: ""
        },
        name: {
            type: String,
            default: ""
        },
        onchange: {
            type: Function,
            default: (value: any) => value
        }
    },
    setup({ value, name, onchange }, slot) {
        console.log(slot);
        const handleChange = (event: any) => {
            //emits("onchange",value)
            onchange(event.target.value);

        }

        return () => (
            <>
                <ElButton type="primary" onClick={handleClick.bind(this)}>{name}</ElButton>
                {
                    ((showElemennt: any) => {
                        if (showElemennt) {
                            return (<h1>This props name is {name}</h1>)
                        };
                        return;
                    })(state.showElemennt)
                }

                <input v-modal={value} onInput={handleChange.bind(this)} />
            </>
        )
    }
})