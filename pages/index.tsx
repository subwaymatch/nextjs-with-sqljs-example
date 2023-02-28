import { useState, useEffect } from "react";
import initSqlJs from "sql.js";
import { Database, QueryExecResult } from "sql.js";
import styles from "../styles/Home.module.css";

import FileInput from "../components/file-input";
import Results from "../components/sql-results";
import QueryForm from "../components/sql-query-form";

export default function SqlJsPage() {
  const [db, setDb] = useState<Database | null>(null);
  const [sql, setSql] = useState<initSqlJs.SqlJsStatic | null>(null);
  const [error, setError] = useState<string>("");
  const [execResults, setExecResults] = useState<QueryExecResult[] | null>(
    null
  );

  useEffect(() => {
    initSqlJs({
      // Fetch sql.js wasm file from CDN
      // This way, we don't need to deal with webpack
      locateFile: (file) => `https://sql.js.org/dist/${file}`,
    })
      .then((SQL) => {
        setSql(SQL);
        console.log("in setDB");
        debugger;
        setDb(new SQL.Database());
      })
      .catch((err) => {
        console.log("in catch statement");
        console.log(err);
        setError(String(err));
      });
  }, []);

  const exec = (query: string) => {
    try {
      const results = db.exec(query);
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

  return db ? (
    <div className={styles.container}>
      <h2>Select a database file:</h2>
      <FileInput
        handleFile={(file: File) => {
          const fileReader = new FileReader();
          fileReader.onload = () => {
            if (typeof fileReader.result !== "string") {
              const typedArray = new Uint8Array(fileReader.result);
              setDb(new sql.Database(typedArray));
            }
          };
          fileReader.readAsArrayBuffer(file);
        }}
      />
      <QueryForm exec={exec} />
      <pre className={styles.error}>{(error || "").toString()}</pre>
      <pre>
        {execResults
          ? execResults.map((execResult, rIndex) => (
              <Results
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
