import { SqlValue } from "sql.js";

type ResultTableProps = {
    columns: string[];
    values: SqlValue[][];
  }

export default function results({ columns, values }: ResultTableProps) {
        return (
          <table>
            <thead>
              <tr>
                {columns.map((columnName) => (
                  <td key={columnName}>{columnName}</td>
                ))}
              </tr>
            </thead>
    
            <tbody>
              {values.map(
                (
                  row, // values is an array of arrays representing the results of the query
                  rowIndex
                ) => (
                  <tr key={rowIndex}>
                    {row.map((value, cellIndex) => (
                      <td key={cellIndex}>{value}</td>
                    ))}
                  </tr>
                )
              )}
            </tbody>
          </table>
        );
      };
