var box=document.getElementById("box");
box.onmousedown=function(e){
	var event=e||window.event,
	disL=event.clientX-box.offsetLeft,
	disT=event.clientY-box.offsetTop,
	
	maxL=document.documentElement.clientWidth-box.offsetWidth,
	maxT=document.documentElement.clientHeight-box.offsetHeight;

	document.onmousemove=function(e){
		var event=e||window.event,
		disX=event.clientX-disL,
		disY=event.clientY-disT;

		if(disX<=0){disX=0}
		if(disY<=0){disY=0}
		if(disX>=maxL){disX=maxL}
		if(disY>=maxT){disY=maxT}
		box.style.left=disX+'px';	
		box.style.top=disY+'px';	
	}

}

document.onmouseup=function(){
	document.onmousemove=null;
}