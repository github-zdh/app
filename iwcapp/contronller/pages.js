(function(w){
	 w.__root__ = location.href.split('www')[0]+'www/';
	 var view = 'view/'
	 w.pages ? w.pages.__proto__ : w.pages = {
	 	  index : 'index.html',
	 	  loginIndex : view + 'login/index.html',
	 	  memberSet : view + 'member/set.html'
	 };

})(window)
