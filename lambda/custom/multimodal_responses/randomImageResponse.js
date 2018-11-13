/*
 * Copyright 2018 Amazon.com, Inc. and its affiliates. All Rights Reserved.
 * 
 * Licensed under the Amazon Software License (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 * 
 * http: //aws.amazon.com/asl/
 * 
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

const data = require('../data/images.json');
const TranscriptDirective = require('../documents/transcript');

module.exports = (handlerInput, text) => {
  const attributes = handlerInput.attributesManager.getSessionAttributes();
  const resource = attributes.imageResource || data[Math.round(Math.random() * data.length)];

  resource.source = 'NASA';

  const { location } = attributes;

  if (
    attributes.previousLocation &&
    attributes.previousLocation[attributes.previousLocation.length - 1] !== location
  ) {
    attributes.previousLocation.push(location);
  }

  attributes.location = 'apod';
  attributes.imageResource = resource;

  handlerInput.attributesManager.setSessionAttributes(attributes);

  return handlerInput.responseBuilder
    .addDirective(TranscriptDirective(resource))
    .speak(text)
    .getResponse();
};
