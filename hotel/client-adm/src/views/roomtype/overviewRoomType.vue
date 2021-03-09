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
      
      <el-table-column label="名字" width="60">
        <!-- prop="lable" -->
        <template slot-scope="scope">
          <div :contenteditable="iseditable"  @blur="loseBlur($event,scope.row,bid='1')"  >{{scope.row.name}}</div>
        </template>
      </el-table-column>

      <el-table-column  label="价格" width="60" >
        <!-- prop="price"  -->
        <template slot-scope="scope">
          <div :contenteditable="iseditable"   @blur="loseBlur($event,scope.row,bid='2')">{{scope.row.price}}</div>
        </template>
      </el-table-column>

      <el-table-column  label="可住人数" width="80" >
        <!-- prop="liveNum"  -->
        <template slot-scope="scope">
          <div :contenteditable="iseditable"   @blur="loseBlur($event,scope.row,bid='2')">{{scope.row.liveNum}}</div>
        </template>
      </el-table-column>

      <el-table-column  label="床位数" width="70" >
        <!-- prop="bedNum"  -->
        <template slot-scope="scope">
          <div :contenteditable="iseditable"   @blur="loseBlur($event,scope.row,bid='4')">{{scope.row.bedNum}}</div>
        </template>
      </el-table-column>

       <el-table-column  label="房间数" width="70" >
        <!-- prop="roomNum"  -->
        <template slot-scope="scope">
          <div :contenteditable="iseditable"   @blur="loseBlur($event,scope.row,bid='5')">{{scope.row.roomNum}}</div>
        </template>
      </el-table-column>

       <el-table-column  label="可用房间数" width="100" >
        <!-- prop="avilableNum"  -->
        <template slot-scope="scope">
          <div :contenteditable="iseditable"   @blur="loseBlur($event,scope.row,bid='6')">{{scope.row.avilableNum}}</div>
        </template>
      </el-table-column>

      <el-table-column  label="已预定数" width="80" >
        <!-- prop="bookNum"  -->
        <template slot-scope="scope">
          <div :contenteditable="iseditable"   @blur="loseBlur($event,scope.row,bid='7')">{{scope.row.bookNum}}</div>
        </template>
      </el-table-column>

      <el-table-column  label="已入住数" width="80" >
        <!-- prop="livedNum"  -->
        <template slot-scope="scope">
          <div :contenteditable="iseditable"   @blur="loseBlur($event,scope.row,bid='8')">{{scope.row.livedNum}}</div>
        </template>
      </el-table-column>

        <el-table-column  label="状态" width="50" >
        <!-- prop="status"  -->
        <template slot-scope="scope">
          <div :contenteditable="iseditable"   @blur="loseBlur($event,scope.row,bid='9')">{{scope.row.status}}</div>
        </template>
      </el-table-column>

        <el-table-column  label="房间类型备注" width="110" >
        <!-- prop="remark"  -->
        <template slot-scope="scope">
          <div :contenteditable="iseditable"   @blur="loseBlur($event,scope.row,bid='10')">{{scope.row.remark}}</div>
        </template>
      </el-table-column>

      <el-table-column align="center" width="100" >
        <template slot="header">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button @click="updateRoomType(scope.row)" type="text" size="small">修改</el-button>
          <el-button type="text" size="small" @click="deleteRoomType(scope.row,scope.$index)">删除</el-button>
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
           
             <el-form-item label="房型图片">
              <el-input v-model="sizeForm.photo" id="photo" ></el-input>
            </el-form-item>
            <el-form-item label="名称">
              <el-input v-model="sizeForm.name" id="name" ></el-input>
            </el-form-item>
            <el-form-item label="价格">
              <el-input v-model="sizeForm.price" id="price" ></el-input>
            </el-form-item>
            <el-form-item label="可住人数">
              <el-input v-model="sizeForm.liveNum" id="liveNum" ></el-input>
            </el-form-item>
            <el-form-item label="床位数">
              <el-input v-model="sizeForm.bedNum" id="bedNum" ></el-input>
            </el-form-item>
            <el-form-item label="房间数">
              <el-input v-model="sizeForm.roomNum" id="roomNum" ></el-input>
            </el-form-item>
            <el-form-item label="状态">
              <el-input v-model="sizeForm.status" id="status" ></el-input>
            </el-form-item>
             <el-form-item label="备注">
              <el-input v-model="sizeForm.remark" id="remark" ></el-input>
            </el-form-item>
          </el-form>
          <div class="btn">
            <el-button type="primary" @click="addRoomType">确认添加</el-button>
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
        photo:"",
        price:"",
        liveNum:"",
        bedNum:"",
        roomNum:"",
        //avilableNum:"",
        //bookNum:"",
       // livedNum:"",
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
    showRoomType() {
      this.$http
        .get("http://127.0.0.1:7001/showRoomType", {
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
        case '2': rows.photo=event.target.innerHTML;break;
        case '3': rows.price=event.target.innerHTML;break;
        case '4': rows.liveNum=event.target.innerHTML;break;
        case '5': rows.bedNum=event.target.innerHTML;break;
        case '6': rows.roomNum=event.target.innerHTML;break;
       // case '7': rows.avilableNum=event.target.innerHTML;break;
       // case '8': rows.bookNum=event.target.innerHTML;break;
        //case '9': rows.livedNum=event.target.innerHTML;break;
        case '10': rows.status=event.target.innerHTML;break;
        case '11': rows.remark=event.target.innerHTML;break;
        //case '12': rows.id=event.target.innerHTML;break;
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
      this.sizeForm.photo="";
      this.sizeForm.price="";
      this.sizeForm.liveNum="";
      this.sizeForm.bedNum=""
      this.sizeForm.roomNum="";
      //this.sizeForm.avilableNum="";
     // this.sizeForm.bookNum="";
      //this.sizeForm.livedNum="";
      this.sizeForm.status="";
      this.sizeForm.remark="";
    },
    //添加标签
    addRoomType(){
      this.$http.post("http://127.0.0.1:7001/addRoomType",{
       // id:this.sizeForm.id,
        name:this.sizeForm.name,
        photo:this.sizeForm.photo,
        price:this.sizeForm.price,
        liveNum:this.sizeForm.liveNum,
        bedNum:this.sizeForm.bedNum,
        roomNum:this.sizeForm.roomNum,
        //avilableNum:this.sizeForm.avilableNum,
        //bookNum:this.sizeForm.bookNum,
        //livedNum:this.sizeForm.livedNum,
        status:this.sizeForm.status,
        remark:this.sizeForm.remark
      }).then(res=>{
          console.log('数据库添加成功')
          this.showRoomType()
      }).catch(err=>{

      })
    },
    // 更新标签
    updateRoomType(rows){
      this.$http.post("/updateRoomType",{
        id:rows.id,
        name:rows.name,
        photo:rows.photo,
        price:rows.price,
        liveNum:rows.liveNum,
        bedNum:rows.bedNum,
        roomNum:rows.roomNum,
        //avilableNum:rows.avilableNum,
       // bookNum:rows.bookNum,
       // livedNum:rows.livedNum,
        status:rows.status,
        remark:rows.remark
      }).then().catch()
    },
    //删除标签
    deleteRoomType(row,index){
      var id = row.id;
      this.$http.get("http://127.0.0.1:7001/deleteRoomType",{
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
      this.showRoomType()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.showRoomType()
    },
  },
  created(){
      this.showRoomType()
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