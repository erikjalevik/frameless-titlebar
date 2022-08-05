'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var os = _interopDefault(require('os'));
var electron = require('electron');
var electron__default = _interopDefault(electron);
var isEqual = _interopDefault(require('lodash.isequal'));

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var toArray = function (arr) {
  return Array.isArray(arr) ? arr : Array.from(arr);
};

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var darkTheme = {
  /* Title */
  barTheme: 'dark', // light, dark
  barHeight: '22px', // defines the bar height for mac os
  winBarHeight: '28px', // defines the bar height for windows os
  barColor: '#fff',
  barTitleColor: 'inherit',
  barBackgroundColor: '#24292e',
  barShowBorder: false,
  titleFontFamily: 'inherit',
  titleFontWeight: 'normal',
  barBorderBottom: '1px solid #000',
  inActiveOpacity: 0.6, // dim menu bar & title color when window is not in focus
  // should the icon be shown in the center of the toolbar on Mac/Linux apps alongside the app or title property
  showIconDarwin: true,
  /* Menu */
  menuStyle: 'horizontal', // horizontal, vertical, stacked
  menuDimItems: true, // dim other active menu items when menu list is open
  menuDimOpacity: 0.6,
  menuDisabledOpacity: 0.3,
  menuMarginBottom: 10, // margin from bottom for max height
  stackedMenuMarginRight: 200, // margin from right for max width
  menuMaxWidth: 350, // max width of a menu list
  menuBackgroundColor: '#fff',
  menuItemHeight: '30px',
  menuItemTextColor: '#fff',
  menuItemHoverBackground: 'rgba(255,255,255,0.3)',
  menuActiveTextColor: '#24292e',
  menuTextHighlightColor: '#fff',
  menuHighlightColor: '#0372ef',
  accentStatusIcon: true,
  menuSubLabelHeaders: true,
  menuSubLabelColor: '#6a737d',
  menuAcceleratorColor: '#6a737d',
  menuShowBoxShadow: true,
  menuBoxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  /* Menu Overlay */
  menuOverlayBackground: 'black',
  menuOverlayOpacity: 0.4,
  menuSeparatorColor: '#e1e4e8',
  /* WindowControls */
  windowControlsColor: '#fff',
  windowCloseHover: '#fff',
  windowCloseBackground: '#e81123',
  windowCloseActive: '#bf0f1d',
  windowDefaultBackground: 'rgba(255,255,255,0.3)',
  windowDefaultActive: 'rgba(255,255,255,0.2)',
  controlsLayout: 'right', // window control placement for linux systems
  linuxBorder: '1px solid rgba(0,0,0,0.06)', // linux window controls border color
  linuxCloseBackground: '#c85458', // linux close button background color
  linuxCloseColor: '#3b383d',
  linuxCloseActive: '#C24A41'
};

var lightTheme = _extends({}, darkTheme, {
  /* Title */
  barTheme: 'light',
  barColor: '#24292e',
  barBackgroundColor: '#e8e8e8',
  barBorderBottom: '1px solid #d3d4d5',

  /* Menu */
  menuItemTextColor: '#24292e',
  menuItemHoverBackground: 'rgba(0, 0, 0, 0.1)',

  /* WindowControls */
  windowControlsColor: '#000',
  windowDefaultBackground: 'rgba(0, 0, 0, 0.1)',
  windowDefaultActive: 'rgba(0, 0, 0, 0.2)'
});

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".styles_MenuButton__1URAL svg {\n  fill: currentColor;\n  width: 20px;\n  height: 20px;\n}\n\n.styles_MenuButton__1URAL:focus:not(.styles_focus-ring__Ie2g4) {\n  outline: none;\n}\n";
var css$1 = { "MenuButton": "styles_MenuButton__1URAL", "focus-ring": "styles_focus-ring__Ie2g4" };
styleInject(css);

var styles = {
  Wrapper: {
    minWidth: 0,
    flexShrink: 0,
    height: '100%',
    boxSizing: 'content-box',
    outline: 'none'
  },
  Label: {
    whiteSpace: 'nowrap',
    maxWidth: 100,
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  },
  ButtonWrapper: {
    width: '100%',
    height: '100%'
  },
  Button: {
    WebkitAppearance: 'none',
    border: 'none',
    boxShadow: 'none',
    background: 'transparent',
    borderRadius: 0,
    textAlign: 'left',
    margin: 0,
    padding: 0,
    height: '100%',
    width: '100%',
    fontSize: 12,
    paddingLeft: 10,
    paddingRight: 10,
    boxSizing: 'border-box'
  }
};

var MenuButton = function (_Component) {
  inherits(MenuButton, _Component);

  function MenuButton() {
    classCallCheck(this, MenuButton);
    return possibleConstructorReturn(this, (MenuButton.__proto__ || Object.getPrototypeOf(MenuButton)).apply(this, arguments));
  }

  createClass(MenuButton, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          onMouseEnter = _props.onMouseEnter,
          onMouseLeave = _props.onMouseLeave,
          onMouseOver = _props.onMouseOver,
          onMouseMove = _props.onMouseMove,
          onTouchStart = _props.onTouchStart,
          onFocus = _props.onFocus,
          onClick = _props.onClick,
          label = _props.label,
          open = _props.open,
          enabled = _props.enabled,
          hovering = _props.hovering,
          rectRef = _props.rectRef,
          theme = _props.theme;


      var backgroundColor = open ? theme.menuBackgroundColor : hovering && enabled ? theme.menuItemHoverBackground : 'transparent';
      var borderColor = open ? theme.menuBackgroundColor : '';
      var color = open ? theme.menuActiveTextColor : theme.menuItemTextColor;
      var opacity = enabled ? open || hovering || !theme.menuDimItems ? 1 : theme.menuDimOpacity : theme.menuDisabledOpacity;

      return React__default.createElement(
        'div',
        {
          style: _extends({}, styles.Wrapper, this.props.style),
          onMouseEnter: onMouseEnter,
          onMouseLeave: onMouseLeave,
          onMouseOver: onMouseOver,
          onMouseMove: onMouseMove,
          onTouchStart: onTouchStart,
          onFocus: onFocus,
          onClick: onClick,
          ref: rectRef,
          tabIndex: '-1',
          'aria-haspopup': true
        },
        this.props.children,
        React__default.createElement(
          'div',
          {
            style: styles.ButtonWrapper
          },
          React__default.createElement(
            'button',
            {
              className: css$1.MenuButton,
              style: _extends({}, styles.Button, {
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                color: color
              }),
              tabIndex: '-1'
            },
            React__default.createElement(
              'div',
              {
                style: {
                  opacity: opacity
                }
              },
              React__default.createElement(
                'span',
                {
                  style: _extends({}, styles.Label),
                  'aria-hidden': 'true'
                },
                label
              )
            )
          )
        )
      );
    }
  }]);
  return MenuButton;
}(React.Component);


MenuButton.propTypes = {
  children: PropTypes.node,
  enabled: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  open: PropTypes.bool,
  closed: PropTypes.bool,
  hovering: PropTypes.bool,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onMouseOver: PropTypes.func,
  onMouseMove: PropTypes.func,
  onTouchStart: PropTypes.func,
  onFocus: PropTypes.func,
  onClick: PropTypes.func,
  rectRef: PropTypes.func
};

MenuButton.defaultProps = {
  open: false,
  closed: false,
  hovering: false,
  enabled: true,
  onMouseEnter: function onMouseEnter() {},
  onMouseLeave: function onMouseLeave() {},
  onMouseOver: function onMouseOver() {},
  onMouseMove: function onMouseMove() {},
  onTouchStart: function onTouchStart() {},
  onFocus: function onFocus() {},
  onClick: function onClick() {},
  rectRef: function rectRef() {}
};

var css$2 = ".styles_StatusIcon__36XEE {\n  width: 12px;\n  height: 12px;\n  flex-shrink: 0;\n}\n\n.styles_StatusIcon__36XEE svg {\n  width: 100%;\n  height: 100%;\n  fill: currentColor;\n}\n\n.styles_SubMenuArrow__1fsxq {\n  flex-shrink: 0;\n  opacity: 0.7;\n  height: 24px;\n  color: inherit;\n}\n\n.styles_SubMenuArrow__1fsxq svg {\n  fill: currentColor;\n}";
var css$3 = { "StatusIcon": "styles_StatusIcon__36XEE", "SubMenuArrow": "styles_SubMenuArrow__1fsxq" };
styleInject(css$2);

var modifiers = ['CommandOrControl', 'CmdOrCtrl'];
var CMD = '⌘';
var CTRL = 'Ctrl';

var topologicalSort = function topologicalSort(original, graph) {
  // Sort items topologically using a depth-first approach
  var sorted = [];
  var visited = new Set();

  var visit = function visit(mark) {
    // if item visited return
    if (visited.has(mark)) return;
    // add item to list of visited nodes
    visited.add(mark);
    // get edges from graph for visited id
    var edges = graph.get(mark);
    if (edges != null) {
      // visit each edge
      edges.forEach(visit);
    }
    sorted.push(mark);
  };

  original.forEach(visit);
  return sorted;
};

var areValidTemplateItems = function areValidTemplateItems(template) {
  // validate the menu attributes
  return template.every(function (item) {
    if (item === null || (typeof item === 'undefined' ? 'undefined' : _typeof(item)) !== 'object') {
      return false;
    }
    return item.hasOwnProperty('label') || item.type === 'separator';
  });
};

var addEdge = function addEdge(graph, from, to) {
  if (!graph.has(from)) {
    // create edge list from
    graph.set(from, []);
  }
  // add to edge list from -> to
  graph.get(from).push(to);
};

