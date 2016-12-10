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
      <span v-for="line in getLines()">
        <span v-for="char in getCharacters(line)" class="christmas-character" v-bind:style="getStylesForCharacter(char)">[[ char.value ]]</span>
        <br />
      </span>
    </div>
  `,
  data: function() {
    return {
      message: window.atob(this.$route.params.encodedText)
    };
  },
  methods: {
    getLines: function() {
      return this.message.split('\n').map((line, index) => {
        return {
          value: line,
          index: index
        };
      });
    },
    getCharacters: function(line) {
      return line.value.split('').map((char, index) => {
        return {
          value: char,
          index: index,
          line: line
        };
      });
    },
    getStylesForCharacter: function(char) {
      var offset = (char.index / 2.0) + (char.line.index / 3.0);
      var tempo = .5 * (char.line.value.length);
      var delay = offset / tempo;
      return 'animation-delay: ' + delay + 's';
    }
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
