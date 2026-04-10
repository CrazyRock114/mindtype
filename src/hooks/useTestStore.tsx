'use client';

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { TestResult } from '@/types';

interface TestState {
  currentQuestion: number;
  answers: (number | null)[];
  isComplete: boolean;
  result: TestResult | null;
  isLoading: boolean;
}

type TestAction =
  | { type: 'SELECT_ANSWER'; questionIndex: number; value: number }
  | { type: 'NEXT_QUESTION' }
  | { type: 'PREV_QUESTION' }
  | { type: 'SKIP_QUESTION' }
  | { type: 'SET_RESULT'; result: TestResult }
  | { type: 'RESET_TEST' }
  | { type: 'RESTORE_STATE'; state: Partial<TestState> };

const initialState: TestState = {
  currentQuestion: 0,
  answers: Array(28).fill(null),
  isComplete: false,
  result: null,
  isLoading: false,
};

function testReducer(state: TestState, action: TestAction): TestState {
  switch (action.type) {
    case 'SELECT_ANSWER':
      const newAnswers = [...state.answers];
      newAnswers[action.questionIndex] = action.value;
      return { ...state, answers: newAnswers };
    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuestion: Math.min(state.currentQuestion + 1, state.answers.length - 1),
      };
    case 'PREV_QUESTION':
      return {
        ...state,
        currentQuestion: Math.max(state.currentQuestion - 1, 0),
      };
    case 'SKIP_QUESTION':
      return {
        ...state,
        currentQuestion: Math.min(state.currentQuestion + 1, state.answers.length - 1),
      };
    case 'SET_RESULT':
      return {
        ...state,
        result: action.result,
        isComplete: true,
        isLoading: false,
      };
    case 'RESET_TEST':
      return initialState;
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
  resetTest: () => void;
}

const TestContext = createContext<TestContextType | null>(null);

export function TestProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(testReducer, initialState);

  // Restore from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('mbti_test_progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        dispatch({ type: 'RESTORE_STATE', state: parsed });
      } catch (e) {
        console.error('Failed to restore test state:', e);
      }
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (!state.isComplete && state.answers.some(a => a !== null)) {
      localStorage.setItem('mbti_test_progress', JSON.stringify({
        currentQuestion: state.currentQuestion,
        answers: state.answers,
        isComplete: false,
        result: null,
      }));
    }
  }, [state.currentQuestion, state.answers, state.isComplete]);

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

  const resetTest = () => {
    dispatch({ type: 'RESET_TEST' });
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
