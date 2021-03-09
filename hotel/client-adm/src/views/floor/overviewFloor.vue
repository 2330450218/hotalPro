<template>
<!-- 楼层管理--需要进一步修改 -->
  <div>
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      border
      style="width: 100%"
      ref="multipleTable"
      max-height="403"
      @selection-change="handleSelectionChange"
      @cell-dblclick="changeEditable"
      :row-key="tableId"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column fixed prop="id" label="id" width="55" id="lable_id"></el-table-column>
      
      <el-table-column label="楼层名字" width="250">
        <!-- prop="lable" -->
        <template slot-scope="scope">
          <div :contenteditable="iseditable"  @blur="loseBlur($event,scope.row,bid='1')"  >{{scope.row.name}}</div>
        </template>
      </el-table-column>

        <el-table-column  label="楼层备注" width="250" >
        <!-- prop="Goods_title"  -->
        <template slot-scope="scope">
          <div :contenteditable="iseditable"   @blur="loseBlur($event,scope.row,bid='2')">{{scope.row.remark}}</div>
        </template>
      </el-table-column>

      <el-table-column align="center" width="300" >
        <template slot="header">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button @click="updateFloor(scope.row)" type="text" size="small">修改</el-button>
          <el-button type="text" size="small" @click="deleteFloor(scope.row,scope.$index)">删除</el-button>
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
            <el-form-item label="楼层id">
              <el-input v-model="sizeForm.id" id="id" ></el-input>
            </el-form-item>
            <el-form-item label="楼层名称">
              <el-input v-model="sizeForm.name" id="name" ></el-input>
            </el-form-item>
            <el-form-item label="楼层备注">
              <el-input v-model="sizeForm.remark" id="remark" ></el-input>
            </el-form-item>
          </el-form>
          <div class="btn">
            <el-button type="primary" @click="addFloor">确认添加</el-button>
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
      ischecked: false,
      search: "",
      sizeForm: {
        name: "",
        remark:""
      },
      tableData: [],
      currentPage4: 1,
    };
  },
  
  methods: {
     //获取当前行唯一id
    tableId(row){
      return row.individualId
    },
      // 展示用户
    showFloor() {
      this.$http
        .get("http://127.0.0.1:7001/showFloor", {
          params:{
            pagenum:this.pagenum,
            pagesize:this.pagesize
          }
        })
        .then((r) => {
          console.log(r.data);
          this.tableData = r.data;
          this.totallength=r.data[0].count
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
        case '2': rows.remark=event.target.innerHTML;break;
       
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
    toreset(){
      this.sizeForm.name="";
      this.sizeForm.remark="";
    },
    //添加标签
    addFloor(){
      this.$http.post("http://127.0.0.1:7001/addFloor",{
          id:this.sizeForm.id,
          name:this.sizeForm.name,
          remark:this.sizeForm.remark
      }).then(res=>{
          console.log('数据库添加成功')
          this.showFloor()
      }).catch(err=>{

      })
    },
    // 更新标签
    updateFloor(rows){
      this.$http.post("/updateFloor",{
        id:rows.id,
        name:rows.name,
        remark:rows.remark
      }).then().catch()
    },
    //删除标签
    deleteFloor(row,index){
      var id = row.id;
      this.$http.get("/deleteFloor",{
        params:{
          id:id
        }
        }).then(res=>{
           // 删除当前行
          this.tableData.splice(index,1)
        }).catch(err=>{

        })
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //获取当前行的数据
    handleClick(row) {
      console.log(row);
    },
     //获取页面展示条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.showFloor()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.showFloor()
    },
  },
  created(){
      this.showFloor()
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
.btn {
  width: 250px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>