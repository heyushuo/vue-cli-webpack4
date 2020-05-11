<template>
  <div class="announce" v-show="isShow">本次活动与Apple Inc.无关</div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false
    };
  },
  mounted() {
    let os = client.getSystemData("os");
    if (os === "ios") {
      this.isShow = true;
    }
  }
};
</script>

<style>
.announce {
  text-align: center;
  font-size: 0.24rem;
  margin-bottom: 0.4rem;
  margin-top: 0.4rem;
  color: #999;
}
</style>
