 function versionUpdata(cb){
		    mui.ajax({
			    	url:config.host+'/app/search/appUpdate',
//						    	url:'http:127.0.0.1/app/search/ChatRecord',						    	
			    	type:'post',
			    	data:{},
			    	success:function(data){
			    		console.log(data);
			    		data = JSON.parse(data);
		    			if(cb){
		    				cb(data.result);
		    			}
			    		if(data.code==200){
			    			if(data.result.version==config.version){
			    				 return false;
			    			}
			                var btnArray = ['是','否'];  
			                var description = data.result.description&&data.result.description!=''?data.result.description:'是否更新版本？';
			                 mui.confirm(description, '更新提示', btnArray, function(e) {
			                    if (e.index == 0) { 
//						                    	appUpdateDownLoad();
									localStorage.setItem('appUpdateType',data.result.update);
									localStorage.setItem('appUpdateUrl',data.result.url);
									view.openWindow({view:'/view/appupdate/index.html',wid:'/view/appupdate/index.html'});
//						                    	window.location.href = 'http://114.115.137.212/upload/app_update/H511E5BEA_0609171127.apk';
								 } else {  
//						                        console.log('否');
			                        //强制更新
			                        if(data.result.update==1){
			                        	 muiBack.indexBack();
			                        	 return false;
			                        }
			                        mui.toast('你取消了更新');
			                    }  
			                    
			                })
			                
			    		}
			    	},
			    	error:function(err){
			    		// addRoomChatItemsLocalStorageNum(rid,num);
			    		console.log(err);
			    		mui.toast('连接服务器失败')
			    	}
		    })
}