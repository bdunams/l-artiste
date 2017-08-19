"use strict";

var should = require("chai").should();
var search = require("../routes/search");

describe("Search", function() {
  it("should throw when passed numbers", function() {
    (function() {
      search("P1ca550");
    }).should.throw(Error);
  });
});