var sortMenuItems = function sortMenuItems(menu) {
  var original = menu.map(function (item, i) {
    return i;
  });
  var graph = new Map();
  var idToIndex = new Map(menu.map(function (item, i) {
    return [item.id, i];
  }));
  // add graph edges to perform topological sort
  menu.forEach(function (item, i) {
    if (item.before) {
      // get index from item before id
      var to = idToIndex.get(item.before);
      if (to != null) {
        // add edge pointing from item before -> to current item
        addEdge(graph, to, i);
      }
    }
    if (item.after) {
      // get index from item after id
      var _to = idToIndex.get(item.after);
      if (_to != null) {
        // add edge from current item pointing -> to item after
        addEdge(graph, i, _to);
      }
    }
  });
  // sort edges
  var sortedOrder = topologicalSort(original, graph);
  // return sorted menu items
  return sortedOrder.map(function (i) {
    return menu[i];
  });
};

var sortMenu = function sortMenu(menu) {
  // sort menu and all submenus
  var sorted = sortMenuItems(menu);
  for (var id in sorted) {
    if (Array.isArray(sorted[id].submenu)) {
      // sort submenus
      sorted[id].submenu = sortMenu(sorted[id].submenu);
    }
  }
  return sorted;
};

var buildMenu = function buildMenu(menu) {
  if (!Array.isArray(menu)) {
    throw new TypeError('Menu must be an array');
  }
  if (!areValidTemplateItems(menu)) {
    throw new TypeError('MenuItem must have at least one of label, role or type');
  }
  return sortMenu(menu);
};

var findMenuItemPath = function findMenuItemPath(menu, path, id) {
  for (var i = 0; i < menu.length; i++) {
    if (menu[i].id && menu[i].id === id) {
      return { found: true, path: [].concat(toConsumableArray(path), [i]) };
    } else if (menu[i].type && menu[i].type.toLowerCase() === 'submenu' || menu.submenu && Array.isArray(menu.submenu)) {
      return findMenuItemPath(menu, [].concat(toConsumableArray(path), [i, 'subemenu']), id);
    }
  }
  return { found: false };
};

var getMenuItemPathById = function getMenuItemPathById(menu, id) {
  var menuPath = ['menu'];
  for (var i = 0; i < menu.length; i++) {
    if (menu[i].id === id) {
      return [].concat(menuPath, [i]);
    } else if (menu[i].type && menu[i].type.toLowerCase() === 'submenu' || menu[i].submenu && Array.isArray(menu[i].submenu)) {
      var _findMenuItemPath = findMenuItemPath(menu[i].submenu, [].concat(menuPath, [i, 'submenu']), id),
          found = _findMenuItemPath.found,
          path = _findMenuItemPath.path;

      if (found) {
        return [].concat(toConsumableArray(path));
      }
    }
  }
  // no path was found
  return [];
};

var parseAccelerator = function parseAccelerator(accelerator) {
  var re = new RegExp(modifiers.join('|'), 'gi');
  return accelerator.replace(re, function (matched) {
    return os.platform() === 'darwin' ? CMD : CTRL;
  });
};

var MenuIcon = function MenuIcon(props) {
  return React__default.createElement(
    "svg",
    { version: "1.1", width: "24px", height: "24px", viewBox: "0 0 32 32" },
    React__default.createElement("path", { d: "M 4 7 L 4 9 L 28 9 L 28 7 Z M 4 15 L 4 17 L 28 17 L 28 15 Z M 4 23 L 4 25 L 28 25 L 28 23 Z " })
  );
};

var MimimizeIcon = function MimimizeIcon(props) {
  return props.isWin ? React__default.createElement(
    "svg",
    {
      version: "1.1",
      "aria-hidden": "true",
      width: "10",
      height: "10"
    },
    React__default.createElement("path", { d: "M 0,5 10,5 10,6 0,6 Z" })
  ) : React__default.createElement(
    "svg",
    { xmlns: "http://www.w3.org/2000/svg", height: "16", width: "16" },
    React__default.createElement("path", { d: "M7 3v4H4l3.156 4H4v2h8v-2H8.844L12 7H9V3z", style: { marker: "none" }, overflow: "visible" }),
    React__default.createElement("text", { x: "613.992", y: "426.851", fontSize: "14", fontWeight: "400", opacity: ".8", fontFamily: "Bitstream Vera Sans", transform: "translate(-293 -188)" }),
    React__default.createElement("text", { x: "-1401.69", y: "1250.896", fontSize: "14", fontWeight: "400", opacity: ".8", fontFamily: "Bitstream Vera Sans", transform: "translate(-293 -188)" }),
    React__default.createElement("text", { x: "-474.763", y: "195.667", fontSize: "14", fontWeight: "400", opacity: ".8", fontFamily: "Bitstream Vera Sans", transform: "translate(-293 -188)" }),
    React__default.createElement("text", { x: "417.863", y: "-261.333", fontSize: "14", fontWeight: "400", opacity: ".8", fontFamily: "Bitstream Vera Sans", transform: "translate(-293 -188)" }),
    React__default.createElement("text", { x: "444.346", y: "-306.364", fontSize: "14", fontWeight: "400", opacity: ".8", fontFamily: "Bitstream Vera Sans", transform: "translate(-293 -188)" }),
    React__default.createElement("text", { x: "-1204.137", y: "-314.333", fontSize: "14", fontWeight: "400", opacity: ".8", fontFamily: "Bitstream Vera Sans", transform: "translate(-293 -188)" }),
    React__default.createElement("text", { x: "410.171", y: "-616.333", fontSize: "14", fontWeight: "400", opacity: ".8", fontFamily: "Bitstream Vera Sans", transform: "translate(-293 -188)" }),
    React__default.createElement("text", { x: "2052.752", y: "76.336", fontSize: "14", fontWeight: "400", opacity: ".8", fontFamily: "Bitstream Vera Sans", transform: "translate(-293 -188)" }),
    React__default.createElement("text", { x: "2079.236", y: "31.305", fontSize: "14", fontWeight: "400", opacity: ".8", fontFamily: "Bitstream Vera Sans", transform: "translate(-293 -188)" }),
    React__default.createElement("text", { x: "430.752", y: "23.336", fontSize: "14", fontWeight: "400", opacity: ".8", fontFamily: "Bitstream Vera Sans", transform: "translate(-293 -188)" }),
    React__default.createElement("text", { x: "2045.06", y: "-278.664", fontSize: "14", fontWeight: "400", opacity: ".8", fontFamily: "Bitstream Vera Sans", transform: "translate(-293 -188)" }),
    React__default.createElement("text", { x: "-605.797", y: "-29.818", fontSize: "14", fontWeight: "400", opacity: ".8", fontFamily: "Bitstream Vera Sans", transform: "translate(-293 -188)" }),
    React__default.createElement("text", { x: "-2621.479", y: "794.227", fontSize: "14", fontWeight: "400", opacity: ".8", fontFamily: "Bitstream Vera Sans", transform: "translate(-293 -188)" }),
    React__default.createElement("text", { x: "-726.195", y: "896.876", fontSize: "14", fontWeight: "400", opacity: ".8", fontFamily: "Bitstream Vera Sans", transform: "translate(-293 -188)" })
  );
};

var RestoreIcon = function RestoreIcon(props) {
  return props.isWin ? React__default.createElement(
    "svg",
    {
      version: "1.1",
      "aria-hidden": "true",
      width: "10",
      height: "10"
    },
    React__default.createElement("path", {
      d: "m 2,1e-5 0,2 -2,0 0,8 8,0 0,-2 2,0 0,-8 z m 1,1 6,0 0,6 -1,0 0,-5 -5,0 z m -2,2 6,0 0,6 -6,0 z"
    })
  ) : React__default.createElement(
    "svg",
    { xmlns: "http://www.w3.org/2000/svg", height: "16", width: "16" },
    React__default.createElement(
      "g",
      null,
      React__default.createElement("path", { d: "M14 8l-2.25-2.223 1.714-1.715c.013-.012.015-.013.027-.026.38-.42.379-1.068-.027-1.474a1.07 1.07 0 0 0-1.473-.053l-.214.214-1.554 1.527L8 2v6zM8 14V8H2l2.25 2.25-1.714 1.714-.027.027c-.38.42-.379 1.068.027 1.473.405.406 1.08.434 1.5.054l.187-.214 1.554-1.554z", style: { marker: "none" }, overflow: "visible" })
    )
  );
};

var MaximizeIcon = function MaximizeIcon(props) {
  return props.isWin ? React__default.createElement(
    "svg",
    {
      version: "1.1",
      "aria-hidden": "true",
      width: "10",
      height: "10"
    },
    React__default.createElement("path", {
      d: "M 0,0 0,10 10,10 10,0 Z M 1,1 9,1 9,9 1,9 Z"
    })
  ) : React__default.createElement(
    "svg",
    { xmlns: "http://www.w3.org/2000/svg", height: "16", width: "16" },
    React__default.createElement("path", { d: "M8 2l2.25 2.223-1.714 1.714-.027.027c-.38.42-.379 1.068.027 1.474a1.07 1.07 0 0 0 1.473.053l.214-.214 1.554-1.527L14 8V2zM2 8v6h6l-2.25-2.25 1.714-1.714.027-.027c.38-.42.379-1.068-.027-1.473-.405-.406-1.08-.434-1.5-.054l-.187.214-1.554 1.554z", style: { marker: "none" }, overflow: "visible" })
  );
};

var CloseIcon = function CloseIcon(props) {
  return props.isWin ? React__default.createElement(
    "svg",
    {
      "aria-hidden": "true",
      version: "1.1",
      width: "10",
      height: "10"
    },
    React__default.createElement("path", { d: "M 0,0 0,0.7 4.3,5 0,9.3 0,10 0.7,10 5,5.7 9.3,10 10,10 10,9.3 5.7,5 10,0.7 10,0 9.3,0 5,4.3 0.7,0 Z" })
  ) : React__default.createElement(
    "svg",
    { xmlns: "http://www.w3.org/2000/svg", height: "16", width: "16" },
    React__default.createElement("path", { d: "M7.97 6.556L10.5 4 12 5.5 9.401 7.987 12 10.5 10.5 12 7.987 9.401 5.5 12 4 10.5 6.586 8 4 5.5 5.5 4l2.47 2.556z", style: { marker: "none" }, overflow: "visible" })
  );
};

