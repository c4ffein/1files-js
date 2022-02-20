//
// aos.js - animate elements on scroll
// Based on the original AOS (Animate on scroll) - wowjs alternative
//
// Original by Michał Sajnóg, https://github.com/michalsnik/
// Lodash dependency replaced by https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore functions
// Adapted by c4ffein
//
// Original License : https://github.com/michalsnik/aos/blob/next/LICENSE (MIT)
// Original source  : https://github.com/michalsnik/aos, version `3.0.0-beta.6` that hasn't been maintained since 2018
// Alternative to Lodash license : https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore/blob/master/LICENSE
//
// Don't forget to `AOS.init();` after import of both scss and js
// E.g. `import('/dists/aos.js').then(AOS => { AOS.default.init(); });`
//
// See default classes in aos.scss, otherwise you can just add custom classes : ```
// [data-aos="new-anim"] {
//   transform: rotate(10deg); opacity: 0; transition-property: transform, opacity;
//   &.aos-animate { transform: rotate(0); opacity: 1; }
// }
// ```


/////////////
// Alternative to Lodash throttle/debounce
//////////

// From https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_debounce
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
  	var context = this, args = arguments;
  	clearTimeout(timeout);
  	timeout = setTimeout(function() { timeout = null; if (!immediate) func.apply(context, args); }, wait);
  	if (immediate && !timeout) func.apply(context, args);
  };
}
// From https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_throttle
function throttle(func, timeFrame) {
  var lastTime = 0;
  return function (...args) {
      var now = new Date();
      if (now - lastTime >= timeFrame) { func(...args); lastTime = now; }
  };
}


/////////////
// AOS helpers
//////////

// Observer

let callback = () => {};

function containsAOSNode(nodes) {
  let i, currentNode, result;
  for (i = 0; i < nodes.length; i += 1) {
    currentNode = nodes[i];
    if (currentNode.dataset && currentNode.dataset.aos) { return true; }
    result = currentNode.children && containsAOSNode(currentNode.children);
    if (result) { return true; }
  }
  return false;
}

function check(mutations) {
  if (!mutations) return;
  mutations.forEach(mutation => {
    const addedNodes = Array.prototype.slice.call(mutation.addedNodes);
    const removedNodes = Array.prototype.slice.call(mutation.removedNodes);
    const allNodes = addedNodes.concat(removedNodes);
    if (containsAOSNode(allNodes)) { return callback(); }
  });
}

function getMutationObserver() {
  return ( window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver );
}

function isSupported() { return !!getMutationObserver(); }

function ready(selector, fn) {
  const doc = window.document;
  const MutationObserver = getMutationObserver();
  const observer = new MutationObserver(check);
  callback = fn;
  observer.observe(doc.documentElement, { childList: true, subtree: true, removedNodes: true });
}

const observer = { isSupported, ready };


// Device detector

const fullNameRe = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i;
const prefixRe = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i;
const fullNameMobileRe = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i;
const prefixMobileRe = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i;

function ua() { return navigator.userAgent || navigator.vendor || window.opera || ''; }

class Detector {
  phone()   { const a = ua(); return !!(fullNameRe.test(a) || prefixRe.test(a.substr(0, 4))); }
  mobile()  { const a = ua(); return !!(fullNameMobileRe.test(a) || prefixMobileRe.test(a.substr(0, 4))); }
  tablet()  { return this.mobile() && !this.phone(); }
            // http://browserhacks.com/#hack-acea075d0ac6954f275a70023906050c  // TODO: Legacy soon enough...
  ie11()    { const s = document.documentElement.style; return ( '-ms-scroll-limit' in s && '-ms-ime-align' in s ); }
}

const detect = new Detector();


// Classes logic

// Adds multiple classes from array on a DOM node
const addClasses = (node, classes) => classes && classes.forEach(className => node.classList.add(className));

// Removes multiple classes from array on a DOM node
const removeClasses = (node, classes) => classes && classes.forEach(className => node.classList.remove(className));

const fireEvent = (eventName, data) => {  // TODO: ie11 check as Legacy, soon enough...
  if (!detect.ie11()) { return document.dispatchEvent(new CustomEvent(eventName, { detail: data })); }
  const customEvent = document.createEvent('CustomEvent');
  customEvent.initCustomEvent(eventName, true, true, { detail: data });
  return document.dispatchEvent(customEvent);
};

