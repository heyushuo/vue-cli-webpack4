<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import Toast from '@/components/toast/index'
import Announce from '@/components/announce/index'
  export default {
    name: 'HelloWorld',
    created() {},
    data() {
      return {
        msg: 'heyushuo-cli脚手架'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import url(./index.less);
  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>