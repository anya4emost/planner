import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styles from './index.module.css';

const hourArray = [
  '00:00',
  '00:30',
  '01:00',
  '01:30',
  '02:00',
  '02:30',
  '03:00',
  '03:30',
  '04:00',
  '04:30',
  '05:00',
  '05:30',
  '06:00',
  '06:30',
  '07:00',
  '07:30',
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
  '21:30',
  '22:00',
  '22:30',
  '23:00',
  '23:30'
]
const borderHeight = 1;

const k = 2; // час делим на 2 строки
const rowHight = 30;



const DayTracker = () => {
  
  console.log('rerender');
  const [date, setDate] = useState(new Date());

// сдвигаем линию
  setTimeout(() => {
    setDate(new Date());
  }, 60000);

  const linePosition = useMemo(() => { 
    console.log('useMemo')
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const hourHight = rowHight * k;
    const oneMinuteHeight = hourHight / 60;
    const linePos = hourHight * hours + oneMinuteHeight * minutes + rowHight - borderHeight;
    return linePos;
  }, [date]);

  return (
    <div className={styles['day-container']}>
      <div className={styles['left-column']}>
        {hourArray.map((item)=>{
          return (
            <div key={item} style={{ minHeight: `${rowHight}px` }} className={styles['time-cell']}><span className={ styles.time}>{item}</span></div>
          )
        
        })}
        
      </div>
      <div className={styles['right-column']}>
        {/* отступаем 1 строчку */}
        <div style={{ minHeight: `${rowHight}px` }} className={styles['tasks-cell']}>
          <span></span>
        </div>
        {hourArray.map((item) => {
          return (
            <div
              draggable={true}
              onDragStart={(e) => {
                console.log('onDragStart', item) }}
              onDrop={(e) => {
                e.preventDefault();
                console.log('onDrop', item);
                e.target.style.background = 'aliceblue';
              }}
              onDragEnd={(e) => {
               // e.target.style.background = 'aliceblue';
              }}
              onDragOver={(e) => {
                e.preventDefault();
                e.target.style.background = 'lightgrey';
              }}
              onDragLeave={(e) => {
                e.target.style.background = 'aliceblue';
              }}
              key={item}
              style={{ minHeight: `${rowHight}px` }}
              className={styles['tasks-cell']}>
              <span></span>
            </div>
          )

        })}
        <div style={{ top: `${linePosition}px`}} className={styles['red-line']}>
        </div>
      </div>
    </div>
  )
}

export default DayTracker
