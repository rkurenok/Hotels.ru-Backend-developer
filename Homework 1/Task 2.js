function equalLengthNum(num1, num2) {
    let diffLength = num1.length - num2.length;

    if (diffLength < 0) { // если в первом числе меньше десятков
        for (let i = diffLength; i < 0; i++) {
            num1 = '0' + num1; // добавим их ему
        }
    }
    else if (diffLength > 0) {
        for (let i = 0; i < diffLength; i++) {
            num2 = '0' + num2;
        }
    }

    return [num1, num2];
}

function opBigNum(a, b) {
    let [num1, num2] = [String(a), String(b)];

    let summ = sum(num1, num2);
    let diff = difference(num1, num2);
    let mul = multiplication(num1, num2);
    let div = division(num1, num2);

    return `Первое число: ${num1}\nВторое число: ${num2}\nСумма: ${summ}\nРазность: ${diff}\nПроизведение: ${mul}\nЧастное: ${div}\n`;
}

function sum(a, b) {
    let [num1, num2] = equalLengthNum(a, b); // выравниваем кол-во десятков в числах
    let sum = '';
    let temp;
    let shift = false; // сдвиг (+1 в след. десяток)

    for (let i = 0; i < num1.length; i++) {
        temp = String(+num1.at(-1 - i) + +num2.at(-1 - i));

        if (shift) {
            temp = String(+temp + 1);
            shift = false;
        }

        if (temp < 10) {
            sum = temp + sum;
        }
        else {
            sum = temp.at(-1) + sum;
            shift = true;
        }
    }

    if (shift) {
        sum = '1' + sum;
    }

    return sum;
}

function difference(a, b) {
    let [num1, num2] = equalLengthNum(a, b);  // выравниваем кол-во десятков в числах
    let difference = '';
    let temp;
    let shift = false; // сдвиг (-1 в след. десяток)
    let minus = false; // отрицательный результат

    if (num1 < num2) {
        [num1, num2] = [num2, num1]; // меняем местами переменные для удобства подсчета
        minus = true;
    }

    for (let i = 0; i < num1.length; i++) {
        temp = String(+num1.at(-1 - i) - +num2.at(-1 - i));

        if (shift) {
            temp = String(+temp - 1);
            shift = false;
        }

        if (i == num1.length - 1 && temp == 0) break;

        if (temp >= 0) {
            difference = temp + difference;
        }
        else {
            difference = String(10 - temp.at(-1)) + difference;
            shift = true;
        }
    }

    if (minus) {
        difference = '-' + difference;
    }

    return difference;
}

function multiplication(num1, num2) {
    let multiplication = '';
    let temp;
    let arrtemp = [];
    let shift = false; // сдвиг (+(1-9) в след. десяток)

    for (let i = 0; i < num2.length; i++) {
        for (let j = 0; j < num1.length; j++) {
            if (shift) {
                temp = String(num2[i] * num1.at(-1 - j) + +temp[0]);
                shift = false;
            }
            else {
                temp = String(num2[i] * num1.at(-1 - j));
            }

            if (j == num1.length - 1) { // если конец числа
                arrtemp[i] = temp + arrtemp[i];
            }
            else if (j == 0) { // если начало - избавиться от undefined в конце
                arrtemp[i] = temp.at(-1);
            }
            else {
                arrtemp[i] = temp.at(-1) + arrtemp[i];
            }

            if (temp >= 10) {
                shift = true;
            }

        }

        shift = false;

        arrtemp[i] += '0'.repeat(num2.length - 1 - i); // добавляем нули недостающим десяткам
    }
    arrtemp = arrtemp.filter(item => item != 0); // убираем нулевые эл-ты, оптимизируем дальнейшее выполнение

    multiplication = arrtemp.reduce((summ, item) => sum(summ, item)); // складываем эл-ты массива

    return multiplication;
}

function division(num1, num2) {
    let division = '';
    let tempNum1 = '',
        tempNum2 = '';
    let diff;

    if (num1.length < num2.length || num1.length == num2.length && num1[0] < num2[0]) {
        return '0';
    }

    for (let i = 0; i < num1.length; i++) {
        // добавляем по одной цифре во временные переменные
        tempNum1 = tempNum1 + num1[i];
        if (num2[i]) { // если еще остались цифры у делителя
            tempNum2 = tempNum2 + num2[i];
        }

        if (+tempNum1 >= +tempNum2) { // когда (временное) делимое больше делителя
            if (i < num2.length) { // устанавливаем числам длину делителя
                tempNum1 = num1.slice(0, num2.length);
                tempNum2 = num2;
                i = num2.length - 1;
            }

            do {
                diff = difference(tempNum1, tempNum2); // вычитаем числа

                if (diff[0] != '-') { // если разница > 0
                    division = division.slice(0, -1) + (+division.slice(-1) + 1); // прибавляем 1 к результату

                    tempNum1 = diff; // остаток во временную переменную
                }
                else {
                    break; // если разница < 0 - выходим
                }

            } while (true)
        }

        if (i != num1.length - 1) { // чтобы не поставить лишний 0 в конце
            division += '0'; // добавляем новый десяток к результату
        }
    }

    return division;
}

console.log(opBigNum(500, 650));
console.log(opBigNum(987654321, 123456));
console.log(opBigNum("987654321987654321987654321987654321987654321987654321", "123456123456123456123456123456123456"));