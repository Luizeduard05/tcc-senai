import stylesH from "./Historico.module.css";
import { useState, useEffect } from 'react';
import logoCarro from "../assets/logoCarro.png";

const Historico = () => {






  return (
    <>
      <section className={stylesH.dados}>
      <h1 className={stylesH.heading}> <span>Orçamentos</span> </h1>
        <table className={stylesH.container}>
          
          <thead>
            <tr>
              <th>modelo</th>
              <th>placa</th>
              <th>valor</th>
              <th>data</th>

            </tr>
          </thead>
          <tbody id="corpo-tabela-dados">

          </tbody>
        </table>

      </section>

    </>
  );
};

export default Historico;