<template>
        <div class="lounge-Information">
            <ul v-for="(item,index) of list" :key="index">
                <li>{{item.name}}</li>
                <li>{{item.time}}</li>
                <li>{{item.tstitle}}</li>
                <li>{{item.yjtitle}}</li>
                <li>
                    <div class="operation">
                        <div>查看</div>
                    </div>
                </li>
            </ul>
            <div class="Paging">
                <el-pagination @current-change="handleCurrentChange" background layout="prev, pager, next" :total="100"></el-pagination>
            </div>
        </div>
</template>

<script>

export default {
    data(){
        return{
            list:[
                {name:"海王",time:"2020-10-12 13:55:16",tstitle:"一个月了！这么久都不退款给我！！",yjtitle:"退款按钮太难找了，明显一点"},
                {name:"海王",time:"2020-10-12 13:55:16",tstitle:"一个月了！这么久都不退款给我！！",yjtitle:"退款按钮太难找了，明显一点"},
                {name:"海王",time:"2020-10-12 13:55:16",tstitle:"一个月了！这么久都不退款给我！！",yjtitle:"退款按钮太难找了，明显一点"},
                {name:"海王",time:"2020-10-12 13:55:16",tstitle:"一个月了！这么久都不退款给我！！",yjtitle:"退款按钮太难找了，明显一点"},
                {name:"海王",time:"2020-10-12 13:55:16",tstitle:"一个月了！这么久都不退款给我！！",yjtitle:"退款按钮太难找了，明显一点"},
                // {name:"海王",time:"2020-10-12 13:55:16",tstitle:"一个月了！这么久都不退款给我！！",yjtitle:"退款按钮太难找了，明显一点"},
                // {name:"海王",time:"2020-10-12 13:55:16",tstitle:"一个月了！这么久都不退款给我！！",yjtitle:"退款按钮太难找了，明显一点"},
                // {name:"海王",time:"2020-10-12 13:55:16",tstitle:"一个月了！这么久都不退款给我！！",yjtitle:"退款按钮太难找了，明显一点"},
                // {name:"海王",time:"2020-10-12 13:55:16",tstitle:"一个月了！这么久都不退款给我！！",yjtitle:"退款按钮太难找了，明显一点"},
                // {name:"海王",time:"2020-10-12 13:55:16",tstitle:"一个月了！这么久都不退款给我！！",yjtitle:"退款按钮太难找了，明显一点"},
                // {name:"海王",time:"2020-10-12 13:55:16",tstitle:"一个月了！这么久都不退款给我！！",yjtitle:"退款按钮太难找了，明显一点"},
                // {name:"海王",time:"2020-10-12 13:55:16",tstitle:"一个月了！这么久都不退款给我！！",yjtitle:"退款按钮太难找了，明显一点"},
                // {name:"海王",time:"2020-10-12 13:55:16",tstitle:"一个月了！这么久都不退款给我！！",yjtitle:"退款按钮太难找了，明显一点"},
                // {name:"海王",time:"2020-10-12 13:55:16",tstitle:"一个月了！这么久都不退款给我！！",yjtitle:"退款按钮太难找了，明显一点"}
            ]
        }
    }

}
</script>

<style scoped>
.operation input{
    outline-style: none;
}
.lounge-Information{
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow: hidden;
    overflow-y: auto;
    height: 0;
}
.lounge-Information ul{
    background: #FFFFFF;
    width: 98%;
    height: 80px;
    margin: 0.5% auto;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.lounge-Information ul li{
    height: 80px;
    line-height: 80px;
    list-style: none;
    text-align: left;
}
p{
    float: left;
}
.Id{
    width: 136px;
    height: 36px;
    word-break: break-all;
}
.Lounge{
    width: 200px;
    height: 40px;
}
.operation div{
    width: 76px;
    height: 28px;
    border-radius: 5px;
    background: #ffffff;
    border: 1px solid #CCCCCC;
    text-align: center;
    line-height: 28px;
}
.operation div:hover{
    cursor: pointer;
}
.del{
    background-color: #ffffff;
    color: #CCCCCC;
}
.operation{
    width: 264px;
    height: 28px;
    margin: 0 auto;
    /* margin-top: 20px; */
    display: flex;
    justify-content: space-between;
}
.operation div{
    margin: 0 auto;
}
.operation input:hover{
    cursor: pointer;
}
.model{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0, 0,0.5);
    z-index: 100;
}
.exmodel{
    position: absolute;
    top: 45%;
    left: 45%;
    width: 20%;
    height: 200px;
    background: #FFFFFF;
}
.Paging{
    padding: 1% 0;
    text-align: center;
}
</style>