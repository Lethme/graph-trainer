/**
 * Created by Dima on 17.12.2020.
 */

class Quiz
{
    constructor(type, questions, results)
    {
        //Тип теста: 1 - классический тест с правильными ответами, 2 - тест без правильных ответов
        this.type = type;

        //Массив с вопросами
        this.questions = questions;

        //Массив с возможными результатами
        this.results = results;

        //Количество набранных очков
        this.score = 0;

        //Номер результата из массива
        this.result = 0;

        //Номер текущего вопроса
        this.current = 0;

        //Массив правильных ответов
        this.answers = []
    }

    handle_click(index)
    {
        //Добавляем очки
        let value = this.questions[this.current].click(index);
        this.score += value;

        let correct = -1;

        //Если было добавлено хотя бы одно очко, то считаем, что ответ верный
        if(value >= 256)
        {
            correct = index;
            this.answers.push(true);
        }
        else
        {
            //Иначе ищем, какой ответ может быть правильным
            for(let i = 0; i < this.questions[this.current].answers.length; i++)
            {
                if(this.questions[this.current].answers[i].value >= 1)
                {
                    correct = i;
                    break;
                }
            }
        }

        this.next_question();

        return correct;
    }

    //Переход к следующему вопросу
    next_question()
    {
        this.current++;

        if(this.current >= this.questions.length)
        {
            this.end_quiz();
        }
    }

    //Если вопросы кончились, этот метод проверит, какой результат получил пользователь
    end_quiz()
    {
        for(let i = 0; i < this.results.length; i++)
        {
            if(this.results[i].check_result(this.score))
            {
                this.result = i;
            }
        }
    }
}

//Класс, представляющий вопрос
class Question
{
    constructor(text, answers)
    {
        this.text = text;
        this.answers = answers;
    }

    click(index)
    {
        return this.answers[index].value;
    }
}

//Класс, представляющий ответ
class Answer
{
    constructor(text, value)
    {
        this.text = text;
        this.value = value;
    }
}

//Класс, представляющий результат
class Result
{
    constructor(text, value)
    {
        this.text = text;
        this.value = value;
    }

    //Этот метод проверяет, достаточно ли очков набрал пользователь
    check_result(value)
    {
        return this.value <= value;
    }
}