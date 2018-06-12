var muiAudioAmrBase64 = null;
var android_util_Base64 = null;
var java_io_FileOutputStream =null;
var plus_ios_NSData =null;
var new_plus_ios_NSData =null;
mui.plusReady(function(){
    if(mui.os.android){  
        // 读取音频
        android_util_Base64 = plus.android.importClass("android.util.Base64");
        java_io_FileOutputStream = plus.android.importClass("java.io.FileOutputStream");
    }else if(mui.os.ios){
        plus_ios_NSData = plus.ios.importClass('NSData');
        new_plus_ios_NSData = new NSData();
    }
	
	var AudioAmrBase64 = function(){}
	/**
	 * 录音语音文件转base64字符串
	 * @param {Object} path
	 */
     AudioAmrBase64.prototype.AudioAmrToBase64 = function(path,scb,ecb) {
		    plus.io.resolveLocalFileSystemURL(path, function(entry){
		        entry.file(function(file){
		            var reader = new plus.io.FileReader();
		            reader.onloadend = function (e) {
//		            	console.log(scb);
//                      console.log(scb);
                        if(scb){
                        	scb(e,e.target.result)
                        }
//		                console.log(e.target.result);
		            };
		            reader.readAsDataURL(file);
		        },function(e){
		        	if(ecb){ecb()}
		            console.log("读写出现异常: " + e.message );
//		            mui.toast("读写出现异常: " + e.message );
		        })
		    })
	 }
	/**
	 * base64字符串转成语音文件(参考http://ask.dcloud.net.cn/question/16935)
	 * @param {Object} base64Str
	 * @param {Object} callback
	 * @param audioName //录音名字
	 */
	
	AudioAmrBase64.prototype.AmrBase64ToAudio = function(base64Str,audioName, callback) {
	    var base64Str = base64Str.replace('data:audio/amr;base64,','');
//	    var audioName = '_doc/audio/amr/'+(new Date()).valueOf() + '.amr';
         var audioName = '_doc/audio/amr/'+(audioName?audioName:(new Date()).valueOf())+ '.amr';
//       console.log('audioName--------------'+audioName)
	    plus.io.resolveLocalFileSystemURL(audioName,function(entry){
	    	  callback && callback(entry);
	    	  console.log('已---存在该语音文件---'+audioName);
	    },function(){
	    	  newPlusAmrBase64ToAudio(callback);
	    	  console.log('未---存在该语音文件---'+audioName);
	    })
	    //修改后
	    function newPlusAmrBase64ToAudio(callback){
			     plus.io.requestFileSystem(plus.io.PRIVATE_DOC,function(fs){
			        fs.root.getFile(audioName,{create:true},function(entry){
			            // 获得平台绝对路径
			            var fullPath = entry.fullPath;
//			            console.log('fullPath---------'+fullPath);
			            if(mui.os.android){  
			                // 读取音频
		//	                var Base64 = plus.android.importClass("android.util.Base64");
		//	                var FileOutputStream = plus.android.importClass("java.io.FileOutputStream");
			                try{
			                    var out = new java_io_FileOutputStream(fullPath);
			                    var bytes = android_util_Base64.decode(base64Str, android_util_Base64.DEFAULT);
			                    out.write(bytes); 
			                    out.close();
			                    // 回调
			                    callback && callback(entry);
			                }catch(e){
			                    console.log(e.message);
			                }
			            }else if(mui.os.ios){
		//	                var NSData = plus.ios.importClass('NSData');
		//	                var nsData = new NSData();
			                new_plus_ios_NSData = new_plus_ios_NSData.initWithBase64EncodedStringoptions(base64Str,0);
			                if (new_plus_ios_NSData) {
			                    new_plus_ios_NSData.plusCallMethod({writeToFile: fullPath,atomically:true});
			                    plus.ios.deleteObject(new_plus_ios_NSData);
			                }
			                // 回调
			                callback && callback(entry);
			            }
			        })
			    })
	    }

	        

	    //plusAmrBase64ToAudio()
//	    function plusAmrBase64ToAudio(callback){
//		    plus.io.requestFileSystem(plus.io.PRIVATE_DOC,function(fs){
//		        fs.root.getFile(audioName,{create:true},function(entry){
//		            // 获得平台绝对路径
//		            var fullPath = entry.fullPath;
//		            if(mui.os.android){  
//		                // 读取音频
//		                var Base64 = plus.android.importClass("android.util.Base64");
//		                var FileOutputStream = plus.android.importClass("java.io.FileOutputStream");
//		                try{
//		                    var out = new FileOutputStream(fullPath);
//		                    var bytes = Base64.decode(base64Str, Base64.DEFAULT);
//		                    out.write(bytes); 
//		                    out.close();
//		                    // 回调
//		                    callback && callback(entry);
//		                }catch(e){
//		                    console.log(e.message);
//		                }
//		            }else if(mui.os.ios){
//		                var NSData = plus.ios.importClass('NSData');
//		                var nsData = new NSData();
//		                nsData = nsData.initWithBase64EncodedStringoptions(base64Str,0);
//		                if (nsData) {
//		                    nsData.plusCallMethod({writeToFile: fullPath,atomically:true});
//		                    plus.ios.deleteObject(nsData);
//		                }
//		                // 回调
//		                callback && callback(entry);
//		            }
//		        })
//		    })
//	    }
	}


	// 开始录音
	AudioAmrBase64.prototype.startRecordBase64 = null;//录音对象
	AudioAmrBase64.prototype.startRecord = function(scb,ecb){
		console.log('开始录音：');
		var _this = AudioAmrBase64;
		this.startRecordBase64 = plus.audio.getRecorder();
		if ( this.startRecordBase64 == null ) {
			console.log('录音对象未获取');
			return;
		}
		this.startRecordBase64.record({
            filename:"_doc/audio/amr/",
            format:"amr" //iOS平台支持"wav"、"aac"、"amr"格式，默认为"wav"
        }, function(p){
			console.log('录音完成：'+p);
			if(scb){scb(p)}
			//获取amr base64
//			console.log(scb);
//			_this.AudioAmrToBase64(p,scb,ecb);//转成base64
//			plus.io.resolveLocalFileSystemURL(p, function(entry){
// 			   createUpload(p,uid,rid);//mui 上传文件
//			}, function(e){
//				console.log('读取录音文件错误：'+e.message);
//			});
		}, function(e){
			if(ecb){ecb(e)}
			console.log('录音失败：'+JSON.stringify(e));
		} );
	}
	// 停止录音
	AudioAmrBase64.prototype.stopRecord = function(){
		console.log(this.startRecordBase64);
		if(this.startRecordBase64)
		this.startRecordBase64.stop()
		this.startRecordBase64 = null;
	}

	/**
	 * 播放音频
	 * @param {Object} path
	 */
	AudioAmrBase64.prototype.createPlayer =null;//播放录音对象
	AudioAmrBase64.prototype.playAudioBase64 = function(path,scb,ecb) {
		    console.log('path--------'+path);
		    this.createPlayer = plus.audio.createPlayer(path);
		    this.createPlayer.play(function(){
			       if(scb){scb()}
//		           mui.toast("播放成功");
		           console.log("播放成功");
		    }, function(e) {
			    	if(ecb){ecb()}
		            mui.toast("播放失败");
		            console.log("播放失败");
		    }); 
	}
	/**
	 * base64字符串转成语音文件播放
	 * 缓存 base64字符串转成语音文件播放
	 */
	AudioAmrBase64.prototype.cacheAmrBase64ToAudio = function(base64Str,audioName){
	        // 语音文件Base64编码（由于编码过长影响阅读体验，请查看工程验证）
            //var base64Str = "data:audio/amr;base64,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";
	        // 转成.amr文件播放
		    this.AmrBase64ToAudio(base64Str,audioName)
	}
	/**
	 * base64字符串转成语音文件播放
	 * @startplay //真正开始播放
	 */
	AudioAmrBase64.prototype.AmrBase64ToAudioPlay = function(base64Str,audioName,startplay,scb,ecb){
	        // 语音文件Base64编码（由于编码过长影响阅读体验，请查看工程验证）
            //var base64Str = "data:audio/amr;base64,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";
	        // 转成.amr文件播放
		    var _this = this;
//		    console.log('base64Str----->'+base64Str)
		    this.AmrBase64ToAudio(base64Str,audioName, function(entry){
		        var toURL = entry.toURL();
		        console.log(toURL);
		        if(startplay){
		        	startplay();
		        }
		        // 播放音频
		        _this.playAudioBase64(toURL,scb,ecb);
		    })
	}
	//停住播放录音
	AudioAmrBase64.prototype.stopaudio = function(cb){
		   if(this.createPlayer){
			   this.createPlayer.stop();
			   this.createPlayer=null;
		   }
		   if(cb){cb()};
	}
	
	muiAudioAmrBase64 = new AudioAmrBase64();
})
//http://ask.dcloud.net.cn/article/841
