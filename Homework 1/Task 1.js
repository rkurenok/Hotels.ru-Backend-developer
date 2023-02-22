function convertStrLowerCase(str) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

function placeStrSpaces(str) {
    return str.replace(/\s+([^А-я])/g, "$1").replace(/\s*([,.!?:;]+)(?!\s*$)\s*/g, '$1 '); // убираем все лишние пробелы + добавляем пробелы после знаков препинания
}

function countWords(str) {
    let wordsArr = str.split(' ');

    return wordsArr.length;
}

function uniqueWords(str) {
    let words = [];
    let countWords = [];
    let strWords = str.replace(/[,.!?;:()"]/g, '').toLowerCase().split(' '); // делим строку на массив слов без знаков препинания

    for (let i = 0; i < strWords.length; i++) {
        let index = words.indexOf(strWords[i]); // получаем индекс слова из массива уникальных слов

        if (index != -1) {
            countWords[index] += 1;
        }
        else {
            words.push(strWords[i]);
            countWords.push(1);
        }
    }

    let resultObj = Object.assign(...words.map((n, i) => ({ [n]: countWords[i] }))); // преобразуем 2 массива в объект
    resultObj = Object.fromEntries(Object.entries(resultObj).sort(([keyA, a],[keyB, b]) => b - a)); // сортируем объект по значению

    return resultObj;
}

let str1 = "Вот пример строки,в которой используются знаки препинания. После знаков должны стоять пробелы, а перед знаками их быть не должно. Если есть лишние подряд идущие пробелы, они должны быть устранены.";
let str2 = "Текст, в котором слово текст несколько раз встречается и слово тоже";

console.log(convertStrLowerCase("aBsCd"));
console.log(placeStrSpaces(str1));
console.log(countWords(str2));
console.log(uniqueWords(str2));