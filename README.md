# d3.layout.indent

An indented tree layout for [D3](http://d3js.org), commonly used for hierarchical lists, e.g. file directories.

## Usage

On top of D3's usual hierarchical layout methods `sort()`, `children()`, and `value()` (see [D3 API documentation](https://github.com/mbostock/d3/wiki/Hierarchy-Layout)), d3.layout.indent implements `dx()` and `dy()` which are used to specify the x and y increment between nodes.

Per default, both x and y increment by 1:

```javascript
var indent = d3.layout.indent();
var tree = {id: "root", children: [{id: "child1"}, {id: "child2"}]};
var nodes = indent.nodes(tree); // -> [{id:"root", x: 0, y: 0}, {id: "child1", x: 1, y: 1}, {id: "child2", x: 1, y: 2}]
```

You can use numerical values or functions as arguments for `dx()` and `dy()`:

```javascript
var indent = d3.layout.indent()
  .dx(10)
  .dy(function(d) { return d.children ? 20 : 10; });
var tree = {id: "root", children: [{id: "child1"}, {id: "child2", children: [{id: "child21"}]}]};
var nodes = indent.nodes(tree); // -> [{id:"root", x: 0, y: 0}, {id: "child1", x: 10, y: 10}, {id: "child2", x: 10, y: 30}, {id: "child21", x: 20, y: 40}]
```

## Examples

* Demo: http://bl.ocks.org/herrstucki/5467720
* Social Progress Index: http://www.socialprogressimperative.org/data/spi 

## Author

Jeremy Stucki, [Interactive Things](http://interactivethings.com)

## License

BSD, see LICENSE.txt
