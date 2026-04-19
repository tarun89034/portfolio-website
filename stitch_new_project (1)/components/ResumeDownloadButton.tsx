type ResumeDownloadButtonProps = {
  className?: string;
  label?: string;
};

const RESUME_PATH = "/resume/resume.pdf";
const RESUME_FILENAME = "tarun-yadav-resume.pdf";

export default function ResumeDownloadButton({ className = "", label = "Download Resume" }: ResumeDownloadButtonProps) {
  return (
    <a href={RESUME_PATH} download={RESUME_FILENAME} className={className}>
      {label}
    </a>
  );
}
