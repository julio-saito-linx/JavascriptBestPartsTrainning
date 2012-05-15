/**
 * Created with JetBrains WebStorm.
 * User: jsaito
 * Date: 15/05/12
 * Time: 17:01
 * To change this template use File | Settings | File Templates.
 */
var registerIoc = function define(name, dependencies, moduleFactory) {
  window.modules = window.modules || {};
  window.modules[name] = {
    'moduleFactory': moduleFactory || dependencies,
    'dependencies': typeof(moduleFactory) == 'undefined' ? [] : dependencies
  };
};

var resolve = function resolve(name) {
  var module = window.modules[name],
    deps = [];
  for (var i = 0; i < module.dependencies.length; i++) {
    deps.push(resolve(module.dependencies[i]));
  }

  return module.moduleFactory.apply(this, deps);
};

