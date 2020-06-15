<template>
  <div>
  <p class="lead">Hello, {{ greeting }}.</p>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      greeting: "YOU"
    }
  }
}
</script>