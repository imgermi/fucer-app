webpackJsonp([1],{"3BHU":function(t,e,i){"use strict";var a=i("u1s9"),s=i("PCgl"),n=i("VU/8")(a.a,s.a,!1,null,null,null);n.options.__file="components/FavoriteStar.vue",e.a=n.exports},Ox45:function(t,e,i){"use strict";var a=i("qe/3"),s=i("3BHU"),n=i("iqmb");e.a={components:{Alerta:a.a,FavoriteStar:s.a,Foot:n.a},data:function(){return{title:"Normativa"}},head:function(){return{title:this.title,meta:[{hid:"description",name:"description",content:""}]}}}},PCgl:function(t,e,i){"use strict";var a=function(){var t=this.$createElement,e=this._self._c||t;return e("svg",{staticClass:"star-icon",attrs:{viewBox:"-2389.974 1622.188 21.814 20.747"},on:{click:this.favorite}},[e("path",{staticClass:"star",attrs:{id:"star-2",d:"M10.37,1.318l3.2,6.493L20.74,8.852l-5.185,5.054,1.224,7.137L10.37,17.674,3.961,21.043l1.224-7.137L0,8.852,7.166,7.811Z",transform:"translate(-2389.436 1621.435)"}})])};a._withStripped=!0;var s={render:a,staticRenderFns:[]};e.a=s},RKh1:function(t,e,i){"use strict";var a=function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"normativa"},[e("Alerta"),e("header",{staticClass:"goBack__header"},[e("div",{staticClass:"container"},[e("nuxt-link",{attrs:{to:"/inicio"}},[e("img",{staticClass:"arrow-left",attrs:{src:i("fi9x"),alt:"Volver"}})]),e("FavoriteStar")],1)]),this._m(0),e("section",{staticClass:"band cuerpo"},[e("div",{staticClass:"container"},[e("h6",[this._v("Introducción")]),e("span",[this._v("Por Javier Cornejo")]),e("p",[this._v("The entire starfleet couldn’t destroy the whole planet. It’d take a thousand ships with more fire power than I’ve… There’s another ship coming in. Maybe they know what happened. It’s an Imperial fighter. It followed us! No. It’s a short range fighter. There aren’t any bases around here. Where did it come from? It sure is leaving in a big hurry. If they identify us, we’re in big trouble. Not if I can help it. Chewie…jam it’s transmissions. It’d be as well to let it go. It’s too far out of range. Not for long…")]),e("p",[this._v("The entire starfleet couldn’t destroy the whole planet. It’d take a thousand ships with more fire power than I’ve… There’s another ship coming in. Maybe they know what happened. It’s an Imperial fighter. It followed us! No. It’s a short range fighter. There aren’t any bases around here. Where did it come from? It sure is leaving in a big hurry. If they identify us, we’re in big trouble. Not if I can help it. Chewie…jam it’s transmissions. It’d be as well to let it go. It’s too far out of range. Not for long…")]),e("button",[e("nuxt-link",{staticClass:"rounded__btn--full",attrs:{to:""}},[this._v("Leer normativa")])],1)])]),e("Foot")],1)};a._withStripped=!0;var s={render:a,staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("section",{staticClass:"top"},[e("div",{staticClass:"container"},[e("h1",[this._v("Resolución MJ y DH Nº 238/2003 (Concursos)")]),e("small",[this._v("2003")])])])}]};e.a=s},fi9x:function(t,e){t.exports="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjE5LjQxIDEwMjMuMTQyIDE3LjEyMSAzMS40MTQiPgogIDxkZWZzPgogICAgPHN0eWxlPgogICAgICAuY2xzLTEgewogICAgICAgIGZpbGw6IG5vbmU7CiAgICAgICAgc3Ryb2tlOiAjNDI0MjQyOwogICAgICAgIHN0cm9rZS13aWR0aDogMnB4OwogICAgICB9CiAgICA8L3N0eWxlPgogIDwvZGVmcz4KICA8cGF0aCBpZD0iQXJyb3ctbGVmdCIgY2xhc3M9ImNscy0xIiBkPSJNNDk5LjUsMTAyNC4ybC0xNSwxNSwxNSwxNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTQ2My42NzUgLTAuMzUxKSIvPgo8L3N2Zz4K"},hbWB:function(t,e,i){"use strict";var a=function(){var t=this.$createElement;this._self._c;return this._m(0)};a._withStripped=!0;var s={render:a,staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("footer",{staticClass:"main__footer"},[e("div",{staticClass:"container"},[e("small",[this._v("2018 - Fundación Centro de "),e("br"),this._v(" Estudios Registrales")]),e("a",{attrs:{href:"https://fucer.com.ar/",target:"_blank",rel:"noopener"}},[this._v("fucer.com.ar")])])])}]};e.a=s},hnKH:function(t,e,i){"use strict";var a=function(){var t=this.$createElement,e=this._self._c||t;return e("header",[e("nuxt-link",{staticClass:"alerta-plan",attrs:{to:""}},[e("p",[this._v("Está utilizando el plan básico. "),e("strong",[this._v("Acceda a normativas ilimitadas")])])])],1)};a._withStripped=!0;var s={render:a,staticRenderFns:[]};e.a=s},iqmb:function(t,e,i){"use strict";var a=i("hbWB"),s=i("VU/8")(null,a.a,!1,null,null,null);s.options.__file="components/Foot.vue",e.a=s.exports},"qe/3":function(t,e,i){"use strict";var a=i("hnKH"),s=i("VU/8")(null,a.a,!1,null,null,null);s.options.__file="components/Alerta.vue",e.a=s.exports},u1s9:function(t,e,i){"use strict";e.a={methods:{favorite:function(t){document.querySelector(".star-icon").classList.toggle("active")}}}},uM7S:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("Ox45"),s=i("RKh1"),n=i("VU/8")(a.a,s.a,!1,null,null,null);n.options.__file="pages/normativa.vue",e.default=n.exports}});