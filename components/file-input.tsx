import styles from "../styles/Home.module.css";

export default function FileInput({ handleFile }) {
  return (
    <section className={styles.section}>
      <label htmlFor="file-input">Choose database file:</label>
      <input type="file" id='file-input' onChange={(e) => handleFile(e.target.files[0])} />
    </section>
  );
}
