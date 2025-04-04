'use client';

import { useState, useRef, useEffect } from 'react';
import ChallengeEditor from '../../../components/ChallengeEditor.client';
import { challenges } from '../../../data/challenges';
import { useProgress } from '../../../contexts/ProgressContext';
import styles from './page.module.css';

interface ChallengeContentProps {
  id: string;
  demoMode?: boolean;
}

export default function ChallengeContent({ id, demoMode = false }: ChallengeContentProps) {
  const [isCorrect, setIsCorrect] = useState(false);
  const { updateProgress } = useProgress();
  
  // For horizontal resizing
  const containerRef = useRef<HTMLDivElement>(null);
  const resizerRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  
  // Initialize with default ratio (e.g., 60% info, 40% editor)
  const [infoWidth, setInfoWidth] = useState(60);

  const challenge = challenges?.find((c) => c.id === id);
  
  if (!challenge) {
    return <div className={styles.error}>Challenge not found</div>;
  }
  
  useEffect(() => {
    const resizer = resizerRef.current;
    let startX = 0;
    let startInfoWidth = 0;
    let containerWidth = 0;
    
    function startResize(e: MouseEvent) {
      e.preventDefault();
      startX = e.clientX;
      
      if (containerRef.current && infoRef.current) {
        containerWidth = containerRef.current.getBoundingClientRect().width;
        startInfoWidth = infoRef.current.getBoundingClientRect().width;
      }
      
      document.documentElement.style.cursor = 'ew-resize';
      document.addEventListener('mousemove', resize);
      document.addEventListener('mouseup', stopResize);
    }
    
    function resize(e: MouseEvent) {
      if (containerRef.current) {
        const delta = e.clientX - startX;
        const newInfoWidth = ((startInfoWidth + delta) / containerWidth) * 100;
        
        // Ensure the info section is between 30% and 70% of the container
        if (newInfoWidth >= 30 && newInfoWidth <= 70) {
          setInfoWidth(newInfoWidth);
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

  const handleSubmit = (code: string) => {
    const normalizedUserCode = code.trim().replace(/\s+/g, ' ');
    const normalizedSolution = challenge.solution.trim().replace(/\s+/g, ' ');

    if (normalizedUserCode === normalizedSolution) {
      setIsCorrect(true);
      if (!demoMode) {
        updateProgress(id, true);
      }
    } else {
      setIsCorrect(false);
    }
  };

  const handleReset = () => {
    setIsCorrect(false);
  };

  return (
    <div ref={containerRef} className={styles.challengeContainer}>
      <div className={styles.challengeHeader}>
        <h1 className={styles.challengeTitle}>{challenge.title}</h1>
        <p className={styles.difficulty}>
          <span className={styles[`difficulty-${challenge.difficulty}`]}>
            {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
          </span>
        </p>
      </div>
      
      <div className={styles.challengeContent}>
        <div 
          ref={infoRef}
          className={styles.challengeInfo}
          style={{ width: `${infoWidth}%` }}
        >
          <div className={styles.scrollableContent}>
            <p className={styles.challengeDescription}>{challenge.description}</p>
            
            <div className={styles.challengeDetails}>
              <h2>Challenge Details</h2>
              <p>In this challenge, you will need to:</p>
              <ul>
                <li>Write code that matches the expected output</li>
                <li>Use the concepts explained below</li>
                <li>Follow the hints if you get stuck</li>
              </ul>
            </div>
            
            {challenge.concepts && challenge.concepts.length > 0 && (
              <div className={styles.conceptsSection}>
                <h2>Key Concepts</h2>
                {challenge.concepts.map((concept, index) => (
                  <div key={index} className={styles.concept}>
                    <h3>{concept.title}</h3>
                    <p>{concept.description}</p>
                    <div className={styles.codeExample}>
                      <pre><code>{concept.example}</code></pre>
                    </div>
                    <p className={styles.explanation}>{concept.explanation}</p>
                  </div>
                ))}
              </div>
            )}
            
            {challenge.examples && challenge.examples.length > 0 && (
              <div className={styles.examples}>
                <h2 className={styles.examplesTitle}>Examples</h2>
                {challenge.examples.map((example, index) => (
                  <div key={index} className={styles.example}>
                    <div className={styles.exampleInput}>
                      <span className={styles.exampleLabel}>Input:</span>
                      <pre>{example.input}</pre>
                    </div>
                    <div className={styles.exampleOutput}>
                      <span className={styles.exampleLabel}>Output:</span>
                      <pre>{example.output}</pre>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div 
          ref={resizerRef}
          className={styles.resizer}
          title="Drag to resize"
        >
          <div className={styles.resizerHandle}></div>
        </div>

        <div 
          ref={editorRef}
          className={styles.editorSection}
          style={{ width: `${100 - infoWidth}%` }}
        >
          <ChallengeEditor
            initialCode={challenge.initialCode}
            onSubmit={handleSubmit}
            onReset={handleReset}
            isCorrect={isCorrect}
            hints={challenge.hints || []}
            solution={challenge.solution}
          />
          {demoMode && isCorrect && (
            <div className={styles.demoSuccessMessage}>
              Great job! Sign in to save your progress.
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 