/**
 * Created by Dima on 17.12.2020.
 */
//Массив с результатами
const results =
    [
        new Result("Вам многому нужно научиться", 0),
        new Result("Вы уже неплохо разбираетесь", 2),
        new Result("Ваш уровень выше среднего", 4),
        new Result("Вы в совершенстве знаете тему", 6)
    ];

//Массив с вопросами
const questions =
    [
        new Question("Какими свойствами не обладает почти заполненное двоичное дерево?",
        [
            new Answer("Все листовые элементы находятся в нижнем уровне, либо в нижних двух уровнях;", 124),
            new Answer("Все уровни (кроме, быть может, последнего уровня) полностью заполнены элементами", 99),
            new Answer("Дерево будет иметь как минимум два заполненых уровня", 300),
            new Answer("Все листья в уровне заполняют уровень слева", 140)
        ]),
        new Question("У корня дерева есть оба потомка, а у остальных элементов дерева - только левый потомок. Каким будет данное дерево?",
            [
                new Answer("Строгим и полнным", 11),
                new Answer("Нестрогим и неполным", 199),
                new Answer("Строгим и неполным", 74),
                new Answer("Нестрогим и полным", 412)
            ]),
        new Question("2 + 2 = ",
            [
                new Answer("2", 124),
                new Answer("3", 99),
                new Answer("4", 300),
                new Answer("0", 140)
            ]),
        new Question("2 + 2 = ",
            [
                new Answer("2", 124),
                new Answer("3", 99),
                new Answer("4", 300),
                new Answer("0", 140)
            ]),
        new Question("2 + 2 = ",
            [
                new Answer("2", 124),
                new Answer("3", 99),
                new Answer("4", 300),
                new Answer("0", 140)
            ]),
        new Question("2 + 2 = ",
            [
                new Answer("2", 124),
                new Answer("3", 99),
                new Answer("4", 300),
                new Answer("0", 140)
            ]),
    ];

//Сам тест
const quiz = new Quiz(1, questions, results);
window.onload = function (e) {
    Update();
};

//Обновление теста
function Update()
{
    //Проверяем, есть ли ещё вопросы
    if(quiz.current < quiz.questions.length)
    {
        //Если есть, меняем вопрос в заголовке
        $('.head__content')[0].innerHTML = quiz.questions[quiz.current].text;

        //Удаляем старые варианты ответов
        $('.buttons').empty();

        //Создаём кнопки для новых вариантов ответов
        for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
        {
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
    }
    else
    {
        //Если это конец, то выводим результат
        $('.buttons').empty();
        $('.head__content')[0].innerHTML  = quiz.results[quiz.result].text;
        $('.footer__content')[0].innerHTML = "";
    }
}

function Init()
{
    //Находим все кнопки
    let btns = document.getElementsByClassName("button");

    for(let i = 0; i < btns.length; i++)
    {
        //Прикрепляем событие для каждой отдельной кнопки
        //При нажатии на кнопку будет вызываться функция Click()
        btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
    }
}

function Click(index)
{

    quiz.handle_click(index);
    Update();
}