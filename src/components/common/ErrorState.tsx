import styles from './Common.module.css';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className={styles.stateContainer}>
      <span className={styles.emptyIcon}>⚠️</span>
      <h3 className={styles.errorTitle}>Something went wrong</h3>
      <p className={styles.errorMessage}>{message}</p>

      {onRetry && (
        <button className={styles.retryBtn} onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}
