<template>
    <div class="whole">
        <div class="login">
            <div class="text">
                <div class="text_head">
                    <div class="head">广州吾导教育科技 </div>
                    <div class="bottom">Welcome to the GUANGZHOUWUDAOJIAOYVKEJI backend system</div>
                </div>
                <div class="text_bottom">
                    <!-- <div class=""><img src="@/assets/logo.png" alt=""></div> -->
                    <div class="">后台系统</div>
                </div>
            </div>
            <div class="login_window">
                <div class="window_box">
                    <div class="imge"><img src="@/assets/账户.png" alt=""></div>
                    <div class="input">
                        <input type="text" name="username" AUTOCOMPLETE="off" placeholder="账户" v-model="loginForm.username">
                    </div>
                </div>
                <div class="window_box">
                    <div class="imge"><img src="@/assets/密码.png" alt=""></div>
                    <div class="input">
                        <input ref="password" name="password" autocomplete="off" placeholder="密码" v-model="loginForm.password" @focus="handleFocus" />
                        <!-- <i class="icon" v-if="hide" @click="changeType()"></i>
                        <i class="icon1" v-else @click="changeType()"></i> -->
                    </div>
                </div>
                <div class="window_box">
                    <div class="imge"><img src="@/assets/验证码.png" alt=""></div>
                    <div class="input1">
                        <input type="text" placeholder="验证码" v-model="loginForm.code">
                        <img :src="verify" alt="" class="verify1" @click="changeCode">
                    </div>
                </div>
                <div class="btn"><div class="login_btn"  @click="handleLogin">登录</div></div>
            </div>
        </div>
        
    </div>
</template>
<script>
import { validUsername } from '@/utils/validate'

