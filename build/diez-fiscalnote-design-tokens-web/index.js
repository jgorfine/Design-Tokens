// This file was generated with Diez - https://diez.org
// Do not edit this file directly.

module.exports = {};

if (typeof process === 'undefined' || !process) {
  process = {env: {}};
} else if (!process.env) {
  Object.defineProperty(process, 'env', {
    value: {},
  });
}

const Environment = {
  serverUrl: process.env.DIEZ_SERVER_URL || '/diez',
  isHot: process.env.DIEZ_IS_HOT,
};

const diezHTMLExtensions = [];

class Diez {
  constructor (componentType) {
    if (typeof document !== 'undefined') {
      this.iframe = document.createElement('iframe');
    } else {
      this.iframe = {};
    }

    this.componentType = componentType;
    this.component = new this.componentType();
    this.subscribers = [];
  }

  static applyHTMLExtensions () {
    diezHTMLExtensions.forEach((extension) => {
      if (extension instanceof Function) {
        extension();
      }
    });
  }

  broadcast () {
    for (const subscriber of this.subscribers) {
      subscriber(this.component);
    }
  }

  subscribe (subscriber) {
    this.subscribers.push(subscriber);
  }

  attach (subscriber) {
    subscriber(this.component);
    if (!Environment.isHot) {
      return;
    }
    this.subscribe(subscriber);
    if (this.iframe.contentWindow) {
      return;
    }
    this.iframe.src = `${Environment.serverUrl}/components/${this.component.constructor.name}`;
    this.iframe.width = '0';
    this.iframe.height = '0';
    this.iframe.style.display = 'none';

    if (typeof document !== 'undefined') {
      document.body.appendChild(this.iframe);
      window.addEventListener('message', (event) => {
        if (event.source === this.iframe.contentWindow && event.origin.startsWith(Environment.serverUrl)) {
          this.component = new this.componentType(JSON.parse(event.data));
          this.broadcast();
        }
      });
    }
  }
}

module.exports.Diez = Diez;

/**
 * A component encapsulating color, including alpha transparency.
 * 
 * You can use the provided static constructors [[Color.rgb]], [[Color.rgba]], [[Color.hsl]], [[Color.hsla]], and
 * [[Color.hex]] to conveniently create color primitives using familiar patterns for color specification.
 *
 */
class Color {
  constructor({
    h,
    s,
    l,
    a
  }) {
    /**
     * Provides simple hue-saturation-lightness-alpha color data.
     *
     * 0
     */
    this.h = h;
    /**
     * Provides simple hue-saturation-lightness-alpha color data.
     *
     * 0
     */
    this.s = s;
    /**
     * Provides simple hue-saturation-lightness-alpha color data.
     *
     * 0.9490196078431372
     */
    this.l = l;
    /**
     * Provides simple hue-saturation-lightness-alpha color data.
     *
     * 1
     */
    this.a = a;
  }
}


module.exports.Color = Color;

const {colorToCss, colorToLowFidelityCss} = require('@diez/web-sdk-common');

Object.defineProperties(Color.prototype, {
  color: {
    get () {
      return colorToCss(this);
    },
  },
  lowFidelityColor: {
    get () {
      return colorToLowFidelityCss(this);
    },
  },
  colorStyle: {
    get () {
      return {
        color: this.color,
      };
    },
  },
  backgroundColorStyle: {
    get () {
      return {
        backgroundColor: this.color,
      };
    },
  },
  borderColorStyle: {
    get () {
      return {
        borderColor: this.color,
      };
    },
  },
  outlineColorStyle: {
    get () {
      return {
        outlineColor: this.color,
      };
    },
  },
});

/**
 * Provides a gradient stop.
 *
 */
class GradientStop {
  constructor({
    position,
    color
  }) {
    /**
     * GradientStop data.
     *
     * 1
     */
    this.position = position;
    /**
     * GradientStop data.
     *
     * hsla(0, 0, 0, 1)
     */
    this.color = new Color(color);
  }
}


module.exports.GradientStop = GradientStop;

