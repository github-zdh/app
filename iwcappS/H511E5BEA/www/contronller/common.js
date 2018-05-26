/*
    公共文件/公共配置
 */
(function(w){
    window.common = {};
    var _this = window.common;
    //顶部右边menu菜单导航
    _this.topRightMenu = {
	      home:{
	    	  styels:{top:'64px',right:"10px",width:"200px",height:(50 * 5)+'px',popGesture:"none"},
	    	  extras:{menu:'home'}
	      }
    }
    // 判断是否有这个窗口  @params id 窗口ID 这个方法必须在plusReady方法中执行
    _this.hasView = function(id){
    	  var _allview = plus.webview.all();
    	  for(var i=0;i<_allview.length;i++){
    	    	  if(_allview[i].id==id){
    	    	  	  return true;
    		      }
          }
          return false;
    },
    // 判断当前是否在创建页面中。。。
    _this.isCeateView = false;
    _this.hasCeateView = function(time){
		    if(_this.isCeateView){
		    	_this.isCeateView=false;
		    	return false;
		    }
		    var time = time||1000;
	    	var clickAout = setTimeout(function(){
	    		 _this.isCeateView = false;
	    		 clearTimeout(clickAout);
	    	},time)
		    _this.isCeateView=true;
		    return true;
    }
    
})(window)
