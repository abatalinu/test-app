let activeButton = [].slice.call(document.getElementsByClassName('display-button'))[0];
let textInput = [].slice.call(document.getElementsByClassName('text-input'))[0];
let textSpan = [].slice.call(document.getElementsByClassName('text-span'))[0];
let onlySymbolsArr;
let currentPic ;

//            //Enter bind//
// document.addEventListener("keypress", ()=>{
//     if (event.key == "Enter") {
//         textSpan.textContent = textInput.value; 
//     }
// });

activeButton.addEventListener('click', createSpans);
function createSpans(){
	textSpan.innerHTML =``;
	let symbolsVsSpacingArr = textInput.value.split('');
	symbolsVsSpacingArr.reverse();
	for (var i = symbolsVsSpacingArr.length - 1; i >= 0; i--) {
		textSpan.innerHTML += `<span class='drag-n-plase-items'>`+symbolsVsSpacingArr[i]+`</span>`;
	}
	setTimeout(()=>{
		let textItems = [].slice.call(document.getElementsByClassName('drag-n-plase-items'));
		onlySymbolsArr = textItems.filter((e)=>{
			if( e.textContent != ` ` ){
				return e
			}
		});
//Mobile V		// onlySymbolsArr.forEach(e => e.addEventListener('touchmove', phoneGrab(e)));
		onlySymbolsArr.forEach(e => e.addEventListener('click', startMoving));
	}, 0)
}


let startMoving = function (arr){
	onlySymbolsArr.forEach(e => e.removeEventListener('click', startMoving))
	activeButton.removeEventListener('click', createSpans);
	let e = this;
	e.style.position= 'absolute';
	
	document.body.style.cursor= 'grabbing';
	document.body.append(e); 

	e.style.left = event.pageX + 'px';
	e.style.top = event.pageY + 'px';
	currentPic = {
		left: e.style.left, 
  		top: e.style.top 
	}



	document.addEventListener('mousemove', move);

	function move() {
		e.style.left = event.pageX + 'px';
		e.style.top = event.pageY + 'px';
	}


	e.addEventListener('click', restart);
	function restart(){
		noLayOn(e)
		document.body.style.cursor= 'default';

    	document.removeEventListener('mousemove', move);
    	e.removeEventListener('click', restart);
    	onlySymbolsArr.forEach(e => e.addEventListener('click', startMoving));
    	activeButton.addEventListener('click', createSpans);
	}
}

function noLayOn(e){
	let arrWhithoutE = onlySymbolsArr.filter(item => {
  		return item != e;
		});
	for (let i = arrWhithoutE.length - 1; i >= 0; i--) {
		let arrI = arrWhithoutE[i].getBoundingClientRect();
		let current = e.getBoundingClientRect();
		let countWidth = Math.sqrt(Math.pow(arrI.x-current.x, 2)+Math.pow(arrI.y-current.y, 2));

		console.log(arrWhithoutE[i]);
		if (countWidth < 10){
				document.body.append(arrWhithoutE[i]);
			arrWhithoutE[i].style.position = 'absolute';
			arrWhithoutE[i].style.left = currentPic.left;
			arrWhithoutE[i].style.top = currentPic.top;
		} 
	}	
}