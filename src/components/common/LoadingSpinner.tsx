import styles from './Common.module.css';

export default function LoadingSpinner() {
  return (
    <div className={styles.stateContainer}>
      <div className={styles.spinner} />
      <p className={styles.loadingText}>Searching for flights ✈️</p>
    </div>
  );
}
