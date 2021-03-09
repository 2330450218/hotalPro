const Controller = require('egg').Controller;
class goodsController extends Controller {
    async showviewGoods() {
        const { ctx } = this;
        ctx.body = await this.ctx.service.goodsService.showviewGoods(ctx.request.query);
    }
    async showAllGoods(){
        let pagenum = this.ctx.request.query.pagenum;
        let pagesize = this.ctx.request.query.pagesize;
        let c = await this.ctx.service.goodsService.showAllGoods(pagenum, pagesize);
        this.ctx.response.body = c;
    }

    async showCakeGoods(){
        let list = await this.ctx.service.goodsService.showCakeGoods();
        this.ctx.response.body = list;
    }
    async showBreadGoods(){
        let list = await this.ctx.service.goodsService.showBreadGoods();
        this.ctx.response.body = list;
    }
    async showIcecreamGoods(){
        let list = await this.ctx.service.goodsService.showIcecreamGoods();
        this.ctx.response.body = list;
    }
    async showCoffeeGoods(){
        let list = await this.ctx.service.goodsService.showCoffeeGoods();
        this.ctx.response.body = list;
    }
    async showindexnewGoods(){
        let list = await this.ctx.service.goodsService.showindexnewGoods();
        this.ctx.response.body = list;
    }
    async showindexpartyGoods(){
        let list = await this.ctx.service.goodsService.showindexpartyGoods();
        this.ctx.response.body = list;
    }
    async showindexbirthGoods(){
        let list = await this.ctx.service.goodsService.showindexbirthGoods();
        this.ctx.response.body = list;
    }
    async showindexchildGoods(){
        let list = await this.ctx.service.goodsService.showindexchildGoods();
        this.ctx.response.body = list;
    }
    async showspecial(){
        let list = await this.ctx.service.goodsService.showspecial();
        this.ctx.response.body = list;
    }
    async uploadGoods(){
        // let name = this.ctx.request.body.name;
        // let price = this.ctx.request.body.price;
        // let goods_url = this.ctx.request.body.goods_url;
        // let category = this.ctx.request.body.category;
        // let weight = this.ctx.request.body.weight;
        let newUrl = await this.ctx.service.goodsService.uploadGoods();
        this.ctx.response.body = newUrl;
    }
    async deleteGoods(){
        let id = this.ctx.request.query.id;
        let list = await this.ctx.service.goodsService.deleteGoods(id);
        this.ctx.response.body = list;
    }
    
    async updateGoods(){
        let id = this.ctx.request.body.id;
        let name = this.ctx.request.body.name;
        let price = this.ctx.request.body.price;
        let category = this.ctx.request.body.category;
        let list = await this.ctx.service.goodsService.updateGoods(id,name,price,category);
        this.ctx.response.body = list;
    }
}
module.exports = goodsController;