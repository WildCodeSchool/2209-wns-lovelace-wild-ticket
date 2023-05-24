
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import "primereact/resources/themes/lara-light-indigo/theme.css";     
    
//core
import "primereact/resources/primereact.min.css";   

interface Table {
  id: string;
  number: number;
  capacity: number;
}

const TabTables = () => {
  return (
    <div>
      <DataTable tableStyle={{ minWidth: "50rem" }}>
        <Column field="number" header="N° de table"></Column>
        <Column field="capacity" header="Couverts"></Column>
        <Column field="Actions" header="Actions"></Column>
      </DataTable>
    </div>
  );
};

export default TabTables;