// Set or remove aos-animate class with {node} el [element] and {int} top [scrolled distance]
const applyClasses = (el, top) => {
  const { options, position, node, data } = el;

  const hide = () => {
    if (!el.animated) return;
    removeClasses(node, options.animatedClassNames);
    fireEvent('aos:out', node);
    if (el.options.id) { fireEvent(`aos:in:${el.options.id}`, node); }
    el.animated = false;
  };

  const show = () => {
    if (el.animated) return;
    addClasses(node, options.animatedClassNames);
    fireEvent('aos:in', node);
    if (el.options.id) { fireEvent(`aos:in:${el.options.id}`, node); }
    el.animated = true;
  };

  if (options.mirror && top >= position.out && !options.once) { hide(); }
  else if (top >= position.in) { show(); }
  else if (el.animated && !options.once) { hide(); }
};

// Scroll logic - add or remove 'aos-animate' class on scroll, with {array} $elements the array of elements nodes
const handleScroll = $elements =>
  $elements.forEach((el, i) => applyClasses(el, window.pageYOffset));


// Position and stuff

// Get offset of DOM element like there were no transforms applied on it, with {Node} el [DOM element]
// returns {Object} [top and left offset]
const getOffset = function(el) {
  let _x = 0;    let _y = 0;
  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    _x += el.offsetLeft - (el.tagName != 'BODY' ? el.scrollLeft : 0);
    _y += el.offsetTop  - (el.tagName != 'BODY' ? el.scrollTop : 0);
    el = el.offsetParent;
  }
  return { top: _y, left: _x };
};


// Get inline option with a fallback.
// params:  {Node} el [Dom element] ;  {String} key [Option key] ;  {String} fallback [Fallback value]
// returns: {Mixed} [Option set with inline attributes or fallback value if not set]
const getInlineOption = (el, key, fallback) => {
  const attr = el.getAttribute('data-aos-' + key);
  if (typeof attr !== 'undefined') {
    if (attr === 'true') { return true; }
    else if (attr === 'false') { return false; }
  }
  return attr || fallback;
};

const getPositionIn = (el, defaultOffset, defaultAnchorPlacement) => {
  const windowHeight = window.innerHeight;
  const anchor = getInlineOption(el, 'anchor');
  const inlineAnchorPlacement = getInlineOption(el, 'anchor-placement');
  const additionalOffset = Number( getInlineOption(el, 'offset', inlineAnchorPlacement ? 0 : defaultOffset) );
  const anchorPlacement = inlineAnchorPlacement || defaultAnchorPlacement;
  let finalEl = el;

  if (anchor && document.querySelectorAll(anchor)) { finalEl = document.querySelectorAll(anchor)[0]; }

  let triggerPoint = getOffset(finalEl).top - windowHeight;

  switch (anchorPlacement) {
    case 'top-bottom':                                                                   break;  // Default offset
    case 'center-bottom':  triggerPoint += finalEl.offsetHeight / 2;                     break;
    case 'bottom-bottom':  triggerPoint += finalEl.offsetHeight;                         break;
    case 'top-center':     triggerPoint += windowHeight / 2;                             break;
    case 'center-center':  triggerPoint += windowHeight / 2 + finalEl.offsetHeight / 2;  break;
    case 'bottom-center':  triggerPoint += windowHeight / 2 + finalEl.offsetHeight;      break;
    case 'top-top':        triggerPoint += windowHeight;                                 break;
    case 'bottom-top':     triggerPoint += windowHeight + finalEl.offsetHeight;          break;
    case 'center-top':     triggerPoint += windowHeight + finalEl.offsetHeight / 2;      break;
  }

  return triggerPoint + additionalOffset;
};

const getPositionOut = (el, defaultOffset) => {
  const windowHeight = window.innerHeight;
  const anchor = getInlineOption(el, 'anchor');
  const additionalOffset = getInlineOption(el, 'offset', defaultOffset);
  let finalEl = el;

  if (anchor && document.querySelectorAll(anchor)) { finalEl = document.querySelectorAll(anchor)[0]; }
  const elementOffsetTop = getOffset(finalEl).top;
  return elementOffsetTop + finalEl.offsetHeight - additionalOffset;
};

const prepare = function($elements, options) {
  $elements.forEach((el, i) => {
    const mirror = getInlineOption(el.node, 'mirror', options.mirror);
    const once = getInlineOption(el.node, 'once', options.once);
    const id = getInlineOption(el.node, 'id');
    const customClassNames = options.useClassNames && el.node.getAttribute('data-aos');

    const animatedClassNames = [options.animatedClassName]
      .concat(customClassNames ? customClassNames.split(' ') : [])
      .filter(className => typeof className === 'string');

    if (options.initClassName) { el.node.classList.add(options.initClassName); }

    el.position = {
      in: getPositionIn(el.node, options.offset, options.anchorPlacement),
      out: mirror && getPositionOut(el.node, options.offset)
    };

    el.options = { once, mirror, animatedClassNames, id };
  });

  return $elements;
};


