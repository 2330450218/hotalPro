const Controller = require('egg').Controller;
class orderController extends Controller {
    async showOrder() {
        let list = await this.ctx.service.order.showOrder();
        this.ctx.response.body = list;
    }
    async deleteOrder() {
        let id=this.ctx.request.query.id
        let list = await this.ctx.service.order.deleteOrder(id);
        this.ctx.response.body = list;
    }
}
module.exports = orderController;