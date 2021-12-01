let title = prompt('Как называется ваш проект?');
let screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные ');
let screenPrice = +prompt('Сколько будет стоить данная работа ?', '15000');
let adaptive = confirm('Нужен ли адаптив на сайте?');

let rollback = 10;
let allServicePrices;
let fullPrice;
let servicePercentPrice;

let service1 = prompt('Какой дополнительный тип услуги нужен?', 'service1');
let servicePrice1 = +prompt('Сколько это будет стоить?', '5000');
let service2 = prompt('Какой дополнительный тип услуги нужен?', 'service2');
let servicePrice2 = +prompt('Сколько это будет стоить?', '6000');

// Функция возвращает сумму всех дополнительных услуг.
const getAllServicePrices = function () {
   return servicePrice1 + servicePrice2
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

allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrices();
title = getTitle();

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log(getRollbackMessage(fullPrice));
console.log(typeof title);
console.log(typeof screenPrice);
console.log(typeof adaptive);

console.log(screens.length);
console.log(servicePercentPrice);

console.log(screens.split(','));

console.log("Стоимость вёрстки экранов " + screenPrice + " рублей");
console.log("Стоимость разработки сайта " + fullPrice + " рублей");