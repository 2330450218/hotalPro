const Service = require('egg').Service;
class floorService extends Service{
    //查询后端所以floor
    async showFloor(pagenum,pagesize){
        // let sql = "select *  from floor where remark=?";
        let sql = `select *,(select count(1) from floor) as count from floor limit ${pagesize*(pagenum-1)},${pagesize}`
        let list = await this.ctx.app.mysql.query(sql,[pagenum,pagesize]);
        return list;
    }

    // 查询前端所有floor
    async showAllfloor() {
        let sql = "select  * from floor";
        let list = await this.ctx.app.mysql.query(sql);
        return list;
    }

    async addFloor (remark,name,id){
        let sql = "insert into floor(remark,name,id)values(?,?,?)";
        let list = await this.ctx.app.mysql.query(sql,[remark,name,id]);
        return list;
    }

    async updateFloor(remark,name,id){
        let sql = "update floor set remark=?,name=? where id=?";
        let list = await this.ctx.app.mysql.query(sql,[remark,name,id]);
        return list.affectedRows;
    }
    
    async deleteFloor(id){
        let sql = "delete from floor where id=?";
        let list = await this.ctx.app.mysql.query(sql,id);
        return list.affectedRows;
    }
}
module.exports = floorService;