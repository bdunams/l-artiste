"use strict";

var should = require("chai").should();
var signup = require("../routes/signup");

describe("Signup", function() {

	it("should throw if passed nothing", function() {
		(function() {
			signup("");
		}).should.throw(Error);
	});

	it("should throw if not passed an email", function() {
		(function() {
			signup("monet");
		}).should.throw(Error);
	});

	it("should throw if passed numbers", function() {
		(function() {
			signup("pa55w0rd")
		}).should.throw(Error);
  	});
});