var checked = React__default.createElement(
  "svg",
  { width: "1792", height: "1792", viewBox: "0 0 1792 1792", xmlns: "http://www.w3.org/2000/svg" },
  React__default.createElement("path", { d: "M1671 566q0 40-28 68l-724 724-136 136q-28 28-68 28t-68-28l-136-136-362-362q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 295 656-657q28-28 68-28t68 28l136 136q28 28 28 68z" })
);
var unchecked = React__default.createElement("span", null);
var radioUnchecked = React__default.createElement(
  "svg",
  { width: "1792", height: "1792", viewBox: "0 0 1792 1792", xmlns: "http://www.w3.org/2000/svg" },
  React__default.createElement("path", { d: "M896 352q-148 0-273 73t-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273-73-273-198-198-273-73zm768 544q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z" })
);
var radioChecked = React__default.createElement(
  "svg",
  { width: "1792", height: "1792", viewBox: "0 0 1792 1792", xmlns: "http://www.w3.org/2000/svg" },
  React__default.createElement("path", { d: "M1152 896q0 106-75 181t-181 75-181-75-75-181 75-181 181-75 181 75 75 181zm-256-544q-148 0-273 73t-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273-73-273-198-198-273-73zm768 544q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z" })
);
var arrow = React__default.createElement(
  "svg",
  { version: "1.1", width: "24px", height: "24px" },
  React__default.createElement(
    "g",
    { id: "Rounded" },
    React__default.createElement("path", { d: "M9.29,6.71L9.29,6.71c-0.39,0.39-0.39,1.02,0,1.41L13.17,12l-3.88,3.88c-0.39,0.39-0.39,1.02,0,1.41l0,0c0.39,0.39,1.02,0.39,1.41,0l4.59-4.59c0.39-0.39,0.39-1.02,0-1.41l-4.59-4.59C10.32,6.32,9.68,6.32,9.29,6.71z" })
  )
);

var styles$1 = {
  Container: {
    position: 'static',
    overflow: 'visible',
    padding: 0,
    transform: 'none',
    display: 'flex',
    cursor: 'default'
  },
  Wrapper: {
    fontSize: 12,
    padding: '0px 10px',
    height: '30px',
    color: 'inherit',
    flex: '1 1 auto',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    textDecoration: 'none',
    cursor: 'default'
  },
  Label: {
    flexGrow: 1,
    marginLeft: 10,
    marginRight: 10,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    cursor: 'default',
    pointerEvents: 'none'
  },
  Accelerator: {
    flexShrink: 0,
    marginRight: 10
  },
  Separator: {
    display: 'block',
    width: '100%',
    border: 'none',
    height: 1
  },
  Icon: {
    width: '100%',
    height: '100%',
    backgroundSize: 'contain',
    backgroundPosition: 'center'
  }
};

