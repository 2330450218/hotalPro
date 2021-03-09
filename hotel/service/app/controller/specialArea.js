const Controller = require('egg').Controller;
class specialAreaController extends Controller {
    // 上传锚点图片
    async getspecialArea() {
        let newUrl = await this.ctx.service.specialArea.getspecialArea();
        this.ctx.response.body = newUrl;
    }
    // 展示后端锚点图片
    async showspecialArea() {
        let pagenum = this.ctx.request.query.pagenum;
        let pagesize = this.ctx.request.query.pagesize;
        let list = await this.ctx.service.specialArea.showspecialArea(pagenum, pagesize);
        this.ctx.response.body = list;
    }

    // 展示前端锚点图片
    async showviewspecialArea(){
        let list = await this.ctx.service.specialArea.showviewspecialArea();
        this.ctx.response.body = list;
    }
    //删除锚点
    async deletespecialArea() {
        let id = this.ctx.request.query.id
        let list = await this.ctx.service.specialArea.deletespecialArea(id);
        this.ctx.response.body = list;
    }
};

module.exports = specialAreaController