const Controller = require('egg').Controller;
class roomtypeController extends Controller {
    async showRoomType() {
        let pagenum = this.ctx.request.query.pagenum;
        let pagesize = this.ctx.request.query.pagesize;
        let c = await this.ctx.service.roomtypeService.showRoomType(pagenum, pagesize);
        this.ctx.response.body = c;
    }

    async showviewRoomType() {
        let list = await this.ctx.service.roomtypeService.showviewRoomType();
        this.ctx.response.body = list;
    }
    async addRoomType() {
       // let id= this.ctx.request.body.id;
        let photo = this.ctx.request.body.photo;
        let name = this.ctx.request.body.name;
        let price = this.ctx.request.body.price;
        let liveNum = this.ctx.request.body.liveNum;
        let bedNum = this.ctx.request.body.bedNum;
        let roomNum = this.ctx.request.body.roomNum;
        let status = this.ctx.request.body.status;
        let remark = this.ctx.request.body.remark;
        let list = await this.ctx.service.roomtypeService.addRoomType(photo,name,price,liveNum,bedNum,roomNum,status,remark);
        this.ctx.response.body = list;
    }

    async deleteRoomType() {
        let id = this.ctx.request.query.id;
        let list = await this.ctx.service.roomtypeService.deleteRoomType(id);
        this.ctx.response.body = list;
    }
}
module.exports = roomtypeController;