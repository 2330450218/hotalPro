const Controller = require('egg').Controller;
class checkinController extends Controller {
    async showCheckin() {
        let pagenum = this.ctx.request.query.pagenum;
        let pagesize = this.ctx.request.query.pagesize;
        let c = await this.ctx.service.checkinService.showCheckin(pagenum, pagesize);
        this.ctx.response.body = c;
    }

    async showviewCheckin() {
        let list = await this.ctx.service.checkinService.showviewCheckin();
        this.ctx.response.body = list;
    }

     async addCheckin() {
        let bookOrderId = this.ctx.request.body.bookOrderId;
        let roomTypeId = this.ctx.request.body.roomTypeId;
        let roomId = this.ctx.request.body.roomId;
        let checkinPrice = this.ctx.request.body.checkinPrice;
        let name = this.ctx.request.body.name;
        let idCard = this.ctx.request.body.idCard;
        let mobile = this.ctx.request.body.mobile;
        let arriveDate = this.ctx.request.body.arriveDate;
        let leaveDate = this.ctx.request.body.leaveDate;
        let status = this.ctx.request.body.status;
        let remark = this.ctx.request.body.remark;
        let list = await this.ctx.service.checkinService.addCheckin(bookOrderId,roomTypeId,roomId,checkinPrice,name,idCard,mobile,arriveDate,leaveDate,status,remark);
        this.ctx.response.body = list;
    }
    async deleteCheckin() {
        let id = this.ctx.request.query.id;
        let list = await this.ctx.service.checkinService.deleteCheckin(id);
        this.ctx.response.body = list;
    }

}
module.exports = checkinController;