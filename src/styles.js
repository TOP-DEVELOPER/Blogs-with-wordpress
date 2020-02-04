import {colors} from '@apollo/space-kit/colors';

export const HEADINGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

export default {
  body: {
    color: colors.grey.dark
  },
  [[...HEADINGS, 'p', 'ul', 'ol']]: {
    margin: 0
  },
  [HEADINGS]: {
    color: '#343c5a'
  },
  [['h1', 'h2', 'h3']]: {
    fontWeight: 700
  },
  [['h2', 'h3']]: {
    fontWeight: 700
  },
  [['h4', 'h5', 'h6']]: {
    fontWeight: 400
  },
  h1: {
    fontSize: 56,
    lineHeight: 8 / 7
  },
  h2: {
    marginBottom: 32,
    fontSize: 38,
    lineHeight: 23 / 19
  },
  h3: {
    marginBottom: 8,
    fontSize: 21,
    lineHeight: 10 / 7
  },
  [['h5', 'p']]: {
    fontSize: '1rem',
    lineHeight: 1.5
  },
  h6: {
    fontSize: 13,
    lineHeight: '20px',
    color: colors.grey.light
  }
};
