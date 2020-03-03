// Summarize to hours or seconds, it's rough but ok
Vue.filter('formatSeconds', s => {
	let hours = Math.floor(s/(60*60));
	if(hours > 2) return hours + ' hours';
	let minutes = Math.floor(s/60);
	return minutes + ' minutes';
});

// Always meters, switch to miles
Vue.filter('formatDistance', s => {
	return Math.floor(s/1609) + ' miles';
});


const app = new Vue({
	el:'#app',
	data: {
		start:'Lafayette, LA',
		end: 'Chicago, IL',
		weatherStart:'',
		weatherEnd:'',
		steps:[],
		summary:null,
		loading:false,
		hasResult:false
	},
	methods: {
		async generateData() {
			this.hasResult = false;
			this.loading = true;
			console.log('running generateData, values are '+this.start+' and '+this.end);
			this.weatherStart = await getWeather(this.start);
			this.weatherEnd = await getWeather(this.end);
			let route = await getRoute(this.start, this.end);
			this.steps = route.actions;
			this.summary = route.summary;
			this.loading = false;
			this.hasResult = true;
		}
	}
});

async function getRoute(x,y) {
	let resp = await fetch(`/.netlify/functions/getRoute?start=${x}&end=${y}`);
	let data = await resp.json();
	return data;
}

async function getWeather(location) {
	let resp = await fetch(`/.netlify/functions/getWeather?location=${location}`);
	let data = await resp.json();
	return data;
}