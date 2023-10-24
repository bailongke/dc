<template>
  <div class="w">
    <div class="head">
      <div class="logo">
        <a href="#" title="dc" @click="home()"></a>
      </div>
      <div class="slogan">欢迎来到本网站</div>
      <el-button round class="btn" @click="dialogVisible = true" v-if="this.$store.state.bind">qq绑定</el-button>
      <div v-else="!this.$store.state.bind" class="qq">{{
        '[' + this.qqForm.corpTicker + ']' + this.qqForm.nickName + '-' + this.qqForm.characterName }}
        <el-button round class="btn1" @click="qqxiu">修改</el-button>
      </div>
    </div>
    <div class="bar">
      <!-- 军团相关 -->
      <div class="dc fl" @click="eve_switch_pap()" v-bind:class="{ bgc: clickli === 0 }">
        pap详情
      </div>
      <!-- 军团其他内容 -->
      <div class="dcqt fr">
        <ul>
          <li><a href="#" @click="eve_switch_papph()" v-bind:class="{ bgc: clickli === 1 }">pap排行</a>
          </li>
          <li><a href="#" @click="eve_switch_gspap()" v-bind:class="{ bgc: clickli === 2 }">公司pap排行</a></li>
          <li><a href="#" @click="eve_switch_dcsj()" v-bind:class="{ bgc: clickli === 3 }">联盟数据可视化</a>
          </li>
          <li><a href="#" @click="eve_switch_dcss()" v-bind:class="{ bgc: clickli === 4 }">联盟税收</a></li>
          <li><a href="#" @click="eve_switch_dcqq()" v-bind:class="{ bgc: clickli === 5 }">联盟qq群</a></li>
        </ul>
      </div>

    </div>
    <!-- //主体 -->
    <div class="main">
      <router-view></router-view>
      <!-- 悬浮框 -->
      <div class="card">
        <el-card class="box-card">
          <Dcqq></Dcqq>
        </el-card>
      </div>
    </div>

    <!-- qq绑定弹出框 -->
    <el-dialog title="QQ绑定" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <el-form :model="form" :rules="rules" ref="formRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="QQ号码" prop="qq">
          <el-input v-model="form.qq" placeholder="请输入qq号"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="name">
          <el-input v-model="form.name" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item label="角色名" prop="character">
          <el-input v-model="form.character" disabled></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="qqBind">确 定</el-button>
      </span>
    </el-dialog>
    <!-- qq修改 -->
    <el-dialog title="修改" :visible.sync="xdialogVisible" width="50%" :before-close="handleClose">
      <el-form :model="xform" :rules="xrules" ref="xformRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="QQ号码" prop="qqNumber">
          <el-input v-model="xform.qqNumber" placeholder="请输入qq号"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input v-model="xform.nickName" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item label="角色名" prop="characterName">
          <el-input v-model="xform.characterName" disabled></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="xdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="qqXiuGai">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Dcqq from '@/components/dcqq/Dcqq.vue'

