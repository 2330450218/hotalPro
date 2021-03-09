const Service = require('egg').Service;
class roomService extends Service{
    //查询后端所以room
    async showRoom(pagenum,pagesize){
        // let sql = "select *  from room where Goods_title=?";
        let sql = `select *,(select count(1) from room) as count from room limit ${pagesize*(pagenum-1)},${pagesize}`
        let list = await this.ctx.app.mysql.query(sql,[pagenum,pagesize]);
        return list;
    }

    // 查询前端所有room
    async showviewRoom() {
        let sql = "select  * from room";
        let list = await this.ctx.app.mysql.query(sql);
        return list;
    }

    async addRoom(photo,sn,roomTypeId,floorId,status,remark){
        let sql = "insert into room(photo,sn,roomTypeId,floorId,status,remark)values(?,?,?,?,?,?)";
        let list = await this.ctx.app.mysql.query(sql,[photo,sn,roomTypeId,floorId,status,remark]);
        return list;
    }

    async deleteRoom(id){
        let sql = "delete from room where id=?";
        let list = await this.ctx.app.mysql.query(sql,id);
        return list.affectedRows;
    }

    async updateRoomtype(remark,name,id){
        let sql = "update room_type set remark=?,name=? where id=?";
        let list = await this.ctx.app.mysql.query(sql,[remark,name,id]);
        return list.affectedRows;
    }
}
module.exports = roomService;