/**
 * Provides a two dimensional point.
 * 
 * Taken alone, points are designated in an abstract space with no inherit dimensions or directionality. In the
 * context of other prefabs like [[LinearGradient]], points typically should use the standard two dimensional graphics
 * space, often normalized in the unit square, where x increases from left to right and y increases from top to bottom.
 * 
 * Usage: `point = Point2D.make(0.5, 0.5);`.
 *
 */
class Point2D {
  constructor({
    x,
    y
  }) {
    /**
     * Point data.
     *
     * 0.5
     */
    this.x = x;
    /**
     * Point data.
     *
     * 0
     */
    this.y = y;
  }
}


module.exports.Point2D = Point2D;

/**
 * Provides a linear gradient.
 *
 */
class LinearGradient {
  constructor({
    stops,
    start,
    end
  }) {
    this.stops = stops.map((value1) => new GradientStop(value1));
    /**
     * LinearGradient data.
     *
     * [0.5, 0]
     */
    this.start = new Point2D(start);
    /**
     * LinearGradient data.
     *
     * [0.5, 1]
     */
    this.end = new Point2D(end);
  }
}


module.exports.LinearGradient = LinearGradient;

const {linearGradientToCss} = require('@diez/web-sdk-common');

Object.defineProperties(LinearGradient.prototype, {
  linearGradient: {
    get () {
      return linearGradientToCss(this);
    },
  },
  backgroundImageStyle: {
    get () {
      return {
        backgroundImage: this.linearGradient,
      };
    },
  },
  backgroundStyle: {
    get () {
      return {
        background: this.linearGradient,
      };
    },
  },
});

/**
 * You can collect anything inside a Diez component. Design tokens specified as
 * properties will be made available in the SDKs transpiled with Diez.
 *
 */
class Palette {
  constructor({
    contentBackground = {h: 0, s: 0, l: 0.9490196078431372, a: 1},
    text = {h: 0.5079365079365079, s: 0.5951417004048584, l: 0.515686274509804, a: 1},
    caption = {h: 0.8186274509803922, s: 0.31481481481481477, l: 0.21176470588235297, a: 1},
    headerBackground = {stops: [{position: 0, color: {h: 0.8186274509803922, s: 0.31481481481481477, l: 0.21176470588235297, a: 1}}, {position: 1, color: {h: 0, s: 0, l: 0, a: 1}}], start: {x: 0.5, y: 0}, end: {x: 0.5, y: 1}}
  } = {}) {
    /**
     * hsla(0, 0, 0.95, 1)
     */
    this.contentBackground = new Color(contentBackground);
    /**
     * hsla(0.51, 0.6, 0.52, 1)
     */
    this.text = new Color(text);
    /**
     * hsla(0.82, 0.31, 0.21, 1)
     */
    this.caption = new Color(caption);
    /**
     * start [0.5, 0], end [0.5, 1], stops: [hsla(0.82, 0.31, 0.21, 1) at 0,hsla(0, 0, 0, 1) at 1]
     */
    this.headerBackground = new LinearGradient(headerBackground);
  }
}


module.exports.Palette = Palette;

/**
 * Provides a container for referencing local assets, which can be bridged by compilers to embed images, SVGs,
 * and more. This component is used internally by [[Image]] and [[Font]].
 * 
 * The compiler may enforce certain restrictions on the `type` of a `File` instance.
 * 
 * Usage: `file = new File({src: 'assets/images/file.jpg', type: FileType.Image});`.
 *
 */
class File {
  constructor({
    src,
    type
  }) {
    /**
     * File data.
     *
     * assets/SourceSansPro-Regular.ttf
     */
    this.src = src;
    /**
     * File data.
     *
     * font
     */
    this.type = type;
  }
}


module.exports.File = File;

Object.defineProperties(File.prototype, {
  url: {
    get () {
      return `${Environment.serverUrl}/${this.src}`;
    },
  },
});

/**
 * A representation of a font resource, with a reference to a [[File]] containing a TTF or OTF font file.
 *
 */
