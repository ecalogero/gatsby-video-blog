//index.js
import React from "react"
import {Link, StaticQuery, graphql} from 'gatsby'
import Layout from '../components/layout'
import './index.css'

export default ({data}) => {
  const posts = data.allMdx.edges
  return (
      <Layout>
          <div>
              <header>
                  <h2>Let's place video memes here!</h2>
              </header>
              <div>
                  {posts.map(({node}, index)=> (
                      <Link to={node.fields.route} style={{textDecoration:'none', color:  'inherit'}} key={index}>
                          <div className="post-item">
                              <h3 className="post-title">{node.frontmatter.title}</h3>
                              <p className="post-excerpt">{node.excerpt}</p>
                              <p className="post-date">{node.frontmatter.date}</p>
                          </div>
                      </Link>
                  ))}
              </div>
          </div>
      </Layout>
  )
}

export const query = graphql`query PageList{
  allMdx(sort: { fields: [frontmatter___date], order: DESC }){
      edges{
          node{
              fields {
                  route
              }
              frontmatter{
                  title
                  date
              }
              timeToRead
              excerpt
          }
      }
  }
}`
