import Byline from '../components/byline';
import FollowUs from '../components/follow-us';
import Layout from '../components/layout';
import NewsletterForm from '../components/newsletter-form';
import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import {
  Category,
  DateText,
  ExcerptText,
  InnerWrapper,
  Main,
  PostImage,
  SectionHeading,
  Sidebar,
  SidebarSection,
  TopFold
} from '../components/ui';
import {IconBookmark} from '@apollo/space-kit/icons/IconBookmark';
import {IconTime} from '@apollo/space-kit/icons/IconTime';
import {Link, graphql} from 'gatsby';
import {colors} from '@apollo/space-kit/colors';

const HeadingLink = styled(Link)({
  color: 'inherit',
  textDecoration: 'none',
  ':hover': {
    color: colors.indigo.base
  }
});

const FeaturedPost = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  marginBottom: 124
});

const PostLink = styled(Link)({
  display: 'block',
  textDecoration: 'none',
  color: 'inherit',
  img: {
    transition: 'transform 100ms ease-in-out'
  },
  ':hover': {
    h4: {
      color: colors.indigo.base
    },
    img: {
      transform: 'scale(1.032)'
    }
  }
});

const RecentPosts = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  margin: '-30px -15px',
  marginBottom: 90
});

const RecentPost = styled.div({
  width: '50%',
  padding: '30px 15px'
});

const PostCategories = styled.div({
  display: 'flex',
  [Category]: {
    marginRight: 12
  }
});

const StyledSectionHeading = styled(SectionHeading)({
  marginBottom: 48
});

const ArchivePosts = styled.div({
  marginBottom: 120
});

const ArchivePost = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  ':not(:last-child)': {
    marginBottom: 40
  }
});

const CategoryNav = styled.div({
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

export default function Index(props) {
  const {posts, categories} = props.data.wordpress;
  const [featuredPost, ...otherPosts] = posts.nodes;
  const recentPosts = otherPosts.slice(0, 4);
  const archivePosts = otherPosts.slice(4);
  return (
    <Layout>
      <TopFold>
        <DateText style={{marginBottom: 12}} date={featuredPost.date} />
        <h2>
          <HeadingLink to={'/' + featuredPost.slug}>
            {featuredPost.title}
          </HeadingLink>
        </h2>
      </TopFold>
      <InnerWrapper>
        <Main>
          <FeaturedPost>
            <PostLink to={'/' + featuredPost.slug}>
              <PostImage
                style={{height: 240}}
                src={featuredPost.featuredImage.sourceUrl}
              />
              <ExcerptText
                style={{marginBottom: 24}}
                excerpt={featuredPost.excerpt}
              />
            </PostLink>
            <Byline author={featuredPost.author} />
          </FeaturedPost>
          <StyledSectionHeading>
            <IconTime />
            Recent
          </StyledSectionHeading>
          <RecentPosts>
            {recentPosts.map(post => (
              <RecentPost key={post.id}>
                <PostLink to={'/' + post.slug}>
                  <PostImage
                    style={{height: 160}}
                    src={post.featuredImage.sourceUrl}
                  />
                  <DateText date={post.date} />
                  <h4>{post.title}</h4>
                  <ExcerptText excerpt={post.excerpt} />
                </PostLink>
                <PostCategories>
                  {post.categories.nodes.map(category => (
                    <Category key={category.id} size="small">
                      {category.name}
                    </Category>
                  ))}
                </PostCategories>
              </RecentPost>
            ))}
          </RecentPosts>
          <StyledSectionHeading>
            <IconBookmark />
            Archive
          </StyledSectionHeading>
          <ArchivePosts>
            {archivePosts.map(post => (
              <ArchivePost key={post.id}>
                <DateText date={post.date} />
                <h4>
                  <HeadingLink to={'/' + post.slug}>{post.title}</HeadingLink>
                </h4>
                <Byline mini author={post.author} />
              </ArchivePost>
            ))}
          </ArchivePosts>
        </Main>
        <Sidebar>
          <NewsletterForm />
          <FollowUs />
          <SidebarSection>
            <SectionHeading>Categories</SectionHeading>
            <CategoryNav>
              {categories.nodes.map(category => (
                <Category key={category.id}>{category.name}</Category>
              ))}
            </CategoryNav>
          </SidebarSection>
        </Sidebar>
      </InnerWrapper>
    </Layout>
  );
}

Index.propTypes = {
  data: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  {
    wordpress {
      posts {
        nodes {
          date
          excerpt
          title
          slug
          featuredImage {
            sourceUrl(size: LARGE)
          }
          categories {
            nodes {
              slug
              id
              name
            }
          }
          author {
            name
            description
            avatar {
              url
            }
          }
        }
      }
      categories {
        nodes {
          id
          slug
          name
        }
      }
    }
  }
`;
