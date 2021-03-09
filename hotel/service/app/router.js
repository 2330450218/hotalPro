module.exports = app => {
    const {
        router,
        controller
    } = app;
    //轮播图
    //上传轮播图
    router.post("/uploadSwiper", controller.swiperController.uploadSwiper)
    //展示后台轮播图
    router.get("/showAllSwiper", controller.swiperController.showAllSwiper)
    router.get("/deleteSwiper", controller.swiperController.deleteSwiper)
    //展示前端轮播图
    router.get("/showviewSwiper", controller.swiperController.showviewSwiper)

    //标签
    //查询后端所有floor
    router.get("/showFloor", controller.floorController.showFloor)
    router.get("/deleteFloor", controller.floorController.deleteFloor)
    router.post("/addFloor", controller.floorController.addFloor)
    router.post("/updateFloor", controller.floorController.updateFloor)
    //查询前端所有floor
    router.get("/showAllfloor", controller.floorController.showAllfloor)


    //陈霞
    //查询后端所有room_type
    router.get("/showRoomType", controller.roomtypeController.showRoomType)
    //查询前端所有room_type
    router.get("/showviewRoomType", controller.roomtypeController.showviewRoomType)
    router.get("/deleteRoomType", controller.roomtypeController.deleteRoomType)
    router.post("/addRoomType", controller.roomtypeController.addRoomType)

     //查询后端所有room
     router.get("/showRoom", controller.roomController.showRoom)
     //查询前端所有room
     router.get("/showviewRoom", controller.roomController.showviewRoom)
     router.get("/deleteRoom", controller.roomController.deleteRoom)
     router.post("/addRoom", controller.roomController.addRoom)


     //查询后端所有book_order
     router.get("/showBookOrder", controller.bookorderController.showBookOrder)
     //查询前端所有room
     router.get("/showviewBookOrder", controller.bookorderController.showviewBookOrder)
     router.get("/deleteBookOrder", controller.bookorderController.deleteBookOrder)
     router.post("/addBookOrder", controller.bookorderController.addBookOrder)



      //查询后端所有checkin
      router.get("/showCheckin", controller.checkinController.showCheckin)
      //查询前端所有room
      router.get("/showviewCheckin", controller.checkinController.showviewCheckin)
      router.get("/deleteCheckin", controller.checkinController.deleteCheckin)
      router.post("/addCheckin", controller.checkinController.addCheckin)

    //商品
    //展示前端所有商品
    router.get("/showviewGoods", controller.goodsController.showviewGoods)
    //展示后端所有商品
    router.get("/showAllGoods", controller.goodsController.showAllGoods)
    // 展示蛋糕
    router.get("/showCakeGoods", controller.goodsController.showCakeGoods)
    // 展示面包
    router.get("/showBreadGoods", controller.goodsController.showBreadGoods)
    // 展示冰淇淋
    router.get("/showIcecreamGoods", controller.goodsController.showIcecreamGoods)
    // 展示咖啡
    router.get("/showCoffeeGoods",controller.goodsController.showCoffeeGoods)
    //展示前端主页新品随机商品
    router.get("/showindexnewGoods",controller.goodsController.showindexnewGoods)
    //展示前端主页聚会随机商品
    router.get("/showindexpartyGoods",controller.goodsController.showindexpartyGoods)
    //展示前端主页生日随机商品
    router.get("/showindexbirthGoods",controller.goodsController.showindexbirthGoods)
    //展示前端主页儿童随机商品
    router.get("/showindexchildGoods",controller.goodsController.showindexchildGoods)
    //删除商品
    router.get("/deleteGoods",controller.goodsController.deleteGoods)
    //修改商品信息
    router.post("/updateGoods", controller.goodsController.updateGoods)
    //上传商品信息
    router.post("/uploadGoods",controller.goodsController.uploadGoods)
    //展示主页专区大图
    router.get("/showspecial",controller.goodsController.showspecial)

    // 登录注册
    // 登录
    router.post('/login', controller.user.login);
    // 注册后端
    router.post('/register', controller.user.register);
    // 注册前端
    router.post('/registerQian', controller.user.registerQian);

    // 根据name修改密码
    router.post('/changePwd', controller.user.changePwd);
    // 展示后端用户界面
    router.get('/showUsers', controller.user.showUsers);
    //展示前端用户界面
    router.get('/showviewUsers', controller.user.showviewUsers)
    // 展示后端管理员界面
    router.get('/showAdministrators', controller.user.showAdministrators);
    //展示前端管理员界面
    router.get('/showviewAdministrators', controller.user.showviewAdministrators);
    
    //后台修改用户信息
    router.post('/updateUser', controller.user.updateUser);
    //删除用户信息
    router.get("/deleteUsers", controller.user.deleteUsers);

   

    // 专区锚点
    // 获取锚点图片
    router.post('/getspecialArea', controller.specialArea.getspecialArea);
    // 展示后端锚点图片
    router.get('/showspecialArea', controller.specialArea.showspecialArea);
    // 删除锚点图片
    router.get('/deletespecialArea', controller.specialArea.deletespecialArea);
    //展示前端锚图片
    router.get('/showviewspecialArea', controller.specialArea.showviewspecialArea);


    // 订单
    // 后台展示订单信息
    router.get("/showorder", controller.order.showOrder)
    //删除订单
    router.get("/deleteorder", controller.order.deleteOrder)


    //购物车
    //展示购物车
    router.get("/showShopcar", controller.shopcarController.showShopcar)
    //购物车添加
    router.post("/addShopcar", controller.shopcarController.addShopcar)
    //删除购物车
    router.get("/deleteShopcar", controller.shopcarController.deleteShopcar)
    //删除所有购物车
    router.get("/deleteAllShopcar", controller.shopcarController.deleteAllShopcar)

}