exports.createPages = async ({actions, graphql}) => {
  const {data} = await graphql(`
    {
      wordpress {
        posts(first: 100) {
          nodes {
            id
            slug
          }
        }
      }
    }
  `);

  const postTemplate = require.resolve('./src/components/post-template');
  data.wordpress.posts.nodes.forEach(post => {
    actions.createPage({
      path: '/' + post.slug,
      component: postTemplate,
      context: {
        id: post.id
      }
    });
  });
};
