import Helmet from 'react-helmet';
import NewsletterForm from './newsletter-form';
import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import {ApolloIcon} from '@apollo/space-kit/icons/ApolloIcon';
import {ReactComponent as BlogIcon} from '../assets/blog.svg';
import {Category, SectionHeading} from './ui';
import {Global} from '@emotion/core';
import {IconFacebook} from '@apollo/space-kit/icons/IconFacebook';
import {IconGithub} from '@apollo/space-kit/icons/IconGithub';
import {IconInstagram} from '@apollo/space-kit/icons/IconInstagram';
import {IconSearch} from '@apollo/space-kit/icons/IconSearch';
import {IconTwitter} from '@apollo/space-kit/icons/IconTwitter';
import {IconYoutube} from '@apollo/space-kit/icons/IconYoutube';
import {Layout, colors} from 'gatsby-theme-apollo-core';
import {TextField} from '@apollo/space-kit/TextField';
import {size} from 'polished';

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: 1220,
  minHeight: '100vh',
  margin: '0 auto',
  padding: '0 40px'
});

const Header = styled.header({
  display: 'flex',
  alignItems: 'center',
  padding: '8px 0',
  backgroundColor: 'white',
  position: 'sticky',
  top: 0
});

const LogoWrapper = styled.div({
  display: 'flex',
  alignItems: 'flex-start'
});

const StyledApolloIcon = styled(ApolloIcon)({
  height: 28,
  marginRight: 8
});

const StyledBlogIcon = styled(BlogIcon)({
  height: 22,
  marginTop: 2
});

const SearchInput = styled(TextField)({
  flexGrow: 1,
  marginLeft: 72
});

const InnerWrapper = styled.div({
  display: 'flex',
  flexGrow: 1,
  paddingTop: 66
});

const Main = styled.main({
  flexGrow: 1
});

const Sidebar = styled.aside({
  flexShrink: 0,
  width: 262,
  marginLeft: 127
});

const SidebarSection = styled.div({
  ':not(:last-child)': {
    marginBottom: 90
  }
});

const SocialIcons = styled.div({
  display: 'flex',
  marginTop: 16
});

const SocialIcon = styled.a({
  ...size(24),
  color: '#c2c6d6',
  svg: size('100%'),
  ':hover': {
    color: '#7983a7'
  },
  ':not(:last-child)': {
    marginRight: 20
  }
});

const socialIcons = Object.entries({
  github: IconGithub,
  twitter: IconTwitter,
  youtube: IconYoutube,
  facebook: IconFacebook,
  instagram: IconInstagram
});

const Categories = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  marginTop: 16,
  [Category]: {
    ':not(:last-child)': {
      marginBottom: 16
    }
  }
});

export default function PageLayout(props) {
  return (
    <Layout>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css?family=Source+Code+Pro:700|Source+Sans+Pro:700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <Global
        styles={{
          [['h4', 'h5', 'h6']]: {
            marginBottom: 0
          },
          h2: {
            marginBottom: 32,
            fontSize: 38,
            fontWeight: 700,
            lineHeight: '46px'
          },
          h3: {
            marginBottom: 8,
            fontSize: 21,
            fontWeight: 700,
            lineHeight: '30px'
          },
          h5: {
            fontWeight: 400,
            lineHeight: 1.5
          },
          h6: {
            fontSize: 13,
            lineHeight: '20px',
            color: colors.text3
          }
        }}
      />
      <Wrapper>
        <Header>
          <LogoWrapper>
            <StyledApolloIcon />
            <StyledBlogIcon />
          </LogoWrapper>
          <SearchInput
            size="large"
            placeholder="Search blog..."
            icon={<IconSearch style={size(14)} />}
          />
        </Header>
        <InnerWrapper>
          <Main>{props.children}</Main>
          <Sidebar>
            <SidebarSection>
              <NewsletterForm />
            </SidebarSection>
            <SidebarSection>
              <SectionHeading>Follow us</SectionHeading>
              <SocialIcons>
                {socialIcons.map(([key, Icon]) => (
                  <SocialIcon
                    key={key}
                    href={`https://${key}.com/apollographql`}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <Icon />
                  </SocialIcon>
                ))}
              </SocialIcons>
            </SidebarSection>
            <SidebarSection>
              <SectionHeading>Categories</SectionHeading>
              <Categories>
                <Category>Community</Category>
                <Category>Product</Category>
                <Category>Development</Category>
              </Categories>
            </SidebarSection>
          </Sidebar>
        </InnerWrapper>
      </Wrapper>
    </Layout>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired
};
