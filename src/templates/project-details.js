import React from "react"
import Layout from "../components/Layout"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as styles from "../styles/project-details.module.css"
import { graphql } from "gatsby"

export default function ProjectDetails({ data }) {
  const { html } = data.markdownRemark
  const { title } = data.markdownRemark.frontmatter
  const featuredImage = getImage(
    data.markdownRemark.frontmatter.featuredImg.childImageSharp.gatsbyImageData
  )
  return (
    <Layout>
      <div className={styles.details}>
        <h2>{title}</h2>
        <div className={styles.featured}>
          <GatsbyImage image={featuredImage} alt="Banner" />
        </div>
        <div
          className={styles.html}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query ProjectDetails($slug: String) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        featuredImg {
          childImageSharp {
            gatsbyImageData(
              layout: FULL_WIDTH
              placeholder: BLURRED
              formats: [AUTO, AVIF]
            )
          }
        }
      }
    }
  }
`