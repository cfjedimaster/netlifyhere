const app = new Vue({
	el:'#app',
	data: {
		start:'Lafayette, LA 70508',
		end: 'Chicago, IL',
		weatherStart:'',
		weatherEnd:''
	},
	methods: {
		async generateData() {
			console.log('running generateData, values are '+this.start+' and '+this.end);
			this.weatherStart = await getWeather(this.start);
			this.weatherEnd = await getWeather(this.end);
		}
	}
});

async function getWeather(location) {
	let resp = await fetch(`/.netlify/functions/getWeather?location=${location}`);
	let data = await resp.json();
	return data;
}