var MenuItem = function (_Component) {
  inherits(MenuItem, _Component);

  function MenuItem(props) {
    classCallCheck(this, MenuItem);

    var _this = possibleConstructorReturn(this, (MenuItem.__proto__ || Object.getPrototypeOf(MenuItem)).call(this, props));

    _this.state = {
      hovering: false
    };
    _this._handleMouseEnter = _this._handleMouseEnter.bind(_this);
    _this._handleMouseLeave = _this._handleMouseLeave.bind(_this);
    _this._handleClick = _this._handleClick.bind(_this);
    return _this;
  }

  createClass(MenuItem, [{
    key: '_handleMouseEnter',
    value: function _handleMouseEnter(e) {
      var menuItem = this.props.menuItem;


      if (menuItem.enabled === false) {
        e.stopPropagation();
        return;
      }

      this.setState({
        hovering: true
      });
    }
  }, {
    key: '_handleMouseLeave',
    value: function _handleMouseLeave(e) {
      var menuItem = this.props.menuItem;


      if (menuItem.enabled === false) {
        e.stopPropagation();
        return;
      }

      this.setState({
        hovering: false
      });
    }
  }, {
    key: '_handleClick',
    value: function _handleClick(e) {
      var _props = this.props,
          menuItem = _props.menuItem,
          changeCheckState = _props.changeCheckState,
          path = _props.path,
          indx = _props.indx;


      if (menuItem.enabled === false) {
        e.stopPropagation();
        return;
      }

      switch (menuItem.type) {
        case 'submenu':
          {
            // stop propagation only when initial target is this item specifically
            // e.stopPropagation(); 
            break;
          }
        case 'checkbox':
          {
            e.persist();
            var newMenuItem = _extends({}, menuItem, {
              checked: !menuItem.checked
            });
            menuItem.click(newMenuItem, electron.remote.getCurrentWindow(), _extends({}, e, { menuBar: this.props.menuRef }));
            // TODO: Change Checked State
            changeCheckState(path, indx, !menuItem.checked);
            break;
          }
        case 'radio':
          {
            // e.persist();
            var _newMenuItem = _extends({}, menuItem, {
              checked: true
            });
            menuItem.click(_newMenuItem, electron.remote.getCurrentWindow(), _extends({}, e, { menuBar: this.props.menuRef }));
            if (!menuItem.checked) {
              // TODO: Change Checked State
              changeCheckState(path, indx, true, true);
            }
            break;
          }
        default:
          e.persist();
          menuItem.click(this.props.menuItem, electron.remote.getCurrentWindow(), _extends({}, e, { menuBar: this.props.menuRef }));
          break;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          children = _props2.children,
          menuItem = _props2.menuItem,
          theme = _props2.theme;
      var hovering = this.state.hovering;


      var isSubMenu = menuItem.type && menuItem.type.toLowerCase() === 'submenu';

      if (menuItem.visible === false) {
        return null;
      }

      if (menuItem.type && menuItem.type.toLowerCase() === 'separator') {
        return React__default.createElement('hr', {
          style: _extends({}, styles$1.Separator, {
            borderBottom: '1px solid ' + theme.menuSeparatorColor
          })
        });
      }

      var statusIcon = React__default.createElement('span', null);

      if (menuItem.type === 'radio') {
        statusIcon = menuItem.checked ? radioChecked : radioUnchecked;
      } else if (menuItem.type === 'checkbox') {
        statusIcon = menuItem.checked ? checked : unchecked;
      } else if (menuItem.icon) {
        statusIcon = React__default.createElement('div', {
          style: _extends({}, styles$1.Icon, {
            backgroundImage: 'url(' + menuItem.icon + ')'
          })
        });
      }

      return React__default.createElement(
        'li',
        {
          ref: this.props.rectRef,
          style: _extends({}, styles$1.Contianer, {
            color: hovering ? theme.menuTextHighlightColor : '',
            opacity: menuItem.enabled ? '1' : '0.3',
            backgroundColor: hovering ? theme.menuHighlightColor : ''
          }),
          onMouseEnter: this._handleMouseEnter,
          onMouseLeave: this._handleMouseLeave,
          onClick: this._handleClick,
          role: 'option'
        },
        React__default.createElement(
          'a',
          { style: _extends({}, styles$1.Wrapper, { height: theme.menuItemHeight }) },
          React__default.createElement(
            'div',
            {
              className: css$3.StatusIcon,
              style: {
                color: hovering ? theme.menuTextHighlightColor : theme.accentStatusIcon ? theme.menuHighlightColor : theme.menuActiveTextColor
              }
            },
            statusIcon
          ),
          React__default.createElement(
            'span',
            { style: styles$1.Label },
            menuItem.label
          ),
          React__default.createElement(
            'span',
            {
              style: _extends({}, styles$1.Accelerator, {
                color: hovering ? theme.menuTextHighlightColor : theme.menuAcceleratorColor
              })
            },
            parseAccelerator(menuItem.accelerator)
          ),
          isSubMenu && React__default.createElement(
            'div',
            {
              className: css$3.SubMenuArrow
            },
            arrow
          )
        ),
        isSubMenu && this.state.hovering && children
      );
    }
  }]);
  return MenuItem;
}(React.Component);

MenuItem.propTypes = {
  menuItem: PropTypes.shape({
    label: PropTypes.string,
    enabled: PropTypes.bool,
    checked: PropTypes.bool,
    visible: PropTypes.bool,
    type: PropTypes.oneOf(['normal', 'separator', 'submenu', 'checkbox', 'radio']),
    click: PropTypes.func
  }),
  children: PropTypes.node,
  indx: PropTypes.number,
  changeCheckState: PropTypes.func
};

MenuItem.defaultProps = {
  menuItem: {
    id: '',
    enabled: true,
    label: '',
    checked: false,
    visible: true,
    type: 'normal',
    accelerator: '',
    position: ''
  },
  children: null,
  indx: 0,
  changeCheckState: function changeCheckState() {}
};

var debounce = function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
        args = arguments;
    var later = function later() {
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

var getProperty = function getProperty(path, obj) {
  return path.reduce(function (xs, x) {
    return xs && xs[x] ? xs[x] : null;
  }, obj);
};

var reduxSet = function reduxSet(obj, path, val) {
  var _path = toArray(path),
      prop = _path[0],
      restPath = _path.slice(1);

  if (typeof prop === 'undefined') {
    if (!isEqual(obj, val)) {
      return val;
    }
    return obj;
  }
  var before = void 0;
  if (prop in obj) {
    before = obj[prop];
  } else {
    before = {};
  }
  var after = reduxSet(before, restPath, val);
  if (after !== before) {
    var result = void 0;
    if (Array.isArray(obj)) {
      result = obj.slice();
      result[prop] = after;
    } else {
      result = _extends({}, obj, defineProperty({}, prop, after));
    }
    return result;
  }
  return obj;
};

var defaultMenuItem = {
  id: '',
  enabled: true,
  label: '',
  checked: false,
  visible: true,
  type: 'normal',
  accelerator: '',
  position: '',
  submenu: [],
  click: function click() {}
};

var darkTheme$1 = {
  /* Title */
  barTheme: 'dark', // light, dark
  barHeight: '22px', // Change this value if you set 'titleBarStyle' to 'hiddenInset'
  winBarHeight: '28px',
  barColor: '#fff',
  barTitleColor: 'inherit',
  barBackgroundColor: '#24292e',
  barShowBorder: false,
  barBorderBottom: '1px solid #000',
  // should the icon be shown in the center of the toolbar on Mac/Linux apps alongside the app or title property
  showIconDarwin: true,

  /* Menu */
  menuStyle: 'horizontal', // horizontal, vertical
  menuDimItems: true,
  menuDimOpacity: 0.6,
  menuDisabledOpacity: 0.3,
  menuBackgroundColor: '#fff',
  menuItemTextColor: '#fff',
  menuItemHoverBackground: 'rgba(255,255,255,0.3)',
  menuActiveTextColor: '#24292e',
  menuTextHighlightColor: '#fff',
  menuHighlightColor: '#0372ef',
  accentStatusIcon: false,
  menuSubLabelHeaders: true,
  menuSubLabelColor: '#6a737d',
  menuAcceleratorColor: '#6a737d',
  menuShowBoxShadow: true,
  menuBoxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  /* Menu Overlay */
  menuOverlayBackground: 'black',
  menuOverlayOpacity: 0.4,
  menuSeparatorColor: '#e1e4e8',

  /* WindowControls */
  windowControlsColor: '#fff',
  windowCloseHover: '#fff',
  windowCloseBackground: '#e81123',
  windowCloseActive: '#bf0f1d',
  windowDefaultBackground: 'rgba(255,255,255,0.3)',
  windowDefaultActive: 'rgba(255,255,255,0.2)'
};

var lightTheme$1 = _extends({}, darkTheme$1, {
  /* Title */
  barTheme: 'light',
  barColor: '#24292e',
  barBackgroundColor: '#e8e8e8',
  barBorderBottom: '1px solid #d3d4d5',

  /* Menu */
  menuItemTextColor: '#24292e',
  menuItemHoverBackground: 'rgba(0, 0, 0, 0.1)',

  /* WindowControls */
  windowControlsColor: '#000',
  windowDefaultBackground: 'rgba(0, 0, 0, 0.1)',
  windowDefaultActive: 'rgba(0, 0, 0, 0.2)'
});

var styles$2 = {
  Container: {
    position: 'absolute',
    outline: 'none',
    border: 'none',
    zIndex: 2000
  },
  ScrollView: {
    overflow: 'hidden'
  },
  Menu: {
    overflow: 'hidden'
  },
  Vertical: {
    padding: '5px 0',
    marginLeft: 0,
    overflow: 'visible',
    textAlign: 'left',
    whiteSpace: 'nowrap'
  },
  Items: {
    tabIndex: 0,
    display: 'block',
    margin: '0 auto',
    padding: 0,
    width: '100%',
    justifyContent: 'flex-end',
    listStyleType: 'none'
  }
};

var MenuListContainer = function (_Component) {
  inherits(MenuListContainer, _Component);

  function MenuListContainer(props) {
    classCallCheck(this, MenuListContainer);

    var _this = possibleConstructorReturn(this, (MenuListContainer.__proto__ || Object.getPrototypeOf(MenuListContainer)).call(this, props));

    _this.focusFirstItem = function () {
      _this.setState({
        activeDescendant: _this.props.children[0]
      });
    };

    _this.handleScroll = function (e) {
      var scrollTop = _this.contentRef.scrollTop;
      var scrollHeight = _this.contentRef.scrollHeight;
      var height = _this.contentRef.clientHeight;
      var wheelDelta = e.deltaY;
      var isDeltaPositive = wheelDelta > 0;
      var step = 10; // scroll speed

      if (isDeltaPositive && wheelDelta > scrollHeight - height - scrollTop) {
        _this.contentRef.scrollTop = scrollHeight;
        return _this.stopScrolling(e);
      } else if (!isDeltaPositive && -wheelDelta > scrollTop) {
        _this.contentRef.scrollTop = 0;
        return _this.stopScrolling(e);
      } else {
        _this.contentRef.scrollTop += wheelDelta > 0 ? step : -step;
        return _this.stopScrolling(e);
      }
    };

    _this.stopScrolling = function (e) {
      e.stopPropagation();
      e.preventDefault();
      e.returnValue = false;
      return false;
    };

    _this.state = {
      activeDescendant: null,
      top: 0,
      left: 0
    };
    _this.handleFocus = _this.handleFocus.bind(_this);
    _this.setRef = _this.setRef.bind(_this);
    _this.setContent = _this.setContent.bind(_this);
    _this.onLayout = _this.onLayout.bind(_this);
    return _this;
  }

  createClass(MenuListContainer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.state.activeDescendant) {
        return;
      }
      this.focusFirstItem();
      this.onLayout();
    }
  }, {
    key: 'onLayout',
    value: function onLayout() {
      var _props = this.props,
          parentRef = _props.parentRef,
          rect = _props.rect,
          submenu = _props.submenu;

      var boundingRect = this.itemRef.getBoundingClientRect();
      var top = 0;
      var left = rect ? rect.left : 0;

      if (submenu) {
        var parentRect = parentRef.getBoundingClientRect();
        // scroll view > scroll content > ul > li > this
        var scrollTop = parentRef.parentNode.parentNode.parentNode.scrollTop; // get parent menu's scroll offset
        top = parentRef.offsetTop - scrollTop;
        left = parentRect.width;
        if (window.innerWidth <= parentRect.right + boundingRect.width) {
          top = parentRef.offsetTop + parentRect.height / 3;
          left = 10;
        }
      }

      this.setState({
        top: top,
        left: left
      });
    }
  }, {
    key: 'setRef',
    value: function setRef(ref) {
      this.itemRef = ref;
    }
  }, {
    key: 'setContent',
    value: function setContent(ref) {
      this.contentRef = ref;
    }
  }, {
    key: 'handleFocus',
    value: function handleFocus(e) {}
  }, {
    key: 'render',
    value: function render() {
      var theme = this.props.theme;

      var maxHeight = Math.max(10, window.innerHeight - (this.itemRef && this.itemRef.getBoundingClientRect().top || 0) - theme.menuMarginBottom);
      var maxWidth = Math.min(window.innerHeight, window.innerWidth - (this.itemRef && this.itemRef.getBoundingClientRect().left || 0));
      var _state = this.state,
          top = _state.top,
          left = _state.left;


      return React__default.createElement(
        'div',
        {
          ref: this.setRef,
          style: _extends({}, styles$2.Container, {
            left: left,
            top: top,
            color: theme.menuActiveTextColor
          })
        },
        React__default.createElement(
          'div',
          {
            style: _extends({}, styles$2.ScrollView, {
              background: theme.menuBackgroundColor,
              boxShadow: theme.menuShowBoxShadow ? theme.menuBoxShadow : ''
            })
          },
          React__default.createElement(
            'div',
            {
              onWheel: this.handleScroll,
              ref: this.setContent,
              style: _extends({}, styles$2.Menu, {
                maxHeight: maxHeight,
                maxWidth: maxWidth
              })
            },
            React__default.createElement(
              'div',
              {
                style: styles$2.Vertical
              },
              React__default.createElement(
                'ul',
                {
                  style: _extends({}, styles$2.Items)
                },
                this.props.children
              )
            )
          )
        )
      );
    }
  }]);
  return MenuListContainer;
}(React.Component);

var SubMenuLabelStyle = {
  height: '20px',
  lineHeight: '20px',
  margin: '0px 10px',
  fontWeight: 'bold',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  direction: 'rtl',
  fontSize: '1em',
  textAlign: 'left',
  cursor: 'default'
};

