const storyTemplateLink = "https://api.myjson.com/bins/jcmhn";
const buttonClass = "button-fetch";

let storyArrayX=[];
let storyText=[];

const render = data => {
	const re1=/\{|\}/;
	const re2=/\{[a-z]*\d?\}/g;
//получаем шаблон для дальнейшей работы, добавляем переносы
	let storyArray = Array.from(data.text);
	storyText = storyArray.join("<br>");
//выбираем подстроки вида {abc1} - шаблонные подстроки
//преобразуем в массив	
	storyArrayX = storyText.matchAll(re2);
	storyArrayX = Array.from(storyArrayX);
//разбиваем текст на фрагменты так, чтобы шаблонные подстроки
//составляли отдельный элемент
	storyText = storyText.split(re1)

// избавляемся от повторов в массиве шаблонных подстрок 
// через множество
	let elementsSet = new Set();
	let i=0;
	storyArrayX.forEach((key)=>elementsSet.add(key[0]));
	storyArrayX=Array.from(elementsSet);
//формируем html-структуру для вывода в DOM
	storyLayout=`<div class="row" style="justify-content: center;"><div class="col-9 main-header"><p class="h1" style="text-align: center;">Сочиняем сказку</p></div></div>`;
//формируем основной блок input элементов
//заодно избавляемся от обрамляющих {}
	for(i=0; i<storyArrayX.length-1;i++){
		storyArrayX[i] = storyArrayX[i].substring(1,storyArrayX[i].length-1);
		storyLayout+=`<div class="row" style="margin: 20px; justify-content: space-between;"><div class="col-3"><p class="h5">Персонаж ${i+1}:</p></div><div class="col-6"><input class="${storyArrayX[i]}" type="text" placeholder="${storyArrayX[i]}"  value="${storyArrayX[i]}" style="width: 100%;"></div></div>`;
	};
//можно воткнуть в цикл, но для красоты
//последний параметр назовем отлично от остальных
	storyArrayX[i] = storyArrayX[i].substring(1,storyArrayX[i].length-1);
	storyLayout += `<div class="row" style="margin: 20px; justify-content: space-between;"><div class="col-3"><p class="h5">Возглас:</p></div><div class="col-6"><input class="${storyArrayX[i]}" type="text" placeholder="${storyArrayX[i]}" value="${storyArrayX[i]}" style="width: 100%;"></div></div>`;

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
	let getStory = "";
	let objKeys = {};
//собириаем обьект ключ-значение
	storyArrayX.forEach((key,i)=>objKeys[key]=$(`.${storyArrayX[i]}`).val());

	storyText.forEach(function(item, index){
		for(key in objKeys){
			item = item.replace(key,objKeys[key]);
		};
		getStory+=item;
	});
	let finaleText = `<div class="row final-text"><div class="col-3"><p class="h3">Финальная сказка:</p></div><div class="col-9 final-box"><div class="box-center"><p>${getStory}</p></div></div></div>`;

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