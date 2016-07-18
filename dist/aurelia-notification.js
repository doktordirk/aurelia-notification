import extend from 'extend';
import Humane from 'humane-js';
import {inject} from 'aurelia-dependency-injection';
import {I18N} from 'aurelia-i18n';
<<<<<<< HEAD
import {readonly} from 'javascript-decorators';
import {DOM} from 'aurelia-pal';

export class Config {
  // translate on/off
  translate = true
  // defaults for all notifictaions
  defaults = {}
  // notification names and their specific defaults
=======
import {DOM} from 'aurelia-pal';

export function configure(aurelia, config) {
  return config(aurelia.container.get(Config));
}

/**
 * The Config class. Configures the notifications
 */
export class Config {
  /**
   * Translation on or off
   * @param {Boolean}
   */
  translate = true

  /**
   * Defaults for all notifictaions
   * @param {Object}
   */
  defaults = {}

  /**
   * Notification names and their specific defaults
   * @param {Object}
   */
>>>>>>> dep-update
  notifications = {
    note: {},
    success: {addnCls: 'success'},
    error: {addnCls: 'error'},
    info: {addnCls: 'info'}
  }

<<<<<<< HEAD
=======
  /**
   * Configuration fanction for notifications
   *
   * @param  {[Object]} [incomming] The configuration object
   * @param  {[Config]} [base]      The optional base config to use
   *
   * @return {Config}           itself
   *
   * @chainable
   */
>>>>>>> dep-update
  configure(incomming = {}, base = this) {
    this.translate     = 'translate' in incomming ? incomming.translate : base.translate;
    this.defaults      = extend({}, base.defaults, incomming.defaults);
    this.notifications = extend({}, base.notifications, incomming.notifications);

    return this;
  }
}

<<<<<<< HEAD
=======
// from https://github.com/AvraamMavridis/javascript-decorators/
const readonly = function ()
{
  return function ( key, target, descriptor )
  {
    descriptor.writable = false;
    return descriptor;
  };
};

/**
 * The Notification class. Notify using humane-js with your custom names and defaults
 */
>>>>>>> dep-update
@inject(Config, Humane, I18N)
export class Notification {

  /**
<<<<<<< HEAD
   * Construct.
   *
   * @param {Config} config
   * @param {Humane} humane
   * @param {i18N}   I18N
=======
     * Notify 'note' (translated if applicable) using humane.log.
     *
     * @param {String|String[]}  message|multi-line message.
     * @param {{}}               [options] for this particular notification.
     * @param {{}}               [defaults] for this type of notification.
     *
     * @return {Promise}
     *
     */
  note(message, options = {}, defaults = this.__config.defaults) {}

  /**
     * Notify 'success' (translated if applicable) using humane.log.
     *
     * @param {String|String[]}  message|multi-line message.
     * @param {{}}               [options] for this particular notification.
     * @param {{}}               [defaults] for this type of notification.
     *
     * @return {Promise}
     *
     */
  success(message, options = {}, defaults = this.__config.defaults) {}

  /**
     * Notify 'error' (translated if applicable) using humane.log.
     *
     * @param {String|String[]}  message|multi-line message.
     * @param {{}}               [options] for this particular notification.
     * @param {{}}               [defaults] for this type of notification.
     *
     * @return {Promise}
     *
     */
  error(message, options = {}, defaults = this.__config.defaults) {}

  /**
     * Notify 'info' (translated if applicable) using humane.log.
     *
     * @param {String|String[]}  message|multi-line message.
     * @param {{}}               [options] for this particular notification.
     * @param {{}}               [defaults] for this type of notification.
     *
     * @return {Promise}
     *
     */
  info(message, options = {}, defaults = this.__config.defaults) {}


  /**
   * Creates a Notification instance
   *
   * @param  {[Config]} config
   * @param  {[Humane]} humane
   * @param  {[I18N]}   i18N
>>>>>>> dep-update
   *
   * @constructor
   */
  constructor(config, humane, i18n) {
    this
      .define('__config', config)
      .define('__humane', humane)
      .define('__i18n', i18n);

    // set baseCls
    this.setBaseCls();

    // add configured default methods
    for (let key in config.notifications) {
      this[key] = this.spawn(config.notifications[key]);
    }

    // ensure humane.container is document.body after 'aurelia-composed'
    this.setContainer();
    let aureliaComposedListener = () => {
      this.setContainer();
      DOM.removeEventListener('aurelia-composed', aureliaComposedListener);
    };
    DOM.addEventListener('aurelia-composed', aureliaComposedListener);
  }

