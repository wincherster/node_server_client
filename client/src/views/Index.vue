<template>
  <div class="index-step">
    <div class="step-item" :class="selectedStep === item.id ? 'active': ''" v-for="(item,index) in stepList" :key="item.id">{{index + 1}}. {{item.label}} </div>

    <div class="step-btn">
      <div class="btn-item">
        <el-button @click="preStep" v-show="selectedStep !== 0" type="primary" plain>上一项</el-button>
      </div>
      <div class="btn-item">
        <el-button @click="nextStep" v-show="selectedStep < stepList.length - 1" type="primary" plain>下一项</el-button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index', 
  data(){
    return {
      stepList: [
        {id: 0, label: '本周部门资金明细'},
        {id: 1, label: '本周JIRA和项目问题'},
        {id: 2, label: '本周线上项目问题'},
        {id: 3, label: '本周项目最佳实践'},
      ],
      selectedStep: 0,
    }
  },
  methods: {
    preStep(){
        if(this.selectedStep === 0) {return false;}

        this.selectedStep = this.selectedStep - 1;
      },
      nextStep(){
        if(this.selectedStep >= this.stepList.length - 1 ) {return false;}

        this.selectedStep = this.selectedStep + 1;
      }
  },
}
</script>

<style lang="scss" scoped>

  .index-step {
    width: 400px; 
    margin:0 auto;
    margin-top: 100px;
    padding: 40px;
    line-height: 80px;
    font-size:30px; 
    font-weight: bold;
    border-radius: 10px;
    box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.3);

    .step-item {
      padding: 0 20px;
    }
    .step-btn {
      display: flex;
      justify-content: space-between;
      .btn-item {
        flex: 1;
        &:nth-child(2){
           text-align: right;
        }
      }
    }

    .active {
      background: #4c8ff5;
      color: #ffffff;
    }
  }
</style>
