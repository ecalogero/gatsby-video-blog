/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-remark-embed-video",
      options: {
          width: 800,
          ratio: 1.77, 
          height: 400, 
          related: false,
          noIframeBorder: true
      },
  },{
    resolve: `gatsby-remark-images`,             options: {
      maxWidth: 590,
    },
  },
  {
    resolve: `gatsby-remark-responsive-iframe`,
    options: {
      wrapperStyle: `margin-bottom: 1.0725rem`,
    },
  },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
              name: `src`,
              path: `${__dirname}/src/`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options:{
                name: `posts`,
                path: `${__dirname}/src/posts/`
            }
        },
        {
            resolve: `gatsby-plugin-typography`,
            options:{
                pathToConfigModule: `src/utils/typography.js`
            }
        },
        {
          resolve: "gatsby-plugin-page-creator",
          options: {
            path: `${__dirname}/src/posts`,
          },
        },
        `gatsby-plugin-mdx`,
  ],
  siteMetadata: {
    title: `Erica Calogero's Blog`,
},
}
