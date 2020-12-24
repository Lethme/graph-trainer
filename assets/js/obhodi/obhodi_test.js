/**
 * Created by Dima on 17.12.2020.
 */
//Массив с результатами
const results = [
    new Result("Вам многому нужно научиться", 0),
    new Result("Вы уже неплохо разбираетесь", 2000),
    new Result("Ваш уровень выше среднего", 2500),
    new Result("Вы в совершенстве знаете тему", 3344)
];

//Массив с вопросами
const questions = [
    new Question("Сколько раз обрабатывается каждый узел при обходе дерева?", [
        new Answer("Четыре раза", 124),
        new Answer("Три раза", 99),
        new Answer("Один раз", 300),
        new Answer("Два раза", 140)
    ]),
    new Question("Выберете тип обход в зависимости от траектории, которого существует", [
        new Answer("Последовательный", 11),
        new Answer("Параллельный", 199),
        new Answer("Смежный", 74),
        new Answer("Горизонтальны", 412)
    ]),
    new Question("Выберете вариант вертикального обход, которого не существует", [
        new Answer("Восходящий", 124),
        new Answer("Параллельный", 255),
        new Answer("Смешанный", 64),
        new Answer("Нисхоящий", 140)
    ]),
    new Question("В каком из обходов мы начинаем с корня", [
        new Answer("обход в ширину", 124),
        new Answer("восходящий обход", 199),
        new Answer("нисходящий обход", 300),
        new Answer("смешанный обход", 140)
    ]),
    new Question("Как выглядит обход дерева в прямом порядке (нисходящий обход)", [
        new Answer("Левое поддерево - корень - правое поддерево", 224),
        new Answer("Левое поддерево - правое поддерево - корень", 169),
        new Answer("Корень - левое поддерево - правое поддерево", 290),
        new Answer("Узлы посещаются уровень за уровнем (каждый уровень обходится слева направо)", 80)
    ]),
    new Question("Как выглядит обход дерева в симметричном порядке (смешанный обход)", [
        new Answer("Узлы посещаются уровень за уровнем (каждый уровень обходится слева направо).", 241),
        new Answer("Левое поддерево - правое поддерево - корень.", 52),
        new Answer("Левое поддерево - корень - правое поддерево.", 510),
        new Answer("Корень - левое поддерево - правое поддерево.", 61)
    ]),
    new Question("Как выглядит обход дерева в обратном порядке (восходящий обход)", [
        new Answer("левое поддерево - корень - правое поддерево", 209),
        new Answer("левое поддерево - правое поддерево - корень", 344),
        new Answer("корень - левое поддерево - правое поддерево", 5),
        new Answer("узлы посещаются уровень за уровнем (каждый уровень обходится слева направо)", 231)
    ]),
    new Question("Как выглядит обход дерева в ширину", [
        new Answer("левое поддерево - корень - правое поддерево", 209),
        new Answer("левое поддерево - правое поддерево - корень", 144),
        new Answer("корень - левое поддерево - правое поддерево", 5),
        new Answer("узлы посещаются уровень за уровнем (каждый уровень обходится слева направо)", 344)
    ]),
    new Question("Чем “глобально” отличаются все обходы?", [
        new Answer("порядок обработки вершин", 324),
        new Answer("не все вершины обрабатываются", 199),
        new Answer("ничем не отличаются", 140),
        new Answer("не все вершины обрабатываются", 230)
    ]),
    new Question("В каком из обходов не целесообразно использовать рекурси", [
        new Answer("нисходящий обход", 90),
        new Answer("обход в ширину", 299),
        new Answer("смешанный обход", 11),
        new Answer("восходящий обход", 240)
    ]),
];

//Сам тест
const quiz = new Quiz(1, questions, results);
window.onload = function(e) {
    Update();
};

//Обновление теста
function Update() {
    //Проверяем, есть ли ещё вопросы
    if (quiz.current < quiz.questions.length) {
        //Если есть, меняем вопрос в заголовке
        $('.head__content')[0].innerHTML = quiz.questions[quiz.current].text;

        //Удаляем старые варианты ответов
        $('.buttons').empty();

        //Создаём кнопки для новых вариантов ответов
        for (let i = 0; i < quiz.questions[quiz.current].answers.length; i++) {
            let btn = document.createElement("button");
            btn.className = "button";

            btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

            btn.setAttribute("index", i);

            $('.buttons').append(btn);
        }

        //Выводим номер текущего вопроса
        $('.footer__content')[0].innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

        //Вызываем функцию, которая прикрепит события к новым кнопкам
        Init();
    } else {
        //Если это конец, то выводим результат
        $('.buttons').empty();
        $('.head__content')[0].innerHTML = quiz.results[quiz.result].text;
        let right_answ = 0;
        for (let answ of quiz.answers) {
            if (answ)
                right_answ++;
        }
        $('.footer__content')[0].innerHTML = "Вы ответили на " + right_answ + " из 10 вопросов";
    }
}

function Init() {
    //Находим все кнопки
    let btns = document.getElementsByClassName("button");

    for (let i = 0; i < btns.length; i++) {
        //Прикрепляем событие для каждой отдельной кнопки
        //При нажатии на кнопку будет вызываться функция Click()
        btns[i].addEventListener("click", function(e) { Click(e.target.getAttribute("index")); });
    }
}

function Click(index) {

    quiz.handle_click(index);
    Update();
}