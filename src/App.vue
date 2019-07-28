<template>
  <div>
    <input type="text" v-model="onedata" @keydown.enter="createdata" autofocus="autofocus" />
    <button @click="createdata" id="add">添加</button>
    <todo-list :listdatas="datas">
      <template #items="{page}">
        <div v-for="(item, index) in page.list" :key="index">
          <input type="checkbox" @click="check(item,index)" :checked="item.status" />
          {{ item.data }}
          <button @click="del(index)">刪除</button>
        </div>
      </template>
    </todo-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      onedata: "",
      datas: [
        {
          btnName: "所有",
          list: []
        },
        {
          btnName: "已完成",
          list: []
        },
        {
          btnName: "未完成",
          list: []
        }
      ]
    };
  },
  // computed: {
  //   completed: function() {
	// 		var mes = [];
  //     mes = this.datas[0].list.filter(function(item) {
  //       return item.status;
  //     });
  //     return mes;
  //   },
  //   acitve: function() {
  //     var mes = [];
  //     mes = this.datas[0].list.filter(function(item) {
  //       return !item.status;
  //     });
  //     return mes;
  //   }
  // },
  watch: {
    // datas: {
    //   handler: function() {
    //    this.datas[1].list=this.datas[0].list.filter(function(item){
		// 		 return item.status;
		// 	 });
		// 	 this.datas[2].list=this.datas[0].list.filter(function(item){
		// 		 return !item.status;
		// 	 });
    //   },
    //   deep: true
    // }
  },
  methods: {
    // 创建一条信息
    createdata: function() {
      var onedata = {};
      // 0表示未完成，1表示已完成
      onedata.status = 0;
      onedata.data = this.onedata;
      this.datas[0].list.push(onedata);
    },
    // 删除一条信息
    del: function(index) {
      console.log(index);
      this.datas[0].list.splice(index, 1);
    },
    // 点击选框时改变状态
    check: function(item, index) {
      item.status = !item.status;
    }
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
#allcheck {
  margin-right: 10px;
}
.active {
  background-color: rgb(243, 71, 165);
}
</style>


