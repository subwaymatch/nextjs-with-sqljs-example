import { useState, useEffect } from "react";
import initSqlJs from "sql.js";
import { Database, QueryExecResult, SqlValue } from "sql.js";
import styles from "../styles/Home.module.css";

type ResultTableProps = {
  columns: string[];
  values: SqlValue[][];
}

export default function SqlJsPage() {
  const [db, setDb] = useState<Database | null>(null);
  const [error, setError] = useState<string>('');
  const [execResults, setExecResults] = useState<QueryExecResult[] | null>(null);

  useEffect(() => {
    initSqlJs({
      // Fetch sql.js wasm file from CDN
      // This way, we don't need to deal with webpack
      locateFile: (file) => `https://sql.js.org/dist/${file}`,
    })
      .then((SQL) => {
        console.log('in setDB');
        debugger;
        setDb(new SQL.Database());
      })
      .catch((err) => {
        console.log('in catch statement');
        console.log(err);
        setError(String(err));
      });
  }, []);

  const exec = (sql) => { 
    try {
      const results = db.exec(sql);
      setExecResults(results);
      setError(null);
    } catch (err) {
      setExecResults(null);
      setError(String(err));
    }
  };

  /**
   * Renders a single value of the array returned by db.exec(...) as a table
   */
  const ResultTable = ({ columns, values }: ResultTableProps) => {
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
  console.log('is db null', db === null);

  return db ? (
    <div className={styles.container}>
      <h1>Next.js SQL interpreter</h1>

      <textarea
        onChange={(e) => exec(e.target.value)}
        placeholder='Enter some SQL. No inspiration ? Try "select sqlite_version()"'
        className={styles.codeBox}
      />

      <pre className={styles.error}>{(error || "").toString()}</pre>

      <pre>
        {execResults
          ? execResults.map((execResult, rIndex) => (
              <ResultTable
                key={rIndex}
                columns={execResult.columns}
                values={execResult.values}
              />
            ))
          : ""}
      </pre>
    </div>
  ) : (
    <pre>Loading...</pre>
  );
}
