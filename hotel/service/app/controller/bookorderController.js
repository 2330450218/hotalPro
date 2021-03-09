const Controller = require('egg').Controller;
class bookorderController extends Controller {
    async showBookOrder() {
        let pagenum = this.ctx.request.query.pagenum;
        let pagesize = this.ctx.request.query.pagesize;
        let c = await this.ctx.service.bookorderService.showBookOrder(pagenum, pagesize);
        this.ctx.response.body = c;
    }

    async showviewBookOrder() {
        let list = await this.ctx.service.bookorderService.showviewBookOrder();
        this.ctx.response.body = list;
    }

    async addBookOrder() {
        let accountId = this.ctx.request.body.accountId;
        let roomTypeId = this.ctx.request.body.roomTypeId;
        let name = this.ctx.request.body.name;
        let idCard = this.ctx.request.body.idCard;
        let mobile = this.ctx.request.body.mobile;
        let arriveDate = this.ctx.request.body.arriveDate;
        let leaveDate = this.ctx.request.body.leaveDate;
        let status = this.ctx.request.body.status;
        let remark = this.ctx.request.body.remark;
        let list = await this.ctx.service.bookorderService.addBookOrder(accountId,roomTypeId,name,idCard,mobile,arriveDate,leaveDate,status,remark);
        this.ctx.response.body = list;
    }

    async deleteBookOrder() {
        let id = this.ctx.request.query.id;
        let list = await this.ctx.service.bookorderService.deleteBookOrder(id);
        this.ctx.response.body = list;
    }
}
module.exports = bookorderController;