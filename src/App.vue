<template>
  <div>
    <button @click="allcheck" id="allcheck">全选</button>
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
        <button @click="all" :class={active:this.allPage}>所有</button>
        <button @click="complete" :class={active:completePage}>已完成</button>
        <button @click="active" :class={active:activePage}>未完成</button>
        <button @click="clear">清空</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ftruncateSync } from "fs";
export default {
  data() {
    return {
      onedata: "",
			datas:JSON.parse(localStorage.getItem('my_todo')) || [],
			// datas:[],
      allPage: 1, //显示所以信息的页面
      completePage: 0, //显示已完成信息的页面
      activePage: 0 //显示未完成信息的页面
    };
	},
	// 本地存储数据
	watch:{
		datas: {
			handler:function(){
					localStorage.setItem('my_todo',JSON.stringify(this.datas));
					console.log(localStorage.getItem('my_todo'));
			},
			deep:true
		}
	},
  computed: {
    getCompleteMes: function(){
        var mes = [];
        mes = this.datas.filter(function(item) {
          return item.status;
        });
        return mes;
    },
    getActiveMes: function() {
      var mes = [];
      mes = this.datas.filter(function(item) {
        return !item.status;
      });
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
    },
    // 删除一条信息
    del: function(index) {
      this.datas.splice(index, 1);
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
		//清空
    clear: function() {
			this.datas=this.datas.filter(function(item){
				return !item.status;
			});
		},
		//全选
    allcheck: function() {
			console.log('1');
      if (
        this.datas.some(function(item) {
          return item.status;
        })
      ) {
        this.datas.forEach(function(item) {
          item.status = 0;
        });
      } else {
        this.datas.forEach(function(item) {
          item.status = 1;
        });
      }
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
.active{
  background-color: rgb(243, 71, 165);
}
</style>


