// Made with love by c4ffein
// Copyright (c) 2021 c4ffein
// MIT license: https://github.com/c4ffein/1files-js/LICENSE.txt

export const oE = object => Object.entries(object);
export const oFE = array => Object.fromEntries(array);
export const oK = object => Object.keys(object);
export const oV = object => Object.values(object);


export const iA = o => Array.isArray(o);
export const iO = o => typeof o === 'object' && o !== null;


export const O = {e: oE, fE: oFE, k: oK, v: oV, i: iO};
export const A = {i: iA};
