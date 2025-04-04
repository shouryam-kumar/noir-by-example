'use client';

import { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import styles from './ChallengeEditor.module.css';

interface ChallengeEditorProps {
  initialCode: string;
  onSubmit: (code: string) => void;
  onReset: () => void;
  isCorrect: boolean;
  hints: string[];
  solution: string;
}

export default function ChallengeEditor({
  initialCode,
  onSubmit,
  onReset,
  isCorrect,
  hints,
  solution,
}: ChallengeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [theme, setTheme] = useState('vs-dark');
  const [visibleHints, setVisibleHints] = useState<number[]>([]);
  const [showSolutionDialog, setShowSolutionDialog] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [editorHeight, setEditorHeight] = useState(400);
  const resizeRef = useRef<HTMLDivElement>(null);
  const resizerRef = useRef<HTMLDivElement>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'vs-dark' : 'vs-light');
  }, []);

  useEffect(() => {
    const resizer = resizerRef.current;
    let startY = 0;
    let startHeight = 0;

    function startResize(e: MouseEvent) {
      startY = e.clientY;
      if (editorContainerRef.current) {
        startHeight = editorContainerRef.current.getBoundingClientRect().height;
      }
      document.documentElement.style.cursor = 'ns-resize';
      document.addEventListener('mousemove', resize);
      document.addEventListener('mouseup', stopResize);
    }

    function resize(e: MouseEvent) {
      if (editorContainerRef.current) {
        const newHeight = startHeight + e.clientY - startY;
        if (newHeight > 200 && newHeight < 800) {
          setEditorHeight(newHeight);
        }
      }
    }

    function stopResize() {
      document.documentElement.style.cursor = '';
      document.removeEventListener('mousemove', resize);
      document.removeEventListener('mouseup', stopResize);
    }

    if (resizer) {
      resizer.addEventListener('mousedown', startResize);
    }

    return () => {
      if (resizer) {
        resizer.removeEventListener('mousedown', startResize);
      }
      document.removeEventListener('mousemove', resize);
      document.removeEventListener('mouseup', stopResize);
    };
  }, []);

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
      // Reset submission state when code changes
      if (hasSubmitted) {
        setHasSubmitted(false);
      }
    }
  };

  const handleSubmit = () => {
    // Normalize the code by removing comments and extra whitespace
    const normalizedCode = code
      .replace(/\/\/.*$/gm, '') // Remove single line comments
      .replace(/\/\*[\s\S]*?\*\//gm, '') // Remove multi-line comments
      .replace(/^\s*[\r\n]/gm, '') // Remove empty lines
      .replace(/\s+/g, ' ') // Replace multiple whitespace with single space
      .trim();
      
    setHasSubmitted(true);
    onSubmit(normalizedCode);
  };

  const handleReset = () => {
    setCode(initialCode);
    setVisibleHints([]);
    setHasSubmitted(false);
    onReset();
  };

  const handleShowHint = () => {
    if (visibleHints.length < hints.length) {
      setVisibleHints([...visibleHints, visibleHints.length]);
    }
  };

  const handleShowSolution = () => {
    setShowSolutionDialog(true);
  };

  const confirmShowSolution = () => {
    setCode(solution);
    setShowSolutionDialog(false);
  };

  const cancelShowSolution = () => {
    setShowSolutionDialog(false);
  };

  return (
    <div className={styles.editorContainer}>
      <div 
        ref={editorContainerRef}
        className={styles.editorWrapper}
      >
        <Editor
          height={`${editorHeight}px`}
          defaultLanguage="rust"
          value={code}
          onChange={handleEditorChange}
          theme={theme}
          options={{
            minimap: { enabled: true },
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            fontSize: 14,
            wordWrap: 'on',
            automaticLayout: true,
          }}
        />
        <div 
          ref={resizerRef}
          className={styles.resizer}
          title="Drag to resize"
        >
          <div className={styles.resizerHandle}></div>
        </div>
      </div>
      
      <div className={styles.controls}>
        <button
          className={`${styles.button} ${styles.submitButton}`}
          onClick={handleSubmit}
          disabled={isCorrect}
        >
          Submit
        </button>
        
        <button
          className={`${styles.button} ${styles.resetButton}`}
          onClick={handleReset}
        >
          Reset
        </button>

        {hints.length > 0 && (
          <button
            className={`${styles.button} ${styles.hintButton}`}
            onClick={handleShowHint}
            disabled={visibleHints.length >= hints.length}
          >
            Show Hint
          </button>
        )}

        <button
          className={`${styles.button} ${styles.solutionButton}`}
          onClick={handleShowSolution}
        >
          Show Solution
        </button>
      </div>

      {hasSubmitted && !isCorrect && (
        <div className={styles.errorMessage}>
          <p>❌ Not quite right. Keep trying!</p>
        </div>
      )}

      {isCorrect && (
        <div className={styles.successMessage}>
          <p>✅ Correct! Well done!</p>
        </div>
      )}

      {visibleHints.length > 0 && (
        <div className={styles.hintSection}>
          <h3>Hints:</h3>
          {visibleHints.map((hintIndex) => (
            <div key={hintIndex} className={styles.hint}>
              <p><strong>Hint {hintIndex + 1}:</strong> {hints[hintIndex]}</p>
            </div>
          ))}
        </div>
      )}

      {showSolutionDialog && (
        <div className={styles.solutionDialogOverlay}>
          <div className={styles.solutionDialog}>
            <h3>Are you sure?</h3>
            <p>It's best to try solving the challenge on your own. Looking at the solution should be a last resort after multiple attempts.</p>
            <p>Learning comes from solving problems, not just seeing answers.</p>
            <div className={styles.dialogButtons}>
              <button
                className={`${styles.button} ${styles.cancelButton}`}
                onClick={cancelShowSolution}
              >
                Cancel
              </button>
              <button
                className={`${styles.button} ${styles.confirmButton}`}
                onClick={confirmShowSolution}
              >
                Show Solution
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 