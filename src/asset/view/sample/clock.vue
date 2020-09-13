<template>
<div class="card mb-3">
  <div class="card-body">
    <div class="card-title">Simple Clock</div>
    <div class="card-text">
      <!-- contents -->
      <p>See <code>src/asset/view/sample-clock.vue</code></p>
      <p class="lead">{{ formatted_datetime }}</p>
      <div class="form-group container">

        <div class="input-group mb-2 row" v-for="(choice_list, key) of format_choice">
          <div class="input-group-prepend col-md-2 pr-0">
            <label class="input-group-text w-100">{{ key }}</label>
          </div>
          <select class="custom-select form-control col-md-10" v-model="format[key]">
            <option v-for="format of choice_list" v-bind:value="format">
              {{ format }}
            </option>
          </select>
        </div>

      </div>
      <!-- end of contents -->
    </div>
  </div>
</div>
</template>
<script>
export default {
  data: function(){
    return {
      timer: null,
      now: new Date(),
      datetime_format: null,
      format: {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      },
      format_choice: {
        year: ["numeric", "2-digit"],
        month: ["numeric","2-digit","long"],
        day: ["numeric","2-digit"],
        weekday: ["long","short"],
        hour: ["numeric","2-digit"],
        minute: ["numeric","2-digit"],
        second: ["numeric","2-digit"],
      }
    }
  },
  methods: {
    update(){
      let f = this.update_format();
    },
    update_format(){
      this.datetime_format = new Intl.DateTimeFormat(navigator.languages[0], this.format);
    }
  },
  watch: {
    format: {
      handler(){
        this.update();
      },
      deep: true
    }
  },
  computed: {
    formatted_datetime: function(){
      return this.datetime_format.format(this.now);
    }
  },
  created: function(){
    let self = this;
    this.timer = setInterval(() => {
      this.now = new Date();
    }, 1000);
    this.update_format();
  },
  beforeDestroy: function(){
    this.timer = null;
  }
}
</script>