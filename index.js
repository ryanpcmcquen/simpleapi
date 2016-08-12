// @flow
const api = (request /*:Object*/ , response /*:Object*/ ) => {
  // This is what we will return at the end:
  const queryObj = {};
  // Do NOT match any character except a newline up to a '/'.
  // After that, match evertyhing except a newline.
  const initialQuery = String(request.url.match(/(?!.*\/).*/));
  // Filter the array, to:
  //   1. Split by query signifiers (?, &, =).
  //   2. Remove empty whitespace elements.
  const filteredQueryArray = initialQuery
    .trim()
    .replace(/\?/g, '&')
    .split('&')
    .join('=')
    .split('=')
    .filter((s) => {
      return /\S/.test(s);
    });
  const processedQueryArray = filteredQueryArray
    .map((previous, current) => {
      // In `queryObj`, map first item of array to key, second
      // item to value, continue through the entire Array.
      current = current + 1;
      return (queryObj[previous] = filteredQueryArray[current]) && filteredQueryArray.shift();
    });
  const jsonQueryObj = JSON.stringify(queryObj);
  return response.end(jsonQueryObj);
};

exports.tonicEndpoint = api;
