var vows = require('vows'),
    assert = require('assert');

d3 = require('d3');

var indent = require("../d3.layout.indent.js");

vows.describe('d3.layout.indent').addBatch({
  'indented tree layout' : {
    topic: function() { return d3.layout.indent; },
    'increments x and y by 1 per default': function(indent) {
      var l = indent();
      var tree = {id: "root", children: [{id: "one", children: [{id: "one.one"}]}, {id: "two"}]}

      assert.deepEqual(l.nodes(tree).map(layout), [
        {x: 0, y: 0},
        {x: 1, y: 1},
        {x: 2, y: 2},
        {x: 1, y: 3}
      ]);
    },
    'defined nodeSize': function(indent) {
      var l = indent()
        .nodeSize([20, 10]);
      var tree = {id: "root", children: [{id: "one", children: [{id: "one.one"}]}, {id: "two"}]}

      assert.deepEqual(l.nodes(tree).map(layout), [
        {x: 0, y: 0},
        {x: 20, y: 10},
        {x: 40, y: 20},
        {x: 20, y: 30}
      ]);
    },
    'nodeSize and separation': function(indent) {
      var l = indent()
        .nodeSize([10, 10])
        .separation(function(a, b) {
          return a.parent === b.parent ? 1 : 2;
        });
      var tree = {id: "root", children: [{id: "one", children: [{id: "one.one"}, {id: "one.two"}]}, {id: "two"}]}

      assert.deepEqual(l.nodes(tree).map(layout), [
        {x: 0, y: 0},
        {x: 10, y: 20},
        {x: 20, y: 40},
        {x: 20, y: 50},
        {x: 10, y: 70}
      ]);
    },
    'different separation': function(indent) {
      var l = indent()
        .nodeSize([10, 10])
        .separation(function(a, b) {
          return a.children ? 2 : 1;
        });
      var tree = {id: "root", children: [{id: "one", children: [{id: "one.one"}, {id: "one.two"}]}, {id: "two"}]}

      assert.deepEqual(l.nodes(tree).map(layout), [
        {x: 0, y: 0},
        {x: 10, y: 20},
        {x: 20, y: 30},
        {x: 20, y: 40},
        {x: 10, y: 50}
      ]);
    }
  }
}).export(module);

function layout(node) {
  return {
    x: node.x,
    y: node.y
  };
}