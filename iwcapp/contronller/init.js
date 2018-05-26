// DOMContentLoaded事件处理
var _domReady=false;
document.addEventListener('DOMContentLoaded',function(){
	_domReady=true;
	compatibleAdjust();
},false);
// 兼容性样式调整
var _adjust=false;
function compatibleAdjust(){
		if(_adjust||!window.plus||!_domReady){
			return;
		}
		_adjust=true;
		// iOS平台特效
		if('iOS'==plus.os.name){
			document.getElementById('content').className='scontent';	// 使用div的滚动条
			if(navigator.userAgent.indexOf('StreamApp')>=0){	// 在流应用模式下显示返回按钮
				document.getElementById('back').style.visibility='visible';
			}
		}
}
                 
// 监听网络状态
//plus.networkinfo.getCurrentType();
//CONNECTION_UNKNOW: 网络状态常量，表示当前设备网络状态未知，固定值为0。
//CONNECTION_NONE: 网络状态常量，当前设备网络未连接网络，固定值为1。
//CONNECTION_ETHERNET: 网络状态常量，当前设备连接到有线网络，固定值为2。
//CONNECTION_WIFI: 网络状态常量，当前设备连接到无线WIFI网络，固定值为3。
//CONNECTION_CELL2G: 网络状态常量，当前设备连接到蜂窝移动2G网络，固定值为4。
//CONNECTION_CELL3G: 网络状态常量，当前设备连接到蜂窝移动3G网络，固定值为5。
//CONNECTION_CELL4G: 网络状态常量，当前设备连接到蜂窝移动4G网络，固定值为6。
   document.addEventListener("netchange",function(){
        var nt = plus.networkinfo.getCurrentType();
        switch ( nt ) {
            case plus.networkinfo.CONNECTION_ETHERNET:
            case plus.networkinfo.CONNECTION_WIFI:
               alert("切换到wifi!"); 
            break; 
            case plus.networkinfo.CONNECTION_CELL2G:
               alert("切换到2G网络!"); 
            break; 
            case plus.networkinfo.CONNECTION_CELL3G:
               alert("切换到3G网络!"); 
            break; 
            case plus.networkinfo.CONNECTION_CELL4G:
               alert("切换到4G网络!"); 
            break; 
            default:
               alert("无网络!"); 
            break;
        }
})