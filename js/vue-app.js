Vue.use(VueRouter)

var Compose = Vue.extend({
  delimiters: ['[[', ']]'],
  template: `
    <div class="interface-element framed">
      <h1>What would you like to say?</h1>
      <textarea v-model="message"></textarea>
      <input type="text" readonly v-bind:value="encodeFull(message)" />
      <router-link to="/" class="button">Copy Link (NIY)</router-link>
      <router-link v-bind:to="encode(message)" class="button button-outline">View</router-link>
    </div>
  `,
  data: function() {
    return {
      message: ''
    };
  },
  methods: {
    encode: function(string) {
      return '/view/' + btoa(string);
    },
    encodeFull: function(string) {
      return 'http://hh.haxing.ninja/view/' + btoa(string);
    }
  }
});

var TextArea = Vue.extend({
  delimiters: ['[[', ']]'],
  template: `
    <div class="interface-element christmas-font">
      <span v-for="line in message.split('\\n')">
        [[ line ]] <br />
      </span>
    </div>
  `,
  data: function() {
    return {
      message: window.atob(this.$route.params.encodedText)
    };
  }
});

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', name: 'A', component: Compose },
    { path: '/view/:encodedText', name: 'B', component: TextArea }
  ]
})

new Vue({
  router
}).$mount('#app')
