// const componentWithMDXScope = require("gatsby-mdx/component-with-mdx-scope")
var path = require("path")
var { createFilePath } = require("gatsby-source-filesystem")

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === "Mdx") {
    const route = createFilePath({ node, getNode, basePath: "posts" })
    createNodeField({
      node,
      name: "slug",
      value: route,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allMdx {
              edges {
                node {
                  fields {
                    slug
                  }
                  id
                  parent {
                    ... on File {
                      name
                      sourceInstanceName
                    }
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allMdx.edges;

        posts.forEach(({ node }, index) => {
          createPage({
            path: node.fields.slug,
            component: path.resolve("./src/components/post-layout.js"),
            context: {
              id: node.id,
              postRoute: node.fields.slug,
            },
          })
        })
      })
    )
  })
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
  })
  if (stage === "build-html" || stage === `develop-html`) {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /cld-video-player/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
