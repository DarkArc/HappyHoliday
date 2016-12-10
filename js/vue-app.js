Vue.use(VueRouter)

var Compose = Vue.extend({
  delimiters: ['[[', ']]'],
  template: `
    <div class="interface-element framed">
      <h1>What would you like to say?</h1>
      <textarea v-model="message"></textarea>
      <section v-if="message.length > 0">
        <input id="full-url-display" type="text" readonly v-bind:value="encodeFull()" />
        <button class="button" v-if="supportsCopy()" v-on:click="copy">Copy Link</button>
        <router-link v-bind:to="encode()" class="button button-outline">View</router-link>
      </section>
    </div>
  `,
  data: function() {
    return {
      message: ''
    };
  },
  methods: {
    encode: function() {
      return '/view/' + btoa(this.message);
    },
    encodeFull: function(string) {
      return 'http://hh.haxing.ninja' + this.encode();
    },
    supportsCopy: function() {
      return document.queryCommandSupported('copy');
    },
    copy: function() {
      var fullUrl = document.getElementById('full-url-display');
      fullUrl.select();
      var selection = window.getSelection();
      document.execCommand('copy');
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
    { path: '/', component: Compose },
    { path: '/view/:encodedText', component: TextArea },
    { path: '*', redirect: '/' }
  ]
})

new Vue({
  router
}).$mount('#app')
