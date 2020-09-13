
console.log("asset/script/main.js is loaded.");

import Vue from 'vue';

import C_sample_clock from '../view/sample/clock';
import C_sample_binding from '../view/sample/data-binding';

export default class Bon {

  fire(){
    this.container = new Vue({
      el: '#app',
      components: { 
        C_sample_clock,
        C_sample_binding
      }
    });
  }

}