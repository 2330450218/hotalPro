<template>
  <!-- 用户信息管理---需要进一步修改 -->
  <div>
    <el-table
      :data="users.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      border
      style="width: 95%"
      ref="multipleTable"
      max-height="403"
      @selection-change="handleSelectionChange"
      @cell-dblclick="changeEditable"
      :row-key="tableId"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column fixed prop="id" label="id" width="150"></el-table-column>
      <el-table-column label="用户名" width="120">
        <!-- prop="name" -->
        <template slot-scope="scope">
          <div :contenteditable="iseditable"  @blur="loseBlur($event,scope.row,bid='1')"  >{{scope.row.name}}</div>
        </template>
      </el-table-column>
      <el-table-column label="手机号码" width="120">
        <!-- prop="phone"  -->
        <template slot-scope="scope">
          <div :contenteditable="iseditable"   @blur="loseBlur($event,scope.row,bid='2')">{{scope.row.phone}}</div>
        </template>
      </el-table-column>
      <el-table-column label="生日" width="120">
        <!-- prop="birth" -->
        <template slot-scope="scope">
          <div :contenteditable="iseditable"  @blur="loseBlur($event,scope.row,bid='3')">{{scope.row.birth}}</div>
        </template>
      </el-table-column>
      <el-table-column label="地址" width="120">
        <!-- prop="address" -->
        <template slot-scope="scope">
          <div :contenteditable="iseditable"  @blur="loseBlur($event,scope.row,bid='4')"  >{{scope.row.address}}</div>
        </template>
      </el-table-column>
      <el-table-column label="管理员" width="80">
        <!-- prop="isroot" -->
        <template slot-scope="scope">
          <div :contenteditable="iseditable"  @blur="loseBlur($event,scope.row,bid='5')"  >{{scope.row.isroot}}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" width="120" fixed="right">
        <template slot="header">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="updateusers(scope.row)">修改</el-button>
          <el-button type="text" size="small" @click="deleteUser(scope.row,scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[5, 10]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="Number(totallength)"
        style="margin:10px 20px;width:80%;float:left"
      ></el-pagination>
      <el-button type="primary" plain style="float:left;margin:10px auto;" @click="toaddPage">添加新的记录</el-button>
    </div>
    <!-- 模态弹窗 -->
    <div v-if="ischecked" class="modal" @click.self="returnPage">
      <div class="addmodal">
        <div class="addform">
          <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
            <el-form-item label="用户名">
              <el-input v-model="sizeForm.name"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="sizeForm.pwd"></el-input>
            </el-form-item>
            <el-form-item label="手机号码">
              <el-input v-model="sizeForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="生日">
              <el-input v-model="sizeForm.birth"></el-input>
            </el-form-item>
            <el-form-item label="地址">
              <el-input v-model="sizeForm.address"></el-input>
            </el-form-item>
             <el-form-item label="isroot">
              <el-input v-model="sizeForm.isroot"></el-input>
            </el-form-item>
          </el-form>
          <div class="btn">
            <el-button type="primary" @click="adduser">确认添加</el-button>
            <el-button type="primary" @click="toreset">重置</el-button>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      iseditable: "false",
      //页码
      pagenum: "1",
      //条数
      pagesize: "5",
      // 数据获取长度
      totallength: "",
     
      multipleSelection: [],
      users: [],
      ischecked: false,
      search: "",
      sizeForm: {
        name: "",
        phone: "",
        address: "",
        birth: "",
        pwd: "",
        isroot:"",
      },
      currentPage4: 1,
    };
  },
  created() {
    this.getusers();
  },
  mounted(){

  },
  methods: {
     //获取当前行唯一id
    tableId(row){
      return row.individualId
    },
    // 添加用户信息
    adduser(){
      this.$http.post("/register",{
       name: this.sizeForm.name,
        phone: this.sizeForm.phone,
        address: this.sizeForm.address,
        birth: this.sizeForm.birth,
        pwd:this.sizeForm.pwd ,
        isroot:this.sizeForm.isroot,
      }).then(r=>{
        console.log("数据库添加成功");
        this.getusers()
      }).catch()
    },

    //请求服务器展示用户信息
    getusers() {
      this.$http
        .get("/showUsers", {
          params: {
            pagenum: this.pagenum,
            pagesize: this.pagesize,
          },
        })
        .then((r) => {
          console.log(r.data);
          // console.log(r.data);
          this.users = r.data;
          this.totallength = this.users[0].cnt;
        })
        .catch();
    },
    //点击可编辑
    changeEditable() {
      console.log(12);
      this.iseditable = this.iseditable == "false" ? "true" : "false";
    },
    //失去焦点
    loseBlur(event,rows,bid){
      switch(bid){
        case '1': rows.name=event.target.innerHTML;break;
        case '2': rows.phone=event.target.innerHTML;break;
        case '3': rows.birth=event.target.innerHTML.substring(0,9);break;
        case '4': rows.address=event.target.innerHTML;break;
        case '5': rows.isroot=event.target.innerHTML;break;
      }
    },
    //模态弹窗事件
    toaddPage() {
      this.ischecked = true;
    },
    //模态弹窗返回事件
    returnPage() {
      this.ischecked = false;
    },
    //重置模态窗信息
    toreset() {
      this.sizeForm.name = "";
      this.sizeForm.phone = "";
      this.sizeForm.address = "";
      this.sizeForm.birth = "";
      this.sizeForm.pwd = "";
    },
    // 删除用户
    deleteUser(row,index){
      var id = row.id;
      console.log(id)
      this.$http.get("/deleteUsers",{
        params:{
          id:id
        }
        }).then(res=>{
          // 删除当前行
          this.users.splice(index,1)
        }).catch(err=>{

        })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    //获取当前行的数据
    handleClick(row) {
      console.log(row);
    },
    //获取页面展示条数
    handleSizeChange(val) {
      this.pagesize = val;
      console.log(this.pagesize);
      this.getusers();
    },
    //获取当前页码
    handleCurrentChange(val) {
      this.pagenum = val;
      console.log(this.pagenum);
      this.getusers();
    },
    // 修改用户
    updateUser(row) {
      this.$http.post("/updateUser",{
        id:row.id,
        name:row.name,
        address:row.address,
        phone:row.phone,
        birth:row.birth,
        isroot:row.isroot
      }).then(r=>{
       console.log(r.data);
      }).catch()
    },
  },
};
</script>

<style scoped>
.modal {
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: rgba(30, 30, 30, 0.2);
  top: 0;
  left: 0;
  z-index: 99;
}
.addmodal {
  width: 400px;
  height: 400px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -250px;
  margin-left: -250px;
  background-color: white;
}
.addform {
  width: 300px;
  margin: 20px auto;
}
</style>