import "./Historico.css"
import React, { useState, useEffect } from 'react';
import logoCarro from "../assets/logoCarro.png"


const Historico = () => {
  const [veiculos, setVeiculos] = useState([]);

  useEffect(() => {
    
    const veiculosMock = [
      { id: 1, placa: 'UTS-1234', data: '20/11/2024', valor: 'R$343,50' },
      { id: 2, placa: 'UTS-1234', data: '20/11/2024', valor: 'R$343,50' },
      { id: 3, placa: 'UTS-1234', data: '20/11/2024', valor: 'R$343,50' },
    ];
    setVeiculos(veiculosMock);
  }, []);

  return (
    <div className="container">
    <div className="header">
      <div className="logo">
      <img src={logoCarro} alt="" />
      <div className="historico">
      <h2>Consulte seus orçamentos</h2>
      <table>
        <thead>
          <tr>
            <th>Veículo</th>
            <th>Data</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {veiculos.map((veiculo) => (
            <tr key={veiculo.id}>
              <td>{veiculo.placa}</td>
              <td>{veiculo.data}</td>
              <td>{veiculo.valor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      </div>
    </div>
   
  </div>
  );
};

export default Historico;