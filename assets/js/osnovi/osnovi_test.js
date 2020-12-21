/**
 * Created by Dima on 17.12.2020.
 */
//Массив с результатами
const results =
    [
        new Result("Вам многому нужно научиться", 0),
        new Result("Вы уже неплохо разбираетесь", 2000),
        new Result("Ваш уровень выше среднего", 2500),
        new Result("Вы в совершенстве знаете тему", 3344)
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
        new Question("Сбалансированное дерево – это:",
            [
                new Answer("Это дерево, которое содержит только полностью заполненные уровни.", 124),
                new Answer("Это дерево, у которого длины всех путей от корня к внешним вершинам равны между собой.", 255),
                new Answer("Это дерево, у которого вершины имеют степень ноль (у листьев), один или два (у узлов).", 64),
                new Answer("Это дерево, у которого ветви, исходящие из каждой вершины, упорядочены по определенному критерию.", 140)
            ]),
        new Question("Сколько может быть потомков у элемента?",
            [
                new Answer("Только один", 124),
                new Answer("Только один или два ", 199),
                new Answer("Один, два или ни одного ", 300),
                new Answer("От одного до трех включительно", 140)
            ]),
        new Question("Для набора элементов N можно составить",
            [
                new Answer("Только одно дерево поиска", 224),
                new Answer("Точно N деревьев поиска", 169),
                new Answer("Больше одного дерева поиска", 290),
                new Answer("Нельзя составить дерево, если набор неупорядочен", 80)
            ]),
        new Question("Для листа верно утверждение",
            [
                new Answer("Лист может быть вершиной дерева и иметь потомков", 241),
                new Answer("Лист может иметь потомков", 52),
                new Answer("Лист не может иметь потомков", 510),
                new Answer("В дереве может быть только один лист", 61)
            ]),
        new Question("Сложность операций в двоичном дереве поиска стремится к:",
            [
                new Answer("log n", 209),
                new Answer("log2 n", 344),
                new Answer("log n2", 5),
                new Answer("log2 n2", 231)
            ]),
        new Question("В каждом узле двоичного дерева поиска:",
            [
                new Answer("Значение узла левого потомка больше, чем текущего узла, а правого - меньше", 24),
                new Answer("Значение узла левого потомка меньше, чем текущего узла, а правого - больше", 199),
                new Answer("Значение узла левого потомка больше или равно, чем текущего узла, а правого - меньше", 200),
                new Answer("Значение узла левого потомка меньше или равно, чем текущего узла, а правого – больше", 340)
            ]),
        new Question("На каждый элемент дерева:",
            [
                new Answer("Имеется ровно одна ссылка", 324),
                new Answer("Может быть две или одна ссылка", 199),
                new Answer("Может и не быть ссылок", 140),
                new Answer("Имеется одна или более ссылка", 230)
            ]),
        new Question("Дуга не может соединять:",
            [
                new Answer("Вершину и правый потомок", 90),
                new Answer("Корень дерева и его родителя", 299),
                new Answer("Вершину и левый потомок", 11),
                new Answer("Вершину и родителя", 240)
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
        let right_answ = 0;
        for (let answ of quiz.answers){
            if(answ)
                right_answ++;
        }
        $('.footer__content')[0].innerHTML = "Вы ответили на "+right_answ+" из 10 вопросов";
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