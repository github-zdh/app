(function(w){
   var muiBack = function(){};
   muiBack.prototype.muiBackBool = false;
   muiBack.prototype.loginBack = function(){
			if(this.muiBackBool){
			    var allview =  plus.webview.all();
				for(var i=0;i<allview.length;i++){
			 	     allview[i].close();
				}
			}else{
				mui.toast('再点击一次退出');
			}
			this.muiBackBool = true;
			clearTimeout(muiBackBoolTimeout);
			var muiBackBoolTimeout = setTimeout(function(){
				this.muiBackBool = false;
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
			if(this.muiBackBool){
				muiCurrentWebview.close();
			}else{
				mui.toast('再点击一次退出');
			}
			this.muiBackBool = true;
			clearTimeout(muiBackBoolTimeout);
			var muiBackBoolTimeout = setTimeout(function(){
				this.muiBackBool = false;
				clearTimeout(muiBackBoolTimeout);
			},3000)	
   }
   w.muiBack = new muiBack;
   
   
})(window)
