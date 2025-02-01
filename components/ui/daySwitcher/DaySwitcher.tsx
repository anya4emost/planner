import React, { useState } from 'react';
import styles from './index.module.css';
import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Temporal } from '@js-temporal/polyfill';

const DaySwitcher = () => {
    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
        setCurrentDay(date);
    };

    const onPanelChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log('onPanelChange', date, dateString);
        setCurrentDay(date);
    };

    const onNextDayHandler = () => {
        onPanelChange(currentDay.add(1, 'day'), '')
    }

    const onPrevDayHandler = () => {
        onPanelChange(currentDay.subtract(1, 'day'), '')
    }

    const timeInMyLocation = Temporal.Now.zonedDateTimeISO();
    console.log('temporal', timeInMyLocation.toString());
   
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();
    const dateFormat = 'D MMM, YYYY';

    const defaultTodayValue = dayjs(`${year}-${month + 1}-${day}`);
    const [currentDay, setCurrentDay] = useState(defaultTodayValue);
    console.log('currentDay', currentDay);

    const currentYear = currentDay.$y;
    const currentMonth = currentDay.$M;
    const currentDayOnly = currentDay.$D;
    const currentHours = currentDay.$H;
    const currentMinutes = currentDay.$m;
    const currentSeconds = currentDay.$s;

    console.log('currentYear', currentYear);
    console.log('currentMonth', currentMonth);
    console.log('currentDayOnly', currentDayOnly);
    console.log('currentHours', currentHours);
    console.log('currentMinutes', currentMinutes);
    console.log('currentSeconds', currentSeconds);


    const zonedDateTime = Temporal.ZonedDateTime.from({
        year: 2025,
        month: 2,
        day: 1,
        hour: 0,
        minute: 0,
        second: 0,
        timeZone: 'Europe/Moscow'
    });

    console.log('zonedDateTime', zonedDateTime);


  return (
    <div className={styles['day-switcher']}>
          <LeftOutlined onClick={onPrevDayHandler} />
          <DatePicker
              format={dateFormat}
              onChange={onChange}
              pickerValue={currentDay}
              value={currentDay}
              onPanelChange={onPanelChange}
          />
          <RightOutlined onClick={onNextDayHandler} />
          
    </div>
  )
}

export default DaySwitcher
