var mouseX,mouseY,prevX,prevY,currentX,currentY,flag=false;
var box=document.getElementById("box");
var maxL=document.documentElement.clientWidth-box.offsetWidth,
	maxT=document.documentElement.clientHeight-box.offsetHeight;
box.onmousedown=function(e){
	mouseX=e.clientX;
	mouseY=e.clientY;
	prevX=box.offsetLeft;
	prevY=box.offsetTop;
	flag=true;
}

document.onmousemove=function(e){
	if( flag ){
		currentX=prevX+(e.clientX-mouseX);
		currentY=prevY+(e.clientY-mouseY);
		if(currentX<=0){currentX=0}
		if(currentY<=0){currentY=0}
		if(currentX>=maxL){currentX=maxL}
		if(currentY>=maxT){currentY=maxT}
		box.style.left=currentX+"px";
		box.style.top =currentY+"px";
	}
	
}

document.onmouseup=function(e){
	flag=false;
}
