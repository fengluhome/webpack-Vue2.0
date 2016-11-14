<style>
  @import "../styles/newTab.css";
</style>
<template>

  <div class="group">
    <form class="searchForm searchScroll" method="GET" action="http://myhome.parallaxsearch.com/web" id="searchform">
      <div class="input-item">
        <div class="input-box">
          <input class="query-box q" v-on:input='textInput' type="text" placeholder='Search' value='' id="field"
                 name="qs" autocomplete="off" v-model.trim="inputVal" v-on:keyup.up="up" v-on:keyup.down="down"/>
        </div>
        <span class="clear-query" v-on:click="clear">×</span>
        <div class="search-change">
          <div class="search-logo"></div>
        </div>
        <input class="search-button btn" id="sb" type="submit" value="Search"/>
        <div class="searchSug none">
          <ul></ul>
        </div>
      </div>
      <div class="search-nav none">
        <ul>
          <li>百度</li>
          <li>搜狗</li>
          <li>Yahoo</li>
          <li>IE</li>
          <li>Firefox</li>
        </ul>
      </div>
      <div class="search-tips">
        <ul>
          <li v-for="(item,index) in result" v-bind:class="{on:index==num}" v-on:click="searchInfo(index,item)">
            {{item}}
          </li>
        </ul>
      </div>
    </form>
  </div>
</template>

<script>

  export default{
    data(){
      return {
        result: null,
        inputVal: null,
        num: -1,
      }
    },
    methods: {
      textInput: function (event) {
        this.num = -1;
        var me = this;
        var tipHtml = [];
        var queryTerm = event.target.value;
        TD.util.ajax({
          type: 'GET',
//          url: 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?json=1&p=3&wd=' + queryTerm,
//          dataType: 'jsonp',
          url:"/test/data/search.json",
          dataType:'json',

          success: function (data) {
            me.result = data.s;
            console.log('----data---', data.s);

          },
          error: function (xhr, errorType, error) {
            console.log('----------', errorType, error);

          }
        })
      },
      searchInfo: function (index, item) {
        var me = this;
        // var val = event.currentTarget.innerHTML;
        this.num = -1;
        this.search(item);

      },
      search: function (item) {

        this.inputVal = item;

        window.location = 'http://myhome.parallaxsearch.com/web?qs=' + item;
      },

      up: function () {

        this.num--;
        if (this.num <= 0) {
          this.num = 0;
        }
        this.inputVal = this.result[this.num];

      },
      down: function () {

        this.num++;
        if (this.num > this.result.length - 1) {
          this.num = this.result.length - 1;
        }
        this.inputVal = this.result[this.num];

      },
      clear: function () {
        this.num = -1;
        this.inputVal = "";
        this.result = [];
      }
    },

    components: {}
  }


</script>
