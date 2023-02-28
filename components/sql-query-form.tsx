import styles from "../styles/Home.module.css";

export default function QueryForm({exec}: {exec: (query: string) => void}) {
  return (
    <>
      <h1>Next.js SQL interpreter</h1>

      <textarea
        onChange={(e) => exec(e.target.value)}
        placeholder='Enter some SQL. No inspiration ? Try "select sqlite_version()"'
        className={styles.codeBox}
      />
    </>
  );
}