class Font {
  constructor({
    file,
    name,
    fallbacks,
    weight,
    style
  }) {
    /**
     * Font data.
     *
     * assets/SourceSansPro-Regular.ttf
     */
    this.file = new File(file);
    /**
     * Font data.
     *
     * SourceSansPro-Regular
     */
    this.name = name;
    /**
     * Font data.
     *
     * [sans-serif]
     */
    this.fallbacks = fallbacks;
    /**
     * Font data.
     *
     * 400
     */
    this.weight = weight;
    /**
     * Font data.
     *
     * normal
     */
    this.style = style;
  }
}


module.exports.Font = Font;

/**
 * Describes a typograph including specification of a font name (understood to specify both a font face and a font
 * weight) as well as a font size in device-local units and a font color.
 *
 */
class Typograph {
  constructor({
    font,
    fontSize,
    color,
    lineHeight,
    letterSpacing,
    alignment,
    decoration
  }) {
    /**
     * Typograph data.
     *
     * SourceSansPro-Regular, 400, normal
     */
    this.font = new Font(font);
    /**
     * Typograph data.
     *
     * 24
     */
    this.fontSize = fontSize;
    /**
     * Typograph data.
     *
     * hsla(0.51, 0.6, 0.52, 1)
     */
    this.color = new Color(color);
    /**
     * Typograph data.
     *
     * -1
     */
    this.lineHeight = lineHeight;
    /**
     * Typograph data.
     *
     * 0
     */
    this.letterSpacing = letterSpacing;
    /**
     * Typograph data.
     *
     * natural
     */
    this.alignment = alignment;
    /**
     * Typograph data.
     *
     * []
     */
    this.decoration = decoration;
  }
}


module.exports.Typograph = Typograph;

const {fontToCss, FontFormats, textAlignmentToCss, textDecorationsToCss, GoogleFontCollection, GoogleFont} = require('@diez/web-sdk-common');

let styleSheet;
let cache;
const googleFontCollection = new GoogleFontCollection();

const registerFont = (font) => {
  if (!styleSheet || !cache) {
    const styleEl = document.createElement('style');
    document.head.appendChild(styleEl);
    styleSheet = styleEl.sheet;
    cache = new Set();
  }

  if (cache.has(font.file.src)) {
    return;
  }

  if (GoogleFont.isGoogleFont(font)) {
    googleFontCollection.set(font.name, {weight: font.weight, style: font.style});
    styleSheet.insertRule(`@import url(${collection.url})`);
    cache.add(font.file.src);
    return;
  }

  const format = font.file.src.split('.').pop();
  const rule = `
@font-face {
  font-family: '${font.name}';
  font-weight: ${font.weight};
  font-style: ${font.style};
  src: local('${font.name}'), url(${font.file.url}) format('${FontFormats[format] || format}');
}`;
  styleSheet.insertRule(rule);
  cache.add(font.file.src);
};

Object.defineProperties(Typograph.prototype, {
  fontFamily: {
    get () {
      registerFont(this.font);
      return fontToCss(this.font);
    },
  },
  style: {
    get () {
      const style = {
        fontFamily: this.fontFamily,
        fontWeight: this.font.fontWeight,
        fontStyle: this.font.fontStyle,
        fontSize: `${this.fontSize}px`,
        color: this.color.color,
        letterSpacing: `${this.letterSpacing}px`,
        textAlign: textAlignmentToCss(this.alignment),
        textDecoration: textDecorationsToCss(this.decoration),
      };
      if (this.lineHeight !== -1) {
        style.lineHeight = `${this.lineHeight}px`;
      }
      return style;
    },
  },
});

Typograph.prototype.applyStyle = function (ref) {
  const style = this.style;
  ref.style.fontFamily = style.fontFamily;
  ref.style.fontWeight = style.fontWeight;
  ref.style.fontStyle = style.fontStyle;
  ref.style.fontSize = style.fontSize;
  ref.style.color = style.color;
  ref.style.lineHeight = style.lineHeight;
  ref.style.letterSpacing = style.letterSpacing;
  ref.style.textAlign = style.textAlign;
};

diezHTMLExtensions.push(() => {
  HTMLElement.prototype.applyTypograph = (typograph) => {
    typograph.applyStyle(this);
  };
});

/**
 * Typographs encapsulate type styles with support for a specific font, font size,
 * and color. More typograph properties are coming soon.
 *
 */
