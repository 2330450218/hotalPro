const Controller = require('egg').Controller;
class swiperController extends Controller{
    async uploadSwiper(){
        let newUrl = await this.ctx.service.swiperService.uploadSwiper();
        this.ctx.response.body = newUrl;
    }
    async showAllSwiper() {
        let pagenum = this.ctx.request.query.pagenum;
        let pagesize = this.ctx.request.query.pagesize;
        let list = await this.ctx.service.swiperService.showAllSwiper(pagenum, pagesize);
        this.ctx.response.body = list;
    }

    async showviewSwiper(){
        let list = await this.ctx.service.swiperService.showviewSwiper();
        this.ctx.response.body = list;
    }
    async deleteSwiper(){
        let id = this.ctx.request.query.id;
        let list = await this.ctx.service.swiperService.deleteSwiper(id);
        this.ctx.response.body = list;
    }
}
module.exports = swiperController;