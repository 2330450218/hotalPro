const Service = require('egg').Service;
class roomtypeService extends Service{
    //查询后端所以room_type
    async showRoomType(pagenum,pagesize){
        // let sql = "select *  from table where Goods_title=?";
        let sql = `select *,(select count(1) from room_type) as count from room_type limit ${pagesize*(pagenum-1)},${pagesize}`
        let list = await this.ctx.app.mysql.query(sql,[pagenum,pagesize]);
        return list;
    }

    // 查询前端所有room_type
    async showviewRoomType() {
        let sql = "select  * from room_type";
        let list = await this.ctx.app.mysql.query(sql);
        return list;
    }

    async addRoomType(photo,name,price,liveNum,bedNum,roomNum,status,remark){
        let sql = "insert into room_type(photo,name,price,liveNum,bedNum,roomNum,status,remark)values(?,?,?,?,?,?,?,?)";
        let list = await this.ctx.app.mysql.query(sql,[photo,name,price,liveNum,bedNum,roomNum,status,remark]);
        return list;
    }

    async deleteRoomType(id){
        let sql = "delete from room_type where id=?";
        let list = await this.ctx.app.mysql.query(sql,id);
        return list.affectedRows;
    }

    async updateRoomtype(remark,name,id){
        let sql = "update room_type set remark=?,name=? where id=?";
        let list = await this.ctx.app.mysql.query(sql,[remark,name,id]);
        return list.affectedRows;
    }
}
module.exports = roomtypeService;