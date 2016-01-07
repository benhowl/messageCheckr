_ = require('lodash');

var validateParams = function (params){

  if(!_.has(params, 'type')){
    throw new Error('messageCheckr requires the property "type" as part of the "params" argument');
  }

  if(!_.has(params, 'actualMsg')){
    throw new Error('messageCheckr requires the property "actualMsg" as part of the "params" argument');
  }

  if(!_.has(params, 'expectedMsg')){
    throw new Error('messageCheckr requires the property "expectedMsg" as part of the "params" argument');
  }

  if(!_.has(params, 'expectedRootElement') && params.type === 'jms'){
    throw new Error('messageCheckr requires the property "expectedRootElement" as part of the "params" argument');
  }
};

module.exports = validateParams;

