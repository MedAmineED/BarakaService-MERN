/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, ReactElement } from 'react';
import EditButton from '../actionButton/EditButton';
import DeleteButton from '../actionButton/DeleteButton';
import { InputFieldConfig } from 'src/util/types';
import './style.css';

interface Column {
  header: string;
  accessor: string;
  defaultValue?: number;
  isInput?: {
    type: string;
    min: number;
    max: string;
  };
  style?:  React.CSSProperties;
  render? : (columns?: Column[], lineData?: InputFieldConfig) => ReactElement;
  isFixed? : boolean;
  unit? : string;
}

interface GenericTableProps {
  data: { [key: string]: any }[];
  columns: Column[];
  inputFields?: InputFieldConfig[];
  selectedItems?: any[];
  onEdit?: (id: number, formData: { [key: string]: any }) => Promise<void>;
  onDelete?: (id: number) => Promise<void>;
  fetchById?: (id: number) => Promise<any>;
  onCheckedItemsChange?: (check: boolean, service: any) => void;
  func? : (...args: any[])=> any;
  onRowClick?: (item?: any)=> void;
}




//----------------------------------------------------------------
//----- Principal Component
//----------------------------------------------------------------
const GenericTable: FC<GenericTableProps> = ({
  data,
  columns,
  inputFields,
  onEdit,
  onDelete,
  fetchById,
  selectedItems,
  onRowClick
}) => {
  // Sort data so that selected items appear first
  const sortedData = [...data].sort((a, b): number => {
    if (selectedItems) {
      const aSelected = selectedItems.some(item => item.id === a.id);
      const bSelected = selectedItems.some(item => item.id === b.id);
      return (bSelected - aSelected) as number;
    }
    return 0;
  });

  return (
    <div className="table-responsive" id="tab-pag">
      <table className="TabContenu table table-sm" id="iTabContenu">
        <thead className="thead-fixed">

          <tr>
            {columns.map((column, index) => (
              <th key={index} className="text-center align-middle">{column.header}</th>
            ))}
            {(onDelete && onEdit) && <th className="text-center align-middle">Action</th>}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, rowIndex) => (
            <tr 
             className={`${onRowClick? 'pointer-row' : ""}`}
              onClick={()=> {onRowClick? onRowClick(item) : ()=> {}}} key={item.id || rowIndex}>
              {/* generate columns(simple columns or inputs columns) */}
              {columns.map((column, colIndex) => (
                column.render? (
                  <td className='text-center align-middle'>
                    {column.render(columns, item as any)}
                  </td>
                ):
                (
                  // simple columns
                  <td style= {column.style? column.style : {}} key={colIndex}>{(column.isFixed? item[column.accessor].toFixed(3) : item[column.accessor])} {column.unit? column.unit : ""}</td>
                )
              ))}
              {/* to add action column */}
              {(onEdit && onDelete) && (
                <td className="action-cell">
                  <EditButton
                    title="Modifier"
                    inputFields={inputFields || []}
                    onSave={onEdit}
                    id={item.id}
                    fetchById={fetchById}
                  />
                  <DeleteButton
                    onDelete={onDelete}
                    title="Supprimer"
                    id={item.id || 0}
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GenericTable;