var SubMenu = function (_Component) {
  inherits(SubMenu, _Component);

  function SubMenu(props) {
    classCallCheck(this, SubMenu);

    var _this = possibleConstructorReturn(this, (SubMenu.__proto__ || Object.getPrototypeOf(SubMenu)).call(this, props));

    _this._generateMenu = _this._generateMenu.bind(_this);
    _this.setRef = _this.setRef.bind(_this);
    return _this;
  }

  createClass(SubMenu, [{
    key: 'setRef',
    value: function setRef(ref) {
      this.itemRef = ref;
    }
  }, {
    key: '_generateMenu',
    value: function _generateMenu() {
      var _this2 = this;

      var menu = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var theme = this.props.theme;

      return menu.map(function (menuItem, i) {
        if (menuItem.submenu) {
          return React__default.createElement(SubMenu, {
            key: '' + i + menuItem.label,
            theme: theme,
            menuRef: _this2.props.menuRef,
            changeCheckState: _this2.props.changeCheckState,
            menuItem: _extends({}, defaultMenuItem, menuItem, { type: 'submenu' }),
            path: [].concat(toConsumableArray(_this2.props.path), [i, 'submenu'])
          });
        }

        return React__default.createElement(MenuItem, {
          indx: i,
          key: '' + i + menuItem.label,
          theme: theme,
          changeCheckState: _this2.props.changeCheckState,
          menuItem: _extends({}, defaultMenuItem, menuItem),
          menuRef: _this2.props.menuRef,
          path: [].concat(toConsumableArray(_this2.props.path))
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          menuItem = _props.menuItem,
          theme = _props.theme;


      return React__default.createElement(
        MenuItem,
        {
          rectRef: this.setRef,
          menu: this.props.menu,
          theme: theme,
          menuItem: _extends({}, defaultMenuItem, menuItem)
        },
        React__default.createElement(
          MenuListContainer,
          {
            theme: theme,
            parentRef: this.itemRef,
            rect: this.itemRef && this.itemRef.getBoundingClientRect(),
            submenu: true
          },
          theme.menuSubLabelHeaders && React__default.createElement(
            'div',
            {
              style: _extends({}, SubMenuLabelStyle, {
                color: theme.menuSubLabelColor
              })
            },
            menuItem.label
          ),
          this._generateMenu(menuItem.submenu)
        )
      );
    }
  }]);
  return SubMenu;
}(React.Component);

SubMenu.propTypes = {
  menuItem: PropTypes.object,
  level: PropTypes.number,
  renderSide: PropTypes.string,
  changeCheckState: PropTypes.func
};

SubMenu.defaultProps = {
  menuItem: {},
  level: 1,
  renderSide: 'right',
  changeCheckState: function changeCheckState() {}
};

var css$4 = ".styles_MenuListOverlay__1kChh:focus {\n  outline: none;\n  border: none;\n  box-shadow: none;\n}\n";
var css$5 = { "MenuListOverlay": "styles_MenuListOverlay__1kChh" };
styleInject(css$4);

var styles$3 = {
  Wrapper: {
    zIndex: 8,
    position: 'absolute',
    overflow: 'hidden',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  },
  Overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  FoldOut: {
    background: 'transparent',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0
  },
  MenuPane: {
    pointerEvents: 'all',
    listStyleType: 'none',
    margin: 0,
    padding: 0
  },
  MenuFoldOut: {
    paddingTop: 5,
    paddingBottom: 5
  }
};

var MenuList = function (_Component) {
  inherits(MenuList, _Component);

  function MenuList(props) {
    classCallCheck(this, MenuList);

    var _this = possibleConstructorReturn(this, (MenuList.__proto__ || Object.getPrototypeOf(MenuList)).call(this, props));

    _this._generateMenu = _this._generateMenu.bind(_this);
    return _this;
  }

  createClass(MenuList, [{
    key: '_generateMenu',
    value: function _generateMenu() {
      var _this2 = this;

      var menu = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var _props = this.props,
          theme = _props.theme,
          parentRef = _props.parentRef;

      var rect = parentRef.getBoundingClientRect();
      return menu.map(function (menuItem, i) {
        if (menuItem.submenu || menuItem.type && menuItem.type.toLowerCase() === 'submenu') {
          return React__default.createElement(SubMenu, {
            key: '' + i + menuItem.label,
            parentRect: rect,
            theme: theme,
            menuRef: _this2.props.menuRef,
            changeCheckState: _this2.props.changeCheckState,
            menuItem: _extends({}, defaultMenuItem, menuItem, { type: 'submenu' }),
            path: _this2.props.vertical ? [].concat(toConsumableArray(_this2.props.path), [i, 'submenu']) : [].concat(toConsumableArray(_this2.props.path), ['submenu', i, 'submenu'])
          });
        }
        return React__default.createElement(MenuItem, {
          key: '' + i + menuItem.label,
          menuItem: _extends({}, defaultMenuItem, menuItem),
          changeCheckState: _this2.props.changeCheckState,
          menuRef: _this2.props.menuRef,
          theme: theme,
          indx: i,
          path: _this2.props.vertical ? [].concat(toConsumableArray(_this2.props.path)) : [].concat(toConsumableArray(_this2.props.path), ['submenu'])
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          submenu = _props2.submenu,
          theme = _props2.theme;


      var rect = this.props.parentRef.getBoundingClientRect();

      return React__default.createElement(
        'div',
        {
          style: _extends({}, styles$3.Wrapper, {
            top: rect.bottom
          })
        },
        React__default.createElement('div', {
          className: css$5.MenuListOverlay,
          style: _extends({}, styles$3.Overlay, {
            background: theme.menuOverlayBackground,
            opacity: theme.menuOverlayOpacity
          }),
          tabIndex: '-1'
        }),
        React__default.createElement(
          MenuListContainer,
          {
            theme: theme,
            rect: rect
          },
          theme.menuStyle === 'vertical' && theme.menuSubLabelHeaders && React__default.createElement(
            'div',
            {
              style: _extends({}, SubMenuLabelStyle, {
                color: theme.menuSubLabelColor
              }),
              key: 'main-menu-sublabel'
            },
            'Menu'
          ),
          this._generateMenu(submenu)
        )
      );
    }
  }]);
  return MenuList;
}(React.Component);

MenuList.propTypes = {
  submenu: PropTypes.array,
  path: PropTypes.array,
  changeCheckState: PropTypes.func
};

MenuList.defaultProps = {
  submenu: [],
  path: [],
  changeCheckState: function changeCheckState() {}
};

var styles$4 = {
  Wrapper: {
    height: '100%',
    display: 'flex',
    WebkitAppRegion: 'no-drag',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexShrink: 1,
    boxSizing: 'border-box'
  }
};

var MenuBar = function (_Component) {
  inherits(MenuBar, _Component);

  function MenuBar(props) {
    classCallCheck(this, MenuBar);

    var _this = possibleConstructorReturn(this, (MenuBar.__proto__ || Object.getPrototypeOf(MenuBar)).call(this, props));

    _this.updateMenu = function () {
      requestAnimationFrame(function () {
        if (_this.state.clicked || _this.state.focusing >= 0) {
          _this.setState({
            clicked: false,
            focusing: -1
          });
        }
        if (!_this.menuItems || !_this.menuItems.length) {
          return;
        }

        var availableSize = _this.menuBar.offsetWidth;
        var currentSize = 0;
        var full = false;
        var prevNumMenusShown = _this.numMenusShown;
        _this.numMenusShown = 0;

        _this.menuItems.forEach(function (menuItem) {
          if (!full) {
            var size = menuItem.offsetWidth;
            if (currentSize + size > availableSize) {
              full = true;
            } else {
              currentSize += size;
              _this.numMenusShown += 1;
              if (_this.numMenusShown > prevNumMenusShown) {
                // show previously hidden overflown element
                menuItem.style.visibility = 'visible';
              }
            }
            if (full) {
              // hide overflown item
              menuItem.style.visibility = 'hidden';
            }
          }
        });

        // we have overflow
        if (full) {
          // remove buttons until we can fit the more button
          while (currentSize + _this.overflowButtonRef.offsetWidth > availableSize && _this.numMenusShown > 0) {
            _this.numMenusShown -= 1;
            var size = _this.menuItems[_this.numMenusShown].offsetWidth;
            _this.menuItems[_this.numMenusShown].style.visibility = 'hidden';
            currentSize -= size;
          }

          // update overflow menu
          _this.setState({
            overflowMenu: [].concat(toConsumableArray(_this.state.menu.slice(_this.numMenusShown, _this.state.menu.length))),
            overflowIndex: _this.numMenusShown
          });
        } else {
          _this.setState({
            overflowMenu: [],
            overflowIndex: _this.menuItems.length
          });
        }
      });
    };

    _this.state = {
      hovering: -1,
      focusing: 0,
      clicked: false,
      menu: buildMenu(props.menu),
      overflowMenu: [],
      overflowIndex: props.menu.length || 0
    };

    _this._onMenuButtonMouseOver = _this._onMenuButtonMouseOver.bind(_this);
    _this._onTouchStart = _this._onTouchStart.bind(_this);
    _this._onMouseMove = _this._onMouseMove.bind(_this);
    _this._onMenuButtonClick = _this._onMenuButtonClick.bind(_this);
    _this._setMenuRef = _this._setMenuRef.bind(_this);
    _this._changeCheckState = _this._changeCheckState.bind(_this);
    _this._generateHorizontalMenu = _this._generateHorizontalMenu.bind(_this);
    _this._generateVerticalMenu = _this._generateVerticalMenu.bind(_this);
    _this._setKeyByPath = _this._setKeyByPath.bind(_this);
    _this._getKeyByPath = _this._getKeyByPath.bind(_this);
    _this.setKeyById = _this.setKeyById.bind(_this);
    _this.getKeyById = _this.getKeyById.bind(_this);
    _this.numMenusShown = 0;
    _this.menuItems = [];
    _this.resizeDebounce = debounce(_this.updateMenu, 16);
    return _this;
  }

  createClass(MenuBar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateMenu();
      window.addEventListener('resize', this.resizeDebounce);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.resizeDebounce);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.inActive !== this.props.inActive) {
        // on blur
        this.setState({
          clicked: false,
          focusing: -1
        });
      }
      if (nextProps.menu !== this.state.menu) {
        this.setState({
          menu: buildMenu(nextProps.menu)
        });
      }
    }
  }, {
    key: 'setKeyById',
    value: function setKeyById(id, key, val) {
      // get path to id
      var path = getMenuItemPathById(this.state.menu, id);
      if (path.length > 0) {
        this._setKeyByPath(path, key, val);
      }
    }
  }, {
    key: 'getKeyById',
    value: function getKeyById(id, key) {
      var path = getMenuItemPathById(this.state.menu, id);
      if (path.length > 0) {
        return this._getKeyByPath([].concat(toConsumableArray(path)), key);
      }
    }

    // if hovering over another button while menu is clicked; change focus

  }, {
    key: '_onMenuButtonMouseOver',
    value: function _onMenuButtonMouseOver(i) {
      if (this.state.clicked) {
        this.setState({
          focusing: i
        });
      }
    }

    // lock set to true to keep menu panes open

  }, {
    key: '_onTouchStart',
    value: function _onTouchStart(i) {
      if (i !== this.state.focusing && this.state.clicked) {
        this.lock = true;
      }
    }

    // if moving over a different menu button - select that menu button

  }, {
    key: '_onMouseMove',
    value: function _onMouseMove(i) {
      if (i === this.state.focusing) return;
      this.setState({
        focusing: i
      });
    }

    // when a menu button is clicked

  }, {
    key: '_onMenuButtonClick',
    value: function _onMenuButtonClick(index) {
      if (this.lock) {
        this.lock = false;
        return;
      }
      this.setState({
        clicked: !(this.state.focusing === index && this.state.clicked),
        hovering: !(this.state.focusing === index && this.state.clicked) ? this.state.hovering : -1
      });
    }

    // we need the rect's bounds for the child menu pane

  }, {
    key: '_setMenuRef',
    value: function _setMenuRef(ref, i) {
      if (this.menuItems) {
        this.menuItems[i] = ref;
      } else {
        this.menuItems = defineProperty({}, i, ref);
      }
    }

    // path: to current submenu
    // checked: new state

  }, {
    key: '_changeCheckState',
    value: function _changeCheckState(path, itemIndx, checked$$1) {
      var isRadio = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      if (!isRadio) {
        this._setKeyByPath([].concat(toConsumableArray(path), [itemIndx]), 'checked', checked$$1);
      } else {
        var newState = _extends({}, this.state);
        getProperty(path, this.state).forEach(function (menuItem, indx) {
          if (menuItem.type === 'radio') {
            newState = reduxSet(newState, [].concat(toConsumableArray(path), [indx, 'checked']), indx === itemIndx);
          }
        });
        this.setState(newState);
      }
    }
  }, {
    key: '_setKeyByPath',
    value: function _setKeyByPath(path, key, val) {
      this.setState(reduxSet(this.state, [].concat(toConsumableArray(path), [key]), val));
    }
  }, {
    key: '_getKeyByPath',
    value: function _getKeyByPath(path, key) {
      // if key is undefined -> the getKeyById will just return the menu item
      return getProperty(key ? [].concat(toConsumableArray(path), [key]) : [].concat(toConsumableArray(path)), this.state);
    }
  }, {
    key: '_generateHorizontalMenu',
    value: function _generateHorizontalMenu() {
      var _this2 = this;

      var menuObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var _state = this.state,
          overflowIndex = _state.overflowIndex,
          overflowMenu = _state.overflowMenu;

      var menuList = menuObj.map(function (menuItem, i) {
        return React__default.createElement(
          MenuButton,
          {
            key: '' + menuItem.label,
            onMouseEnter: function onMouseEnter() {
              if (menuItem.enabled === false) return;
              _this2.setState({
                hovering: i
              });
            },
            onMouseLeave: function onMouseLeave() {
              if (menuItem.enabled === false) return;
              _this2.setState({
                hovering: -1
              });
            },
            onMouseOver: function onMouseOver() {
              if (menuItem.enabled === false) return;
              _this2._onMenuButtonMouseOver(i);
            },
            onMouseMove: function onMouseMove() {
              if (menuItem.enabled === false) return;
              _this2._onMouseMove(i);
            },
            onTouchStart: function onTouchStart() {
              if (menuItem.enabled === false) return;
              _this2._onTouchStart(i);
            },
            onClick: function onClick() {
              if (menuItem.enabled === false) return;
              _this2._onMenuButtonClick(i);
            },
            rectRef: function rectRef(ref) {
              return _this2._setMenuRef(ref, i);
            },
            hovering: i === _this2.state.hovering,
            open: _this2.state.clicked && i === _this2.state.focusing,
            closed: !_this2.state.clicked || i !== _this2.state.focusing,
            enabled: menuItem.enabled,
            label: menuItem.label,
            theme: _this2.props.theme
          },
          _this2.state.clicked && i === _this2.state.focusing && React__default.createElement(MenuList, {
            menuRef: _this2,
            changeCheckState: _this2._changeCheckState,
            theme: _this2.props.theme,
            parentRef: _this2.menuItems[i],
            submenu: menuItem.submenu,
            mainIndex: i,
            path: ['menu', i]
          })
        );
      });

      // insert overflow button if needed
      menuList.splice(overflowIndex, 0, React__default.createElement(
        MenuButton,
        {
          key: 'more',
          label: '...',
          onMouseEnter: function onMouseEnter() {
            _this2.setState({
              hovering: overflowIndex
            });
          },
          onMouseLeave: function onMouseLeave() {
            _this2.setState({
              hovering: -1
            });
          },
          onMouseOver: function onMouseOver() {
            _this2._onMenuButtonMouseOver(overflowIndex);
          },
          onMouseMove: function onMouseMove() {
            _this2._onMouseMove(overflowIndex);
          },
          onTouchStart: function onTouchStart() {
            _this2._onTouchStart(overflowIndex);
          },
          onClick: function onClick() {
            _this2._onMenuButtonClick(overflowIndex);
          },
          rectRef: function rectRef(ref) {
            return _this2.overflowButtonRef = ref;
          },
          hovering: overflowIndex === this.state.hovering,
          open: this.state.clicked && overflowIndex === this.state.focusing,
          closed: !this.state.clicked || overflowIndex !== this.state.focusing,
          style: { visibility: this.hasOverflow ? 'visible' : 'hidden' },
          theme: this.props.theme
        },
        this.state.clicked && overflowIndex === this.state.focusing && React__default.createElement(MenuList, {
          menuRef: this,
          changeCheckState: this._changeCheckState,
          parentRef: this.overflowButtonRef,
          submenu: overflowMenu,
          theme: this.props.theme,
          path: ['menu'],
          vertical: true
        })
      ));

      return menuList;
    }
  }, {
    key: '_generateVerticalMenu',
    value: function _generateVerticalMenu() {
      var _this3 = this;

      var menuList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      return React__default.createElement(
        MenuButton,
        {
          onMouseEnter: function onMouseEnter() {
            _this3.setState({
              hovering: 0
            });
          },
          onMouseLeave: function onMouseLeave() {
            _this3.setState({
              hovering: -1
            });
          },
          onMouseOver: function onMouseOver() {
            _this3._onMenuButtonMouseOver(0);
          },
          onMouseMove: function onMouseMove() {
            _this3._onMouseMove(0);
          },
          onTouchStart: function onTouchStart() {
            _this3._onTouchStart(0);
          },
          onClick: function onClick() {
            _this3._onMenuButtonClick(0);
          },
          onFocus: function onFocus() {
            // idk - linting says it needs it? it has no purpose for me
          },
          theme: this.props.theme,
          rectRef: function rectRef(ref) {
            return _this3._setMenuRef(ref, 0);
          },
          hovering: this.state.hovering === 0,
          open: this.state.clicked && this.state.focusing === 0,
          closed: !this.state.clicked || this.state.focusing !== 0,
          label: React__default.createElement(MenuIcon, null),
          enabled: true
        },
        this.state.clicked && this.state.focusing === 0 && React__default.createElement(MenuList, {
          menuRef: this,
          changeCheckState: this._changeCheckState,
          parentRef: this.menuItems[0],
          theme: this.props.theme,
          submenu: menuList,
          path: ['menu'],
          vertical: true
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props = this.props,
          theme = _props.theme,
          inActive = _props.inActive;

      var color = theme.menuItemTextColor || theme.barColor;
      var opacity = inActive ? theme.inActiveOpacity : 1;
      var marginRight = theme.menuStyle === 'stacked' ? theme.stackedMenuMarginRight : undefined;
      return React__default.createElement(
        'div',
        {
          ref: function ref(r) {
            return _this4.menuBar = r;
          },
          style: _extends({}, styles$4.Wrapper, { color: color, opacity: opacity, marginRight: marginRight }),
          role: 'menubar'
        },
        theme.menuStyle === 'vertical' ? this._generateVerticalMenu(this.state.menu) : this._generateHorizontalMenu(this.state.menu)
      );
    }
  }, {
    key: 'menuBarWidth',
    get: function get$$1() {
      return this.menuBar.clientWidth;
    }
  }, {
    key: 'menuBarHeight',
    get: function get$$1() {
      return this.menuBar.clientHeight;
    }
  }, {
    key: 'hasOverflow',
    get: function get$$1() {
      return this.numMenusShown < this.menuItems.length;
    }
  }, {
    key: 'getWidth',
    get: function get$$1() {
      if (this.menuItems) {
        var left = this.menuItems[0].buttonElement.getBoundingClientRect().left;
        var right = this.hasOverflow ? this.overflowMenu.buttonElement.getBoundingClientRect().right : this.menuItems[this.menuItems.length - 1].getBoundingClientRect().right;
        return right - left;
      }

      return 0;
    }
  }, {
    key: 'getOverflowIndex',
    get: function get$$1() {
      return this.hasOverflow ? this.overflowIndex : this.menuItems.length - 1;
    }
  }]);
  return MenuBar;
}(React.Component);

MenuBar.propTypes = {
  menu: PropTypes.array,
  inActive: PropTypes.bool
};

MenuBar.defaultProps = {
  menu: []
};

var styles$5 = {
  Bar: {
    flexGrow: 0,
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'row',
    fontSize: '12px',
    WebkitAppRegion: 'drag',
    userSelect: 'none',
    alignItems: 'center',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif'
  }
};

var currentWindow = electron__default.remote.getCurrentWindow();

var Bar = function (_React$Component) {
  inherits(Bar, _React$Component);

  function Bar(props) {
    classCallCheck(this, Bar);

    var _this = possibleConstructorReturn(this, (Bar.__proto__ || Object.getPrototypeOf(Bar)).call(this, props));

    _this.handleDoubleClick = _this.handleDoubleClick.bind(_this);
    return _this;
  }

  createClass(Bar, [{
    key: 'handleDoubleClick',
    value: function handleDoubleClick(e) {
      var winRect = currentWindow.getBounds();

      var _electron$screen$getD = electron__default.screen.getDisplayNearestPoint({ x: winRect.x, y: winRect.y }),
          workArea = _electron$screen$getD.workArea;

      currentWindow.setBounds(workArea, true);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          theme = _props.theme,
          children = _props.children,
          isWin = _props.isWin;

      var height = isWin ? theme.winBarHeight : theme.barHeight;
      var backgroundColor = theme.barBackgroundColor;
      var color = theme.barColor;
      var padding = !isWin ? '0 70px' : 0;
      var borderBottom = theme.barShowBorder ? theme.barBorderBottom : '';

      return React__default.createElement(
        'div',
        {
          style: _extends({}, styles$5.Bar, { height: height, backgroundColor: backgroundColor, color: color, borderBottom: borderBottom, padding: padding }),
          onDoubleClick: this.handleDoubleClick
        },
        children
      );
    }
  }]);
  return Bar;
}(React__default.Component);

Bar.defaultProps = {
  isWin: false
};

var styles$6 = {
  Title: {
    flex: '0 1 auto',
    fontSize: '12px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  }
};

var Title = function (_React$Component) {
  inherits(Title, _React$Component);

  function Title() {
    classCallCheck(this, Title);
    return possibleConstructorReturn(this, (Title.__proto__ || Object.getPrototypeOf(Title)).apply(this, arguments));
  }

  createClass(Title, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          theme = _props.theme,
          isWin = _props.isWin,
          children = _props.children,
          flex = _props.flex,
          inActive = _props.inActive,
          align = _props.align;

      var lineHeight = isWin ? theme.winBarHeight : theme.barHeight;
      var padding = isWin ? '0px 4px' : 0;
      var color = theme.barTitleColor;
      var fontFamily = theme.titleFontFamily;
      var fontWeight = theme.titleFontWeight;
      var opacity = inActive ? theme.inActiveOpacity : 1;
      var marginLeft = !isWin && theme.showIconDarwin ? 0 : align === 'left' ? 0 : 'auto';
      var marginRight = align === 'center' ? 'auto' : 0;

      return React__default.createElement(
        'div',
        {
          style: _extends({}, styles$6.Title, { marginLeft: marginLeft, marginRight: marginRight, lineHeight: lineHeight, color: color, flex: flex, fontFamily: fontFamily, fontWeight: fontWeight, opacity: opacity, padding: padding })
        },
        children
      );
    }
  }]);
  return Title;
}(React__default.Component);

var styles$7 = {
  ResizeHandle: {
    position: 'absolute',
    top: 0,
    left: 0,
    WebkitAppRegion: 'no-drag'
  },
  ResizeLeft: {
    width: '3px'
  },
  ResizeTop: {
    width: '100%',
    height: '3px'
  }
};

var ResizeHandle = function (_React$Component) {
  inherits(ResizeHandle, _React$Component);

  function ResizeHandle() {
    classCallCheck(this, ResizeHandle);
    return possibleConstructorReturn(this, (ResizeHandle.__proto__ || Object.getPrototypeOf(ResizeHandle)).apply(this, arguments));
  }

  createClass(ResizeHandle, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          height = _props.height,
          left = _props.left;

      return React__default.createElement('div', {
        style: _extends({}, styles$7.ResizeHandle, left ? styles$7.ResizeLeft : styles$7.ResizeTop, { height: height })
      });
    }
  }]);
  return ResizeHandle;
}(React__default.Component);

ResizeHandle.defaultProps = {
  left: PropTypes.bool,
  top: PropTypes.bool
};

var styles$8 = {
  Icon: {
    height: '16px',
    width: '16px',
    margin: '0px 6px'
  }
};

var Icon = function (_React$Component) {
  inherits(Icon, _React$Component);

  function Icon() {
    classCallCheck(this, Icon);
    return possibleConstructorReturn(this, (Icon.__proto__ || Object.getPrototypeOf(Icon)).apply(this, arguments));
  }

  createClass(Icon, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          src = _props.src,
          onIconClick = _props.onIconClick,
          notWin = _props.notWin;

      var marginLeft = notWin ? 'auto' : '6px';
      return React__default.createElement('img', {
        src: src,
        alt: 'app-icon',
        onClick: onIconClick,
        style: _extends({}, styles$8.Icon, { marginLeft: marginLeft })
      });
    }
  }]);
  return Icon;
}(React__default.Component);

