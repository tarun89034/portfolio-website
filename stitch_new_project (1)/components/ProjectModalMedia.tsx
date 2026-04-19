import styles from "../styles/project-modal.module.css";
import type { ProjectItem } from "../utils/siteContent";

interface ProjectModalMediaProps {
  item: ProjectItem;
}

export default function ProjectModalMedia({ item }: ProjectModalMediaProps) {
  return (
    <div className={styles.media}>
      <div className={styles.mediaAmbient} />
      {item.video ? (
        <video className={styles.mediaAsset} src={item.video} autoPlay muted loop playsInline />
      ) : (
        <img className={styles.mediaAsset} src={item.image} alt={item.title} />
      )}
      <div className={styles.mediaShade} />
    </div>
  );
}
