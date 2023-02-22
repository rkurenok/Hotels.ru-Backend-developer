class Product {
    constructor(name, price, quantity, description) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.description = description;
    }
}

let products = [
    new Product("all fd new", 2, 6, "front door from the abc"), // 1
    new Product("fd not bad", 2, 5, "not bad front door"), // 2
    new Product("smth else", 50, 1, "something like description"),
    new Product("fd more new", 2, 10, "something like description bcaabc"), // 1
    new Product("fd bad", 20, 5, "bad front door"), // 2
];

function filterProduct(str, arr) {
    let arrPattern = str.split('&').map(el => el.replace(/[<,=,>,<=,>=]/g, "$&-").split('-')); // разделяем строку на массив с "полем объекта", "операцией" и "значением"

    let objPattern = arrPattern.reduce((obj, value) => { // создаем объект вида {"name" : ['contains', 'fd'], }
        obj[value[0]] = [value[1], value[2]];
        return obj;
    }, {});

    return arr.filter(product => { // фильтруем массив объектов
        let result = true;

        for (let key in objPattern) {
            // проверяем каждое необходимое поле объекта с найденым правилом
            if(!checkPattern(product[key], objPattern[key])) { // если функция вернула false - возвращаем false в фильтре
                result = false;
                break;
            }
        }

        return result;
    });
}

function checkPattern(fieldValue, pattern) {
    let patternResult = false;
    let value = pattern[1]; // значение правила из строки

    switch (pattern[0]) { // распознаем само правило и возвращаем результат проверки
        case "starts":
            patternResult = fieldValue.startsWith(value);
            break;
        case "contains":
            patternResult = fieldValue.includes(value);
            break;
        case "ends":
            patternResult = fieldValue.endsWith(value);
            break;
        case ">":
            patternResult = fieldValue > value;
            break;
        case "<":
            patternResult = fieldValue < value;
            break;
        case "=":
            patternResult = fieldValue == value;
            break;
        case ">=":
            patternResult = fieldValue >= value;
            break;
        case "<=":
            patternResult = fieldValue <= value;
            break;
    }
    
    return patternResult;
}

let str1 = "name-contains-fd&price-=2&quantity->5&description-ends-abc";
let str2 = "name-starts-fd&quantity-=5";

console.log(filterProduct(str1, products));
console.log(filterProduct(str2, products));