Icon.defaultProps = {
  src: PropTypes.string,
  onIconClick: PropTypes.func
};

var css$6 = ".styles_FramelessTitlebarButton__21ntn svg {\n  pointer-events: none;\n  fill: currentColor;\n}\n\n.styles_FramelessTitlebarButton__21ntn:focus {\n  outline: none;\n}\n\n.styles_FramelessTitlebarButton__21ntn:hover {\n  opacity: 1;\n}\n\n.styles_FramelessTitlebarButton__21ntn:hover:active {\n  transition: none;\n  opacity: 1;\n}\n";
var styles$9 = { "FramelessTitlebarButton": "styles_FramelessTitlebarButton__21ntn" };
styleInject(css$6);

var style = {
  Container: {
    WebkitAppRegion: 'no-drag',
    position: 'relative',
    padding: 0,
    margin: 0,
    overflow: 'hidden',
    boxShadow: 'none',
    borderRadius: 0,
    backgroundColor: 'transparent',
    transition: 'background-color 0.25s ease',
    opacity: 0.5,
    boxSizing: 'content-box'
  },
  WindowsContainer: {
    width: '46px',
    height: '100%'
  },
  LinuxContainer: {
    marginRight: '5px',
    width: '16px',
    height: '16px',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: '50%'
  }
};

