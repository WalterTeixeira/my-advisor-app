'use client';

import Upload from '@/app/components/Upload';

const Home = () => {
  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-4xl font-bold mb-8">SISTEMA PARA ANÁLISE DE CONTRATOS INSS</h1>
      <Upload />
    </div>
  );
};

export default Home;
