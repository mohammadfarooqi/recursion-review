// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  //stores nodes in arr
  var result = [];

  //findNodes takes a node element as a param and keeps
  //iterating recursively until there is no other children
  var findNodes = function(node) {
    //create an array with split classNames and check
    //if the className param from outter func is in the
    //node's className attr
    if (node.className.split(' ').indexOf(className) > -1)
      result.push(node);

    //iterate through each child of node and call
    //findNodes to check children of inner nodes
    for (var i = 0; i < node.children.length; i++) {
      findNodes(node.children[i]);
    }
  };

  //init call
  findNodes(document.body);

  return result;
};
