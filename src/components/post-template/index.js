import AuthorDetails, {linkStyles} from './author-details';
import Byline from '../byline';
import Helmet from 'react-helmet';
import Layout from '../layout';
import NewsletterForm from '../newsletter-form';
import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import {
  Category,
  DateText,
  FONT_FAMILY_MONO,
  InnerWrapper,
  LargeButton,
  LargeInput,
  Main,
  SectionHeading,
  Sidebar,
  SidebarSection,
  SocialIcon,
  SocialIcons,
  TopFold,
  largeTextStyles
} from '../ui';
import {HEADING_COLOR} from '../../styles';
import {IconEmail} from '@apollo/space-kit/icons/IconEmail';
import {IconFacebook} from '@apollo/space-kit/icons/IconFacebook';
import {ReactComponent as IconLinkedin} from '../../assets/icons/linkedin.svg';
import {IconSingleService} from '@apollo/space-kit/icons/IconSingleService';
import {ReactComponent as IconSlack} from '../../assets/icons/slack.svg';
import {IconTwitter} from '@apollo/space-kit/icons/IconTwitter';
import {colors} from '@apollo/space-kit/colors';
import {graphql} from 'gatsby';

const BylineWrapper = styled.div({
  display: 'flex',
  marginTop: 32
});

const Categories = styled.div({
  display: 'flex',
  marginTop: 32,
  [Category]: {
    marginRight: 16
  }
});

const FeaturedImage = styled.img({
  width: '100%',
  marginBottom: 90,
  borderRadius: 8
});

const TwitterHandleWrapper = styled.div({
  display: 'flex',
  paddingLeft: 24,
  marginLeft: 24,
  borderLeft: `1px solid ${colors.grey.lighter}`
});

const TwitterHandle = styled.a({
  display: 'flex',
  alignItems: 'center',
  margin: 'auto 0',
  color: colors.indigo.dark,
  textDecoration: 'none',
  ':hover': {
    color: colors.indigo.base
  }
});

const FULL_IMAGE_HEIGHT = 600;
const FIGCAPTION_MARGIN = 12;

const PostContent = styled.div({
  color: HEADING_COLOR,
  h2: {
    marginTop: 90
  },
  h3: {
    marginTop: 60,
    marginBottom: 32
  },
  [['p', 'li']]: {
    ...largeTextStyles,
    marginBottom: 31
  },
  a: linkStyles,
  '.wp-block-image': {
    margin: '90px 0',
    '&.alignfull': {
      img: {
        width: '100%',
        maxWidth: 'none',
        height: FULL_IMAGE_HEIGHT,
        objectFit: 'cover',
        position: 'absolute',
        left: 0
      },
      figcaption: {
        paddingTop: FULL_IMAGE_HEIGHT + FIGCAPTION_MARGIN
      }
    },
    img: {
      maxWidth: '100%'
    },
    figcaption: {
      marginTop: FIGCAPTION_MARGIN,
      fontFamily: FONT_FAMILY_MONO,
      color: colors.grey.lighter,
      lineHeight: 1.5
    }
  }
});

const Divider = styled.div({
  margin: '120px 0',
  color: colors.indigo.base,
  svg: {
    marginRight: 16
  }
});

const NewsletterSignup = styled.div({
  marginTop: 120,
  backgroundColor: colors.silver.light,
  padding: 32,
  borderRadius: 8,
  p: {
    ...largeTextStyles,
    marginTop: 14,
    marginBottom: 32
  }
});

const PostSidebarWrapper = styled.div({
  flexGrow: 0.5
});

const PostActionWrapper = styled.div({
  display: 'flex',
  flexGrow: 1
});

const PostAction = styled(SidebarSection)({
  display: 'flex',
  flexDirection: 'column',
  padding: 24,
  marginTop: 'auto',
  marginRight: -40,
  borderRadius: 12,
  color: 'white',
  backgroundColor: colors.indigo.dark,
  position: 'sticky',
  bottom: 90,
  h3: {
    color: 'inherit',
    marginBottom: 16
  },
  p: {
    marginBottom: 32
  }
});

const InputRow = styled.div({
  display: 'flex'
});

const EmailInput = styled(LargeInput)({
  flexGrow: 1,
  marginRight: 24,
  [['label *:first-child', '> div']]: {
    marginTop: 0
  }
});

export default function PostTemplate(props) {
  const {
    date,
    title,
    author,
    categories,
    featuredImage,
    content
  } = props.data.wordpress.post;
  const {twitter} = author.userMetadata;
  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <TopFold style={{paddingBottom: 90}}>
        <DateText style={{marginBottom: 12}} date={date} />
        <h1>{title}</h1>
        <BylineWrapper>
          <Byline author={author} />
          {twitter && (
            <TwitterHandleWrapper>
              <TwitterHandle
                href={`https://twitter.com/${twitter}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconTwitter
                  style={{
                    width: 20,
                    marginRight: 8
                  }}
                />
                @{twitter}
              </TwitterHandle>
            </TwitterHandleWrapper>
          )}
        </BylineWrapper>
        <Categories>
          {categories.nodes.map(category => (
            <Category key={category.id}>{category.name}</Category>
          ))}
        </Categories>
      </TopFold>
      <InnerWrapper>
        <Main>
          <FeaturedImage src={featuredImage.sourceUrl} />
          <PostContent dangerouslySetInnerHTML={{__html: content}} />
          <Divider>
            <IconSingleService />
            <IconSingleService />
            <IconSingleService />
          </Divider>
          <AuthorDetails author={author} />
          <NewsletterSignup>
            <h3>Stay in our orbit</h3>
            <p>
              Sign up for our mailing list and get updates on products, events,
              and more. Oh, and no junk mail. Ever.
            </p>
            <InputRow>
              <EmailInput placeholder="Your email address" />
              <LargeButton color={colors.indigo.dark}>Subscribe</LargeButton>
            </InputRow>
          </NewsletterSignup>
        </Main>
        <Sidebar>
          <PostSidebarWrapper>
            <NewsletterForm />
            <SidebarSection>
              <SectionHeading>Share article</SectionHeading>
              <SocialIcons>
                <SocialIcon href="#">
                  <IconTwitter />
                </SocialIcon>
                <SocialIcon href="#">
                  <IconFacebook />
                </SocialIcon>
                <SocialIcon href="#">
                  <IconLinkedin />
                </SocialIcon>
                <SocialIcon href="#">
                  <IconSlack />
                </SocialIcon>
                <SocialIcon href="#">
                  <IconEmail />
                </SocialIcon>
              </SocialIcons>
            </SidebarSection>
          </PostSidebarWrapper>
          <PostActionWrapper>
            <PostAction>
              <h3>Don&apos;t miss GraphQL Summit 2020!</h3>
              <p>
                Get your ticket now for an earlybird price of just $45! Rates
                will increase on Feb 1, 2020.
              </p>
              <LargeButton
                color={colors.white}
                style={{color: colors.indigo.dark}}
              >
                Buy tickets
              </LargeButton>
            </PostAction>
          </PostActionWrapper>
        </Sidebar>
      </InnerWrapper>
    </Layout>
  );
}

PostTemplate.propTypes = {
  data: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query PostQuery($id: ID!) {
    wordpress {
      post(id: $id) {
        date
        title
        content
        author {
          name
          description
          avatar {
            url
          }
          userMetadata {
            title
            twitter
          }
        }
        categories {
          nodes {
            id
            slug
            name
          }
        }
        featuredImage {
          sourceUrl(size: LARGE)
        }
      }
    }
  }
`;
