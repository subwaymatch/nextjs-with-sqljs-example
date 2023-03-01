import { useState } from "react";
import styles from "../styles/Home.module.css";

type QueryFormProps = {
  exec: (query: string) => void;
  query: string;
  setQuery: (query: string) => void;
}

export default function QueryForm({ exec, query, setQuery }: QueryFormProps) {
  return (
    <section className={styles.section}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          exec(query);
        }}
      >
        <label htmlFor="query-box">Next.js SQL interpreter</label>
        <textarea
          id="query-box"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Enter some SQL. No inspiration ? Try "select sqlite_version()"'
          className={styles.codeBox}
        />
        <div className={styles['button-row']}>
          <button type="submit">Execute query</button>
        </div>
      </form>
    </section>
  );
}
