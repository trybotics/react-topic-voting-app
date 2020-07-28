/**
 * This file is supposed to export a request handler, which implements server-side rendering in a Node.js runtime
 * environment.
 * 
 * In production, the request handler may be imported by an executable node script, which sets up an express server.
 * A sample script is provided in `react-scripts-with-ssr/scripts/serve.js`, which you may start with `npm run serve`
 * to test your production builds of the request handler. That script however is not part of the compilation. It is up
 * to you to implement, how the request handler is integrated in your server-side infrastructure.
 * 
 * This file may also export a function called `devServerHandler`, which is supposed to return a request handler for
 * the development environment. That request handler is plugged into the local webpack dev server started by `npm start`.
 */
import React from 'react'
import express from 'express'
import thunk from "redux-thunk"
import * as fs from 'fs'
import * as path from 'path'
import axios from 'axios'
import serialize from 'serialize-javascript'
import { Provider } from "react-redux"
import { StaticRouter } from "react-router-dom"
import { renderToNodeStream, renderToString } from 'react-dom/server'
import { ServerStyleSheets } from '@material-ui/core/styles'
import { createStore, applyMiddleware } from "redux"
import { getJsonLD } from "./utils/json-ld"
import App from "./App"
import reducers from "./reducers"
import config from './config.json'
var apiRoot = config.api.root
// var apiRoot = 'http://localhost:8080'
var rootURL = config.rootURL

let initialStore = Object.assign(createStore(reducers, {}, applyMiddleware(thunk)).getState())

let defaultImg = `${rootURL}/logo512.jpg`
let defaultKeywords = 'Topic, Topic Voting, Voting'.split(',')
let pages = {
  home: {
    type: `website`,
    title: `Home`,
    description: `Online Topic Voting`,
    image: defaultImg,
    keywords: defaultKeywords,
    rootURL: rootURL
  },
  ad: {
    type: `website`,
    title: `Topic`,
    description: `Post online Topic for voting. Get topic voting result.`,
    image: defaultImg,
    keywords: defaultKeywords,
    rootURL: rootURL
  },
  faq: {
    type: `website`,
    title: `FAQ`,
    description: `Frequently asked questions (FAQ)`,
    image: defaultImg,
    keywords: defaultKeywords,
    rootURL: rootURL
  }
}

// provide a way to emulate fs access in development mode when builds are served from in-memory
let readFileSync = fs.readFileSync

const router = express.Router()

// serve static files from build/ dir
router.use(express.static(
  'build',
  {
    // do not send index.html for '/'
    index: false
  }
))

// serve sitemap
router.get('/:type/sitemap/:name', function (req, res) {
  axios.get(apiRoot + ['', req.params.type, 'sitemap', req.params.name].join('/'))
    .then(result => {
      res.header('Content-Type', 'application/xml')
      res.send(result.data)
    })
    .catch(error => {
      console.log('error', error)
      res.status(404).send()
    })
})

// define ssr path pattern, exclude file and hmr requests
const ssrRegex = /^\/(?!static|favicon\.ico|.*hot-update\.js).*/

// do server-side rendering
router.use(ssrRegex, async (request, response, next) => {
  let page = await getPageInitialData(request, response)
  if (page) {
    const sheets = new ServerStyleSheets()
    const store = createStore(reducers, page.store, applyMiddleware(thunk))
    const jsx = sheets.collect(
      <Provider store={store}>
        <StaticRouter location={request.baseUrl} context={{}}>
          <App />
        </StaticRouter>
      </Provider>
    )
    renderToString(jsx)
    const template = readFileSync('build/index.html')
      .toString()
      .replace(/%PUBLIC_URL%/g, page.rootURL)
      .replace(/%TYPE%/g, page.type)
      .replace(/%TITLE%/g, page.title)
      .replace(/%DESCRIPTION%/g, page.description)
      .replace(/%URL%/g, page.url)
      .replace(/%IMAGE%/g, page.image)
      .replace(/%KEYWORDS%/g, page.keywords)
      .replace(/%CSS%/g, sheets.toString())
      .replace(/%JSONLD%/g, page.jsonLD)
      .replace(/% __INITIAL_STATE__ %/g, serialize(page.store))
    const [head, tail] = template.split('<div class="loader"></div>')
    response.type('html')
    response.write(head)
    const stream = renderToNodeStream(jsx)
    stream.pipe(response, { end: false })
    stream.on("end", () => {
      response.write(tail)
      response.end()
    })
  }
})

async function getPageInitialData(request, response) {
  let url = request.baseUrl
  let page = { ...pages['home'], url: rootURL + url, store: JSON.parse(JSON.stringify(initialStore)) }
  page.jsonLD = getJsonLD({ pageType: 'home', ...page })
  let urls = url.split('/')
  if (urls.length == 2) {
    url = request.query.search ? apiRoot + '/api' + url + '?limit=6&skip=0&search=' + request.query.search : apiRoot + '/api' + url + '?limit=6&skip=0'
  } else if (urls.length == 3) {
    url = apiRoot + '/api' + url
  }
  try {
    if (urls.length == 2 && ['topic'].includes(urls[1])) {
      let result = await axios.get(url)
      page.store[urls[1] + 'State'][urls[1] + 's'] = result.data
      page = { ...page, ...pages[urls[1]] }
      return page
    } else if (urls.length >= 3 && ['topic'].includes(urls[1])) {
      let result = await axios.get(url)
      let data = urls[1] == result.data[0]
      if (data) {
        if (data.id == urls[2]) {
          page.store[urls[1] + 'State'][urls[1] + 's'] = [data]
          page = {
            ...page,
            ...pages[urls[1]],
            title: (data.meta ? (data.meta['og:title'] ? data.meta['og:title'].split('|')[0] : data.title) : data.title).replace(/"/gi, "'").replace(/\s+/gi, " ").trim(),
            description: (data.meta ? (data.meta['og:description'] ? data.meta['og:description'] : data.description) : data.description).replace(/"/gi, "'").replace(/\s+/gi, " ").trim(),
            image: data.imageUrl ? data.imageUrl : data.logo ? data.logo : page.img,
            type: `article`
          }
          page.jsonLD = getJsonLD({ ...page, pageType: urls[1] })
          return page
        } else {
          response.writeHead(301, { Location: rootURL + '/' + urls[1] + '/' + data.id });
          response.end();
          return null
        }
      } else {
        response.writeHead(301, { Location: rootURL + '/' + urls[1] });
        response.end();
        return null
      }
    } else {
      return page
    }
  } catch (error) {
    console.log('error', error)
    response.writeHead(301, { Location: rootURL + '/' + urls[1] });
    response.end();
    return null
  }
}

/**
 * Export a request handler. This can be plugged into an express instance or deployed as a serverless function.
 * An express router itself implements the request handler interface (composite design pattern).
 */
export default router;

/**
 * Supposed to return a request handler which can be plugged into a webpack dev server during development.
 * This function should return a somehow altered or decorated version of the 'export default' request handler,
 * which handles differences between development and production environment.
 * @param compiler webpack compiler which compiles the ssr entry point
 */
export const devServerHandler = compiler => {
  // redirect file access to use in-memory fs of the compiler
  readFileSync = fileName =>
    compiler.outputFileSystem.readFileSync(
      path.resolve(
        // handlers should expect files in build/ but the dev server writes them to dist/
        fileName.replace('build', 'dist')
      )
    );

  // ignore in-memory file requests, will be handled by the webpack dev middleware
  const devServerRouter = express.Router();
  devServerRouter.use(ssrRegex, router);
  return devServerRouter;
};