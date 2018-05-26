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