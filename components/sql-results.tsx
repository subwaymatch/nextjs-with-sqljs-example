import { SqlValue } from "sql.js";
import styles from "../styles/Home.module.css";

type ExecResult = {
  columns: string[];
  values: SqlValue[][];
};

type ResultTableProps = {
  results: Array<ExecResult>;
  error: string | null;
};

export default function Results({ error, results }: ResultTableProps) {
  return (
    <section className={styles.section}>
      <label>Results: </label>
      <pre className={styles.error}>{(error || "").toString()}</pre>
      <pre>
        {results && results.map(({ columns, values }, rIndex) => (
          <table key={rIndex}>
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
        ))}
      </pre>
    </section>
  );
}
