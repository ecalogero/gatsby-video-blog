import React from "react";
import Layout from "./layout";
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

export default ({ data }) => {
  return (
    <Layout>
      <div>
        <header>
          <h1 className="article-title">{data.mdx.frontmatter.title}</h1>
        </header>

        <div>
          <MDXRenderer>{data.mdx.body}</MDXRenderer>
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
