import { createSelector } from '@reduxjs/toolkit';

const selectNextLecture = state => {
  return state.currentLecture
    ? state.lectures.find(lecture => lecture.id === state.currentLecture?.id + 1)
      || null
    : null;
};

const selectPreviousLecture = (state) => {
  return state.currentLecture
    ? state.lectures.find(lecture => lecture.id === state.currentLecture?.id - 1)
    : null;
};

export const getNextLecture = createSelector(state => state.lecture, selectNextLecture);
export const getPreviousLecture = createSelector(state => state.lecture, selectPreviousLecture);