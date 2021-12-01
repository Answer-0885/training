let title = prompt('Как называется ваш проект?');
let screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные ')
let screenPrice = +prompt('Сколько будет стоить данная работа ?', '15000')
let rollback = 5
let adaptive = confirm('Нужен ли адаптив на сайте?')
let service1 = prompt('Какой дополнительный тип услуги нужен?', 'service1')
let servicePrice1 = +prompt('Сколько это будет стоить?', '5000')
let service2 = prompt('Какой дополнительный тип услуги нужен?', 'service2')
let servicePrice2 = +prompt('Сколько это будет стоить?', '6000')
let fullPrice = screenPrice + servicePrice1 + servicePrice2
let servicePercentPrice = fullPrice - (fullPrice * (rollback / 100))

const showTypeOf = function (variable) {
   console.log(variable, typeof variable);
}

// Функция возвращает сумму всех дополнительных услуг.
const getAllServicePrices = function (sp1, sp2) {
   return sp1 + sp2
}
allServicePrices = getAllServicePrices(servicePrice1, servicePrice2)


//Функция возвращает сумму стоимости верстки и стоимости дополнительных услуг
function getFullPrice(scrPr, allScrPr) {
   return scrPr + allScrPr
}
fullPrice = getFullPrice(screenPrice, allServicePrices)


//Функция возвращает title меняя его таким образом: первый символ с большой буквы, остальные с маленькой". Учесть вариант что строка может начинаться с пустых символов. " КаЛьКулятор Верстки"
let getTitle = function (title) {
   title = title.trim().toLowerCase();
   return title[0].toUpperCase() + title.substring(1);
}
getTitle(title);

// Функция возвращает итоговую стоимость за вычетом процента отката
function getServicePercentPrices(fullPrice, rollback) {
   return fullPrice - (fullPrice * (rollback / 100))
}
servicePercentPrice = getServicePercentPrices(fullPrice, rollback);



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
}

showTypeOf(title)
showTypeOf(screenPrice)
showTypeOf(adaptive)

console.log(screens.split(','));
console.log(getRollbackMessage(fullPrice));
console.log(servicePercentPrice);