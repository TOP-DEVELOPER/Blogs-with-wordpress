import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import {Button} from '@apollo/space-kit/Button';
import {Link} from 'gatsby';
import {TextField} from '@apollo/space-kit/TextField';
import {colors} from '@apollo/space-kit/colors';
import {format} from 'date-fns';
import {size, transparentize} from 'polished';
import {stripHtmlTags} from '../utils';

export const FONT_FAMILY_MONO = "'Source Code Pro', Menlo, monospace";

export const dateTextStyles = {
  fontFamily: FONT_FAMILY_MONO,
  color: colors.grey.light,
  textTransform: 'uppercase',
  letterSpacing: 2
};

const DateTextInner = styled.h6({
  ...dateTextStyles,
  marginBottom: 4
});

export function DateText({date, ...props}) {
  return (
    <DateTextInner {...props}>
      {format(new Date(date), 'MMMM d, yyyy')}
    </DateTextInner>
  );
}

DateText.propTypes = {
  date: PropTypes.string.isRequired
};

export const PostImage = styled.img({
  width: '100%',
  marginBottom: 24,
  borderRadius: 4,
  objectFit: 'cover'
});

const ExcerptTextInner = styled.p({
  marginBottom: 16,
  fontSize: 13
});

export function ExcerptText({excerpt, ...props}) {
  return (
    <ExcerptTextInner
      {...props}
      dangerouslySetInnerHTML={{__html: stripHtmlTags(excerpt)}}
    />
  );
}

ExcerptText.propTypes = {
  excerpt: PropTypes.string.isRequired
};

export const categoryStyles = {
  padding: '6px 12px',
  border: `1px solid ${colors.indigo.lighter}`,
  borderRadius: 4,
  fontFamily: FONT_FAMILY_MONO,
  lineHeight: 1,
  textTransform: 'uppercase',
  textDecoration: 'none'
};

const CategoryInner = styled(Link)({
  ...categoryStyles,
  color: colors.indigo.dark,
  ':hover': {
    borderColor: colors.indigo.base,
    backgroundColor: transparentize(0.5, colors.indigo.lightest)
  },
  ':active': {
    backgroundColor: colors.indigo.lightest
  }
});

const CategoryInnerSmall = styled(CategoryInner)({
  padding: '1px 6px',
  fontSize: 13,
  lineHeight: '18px'
});

export function Category({isSmall, category, ...props}) {
  return React.createElement(
    isSmall ? CategoryInnerSmall : CategoryInner,
    {
      to: `/category/${category.slug}`,
      ...props
    },
    category.name
  );
}

Category.propTypes = {
  category: PropTypes.object.isRequired,
  isSmall: PropTypes.bool
};

export const Categories = styled.div({
  display: 'flex',
  '> :not(:last-child)': {
    marginRight: 16
  }
});

const SIDEBAR_WIDTH = 262;
const SIDEBAR_MARGIN = 127;

export const TopFold = styled.div({
  width: `calc(100% - ${SIDEBAR_WIDTH + SIDEBAR_MARGIN}px)`
});

export const InnerWrapper = styled.div({
  display: 'flex',
  flexGrow: 1
});

export const Main = styled.main({
  flexGrow: 1,
  width: 0
});

export const Sidebar = styled.aside({
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 0,
  width: 312,
  marginLeft: 128
});

export const SectionHeading = styled.h4({
  marginBottom: 48,
  fontFamily: FONT_FAMILY_MONO,
  letterSpacing: 3,
  textTransform: 'uppercase'
});

export const SidebarSection = styled.div({
  [SectionHeading]: {
    marginBottom: 0
  },
  ':not(:last-child)': {
    marginBottom: 90
  }
});

export const SocialIcons = styled.div({
  display: 'flex',
  marginTop: 16,
  [['a', 'button']]: {
    ...size(24),
    padding: 0,
    border: 0,
    cursor: 'pointer',
    color: colors.silver.darker,
    svg: {
      ...size('100%'),
      fill: 'currentColor'
    },
    ':hover': {
      color: colors.grey.light
    },
    ':not(:last-child)': {
      marginRight: 20
    }
  }
});

export const avatarSizes = {
  xs: 20,
  sm: 24,
  md: 44,
  lg: 68
};

export const avatarMargins = {
  xs: 8,
  sm: 10,
  md: 16,
  lg: 29
};

export const Avatar = styled.img(props => ({
  ...size(avatarSizes[props.size]),
  borderRadius: 4,
  marginRight: avatarMargins[props.size],
  objectFit: 'cover'
}));

export const largeTextStyles = {
  fontSize: 21,
  lineHeight: '32px'
};

export const linkStyles = {
  color: colors.indigo.base,
  textDecoration: 'none',
  ':hover': {
    textDecoration: 'underline'
  }
};

export const HeadingLink = styled(Link)({
  color: 'inherit',
  textDecoration: 'none',
  ':hover': {
    color: colors.indigo.base
  }
});

const largeInputHeight = 50;
const LargeInputBase = styled(TextField)({
  input: {
    height: largeInputHeight,
    fontSize: 18
  }
});

export function LargeInput(props) {
  return <LargeInputBase size="large" {...props} />;
}

export function LargeButton({style, ...props}) {
  return (
    <Button
      size="large"
      style={{
        height: largeInputHeight,
        ...style
      }}
      {...props}
    />
  );
}

LargeButton.propTypes = {
  style: PropTypes.object
};
