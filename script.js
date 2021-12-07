'use strict'

const appData = {
   title: '',
   screens: [],
   screenPrice: 0,
   adaptive: true,
   rollback: 10,
   allServicePrices: 0,
   fullPrice: 0,
   servicePercentPrice: 0,
   services: {},
   start: function () {
      appData.asking();
      appData.addPrices();
      appData.getFullPrice();
      appData.getServicePercentPrices();
      appData.getTitle();
      appData.logger();
   },
   isNumber: function (num) {
      return !isNaN(parseFloat(num)) && isFinite(num) // лучшая проверка на число. Проверяет введено ли не действительное число, если да то возвращает true.
   },
   asking: function () {

      appData.title = prompt('Как называется ваш проект?', 'Калькулятор вёрстки');

      //проверка, на строку.
      if (!isNaN(appData.title)) {
         alert('Необходимо ввести строчное значение');
         appData.asking();
      }

      function circleScreens() {
         for (let i = 0; i < 2; i++) {
            let name = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные ')
            let price = 0

            //проверка на строку
            if (!isNaN(name)) {
               alert('Необходимо ввести строчное значение');
               circle()
            }

            // + делает проверку на число
            do {
               price = +prompt('Сколько будет стоить данная работа ?');
            } while (!appData.isNumber(price))

            appData.screens.push({
               id: i,
               name: name,
               price: price
            })
         }
      }
      circleScreens();

      function circleService() {
         for (let i = 0; i < 2; i++) {
            let name = prompt('Какой дополнительный тип услуги нужен?');
            let price = 0;

            //проверка на строку
            if (!isNaN(name)) {
               alert('Необходимо ввести строчное значение');
               circleService();
            };

            do {
               price = prompt('Сколько это будет стоить?');
            }
            while (!appData.isNumber(price));

            appData.services[name + i] = +price;
         }
         console.log(appData.services);
      }
      circleService()

      appData.adaptive = confirm('Нужен ли адаптив на сайте?');
   },

   addPrices: function () {

      let initialValue = 0;
      appData.screenPrice = appData.screens.reduce((a, b) => {
         return a + b.price;
      }, initialValue);

      for (let key in appData.services) {
         appData.allServicePrices += appData.services[key]
      };
   },

   //Функция возвращает сумму стоимости верстки и стоимости дополнительных услуг
   getFullPrice: function () {
      appData.fullPrice = +appData.screenPrice + appData.allServicePrices
   },

   // Функция возвращает итоговую стоимость за вычетом процента отката
   getServicePercentPrices: function () {
      appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100))
   },

   //Функция возвращает title меняя его таким образом: первый символ с большой буквы, остальные с маленькой". Учесть вариант что строка может начинаться с пустых символов. " КаЛьКулятор Верстки"
   getTitle: function () {
      appData.title = appData.title.trim()[0].toUpperCase() + appData.title.trim().substr(1).toLowerCase();
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
      console.log(appData.fullPrice);
      console.log(appData.servicePercentPrice);
      console.log(appData.screens);
   },
};

appData.start();