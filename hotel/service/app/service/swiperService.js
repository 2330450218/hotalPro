const Service = require('egg').Service;
const path = require("path");
const fs = require("fs");
class swiperService extends Service{
    async uploadSwiper() {
		const file = this.ctx.request.files[0];
		const toFileName = '/public/upload2/'+Date.now()+file.filename;
		/**
		 * 1,全局变量__dirname的值为"<路径>\项目名\app\service",即为当前文件所在的目录
		 * 2,path.dirname(...)的使用是去掉最后一级,
		 * 所以path.dirname(__dirname)后的值为"<路径>\项目名\app"
		 * 3, 最后得到to的值为 "<路径>\项目名\app/public/upload/保存时的文件名字" 
		 */  
		let to = path.dirname(__dirname)+toFileName;
		//file.filepath是上传的临时文件
		//把临时文件写入到文件to
		await fs.copyFileSync(file.filepath, to);
		//删除临时文件
		await fs.unlinkSync(file.filepath);
		
		//上传文件的网络访问 url
		const newUrl = "http://localhost:7001"+toFileName;
		// let id = this.ctx.request.body.id;
		const sql = "insert into swiper(swiper_url)values(?)";
		let r = await this.ctx.app.mysql.query(sql, newUrl);
		if(r.affectedRows==1) {
			return newUrl;
		}else {
			return "http://localhost:7001/public/upload2/轮播图1.png";
		}
    }
	async showAllSwiper(pagenum, pagesize) {
		let sql = `select *,(select count(1) from swiper) as count from swiper  limit ${pagesize*(pagenum-1)},${pagesize}`
		let list = await this.ctx.app.mysql.query(sql, [pagenum, pagesize]);
		return list;
	}
	
	async showviewSwiper(){
		let sql = "select * from swiper";
		let list = await this.ctx.app.mysql.query(sql,[]);
		return list;
	}

	async deleteSwiper(id){
		// const sql = "delete a from swiper a,(select max(id) id from swiper) b  where a.id = b.id";
		const sql = "delete  from swiper where id=?"
        let list = await this.ctx.app.mysql.query(sql,id);
        return list.affectedRows;
    }

}
module.exports = swiperService;