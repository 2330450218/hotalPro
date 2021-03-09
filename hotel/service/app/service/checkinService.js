const Service = require('egg').Service;
class checkinService extends Service{
    //查询后端所以checkin
    async showCheckin(pagenum,pagesize){
        // let sql = "select *  from room where Goods_title=?";
        let sql = `select *,(select count(1) from checkin) as count from checkin limit ${pagesize*(pagenum-1)},${pagesize}`
        let list = await this.ctx.app.mysql.query(sql,[pagenum,pagesize]);
        return list;
    }

    // 查询前端所有checkin
    async showviewCheckin() {
        let sql = "select  * from checkin";
        let list = await this.ctx.app.mysql.query(sql);
        return list;
    }

   ////bookOrderId,roomTypeId,roomId,checkinPrice,name,idCard,mobile,arriveDate,leaveDate,status,remark
   async addCheckin(bookOrderId,roomTypeId,roomId,checkinPrice,name,idCard,mobile,arriveDate,leaveDate,status,remark){
    let sql = "insert into checkin(bookOrderId,roomTypeId,roomId,checkinPrice,name,idCard,mobile,arriveDate,leaveDate,status,remark)values(?,?,?,?,?,?,?,?,?,?,?)";
    let list = await this.ctx.app.mysql.query(sql,[bookOrderId,roomTypeId,roomId,checkinPrice,name,idCard,mobile,arriveDate,leaveDate,status,remark]);
    return list;
}

async deleteCheckin(id){
    let sql = "delete from checkin where id=?";
    let list = await this.ctx.app.mysql.query(sql,id);
    return list.affectedRows;
}
}
module.exports = checkinService;