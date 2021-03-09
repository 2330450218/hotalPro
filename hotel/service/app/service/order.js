const Service = require('egg').Service;
class orderService extends Service{
  async showOrder(){
      let sql=`select *,(select count(1) from db_order ) as count from db_order, order_goods where order_goods.order_id=db_order.id `
      let list=await this.ctx.app.mysql.query(sql,[])
      return list
  }
  async deleteOrder(){
      let sql="delete from order_goods where id=?"
      let list=await this.ctx.app.mysql.query(sql,[id])
      return list
  }

}
module.exports = orderService;