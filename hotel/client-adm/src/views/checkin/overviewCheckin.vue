<template>
<!-- 入住管理--需要进一步修改 -->
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
      <el-table-column fixed prop="id" label="id" width="55" id="checkin_id"></el-table-column><!--陈霞-->
      
      <el-table-column label="房间" width="120">
        <!-- prop="lable" -->
        <template slot-scope="scope">
          <div :contenteditable="iseditable"  @blur="loseBlur($event,scope.row,bid='1')"  >{{scope.row.roomId}}</div>
        </template>
      </el-table-column>

      <el-table-column label="房型" width="120">
        <!-- prop="lable" -->
        <template slot-scope="scope">
          <div :contenteditable="iseditable"  @blur="loseBlur($event,scope.row,bid='2')"  >{{scope.row.roomTypeId}}</div>
        </template>
      </el-table-column>

      <el-table-column  label="入住价格" width="80" >
        <!-- prop="price"  -->
        <template slot-scope="scope">
          <div :contenteditable="iseditable"   @blur="loseBlur($event,scope.row,bid='3')">{{scope.row.checkinPrice}}</div>
        </template>
      </el-table-column>

      <el-table-column  label="入住人" width="80" >
        <!-- prop="liveNum"  -->
        <template slot-scope="scope">
          <div :contenteditable="iseditable"   @blur="loseBlur($event,scope.row,bid='4')">{{scope.row.name}}</div>
        </template>
      </el-table-column>

      <el-table-column  label="身份证号" width="80" >
        <!-- prop="bedNum"  -->
        <template slot-scope="scope">
          <div :contenteditable="iseditable"   @blur="loseBlur($event,scope.row,bid='5')">{{scope.row.idCard}}</div>
        </template>
      </el-table-column>

       <el-table-column  label="手机号" width="70" >
        <!-- prop="roomNum"  -->
        <template slot-scope="scope">
          <div :contenteditable="iseditable"   @blur="loseBlur($event,scope.row,bid='6')">{{scope.row.mobile}}</div>
        </template>
      </el-table-column>

       <el-table-column  label="入住日期" width="150" >
        <!-- prop="avilableNum"  -->
        <template slot-scope="scope">
          <div :contenteditable="iseditable"   @blur="loseBlur($event,scope.row,bid='7')">{{scope.row.arriveDate}}</div>
        </template>
      </el-table-column>
       <el-table-column  label="离店日期" width="150" >
        <!-- prop="avilableNum"  -->
        <template slot-scope="scope">
          <div :contenteditable="iseditable"   @blur="loseBlur($event,scope.row,bid='8')">{{scope.row.leaveDate}}</div>
        </template>
      </el-table-column>
       <el-table-column  label="状态" width="150" >
        <!-- prop="avilableNum"  -->
        <template slot-scope="scope">
          <div :contenteditable="iseditable"   @blur="loseBlur($event,scope.row,bid='9')">{{scope.row.status}}</div>
        </template>
      </el-table-column>
       <el-table-column  label="预定时间" width="150" >
        <!-- prop="avilableNum"  -->
        <template slot-scope="scope">
          <div :contenteditable="iseditable"   @blur="loseBlur($event,scope.row,bid='10')">{{scope.row.createTime}}</div>
        </template>
      </el-table-column>
       <el-table-column  label="备注" width="150" >
        <!-- prop="avilableNum"  -->
        <template slot-scope="scope">
          <div :contenteditable="iseditable"   @blur="loseBlur($event,scope.row,bid='11')">{{scope.row.remark}}</div>
        </template>
      </el-table-column>

      <el-table-column align="center" width="100" >
        <template slot="header">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button @click="updateCheckin(scope.row)" type="text" size="small">修改</el-button>
          <el-button type="text" size="small" @click="deleteCheckin(scope.row,scope.$index)">删除</el-button>
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
          <el-form ref="form" :model="sizeForm" label-width="100px" size="mini">
             <el-form-item label="预定订单：">
              <el-input v-model="sizeForm.bookOrderId" id="bookOrderId" ></el-input>
            </el-form-item>
            <el-form-item label="房型：">
              <el-input v-model="sizeForm.roomTypeId" id="roomTypeId" ></el-input>
            </el-form-item>
            <el-form-item label="房间：">
              <el-input v-model="sizeForm.roomId" id="roomId" ></el-input>
            </el-form-item>
            <el-form-item label="入住价格：">
              <el-input v-model="sizeForm.checkinPrice" id="checkinPrice" ></el-input>
            </el-form-item>
            <el-form-item label="入住人姓名：">
              <el-input v-model="sizeForm.name" id="name" ></el-input>
            </el-form-item>  
             <el-form-item label="身份证号：">
              <el-input v-model="sizeForm.idCard" id="idCard" ></el-input>
            </el-form-item>
            <el-form-item label="手机号码：">
              <el-input v-model="sizeForm.mobile" id="mobile" ></el-input>
            </el-form-item>
            <el-form-item label="入住日期：">
              <el-input v-model="sizeForm.arriveDate" id="arriveDate" ></el-input>
            </el-form-item>
            <el-form-item label="离店日期：">
              <el-input v-model="sizeForm.leaveDate" id="leaveDate" ></el-input>
            </el-form-item>
            <el-form-item label="状态：">
              <el-input v-model="sizeForm.status" id="status" ></el-input>
            </el-form-item>
            <el-form-item label="备注：">
              <el-input v-model="sizeForm.remark" id="remark" ></el-input>
            </el-form-item>
          </el-form>
          <div class="btn">
            <el-button type="primary" @click="addCheckin">确认添加</el-button>
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
        bookOrderId:"",
        roomTypeId:"",
        roomId:"",
        checkinPrice:"",
        name: "",
        idCard:"",
        mobile:"",
        arriveDate:"",
        leavaDate:"",
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
    showCheckin() {
      this.$http
        .get("http://127.0.0.1:7001/showCheckin", {
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
        case '1': rows.bookOrderId=event.target.innerHTML;break;
        case '2': rows.roomTypeId=event.target.innerHTML;break;
        case '3': rows.roomId=event.target.innerHTML;break;
        case '4': rows.checkinPrice=event.target.innerHTML;break;
        case '5': rows.name=event.target.innerHTML;break;
        case '6': rows.idCard=event.target.innerHTML;break;
        case '7': rows.mobile=event.target.innerHTML;break;
        case '8': rows.arriveDate=event.target.innerHTML;break;
        case '9': rows.leavaDate=event.target.innerHTML;break;
        case '10': rows.status=event.target.innerHTML;break;
        case '11': rows.remark=event.target.innerHTML;break;
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
      this.sizeForm.bookOrderId="";
      this.sizeForm.roomTypeId="";
      this.sizeForm.roomId="";
      this.sizeForm.checkinPrice="";
      this.sizeForm.name="";
      this.sizeForm.idCard="";
      this.sizeForm.mobile="";
      this.sizeForm.arriveDate="";
      this.sizeForm.leavaDate="";
      this.sizeForm.status="";
      this.sizeForm.remark="";
    },
    //添加标签
    addCheckin(){
      this.$http.post("http://127.0.0.1:7001/addCheckin",{
          bookOrderId:this.sizeForm.bookOrderId,
          roomTypeId:this.sizeForm.roomTypeId,
          roomId:this.sizeForm.roomId,
          checkinPrice:this.sizeForm.checkinPrice,
          idCard:this.sizeForm.idCard,
          mobile:this.sizeForm.mobile,
          arriveDate:this.sizeForm.arriveDate,
          leavaDate:this.sizeForm.leavaDate,
          status:this.sizeForm.status,
          remark:this.sizeForm.remark,
          name:this.sizeForm.name
      }).then(res=>{
          console.log('数据库添加成功')
          this.showCheckin()
      }).catch(err=>{

      })
    },
    // 更新标签
    updateCheckin(rows){
      this.$http.post("/updateCheckin",{
        bookOrderId:rows.bookOrderId,
        roomTypeId:rows.roomTypeId,
        roomId:rows.roomId,
        checkinPrice:rows.checkinPrice,
        name:rows.name,
        idCard:rows.idCard,
        mobile:rows.mobile,
        arriveDate:rows.arriveDate,
        leavaDate:rows.leavaDate,
        status:rows.status,
        remark:rows.remark,
      }).then().catch()
    },
    //删除标签
    deleteCheckin(row,index){
      var id = row.id;
      this.$http.get("http://127.0.0.1:7001/deleteCheckin",{
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
      this.showCheckin()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.showCheckin()
    },
  },
  created(){
      this.showCheckin()
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
  height: 600px;
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