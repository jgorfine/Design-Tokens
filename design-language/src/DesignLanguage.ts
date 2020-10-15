import {Color, DropShadow, Image, Lottie, Toward, Typograph, Font, LinearGradient, Point2D, TextAlignment} from '@diez/prefabs';
import {Margin} from './components/Margin';

/**
 * You can collect anything inside a Diez component. Design tokens specified as
 * properties will be made available in the SDKs transpiled with Diez.
 */
const colors = {
  white: Color.hex('#FFF'),
  black: Color.hex('#000'),
  // Mobile Team Colors
  // see: https://fiscalnote2.atlassian.net/wiki/spaces/MNBV/pages/1009221679/Mobile+Design+System
  purplePrimary: Color.hex('#442547'),
  taupeLight: Color.hex('#AD9C94'),
  taupeMid: Color.hex('#826F75'),
  taupeDark: Color.hex('#635257'),
  tealLight: Color.hex('#E3F6F7'),
  tealMid: Color.hex('#85C7CB'),
  tealBright: Color.hex('#38ACB3'),
  tealPrimary: Color.hex('#008991'),
  tealDark: Color.hex('#037D85'),
  tanBackground: Color.hex('#FBFEF3'),
  tanText: Color.hex('#F3F7E8'),
  tanLight: Color.hex('#F0F3E9'),
  tanMid: Color.hex('#DADCD3'),
  tanDark: Color.hex('#D2D1C5'),
  greyLight: Color.hex('#D8D8D8'),
  night: Color.hex('#131313'),
  redSunset: Color.hex('#BF2909'),
  redFire: Color.hex('#E0310B'),
  orangeOptimistic: Color.hex('#FF6B2B'),
  yellowBright: Color.hex('#F0C11C'),
  yellowButtercup: Color.hex('#F6DC7E'),
  partyRepublican: Color.hex('#BE2B2B'),
  partyIndependent: Color.hex('#932079'),
  partyOther: Color.hex('#635257'),
  partyLibertarian: Color.hex('#865E00'),
  partyDemocrat: Color.hex('#2270E5'),
  partyGreen: Color.hex('#006F3A'),
  spectrumFarRight: Color.hex('#AF0B0B'),
  spectrumRight: Color.hex('#BC185D'),
  spectrumMiddle: Color.hex('#7F3A86'),
  spectrumLeft: Color.hex('#25AEFB'),
  spectrumFarLeft: Color.hex('#2270E5'),
  infoOrange: Color.hex('#F36DDD'),
  infoErrorRed: Color.hex('#E82733'),
  infoGoodGreen: Color.hex('#00914C'),
  infoYellowGreen: Color.hex('#ADA94E'),
  activeGreen: Color.hex('006F3A'),
  // Marketing Team Colors
  // see: https://drive.google.com/file/d/1k5LXQGbVHQVAyGOaktvUkYpL6WTDXkhO/view
  purpleBold: Color.hex('#442547'),
  redAlert: Color.hex('#E0310B'),
  tealTech: Color.hex('#3AC6CD'),
  tealGrassroot: Color.hex('#087D85'),
  greyPower: Color.hex('#939598'),
  greyLight: Color.hex('#F2F2F2'),
}

/**
 * You can reference properties from other components.
 */
const palette = {
  contentBackground: colors.white,
  text: colors.black,
  caption: colors.purple,
  headerBackground: LinearGradient.make(Toward.Bottom, colors.darkPurple, colors.black),
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
    color: colors.black.fade(0.59),
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
