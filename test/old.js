"use strict";

const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const expect = chai.expect;
chai.use(sinonChai);

const HuglaBodyParser = require('./../index.js');

describe('HuglaBodyParser', function() {

  it("should call app#getModule with 'hugla-http' parameter", function() {
    const app = { config: {} };
    app.getModule = sinon.spy(function() {
      return { addMiddlewareSetupAction: function() {} };
    });
    const huglaBodyParser = new HuglaBodyParser(app);
    expect(app.getModule).to.have.been.calledWithExactly('hugla-http');
  });

  it("should call http#addMiddlewareSetupAction", function() {
    const spy = sinon.spy();
    const app = { config: {} };
    app.getModule = function() {
      return { addMiddlewareSetupAction: spy };
    };
    const huglaBodyParser = new HuglaBodyParser(app);
    expect(spy).to.have.been.called;
  });

  describe('#middlewareSetup()', function() {

    it('should not call app#use if no configs are provided', function() {
      const app = { config: {} };
      app.getModule = function() {
        return { addMiddlewareSetupAction: function() {} };
      };
      const spied = {};
      spied.use = sinon.spy();
      const huglaBodyParser = new HuglaBodyParser(app);
      huglaBodyParser.middlewareSetup(spied);
      expect(spied.use).to.have.not.been.called;
    });

    it('should call app#use once if urlencoded config is provided', function() {
      const app = { config: { bodyParser: { urlencoded: true } } };
      app.getModule = function() {
        return { addMiddlewareSetupAction: function() {} };
      };
      const spied = {};
      spied.use = sinon.spy();
      const huglaBodyParser = new HuglaBodyParser(app);
      huglaBodyParser.middlewareSetup(spied);
      expect(spied.use).to.have.callCount(1);
    });

    it('should call app#use once if json config is provided', function() {
      const app = { config: { bodyParser: { json: true } } };
      app.getModule = function() {
        return { addMiddlewareSetupAction: function() {} };
      };
      const spied = {};
      spied.use = sinon.spy();
      const huglaBodyParser = new HuglaBodyParser(app);
      huglaBodyParser.middlewareSetup(spied);
      expect(spied.use).to.have.callCount(1);
    });

    it('should call app#use twice if json and urlencoded configs are provided', function() {
      const app = { config: { bodyParser: { json: true, urlencoded: true } } };
      app.getModule = function() {
        return { addMiddlewareSetupAction: function() {} };
      };
      const spied = {};
      spied.use = sinon.spy();
      const huglaBodyParser = new HuglaBodyParser(app);
      huglaBodyParser.middlewareSetup(spied);
      expect(spied.use).to.have.callCount(2);
    });

  });
});
