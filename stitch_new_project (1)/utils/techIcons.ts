import { Code2, Cpu, Database, Globe, Layers, Zap, Cloud } from "lucide-react";

export const techIcons: Record<string, { icon: any, color: string }> = {
  // AI & ML (Muted Purple)
  "LLMs": { icon: Cpu, color: "#C084FC" },
  "RAG": { icon: Cpu, color: "#C084FC" },
  "Fine-tuning": { icon: Cpu, color: "#C084FC" },
  "Inference Optimization": { icon: Cpu, color: "#C084FC" },
  "MLOps": { icon: Cpu, color: "#C084FC" },
  "PyTorch": { icon: Cpu, color: "#C084FC" },
  "TensorFlow": { icon: Cpu, color: "#C084FC" },
  "Google Gemini (LLM)": { icon: Cpu, color: "#C084FC" },
  "Mistral-7B / QLoRA": { icon: Cpu, color: "#C084FC" },
  // Data (Muted Cyan)
  "PostgreSQL": { icon: Database, color: "#7DD3FC" },
  "MySQL": { icon: Database, color: "#7DD3FC" },
  "Vector Databases (ChromaDB, Pinecone)": { icon: Database, color: "#7DD3FC" },
  "Pandas": { icon: Database, color: "#7DD3FC" },
  "yfinance": { icon: Database, color: "#7DD3FC" },
  "Alpha Vantage": { icon: Database, color: "#7DD3FC" },
  "Finnhub": { icon: Database, color: "#7DD3FC" },
  "FRED": { icon: Database, color: "#7DD3FC" },
  // Backend & Languages (Muted Blue)
  "FastAPI": { icon: Code2, color: "#60A5FA" },
  "gRPC": { icon: Code2, color: "#60A5FA" },
  "Python": { icon: Code2, color: "#60A5FA" },
  "Node.js": { icon: Code2, color: "#60A5FA" },
  "Express.js": { icon: Code2, color: "#60A5FA" },
  "TypeScript": { icon: Code2, color: "#60A5FA" },
  "JavaScript": { icon: Code2, color: "#60A5FA" },
  // Frontend (Muted Emerald)
  "React.js": { icon: Globe, color: "#6EE7B7" },
  "Next.js": { icon: Globe, color: "#6EE7B7" },
  "Next.js 14": { icon: Globe, color: "#6EE7B7" },
  "Framer Motion": { icon: Globe, color: "#6EE7B7" },
  "Tailwind CSS": { icon: Layers, color: "#6EE7B7" },
  "Chart.js": { icon: Globe, color: "#6EE7B7" },
  "Plotly": { icon: Globe, color: "#6EE7B7" },
  "Streamlit": { icon: Globe, color: "#6EE7B7" },
  // Cloud & Infra (Muted Orange)
  "AWS": { icon: Cloud, color: "#FDBA74" },
  "Google Cloud": { icon: Cloud, color: "#FDBA74" },
  "Docker": { icon: Layers, color: "#FDBA74" },
  "Kubernetes": { icon: Layers, color: "#FDBA74" },
  "Terraform": { icon: Layers, color: "#FDBA74" },
  "CI/CD": { icon: Layers, color: "#FDBA74" },
  "Docker & HuggingFace Spaces": { icon: Layers, color: "#FDBA74" },
  // Specialized (Muted Rose)
  "Quant Analytics": { icon: Zap, color: "#FDA4AF" },
  "LangChain": { icon: Zap, color: "#C084FC" },
  "Portfolio Theory": { icon: Zap, color: "#FDA4AF" },
  "Risk Modeling": { icon: Zap, color: "#FDA4AF" },
  "Finance": { icon: Zap, color: "#FDA4AF" }
};
