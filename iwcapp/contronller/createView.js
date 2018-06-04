/*
      创建视图窗口
 */
mui.plusReady(function(){
	(function(w){
		var view = {};
		view.headerHeight = 64;
		//等待waiting
	//	view.showWaiting = {
	//		mask:function(){
	//			var w = plus.nativeUI.showWaiting("处理中，请等待...",{back:"none",color:"#FF0000",background:"rgba(0,0,0,0)",loading:{display:"none"}});
	//			return w;
	//		}
	//	}
		

		view.openWindow = function(obj){		
							if(!obj._this&&!obj.view){
								var obj = {_this:obj}
							}
							//123456123456123456123456
							//rgba(0,0,0,0.7)
							var showWait = plus.nativeUI.showWaiting("",{back:"none",background:"rgba(0,0,0,0)",loading:{display:"none"}});
							var duration = obj.duration?obj.duration:200;
							var aniShow = obj.aniShow?obj.aniShow:'pop-in';
							var top = obj.top?obj.top:(plus!=undefined?(plus.navigator.getStatusbarHeight()):20);
					    var view = obj.view?obj.view:obj._this.getAttribute('data-view');				        
					    var wid = obj.wid?obj.wid:obj._this.getAttribute('data-wid');
					    var wid = wid ? wid : view;
					    var extras = obj.extras ? obj.extras : {};
					    var delay = obj.delay ? obj.delay : 300;
					    
							if(obj.before&&obj.before.constructor.name==='Function'){
								   before()
							}
//							console.log(JSON.stringify(obj));
							mui.openWindow({
							    url: view,
							    id:wid,
							    styles:{
								      top:0 +'px'//新页面顶部位置0
							    },
							    show:{
							    	autoShow:false,//页面loaded事件发生后自动显示，默认为true
							    	aniShow:aniShow,
							    	duration:duration//页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
							    },
							    waiting:{
							        autoShow:false,//自动显示等待框，默认为true
							    },
							    extras:extras
							})
							var showPage = setTimeout(function(){
										plus.webview.show(wid,aniShow,duration);
										isClick = false;
										if(obj.after&&obj.after.constructor.name==='Function'){
										   after()
									  }
										var maskTimeout = setTimeout(function(){
											  showWait.close();
											  clearTimeout(showPage);											  
										},duration+100)
							},delay)
		}
		  
		 var top = (plus!=undefined?(plus.navigator.getStatusbarHeight()):20);
		 var openWindowHeader = document.getElementById('openWindowHeader');
		 if(openWindowHeader){
		 	    openWindowHeader.style = 'background: #000000;position: fixed;top:0;left: 0;width: 100%;padding-top:'+ top +'px;';
		 	    var cDiv = document.createElement('div');
		 	    cDiv.id = 'openWindowHeaderHeight';
		 	    cDiv.style['height'] = (44 + top) +'px';
		 	    view.headerHeight = 44 + top;
		 	    document.getElementsByTagName('body')[0].insertBefore(cDiv,openWindowHeader);
		 }
		 
		 if(w.view&&w.view!=undefined){
	     	 	w.view.prototype = view;
		 }else{
		     	w.view = view;
		 }  
		 //默认三秒后关闭打开页面时的加载框
		 mui.plusReady(function(){
		 	    var closeWting = setTimeout(function(){
		 	    	  plus.nativeUI.closeWaiting();
		 	    },3000)		 	    
		 })
	})(window)

})
