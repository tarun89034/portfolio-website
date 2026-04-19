export function getModalTechStack(item) {
  if (Array.isArray(item?.techStack) && item.techStack.length) {
    return item.techStack;
  }

  return ["React", "Next.js", "TypeScript", "ML"];
}

export function getModalAchievements(item) {
  if (Array.isArray(item?.achievements) && item.achievements.length) {
    return item.achievements;
  }

  return [
    "Production-grade UX with cinematic motion system",
    "Responsive architecture optimized for desktop and mobile",
    "Scalable component design for rapid feature iteration",
  ];
}