export default {
name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback()
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback()
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: '',
        code:'',
        verify_id:'',
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      verify:'',
      id:'',
      hide:true,
      hide1:false,
      inputType1:'password',
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  mounted(){
    document.ondragstart = function() {
        return false;
    };
    this.changeCode()
    //绑定监听回车事件
    window.addEventListener('keydown',this.keyDown);
  },
  destroyed(){
    //销毁回车事件
    window.removeEventListener('keydown',this.keyDown,false);
  },
  methods: {
    keyDown(e){
      //如果是回车则执行登录方法
      if(e.keyCode == 13){
        this.handleLogin();
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    changeCode(){
      this.id = Date.parse(new Date())
      // this.verify = 'https://yszx.gxlvdunyun.com/ljairport/v1/Power/verify?id='+this.id
      this.verify = 'https://wudao.gxhxinfo.com/user/v1/Admin/verify?id='+this.id
    },
    handleLogin() {
      // return false
      this.loginForm.verify_id = this.id
      this.$store.dispatch('user/login', this.loginForm).then(() => {
        this.$router.push({ path: this.redirect || '/' })
        // this.loading = false
      }).catch(() => {
        // this.loading = false
      })
    },
    // 点击密码框的显示和不显示
    changeType() {
      if (this.hide) {
					this.hide = false
					this.$refs.password.type = 'text'
			} else {
					this.hide = true
					this.$refs.password.type = 'password'
			}
    },
    //点击input焦点，将type改为密码类型
    handleFocus(){
      this.$refs.password.type = 'password'
      this.hide = true
    }
  }
}
</script>

<style lang="scss" scoped>
.whole{
    width: 100%;
    height: 100%;
    background:url(../../assets/Login2.jpg) no-repeat;
    background-size: cover;
    background-attachment: fixed;
    .inputPsd{
    -webkit-text-security:disc;
    }
    .login{
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%,-40%);
        // background: rgb(136, 0, 0);
        .login_window{
            // width: 580px;
            // height: 400px;
            background: rgba(0, 0, 0, 0.5);
            // opacity: 0.6;
            border-radius: 20px;
            padding: 61px 62px 47px 62px;
            .window_box{
                height: 74px;
                width: 100%;
                border-bottom: solid #fff 1px;
                display: flex;
                .imge{
                    display: flex;
                    align-items: center;
                    img{
                        width: 28px;
                        height: 28px;
                    }
                }
                .input{
                    width: 100%;
                    height: 100%;
                    // padding-left: 31px;
                    font-size: 18px;
                    // background: chartreuse;
                    display: flex;
                    align-items: center;
                    input{
                        width: 100%;
                        height: 100%;
                        border-radius: 10px;
                        // opacity: 0.1;
                        background: rgba(0, 0, 0, 0);
                        color: #999999;
                        font-weight: 400;
                        border: none;
                        outline: none;
                        font-size: 18px;
                        line-height: 60px;
                        padding: 0 20px;
                        box-sizing: border-box;
                    }
                }
                .input1{
                    width: 100%;
                    height: 100%;
                    // padding-left: 31px;
                    font-size: 18px;
                    display: flex;
                    align-items: center;
                    input{
                        width: 100%;
                        height: 100%;
                        border-radius: 10px;
                        // opacity: 0.1;
                        background: rgba(0, 0, 0, 0);
                        color: #999999;
                        font-weight: 400;
                        border: none;
                        outline: none;
                        font-size: 18px;
                        line-height: 60px;
                        padding: 0 20px;
                        box-sizing: border-box;
                    }
                    .verify1{
                        width: 14rem;
                        height: 70%;
                        cursor: pointer;
                    }
                }
            }
            .btn{
                margin-top: 55px;
                width: 100%;
                display: flex;
                justify-content: center;
            }
            .icon{
              content: '';
              min-width: 28px;
              height: 28px;
              margin: 20px 10px 0 0;
              background-image: url(../../assets/密码不显示.png);
              cursor: pointer;
              background-position: center center;
              background-size: 28px 28px;
	            background-repeat: no-repeat;
              display: inline-block;
            }
            .icon1{
              content: '';
              min-width: 28px;
              height: 28px;
              margin: 10px 10px 0 0;
              background-image: url(../../assets/密码显示.png);
              cursor: pointer;
              background-position: center center;
              background-size: 28px 28px;
	            background-repeat: no-repeat;
              display: inline-block;
            }
        }
        .text{
            margin-bottom: 34px;
            .text_head{
                text-align: center;
                margin-bottom: 10px;
                .head{
                    font-size: 90px;
                    font-family: '黑体';
                    font-weight: 800;
                    color: #FFFFFF;
                    margin-bottom: 12px;
                }
                .bottom{
                    font-size: 12px;
                    // font-family: 黑体;
                    font-weight: 400;
                    color: #FFFFFF;
                }
            }
            .text_bottom{
                display: flex;
                justify-content: center;
                img{
                    width: 30px;
                    height: 30px;
                }
                font-size: 30px;
                font-family: 黑体;
                font-weight: 500;
                color: #FFFFFF;
            }
        }
    }
}
.login_btn{
    width: 343px;
    height: 40px;
    background: #295FCC;
    border-radius: 20px;
    padding: 5px 10px;
    font-size: 16px;
    // font-family: Source Han Sans CN;
    font-weight: bold;
    color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
*{
    margin: 0;
    padding: 0;
}
.cavs{
    z-index:1;
    position: fixed;
    width:95%;
    margin-left: 20px;
    margin-right: 20px;
}

// html,body{
//     width: 100%;
//     height: 100%;
//     background: url("../image/bg1.jpg") no-repeat;
//     background-size: 100% 100%;

// }



.loginmain{
    background: rgba(0, 0, 0, 0.5);
    width: 540px;
    height: 300px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    padding: 100px 40px 40px 40px;
    box-shadow: -15px 15px 15px rgba(6, 17, 47, 0.7);
    z-index: 99999;
}
.login-title{
    color: #D3D7F7;
    height: 60px;
    font-size:20px;
    text-align: center;
    margin-top: -20px;
}
.login-con{
    height: 208px;
    position: absolute;
    left: 0;
    width: 80%;
    margin:0 10%;
}
.login-user{
    position: relative;
}
.icon{
    position: absolute;
    z-index: 1;
    left: 36px;
    top: 8px;
    opacity: 1;
}
.login-con input{
    width: calc(100% - 130px);
    margin-top: -2px;
    background: rgba(57, 61, 82, 0);
    left: 0;
    padding: 10px 65px;
    border-top: 2px solid rgba(57, 61, 82, 0);
    border-bottom: 2px solid rgba(57, 61, 82, 0);
    border-right: none;
    border-left: none;
    outline: none;
    font-family: 'Gudea', sans-serif;
    box-shadow: none;
    color: #61BFFF !important;
}
.login-pwd, .login-yan{
    position: relative;
}
/*
.login-pwd .icon{
    position: absolute;
    z-index: 1;
    left: 36px;
    top: 8px;
    opacity: .5;
}*/
.login-btn{
    width: 80%;
    margin: 0 auto;
    position: relative;
}
.login-btn input{
    border-radius: 3px;
    background: transparent;
    border: 2px solid #4FA1D9;
    color: #4FA1D9;
    text-transform: uppercase;
    font-size: 11px;
    cursor: pointer;
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;

    margin: auto;
    width: 80%;
    transition-property: background,color;
    -webkit-transition-duration: .2s;
    transition-duration: .2s;
}
.login-btn input:hover{
    color: white !important;
    background: #4FA1D9;
    cursor: pointer;
    -webkit-transition-property: background,color;
    transition-property: background,color;
    -webkit-transition-duration: .2s;
    transition-duration: .2s;
}
</style>