const Service = require('egg').Service;
const path = require("path");
const fs = require("fs");
class SwiperService extends Service {
    // 上传锚点图片
    async getspecialArea() {
        const file = this.ctx.request.files[0];
        const toFileName = '/public/upload3/' + Date.now() + file.filename;
        let to = path.dirname(__dirname) + toFileName;
        //file.filepath是上传的临时文件
        //把临时文件写入到文件to
        await fs.copyFileSync(file.filepath, to);
        //删除临时文件
        await fs.unlinkSync(file.filepath);

        //上传文件的网络访问 url
        const newUrl = "http://localhost:7001" + toFileName;
        const sql = "insert into special_area(url)values(?)";
        let r = await this.ctx.app.mysql.query(sql, newUrl);
        console.log(r)
        if (r.affectedRows == 1) {
            return newUrl;
        } else {
            // return "http://localhost:7001/public/upload/黑猫.jpg";
            alert("上传失败")
        }
    }
    // 获取后端锚点图片
    async showspecialArea(pagenum, pagesize) {
        let sql = `select *,(select count(1) from special_area) as count from special_area limit ${pagesize*(pagenum-1)},${pagesize}`
        let list = await this.ctx.app.mysql.query(sql, [pagenum, pagesize]);
        return list;
    }

    //获取前端锚点
    async showviewspecialArea(){
		let sql = "select * from special_area"
		let list = await this.ctx.app.mysql.query(sql,[]);
		return list;
	}

    // 删除锚点图片
    async deletespecialArea(id) {
        const sql = "delete from special_area where id = ?";
        let list = await this.ctx.app.mysql.query(sql, [id]);
        // console.log(list)
        return list.affectedRows;
    }
}

module.exports = SwiperService