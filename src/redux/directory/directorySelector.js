import { createSelector } from 'reselect';

const selectDirectory = state => state.directory;

export const selectDirectorySections = createSelector(
  [selectDirectory],
  directory => directory.sections
)

export const selectIsFetching = createSelector([selectDirectory], directory => directory.isFetching)

export const selectError = createSelector([selectDirectory], (directory) => directory.errorMessage)