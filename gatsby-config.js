/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: `Sandwich Studio`,
    description: `Sandwich studio agency website`,
  },
  plugins: [
    "gatsby-plugin-styled-components",
    "gatsby-plugin-svgr",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-transition-link",
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `SandwichStudio`,
    //     short_name: `SandwichStudio`,
    //     start_url: `/`,
    //     background_color: `#0D0D0D`,
    //     theme_color: `#0D0D0D`,
    //     display: `standalone`,
    //     icon: "/static/favicon.png",
    //   },
    // },
    "gatsby-plugin-offline",
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          // "G-PQLE6Z6ZHY", // Google Analytics / GA
          "GTM-PXRNVGQ" // GTAG
        ],
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: false,
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/static/locales`,
        name: `locale`,
      },
    },
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        localeJsonSourceName: `locale`, // name given to `gatsby-source-filesystem` plugin.
        languages: [`fr`],
        defaultLanguage: `fr`,
        siteUrl: `http://sandwichstudio.fr/`,
        // you can pass any i18next options
        // pass following options to allow message content as a key
        i18nextOptions: {
          interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
          },
          keySeparator: false,
          nsSeparator: false,
        },
      },
    },
  ],
}