  /**
<<<<<<< HEAD
   * Define a non-enumerable property on the Notification.
=======
   * Define a non-enumerable property on the notification.
>>>>>>> dep-update
   *
   * @param {string}  property
   * @param {*}       value
   * @param {boolean} [writable]
   *
   * @return {Notification}
<<<<<<< HEAD
=======
   *
   * @readonly
>>>>>>> dep-update
   */
  @readonly()
  define(property, value, writable) {
    Object.defineProperty(this, property, {
      value: value,
      writable: !!writable,
      enumerable: false
    });

    return this;
  }

  /**
   * Set the container for the notifications
   *
   * @param {[DOM.node]}  [container] for the notifications
   *
   * @return {DOM.node}  [container]
   *
<<<<<<< HEAD
=======
   * @readonly
>>>>>>> dep-update
   */
  @readonly()
  setContainer(container) {
    DOM.appendNode(this.__humane.el, container); // if container null or undefined,  appends to document.body
    this.__humane.container = this.__humane.el.parentNode;
    return this.__humane.container;
  }

  /**
   * Set the base css class for the notifications
   *
   * @param {[string]}  [base class] for the notifications (default=__config.defaults.baseCls)
   *
   * @return {string}  [base class]
   *
<<<<<<< HEAD
=======
   * @readonly
>>>>>>> dep-update
   */
  @readonly()
  setBaseCls(baseCls = this.__config.defaults.baseCls) {
    this.__humane.baseCls = baseCls ? baseCls : this.__humane.baseCls;
    return this.__humane.baseCls;
  }

  /**
   * Check if translate is on with given options
   *
   * @param {[{}]}  [options] for a particular notification.
   * @param {[{}]}  [defaults] for a type of notifications.
   *
   * @return {Boolean}
   *
<<<<<<< HEAD
   */
  @readonly()
  translate(options, defaults) {
=======
   * @readonly
   */
  @readonly()
  translate(options = {}, defaults = {}) {
>>>>>>> dep-update
    let joined = extend({}, this.__config, defaults, options);
    return joined.translate;
  }

  /**
   * Notify (translated if applicable) using humane.log.
   *
   * @param {String|String[]}  message|multi-line message.
   * @param {{}}               [options] for this particular notification.
   * @param {{}}               [defaults] for this type of notification.
   *
   * @return {Promise}
   *
<<<<<<< HEAD
   */
  @readonly()
  log(message, options, defaults = this.__config.defaults) {
    if (this.translate()) {
=======
   * @readonly
   */
  @readonly()
  log(message, options = {}, defaults = this.__config.defaults) {
    if (this.translate(options, defaults)) {
>>>>>>> dep-update
      if (message instanceof Array) {
        message = message.map(item=>this.i18n.tr(item));
      } else {
        message = this.__i18n.tr(message);
      }
    }

    return new Promise(resolve => {
      return this.__humane.log(message, options, resolve, defaults);
    });
  }

  /**
   * Set a custom shortcut for .log with defaults based on global defaults
   *
   * @param {String|{}}  [defaults] for this shortcut.
   *                     A string evaluates to {'addnCls': defaults}
   *
   * @return {function(message, options)}
   *
<<<<<<< HEAD
=======
   * @readonly
   *
>>>>>>> dep-update
   */
  @readonly()
  spawn(addnDefaults) {
    addnDefaults = (typeof addnDefaults === 'string') ? {'addnCls': addnDefaults} : addnDefaults;
    let defaults = extend({}, this.__config.defaults, addnDefaults);

    return (message, options) => {
      return this.log(message, options, defaults);
    };
  }

  /**
   * Force remove humane log
   *
   * @return {Promise}
   *
<<<<<<< HEAD
=======
   * @readonly
>>>>>>> dep-update
   */
  @readonly()
  remove() {
    return new Promise(resolve => {
      return this.__humane.remove(resolve);
    });
  }
}
<<<<<<< HEAD

function configure(aurelia, config) {
  return config(aurelia.container.get(Config));
}

export {
  Config,
  Notification,
  configure
};
=======
>>>>>>> dep-update
