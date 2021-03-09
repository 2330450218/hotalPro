<template>
<!-- 楼层管理--需要进一步修改 -->
  <div>
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      border
      style="width: 160%"
      ref="multipleTable"
      max-height="403"
      @selection-change="handleSelectionChange"
      @cell-dblclick="changeEditable"
      :row-key="tableId" 
    >

      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column fixed prop="id" label="id" width="55" id="room-type_id"></el-table-column><!--陈霞-->
      
      <el-table-column label="房间图片" width="120">
        <!-- prop="lable" -->
        <template slot-scope="scope">
          <div :contenteditable="iseditable"  @blur="loseBlur($event,scope.row,bid='1')"  >{{scope.row.photo}}</div>
        </template>
      </el-table-column>

      <el-table-column  label="房间编号" width="80" >
        <!-- prop="price"  -->
        <template slot-scope="scope">
          <div :contenteditable="iseditable"   @blur="loseBlur($event,scope.row,bid='2')">{{scope.row.sn}}</div>
        </template>
      </el-table-column>

      <el-table-column  label="房间类型" width="80" >
        <!-- prop="liveNum"  -->
        <template slot-scope="scope">
          <div :contenteditable="iseditable"   @blur="loseBlur($event,scope.row,bid='3')">{{scope.row.roomTypeId}}</div>
        </template>
      </el-table-column>

      <el-table-column  label="所属楼层" width="80" >
        <!-- prop="bedNum"  -->
        <template slot-scope="scope">
          <div :contenteditable="iseditable"   @blur="loseBlur($event,scope.row,bid='4')">{{scope.row.floorId}}</div>
        </template>
      </el-table-column>

       <el-table-column  label="状态" width="70" >
        <!-- prop="roomNum"  -->
        <template slot-scope="scope">
          <div :contenteditable="iseditable"   @blur="loseBlur($event,scope.row,bid='5')">{{scope.row.status}}</div>
        </template>
      </el-table-column>

       <el-table-column  label="房间备注" width="150" >
        <!-- prop="avilableNum"  -->
        <template slot-scope="scope">
          <div :contenteditable="iseditable"   @blur="loseBlur($event,scope.row,bid='6')">{{scope.row.remark}}</div>
        </template>
      </el-table-column>

      <el-table-column align="center" width="100" >
        <template slot="header">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button @click="updateRoom(scope.row)" type="text" size="small">修改</el-button>
          <el-button type="text" size="small" @click="deleteRoom(scope.row,scope.$index)">删除</el-button>
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
             <el-form-item label="房间图片">
              <el-input v-model="sizeForm.photo" id="photo" ></el-input>
            </el-form-item>
            <el-form-item label="房间编号">
              <el-input v-model="sizeForm.sn" id="sn" ></el-input>
            </el-form-item>
            <el-form-item label="房间类型">
              <el-input v-model="sizeForm.roomTypeId" id="roomTypeId" ></el-input>
            </el-form-item>
            <el-form-item label="所属楼层">
              <el-input v-model="sizeForm.floorId" id="floorId" ></el-input>
            </el-form-item>
            <el-form-item label="状态">
              <el-input v-model="sizeForm.status" id="status" ></el-input>
            </el-form-item>
             <el-form-item label="备注">
              <el-input v-model="sizeForm.remark" id="remark" ></el-input>
            </el-form-item>
          </el-form>
          <div class="btn">
            <el-button type="primary" @click="addRoom">确认添加</el-button>
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
        photo: "",
        sn:"",
        roomTypeId:"",
        floorId:"",
        status:"",
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
    showRoom() {
      this.$http
        .get("http://127.0.0.1:7001/showRoom", {
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
        case '1': rows.photo=event.target.innerHTML;break;
        case '2': rows.sn=event.target.innerHTML;break;
        case '3': rows.roomTypeId=event.target.innerHTML;break;
        case '4': rows.floorId=event.target.innerHTML;break;
        case '5': rows.status=event.target.innerHTML;break;
        case '6': rows.remark=event.target.innerHTML;break;
       
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
      this.sizeForm.photo="";
      this.sizeForm.sn="";
      this.sizeForm.roomTypeId="";
      this.sizeForm.floorId="";
      this.sizeForm.status="";
      this.sizeForm.remark="";
    },
    //添加标签
    addRoom(){
      //let name = document.getElementById("name").value;
     // let Goods_title = document.getElementById("Goods_title").value;
      this.$http.post("http://127.0.0.1:7001/addRoom",{
          photo:this.sizeForm.photo,
          sn:this.sizeForm.sn,
          roomTypeId:this.sizeForm.roomTypeId,
          floorId:this.sizeForm.floorId,
          status:this.sizeForm.status,
          remark:this.sizeForm.remark
      }).then(res=>{
          console.log('数据库添加成功')
          this.showRoom()
      }).catch(err=>{

      })
    },
    // 更新标签
    updateRoom(rows){
      this.$http.post("/updateRoom",{
        photo:rows.photo,
        sn:rows.sn,
        roomTypeId:rows.roomTypeId,
        floorId:rows.floorId,
        status:rows.status,
        remark:rows.remark
      }).then().catch()
    },
    //删除标签
    deleteRoom(row,index){
      var id = row.id;
      this.$http.get("http://127.0.0.1:7001/deleteRoom",{
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
    handleClick(row) {
      console.log(row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.showRoom()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.showRoom()
    },
  },
  created(){
      this.showRoom()
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