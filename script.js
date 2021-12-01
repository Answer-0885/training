'use strict'

let title;
let screens;
let screenPrice;
let adaptive;
let rollback = 10;
let allServicePrices;
let fullPrice;
let servicePercentPrice;
let service1;
let service2;

const isNumber = function (num) {
   return !isNaN(parseFloat(num)) && isFinite(num) // лучшая проверка на число. Проверяет введено ли не действительное число, если да то возвращает true.
}

const asking = function () {
   title = prompt('Как называется ваш проект?', 'Калькулятор вёрстки');
   screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные ');
   // цикл do while выведет окно с вопросомю
   do {
      screenPrice = prompt('Сколько будет стоить данная работа ?');
   }
   while (!isNumber(screenPrice)) //знак отрицания переварачивает isNumber т.е. если введено не действительное число, то вернётся false и цикл продолжится по кругу, пока не получит true.

   adaptive = confirm('Нужен ли адаптив на сайте?');
}






// Отвечает за название и стоимость дополнительных услуг.
const getAllServicePrices = function () {
   let sum = 0
   for (let i = 0; i < 2; i++) {
      if (i === 0) {
         service1 = prompt('Какой дополнительный тип услуги нужен?', 'Метрика')
      } else if (i === 1) {
         service2 = prompt('Какой дополнительный тип услуги нужен?', 'Отправка форм');
      }
      do {
         sum += +prompt('Сколько это будет стоить?', '5000')
      }
      while (!isNumber(sum))
   }
   return sum
};

const showTypeOf = function (variable) {
   console.log(variable, typeof variable);
};

//Функция возвращает сумму стоимости верстки и стоимости дополнительных услуг
const getFullPrice = function () {
   return screenPrice + allServicePrices
};

//Функция возвращает title меняя его таким образом: первый символ с большой буквы, остальные с маленькой". Учесть вариант что строка может начинаться с пустых символов. " КаЛьКулятор Верстки"
let getTitle = function () {
   return title.trim()[0].toUpperCase() + title.trim().substring(1).toLowerCase();
};


// Функция возвращает итоговую стоимость за вычетом процента отката
const getServicePercentPrices = function () {
   return fullPrice - (fullPrice * (rollback / 100))
};


const getRollbackMessage = function (price) {
   if (price >= 30000) {
      return 'Даем скидку в 10 %';
   } else if (price >= 15000 && price < 30000) {
      return 'Даем скидку в 5 %';
   } else if (price >= 0 && price < 15000) {
      console.log('Скидка не предусмотрена');
   } else {
      console.log('Что то пошло не так');
   };
};

asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrices();
title = getTitle();

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log('allServicePrices', allServicePrices);

console.log(getRollbackMessage(fullPrice));
console.log(typeof title);
console.log(typeof screenPrice);
console.log(typeof adaptive);

console.log(screens.length);
console.log(servicePercentPrice);

console.log(screens.split(','));

console.log("Стоимость вёрстки экранов " + screenPrice + " рублей");
console.log("Стоимость разработки сайта " + fullPrice + " рублей");