var Button = function (_Component) {
  inherits(Button, _Component);

  function Button(props) {
    classCallCheck(this, Button);

    var _this = possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, props));

    _this.toggleHover = function () {
      _this.setState({
        hovering: !_this.state.hovering
      });
    };

    _this.toggleFocus = function () {
      _this.setState({
        focused: !_this.state.focused
      });
    };

    _this.state = {
      hovering: false,
      focused: false
    };
    return _this;
  }

  createClass(Button, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          ariaLabel = _props.ariaLabel,
          tabIndex = _props.tabIndex,
          disabled = _props.disabled,
          close = _props.close,
          onClick = _props.onClick,
          theme = _props.theme,
          isWin = _props.isWin;
      var _state = this.state,
          hovering = _state.hovering,
          focused = _state.focused;


      var backgroundColor = !isWin && close ? theme.linuxCloseBackground : 'transparent';
      var opacity = !isWin && close ? 1 : 0.5;
      var border = !isWin ? theme.linuxBorder : 'none';
      var transition = 'background-color 0.25s ease';
      var color = !isWin && close ? theme.linuxCloseColor : theme.windowControlsColor;
      if (focused) {
        opacity = 1;
        color = close ? theme.windowCloseHover : undefined;
        backgroundColor = close ? isWin ? theme.windowCloseActive : theme.linuxCloseActive : theme.windowDefaultActive;
        transition = 'none';
      } else if (hovering) {
        opacity = 1;
        color = close ? theme.windowCloseHover : undefined;
        backgroundColor = close ? isWin ? theme.windowCloseBackground : theme.linuxCloseBackground : theme.windowDefaultBackground;
      }

      return React__default.createElement(
        'button',
        {
          className: styles$9.FramelessTitlebarButton,
          style: _extends({}, style.Container, isWin ? style.WindowsContainer : style.LinuxContainer, {
            backgroundColor: backgroundColor,
            opacity: opacity,
            transition: transition,
            color: color,
            border: border
          }),
          onFocus: this.toggleFocus,
          onBlur: this.toggleFocus,
          onMouseEnter: this.toggleHover,
          onMouseLeave: this.toggleHover,
          onClick: onClick,
          'aria-label': ariaLabel,
          tabIndex: tabIndex,
          disabled: disabled
        },
        this.props.children
      );
    }
  }]);
  return Button;
}(React.Component);

var currentWindow$1 = electron__default.remote.getCurrentWindow();

var styles$a = {
  Container: {
    flexGrow: 0,
    flexShrink: 0,
    marginLeft: 'auto',
    fontFamily: 'initial',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    zIndex: 2000,
    alignItems: 'center',
    boxSizing: 'border-box',
    height: '100%'
  },
  ControlsContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center'
  },
  ActionsContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row'
  }
};

