var vows = require('vows'),
    assert = require('assert');

d3 = require('d3');

var indent = require("../d3.layout.indent.js");

vows.describe('d3.layout.indent').addBatch({
  'indented tree layout' : {
    topic: function() { return d3.layout.indent; },
    'increments x and y by 15 per default': function(indent) {
      var l = indent();
      var tree = {id: "root", children: [{id: "one", children: [{id: "one.one"}]}, {id: "two"}]}

      assert.deepEqual(l.nodes(tree).map(layout), [
        {x: 0, y: 0},
        {x: 1, y: 1},
        {x: 2, y: 2},
        {x: 1, y: 3}
      ]);
    },
    'accepts dx and dy scalars': function(indent) {
      var l = indent()
        .dx(20)
        .dy(10);
      var tree = {id: "root", children: [{id: "one", children: [{id: "one.one"}]}, {id: "two"}]}

      assert.deepEqual(l.nodes(tree).map(layout), [
        {x: 0, y: 0},
        {x: 20, y: 10},
        {x: 40, y: 20},
        {x: 20, y: 30}
      ]);
    },
    'accepts dx and dy functions': function(indent) {
      var l = indent()
        .dx(function(d) { return 10; })
        .dy(function(d) { return d.children ? 20 : 10; });
      var tree = {id: "root", children: [{id: "one", children: [{id: "one.one"}]}, {id: "two"}]}

      assert.deepEqual(l.nodes(tree).map(layout), [
        {x: 0, y: 0},
        {x: 10, y: 20},
        {x: 20, y: 30},
        {x: 10, y: 40}
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