<template>
<!-- 用户订单管理--需要修改 -->
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
      <el-table-column fixed prop="id" label="id" width="150"></el-table-column>
      <el-table-column label="订单号" width="120">
        <!-- prop="order_number" -->
        <template slot-scope="scope">
          <div :contenteditable="iseditable"    >{{scope.row.order_number}}</div>
        </template>
      </el-table-column>
      <el-table-column label="付款金额" width="120">
        <!-- prop="pay_price"  -->
        <template slot-scope="scope">
          <div :contenteditable="iseditable"  >{{scope.row.pay_price}}</div>
        </template>
      </el-table-column>
      <el-table-column label="用户id" width="120">
        <!-- prop="uid" -->
        <template slot-scope="scope">
          <div :contenteditable="iseditable"  >{{scope.row.uid}}</div>
        </template>
      </el-table-column>
      <el-table-column label="商品id" width="120">
        <!-- prop="goods_id" -->
        <template slot-scope="scope">
          <div :contenteditable="iseditable"   >{{scope.row.goods_id}}</div>
        </template>
      </el-table-column>
      <el-table-column label="商品数量" width="120">
        <!-- prop="isroot" -->
        <template slot-scope="scope">
          <div :contenteditable="iseditable"  >{{scope.row.goods_num}}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" width="180" fixed="right">
        <template slot="header">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="deleteOrder(scope.row,scope.$index)">删除</el-button>
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
        phone: "",
        address: "",
        birth: "",
        pwd: "",
      },
      tableData: [
       
      ],
      
      currentPage4: 1,
    };
  },
  created(){
    this.getorder()
  },
  methods: {
     //获取当前行唯一id
    tableId(row){
      return row.individualId
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
      this.sizeForm.phone="";
      this.sizeForm.address="";
      this.sizeForm.birth="";
      this.sizeForm.pwd="";
    },
    // 获取订单信息
    getorder(){
      this.$http.get('/showorder').then(r=>{
       this.tableData=r.data,
       this.totallength=r.data[0].count
       console.log(r.data);
      }).catch()
    },
    //删除订单信息
    deleteOrder(rows,index){
      this.$http.get("/deleteorder",{
        params:{
          id:rows.id
        }
      }).then(r=>{
         this.tableData.splice(index,1)
      }).catch()
    },
    changeEditable(){
      this.iseditable = this.iseditable == "false" ? "true" : "false";
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
    
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.getorder()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.getorder()
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
.btn {
  width: 250px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>