export default {
  components: {
    Dcqq
  },
  data() {
    return {
      dialogVisible: false,
      xdialogVisible: false,
      form: {
        qq: '',
        name: '',
        character: '',
      },
      xform: {
        qqNumber: '',
        nickName: '',
        characterName: '',
      },
      rules: {
        qq: [
          { required: true, message: '请输入qq号', trigger: 'blur' },
          {
            validator: function (rule, value, callback) {
              //  校验数字的正则
              if (/^[0-9]*$/.test(value) == false) {
                callback(new Error("请输入qq号"));
              } else {
                //校验通过
                callback();
              }
            },
            trigger: "blur",
          }
        ],
        name: [{ required: true, message: '请输入昵称', trigger: 'blur' },]
      },
      xrules: {
        qq: [
          { required: true, message: '请输入qq号', trigger: 'blur' },
          {
            validator: function (rule, value, callback) {
              //  校验数字的正则
              if (/^[0-9]*$/.test(value) == false) {
                callback(new Error("请输入qq号"));
              } else {
                //校验通过
                callback();
              }
            },
            trigger: "blur",
          }
        ],
        name: [{ required: true, message: '请输入昵称', trigger: 'blur' },]
      },
      clickli: 0,
      //get接口活动的表单
      qqForm: {},
      cookie: '',
      bar: 'Bearer',
      token: '',
      arr: [],
      result: '',
    }
  },
  methods: {
    home() {
      this.$router.push('/')
    },
    async getQQ() {
      this.getCookie();
      const { data: res } = await this.$http({
        method: 'get',
        url: 'https://tools.dc-eve.com/qq/bind',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.cookie,
        },
      })
      this.qqForm = res.data;
      this.form.character = this.qqForm.characterName
      console.log(this.qqForm);
      if (res.data.qqNumber == 0) {
        this.$store.state.bind = true
      } else {
        this.$store.state.bind = false
      }
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    qqBind() {
      this.$refs.formRef.validate(async (validate) => {
        this.getCookie();
        this.qqForm.nickName = this.form.name;
        this.qqForm.qqNumber = this.form.qq;
        if (validate) {
          const { data: res } = await this.$http({
            method: 'post',
            url: 'https://tools.dc-eve.com/qq/bind',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': this.cookie,
            },
            data: this.qqForm
          })
          console.log(res);
          this.$store.state.bind = false;
          alert(res.message);
          this.dialogVisible = false;
        } else {
          alert('请填写所有数据')
        }
      })




    },
    //修改对话框
    qqxiu() {
      this.xform = this.qqForm;
      this.xdialogVisible = true;
    },
    async qqXiuGai() {
      this.$refs.xformRef.validate(async (validate) => {
        this.qqForm.nickName = this.xform.nickName;
        this.qqForm.qqNumber = this.xform.qqNumber;
        this.getCookie();
        if (validate) {
          const { data: res } = await this.$http({
            method: 'post',
            url: 'https://tools.dc-eve.com/qq/bind',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': this.cookie,
            },
            data: this.qqForm
          })
          console.log(res);
          this.getQQ();
          alert(res.message);
          this.xdialogVisible = false;
        } else {
          alert('请填写所有数据')
        }
      })



    },
    eve_switch_pap() {
      this.clickli = 0;
      this.$router.push('/pap');
    },
    eve_switch_papph() {
      this.clickli = 1;
      this.$router.push('/');
    },
    async eve_switch_gspap() {
      this.clickli = 2;
    },
    eve_switch_dcsj() {
      this.clickli = 3;
      this.getQQ()
    },
    eve_switch_dcss() {
      this.clickli = 4;

      //  this.getCookie();

    },
    eve_switch_dcqq() {
      this.clickli = 5;
      this.$router.push('/dcqq');
    },
    getCookie() {

      this.arr = document.cookie.split(";")
      for (var i = 0; i < this.arr.length; i++) {
        var arr1 = this.arr[i].split("=")     //将名/值对以“=”分割开
        if (arr1[0] == "tools_remember") {
          this.result = arr1[1];  //如果名为name,则结果result为名对应的值
        }
      }

      this.cookie = this.bar.concat(" ", this.result);
      if (this.cookie.length < 8) {
        window.location.replace("https://seat.dc-eve.com")
      }

    }

  },
  mounted() {
    this.getQQ();
  },


}
</script>

<style lang="less" scoped>
.w {
  position: relative;

  .head {
    width: 100%;
    height: 150px;
    background-image: url(../assets/image/bg.gif) !important;
    position: relative;

    .logo {
      position: absolute;
      top: 10px;
      left: 60px;
      width: 175px;
      height: 56px;

      a {
        display: block;
        overflow: hidden;
        height: 130px;
        width: 130px;
        background: url(https://images.evetech.net/alliances/99009163/logo?tenant=tranquility&size=128) no-repeat;
        // background-color: red;
      }

    }

    //标语
    .slogan {
      text-align: center;
      color: aqua;
      font-size: 50px;
      display: block;
      position: absolute;
      top: 35px;
      right: 500px;

    }

    .btn {
      position: absolute;
      height: 50px;
      width: 100px;
      top: 50px;
      right: 100px;
    }

    .qq {
      position: absolute;
      height: 50px;
      width: 300px;
      top: 50px;
      right: 50px;
      color: rgb(236, 241, 241);
      font-size: 20px;

      .btn1 {
        position: absolute;
        height: 50px;
        width: 100px;
        top: 30px;
        right: 100px;
      }
    }
  }

  .bar {
    position: absolute;
    top: 150px;
    height: 45px;
    width: 100%;
    border-bottom: 4px solid #b1191a;

    .dc {
      width: 209px;
      height: 45px;
      font-size: 16px;
      line-height: 45px;
      text-align: center;
    }

    li {
      float: left;

      a {
        display: block;
        height: 45px;
        padding: 0 25px;
        line-height: 45px;
        font-size: 16px;
      }
    }

    .bgc {
      background-color: #b1191a;
      color: #fff;
    }

  }

  .main {
    position: relative;
    top: 49px;
    height: 1080px;

    .card {
      width: 150px;
      position: absolute;
      top: 0px;
      right: -150px;
      z-index: 9999;

      .box-card {
        height: 210px;
        width: 150px;

        /deep/.el-card__body {
          padding: 0;
        }
      }
    }
  }


}
</style>