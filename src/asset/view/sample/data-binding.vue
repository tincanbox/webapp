<template>
<div class="card mb-3">
  <div class="card-body">
    <div class="card-title">Data Binding</div>
    <div class="card-text">
      <!-- contents -->
      <p>See <code>src/asset/view/sample/data-binding.vue</code></p>
      <p class="lead">Hello, {{ user.name }} !!</p>
      <!-- Model-Binding way?? -->
      <section>
        <p><b>Model Binding</b></p>
        <div class="form-group">
          <input v-model="user.name">
        </div>
      </section>
      <!-- Or Individual Commitor way?? -->
      <section>
        <p><b>Individual Emittor</b></p>
        <div class="form-group">
          <input :value="user.name" @input="commit">
        </div>
      </section>
      <!-- end of contents -->
    </div>
  </div>
</div>
</template>

<script lang="ts">
// If you wanna use complex Data-transaction-emittor,
// just apply definitions with Vue.extend().
import * as $ from 'jquery';
export default {
  methods: {
    commit(event:InputEvent){
      let self = this;
      let $el = $(event.target);
      let default_value = $el.val();
      $el.prop("disabled", true);
      $.ajax("https://yesno.wtf/api")
        .done((response:Object) => {
          self.user.name = $el.val();
        })
        .catch((e) => {
          self.user.name = default_value;
          alert(e);
        })
        .always(() => {
          self.user.name = default_value;
          $el.prop("disabled", false);
        });
    }
  },
  data: () => {
    return {
      user_model: new SomeUser
    }
  },
  computed: {
    user(){
      return this.user_model;
    }
  },
  watch: {
    user: {
      handler(data:Object){
        console.log('Do Your Thing at here. `watch` is working properly.');
      },
      deep: true
    }
  }
}

/**
 * Your first sample `Reactive Class`.
 */
class SomeUser {
  private _name ?:string

  constructor(name?:string){
    this._name = name || "noname";
  }

  set name(val:string){
    this._name = val;
  }
  get name(){
    return this._name;
  }
}
</script>