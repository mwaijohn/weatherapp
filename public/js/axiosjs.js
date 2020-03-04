
  Vue.component('Weather',{
    template:`<div>
    <div class="search">
        <input type="text" placeholder="Search location" v-model="name" class="location-input" />
        <br><br> <br><br>
    </div>
    <div class="item">  
          <div class="row1">
              <div class="location" :text='name'>
                  <h1>{{ name }} </h1>
              </div>
              <div class="time">
                  <p><b><span :text='today_date'>{{today_date}}</span></b></p>
                  <small>{{icon_description}}</small>
              </div>
          </div>
          <div class="row2">
              <div class="temperature">
                  <h1 v-if="temp">{{ temp }} &#8451;</h1>
              </div>
              <div class="weather-icon">
              <br>
                  <img :src="icon_link" alt="" height="80" width="80">
              </div>
              <div class="humidity">
              <br><br>
                  <span v-if="temp_max"><b>{{ temp_max }} &#8451;</b> </span><br>
                  <span v-if="temp_max">max</span><br><br>
                  <span v-if="temp_min"><b>{{ temp_min }} &#8451;</b> </span><br>
                  <span v-if="temp_min">min</span>
                  <br><br>
              </div>
          </div>
          <div class="row3">
            <div v-if="wind"><b>Wind speed:</b> {{ wind }}</div>
		    <div v-if="pressure"><b>Pressure:</b> {{ pressure }}</div>
		    <div v-if="humidity"><b>Humidity:</b> {{ humidity }}</div>
          </div>
          </div>
      </div>`,
    data: function (){
        return {
            name:null,
            temp:null,
            pressure:null,
            humidity:null,
            icon:null,
            icon_description:null,
            wind:null,
            temp_min:null,
            temp_max:null,
            latitude:null,
            longitude:null,
            location:null
        }
    },
    methods:{
        getLocation: function (){

        }
    },
    computed:{
        icon_link:function() {
            return "http://openweathermap.org/img/w/"+ this.icon +".png"
        },
        today_date:function(){
            const today_ = new Date();
            const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

  return today_.getDate() + " " + monthNames[today_.getMonth()] + " " + today_.getFullYear();
      }

    },
    mounted () {
      axios
        .get(`https://api.openweathermap.org/data/2.5/find?q=London&units=metric&APPID=7fcd9306a86e57865a6611fbe671a97e`)
        .then(response => {
            this.wind = response.data.list[0].wind.speed
            this.temp = response.data.list[0].main.temp
            this.humidity = response.data.list[0].main.humidity
            this.pressure = response.data.list[0].main.pressure
            this.name = response.data.list[0].name;
            this.icon = response.data.list[0].weather[0].icon
            this.icon_description = response.data.list[0].weather[0].main
            this.icon_description = response.data.list[0].weather[0].description
            this.wind = response.data.list[0].wind.speed
            this.temp_max = response.data.list[0].main.temp_max
            this.temp_min = response.data.list[0].main.temp_min
        }) .catch(error => {
          console.log(error)
        })
        .finally(() => this.loading = false)
    },
    watch: {
        name: function(){
            axios
              .get(`https://api.openweathermap.org/data/2.5/find?q=${this.name}&units=metric&APPID=7fcd9306a86e57865a6611fbe671a97e`)
              .then(response => {
                    this.wind = response.data.list[0].wind.speed
                    this.temp = response.data.list[0].main.temp
                    this.humidity = response.data.list[0].main.humidity
                    this.pressure = response.data.list[0].main.pressure
                    this.name = response.data.list[0].name;
                    this.icon = response.data.list[0].weather[0].icon
                    this.icon_description = response.data.list[0].weather[0].main
                    this.icon_description = response.data.list[0].weather[0].description
                    this.wind = response.data.list[0].wind.speed
                    this.temp_max = response.data.list[0].main.temp_max
                    this.temp_min = response.data.list[0].main.temp_min
              }) .catch(error => {
                  console.log(error)
              })
              .finally(() => this.loading = false)
          }
    },
    created() {
        //do we support geolocation
        if(!("geolocation" in navigator)) {
          this.errorStr = 'Geolocation is not available.';
          return;
        }
    
        this.gettingLocation = true;
        // get position
        navigator.geolocation.getCurrentPosition(pos => {
          this.gettingLocation = false;
          this.location = pos;
        }, err => {
          this.gettingLocation = false;
          this.errorStr = err.message;
        })
      }
})


