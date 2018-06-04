/*
    公共文件/公共配置
 */
//用户信息
window.userInfo = JSON.parse(localStorage.getItem('userInfo'));	
//手动刷新
window.addEventListener('ManualRefresh',function(event){
	   window.location.reload();
});

(function(w){
    window.common = {};
    var _this = window.common;
    //顶部右边menu菜单导航
    _this.topRightMenu = {
	      home:{
	    	  styels:{top:'64px',right:"10px",width:"179px",height:(50 * 2)+'px',popGesture:"none"},
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
    
    ////把emoji码点改成emoji图片形式
    _this.restoreEmoji = function(str){
		  //var str = '<div><emoji>128513</emoji>/<emoji>128513</emoji>/<emoji>128513</emoji></div>';
		  var regstr = /<emoji>\d+<\/emoji>/g;
		  var _regReg = /(<emoji>|<\/emoji>)/g;
		  if(!str){
		  	  return str;
		  }
		  var _reg = str.match(regstr);
		  if(_reg&&_reg.length>0){
		      
		      for(var i=0;i<_reg.length;i++){
		          _reg[i] = _reg[i].replace(_regReg,'');
		          str = str.replace('<emoji>'+_reg[i]+'</emoji>',String.fromCodePoint(_reg[i]));
		      }
		  }
		  return str;
	}
    //过滤emoji图片形式改成emoji码点形式
	_this.replaceEmoji = function(emojireg){
		   var ranges = [
		        '\ud83c[\udf00-\udfff]', 
		        '\ud83d[\udc00-\ude4f]', 
		        '\ud83d[\ude80-\udeff]'
		    ];
		    //var emojireg = "<div>😁/😁/😁</div>";
		    if(!emojireg){
		    	 return emojireg;
		    }
		    var emojiarr = emojireg.match(new RegExp(ranges.join('|'), 'g'));
		    var newEmojireg = '';
		    if(emojiarr&&emojiarr.length>0){
			      for(var i=0;i<emojiarr.length;i++){
			           emojiarr[i] = emojiarr[i].codePointAt(0)
			      }
				  emojireg = emojireg.replace(new RegExp(ranges.join('|'), 'g'),'[emoji]');
				  emojireg = emojireg.split('[emoji]');				  
				  for(var i=0;i<emojireg.length;i++){
				         newEmojireg += emojireg[i]+ (emojiarr[i]?'<emoji>'+emojiarr[i]+'</emoji>':'');
				  }
		    }
		    return newEmojireg!=''?newEmojireg:emojireg;
	}
	//搜狗输入法表情图片
	_this.sougouEmojiImg = function(url,cb){
//	      var wurl="http://pinyin.cn/e149885";
	      mui.ajax({
		     	  url:url,
		     	  dataType:'html',
		     	  success:function(data){
		     	  	  var reg = /<img.+\/>/g;
		     	  	  if(cb){
		     	  	  	  cb(String(data).match(reg)[0]);
		     	  	  }
		     	  },
		     	  error:function(err){
		     	  	 console.log(err)
		     	  	  if(cb){
		     	  	  	  cb('<img alt="获取图片错误" title="获取图片错误" src="../../images/404/emoji.jpg" border="0">');
		     	  	  }
		     	  }
	      })
	}
            //判断横屏竖屏
    _this.HorScreenOrVerScreen = function(hor,ver){
             	  if(window.innerWidth>window.innerHeight){
            	  	      //console.log('横屏')
            	  	      if(hor){hor()}
            	  }else{
            	  	      //console.log('竖屏')
            	  	      if(ver){ver()}
            	  }
            }
	
})(window)
