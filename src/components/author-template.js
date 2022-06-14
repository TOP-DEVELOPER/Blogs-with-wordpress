import ArchivePost from './archive-post';
import Helmet from 'react-helmet';
import Layout from './layout';
import NewsletterForm, {useNewsletterForm} from './newsletter-form';
import PropTypes from 'prop-types';
import React from 'react';
import {InnerWrapper, Main, SectionHeading, Sidebar} from './ui';
import {graphql} from 'gatsby';

export default function AuthorTemplate(props) {
  const newsletterFormProps = useNewsletterForm();
  const {name} = props.data.wpUser;
  return (
    <Layout>
      <Helmet>
        <title>{name}</title>
        <meta
          name="description"
          content={`More posts by ${name} | ${props.data.wp.generalSettings.description}`}
        />
        <meta property="og:title" content={name} />
        <meta name="twitter:title" content={name} />
      </Helmet>
      <SectionHeading>Posts by {name}</SectionHeading>
      <InnerWrapper>
        <Main>
          {props.data.allWpPost.nodes.map(post => (
            <ArchivePost key={post.id} post={post} />
          ))}
        </Main>
        <Sidebar>
          <NewsletterForm {...newsletterFormProps} />
        </Sidebar>
      </InnerWrapper>
    </Layout>
  );
}

AuthorTemplate.propTypes = {
  data: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query AuthorQuery($id: String) {
    wp {
      generalSettings {
        description
      }
    }
    wpUser(id: {eq: $id}) {
      name
    }
    allWpPost(filter: {author: {node: {id: {eq: $id}}}}) {
      nodes {
        id
        date
        excerpt
        title
        path
        featuredImage {
          node {
            localFile {
              childImageSharp {
                original {
                  src
                }
              }
            }
          }
        }
        categories {
          nodes {
            id
            name
            path
          }
        }
        author {
          node {
            name
            slug
            avatar {
              url
            }
            userMetadata {
              title
              avatarId {
                localFile {
                  childImageSharp {
                    original {
                      src
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
