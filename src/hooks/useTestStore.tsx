'use client';

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { TestResult } from '@/types';

interface TestState {
  currentQuestion: number;
  answers: (number | null)[];
  isComplete: boolean;
  result: TestResult | null;
  isLoading: boolean;
  questionCount: number;
}

type TestAction =
  | { type: 'SELECT_ANSWER'; questionIndex: number; value: number }
  | { type: 'NEXT_QUESTION' }
  | { type: 'PREV_QUESTION' }
  | { type: 'SKIP_QUESTION' }
  | { type: 'SET_RESULT'; result: TestResult }
  | { type: 'RESET_TEST'; questionCount: number }
  | { type: 'RESTORE_STATE'; state: Partial<TestState> };

function createInitialState(questionCount: number): TestState {
  return {
    currentQuestion: 0,
    answers: Array(questionCount).fill(null),
    isComplete: false,
    result: null,
    isLoading: false,
    questionCount,
  };
}

function testReducer(state: TestState, action: TestAction): TestState {
  switch (action.type) {
    case 'SELECT_ANSWER':
      const newAnswers = [...state.answers];
      newAnswers[action.questionIndex] = action.value;
      return { ...state, answers: newAnswers };
    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuestion: Math.min(state.currentQuestion + 1, state.questionCount - 1),
      };
    case 'PREV_QUESTION':
      return {
        ...state,
        currentQuestion: Math.max(state.currentQuestion - 1, 0),
      };
    case 'SKIP_QUESTION':
      return {
        ...state,
        currentQuestion: Math.min(state.currentQuestion + 1, state.questionCount - 1),
      };
    case 'SET_RESULT':
      return {
        ...state,
        result: action.result,
        isComplete: true,
        isLoading: false,
      };
    case 'RESET_TEST':
      return createInitialState(action.questionCount);
    case 'RESTORE_STATE':
      return { ...state, ...action.state };
    default:
      return state;
  }
}

interface TestContextType {
  state: TestState;
  selectAnswer: (value: number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  skipQuestion: () => void;
  setResult: (result: TestResult) => void;
  resetTest: (questionCount: number) => void;
}

const TestContext = createContext<TestContextType | null>(null);

export function TestProvider({ children, questionCount = 28 }: { children: ReactNode; questionCount?: number }) {
  const [state, dispatch] = useReducer(testReducer, createInitialState(questionCount));

  // Reset when questionCount changes
  useEffect(() => {
    dispatch({ type: 'RESET_TEST', questionCount });
  }, [questionCount]);

  // Restore from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('mbti_test_progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.answers && parsed.answers.length === questionCount) {
          dispatch({ type: 'RESTORE_STATE', state: parsed });
        }
      } catch (e) {
        console.error('Failed to restore test state:', e);
      }
    }
  }, [questionCount]);

  // Save to localStorage on change
  useEffect(() => {
    if (!state.isComplete && state.answers.some(a => a !== null)) {
      localStorage.setItem('mbti_test_progress', JSON.stringify({
        currentQuestion: state.currentQuestion,
        answers: state.answers,
        isComplete: false,
        result: null,
        questionCount: state.questionCount,
      }));
    }
  }, [state.currentQuestion, state.answers, state.isComplete, state.questionCount]);

  const selectAnswer = (value: number) => {
    dispatch({ type: 'SELECT_ANSWER', questionIndex: state.currentQuestion, value });
  };

  const nextQuestion = () => {
    dispatch({ type: 'NEXT_QUESTION' });
  };

  const prevQuestion = () => {
    dispatch({ type: 'PREV_QUESTION' });
  };

  const skipQuestion = () => {
    dispatch({ type: 'SKIP_QUESTION' });
  };

  const setResult = (result: TestResult) => {
    dispatch({ type: 'SET_RESULT', result });
    localStorage.removeItem('mbti_test_progress');
    localStorage.setItem(`mbti_result_${result.type}`, JSON.stringify(result));
  };

  const resetTest = (newQuestionCount: number) => {
    dispatch({ type: 'RESET_TEST', questionCount: newQuestionCount });
    localStorage.removeItem('mbti_test_progress');
  };

  return (
    <TestContext.Provider
      value={{
        state,
        selectAnswer,
        nextQuestion,
        prevQuestion,
        skipQuestion,
        setResult,
        resetTest,
      }}
    >
      {children}
    </TestContext.Provider>
  );
}

export function useTest() {
  const context = useContext(TestContext);
  if (!context) {
    throw new Error('useTest must be used within a TestProvider');
  }
  return context;
}
