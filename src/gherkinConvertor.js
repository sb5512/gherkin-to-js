let fs = require("fs"),
  path = require("path");

const KeywordsEnum = {
  SCENARIO: "scenario",
  FEATURE: "feature",
  GIVEN: "given",
  WHEN: "when",
  AND: "and",
  THEN: "then"
};

// Let us create the relevant folder if they do not exist

// Read the feature file and process the
function readFile() {
  let filePath = path.join(
    __dirname,
    "../integration/onboarding/sales.feature"
  );
  fs.readFile(filePath, { encoding: "utf-8" }, function(err, data) {
    if (err) {
      console.log(err);
      throw err;
    }
    let content = data;
    processFile(content);
  });
}

export default function convertGherkin(content) {
  return processFile(content)
    .filter(Boolean)
    .join("\n\n");
}

function processFile(content) {
  let textByLine = content.split("\n");
  console.log(textByLine);
  let hasThenAlready = false;
  let transformedToCode = textByLine.map(feature => {
    // clean the text with escape character and extract the command
    let { featureText, command } = textCleanExtract(feature);
    console.log("OHOOOOOOOOOO", featureText, command);

    // Create code
    if (command === "then") hasThenAlready = true;
    return _createCode(featureText, command, hasThenAlready);
  });

  console.log(transformedToCode);
  return transformedToCode;
  // write to file
  //   _writeToFile(transformedToCode);
}

function textCleanExtract(text) {
  let regexedText = _regexText(text);
  let featureText = regexedText.split(" ");
  let command = featureText.shift().toLowerCase();
  featureText = featureText.join(" ");

  return { featureText, command };
}

// Create Code
function _createCode(featureText, command, hasThenAlready) {
  var data = "";

  switch (command) {
    case KeywordsEnum.GIVEN:
      data = jsGiven(featureText);
      break;
    case KeywordsEnum.WHEN:
      data = jsWhenAnd(featureText);
      break;
    case KeywordsEnum.AND:
      data = hasThenAlready ? jsThen(featureText) : jsWhenAnd(featureText);
      break;
    case KeywordsEnum.THEN:
      data = jsThen(featureText);
      break;
    default:
      break;
  }
  return data;
}

function jsGiven(exp) {
  return `Given(/^${exp}$/, () => {
          // Code goes here        
      });`;
}

function jsWhenAnd(exp) {
  return `When(/^${exp}$/, () => {
        // Code goes here        
    });`;
}

function jsThen(exp) {
  return `Then(/^${exp}$/, () => {
          // Code goes here        
      });`;
}

// regex text
function _regexText(text) {
  return text.replace(/^\s+/g, "").replace(/(\r\n|\n|\r)/gm, "");
}

// Write data in 'output.js' .
function _writeToFile(data) {
  var file = fs.createWriteStream("ouutput.js");
  file.on("error", function(err) {
    console.log("Could not create File");
    throw err;
  });

  data.forEach(function(v) {
    file.write(v + "\n");
  });
  file.end();
}

// TODO
// create a folder with folder name same as feature file name.
// Inside that folder create the .js file with the same name as the feature filename

// BE smart and create a common javascript file by looking at common

// Be able to create folder with same name as feature filename under pages folder. Also there should be two pages js files 1) foldername-page.js 2) foldername-results-page.js
//

// Take it to the next level and actually have some code written for you
