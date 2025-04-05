'use client';

import { useState, useRef, useEffect } from 'react';
import ChallengeEditor from './ChallengeEditor.client';
import { Challenge } from '../data/challenges';
import styles from '../app/challenges/[id]/page.module.css';

interface ChallengeContentProps {
  challenge: Challenge;
  onSuccess?: () => void;
  isCompleted?: boolean;
}

export default function ChallengeContent({ 
  challenge, 
  onSuccess, 
  isCompleted = false 
}: ChallengeContentProps) {
  const [isCorrect, setIsCorrect] = useState(isCompleted);
  
  // For horizontal resizing
  const containerRef = useRef<HTMLDivElement>(null);
  const resizerRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  
  // Initialize with default ratio (e.g., 60% info, 40% editor)
  const [infoWidth, setInfoWidth] = useState(60);

  // Reset isCorrect if isCompleted changes
  useEffect(() => {
    setIsCorrect(isCompleted);
  }, [isCompleted]);
  
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
      if (onSuccess) {
        onSuccess();
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
      <div className={styles.challengeContent}>
        <div 
          ref={infoRef}
          className={styles.challengeInfo}
          style={{ width: `${infoWidth}%` }}
        >
          <div className={styles.scrollableContent}>
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
          
          {isCorrect && (
            <div className={styles.successMessage}>
              <svg className={styles.successIcon} viewBox="0 0 24 24" width="24" height="24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
              {isCompleted ? 'You\'ve already completed this challenge!' : 'Great job! You completed this challenge!'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 