const Service = require('egg').Service;
class shopcarService extends Service{
//展示购物车所有商品
async showShopcar(){
    // let sql = `select * from goods where 1 `;
    // if(obj.pagenum){
    //     sql += `limit ${(obj.pagenum-1)*10},10`
    // }
    let sql = "select * from goods_shopcar";
    var result = await this.app.mysql.query(sql,[]);
    return result;
}

//点击加入购物车向购物车添加数据
async addShopcar (uid,goods_id,num,status,name,price,category,weight){
    let sql = "insert into goods_shopcar(uid,goods_id,num,status,name,price,category,weight)values(?,?,?,?,?,?,?,?)";
    let list = await this.ctx.app.mysql.query(sql,[uid,goods_id,num,status,name,price,category,weight]);
    return list.affectedRows;
}

//删除购物车数据
async deleteShopcar(id){
    let sql = "delete from goods_shopcar where id=?";
    let list = await this.ctx.app.mysql.query(sql,id)
    return list.affectedRows;
} 

//删除全部购物车数据
async deleteAllShopcar(){
    let sql = "delete from goods_shopcar";
    let list = await this.ctx.app.mysql.query(sql,[])
    return list.affectedRows;
} 
}
module.exports = shopcarService;