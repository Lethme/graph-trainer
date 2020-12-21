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
        new Question("Каково время работы пирамидальной сортировки в среднем случае?",
        [
            new Answer("O(n)", 124),
            new Answer("O(n^3)", 99),
            new Answer("O(n*ln(n))", 300),
            new Answer("O(log2(n))", 140)
        ]),
        new Question("Как восстановить упорядоченность двоичной кучи после удаления максимального элемента",
            [
                new Answer("поставить на его место левого потомка и вызвав метод упорядочения для корня, то есть упорядочив все дерево", 11),
                new Answer("поставить на его место первый элемент и вызвав метод упорядочения для корня, то есть упорядочив все дерево", 199),
                new Answer("поставить на его место пустой элемент и вызвав метод упорядочения для корня, то есть упорядочив все дерево", 74),
                new Answer("поставить на его место последний элемент и вызвав метод упорядочения для корня, то есть упорядочив все дерево", 412)
            ]),
        new Question("Какое утверждение верно для сортировки пирамиды?",
            [
                new Answer("При восстановлении пирамиды, осуществляется её просев вниз, пока не будет обнаружен новый корневой элемент.", 255),
                new Answer("Все листовые элементы находятся в нижнем уровне, либо в нижних двух уровнях.", 64),
                new Answer("Это дерево, у которого ветви, исходящие из каждой вершины, упорядочены по определенному критерию.", 140),
                new Answer("Все ответы правильные.", 124),
            ]),
        new Question("Что происходит с элементом при добавлении в кучу, если он больше родителя?",
            [
                new Answer("Элемент не вносится в дерево", 124),
                new Answer("Элемент заменяет родителя", 199),
                new Answer("Элемент поднимается на один уровень до тех пор, пока не будет соблюдено основное свойство кучи", 300),
                new Answer("Элемент заменяет левого потомка", 140)
            ]),
        new Question("Объем памяти при пирамидальной сортировки",
            [
                new Answer("Зависит от высоты пирамиды", 224),
                new Answer("Зависит от количества элементов", 169),
                new Answer("Не зависит от количества элементов", 290),
                new Answer("Нет правильного ответа.", 80)
            ]),
        new Question("Какое из условий верно для двоичной кучи",
            [
                new Answer("Глубина листьев отличается более чем на 1 слой", 241),
                new Answer("Последний слой заполняется справа налево.", 52),
                new Answer("Последний слой заполняется слева направо.", 510),
                new Answer("Значение в любой вершине не меньше, чем значения её потомков", 61)
            ]),
        new Question("Какой основной плюс пирамидальной сортировки и почему?",
            [
                new Answer("не зависит от количества элементов.", 209),
                new Answer("пирамида хранится в одном массиве без дополнительных ресурсов, так как элемент берется с корн, т.е. первый в массиве, и кладется в конец", 344),
                new Answer("очень быстрая, так как отсутствует рекурсия.", 5),
                new Answer("Потребляет меньше памяти, из за меньшего количества операций", 231)
            ]),
        new Question("Наиболее подходящая структура данных для хранения двоичной кучи:",
            [
                new Answer("Двумерный массив", 24),
                new Answer("Односвязный список", 199),
                new Answer("Стек", 200),
                new Answer("Одномерный массив", 340)
            ]),
        new Question("Как построить кучу из неупорядоченного массива?",
            [
                new Answer("Добавить все элементы по очереди.", 324),
                new Answer("Добавить сразу все элементы в дерево", 199),
                new Answer("Добавить сначала первые k элементов, а затем k+1 элементы", 140),
                new Answer("Это невозможно", 230)
            ]),
        new Question("В чем заключается метод просеивания вверх?",
            [
                new Answer("начать с левого потомка, и добавлять в неё элементы один за другим", 90),
                new Answer("начать с пустой пирамиды, и добавлять в неё элементы один за другим", 299),
                new Answer("начать с правого потомка, и добавлять в неё элементы один за другим", 11),
                new Answer("начать с корня, и добавлять в неё элементы один за другим", 240)
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