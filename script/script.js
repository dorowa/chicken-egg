const storyTemplateLink = "https://api.myjson.com/bins/jcmhn";
const buttonClass = "button-fetch";

var storyArrayX;
var storyText;

const render = data => {
	const re1=/\{|\}/;
	const re2=/\{[a-z]*\d?\}/g;

	let storyArray = Array.from(data.text);
	storyText = storyArray.join("<br>");
	storyArrayX = storyText.matchAll(re2);
	storyArrayX = Array.from(storyArrayX);
	storyText = storyText.split(re1)


	let elementsSet = new Set();
	let i=0;
	for(i = 0; i < storyArrayX.length; i++) {
		elementsSet.add(storyArrayX[i][0]);
	};
	storyArrayX=Array.from(elementsSet);

	storyLayout=`<div class="row" style="justify-content: center;"><div class="col-9 main-header"><p class="h1" style="text-align: center;">Сочиняем сказку</p></div></div>`;
	
	for(i=0; i<storyArrayX.length-1;i++){
		storyArrayX[i] = storyArrayX[i].substring(1,storyArrayX[i].length-1);
		storyLayout+=`<div class="row" style="margin: 20px; justify-content: space-between;"><div class="col-3"><p class="h5">Персонаж ${i+1}:</p></div><div class="col-6"><input class="${storyArrayX[i]}" type="text" placeholder="${storyArrayX[i]}"  style="width: 100%;"></div></div>`;
	};
	
	storyArrayX[i] = storyArrayX[i].substring(1,storyArrayX[i].length-1);
	storyLayout += `<div class="row" style="margin: 20px; justify-content: space-between;"><div class="col-3"><p class="h5">Возглас:</p></div><div class="col-6"><input class="${storyArrayX[i]}" type="text" placeholder="${storyArrayX[i]}" style="width: 100%;"></div></div>`;

	const $storyLayout = $(storyLayout);
	$storyLayout.prependTo($('.container'));
}

function getTemplate()
{
	$.getJSON(storyTemplateLink, function(data) {
		render(data);
	});
};

function handleButton() {
	let collectData=[];
	getStory = [];
	for(let i = 0; i < storyArrayX.length; i++){
		collectData.push($(`.${storyArrayX[i]}`).val());
	};
	let j=0;
	for(let i = 0; i < storyText.length; i++){
		for(j = 0; j < storyArrayX.length; j++)
			if (storyText[i]==storyArrayX[j]){
				getStory.push(collectData[j]);
				break;
			}	
		if (j==storyArrayX.length){
			getStory.push(storyText[i]);
		};
	}
	let finaleText = `<div class="row final-text"><div class="col-3"><p class="h3">Финальная сказка:</p></div><div class="col-9 final-box"><div class="box-center"><p>${getStory.join("")}</p></div></div></div>`;
	const $finaleText = $(finaleText);
	$('.final-text').remove();
	$finaleText.appendTo($('.container'));
}

function initField(){
	getTemplate();
}
function initButton() {
	$(`.${buttonClass}`).click(handleButton);
}

function initAll() {
	initField();
	initButton();
}


$(document).ready(initAll);