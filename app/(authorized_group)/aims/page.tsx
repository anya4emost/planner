'use client'
import React, { useEffect, useState } from 'react'
import styles from "./page.module.css";
import { aimsRequest } from '../../../api/requests';

export default function page() {
  const [aims, setAims] = useState([]);

  useEffect(() => {

    async function fetchData() {
      try {
        let requestResult = await aimsRequest();
        if (requestResult.error) {
          throw new Error(requestResult.error.message);
        }
        setAims(requestResult.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();

  }, [])
  return (
    <div>
      <h2>ЦЕЛИ</h2>
      <ul>
        {aims.map((aim) => {
          return (
            <li className={styles['aim-string']} key={aim.id}><input type='checkbox' /><h3> {aim.name}: {aim.id}</h3></li>
          )
        })}
      </ul>
    </div>
  )
}
