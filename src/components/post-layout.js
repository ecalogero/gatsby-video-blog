import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

export default ({ data: {mdx} }) => {
  return (
    <Layout>
      <div>
        <header>
          <h1 className="article-title">{mdx.frontmatter.title}</h1>
        </header>

        <div>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($postRoute: String!) {
    mdx(fields: { slug: { eq: $postRoute } }) {
      frontmatter {
        title
      }
      fields {
        slug
      }
      rawBody
      internal {
        content
      }
      body
    }
  }
`
