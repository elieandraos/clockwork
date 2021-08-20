var e=0;function t(t){return"__private_"+e+++"_"+t}function r(e,t){if(!Object.prototype.hasOwnProperty.call(e,t))throw new TypeError("attempted to use private field on non-instance");return e}var i=require("dayjs"),n=require("dayjs/plugin/isSameOrAfter"),s=require("dayjs/plugin/isSameOrBefore"),a=require("dayjs/plugin/isLeapYear"),o=require("dayjs/plugin/isToday"),u=require("dayjs/plugin/isTomorrow"),l=require("dayjs/plugin/isYesterday"),f=require("dayjs/plugin/customParseFormat");function h(e){return"string"==typeof e}function d(e){return Array.isArray(e)}function c(e,t){return void 0===t&&(t=null),!(!h(t)&&!d(t))&&(t=h(t)?t.split(","):t).includes(e)}function m(e,t){return void 0===t&&(t=null),"object"==typeof e?JSON.stringify(e)===JSON.stringify(t):e===t}i.extend(n),i.extend(s),i.extend(a),i.extend(o),i.extend(u),i.extend(l),i.extend(f);var p={__proto__:null,required:function(e){return!(Array.isArray(e)&&0===e.length||[null,void 0,""].includes(e))},string:h,array:d,integer:function(e){return Number.isInteger(e)},numeric:function(e){return!Number.isNaN(parseFloat(e))&&isFinite(e)},alpha:function(e){return h(e)&&new RegExp("^[A-Za-z]+$").test(e.toLowerCase())},alpha_numeric:function(e){return h(e)&&new RegExp("^[a-zA-Z0-9\\s]+$").test(e.toLowerCase())},alpha_dash:function(e){return h(e)&&new RegExp("^[a-zA-Z-_]+$").test(e.toLowerCase())},starts_with:function(e,t){return void 0===t&&(t=null),h(e)&&h(t)&&e.startsWith(t)},ends_with:function(e,t){return void 0===t&&(t=null),h(e)&&h(t)&&e.endsWith(t)},boolean:function(e){return[!0,!1].includes(e)},is_in:c,not_in:function(e,t){return void 0===t&&(t=null),!(!h(t)&&!d(t)||c(e,t))},size:function(e,t){return void 0===t&&(t=null),!(!h(e)&&!d(e))&&e.length===t},min:function(e,t){return void 0===t&&(t=null),!(!e&&!d(e))&&(e=h(e)||d(e)?e.length:e,parseFloat(e)>=t)},max:function(e,t){return void 0===t&&(t=null),!(!e&&!d(e))&&(e=h(e)||d(e)?e.length:e,parseFloat(e)<=t)},same:m,different:function(e,t){return void 0===t&&(t=null),!m(e,t)},url:function(e){return new RegExp("^(http:\\/\\/www\\.|https:\\/\\/www\\.|http:\\/\\/|https:\\/\\/)?[a-z0-9]+([\\-.][a-z0-9]+)*\\.[a-z]{2,5}(:[0-9]{1,5})?(\\/.*)?$").test(String(e).toLowerCase())},email:function(e){return new RegExp("^\\S+@\\S+[.][0-9a-z]+$").test(String(e).toLowerCase())},uuid:function(e){return!!h(e)&&new RegExp("^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$").test(String(e).toLowerCase())},matches_regex:function(e,t){return void 0===t&&(t=null),!!h(e)&&new RegExp(t).test(String(e).toLowerCase())},json:function(e){if(!h(e))return!1;try{return"object"==typeof JSON.parse(e)}catch(e){return!1}},date:function(e){return i(e).isValid()},after:function(e,t){return void 0===t&&(t=null),i(e).isAfter(t)},before:function(e,t){return void 0===t&&(t=null),i(e).isBefore(t)},after_or_equal:function(e,t){return void 0===t&&(t=null),i(e).isSameOrAfter(t)},before_or_equal:function(e,t){return void 0===t&&(t=null),i(e).isSameOrBefore(t)},leap_year:function(e){return i(e).isLeapYear()},today:function(e){return i(e).isToday()},tomorrow:function(e){return i(e).isTomorrow()},yesterday:function(e){return i(e).isYesterday()},date_format:function(e,t){return i(e,t,!0).isValid()}};function g(e){return!(!e||Array.isArray(e)||"object"!=typeof e||e.constructor!==Object)}function b(e){return g(e)&&0===Object.keys(e).length}var w={after:'This field must be a date after "{param}"',after_or_equal:'This field must be a date after or equal to "{param}"',alpha:"This field must only contain letters",alpha_dash:"This field must only contain letters, dashes and underscores",alpha_numeric:"This field must only contain letters and numbers",array:"This field must be an array",before:'This field must be a date before "{param}"',before_or_equal:'This field must be a date before or equal to "{param}"',boolean:"This field must be boolean",date:"This field must be a valid date",date_format:'This date format must be "{param}"',different:'This field must be different than "{param}"',email:"This field must be a valid email.",ens_with:'This field must end with "{param}"',integer:"This field must be a number.",is_in:'This field must be one of "{param}"',json:"This field must be a json object",leap_year:"This date must be a leap year",matches_regex:'This field must match the regex "{param}"',max:'This field must not be greater than "{param}"',min:'This field must not be less than "{param}"',not_in:'This field must not be one of "{param}"',numeric:"This field must be numeric",required:"This field is required",same:'This field must be the same as "{param}"',size:'The field length must be "{param}"',starts_with:'This field must start with "{param}"',string:"This field must be a string",today:"This date must be today",tomorrow:"This date must be tomorrow",url:"This field must be a valid url",uuid:"This field must be a valid uuid"},y=require("dot-prop"),v=t("data"),E=t("rules"),T=t("errorsBag"),_=t("validate"),j=t("toArray"),x=t("parse"),O=t("executeRule"),q=t("getErrorMessage"),R=t("addError"),P=function(){function e(){Object.defineProperty(this,R,{value:L}),Object.defineProperty(this,q,{value:z}),Object.defineProperty(this,O,{value:C}),Object.defineProperty(this,x,{value:M}),Object.defineProperty(this,j,{value:A}),Object.defineProperty(this,_,{value:S}),Object.defineProperty(this,v,{writable:!0,value:void 0}),Object.defineProperty(this,E,{writable:!0,value:void 0}),Object.defineProperty(this,T,{writable:!0,value:void 0}),r(this,v)[v]={},r(this,E)[E]={},r(this,T)[T]=[],this.availableRules=p,this.defaultErrorMessages=w,this.customErrorMessages={}}var t=e.prototype;return t.setData=function(e){if(!g(e))throw new Error("setData() argument must be an object.");return r(this,v)[v]=e,this},t.setRules=function(e){if(!g(e))throw new Error("setRules() argument must be an object.");return r(this,E)[E]=e,this},t.setCustomErrorMessages=function(e){if(!g(e))throw new Error("setCustomErrorMessages() argument must be an object.");return this.customErrorMessages=e,this},t.getData=function(){return r(this,v)[v]},t.getRules=function(){return r(this,E)[E]},t.getCustomErrorMessages=function(){return this.customErrorMessages},t.passes=function(){return r(this,_)[_]()},t.fails=function(){return!this.passes()},t.hasErrors=function(e){return!!this.getErrors(e).length},t.getErrors=function(e){return r(this,T)[T].filter(function(t){return t.dataKey===e}).map(function(e){return e.message})},t.getFirstError=function(e){return this.hasErrors(e)?this.getErrors(e)[0]:null},t.extend=function(e,t){if(!e||!t)throw new Error("extend() requires two arguments: name string and callback function");if(this.availableRules.hasOwnProperty(e))throw new Error('The rule "'+e+'" exists.');if("function"!=typeof t||"[object Function]"!=={}.toString.call(t))throw new Error('The closure of the custom rule "'+e+'" should be a function.');if("boolean"!=typeof t())throw new Error("The closure of the custom rule "+e+" should return a boolean");return this.availableRules[e]=t,this},e}();function S(){var e=this;if(b(r(this,E)[E]))throw new Error("the rules object is missing. Use setRules() to set it");if(b(r(this,v)[v]))throw new Error("the data object is missing. Use setData() to set it");r(this,T)[T]=[];for(var t=function(){var t=n[i],s=t[0],a=t[1],o=y.has(r(e,v)[v],s)?y.get(r(e,v)[v],s):s,u=r(e,j)[j](a);if(u.includes("sometimes")&&!o)return"continue";u.forEach(function(t){"sometimes"!==t&&r(e,O)[O](o,t,s)})},i=0,n=Object.entries(r(this,E)[E]);i<n.length;i++)t();return!r(this,T)[T].length}function A(e){var t=e.split("|");return t.forEach(function(e,r){t[r]=e.trim()}),t}function M(e){var t=e,i=null;return"string"==typeof e&&e.split(":").length>1&&(t=e.split(":")[0].trim(),i=e.split(":")[1].trim(),y.has(r(this,v)[v],i)&&(i=y.get(r(this,v)[v],i))),{rule:t,arg:i}}function C(e,t,i){var n=r(this,x)[x](t),s=n.rule,a=n.arg;if(!this.availableRules.hasOwnProperty(s))throw new Error('the rule "'+s+'" does not exist.');if(!this.availableRules[s](e,a)){var o=r(this,q)[q](i,s,a);r(this,R)[R](i,s,o)}}function z(e,t,r){var i;void 0===r&&(r=null);var n=e+"."+t;if(this.customErrorMessages.hasOwnProperty(n))i=this.customErrorMessages[n];else{if(!this.defaultErrorMessages.hasOwnProperty(t))throw new Error("Set a customer error message for the rule "+t);i=this.defaultErrorMessages[t]}return i.replace("{param}",r)}function L(e,t,i){var n=e+"."+t;r(this,T)[T].push({key:n,dataKey:e,message:i})}export{P as default};
//# sourceMappingURL=clockwork.module.js.map
