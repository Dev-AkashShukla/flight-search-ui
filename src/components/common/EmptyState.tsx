import styles from './Common.module.css';

export default function EmptyState() {
  return (
    <div className={styles.stateContainer}>
      <span className={styles.emptyIcon}>✈️</span>
      <h3 className={styles.emptyTitle}>No flights found</h3>
      <p className={styles.emptySubtext}>
        Try adjusting your filters or search criteria
      </p>
    </div>
  );
}
