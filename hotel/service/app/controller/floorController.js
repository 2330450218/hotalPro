const Controller = require('egg').Controller;
class floorController extends Controller {
    async showFloor() {
        let pagenum = this.ctx.request.query.pagenum;
        let pagesize = this.ctx.request.query.pagesize;
        let c = await this.ctx.service.floorService.showFloor(pagenum, pagesize);
        this.ctx.response.body = c;
    }

    async showAllfloor() {
        let list = await this.ctx.service.floorService.showAllfloor();
        this.ctx.response.body = list;
    }

    async addFloor() {
        let remark = this.ctx.request.body.remark;
        let name = this.ctx.request.body.name;
        let id = this.ctx.request.body.id;
        let list = await this.ctx.service.floorService.addFloor(remark, name,id);
        this.ctx.response.body = list;
    }
    async deleteFloor() {
        let id = this.ctx.request.query.id;
        // let name = this.ctx.request.query.name;
        let list = await this.ctx.service.floorService.deleteFloor(id);
        this.ctx.response.body = list;
    }

    async updateFloor() {
        let remark = this.ctx.request.body.remark;
        let id= this.ctx.request.body.id;
        let name = this.ctx.request.body.name;
        let list = await this.ctx.service.floorService.updateFloor(remark,name,id);
        this.ctx.response.body = list;
    }
}
module.exports = floorController;