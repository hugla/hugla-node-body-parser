const bodyParser = require('body-parser');

/**
 * HuglaBodyParser - hugla web framework's node back-end body parser module
 */
export default class HuglaBodyParser {
  /**
   * Class constructor
   * @param {object} app Hugla app
   * @param {object} app.config Configuration object
   * @param {object} app.config.bodyParser body parser config object
   */
  constructor(app) {
    this.config = app.config.bodyParser || {};

    const http = app.getModule('hugla-http');
    http.addMiddlewareSetupAction(this.middlewareSetup.bind(this));
  }

  /**
   * Middleware setup method
   *
   * @param {object} app Express app
   */
  middlewareSetup(app) {
    if (this.config.urlencoded) {
      app.use(bodyParser.urlencoded({ extended: false }));
    }

    if (this.config.json) {
      app.use(bodyParser.json());
    }
  }
}
