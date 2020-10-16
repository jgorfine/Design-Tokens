import {DropShadow, Image, LinearGradient, Lottie, Toward, Typograph, Font, Point2D, TextAlignment} from '@diez/prefabs';
import Colors from './components/atoms/Colors';
import {Margin} from './components/Margin';

/**
 * You can collect anything inside a Diez component. Design tokens specified as
 * properties will be made available in the SDKs transpiled with Diez.
 */

/**
 * You can reference properties from other components.
 */
const palette = {
  contentBackground: Colors.greyLight,
  text: Colors.tealTech,
  caption: Colors.purplePrimary,
  headerBackground: LinearGradient.make(Toward.Bottom, Colors.purplePrimary, Colors.black),
}

/**
 * All of rich language features of TypeScript are at your disposal; for example,
 * you can define an object to keep track of your fonts.
 */
const Fonts = {
  SourceSansPro: {
    Regular: Font.fromFile('assets/SourceSansPro-Regular.ttf'),
  },
}

/**
 * Typographs encapsulate type styles with support for a specific font, font size,
 * and color. More typograph properties are coming soon.
 */
const typography = {
  heading1: new Typograph({
    font: Fonts.SourceSansPro.Regular,
    fontSize: 24,
    color: palette.text,
  }),

  body: new Typograph({
    font: Fonts.SourceSansPro.Regular,
    fontSize: 18,
    color: palette.text,
    alignment: TextAlignment.Center,
  }),

  caption: new Typograph({
    font: Fonts.SourceSansPro.Regular,
    fontSize: 14,
    color: palette.caption,
  }),
}

/**
 * In addition to colors and typography, you can also collect other types of
 * design language primitives in components as well — such as images, icons &
 * animations.
 */
const images = {
  logo: Image.responsive('assets/logo.png', 52, 48),
  masthead: Image.responsive('assets/masthead.png', 208, 88),
}

/**
 * You can even collect your own custom components.
 */
const layoutValues = {
  spacingSmall: 5,
  spacingMedium: 25,
  spacingLarge: 40,
  contentMargin: new Margin({
    top: 40,
    left: 10,
    right: 10,
    bottom: 10,
  }),
}

/**
 * You can also define strings.
 */
const strings = {
  title: 'Diez',
  caption: 'Keep your designs in sync with code',
  helper: 'Modify the contents of “src/DesignLanguage.ts” (relative to the root of the Diez project) to see changes to the design language in real time.',
}

const shadows = {
  logo: new DropShadow({
    offset: Point2D.make(0, 1),
    radius: 16,
    color: Colors.black.fade(0.59),
  }),
}

/**
 * Note how this component is exported from `index.ts`. Diez compiles these
 * exported components for your apps' codebases.
 *
 * For example:
 *   - If you run `yarn start web` or `npm run start web`, Diez will create a Node package called
 *     `diez-fiscal-note-tokens-web`. Look for `App.jsx` inside `examples/web` to see
 *     how you can use Diez in a web codebase.
 *   - If you run `yarn start ios` or `npm run start ios`, Diez will create a CocoaPods dependency
 *     called `DiezFiscalNoteTokens`. Look for `ViewController.swift` inside
 *     `examples/ios` to see how you can use Diez in an iOS codebase.
 *   - If you run `yarn start android` or `npm run start android`, Diez will create an Android library.
 *     Look for `MainActivity.kt` inside `examples/android` to see how you can
 *     use Diez in an Android codebase.
  *  - If you run `yarn start web` or `npm run start web`, Diez will create a Web App with your tokens.
 */
export const designLanguage = {
  palette,
  typography,
  images,
  layoutValues,
  strings,
  shadows,
  loadingAnimation: Lottie.fromJson('assets/loadingAnimation.json', false),
}
