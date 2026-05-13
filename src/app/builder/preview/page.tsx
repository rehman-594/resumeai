"use client";

import PreviewTab from "@/components/builder/tabs/PreviewTab";
import { useResumeStore } from "@/store/useResumeStore";
import { useRouter } from "next/navigation";

export default function PreviewPage() {
  const { selectedTemplate, setSelectedTemplate } = useResumeStore();
  const router = useRouter();

  return (
    <PreviewTab 
      selectedTemplate={selectedTemplate} 
      setSelectedTemplate={setSelectedTemplate} 
      onEdit={() => router.push("/builder")} 
    />
  );
}
