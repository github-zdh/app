/*
   配置文件
 */
var config = {
    	host: 'http://114.115.137.212',
//  	host: 'http://127.0.0.1:80',
    	userInfo: localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):{}
};
