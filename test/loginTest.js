"use strict";

var should = require("chai").should();
var login = require("../routes/login");

describe("Login", function() {
	it("should throw if not passed an email", function() {
		(function() {
			login("monet");
		}).should.throw(Error);
	});

	it("should throw if passed numbers", function() {
		(function() {
			login("p1ca550");
		}).should.throw(Error);
	});

	it("should throw if passed nothing", function() {
		(function() {
			login("");
		}).should.throw(Error);
	});
});