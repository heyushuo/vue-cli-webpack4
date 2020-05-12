<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  created() {
    var arr = [1, 2, 3, 4];
    console.log(arr.includes(1));
    const a = "123";
    console.log(a);
    var obj = { age: 30 };
    Object.assign(obj, { name: "heyushuo" });

    new Promise((resolve, reject) => {
      resolve(a);
    });
  },
  data() {
    return {
      msg: "heyushuo-cli脚手架"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import url(./index.less);

h1,
h2 {
  display: flex;
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
