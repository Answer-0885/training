let title = prompt('Как называется ваш проект?');
let screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные ')
let screenPrice = +prompt('Сколько будет стоить данная работа ?', '15000')
let rollback = 9
let adaptive = !!prompt('Нужен ли адаптив на сайте?')
let service1 = prompt('Какой дополнительный тип услуги нужен?', 'service1')
let servicePrice1 = +prompt('Сколько это будет стоить?', '5000')
let service2 = prompt('Какой дополнительный тип услуги нужен?', 'service2')
let servicePrice2 = +prompt('Сколько это будет стоить?', '6000')
let fullPrice = screenPrice + servicePrice1 + servicePrice2
let servicePercentPrice = Math.ceil(fullPrice - 4000) //округляем в большую сторону

if (fullPrice >= 30000) {
   console.log('Даем скидку в 10 %');
} else if (15000 < fullPrice && fullPrice < 30000) {
   console.log('Даем скидку в 5 %');
} else if (0 < fullPrice && fullPrice <= 15000) {
   console.log('Скидка не предусмотрена');
} else if (0 > fullPrice) {
   console.log('Что то пошло не так');
};

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log(screenPrice);
console.log(fullPrice);
console.log(screens.toLowerCase());
console.log(screens.split(','));
console.log(fullPrice * (rollback / 100));
console.log(servicePercentPrice);


// alert('Здесь любое сообщение в модальном окне');

// console.log('Сообщение в консоль с любым текстом');