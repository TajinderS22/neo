

import type { Step } from "../types";

export const parseXml = (response: string): Step[] => {
  const xmlMatch = response.match(
    /<neoArtifact[^>]*>([\s\S]*?)<\/neoArtifact>/
  );

  if (!xmlMatch) {
    return [];
  }

  const xmlContent = xmlMatch[1];
  const steps: Step[] = [];
  let stepId = 1;

  const titleMatch = response.match(/title="([^"]*)"/);
  const artifactTitle = titleMatch ? titleMatch[1] : "Project Files";

  // Create root folder
  steps.push({
    id: stepId++,
    title: artifactTitle,
    description: "",
    type: "CreateFolder",
    status: "pending",
  });

  const actionRegex =
    /<neoAction\s+type="([^"]*)"(?:\s+filePath="([^"]*)")?>([\s\S]*?)<\/neoAction>/g;

  let match;
  while ((match = actionRegex.exec(xmlContent)) !== null) {
    const [, type, filePath, content] = match;

    if (type === "file") {
      steps.push({
        id: stepId++,
        title: `Create ${filePath}`,
        description: "",
        type: "CreateFile",
        status: "pending",
        code: content.trim(),
        path: filePath,
      });
    }

    if (type === "shell") {
      steps.push({
        id: stepId++,
        title: "Run command",
        description: "",
        type: "RunScript",
        status: "pending",
        code: content.trim(),
      });
    }
  }

  return steps;
};



