(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0ed35f0a"],{"538b":function(t,a,s){},"5bfc":function(t,a,s){"use strict";s.r(a);var e=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"juisdiction"},[e("div",{staticClass:"btn"},[t.judata.jsgl_add?e("div",{staticClass:"refresh",on:{click:t.addPower}},[t._m(0)]):t._e()]),t.judata.jsgl_table?e("div",{staticClass:"order-Text"},[t._m(1)]):t._e(),t.judata.jsgl_table?e("div",{staticClass:"lounge-Information"},t._l(t.list,(function(a,s){return e("div",{key:s,staticClass:"Information"},[e("div",{staticClass:"blue"}),e("p",{staticClass:"name"},[t._v(t._s(a.branch))]),e("p",{staticClass:"time"},[t._v(t._s(a.describe))]),e("p",{staticClass:"time"},[t._v(t._s(a.creat_time))]),e("p",{staticClass:"time"},[t._v(t._s(a.update_date))]),e("p",{staticClass:"time"},[t._v(t._s(a.creator))]),e("div",{staticClass:"operation"},[t.judata.jsgl_see?e("el-button",{attrs:{size:"mini"},on:{click:function(e){return t.seeUser(a,s)}}},[t._v("查看人员")]):t._e(),t.judata.jsgl_edit?e("el-button",{attrs:{size:"mini"},on:{click:function(s){return t.changePower(a)}}},[t._v("编辑")]):t._e(),t.judata.jsgl_del?e("el-button",{staticClass:"del",attrs:{size:"mini"},on:{click:function(s){return t.delbranch(a)}}},[t._v("删除")]):t._e()],1)])})),0):t._e(),t.judata.jsgl_table?e("div",{staticClass:"Paging"},[e("el-pagination",{attrs:{background:"",layout:"prev, pager, next",total:t.count},on:{"current-change":t.changePage}})],1):t._e(),t.showModal?e("div",{staticClass:"mask",on:{click:function(a){t.showModal=!1}}}):t._e(),t.showModal?e("div",{staticClass:"pop"},[e("div",{staticClass:"head"},[e("h1",[t._v("添加部门")]),e("img",{attrs:{src:s("b7bf"),alt:""},on:{click:function(a){t.showModal=!1}}})]),e("div",{staticClass:"transverse"}),e("div",{staticClass:"center"},[e("div",{staticClass:"center_input"},[e("p",[t._v("部门名称：")]),e("el-input",{attrs:{placeholder:"请输入部门名称"},model:{value:t.input,callback:function(a){t.input=a},expression:"input"}})],1),e("div",{staticClass:"textarea"},[e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.remarks,expression:"remarks"}],staticClass:"bottominput",attrs:{name:"",id:"",cols:"30",rows:"10",placeholder:"请输入部门描述"},domProps:{value:t.remarks},on:{input:function(a){a.target.composing||(t.remarks=a.target.value)}}})])]),e("div",{staticClass:"footer"},[e("div",{staticClass:"btn"},[e("div",{staticClass:"cancel",on:{click:function(a){t.showModal=!1}}},[t._v("取消")]),e("div",{staticClass:"determine",on:{click:function(a){return t.addCommit(1)}}},[t._v("确定")])])])]):t._e(),t.editshowModal?e("div",{staticClass:"mask",on:{click:function(a){t.editshowModal=!1}}}):t._e(),t.editshowModal?e("div",{staticClass:"pop"},[e("div",{staticClass:"head"},[e("h1",[t._v("编辑部门")]),e("img",{attrs:{src:s("b7bf"),alt:""},on:{click:function(a){t.editshowModal=!1}}})]),e("div",{staticClass:"transverse"}),e("div",{staticClass:"center"},[e("div",{staticClass:"center_input"},[e("p",[t._v("部门名称：")]),e("el-input",{attrs:{placeholder:"请输入部门名称"},model:{value:t.input1,callback:function(a){t.input1=a},expression:"input1"}})],1),e("div",{staticClass:"textarea"},[e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.remarks1,expression:"remarks1"}],staticClass:"bottominput",attrs:{name:"",id:"",cols:"30",rows:"10",placeholder:"请输入部门描述"},domProps:{value:t.remarks1},on:{input:function(a){a.target.composing||(t.remarks1=a.target.value)}}})])]),e("div",{staticClass:"footer"},[e("div",{staticClass:"btn"},[e("div",{staticClass:"cancel",on:{click:function(a){t.editshowModal=!1}}},[t._v("取消")]),e("div",{staticClass:"determine",on:{click:function(a){return t.addCommit(2)}}},[t._v("确定")])])])]):t._e(),t.delshowModal?e("div",{staticClass:"mask",on:{click:function(a){t.delshowModal=!1}}}):t._e(),t.delshowModal?e("div",{staticClass:"pop1"},[e("div",{staticClass:"head"},[e("h1",[t._v("是否删除该部门")]),e("img",{attrs:{src:s("b7bf"),alt:""},on:{click:function(a){t.delshowModal=!1}}})]),e("div",{staticClass:"transverse"}),e("div",{staticClass:"center"}),e("div",{staticClass:"footer"},[e("div",{staticClass:"btn"},[e("div",{staticClass:"cancel",on:{click:function(a){t.delshowModal=!1}}},[t._v("取消")]),e("div",{staticClass:"determine",on:{click:t.deldateCommit}},[t._v("确定")])])])]):t._e()])},i=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{},[e("img",{attrs:{src:s("c55b"),alt:""}}),e("div",{staticClass:"btn-text"},[t._v("添加")])])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ul",[s("li",{staticClass:"name"},[t._v("部门名称")]),s("li",{staticClass:"time"},[t._v("部门描述")]),s("li",{staticClass:"time"},[t._v("添加时间")]),s("li",{staticClass:"time"},[t._v("修改时间")]),s("li",{staticClass:"time"},[t._v("操作人")]),s("li",{staticClass:"operation"},[t._v("操作")])])}],n=(s("b0c0"),s("1157"),s("9d7d")),c={data:function(){return{id:"",list:[],showModal:!1,editshowModal:!1,delshowModal:!1,count:0,input:"",input1:"",remarks:"",remarks1:"",page:1,limit:10,branch:"",branchinfo:"",creator:JSON.parse(localStorage.getItem("WuDaoeducation")),judata:{},timer:null}},created:function(){this.render(),this.changePower1()},beforeDestroy:function(){clearTimeout(),clearTimeout(this.timer)},methods:{changePower1:function(t,a){var s=JSON.parse(localStorage.getItem("WuDaoeducation"));if(""!=s.data.jurisdiction){for(var e=JSON.parse(s.data.jurisdiction),i=this.$route.name,n=[],c={},o=0;o<e.length;o++)for(var r=0;r<e[o].children.length;r++)for(var l=0;l<e[o].children[r].children.length;l++)e[o].children[r].name==i&&(n.push(e[o].children[r].children[l].path),1==e[o].children[r].children[l].isShow?c[n[l]]=!0:c[n[l]]=!1);this.judata=c}else;},render:function(){var t=this,a=this;this.page=1;var s=this.$loading({lock:!0,text:"Loading",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"});n["a"].getBranch({page:this.page,listrows:this.limit}).then((function(e){a.list=e.data.data,a.count=e.data.count,t.timer=setTimeout((function(){s.close()}))})).catch((function(a){t.$message({message:"网络错误请稍后再试",type:"error"})}))},addPower:function(){this.showModal=!0},seeUser:function(t,a){this.$router.push({name:"jurisdictionuser",query:{id:t.id,branch:t.branch}})},changePower:function(t){this.input1=t.branch,this.branch=t.id,this.remarks1="",this.editshowModal=!0},delbranch:function(t){this.branchinfo=t,this.delshowModal=!0},changePage:function(t){this.page=t,n["a"].getBranch({page:this.page,listrows:this.limit}).then((function(t){_this.list=t.data.data,_this.count=t.data.count}))},addCommit:function(t){var a=this;if(1==t){var s=this;n["a"].addBranch({branch:s.input,describe:s.remarks,creator:s.creator.data[0].name}).then((function(t){200==t.data.code&&(a.$message({message:"添加成功",type:"success"}),s.showModal=!1,a.render())}))}else if(2==t){var e=this;n["a"].editBranch({id:e.branch,branch:e.input1,describe:e.remarks1,creator:e.creator.data[0].name}).then((function(t){200==t.data.code&&(a.$message({message:"编辑成功",type:"success"}),e.editshowModal=!1,a.render())}))}},deldateCommit:function(){var t=this,a=this;n["a"].delBranch({id:this.branchinfo.id,creator:this.creator.data[0].name}).then((function(s){200==s.data.code&&(t.$message({message:"删除成功",type:"success"}),a.delshowModal=!1,a.render())}))}}},o=c,r=(s("ab57"),s("2877")),l=Object(r["a"])(o,e,i,!1,null,"2f739bf3",null);a["default"]=l.exports},ab57:function(t,a,s){"use strict";var e=s("538b"),i=s.n(e);i.a},b7bf:function(t,a){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAACUklEQVRYR73Yv4sTQRQH8O/bXfBHqZU/ikONcIJWB1qpKDbu7DR2gpX4R9loZ2nITojdHeIVFsKh3FkIglec3Z1/QMiM7HIbJslm5+feFGk2mfnw3sybtyHO+ZZS6j2ATQC7RPSyLMu/OIOR5/kNIvpARFsAvidJ8mo0Gv2slqaiKA4A3GkcRPRLSvlkPB4f9WnjnN8CsKOUuq6t/aUsy4cNTC0D+sa1oU4N/4QQlxrYZwC1Uh994TpQ1fIfhRAvahhj7BoR7QAY9I0zoPayLHs2HA6Pa1j1cRY4F9Qc1jfOFbUA6wvng1qBxcb5olphsXAhqLWwUFwoqhPmi2OMDZIk2dYrulaGFkpC181Sl4uu4VJKYqGMEWvANjgAF2NEqlnTGDEbHIA/AM4BuNISfev0LVyJplTqz7sit2YeL5R1Kj1x3igvmHZadwFsrInUfpZlj5sL2SUrzntsKWoDIqrapbY9BaXUbwCPQppN682vHYKuOjX3h/ZzTjBDnVrJWAjOGmZA7SulLhDRzWWdL84KZlPRp9Pp+dMCezsGzgizQTWnr6pzsXCdMBeUfkPEwK2F+aBi4lphIahYuBVYDFQM3AIsJioUN4f1gQrBNS+8UdphUyfsclopxouDbffgUueq/y6+EtH9WJ2nCdmFA/BJCPG87seKopgBSJYmDGryAnAnQojLNYwx9oOI7mqT9YoyHIhtIcTTGpbn+Waapm+llPeqzZmm6ZuQztMULf055/wqgHdSygdE9G02m72eTCaH3q21y+K+3zV2F74Th/7uP+KATEWXpNQUAAAAAElFTkSuQmCC"},c55b:function(t,a){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAArUlEQVQ4T2NkIABS1v6XYWJjOAtS9u8Xg/GcYMYn+LQwEjIwbdN/GwZGhsMgdYwMDC4zfRn3jhqIEgIjMQyTNv6XYmNlUMSVFP79Y9Bj+M8wDST/n4GhgJmZ4Qwutb9+M9xnTNv8/yUDA4MYofRIpPxLkIGvGBgYRInUQEjZK0aQl5n/M2jhUvmfiUGHiZGhHypf9v8vw3lcav8yMlwbicmGUCiPljaUF7CkVgEAz51xbmvZN0cAAAAASUVORK5CYII="}}]);