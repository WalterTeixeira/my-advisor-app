'use client';

import React, { useState, useEffect } from 'react';
import '../globals.css'; // Importe o arquivo CSS

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [info, setInfo] = useState<any>(null);
  const [dob, setDob] = useState<string>(''); // Armazena a data de nascimento
  const [showVerifyButton, setShowVerifyButton] = useState(false);
  const [durationMessage, setDurationMessage] = useState<string | null>(null);
  const [eligibleBanks, setEligibleBanks] = useState<string[]>([]);

  useEffect(() => {
    if (info && dob) {
      verifyRules();
    }
  }, [info, dob]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);

    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        console.error('Erro no envio do arquivo');
        return;
      }

      const data = await response.json();
      setInfo(data.extractedInfo);
      setShowVerifyButton(true); // Exibe o botão "Verificar Extrato" após a extração das informações
    }
  };

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const verifyRules = async () => {
    const age = calculateAge(dob);

    console.log('Tipo de Benefício:', info.tipoBeneficio); // Adicione essa linha para debug

    if (info.tipoBeneficio === 'APOSENTADORIA POR INVALIDEZ PREVIDENCIARIA') {
      console.log('Verificando espécie 32'); // Adicione essa linha para debug
      const response = await fetch('/api/verify-especie32', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idade: age }),
      });

      if (!response.ok) {
        console.error('Erro na verificação da espécie 32');
        return;
      }

      const data = await response.json();
      setDurationMessage(data.mensagem);
    } else if (info.tipoBeneficio === 'PENSAO POR MORTE PREVIDENCIARIA') {
      console.log('Verificando espécie 21'); // Adicione essa linha para debug
      const response = await fetch('/api/verify-especie21', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idade: age }),
      });

      if (!response.ok) {
        console.error('Erro na verificação da espécie 21');
        return;
      }

      const data = await response.json();
      setDurationMessage(data.mensagem);
    } else {
      console.log('Verificando limite de idade'); // Adicione essa linha para debug
      const response = await fetch('/api/verify-limite-idade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idade: age }),
      });

      if (!response.ok) {
        console.error('Erro na verificação do limite de idade');
        return;
      }

      const data = await response.json();
      setEligibleBanks(data.bancos || []);
      setDurationMessage(data.mensagem);
    }
  };

  const getDurationMessageColor = (message: string) => {
    if (info.tipoBeneficio === 'APOSENTADORIA POR INVALIDEZ PREVIDENCIARIA') {
      return message === 'Preenche os requisitos da espécie 32' ? 'text-green' : 'text-yellow';
    } else if (info.tipoBeneficio === 'PENSAO POR MORTE PREVIDENCIARIA') {
      return message === 'Vitalício' ? 'text-green' : 'text-yellow';
    } else {
      return message === 'Preenche os requisitos do limite de idade' ? 'text-green' :
             message === 'Não preenche os requisitos do limite de idade' ? 'text-red' : '';
    }
  };

  return (
    <div className="upload-container">
      <input
        type="date"
        placeholder="Data de Nasc."
        className="date-input"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
      />
      <input
        id="upload"
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <label htmlFor="upload" className="upload-button">
        SELECIONAR ARQUIVO PDF
      </label>
      {info && (
        <div>
          <h2>Informações Extraídas:</h2>
          <p><strong>Idade:</strong> {calculateAge(dob)}</p>
          <p><strong>Nome do Cliente:</strong> {info.nomeCliente}</p>
          <p><strong>Tipo de Benefício:</strong> {info.tipoBeneficio}</p>
          <p><strong>Meio:</strong> {info.meio}</p>
          <p><strong>Pago em:</strong> {info.pagoEm}</p> {/* Adicione esta linha */}
          <p className={info.liberadoEmprestimo === 'Não' ? 'text-red' : ''}>
            <strong>Liberado para Empréstimo:</strong> {info.liberadoEmprestimo}
          </p>
          <p className={info.elegivelEmprestimo === 'Não' ? 'text-red' : ''}>
            <strong>Elegível para Empréstimo:</strong> {info.elegivelEmprestimo}
          </p>
          
          {durationMessage && (
            <p className={getDurationMessageColor(durationMessage)}>
              <strong>Duração:</strong> {durationMessage}
            </p>
          )}
        </div>
      )}
      {showVerifyButton && (
        <button className="upload-button" onClick={verifyRules}>
          Verificar Extrato
        </button>
      )}
    </div>
  );
};

export default Upload;