var WindowControls = function (_Component) {
  inherits(WindowControls, _Component);

  function WindowControls(props) {
    classCallCheck(this, WindowControls);

    var _this = possibleConstructorReturn(this, (WindowControls.__proto__ || Object.getPrototypeOf(WindowControls)).call(this, props));

    _this.state = {
      isMaximized: currentWindow$1.isMaximized()
    };
    _this.onMaximizeClicked = _this.onMaximizeClicked.bind(_this);
    _this.onMinimizeClicked = _this.onMinimizeClicked.bind(_this);
    _this.onCloseClicked = _this.onCloseClicked.bind(_this);
    _this.handleMaximize = _this.handleMaximize.bind(_this);
    _this.handleUnMaximize = _this.handleUnMaximize.bind(_this);
    _this.setMaximized = _this.setMaximized.bind(_this);
    return _this;
  }

  createClass(WindowControls, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      currentWindow$1.on('maximize', this.handleMaximize);
      currentWindow$1.on('unmaximize', this.handleUnMaximize);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      currentWindow$1.removeListener('maximize', this.handleMaximize);
      currentWindow$1.removeListener('unmaximize', this.handleUnMaximize);
    }
  }, {
    key: 'handleUnMaximize',
    value: function handleUnMaximize() {
      this.setMaximized(false);
    }
  }, {
    key: 'handleMaximize',
    value: function handleMaximize() {
      this.setMaximized(true);
    }
  }, {
    key: 'setMaximized',
    value: function setMaximized(isMaximized) {
      this.setState({ isMaximized: isMaximized });
    }
  }, {
    key: 'onMaximizeClicked',
    value: function onMaximizeClicked(e) {
      var _this2 = this;

      e.target.blur();
      requestAnimationFrame(function () {
        if (_this2.isMaximizable) {
          if (currentWindow$1.isMaximized()) {
            currentWindow$1.unmaximize();
          } else {
            currentWindow$1.maximize();
          }
        }
      });
    }
  }, {
    key: 'onMinimizeClicked',
    value: function onMinimizeClicked(e) {
      var _this3 = this;

      e.target.blur();
      requestAnimationFrame(function () {
        if (_this3.isMinimizable) {
          currentWindow$1.minimize();
        }
      });
    }
  }, {
    key: 'onCloseClicked',
    value: function onCloseClicked(e) {
      e.target.blur();
      requestAnimationFrame(function () {
        currentWindow$1.close();
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          theme = _props.theme,
          isWin = _props.isWin;
      var isMaximized = this.state.isMaximized;


      return React__default.createElement(
        'div',
        { style: _extends({}, styles$a.Container, { marginLeft: isWin || (!isWin && theme.controlsLayout) === 'right' ? 'auto' : 0 }) },
        this.props.windowActions && React__default.createElement(
          'div',
          { style: styles$a.ActionsContainer },
          this.props.windowActions
        ),
        React__default.createElement(
          'div',
          { style: styles$a.ControlsContainer },
          React__default.createElement(
            Button,
            {
              theme: theme,
              key: 'min-button',
              ariaLabel: 'minimize',
              tabIndex: '-1',
              disabled: !this.isMinimizable,
              onClick: this.onMinimizeClicked,
              isWin: isWin
            },
            React__default.createElement(MimimizeIcon, { isWin: isWin })
          ),
          React__default.createElement(
            Button,
            {
              theme: theme,
              key: 'max-button',
              ariaLabel: 'maximize',
              tabIndex: '-1',
              disabled: !this.isMaximizable,
              onClick: this.onMaximizeClicked,
              isWin: isWin
            },
            isMaximized ? React__default.createElement(RestoreIcon, { isWin: isWin }) : React__default.createElement(MaximizeIcon, { isWin: isWin })
          ),
          React__default.createElement(
            Button,
            {
              theme: theme,
              key: 'close-button',
              'aria-label': 'close',
              tabIndex: '-1',
              onClick: this.onCloseClicked,
              isWin: isWin,
              close: true
            },
            React__default.createElement(CloseIcon, { isWin: isWin })
          )
        )
      );
    }
  }, {
    key: 'isMinimizable',
    get: function get$$1() {
      var disableMinimize = this.props.disableMinimize;

      return !disableMinimize || !currentWindow$1.isMinimizable();
    }
  }, {
    key: 'isMaximizable',
    get: function get$$1() {
      var disableMaximize = this.props.disableMaximize;

      return !disableMaximize || !currentWindow$1.isResizable() || !currentWindow$1.isMaximizable();
    }
  }]);
  return WindowControls;
}(React.Component);


WindowControls.propTypes = {
  disableMinimize: PropTypes.bool,
  disableMaximize: PropTypes.bool
};

WindowControls.defaultProps = {
  disableMinimize: false,
  disableMaximize: false
};

var currentWindow$2 = electron__default.remote.getCurrentWindow();

var TitleBar = function (_Component) {
  inherits(TitleBar, _Component);

  function TitleBar(props) {
    classCallCheck(this, TitleBar);

    var _this = possibleConstructorReturn(this, (TitleBar.__proto__ || Object.getPrototypeOf(TitleBar)).call(this, props));

    _this.state = {
      inActive: !currentWindow$2.isFocused()
    };
    _this.setKeyById = _this.setKeyById.bind(_this);
    _this.getKeyById = _this.getKeyById.bind(_this);
    _this._generatePlatformChildren = _this._generatePlatformChildren.bind(_this);
    _this._handleBlur = _this._handleBlur.bind(_this);
    _this._handleFocus = _this._handleFocus.bind(_this);
    return _this;
  }

  createClass(TitleBar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      currentWindow$2.on('focus', this._handleFocus);
      currentWindow$2.on('blur', this._handleBlur);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      currentWindow$2.removeListener('focus', this._handleFocus);
      currentWindow$2.removeListener('blur', this._handleBlur);
    }
  }, {
    key: '_handleBlur',
    value: function _handleBlur() {
      this._setInActive(true);
    }
  }, {
    key: '_handleFocus',
    value: function _handleFocus() {
      this._setInActive(false);
    }
  }, {
    key: '_setInActive',
    value: function _setInActive(inActive) {
      this.setState({
        inActive: inActive
      });
    }
  }, {
    key: 'setKeyById',
    value: function setKeyById(id, key, value) {
      return this.Menu.setKeyById(id, key, value);
    }
  }, {
    key: 'getKeyById',
    value: function getKeyById(id, key) {
      return this.Menu.getKeyById(id, key);
    }
  }, {
    key: '_generatePlatformChildren',
    value: function _generatePlatformChildren(_ref) {
      var _this2 = this;

      var icon = _ref.icon,
          app = _ref.app,
          title = _ref.title,
          platform = _ref.platform,
          menu = _ref.menu,
          children = _ref.children,
          currentTheme = _ref.currentTheme,
          disableMaximize = _ref.disableMaximize,
          disableMinimize = _ref.disableMinimize,
          windowActions = _ref.windowActions,
          inActive = _ref.inActive;


      if (platform === 'darwin') {
        return React__default.createElement(
          Bar,
          {
            theme: currentTheme
          },
          React__default.createElement(ResizeHandle, { top: true }),
          React__default.createElement(ResizeHandle, { height: currentTheme.barHeight, left: true }),
          icon && currentTheme.showIconDarwin && React__default.createElement(Icon, {
            notWin: true,
            src: icon
          }),
          (title || app) && React__default.createElement(
            Title,
            {
              theme: currentTheme,
              inActive: inActive,
              align: 'center'
            },
            title || app
          ),
          children
        );
      }

      if (currentTheme.menuStyle === 'stacked') {
        return React__default.createElement(
          React.Fragment,
          null,
          React__default.createElement(
            Bar,
            {
              isWin: true,
              inActive: inActive,
              theme: currentTheme
            },
            React__default.createElement(ResizeHandle, { top: true }),
            React__default.createElement(ResizeHandle, { height: currentTheme.winBarHeight, left: true }),
            platform !== 'win32' && currentTheme.controlsLayout === 'left' && React__default.createElement(WindowControls, {
              isWin: platform === 'win32',
              theme: currentTheme,
              disableMinimize: disableMinimize,
              disableMaximize: disableMaximize,
              windowActions: windowActions
            }),
            icon && React__default.createElement(Icon, {
              src: icon
            }),
            app && React__default.createElement(
              Title,
              {
                isWin: true,
                inActive: inActive,
                theme: currentTheme,
                align: 'left'
              },
              app
            ),
            title && React__default.createElement(
              Title,
              {
                isWin: true,
                inActive: inActive,
                theme: currentTheme,
                align: 'center'
              },
              title
            ),
            children,
            (platform === 'win32' || platform !== 'win32' && currentTheme.controlsLayout === 'right') && React__default.createElement(WindowControls, {
              isWin: platform === 'win32',
              theme: currentTheme,
              disableMinimize: disableMinimize,
              disableMaximize: disableMaximize,
              windowActions: windowActions
            })
          ),
          React__default.createElement(
            Bar,
            {
              isWin: true,
              inActive: inActive,
              theme: currentTheme
            },
            React__default.createElement(MenuBar, {
              ref: function ref(r) {
                _this2.Menu = r;
              },
              inActive: inActive,
              theme: currentTheme,
              menu: menu
            })
          )
        );
      }

      return React__default.createElement(
        Bar,
        {
          isWin: true,
          inActive: inActive,
          theme: currentTheme
        },
        React__default.createElement(ResizeHandle, { top: true }),
        React__default.createElement(ResizeHandle, { height: currentTheme.winBarHeight, left: true }),
        platform !== 'win32' && currentTheme.controlsLayout === 'left' && React__default.createElement(WindowControls, {
          isWin: platform === 'win32',
          theme: currentTheme,
          disableMinimize: disableMinimize,
          disableMaximize: disableMaximize,
          windowActions: windowActions
        }),
        currentTheme.menuStyle === 'vertical' && React__default.createElement(MenuBar, {
          ref: function ref(r) {
            _this2.Menu = r;
          },
          theme: currentTheme,
          inActive: inActive,
          menu: menu
        }),
        icon && React__default.createElement(Icon, {
          src: icon
        }),
        app && React__default.createElement(
          Title,
          {
            isWin: true,
            theme: currentTheme,
            inActive: inActive,
            align: 'left'
          },
          app
        ),
        currentTheme.menuStyle === 'horizontal' && React__default.createElement(MenuBar, {
          ref: function ref(r) {
            _this2.Menu = r;
          },
          theme: currentTheme,
          inActive: inActive,
          menu: menu
        }),
        title && React__default.createElement(
          Title,
          {
            isWin: true,
            theme: currentTheme,
            inActive: inActive,
            align: 'center'
          },
          title
        ),
        children,
        (platform === 'win32' || platform !== 'win32' && currentTheme.controlsLayout === 'right') && React__default.createElement(WindowControls, {
          isWin: platform === 'win32',
          theme: currentTheme,
          disableMinimize: disableMinimize,
          disableMaximize: disableMaximize,
          windowActions: windowActions
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          theme = _props.theme,
          platform = _props.platform;
      var inActive = this.state.inActive;


      var currentTheme = _extends({}, theme.barTheme === 'light' ? lightTheme : darkTheme, theme);

      return this._generatePlatformChildren(_extends({}, this.props, {
        currentTheme: currentTheme,
        inActive: inActive,
        platform: platform === 'default' ? os.platform() : platform || os.platform()
      }));
    }
  }]);
  return TitleBar;
}(React.Component);

TitleBar.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.string,
  title: PropTypes.string,
  platform: PropTypes.string,
  theme: PropTypes.object,
  /* Menu */
  menu: PropTypes.array,
  /* Window */
  disableMinimize: PropTypes.bool,
  disableMaximize: PropTypes.bool
};

TitleBar.defaultProps = {
  children: null,

  /* Main */
  icon: '',
  name: '',
  title: '',
  platform: '',
  theme: {},

  /* WindowControls */
  disableMinimize: false,
  disableMaximize: false,

  /* Menu */
  menu: []
};

module.exports = TitleBar;
//# sourceMappingURL=index.js.map
