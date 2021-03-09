const Controller = require('egg').Controller;
class roomController extends Controller {
    async showRoom() {
        let pagenum = this.ctx.request.query.pagenum;
        let pagesize = this.ctx.request.query.pagesize;
        let c = await this.ctx.service.roomService.showRoom(pagenum, pagesize);
        this.ctx.response.body = c;
    }

    async showviewRoom() {
        let list = await this.ctx.service.roomService.showviewRoom();
        this.ctx.response.body = list;
    }

    async addRoom() {
        
         let photo = this.ctx.request.body.photo;
         let sn = this.ctx.request.body.sn;
         let roomTypeId = this.ctx.request.body.roomTypeId;
         let floorId = this.ctx.request.body.floorId;
         let status = this.ctx.request.body.status;
         let remark = this.ctx.request.body.remark;
         let list = await this.ctx.service.roomService.addRoom(photo,sn,roomTypeId,floorId,status,remark);
         this.ctx.response.body = list;
     }
 
     async deleteRoom() {
         let id = this.ctx.request.query.id;
         let list = await this.ctx.service.roomService.deleteRoom(id);
         this.ctx.response.body = list;
     }
}
module.exports = roomController;