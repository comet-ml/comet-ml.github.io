// -*- mode: js; js-indent-level: 2; -*-

/**
 * Returns a span element with link to item.
 *
 * @param {string} text - the text for the URL
 * @param {string} url - the address for the URL
 *
 * @returns {Object} a span node with link as contents
 *
 * @example
 *
 * > api.makeLink("The Text", "https://company.com/")
 * <span><a href="https://company.com/">The Text</span>
 *
 */
function makeLink(text, url) {
  let span = document.createElement("span");
  span.innerHTML = text.link(url);
  return span;
}

function copy(obj) {
  if (!obj || true == obj)
    return obj;
  let objType = typeof obj;
  // Add additional immutables here:
  if ("number" == objType || "string" == objType)
    return obj;
  let result = Array.isArray(obj)
    ? []
    : !obj.constructor
    ? {}
    : new obj.constructor();
  if (obj instanceof Map)
    for (var key of obj.keys()) result.set(key, copy(obj.get(key)));
  for (var key in obj)
    if (obj.hasOwnProperty(key)) result[key] = copy(obj[key]);
  return result;
}

function identity(v) {
  return v;
}

function compare(field, reverse = false, func = identity) {
  return function(a, b) {
    let nameA = func(a[field]);
    let nameB = func(b[field]);
    if (typeof a[field] === "string" && typeof b[field] === "string") {
      nameA = a[field].toUpperCase();
      nameB = b[field].toUpperCase();
    } else if (typeof a[field] !== typeof b[field]) {
      nameA = typeof a[field];
      nameB = typeof b[field];
    }
    let result = 0;
    if (nameA < nameB) {
      result = -1;
    } else if (nameA > nameB) {
      result = 1;
    }
    if (reverse) result = result * -1;
    return result;
  };
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function title(string) {
  return string.replace(/(^\w{1})|(\s{1}\w{1})/g,
                        match => match.toUpperCase());
}
