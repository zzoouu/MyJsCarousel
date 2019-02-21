/**
 * 轮播图要实现的效果:
 * 1、点击左右箭头，能切换轮播
 * 2、自动循环轮播
 * 3、点击小圆点，能跳转到相应页面
 * 4、鼠标放在页面上时，停止自动轮播,移开鼠标，再自动轮播
 */
window.onload = function(){
  let itemList = document.getElementsByClassName("item-list")[0];
  let prev = document.getElementsByClassName("prev")[0];
  let next = document.getElementsByClassName("next")[0];
  let CItem = document.getElementsByClassName("Carousel-item")[0];
  let circle = document.getElementsByClassName("circle");
  // let LOffset = CItem.offsetLeft;恒定为500
  let timer = null;
  let index = 1;
  
  function nextItem(){
    //el.style.left须在html中设置了left才能取值（相对于具有定位属性position：relative的父元素的位置），且为带px的字符串,可读写，el.offsetLeft为数值，只读，相对于父元素的位置
    // "134px".substring(-2,-1);//1,substring(start,end),不包含end，且参数为负数或者NaN则视为0，若start>end，则结果像两者参数调换（只能从前往后截取）
    // console.log("134px".substr(-2));
    // let LStyle = CItem.style.left;无效
    if(index == 5){
      index = 1;
    }else{
      index++;
    }
    circleItem();
    if(CItem.style.left == "-2000px"){
      CItem.style.left = 0 + "px";
    }else{
      CItem.style.left = parseInt(CItem.style.left) - 500 + "px";
    }
  }
  function prevItem(){
    if(index == 1){
      index = 5;
    }else{
      index--;
    }
    circleItem();
    if(CItem.style.left == "-500px"){
      CItem.style.left = -2500 + "px";
    }else{
      CItem.style.left = parseInt(CItem.style.left) + 500 + "px";
    }
  }
  //定时器自动循环播放
  function autoPlay(){
    timer = setInterval(() => {  
      nextItem();
    }, 1000);
  }
  autoPlay();
  //点击箭头改变轮播项
  prev.onclick = function(){
    clearInterval(timer);
    prevItem();
    autoPlay();
  }
  next.onclick = function(){
    clearInterval(timer);
    nextItem();
    autoPlay();
  }
  //鼠标悬浮停止轮播（计时器）
  CItem.onmouseover = function(){
    clearInterval(timer);
  }
  CItem.onmouseleave = function(){
    autoPlay();
  }
  //为圆点绑定事件
  // document.getElementsByClassName("Carousel-control")[0]
  // for/in item为索引；for/of item为值  string型
  function circleItem(){
    for(let i = 0;i<5;i++){
      circle[i].className = "circle";
    }
    circle[index-1].className = "circle on";
  }
  circleItem();
  for(let inn in circle){
    circle[inn].onclick = function(){
          clearInterval(timer);
          index = parseInt(inn) +1;
          circleItem();
          CItem.style.left = (-500*index) + "px";
          autoPlay();
      };
  }

}