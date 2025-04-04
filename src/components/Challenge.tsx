import React from 'react';
import Editor from '@monaco-editor/react';

interface ChallengeProps {
  title: string;
  description: string;
  initialCode: string;
  onCodeChange: (code: string) => void;
}

export default function Challenge({ title, description, initialCode, onCodeChange }: ChallengeProps) {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="mb-4">{description}</p>
      <div className="border rounded-lg overflow-hidden">
        <Editor
          height="400px"
          defaultLanguage="rust"
          defaultValue={initialCode}
          onChange={(value) => onCodeChange(value || '')}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            readOnly: false,
          }}
        />
      </div>
      <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Submit Solution
      </button>
    </div>
  );
} 