<template>
  <div class="login-view">
    <!-- <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.code"
          type="text"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <img :src="verify" @click="changeCode" alt="" class="verify">
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>
    </el-form> -->
    <div class="left-img">
      <img src="@/assets/login.png" mode="widthFix" alt="">
    </div>
    <div class="right-box">
      <p class="title">登录</p>
      <p class="en-title">Sign in</p>
      <div class="item">
        <p class="name">账户</p>
        <div class="input">
          <input type="text" v-model="loginForm.username">
        </div>
      </div>
      <div class="item">
        <p class="name">密码</p>
        <div class="input">
          <input type="password" v-model="loginForm.password">
        </div>
      </div>
      <!-- <div class="code-item">
        <p class="name">验证码</p>
        <div class="input">
          <input type="text" v-model="loginForm.code">
          <img :src="verify" @click="changeCode" alt="" class="verify1">
        </div>
      </div> -->
      <div class="login-btn" @click="handleLogin">登录</div>
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
        username: 'admin',
        password: 'admin',
        code:'',
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      verify:'',
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
  },
  methods: {
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
      this.verify = 'https://customerservice.lvdunyun.cn/customerservice/v1/Login/verify?'+Date.parse(new Date())
    },
    handleLogin() {
      this.$store.dispatch('user/login', this.loginForm).then(() => {
        this.$router.push({ path: this.redirect || '/' })
        // this.loading = false
      }).catch(() => {
        // this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .login-view{
    width: 100%;
    height: 100vh;
    background-color: #C6E2EC;
    display: flex;
    .left-img{
      width: 1800px;
      height: 100%;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .right-box{
      flex-grow: 1;
      height: 100%;
      padding-left: 120px;
      padding-right: 100px;
      padding-top: 250px;
      box-sizing: border-box;
      .title{
        color: #2E3033;
        font-size: 70px;
        font-weight: bold;
        margin: 0;
      }
      .en-title{
        color: #2E3033;
        font-size: 40px;
        font-weight: bold;
        margin: 0;
        margin-bottom: 50px;
      }
      .item{
        width: 100%;
        margin-bottom: 20px;
        .name{
          color: #2E3033;
          margin: 0;
          font-size: 27px;
          line-height: 40px;
        }
        .input{
          width: 100%;
          height: 66px;
          input{
            width: 100%;
            height: 100%;
            border-radius: 10px;
            background-color: #EDF2FA;
            border: none;
            outline: none;
            font-size: 27px;
            line-height: 60px;
            padding: 0 20px;
            box-sizing: border-box;
          }
        }
      }
      .code-item{
        width: 100%;
        margin-bottom: 20px;
        .name{
          color: #2E3033;
          margin: 0;
          font-size: 27px;
          line-height: 40px;
        }
        .input{
          width: 100%;
          height: 66px;
          display: flex;
          justify-content: space-between;
          input{
            width: 260px;
            height: 100%;
            border-radius: 10px;
            background-color: #EDF2FA;
            border: none;
            outline: none;
            font-size: 27px;
            line-height: 60px;
            padding: 0 20px;
            box-sizing: border-box;
          }
          .verify1{
            width: 240px;
            height: 100%;
            cursor: pointer;
          }
        }
      }
      .login-btn{
        width: 100%;
        height: 60px;
        border-radius: 10px;
        text-align: center;
        line-height: 60px;
        background-color: #22BFAB;
        color: #fff;
        font-size: 27px;
        font-weight: bold;
        margin-top: 100px;
        cursor: pointer;
      }
    }
  }
</style>


<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-form-item__content{
    width: 100%;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 75%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 5px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-flex;
    align-items: center;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
.verify{
  position: absolute;
  top: 0;
  right: 0;
  width: 150px;
  height: 47px;
  cursor: pointer;
}
</style>
