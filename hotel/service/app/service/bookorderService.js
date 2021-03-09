const Service = require('egg').Service;
class bookorderService extends Service{
    //查询后端所以room
    async showBookOrder(pagenum,pagesize){
        let sql = `select *,(select count(1) from bookorder) as count from bookorder limit ${pagesize*(pagenum-1)},${pagesize}`
        let list = await this.ctx.app.mysql.query(sql,[pagenum,pagesize]);
        return list;
    }

    // 查询前端所有room
    async showviewBookOrder() {
        let sql = "select  * from bookorder";
        let list = await this.ctx.app.mysql.query(sql);
        return list;
    }

    async addBookOrder(accountId,roomTypeId,name,idCard,mobile,arriveDate,leaveDate,status,remark){
        let sql = "insert into bookorder(accountId,roomTypeId,name,idCard,mobile,arriveDate,leaveDate,status,remark)values(?,?,?,?,?,?,?,?,?)";
        let list = await this.ctx.app.mysql.query(sql,[accountId,roomTypeId,name,idCard,mobile,arriveDate,leaveDate,status,remark]);
        return list;
    }
    
    async deleteBookOrder(id){
        let sql = "delete from bookorder where id=?";
        let list = await this.ctx.app.mysql.query(sql,id);
        return list.affectedRows;
    }

    async updateBookOrder(accountId,roomTypeId,name,idCard,mobile,arriveDate,leaveDate,status,remark){
        let sql = "update floor set accountId=?,roomTypeId=?,idCard=?,moblie=?,arriveDate=?,leaveDate=?,status=?,remark=?,name=? where id=?";
        let list = await this.ctx.app.mysql.query(sql,[accountId,roomTypeId,name,idCard,mobile,arriveDate,leaveDate,status,remark]);
        return list.affectedRows;
    }
}
module.exports = bookorderService;