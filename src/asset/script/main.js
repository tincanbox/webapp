
console.log("asset/script/main.js is loaded.");

import Vue from 'vue';
import C_some_view from '../view/some-view';

export default class Bon {

  fire(){
    this.container = new Vue({
      el: '#app',
      components: { C_some_view }
    });
  }

}