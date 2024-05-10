// AgricultureDataComponent.tsx
import React, { useEffect, useState } from 'react';
import AgricultureDataTable from './AgricultureDataTable';
import IndiaAgroDataset from '../IndiaAgroDataset.json'; // Directly import the JSON file

const AgricultureDataComponent: React.FC = () => {
  const [agricultureData, setAgricultureData] = useState<any[]>([]);

  useEffect(() => {
    // Use the imported JSON data directly
    setAgricultureData(IndiaAgroDataset);
  }, []);

  return (
    <div>
      <AgricultureDataTable data={agricultureData} />
    </div>
  );
};

export default AgricultureDataComponent;
