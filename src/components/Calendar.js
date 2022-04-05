import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import MyDay from '../models/MyDay';


class Calendar extends React.Component {
    static propTypes = {
        date: PropTypes.instanceOf(Date)
    }

    constructor(props) {
        super(props);

        this.days_week = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        this.months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь',
            'Октябрь', 'Ноябрь', 'Декабрь'];
        this.months2 = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября',
            'Октября', 'Ноября', 'Декабря'];
    }

    // Формируем массив с неделями
    GetWeeks(date1) {
        let weeks = [];

        let year = date1.getFullYear();
        let month = date1.getMonth();

        let year_prev = year;
        let month_prev = month - 1;

        if (month_prev < 0)
        {
            month_prev = 11;        // Декабрь
            year_prev -= 1;         // предыдущего года
        }

        // Формируем первую неделю
        let week = [];

        let first_day = new Date(year, month, 1);
        let first_day_of_week = first_day.getDay();

        if (first_day_of_week == 0)
            first_day_of_week = 7;         // Нумерация с воскресенья

        let last_day = new Date(year, month + 1, 0);
        let last_day_num = last_day.getDate();

        let prev_last_day = new Date(year_prev, month_prev + 1, 0);
        let prev_last_day_num = prev_last_day.getDate();


        let prev_day_start = prev_last_day_num - first_day_of_week + 2;


        for (let i = 1; i < first_day_of_week; i++)
        {
            let myDay = new MyDay(prev_day_start, false);
            week.push(myDay);
            prev_day_start ++;
        }

        // Добиваю даты до конца недели
        let day_pos = 0;
        let day_num = 7 - week.length;
        for (let i = 1; i < day_num + 1; i++)
        {
            day_pos ++;
            let myDay = new MyDay(day_pos, true);
            week.push(myDay);
        }

        // Сохраняю первую неделю
        weeks.push(week);

        // Формируем остальные недели (алгоритм)
        let is_break = false;
        while(!is_break)
        {
            week = [];
            for (let i=0; i < 7; i++)
            {
                if (day_pos >= last_day_num)
                {
                    day_pos = 0;
                    is_break = true;
                }

                day_pos ++;
                let myDay = new MyDay(day_pos, !is_break);
                week.push(myDay);
            }

            weeks.push(week);
        }

        return weeks;
    }

    GetClassName(myDay, date_num){
        let result = '';

        if (myDay.is_real)
        {
            if (myDay.num == date_num)
                result = 'ui-datepicker-today';
        }
        else
            result = 'ui-datepicker-other-month';

        return result;
    }

    GetDays(date1) {

        const weeks = this.GetWeeks(date1);

        let date_num = date1.getDate();

        return (
            <>
                {weeks.map((w, w_index) =>
                    <tr key={w_index}>
                        {w.map((d, d_index) =>
                            <td key={d_index} className={this.GetClassName(d, date_num)}>{d.num}</td>
                        )}
                    </tr>
                )}
            </>
        );
    }

    render() {

        const {date} = this.props;

//        const v_day_num1 = date.getDate();
//        const v_day_num2 = this.props.date.getDate();

        const days = this.GetDays(date);

        return (
            <div className="ui-datepicker">
                <div className="ui-datepicker-material-header">
                    <div className="ui-datepicker-material-day">{this.days_week[date.getDay()]}</div>
                    <div className="ui-datepicker-material-date">
                        <div className="ui-datepicker-material-day-num">{date.getDate()}</div>
                        <div className="ui-datepicker-material-month">{this.months2[date.getMonth()]}</div>
                        <div className="ui-datepicker-material-year">{date.getFullYear()}</div>
                    </div>
                </div>
                <div className="ui-datepicker-header">
                    <div className="ui-datepicker-title">
                        <span className="ui-datepicker-month">{this.months[date.getMonth()]}</span>&nbsp;<span
                        className="ui-datepicker-year">{date.getFullYear()}</span>
                    </div>
                </div>
                <table className="ui-datepicker-calendar">
                    <colgroup>
                        <col />
                        <col />
                        <col />
                        <col />
                        <col />
                        <col className="ui-datepicker-week-end" />
                        <col className="ui-datepicker-week-end" />
                    </colgroup>
                    <thead>
                    <tr>
                        <th scope="col" title="Понедельник">Пн</th>
                        <th scope="col" title="Вторник">Вт</th>
                        <th scope="col" title="Среда">Ср</th>
                        <th scope="col" title="Четверг">Чт</th>
                        <th scope="col" title="Пятница">Пт</th>
                        <th scope="col" title="Суббота">Сб</th>
                        <th scope="col" title="Воскресенье">Вс</th>
                    </tr>
                    </thead>
                    <tbody>
                        {days}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Calendar;