const Controller = require('egg').Controller;
class shopcarController extends Controller {
    async showShopcar() {
        const { ctx } = this;
        ctx.body = await this.ctx.service.shopcarService.showShopcar(ctx.request.query);
    }

    async addShopcar(){
        let uid = this.ctx.request.body.uid;
        let goods_id = this.ctx.request.body.body;
        let num = this.ctx.request.body.num;
        let status = this.ctx.request.body.status;
        let name = this.ctx.request.body.name;
        let price = this.ctx.request.body.price;
        let category = this.ctx.request.body.category;
        let weight = this.ctx.request.body.weight;
        let list = await this.ctx.service.shopcarService.addShopcar(uid,goods_id,num,status,name,price,category,weight);
        this.ctx.response.body = list;
    }

    async deleteShopcar(){
        let id = this.ctx.request.query.id;
        let list = await this.ctx.service.shopcarService.deleteShopcar(id);
        this.ctx.response.body = list;
    }

    async deleteAllShopcar(){
        let list = await this.ctx.service.shopcarService.deleteAllShopcar();
        this.ctx.response.body = list;
    }
}
module.exports = shopcarController;