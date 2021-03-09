const Service = require('egg').Service;
const path = require("path");
const fs = require("fs");
class goodsService extends Service{
    //展示后端所有商品
    async showAllGoods(pagenum, pagesize) {
        // let sql = "select *  from goods";
        let sql = `select *,(select count(1) from goods) as count from goods limit ${pagesize*(pagenum-1)},${pagesize}`
        let list = await this.ctx.app.mysql.query(sql, [pagenum, pagesize]);
        return list;
    }
    //展示前端所有商品
    async showviewGoods(){
        // let sql = `select * from goods where 1 `;
        // if(obj.pagenum){
        //     sql += `limit ${(obj.pagenum-1)*10},10`
        // }
        let sql = "select * from goods";
        var result = await this.showcakeGoodsctx.app.mysql.query(sql);
        return result;
    }
    //展示前端蛋糕商品
    async showCakeGoods(){
        let sql="select *from goods,lable where goods_cate='1' and goods.goods_id=lable.Goods_title";
        var result = await this.ctx.app.mysql.query(sql);
        return result
    }
    //展示前端面包商品
    async showBreadGoods(){
        let sql="select *from goods,lable where goods_cate='2' and goods.goods_id=lable.Goods_title";
        var result = await this.ctx.app.mysql.query(sql);
        return result
    }
    //展示前端冰淇淋商品
    async showIcecreamGoods(){
        let sql="select *from goods,lable where goods_cate='3' and goods.goods_id=lable.Goods_title";
        var result = await this.ctx.app.mysql.query(sql);
        return result
    }
    //展示前端咖啡商品
    async showCoffeeGoods(){
        let sql="select *from goods,lable where goods_cate='4' and goods.goods_id=lable.Goods_title";
        var result = await this.ctx.app.mysql.query(sql);
        return result
    }

    async uploadGoods() {
		const file = this.ctx.request.files[0];
		const toFileName = '/public/upload1/'+Date.now()+file.filename;
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
        let goods_id = this.ctx.request.body.goods_id;
        let name = this.ctx.request.body.name;
        let price = this.ctx.request.body.price;
        let category = this.ctx.request.body.category;
        let weight = this.ctx.request.body.weight;
		const sql = "insert into goods(goods_url,goods_id,name,price,category,weight)values(?,?,?,?,?,?)";
		let r = await this.ctx.app.mysql.query(sql,[newUrl,goods_id,name,price,category,weight]);
		if(r.affectedRows==1) {
			return newUrl;
		}else {
			return "http://localhost:7001/public/upload1/1.png";
		}
    }

    async updateGoods(id,name,price,category,weight){
        let sql = "update goods set price=?,name=?,category=?,weight=? where id=?";
        let list = await this.ctx.app.mysql.query(sql,[price,name,category,weight,id]);
        return list.affectedRows;
    }
    
    async deleteGoods(id){
        let sql = "delete from goods where id=?";
        let list = await this.ctx.app.mysql.query(sql,[id])
        return list.affectedRows;
    }


}
module.exports = goodsService;