Vue.component('Country',{
    template:`<div>
    <div class="item">  
          <div class="row1">
              <div class="location" :text='name'>
                  <h1>{{ name }} </h1>
              </div>
              <div class="time">
                  <p><b><span :text='today_date'>{{today_date}}</span></b></p>
                  <small>{{icon_description}}</small>
              </div>
          </div>
          <div class="row2">
              <div class="temperature">
                  <h1 v-if="temp">{{ temp }} &#8451;</h1>
              </div>
              <div class="weather-icon">
              <br>
                  <img :src="icon_link" alt="" height="80" width="80">
              </div>
              <div class="humidity">
              <br><br>
                  <span v-if="temp_max"><b>{{ temp_max }} &#8451;</b> </span><br>
                  <span v-if="temp_max">max</span><br><br>
                  <span v-if="temp_min"><b>{{ temp_min }} &#8451;</b> </span><br>
                  <span v-if="temp_min">min</span>
                  <br><br>
              </div>
          </div>
          <div class="row3">
            <div v-if="wind"><b>Wind speed:</b> {{ wind }}</div>
		    <div v-if="pressure"><b>Pressure:</b> {{ pressure }}</div>
		    <div v-if="humidity"><b>Humidity:</b> {{ humidity }}</div>
          </div>
          </div>
      </div>`,
    props:['country'],
    data: function (){
        return {
            name:null,
            temp:null,
            pressure:null,
            humidity:null,
            icon:null,
            icon_description:null,
            wind:null,
            temp_min:null,
            temp_max:null,
            latitude:null,
            longitude:null
        }
    },
    methods:{
        getLocation: function (){

        }
    },
    computed:{
        icon_link:function() {
            return "http://openweathermap.org/img/w/"+ this.icon +".png"
        },
        today_date:function(){
            const today_ = new Date();
            const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

  return today_.getDate() + " " + monthNames[today_.getMonth()] + " " + today_.getFullYear();
      }

    },
    mounted () {
      axios
        .get(`https://api.openweathermap.org/data/2.5/find?q=${this.country}&units=metric&APPID=7fcd9306a86e57865a6611fbe671a97e`)
        .then(response => {
            this.wind = response.data.list[0].wind.speed
            this.temp = response.data.list[0].main.temp
            this.humidity = response.data.list[0].main.humidity
            this.pressure = response.data.list[0].main.pressure
            this.name = response.data.list[0].name;
            this.icon = response.data.list[0].weather[0].icon
            this.icon_description = response.data.list[0].weather[0].main
            this.icon_description = response.data.list[0].weather[0].description
            this.wind = response.data.list[0].wind.speed
            this.temp_max = response.data.list[0].main.temp_max
            this.temp_min = response.data.list[0].main.temp_min
        }) .catch(error => {
          console.log(error)
        })
        .finally(() => this.loading = false)
    },
    watch: {
        name: function(){
            axios
              .get(`https://api.openweathermap.org/data/2.5/find?q=${this.name}&units=metric&APPID=7fcd9306a86e57865a6611fbe671a97e`)
              .then(response => {
                    this.wind = response.data.list[0].wind.speed
                    this.temp = response.data.list[0].main.temp
                    this.humidity = response.data.list[0].main.humidity
                    this.pressure = response.data.list[0].main.pressure
                    this.name = response.data.list[0].name;
                    this.icon = response.data.list[0].weather[0].icon
                    this.icon_description = response.data.list[0].weather[0].main
                    this.icon_description = response.data.list[0].weather[0].description
                    this.wind = response.data.list[0].wind.speed
                    this.temp_max = response.data.list[0].main.temp_max
                    this.temp_min = response.data.list[0].main.temp_min
              }) .catch(error => {
                  console.log(error)
              })
              .finally(() => this.loading = false)
          }
    }
})


var app = new Vue({
  el: '#app',
  data: {

  }
})