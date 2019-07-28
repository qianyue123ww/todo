<template>
  <div>
    <div class="nav">
      <button v-for="(item, i) in listdatas" :key="i" :class="{active:active===i}" @click="active=i">{{item.btnName}}</button>
    </div>
    <div v-for="(page,i) in listdatas" :key='i' class='none' :class="{block:active===i}">
        {{page}}
        <slot name='items' :page='page'></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    listdatas: { type: Array, required: true }
  },
  data() {
    return {
        active:0,
    };
  }
};
</script>

<style>
.active {
  background-color: rgb(243, 71, 165);
}
.none{
    display:none;
}
.block{
    display: block;
    color:rgb(89, 52, 255)
}

</style>

