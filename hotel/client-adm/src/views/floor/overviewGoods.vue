<template>
  <!-- 商品信息管理--需要进一步修改 -->
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
      <el-table-column fixed prop="id" label="id" width="55"></el-table-column>
      <el-table-column label="名称" width="120">
        <!-- prop="name" -->
        <template slot-scope="scope">
          <div
            :contenteditable="iseditable"
            @blur="loseBlur($event,scope.row,bid='1')"
          >{{scope.row.name}}</div>
        </template>
      </el-table-column>
      <el-table-column label="资源地址" width="400">
        <!-- prop="goods_url"  -->
        <template slot-scope="scope">
          <div
            :contenteditable="iseditable"
            @blur="loseBlur($event,scope.row,bid='2')"
          >{{scope.row.goods_url}}</div>
        </template>
      </el-table-column>
      <el-table-column label="价格" width="80">
        <!-- prop="price" -->
        <template slot-scope="scope">
          <div
            :contenteditable="iseditable"
            @blur="loseBlur($event,scope.row,bid='3')"
          >{{scope.row.price}}</div>
        </template>
      </el-table-column>
      <el-table-column label="介绍" width="300">
        <!-- prop="category" -->
        <template slot-scope="scope">
          <div
            :contenteditable="iseditable"
            @blur="loseBlur($event,scope.row,bid='4')"
          >{{scope.row.category}}</div>
        </template>
      </el-table-column>
      <el-table-column label="分量" width="120">
        <!-- prop="weight" -->
        <template slot-scope="scope">
          <div
            :contenteditable="iseditable"
            @blur="loseBlur($event,scope.row,bid='5')"
          >{{scope.row.weight}}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" width="300" fixed="right">
        <template slot="header">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button @click="updateGoods(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="deleteGoods(scope.row,scope.$index)" type="text" size="small">删除</el-button>
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
            <el-form-item label="名称">
              <el-input v-model="sizeForm.name" id="name"></el-input>
            </el-form-item>
            <el-form-item label="类别">
              <el-input v-model="sizeForm.classify" id="goods_id"></el-input>
            </el-form-item>
            <el-form-item label="价格">
              <el-input v-model="sizeForm.price" id="price"></el-input>
            </el-form-item>
            <el-form-item label="介绍">
              <el-input v-model="sizeForm.category" id="category"></el-input>
            </el-form-item>
            <el-form-item label="分量">
              <el-input v-model="sizeForm.weight" id="weight"></el-input>
            </el-form-item>
            
          </el-form>
          <div class="btn">
            <el-button type="primary" @click="addgoods">确认添加</el-button>
            <!-- <el-button type="primary"> -->
            <a href="javascript:;" class="choose">
              选择文件
              <input type="file" name id="file" />
            </a>
            <!-- </el-button> -->
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
        classify: "",
        weight: "",
        price: "",
        category: "",
        url: "",
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
    //展示商品
    showAllGoods() {
      this.$http
        .get("http://127.0.0.1:7001/showAllGoods", {
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
      this.iseditable = this.iseditable == "false" ? "true" : "false";
    },
    //失去焦点
    loseBlur(event, rows, bid) {
      switch (bid) {
        case "1":
          rows.name = event.target.innerHTML;
          break;
        case "2":
          rows.goods_url = event.target.innerHTML;
          break;
        case "3":
          rows.price = event.target.innerHTML;
          break;
        case "4":
          rows.category = event.target.innerHTML;
          break;
        case "5":
          rows.weight = event.target.innerHTML;
          break;
      }
    },
    //增加商品
    addgoods() {
      console.log(111);
      let file = document.getElementById("file").files[0];
      let formData = new FormData();
      formData.append("name", this.sizeForm.name);
      formData.append("price", this.sizeForm.price);
      formData.append("category", this.sizeForm.category);
      formData.append("weight", this.sizeForm.weight);
      formData.append("goods_id", this.sizeForm.goods_id);
      formData.append("uploadGoods", file, file.name);
      const config = {
        headers: {
          "Content-Type": "mutipart/form-data;boundary=" + new Date().getTime(), //Content-Type来表示具体请求中的媒体类型信息。
        },
      };
      this.$http
        .post("http://127.0.0.1:7001/uploadGoods", formData, config)
        .then((res) => {
          console.log("数据库上传成功");
         showAllGoods()
        })
        .catch((err) => {
          // console.log(err)
        });
    },

    //删除商品
    deleteGoods(row,index) {
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
      this.sizeForm.classify = "";
      this.sizeForm.weight = "";
      this.sizeForm.price = "";
      this.sizeForm.category = "";
      this.sizeForm.url = "";
    },
    //更新商品信息
    updateGoods(rows){
      this.$http.post("/updateGoods",{
        id:rows.id,
        name:rows.name,
        price:rows.price,
        category:rows.category,
        weight:rows.weight,
      }).then().catch()
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
      this.showAllGoods();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      console.log(this.pagenum);
      this.showAllGoods();
    },
  },
  created() {
    this.showAllGoods();
  },
};
</script>

<style>
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
.el-button .el-button--primary {
  width: 100px;
  height: 40px !important;
}
.btn {
  width: 250px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
a {
  width: 120px;
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
  bottom: 80px;
  right: 10px;
  position: absolute;
  width: 120px;
  height: 40px;
  display: inline-block;
  background: #409eff;
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