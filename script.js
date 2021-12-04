'use strict'

const appData = {
   title: '',
   screens: '',
   screenPrice: 0,
   adaptive: true,
   rollback: 10,
   allServicePrices: 0,
   fullPrice: 0,
   servicePercentPrice: 0,
   service1: '',
   service2: '',
   asking: function () {
      appData.title = prompt('Как называется ваш проект?', 'Калькулятор вёрстки');
      appData.screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные ');
      // цикл do while выведет окно с вопросомю

      do {
         appData.screenPrice = +prompt('Сколько будет стоить данная работа ?');
      } while (!appData.isNumber(appData.screenPrice)) //знак отрицания переварачивает isNumber т.е. если введено не действительное число, то вернётся false и цикл продолжится по кругу, пока не получит true.

      appData.adaptive = confirm('Нужен ли адаптив на сайте?');
   },
   isNumber: function (num) {
      return !isNaN(parseFloat(num)) && isFinite(num) // лучшая проверка на число. Проверяет введено ли не действительное число, если да то возвращает true.
   },
   // Отвечает за название и стоимость дополнительных услуг.
   getAllServicePrices: function () {
      let sum = 0
      for (let i = 0; i < 2; i++) {
         let price = 0;

         if (i === 0) {
            appData.service1 = prompt('Какой дополнительный тип услуги нужен?', 'Метрика')
         } else if (i === 1) {
            appData.service2 = prompt('Какой дополнительный тип услуги нужен?', 'Отправка форм');
         }

         do {
            price = prompt('Сколько это будет стоить?');
         }
         while (!appData.isNumber(price));
         sum += +price

      }
      return sum;
   },
   //Функция возвращает сумму стоимости верстки и стоимости дополнительных услуг
   getFullPrice: function () {
      return +appData.screenPrice + appData.allServicePrices
   },
   // Функция возвращает итоговую стоимость за вычетом процента отката
   getServicePercentPrices: function () {
      return appData.fullPrice - (appData.fullPrice * (appData.rollback / 100))
   },
   //Функция возвращает title меняя его таким образом: первый символ с большой буквы, остальные с маленькой". Учесть вариант что строка может начинаться с пустых символов. " КаЛьКулятор Верстки"
   getTitle: function () {
      return appData.title.trim()[0].toUpperCase() + appData.title.trim().substr(1).toLowerCase();
   },
   getRollbackMessage: function (price) {
      if (price >= 30000) {
         return 'Даем скидку в 10 %';
      } else if (price >= 15000 && price < 30000) {
         return 'Даем скидку в 5 %';
      } else if (price >= 0 && price < 15000) {
         console.log('Скидка не предусмотрена');
      } else {
         console.log('Что то пошло не так');
      };
   },
   logger: function () {
      console.log('вся необходимая информация');

      for (let key in appData) {
         console.log('ключ ' + key + ' значение ' + appData[key]);
      };
   },
   start: function () {
      appData.asking();
      appData.allServicePrices = appData.getAllServicePrices();
      appData.fullPrice = appData.getFullPrice();
      appData.servicePercentPrice = appData.getServicePercentPrices();
      appData.title = appData.getTitle();
      appData.logger();
   }

};

appData.start();

console.log(appData.fullPrice);
console.log(appData.servicePercentPrice);