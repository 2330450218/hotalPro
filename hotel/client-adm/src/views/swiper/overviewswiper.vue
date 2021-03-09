<template>
<!-- 轮播图管理--需要进一步修改 -->
  <div>
    <el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      border style="width: 100%"
      ref="multipleTable"
      max-height="403"
      @selection-change="handleSelectionChange"
      @cell-dblclick="changeEditable"
      :row-key="tableId"
      >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column fixed prop="id" label="id" width="55"></el-table-column>
     
      <el-table-column label="资源路径" width="400">
        <!-- prop="swiper_url" -->
        <template slot-scope="scope">
          <div :contenteditable="iseditable"  @blur="loseBlur($event,scope.row,bid='1')"  >{{scope.row.swiper_url}}</div>
        </template>
      </el-table-column>
      <el-table-column  align="center" width="300">
        <template slot="header" >
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/>
      </template>
        <template slot-scope="scope">
          
          <el-button @click="deleteSwiper(scope.row,scope.$index)" type="text" size="small">删除</el-button>
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
    <div v-if="ischecked" class="modal" @click.self="returnPage">
      <div class="addmodal">
        <div class="addform">
          <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
            <!-- <el-form-item label="轮播图">
              <el-input v-model="sizeForm.swiper_url" id="swiper_url"></el-input>
            </el-form-item> -->
            <!-- <el-form-item label="类别">
              <el-input v-model="sizeForm.classify"></el-input>
            </el-form-item> -->
          </el-form>
          <div class="btn">
             <a href="javascript:;" class="choose">选择文件
          <input type="file" name="" id="file">
      </a>
            <el-button type="primary" @click="addSwiper">确认添加</el-button>
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
        classify:""
      },
      tableData: [
       
       
      ],
      // currentPage1: 5,
      // currentPage2: 5,
      // currentPage3: 5,
      currentPage4: 1,
    };
  },
   created() {
    this.showAllSwiper();
  },
  methods: {
     //获取当前行唯一id
    tableId(row){
      return row.individualId
    },
    //展示轮播图
    showAllSwiper() {
      this.$http
        .get("http://127.0.0.1:7001/showAllSwiper", {
          params: {
            pagenum: this.pagenum,
            pagesize: this.pagesize,
          },
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
        case '1': rows.swiper_url=event.target.innerHTML;break;
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
      this.sizeForm.classify="";
    },
    //增加轮播图
    addSwiper() {
      console.log(111)
      let file = document.getElementById("file").files[0];
      console.log(file);
      let formData = new FormData();
      formData.append("uploadGoods", file, file.name);
      const config = {
        headers: {
          "Content-Type": "mutipart/form-data;boundary=" + new Date().getTime(), //Content-Type来表示具体请求中的媒体类型信息。
        },
      };
      this.$http
        .post("http://127.0.0.1:7001/uploadSwiper", formData, config)
        .then((res) => {
          console.log("数据库上传成功")
          // this.showGoods();
          this.$router.go(0)
          //  document.getElementsByClassName("newImg").src = res.data;
          //  showAllSwiper();
        })
        .catch((err) => {
          // console.log(err)
        });
    },

    //删除商品
    deleteSwiper(row,index) {
      var id = row.id;
      console.log(id);
      this.$http
        .get("http://127.0.0.1:7001/deleteGoods", {
          params: {
            id: id,
          },
        })
        .then((res) => {
           // 删除当前行
          this.tableData.splice(index,1)
        })
        .catch((err) => {});
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
      this.pagesize = val;
      console.log(this.pagesize);
      this.showAllSwiper();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      console.log(this.pagenum);
      this.showAllSwiper();
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
  position: relative;
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
.choose input {
  position: absolute;
  font-size: 100px;
  opacity: 0;
  line-height: 40px;
  width: 100px;
  height: 40px;
  bottom: 0px;
  right: 0px;
}
a.choose {
  width: 70px;
}
.choose {
  font-size: 1;
  bottom: 250px;
  right: 238px;
  position: absolute; 
  width: 120px;
  height: 40px;
  display: inline-block;
  background: #409EFF;
  /* border: 1px solid #99d3f5; */
  border-radius: 4px;
  overflow: hidden;
  color: black;
  text-decoration: none;
  text-indent: 0;
  line-height: 40px;
  text-align: center;
  padding: 0 10px;
}
.choose:hover {
  background: #aadffd;
  border-color: #78c3f3;
  color: #004974;
  text-decoration: none;
}
</style>