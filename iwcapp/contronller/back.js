(function(w){
   w.muiBackBool = false;
   var muiBack = function(){};
   muiBack.prototype.loginBack = function(){
			var muiCurrentWebview = plus.webview.currentWebview();
			var allview =  plus.webview.all();
			for(var i=0;i<allview.length;i++){
				//HBuilder
		 	    if(allview[i].id!=muiCurrentWebview.id){
					 allview[i].close();		
			    }
			}
			if(window.muiBackBool){
				muiCurrentWebview.close();
			}else{
				mui.toast('再点击一次退出');
			}
			window.muiBackBool = true;
			clearTimeout(muiBackBoolTimeout);
			var muiBackBoolTimeout = setTimeout(function(){
				window.muiBackBool = false;
				clearTimeout(muiBackBoolTimeout);
			},3000)	
   }
   muiBack.prototype.indexBack = function(){
			var muiCurrentWebview = plus.webview.currentWebview();
			var allview =  plus.webview.all();
			for(var i=0;i<allview.length;i++){
				//HBuilder
		 	    if(allview[i].id=='HBuilder'||allview[i].id=='./view/login/login.html'){
					 allview[i].close();		
			    }
			}
			if(window.muiBackBool){
				muiCurrentWebview.close();
			}else{
				mui.toast('再点击一次退出');
			}
			window.muiBackBool = true;
			clearTimeout(muiBackBoolTimeout);
			var muiBackBoolTimeout = setTimeout(function(){
				window.muiBackBool = false;
				clearTimeout(muiBackBoolTimeout);
			},3000)	
   }
   w.muiBack = new muiBack;
   
   
})(window)