class Typography {
  constructor({
    heading1 = {font: {file: {src: "assets/SourceSansPro-Regular.ttf", type: "font"}, name: "SourceSansPro-Regular", fallbacks: ["sans-serif"], weight: 400, style: "normal"}, fontSize: 24, color: {h: 0.5079365079365079, s: 0.5951417004048584, l: 0.515686274509804, a: 1}, lineHeight: -1, letterSpacing: 0, alignment: "natural", decoration: []},
    body = {font: {file: {src: "assets/SourceSansPro-Regular.ttf", type: "font"}, name: "SourceSansPro-Regular", fallbacks: ["sans-serif"], weight: 400, style: "normal"}, fontSize: 18, color: {h: 0.5079365079365079, s: 0.5951417004048584, l: 0.515686274509804, a: 1}, lineHeight: -1, letterSpacing: 0, alignment: "center", decoration: []},
    caption = {font: {file: {src: "assets/SourceSansPro-Regular.ttf", type: "font"}, name: "SourceSansPro-Regular", fallbacks: ["sans-serif"], weight: 400, style: "normal"}, fontSize: 14, color: {h: 0.8186274509803922, s: 0.31481481481481477, l: 0.21176470588235297, a: 1}, lineHeight: -1, letterSpacing: 0, alignment: "natural", decoration: []}
  } = {}) {
    /**
     * - font: `SourceSansPro-Regular, 400, normal`
     * - fontSize: `24`
     * - color: `hsla(0.51, 0.6, 0.52, 1)`
     * - iosTextStyle: `body`
     * - shouldScale: `false`
     * - lineHeight: `-1`
     * - letterSpacing: `0`
     * - alignment: `natural`
     * - decoration: `[]`
     */
    this.heading1 = new Typograph(heading1);
    /**
     * - font: `SourceSansPro-Regular, 400, normal`
     * - fontSize: `18`
     * - color: `hsla(0.51, 0.6, 0.52, 1)`
     * - iosTextStyle: `body`
     * - shouldScale: `false`
     * - lineHeight: `-1`
     * - letterSpacing: `0`
     * - alignment: `center`
     * - decoration: `[]`
     */
    this.body = new Typograph(body);
    /**
     * - font: `SourceSansPro-Regular, 400, normal`
     * - fontSize: `14`
     * - color: `hsla(0.82, 0.31, 0.21, 1)`
     * - iosTextStyle: `body`
     * - shouldScale: `false`
     * - lineHeight: `-1`
     * - letterSpacing: `0`
     * - alignment: `natural`
     * - decoration: `[]`
     */
    this.caption = new Typograph(caption);
  }
}


module.exports.Typography = Typography;

/**
 * Provides a two dimensional size.
 * 
 * Usage: `size = Size2D.make(1920, 1080);`.
 *
 */
class Size2D {
  constructor({
    width,
    height
  }) {
    /**
     * Size data.
     *
     * 52
     */
    this.width = width;
    /**
     * Size data.
     *
     * 48
     */
    this.height = height;
  }
}


module.exports.Size2D = Size2D;