/////////////
// Initial AOS
//////////

let $aosElements = [];
let initialized = false;

let options = {
  offset: 120,                  anchorPlacement: 'top-bottom',               once: false,
  easing: 'ease',               startEvent: 'DOMContentLoaded',              disable: false,
  duration: 400,                animatedClassName: 'aos-animate',            disableMutationObserver: false,
  delay: 0,                     initClassName: 'aos-init',                   throttleDelay: 99,
  mirror: false,                useClassNames: false,                        debounceDelay: 50
};

// Generate initial array with elements as objects: array will be extended with elements attributes like 'position'
const elements = () => Array.prototype.map.call(document.querySelectorAll('[data-aos]'), node => ({ node }));

// Detect not supported browsers (<=IE9) - http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
const isBrowserNotSupported = () => document.all && !window.atob;

const initializeScroll = function initializeScroll() {
  $aosElements = prepare($aosElements, options);  // Extend elements objects in $aosElements with their positions
  handleScroll($aosElements);  // Perform scroll event, to refresh view and show/hide elements
  // Handle scroll event to animate elements on scroll
  window.addEventListener(
    'scroll', throttle(() => { handleScroll($aosElements, options.once); }, options.throttleDelay)
  );
  return $aosElements;
};

// Refresh AOS
const refresh = function refresh(initialize = false) {
  // Allow refresh only when it was first initialized on startEvent
  if (initialize) initialized = true;
  if (initialized) initializeScroll();
};

// Hard refresh: create array with new elements and trigger refresh
const refreshHard = function refreshHard() {
  $aosElements = elements();
  if (isDisabled(options.disable) || isBrowserNotSupported()) { return disable(); }
  refresh();
};

// Disable AOS - Remove all attributes to reset applied styles
const disable = function() {
  $aosElements.forEach(function(el, i) {
    ['', '-easing', '-duration', '-delay'].forEach(s => el.node.removeAttribute(`data-aos${s}`));
    if (options.initClassName) { el.node.classList.remove(options.initClassName); }
    if (options.animatedClassName) { el.node.classList.remove(options.animatedClassName); }
  });
};

// Check if AOS should be disabled based on provided setting
const isDisabled = function(optionDisable) {
  return (
    optionDisable === true ||
    (optionDisable === 'mobile' && detect.mobile()) ||
    (optionDisable === 'phone' && detect.phone()) ||
    (optionDisable === 'tablet' && detect.tablet()) ||
    (typeof optionDisable === 'function' && optionDisable() === true)
  );
};


// Initializing AOS
// - Create options merging defaults with user defined options
// - Set attributes on <body> as global setting - css relies on it
// - Attach preparing elements to options.startEvent, window resize and orientation change
// - Attach function that handle scroll and everything connected to it
//   to window scroll event and fire once document is ready to set initial state
const init = function init(settings) {
  options = Object.assign(options, settings);

  // Create initial array with elements -> to be fullfilled later with prepare()
  $aosElements = elements();

  // Disable mutation observing if not supported
  if (!options.disableMutationObserver && !observer.isSupported()) {
    console.info(`
      aos: MutationObserver is not supported on this browser, code mutations observing has been disabled.
      You may have to call "refreshHard()" by yourself.
    `);
    options.disableMutationObserver = true;
  }

  // Observe [aos] elements: If something is loaded by AJAX it'll refresh plugin automatically
  if (!options.disableMutationObserver) { observer.ready('[data-aos]', refreshHard); }

  // Don't init plugin if option `disable` is set or when browser is not supported
  if (isDisabled(options.disable) || isBrowserNotSupported()) { return disable(); }

  // Set global settings on body, based on options so CSS can use it
  document.querySelector('body').setAttribute('data-aos-easing', options.easing);
  document.querySelector('body').setAttribute('data-aos-duration', options.duration);
  document.querySelector('body').setAttribute('data-aos-delay', options.delay);

  // Handle initializing
  if (['DOMContentLoaded', 'load'].indexOf(options.startEvent) === -1) {
    // Listen to options.startEvent and initialize AOS
    document.addEventListener(options.startEvent, function() { refresh(true); });
  } else {
    window.addEventListener('load', function() { refresh(true); });
  }

  if ( options.startEvent === 'DOMContentLoaded' && ['complete', 'interactive'].indexOf(document.readyState) > -1 ) {
    refresh(true);  // Initialize AOS if default startEvent was already fired
  }

  // Refresh plugin on window resize or orientation change
  window.addEventListener( 'resize', debounce(refresh, options.debounceDelay) );
  window.addEventListener( 'orientationchange', debounce(refresh, options.debounceDelay) );

  return $aosElements;
};


export default { init, refresh, refreshHard };
