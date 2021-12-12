'use strict'

const title = document.getElementsByTagName('h1')[0];
const buttonPlus = document.querySelector('.screen-btn');
const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');

const inputRange = document.querySelector('.rollback input');
const rangeValue = document.querySelector('.rollback .range-value')

const startBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];


const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const fullTotalCount = document.getElementsByClassName('total-input')[3];
let totalCountRollback = document.getElementsByClassName('total-input')[4];

let screens = document.querySelectorAll('.screen');


const appData = {
   title: '',
   screens: [],
   screenPrice: 0,
   adaptive: true,
   rollback: 0,
   servicePricesPercent: 0,
   servicePricesNumber: 0,
   fullPrice: 0,
   servicePercentPrice: 0,
   servicesPercent: {},
   servicesNumber: {},
   init: function () {
      appData.addTitle();



      startBtn.addEventListener('click', appData.start)
      buttonPlus.addEventListener('click', appData.addScreenBlock)
      inputRange.addEventListener('input', appData.inputRange)
   },
   addTitle: function () {
      document.title = title.textContent;
   },
   start: function () {
      appData.addScreens()
      appData.addServices()

      appData.addPrices();

      // appData.getServicePercentPrices();

      // appData.logger();

      appData.showResult()
   },
   showResult: function () {
      total.value = appData.screenPrice;
      totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
      fullTotalCount.value = appData.fullPrice;
   },
   addScreens: function () {
      screens = document.querySelectorAll('.screen');

      screens.forEach(function (screen, index) {
         const select = screen.querySelector('select');
         const input = screen.querySelector('input');
         const selectName = select.options[select.selectedIndex].textContent;

         if (select.value === "" || input.value === "") {
            startBtn.Enabled = false;
            alert('Выберите тип экрана и укажите их количество')
         } else {
            startBtn.Enabled = true;
         }

         appData.screens.push({
            id: index,
            name: selectName,
            price: +select.value * +input.value,
            count: +input.value
         });
         console.log(appData.screens);
      })
   },
   // даёт объекту services необходимую информацию
   addServices: function () {
      otherItemsPercent.forEach(function (item) {
         const check = item.querySelector('input[type=checkbox]');
         const label = item.querySelector('label');
         const input = item.querySelector('input[type=text]');

         if (check.checked) {
            appData.servicesPercent[label.textContent] = +input.value;
         }

      })
      otherItemsNumber.forEach(function (item) {
         const check = item.querySelector('input[type=checkbox]');
         const label = item.querySelector('label');
         const input = item.querySelector('input[type=text]');

         if (check.checked) {
            appData.servicesNumber[label.textContent] = +input.value;
         }

      })

   },
   addScreenBlock: function () {
      const cloneScreen = screens[0].cloneNode(true);

      screens[screens.length - 1].after(cloneScreen)
   },
   // Повесить на input[type = range](в блоке с классом.rollback) обработчик события.При перемещении ползунка значение под ним(в элементе span) должно меняться.А так же это значение должно заноситься в свойство rollback нашего объекта для последующих расчетов!
   inputRange: function () {
      rangeValue.textContent = inputRange.value + "%";
      appData.rollback = rangeValue.textContent;

      // меняем сумму с учётом отката в зависимости от положения ползунка
      totalCountRollback.value = appData.fullPrice - (appData.fullPrice * (parseInt(appData.rollback) / 100));
   },

   addPrices: function () {

      let initialValue = 0;
      appData.screenPrice = appData.screens.reduce((a, b) => {
         return a + b.price;
      }, initialValue);

      for (let key in appData.servicesNumber) {
         appData.servicePricesNumber += appData.servicesNumber[key]
      };

      for (let key in appData.servicesPercent) {
         appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100)
      };
      appData.fullPrice = +appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent;

      // стоимость с учётом отката
      totalCountRollback.value = appData.fullPrice - (appData.fullPrice * (parseInt(appData.rollback) / 100));



      // В методе addPrices посчитать общее количество экранов и вывести на страницу итоговое значение в поле с подписью "Количество экранов"
      totalCount.value = appData.screens.reduce((a, b) => a + b.count, 0);
      console.log(totalCount.value);
   },

   logger: function () {

   },
};

appData.init();