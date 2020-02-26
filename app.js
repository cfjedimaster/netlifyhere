const app = new Vue({
	el:'#app',
	data: {
		start:'403 Robinhood Circle, Lafayette, LA 70508',
		end: 'Chicago, IL',
		weatherStart:'',
		weatherEnd:''
	},
	methods: {
		async generateData() {
			console.log('running generateData, values are '+this.start+' and '+this.end);
			this.weatherStart = await getWeather(this.start);
		}
	}
});

async function getWeather(location) {
	return 1;
}