Object.defineProperties(Size2D.prototype, {
  style: {
    get () {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`,
      };
    },
  },
  backgroundSizeStyle: {
    get () {
      return {
        backgroundSize: `${this.style.width} ${this.style.height}`,
      };
    },
  },
});

/**
 * Provides an abstraction for raster images. With bindings, this component can embed images in multiple platforms in
 * accordance with best practices. Images should provide pixel ratios for standard, @2x, @3x, and @4x with conventional
 * file naming. The availability of retina resolutions is expected to be a compile-time concern, and the "src" of the
 * image is expected to exist and provide an image with the specified dimensions.
 *
 */
class Image {
  constructor({
    file,
    file2x,
    file3x,
    size
  }) {
    /**
     * Responsive image data.
     *
     * assets/logo.png
     */
    this.file = new File(file);
    /**
     * Responsive image data.
     *
     * assets/logo@2x.png
     */
    this.file2x = new File(file2x);
    /**
     * Responsive image data.
     *
     * assets/logo@3x.png
     */
    this.file3x = new File(file3x);
    /**
     * Responsive image data.
     *
     * (52 x 48)
     */
    this.size = new Size2D(size);
  }
}


module.exports.Image = Image;

Object.defineProperties(Image.prototype, {
  url: {
    get () {
      switch (Math.ceil(window.devicePixelRatio)) {
        case 1:
          return this.file.url;
        case 2:
          return this.file2x.url;
        case 3:
          return this.file3x.url;
        default:
          return this.file2x.url;
      }
    },
  },
  backgroundImageStyle: {
    get () {
      return {
        backgroundImage: `url("${this.url}")`,
      };
    },
  },
});

/**
 * In addition to colors and typography, you can also collect other types of
 * design language primitives in components as well — such as images, icons &
 * animations.
 *
 */
class Images {
  constructor({
    logo = {file: {src: "assets/logo.png", type: "image"}, file2x: {src: "assets/logo@2x.png", type: "image"}, file3x: {src: "assets/logo@3x.png", type: "image"}, size: {width: 52, height: 48}},
    masthead = {file: {src: "assets/masthead.png", type: "image"}, file2x: {src: "assets/masthead@2x.png", type: "image"}, file3x: {src: "assets/masthead@3x.png", type: "image"}, size: {width: 208, height: 88}}
  } = {}) {
    /**
     * assets/logo.png (52 x 48)
     */
    this.logo = new Image(logo);
    /**
     * assets/masthead.png (208 x 88)
     */
    this.masthead = new Image(masthead);
  }
}


module.exports.Images = Images;

/**
 * Here we create a custom reusable component for describing layout margins.
 *
 */
class Margin {
  constructor({
    top,
    bottom,
    left,
    right
  }) {
    /**
     * Defining the interface of your component's data enables you to instantiate your own
     * reusable components.
     *
     * 40
     */
    this.top = top;
    /**
     * Defining the interface of your component's data enables you to instantiate your own
     * reusable components.
     *
     * 10
     */
    this.bottom = bottom;
    /**
     * Defining the interface of your component's data enables you to instantiate your own
     * reusable components.
     *
     * 10
     */
    this.left = left;
    /**
     * Defining the interface of your component's data enables you to instantiate your own
     * reusable components.
     *
     * 10
     */
    this.right = right;
  }
}


module.exports.Margin = Margin;

/**
 * You can even collect your own custom components.
 *
 */
class LayoutValues {
  constructor({
    spacingSmall = 5,
    spacingMedium = 25,
    spacingLarge = 40,
    contentMargin = {top: 40, bottom: 10, left: 10, right: 10}
  } = {}) {
    /**
     * 5
     */
    this.spacingSmall = spacingSmall;
    /**
     * 25
     */
    this.spacingMedium = spacingMedium;
    /**
     * 40
     */
    this.spacingLarge = spacingLarge;
    /**
     * - top: `40`
     * - bottom: `10`
     * - left: `10`
     * - right: `10`
     */
    this.contentMargin = new Margin(contentMargin);
  }
}


module.exports.LayoutValues = LayoutValues;

/**
 * You can also define strings.
 *
 */
class Strings {
  constructor({
    title = "Diez",
    caption = "Keep your designs in sync with code",
    helper = "Modify the contents of “src/DesignLanguage.ts” (relative to the root of the Diez project) to see changes to the design language in real time."
  } = {}) {
    /**
     * Diez
     */
    this.title = title;
    /**
     * Keep your designs in sync with code
     */
    this.caption = caption;
    /**
     * Modify the contents of “src/DesignLanguage.ts” (relative to the root of the Diez project) to see changes to the design language in real time.
     */
    this.helper = helper;
  }
}


module.exports.Strings = Strings;

/**
 * Provides a drop shadow.
 *
 */
class DropShadow {
  constructor({
    offset,
    radius,
    color
  }) {
    /**
     * DropShadow data.
     *
     * [0, 1]
     */
    this.offset = new Point2D(offset);
    /**
     * DropShadow data.
     *
     * 16
     */
    this.radius = radius;
    /**
     * DropShadow data.
     *
     * hsla(0, 0, 0, 0.41)
     */
    this.color = new Color(color);
  }
}


module.exports.DropShadow = DropShadow;

const {dropShadowToCss, dropShadowToFilterCss} = require('@diez/web-sdk-common');

Object.defineProperties(DropShadow.prototype, {
  boxShadow: {
    get () {
      return dropShadowToCss(this);
    },
  },
  textShadow: {
    get () {
      return dropShadowToCss(this);
    },
  },
  filter: {
    get () {
      return dropShadowToFilterCss(this);
    },
  },
  boxShadowStyle: {
    get () {
      return {
        boxShadow: this.boxShadow,
      };
    },
  },
  textShadowStyle: {
    get () {
      return {
        textShadow: this.textShadow,
      };
    },
  },
  filterStyle: {
    get () {
      return {
        filter: this.filter,
      };
    },
  },
});

class Shadows {
  constructor({
    logo = {offset: {x: 0, y: 1}, radius: 16, color: {h: 0, s: 0, l: 0, a: 0.41000000000000003}}
  } = {}) {
    /**
     * - offset: `[0, 1]`
     * - radius: `16`
     * - color: `hsla(0, 0, 0, 0.41)`
     */
    this.logo = new DropShadow(logo);
  }
}


module.exports.Shadows = Shadows;

/**
 * Provides an abstraction for [Lottie](https://airbnb.io/lottie/#/) animations.
 *
 */
class Lottie {
  constructor({
    file,
    loop,
    autoplay
  }) {
    /**
     * Lottie data.
     *
     * assets/loadingAnimation.json
     */
    this.file = new File(file);
    /**
     * Lottie data.
     *
     * false
     */
    this.loop = loop;
    /**
     * Lottie data.
     *
     * true
     */
    this.autoplay = autoplay;
  }
}


module.exports.Lottie = Lottie;

const lottie = require('lottie-web');

Object.defineProperties(Lottie.prototype, {
  url: {
    get () {
      return this.file.url;
    },
  },
});

Lottie.prototype.mount = function (ref) {
  lottie.loadAnimation({
    container: ref,
    path: this.url,
    autoplay: this.autoplay,
    loop: this.loop,
  });
};

diezHTMLExtensions.push(() => {
  HTMLElement.prototype.mountLottie = function (lottieComponent) {
    lottieComponent.mount(this);
  };
});

/**
 * Note how this component is exported from `index.ts`. Diez compiles these
 * exported components for your apps' codebases.
 * 
 * For example:
 *    - If you run `yarn start web` or `npm run start web`, Diez will create a Node package called
 *      `diez-fiscal-note-tokens-web`. Look for `App.jsx` inside `examples/web` to see
 *      how you can use Diez in a web codebase.
 *    - If you run `yarn start ios` or `npm run start ios`, Diez will create a CocoaPods dependency
 *      called `DiezFiscalNoteTokens`. Look for `ViewController.swift` inside
 *      `examples/ios` to see how you can use Diez in an iOS codebase.
 *    - If you run `yarn start android` or `npm run start android`, Diez will create an Android library.
 *      Look for `MainActivity.kt` inside `examples/android` to see how you can
 *      use Diez in an Android codebase.
 *  - If you run `yarn start web` or `npm run start web`, Diez will create a Web App with your tokens.
 *
 */
class DesignLanguage {
  constructor({
    palette = {},
    typography = {},
    images = {},
    layoutValues = {},
    strings = {},
    shadows = {},
    loadingAnimation = {file: {src: "assets/loadingAnimation.json", type: "raw"}, loop: false, autoplay: true}
  } = {}) {
    this.palette = new Palette(palette);
    this.typography = new Typography(typography);
    this.images = new Images(images);
    this.layoutValues = new LayoutValues(layoutValues);
    this.strings = new Strings(strings);
    this.shadows = new Shadows(shadows);
    /**
     * - file: `assets/loadingAnimation.json`
     * - loop: `false`
     * - autoplay: `true`
     */
    this.loadingAnimation = new Lottie(loadingAnimation);
  }
}

Object.defineProperty(DesignLanguage, 'name', {value: 'DesignLanguage'});

module.exports.DesignLanguage = DesignLanguage;

