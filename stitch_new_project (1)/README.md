# Cinematic Portfolio Build Guidance

You are a senior frontend architect and creative UI engineer building a cinematic developer portfolio.

## PRIMARY RULES

- The ONLY frontend source of truth is: `stitch_new_project(1)`
- Do NOT change the core concept or UI direction
- Enhance and complete missing features
- Ignore any other frontend folders

---

## CONTEXT DATA (PROJECTS & LINKS)

Use the following links as project data:

Projects:

- https://huggingface.co/spaces/ty8890/barista-ai
- https://huggingface.co/spaces/ty8890/Ragbot-Merlin
- https://huggingface.co/spaces/ty8890/financial-llm-copilot
- https://huggingface.co/spaces/ty8890/stock-prediction-platform
- https://option-pricing-snowy.vercel.app/

GitHub Projects:

- https://github.com/tarun89034/AI-Powered-Network-Intrusion-Detection-System-NIDS-with-Real-Time-ML-Observability
- https://github.com/tarun89034/Vendor-Performance-Analysis-Optimization
- https://github.com/tarun89034/Portfolio-optimization-using-python
- https://github.com/tarun89034/Credit-Risk-Analysis

Profiles:

- LinkedIn: https://www.linkedin.com/in/tarun-yadav-a5b538251/
- GitHub: https://github.com/tarun89034/tarun89034

---

## TASK 1: AUDIT + COMPLETE IMPLEMENTATION

1. Scan the existing project inside `stitch_new_project(1)`
2. Identify which of the following features are:
   - Already implemented
   - Partially implemented
   - Missing
3. Then IMPLEMENT all missing features cleanly

---

## TASK 2: HERO SECTION (CINEMATIC)

Implement or fix:

- Fullscreen background video (from assets/)
  - autoplay
  - loop
  - muted
  - object-fit: cover

- Dark gradient overlay for readability

- Foreground (LEFT aligned):
  - TARUN YADAV (large cinematic typography)
  - Subtitle: AI Engineer | ML Systems | GenAI
  - Tagline: "Building intelligent systems that feel like magic"

- CTA Buttons:
  - View Work (scroll to projects)
  - Download Resume (downloads from /public/resume/)

- Add:
  - Fade-in animation on load
  - Parallax effect on scroll
  - Floating particles (canvas or library)

---

## TASK 3: BACKGROUND AUDIO SYSTEM

- Add optional background music
- Add a global mute/unmute toggle
- Sync audio with video where possible
- Follow browser autoplay policies

---

## TASK 4: NETFLIX-STYLE ROWS

Create reusable horizontal scroll components:

Rows:

- Featured Projects
- Skills
- Certificates

Each row must:

- Support drag scroll
- Snap scrolling
- Left/right navigation buttons
- Smooth animation
- Lazy loading

---

## TASK 5: PROJECT CARDS (POSTER UI)

- Aspect ratio: 2:3
- Rounded-xl
- Glassmorphism style

Hover:

- Scale (1.05)
- Glow effect (blue/purple)
- Overlay:
  - Title
  - Short description

---

## TASK 6: PROJECT MODAL (FULLSCREEN EXPERIENCE)

On click:

- Open fullscreen modal with:
  - Blurred cinematic background
  - Demo video (if available)
  - Title + description
  - Tech stack badges
  - GitHub + Live links
  - Key achievements

Animation:

- Smooth zoom-in
- Background blur fade

---

## TASK 7: VISUAL SYSTEM

Theme:

- Background: #0B0F1A
- Primary: #6C8CFF
- Accent: #A855F7
- Text: #E5E7EB

Effects:

- Glow lighting
- Glassmorphism
- Depth layers

---

## TASK 8: MICRO-INTERACTIONS

- Cursor glow following mouse
- Smooth inertia scrolling
- Card tilt effect
- Scroll-based background movement

---

## TASK 9: DATA ARCHITECTURE

Create a single file:

`data/content.json`

Structure:

```
{
  "projects": [],
  "skills": [],
  "certificates": [],
  "links": {}
}
```

- Dynamically render UI from JSON
- Populate using provided links

---

## TASK 10: PERFORMANCE

- Lazy load all media
- Optimize video (MP4 + WebM fallback)
- Use intersection observer
- Target Lighthouse score >90

---

## TASK 11: EXTRAS

- Loading skeletons
- Optional sound toggle
- Easter egg (hidden animation or interaction)

---

## TASK 12: RESUME SYSTEM

- Create folder: `/public/resume/`
- Add resume file: `resume.pdf`
- Implement: Download Resume button triggers file download

---

## TASK 13: FINAL OUTPUT

Provide:

1. Updated folder structure
2. Key component implementations:
   - HeroSection
   - ProjectRow
   - ProjectCard
   - Modal
   - Audio system
3. `content.json` example
4. Any assumptions made

---

## GOAL

The final product must feel like:

"A cinematic Netflix-style experience for a developer portfolio"

NOT a traditional website.
