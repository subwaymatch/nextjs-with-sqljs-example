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
  const [query, setQuery] = useState<string>("");
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
        setDb(new SQL.Database());
      })
      .catch((err) => {
        console.log("in catch statement");
        console.log(err);
        setError(String(err));
      });
  }, []);

  const exec = (query: string, db: Database) => {
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
      <h1>Next.js with SQL.js example</h1>
      <FileInput
        handleFile={(file: File) => {
          const fileReader = new FileReader();
          fileReader.onload = () => {
            if (typeof fileReader.result !== "string") {
              const typedArray = new Uint8Array(fileReader.result);
              const db = new sql.Database(typedArray);
              setDb(db);
              setQuery('PRAGMA table_list;');
              exec('PRAGMA table_list;', db);
            }
          };
          fileReader.readAsArrayBuffer(file);
        }}
      />
      <QueryForm query={query} setQuery={setQuery} exec={query => exec(query, db)} />
      <Results error={error} results={execResults} />
    </div>
  ) : (
    <pre>Loading...</pre>
  );
}
