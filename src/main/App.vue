<template>
  <div class="red-font">
    <span class="blue-font">{{number}}</span>   
  </div>
</template>

<script>
export default {
  data(){
    return {
      num:0,
      number:0
    };
  },
  methods:{
    getNum(){
      return new Promise((resolve,reject)=>{
        setTimeout(()=>{
          resolve(++this.num);
        }, 3000);
      });
    },
    async renderNum(){
      const num = await this.getNum();
      this.number = num;
    }
  },
  created(){
    this.renderNum();
  }
}
</script>

<style scoped lang='scss'>
.red-font{
  color: red!important;
  .blue-font{
    color: blue!important;
  }
}
</style>