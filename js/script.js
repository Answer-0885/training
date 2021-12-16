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

const cmsOpen = document.querySelector('#cms-open');
const hiddenCmsVariants = document.querySelector('.hidden-cms-variants');
const mainControlsInput = hiddenCmsVariants.querySelector('.main-controls__input');
const cmsSelect = hiddenCmsVariants.querySelector('#cms-select');
const wordPress = hiddenCmsVariants.querySelectorAll('option')[1];


// Создаём глобальны объект
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
      this.addTitle.bind(appData);

      startBtn.addEventListener('click', this.start.bind(appData));
      buttonPlus.addEventListener('click', this.addScreenBlock.bind(appData));
      inputRange.addEventListener('input', this.inputRange.bind(appData));
      resetBtn.addEventListener('click', this.reset.bind(appData));
      cmsOpen.addEventListener('click', this.cmsOpen.bind(appData));
      cmsSelect.addEventListener('change', this.mainControlsInput.bind(appData));
      cmsSelect.addEventListener('change', this.wordPress.bind(appData));
   },
   addTitle: function () {
      document.title = title.textContent;
   },
   cmsOpen: function () {
      hiddenCmsVariants.style.display = 'flex';
   },
   // если выведено поле другие, то добавляем поле mainControlsInput
   mainControlsInput: function (e) {
      if (e.target.value === 'other') {
         mainControlsInput.style.display = 'flex';
      } else {
         mainControlsInput.style.display = 'none';
      }
   },
   wordPress: function () {
      if (cmsSelect.value == '50') {
         totalCountRollback.value = totalCountRollback.value * 1.5;
      }
   },
   //Нажимаем на кнопку Рассчитать
   start: function () {
      this.addScreens()
      this.addServices()
      this.addPrices();
      this.showResult()
   },
   showResult: function () {
      total.value = this.screenPrice;
      totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber;
      fullTotalCount.value = this.fullPrice;
   },
   addScreens: function () {
      screens = document.querySelectorAll('.screen');

      screens.forEach((screen, index) => {
         const select = screen.querySelector('select');
         const input = screen.querySelector('input');
         const selectName = select.options[select.selectedIndex].textContent;

         // Проверка на пустые поля, если значения в select и input не записаны, то блоируем все вычисления
         if (select.value === "" || input.value === "") {
            this.start() = false;
            // кнопка расчитать не блокируется при первом предупреждении
            if (select.value !== "" || input.value !== "") {
               this.start() = true;
            }
         } else {
            select.disabled = true;
            input.disabled = true;
            buttonPlus.disabled = true;
            startBtn.style.display = 'none'; // кнопка Рассчитать исчезает после нажатия
            resetBtn.style.display = 'flex';

            otherItemsPercent.forEach((item) => {
               item.querySelector('input[type=checkbox]').disabled = true;
            });
            otherItemsNumber.forEach((item) => {
               item.querySelector('input[type=checkbox]').disabled = true;
            });
            if (select.value === "" && input.value === "") {
               this.reset()
            };
         }
         this.screens.push({
            id: index,
            name: selectName,
            price: +select.value * +input.value,
            count: +input.value
         });
      })
   },
   // даёт объекту services необходимую информацию
   addServices: function () {
      otherItemsPercent.forEach((item) => {
         const check = item.querySelector('input[type=checkbox]');
         const label = item.querySelector('label');
         const input = item.querySelector('input[type=text]');

         if (check.checked) {
            this.servicesPercent[label.textContent] = +input.value;
         }
      })
      otherItemsNumber.forEach((item) => {
         const check = item.querySelector('input[type=checkbox]');
         const label = item.querySelector('label');
         const input = item.querySelector('input[type=text]');

         if (check.checked) {
            this.servicesNumber[label.textContent] = +input.value;
         }
      })
   },
   // здесь, после нажатия на "+" добавляется очищенная новая строка с экранами и их количеством
   addScreenBlock: function () {
      const cloneScreen = screens[0].cloneNode(true);
      cloneScreen.querySelector('input').value = '';
      screens[screens.length - 1].after(cloneScreen);
   },
   // Повесить на input[type = range](в блоке с классом.rollback) обработчик события.При перемещении ползунка значение под ним(в элементе span) должно меняться.А так же это значение должно заноситься в свойство rollback нашего объекта для последующих расчетов!
   inputRange: function () {
      rangeValue.textContent = inputRange.value + "%";
      this.rollback = rangeValue.textContent;

      // меняем сумму с учётом отката в зависимости от положения ползунка
      // если выбран пункт wordPress то итоговую сумму увеличиваем на 50%
      if (cmsSelect.value == '50') {
         totalCountRollback.value = 1.5 * (this.fullPrice - (this.fullPrice * (parseInt(this.rollback) / 100)));
      } else {
         totalCountRollback.value = this.fullPrice - (this.fullPrice * (parseInt(this.rollback) / 100));
      }
   },

   addPrices: function () {

      let initialValue = 0;
      this.screenPrice = this.screens.reduce((a, b) => {
         return a + b.price;
      }, initialValue);

      for (let key in this.servicesNumber) {
         this.servicePricesNumber += this.servicesNumber[key]
      };

      for (let key in this.servicesPercent) {
         this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100)
      };
      this.fullPrice = +this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;

      // стоимость с учётом отката
      totalCountRollback.value = this.fullPrice - (this.fullPrice * (parseInt(this.rollback) / 100));

      // В методе addPrices посчитать общее количество экранов и вывести на страницу итоговое значение в поле с подписью "Количество экранов"
      totalCount.value = this.screens.reduce((a, b) => a + b.count, 0);

   },
   reset: function () {
      const select = document.querySelector('select');
      const input = document.querySelector('input');

      // удаляем все дополнительные поля с экранами screens
      screens.forEach((screen, index) => {
         if (index !== 0) {
            screen.remove();
         };
         // после сброса пушим screens[0], чтобы всё работало корректно
         let newScreen = screens[0];
         screens = [];
         screens.push(newScreen);
      });

      select.disabled = false;
      select.value = "";
      input.disabled = false;
      input.value = "";

      // screenPrice.value = 0;
      // servicePricesPercent.value = 0;
      // servicePricesNumber.value = 0;
      // fullPrice.value = 0;

      buttonPlus.disabled = false;
      startBtn.style.display = 'flex'; // кнопка Рассчитать исчезает после нажатия
      resetBtn.style.display = 'none';
      total.value = 0;
      totalCount.value = 0;
      totalCountOther.value = 0;
      fullTotalCount.value = 0;
      totalCountRollback.value = 0;
      rangeValue.textContent = 0 + "%";
      inputRange.value = 0;
      hiddenCmsVariants.style.display = 'none'
      cmsOpen.checked = false;
      this.screenPrice = 0;
      this.rollback = 0;
      this.fullPrice = 0;
      this.ServicePricesPercent = 0;
      this.ServicePricesNumber = 0;
      this.servicePercentPrice = 0;
      this.screens.splice(0);

      // убираем чекбоксы и делаем эти поля активными
      otherItemsPercent.forEach((item) => {
         item.querySelector('input[type=checkbox]').checked = false;
         item.querySelector('input[type=checkbox]').disabled = false;
         const label = item.querySelector('label');
         this.servicesPercent[label.textContent] = 0;
      });

      otherItemsNumber.forEach((item) => {
         item.querySelector('input[type=checkbox]').checked = false;
         item.querySelector('input[type=checkbox]').disabled = false;
         const label = item.querySelector('label');
         this.servicesNumber[label.textContent] = 0;
      });
   },
};

appData.init();