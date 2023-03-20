## 功能介绍
- APP VUE绝对支持，其它需要自己测试，应该也是支持的。
- 支持自定义行列的宫格。
- 支持点击事件。

## 使用方法
- 源码方式  
  1. 点击上方的使用 `HBuilder X` 导入插件或将下载的插件包拷贝到项目根目录里
  2. 在需要使用页面的 `(n)vue` 文件中添加  
     ```html
     <zy-slideitem :slidelist="list" :rows="'100%'" :thumburl="http://www.www.com/"
      :imgheight="120" :colums="'33.33% 33.33% 33.33%'" 
     :heights="360" @click="sildeclick">
     ```
     ```javascript
     export default {
       // HBuilderX 2.5.5+ 可以通过 easycom 自动引入
       components: {
         
       },
       data() {
         return {
           list: [
			   {id:1,title:"标题",thumb:"2022/12342.jpg"},
			   {id:2,title:"标题",thumb:"2022/12342.jpg"},
			   {id:3,title:"标题",thumb:"2022/12342.jpg"},
			   {id:4,title:"标题",thumb:"2022/12342.jpg"},
			   {id:5,title:"标题",thumb:"2022/12342.jpg"}
		   ]
         }
       }
     }
     ```

## 组件属性

| 属性 | 类型 | 默认值 | 说明 |
|:---:|:---:|:---:|---|
| slidelist | Array |  | JSON数组[{},{}] |
| rows | String | '50% 50%' | 行数，百分比，一行则 '100%' |
| thumburl | String | 默认为空，或手动指定图片前缀，有些返回的图片没有域名时可手动指定前缀 |  |
| imgheight | Number |  | 图片高度 |
| heights | Number |  | 组件高度 |

## 组件事件

| 名称 | 触发时机 |
|:---:|---|
| click | 点击事件，sildeclick(data),data返回每个元素的数组，console.log(JSON.stringify(data)) |


## 问题反馈
组件很简单，仅作为宫格幻灯用，比如人气推荐等位置可用，本人用的HBX-A版，时时保持最新，目前APP端没遇到问题，由于暂无其它端的开发，所以其它端需要自己测试。
有问题可在此留言。邮箱46708420@qq.com
