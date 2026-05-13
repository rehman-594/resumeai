"use client";

import TemplatesTab from "@/components/builder/tabs/TemplatesTab";
import { useResumeStore } from "@/store/useResumeStore";

export default function TemplatesPage() {
  const { selectedTemplate, setSelectedTemplate } = useResumeStore();

  return (
    <TemplatesTab 
      selectedTemplate={selectedTemplate} 
      onSelect={setSelectedTemplate} 
    />
  );
}
