import React from 'react';
import { Table } from '@mantine/core';

interface AgricultureDataRow {
  Country: string;
  Year: string;
  "Crop Name": string;
  "Crop Production (UOM:t(Tonnes))": number | string; 
  "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": number | string; 
  "Area Under Cultivation (UOM:Ha(Hectares))": number | string; 
}

interface AgricultureDataTableProps {
  data: AgricultureDataRow[];
}

const AgricultureDataTable: React.FC<AgricultureDataTableProps> = ({ data }) => {
  // Task A: Aggregate data to find crop with maximum and minimum production for each year
  const maxMinProductionByYear: { [key: string]: { maxCrop: string, minCrop: string } } = {};
  data.forEach(row => {
    const year = row.Year;
    const production = parseFloat(row["Crop Production (UOM:t(Tonnes))"] as string) || 0;
    const crop = row["Crop Name"];

    if (!maxMinProductionByYear[year]) {
      maxMinProductionByYear[year] = { maxCrop: crop, minCrop: crop };
    } else {
      const maxProductionCrop = data.find(r => r.Year === year && r["Crop Name"] === maxMinProductionByYear[year].maxCrop);
      const minProductionCrop = data.find(r => r.Year === year && r["Crop Name"] === maxMinProductionByYear[year].minCrop);
      if (maxProductionCrop && minProductionCrop) {
        if (production > parseFloat(maxProductionCrop["Crop Production (UOM:t(Tonnes))"] as string) || 0) {
          maxMinProductionByYear[year].maxCrop = crop;
        }
        if (production < parseFloat(minProductionCrop["Crop Production (UOM:t(Tonnes))"] as string) || 0) {
          maxMinProductionByYear[year].minCrop = crop;
        }
      }
    }
  });

  // Task B: Aggregate data to find average yield and average cultivation area for each crop between 1950-2020
  const cropAverages: { [key: string]: { averageYield: number, averageArea: number } } = {};
  const cropCounts: { [key: string]: number } = {};
  data.forEach(row => {
    const crop = row["Crop Name"];
    const yieldValue = parseFloat(row["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"] as string) || 0;
    const areaValue = parseFloat(row["Area Under Cultivation (UOM:Ha(Hectares))"] as string) || 0;
    if (cropAverages[crop]) {
      cropAverages[crop].averageYield += yieldValue;
      cropAverages[crop].averageArea += areaValue;
      cropCounts[crop]++;
    } else {
      cropAverages[crop] = { averageYield: yieldValue, averageArea: areaValue };
      cropCounts[crop] = 1;
    }
  });

  for (const crop in cropAverages) {
    const count = cropCounts[crop];
    if (count) {
      cropAverages[crop].averageYield /= count;
      cropAverages[crop].averageArea /= count;
    }
  }

    const rowsA = data.map((element) => (
    <Table.Tr >
      <Table.Td>{element.Year}</Table.Td>
      <Table.Td>{element['Crop Name']}</Table.Td>
      <Table.Td>{element['Crop Production (UOM:t(Tonnes))']}</Table.Td>
      <Table.Td>{element['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))']}</Table.Td>
      <Table.Td>{element['Area Under Cultivation (UOM:Ha(Hectares))']}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
    

      {/* Task A Table */}
      <Table striped highlightOnHover withTableBorder withColumnBorders style={{ borderCollapse: 'collapse', borderSpacing: 0, width: '100%' }}>
        <thead>
          <tr>
            <th style={{ borderRight: '1px solid #ddd' }}>Year</th>
            <th style={{ borderRight: '1px solid #ddd' }}>Crop with Maximum Production</th>
            <th style={{ borderRight: '1px solid #ddd' }}>Crop with Minimum Production</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(maxMinProductionByYear).map(year => (
            <tr key={year} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{borderRight: '1px solid #ddd'}}>{year}</td>
              <td style={{borderRight: '1px solid #ddd'}}>{maxMinProductionByYear[year].maxCrop}</td>
              <td style={{borderRight: '1px solid #ddd'}}>{maxMinProductionByYear[year].minCrop}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <br />
      <br />
      <br />

      {/* Task B Table */}
      <Table striped highlightOnHover withTableBorder withColumnBorders style={{ borderCollapse: 'collapse', borderSpacing: 0, width: '100%' }}>
        <thead>
          <tr>
            <th style={{ borderRight: '1px solid #ddd' }}>Crop Name</th>
            <th style={{ borderRight: '1px solid #ddd' }}>Average Yield (Kg/Ha)</th>
            <th style={{ borderRight: '1px solid #ddd' }}>Average Cultivation Area (Ha)</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(cropAverages).map(crop => (
            <tr key={crop} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{borderRight: '1px solid #ddd'}}>{crop}</td>
              <td style={{borderRight: '1px solid #ddd'}}>{cropAverages[crop].averageYield.toFixed(3)}</td>
              <td style={{borderRight: '1px solid #ddd'}}>{cropAverages[crop].averageArea.toFixed(3)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default AgricultureDataTable;
