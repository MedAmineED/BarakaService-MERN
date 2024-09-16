/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, ReactElement, useEffect, useState } from 'react';
import EditButton from '../actionButton/EditButton';
import DeleteButton from '../actionButton/DeleteButton';
import { InputFieldConfig } from 'src/util/types';
import { Form } from 'react-bootstrap';
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
  render? : (columns?: Column[], lineData?: InputFieldConfig) => ReactElement;
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
}

const GenericTable: FC<GenericTableProps> = ({
  data,
  columns,
  inputFields,
  onEdit,
  onDelete,
  fetchById,
  onCheckedItemsChange,
  selectedItems
}) => {
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const newCheckedItems: { [key: number]: boolean } = {};
    if (selectedItems) {
      selectedItems.forEach(item => {
        newCheckedItems[item.id] = true;
      });
    }
    setCheckedItems(newCheckedItems);
  }, [selectedItems]);

  const handleCheckboxChange = (item: any) => {
    const isChecked = !checkedItems[item.id];
    if (onCheckedItemsChange) {
      onCheckedItemsChange(isChecked, item);
    }
  };



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
            {onCheckedItemsChange && <th></th>}
            {columns.map((column, index) => (
              <th key={index} className="text-center align-middle">{column.header}</th>
            ))}
            {(onDelete && onEdit) && <th className="text-center align-middle">Action</th>}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, rowIndex) => (
            <tr key={item.id || rowIndex}>
              {onCheckedItemsChange && (
                <td className="check-cell">
                  <Form.Check
                    checked={checkedItems[item.id] || false}
                    onChange={() => handleCheckboxChange(item)}
                    type="checkbox"
                  />
                </td>
              )}
              {/* generate columns(simple columns or inputs columns) */}
              {columns.map((column, colIndex) => (
                column.isInput ? (
                  <td key={colIndex}>
                    {/* input columns */}
                    <input
                      type={column.isInput.type}
                      value={column.defaultValue? column.defaultValue : (sortedData[item.id]?.[column.accessor] || item[column.accessor])}
                      min={column.isInput.min}
                      onChange={(e) => {}}
                    />
                  </td>
                ) : 
                column.render? (
                  column.render(columns, item)
                ):
                (
                  // simple columns
                  <td key={colIndex}>{item[column.accessor]}</td>
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
