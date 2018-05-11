/*
   @params options
   [
	   {
		   title:string,
		   img:string src,//img/icon二选一
		   icon:string className,//img/icon二选一
		   href:string,
       click:function
	   }
   ]
   ----------------------------------------------------------------------------------------
   demo :
	new topRightMenu({
		  el:'topBox',//ID
		  list:[
				   {
					   title:'first',
					   img:'https://avatars2.githubusercontent.com/u/35329223?s=400&amp;u=68cabf242a4069835af3454d7d1cf09fb47b58d8&amp;v=4',//img/icon二选一
					   click:function(){
					   	    console.log('first');
					   }
				   },
				   {
					   title:'second',
					   icon:'mui-icon mui-icon-home',
					   href:'https://nphapi.igango.com/html/view/index.html'
				   },
				   {
					   title:'thrid',
					   img:'https://avatars2.githubusercontent.com/u/35329223?s=400&amp;u=68cabf242a4069835af3454d7d1cf09fb47b58d8&amp;v=4',//img/icon二选一
					   click:function(){
					   	    console.log('thrid');
					   }
				   }
			   ]
	});
 */
var topRightMenu = function(options) {
  	this.optionsEl = document.getElementById(options.el);
    this.options = options.list;
  	this.el = {};
    this.innerHTML = '';
  	this._init();
};

var proto = topRightMenu.prototype;

proto._init = function() {
     this.el.box=this.creatEl('div');
	 this.el.box.id = 'topRightMenu';
	 this.el.ul=this.creatEl('ul');
   this.el.ul.style.listStyle = 'none';
   this.el.ul.style.padding = '0px';
   this.el.ul.style.margin = '0px';

   this.el.ul.style.backgroundColor = '#333';
	 for(var i=0;i<this.options.length;i++){
           this.el.li=this.creatEl('li');
           this.el.li.style.listStyle = 'none';
           this.el.li.style.padding = '0px';
           this.el.li.style.margin = '0px';
           this.el.a=this.creatEl('a');
           this.el.a.style.display = 'block';
           this.el.a.style.lineHeight = '26px';
           this.el.a.style.position = 'relative';
           this.el.a.style.padding = '12px 10px';
           this.el.a.style.overflow = 'hidden';
           this.el.a.style.color = '#fff';
           if(i<this.options.length-1){
           	   this.el.a.style.boxShadow = '0 1px 0 rgba(0,0,0,0.3)';
           }

           if(this.options[i].href&&this.options[i].href!=''){
                   this.el.a.href = this.options[i].href;
           }else{
           	       this.el.a.href = 'javascript:;';
                   if(this.options[i].click&&this.options[i].click!=''){
                        this.el.a.addEventListener('tap',this.options[i].click, false);  
                   }
           }
           if(this.options[i].img&&this.options[i].img!=''){
                this.el.img=this.creatEl('img');
                this.el.img.src = this.options[i].img;
                this.el.img.style.width = '30px';
                this.el.img.style.height = '30px';
                this.el.img.style.position = 'absolute';
                this.el.img.style.top = '10px';
                this.el.img.style.left = '20px';
                this.el.a.appendChild(this.el.img);
           }else{
                this.el.i=this.creatEl('i');
                this.el.i.style.fontSize = '30px';
                this.el.i.style.position = 'absolute';
                this.el.i.style.top = '10px';
                this.el.i.style.left = '20px';

                this.el.i.className = this.options[i].icon;
                this.el.a.appendChild(this.el.i);
           }
           this.el.span=this.creatEl('span');
           this.el.span.style.paddingLeft = '50px';
           this.el.span.style.fontSize = '16px';
           
           this.el.span.innerHTML = this.options[i].title;
           this.el.a.appendChild(this.el.span);
	 	   this.el.li.appendChild(this.el.a);
	 	   this.el.ul.appendChild(this.el.li);
	 }
	 this.el.box.appendChild(this.el.ul);
     this.innerHTML = this.el.box;
     this.optionsEl.appendChild(this.el.box);

};
proto.creatEl = function(el) {
	return document.createElement(el);
};
