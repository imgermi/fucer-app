import Vue from "vue";

// Polyfill for `:focus-visible`
import "focus-visible";

// Trap the focus within a DOM element so you can't leave it with "Tab"
// https://www.npmjs.com/package/focus-trap-vue
import { FocusTrap } from "focus-trap-vue";

Vue.component("FocusTrap", FocusTrap);
