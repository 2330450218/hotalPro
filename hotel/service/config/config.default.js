//cookie配置
exports.keys = "sdfdshlkfdsakdfsahdsfakjfhasfkdsa";


exports.multipart = {
	mode: 'file',
};
//post配置
exports.security = {
	csrf: {
		enable: false,
		ignoreJSON: true
	} 
};
//mysql配置
exports.mysql = {
  client: {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'cake',
  },
};

//跨域配置
exports.cors = {
	  origin: '*',
	  allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
};