<template>
  <div>
    <input type="text" v-model="onedata" @keydown.enter="createdata" autofocus="autofocus" />
    <button @click="createdata" id="add">添加</button>
    <div>
      <div v-if="allPage">
        <div v-for="(item, index) in datas" :key="index">
          <input type="checkbox" @click="check(item)" :checked="item.status" />
          {{ item.data }}
          <button @click="del(index)">刪除</button>
        </div>
      </div>
      <div v-if="completePage">
        <div v-for="(item, index) in getCompleteMes" :key="index">
          <input type="checkbox" @click="check(item)" :checked="item.status" />
          {{ item.data }}
          <button @click="del(index)">刪除</button>
        </div>
      </div>
      <div v-if="activePage">
        <div v-for="(item, index) in getActiveMes" :key="index">
          <input type="checkbox" @click="check(item)" :checked="item.status" />
          {{ item.data }}
          <button @click="del(index)">刪除</button>
        </div>
      </div>
      <div v-if="this.datas.length">
        {{getActiveMes.length}}条待办
        <button @click="all">所有</button>
        <button @click="complete">已完成</button>
        <button @click="active">未完成</button>
        <button @click="clear">清空</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      onedata: "",
      datas: [],
      allPage: 1, //显示所以信息的页面
      completePage: 0, //显示已完成信息的页面
			activePage: 0 ,//显示未完成信息的页面
			allMes:[],
			activeMes:[],
			completeMes:[]
			
    };
  },
  computed: {
    getCompleteMes: function() {
      var mes = [];
      mes = this.datas.filter(function(item) {
        return item.status;
      });

      localStorage.setItem("completeMes", mes);

      return mes;
    },
    getActiveMes: function() {
      var mes = [];
      mes = this.datas.filter(function(item) {
        return !item.status;
      });

      localStorage.setItem("activeMes", mes);
      return mes;
    }
  },
  methods: {
    // 创建一条信息
    createdata: function() {
      var onedata = {};
      // 0表示未完成，1表示已完成
      onedata.status = 0;
      onedata.data = this.onedata;
      this.datas.push(onedata);

      localStorage.setItem("allMes", this.datas);
    },
    // 删除一条信息
    del: function(index) {
      this.datas.splice(index, 1);

      localStorage.setItem("allMes", this.datas);
    },
    // 点击选框时改变状态
    check: function(item) {
      item.status = !item.status;
    },
    // 回到主页面
    all: function() {
      this.completePage = 0;
      this.activePage = 0;
      this.allPage = 1;
    },
    // 回到完成的页面
    complete: function() {
      this.completePage = 1;
      this.activePage = 0;
      this.allPage = 0;
    },
    // 回到未完成的页面
    active: function() {
      this.completePage = 0;
      this.activePage = 1;
      this.allPage = 0;
    },
    clear: function() {
      console.log(this.getCompleteMes);
      this.getCompleteMes = [];

      localStorage.setItem("completeMes", this.getCompleteMes);
    }
  },
  mounted() {
    localStorage.getItem(allMes);
    localStorage.getItem(completeMes);
    localStorage.getItem(activeMes);
  }
};
</script>
<style>
input[type="text"] {
  height: 25px;
  width: 60%;
  padding: 5px 10px;
}
button {
  border: none;
  padding: 5px;
  border-radius: 5px;
  font-size: 12px;
  margin-left: 10px;
  background-color: rgb(102, 102, 255);
  color: #fff;
	outline: none;
}
div {
  margin: 5px;
}
#add {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>


