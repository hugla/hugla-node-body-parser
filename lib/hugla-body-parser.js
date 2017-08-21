'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * HuglaBodyParser - hugla web framework's node back-end body parser module
 */
var HuglaBodyParser = function () {
  /**
   * Class constructor
   * @param {object} app Hugla app
   * @param {object} app.config Configuration object
   * @param {object} app.config.bodyParser body parser config object
   */
  function HuglaBodyParser(app) {
    _classCallCheck(this, HuglaBodyParser);

    this.config = app.config.bodyParser || {};

    var http = app.getModule('hugla-http');
    http.addMiddlewareSetupAction(this.middlewareSetup.bind(this));
  }

  /**
   * Middleware setup method
   *
   * @param {object} app Express app
   */


  _createClass(HuglaBodyParser, [{
    key: 'middlewareSetup',
    value: function middlewareSetup(app) {
      if (this.config.urlencoded) {
        app.use(_bodyParser2.default.urlencoded({ extended: false }));
      }

      if (this.config.json) {
        app.use(_bodyParser2.default.json());
      }
    }
  }]);

  return HuglaBodyParser;
}();

exports.default = HuglaBodyParser;