import { defineComponent } from 'vue';
import { RouterView } from "vue-router";
let App = defineComponent({
	name: 'App',
	setup() {
		return;
	}
});

App.render = function () {
	return (
		<RouterView></RouterView>
	)
};

export default App