'use strict';

import { createServer } from 'http'
import { createStore } from 'redux'
import { parse as parseURL } from 'url'

const server = createServer();

const createMux = (req, res) => {
  return (state = {}, action) => {

    console.log(action);

    return {
      req,
      res
    }
  }
}

const onRequest = (req, res) => {
  const mux = createMux(req, res)
  const store = createStore(mux)

  const url = parseURL(req.url)

  store.dispatch({
    type: 'REQUEST',
    method: req.method,
    pathname: url.pathname
  })

  res.end('ok');
}
server.on('request', onRequest);

server.listen(5788, () => {
  console.log('Listening on http://localhost:5788')
})
