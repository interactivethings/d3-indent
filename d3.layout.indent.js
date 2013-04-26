(function() {
  d3.layout.indent = function() {
    var hierarchy = d3.layout.hierarchy(),
        dx = d3.functor(1),
        dy = d3.functor(1);

    function position(node, y) {
      var children = node.children;
      node.y = y += dy.call(this, node);
      node.x = node.depth * dx.call(this, node);
      if (children && (n = children.length)) {
        var i = -1,
            n;
        while (++i < n) {
          y = position(children[i], y);
        }
      }
      return y;
    }

    function indent(d, i) {
      var nodes = hierarchy.call(this, d, i);
      position(nodes[0], -dy.call(this, nodes[0]));
      return nodes;
    }

    // Accessor for the x-increment of each depth level
    indent.dx = function(value) {
      if (!arguments.length) return dx;
      dx = d3.functor(value);
      return indent;
    };

    // Accessor for the y-increment of each node
    indent.dy = function(value) {
      if (!arguments.length) return dy;
      dy = d3.functor(value);
      return indent;
    };

    return d3_layout_hierarchyRebind(indent, hierarchy);
  };

  // A method assignment helper for hierarchy subclasses.
  function d3_layout_hierarchyRebind(object, hierarchy) {
    d3.rebind(object, hierarchy, "sort", "children", "value");

    // Add an alias for nodes and links, for convenience.
    object.nodes = object;
    object.links = d3_layout_hierarchyLinks;

    return object;
  }

  // Returns an array source+target objects for the specified nodes.
  function d3_layout_hierarchyLinks(nodes) {
    return d3.merge(nodes.map(function(parent) {
      return (parent.children || []).map(function(child) {
        return {source: parent, target: child};
      });
    }));
  }
})();