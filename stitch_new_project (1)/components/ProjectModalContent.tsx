import styles from "../styles/project-modal.module.css";
import { getModalAchievements, getModalTechStack } from "../utils/projectModalData";
import type { ProjectItem } from "../utils/siteContent";

interface ProjectModalContentProps {
  item: ProjectItem;
}

export default function ProjectModalContent({ item }: ProjectModalContentProps) {
  const stack = getModalTechStack(item);
  const achievements = getModalAchievements(item);

  return (
    <div className={styles.content}>
      <h3 className={styles.title}>{item.title}</h3>
      <p className={styles.desc}>{item.description}</p>

      <div className={styles.badges}>
        {stack.map((badge: string) => (
          <span key={badge} className={styles.badge}>
            {badge}
          </span>
        ))}
      </div>

      <div className={styles.links}>
        {item.live && (
          <a href={item.live} target="_blank" rel="noreferrer" className={styles.pill}>
            Live Demo
          </a>
        )}
        {item.github && (
          <a href={item.github} target="_blank" rel="noreferrer" className={styles.pill}>
            GitHub
          </a>
        )}
      </div>

      <div className={styles.metaRail}>
        <span className={styles.metaTag}>Cinematic Build</span>
        <span className={styles.metaDot} />
        <span className={styles.metaTag}>Premium Interaction Layer</span>
      </div>

      <div className={styles.achievementsWrap}>
        <p className={styles.achievementsTitle}>Key Achievements</p>
        <ul className={styles.achievements}>
          {achievements.map((point: string) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
