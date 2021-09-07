

  function phoneGrab(e){
      activeButton.removeEventListener('click', createSpans);
    onlySymbolsArr.forEach(e => e.removeEventListener('touchmove', phoneGrab));
    currentPic = {
    left: e.style.left, 
      top: e.style.top 
    }
    onlySymbolsArr.forEach(e => e.addEventListener('touchmove', ev=> {

    document.body.append(e); 
    var touchLocation = ev.targetTouches[0];
    e.style.left = touchLocation.pageX + 'px';
    e.style.top = touchLocation.pageY + 'px';
  }))
   
  
  onlySymbolsArr.forEach(e => e.addEventListener('touchend', ()=> {

    var x = parseInt(e.style.left);
    var y = parseInt(e.style.top);
    noLayOnPhone(e);

    onlySymbolsArr.forEach(e => e.addEventListener('touchmove', phoneGrab(e)));
    activeButton.addEventListener('click', createSpans);
  }));
  }

  function noLayOnPhone(e){
  let arrWhithoutE = onlySymbolsArr.filter(item => {
      return item != e;
    });
  for (let i = arrWhithoutE.length - 1; i >= 0; i--) {
    let arrI = arrWhithoutE[i].getBoundingClientRect();
    let current = e.getBoundingClientRect();
    let countWidth = Math.sqrt(Math.pow(arrI.x-current.x, 2)+Math.pow(arrI.y-current.y, 2));

    if (countWidth < 10){
        document.body.append(arrWhithoutE[i]);
      arrWhithoutE[i].style.position = 'absolute';
      arrWhithoutE[i].style.left = currentPic.left;
      arrWhithoutE[i].style.top = currentPic.top;
    } 
  } 
}