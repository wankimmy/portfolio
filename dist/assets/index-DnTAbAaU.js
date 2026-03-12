(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();function Fh(i){const t=Object.create(null);for(const e of i.split(","))t[e]=1;return e=>e in t}const De={},Eo=[],Qi=()=>{},a_=()=>!1,Xc=i=>i.charCodeAt(0)===111&&i.charCodeAt(1)===110&&(i.charCodeAt(2)>122||i.charCodeAt(2)<97),Bh=i=>i.startsWith("onUpdate:"),kn=Object.assign,zh=(i,t)=>{const e=i.indexOf(t);e>-1&&i.splice(e,1)},mv=Object.prototype.hasOwnProperty,ye=(i,t)=>mv.call(i,t),Kt=Array.isArray,To=i=>Yc(i)==="[object Map]",l_=i=>Yc(i)==="[object Set]",ne=i=>typeof i=="function",Ke=i=>typeof i=="string",ls=i=>typeof i=="symbol",Ne=i=>i!==null&&typeof i=="object",c_=i=>(Ne(i)||ne(i))&&ne(i.then)&&ne(i.catch),u_=Object.prototype.toString,Yc=i=>u_.call(i),_v=i=>Yc(i).slice(8,-1),f_=i=>Yc(i)==="[object Object]",kh=i=>Ke(i)&&i!=="NaN"&&i[0]!=="-"&&""+parseInt(i,10)===i,Aa=Fh(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),qc=i=>{const t=Object.create(null);return(e=>t[e]||(t[e]=i(e)))},gv=/-\w/g,ns=qc(i=>i.replace(gv,t=>t.slice(1).toUpperCase())),vv=/\B([A-Z])/g,qs=qc(i=>i.replace(vv,"-$1").toLowerCase()),h_=qc(i=>i.charAt(0).toUpperCase()+i.slice(1)),uu=qc(i=>i?`on${h_(i)}`:""),Kr=(i,t)=>!Object.is(i,t),fu=(i,...t)=>{for(let e=0;e<i.length;e++)i[e](...t)},d_=(i,t,e,n=!1)=>{Object.defineProperty(i,t,{configurable:!0,enumerable:!1,writable:n,value:e})},xv=i=>{const t=parseFloat(i);return isNaN(t)?i:t};let Wd;const $c=()=>Wd||(Wd=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function jc(i){if(Kt(i)){const t={};for(let e=0;e<i.length;e++){const n=i[e],r=Ke(n)?bv(n):jc(n);if(r)for(const s in r)t[s]=r[s]}return t}else if(Ke(i)||Ne(i))return i}const yv=/;(?![^(]*\))/g,Mv=/:([^]+)/,Sv=/\/\*[^]*?\*\//g;function bv(i){const t={};return i.replace(Sv,"").split(yv).forEach(e=>{if(e){const n=e.split(Mv);n.length>1&&(t[n[0].trim()]=n[1].trim())}}),t}function Kc(i){let t="";if(Ke(i))t=i;else if(Kt(i))for(let e=0;e<i.length;e++){const n=Kc(i[e]);n&&(t+=n+" ")}else if(Ne(i))for(const e in i)i[e]&&(t+=e+" ");return t.trim()}const Ev="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Tv=Fh(Ev);function p_(i){return!!i||i===""}const m_=i=>!!(i&&i.__v_isRef===!0),dn=i=>Ke(i)?i:i==null?"":Kt(i)||Ne(i)&&(i.toString===u_||!ne(i.toString))?m_(i)?dn(i.value):JSON.stringify(i,__,2):String(i),__=(i,t)=>m_(t)?__(i,t.value):To(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((e,[n,r],s)=>(e[hu(n,s)+" =>"]=r,e),{})}:l_(t)?{[`Set(${t.size})`]:[...t.values()].map(e=>hu(e))}:ls(t)?hu(t):Ne(t)&&!Kt(t)&&!f_(t)?String(t):t,hu=(i,t="")=>{var e;return ls(i)?`Symbol(${(e=i.description)!=null?e:t})`:i};let Wn;class wv{constructor(t=!1){this.detached=t,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=Wn,!t&&Wn&&(this.index=(Wn.scopes||(Wn.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,e;if(this.scopes)for(t=0,e=this.scopes.length;t<e;t++)this.scopes[t].pause();for(t=0,e=this.effects.length;t<e;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,e;if(this.scopes)for(t=0,e=this.scopes.length;t<e;t++)this.scopes[t].resume();for(t=0,e=this.effects.length;t<e;t++)this.effects[t].resume()}}run(t){if(this._active){const e=Wn;try{return Wn=this,t()}finally{Wn=e}}}on(){++this._on===1&&(this.prevScope=Wn,Wn=this)}off(){this._on>0&&--this._on===0&&(Wn=this.prevScope,this.prevScope=void 0)}stop(t){if(this._active){this._active=!1;let e,n;for(e=0,n=this.effects.length;e<n;e++)this.effects[e].stop();for(this.effects.length=0,e=0,n=this.cleanups.length;e<n;e++)this.cleanups[e]();if(this.cleanups.length=0,this.scopes){for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){const r=this.parent.scopes.pop();r&&r!==this&&(this.parent.scopes[this.index]=r,r.index=this.index)}this.parent=void 0}}}function Av(){return Wn}let Pe;const du=new WeakSet;class g_{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Wn&&Wn.active&&Wn.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,du.has(this)&&(du.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||x_(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Xd(this),y_(this);const t=Pe,e=zi;Pe=this,zi=!0;try{return this.fn()}finally{M_(this),Pe=t,zi=e,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)Gh(t);this.deps=this.depsTail=void 0,Xd(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?du.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){df(this)&&this.run()}get dirty(){return df(this)}}let v_=0,Ca,Ra;function x_(i,t=!1){if(i.flags|=8,t){i.next=Ra,Ra=i;return}i.next=Ca,Ca=i}function Hh(){v_++}function Vh(){if(--v_>0)return;if(Ra){let t=Ra;for(Ra=void 0;t;){const e=t.next;t.next=void 0,t.flags&=-9,t=e}}let i;for(;Ca;){let t=Ca;for(Ca=void 0;t;){const e=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(n){i||(i=n)}t=e}}if(i)throw i}function y_(i){for(let t=i.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function M_(i){let t,e=i.depsTail,n=e;for(;n;){const r=n.prevDep;n.version===-1?(n===e&&(e=r),Gh(n),Cv(n)):t=n,n.dep.activeLink=n.prevActiveLink,n.prevActiveLink=void 0,n=r}i.deps=t,i.depsTail=e}function df(i){for(let t=i.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(S_(t.dep.computed)||t.dep.version!==t.version))return!0;return!!i._dirty}function S_(i){if(i.flags&4&&!(i.flags&16)||(i.flags&=-17,i.globalVersion===Ya)||(i.globalVersion=Ya,!i.isSSR&&i.flags&128&&(!i.deps&&!i._dirty||!df(i))))return;i.flags|=2;const t=i.dep,e=Pe,n=zi;Pe=i,zi=!0;try{y_(i);const r=i.fn(i._value);(t.version===0||Kr(r,i._value))&&(i.flags|=128,i._value=r,t.version++)}catch(r){throw t.version++,r}finally{Pe=e,zi=n,M_(i),i.flags&=-3}}function Gh(i,t=!1){const{dep:e,prevSub:n,nextSub:r}=i;if(n&&(n.nextSub=r,i.prevSub=void 0),r&&(r.prevSub=n,i.nextSub=void 0),e.subs===i&&(e.subs=n,!n&&e.computed)){e.computed.flags&=-5;for(let s=e.computed.deps;s;s=s.nextDep)Gh(s,!0)}!t&&!--e.sc&&e.map&&e.map.delete(e.key)}function Cv(i){const{prevDep:t,nextDep:e}=i;t&&(t.nextDep=e,i.prevDep=void 0),e&&(e.prevDep=t,i.nextDep=void 0)}let zi=!0;const b_=[];function Er(){b_.push(zi),zi=!1}function Tr(){const i=b_.pop();zi=i===void 0?!0:i}function Xd(i){const{cleanup:t}=i;if(i.cleanup=void 0,t){const e=Pe;Pe=void 0;try{t()}finally{Pe=e}}}let Ya=0;class Rv{constructor(t,e){this.sub=t,this.dep=e,this.version=e.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Wh{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(t){if(!Pe||!zi||Pe===this.computed)return;let e=this.activeLink;if(e===void 0||e.sub!==Pe)e=this.activeLink=new Rv(Pe,this),Pe.deps?(e.prevDep=Pe.depsTail,Pe.depsTail.nextDep=e,Pe.depsTail=e):Pe.deps=Pe.depsTail=e,E_(e);else if(e.version===-1&&(e.version=this.version,e.nextDep)){const n=e.nextDep;n.prevDep=e.prevDep,e.prevDep&&(e.prevDep.nextDep=n),e.prevDep=Pe.depsTail,e.nextDep=void 0,Pe.depsTail.nextDep=e,Pe.depsTail=e,Pe.deps===e&&(Pe.deps=n)}return e}trigger(t){this.version++,Ya++,this.notify(t)}notify(t){Hh();try{for(let e=this.subs;e;e=e.prevSub)e.sub.notify()&&e.sub.dep.notify()}finally{Vh()}}}function E_(i){if(i.dep.sc++,i.sub.flags&4){const t=i.dep.computed;if(t&&!i.dep.subs){t.flags|=20;for(let n=t.deps;n;n=n.nextDep)E_(n)}const e=i.dep.subs;e!==i&&(i.prevSub=e,e&&(e.nextSub=i)),i.dep.subs=i}}const pf=new WeakMap,Ds=Symbol(""),mf=Symbol(""),qa=Symbol("");function Mn(i,t,e){if(zi&&Pe){let n=pf.get(i);n||pf.set(i,n=new Map);let r=n.get(e);r||(n.set(e,r=new Wh),r.map=n,r.key=e),r.track()}}function gr(i,t,e,n,r,s){const o=pf.get(i);if(!o){Ya++;return}const a=l=>{l&&l.trigger()};if(Hh(),t==="clear")o.forEach(a);else{const l=Kt(i),c=l&&kh(e);if(l&&e==="length"){const u=Number(n);o.forEach((f,h)=>{(h==="length"||h===qa||!ls(h)&&h>=u)&&a(f)})}else switch((e!==void 0||o.has(void 0))&&a(o.get(e)),c&&a(o.get(qa)),t){case"add":l?c&&a(o.get("length")):(a(o.get(Ds)),To(i)&&a(o.get(mf)));break;case"delete":l||(a(o.get(Ds)),To(i)&&a(o.get(mf)));break;case"set":To(i)&&a(o.get(Ds));break}}Vh()}function Zs(i){const t=xe(i);return t===i?t:(Mn(t,"iterate",qa),Ai(i)?t:t.map(pn))}function Zc(i){return Mn(i=xe(i),"iterate",qa),i}const Pv={__proto__:null,[Symbol.iterator](){return pu(this,Symbol.iterator,pn)},concat(...i){return Zs(this).concat(...i.map(t=>Kt(t)?Zs(t):t))},entries(){return pu(this,"entries",i=>(i[1]=pn(i[1]),i))},every(i,t){return or(this,"every",i,t,void 0,arguments)},filter(i,t){return or(this,"filter",i,t,e=>e.map(pn),arguments)},find(i,t){return or(this,"find",i,t,pn,arguments)},findIndex(i,t){return or(this,"findIndex",i,t,void 0,arguments)},findLast(i,t){return or(this,"findLast",i,t,pn,arguments)},findLastIndex(i,t){return or(this,"findLastIndex",i,t,void 0,arguments)},forEach(i,t){return or(this,"forEach",i,t,void 0,arguments)},includes(...i){return mu(this,"includes",i)},indexOf(...i){return mu(this,"indexOf",i)},join(i){return Zs(this).join(i)},lastIndexOf(...i){return mu(this,"lastIndexOf",i)},map(i,t){return or(this,"map",i,t,void 0,arguments)},pop(){return oa(this,"pop")},push(...i){return oa(this,"push",i)},reduce(i,...t){return Yd(this,"reduce",i,t)},reduceRight(i,...t){return Yd(this,"reduceRight",i,t)},shift(){return oa(this,"shift")},some(i,t){return or(this,"some",i,t,void 0,arguments)},splice(...i){return oa(this,"splice",i)},toReversed(){return Zs(this).toReversed()},toSorted(i){return Zs(this).toSorted(i)},toSpliced(...i){return Zs(this).toSpliced(...i)},unshift(...i){return oa(this,"unshift",i)},values(){return pu(this,"values",pn)}};function pu(i,t,e){const n=Zc(i),r=n[t]();return n!==i&&!Ai(i)&&(r._next=r.next,r.next=()=>{const s=r._next();return s.done||(s.value=e(s.value)),s}),r}const Dv=Array.prototype;function or(i,t,e,n,r,s){const o=Zc(i),a=o!==i&&!Ai(i),l=o[t];if(l!==Dv[t]){const f=l.apply(i,s);return a?pn(f):f}let c=e;o!==i&&(a?c=function(f,h){return e.call(this,pn(f),h,i)}:e.length>2&&(c=function(f,h){return e.call(this,f,h,i)}));const u=l.call(o,c,n);return a&&r?r(u):u}function Yd(i,t,e,n){const r=Zc(i);let s=e;return r!==i&&(Ai(i)?e.length>3&&(s=function(o,a,l){return e.call(this,o,a,l,i)}):s=function(o,a,l){return e.call(this,o,pn(a),l,i)}),r[t](s,...n)}function mu(i,t,e){const n=xe(i);Mn(n,"iterate",qa);const r=n[t](...e);return(r===-1||r===!1)&&$h(e[0])?(e[0]=xe(e[0]),n[t](...e)):r}function oa(i,t,e=[]){Er(),Hh();const n=xe(i)[t].apply(i,e);return Vh(),Tr(),n}const Lv=Fh("__proto__,__v_isRef,__isVue"),T_=new Set(Object.getOwnPropertyNames(Symbol).filter(i=>i!=="arguments"&&i!=="caller").map(i=>Symbol[i]).filter(ls));function Iv(i){ls(i)||(i=String(i));const t=xe(this);return Mn(t,"has",i),t.hasOwnProperty(i)}class w_{constructor(t=!1,e=!1){this._isReadonly=t,this._isShallow=e}get(t,e,n){if(e==="__v_skip")return t.__v_skip;const r=this._isReadonly,s=this._isShallow;if(e==="__v_isReactive")return!r;if(e==="__v_isReadonly")return r;if(e==="__v_isShallow")return s;if(e==="__v_raw")return n===(r?s?Gv:P_:s?R_:C_).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(n)?t:void 0;const o=Kt(t);if(!r){let l;if(o&&(l=Pv[e]))return l;if(e==="hasOwnProperty")return Iv}const a=Reflect.get(t,e,Tn(t)?t:n);if((ls(e)?T_.has(e):Lv(e))||(r||Mn(t,"get",e),s))return a;if(Tn(a)){const l=o&&kh(e)?a:a.value;return r&&Ne(l)?gf(l):l}return Ne(a)?r?gf(a):Yh(a):a}}class A_ extends w_{constructor(t=!1){super(!1,t)}set(t,e,n,r){let s=t[e];if(!this._isShallow){const l=is(s);if(!Ai(n)&&!is(n)&&(s=xe(s),n=xe(n)),!Kt(t)&&Tn(s)&&!Tn(n))return l||(s.value=n),!0}const o=Kt(t)&&kh(e)?Number(e)<t.length:ye(t,e),a=Reflect.set(t,e,n,Tn(t)?t:r);return t===xe(r)&&(o?Kr(n,s)&&gr(t,"set",e,n):gr(t,"add",e,n)),a}deleteProperty(t,e){const n=ye(t,e);t[e];const r=Reflect.deleteProperty(t,e);return r&&n&&gr(t,"delete",e,void 0),r}has(t,e){const n=Reflect.has(t,e);return(!ls(e)||!T_.has(e))&&Mn(t,"has",e),n}ownKeys(t){return Mn(t,"iterate",Kt(t)?"length":Ds),Reflect.ownKeys(t)}}class Uv extends w_{constructor(t=!1){super(!0,t)}set(t,e){return!0}deleteProperty(t,e){return!0}}const Nv=new A_,Ov=new Uv,Fv=new A_(!0);const _f=i=>i,ml=i=>Reflect.getPrototypeOf(i);function Bv(i,t,e){return function(...n){const r=this.__v_raw,s=xe(r),o=To(s),a=i==="entries"||i===Symbol.iterator&&o,l=i==="keys"&&o,c=r[i](...n),u=e?_f:t?Sc:pn;return!t&&Mn(s,"iterate",l?mf:Ds),{next(){const{value:f,done:h}=c.next();return h?{value:f,done:h}:{value:a?[u(f[0]),u(f[1])]:u(f),done:h}},[Symbol.iterator](){return this}}}}function _l(i){return function(...t){return i==="delete"?!1:i==="clear"?void 0:this}}function zv(i,t){const e={get(r){const s=this.__v_raw,o=xe(s),a=xe(r);i||(Kr(r,a)&&Mn(o,"get",r),Mn(o,"get",a));const{has:l}=ml(o),c=t?_f:i?Sc:pn;if(l.call(o,r))return c(s.get(r));if(l.call(o,a))return c(s.get(a));s!==o&&s.get(r)},get size(){const r=this.__v_raw;return!i&&Mn(xe(r),"iterate",Ds),r.size},has(r){const s=this.__v_raw,o=xe(s),a=xe(r);return i||(Kr(r,a)&&Mn(o,"has",r),Mn(o,"has",a)),r===a?s.has(r):s.has(r)||s.has(a)},forEach(r,s){const o=this,a=o.__v_raw,l=xe(a),c=t?_f:i?Sc:pn;return!i&&Mn(l,"iterate",Ds),a.forEach((u,f)=>r.call(s,c(u),c(f),o))}};return kn(e,i?{add:_l("add"),set:_l("set"),delete:_l("delete"),clear:_l("clear")}:{add(r){!t&&!Ai(r)&&!is(r)&&(r=xe(r));const s=xe(this);return ml(s).has.call(s,r)||(s.add(r),gr(s,"add",r,r)),this},set(r,s){!t&&!Ai(s)&&!is(s)&&(s=xe(s));const o=xe(this),{has:a,get:l}=ml(o);let c=a.call(o,r);c||(r=xe(r),c=a.call(o,r));const u=l.call(o,r);return o.set(r,s),c?Kr(s,u)&&gr(o,"set",r,s):gr(o,"add",r,s),this},delete(r){const s=xe(this),{has:o,get:a}=ml(s);let l=o.call(s,r);l||(r=xe(r),l=o.call(s,r)),a&&a.call(s,r);const c=s.delete(r);return l&&gr(s,"delete",r,void 0),c},clear(){const r=xe(this),s=r.size!==0,o=r.clear();return s&&gr(r,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(r=>{e[r]=Bv(r,i,t)}),e}function Xh(i,t){const e=zv(i,t);return(n,r,s)=>r==="__v_isReactive"?!i:r==="__v_isReadonly"?i:r==="__v_raw"?n:Reflect.get(ye(e,r)&&r in n?e:n,r,s)}const kv={get:Xh(!1,!1)},Hv={get:Xh(!1,!0)},Vv={get:Xh(!0,!1)};const C_=new WeakMap,R_=new WeakMap,P_=new WeakMap,Gv=new WeakMap;function Wv(i){switch(i){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Xv(i){return i.__v_skip||!Object.isExtensible(i)?0:Wv(_v(i))}function Yh(i){return is(i)?i:qh(i,!1,Nv,kv,C_)}function Yv(i){return qh(i,!1,Fv,Hv,R_)}function gf(i){return qh(i,!0,Ov,Vv,P_)}function qh(i,t,e,n,r){if(!Ne(i)||i.__v_raw&&!(t&&i.__v_isReactive))return i;const s=Xv(i);if(s===0)return i;const o=r.get(i);if(o)return o;const a=new Proxy(i,s===2?n:e);return r.set(i,a),a}function wo(i){return is(i)?wo(i.__v_raw):!!(i&&i.__v_isReactive)}function is(i){return!!(i&&i.__v_isReadonly)}function Ai(i){return!!(i&&i.__v_isShallow)}function $h(i){return i?!!i.__v_raw:!1}function xe(i){const t=i&&i.__v_raw;return t?xe(t):i}function qv(i){return!ye(i,"__v_skip")&&Object.isExtensible(i)&&d_(i,"__v_skip",!0),i}const pn=i=>Ne(i)?Yh(i):i,Sc=i=>Ne(i)?gf(i):i;function Tn(i){return i?i.__v_isRef===!0:!1}function jh(i){return $v(i,!1)}function $v(i,t){return Tn(i)?i:new jv(i,t)}class jv{constructor(t,e){this.dep=new Wh,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=e?t:xe(t),this._value=e?t:pn(t),this.__v_isShallow=e}get value(){return this.dep.track(),this._value}set value(t){const e=this._rawValue,n=this.__v_isShallow||Ai(t)||is(t);t=n?t:xe(t),Kr(t,e)&&(this._rawValue=t,this._value=n?t:pn(t),this.dep.trigger())}}function D_(i){return Tn(i)?i.value:i}const Kv={get:(i,t,e)=>t==="__v_raw"?i:D_(Reflect.get(i,t,e)),set:(i,t,e,n)=>{const r=i[t];return Tn(r)&&!Tn(e)?(r.value=e,!0):Reflect.set(i,t,e,n)}};function L_(i){return wo(i)?i:new Proxy(i,Kv)}class Zv{constructor(t,e,n){this.fn=t,this.setter=e,this._value=void 0,this.dep=new Wh(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=Ya-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!e,this.isSSR=n}notify(){if(this.flags|=16,!(this.flags&8)&&Pe!==this)return x_(this,!0),!0}get value(){const t=this.dep.track();return S_(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}}function Jv(i,t,e=!1){let n,r;return ne(i)?n=i:(n=i.get,r=i.set),new Zv(n,r,e)}const gl={},bc=new WeakMap;let ys;function Qv(i,t=!1,e=ys){if(e){let n=bc.get(e);n||bc.set(e,n=[]),n.push(i)}}function tx(i,t,e=De){const{immediate:n,deep:r,once:s,scheduler:o,augmentJob:a,call:l}=e,c=v=>r?v:Ai(v)||r===!1||r===0?Vr(v,1):Vr(v);let u,f,h,d,g=!1,_=!1;if(Tn(i)?(f=()=>i.value,g=Ai(i)):wo(i)?(f=()=>c(i),g=!0):Kt(i)?(_=!0,g=i.some(v=>wo(v)||Ai(v)),f=()=>i.map(v=>{if(Tn(v))return v.value;if(wo(v))return c(v);if(ne(v))return l?l(v,2):v()})):ne(i)?t?f=l?()=>l(i,2):i:f=()=>{if(h){Er();try{h()}finally{Tr()}}const v=ys;ys=u;try{return l?l(i,3,[d]):i(d)}finally{ys=v}}:f=Qi,t&&r){const v=f,R=r===!0?1/0:r;f=()=>Vr(v(),R)}const m=Av(),p=()=>{u.stop(),m&&m.active&&zh(m.effects,u)};if(s&&t){const v=t;t=(...R)=>{v(...R),p()}}let M=_?new Array(i.length).fill(gl):gl;const b=v=>{if(!(!(u.flags&1)||!u.dirty&&!v))if(t){const R=u.run();if(r||g||(_?R.some((C,T)=>Kr(C,M[T])):Kr(R,M))){h&&h();const C=ys;ys=u;try{const T=[R,M===gl?void 0:_&&M[0]===gl?[]:M,d];M=R,l?l(t,3,T):t(...T)}finally{ys=C}}}else u.run()};return a&&a(b),u=new g_(f),u.scheduler=o?()=>o(b,!1):b,d=v=>Qv(v,!1,u),h=u.onStop=()=>{const v=bc.get(u);if(v){if(l)l(v,4);else for(const R of v)R();bc.delete(u)}},t?n?b(!0):M=u.run():o?o(b.bind(null,!0),!0):u.run(),p.pause=u.pause.bind(u),p.resume=u.resume.bind(u),p.stop=p,p}function Vr(i,t=1/0,e){if(t<=0||!Ne(i)||i.__v_skip||(e=e||new Map,(e.get(i)||0)>=t))return i;if(e.set(i,t),t--,Tn(i))Vr(i.value,t,e);else if(Kt(i))for(let n=0;n<i.length;n++)Vr(i[n],t,e);else if(l_(i)||To(i))i.forEach(n=>{Vr(n,t,e)});else if(f_(i)){for(const n in i)Vr(i[n],t,e);for(const n of Object.getOwnPropertySymbols(i))Object.prototype.propertyIsEnumerable.call(i,n)&&Vr(i[n],t,e)}return i}function al(i,t,e,n){try{return n?i(...n):i()}catch(r){Jc(r,t,e)}}function er(i,t,e,n){if(ne(i)){const r=al(i,t,e,n);return r&&c_(r)&&r.catch(s=>{Jc(s,t,e)}),r}if(Kt(i)){const r=[];for(let s=0;s<i.length;s++)r.push(er(i[s],t,e,n));return r}}function Jc(i,t,e,n=!0){const r=t?t.vnode:null,{errorHandler:s,throwUnhandledErrorInProduction:o}=t&&t.appContext.config||De;if(t){let a=t.parent;const l=t.proxy,c=`https://vuejs.org/error-reference/#runtime-${e}`;for(;a;){const u=a.ec;if(u){for(let f=0;f<u.length;f++)if(u[f](i,l,c)===!1)return}a=a.parent}if(s){Er(),al(s,null,10,[i,l,c]),Tr();return}}ex(i,e,r,n,o)}function ex(i,t,e,n=!0,r=!1){if(r)throw i;console.error(i)}const Nn=[];let Gi=-1;const Ao=[];let zr=null,_o=0;const I_=Promise.resolve();let Ec=null;function U_(i){const t=Ec||I_;return i?t.then(this?i.bind(this):i):t}function nx(i){let t=Gi+1,e=Nn.length;for(;t<e;){const n=t+e>>>1,r=Nn[n],s=$a(r);s<i||s===i&&r.flags&2?t=n+1:e=n}return t}function Kh(i){if(!(i.flags&1)){const t=$a(i),e=Nn[Nn.length-1];!e||!(i.flags&2)&&t>=$a(e)?Nn.push(i):Nn.splice(nx(t),0,i),i.flags|=1,N_()}}function N_(){Ec||(Ec=I_.then(F_))}function ix(i){Kt(i)?Ao.push(...i):zr&&i.id===-1?zr.splice(_o+1,0,i):i.flags&1||(Ao.push(i),i.flags|=1),N_()}function qd(i,t,e=Gi+1){for(;e<Nn.length;e++){const n=Nn[e];if(n&&n.flags&2){if(i&&n.id!==i.uid)continue;Nn.splice(e,1),e--,n.flags&4&&(n.flags&=-2),n(),n.flags&4||(n.flags&=-2)}}}function O_(i){if(Ao.length){const t=[...new Set(Ao)].sort((e,n)=>$a(e)-$a(n));if(Ao.length=0,zr){zr.push(...t);return}for(zr=t,_o=0;_o<zr.length;_o++){const e=zr[_o];e.flags&4&&(e.flags&=-2),e.flags&8||e(),e.flags&=-2}zr=null,_o=0}}const $a=i=>i.id==null?i.flags&2?-1:1/0:i.id;function F_(i){try{for(Gi=0;Gi<Nn.length;Gi++){const t=Nn[Gi];t&&!(t.flags&8)&&(t.flags&4&&(t.flags&=-2),al(t,t.i,t.i?15:14),t.flags&4||(t.flags&=-2))}}finally{for(;Gi<Nn.length;Gi++){const t=Nn[Gi];t&&(t.flags&=-2)}Gi=-1,Nn.length=0,O_(),Ec=null,(Nn.length||Ao.length)&&F_()}}let ji=null,B_=null;function Tc(i){const t=ji;return ji=i,B_=i&&i.type.__scopeId||null,t}function rx(i,t=ji,e){if(!t||i._n)return i;const n=(...r)=>{n._d&&ip(-1);const s=Tc(t);let o;try{o=i(...r)}finally{Tc(s),n._d&&ip(1)}return o};return n._n=!0,n._c=!0,n._d=!0,n}function us(i,t,e,n){const r=i.dirs,s=t&&t.dirs;for(let o=0;o<r.length;o++){const a=r[o];s&&(a.oldValue=s[o].value);let l=a.dir[n];l&&(Er(),er(l,e,8,[i.el,a,i,t]),Tr())}}const sx=Symbol("_vte"),ox=i=>i.__isTeleport,ax=Symbol("_leaveCb");function Zh(i,t){i.shapeFlag&6&&i.component?(i.transition=t,Zh(i.component.subTree,t)):i.shapeFlag&128?(i.ssContent.transition=t.clone(i.ssContent),i.ssFallback.transition=t.clone(i.ssFallback)):i.transition=t}function z_(i){i.ids=[i.ids[0]+i.ids[2]+++"-",0,0]}const wc=new WeakMap;function Pa(i,t,e,n,r=!1){if(Kt(i)){i.forEach((g,_)=>Pa(g,t&&(Kt(t)?t[_]:t),e,n,r));return}if(Da(n)&&!r){n.shapeFlag&512&&n.type.__asyncResolved&&n.component.subTree.component&&Pa(i,t,e,n.component.subTree);return}const s=n.shapeFlag&4?ed(n.component):n.el,o=r?null:s,{i:a,r:l}=i,c=t&&t.r,u=a.refs===De?a.refs={}:a.refs,f=a.setupState,h=xe(f),d=f===De?a_:g=>ye(h,g);if(c!=null&&c!==l){if($d(t),Ke(c))u[c]=null,d(c)&&(f[c]=null);else if(Tn(c)){c.value=null;const g=t;g.k&&(u[g.k]=null)}}if(ne(l))al(l,a,12,[o,u]);else{const g=Ke(l),_=Tn(l);if(g||_){const m=()=>{if(i.f){const p=g?d(l)?f[l]:u[l]:l.value;if(r)Kt(p)&&zh(p,s);else if(Kt(p))p.includes(s)||p.push(s);else if(g)u[l]=[s],d(l)&&(f[l]=u[l]);else{const M=[s];l.value=M,i.k&&(u[i.k]=M)}}else g?(u[l]=o,d(l)&&(f[l]=o)):_&&(l.value=o,i.k&&(u[i.k]=o))};if(o){const p=()=>{m(),wc.delete(i)};p.id=-1,wc.set(i,p),ii(p,e)}else $d(i),m()}}}function $d(i){const t=wc.get(i);t&&(t.flags|=8,wc.delete(i))}$c().requestIdleCallback;$c().cancelIdleCallback;const Da=i=>!!i.type.__asyncLoader,k_=i=>i.type.__isKeepAlive;function lx(i,t){H_(i,"a",t)}function cx(i,t){H_(i,"da",t)}function H_(i,t,e=Fn){const n=i.__wdc||(i.__wdc=()=>{let r=e;for(;r;){if(r.isDeactivated)return;r=r.parent}return i()});if(Qc(t,n,e),e){let r=e.parent;for(;r&&r.parent;)k_(r.parent.vnode)&&ux(n,t,e,r),r=r.parent}}function ux(i,t,e,n){const r=Qc(t,i,n,!0);ll(()=>{zh(n[t],r)},e)}function Qc(i,t,e=Fn,n=!1){if(e){const r=e[i]||(e[i]=[]),s=t.__weh||(t.__weh=(...o)=>{Er();const a=cl(e),l=er(t,e,i,o);return a(),Tr(),l});return n?r.unshift(s):r.push(s),s}}const Rr=i=>(t,e=Fn)=>{(!Ka||i==="sp")&&Qc(i,(...n)=>t(...n),e)},fx=Rr("bm"),ta=Rr("m"),hx=Rr("bu"),dx=Rr("u"),px=Rr("bum"),ll=Rr("um"),mx=Rr("sp"),_x=Rr("rtg"),gx=Rr("rtc");function vx(i,t=Fn){Qc("ec",i,t)}const xx=Symbol.for("v-ndc");function zs(i,t,e,n){let r;const s=e,o=Kt(i);if(o||Ke(i)){const a=o&&wo(i);let l=!1,c=!1;a&&(l=!Ai(i),c=is(i),i=Zc(i)),r=new Array(i.length);for(let u=0,f=i.length;u<f;u++)r[u]=t(l?c?Sc(pn(i[u])):pn(i[u]):i[u],u,void 0,s)}else if(typeof i=="number"){r=new Array(i);for(let a=0;a<i;a++)r[a]=t(a+1,a,void 0,s)}else if(Ne(i))if(i[Symbol.iterator])r=Array.from(i,(a,l)=>t(a,l,void 0,s));else{const a=Object.keys(i);r=new Array(a.length);for(let l=0,c=a.length;l<c;l++){const u=a[l];r[l]=t(i[u],u,l,s)}}else r=[];return r}const vf=i=>i?lg(i)?ed(i):vf(i.parent):null,La=kn(Object.create(null),{$:i=>i,$el:i=>i.vnode.el,$data:i=>i.data,$props:i=>i.props,$attrs:i=>i.attrs,$slots:i=>i.slots,$refs:i=>i.refs,$parent:i=>vf(i.parent),$root:i=>vf(i.root),$host:i=>i.ce,$emit:i=>i.emit,$options:i=>G_(i),$forceUpdate:i=>i.f||(i.f=()=>{Kh(i.update)}),$nextTick:i=>i.n||(i.n=U_.bind(i.proxy)),$watch:i=>Hx.bind(i)}),_u=(i,t)=>i!==De&&!i.__isScriptSetup&&ye(i,t),yx={get({_:i},t){if(t==="__v_skip")return!0;const{ctx:e,setupState:n,data:r,props:s,accessCache:o,type:a,appContext:l}=i;let c;if(t[0]!=="$"){const d=o[t];if(d!==void 0)switch(d){case 1:return n[t];case 2:return r[t];case 4:return e[t];case 3:return s[t]}else{if(_u(n,t))return o[t]=1,n[t];if(r!==De&&ye(r,t))return o[t]=2,r[t];if((c=i.propsOptions[0])&&ye(c,t))return o[t]=3,s[t];if(e!==De&&ye(e,t))return o[t]=4,e[t];xf&&(o[t]=0)}}const u=La[t];let f,h;if(u)return t==="$attrs"&&Mn(i.attrs,"get",""),u(i);if((f=a.__cssModules)&&(f=f[t]))return f;if(e!==De&&ye(e,t))return o[t]=4,e[t];if(h=l.config.globalProperties,ye(h,t))return h[t]},set({_:i},t,e){const{data:n,setupState:r,ctx:s}=i;return _u(r,t)?(r[t]=e,!0):n!==De&&ye(n,t)?(n[t]=e,!0):ye(i.props,t)||t[0]==="$"&&t.slice(1)in i?!1:(s[t]=e,!0)},has({_:{data:i,setupState:t,accessCache:e,ctx:n,appContext:r,propsOptions:s,type:o}},a){let l,c;return!!(e[a]||i!==De&&a[0]!=="$"&&ye(i,a)||_u(t,a)||(l=s[0])&&ye(l,a)||ye(n,a)||ye(La,a)||ye(r.config.globalProperties,a)||(c=o.__cssModules)&&c[a])},defineProperty(i,t,e){return e.get!=null?i._.accessCache[t]=0:ye(e,"value")&&this.set(i,t,e.value,null),Reflect.defineProperty(i,t,e)}};function jd(i){return Kt(i)?i.reduce((t,e)=>(t[e]=null,t),{}):i}let xf=!0;function Mx(i){const t=G_(i),e=i.proxy,n=i.ctx;xf=!1,t.beforeCreate&&Kd(t.beforeCreate,i,"bc");const{data:r,computed:s,methods:o,watch:a,provide:l,inject:c,created:u,beforeMount:f,mounted:h,beforeUpdate:d,updated:g,activated:_,deactivated:m,beforeDestroy:p,beforeUnmount:M,destroyed:b,unmounted:v,render:R,renderTracked:C,renderTriggered:T,errorCaptured:D,serverPrefetch:S,expose:x,inheritAttrs:I,components:F,directives:z,filters:W}=t;if(c&&Sx(c,n,null),o)for(const K in o){const H=o[K];ne(H)&&(n[K]=H.bind(e))}if(r){const K=r.call(e,e);Ne(K)&&(i.data=Yh(K))}if(xf=!0,s)for(const K in s){const H=s[K],ct=ne(H)?H.bind(e,e):ne(H.get)?H.get.bind(e,e):Qi,N=!ne(H)&&ne(H.set)?H.set.bind(e):Qi,vt=uy({get:ct,set:N});Object.defineProperty(n,K,{enumerable:!0,configurable:!0,get:()=>vt.value,set:Lt=>vt.value=Lt})}if(a)for(const K in a)V_(a[K],n,e,K);if(l){const K=ne(l)?l.call(e):l;Reflect.ownKeys(K).forEach(H=>{Cx(H,K[H])})}u&&Kd(u,i,"c");function G(K,H){Kt(H)?H.forEach(ct=>K(ct.bind(e))):H&&K(H.bind(e))}if(G(fx,f),G(ta,h),G(hx,d),G(dx,g),G(lx,_),G(cx,m),G(vx,D),G(gx,C),G(_x,T),G(px,M),G(ll,v),G(mx,S),Kt(x))if(x.length){const K=i.exposed||(i.exposed={});x.forEach(H=>{Object.defineProperty(K,H,{get:()=>e[H],set:ct=>e[H]=ct,enumerable:!0})})}else i.exposed||(i.exposed={});R&&i.render===Qi&&(i.render=R),I!=null&&(i.inheritAttrs=I),F&&(i.components=F),z&&(i.directives=z),S&&z_(i)}function Sx(i,t,e=Qi){Kt(i)&&(i=yf(i));for(const n in i){const r=i[n];let s;Ne(r)?"default"in r?s=ec(r.from||n,r.default,!0):s=ec(r.from||n):s=ec(r),Tn(s)?Object.defineProperty(t,n,{enumerable:!0,configurable:!0,get:()=>s.value,set:o=>s.value=o}):t[n]=s}}function Kd(i,t,e){er(Kt(i)?i.map(n=>n.bind(t.proxy)):i.bind(t.proxy),t,e)}function V_(i,t,e,n){let r=n.includes(".")?ng(e,n):()=>e[n];if(Ke(i)){const s=t[i];ne(s)&&nc(r,s)}else if(ne(i))nc(r,i.bind(e));else if(Ne(i))if(Kt(i))i.forEach(s=>V_(s,t,e,n));else{const s=ne(i.handler)?i.handler.bind(e):t[i.handler];ne(s)&&nc(r,s,i)}}function G_(i){const t=i.type,{mixins:e,extends:n}=t,{mixins:r,optionsCache:s,config:{optionMergeStrategies:o}}=i.appContext,a=s.get(t);let l;return a?l=a:!r.length&&!e&&!n?l=t:(l={},r.length&&r.forEach(c=>Ac(l,c,o,!0)),Ac(l,t,o)),Ne(t)&&s.set(t,l),l}function Ac(i,t,e,n=!1){const{mixins:r,extends:s}=t;s&&Ac(i,s,e,!0),r&&r.forEach(o=>Ac(i,o,e,!0));for(const o in t)if(!(n&&o==="expose")){const a=bx[o]||e&&e[o];i[o]=a?a(i[o],t[o]):t[o]}return i}const bx={data:Zd,props:Jd,emits:Jd,methods:_a,computed:_a,beforeCreate:Rn,created:Rn,beforeMount:Rn,mounted:Rn,beforeUpdate:Rn,updated:Rn,beforeDestroy:Rn,beforeUnmount:Rn,destroyed:Rn,unmounted:Rn,activated:Rn,deactivated:Rn,errorCaptured:Rn,serverPrefetch:Rn,components:_a,directives:_a,watch:Tx,provide:Zd,inject:Ex};function Zd(i,t){return t?i?function(){return kn(ne(i)?i.call(this,this):i,ne(t)?t.call(this,this):t)}:t:i}function Ex(i,t){return _a(yf(i),yf(t))}function yf(i){if(Kt(i)){const t={};for(let e=0;e<i.length;e++)t[i[e]]=i[e];return t}return i}function Rn(i,t){return i?[...new Set([].concat(i,t))]:t}function _a(i,t){return i?kn(Object.create(null),i,t):t}function Jd(i,t){return i?Kt(i)&&Kt(t)?[...new Set([...i,...t])]:kn(Object.create(null),jd(i),jd(t??{})):t}function Tx(i,t){if(!i)return t;if(!t)return i;const e=kn(Object.create(null),i);for(const n in t)e[n]=Rn(i[n],t[n]);return e}function W_(){return{app:null,config:{isNativeTag:a_,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let wx=0;function Ax(i,t){return function(n,r=null){ne(n)||(n=kn({},n)),r!=null&&!Ne(r)&&(r=null);const s=W_(),o=new WeakSet,a=[];let l=!1;const c=s.app={_uid:wx++,_component:n,_props:r,_container:null,_context:s,_instance:null,version:fy,get config(){return s.config},set config(u){},use(u,...f){return o.has(u)||(u&&ne(u.install)?(o.add(u),u.install(c,...f)):ne(u)&&(o.add(u),u(c,...f))),c},mixin(u){return s.mixins.includes(u)||s.mixins.push(u),c},component(u,f){return f?(s.components[u]=f,c):s.components[u]},directive(u,f){return f?(s.directives[u]=f,c):s.directives[u]},mount(u,f,h){if(!l){const d=c._ceVNode||hn(n,r);return d.appContext=s,h===!0?h="svg":h===!1&&(h=void 0),i(d,u,h),l=!0,c._container=u,u.__vue_app__=c,ed(d.component)}},onUnmount(u){a.push(u)},unmount(){l&&(er(a,c._instance,16),i(null,c._container),delete c._container.__vue_app__)},provide(u,f){return s.provides[u]=f,c},runWithContext(u){const f=Co;Co=c;try{return u()}finally{Co=f}}};return c}}let Co=null;function Cx(i,t){if(Fn){let e=Fn.provides;const n=Fn.parent&&Fn.parent.provides;n===e&&(e=Fn.provides=Object.create(n)),e[i]=t}}function ec(i,t,e=!1){const n=ry();if(n||Co){let r=Co?Co._context.provides:n?n.parent==null||n.ce?n.vnode.appContext&&n.vnode.appContext.provides:n.parent.provides:void 0;if(r&&i in r)return r[i];if(arguments.length>1)return e&&ne(t)?t.call(n&&n.proxy):t}}const X_={},Y_=()=>Object.create(X_),q_=i=>Object.getPrototypeOf(i)===X_;function Rx(i,t,e,n=!1){const r={},s=Y_();i.propsDefaults=Object.create(null),$_(i,t,r,s);for(const o in i.propsOptions[0])o in r||(r[o]=void 0);e?i.props=n?r:Yv(r):i.type.props?i.props=r:i.props=s,i.attrs=s}function Px(i,t,e,n){const{props:r,attrs:s,vnode:{patchFlag:o}}=i,a=xe(r),[l]=i.propsOptions;let c=!1;if((n||o>0)&&!(o&16)){if(o&8){const u=i.vnode.dynamicProps;for(let f=0;f<u.length;f++){let h=u[f];if(tu(i.emitsOptions,h))continue;const d=t[h];if(l)if(ye(s,h))d!==s[h]&&(s[h]=d,c=!0);else{const g=ns(h);r[g]=Mf(l,a,g,d,i,!1)}else d!==s[h]&&(s[h]=d,c=!0)}}}else{$_(i,t,r,s)&&(c=!0);let u;for(const f in a)(!t||!ye(t,f)&&((u=qs(f))===f||!ye(t,u)))&&(l?e&&(e[f]!==void 0||e[u]!==void 0)&&(r[f]=Mf(l,a,f,void 0,i,!0)):delete r[f]);if(s!==a)for(const f in s)(!t||!ye(t,f))&&(delete s[f],c=!0)}c&&gr(i.attrs,"set","")}function $_(i,t,e,n){const[r,s]=i.propsOptions;let o=!1,a;if(t)for(let l in t){if(Aa(l))continue;const c=t[l];let u;r&&ye(r,u=ns(l))?!s||!s.includes(u)?e[u]=c:(a||(a={}))[u]=c:tu(i.emitsOptions,l)||(!(l in n)||c!==n[l])&&(n[l]=c,o=!0)}if(s){const l=xe(e),c=a||De;for(let u=0;u<s.length;u++){const f=s[u];e[f]=Mf(r,l,f,c[f],i,!ye(c,f))}}return o}function Mf(i,t,e,n,r,s){const o=i[e];if(o!=null){const a=ye(o,"default");if(a&&n===void 0){const l=o.default;if(o.type!==Function&&!o.skipFactory&&ne(l)){const{propsDefaults:c}=r;if(e in c)n=c[e];else{const u=cl(r);n=c[e]=l.call(null,t),u()}}else n=l;r.ce&&r.ce._setProp(e,n)}o[0]&&(s&&!a?n=!1:o[1]&&(n===""||n===qs(e))&&(n=!0))}return n}const Dx=new WeakMap;function j_(i,t,e=!1){const n=e?Dx:t.propsCache,r=n.get(i);if(r)return r;const s=i.props,o={},a=[];let l=!1;if(!ne(i)){const u=f=>{l=!0;const[h,d]=j_(f,t,!0);kn(o,h),d&&a.push(...d)};!e&&t.mixins.length&&t.mixins.forEach(u),i.extends&&u(i.extends),i.mixins&&i.mixins.forEach(u)}if(!s&&!l)return Ne(i)&&n.set(i,Eo),Eo;if(Kt(s))for(let u=0;u<s.length;u++){const f=ns(s[u]);Qd(f)&&(o[f]=De)}else if(s)for(const u in s){const f=ns(u);if(Qd(f)){const h=s[u],d=o[f]=Kt(h)||ne(h)?{type:h}:kn({},h),g=d.type;let _=!1,m=!0;if(Kt(g))for(let p=0;p<g.length;++p){const M=g[p],b=ne(M)&&M.name;if(b==="Boolean"){_=!0;break}else b==="String"&&(m=!1)}else _=ne(g)&&g.name==="Boolean";d[0]=_,d[1]=m,(_||ye(d,"default"))&&a.push(f)}}const c=[o,a];return Ne(i)&&n.set(i,c),c}function Qd(i){return i[0]!=="$"&&!Aa(i)}const Jh=i=>i==="_"||i==="_ctx"||i==="$stable",Qh=i=>Kt(i)?i.map(Yi):[Yi(i)],Lx=(i,t,e)=>{if(t._n)return t;const n=rx((...r)=>Qh(t(...r)),e);return n._c=!1,n},K_=(i,t,e)=>{const n=i._ctx;for(const r in i){if(Jh(r))continue;const s=i[r];if(ne(s))t[r]=Lx(r,s,n);else if(s!=null){const o=Qh(s);t[r]=()=>o}}},Z_=(i,t)=>{const e=Qh(t);i.slots.default=()=>e},J_=(i,t,e)=>{for(const n in t)(e||!Jh(n))&&(i[n]=t[n])},Ix=(i,t,e)=>{const n=i.slots=Y_();if(i.vnode.shapeFlag&32){const r=t._;r?(J_(n,t,e),e&&d_(n,"_",r,!0)):K_(t,n)}else t&&Z_(i,t)},Ux=(i,t,e)=>{const{vnode:n,slots:r}=i;let s=!0,o=De;if(n.shapeFlag&32){const a=t._;a?e&&a===1?s=!1:J_(r,t,e):(s=!t.$stable,K_(t,r)),o=t}else t&&(Z_(i,t),o={default:1});if(s)for(const a in r)!Jh(a)&&o[a]==null&&delete r[a]},ii=jx;function Nx(i){return Ox(i)}function Ox(i,t){const e=$c();e.__VUE__=!0;const{insert:n,remove:r,patchProp:s,createElement:o,createText:a,createComment:l,setText:c,setElementText:u,parentNode:f,nextSibling:h,setScopeId:d=Qi,insertStaticContent:g}=i,_=(P,U,A,st=null,J=null,L=null,it=void 0,ot=null,Q=!!U.dynamicChildren)=>{if(P===U)return;P&&!aa(P,U)&&(st=dt(P),Lt(P,J,L,!0),P=null),U.patchFlag===-2&&(Q=!1,U.dynamicChildren=null);const{type:E,ref:y,shapeFlag:O}=U;switch(E){case eu:m(P,U,A,st);break;case zo:p(P,U,A,st);break;case ic:P==null&&M(U,A,st,it);break;case Sn:F(P,U,A,st,J,L,it,ot,Q);break;default:O&1?R(P,U,A,st,J,L,it,ot,Q):O&6?z(P,U,A,st,J,L,it,ot,Q):(O&64||O&128)&&E.process(P,U,A,st,J,L,it,ot,Q,kt)}y!=null&&J?Pa(y,P&&P.ref,L,U||P,!U):y==null&&P&&P.ref!=null&&Pa(P.ref,null,L,P,!0)},m=(P,U,A,st)=>{if(P==null)n(U.el=a(U.children),A,st);else{const J=U.el=P.el;U.children!==P.children&&c(J,U.children)}},p=(P,U,A,st)=>{P==null?n(U.el=l(U.children||""),A,st):U.el=P.el},M=(P,U,A,st)=>{[P.el,P.anchor]=g(P.children,U,A,st,P.el,P.anchor)},b=({el:P,anchor:U},A,st)=>{let J;for(;P&&P!==U;)J=h(P),n(P,A,st),P=J;n(U,A,st)},v=({el:P,anchor:U})=>{let A;for(;P&&P!==U;)A=h(P),r(P),P=A;r(U)},R=(P,U,A,st,J,L,it,ot,Q)=>{U.type==="svg"?it="svg":U.type==="math"&&(it="mathml"),P==null?C(U,A,st,J,L,it,ot,Q):S(P,U,J,L,it,ot,Q)},C=(P,U,A,st,J,L,it,ot)=>{let Q,E;const{props:y,shapeFlag:O,transition:X,dirs:Y}=P;if(Q=P.el=o(P.type,L,y&&y.is,y),O&8?u(Q,P.children):O&16&&D(P.children,Q,null,st,J,gu(P,L),it,ot),Y&&us(P,null,st,"created"),T(Q,P,P.scopeId,it,st),y){for(const ut in y)ut!=="value"&&!Aa(ut)&&s(Q,ut,null,y[ut],L,st);"value"in y&&s(Q,"value",null,y.value,L),(E=y.onVnodeBeforeMount)&&Vi(E,st,P)}Y&&us(P,null,st,"beforeMount");const $=Fx(J,X);$&&X.beforeEnter(Q),n(Q,U,A),((E=y&&y.onVnodeMounted)||$||Y)&&ii(()=>{E&&Vi(E,st,P),$&&X.enter(Q),Y&&us(P,null,st,"mounted")},J)},T=(P,U,A,st,J)=>{if(A&&d(P,A),st)for(let L=0;L<st.length;L++)d(P,st[L]);if(J){let L=J.subTree;if(U===L||rg(L.type)&&(L.ssContent===U||L.ssFallback===U)){const it=J.vnode;T(P,it,it.scopeId,it.slotScopeIds,J.parent)}}},D=(P,U,A,st,J,L,it,ot,Q=0)=>{for(let E=Q;E<P.length;E++){const y=P[E]=ot?kr(P[E]):Yi(P[E]);_(null,y,U,A,st,J,L,it,ot)}},S=(P,U,A,st,J,L,it)=>{const ot=U.el=P.el;let{patchFlag:Q,dynamicChildren:E,dirs:y}=U;Q|=P.patchFlag&16;const O=P.props||De,X=U.props||De;let Y;if(A&&fs(A,!1),(Y=X.onVnodeBeforeUpdate)&&Vi(Y,A,U,P),y&&us(U,P,A,"beforeUpdate"),A&&fs(A,!0),(O.innerHTML&&X.innerHTML==null||O.textContent&&X.textContent==null)&&u(ot,""),E?x(P.dynamicChildren,E,ot,A,st,gu(U,J),L):it||H(P,U,ot,null,A,st,gu(U,J),L,!1),Q>0){if(Q&16)I(ot,O,X,A,J);else if(Q&2&&O.class!==X.class&&s(ot,"class",null,X.class,J),Q&4&&s(ot,"style",O.style,X.style,J),Q&8){const $=U.dynamicProps;for(let ut=0;ut<$.length;ut++){const lt=$[ut],mt=O[lt],Ot=X[lt];(Ot!==mt||lt==="value")&&s(ot,lt,mt,Ot,J,A)}}Q&1&&P.children!==U.children&&u(ot,U.children)}else!it&&E==null&&I(ot,O,X,A,J);((Y=X.onVnodeUpdated)||y)&&ii(()=>{Y&&Vi(Y,A,U,P),y&&us(U,P,A,"updated")},st)},x=(P,U,A,st,J,L,it)=>{for(let ot=0;ot<U.length;ot++){const Q=P[ot],E=U[ot],y=Q.el&&(Q.type===Sn||!aa(Q,E)||Q.shapeFlag&198)?f(Q.el):A;_(Q,E,y,null,st,J,L,it,!0)}},I=(P,U,A,st,J)=>{if(U!==A){if(U!==De)for(const L in U)!Aa(L)&&!(L in A)&&s(P,L,U[L],null,J,st);for(const L in A){if(Aa(L))continue;const it=A[L],ot=U[L];it!==ot&&L!=="value"&&s(P,L,ot,it,J,st)}"value"in A&&s(P,"value",U.value,A.value,J)}},F=(P,U,A,st,J,L,it,ot,Q)=>{const E=U.el=P?P.el:a(""),y=U.anchor=P?P.anchor:a("");let{patchFlag:O,dynamicChildren:X,slotScopeIds:Y}=U;Y&&(ot=ot?ot.concat(Y):Y),P==null?(n(E,A,st),n(y,A,st),D(U.children||[],A,y,J,L,it,ot,Q)):O>0&&O&64&&X&&P.dynamicChildren?(x(P.dynamicChildren,X,A,J,L,it,ot),(U.key!=null||J&&U===J.subTree)&&Q_(P,U,!0)):H(P,U,A,y,J,L,it,ot,Q)},z=(P,U,A,st,J,L,it,ot,Q)=>{U.slotScopeIds=ot,P==null?U.shapeFlag&512?J.ctx.activate(U,A,st,it,Q):W(U,A,st,J,L,it,Q):tt(P,U,Q)},W=(P,U,A,st,J,L,it)=>{const ot=P.component=iy(P,st,J);if(k_(P)&&(ot.ctx.renderer=kt),sy(ot,!1,it),ot.asyncDep){if(J&&J.registerDep(ot,G,it),!P.el){const Q=ot.subTree=hn(zo);p(null,Q,U,A),P.placeholder=Q.el}}else G(ot,P,U,A,J,L,it)},tt=(P,U,A)=>{const st=U.component=P.component;if(qx(P,U,A))if(st.asyncDep&&!st.asyncResolved){K(st,U,A);return}else st.next=U,st.update();else U.el=P.el,st.vnode=U},G=(P,U,A,st,J,L,it)=>{const ot=()=>{if(P.isMounted){let{next:O,bu:X,u:Y,parent:$,vnode:ut}=P;{const et=tg(P);if(et){O&&(O.el=ut.el,K(P,O,it)),et.asyncDep.then(()=>{P.isUnmounted||ot()});return}}let lt=O,mt;fs(P,!1),O?(O.el=ut.el,K(P,O,it)):O=ut,X&&fu(X),(mt=O.props&&O.props.onVnodeBeforeUpdate)&&Vi(mt,$,O,ut),fs(P,!0);const Ot=ep(P),ft=P.subTree;P.subTree=Ot,_(ft,Ot,f(ft.el),dt(ft),P,J,L),O.el=Ot.el,lt===null&&$x(P,Ot.el),Y&&ii(Y,J),(mt=O.props&&O.props.onVnodeUpdated)&&ii(()=>Vi(mt,$,O,ut),J)}else{let O;const{el:X,props:Y}=U,{bm:$,m:ut,parent:lt,root:mt,type:Ot}=P,ft=Da(U);fs(P,!1),$&&fu($),!ft&&(O=Y&&Y.onVnodeBeforeMount)&&Vi(O,lt,U),fs(P,!0);{mt.ce&&mt.ce._def.shadowRoot!==!1&&mt.ce._injectChildStyle(Ot);const et=P.subTree=ep(P);_(null,et,A,st,P,J,L),U.el=et.el}if(ut&&ii(ut,J),!ft&&(O=Y&&Y.onVnodeMounted)){const et=U;ii(()=>Vi(O,lt,et),J)}(U.shapeFlag&256||lt&&Da(lt.vnode)&&lt.vnode.shapeFlag&256)&&P.a&&ii(P.a,J),P.isMounted=!0,U=A=st=null}};P.scope.on();const Q=P.effect=new g_(ot);P.scope.off();const E=P.update=Q.run.bind(Q),y=P.job=Q.runIfDirty.bind(Q);y.i=P,y.id=P.uid,Q.scheduler=()=>Kh(y),fs(P,!0),E()},K=(P,U,A)=>{U.component=P;const st=P.vnode.props;P.vnode=U,P.next=null,Px(P,U.props,st,A),Ux(P,U.children,A),Er(),qd(P),Tr()},H=(P,U,A,st,J,L,it,ot,Q=!1)=>{const E=P&&P.children,y=P?P.shapeFlag:0,O=U.children,{patchFlag:X,shapeFlag:Y}=U;if(X>0){if(X&128){N(E,O,A,st,J,L,it,ot,Q);return}else if(X&256){ct(E,O,A,st,J,L,it,ot,Q);return}}Y&8?(y&16&&yt(E,J,L),O!==E&&u(A,O)):y&16?Y&16?N(E,O,A,st,J,L,it,ot,Q):yt(E,J,L,!0):(y&8&&u(A,""),Y&16&&D(O,A,st,J,L,it,ot,Q))},ct=(P,U,A,st,J,L,it,ot,Q)=>{P=P||Eo,U=U||Eo;const E=P.length,y=U.length,O=Math.min(E,y);let X;for(X=0;X<O;X++){const Y=U[X]=Q?kr(U[X]):Yi(U[X]);_(P[X],Y,A,null,J,L,it,ot,Q)}E>y?yt(P,J,L,!0,!1,O):D(U,A,st,J,L,it,ot,Q,O)},N=(P,U,A,st,J,L,it,ot,Q)=>{let E=0;const y=U.length;let O=P.length-1,X=y-1;for(;E<=O&&E<=X;){const Y=P[E],$=U[E]=Q?kr(U[E]):Yi(U[E]);if(aa(Y,$))_(Y,$,A,null,J,L,it,ot,Q);else break;E++}for(;E<=O&&E<=X;){const Y=P[O],$=U[X]=Q?kr(U[X]):Yi(U[X]);if(aa(Y,$))_(Y,$,A,null,J,L,it,ot,Q);else break;O--,X--}if(E>O){if(E<=X){const Y=X+1,$=Y<y?U[Y].el:st;for(;E<=X;)_(null,U[E]=Q?kr(U[E]):Yi(U[E]),A,$,J,L,it,ot,Q),E++}}else if(E>X)for(;E<=O;)Lt(P[E],J,L,!0),E++;else{const Y=E,$=E,ut=new Map;for(E=$;E<=X;E++){const _t=U[E]=Q?kr(U[E]):Yi(U[E]);_t.key!=null&&ut.set(_t.key,E)}let lt,mt=0;const Ot=X-$+1;let ft=!1,et=0;const bt=new Array(Ot);for(E=0;E<Ot;E++)bt[E]=0;for(E=Y;E<=O;E++){const _t=P[E];if(mt>=Ot){Lt(_t,J,L,!0);continue}let Ht;if(_t.key!=null)Ht=ut.get(_t.key);else for(lt=$;lt<=X;lt++)if(bt[lt-$]===0&&aa(_t,U[lt])){Ht=lt;break}Ht===void 0?Lt(_t,J,L,!0):(bt[Ht-$]=E+1,Ht>=et?et=Ht:ft=!0,_(_t,U[Ht],A,null,J,L,it,ot,Q),mt++)}const Ct=ft?Bx(bt):Eo;for(lt=Ct.length-1,E=Ot-1;E>=0;E--){const _t=$+E,Ht=U[_t],Vt=U[_t+1],ce=_t+1<y?Vt.el||Vt.placeholder:st;bt[E]===0?_(null,Ht,A,ce,J,L,it,ot,Q):ft&&(lt<0||E!==Ct[lt]?vt(Ht,A,ce,2):lt--)}}},vt=(P,U,A,st,J=null)=>{const{el:L,type:it,transition:ot,children:Q,shapeFlag:E}=P;if(E&6){vt(P.component.subTree,U,A,st);return}if(E&128){P.suspense.move(U,A,st);return}if(E&64){it.move(P,U,A,kt);return}if(it===Sn){n(L,U,A);for(let O=0;O<Q.length;O++)vt(Q[O],U,A,st);n(P.anchor,U,A);return}if(it===ic){b(P,U,A);return}if(st!==2&&E&1&&ot)if(st===0)ot.beforeEnter(L),n(L,U,A),ii(()=>ot.enter(L),J);else{const{leave:O,delayLeave:X,afterLeave:Y}=ot,$=()=>{P.ctx.isUnmounted?r(L):n(L,U,A)},ut=()=>{L._isLeaving&&L[ax](!0),O(L,()=>{$(),Y&&Y()})};X?X(L,$,ut):ut()}else n(L,U,A)},Lt=(P,U,A,st=!1,J=!1)=>{const{type:L,props:it,ref:ot,children:Q,dynamicChildren:E,shapeFlag:y,patchFlag:O,dirs:X,cacheIndex:Y}=P;if(O===-2&&(J=!1),ot!=null&&(Er(),Pa(ot,null,A,P,!0),Tr()),Y!=null&&(U.renderCache[Y]=void 0),y&256){U.ctx.deactivate(P);return}const $=y&1&&X,ut=!Da(P);let lt;if(ut&&(lt=it&&it.onVnodeBeforeUnmount)&&Vi(lt,U,P),y&6)ht(P.component,A,st);else{if(y&128){P.suspense.unmount(A,st);return}$&&us(P,null,U,"beforeUnmount"),y&64?P.type.remove(P,U,A,kt,st):E&&!E.hasOnce&&(L!==Sn||O>0&&O&64)?yt(E,U,A,!1,!0):(L===Sn&&O&384||!J&&y&16)&&yt(Q,U,A),st&&qt(P)}(ut&&(lt=it&&it.onVnodeUnmounted)||$)&&ii(()=>{lt&&Vi(lt,U,P),$&&us(P,null,U,"unmounted")},A)},qt=P=>{const{type:U,el:A,anchor:st,transition:J}=P;if(U===Sn){nt(A,st);return}if(U===ic){v(P);return}const L=()=>{r(A),J&&!J.persisted&&J.afterLeave&&J.afterLeave()};if(P.shapeFlag&1&&J&&!J.persisted){const{leave:it,delayLeave:ot}=J,Q=()=>it(A,L);ot?ot(P.el,L,Q):Q()}else L()},nt=(P,U)=>{let A;for(;P!==U;)A=h(P),r(P),P=A;r(U)},ht=(P,U,A)=>{const{bum:st,scope:J,job:L,subTree:it,um:ot,m:Q,a:E}=P;tp(Q),tp(E),st&&fu(st),J.stop(),L&&(L.flags|=8,Lt(it,P,U,A)),ot&&ii(ot,U),ii(()=>{P.isUnmounted=!0},U)},yt=(P,U,A,st=!1,J=!1,L=0)=>{for(let it=L;it<P.length;it++)Lt(P[it],U,A,st,J)},dt=P=>{if(P.shapeFlag&6)return dt(P.component.subTree);if(P.shapeFlag&128)return P.suspense.next();const U=h(P.anchor||P.el),A=U&&U[sx];return A?h(A):U};let Pt=!1;const It=(P,U,A)=>{P==null?U._vnode&&Lt(U._vnode,null,null,!0):_(U._vnode||null,P,U,null,null,null,A),U._vnode=P,Pt||(Pt=!0,qd(),O_(),Pt=!1)},kt={p:_,um:Lt,m:vt,r:qt,mt:W,mc:D,pc:H,pbc:x,n:dt,o:i};return{render:It,hydrate:void 0,createApp:Ax(It)}}function gu({type:i,props:t},e){return e==="svg"&&i==="foreignObject"||e==="mathml"&&i==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:e}function fs({effect:i,job:t},e){e?(i.flags|=32,t.flags|=4):(i.flags&=-33,t.flags&=-5)}function Fx(i,t){return(!i||i&&!i.pendingBranch)&&t&&!t.persisted}function Q_(i,t,e=!1){const n=i.children,r=t.children;if(Kt(n)&&Kt(r))for(let s=0;s<n.length;s++){const o=n[s];let a=r[s];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=r[s]=kr(r[s]),a.el=o.el),!e&&a.patchFlag!==-2&&Q_(o,a)),a.type===eu&&a.patchFlag!==-1&&(a.el=o.el),a.type===zo&&!a.el&&(a.el=o.el)}}function Bx(i){const t=i.slice(),e=[0];let n,r,s,o,a;const l=i.length;for(n=0;n<l;n++){const c=i[n];if(c!==0){if(r=e[e.length-1],i[r]<c){t[n]=r,e.push(n);continue}for(s=0,o=e.length-1;s<o;)a=s+o>>1,i[e[a]]<c?s=a+1:o=a;c<i[e[s]]&&(s>0&&(t[n]=e[s-1]),e[s]=n)}}for(s=e.length,o=e[s-1];s-- >0;)e[s]=o,o=t[o];return e}function tg(i){const t=i.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:tg(t)}function tp(i){if(i)for(let t=0;t<i.length;t++)i[t].flags|=8}const zx=Symbol.for("v-scx"),kx=()=>ec(zx);function nc(i,t,e){return eg(i,t,e)}function eg(i,t,e=De){const{immediate:n,deep:r,flush:s,once:o}=e,a=kn({},e),l=t&&n||!t&&s!=="post";let c;if(Ka){if(s==="sync"){const d=kx();c=d.__watcherHandles||(d.__watcherHandles=[])}else if(!l){const d=()=>{};return d.stop=Qi,d.resume=Qi,d.pause=Qi,d}}const u=Fn;a.call=(d,g,_)=>er(d,u,g,_);let f=!1;s==="post"?a.scheduler=d=>{ii(d,u&&u.suspense)}:s!=="sync"&&(f=!0,a.scheduler=(d,g)=>{g?d():Kh(d)}),a.augmentJob=d=>{t&&(d.flags|=4),f&&(d.flags|=2,u&&(d.id=u.uid,d.i=u))};const h=tx(i,t,a);return Ka&&(c?c.push(h):l&&h()),h}function Hx(i,t,e){const n=this.proxy,r=Ke(i)?i.includes(".")?ng(n,i):()=>n[i]:i.bind(n,n);let s;ne(t)?s=t:(s=t.handler,e=t);const o=cl(this),a=eg(r,s.bind(n),e);return o(),a}function ng(i,t){const e=t.split(".");return()=>{let n=i;for(let r=0;r<e.length&&n;r++)n=n[e[r]];return n}}const Vx=(i,t)=>t==="modelValue"||t==="model-value"?i.modelModifiers:i[`${t}Modifiers`]||i[`${ns(t)}Modifiers`]||i[`${qs(t)}Modifiers`];function Gx(i,t,...e){if(i.isUnmounted)return;const n=i.vnode.props||De;let r=e;const s=t.startsWith("update:"),o=s&&Vx(n,t.slice(7));o&&(o.trim&&(r=e.map(u=>Ke(u)?u.trim():u)),o.number&&(r=e.map(xv)));let a,l=n[a=uu(t)]||n[a=uu(ns(t))];!l&&s&&(l=n[a=uu(qs(t))]),l&&er(l,i,6,r);const c=n[a+"Once"];if(c){if(!i.emitted)i.emitted={};else if(i.emitted[a])return;i.emitted[a]=!0,er(c,i,6,r)}}const Wx=new WeakMap;function ig(i,t,e=!1){const n=e?Wx:t.emitsCache,r=n.get(i);if(r!==void 0)return r;const s=i.emits;let o={},a=!1;if(!ne(i)){const l=c=>{const u=ig(c,t,!0);u&&(a=!0,kn(o,u))};!e&&t.mixins.length&&t.mixins.forEach(l),i.extends&&l(i.extends),i.mixins&&i.mixins.forEach(l)}return!s&&!a?(Ne(i)&&n.set(i,null),null):(Kt(s)?s.forEach(l=>o[l]=null):kn(o,s),Ne(i)&&n.set(i,o),o)}function tu(i,t){return!i||!Xc(t)?!1:(t=t.slice(2).replace(/Once$/,""),ye(i,t[0].toLowerCase()+t.slice(1))||ye(i,qs(t))||ye(i,t))}function ep(i){const{type:t,vnode:e,proxy:n,withProxy:r,propsOptions:[s],slots:o,attrs:a,emit:l,render:c,renderCache:u,props:f,data:h,setupState:d,ctx:g,inheritAttrs:_}=i,m=Tc(i);let p,M;try{if(e.shapeFlag&4){const v=r||n,R=v;p=Yi(c.call(R,v,u,f,d,h,g)),M=a}else{const v=t;p=Yi(v.length>1?v(f,{attrs:a,slots:o,emit:l}):v(f,null)),M=t.props?a:Xx(a)}}catch(v){Ia.length=0,Jc(v,i,1),p=hn(zo)}let b=p;if(M&&_!==!1){const v=Object.keys(M),{shapeFlag:R}=b;v.length&&R&7&&(s&&v.some(Bh)&&(M=Yx(M,s)),b=ko(b,M,!1,!0))}return e.dirs&&(b=ko(b,null,!1,!0),b.dirs=b.dirs?b.dirs.concat(e.dirs):e.dirs),e.transition&&Zh(b,e.transition),p=b,Tc(m),p}const Xx=i=>{let t;for(const e in i)(e==="class"||e==="style"||Xc(e))&&((t||(t={}))[e]=i[e]);return t},Yx=(i,t)=>{const e={};for(const n in i)(!Bh(n)||!(n.slice(9)in t))&&(e[n]=i[n]);return e};function qx(i,t,e){const{props:n,children:r,component:s}=i,{props:o,children:a,patchFlag:l}=t,c=s.emitsOptions;if(t.dirs||t.transition)return!0;if(e&&l>=0){if(l&1024)return!0;if(l&16)return n?np(n,o,c):!!o;if(l&8){const u=t.dynamicProps;for(let f=0;f<u.length;f++){const h=u[f];if(o[h]!==n[h]&&!tu(c,h))return!0}}}else return(r||a)&&(!a||!a.$stable)?!0:n===o?!1:n?o?np(n,o,c):!0:!!o;return!1}function np(i,t,e){const n=Object.keys(t);if(n.length!==Object.keys(i).length)return!0;for(let r=0;r<n.length;r++){const s=n[r];if(t[s]!==i[s]&&!tu(e,s))return!0}return!1}function $x({vnode:i,parent:t},e){for(;t;){const n=t.subTree;if(n.suspense&&n.suspense.activeBranch===i&&(n.el=i.el),n===i)(i=t.vnode).el=e,t=t.parent;else break}}const rg=i=>i.__isSuspense;function jx(i,t){t&&t.pendingBranch?Kt(i)?t.effects.push(...i):t.effects.push(i):ix(i)}const Sn=Symbol.for("v-fgt"),eu=Symbol.for("v-txt"),zo=Symbol.for("v-cmt"),ic=Symbol.for("v-stc"),Ia=[];let fi=null;function en(i=!1){Ia.push(fi=i?null:[])}function Kx(){Ia.pop(),fi=Ia[Ia.length-1]||null}let ja=1;function ip(i,t=!1){ja+=i,i<0&&fi&&t&&(fi.hasOnce=!0)}function Zx(i){return i.dynamicChildren=ja>0?fi||Eo:null,Kx(),ja>0&&fi&&fi.push(i),i}function nn(i,t,e,n,r,s){return Zx(pt(i,t,e,n,r,s,!0))}function sg(i){return i?i.__v_isVNode===!0:!1}function aa(i,t){return i.type===t.type&&i.key===t.key}const og=({key:i})=>i??null,rc=({ref:i,ref_key:t,ref_for:e})=>(typeof i=="number"&&(i=""+i),i!=null?Ke(i)||Tn(i)||ne(i)?{i:ji,r:i,k:t,f:!!e}:i:null);function pt(i,t=null,e=null,n=0,r=null,s=i===Sn?0:1,o=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:i,props:t,key:t&&og(t),ref:t&&rc(t),scopeId:B_,slotScopeIds:null,children:e,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:s,patchFlag:n,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:ji};return a?(td(l,e),s&128&&i.normalize(l)):e&&(l.shapeFlag|=Ke(e)?8:16),ja>0&&!o&&fi&&(l.patchFlag>0||s&6)&&l.patchFlag!==32&&fi.push(l),l}const hn=Jx;function Jx(i,t=null,e=null,n=0,r=null,s=!1){if((!i||i===xx)&&(i=zo),sg(i)){const a=ko(i,t,!0);return e&&td(a,e),ja>0&&!s&&fi&&(a.shapeFlag&6?fi[fi.indexOf(i)]=a:fi.push(a)),a.patchFlag=-2,a}if(cy(i)&&(i=i.__vccOpts),t){t=Qx(t);let{class:a,style:l}=t;a&&!Ke(a)&&(t.class=Kc(a)),Ne(l)&&($h(l)&&!Kt(l)&&(l=kn({},l)),t.style=jc(l))}const o=Ke(i)?1:rg(i)?128:ox(i)?64:Ne(i)?4:ne(i)?2:0;return pt(i,t,e,n,r,o,s,!0)}function Qx(i){return i?$h(i)||q_(i)?kn({},i):i:null}function ko(i,t,e=!1,n=!1){const{props:r,ref:s,patchFlag:o,children:a,transition:l}=i,c=t?ty(r||{},t):r,u={__v_isVNode:!0,__v_skip:!0,type:i.type,props:c,key:c&&og(c),ref:t&&t.ref?e&&s?Kt(s)?s.concat(rc(t)):[s,rc(t)]:rc(t):s,scopeId:i.scopeId,slotScopeIds:i.slotScopeIds,children:a,target:i.target,targetStart:i.targetStart,targetAnchor:i.targetAnchor,staticCount:i.staticCount,shapeFlag:i.shapeFlag,patchFlag:t&&i.type!==Sn?o===-1?16:o|16:o,dynamicProps:i.dynamicProps,dynamicChildren:i.dynamicChildren,appContext:i.appContext,dirs:i.dirs,transition:l,component:i.component,suspense:i.suspense,ssContent:i.ssContent&&ko(i.ssContent),ssFallback:i.ssFallback&&ko(i.ssFallback),placeholder:i.placeholder,el:i.el,anchor:i.anchor,ctx:i.ctx,ce:i.ce};return l&&n&&Zh(u,l.clone(u)),u}function ag(i=" ",t=0){return hn(eu,null,i,t)}function Cc(i,t){const e=hn(ic,null,i);return e.staticCount=t,e}function Yi(i){return i==null||typeof i=="boolean"?hn(zo):Kt(i)?hn(Sn,null,i.slice()):sg(i)?kr(i):hn(eu,null,String(i))}function kr(i){return i.el===null&&i.patchFlag!==-1||i.memo?i:ko(i)}function td(i,t){let e=0;const{shapeFlag:n}=i;if(t==null)t=null;else if(Kt(t))e=16;else if(typeof t=="object")if(n&65){const r=t.default;r&&(r._c&&(r._d=!1),td(i,r()),r._c&&(r._d=!0));return}else{e=32;const r=t._;!r&&!q_(t)?t._ctx=ji:r===3&&ji&&(ji.slots._===1?t._=1:(t._=2,i.patchFlag|=1024))}else ne(t)?(t={default:t,_ctx:ji},e=32):(t=String(t),n&64?(e=16,t=[ag(t)]):e=8);i.children=t,i.shapeFlag|=e}function ty(...i){const t={};for(let e=0;e<i.length;e++){const n=i[e];for(const r in n)if(r==="class")t.class!==n.class&&(t.class=Kc([t.class,n.class]));else if(r==="style")t.style=jc([t.style,n.style]);else if(Xc(r)){const s=t[r],o=n[r];o&&s!==o&&!(Kt(s)&&s.includes(o))&&(t[r]=s?[].concat(s,o):o)}else r!==""&&(t[r]=n[r])}return t}function Vi(i,t,e,n=null){er(i,t,7,[e,n])}const ey=W_();let ny=0;function iy(i,t,e){const n=i.type,r=(t?t.appContext:i.appContext)||ey,s={uid:ny++,vnode:i,type:n,parent:t,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new wv(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(r.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:j_(n,r),emitsOptions:ig(n,r),emit:null,emitted:null,propsDefaults:De,inheritAttrs:n.inheritAttrs,ctx:De,data:De,props:De,attrs:De,slots:De,refs:De,setupState:De,setupContext:null,suspense:e,suspenseId:e?e.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return s.ctx={_:s},s.root=t?t.root:s,s.emit=Gx.bind(null,s),i.ce&&i.ce(s),s}let Fn=null;const ry=()=>Fn||ji;let Rc,Sf;{const i=$c(),t=(e,n)=>{let r;return(r=i[e])||(r=i[e]=[]),r.push(n),s=>{r.length>1?r.forEach(o=>o(s)):r[0](s)}};Rc=t("__VUE_INSTANCE_SETTERS__",e=>Fn=e),Sf=t("__VUE_SSR_SETTERS__",e=>Ka=e)}const cl=i=>{const t=Fn;return Rc(i),i.scope.on(),()=>{i.scope.off(),Rc(t)}},rp=()=>{Fn&&Fn.scope.off(),Rc(null)};function lg(i){return i.vnode.shapeFlag&4}let Ka=!1;function sy(i,t=!1,e=!1){t&&Sf(t);const{props:n,children:r}=i.vnode,s=lg(i);Rx(i,n,s,t),Ix(i,r,e||t);const o=s?oy(i,t):void 0;return t&&Sf(!1),o}function oy(i,t){const e=i.type;i.accessCache=Object.create(null),i.proxy=new Proxy(i.ctx,yx);const{setup:n}=e;if(n){Er();const r=i.setupContext=n.length>1?ly(i):null,s=cl(i),o=al(n,i,0,[i.props,r]),a=c_(o);if(Tr(),s(),(a||i.sp)&&!Da(i)&&z_(i),a){if(o.then(rp,rp),t)return o.then(l=>{sp(i,l)}).catch(l=>{Jc(l,i,0)});i.asyncDep=o}else sp(i,o)}else cg(i)}function sp(i,t,e){ne(t)?i.type.__ssrInlineRender?i.ssrRender=t:i.render=t:Ne(t)&&(i.setupState=L_(t)),cg(i)}function cg(i,t,e){const n=i.type;i.render||(i.render=n.render||Qi);{const r=cl(i);Er();try{Mx(i)}finally{Tr(),r()}}}const ay={get(i,t){return Mn(i,"get",""),i[t]}};function ly(i){const t=e=>{i.exposed=e||{}};return{attrs:new Proxy(i.attrs,ay),slots:i.slots,emit:i.emit,expose:t}}function ed(i){return i.exposed?i.exposeProxy||(i.exposeProxy=new Proxy(L_(qv(i.exposed)),{get(t,e){if(e in t)return t[e];if(e in La)return La[e](i)},has(t,e){return e in t||e in La}})):i.proxy}function cy(i){return ne(i)&&"__vccOpts"in i}const uy=(i,t)=>Jv(i,t,Ka),fy="3.5.22";let bf;const op=typeof window<"u"&&window.trustedTypes;if(op)try{bf=op.createPolicy("vue",{createHTML:i=>i})}catch{}const ug=bf?i=>bf.createHTML(i):i=>i,hy="http://www.w3.org/2000/svg",dy="http://www.w3.org/1998/Math/MathML",pr=typeof document<"u"?document:null,ap=pr&&pr.createElement("template"),py={insert:(i,t,e)=>{t.insertBefore(i,e||null)},remove:i=>{const t=i.parentNode;t&&t.removeChild(i)},createElement:(i,t,e,n)=>{const r=t==="svg"?pr.createElementNS(hy,i):t==="mathml"?pr.createElementNS(dy,i):e?pr.createElement(i,{is:e}):pr.createElement(i);return i==="select"&&n&&n.multiple!=null&&r.setAttribute("multiple",n.multiple),r},createText:i=>pr.createTextNode(i),createComment:i=>pr.createComment(i),setText:(i,t)=>{i.nodeValue=t},setElementText:(i,t)=>{i.textContent=t},parentNode:i=>i.parentNode,nextSibling:i=>i.nextSibling,querySelector:i=>pr.querySelector(i),setScopeId(i,t){i.setAttribute(t,"")},insertStaticContent(i,t,e,n,r,s){const o=e?e.previousSibling:t.lastChild;if(r&&(r===s||r.nextSibling))for(;t.insertBefore(r.cloneNode(!0),e),!(r===s||!(r=r.nextSibling)););else{ap.innerHTML=ug(n==="svg"?`<svg>${i}</svg>`:n==="mathml"?`<math>${i}</math>`:i);const a=ap.content;if(n==="svg"||n==="mathml"){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}t.insertBefore(a,e)}return[o?o.nextSibling:t.firstChild,e?e.previousSibling:t.lastChild]}},my=Symbol("_vtc");function _y(i,t,e){const n=i[my];n&&(t=(t?[t,...n]:[...n]).join(" ")),t==null?i.removeAttribute("class"):e?i.setAttribute("class",t):i.className=t}const lp=Symbol("_vod"),gy=Symbol("_vsh"),vy=Symbol(""),xy=/(?:^|;)\s*display\s*:/;function yy(i,t,e){const n=i.style,r=Ke(e);let s=!1;if(e&&!r){if(t)if(Ke(t))for(const o of t.split(";")){const a=o.slice(0,o.indexOf(":")).trim();e[a]==null&&sc(n,a,"")}else for(const o in t)e[o]==null&&sc(n,o,"");for(const o in e)o==="display"&&(s=!0),sc(n,o,e[o])}else if(r){if(t!==e){const o=n[vy];o&&(e+=";"+o),n.cssText=e,s=xy.test(e)}}else t&&i.removeAttribute("style");lp in i&&(i[lp]=s?n.display:"",i[gy]&&(n.display="none"))}const cp=/\s*!important$/;function sc(i,t,e){if(Kt(e))e.forEach(n=>sc(i,t,n));else if(e==null&&(e=""),t.startsWith("--"))i.setProperty(t,e);else{const n=My(i,t);cp.test(e)?i.setProperty(qs(n),e.replace(cp,""),"important"):i[n]=e}}const up=["Webkit","Moz","ms"],vu={};function My(i,t){const e=vu[t];if(e)return e;let n=ns(t);if(n!=="filter"&&n in i)return vu[t]=n;n=h_(n);for(let r=0;r<up.length;r++){const s=up[r]+n;if(s in i)return vu[t]=s}return t}const fp="http://www.w3.org/1999/xlink";function hp(i,t,e,n,r,s=Tv(t)){n&&t.startsWith("xlink:")?e==null?i.removeAttributeNS(fp,t.slice(6,t.length)):i.setAttributeNS(fp,t,e):e==null||s&&!p_(e)?i.removeAttribute(t):i.setAttribute(t,s?"":ls(e)?String(e):e)}function dp(i,t,e,n,r){if(t==="innerHTML"||t==="textContent"){e!=null&&(i[t]=t==="innerHTML"?ug(e):e);return}const s=i.tagName;if(t==="value"&&s!=="PROGRESS"&&!s.includes("-")){const a=s==="OPTION"?i.getAttribute("value")||"":i.value,l=e==null?i.type==="checkbox"?"on":"":String(e);(a!==l||!("_value"in i))&&(i.value=l),e==null&&i.removeAttribute(t),i._value=e;return}let o=!1;if(e===""||e==null){const a=typeof i[t];a==="boolean"?e=p_(e):e==null&&a==="string"?(e="",o=!0):a==="number"&&(e=0,o=!0)}try{i[t]=e}catch{}o&&i.removeAttribute(r||t)}function Sy(i,t,e,n){i.addEventListener(t,e,n)}function by(i,t,e,n){i.removeEventListener(t,e,n)}const pp=Symbol("_vei");function Ey(i,t,e,n,r=null){const s=i[pp]||(i[pp]={}),o=s[t];if(n&&o)o.value=n;else{const[a,l]=Ty(t);if(n){const c=s[t]=Cy(n,r);Sy(i,a,c,l)}else o&&(by(i,a,o,l),s[t]=void 0)}}const mp=/(?:Once|Passive|Capture)$/;function Ty(i){let t;if(mp.test(i)){t={};let n;for(;n=i.match(mp);)i=i.slice(0,i.length-n[0].length),t[n[0].toLowerCase()]=!0}return[i[2]===":"?i.slice(3):qs(i.slice(2)),t]}let xu=0;const wy=Promise.resolve(),Ay=()=>xu||(wy.then(()=>xu=0),xu=Date.now());function Cy(i,t){const e=n=>{if(!n._vts)n._vts=Date.now();else if(n._vts<=e.attached)return;er(Ry(n,e.value),t,5,[n])};return e.value=i,e.attached=Ay(),e}function Ry(i,t){if(Kt(t)){const e=i.stopImmediatePropagation;return i.stopImmediatePropagation=()=>{e.call(i),i._stopped=!0},t.map(n=>r=>!r._stopped&&n&&n(r))}else return t}const _p=i=>i.charCodeAt(0)===111&&i.charCodeAt(1)===110&&i.charCodeAt(2)>96&&i.charCodeAt(2)<123,Py=(i,t,e,n,r,s)=>{const o=r==="svg";t==="class"?_y(i,n,o):t==="style"?yy(i,e,n):Xc(t)?Bh(t)||Ey(i,t,e,n,s):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):Dy(i,t,n,o))?(dp(i,t,n),!i.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&hp(i,t,n,o,s,t!=="value")):i._isVueCE&&(/[A-Z]/.test(t)||!Ke(n))?dp(i,ns(t),n,s,t):(t==="true-value"?i._trueValue=n:t==="false-value"&&(i._falseValue=n),hp(i,t,n,o))};function Dy(i,t,e,n){if(n)return!!(t==="innerHTML"||t==="textContent"||t in i&&_p(t)&&ne(e));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="autocorrect"||t==="form"||t==="list"&&i.tagName==="INPUT"||t==="type"&&i.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const r=i.tagName;if(r==="IMG"||r==="VIDEO"||r==="CANVAS"||r==="SOURCE")return!1}return _p(t)&&Ke(e)?!1:t in i}const Ly=["ctrl","shift","alt","meta"],Iy={stop:i=>i.stopPropagation(),prevent:i=>i.preventDefault(),self:i=>i.target!==i.currentTarget,ctrl:i=>!i.ctrlKey,shift:i=>!i.shiftKey,alt:i=>!i.altKey,meta:i=>!i.metaKey,left:i=>"button"in i&&i.button!==0,middle:i=>"button"in i&&i.button!==1,right:i=>"button"in i&&i.button!==2,exact:(i,t)=>Ly.some(e=>i[`${e}Key`]&&!t.includes(e))},Uy=(i,t)=>{const e=i._withMods||(i._withMods={}),n=t.join(".");return e[n]||(e[n]=((r,...s)=>{for(let o=0;o<t.length;o++){const a=Iy[t[o]];if(a&&a(r,t))return}return i(r,...s)}))},Ny=kn({patchProp:Py},py);let gp;function Oy(){return gp||(gp=Nx(Ny))}const Fy=((...i)=>{const t=Oy().createApp(...i),{mount:e}=t;return t.mount=n=>{const r=zy(n);if(!r)return;const s=t._component;!ne(s)&&!s.render&&!s.template&&(s.template=r.innerHTML),r.nodeType===1&&(r.textContent="");const o=e(r,!1,By(r));return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),o},t});function By(i){if(i instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&i instanceof MathMLElement)return"mathml"}function zy(i){return Ke(i)?document.querySelector(i):i}function mr(i){if(i===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return i}function fg(i,t){i.prototype=Object.create(t.prototype),i.prototype.constructor=i,i.__proto__=t}var di={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Ho={duration:.5,overwrite:!1,delay:0},nd,_n,Ue,Ei=1e8,Ae=1/Ei,Ef=Math.PI*2,ky=Ef/4,Hy=0,hg=Math.sqrt,Vy=Math.cos,Gy=Math.sin,fn=function(t){return typeof t=="string"},Ve=function(t){return typeof t=="function"},wr=function(t){return typeof t=="number"},id=function(t){return typeof t>"u"},nr=function(t){return typeof t=="object"},Yn=function(t){return t!==!1},rd=function(){return typeof window<"u"},vl=function(t){return Ve(t)||fn(t)},dg=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},wn=Array.isArray,Tf=/(?:-?\.?\d|\.)+/gi,pg=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,xo=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,yu=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,mg=/[+-]=-?[.\d]+/,_g=/[^,'"\[\]\s]+/gi,Wy=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Fe,Wi,wf,sd,mi={},Pc={},gg,vg=function(t){return(Pc=Vo(t,mi))&&Jn},od=function(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")},Za=function(t,e){return!e&&console.warn(t)},xg=function(t,e){return t&&(mi[t]=e)&&Pc&&(Pc[t]=e)||mi},Ja=function(){return 0},Xy={suppressEvents:!0,isStart:!0,kill:!1},oc={suppressEvents:!0,kill:!1},Yy={suppressEvents:!0},ad={},Zr=[],Af={},yg,oi={},Mu={},vp=30,ac=[],ld="",cd=function(t){var e=t[0],n,r;if(nr(e)||Ve(e)||(t=[t]),!(n=(e._gsap||{}).harness)){for(r=ac.length;r--&&!ac[r].targetTest(e););n=ac[r]}for(r=t.length;r--;)t[r]&&(t[r]._gsap||(t[r]._gsap=new Wg(t[r],n)))||t.splice(r,1);return t},Ls=function(t){return t._gsap||cd(Ti(t))[0]._gsap},Mg=function(t,e,n){return(n=t[e])&&Ve(n)?t[e]():id(n)&&t.getAttribute&&t.getAttribute(e)||n},qn=function(t,e){return(t=t.split(",")).forEach(e)||t},We=function(t){return Math.round(t*1e5)/1e5||0},je=function(t){return Math.round(t*1e7)/1e7||0},Ro=function(t,e){var n=e.charAt(0),r=parseFloat(e.substr(2));return t=parseFloat(t),n==="+"?t+r:n==="-"?t-r:n==="*"?t*r:t/r},qy=function(t,e){for(var n=e.length,r=0;t.indexOf(e[r])<0&&++r<n;);return r<n},Dc=function(){var t=Zr.length,e=Zr.slice(0),n,r;for(Af={},Zr.length=0,n=0;n<t;n++)r=e[n],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},ud=function(t){return!!(t._initted||t._startAt||t.add)},Sg=function(t,e,n,r){Zr.length&&!_n&&Dc(),t.render(e,n,!!(_n&&e<0&&ud(t))),Zr.length&&!_n&&Dc()},bg=function(t){var e=parseFloat(t);return(e||e===0)&&(t+"").match(_g).length<2?e:fn(t)?t.trim():t},Eg=function(t){return t},_i=function(t,e){for(var n in e)n in t||(t[n]=e[n]);return t},$y=function(t){return function(e,n){for(var r in n)r in e||r==="duration"&&t||r==="ease"||(e[r]=n[r])}},Vo=function(t,e){for(var n in e)t[n]=e[n];return t},xp=function i(t,e){for(var n in e)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(t[n]=nr(e[n])?i(t[n]||(t[n]={}),e[n]):e[n]);return t},Lc=function(t,e){var n={},r;for(r in t)r in e||(n[r]=t[r]);return n},Ua=function(t){var e=t.parent||Fe,n=t.keyframes?$y(wn(t.keyframes)):_i;if(Yn(t.inherit))for(;e;)n(t,e.vars.defaults),e=e.parent||e._dp;return t},jy=function(t,e){for(var n=t.length,r=n===e.length;r&&n--&&t[n]===e[n];);return n<0},Tg=function(t,e,n,r,s){var o=t[r],a;if(s)for(a=e[s];o&&o[s]>a;)o=o._prev;return o?(e._next=o._next,o._next=e):(e._next=t[n],t[n]=e),e._next?e._next._prev=e:t[r]=e,e._prev=o,e.parent=e._dp=t,e},nu=function(t,e,n,r){n===void 0&&(n="_first"),r===void 0&&(r="_last");var s=e._prev,o=e._next;s?s._next=o:t[n]===e&&(t[n]=o),o?o._prev=s:t[r]===e&&(t[r]=s),e._next=e._prev=e.parent=null},rs=function(t,e){t.parent&&(!e||t.parent.autoRemoveChildren)&&t.parent.remove&&t.parent.remove(t),t._act=0},Is=function(t,e){if(t&&(!e||e._end>t._dur||e._start<0))for(var n=t;n;)n._dirty=1,n=n.parent;return t},Ky=function(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t},Cf=function(t,e,n,r){return t._startAt&&(_n?t._startAt.revert(oc):t.vars.immediateRender&&!t.vars.autoRevert||t._startAt.render(e,!0,r))},Zy=function i(t){return!t||t._ts&&i(t.parent)},yp=function(t){return t._repeat?Go(t._tTime,t=t.duration()+t._rDelay)*t:0},Go=function(t,e){var n=Math.floor(t=je(t/e));return t&&n===t?n-1:n},Ic=function(t,e){return(t-e._start)*e._ts+(e._ts>=0?0:e._dirty?e.totalDuration():e._tDur)},iu=function(t){return t._end=je(t._start+(t._tDur/Math.abs(t._ts||t._rts||Ae)||0))},ru=function(t,e){var n=t._dp;return n&&n.smoothChildTiming&&t._ts&&(t._start=je(n._time-(t._ts>0?e/t._ts:((t._dirty?t.totalDuration():t._tDur)-e)/-t._ts)),iu(t),n._dirty||Is(n,t)),t},wg=function(t,e){var n;if((e._time||!e._dur&&e._initted||e._start<t._time&&(e._dur||!e.add))&&(n=Ic(t.rawTime(),e),(!e._dur||ul(0,e.totalDuration(),n)-e._tTime>Ae)&&e.render(n,!0)),Is(t,e)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(n=t;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;t._zTime=-Ae}},$i=function(t,e,n,r){return e.parent&&rs(e),e._start=je((wr(n)?n:n||t!==Fe?xi(t,n,e):t._time)+e._delay),e._end=je(e._start+(e.totalDuration()/Math.abs(e.timeScale())||0)),Tg(t,e,"_first","_last",t._sort?"_start":0),Rf(e)||(t._recent=e),r||wg(t,e),t._ts<0&&ru(t,t._tTime),t},Ag=function(t,e){return(mi.ScrollTrigger||od("scrollTrigger",e))&&mi.ScrollTrigger.create(e,t)},Cg=function(t,e,n,r,s){if(hd(t,e,s),!t._initted)return 1;if(!n&&t._pt&&!_n&&(t._dur&&t.vars.lazy!==!1||!t._dur&&t.vars.lazy)&&yg!==ci.frame)return Zr.push(t),t._lazy=[s,r],1},Jy=function i(t){var e=t.parent;return e&&e._ts&&e._initted&&!e._lock&&(e.rawTime()<0||i(e))},Rf=function(t){var e=t.data;return e==="isFromStart"||e==="isStart"},Qy=function(t,e,n,r){var s=t.ratio,o=e<0||!e&&(!t._start&&Jy(t)&&!(!t._initted&&Rf(t))||(t._ts<0||t._dp._ts<0)&&!Rf(t))?0:1,a=t._rDelay,l=0,c,u,f;if(a&&t._repeat&&(l=ul(0,t._tDur,e),u=Go(l,a),t._yoyo&&u&1&&(o=1-o),u!==Go(t._tTime,a)&&(s=1-o,t.vars.repeatRefresh&&t._initted&&t.invalidate())),o!==s||_n||r||t._zTime===Ae||!e&&t._zTime){if(!t._initted&&Cg(t,e,r,n,l))return;for(f=t._zTime,t._zTime=e||(n?Ae:0),n||(n=e&&!f),t.ratio=o,t._from&&(o=1-o),t._time=0,t._tTime=l,c=t._pt;c;)c.r(o,c.d),c=c._next;e<0&&Cf(t,e,n,!0),t._onUpdate&&!n&&hi(t,"onUpdate"),l&&t._repeat&&!n&&t.parent&&hi(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===o&&(o&&rs(t,1),!n&&!_n&&(hi(t,o?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=e)},tM=function(t,e,n){var r;if(n>e)for(r=t._first;r&&r._start<=n;){if(r.data==="isPause"&&r._start>e)return r;r=r._next}else for(r=t._last;r&&r._start>=n;){if(r.data==="isPause"&&r._start<e)return r;r=r._prev}},Wo=function(t,e,n,r){var s=t._repeat,o=je(e)||0,a=t._tTime/t._tDur;return a&&!r&&(t._time*=o/t._dur),t._dur=o,t._tDur=s?s<0?1e10:je(o*(s+1)+t._rDelay*s):o,a>0&&!r&&ru(t,t._tTime=t._tDur*a),t.parent&&iu(t),n||Is(t.parent,t),t},Mp=function(t){return t instanceof Bn?Is(t):Wo(t,t._dur)},eM={_start:0,endTime:Ja,totalDuration:Ja},xi=function i(t,e,n){var r=t.labels,s=t._recent||eM,o=t.duration()>=Ei?s.endTime(!1):t._dur,a,l,c;return fn(e)&&(isNaN(e)||e in r)?(l=e.charAt(0),c=e.substr(-1)==="%",a=e.indexOf("="),l==="<"||l===">"?(a>=0&&(e=e.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(e.substr(1))||0)*(c?(a<0?s:n).totalDuration()/100:1)):a<0?(e in r||(r[e]=o),r[e]):(l=parseFloat(e.charAt(a-1)+e.substr(a+1)),c&&n&&(l=l/100*(wn(n)?n[0]:n).totalDuration()),a>1?i(t,e.substr(0,a-1),n)+l:o+l)):e==null?o:+e},Na=function(t,e,n){var r=wr(e[1]),s=(r?2:1)+(t<2?0:1),o=e[s],a,l;if(r&&(o.duration=e[1]),o.parent=n,t){for(a=o,l=n;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=Yn(l.vars.inherit)&&l.parent;o.immediateRender=Yn(a.immediateRender),t<2?o.runBackwards=1:o.startAt=e[s-1]}return new $e(e[0],o,e[s+1])},cs=function(t,e){return t||t===0?e(t):e},ul=function(t,e,n){return n<t?t:n>e?e:n},bn=function(t,e){return!fn(t)||!(e=Wy.exec(t))?"":e[1]},nM=function(t,e,n){return cs(n,function(r){return ul(t,e,r)})},Pf=[].slice,Rg=function(t,e){return t&&nr(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&nr(t[0]))&&!t.nodeType&&t!==Wi},iM=function(t,e,n){return n===void 0&&(n=[]),t.forEach(function(r){var s;return fn(r)&&!e||Rg(r,1)?(s=n).push.apply(s,Ti(r)):n.push(r)})||n},Ti=function(t,e,n){return Ue&&!e&&Ue.selector?Ue.selector(t):fn(t)&&!n&&(wf||!Xo())?Pf.call((e||sd).querySelectorAll(t),0):wn(t)?iM(t,n):Rg(t)?Pf.call(t,0):t?[t]:[]},Df=function(t){return t=Ti(t)[0]||Za("Invalid scope")||{},function(e){var n=t.current||t.nativeElement||t;return Ti(e,n.querySelectorAll?n:n===t?Za("Invalid scope")||sd.createElement("div"):t)}},Pg=function(t){return t.sort(function(){return .5-Math.random()})},Dg=function(t){if(Ve(t))return t;var e=nr(t)?t:{each:t},n=Us(e.ease),r=e.from||0,s=parseFloat(e.base)||0,o={},a=r>0&&r<1,l=isNaN(r)||a,c=e.axis,u=r,f=r;return fn(r)?u=f={center:.5,edges:.5,end:1}[r]||0:!a&&l&&(u=r[0],f=r[1]),function(h,d,g){var _=(g||e).length,m=o[_],p,M,b,v,R,C,T,D,S;if(!m){if(S=e.grid==="auto"?0:(e.grid||[1,Ei])[1],!S){for(T=-Ei;T<(T=g[S++].getBoundingClientRect().left)&&S<_;);S<_&&S--}for(m=o[_]=[],p=l?Math.min(S,_)*u-.5:r%S,M=S===Ei?0:l?_*f/S-.5:r/S|0,T=0,D=Ei,C=0;C<_;C++)b=C%S-p,v=M-(C/S|0),m[C]=R=c?Math.abs(c==="y"?v:b):hg(b*b+v*v),R>T&&(T=R),R<D&&(D=R);r==="random"&&Pg(m),m.max=T-D,m.min=D,m.v=_=(parseFloat(e.amount)||parseFloat(e.each)*(S>_?_-1:c?c==="y"?_/S:S:Math.max(S,_/S))||0)*(r==="edges"?-1:1),m.b=_<0?s-_:s,m.u=bn(e.amount||e.each)||0,n=n&&_<0?Hg(n):n}return _=(m[h]-m.min)/m.max||0,je(m.b+(n?n(_):_)*m.v)+m.u}},Lf=function(t){var e=Math.pow(10,((t+"").split(".")[1]||"").length);return function(n){var r=je(Math.round(parseFloat(n)/t)*t*e);return(r-r%1)/e+(wr(n)?0:bn(n))}},Lg=function(t,e){var n=wn(t),r,s;return!n&&nr(t)&&(r=n=t.radius||Ei,t.values?(t=Ti(t.values),(s=!wr(t[0]))&&(r*=r)):t=Lf(t.increment)),cs(e,n?Ve(t)?function(o){return s=t(o),Math.abs(s-o)<=r?s:o}:function(o){for(var a=parseFloat(s?o.x:o),l=parseFloat(s?o.y:0),c=Ei,u=0,f=t.length,h,d;f--;)s?(h=t[f].x-a,d=t[f].y-l,h=h*h+d*d):h=Math.abs(t[f]-a),h<c&&(c=h,u=f);return u=!r||c<=r?t[u]:o,s||u===o||wr(o)?u:u+bn(o)}:Lf(t))},Ig=function(t,e,n,r){return cs(wn(t)?!e:n===!0?!!(n=0):!r,function(){return wn(t)?t[~~(Math.random()*t.length)]:(n=n||1e-5)&&(r=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((t-n/2+Math.random()*(e-t+n*.99))/n)*n*r)/r})},rM=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(r){return e.reduce(function(s,o){return o(s)},r)}},sM=function(t,e){return function(n){return t(parseFloat(n))+(e||bn(n))}},oM=function(t,e,n){return Ng(t,e,0,1,n)},Ug=function(t,e,n){return cs(n,function(r){return t[~~e(r)]})},aM=function i(t,e,n){var r=e-t;return wn(t)?Ug(t,i(0,t.length),e):cs(n,function(s){return(r+(s-t)%r)%r+t})},lM=function i(t,e,n){var r=e-t,s=r*2;return wn(t)?Ug(t,i(0,t.length-1),e):cs(n,function(o){return o=(s+(o-t)%s)%s||0,t+(o>r?s-o:o)})},Qa=function(t){for(var e=0,n="",r,s,o,a;~(r=t.indexOf("random(",e));)o=t.indexOf(")",r),a=t.charAt(r+7)==="[",s=t.substr(r+7,o-r-7).match(a?_g:Tf),n+=t.substr(e,r-e)+Ig(a?s:+s[0],a?0:+s[1],+s[2]||1e-5),e=o+1;return n+t.substr(e,t.length-e)},Ng=function(t,e,n,r,s){var o=e-t,a=r-n;return cs(s,function(l){return n+((l-t)/o*a||0)})},cM=function i(t,e,n,r){var s=isNaN(t+e)?0:function(d){return(1-d)*t+d*e};if(!s){var o=fn(t),a={},l,c,u,f,h;if(n===!0&&(r=1)&&(n=null),o)t={p:t},e={p:e};else if(wn(t)&&!wn(e)){for(u=[],f=t.length,h=f-2,c=1;c<f;c++)u.push(i(t[c-1],t[c]));f--,s=function(g){g*=f;var _=Math.min(h,~~g);return u[_](g-_)},n=e}else r||(t=Vo(wn(t)?[]:{},t));if(!u){for(l in e)fd.call(a,t,l,"get",e[l]);s=function(g){return md(g,a)||(o?t.p:t)}}}return cs(n,s)},Sp=function(t,e,n){var r=t.labels,s=Ei,o,a,l;for(o in r)a=r[o]-e,a<0==!!n&&a&&s>(a=Math.abs(a))&&(l=o,s=a);return l},hi=function(t,e,n){var r=t.vars,s=r[e],o=Ue,a=t._ctx,l,c,u;if(s)return l=r[e+"Params"],c=r.callbackScope||t,n&&Zr.length&&Dc(),a&&(Ue=a),u=l?s.apply(c,l):s.call(c),Ue=o,u},ga=function(t){return rs(t),t.scrollTrigger&&t.scrollTrigger.kill(!!_n),t.progress()<1&&hi(t,"onInterrupt"),t},yo,Og=[],Fg=function(t){if(t)if(t=!t.name&&t.default||t,rd()||t.headless){var e=t.name,n=Ve(t),r=e&&!n&&t.init?function(){this._props=[]}:t,s={init:Ja,render:md,add:fd,kill:TM,modifier:EM,rawVars:0},o={targetTest:0,get:0,getSetter:pd,aliases:{},register:0};if(Xo(),t!==r){if(oi[e])return;_i(r,_i(Lc(t,s),o)),Vo(r.prototype,Vo(s,Lc(t,o))),oi[r.prop=e]=r,t.targetTest&&(ac.push(r),ad[e]=1),e=(e==="css"?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}xg(e,r),t.register&&t.register(Jn,r,$n)}else Og.push(t)},we=255,va={aqua:[0,we,we],lime:[0,we,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,we],navy:[0,0,128],white:[we,we,we],olive:[128,128,0],yellow:[we,we,0],orange:[we,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[we,0,0],pink:[we,192,203],cyan:[0,we,we],transparent:[we,we,we,0]},Su=function(t,e,n){return t+=t<0?1:t>1?-1:0,(t*6<1?e+(n-e)*t*6:t<.5?n:t*3<2?e+(n-e)*(2/3-t)*6:e)*we+.5|0},Bg=function(t,e,n){var r=t?wr(t)?[t>>16,t>>8&we,t&we]:0:va.black,s,o,a,l,c,u,f,h,d,g;if(!r){if(t.substr(-1)===","&&(t=t.substr(0,t.length-1)),va[t])r=va[t];else if(t.charAt(0)==="#"){if(t.length<6&&(s=t.charAt(1),o=t.charAt(2),a=t.charAt(3),t="#"+s+s+o+o+a+a+(t.length===5?t.charAt(4)+t.charAt(4):"")),t.length===9)return r=parseInt(t.substr(1,6),16),[r>>16,r>>8&we,r&we,parseInt(t.substr(7),16)/255];t=parseInt(t.substr(1),16),r=[t>>16,t>>8&we,t&we]}else if(t.substr(0,3)==="hsl"){if(r=g=t.match(Tf),!e)l=+r[0]%360/360,c=+r[1]/100,u=+r[2]/100,o=u<=.5?u*(c+1):u+c-u*c,s=u*2-o,r.length>3&&(r[3]*=1),r[0]=Su(l+1/3,s,o),r[1]=Su(l,s,o),r[2]=Su(l-1/3,s,o);else if(~t.indexOf("="))return r=t.match(pg),n&&r.length<4&&(r[3]=1),r}else r=t.match(Tf)||va.transparent;r=r.map(Number)}return e&&!g&&(s=r[0]/we,o=r[1]/we,a=r[2]/we,f=Math.max(s,o,a),h=Math.min(s,o,a),u=(f+h)/2,f===h?l=c=0:(d=f-h,c=u>.5?d/(2-f-h):d/(f+h),l=f===s?(o-a)/d+(o<a?6:0):f===o?(a-s)/d+2:(s-o)/d+4,l*=60),r[0]=~~(l+.5),r[1]=~~(c*100+.5),r[2]=~~(u*100+.5)),n&&r.length<4&&(r[3]=1),r},zg=function(t){var e=[],n=[],r=-1;return t.split(Jr).forEach(function(s){var o=s.match(xo)||[];e.push.apply(e,o),n.push(r+=o.length+1)}),e.c=n,e},bp=function(t,e,n){var r="",s=(t+r).match(Jr),o=e?"hsla(":"rgba(",a=0,l,c,u,f;if(!s)return t;if(s=s.map(function(h){return(h=Bg(h,e,1))&&o+(e?h[0]+","+h[1]+"%,"+h[2]+"%,"+h[3]:h.join(","))+")"}),n&&(u=zg(t),l=n.c,l.join(r)!==u.c.join(r)))for(c=t.replace(Jr,"1").split(xo),f=c.length-1;a<f;a++)r+=c[a]+(~l.indexOf(a)?s.shift()||o+"0,0,0,0)":(u.length?u:s.length?s:n).shift());if(!c)for(c=t.split(Jr),f=c.length-1;a<f;a++)r+=c[a]+s[a];return r+c[f]},Jr=(function(){var i="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",t;for(t in va)i+="|"+t+"\\b";return new RegExp(i+")","gi")})(),uM=/hsl[a]?\(/,kg=function(t){var e=t.join(" "),n;if(Jr.lastIndex=0,Jr.test(e))return n=uM.test(e),t[1]=bp(t[1],n),t[0]=bp(t[0],n,zg(t[1])),!0},tl,ci=(function(){var i=Date.now,t=500,e=33,n=i(),r=n,s=1e3/240,o=s,a=[],l,c,u,f,h,d,g=function _(m){var p=i()-r,M=m===!0,b,v,R,C;if((p>t||p<0)&&(n+=p-e),r+=p,R=r-n,b=R-o,(b>0||M)&&(C=++f.frame,h=R-f.time*1e3,f.time=R=R/1e3,o+=b+(b>=s?4:s-b),v=1),M||(l=c(_)),v)for(d=0;d<a.length;d++)a[d](R,h,C,m)};return f={time:0,frame:0,tick:function(){g(!0)},deltaRatio:function(m){return h/(1e3/(m||60))},wake:function(){gg&&(!wf&&rd()&&(Wi=wf=window,sd=Wi.document||{},mi.gsap=Jn,(Wi.gsapVersions||(Wi.gsapVersions=[])).push(Jn.version),vg(Pc||Wi.GreenSockGlobals||!Wi.gsap&&Wi||{}),Og.forEach(Fg)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&f.sleep(),c=u||function(m){return setTimeout(m,o-f.time*1e3+1|0)},tl=1,g(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),tl=0,c=Ja},lagSmoothing:function(m,p){t=m||1/0,e=Math.min(p||33,t)},fps:function(m){s=1e3/(m||240),o=f.time*1e3+s},add:function(m,p,M){var b=p?function(v,R,C,T){m(v,R,C,T),f.remove(b)}:m;return f.remove(m),a[M?"unshift":"push"](b),Xo(),b},remove:function(m,p){~(p=a.indexOf(m))&&a.splice(p,1)&&d>=p&&d--},_listeners:a},f})(),Xo=function(){return!tl&&ci.wake()},ue={},fM=/^[\d.\-M][\d.\-,\s]/,hM=/["']/g,dM=function(t){for(var e={},n=t.substr(1,t.length-3).split(":"),r=n[0],s=1,o=n.length,a,l,c;s<o;s++)l=n[s],a=s!==o-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),e[r]=isNaN(c)?c.replace(hM,"").trim():+c,r=l.substr(a+1).trim();return e},pM=function(t){var e=t.indexOf("(")+1,n=t.indexOf(")"),r=t.indexOf("(",e);return t.substring(e,~r&&r<n?t.indexOf(")",n+1):n)},mM=function(t){var e=(t+"").split("("),n=ue[e[0]];return n&&e.length>1&&n.config?n.config.apply(null,~t.indexOf("{")?[dM(e[1])]:pM(t).split(",").map(bg)):ue._CE&&fM.test(t)?ue._CE("",t):n},Hg=function(t){return function(e){return 1-t(1-e)}},Vg=function i(t,e){for(var n=t._first,r;n;)n instanceof Bn?i(n,e):n.vars.yoyoEase&&(!n._yoyo||!n._repeat)&&n._yoyo!==e&&(n.timeline?i(n.timeline,e):(r=n._ease,n._ease=n._yEase,n._yEase=r,n._yoyo=e)),n=n._next},Us=function(t,e){return t&&(Ve(t)?t:ue[t]||mM(t))||e},$s=function(t,e,n,r){n===void 0&&(n=function(l){return 1-e(1-l)}),r===void 0&&(r=function(l){return l<.5?e(l*2)/2:1-e((1-l)*2)/2});var s={easeIn:e,easeOut:n,easeInOut:r},o;return qn(t,function(a){ue[a]=mi[a]=s,ue[o=a.toLowerCase()]=n;for(var l in s)ue[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=ue[a+"."+l]=s[l]}),s},Gg=function(t){return function(e){return e<.5?(1-t(1-e*2))/2:.5+t((e-.5)*2)/2}},bu=function i(t,e,n){var r=e>=1?e:1,s=(n||(t?.3:.45))/(e<1?e:1),o=s/Ef*(Math.asin(1/r)||0),a=function(u){return u===1?1:r*Math.pow(2,-10*u)*Gy((u-o)*s)+1},l=t==="out"?a:t==="in"?function(c){return 1-a(1-c)}:Gg(a);return s=Ef/s,l.config=function(c,u){return i(t,c,u)},l},Eu=function i(t,e){e===void 0&&(e=1.70158);var n=function(o){return o?--o*o*((e+1)*o+e)+1:0},r=t==="out"?n:t==="in"?function(s){return 1-n(1-s)}:Gg(n);return r.config=function(s){return i(t,s)},r};qn("Linear,Quad,Cubic,Quart,Quint,Strong",function(i,t){var e=t<5?t+1:t;$s(i+",Power"+(e-1),t?function(n){return Math.pow(n,e)}:function(n){return n},function(n){return 1-Math.pow(1-n,e)},function(n){return n<.5?Math.pow(n*2,e)/2:1-Math.pow((1-n)*2,e)/2})});ue.Linear.easeNone=ue.none=ue.Linear.easeIn;$s("Elastic",bu("in"),bu("out"),bu());(function(i,t){var e=1/t,n=2*e,r=2.5*e,s=function(a){return a<e?i*a*a:a<n?i*Math.pow(a-1.5/t,2)+.75:a<r?i*(a-=2.25/t)*a+.9375:i*Math.pow(a-2.625/t,2)+.984375};$s("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);$s("Expo",function(i){return Math.pow(2,10*(i-1))*i+i*i*i*i*i*i*(1-i)});$s("Circ",function(i){return-(hg(1-i*i)-1)});$s("Sine",function(i){return i===1?1:-Vy(i*ky)+1});$s("Back",Eu("in"),Eu("out"),Eu());ue.SteppedEase=ue.steps=mi.SteppedEase={config:function(t,e){t===void 0&&(t=1);var n=1/t,r=t+(e?0:1),s=e?1:0,o=1-Ae;return function(a){return((r*ul(0,o,a)|0)+s)*n}}};Ho.ease=ue["quad.out"];qn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(i){return ld+=i+","+i+"Params,"});var Wg=function(t,e){this.id=Hy++,t._gsap=this,this.target=t,this.harness=e,this.get=e?e.get:Mg,this.set=e?e.getSetter:pd},el=(function(){function i(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,Wo(this,+e.duration,1,1),this.data=e.data,Ue&&(this._ctx=Ue,Ue.data.push(this)),tl||ci.wake()}var t=i.prototype;return t.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},t.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},t.totalDuration=function(n){return arguments.length?(this._dirty=0,Wo(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(n,r){if(Xo(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(ru(this,n),!s._dp||s.parent||wg(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&$i(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!r||this._initted&&Math.abs(this._zTime)===Ae||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),Sg(this,n,r)),this},t.time=function(n,r){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+yp(this))%(this._dur+this._rDelay)||(n?this._dur:0),r):this._time},t.totalProgress=function(n,r){return arguments.length?this.totalTime(this.totalDuration()*n,r):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},t.progress=function(n,r){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+yp(this),r):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},t.iteration=function(n,r){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,r):this._repeat?Go(this._tTime,s)+1:1},t.timeScale=function(n,r){if(!arguments.length)return this._rts===-Ae?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?Ic(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-Ae?0:this._rts,this.totalTime(ul(-Math.abs(this._delay),this.totalDuration(),s),r!==!1),iu(this),Ky(this)},t.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Xo(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==Ae&&(this._tTime-=Ae)))),this):this._ps},t.startTime=function(n){if(arguments.length){this._start=n;var r=this.parent||this._dp;return r&&(r._sort||!this.parent)&&$i(r,this,n-this._delay),this}return this._start},t.endTime=function(n){return this._start+(Yn(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(n){var r=this.parent||this._dp;return r?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Ic(r.rawTime(n),this):this._tTime:this._tTime},t.revert=function(n){n===void 0&&(n=Yy);var r=_n;return _n=n,ud(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),_n=r,this},t.globalTime=function(n){for(var r=this,s=arguments.length?n:r.rawTime();r;)s=r._start+s/(Math.abs(r._ts)||1),r=r._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},t.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,Mp(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(n){if(arguments.length){var r=this._time;return this._rDelay=n,Mp(this),r?this.time(r):this}return this._rDelay},t.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},t.seek=function(n,r){return this.totalTime(xi(this,n),Yn(r))},t.restart=function(n,r){return this.play().totalTime(n?-this._delay:0,Yn(r)),this._dur||(this._zTime=-Ae),this},t.play=function(n,r){return n!=null&&this.seek(n,r),this.reversed(!1).paused(!1)},t.reverse=function(n,r){return n!=null&&this.seek(n||this.totalDuration(),r),this.reversed(!0).paused(!1)},t.pause=function(n,r){return n!=null&&this.seek(n,r),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-Ae:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-Ae,this},t.isActive=function(){var n=this.parent||this._dp,r=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=r&&s<this.endTime(!0)-Ae)},t.eventCallback=function(n,r,s){var o=this.vars;return arguments.length>1?(r?(o[n]=r,s&&(o[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=r)):delete o[n],this):o[n]},t.then=function(n){var r=this;return new Promise(function(s){var o=Ve(n)?n:Eg,a=function(){var c=r.then;r.then=null,Ve(o)&&(o=o(r))&&(o.then||o===r)&&(r.then=c),s(o),r.then=c};r._initted&&r.totalProgress()===1&&r._ts>=0||!r._tTime&&r._ts<0?a():r._prom=a})},t.kill=function(){ga(this)},i})();_i(el.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-Ae,_prom:0,_ps:!1,_rts:1});var Bn=(function(i){fg(t,i);function t(n,r){var s;return n===void 0&&(n={}),s=i.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=Yn(n.sortChildren),Fe&&$i(n.parent||Fe,mr(s),r),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&Ag(mr(s),n.scrollTrigger),s}var e=t.prototype;return e.to=function(r,s,o){return Na(0,arguments,this),this},e.from=function(r,s,o){return Na(1,arguments,this),this},e.fromTo=function(r,s,o,a){return Na(2,arguments,this),this},e.set=function(r,s,o){return s.duration=0,s.parent=this,Ua(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new $e(r,s,xi(this,o),1),this},e.call=function(r,s,o){return $i(this,$e.delayedCall(0,r,s),o)},e.staggerTo=function(r,s,o,a,l,c,u){return o.duration=s,o.stagger=o.stagger||a,o.onComplete=c,o.onCompleteParams=u,o.parent=this,new $e(r,o,xi(this,l)),this},e.staggerFrom=function(r,s,o,a,l,c,u){return o.runBackwards=1,Ua(o).immediateRender=Yn(o.immediateRender),this.staggerTo(r,s,o,a,l,c,u)},e.staggerFromTo=function(r,s,o,a,l,c,u,f){return a.startAt=o,Ua(a).immediateRender=Yn(a.immediateRender),this.staggerTo(r,s,a,l,c,u,f)},e.render=function(r,s,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=r<=0?0:je(r),f=this._zTime<0!=r<0&&(this._initted||!c),h,d,g,_,m,p,M,b,v,R,C,T;if(this!==Fe&&u>l&&r>=0&&(u=l),u!==this._tTime||o||f){if(a!==this._time&&c&&(u+=this._time-a,r+=this._time-a),h=u,v=this._start,b=this._ts,p=!b,f&&(c||(a=this._zTime),(r||!s)&&(this._zTime=r)),this._repeat){if(C=this._yoyo,m=c+this._rDelay,this._repeat<-1&&r<0)return this.totalTime(m*100+r,s,o);if(h=je(u%m),u===l?(_=this._repeat,h=c):(R=je(u/m),_=~~R,_&&_===R&&(h=c,_--),h>c&&(h=c)),R=Go(this._tTime,m),!a&&this._tTime&&R!==_&&this._tTime-R*m-this._dur<=0&&(R=_),C&&_&1&&(h=c-h,T=1),_!==R&&!this._lock){var D=C&&R&1,S=D===(C&&_&1);if(_<R&&(D=!D),a=D?0:u%c?c:u,this._lock=1,this.render(a||(T?0:je(_*m)),s,!c)._lock=0,this._tTime=u,!s&&this.parent&&hi(this,"onRepeat"),this.vars.repeatRefresh&&!T&&(this.invalidate()._lock=1),a&&a!==this._time||p!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,S&&(this._lock=2,a=D?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!T&&this.invalidate()),this._lock=0,!this._ts&&!p)return this;Vg(this,T)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(M=tM(this,je(a),je(h)),M&&(u-=h-(h=M._start))),this._tTime=u,this._time=h,this._act=!b,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=r,a=0),!a&&u&&!s&&!R&&(hi(this,"onStart"),this._tTime!==u))return this;if(h>=a&&r>=0)for(d=this._first;d;){if(g=d._next,(d._act||h>=d._start)&&d._ts&&M!==d){if(d.parent!==this)return this.render(r,s,o);if(d.render(d._ts>0?(h-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(h-d._start)*d._ts,s,o),h!==this._time||!this._ts&&!p){M=0,g&&(u+=this._zTime=-Ae);break}}d=g}else{d=this._last;for(var x=r<0?r:h;d;){if(g=d._prev,(d._act||x<=d._end)&&d._ts&&M!==d){if(d.parent!==this)return this.render(r,s,o);if(d.render(d._ts>0?(x-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(x-d._start)*d._ts,s,o||_n&&ud(d)),h!==this._time||!this._ts&&!p){M=0,g&&(u+=this._zTime=x?-Ae:Ae);break}}d=g}}if(M&&!s&&(this.pause(),M.render(h>=a?0:-Ae)._zTime=h>=a?1:-1,this._ts))return this._start=v,iu(this),this.render(r,s,o);this._onUpdate&&!s&&hi(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&a)&&(v===this._start||Math.abs(b)!==Math.abs(this._ts))&&(this._lock||((r||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&rs(this,1),!s&&!(r<0&&!a)&&(u||a||!l)&&(hi(this,u===l&&r>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},e.add=function(r,s){var o=this;if(wr(s)||(s=xi(this,s,r)),!(r instanceof el)){if(wn(r))return r.forEach(function(a){return o.add(a,s)}),this;if(fn(r))return this.addLabel(r,s);if(Ve(r))r=$e.delayedCall(0,r);else return this}return this!==r?$i(this,r,s):this},e.getChildren=function(r,s,o,a){r===void 0&&(r=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),a===void 0&&(a=-Ei);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof $e?s&&l.push(c):(o&&l.push(c),r&&l.push.apply(l,c.getChildren(!0,s,o)))),c=c._next;return l},e.getById=function(r){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===r)return s[o]},e.remove=function(r){return fn(r)?this.removeLabel(r):Ve(r)?this.killTweensOf(r):(r.parent===this&&nu(this,r),r===this._recent&&(this._recent=this._last),Is(this))},e.totalTime=function(r,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=je(ci.time-(this._ts>0?r/this._ts:(this.totalDuration()-r)/-this._ts))),i.prototype.totalTime.call(this,r,s),this._forcing=0,this):this._tTime},e.addLabel=function(r,s){return this.labels[r]=xi(this,s),this},e.removeLabel=function(r){return delete this.labels[r],this},e.addPause=function(r,s,o){var a=$e.delayedCall(0,s||Ja,o);return a.data="isPause",this._hasPause=1,$i(this,a,xi(this,r))},e.removePause=function(r){var s=this._first;for(r=xi(this,r);s;)s._start===r&&s.data==="isPause"&&rs(s),s=s._next},e.killTweensOf=function(r,s,o){for(var a=this.getTweensOf(r,o),l=a.length;l--;)Wr!==a[l]&&a[l].kill(r,s);return this},e.getTweensOf=function(r,s){for(var o=[],a=Ti(r),l=this._first,c=wr(s),u;l;)l instanceof $e?qy(l._targets,a)&&(c?(!Wr||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&o.push(l):(u=l.getTweensOf(a,s)).length&&o.push.apply(o,u),l=l._next;return o},e.tweenTo=function(r,s){s=s||{};var o=this,a=xi(o,r),l=s,c=l.startAt,u=l.onStart,f=l.onStartParams,h=l.immediateRender,d,g=$e.to(o,_i({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale())||Ae,onStart:function(){if(o.pause(),!d){var m=s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale());g._dur!==m&&Wo(g,m,0,1).render(g._time,!0,!0),d=1}u&&u.apply(g,f||[])}},s));return h?g.render(0):g},e.tweenFromTo=function(r,s,o){return this.tweenTo(s,_i({startAt:{time:xi(this,r)}},o))},e.recent=function(){return this._recent},e.nextLabel=function(r){return r===void 0&&(r=this._time),Sp(this,xi(this,r))},e.previousLabel=function(r){return r===void 0&&(r=this._time),Sp(this,xi(this,r),1)},e.currentLabel=function(r){return arguments.length?this.seek(r,!0):this.previousLabel(this._time+Ae)},e.shiftChildren=function(r,s,o){o===void 0&&(o=0);for(var a=this._first,l=this.labels,c;a;)a._start>=o&&(a._start+=r,a._end+=r),a=a._next;if(s)for(c in l)l[c]>=o&&(l[c]+=r);return Is(this)},e.invalidate=function(r){var s=this._first;for(this._lock=0;s;)s.invalidate(r),s=s._next;return i.prototype.invalidate.call(this,r)},e.clear=function(r){r===void 0&&(r=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),r&&(this.labels={}),Is(this)},e.totalDuration=function(r){var s=0,o=this,a=o._last,l=Ei,c,u,f;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-r:r));if(o._dirty){for(f=o.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),u=a._start,u>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,$i(o,a,u-a._delay,1)._lock=0):l=u,u<0&&a._ts&&(s-=u,(!f&&!o._dp||f&&f.smoothChildTiming)&&(o._start+=u/o._ts,o._time-=u,o._tTime-=u),o.shiftChildren(-u,!1,-1/0),l=0),a._end>s&&a._ts&&(s=a._end),a=c;Wo(o,o===Fe&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},t.updateRoot=function(r){if(Fe._ts&&(Sg(Fe,Ic(r,Fe)),yg=ci.frame),ci.frame>=vp){vp+=di.autoSleep||120;var s=Fe._first;if((!s||!s._ts)&&di.autoSleep&&ci._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||ci.sleep()}}},t})(el);_i(Bn.prototype,{_lock:0,_hasPause:0,_forcing:0});var _M=function(t,e,n,r,s,o,a){var l=new $n(this._pt,t,e,0,1,Kg,null,s),c=0,u=0,f,h,d,g,_,m,p,M;for(l.b=n,l.e=r,n+="",r+="",(p=~r.indexOf("random("))&&(r=Qa(r)),o&&(M=[n,r],o(M,t,e),n=M[0],r=M[1]),h=n.match(yu)||[];f=yu.exec(r);)g=f[0],_=r.substring(c,f.index),d?d=(d+1)%5:_.substr(-5)==="rgba("&&(d=1),g!==h[u++]&&(m=parseFloat(h[u-1])||0,l._pt={_next:l._pt,p:_||u===1?_:",",s:m,c:g.charAt(1)==="="?Ro(m,g)-m:parseFloat(g)-m,m:d&&d<4?Math.round:0},c=yu.lastIndex);return l.c=c<r.length?r.substring(c,r.length):"",l.fp=a,(mg.test(r)||p)&&(l.e=0),this._pt=l,l},fd=function(t,e,n,r,s,o,a,l,c,u){Ve(r)&&(r=r(s||0,t,o));var f=t[e],h=n!=="get"?n:Ve(f)?c?t[e.indexOf("set")||!Ve(t["get"+e.substr(3)])?e:"get"+e.substr(3)](c):t[e]():f,d=Ve(f)?c?MM:$g:dd,g;if(fn(r)&&(~r.indexOf("random(")&&(r=Qa(r)),r.charAt(1)==="="&&(g=Ro(h,r)+(bn(h)||0),(g||g===0)&&(r=g))),!u||h!==r||If)return!isNaN(h*r)&&r!==""?(g=new $n(this._pt,t,e,+h||0,r-(h||0),typeof f=="boolean"?bM:jg,0,d),c&&(g.fp=c),a&&g.modifier(a,this,t),this._pt=g):(!f&&!(e in t)&&od(e,r),_M.call(this,t,e,h,r,d,l||di.stringFilter,c))},gM=function(t,e,n,r,s){if(Ve(t)&&(t=Oa(t,s,e,n,r)),!nr(t)||t.style&&t.nodeType||wn(t)||dg(t))return fn(t)?Oa(t,s,e,n,r):t;var o={},a;for(a in t)o[a]=Oa(t[a],s,e,n,r);return o},Xg=function(t,e,n,r,s,o){var a,l,c,u;if(oi[t]&&(a=new oi[t]).init(s,a.rawVars?e[t]:gM(e[t],r,s,o,n),n,r,o)!==!1&&(n._pt=l=new $n(n._pt,s,t,0,1,a.render,a,0,a.priority),n!==yo))for(c=n._ptLookup[n._targets.indexOf(s)],u=a._props.length;u--;)c[a._props[u]]=l;return a},Wr,If,hd=function i(t,e,n){var r=t.vars,s=r.ease,o=r.startAt,a=r.immediateRender,l=r.lazy,c=r.onUpdate,u=r.runBackwards,f=r.yoyoEase,h=r.keyframes,d=r.autoRevert,g=t._dur,_=t._startAt,m=t._targets,p=t.parent,M=p&&p.data==="nested"?p.vars.targets:m,b=t._overwrite==="auto"&&!nd,v=t.timeline,R,C,T,D,S,x,I,F,z,W,tt,G,K;if(v&&(!h||!s)&&(s="none"),t._ease=Us(s,Ho.ease),t._yEase=f?Hg(Us(f===!0?s:f,Ho.ease)):0,f&&t._yoyo&&!t._repeat&&(f=t._yEase,t._yEase=t._ease,t._ease=f),t._from=!v&&!!r.runBackwards,!v||h&&!r.stagger){if(F=m[0]?Ls(m[0]).harness:0,G=F&&r[F.prop],R=Lc(r,ad),_&&(_._zTime<0&&_.progress(1),e<0&&u&&a&&!d?_.render(-1,!0):_.revert(u&&g?oc:Xy),_._lazy=0),o){if(rs(t._startAt=$e.set(m,_i({data:"isStart",overwrite:!1,parent:p,immediateRender:!0,lazy:!_&&Yn(l),startAt:null,delay:0,onUpdate:c&&function(){return hi(t,"onUpdate")},stagger:0},o))),t._startAt._dp=0,t._startAt._sat=t,e<0&&(_n||!a&&!d)&&t._startAt.revert(oc),a&&g&&e<=0&&n<=0){e&&(t._zTime=e);return}}else if(u&&g&&!_){if(e&&(a=!1),T=_i({overwrite:!1,data:"isFromStart",lazy:a&&!_&&Yn(l),immediateRender:a,stagger:0,parent:p},R),G&&(T[F.prop]=G),rs(t._startAt=$e.set(m,T)),t._startAt._dp=0,t._startAt._sat=t,e<0&&(_n?t._startAt.revert(oc):t._startAt.render(-1,!0)),t._zTime=e,!a)i(t._startAt,Ae,Ae);else if(!e)return}for(t._pt=t._ptCache=0,l=g&&Yn(l)||l&&!g,C=0;C<m.length;C++){if(S=m[C],I=S._gsap||cd(m)[C]._gsap,t._ptLookup[C]=W={},Af[I.id]&&Zr.length&&Dc(),tt=M===m?C:M.indexOf(S),F&&(z=new F).init(S,G||R,t,tt,M)!==!1&&(t._pt=D=new $n(t._pt,S,z.name,0,1,z.render,z,0,z.priority),z._props.forEach(function(H){W[H]=D}),z.priority&&(x=1)),!F||G)for(T in R)oi[T]&&(z=Xg(T,R,t,tt,S,M))?z.priority&&(x=1):W[T]=D=fd.call(t,S,T,"get",R[T],tt,M,0,r.stringFilter);t._op&&t._op[C]&&t.kill(S,t._op[C]),b&&t._pt&&(Wr=t,Fe.killTweensOf(S,W,t.globalTime(e)),K=!t.parent,Wr=0),t._pt&&l&&(Af[I.id]=1)}x&&Zg(t),t._onInit&&t._onInit(t)}t._onUpdate=c,t._initted=(!t._op||t._pt)&&!K,h&&e<=0&&v.render(Ei,!0,!0)},vM=function(t,e,n,r,s,o,a,l){var c=(t._pt&&t._ptCache||(t._ptCache={}))[e],u,f,h,d;if(!c)for(c=t._ptCache[e]=[],h=t._ptLookup,d=t._targets.length;d--;){if(u=h[d][e],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==e&&u.fp!==e;)u=u._next;if(!u)return If=1,t.vars[e]="+=0",hd(t,a),If=0,l?Za(e+" not eligible for reset"):1;c.push(u)}for(d=c.length;d--;)f=c[d],u=f._pt||f,u.s=(r||r===0)&&!s?r:u.s+(r||0)+o*u.c,u.c=n-u.s,f.e&&(f.e=We(n)+bn(f.e)),f.b&&(f.b=u.s+bn(f.b))},xM=function(t,e){var n=t[0]?Ls(t[0]).harness:0,r=n&&n.aliases,s,o,a,l;if(!r)return e;s=Vo({},e);for(o in r)if(o in s)for(l=r[o].split(","),a=l.length;a--;)s[l[a]]=s[o];return s},yM=function(t,e,n,r){var s=e.ease||r||"power1.inOut",o,a;if(wn(e))a=n[t]||(n[t]=[]),e.forEach(function(l,c){return a.push({t:c/(e.length-1)*100,v:l,e:s})});else for(o in e)a=n[o]||(n[o]=[]),o==="ease"||a.push({t:parseFloat(t),v:e[o],e:s})},Oa=function(t,e,n,r,s){return Ve(t)?t.call(e,n,r,s):fn(t)&&~t.indexOf("random(")?Qa(t):t},Yg=ld+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",qg={};qn(Yg+",id,stagger,delay,duration,paused,scrollTrigger",function(i){return qg[i]=1});var $e=(function(i){fg(t,i);function t(n,r,s,o){var a;typeof r=="number"&&(s.duration=r,r=s,s=null),a=i.call(this,o?r:Ua(r))||this;var l=a.vars,c=l.duration,u=l.delay,f=l.immediateRender,h=l.stagger,d=l.overwrite,g=l.keyframes,_=l.defaults,m=l.scrollTrigger,p=l.yoyoEase,M=r.parent||Fe,b=(wn(n)||dg(n)?wr(n[0]):"length"in r)?[n]:Ti(n),v,R,C,T,D,S,x,I;if(a._targets=b.length?cd(b):Za("GSAP target "+n+" not found. https://gsap.com",!di.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=d,g||h||vl(c)||vl(u)){if(r=a.vars,v=a.timeline=new Bn({data:"nested",defaults:_||{},targets:M&&M.data==="nested"?M.vars.targets:b}),v.kill(),v.parent=v._dp=mr(a),v._start=0,h||vl(c)||vl(u)){if(T=b.length,x=h&&Dg(h),nr(h))for(D in h)~Yg.indexOf(D)&&(I||(I={}),I[D]=h[D]);for(R=0;R<T;R++)C=Lc(r,qg),C.stagger=0,p&&(C.yoyoEase=p),I&&Vo(C,I),S=b[R],C.duration=+Oa(c,mr(a),R,S,b),C.delay=(+Oa(u,mr(a),R,S,b)||0)-a._delay,!h&&T===1&&C.delay&&(a._delay=u=C.delay,a._start+=u,C.delay=0),v.to(S,C,x?x(R,S,b):0),v._ease=ue.none;v.duration()?c=u=0:a.timeline=0}else if(g){Ua(_i(v.vars.defaults,{ease:"none"})),v._ease=Us(g.ease||r.ease||"none");var F=0,z,W,tt;if(wn(g))g.forEach(function(G){return v.to(b,G,">")}),v.duration();else{C={};for(D in g)D==="ease"||D==="easeEach"||yM(D,g[D],C,g.easeEach);for(D in C)for(z=C[D].sort(function(G,K){return G.t-K.t}),F=0,R=0;R<z.length;R++)W=z[R],tt={ease:W.e,duration:(W.t-(R?z[R-1].t:0))/100*c},tt[D]=W.v,v.to(b,tt,F),F+=tt.duration;v.duration()<c&&v.to({},{duration:c-v.duration()})}}c||a.duration(c=v.duration())}else a.timeline=0;return d===!0&&!nd&&(Wr=mr(a),Fe.killTweensOf(b),Wr=0),$i(M,mr(a),s),r.reversed&&a.reverse(),r.paused&&a.paused(!0),(f||!c&&!g&&a._start===je(M._time)&&Yn(f)&&Zy(mr(a))&&M.data!=="nested")&&(a._tTime=-Ae,a.render(Math.max(0,-u)||0)),m&&Ag(mr(a),m),a}var e=t.prototype;return e.render=function(r,s,o){var a=this._time,l=this._tDur,c=this._dur,u=r<0,f=r>l-Ae&&!u?l:r<Ae?0:r,h,d,g,_,m,p,M,b,v;if(!c)Qy(this,r,s,o);else if(f!==this._tTime||!r||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(h=f,b=this.timeline,this._repeat){if(_=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(_*100+r,s,o);if(h=je(f%_),f===l?(g=this._repeat,h=c):(m=je(f/_),g=~~m,g&&g===m?(h=c,g--):h>c&&(h=c)),p=this._yoyo&&g&1,p&&(v=this._yEase,h=c-h),m=Go(this._tTime,_),h===a&&!o&&this._initted&&g===m)return this._tTime=f,this;g!==m&&(b&&this._yEase&&Vg(b,p),this.vars.repeatRefresh&&!p&&!this._lock&&h!==_&&this._initted&&(this._lock=o=1,this.render(je(_*g),!0).invalidate()._lock=0))}if(!this._initted){if(Cg(this,u?r:h,o,s,f))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&g!==m))return this;if(c!==this._dur)return this.render(r,s,o)}if(this._tTime=f,this._time=h,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=M=(v||this._ease)(h/c),this._from&&(this.ratio=M=1-M),!a&&f&&!s&&!m&&(hi(this,"onStart"),this._tTime!==f))return this;for(d=this._pt;d;)d.r(M,d.d),d=d._next;b&&b.render(r<0?r:b._dur*b._ease(h/this._dur),s,o)||this._startAt&&(this._zTime=r),this._onUpdate&&!s&&(u&&Cf(this,r,s,o),hi(this,"onUpdate")),this._repeat&&g!==m&&this.vars.onRepeat&&!s&&this.parent&&hi(this,"onRepeat"),(f===this._tDur||!f)&&this._tTime===f&&(u&&!this._onUpdate&&Cf(this,r,!0,!0),(r||!c)&&(f===this._tDur&&this._ts>0||!f&&this._ts<0)&&rs(this,1),!s&&!(u&&!a)&&(f||a||p)&&(hi(this,f===l?"onComplete":"onReverseComplete",!0),this._prom&&!(f<l&&this.timeScale()>0)&&this._prom()))}return this},e.targets=function(){return this._targets},e.invalidate=function(r){return(!r||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(r),i.prototype.invalidate.call(this,r)},e.resetTo=function(r,s,o,a,l){tl||ci.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||hd(this,c),u=this._ease(c/this._dur),vM(this,r,s,o,a,u,c,l)?this.resetTo(r,s,o,a,1):(ru(this,0),this.parent||Tg(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},e.kill=function(r,s){if(s===void 0&&(s="all"),!r&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?ga(this):this.scrollTrigger&&this.scrollTrigger.kill(!!_n),this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(r,s,Wr&&Wr.vars.overwrite!==!0)._first||ga(this),this.parent&&o!==this.timeline.totalDuration()&&Wo(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=r?Ti(r):a,c=this._ptLookup,u=this._pt,f,h,d,g,_,m,p;if((!s||s==="all")&&jy(a,l))return s==="all"&&(this._pt=0),ga(this);for(f=this._op=this._op||[],s!=="all"&&(fn(s)&&(_={},qn(s,function(M){return _[M]=1}),s=_),s=xM(a,s)),p=a.length;p--;)if(~l.indexOf(a[p])){h=c[p],s==="all"?(f[p]=s,g=h,d={}):(d=f[p]=f[p]||{},g=s);for(_ in g)m=h&&h[_],m&&((!("kill"in m.d)||m.d.kill(_)===!0)&&nu(this,m,"_pt"),delete h[_]),d!=="all"&&(d[_]=1)}return this._initted&&!this._pt&&u&&ga(this),this},t.to=function(r,s){return new t(r,s,arguments[2])},t.from=function(r,s){return Na(1,arguments)},t.delayedCall=function(r,s,o,a){return new t(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:r,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},t.fromTo=function(r,s,o){return Na(2,arguments)},t.set=function(r,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new t(r,s)},t.killTweensOf=function(r,s,o){return Fe.killTweensOf(r,s,o)},t})(el);_i($e.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});qn("staggerTo,staggerFrom,staggerFromTo",function(i){$e[i]=function(){var t=new Bn,e=Pf.call(arguments,0);return e.splice(i==="staggerFromTo"?5:4,0,0),t[i].apply(t,e)}});var dd=function(t,e,n){return t[e]=n},$g=function(t,e,n){return t[e](n)},MM=function(t,e,n,r){return t[e](r.fp,n)},SM=function(t,e,n){return t.setAttribute(e,n)},pd=function(t,e){return Ve(t[e])?$g:id(t[e])&&t.setAttribute?SM:dd},jg=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e6)/1e6,e)},bM=function(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},Kg=function(t,e){var n=e._pt,r="";if(!t&&e.b)r=e.b;else if(t===1&&e.e)r=e.e;else{for(;n;)r=n.p+(n.m?n.m(n.s+n.c*t):Math.round((n.s+n.c*t)*1e4)/1e4)+r,n=n._next;r+=e.c}e.set(e.t,e.p,r,e)},md=function(t,e){for(var n=e._pt;n;)n.r(t,n.d),n=n._next},EM=function(t,e,n,r){for(var s=this._pt,o;s;)o=s._next,s.p===r&&s.modifier(t,e,n),s=o},TM=function(t){for(var e=this._pt,n,r;e;)r=e._next,e.p===t&&!e.op||e.op===t?nu(this,e,"_pt"):e.dep||(n=1),e=r;return!n},wM=function(t,e,n,r){r.mSet(t,e,r.m.call(r.tween,n,r.mt),r)},Zg=function(t){for(var e=t._pt,n,r,s,o;e;){for(n=e._next,r=s;r&&r.pr>e.pr;)r=r._next;(e._prev=r?r._prev:o)?e._prev._next=e:s=e,(e._next=r)?r._prev=e:o=e,e=n}t._pt=s},$n=(function(){function i(e,n,r,s,o,a,l,c,u){this.t=n,this.s=s,this.c=o,this.p=r,this.r=a||jg,this.d=l||this,this.set=c||dd,this.pr=u||0,this._next=e,e&&(e._prev=this)}var t=i.prototype;return t.modifier=function(n,r,s){this.mSet=this.mSet||this.set,this.set=wM,this.m=n,this.mt=s,this.tween=r},i})();qn(ld+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(i){return ad[i]=1});mi.TweenMax=mi.TweenLite=$e;mi.TimelineLite=mi.TimelineMax=Bn;Fe=new Bn({sortChildren:!1,defaults:Ho,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});di.stringFilter=kg;var Ns=[],lc={},AM=[],Ep=0,CM=0,Tu=function(t){return(lc[t]||AM).map(function(e){return e()})},Uf=function(){var t=Date.now(),e=[];t-Ep>2&&(Tu("matchMediaInit"),Ns.forEach(function(n){var r=n.queries,s=n.conditions,o,a,l,c;for(a in r)o=Wi.matchMedia(r[a]).matches,o&&(l=1),o!==s[a]&&(s[a]=o,c=1);c&&(n.revert(),l&&e.push(n))}),Tu("matchMediaRevert"),e.forEach(function(n){return n.onMatch(n,function(r){return n.add(null,r)})}),Ep=t,Tu("matchMedia"))},Jg=(function(){function i(e,n){this.selector=n&&Df(n),this.data=[],this._r=[],this.isReverted=!1,this.id=CM++,e&&this.add(e)}var t=i.prototype;return t.add=function(n,r,s){Ve(n)&&(s=r,r=n,n=Ve);var o=this,a=function(){var c=Ue,u=o.selector,f;return c&&c!==o&&c.data.push(o),s&&(o.selector=Df(s)),Ue=o,f=r.apply(o,arguments),Ve(f)&&o._r.push(f),Ue=c,o.selector=u,o.isReverted=!1,f};return o.last=a,n===Ve?a(o,function(l){return o.add(null,l)}):n?o[n]=a:a},t.ignore=function(n){var r=Ue;Ue=null,n(this),Ue=r},t.getTweens=function(){var n=[];return this.data.forEach(function(r){return r instanceof i?n.push.apply(n,r.getTweens()):r instanceof $e&&!(r.parent&&r.parent.data==="nested")&&n.push(r)}),n},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(n,r){var s=this;if(n?(function(){for(var a=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return a.splice(a.indexOf(u),1)}));for(a.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,f){return f.g-u.g||-1/0}).forEach(function(u){return u.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof Bn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof $e)&&c.revert&&c.revert(n);s._r.forEach(function(u){return u(n,s)}),s.isReverted=!0})():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),r)for(var o=Ns.length;o--;)Ns[o].id===this.id&&Ns.splice(o,1)},t.revert=function(n){this.kill(n||{})},i})(),RM=(function(){function i(e){this.contexts=[],this.scope=e,Ue&&Ue.data.push(this)}var t=i.prototype;return t.add=function(n,r,s){nr(n)||(n={matches:n});var o=new Jg(0,s||this.scope),a=o.conditions={},l,c,u;Ue&&!o.selector&&(o.selector=Ue.selector),this.contexts.push(o),r=o.add("onMatch",r),o.queries=n;for(c in n)c==="all"?u=1:(l=Wi.matchMedia(n[c]),l&&(Ns.indexOf(o)<0&&Ns.push(o),(a[c]=l.matches)&&(u=1),l.addListener?l.addListener(Uf):l.addEventListener("change",Uf)));return u&&r(o,function(f){return o.add(null,f)}),this},t.revert=function(n){this.kill(n||{})},t.kill=function(n){this.contexts.forEach(function(r){return r.kill(n,!0)})},i})(),Uc={registerPlugin:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];e.forEach(function(r){return Fg(r)})},timeline:function(t){return new Bn(t)},getTweensOf:function(t,e){return Fe.getTweensOf(t,e)},getProperty:function(t,e,n,r){fn(t)&&(t=Ti(t)[0]);var s=Ls(t||{}).get,o=n?Eg:bg;return n==="native"&&(n=""),t&&(e?o((oi[e]&&oi[e].get||s)(t,e,n,r)):function(a,l,c){return o((oi[a]&&oi[a].get||s)(t,a,l,c))})},quickSetter:function(t,e,n){if(t=Ti(t),t.length>1){var r=t.map(function(u){return Jn.quickSetter(u,e,n)}),s=r.length;return function(u){for(var f=s;f--;)r[f](u)}}t=t[0]||{};var o=oi[e],a=Ls(t),l=a.harness&&(a.harness.aliases||{})[e]||e,c=o?function(u){var f=new o;yo._pt=0,f.init(t,n?u+n:u,yo,0,[t]),f.render(1,f),yo._pt&&md(1,yo)}:a.set(t,l);return o?c:function(u){return c(t,l,n?u+n:u,a,1)}},quickTo:function(t,e,n){var r,s=Jn.to(t,_i((r={},r[e]="+=0.1",r.paused=!0,r.stagger=0,r),n||{})),o=function(l,c,u){return s.resetTo(e,l,c,u)};return o.tween=s,o},isTweening:function(t){return Fe.getTweensOf(t,!0).length>0},defaults:function(t){return t&&t.ease&&(t.ease=Us(t.ease,Ho.ease)),xp(Ho,t||{})},config:function(t){return xp(di,t||{})},registerEffect:function(t){var e=t.name,n=t.effect,r=t.plugins,s=t.defaults,o=t.extendTimeline;(r||"").split(",").forEach(function(a){return a&&!oi[a]&&!mi[a]&&Za(e+" effect requires "+a+" plugin.")}),Mu[e]=function(a,l,c){return n(Ti(a),_i(l||{},s),c)},o&&(Bn.prototype[e]=function(a,l,c){return this.add(Mu[e](a,nr(l)?l:(c=l)&&{},this),c)})},registerEase:function(t,e){ue[t]=Us(e)},parseEase:function(t,e){return arguments.length?Us(t,e):ue},getById:function(t){return Fe.getById(t)},exportRoot:function(t,e){t===void 0&&(t={});var n=new Bn(t),r,s;for(n.smoothChildTiming=Yn(t.smoothChildTiming),Fe.remove(n),n._dp=0,n._time=n._tTime=Fe._time,r=Fe._first;r;)s=r._next,(e||!(!r._dur&&r instanceof $e&&r.vars.onComplete===r._targets[0]))&&$i(n,r,r._start-r._delay),r=s;return $i(Fe,n,0),n},context:function(t,e){return t?new Jg(t,e):Ue},matchMedia:function(t){return new RM(t)},matchMediaRefresh:function(){return Ns.forEach(function(t){var e=t.conditions,n,r;for(r in e)e[r]&&(e[r]=!1,n=1);n&&t.revert()})||Uf()},addEventListener:function(t,e){var n=lc[t]||(lc[t]=[]);~n.indexOf(e)||n.push(e)},removeEventListener:function(t,e){var n=lc[t],r=n&&n.indexOf(e);r>=0&&n.splice(r,1)},utils:{wrap:aM,wrapYoyo:lM,distribute:Dg,random:Ig,snap:Lg,normalize:oM,getUnit:bn,clamp:nM,splitColor:Bg,toArray:Ti,selector:Df,mapRange:Ng,pipe:rM,unitize:sM,interpolate:cM,shuffle:Pg},install:vg,effects:Mu,ticker:ci,updateRoot:Bn.updateRoot,plugins:oi,globalTimeline:Fe,core:{PropTween:$n,globals:xg,Tween:$e,Timeline:Bn,Animation:el,getCache:Ls,_removeLinkedListItem:nu,reverting:function(){return _n},context:function(t){return t&&Ue&&(Ue.data.push(t),t._ctx=Ue),Ue},suppressOverwrites:function(t){return nd=t}}};qn("to,from,fromTo,delayedCall,set,killTweensOf",function(i){return Uc[i]=$e[i]});ci.add(Bn.updateRoot);yo=Uc.to({},{duration:0});var PM=function(t,e){for(var n=t._pt;n&&n.p!==e&&n.op!==e&&n.fp!==e;)n=n._next;return n},DM=function(t,e){var n=t._targets,r,s,o;for(r in e)for(s=n.length;s--;)o=t._ptLookup[s][r],o&&(o=o.d)&&(o._pt&&(o=PM(o,r)),o&&o.modifier&&o.modifier(e[r],t,n[s],r))},wu=function(t,e){return{name:t,headless:1,rawVars:1,init:function(r,s,o){o._onInit=function(a){var l,c;if(fn(s)&&(l={},qn(s,function(u){return l[u]=1}),s=l),e){l={};for(c in s)l[c]=e(s[c]);s=l}DM(a,s)}}}},Jn=Uc.registerPlugin({name:"attr",init:function(t,e,n,r,s){var o,a,l;this.tween=n;for(o in e)l=t.getAttribute(o)||"",a=this.add(t,"setAttribute",(l||0)+"",e[o],r,s,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(t,e){for(var n=e._pt;n;)_n?n.set(n.t,n.p,n.b,n):n.r(t,n.d),n=n._next}},{name:"endArray",headless:1,init:function(t,e){for(var n=e.length;n--;)this.add(t,n,t[n]||0,e[n],0,0,0,0,0,1)}},wu("roundProps",Lf),wu("modifiers"),wu("snap",Lg))||Uc;$e.version=Bn.version=Jn.version="3.13.0";gg=1;rd()&&Xo();ue.Power0;ue.Power1;ue.Power2;ue.Power3;ue.Power4;ue.Linear;ue.Quad;ue.Cubic;ue.Quart;ue.Quint;ue.Strong;ue.Elastic;ue.Back;ue.SteppedEase;ue.Bounce;ue.Sine;ue.Expo;ue.Circ;var Tp,Xr,Po,_d,As,wp,gd,LM=function(){return typeof window<"u"},Ar={},Ms=180/Math.PI,Do=Math.PI/180,Js=Math.atan2,Ap=1e8,vd=/([A-Z])/g,IM=/(left|right|width|margin|padding|x)/i,UM=/[\s,\(]\S/,Ki={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Nf=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},NM=function(t,e){return e.set(e.t,e.p,t===1?e.e:Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},OM=function(t,e){return e.set(e.t,e.p,t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},FM=function(t,e){var n=e.s+e.c*t;e.set(e.t,e.p,~~(n+(n<0?-.5:.5))+e.u,e)},Qg=function(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)},t0=function(t,e){return e.set(e.t,e.p,t!==1?e.b:e.e,e)},BM=function(t,e,n){return t.style[e]=n},zM=function(t,e,n){return t.style.setProperty(e,n)},kM=function(t,e,n){return t._gsap[e]=n},HM=function(t,e,n){return t._gsap.scaleX=t._gsap.scaleY=n},VM=function(t,e,n,r,s){var o=t._gsap;o.scaleX=o.scaleY=n,o.renderTransform(s,o)},GM=function(t,e,n,r,s){var o=t._gsap;o[e]=n,o.renderTransform(s,o)},Be="transform",jn=Be+"Origin",WM=function i(t,e){var n=this,r=this.target,s=r.style,o=r._gsap;if(t in Ar&&s){if(this.tfm=this.tfm||{},t!=="transform")t=Ki[t]||t,~t.indexOf(",")?t.split(",").forEach(function(a){return n.tfm[a]=_r(r,a)}):this.tfm[t]=o.x?o[t]:_r(r,t),t===jn&&(this.tfm.zOrigin=o.zOrigin);else return Ki.transform.split(",").forEach(function(a){return i.call(n,a,e)});if(this.props.indexOf(Be)>=0)return;o.svg&&(this.svgo=r.getAttribute("data-svg-origin"),this.props.push(jn,e,"")),t=Be}(s||e)&&this.props.push(t,e,s[t])},e0=function(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))},XM=function(){var t=this.props,e=this.target,n=e.style,r=e._gsap,s,o;for(s=0;s<t.length;s+=3)t[s+1]?t[s+1]===2?e[t[s]](t[s+2]):e[t[s]]=t[s+2]:t[s+2]?n[t[s]]=t[s+2]:n.removeProperty(t[s].substr(0,2)==="--"?t[s]:t[s].replace(vd,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)r[o]=this.tfm[o];r.svg&&(r.renderTransform(),e.setAttribute("data-svg-origin",this.svgo||"")),s=gd(),(!s||!s.isStart)&&!n[Be]&&(e0(n),r.zOrigin&&n[jn]&&(n[jn]+=" "+r.zOrigin+"px",r.zOrigin=0,r.renderTransform()),r.uncache=1)}},n0=function(t,e){var n={target:t,props:[],revert:XM,save:WM};return t._gsap||Jn.core.getCache(t),e&&t.style&&t.nodeType&&e.split(",").forEach(function(r){return n.save(r)}),n},i0,Of=function(t,e){var n=Xr.createElementNS?Xr.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):Xr.createElement(t);return n&&n.style?n:Xr.createElement(t)},wi=function i(t,e,n){var r=getComputedStyle(t);return r[e]||r.getPropertyValue(e.replace(vd,"-$1").toLowerCase())||r.getPropertyValue(e)||!n&&i(t,Yo(e)||e,1)||""},Cp="O,Moz,ms,Ms,Webkit".split(","),Yo=function(t,e,n){var r=e||As,s=r.style,o=5;if(t in s&&!n)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);o--&&!(Cp[o]+t in s););return o<0?null:(o===3?"ms":o>=0?Cp[o]:"")+t},Ff=function(){LM()&&window.document&&(Tp=window,Xr=Tp.document,Po=Xr.documentElement,As=Of("div")||{style:{}},Of("div"),Be=Yo(Be),jn=Be+"Origin",As.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",i0=!!Yo("perspective"),gd=Jn.core.reverting,_d=1)},Rp=function(t){var e=t.ownerSVGElement,n=Of("svg",e&&e.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),r=t.cloneNode(!0),s;r.style.display="block",n.appendChild(r),Po.appendChild(n);try{s=r.getBBox()}catch{}return n.removeChild(r),Po.removeChild(n),s},Pp=function(t,e){for(var n=e.length;n--;)if(t.hasAttribute(e[n]))return t.getAttribute(e[n])},r0=function(t){var e,n;try{e=t.getBBox()}catch{e=Rp(t),n=1}return e&&(e.width||e.height)||n||(e=Rp(t)),e&&!e.width&&!e.x&&!e.y?{x:+Pp(t,["x","cx","x1"])||0,y:+Pp(t,["y","cy","y1"])||0,width:0,height:0}:e},s0=function(t){return!!(t.getCTM&&(!t.parentNode||t.ownerSVGElement)&&r0(t))},ks=function(t,e){if(e){var n=t.style,r;e in Ar&&e!==jn&&(e=Be),n.removeProperty?(r=e.substr(0,2),(r==="ms"||e.substr(0,6)==="webkit")&&(e="-"+e),n.removeProperty(r==="--"?e:e.replace(vd,"-$1").toLowerCase())):n.removeAttribute(e)}},Yr=function(t,e,n,r,s,o){var a=new $n(t._pt,e,n,0,1,o?t0:Qg);return t._pt=a,a.b=r,a.e=s,t._props.push(n),a},Dp={deg:1,rad:1,turn:1},YM={grid:1,flex:1},ss=function i(t,e,n,r){var s=parseFloat(n)||0,o=(n+"").trim().substr((s+"").length)||"px",a=As.style,l=IM.test(e),c=t.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),f=100,h=r==="px",d=r==="%",g,_,m,p;if(r===o||!s||Dp[r]||Dp[o])return s;if(o!=="px"&&!h&&(s=i(t,e,n,"px")),p=t.getCTM&&s0(t),(d||o==="%")&&(Ar[e]||~e.indexOf("adius")))return g=p?t.getBBox()[l?"width":"height"]:t[u],We(d?s/g*f:s/100*g);if(a[l?"width":"height"]=f+(h?o:r),_=r!=="rem"&&~e.indexOf("adius")||r==="em"&&t.appendChild&&!c?t:t.parentNode,p&&(_=(t.ownerSVGElement||{}).parentNode),(!_||_===Xr||!_.appendChild)&&(_=Xr.body),m=_._gsap,m&&d&&m.width&&l&&m.time===ci.time&&!m.uncache)return We(s/m.width*f);if(d&&(e==="height"||e==="width")){var M=t.style[e];t.style[e]=f+r,g=t[u],M?t.style[e]=M:ks(t,e)}else(d||o==="%")&&!YM[wi(_,"display")]&&(a.position=wi(t,"position")),_===t&&(a.position="static"),_.appendChild(As),g=As[u],_.removeChild(As),a.position="absolute";return l&&d&&(m=Ls(_),m.time=ci.time,m.width=_[u]),We(h?g*s/f:g&&s?f/g*s:0)},_r=function(t,e,n,r){var s;return _d||Ff(),e in Ki&&e!=="transform"&&(e=Ki[e],~e.indexOf(",")&&(e=e.split(",")[0])),Ar[e]&&e!=="transform"?(s=il(t,r),s=e!=="transformOrigin"?s[e]:s.svg?s.origin:Oc(wi(t,jn))+" "+s.zOrigin+"px"):(s=t.style[e],(!s||s==="auto"||r||~(s+"").indexOf("calc("))&&(s=Nc[e]&&Nc[e](t,e,n)||wi(t,e)||Mg(t,e)||(e==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?ss(t,e,s,n)+n:s},qM=function(t,e,n,r){if(!n||n==="none"){var s=Yo(e,t,1),o=s&&wi(t,s,1);o&&o!==n?(e=s,n=o):e==="borderColor"&&(n=wi(t,"borderTopColor"))}var a=new $n(this._pt,t.style,e,0,1,Kg),l=0,c=0,u,f,h,d,g,_,m,p,M,b,v,R;if(a.b=n,a.e=r,n+="",r+="",r.substring(0,6)==="var(--"&&(r=wi(t,r.substring(4,r.indexOf(")")))),r==="auto"&&(_=t.style[e],t.style[e]=r,r=wi(t,e)||r,_?t.style[e]=_:ks(t,e)),u=[n,r],kg(u),n=u[0],r=u[1],h=n.match(xo)||[],R=r.match(xo)||[],R.length){for(;f=xo.exec(r);)m=f[0],M=r.substring(l,f.index),g?g=(g+1)%5:(M.substr(-5)==="rgba("||M.substr(-5)==="hsla(")&&(g=1),m!==(_=h[c++]||"")&&(d=parseFloat(_)||0,v=_.substr((d+"").length),m.charAt(1)==="="&&(m=Ro(d,m)+v),p=parseFloat(m),b=m.substr((p+"").length),l=xo.lastIndex-b.length,b||(b=b||di.units[e]||v,l===r.length&&(r+=b,a.e+=b)),v!==b&&(d=ss(t,e,_,b)||0),a._pt={_next:a._pt,p:M||c===1?M:",",s:d,c:p-d,m:g&&g<4||e==="zIndex"?Math.round:0});a.c=l<r.length?r.substring(l,r.length):""}else a.r=e==="display"&&r==="none"?t0:Qg;return mg.test(r)&&(a.e=0),this._pt=a,a},Lp={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},$M=function(t){var e=t.split(" "),n=e[0],r=e[1]||"50%";return(n==="top"||n==="bottom"||r==="left"||r==="right")&&(t=n,n=r,r=t),e[0]=Lp[n]||n,e[1]=Lp[r]||r,e.join(" ")},jM=function(t,e){if(e.tween&&e.tween._time===e.tween._dur){var n=e.t,r=n.style,s=e.u,o=n._gsap,a,l,c;if(s==="all"||s===!0)r.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)a=s[c],Ar[a]&&(l=1,a=a==="transformOrigin"?jn:Be),ks(n,a);l&&(ks(n,Be),o&&(o.svg&&n.removeAttribute("transform"),r.scale=r.rotate=r.translate="none",il(n,1),o.uncache=1,e0(r)))}},Nc={clearProps:function(t,e,n,r,s){if(s.data!=="isFromStart"){var o=t._pt=new $n(t._pt,e,n,0,0,jM);return o.u=r,o.pr=-10,o.tween=s,t._props.push(n),1}}},nl=[1,0,0,1,0,0],o0={},a0=function(t){return t==="matrix(1, 0, 0, 1, 0, 0)"||t==="none"||!t},Ip=function(t){var e=wi(t,Be);return a0(e)?nl:e.substr(7).match(pg).map(We)},xd=function(t,e){var n=t._gsap||Ls(t),r=t.style,s=Ip(t),o,a,l,c;return n.svg&&t.getAttribute("transform")?(l=t.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?nl:s):(s===nl&&!t.offsetParent&&t!==Po&&!n.svg&&(l=r.display,r.display="block",o=t.parentNode,(!o||!t.offsetParent&&!t.getBoundingClientRect().width)&&(c=1,a=t.nextElementSibling,Po.appendChild(t)),s=Ip(t),l?r.display=l:ks(t,"display"),c&&(a?o.insertBefore(t,a):o?o.appendChild(t):Po.removeChild(t))),e&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},Bf=function(t,e,n,r,s,o){var a=t._gsap,l=s||xd(t,!0),c=a.xOrigin||0,u=a.yOrigin||0,f=a.xOffset||0,h=a.yOffset||0,d=l[0],g=l[1],_=l[2],m=l[3],p=l[4],M=l[5],b=e.split(" "),v=parseFloat(b[0])||0,R=parseFloat(b[1])||0,C,T,D,S;n?l!==nl&&(T=d*m-g*_)&&(D=v*(m/T)+R*(-_/T)+(_*M-m*p)/T,S=v*(-g/T)+R*(d/T)-(d*M-g*p)/T,v=D,R=S):(C=r0(t),v=C.x+(~b[0].indexOf("%")?v/100*C.width:v),R=C.y+(~(b[1]||b[0]).indexOf("%")?R/100*C.height:R)),r||r!==!1&&a.smooth?(p=v-c,M=R-u,a.xOffset=f+(p*d+M*_)-p,a.yOffset=h+(p*g+M*m)-M):a.xOffset=a.yOffset=0,a.xOrigin=v,a.yOrigin=R,a.smooth=!!r,a.origin=e,a.originIsAbsolute=!!n,t.style[jn]="0px 0px",o&&(Yr(o,a,"xOrigin",c,v),Yr(o,a,"yOrigin",u,R),Yr(o,a,"xOffset",f,a.xOffset),Yr(o,a,"yOffset",h,a.yOffset)),t.setAttribute("data-svg-origin",v+" "+R)},il=function(t,e){var n=t._gsap||new Wg(t);if("x"in n&&!e&&!n.uncache)return n;var r=t.style,s=n.scaleX<0,o="px",a="deg",l=getComputedStyle(t),c=wi(t,jn)||"0",u,f,h,d,g,_,m,p,M,b,v,R,C,T,D,S,x,I,F,z,W,tt,G,K,H,ct,N,vt,Lt,qt,nt,ht;return u=f=h=_=m=p=M=b=v=0,d=g=1,n.svg=!!(t.getCTM&&s0(t)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(r[Be]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[Be]!=="none"?l[Be]:"")),r.scale=r.rotate=r.translate="none"),T=xd(t,n.svg),n.svg&&(n.uncache?(H=t.getBBox(),c=n.xOrigin-H.x+"px "+(n.yOrigin-H.y)+"px",K=""):K=!e&&t.getAttribute("data-svg-origin"),Bf(t,K||c,!!K||n.originIsAbsolute,n.smooth!==!1,T)),R=n.xOrigin||0,C=n.yOrigin||0,T!==nl&&(I=T[0],F=T[1],z=T[2],W=T[3],u=tt=T[4],f=G=T[5],T.length===6?(d=Math.sqrt(I*I+F*F),g=Math.sqrt(W*W+z*z),_=I||F?Js(F,I)*Ms:0,M=z||W?Js(z,W)*Ms+_:0,M&&(g*=Math.abs(Math.cos(M*Do))),n.svg&&(u-=R-(R*I+C*z),f-=C-(R*F+C*W))):(ht=T[6],qt=T[7],N=T[8],vt=T[9],Lt=T[10],nt=T[11],u=T[12],f=T[13],h=T[14],D=Js(ht,Lt),m=D*Ms,D&&(S=Math.cos(-D),x=Math.sin(-D),K=tt*S+N*x,H=G*S+vt*x,ct=ht*S+Lt*x,N=tt*-x+N*S,vt=G*-x+vt*S,Lt=ht*-x+Lt*S,nt=qt*-x+nt*S,tt=K,G=H,ht=ct),D=Js(-z,Lt),p=D*Ms,D&&(S=Math.cos(-D),x=Math.sin(-D),K=I*S-N*x,H=F*S-vt*x,ct=z*S-Lt*x,nt=W*x+nt*S,I=K,F=H,z=ct),D=Js(F,I),_=D*Ms,D&&(S=Math.cos(D),x=Math.sin(D),K=I*S+F*x,H=tt*S+G*x,F=F*S-I*x,G=G*S-tt*x,I=K,tt=H),m&&Math.abs(m)+Math.abs(_)>359.9&&(m=_=0,p=180-p),d=We(Math.sqrt(I*I+F*F+z*z)),g=We(Math.sqrt(G*G+ht*ht)),D=Js(tt,G),M=Math.abs(D)>2e-4?D*Ms:0,v=nt?1/(nt<0?-nt:nt):0),n.svg&&(K=t.getAttribute("transform"),n.forceCSS=t.setAttribute("transform","")||!a0(wi(t,Be)),K&&t.setAttribute("transform",K))),Math.abs(M)>90&&Math.abs(M)<270&&(s?(d*=-1,M+=_<=0?180:-180,_+=_<=0?180:-180):(g*=-1,M+=M<=0?180:-180)),e=e||n.uncache,n.x=u-((n.xPercent=u&&(!e&&n.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-u)?-50:0)))?t.offsetWidth*n.xPercent/100:0)+o,n.y=f-((n.yPercent=f&&(!e&&n.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-f)?-50:0)))?t.offsetHeight*n.yPercent/100:0)+o,n.z=h+o,n.scaleX=We(d),n.scaleY=We(g),n.rotation=We(_)+a,n.rotationX=We(m)+a,n.rotationY=We(p)+a,n.skewX=M+a,n.skewY=b+a,n.transformPerspective=v+o,(n.zOrigin=parseFloat(c.split(" ")[2])||!e&&n.zOrigin||0)&&(r[jn]=Oc(c)),n.xOffset=n.yOffset=0,n.force3D=di.force3D,n.renderTransform=n.svg?ZM:i0?l0:KM,n.uncache=0,n},Oc=function(t){return(t=t.split(" "))[0]+" "+t[1]},Au=function(t,e,n){var r=bn(e);return We(parseFloat(e)+parseFloat(ss(t,"x",n+"px",r)))+r},KM=function(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,l0(t,e)},hs="0deg",la="0px",ds=") ",l0=function(t,e){var n=e||this,r=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.z,c=n.rotation,u=n.rotationY,f=n.rotationX,h=n.skewX,d=n.skewY,g=n.scaleX,_=n.scaleY,m=n.transformPerspective,p=n.force3D,M=n.target,b=n.zOrigin,v="",R=p==="auto"&&t&&t!==1||p===!0;if(b&&(f!==hs||u!==hs)){var C=parseFloat(u)*Do,T=Math.sin(C),D=Math.cos(C),S;C=parseFloat(f)*Do,S=Math.cos(C),o=Au(M,o,T*S*-b),a=Au(M,a,-Math.sin(C)*-b),l=Au(M,l,D*S*-b+b)}m!==la&&(v+="perspective("+m+ds),(r||s)&&(v+="translate("+r+"%, "+s+"%) "),(R||o!==la||a!==la||l!==la)&&(v+=l!==la||R?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+ds),c!==hs&&(v+="rotate("+c+ds),u!==hs&&(v+="rotateY("+u+ds),f!==hs&&(v+="rotateX("+f+ds),(h!==hs||d!==hs)&&(v+="skew("+h+", "+d+ds),(g!==1||_!==1)&&(v+="scale("+g+", "+_+ds),M.style[Be]=v||"translate(0, 0)"},ZM=function(t,e){var n=e||this,r=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.rotation,c=n.skewX,u=n.skewY,f=n.scaleX,h=n.scaleY,d=n.target,g=n.xOrigin,_=n.yOrigin,m=n.xOffset,p=n.yOffset,M=n.forceCSS,b=parseFloat(o),v=parseFloat(a),R,C,T,D,S;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=Do,c*=Do,R=Math.cos(l)*f,C=Math.sin(l)*f,T=Math.sin(l-c)*-h,D=Math.cos(l-c)*h,c&&(u*=Do,S=Math.tan(c-u),S=Math.sqrt(1+S*S),T*=S,D*=S,u&&(S=Math.tan(u),S=Math.sqrt(1+S*S),R*=S,C*=S)),R=We(R),C=We(C),T=We(T),D=We(D)):(R=f,D=h,C=T=0),(b&&!~(o+"").indexOf("px")||v&&!~(a+"").indexOf("px"))&&(b=ss(d,"x",o,"px"),v=ss(d,"y",a,"px")),(g||_||m||p)&&(b=We(b+g-(g*R+_*T)+m),v=We(v+_-(g*C+_*D)+p)),(r||s)&&(S=d.getBBox(),b=We(b+r/100*S.width),v=We(v+s/100*S.height)),S="matrix("+R+","+C+","+T+","+D+","+b+","+v+")",d.setAttribute("transform",S),M&&(d.style[Be]=S)},JM=function(t,e,n,r,s){var o=360,a=fn(s),l=parseFloat(s)*(a&&~s.indexOf("rad")?Ms:1),c=l-r,u=r+c+"deg",f,h;return a&&(f=s.split("_")[1],f==="short"&&(c%=o,c!==c%(o/2)&&(c+=c<0?o:-o)),f==="cw"&&c<0?c=(c+o*Ap)%o-~~(c/o)*o:f==="ccw"&&c>0&&(c=(c-o*Ap)%o-~~(c/o)*o)),t._pt=h=new $n(t._pt,e,n,r,c,NM),h.e=u,h.u="deg",t._props.push(n),h},Up=function(t,e){for(var n in e)t[n]=e[n];return t},QM=function(t,e,n){var r=Up({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=n.style,a,l,c,u,f,h,d,g;r.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),o[Be]=e,a=il(n,1),ks(n,Be),n.setAttribute("transform",c)):(c=getComputedStyle(n)[Be],o[Be]=e,a=il(n,1),o[Be]=c);for(l in Ar)c=r[l],u=a[l],c!==u&&s.indexOf(l)<0&&(d=bn(c),g=bn(u),f=d!==g?ss(n,l,c,g):parseFloat(c),h=parseFloat(u),t._pt=new $n(t._pt,a,l,f,h-f,Nf),t._pt.u=g||0,t._props.push(l));Up(a,r)};qn("padding,margin,Width,Radius",function(i,t){var e="Top",n="Right",r="Bottom",s="Left",o=(t<3?[e,n,r,s]:[e+s,e+n,r+n,r+s]).map(function(a){return t<2?i+a:"border"+a+i});Nc[t>1?"border"+i:i]=function(a,l,c,u,f){var h,d;if(arguments.length<4)return h=o.map(function(g){return _r(a,g,c)}),d=h.join(" "),d.split(h[0]).length===5?h[0]:d;h=(u+"").split(" "),d={},o.forEach(function(g,_){return d[g]=h[_]=h[_]||h[(_-1)/2|0]}),a.init(l,d,f)}});var c0={name:"css",register:Ff,targetTest:function(t){return t.style&&t.nodeType},init:function(t,e,n,r,s){var o=this._props,a=t.style,l=n.vars.startAt,c,u,f,h,d,g,_,m,p,M,b,v,R,C,T,D;_d||Ff(),this.styles=this.styles||n0(t),D=this.styles.props,this.tween=n;for(_ in e)if(_!=="autoRound"&&(u=e[_],!(oi[_]&&Xg(_,e,n,r,t,s)))){if(d=typeof u,g=Nc[_],d==="function"&&(u=u.call(n,r,t,s),d=typeof u),d==="string"&&~u.indexOf("random(")&&(u=Qa(u)),g)g(this,t,_,u,n)&&(T=1);else if(_.substr(0,2)==="--")c=(getComputedStyle(t).getPropertyValue(_)+"").trim(),u+="",Jr.lastIndex=0,Jr.test(c)||(m=bn(c),p=bn(u)),p?m!==p&&(c=ss(t,_,c,p)+p):m&&(u+=m),this.add(a,"setProperty",c,u,r,s,0,0,_),o.push(_),D.push(_,0,a[_]);else if(d!=="undefined"){if(l&&_ in l?(c=typeof l[_]=="function"?l[_].call(n,r,t,s):l[_],fn(c)&&~c.indexOf("random(")&&(c=Qa(c)),bn(c+"")||c==="auto"||(c+=di.units[_]||bn(_r(t,_))||""),(c+"").charAt(1)==="="&&(c=_r(t,_))):c=_r(t,_),h=parseFloat(c),M=d==="string"&&u.charAt(1)==="="&&u.substr(0,2),M&&(u=u.substr(2)),f=parseFloat(u),_ in Ki&&(_==="autoAlpha"&&(h===1&&_r(t,"visibility")==="hidden"&&f&&(h=0),D.push("visibility",0,a.visibility),Yr(this,a,"visibility",h?"inherit":"hidden",f?"inherit":"hidden",!f)),_!=="scale"&&_!=="transform"&&(_=Ki[_],~_.indexOf(",")&&(_=_.split(",")[0]))),b=_ in Ar,b){if(this.styles.save(_),d==="string"&&u.substring(0,6)==="var(--"&&(u=wi(t,u.substring(4,u.indexOf(")"))),f=parseFloat(u)),v||(R=t._gsap,R.renderTransform&&!e.parseTransform||il(t,e.parseTransform),C=e.smoothOrigin!==!1&&R.smooth,v=this._pt=new $n(this._pt,a,Be,0,1,R.renderTransform,R,0,-1),v.dep=1),_==="scale")this._pt=new $n(this._pt,R,"scaleY",R.scaleY,(M?Ro(R.scaleY,M+f):f)-R.scaleY||0,Nf),this._pt.u=0,o.push("scaleY",_),_+="X";else if(_==="transformOrigin"){D.push(jn,0,a[jn]),u=$M(u),R.svg?Bf(t,u,0,C,0,this):(p=parseFloat(u.split(" ")[2])||0,p!==R.zOrigin&&Yr(this,R,"zOrigin",R.zOrigin,p),Yr(this,a,_,Oc(c),Oc(u)));continue}else if(_==="svgOrigin"){Bf(t,u,1,C,0,this);continue}else if(_ in o0){JM(this,R,_,h,M?Ro(h,M+u):u);continue}else if(_==="smoothOrigin"){Yr(this,R,"smooth",R.smooth,u);continue}else if(_==="force3D"){R[_]=u;continue}else if(_==="transform"){QM(this,u,t);continue}}else _ in a||(_=Yo(_)||_);if(b||(f||f===0)&&(h||h===0)&&!UM.test(u)&&_ in a)m=(c+"").substr((h+"").length),f||(f=0),p=bn(u)||(_ in di.units?di.units[_]:m),m!==p&&(h=ss(t,_,c,p)),this._pt=new $n(this._pt,b?R:a,_,h,(M?Ro(h,M+f):f)-h,!b&&(p==="px"||_==="zIndex")&&e.autoRound!==!1?FM:Nf),this._pt.u=p||0,m!==p&&p!=="%"&&(this._pt.b=c,this._pt.r=OM);else if(_ in a)qM.call(this,t,_,c,M?M+u:u);else if(_ in t)this.add(t,_,c||t[_],M?M+u:u,r,s);else if(_!=="parseTransform"){od(_,u);continue}b||(_ in a?D.push(_,0,a[_]):typeof t[_]=="function"?D.push(_,2,t[_]()):D.push(_,1,c||t[_])),o.push(_)}}T&&Zg(this)},render:function(t,e){if(e.tween._time||!gd())for(var n=e._pt;n;)n.r(t,n.d),n=n._next;else e.styles.revert()},get:_r,aliases:Ki,getSetter:function(t,e,n){var r=Ki[e];return r&&r.indexOf(",")<0&&(e=r),e in Ar&&e!==jn&&(t._gsap.x||_r(t,"x"))?n&&wp===n?e==="scale"?HM:kM:(wp=n||{})&&(e==="scale"?VM:GM):t.style&&!id(t.style[e])?BM:~e.indexOf("-")?zM:pd(t,e)},core:{_removeProperty:ks,_getMatrix:xd}};Jn.utils.checkPrefix=Yo;Jn.core.getStyleSaver=n0;(function(i,t,e,n){var r=qn(i+","+t+","+e,function(s){Ar[s]=1});qn(t,function(s){di.units[s]="deg",o0[s]=1}),Ki[r[13]]=i+","+t,qn(n,function(s){var o=s.split(":");Ki[o[1]]=r[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");qn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(i){di.units[i]="px"});Jn.registerPlugin(c0);var Gn=Jn.registerPlugin(c0)||Jn;Gn.core.Tween;function tS(i,t){for(var e=0;e<t.length;e++){var n=t[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(i,n.key,n)}}function eS(i,t,e){return t&&tS(i.prototype,t),i}var mn,cc,ui,qr,$r,Lo,u0,Ss,Fa,f0,xr,Ui,h0,d0=function(){return mn||typeof window<"u"&&(mn=window.gsap)&&mn.registerPlugin&&mn},p0=1,Mo=[],oe=[],tr=[],Ba=Date.now,zf=function(t,e){return e},nS=function(){var t=Fa.core,e=t.bridge||{},n=t._scrollers,r=t._proxies;n.push.apply(n,oe),r.push.apply(r,tr),oe=n,tr=r,zf=function(o,a){return e[o](a)}},Qr=function(t,e){return~tr.indexOf(t)&&tr[tr.indexOf(t)+1][e]},za=function(t){return!!~f0.indexOf(t)},Pn=function(t,e,n,r,s){return t.addEventListener(e,n,{passive:r!==!1,capture:!!s})},Cn=function(t,e,n,r){return t.removeEventListener(e,n,!!r)},xl="scrollLeft",yl="scrollTop",kf=function(){return xr&&xr.isPressed||oe.cache++},Fc=function(t,e){var n=function r(s){if(s||s===0){p0&&(ui.history.scrollRestoration="manual");var o=xr&&xr.isPressed;s=r.v=Math.round(s)||(xr&&xr.iOS?1:0),t(s),r.cacheID=oe.cache,o&&zf("ss",s)}else(e||oe.cache!==r.cacheID||zf("ref"))&&(r.cacheID=oe.cache,r.v=t());return r.v+r.offset};return n.offset=0,t&&n},zn={s:xl,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:Fc(function(i){return arguments.length?ui.scrollTo(i,tn.sc()):ui.pageXOffset||qr[xl]||$r[xl]||Lo[xl]||0})},tn={s:yl,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:zn,sc:Fc(function(i){return arguments.length?ui.scrollTo(zn.sc(),i):ui.pageYOffset||qr[yl]||$r[yl]||Lo[yl]||0})},Xn=function(t,e){return(e&&e._ctx&&e._ctx.selector||mn.utils.toArray)(t)[0]||(typeof t=="string"&&mn.config().nullTargetWarn!==!1?console.warn("Element not found:",t):null)},iS=function(t,e){for(var n=e.length;n--;)if(e[n]===t||e[n].contains(t))return!0;return!1},os=function(t,e){var n=e.s,r=e.sc;za(t)&&(t=qr.scrollingElement||$r);var s=oe.indexOf(t),o=r===tn.sc?1:2;!~s&&(s=oe.push(t)-1),oe[s+o]||Pn(t,"scroll",kf);var a=oe[s+o],l=a||(oe[s+o]=Fc(Qr(t,n),!0)||(za(t)?r:Fc(function(c){return arguments.length?t[n]=c:t[n]})));return l.target=t,a||(l.smooth=mn.getProperty(t,"scrollBehavior")==="smooth"),l},Hf=function(t,e,n){var r=t,s=t,o=Ba(),a=o,l=e||50,c=Math.max(500,l*3),u=function(g,_){var m=Ba();_||m-o>l?(s=r,r=g,a=o,o=m):n?r+=g:r=s+(g-s)/(m-a)*(o-a)},f=function(){s=r=n?0:r,a=o=0},h=function(g){var _=a,m=s,p=Ba();return(g||g===0)&&g!==r&&u(g),o===a||p-a>c?0:(r+(n?m:-m))/((n?p:o)-_)*1e3};return{update:u,reset:f,getVelocity:h}},ca=function(t,e){return e&&!t._gsapAllow&&t.preventDefault(),t.changedTouches?t.changedTouches[0]:t},Np=function(t){var e=Math.max.apply(Math,t),n=Math.min.apply(Math,t);return Math.abs(e)>=Math.abs(n)?e:n},m0=function(){Fa=mn.core.globals().ScrollTrigger,Fa&&Fa.core&&nS()},_0=function(t){return mn=t||d0(),!cc&&mn&&typeof document<"u"&&document.body&&(ui=window,qr=document,$r=qr.documentElement,Lo=qr.body,f0=[ui,qr,$r,Lo],mn.utils.clamp,h0=mn.core.context||function(){},Ss="onpointerenter"in Lo?"pointer":"mouse",u0=Xe.isTouch=ui.matchMedia&&ui.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in ui||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,Ui=Xe.eventTypes=("ontouchstart"in $r?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in $r?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return p0=0},500),m0(),cc=1),cc};zn.op=tn;oe.cache=0;var Xe=(function(){function i(e){this.init(e)}var t=i.prototype;return t.init=function(n){cc||_0(mn)||console.warn("Please gsap.registerPlugin(Observer)"),Fa||m0();var r=n.tolerance,s=n.dragMinimum,o=n.type,a=n.target,l=n.lineHeight,c=n.debounce,u=n.preventDefault,f=n.onStop,h=n.onStopDelay,d=n.ignore,g=n.wheelSpeed,_=n.event,m=n.onDragStart,p=n.onDragEnd,M=n.onDrag,b=n.onPress,v=n.onRelease,R=n.onRight,C=n.onLeft,T=n.onUp,D=n.onDown,S=n.onChangeX,x=n.onChangeY,I=n.onChange,F=n.onToggleX,z=n.onToggleY,W=n.onHover,tt=n.onHoverEnd,G=n.onMove,K=n.ignoreCheck,H=n.isNormalizer,ct=n.onGestureStart,N=n.onGestureEnd,vt=n.onWheel,Lt=n.onEnable,qt=n.onDisable,nt=n.onClick,ht=n.scrollSpeed,yt=n.capture,dt=n.allowClicks,Pt=n.lockAxis,It=n.onLockAxis;this.target=a=Xn(a)||$r,this.vars=n,d&&(d=mn.utils.toArray(d)),r=r||1e-9,s=s||0,g=g||1,ht=ht||1,o=o||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(ui.getComputedStyle(Lo).lineHeight)||22);var kt,Zt,P,U,A,st,J,L=this,it=0,ot=0,Q=n.passive||!u&&n.passive!==!1,E=os(a,zn),y=os(a,tn),O=E(),X=y(),Y=~o.indexOf("touch")&&!~o.indexOf("pointer")&&Ui[0]==="pointerdown",$=za(a),ut=a.ownerDocument||qr,lt=[0,0,0],mt=[0,0,0],Ot=0,ft=function(){return Ot=Ba()},et=function(Ft,Qt){return(L.event=Ft)&&d&&iS(Ft.target,d)||Qt&&Y&&Ft.pointerType!=="touch"||K&&K(Ft,Qt)},bt=function(){L._vx.reset(),L._vy.reset(),Zt.pause(),f&&f(L)},Ct=function(){var Ft=L.deltaX=Np(lt),Qt=L.deltaY=Np(mt),wt=Math.abs(Ft)>=r,Yt=Math.abs(Qt)>=r;I&&(wt||Yt)&&I(L,Ft,Qt,lt,mt),wt&&(R&&L.deltaX>0&&R(L),C&&L.deltaX<0&&C(L),S&&S(L),F&&L.deltaX<0!=it<0&&F(L),it=L.deltaX,lt[0]=lt[1]=lt[2]=0),Yt&&(D&&L.deltaY>0&&D(L),T&&L.deltaY<0&&T(L),x&&x(L),z&&L.deltaY<0!=ot<0&&z(L),ot=L.deltaY,mt[0]=mt[1]=mt[2]=0),(U||P)&&(G&&G(L),P&&(m&&P===1&&m(L),M&&M(L),P=0),U=!1),st&&!(st=!1)&&It&&It(L),A&&(vt(L),A=!1),kt=0},_t=function(Ft,Qt,wt){lt[wt]+=Ft,mt[wt]+=Qt,L._vx.update(Ft),L._vy.update(Qt),c?kt||(kt=requestAnimationFrame(Ct)):Ct()},Ht=function(Ft,Qt){Pt&&!J&&(L.axis=J=Math.abs(Ft)>Math.abs(Qt)?"x":"y",st=!0),J!=="y"&&(lt[2]+=Ft,L._vx.update(Ft,!0)),J!=="x"&&(mt[2]+=Qt,L._vy.update(Qt,!0)),c?kt||(kt=requestAnimationFrame(Ct)):Ct()},Vt=function(Ft){if(!et(Ft,1)){Ft=ca(Ft,u);var Qt=Ft.clientX,wt=Ft.clientY,Yt=Qt-L.x,Bt=wt-L.y,Xt=L.isDragging;L.x=Qt,L.y=wt,(Xt||(Yt||Bt)&&(Math.abs(L.startX-Qt)>=s||Math.abs(L.startY-wt)>=s))&&(P=Xt?2:1,Xt||(L.isDragging=!0),Ht(Yt,Bt))}},ce=L.onPress=function(Rt){et(Rt,1)||Rt&&Rt.button||(L.axis=J=null,Zt.pause(),L.isPressed=!0,Rt=ca(Rt),it=ot=0,L.startX=L.x=Rt.clientX,L.startY=L.y=Rt.clientY,L._vx.reset(),L._vy.reset(),Pn(H?a:ut,Ui[1],Vt,Q,!0),L.deltaX=L.deltaY=0,b&&b(L))},B=L.onRelease=function(Rt){if(!et(Rt,1)){Cn(H?a:ut,Ui[1],Vt,!0);var Ft=!isNaN(L.y-L.startY),Qt=L.isDragging,wt=Qt&&(Math.abs(L.x-L.startX)>3||Math.abs(L.y-L.startY)>3),Yt=ca(Rt);!wt&&Ft&&(L._vx.reset(),L._vy.reset(),u&&dt&&mn.delayedCall(.08,function(){if(Ba()-Ot>300&&!Rt.defaultPrevented){if(Rt.target.click)Rt.target.click();else if(ut.createEvent){var Bt=ut.createEvent("MouseEvents");Bt.initMouseEvent("click",!0,!0,ui,1,Yt.screenX,Yt.screenY,Yt.clientX,Yt.clientY,!1,!1,!1,!1,0,null),Rt.target.dispatchEvent(Bt)}}})),L.isDragging=L.isGesturing=L.isPressed=!1,f&&Qt&&!H&&Zt.restart(!0),P&&Ct(),p&&Qt&&p(L),v&&v(L,wt)}},St=function(Ft){return Ft.touches&&Ft.touches.length>1&&(L.isGesturing=!0)&&ct(Ft,L.isDragging)},rt=function(){return(L.isGesturing=!1)||N(L)},at=function(Ft){if(!et(Ft)){var Qt=E(),wt=y();_t((Qt-O)*ht,(wt-X)*ht,1),O=Qt,X=wt,f&&Zt.restart(!0)}},Mt=function(Ft){if(!et(Ft)){Ft=ca(Ft,u),vt&&(A=!0);var Qt=(Ft.deltaMode===1?l:Ft.deltaMode===2?ui.innerHeight:1)*g;_t(Ft.deltaX*Qt,Ft.deltaY*Qt,0),f&&!H&&Zt.restart(!0)}},Et=function(Ft){if(!et(Ft)){var Qt=Ft.clientX,wt=Ft.clientY,Yt=Qt-L.x,Bt=wt-L.y;L.x=Qt,L.y=wt,U=!0,f&&Zt.restart(!0),(Yt||Bt)&&Ht(Yt,Bt)}},Gt=function(Ft){L.event=Ft,W(L)},he=function(Ft){L.event=Ft,tt(L)},ke=function(Ft){return et(Ft)||ca(Ft,u)&&nt(L)};Zt=L._dc=mn.delayedCall(h||.25,bt).pause(),L.deltaX=L.deltaY=0,L._vx=Hf(0,50,!0),L._vy=Hf(0,50,!0),L.scrollX=E,L.scrollY=y,L.isDragging=L.isGesturing=L.isPressed=!1,h0(this),L.enable=function(Rt){return L.isEnabled||(Pn($?ut:a,"scroll",kf),o.indexOf("scroll")>=0&&Pn($?ut:a,"scroll",at,Q,yt),o.indexOf("wheel")>=0&&Pn(a,"wheel",Mt,Q,yt),(o.indexOf("touch")>=0&&u0||o.indexOf("pointer")>=0)&&(Pn(a,Ui[0],ce,Q,yt),Pn(ut,Ui[2],B),Pn(ut,Ui[3],B),dt&&Pn(a,"click",ft,!0,!0),nt&&Pn(a,"click",ke),ct&&Pn(ut,"gesturestart",St),N&&Pn(ut,"gestureend",rt),W&&Pn(a,Ss+"enter",Gt),tt&&Pn(a,Ss+"leave",he),G&&Pn(a,Ss+"move",Et)),L.isEnabled=!0,L.isDragging=L.isGesturing=L.isPressed=U=P=!1,L._vx.reset(),L._vy.reset(),O=E(),X=y(),Rt&&Rt.type&&ce(Rt),Lt&&Lt(L)),L},L.disable=function(){L.isEnabled&&(Mo.filter(function(Rt){return Rt!==L&&za(Rt.target)}).length||Cn($?ut:a,"scroll",kf),L.isPressed&&(L._vx.reset(),L._vy.reset(),Cn(H?a:ut,Ui[1],Vt,!0)),Cn($?ut:a,"scroll",at,yt),Cn(a,"wheel",Mt,yt),Cn(a,Ui[0],ce,yt),Cn(ut,Ui[2],B),Cn(ut,Ui[3],B),Cn(a,"click",ft,!0),Cn(a,"click",ke),Cn(ut,"gesturestart",St),Cn(ut,"gestureend",rt),Cn(a,Ss+"enter",Gt),Cn(a,Ss+"leave",he),Cn(a,Ss+"move",Et),L.isEnabled=L.isPressed=L.isDragging=!1,qt&&qt(L))},L.kill=L.revert=function(){L.disable();var Rt=Mo.indexOf(L);Rt>=0&&Mo.splice(Rt,1),xr===L&&(xr=0)},Mo.push(L),H&&za(a)&&(xr=L),L.enable(_)},eS(i,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),i})();Xe.version="3.13.0";Xe.create=function(i){return new Xe(i)};Xe.register=_0;Xe.getAll=function(){return Mo.slice()};Xe.getById=function(i){return Mo.filter(function(t){return t.vars.id===i})[0]};d0()&&mn.registerPlugin(Xe);var Ut,go,se,Re,ai,ve,yd,Bc,rl,ka,xa,Ml,xn,su,Vf,In,Op,Fp,vo,g0,Cu,v0,Ln,Gf,x0,y0,Br,Wf,Md,Io,Sd,zc,Xf,Ru,Sl=1,yn=Date.now,Pu=yn(),Ci=0,ya=0,Bp=function(t,e,n){var r=si(t)&&(t.substr(0,6)==="clamp("||t.indexOf("max")>-1);return n["_"+e+"Clamp"]=r,r?t.substr(6,t.length-7):t},zp=function(t,e){return e&&(!si(t)||t.substr(0,6)!=="clamp(")?"clamp("+t+")":t},rS=function i(){return ya&&requestAnimationFrame(i)},kp=function(){return su=1},Hp=function(){return su=0},Xi=function(t){return t},Ma=function(t){return Math.round(t*1e5)/1e5||0},M0=function(){return typeof window<"u"},S0=function(){return Ut||M0()&&(Ut=window.gsap)&&Ut.registerPlugin&&Ut},Hs=function(t){return!!~yd.indexOf(t)},b0=function(t){return(t==="Height"?Sd:se["inner"+t])||ai["client"+t]||ve["client"+t]},E0=function(t){return Qr(t,"getBoundingClientRect")||(Hs(t)?function(){return pc.width=se.innerWidth,pc.height=Sd,pc}:function(){return vr(t)})},sS=function(t,e,n){var r=n.d,s=n.d2,o=n.a;return(o=Qr(t,"getBoundingClientRect"))?function(){return o()[r]}:function(){return(e?b0(s):t["client"+s])||0}},oS=function(t,e){return!e||~tr.indexOf(t)?E0(t):function(){return pc}},Zi=function(t,e){var n=e.s,r=e.d2,s=e.d,o=e.a;return Math.max(0,(n="scroll"+r)&&(o=Qr(t,n))?o()-E0(t)()[s]:Hs(t)?(ai[n]||ve[n])-b0(r):t[n]-t["offset"+r])},bl=function(t,e){for(var n=0;n<vo.length;n+=3)(!e||~e.indexOf(vo[n+1]))&&t(vo[n],vo[n+1],vo[n+2])},si=function(t){return typeof t=="string"},En=function(t){return typeof t=="function"},Sa=function(t){return typeof t=="number"},bs=function(t){return typeof t=="object"},ua=function(t,e,n){return t&&t.progress(e?0:1)&&n&&t.pause()},Du=function(t,e){if(t.enabled){var n=t._ctx?t._ctx.add(function(){return e(t)}):e(t);n&&n.totalTime&&(t.callbackAnimation=n)}},Qs=Math.abs,T0="left",w0="top",bd="right",Ed="bottom",Os="width",Fs="height",Ha="Right",Va="Left",Ga="Top",Wa="Bottom",qe="padding",Mi="margin",qo="Width",Td="Height",Qe="px",Si=function(t){return se.getComputedStyle(t)},aS=function(t){var e=Si(t).position;t.style.position=e==="absolute"||e==="fixed"?e:"relative"},Vp=function(t,e){for(var n in e)n in t||(t[n]=e[n]);return t},vr=function(t,e){var n=e&&Si(t)[Vf]!=="matrix(1, 0, 0, 1, 0, 0)"&&Ut.to(t,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),r=t.getBoundingClientRect();return n&&n.progress(0).kill(),r},kc=function(t,e){var n=e.d2;return t["offset"+n]||t["client"+n]||0},A0=function(t){var e=[],n=t.labels,r=t.duration(),s;for(s in n)e.push(n[s]/r);return e},lS=function(t){return function(e){return Ut.utils.snap(A0(t),e)}},wd=function(t){var e=Ut.utils.snap(t),n=Array.isArray(t)&&t.slice(0).sort(function(r,s){return r-s});return n?function(r,s,o){o===void 0&&(o=.001);var a;if(!s)return e(r);if(s>0){for(r-=o,a=0;a<n.length;a++)if(n[a]>=r)return n[a];return n[a-1]}else for(a=n.length,r+=o;a--;)if(n[a]<=r)return n[a];return n[0]}:function(r,s,o){o===void 0&&(o=.001);var a=e(r);return!s||Math.abs(a-r)<o||a-r<0==s<0?a:e(s<0?r-t:r+t)}},cS=function(t){return function(e,n){return wd(A0(t))(e,n.direction)}},El=function(t,e,n,r){return n.split(",").forEach(function(s){return t(e,s,r)})},ln=function(t,e,n,r,s){return t.addEventListener(e,n,{passive:!r,capture:!!s})},an=function(t,e,n,r){return t.removeEventListener(e,n,!!r)},Tl=function(t,e,n){n=n&&n.wheelHandler,n&&(t(e,"wheel",n),t(e,"touchmove",n))},Gp={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},wl={toggleActions:"play",anticipatePin:0},Hc={top:0,left:0,center:.5,bottom:1,right:1},uc=function(t,e){if(si(t)){var n=t.indexOf("="),r=~n?+(t.charAt(n-1)+1)*parseFloat(t.substr(n+1)):0;~n&&(t.indexOf("%")>n&&(r*=e/100),t=t.substr(0,n-1)),t=r+(t in Hc?Hc[t]*e:~t.indexOf("%")?parseFloat(t)*e/100:parseFloat(t)||0)}return t},Al=function(t,e,n,r,s,o,a,l){var c=s.startColor,u=s.endColor,f=s.fontSize,h=s.indent,d=s.fontWeight,g=Re.createElement("div"),_=Hs(n)||Qr(n,"pinType")==="fixed",m=t.indexOf("scroller")!==-1,p=_?ve:n,M=t.indexOf("start")!==-1,b=M?c:u,v="border-color:"+b+";font-size:"+f+";color:"+b+";font-weight:"+d+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return v+="position:"+((m||l)&&_?"fixed;":"absolute;"),(m||l||!_)&&(v+=(r===tn?bd:Ed)+":"+(o+parseFloat(h))+"px;"),a&&(v+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),g._isStart=M,g.setAttribute("class","gsap-marker-"+t+(e?" marker-"+e:"")),g.style.cssText=v,g.innerText=e||e===0?t+"-"+e:t,p.children[0]?p.insertBefore(g,p.children[0]):p.appendChild(g),g._offset=g["offset"+r.op.d2],fc(g,0,r,M),g},fc=function(t,e,n,r){var s={display:"block"},o=n[r?"os2":"p2"],a=n[r?"p2":"os2"];t._isFlipped=r,s[n.a+"Percent"]=r?-100:0,s[n.a]=r?"1px":0,s["border"+o+qo]=1,s["border"+a+qo]=0,s[n.p]=e+"px",Ut.set(t,s)},ie=[],Yf={},sl,Wp=function(){return yn()-Ci>34&&(sl||(sl=requestAnimationFrame(Sr)))},to=function(){(!Ln||!Ln.isPressed||Ln.startX>ve.clientWidth)&&(oe.cache++,Ln?sl||(sl=requestAnimationFrame(Sr)):Sr(),Ci||Gs("scrollStart"),Ci=yn())},Lu=function(){y0=se.innerWidth,x0=se.innerHeight},ba=function(t){oe.cache++,(t===!0||!xn&&!v0&&!Re.fullscreenElement&&!Re.webkitFullscreenElement&&(!Gf||y0!==se.innerWidth||Math.abs(se.innerHeight-x0)>se.innerHeight*.25))&&Bc.restart(!0)},Vs={},uS=[],C0=function i(){return an(le,"scrollEnd",i)||Cs(!0)},Gs=function(t){return Vs[t]&&Vs[t].map(function(e){return e()})||uS},ri=[],R0=function(t){for(var e=0;e<ri.length;e+=5)(!t||ri[e+4]&&ri[e+4].query===t)&&(ri[e].style.cssText=ri[e+1],ri[e].getBBox&&ri[e].setAttribute("transform",ri[e+2]||""),ri[e+3].uncache=1)},Ad=function(t,e){var n;for(In=0;In<ie.length;In++)n=ie[In],n&&(!e||n._ctx===e)&&(t?n.kill(1):n.revert(!0,!0));zc=!0,e&&R0(e),e||Gs("revert")},P0=function(t,e){oe.cache++,(e||!Un)&&oe.forEach(function(n){return En(n)&&n.cacheID++&&(n.rec=0)}),si(t)&&(se.history.scrollRestoration=Md=t)},Un,Bs=0,Xp,fS=function(){if(Xp!==Bs){var t=Xp=Bs;requestAnimationFrame(function(){return t===Bs&&Cs(!0)})}},D0=function(){ve.appendChild(Io),Sd=!Ln&&Io.offsetHeight||se.innerHeight,ve.removeChild(Io)},Yp=function(t){return rl(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(e){return e.style.display=t?"none":"block"})},Cs=function(t,e){if(ai=Re.documentElement,ve=Re.body,yd=[se,Re,ai,ve],Ci&&!t&&!zc){ln(le,"scrollEnd",C0);return}D0(),Un=le.isRefreshing=!0,oe.forEach(function(r){return En(r)&&++r.cacheID&&(r.rec=r())});var n=Gs("refreshInit");g0&&le.sort(),e||Ad(),oe.forEach(function(r){En(r)&&(r.smooth&&(r.target.style.scrollBehavior="auto"),r(0))}),ie.slice(0).forEach(function(r){return r.refresh()}),zc=!1,ie.forEach(function(r){if(r._subPinOffset&&r.pin){var s=r.vars.horizontal?"offsetWidth":"offsetHeight",o=r.pin[s];r.revert(!0,1),r.adjustPinSpacing(r.pin[s]-o),r.refresh()}}),Xf=1,Yp(!0),ie.forEach(function(r){var s=Zi(r.scroller,r._dir),o=r.vars.end==="max"||r._endClamp&&r.end>s,a=r._startClamp&&r.start>=s;(o||a)&&r.setPositions(a?s-1:r.start,o?Math.max(a?s:r.start+1,s):r.end,!0)}),Yp(!1),Xf=0,n.forEach(function(r){return r&&r.render&&r.render(-1)}),oe.forEach(function(r){En(r)&&(r.smooth&&requestAnimationFrame(function(){return r.target.style.scrollBehavior="smooth"}),r.rec&&r(r.rec))}),P0(Md,1),Bc.pause(),Bs++,Un=2,Sr(2),ie.forEach(function(r){return En(r.vars.onRefresh)&&r.vars.onRefresh(r)}),Un=le.isRefreshing=!1,Gs("refresh")},qf=0,hc=1,Xa,Sr=function(t){if(t===2||!Un&&!zc){le.isUpdating=!0,Xa&&Xa.update(0);var e=ie.length,n=yn(),r=n-Pu>=50,s=e&&ie[0].scroll();if(hc=qf>s?-1:1,Un||(qf=s),r&&(Ci&&!su&&n-Ci>200&&(Ci=0,Gs("scrollEnd")),xa=Pu,Pu=n),hc<0){for(In=e;In-- >0;)ie[In]&&ie[In].update(0,r);hc=1}else for(In=0;In<e;In++)ie[In]&&ie[In].update(0,r);le.isUpdating=!1}sl=0},$f=[T0,w0,Ed,bd,Mi+Wa,Mi+Ha,Mi+Ga,Mi+Va,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],dc=$f.concat([Os,Fs,"boxSizing","max"+qo,"max"+Td,"position",Mi,qe,qe+Ga,qe+Ha,qe+Wa,qe+Va]),hS=function(t,e,n){Uo(n);var r=t._gsap;if(r.spacerIsNative)Uo(r.spacerState);else if(t._gsap.swappedIn){var s=e.parentNode;s&&(s.insertBefore(t,e),s.removeChild(e))}t._gsap.swappedIn=!1},Iu=function(t,e,n,r){if(!t._gsap.swappedIn){for(var s=$f.length,o=e.style,a=t.style,l;s--;)l=$f[s],o[l]=n[l];o.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(o.display="inline-block"),a[Ed]=a[bd]="auto",o.flexBasis=n.flexBasis||"auto",o.overflow="visible",o.boxSizing="border-box",o[Os]=kc(t,zn)+Qe,o[Fs]=kc(t,tn)+Qe,o[qe]=a[Mi]=a[w0]=a[T0]="0",Uo(r),a[Os]=a["max"+qo]=n[Os],a[Fs]=a["max"+Td]=n[Fs],a[qe]=n[qe],t.parentNode!==e&&(t.parentNode.insertBefore(e,t),e.appendChild(t)),t._gsap.swappedIn=!0}},dS=/([A-Z])/g,Uo=function(t){if(t){var e=t.t.style,n=t.length,r=0,s,o;for((t.t._gsap||Ut.core.getCache(t.t)).uncache=1;r<n;r+=2)o=t[r+1],s=t[r],o?e[s]=o:e[s]&&e.removeProperty(s.replace(dS,"-$1").toLowerCase())}},Cl=function(t){for(var e=dc.length,n=t.style,r=[],s=0;s<e;s++)r.push(dc[s],n[dc[s]]);return r.t=t,r},pS=function(t,e,n){for(var r=[],s=t.length,o=n?8:0,a;o<s;o+=2)a=t[o],r.push(a,a in e?e[a]:t[o+1]);return r.t=t.t,r},pc={left:0,top:0},qp=function(t,e,n,r,s,o,a,l,c,u,f,h,d,g){En(t)&&(t=t(l)),si(t)&&t.substr(0,3)==="max"&&(t=h+(t.charAt(4)==="="?uc("0"+t.substr(3),n):0));var _=d?d.time():0,m,p,M;if(d&&d.seek(0),isNaN(t)||(t=+t),Sa(t))d&&(t=Ut.utils.mapRange(d.scrollTrigger.start,d.scrollTrigger.end,0,h,t)),a&&fc(a,n,r,!0);else{En(e)&&(e=e(l));var b=(t||"0").split(" "),v,R,C,T;M=Xn(e,l)||ve,v=vr(M)||{},(!v||!v.left&&!v.top)&&Si(M).display==="none"&&(T=M.style.display,M.style.display="block",v=vr(M),T?M.style.display=T:M.style.removeProperty("display")),R=uc(b[0],v[r.d]),C=uc(b[1]||"0",n),t=v[r.p]-c[r.p]-u+R+s-C,a&&fc(a,C,r,n-C<20||a._isStart&&C>20),n-=n-C}if(g&&(l[g]=t||-.001,t<0&&(t=0)),o){var D=t+n,S=o._isStart;m="scroll"+r.d2,fc(o,D,r,S&&D>20||!S&&(f?Math.max(ve[m],ai[m]):o.parentNode[m])<=D+1),f&&(c=vr(a),f&&(o.style[r.op.p]=c[r.op.p]-r.op.m-o._offset+Qe))}return d&&M&&(m=vr(M),d.seek(h),p=vr(M),d._caScrollDist=m[r.p]-p[r.p],t=t/d._caScrollDist*h),d&&d.seek(_),d?t:Math.round(t)},mS=/(webkit|moz|length|cssText|inset)/i,$p=function(t,e,n,r){if(t.parentNode!==e){var s=t.style,o,a;if(e===ve){t._stOrig=s.cssText,a=Si(t);for(o in a)!+o&&!mS.test(o)&&a[o]&&typeof s[o]=="string"&&o!=="0"&&(s[o]=a[o]);s.top=n,s.left=r}else s.cssText=t._stOrig;Ut.core.getCache(t).uncache=1,e.appendChild(t)}},L0=function(t,e,n){var r=e,s=r;return function(o){var a=Math.round(t());return a!==r&&a!==s&&Math.abs(a-r)>3&&Math.abs(a-s)>3&&(o=a,n&&n()),s=r,r=Math.round(o),r}},Rl=function(t,e,n){var r={};r[e.p]="+="+n,Ut.set(t,r)},jp=function(t,e){var n=os(t,e),r="_scroll"+e.p2,s=function o(a,l,c,u,f){var h=o.tween,d=l.onComplete,g={};c=c||n();var _=L0(n,c,function(){h.kill(),o.tween=0});return f=u&&f||0,u=u||a-c,h&&h.kill(),l[r]=a,l.inherit=!1,l.modifiers=g,g[r]=function(){return _(c+u*h.ratio+f*h.ratio*h.ratio)},l.onUpdate=function(){oe.cache++,o.tween&&Sr()},l.onComplete=function(){o.tween=0,d&&d.call(h)},h=o.tween=Ut.to(t,l),h};return t[r]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},ln(t,"wheel",n.wheelHandler),le.isTouch&&ln(t,"touchmove",n.wheelHandler),s},le=(function(){function i(e,n){go||i.register(Ut)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),Wf(this),this.init(e,n)}var t=i.prototype;return t.init=function(n,r){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!ya){this.update=this.refresh=this.kill=Xi;return}n=Vp(si(n)||Sa(n)||n.nodeType?{trigger:n}:n,wl);var s=n,o=s.onUpdate,a=s.toggleClass,l=s.id,c=s.onToggle,u=s.onRefresh,f=s.scrub,h=s.trigger,d=s.pin,g=s.pinSpacing,_=s.invalidateOnRefresh,m=s.anticipatePin,p=s.onScrubComplete,M=s.onSnapComplete,b=s.once,v=s.snap,R=s.pinReparent,C=s.pinSpacer,T=s.containerAnimation,D=s.fastScrollEnd,S=s.preventOverlaps,x=n.horizontal||n.containerAnimation&&n.horizontal!==!1?zn:tn,I=!f&&f!==0,F=Xn(n.scroller||se),z=Ut.core.getCache(F),W=Hs(F),tt=("pinType"in n?n.pinType:Qr(F,"pinType")||W&&"fixed")==="fixed",G=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],K=I&&n.toggleActions.split(" "),H="markers"in n?n.markers:wl.markers,ct=W?0:parseFloat(Si(F)["border"+x.p2+qo])||0,N=this,vt=n.onRefreshInit&&function(){return n.onRefreshInit(N)},Lt=sS(F,W,x),qt=oS(F,W),nt=0,ht=0,yt=0,dt=os(F,x),Pt,It,kt,Zt,P,U,A,st,J,L,it,ot,Q,E,y,O,X,Y,$,ut,lt,mt,Ot,ft,et,bt,Ct,_t,Ht,Vt,ce,B,St,rt,at,Mt,Et,Gt,he;if(N._startClamp=N._endClamp=!1,N._dir=x,m*=45,N.scroller=F,N.scroll=T?T.time.bind(T):dt,Zt=dt(),N.vars=n,r=r||n.animation,"refreshPriority"in n&&(g0=1,n.refreshPriority===-9999&&(Xa=N)),z.tweenScroll=z.tweenScroll||{top:jp(F,tn),left:jp(F,zn)},N.tweenTo=Pt=z.tweenScroll[x.p],N.scrubDuration=function(wt){St=Sa(wt)&&wt,St?B?B.duration(wt):B=Ut.to(r,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:St,paused:!0,onComplete:function(){return p&&p(N)}}):(B&&B.progress(1).kill(),B=0)},r&&(r.vars.lazy=!1,r._initted&&!N.isReverted||r.vars.immediateRender!==!1&&n.immediateRender!==!1&&r.duration()&&r.render(0,!0,!0),N.animation=r.pause(),r.scrollTrigger=N,N.scrubDuration(f),Vt=0,l||(l=r.vars.id)),v&&((!bs(v)||v.push)&&(v={snapTo:v}),"scrollBehavior"in ve.style&&Ut.set(W?[ve,ai]:F,{scrollBehavior:"auto"}),oe.forEach(function(wt){return En(wt)&&wt.target===(W?Re.scrollingElement||ai:F)&&(wt.smooth=!1)}),kt=En(v.snapTo)?v.snapTo:v.snapTo==="labels"?lS(r):v.snapTo==="labelsDirectional"?cS(r):v.directional!==!1?function(wt,Yt){return wd(v.snapTo)(wt,yn()-ht<500?0:Yt.direction)}:Ut.utils.snap(v.snapTo),rt=v.duration||{min:.1,max:2},rt=bs(rt)?ka(rt.min,rt.max):ka(rt,rt),at=Ut.delayedCall(v.delay||St/2||.1,function(){var wt=dt(),Yt=yn()-ht<500,Bt=Pt.tween;if((Yt||Math.abs(N.getVelocity())<10)&&!Bt&&!su&&nt!==wt){var Xt=(wt-U)/E,Ge=r&&!I?r.totalProgress():Xt,re=Yt?0:(Ge-ce)/(yn()-xa)*1e3||0,Ce=Ut.utils.clamp(-Xt,1-Xt,Qs(re/2)*re/.185),Ze=Xt+(v.inertia===!1?0:Ce),Ee,Te,pe=v,Qn=pe.onStart,Le=pe.onInterrupt,An=pe.onComplete;if(Ee=kt(Ze,N),Sa(Ee)||(Ee=Ze),Te=Math.max(0,Math.round(U+Ee*E)),wt<=A&&wt>=U&&Te!==wt){if(Bt&&!Bt._initted&&Bt.data<=Qs(Te-wt))return;v.inertia===!1&&(Ce=Ee-Xt),Pt(Te,{duration:rt(Qs(Math.max(Qs(Ze-Ge),Qs(Ee-Ge))*.185/re/.05||0)),ease:v.ease||"power3",data:Qs(Te-wt),onInterrupt:function(){return at.restart(!0)&&Le&&Le(N)},onComplete:function(){N.update(),nt=dt(),r&&!I&&(B?B.resetTo("totalProgress",Ee,r._tTime/r._tDur):r.progress(Ee)),Vt=ce=r&&!I?r.totalProgress():N.progress,M&&M(N),An&&An(N)}},wt,Ce*E,Te-wt-Ce*E),Qn&&Qn(N,Pt.tween)}}else N.isActive&&nt!==wt&&at.restart(!0)}).pause()),l&&(Yf[l]=N),h=N.trigger=Xn(h||d!==!0&&d),he=h&&h._gsap&&h._gsap.stRevert,he&&(he=he(N)),d=d===!0?h:Xn(d),si(a)&&(a={targets:h,className:a}),d&&(g===!1||g===Mi||(g=!g&&d.parentNode&&d.parentNode.style&&Si(d.parentNode).display==="flex"?!1:qe),N.pin=d,It=Ut.core.getCache(d),It.spacer?y=It.pinState:(C&&(C=Xn(C),C&&!C.nodeType&&(C=C.current||C.nativeElement),It.spacerIsNative=!!C,C&&(It.spacerState=Cl(C))),It.spacer=Y=C||Re.createElement("div"),Y.classList.add("pin-spacer"),l&&Y.classList.add("pin-spacer-"+l),It.pinState=y=Cl(d)),n.force3D!==!1&&Ut.set(d,{force3D:!0}),N.spacer=Y=It.spacer,Ht=Si(d),ft=Ht[g+x.os2],ut=Ut.getProperty(d),lt=Ut.quickSetter(d,x.a,Qe),Iu(d,Y,Ht),X=Cl(d)),H){ot=bs(H)?Vp(H,Gp):Gp,L=Al("scroller-start",l,F,x,ot,0),it=Al("scroller-end",l,F,x,ot,0,L),$=L["offset"+x.op.d2];var ke=Xn(Qr(F,"content")||F);st=this.markerStart=Al("start",l,ke,x,ot,$,0,T),J=this.markerEnd=Al("end",l,ke,x,ot,$,0,T),T&&(Gt=Ut.quickSetter([st,J],x.a,Qe)),!tt&&!(tr.length&&Qr(F,"fixedMarkers")===!0)&&(aS(W?ve:F),Ut.set([L,it],{force3D:!0}),bt=Ut.quickSetter(L,x.a,Qe),_t=Ut.quickSetter(it,x.a,Qe))}if(T){var Rt=T.vars.onUpdate,Ft=T.vars.onUpdateParams;T.eventCallback("onUpdate",function(){N.update(0,0,1),Rt&&Rt.apply(T,Ft||[])})}if(N.previous=function(){return ie[ie.indexOf(N)-1]},N.next=function(){return ie[ie.indexOf(N)+1]},N.revert=function(wt,Yt){if(!Yt)return N.kill(!0);var Bt=wt!==!1||!N.enabled,Xt=xn;Bt!==N.isReverted&&(Bt&&(Mt=Math.max(dt(),N.scroll.rec||0),yt=N.progress,Et=r&&r.progress()),st&&[st,J,L,it].forEach(function(Ge){return Ge.style.display=Bt?"none":"block"}),Bt&&(xn=N,N.update(Bt)),d&&(!R||!N.isActive)&&(Bt?hS(d,Y,y):Iu(d,Y,Si(d),et)),Bt||N.update(Bt),xn=Xt,N.isReverted=Bt)},N.refresh=function(wt,Yt,Bt,Xt){if(!((xn||!N.enabled)&&!Yt)){if(d&&wt&&Ci){ln(i,"scrollEnd",C0);return}!Un&&vt&&vt(N),xn=N,Pt.tween&&!Bt&&(Pt.tween.kill(),Pt.tween=0),B&&B.pause(),_&&r&&(r.revert({kill:!1}).invalidate(),r.getChildren&&r.getChildren(!0,!0,!1).forEach(function(Oe){return Oe.vars.immediateRender&&Oe.render(0,!0,!0)})),N.isReverted||N.revert(!0,!0),N._subPinOffset=!1;var Ge=Lt(),re=qt(),Ce=T?T.duration():Zi(F,x),Ze=E<=.01||!E,Ee=0,Te=Xt||0,pe=bs(Bt)?Bt.end:n.end,Qn=n.endTrigger||h,Le=bs(Bt)?Bt.start:n.start||(n.start===0||!h?0:d?"0 0":"0 100%"),An=N.pinnedContainer=n.pinnedContainer&&Xn(n.pinnedContainer,N),w=h&&Math.max(0,ie.indexOf(N))||0,k=w,q,j,V,gt,xt,Tt,Dt,Wt,$t,Nt,jt,de,me;for(H&&bs(Bt)&&(de=Ut.getProperty(L,x.p),me=Ut.getProperty(it,x.p));k-- >0;)Tt=ie[k],Tt.end||Tt.refresh(0,1)||(xn=N),Dt=Tt.pin,Dt&&(Dt===h||Dt===d||Dt===An)&&!Tt.isReverted&&(Nt||(Nt=[]),Nt.unshift(Tt),Tt.revert(!0,!0)),Tt!==ie[k]&&(w--,k--);for(En(Le)&&(Le=Le(N)),Le=Bp(Le,"start",N),U=qp(Le,h,Ge,x,dt(),st,L,N,re,ct,tt,Ce,T,N._startClamp&&"_startClamp")||(d?-.001:0),En(pe)&&(pe=pe(N)),si(pe)&&!pe.indexOf("+=")&&(~pe.indexOf(" ")?pe=(si(Le)?Le.split(" ")[0]:"")+pe:(Ee=uc(pe.substr(2),Ge),pe=si(Le)?Le:(T?Ut.utils.mapRange(0,T.duration(),T.scrollTrigger.start,T.scrollTrigger.end,U):U)+Ee,Qn=h)),pe=Bp(pe,"end",N),A=Math.max(U,qp(pe||(Qn?"100% 0":Ce),Qn,Ge,x,dt()+Ee,J,it,N,re,ct,tt,Ce,T,N._endClamp&&"_endClamp"))||-.001,Ee=0,k=w;k--;)Tt=ie[k],Dt=Tt.pin,Dt&&Tt.start-Tt._pinPush<=U&&!T&&Tt.end>0&&(q=Tt.end-(N._startClamp?Math.max(0,Tt.start):Tt.start),(Dt===h&&Tt.start-Tt._pinPush<U||Dt===An)&&isNaN(Le)&&(Ee+=q*(1-Tt.progress)),Dt===d&&(Te+=q));if(U+=Ee,A+=Ee,N._startClamp&&(N._startClamp+=Ee),N._endClamp&&!Un&&(N._endClamp=A||-.001,A=Math.min(A,Zi(F,x))),E=A-U||(U-=.01)&&.001,Ze&&(yt=Ut.utils.clamp(0,1,Ut.utils.normalize(U,A,Mt))),N._pinPush=Te,st&&Ee&&(q={},q[x.a]="+="+Ee,An&&(q[x.p]="-="+dt()),Ut.set([st,J],q)),d&&!(Xf&&N.end>=Zi(F,x)))q=Si(d),gt=x===tn,V=dt(),mt=parseFloat(ut(x.a))+Te,!Ce&&A>1&&(jt=(W?Re.scrollingElement||ai:F).style,jt={style:jt,value:jt["overflow"+x.a.toUpperCase()]},W&&Si(ve)["overflow"+x.a.toUpperCase()]!=="scroll"&&(jt.style["overflow"+x.a.toUpperCase()]="scroll")),Iu(d,Y,q),X=Cl(d),j=vr(d,!0),Wt=tt&&os(F,gt?zn:tn)(),g?(et=[g+x.os2,E+Te+Qe],et.t=Y,k=g===qe?kc(d,x)+E+Te:0,k&&(et.push(x.d,k+Qe),Y.style.flexBasis!=="auto"&&(Y.style.flexBasis=k+Qe)),Uo(et),An&&ie.forEach(function(Oe){Oe.pin===An&&Oe.vars.pinSpacing!==!1&&(Oe._subPinOffset=!0)}),tt&&dt(Mt)):(k=kc(d,x),k&&Y.style.flexBasis!=="auto"&&(Y.style.flexBasis=k+Qe)),tt&&(xt={top:j.top+(gt?V-U:Wt)+Qe,left:j.left+(gt?Wt:V-U)+Qe,boxSizing:"border-box",position:"fixed"},xt[Os]=xt["max"+qo]=Math.ceil(j.width)+Qe,xt[Fs]=xt["max"+Td]=Math.ceil(j.height)+Qe,xt[Mi]=xt[Mi+Ga]=xt[Mi+Ha]=xt[Mi+Wa]=xt[Mi+Va]="0",xt[qe]=q[qe],xt[qe+Ga]=q[qe+Ga],xt[qe+Ha]=q[qe+Ha],xt[qe+Wa]=q[qe+Wa],xt[qe+Va]=q[qe+Va],O=pS(y,xt,R),Un&&dt(0)),r?($t=r._initted,Cu(1),r.render(r.duration(),!0,!0),Ot=ut(x.a)-mt+E+Te,Ct=Math.abs(E-Ot)>1,tt&&Ct&&O.splice(O.length-2,2),r.render(0,!0,!0),$t||r.invalidate(!0),r.parent||r.totalTime(r.totalTime()),Cu(0)):Ot=E,jt&&(jt.value?jt.style["overflow"+x.a.toUpperCase()]=jt.value:jt.style.removeProperty("overflow-"+x.a));else if(h&&dt()&&!T)for(j=h.parentNode;j&&j!==ve;)j._pinOffset&&(U-=j._pinOffset,A-=j._pinOffset),j=j.parentNode;Nt&&Nt.forEach(function(Oe){return Oe.revert(!1,!0)}),N.start=U,N.end=A,Zt=P=Un?Mt:dt(),!T&&!Un&&(Zt<Mt&&dt(Mt),N.scroll.rec=0),N.revert(!1,!0),ht=yn(),at&&(nt=-1,at.restart(!0)),xn=0,r&&I&&(r._initted||Et)&&r.progress()!==Et&&r.progress(Et||0,!0).render(r.time(),!0,!0),(Ze||yt!==N.progress||T||_||r&&!r._initted)&&(r&&!I&&(r._initted||yt||r.vars.immediateRender!==!1)&&r.totalProgress(T&&U<-.001&&!yt?Ut.utils.normalize(U,A,0):yt,!0),N.progress=Ze||(Zt-U)/E===yt?0:yt),d&&g&&(Y._pinOffset=Math.round(N.progress*Ot)),B&&B.invalidate(),isNaN(de)||(de-=Ut.getProperty(L,x.p),me-=Ut.getProperty(it,x.p),Rl(L,x,de),Rl(st,x,de-(Xt||0)),Rl(it,x,me),Rl(J,x,me-(Xt||0))),Ze&&!Un&&N.update(),u&&!Un&&!Q&&(Q=!0,u(N),Q=!1)}},N.getVelocity=function(){return(dt()-P)/(yn()-xa)*1e3||0},N.endAnimation=function(){ua(N.callbackAnimation),r&&(B?B.progress(1):r.paused()?I||ua(r,N.direction<0,1):ua(r,r.reversed()))},N.labelToScroll=function(wt){return r&&r.labels&&(U||N.refresh()||U)+r.labels[wt]/r.duration()*E||0},N.getTrailing=function(wt){var Yt=ie.indexOf(N),Bt=N.direction>0?ie.slice(0,Yt).reverse():ie.slice(Yt+1);return(si(wt)?Bt.filter(function(Xt){return Xt.vars.preventOverlaps===wt}):Bt).filter(function(Xt){return N.direction>0?Xt.end<=U:Xt.start>=A})},N.update=function(wt,Yt,Bt){if(!(T&&!Bt&&!wt)){var Xt=Un===!0?Mt:N.scroll(),Ge=wt?0:(Xt-U)/E,re=Ge<0?0:Ge>1?1:Ge||0,Ce=N.progress,Ze,Ee,Te,pe,Qn,Le,An,w;if(Yt&&(P=Zt,Zt=T?dt():Xt,v&&(ce=Vt,Vt=r&&!I?r.totalProgress():re)),m&&d&&!xn&&!Sl&&Ci&&(!re&&U<Xt+(Xt-P)/(yn()-xa)*m?re=1e-4:re===1&&A>Xt+(Xt-P)/(yn()-xa)*m&&(re=.9999)),re!==Ce&&N.enabled){if(Ze=N.isActive=!!re&&re<1,Ee=!!Ce&&Ce<1,Le=Ze!==Ee,Qn=Le||!!re!=!!Ce,N.direction=re>Ce?1:-1,N.progress=re,Qn&&!xn&&(Te=re&&!Ce?0:re===1?1:Ce===1?2:3,I&&(pe=!Le&&K[Te+1]!=="none"&&K[Te+1]||K[Te],w=r&&(pe==="complete"||pe==="reset"||pe in r))),S&&(Le||w)&&(w||f||!r)&&(En(S)?S(N):N.getTrailing(S).forEach(function(V){return V.endAnimation()})),I||(B&&!xn&&!Sl?(B._dp._time-B._start!==B._time&&B.render(B._dp._time-B._start),B.resetTo?B.resetTo("totalProgress",re,r._tTime/r._tDur):(B.vars.totalProgress=re,B.invalidate().restart())):r&&r.totalProgress(re,!!(xn&&(ht||wt)))),d){if(wt&&g&&(Y.style[g+x.os2]=ft),!tt)lt(Ma(mt+Ot*re));else if(Qn){if(An=!wt&&re>Ce&&A+1>Xt&&Xt+1>=Zi(F,x),R)if(!wt&&(Ze||An)){var k=vr(d,!0),q=Xt-U;$p(d,ve,k.top+(x===tn?q:0)+Qe,k.left+(x===tn?0:q)+Qe)}else $p(d,Y);Uo(Ze||An?O:X),Ct&&re<1&&Ze||lt(mt+(re===1&&!An?Ot:0))}}v&&!Pt.tween&&!xn&&!Sl&&at.restart(!0),a&&(Le||b&&re&&(re<1||!Ru))&&rl(a.targets).forEach(function(V){return V.classList[Ze||b?"add":"remove"](a.className)}),o&&!I&&!wt&&o(N),Qn&&!xn?(I&&(w&&(pe==="complete"?r.pause().totalProgress(1):pe==="reset"?r.restart(!0).pause():pe==="restart"?r.restart(!0):r[pe]()),o&&o(N)),(Le||!Ru)&&(c&&Le&&Du(N,c),G[Te]&&Du(N,G[Te]),b&&(re===1?N.kill(!1,1):G[Te]=0),Le||(Te=re===1?1:3,G[Te]&&Du(N,G[Te]))),D&&!Ze&&Math.abs(N.getVelocity())>(Sa(D)?D:2500)&&(ua(N.callbackAnimation),B?B.progress(1):ua(r,pe==="reverse"?1:!re,1))):I&&o&&!xn&&o(N)}if(_t){var j=T?Xt/T.duration()*(T._caScrollDist||0):Xt;bt(j+(L._isFlipped?1:0)),_t(j)}Gt&&Gt(-Xt/T.duration()*(T._caScrollDist||0))}},N.enable=function(wt,Yt){N.enabled||(N.enabled=!0,ln(F,"resize",ba),W||ln(F,"scroll",to),vt&&ln(i,"refreshInit",vt),wt!==!1&&(N.progress=yt=0,Zt=P=nt=dt()),Yt!==!1&&N.refresh())},N.getTween=function(wt){return wt&&Pt?Pt.tween:B},N.setPositions=function(wt,Yt,Bt,Xt){if(T){var Ge=T.scrollTrigger,re=T.duration(),Ce=Ge.end-Ge.start;wt=Ge.start+Ce*wt/re,Yt=Ge.start+Ce*Yt/re}N.refresh(!1,!1,{start:zp(wt,Bt&&!!N._startClamp),end:zp(Yt,Bt&&!!N._endClamp)},Xt),N.update()},N.adjustPinSpacing=function(wt){if(et&&wt){var Yt=et.indexOf(x.d)+1;et[Yt]=parseFloat(et[Yt])+wt+Qe,et[1]=parseFloat(et[1])+wt+Qe,Uo(et)}},N.disable=function(wt,Yt){if(N.enabled&&(wt!==!1&&N.revert(!0,!0),N.enabled=N.isActive=!1,Yt||B&&B.pause(),Mt=0,It&&(It.uncache=1),vt&&an(i,"refreshInit",vt),at&&(at.pause(),Pt.tween&&Pt.tween.kill()&&(Pt.tween=0)),!W)){for(var Bt=ie.length;Bt--;)if(ie[Bt].scroller===F&&ie[Bt]!==N)return;an(F,"resize",ba),W||an(F,"scroll",to)}},N.kill=function(wt,Yt){N.disable(wt,Yt),B&&!Yt&&B.kill(),l&&delete Yf[l];var Bt=ie.indexOf(N);Bt>=0&&ie.splice(Bt,1),Bt===In&&hc>0&&In--,Bt=0,ie.forEach(function(Xt){return Xt.scroller===N.scroller&&(Bt=1)}),Bt||Un||(N.scroll.rec=0),r&&(r.scrollTrigger=null,wt&&r.revert({kill:!1}),Yt||r.kill()),st&&[st,J,L,it].forEach(function(Xt){return Xt.parentNode&&Xt.parentNode.removeChild(Xt)}),Xa===N&&(Xa=0),d&&(It&&(It.uncache=1),Bt=0,ie.forEach(function(Xt){return Xt.pin===d&&Bt++}),Bt||(It.spacer=0)),n.onKill&&n.onKill(N)},ie.push(N),N.enable(!1,!1),he&&he(N),r&&r.add&&!E){var Qt=N.update;N.update=function(){N.update=Qt,oe.cache++,U||A||N.refresh()},Ut.delayedCall(.01,N.update),E=.01,U=A=0}else N.refresh();d&&fS()},i.register=function(n){return go||(Ut=n||S0(),M0()&&window.document&&i.enable(),go=ya),go},i.defaults=function(n){if(n)for(var r in n)wl[r]=n[r];return wl},i.disable=function(n,r){ya=0,ie.forEach(function(o){return o[r?"kill":"disable"](n)}),an(se,"wheel",to),an(Re,"scroll",to),clearInterval(Ml),an(Re,"touchcancel",Xi),an(ve,"touchstart",Xi),El(an,Re,"pointerdown,touchstart,mousedown",kp),El(an,Re,"pointerup,touchend,mouseup",Hp),Bc.kill(),bl(an);for(var s=0;s<oe.length;s+=3)Tl(an,oe[s],oe[s+1]),Tl(an,oe[s],oe[s+2])},i.enable=function(){if(se=window,Re=document,ai=Re.documentElement,ve=Re.body,Ut&&(rl=Ut.utils.toArray,ka=Ut.utils.clamp,Wf=Ut.core.context||Xi,Cu=Ut.core.suppressOverwrites||Xi,Md=se.history.scrollRestoration||"auto",qf=se.pageYOffset||0,Ut.core.globals("ScrollTrigger",i),ve)){ya=1,Io=document.createElement("div"),Io.style.height="100vh",Io.style.position="absolute",D0(),rS(),Xe.register(Ut),i.isTouch=Xe.isTouch,Br=Xe.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),Gf=Xe.isTouch===1,ln(se,"wheel",to),yd=[se,Re,ai,ve],Ut.matchMedia?(i.matchMedia=function(c){var u=Ut.matchMedia(),f;for(f in c)u.add(f,c[f]);return u},Ut.addEventListener("matchMediaInit",function(){return Ad()}),Ut.addEventListener("matchMediaRevert",function(){return R0()}),Ut.addEventListener("matchMedia",function(){Cs(0,1),Gs("matchMedia")}),Ut.matchMedia().add("(orientation: portrait)",function(){return Lu(),Lu})):console.warn("Requires GSAP 3.11.0 or later"),Lu(),ln(Re,"scroll",to);var n=ve.hasAttribute("style"),r=ve.style,s=r.borderTopStyle,o=Ut.core.Animation.prototype,a,l;for(o.revert||Object.defineProperty(o,"revert",{value:function(){return this.time(-.01,!0)}}),r.borderTopStyle="solid",a=vr(ve),tn.m=Math.round(a.top+tn.sc())||0,zn.m=Math.round(a.left+zn.sc())||0,s?r.borderTopStyle=s:r.removeProperty("border-top-style"),n||(ve.setAttribute("style",""),ve.removeAttribute("style")),Ml=setInterval(Wp,250),Ut.delayedCall(.5,function(){return Sl=0}),ln(Re,"touchcancel",Xi),ln(ve,"touchstart",Xi),El(ln,Re,"pointerdown,touchstart,mousedown",kp),El(ln,Re,"pointerup,touchend,mouseup",Hp),Vf=Ut.utils.checkPrefix("transform"),dc.push(Vf),go=yn(),Bc=Ut.delayedCall(.2,Cs).pause(),vo=[Re,"visibilitychange",function(){var c=se.innerWidth,u=se.innerHeight;Re.hidden?(Op=c,Fp=u):(Op!==c||Fp!==u)&&ba()},Re,"DOMContentLoaded",Cs,se,"load",Cs,se,"resize",ba],bl(ln),ie.forEach(function(c){return c.enable(0,1)}),l=0;l<oe.length;l+=3)Tl(an,oe[l],oe[l+1]),Tl(an,oe[l],oe[l+2])}},i.config=function(n){"limitCallbacks"in n&&(Ru=!!n.limitCallbacks);var r=n.syncInterval;r&&clearInterval(Ml)||(Ml=r)&&setInterval(Wp,r),"ignoreMobileResize"in n&&(Gf=i.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(bl(an)||bl(ln,n.autoRefreshEvents||"none"),v0=(n.autoRefreshEvents+"").indexOf("resize")===-1)},i.scrollerProxy=function(n,r){var s=Xn(n),o=oe.indexOf(s),a=Hs(s);~o&&oe.splice(o,a?6:2),r&&(a?tr.unshift(se,r,ve,r,ai,r):tr.unshift(s,r))},i.clearMatchMedia=function(n){ie.forEach(function(r){return r._ctx&&r._ctx.query===n&&r._ctx.kill(!0,!0)})},i.isInViewport=function(n,r,s){var o=(si(n)?Xn(n):n).getBoundingClientRect(),a=o[s?Os:Fs]*r||0;return s?o.right-a>0&&o.left+a<se.innerWidth:o.bottom-a>0&&o.top+a<se.innerHeight},i.positionInViewport=function(n,r,s){si(n)&&(n=Xn(n));var o=n.getBoundingClientRect(),a=o[s?Os:Fs],l=r==null?a/2:r in Hc?Hc[r]*a:~r.indexOf("%")?parseFloat(r)*a/100:parseFloat(r)||0;return s?(o.left+l)/se.innerWidth:(o.top+l)/se.innerHeight},i.killAll=function(n){if(ie.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var r=Vs.killAll||[];Vs={},r.forEach(function(s){return s()})}},i})();le.version="3.13.0";le.saveStyles=function(i){return i?rl(i).forEach(function(t){if(t&&t.style){var e=ri.indexOf(t);e>=0&&ri.splice(e,5),ri.push(t,t.style.cssText,t.getBBox&&t.getAttribute("transform"),Ut.core.getCache(t),Wf())}}):ri};le.revert=function(i,t){return Ad(!i,t)};le.create=function(i,t){return new le(i,t)};le.refresh=function(i){return i?ba(!0):(go||le.register())&&Cs(!0)};le.update=function(i){return++oe.cache&&Sr(i===!0?2:0)};le.clearScrollMemory=P0;le.maxScroll=function(i,t){return Zi(i,t?zn:tn)};le.getScrollFunc=function(i,t){return os(Xn(i),t?zn:tn)};le.getById=function(i){return Yf[i]};le.getAll=function(){return ie.filter(function(i){return i.vars.id!=="ScrollSmoother"})};le.isScrolling=function(){return!!Ci};le.snapDirectional=wd;le.addEventListener=function(i,t){var e=Vs[i]||(Vs[i]=[]);~e.indexOf(t)||e.push(t)};le.removeEventListener=function(i,t){var e=Vs[i],n=e&&e.indexOf(t);n>=0&&e.splice(n,1)};le.batch=function(i,t){var e=[],n={},r=t.interval||.016,s=t.batchMax||1e9,o=function(c,u){var f=[],h=[],d=Ut.delayedCall(r,function(){u(f,h),f=[],h=[]}).pause();return function(g){f.length||d.restart(!0),f.push(g.trigger),h.push(g),s<=f.length&&d.progress(1)}},a;for(a in t)n[a]=a.substr(0,2)==="on"&&En(t[a])&&a!=="onRefreshInit"?o(a,t[a]):t[a];return En(s)&&(s=s(),ln(le,"refresh",function(){return s=t.batchMax()})),rl(i).forEach(function(l){var c={};for(a in n)c[a]=n[a];c.trigger=l,e.push(le.create(c))}),e};var Kp=function(t,e,n,r){return e>r?t(r):e<0&&t(0),n>r?(r-e)/(n-e):n<0?e/(e-n):1},Uu=function i(t,e){e===!0?t.style.removeProperty("touch-action"):t.style.touchAction=e===!0?"auto":e?"pan-"+e+(Xe.isTouch?" pinch-zoom":""):"none",t===ai&&i(ve,e)},Pl={auto:1,scroll:1},_S=function(t){var e=t.event,n=t.target,r=t.axis,s=(e.changedTouches?e.changedTouches[0]:e).target,o=s._gsap||Ut.core.getCache(s),a=yn(),l;if(!o._isScrollT||a-o._isScrollT>2e3){for(;s&&s!==ve&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(Pl[(l=Si(s)).overflowY]||Pl[l.overflowX]));)s=s.parentNode;o._isScroll=s&&s!==n&&!Hs(s)&&(Pl[(l=Si(s)).overflowY]||Pl[l.overflowX]),o._isScrollT=a}(o._isScroll||r==="x")&&(e.stopPropagation(),e._gsapAllow=!0)},I0=function(t,e,n,r){return Xe.create({target:t,capture:!0,debounce:!1,lockAxis:!0,type:e,onWheel:r=r&&_S,onPress:r,onDrag:r,onScroll:r,onEnable:function(){return n&&ln(Re,Xe.eventTypes[0],Jp,!1,!0)},onDisable:function(){return an(Re,Xe.eventTypes[0],Jp,!0)}})},gS=/(input|label|select|textarea)/i,Zp,Jp=function(t){var e=gS.test(t.target.tagName);(e||Zp)&&(t._gsapAllow=!0,Zp=e)},vS=function(t){bs(t)||(t={}),t.preventDefault=t.isNormalizer=t.allowClicks=!0,t.type||(t.type="wheel,touch"),t.debounce=!!t.debounce,t.id=t.id||"normalizer";var e=t,n=e.normalizeScrollX,r=e.momentum,s=e.allowNestedScroll,o=e.onRelease,a,l,c=Xn(t.target)||ai,u=Ut.core.globals().ScrollSmoother,f=u&&u.get(),h=Br&&(t.content&&Xn(t.content)||f&&t.content!==!1&&!f.smooth()&&f.content()),d=os(c,tn),g=os(c,zn),_=1,m=(Xe.isTouch&&se.visualViewport?se.visualViewport.scale*se.visualViewport.width:se.outerWidth)/se.innerWidth,p=0,M=En(r)?function(){return r(a)}:function(){return r||2.8},b,v,R=I0(c,t.type,!0,s),C=function(){return v=!1},T=Xi,D=Xi,S=function(){l=Zi(c,tn),D=ka(Br?1:0,l),n&&(T=ka(0,Zi(c,zn))),b=Bs},x=function(){h._gsap.y=Ma(parseFloat(h._gsap.y)+d.offset)+"px",h.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(h._gsap.y)+", 0, 1)",d.offset=d.cacheID=0},I=function(){if(v){requestAnimationFrame(C);var H=Ma(a.deltaY/2),ct=D(d.v-H);if(h&&ct!==d.v+d.offset){d.offset=ct-d.v;var N=Ma((parseFloat(h&&h._gsap.y)||0)-d.offset);h.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+N+", 0, 1)",h._gsap.y=N+"px",d.cacheID=oe.cache,Sr()}return!0}d.offset&&x(),v=!0},F,z,W,tt,G=function(){S(),F.isActive()&&F.vars.scrollY>l&&(d()>l?F.progress(1)&&d(l):F.resetTo("scrollY",l))};return h&&Ut.set(h,{y:"+=0"}),t.ignoreCheck=function(K){return Br&&K.type==="touchmove"&&I()||_>1.05&&K.type!=="touchstart"||a.isGesturing||K.touches&&K.touches.length>1},t.onPress=function(){v=!1;var K=_;_=Ma((se.visualViewport&&se.visualViewport.scale||1)/m),F.pause(),K!==_&&Uu(c,_>1.01?!0:n?!1:"x"),z=g(),W=d(),S(),b=Bs},t.onRelease=t.onGestureStart=function(K,H){if(d.offset&&x(),!H)tt.restart(!0);else{oe.cache++;var ct=M(),N,vt;n&&(N=g(),vt=N+ct*.05*-K.velocityX/.227,ct*=Kp(g,N,vt,Zi(c,zn)),F.vars.scrollX=T(vt)),N=d(),vt=N+ct*.05*-K.velocityY/.227,ct*=Kp(d,N,vt,Zi(c,tn)),F.vars.scrollY=D(vt),F.invalidate().duration(ct).play(.01),(Br&&F.vars.scrollY>=l||N>=l-1)&&Ut.to({},{onUpdate:G,duration:ct})}o&&o(K)},t.onWheel=function(){F._ts&&F.pause(),yn()-p>1e3&&(b=0,p=yn())},t.onChange=function(K,H,ct,N,vt){if(Bs!==b&&S(),H&&n&&g(T(N[2]===H?z+(K.startX-K.x):g()+H-N[1])),ct){d.offset&&x();var Lt=vt[2]===ct,qt=Lt?W+K.startY-K.y:d()+ct-vt[1],nt=D(qt);Lt&&qt!==nt&&(W+=nt-qt),d(nt)}(ct||H)&&Sr()},t.onEnable=function(){Uu(c,n?!1:"x"),le.addEventListener("refresh",G),ln(se,"resize",G),d.smooth&&(d.target.style.scrollBehavior="auto",d.smooth=g.smooth=!1),R.enable()},t.onDisable=function(){Uu(c,!0),an(se,"resize",G),le.removeEventListener("refresh",G),R.kill()},t.lockAxis=t.lockAxis!==!1,a=new Xe(t),a.iOS=Br,Br&&!d()&&d(1),Br&&Ut.ticker.add(Xi),tt=a._dc,F=Ut.to(a,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:L0(d,d(),function(){return F.pause()})},onUpdate:Sr,onComplete:tt.vars.onComplete}),a};le.sort=function(i){if(En(i))return ie.sort(i);var t=se.pageYOffset||0;return le.getAll().forEach(function(e){return e._sortY=e.trigger?t+e.trigger.getBoundingClientRect().top:e.start+se.innerHeight}),ie.sort(i||function(e,n){return(e.vars.refreshPriority||0)*-1e6+(e.vars.containerAnimation?1e6:e._sortY)-((n.vars.containerAnimation?1e6:n._sortY)+(n.vars.refreshPriority||0)*-1e6)})};le.observe=function(i){return new Xe(i)};le.normalizeScroll=function(i){if(typeof i>"u")return Ln;if(i===!0&&Ln)return Ln.enable();if(i===!1){Ln&&Ln.kill(),Ln=i;return}var t=i instanceof Xe?i:vS(i);return Ln&&Ln.target===t.target&&Ln.kill(),Hs(t.target)&&(Ln=t),t};le.core={_getVelocityProp:Hf,_inputObserver:I0,_scrollers:oe,_proxies:tr,bridge:{ss:function(){Ci||Gs("scrollStart"),Ci=yn()},ref:function(){return xn}}};S0()&&Ut.registerPlugin(le);const xS={class:"max-w-7xl mx-auto flex justify-between items-center"},yS={class:"hidden md:flex list-none gap-8"},MS=["href"],SS={__name:"Navbar",setup(i){const t=jh(!1),e=[{id:1,name:"Home",href:"home"},{id:2,name:"About",href:"about"},{id:3,name:"Arsenal",href:"tech"},{id:4,name:"Voyage",href:"experience"},{id:5,name:"Projects",href:"projects"},{id:6,name:"Training",href:"certificates"}],n=s=>{const o=s.target.getAttribute("href"),a=document.querySelector(o);a&&a.scrollIntoView({behavior:"smooth"})},r=()=>{t.value=window.scrollY>50};return ta(()=>{window.addEventListener("scroll",r)}),ll(()=>{window.removeEventListener("scroll",r)}),(s,o)=>(en(),nn("nav",{class:Kc(["fixed top-0 w-full py-3 px-4 md:py-5 md:px-8 transition-all duration-300 z-50",t.value?"bg-ocean-900/85 backdrop-blur-xl shadow-lg border-b border-sky/20":"bg-transparent"])},[pt("div",xS,[o[0]||(o[0]=pt("div",{class:"nav-brand text-3xl md:text-4xl drop-shadow-md"}," 🏴‍☠️ ",-1)),pt("ul",yS,[(en(),nn(Sn,null,zs(e,a=>pt("li",{key:a.id},[pt("a",{href:`#${a.href}`,onClick:Uy(n,["prevent"]),class:"font-bold px-4 py-2 rounded-lg relative transition-all text-cream hover:text-secondary drop-shadow-sm after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-secondary after:transition-all after:duration-300 hover:after:w-4/5 hover:after:left-[10%]"},dn(a.name),9,MS)])),64))])])],2))}};const Cd="170",No={ROTATE:0,DOLLY:1,PAN:2},So={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},bS=0,Qp=1,ES=2,U0=1,TS=2,dr=3,as=0,Kn=1,bi=2,ts=0,Oo=1,Vc=2,tm=3,em=4,wS=5,Ts=100,AS=101,CS=102,RS=103,PS=104,DS=200,LS=201,IS=202,US=203,jf=204,Kf=205,NS=206,OS=207,FS=208,BS=209,zS=210,kS=211,HS=212,VS=213,GS=214,Zf=0,Jf=1,Qf=2,$o=3,th=4,eh=5,nh=6,ih=7,Rd=0,WS=1,XS=2,es=0,YS=1,qS=2,$S=3,jS=4,KS=5,ZS=6,JS=7,N0=300,jo=301,Ko=302,rh=303,sh=304,ou=306,oh=1e3,Rs=1001,ah=1002,ki=1003,QS=1004,Dl=1005,Ji=1006,Nu=1007,Ps=1008,Cr=1009,O0=1010,F0=1011,ol=1012,Pd=1013,Ws=1014,yr=1015,fl=1016,Dd=1017,Ld=1018,Zo=1020,B0=35902,z0=1021,k0=1022,Bi=1023,H0=1024,V0=1025,Fo=1026,Jo=1027,G0=1028,Id=1029,W0=1030,Ud=1031,Nd=1033,mc=33776,_c=33777,gc=33778,vc=33779,lh=35840,ch=35841,uh=35842,fh=35843,hh=36196,dh=37492,ph=37496,mh=37808,_h=37809,gh=37810,vh=37811,xh=37812,yh=37813,Mh=37814,Sh=37815,bh=37816,Eh=37817,Th=37818,wh=37819,Ah=37820,Ch=37821,xc=36492,Rh=36494,Ph=36495,X0=36283,Dh=36284,Lh=36285,Ih=36286,tb=3200,eb=3201,Y0=0,nb=1,Gr="",yi="srgb",ea="srgb-linear",au="linear",Se="srgb",eo=7680,nm=519,ib=512,rb=513,sb=514,q0=515,ob=516,ab=517,lb=518,cb=519,im=35044,rm="300 es",Mr=2e3,Gc=2001;class js{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const r=this._listeners[t];if(r!==void 0){const s=r.indexOf(e);s!==-1&&r.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const r=n.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,t);t.target=null}}}const gn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],yc=Math.PI/180,Uh=180/Math.PI;function hl(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(gn[i&255]+gn[i>>8&255]+gn[i>>16&255]+gn[i>>24&255]+"-"+gn[t&255]+gn[t>>8&255]+"-"+gn[t>>16&15|64]+gn[t>>24&255]+"-"+gn[e&63|128]+gn[e>>8&255]+"-"+gn[e>>16&255]+gn[e>>24&255]+gn[n&255]+gn[n>>8&255]+gn[n>>16&255]+gn[n>>24&255]).toLowerCase()}function On(i,t,e){return Math.max(t,Math.min(e,i))}function ub(i,t){return(i%t+t)%t}function Ou(i,t,e){return(1-e)*i+e*t}function fa(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Hn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const fb={DEG2RAD:yc};class Jt{constructor(t=0,e=0){Jt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6],this.y=r[1]*e+r[4]*n+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(On(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),r=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*n-o*r+t.x,this.y=s*r+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class te{constructor(t,e,n,r,s,o,a,l,c){te.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,o,a,l,c)}set(t,e,n,r,s,o,a,l,c){const u=this.elements;return u[0]=t,u[1]=r,u[2]=a,u[3]=e,u[4]=s,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],f=n[7],h=n[2],d=n[5],g=n[8],_=r[0],m=r[3],p=r[6],M=r[1],b=r[4],v=r[7],R=r[2],C=r[5],T=r[8];return s[0]=o*_+a*M+l*R,s[3]=o*m+a*b+l*C,s[6]=o*p+a*v+l*T,s[1]=c*_+u*M+f*R,s[4]=c*m+u*b+f*C,s[7]=c*p+u*v+f*T,s[2]=h*_+d*M+g*R,s[5]=h*m+d*b+g*C,s[8]=h*p+d*v+g*T,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8];return e*o*u-e*a*c-n*s*u+n*a*l+r*s*c-r*o*l}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],f=u*o-a*c,h=a*l-u*s,d=c*s-o*l,g=e*f+n*h+r*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=f*_,t[1]=(r*c-u*n)*_,t[2]=(a*n-r*o)*_,t[3]=h*_,t[4]=(u*e-r*l)*_,t[5]=(r*s-a*e)*_,t[6]=d*_,t[7]=(n*l-c*e)*_,t[8]=(o*e-n*s)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-r*c,r*l,-r*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Fu.makeScale(t,e)),this}rotate(t){return this.premultiply(Fu.makeRotation(-t)),this}translate(t,e){return this.premultiply(Fu.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<9;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Fu=new te;function $0(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Wc(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function hb(){const i=Wc("canvas");return i.style.display="block",i}const sm={};function Ea(i){i in sm||(sm[i]=!0,console.warn(i))}function db(i,t,e){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}function pb(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function mb(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const fe={enabled:!0,workingColorSpace:ea,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===Se&&(i.r=br(i.r),i.g=br(i.g),i.b=br(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===Se&&(i.r=Bo(i.r),i.g=Bo(i.g),i.b=Bo(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Gr?au:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function br(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Bo(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const om=[.64,.33,.3,.6,.15,.06],am=[.2126,.7152,.0722],lm=[.3127,.329],cm=new te().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),um=new te().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);fe.define({[ea]:{primaries:om,whitePoint:lm,transfer:au,toXYZ:cm,fromXYZ:um,luminanceCoefficients:am,workingColorSpaceConfig:{unpackColorSpace:yi},outputColorSpaceConfig:{drawingBufferColorSpace:yi}},[yi]:{primaries:om,whitePoint:lm,transfer:Se,toXYZ:cm,fromXYZ:um,luminanceCoefficients:am,outputColorSpaceConfig:{drawingBufferColorSpace:yi}}});let no;class _b{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{no===void 0&&(no=Wc("canvas")),no.width=t.width,no.height=t.height;const n=no.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=no}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Wc("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const r=n.getImageData(0,0,t.width,t.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=br(s[o]/255)*255;return n.putImageData(r,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(br(e[n]/255)*255):e[n]=br(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let gb=0;class j0{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:gb++}),this.uuid=hl(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Bu(r[o].image)):s.push(Bu(r[o]))}else s=Bu(r);n.url=s}return e||(t.images[this.uuid]=n),n}}function Bu(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?_b.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let vb=0;class Zn extends js{constructor(t=Zn.DEFAULT_IMAGE,e=Zn.DEFAULT_MAPPING,n=Rs,r=Rs,s=Ji,o=Ps,a=Bi,l=Cr,c=Zn.DEFAULT_ANISOTROPY,u=Gr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:vb++}),this.uuid=hl(),this.name="",this.source=new j0(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Jt(0,0),this.repeat=new Jt(1,1),this.center=new Jt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new te,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==N0)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case oh:t.x=t.x-Math.floor(t.x);break;case Rs:t.x=t.x<0?0:1;break;case ah:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case oh:t.y=t.y-Math.floor(t.y);break;case Rs:t.y=t.y<0?0:1;break;case ah:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Zn.DEFAULT_IMAGE=null;Zn.DEFAULT_MAPPING=N0;Zn.DEFAULT_ANISOTROPY=1;class He{constructor(t=0,e=0,n=0,r=1){He.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,r){return this.x=t,this.y=e,this.z=n,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*r+o[12]*s,this.y=o[1]*e+o[5]*n+o[9]*r+o[13]*s,this.z=o[2]*e+o[6]*n+o[10]*r+o[14]*s,this.w=o[3]*e+o[7]*n+o[11]*r+o[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,r,s;const l=t.elements,c=l[0],u=l[4],f=l[8],h=l[1],d=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(u-h)<.01&&Math.abs(f-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const b=(c+1)/2,v=(d+1)/2,R=(p+1)/2,C=(u+h)/4,T=(f+_)/4,D=(g+m)/4;return b>v&&b>R?b<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(b),r=C/n,s=T/n):v>R?v<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(v),n=C/r,s=D/r):R<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(R),n=T/s,r=D/s),this.set(n,r,s,e),this}let M=Math.sqrt((m-g)*(m-g)+(f-_)*(f-_)+(h-u)*(h-u));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(f-_)/M,this.z=(h-u)/M,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class xb extends js{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new He(0,0,t,e),this.scissorTest=!1,this.viewport=new He(0,0,t,e);const r={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ji,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new Zn(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,r=t.textures.length;n<r;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new j0(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Xs extends xb{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class K0 extends Zn{constructor(t=null,e=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=ki,this.minFilter=ki,this.wrapR=Rs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class yb extends Zn{constructor(t=null,e=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=ki,this.minFilter=ki,this.wrapR=Rs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ys{constructor(t=0,e=0,n=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=r}static slerpFlat(t,e,n,r,s,o,a){let l=n[r+0],c=n[r+1],u=n[r+2],f=n[r+3];const h=s[o+0],d=s[o+1],g=s[o+2],_=s[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=f;return}if(a===1){t[e+0]=h,t[e+1]=d,t[e+2]=g,t[e+3]=_;return}if(f!==_||l!==h||c!==d||u!==g){let m=1-a;const p=l*h+c*d+u*g+f*_,M=p>=0?1:-1,b=1-p*p;if(b>Number.EPSILON){const R=Math.sqrt(b),C=Math.atan2(R,p*M);m=Math.sin(m*C)/R,a=Math.sin(a*C)/R}const v=a*M;if(l=l*m+h*v,c=c*m+d*v,u=u*m+g*v,f=f*m+_*v,m===1-a){const R=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=R,c*=R,u*=R,f*=R}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=f}static multiplyQuaternionsFlat(t,e,n,r,s,o){const a=n[r],l=n[r+1],c=n[r+2],u=n[r+3],f=s[o],h=s[o+1],d=s[o+2],g=s[o+3];return t[e]=a*g+u*f+l*d-c*h,t[e+1]=l*g+u*h+c*f-a*d,t[e+2]=c*g+u*d+a*h-l*f,t[e+3]=u*g-a*f-l*h-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,r){return this._x=t,this._y=e,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,r=t._y,s=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(r/2),f=a(s/2),h=l(n/2),d=l(r/2),g=l(s/2);switch(o){case"XYZ":this._x=h*u*f+c*d*g,this._y=c*d*f-h*u*g,this._z=c*u*g+h*d*f,this._w=c*u*f-h*d*g;break;case"YXZ":this._x=h*u*f+c*d*g,this._y=c*d*f-h*u*g,this._z=c*u*g-h*d*f,this._w=c*u*f+h*d*g;break;case"ZXY":this._x=h*u*f-c*d*g,this._y=c*d*f+h*u*g,this._z=c*u*g+h*d*f,this._w=c*u*f-h*d*g;break;case"ZYX":this._x=h*u*f-c*d*g,this._y=c*d*f+h*u*g,this._z=c*u*g-h*d*f,this._w=c*u*f+h*d*g;break;case"YZX":this._x=h*u*f+c*d*g,this._y=c*d*f+h*u*g,this._z=c*u*g-h*d*f,this._w=c*u*f-h*d*g;break;case"XZY":this._x=h*u*f-c*d*g,this._y=c*d*f-h*u*g,this._z=c*u*g+h*d*f,this._w=c*u*f+h*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,r=Math.sin(n);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],r=e[4],s=e[8],o=e[1],a=e[5],l=e[9],c=e[2],u=e[6],f=e[10],h=n+a+f;if(h>0){const d=.5/Math.sqrt(h+1);this._w=.25/d,this._x=(u-l)*d,this._y=(s-c)*d,this._z=(o-r)*d}else if(n>a&&n>f){const d=2*Math.sqrt(1+n-a-f);this._w=(u-l)/d,this._x=.25*d,this._y=(r+o)/d,this._z=(s+c)/d}else if(a>f){const d=2*Math.sqrt(1+a-n-f);this._w=(s-c)/d,this._x=(r+o)/d,this._y=.25*d,this._z=(l+u)/d}else{const d=2*Math.sqrt(1+f-n-a);this._w=(o-r)/d,this._x=(s+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(On(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const r=Math.min(1,e/n);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,r=t._y,s=t._z,o=t._w,a=e._x,l=e._y,c=e._z,u=e._w;return this._x=n*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-n*c,this._z=s*u+o*c+n*l-r*a,this._w=o*u-n*a-r*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,r=this._y,s=this._z,o=this._w;let a=o*t._w+n*t._x+r*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const d=1-e;return this._w=d*o+e*this._w,this._x=d*n+e*this._x,this._y=d*r+e*this._y,this._z=d*s+e*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),f=Math.sin((1-e)*u)/c,h=Math.sin(e*u)/c;return this._w=o*f+this._w*h,this._x=n*f+this._x*h,this._y=r*f+this._y*h,this._z=s*f+this._z*h,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(t),r*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class Z{constructor(t=0,e=0,n=0){Z.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(fm.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(fm.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*r,this.y=s[1]*e+s[4]*n+s[7]*r,this.z=s[2]*e+s[5]*n+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,s=t.elements,o=1/(s[3]*e+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*r+s[12])*o,this.y=(s[1]*e+s[5]*n+s[9]*r+s[13])*o,this.z=(s[2]*e+s[6]*n+s[10]*r+s[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,r=this.z,s=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*r-a*n),u=2*(a*e-s*r),f=2*(s*n-o*e);return this.x=e+l*c+o*f-a*u,this.y=n+l*u+a*c-s*f,this.z=r+l*f+s*u-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*r,this.y=s[1]*e+s[5]*n+s[9]*r,this.z=s[2]*e+s[6]*n+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,r=t.y,s=t.z,o=e.x,a=e.y,l=e.z;return this.x=r*l-s*a,this.y=s*o-n*l,this.z=n*a-r*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return zu.copy(this).projectOnVector(t),this.sub(zu)}reflect(t){return this.sub(zu.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(On(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,r=this.z-t.z;return e*e+n*n+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const r=Math.sin(e)*t;return this.x=r*Math.sin(n),this.y=Math.cos(e)*t,this.z=r*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const zu=new Z,fm=new Ys;class dl{constructor(t=new Z(1/0,1/0,1/0),e=new Z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Di.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Di.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Di.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Di):Di.fromBufferAttribute(s,o),Di.applyMatrix4(t.matrixWorld),this.expandByPoint(Di);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ll.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ll.copy(n.boundingBox)),Ll.applyMatrix4(t.matrixWorld),this.union(Ll)}const r=t.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Di),Di.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ha),Il.subVectors(this.max,ha),io.subVectors(t.a,ha),ro.subVectors(t.b,ha),so.subVectors(t.c,ha),Lr.subVectors(ro,io),Ir.subVectors(so,ro),ps.subVectors(io,so);let e=[0,-Lr.z,Lr.y,0,-Ir.z,Ir.y,0,-ps.z,ps.y,Lr.z,0,-Lr.x,Ir.z,0,-Ir.x,ps.z,0,-ps.x,-Lr.y,Lr.x,0,-Ir.y,Ir.x,0,-ps.y,ps.x,0];return!ku(e,io,ro,so,Il)||(e=[1,0,0,0,1,0,0,0,1],!ku(e,io,ro,so,Il))?!1:(Ul.crossVectors(Lr,Ir),e=[Ul.x,Ul.y,Ul.z],ku(e,io,ro,so,Il))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Di).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Di).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ar[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ar[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ar[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ar[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ar[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ar[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ar[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ar[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ar),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const ar=[new Z,new Z,new Z,new Z,new Z,new Z,new Z,new Z],Di=new Z,Ll=new dl,io=new Z,ro=new Z,so=new Z,Lr=new Z,Ir=new Z,ps=new Z,ha=new Z,Il=new Z,Ul=new Z,ms=new Z;function ku(i,t,e,n,r){for(let s=0,o=i.length-3;s<=o;s+=3){ms.fromArray(i,s);const a=r.x*Math.abs(ms.x)+r.y*Math.abs(ms.y)+r.z*Math.abs(ms.z),l=t.dot(ms),c=e.dot(ms),u=n.dot(ms);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Mb=new dl,da=new Z,Hu=new Z;class lu{constructor(t=new Z,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Mb.setFromPoints(t).getCenter(n);let r=0;for(let s=0,o=t.length;s<o;s++)r=Math.max(r,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;da.subVectors(t,this.center);const e=da.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),r=(n-this.radius)*.5;this.center.addScaledVector(da,r/n),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Hu.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(da.copy(t.center).add(Hu)),this.expandByPoint(da.copy(t.center).sub(Hu))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const lr=new Z,Vu=new Z,Nl=new Z,Ur=new Z,Gu=new Z,Ol=new Z,Wu=new Z;class Od{constructor(t=new Z,e=new Z(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,lr)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=lr.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(lr.copy(this.origin).addScaledVector(this.direction,e),lr.distanceToSquared(t))}distanceSqToSegment(t,e,n,r){Vu.copy(t).add(e).multiplyScalar(.5),Nl.copy(e).sub(t).normalize(),Ur.copy(this.origin).sub(Vu);const s=t.distanceTo(e)*.5,o=-this.direction.dot(Nl),a=Ur.dot(this.direction),l=-Ur.dot(Nl),c=Ur.lengthSq(),u=Math.abs(1-o*o);let f,h,d,g;if(u>0)if(f=o*l-a,h=o*a-l,g=s*u,f>=0)if(h>=-g)if(h<=g){const _=1/u;f*=_,h*=_,d=f*(f+o*h+2*a)+h*(o*f+h+2*l)+c}else h=s,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*l)+c;else h=-s,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*l)+c;else h<=-g?(f=Math.max(0,-(-o*s+a)),h=f>0?-s:Math.min(Math.max(-s,-l),s),d=-f*f+h*(h+2*l)+c):h<=g?(f=0,h=Math.min(Math.max(-s,-l),s),d=h*(h+2*l)+c):(f=Math.max(0,-(o*s+a)),h=f>0?s:Math.min(Math.max(-s,-l),s),d=-f*f+h*(h+2*l)+c);else h=o>0?-s:s,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(Vu).addScaledVector(Nl,h),d}intersectSphere(t,e){lr.subVectors(t.center,this.origin);const n=lr.dot(this.direction),r=lr.dot(lr)-n*n,s=t.radius*t.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,r,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(n=(t.min.x-h.x)*c,r=(t.max.x-h.x)*c):(n=(t.max.x-h.x)*c,r=(t.min.x-h.x)*c),u>=0?(s=(t.min.y-h.y)*u,o=(t.max.y-h.y)*u):(s=(t.max.y-h.y)*u,o=(t.min.y-h.y)*u),n>o||s>r||((s>n||isNaN(n))&&(n=s),(o<r||isNaN(r))&&(r=o),f>=0?(a=(t.min.z-h.z)*f,l=(t.max.z-h.z)*f):(a=(t.max.z-h.z)*f,l=(t.min.z-h.z)*f),n>l||a>r)||((a>n||n!==n)&&(n=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,e)}intersectsBox(t){return this.intersectBox(t,lr)!==null}intersectTriangle(t,e,n,r,s){Gu.subVectors(e,t),Ol.subVectors(n,t),Wu.crossVectors(Gu,Ol);let o=this.direction.dot(Wu),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Ur.subVectors(this.origin,t);const l=a*this.direction.dot(Ol.crossVectors(Ur,Ol));if(l<0)return null;const c=a*this.direction.dot(Gu.cross(Ur));if(c<0||l+c>o)return null;const u=-a*Ur.dot(Wu);return u<0?null:this.at(u/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ze{constructor(t,e,n,r,s,o,a,l,c,u,f,h,d,g,_,m){ze.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,o,a,l,c,u,f,h,d,g,_,m)}set(t,e,n,r,s,o,a,l,c,u,f,h,d,g,_,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=r,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=f,p[14]=h,p[3]=d,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ze().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,r=1/oo.setFromMatrixColumn(t,0).length(),s=1/oo.setFromMatrixColumn(t,1).length(),o=1/oo.setFromMatrixColumn(t,2).length();return e[0]=n[0]*r,e[1]=n[1]*r,e[2]=n[2]*r,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,r=t.y,s=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(t.order==="XYZ"){const h=o*u,d=o*f,g=a*u,_=a*f;e[0]=l*u,e[4]=-l*f,e[8]=c,e[1]=d+g*c,e[5]=h-_*c,e[9]=-a*l,e[2]=_-h*c,e[6]=g+d*c,e[10]=o*l}else if(t.order==="YXZ"){const h=l*u,d=l*f,g=c*u,_=c*f;e[0]=h+_*a,e[4]=g*a-d,e[8]=o*c,e[1]=o*f,e[5]=o*u,e[9]=-a,e[2]=d*a-g,e[6]=_+h*a,e[10]=o*l}else if(t.order==="ZXY"){const h=l*u,d=l*f,g=c*u,_=c*f;e[0]=h-_*a,e[4]=-o*f,e[8]=g+d*a,e[1]=d+g*a,e[5]=o*u,e[9]=_-h*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const h=o*u,d=o*f,g=a*u,_=a*f;e[0]=l*u,e[4]=g*c-d,e[8]=h*c+_,e[1]=l*f,e[5]=_*c+h,e[9]=d*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const h=o*l,d=o*c,g=a*l,_=a*c;e[0]=l*u,e[4]=_-h*f,e[8]=g*f+d,e[1]=f,e[5]=o*u,e[9]=-a*u,e[2]=-c*u,e[6]=d*f+g,e[10]=h-_*f}else if(t.order==="XZY"){const h=o*l,d=o*c,g=a*l,_=a*c;e[0]=l*u,e[4]=-f,e[8]=c*u,e[1]=h*f+_,e[5]=o*u,e[9]=d*f-g,e[2]=g*f-d,e[6]=a*u,e[10]=_*f+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Sb,t,bb)}lookAt(t,e,n){const r=this.elements;return ei.subVectors(t,e),ei.lengthSq()===0&&(ei.z=1),ei.normalize(),Nr.crossVectors(n,ei),Nr.lengthSq()===0&&(Math.abs(n.z)===1?ei.x+=1e-4:ei.z+=1e-4,ei.normalize(),Nr.crossVectors(n,ei)),Nr.normalize(),Fl.crossVectors(ei,Nr),r[0]=Nr.x,r[4]=Fl.x,r[8]=ei.x,r[1]=Nr.y,r[5]=Fl.y,r[9]=ei.y,r[2]=Nr.z,r[6]=Fl.z,r[10]=ei.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],f=n[5],h=n[9],d=n[13],g=n[2],_=n[6],m=n[10],p=n[14],M=n[3],b=n[7],v=n[11],R=n[15],C=r[0],T=r[4],D=r[8],S=r[12],x=r[1],I=r[5],F=r[9],z=r[13],W=r[2],tt=r[6],G=r[10],K=r[14],H=r[3],ct=r[7],N=r[11],vt=r[15];return s[0]=o*C+a*x+l*W+c*H,s[4]=o*T+a*I+l*tt+c*ct,s[8]=o*D+a*F+l*G+c*N,s[12]=o*S+a*z+l*K+c*vt,s[1]=u*C+f*x+h*W+d*H,s[5]=u*T+f*I+h*tt+d*ct,s[9]=u*D+f*F+h*G+d*N,s[13]=u*S+f*z+h*K+d*vt,s[2]=g*C+_*x+m*W+p*H,s[6]=g*T+_*I+m*tt+p*ct,s[10]=g*D+_*F+m*G+p*N,s[14]=g*S+_*z+m*K+p*vt,s[3]=M*C+b*x+v*W+R*H,s[7]=M*T+b*I+v*tt+R*ct,s[11]=M*D+b*F+v*G+R*N,s[15]=M*S+b*z+v*K+R*vt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],r=t[8],s=t[12],o=t[1],a=t[5],l=t[9],c=t[13],u=t[2],f=t[6],h=t[10],d=t[14],g=t[3],_=t[7],m=t[11],p=t[15];return g*(+s*l*f-r*c*f-s*a*h+n*c*h+r*a*d-n*l*d)+_*(+e*l*d-e*c*h+s*o*h-r*o*d+r*c*u-s*l*u)+m*(+e*c*f-e*a*d-s*o*f+n*o*d+s*a*u-n*c*u)+p*(-r*a*u-e*l*f+e*a*h+r*o*f-n*o*h+n*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],f=t[9],h=t[10],d=t[11],g=t[12],_=t[13],m=t[14],p=t[15],M=f*m*c-_*h*c+_*l*d-a*m*d-f*l*p+a*h*p,b=g*h*c-u*m*c-g*l*d+o*m*d+u*l*p-o*h*p,v=u*_*c-g*f*c+g*a*d-o*_*d-u*a*p+o*f*p,R=g*f*l-u*_*l-g*a*h+o*_*h+u*a*m-o*f*m,C=e*M+n*b+r*v+s*R;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/C;return t[0]=M*T,t[1]=(_*h*s-f*m*s-_*r*d+n*m*d+f*r*p-n*h*p)*T,t[2]=(a*m*s-_*l*s+_*r*c-n*m*c-a*r*p+n*l*p)*T,t[3]=(f*l*s-a*h*s-f*r*c+n*h*c+a*r*d-n*l*d)*T,t[4]=b*T,t[5]=(u*m*s-g*h*s+g*r*d-e*m*d-u*r*p+e*h*p)*T,t[6]=(g*l*s-o*m*s-g*r*c+e*m*c+o*r*p-e*l*p)*T,t[7]=(o*h*s-u*l*s+u*r*c-e*h*c-o*r*d+e*l*d)*T,t[8]=v*T,t[9]=(g*f*s-u*_*s-g*n*d+e*_*d+u*n*p-e*f*p)*T,t[10]=(o*_*s-g*a*s+g*n*c-e*_*c-o*n*p+e*a*p)*T,t[11]=(u*a*s-o*f*s-u*n*c+e*f*c+o*n*d-e*a*d)*T,t[12]=R*T,t[13]=(u*_*r-g*f*r+g*n*h-e*_*h-u*n*m+e*f*m)*T,t[14]=(g*a*r-o*_*r-g*n*l+e*_*l+o*n*m-e*a*m)*T,t[15]=(o*f*r-u*a*r+u*n*l-e*f*l-o*n*h+e*a*h)*T,this}scale(t){const e=this.elements,n=t.x,r=t.y,s=t.z;return e[0]*=n,e[4]*=r,e[8]*=s,e[1]*=n,e[5]*=r,e[9]*=s,e[2]*=n,e[6]*=r,e[10]*=s,e[3]*=n,e[7]*=r,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,r))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),r=Math.sin(e),s=1-n,o=t.x,a=t.y,l=t.z,c=s*o,u=s*a;return this.set(c*o+n,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+n,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,r,s,o){return this.set(1,n,s,0,t,1,o,0,e,r,1,0,0,0,0,1),this}compose(t,e,n){const r=this.elements,s=e._x,o=e._y,a=e._z,l=e._w,c=s+s,u=o+o,f=a+a,h=s*c,d=s*u,g=s*f,_=o*u,m=o*f,p=a*f,M=l*c,b=l*u,v=l*f,R=n.x,C=n.y,T=n.z;return r[0]=(1-(_+p))*R,r[1]=(d+v)*R,r[2]=(g-b)*R,r[3]=0,r[4]=(d-v)*C,r[5]=(1-(h+p))*C,r[6]=(m+M)*C,r[7]=0,r[8]=(g+b)*T,r[9]=(m-M)*T,r[10]=(1-(h+_))*T,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,n){const r=this.elements;let s=oo.set(r[0],r[1],r[2]).length();const o=oo.set(r[4],r[5],r[6]).length(),a=oo.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),t.x=r[12],t.y=r[13],t.z=r[14],Li.copy(this);const c=1/s,u=1/o,f=1/a;return Li.elements[0]*=c,Li.elements[1]*=c,Li.elements[2]*=c,Li.elements[4]*=u,Li.elements[5]*=u,Li.elements[6]*=u,Li.elements[8]*=f,Li.elements[9]*=f,Li.elements[10]*=f,e.setFromRotationMatrix(Li),n.x=s,n.y=o,n.z=a,this}makePerspective(t,e,n,r,s,o,a=Mr){const l=this.elements,c=2*s/(e-t),u=2*s/(n-r),f=(e+t)/(e-t),h=(n+r)/(n-r);let d,g;if(a===Mr)d=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===Gc)d=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,r,s,o,a=Mr){const l=this.elements,c=1/(e-t),u=1/(n-r),f=1/(o-s),h=(e+t)*c,d=(n+r)*u;let g,_;if(a===Mr)g=(o+s)*f,_=-2*f;else if(a===Gc)g=s*f,_=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<16;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const oo=new Z,Li=new ze,Sb=new Z(0,0,0),bb=new Z(1,1,1),Nr=new Z,Fl=new Z,ei=new Z,hm=new ze,dm=new Ys;class ir{constructor(t=0,e=0,n=0,r=ir.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,r=this._order){return this._x=t,this._y=e,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const r=t.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],f=r[2],h=r[6],d=r[10];switch(e){case"XYZ":this._y=Math.asin(On(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-On(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(On(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-On(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(On(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-On(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return hm.makeRotationFromQuaternion(t),this.setFromRotationMatrix(hm,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return dm.setFromEuler(this),this.setFromQuaternion(dm,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ir.DEFAULT_ORDER="XYZ";class Z0{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Eb=0;const pm=new Z,ao=new Ys,cr=new ze,Bl=new Z,pa=new Z,Tb=new Z,wb=new Ys,mm=new Z(1,0,0),_m=new Z(0,1,0),gm=new Z(0,0,1),vm={type:"added"},Ab={type:"removed"},lo={type:"childadded",child:null},Xu={type:"childremoved",child:null};class un extends js{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Eb++}),this.uuid=hl(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=un.DEFAULT_UP.clone();const t=new Z,e=new ir,n=new Ys,r=new Z(1,1,1);function s(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ze},normalMatrix:{value:new te}}),this.matrix=new ze,this.matrixWorld=new ze,this.matrixAutoUpdate=un.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=un.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Z0,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ao.setFromAxisAngle(t,e),this.quaternion.multiply(ao),this}rotateOnWorldAxis(t,e){return ao.setFromAxisAngle(t,e),this.quaternion.premultiply(ao),this}rotateX(t){return this.rotateOnAxis(mm,t)}rotateY(t){return this.rotateOnAxis(_m,t)}rotateZ(t){return this.rotateOnAxis(gm,t)}translateOnAxis(t,e){return pm.copy(t).applyQuaternion(this.quaternion),this.position.add(pm.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(mm,t)}translateY(t){return this.translateOnAxis(_m,t)}translateZ(t){return this.translateOnAxis(gm,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(cr.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Bl.copy(t):Bl.set(t,e,n);const r=this.parent;this.updateWorldMatrix(!0,!1),pa.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?cr.lookAt(pa,Bl,this.up):cr.lookAt(Bl,pa,this.up),this.quaternion.setFromRotationMatrix(cr),r&&(cr.extractRotation(r.matrixWorld),ao.setFromRotationMatrix(cr),this.quaternion.premultiply(ao.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(vm),lo.child=t,this.dispatchEvent(lo),lo.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Ab),Xu.child=t,this.dispatchEvent(Xu),Xu.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),cr.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),cr.multiply(t.parent.matrixWorld)),t.applyMatrix4(cr),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(vm),lo.child=t,this.dispatchEvent(lo),lo.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,r=this.children.length;n<r;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(pa,t,Tb),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(pa,wb,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];s(t.shapes,f)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(t.materials,this.material[l]));r.material=a}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),u=o(t.images),f=o(t.shapes),h=o(t.skeletons),d=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),f.length>0&&(n.shapes=f),h.length>0&&(n.skeletons=h),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=r,n;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const r=t.children[n];this.add(r.clone())}return this}}un.DEFAULT_UP=new Z(0,1,0);un.DEFAULT_MATRIX_AUTO_UPDATE=!0;un.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Ii=new Z,ur=new Z,Yu=new Z,fr=new Z,co=new Z,uo=new Z,xm=new Z,qu=new Z,$u=new Z,ju=new Z,Ku=new He,Zu=new He,Ju=new He;class Fi{constructor(t=new Z,e=new Z,n=new Z){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,r){r.subVectors(n,e),Ii.subVectors(t,e),r.cross(Ii);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,e,n,r,s){Ii.subVectors(r,e),ur.subVectors(n,e),Yu.subVectors(t,e);const o=Ii.dot(Ii),a=Ii.dot(ur),l=Ii.dot(Yu),c=ur.dot(ur),u=ur.dot(Yu),f=o*c-a*a;if(f===0)return s.set(0,0,0),null;const h=1/f,d=(c*l-a*u)*h,g=(o*u-a*l)*h;return s.set(1-d-g,g,d)}static containsPoint(t,e,n,r){return this.getBarycoord(t,e,n,r,fr)===null?!1:fr.x>=0&&fr.y>=0&&fr.x+fr.y<=1}static getInterpolation(t,e,n,r,s,o,a,l){return this.getBarycoord(t,e,n,r,fr)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,fr.x),l.addScaledVector(o,fr.y),l.addScaledVector(a,fr.z),l)}static getInterpolatedAttribute(t,e,n,r,s,o){return Ku.setScalar(0),Zu.setScalar(0),Ju.setScalar(0),Ku.fromBufferAttribute(t,e),Zu.fromBufferAttribute(t,n),Ju.fromBufferAttribute(t,r),o.setScalar(0),o.addScaledVector(Ku,s.x),o.addScaledVector(Zu,s.y),o.addScaledVector(Ju,s.z),o}static isFrontFacing(t,e,n,r){return Ii.subVectors(n,e),ur.subVectors(t,e),Ii.cross(ur).dot(r)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,r){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,n,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Ii.subVectors(this.c,this.b),ur.subVectors(this.a,this.b),Ii.cross(ur).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Fi.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Fi.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,r,s){return Fi.getInterpolation(t,this.a,this.b,this.c,e,n,r,s)}containsPoint(t){return Fi.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Fi.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,r=this.b,s=this.c;let o,a;co.subVectors(r,n),uo.subVectors(s,n),qu.subVectors(t,n);const l=co.dot(qu),c=uo.dot(qu);if(l<=0&&c<=0)return e.copy(n);$u.subVectors(t,r);const u=co.dot($u),f=uo.dot($u);if(u>=0&&f<=u)return e.copy(r);const h=l*f-u*c;if(h<=0&&l>=0&&u<=0)return o=l/(l-u),e.copy(n).addScaledVector(co,o);ju.subVectors(t,s);const d=co.dot(ju),g=uo.dot(ju);if(g>=0&&d<=g)return e.copy(s);const _=d*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(uo,a);const m=u*g-d*f;if(m<=0&&f-u>=0&&d-g>=0)return xm.subVectors(s,r),a=(f-u)/(f-u+(d-g)),e.copy(r).addScaledVector(xm,a);const p=1/(m+_+h);return o=_*p,a=h*p,e.copy(n).addScaledVector(co,o).addScaledVector(uo,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const J0={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Or={h:0,s:0,l:0},zl={h:0,s:0,l:0};function Qu(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class ae{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=yi){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,fe.toWorkingColorSpace(this,e),this}setRGB(t,e,n,r=fe.workingColorSpace){return this.r=t,this.g=e,this.b=n,fe.toWorkingColorSpace(this,r),this}setHSL(t,e,n,r=fe.workingColorSpace){if(t=ub(t,1),e=On(e,0,1),n=On(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,o=2*n-s;this.r=Qu(o,s,t+1/3),this.g=Qu(o,s,t),this.b=Qu(o,s,t-1/3)}return fe.toWorkingColorSpace(this,r),this}setStyle(t,e=yi){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=yi){const n=J0[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=br(t.r),this.g=br(t.g),this.b=br(t.b),this}copyLinearToSRGB(t){return this.r=Bo(t.r),this.g=Bo(t.g),this.b=Bo(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=yi){return fe.fromWorkingColorSpace(vn.copy(this),t),Math.round(On(vn.r*255,0,255))*65536+Math.round(On(vn.g*255,0,255))*256+Math.round(On(vn.b*255,0,255))}getHexString(t=yi){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=fe.workingColorSpace){fe.fromWorkingColorSpace(vn.copy(this),e);const n=vn.r,r=vn.g,s=vn.b,o=Math.max(n,r,s),a=Math.min(n,r,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const f=o-a;switch(c=u<=.5?f/(o+a):f/(2-o-a),o){case n:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-n)/f+2;break;case s:l=(n-r)/f+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=fe.workingColorSpace){return fe.fromWorkingColorSpace(vn.copy(this),e),t.r=vn.r,t.g=vn.g,t.b=vn.b,t}getStyle(t=yi){fe.fromWorkingColorSpace(vn.copy(this),t);const e=vn.r,n=vn.g,r=vn.b;return t!==yi?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(t,e,n){return this.getHSL(Or),this.setHSL(Or.h+t,Or.s+e,Or.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Or),t.getHSL(zl);const n=Ou(Or.h,zl.h,e),r=Ou(Or.s,zl.s,e),s=Ou(Or.l,zl.l,e);return this.setHSL(n,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,r=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*r,this.g=s[1]*e+s[4]*n+s[7]*r,this.b=s[2]*e+s[5]*n+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const vn=new ae;ae.NAMES=J0;let Cb=0;class na extends js{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Cb++}),this.uuid=hl(),this.name="",this.blending=Oo,this.side=as,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=jf,this.blendDst=Kf,this.blendEquation=Ts,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ae(0,0,0),this.blendAlpha=0,this.depthFunc=$o,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=nm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=eo,this.stencilZFail=eo,this.stencilZPass=eo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Oo&&(n.blending=this.blending),this.side!==as&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==jf&&(n.blendSrc=this.blendSrc),this.blendDst!==Kf&&(n.blendDst=this.blendDst),this.blendEquation!==Ts&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==$o&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==nm&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==eo&&(n.stencilFail=this.stencilFail),this.stencilZFail!==eo&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==eo&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(e){const s=r(t.textures),o=r(t.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const r=e.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Q0 extends na{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new ae(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ir,this.combine=Rd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ye=new Z,kl=new Jt;class cn{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=im,this.updateRanges=[],this.gpuType=yr,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=e.array[n+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)kl.fromBufferAttribute(this,e),kl.applyMatrix3(t),this.setXY(e,kl.x,kl.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ye.fromBufferAttribute(this,e),Ye.applyMatrix3(t),this.setXYZ(e,Ye.x,Ye.y,Ye.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ye.fromBufferAttribute(this,e),Ye.applyMatrix4(t),this.setXYZ(e,Ye.x,Ye.y,Ye.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ye.fromBufferAttribute(this,e),Ye.applyNormalMatrix(t),this.setXYZ(e,Ye.x,Ye.y,Ye.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ye.fromBufferAttribute(this,e),Ye.transformDirection(t),this.setXYZ(e,Ye.x,Ye.y,Ye.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=fa(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Hn(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=fa(e,this.array)),e}setX(t,e){return this.normalized&&(e=Hn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=fa(e,this.array)),e}setY(t,e){return this.normalized&&(e=Hn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=fa(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Hn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=fa(e,this.array)),e}setW(t,e){return this.normalized&&(e=Hn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Hn(e,this.array),n=Hn(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,r){return t*=this.itemSize,this.normalized&&(e=Hn(e,this.array),n=Hn(n,this.array),r=Hn(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this}setXYZW(t,e,n,r,s){return t*=this.itemSize,this.normalized&&(e=Hn(e,this.array),n=Hn(n,this.array),r=Hn(r,this.array),s=Hn(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==im&&(t.usage=this.usage),t}}class tv extends cn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class ev extends cn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class pi extends cn{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Rb=0;const vi=new ze,tf=new un,fo=new Z,ni=new dl,ma=new dl,on=new Z;class Ri extends js{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Rb++}),this.uuid=hl(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new($0(t)?ev:tv)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new te().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return vi.makeRotationFromQuaternion(t),this.applyMatrix4(vi),this}rotateX(t){return vi.makeRotationX(t),this.applyMatrix4(vi),this}rotateY(t){return vi.makeRotationY(t),this.applyMatrix4(vi),this}rotateZ(t){return vi.makeRotationZ(t),this.applyMatrix4(vi),this}translate(t,e,n){return vi.makeTranslation(t,e,n),this.applyMatrix4(vi),this}scale(t,e,n){return vi.makeScale(t,e,n),this.applyMatrix4(vi),this}lookAt(t){return tf.lookAt(t),tf.updateMatrix(),this.applyMatrix4(tf.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(fo).negate(),this.translate(fo.x,fo.y,fo.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let r=0,s=t.length;r<s;r++){const o=t[r];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new pi(n,3))}else{for(let n=0,r=e.count;n<r;n++){const s=t[n];e.setXYZ(n,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new dl);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new Z(-1/0,-1/0,-1/0),new Z(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,r=e.length;n<r;n++){const s=e[n];ni.setFromBufferAttribute(s),this.morphTargetsRelative?(on.addVectors(this.boundingBox.min,ni.min),this.boundingBox.expandByPoint(on),on.addVectors(this.boundingBox.max,ni.max),this.boundingBox.expandByPoint(on)):(this.boundingBox.expandByPoint(ni.min),this.boundingBox.expandByPoint(ni.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new lu);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new Z,1/0);return}if(t){const n=this.boundingSphere.center;if(ni.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){const a=e[s];ma.setFromBufferAttribute(a),this.morphTargetsRelative?(on.addVectors(ni.min,ma.min),ni.expandByPoint(on),on.addVectors(ni.max,ma.max),ni.expandByPoint(on)):(ni.expandByPoint(ma.min),ni.expandByPoint(ma.max))}ni.getCenter(n);let r=0;for(let s=0,o=t.count;s<o;s++)on.fromBufferAttribute(t,s),r=Math.max(r,n.distanceToSquared(on));if(e)for(let s=0,o=e.length;s<o;s++){const a=e[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)on.fromBufferAttribute(a,c),l&&(fo.fromBufferAttribute(t,c),on.add(fo)),r=Math.max(r,n.distanceToSquared(on))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,r=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new cn(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let D=0;D<n.count;D++)a[D]=new Z,l[D]=new Z;const c=new Z,u=new Z,f=new Z,h=new Jt,d=new Jt,g=new Jt,_=new Z,m=new Z;function p(D,S,x){c.fromBufferAttribute(n,D),u.fromBufferAttribute(n,S),f.fromBufferAttribute(n,x),h.fromBufferAttribute(s,D),d.fromBufferAttribute(s,S),g.fromBufferAttribute(s,x),u.sub(c),f.sub(c),d.sub(h),g.sub(h);const I=1/(d.x*g.y-g.x*d.y);isFinite(I)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(f,-d.y).multiplyScalar(I),m.copy(f).multiplyScalar(d.x).addScaledVector(u,-g.x).multiplyScalar(I),a[D].add(_),a[S].add(_),a[x].add(_),l[D].add(m),l[S].add(m),l[x].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let D=0,S=M.length;D<S;++D){const x=M[D],I=x.start,F=x.count;for(let z=I,W=I+F;z<W;z+=3)p(t.getX(z+0),t.getX(z+1),t.getX(z+2))}const b=new Z,v=new Z,R=new Z,C=new Z;function T(D){R.fromBufferAttribute(r,D),C.copy(R);const S=a[D];b.copy(S),b.sub(R.multiplyScalar(R.dot(S))).normalize(),v.crossVectors(C,S);const I=v.dot(l[D])<0?-1:1;o.setXYZW(D,b.x,b.y,b.z,I)}for(let D=0,S=M.length;D<S;++D){const x=M[D],I=x.start,F=x.count;for(let z=I,W=I+F;z<W;z+=3)T(t.getX(z+0)),T(t.getX(z+1)),T(t.getX(z+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new cn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let h=0,d=n.count;h<d;h++)n.setXYZ(h,0,0,0);const r=new Z,s=new Z,o=new Z,a=new Z,l=new Z,c=new Z,u=new Z,f=new Z;if(t)for(let h=0,d=t.count;h<d;h+=3){const g=t.getX(h+0),_=t.getX(h+1),m=t.getX(h+2);r.fromBufferAttribute(e,g),s.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),a.add(u),l.add(u),c.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,d=e.count;h<d;h+=3)r.fromBufferAttribute(e,h+0),s.fromBufferAttribute(e,h+1),o.fromBufferAttribute(e,h+2),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)on.fromBufferAttribute(t,e),on.normalize(),t.setXYZ(e,on.x,on.y,on.z)}toNonIndexed(){function t(a,l){const c=a.array,u=a.itemSize,f=a.normalized,h=new c.constructor(l.length*u);let d=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?d=l[_]*a.data.stride+a.offset:d=l[_]*u;for(let p=0;p<u;p++)h[g++]=c[d++]}return new cn(h,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ri,n=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=t(l,n);e.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,f=c.length;u<f;u++){const h=c[u],d=t(h,n);l.push(d)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,h=c.length;f<h;f++){const d=c[f];u.push(d.toJSON(t.data))}u.length>0&&(r[l]=u,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const r=t.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(e))}const s=t.morphAttributes;for(const c in s){const u=[],f=s[c];for(let h=0,d=f.length;h<d;h++)u.push(f[h].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,u=o.length;c<u;c++){const f=o[c];this.addGroup(f.start,f.count,f.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ym=new ze,_s=new Od,Hl=new lu,Mm=new Z,Vl=new Z,Gl=new Z,Wl=new Z,ef=new Z,Xl=new Z,Sm=new Z,Yl=new Z;class Me extends un{constructor(t=new Ri,e=new Q0){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(r,t);const a=this.morphTargetInfluences;if(s&&a){Xl.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],f=s[l];u!==0&&(ef.fromBufferAttribute(f,t),o?Xl.addScaledVector(ef,u):Xl.addScaledVector(ef.sub(e),u))}e.add(Xl)}return e}raycast(t,e){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Hl.copy(n.boundingSphere),Hl.applyMatrix4(s),_s.copy(t.ray).recast(t.near),!(Hl.containsPoint(_s.origin)===!1&&(_s.intersectSphere(Hl,Mm)===null||_s.origin.distanceToSquared(Mm)>(t.far-t.near)**2))&&(ym.copy(s).invert(),_s.copy(t.ray).applyMatrix4(ym),!(n.boundingBox!==null&&_s.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,_s)))}_computeIntersections(t,e,n){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,h=s.groups,d=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){const m=h[g],p=o[m.materialIndex],M=Math.max(m.start,d.start),b=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let v=M,R=b;v<R;v+=3){const C=a.getX(v),T=a.getX(v+1),D=a.getX(v+2);r=ql(this,p,t,n,c,u,f,C,T,D),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const g=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const M=a.getX(m),b=a.getX(m+1),v=a.getX(m+2);r=ql(this,o,t,n,c,u,f,M,b,v),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){const m=h[g],p=o[m.materialIndex],M=Math.max(m.start,d.start),b=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let v=M,R=b;v<R;v+=3){const C=v,T=v+1,D=v+2;r=ql(this,p,t,n,c,u,f,C,T,D),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const g=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const M=m,b=m+1,v=m+2;r=ql(this,o,t,n,c,u,f,M,b,v),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}}}function Pb(i,t,e,n,r,s,o,a){let l;if(t.side===Kn?l=n.intersectTriangle(o,s,r,!0,a):l=n.intersectTriangle(r,s,o,t.side===as,a),l===null)return null;Yl.copy(a),Yl.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Yl);return c<e.near||c>e.far?null:{distance:c,point:Yl.clone(),object:i}}function ql(i,t,e,n,r,s,o,a,l,c){i.getVertexPosition(a,Vl),i.getVertexPosition(l,Gl),i.getVertexPosition(c,Wl);const u=Pb(i,t,e,n,Vl,Gl,Wl,Sm);if(u){const f=new Z;Fi.getBarycoord(Sm,Vl,Gl,Wl,f),r&&(u.uv=Fi.getInterpolatedAttribute(r,a,l,c,f,new Jt)),s&&(u.uv1=Fi.getInterpolatedAttribute(s,a,l,c,f,new Jt)),o&&(u.normal=Fi.getInterpolatedAttribute(o,a,l,c,f,new Z),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:l,c,normal:new Z,materialIndex:0};Fi.getNormal(Vl,Gl,Wl,h.normal),u.face=h,u.barycoord=f}return u}class Oi extends Ri{constructor(t=1,e=1,n=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],f=[];let h=0,d=0;g("z","y","x",-1,-1,n,e,t,o,s,0),g("z","y","x",1,-1,n,e,-t,o,s,1),g("x","z","y",1,1,t,n,e,r,o,2),g("x","z","y",1,-1,t,n,-e,r,o,3),g("x","y","z",1,-1,t,e,n,r,s,4),g("x","y","z",-1,-1,t,e,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new pi(c,3)),this.setAttribute("normal",new pi(u,3)),this.setAttribute("uv",new pi(f,2));function g(_,m,p,M,b,v,R,C,T,D,S){const x=v/T,I=R/D,F=v/2,z=R/2,W=C/2,tt=T+1,G=D+1;let K=0,H=0;const ct=new Z;for(let N=0;N<G;N++){const vt=N*I-z;for(let Lt=0;Lt<tt;Lt++){const qt=Lt*x-F;ct[_]=qt*M,ct[m]=vt*b,ct[p]=W,c.push(ct.x,ct.y,ct.z),ct[_]=0,ct[m]=0,ct[p]=C>0?1:-1,u.push(ct.x,ct.y,ct.z),f.push(Lt/T),f.push(1-N/D),K+=1}}for(let N=0;N<D;N++)for(let vt=0;vt<T;vt++){const Lt=h+vt+tt*N,qt=h+vt+tt*(N+1),nt=h+(vt+1)+tt*(N+1),ht=h+(vt+1)+tt*N;l.push(Lt,qt,ht),l.push(qt,nt,ht),H+=6}a.addGroup(d,H,S),d+=H,h+=K}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Oi(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Qo(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const r=i[e][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=r.clone():Array.isArray(r)?t[e][n]=r.slice():t[e][n]=r}}return t}function Dn(i){const t={};for(let e=0;e<i.length;e++){const n=Qo(i[e]);for(const r in n)t[r]=n[r]}return t}function Db(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function nv(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:fe.workingColorSpace}const Lb={clone:Qo,merge:Dn};var Ib=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ub=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class rr extends na{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ib,this.fragmentShader=Ub,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Qo(t.uniforms),this.uniformsGroups=Db(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?e.uniforms[r]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[r]={type:"m4",value:o.toArray()}:e.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class iv extends un{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ze,this.projectionMatrix=new ze,this.projectionMatrixInverse=new ze,this.coordinateSystem=Mr}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Fr=new Z,bm=new Jt,Em=new Jt;class li extends iv{constructor(t=50,e=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Uh*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(yc*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Uh*2*Math.atan(Math.tan(yc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Fr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Fr.x,Fr.y).multiplyScalar(-t/Fr.z),Fr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Fr.x,Fr.y).multiplyScalar(-t/Fr.z)}getViewSize(t,e){return this.getViewBounds(t,bm,Em),e.subVectors(Em,bm)}setViewOffset(t,e,n,r,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(yc*.5*this.fov)/this.zoom,n=2*e,r=this.aspect*n,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,e-=o.offsetY*n/c,r*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const ho=-90,po=1;class Nb extends un{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new li(ho,po,t,e);r.layers=this.layers,this.add(r);const s=new li(ho,po,t,e);s.layers=this.layers,this.add(s);const o=new li(ho,po,t,e);o.layers=this.layers,this.add(o);const a=new li(ho,po,t,e);a.layers=this.layers,this.add(a);const l=new li(ho,po,t,e);l.layers=this.layers,this.add(l);const c=new li(ho,po,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,r,s,o,a,l]=e;for(const c of e)this.remove(c);if(t===Mr)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Gc)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,f=t.getRenderTarget(),h=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,r),t.render(e,s),t.setRenderTarget(n,1,r),t.render(e,o),t.setRenderTarget(n,2,r),t.render(e,a),t.setRenderTarget(n,3,r),t.render(e,l),t.setRenderTarget(n,4,r),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,r),t.render(e,u),t.setRenderTarget(f,h,d),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class rv extends Zn{constructor(t,e,n,r,s,o,a,l,c,u){t=t!==void 0?t:[],e=e!==void 0?e:jo,super(t,e,n,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Ob extends Xs{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},r=[n,n,n,n,n,n];this.texture=new rv(r,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Ji}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Oi(5,5,5),s=new rr({name:"CubemapFromEquirect",uniforms:Qo(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Kn,blending:ts});s.uniforms.tEquirect.value=e;const o=new Me(r,s),a=e.minFilter;return e.minFilter===Ps&&(e.minFilter=Ji),new Nb(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,r){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,r);t.setRenderTarget(s)}}const nf=new Z,Fb=new Z,Bb=new te;class Hr{constructor(t=new Z(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,r){return this.normal.set(t,e,n),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const r=nf.subVectors(n,e).cross(Fb.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(nf),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Bb.getNormalMatrix(t),r=this.coplanarPoint(nf).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const gs=new lu,$l=new Z;class Fd{constructor(t=new Hr,e=new Hr,n=new Hr,r=new Hr,s=new Hr,o=new Hr){this.planes=[t,e,n,r,s,o]}set(t,e,n,r,s,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Mr){const n=this.planes,r=t.elements,s=r[0],o=r[1],a=r[2],l=r[3],c=r[4],u=r[5],f=r[6],h=r[7],d=r[8],g=r[9],_=r[10],m=r[11],p=r[12],M=r[13],b=r[14],v=r[15];if(n[0].setComponents(l-s,h-c,m-d,v-p).normalize(),n[1].setComponents(l+s,h+c,m+d,v+p).normalize(),n[2].setComponents(l+o,h+u,m+g,v+M).normalize(),n[3].setComponents(l-o,h-u,m-g,v-M).normalize(),n[4].setComponents(l-a,h-f,m-_,v-b).normalize(),e===Mr)n[5].setComponents(l+a,h+f,m+_,v+b).normalize();else if(e===Gc)n[5].setComponents(a,f,_,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),gs.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),gs.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(gs)}intersectsSprite(t){return gs.center.set(0,0,0),gs.radius=.7071067811865476,gs.applyMatrix4(t.matrixWorld),this.intersectsSphere(gs)}intersectsSphere(t){const e=this.planes,n=t.center,r=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const r=e[n];if($l.x=r.normal.x>0?t.max.x:t.min.x,$l.y=r.normal.y>0?t.max.y:t.min.y,$l.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint($l)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function sv(){let i=null,t=!1,e=null,n=null;function r(s,o){e(s,o),n=i.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(r),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){i=s}}}function zb(i){const t=new WeakMap;function e(a,l){const c=a.array,u=a.usage,f=c.byteLength,h=i.createBuffer();i.bindBuffer(l,h),i.bufferData(l,c,u),a.onUploadCallback();let d;if(c instanceof Float32Array)d=i.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=i.SHORT;else if(c instanceof Uint32Array)d=i.UNSIGNED_INT;else if(c instanceof Int32Array)d=i.INT;else if(c instanceof Int8Array)d=i.BYTE;else if(c instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:f}}function n(a,l,c){const u=l.array,f=l.updateRanges;if(i.bindBuffer(c,a),f.length===0)i.bufferSubData(c,0,u);else{f.sort((d,g)=>d.start-g.start);let h=0;for(let d=1;d<f.length;d++){const g=f[h],_=f[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++h,f[h]=_)}f.length=h+1;for(let d=0,g=f.length;d<g;d++){const _=f[d];i.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}class jr extends Ri{constructor(t=1,e=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:r};const s=t/2,o=e/2,a=Math.floor(n),l=Math.floor(r),c=a+1,u=l+1,f=t/a,h=e/l,d=[],g=[],_=[],m=[];for(let p=0;p<u;p++){const M=p*h-o;for(let b=0;b<c;b++){const v=b*f-s;g.push(v,-M,0),_.push(0,0,1),m.push(b/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let M=0;M<a;M++){const b=M+c*p,v=M+c*(p+1),R=M+1+c*(p+1),C=M+1+c*p;d.push(b,v,C),d.push(v,R,C)}this.setIndex(d),this.setAttribute("position",new pi(g,3)),this.setAttribute("normal",new pi(_,3)),this.setAttribute("uv",new pi(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new jr(t.width,t.height,t.widthSegments,t.heightSegments)}}var kb=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Hb=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Vb=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Gb=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Wb=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Xb=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Yb=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,qb=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,$b=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,jb=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Kb=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Zb=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Jb=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Qb=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,tE=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,eE=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,nE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,iE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,rE=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,sE=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,oE=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,aE=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,lE=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,cE=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,uE=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,fE=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,hE=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,dE=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,pE=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,mE=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,_E="gl_FragColor = linearToOutputTexel( gl_FragColor );",gE=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,vE=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,xE=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,yE=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,ME=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,SE=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,bE=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,EE=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,TE=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,wE=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,AE=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,CE=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,RE=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,PE=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,DE=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,LE=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,IE=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,UE=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,NE=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,OE=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,FE=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,BE=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,zE=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,kE=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,HE=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,VE=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,GE=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,WE=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,XE=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,YE=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,qE=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,$E=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,jE=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,KE=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ZE=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,JE=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,QE=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,tT=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,eT=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,nT=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,iT=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,rT=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,sT=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,oT=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,aT=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,lT=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,cT=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,uT=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,fT=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,hT=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,dT=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,pT=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,mT=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,_T=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,gT=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,vT=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,xT=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,yT=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,MT=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,ST=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,bT=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,ET=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,TT=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,wT=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,AT=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,CT=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,RT=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,PT=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,DT=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,LT=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,IT=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,UT=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,NT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,OT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,FT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,BT=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const zT=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,kT=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,HT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,VT=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,GT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,WT=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,XT=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,YT=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,qT=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,$T=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,jT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,KT=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ZT=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,JT=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,QT=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,t1=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,e1=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,n1=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,i1=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,r1=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,s1=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,o1=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,a1=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,l1=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,c1=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,u1=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,f1=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,h1=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,d1=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,p1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,m1=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_1=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,g1=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,v1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ee={alphahash_fragment:kb,alphahash_pars_fragment:Hb,alphamap_fragment:Vb,alphamap_pars_fragment:Gb,alphatest_fragment:Wb,alphatest_pars_fragment:Xb,aomap_fragment:Yb,aomap_pars_fragment:qb,batching_pars_vertex:$b,batching_vertex:jb,begin_vertex:Kb,beginnormal_vertex:Zb,bsdfs:Jb,iridescence_fragment:Qb,bumpmap_pars_fragment:tE,clipping_planes_fragment:eE,clipping_planes_pars_fragment:nE,clipping_planes_pars_vertex:iE,clipping_planes_vertex:rE,color_fragment:sE,color_pars_fragment:oE,color_pars_vertex:aE,color_vertex:lE,common:cE,cube_uv_reflection_fragment:uE,defaultnormal_vertex:fE,displacementmap_pars_vertex:hE,displacementmap_vertex:dE,emissivemap_fragment:pE,emissivemap_pars_fragment:mE,colorspace_fragment:_E,colorspace_pars_fragment:gE,envmap_fragment:vE,envmap_common_pars_fragment:xE,envmap_pars_fragment:yE,envmap_pars_vertex:ME,envmap_physical_pars_fragment:LE,envmap_vertex:SE,fog_vertex:bE,fog_pars_vertex:EE,fog_fragment:TE,fog_pars_fragment:wE,gradientmap_pars_fragment:AE,lightmap_pars_fragment:CE,lights_lambert_fragment:RE,lights_lambert_pars_fragment:PE,lights_pars_begin:DE,lights_toon_fragment:IE,lights_toon_pars_fragment:UE,lights_phong_fragment:NE,lights_phong_pars_fragment:OE,lights_physical_fragment:FE,lights_physical_pars_fragment:BE,lights_fragment_begin:zE,lights_fragment_maps:kE,lights_fragment_end:HE,logdepthbuf_fragment:VE,logdepthbuf_pars_fragment:GE,logdepthbuf_pars_vertex:WE,logdepthbuf_vertex:XE,map_fragment:YE,map_pars_fragment:qE,map_particle_fragment:$E,map_particle_pars_fragment:jE,metalnessmap_fragment:KE,metalnessmap_pars_fragment:ZE,morphinstance_vertex:JE,morphcolor_vertex:QE,morphnormal_vertex:tT,morphtarget_pars_vertex:eT,morphtarget_vertex:nT,normal_fragment_begin:iT,normal_fragment_maps:rT,normal_pars_fragment:sT,normal_pars_vertex:oT,normal_vertex:aT,normalmap_pars_fragment:lT,clearcoat_normal_fragment_begin:cT,clearcoat_normal_fragment_maps:uT,clearcoat_pars_fragment:fT,iridescence_pars_fragment:hT,opaque_fragment:dT,packing:pT,premultiplied_alpha_fragment:mT,project_vertex:_T,dithering_fragment:gT,dithering_pars_fragment:vT,roughnessmap_fragment:xT,roughnessmap_pars_fragment:yT,shadowmap_pars_fragment:MT,shadowmap_pars_vertex:ST,shadowmap_vertex:bT,shadowmask_pars_fragment:ET,skinbase_vertex:TT,skinning_pars_vertex:wT,skinning_vertex:AT,skinnormal_vertex:CT,specularmap_fragment:RT,specularmap_pars_fragment:PT,tonemapping_fragment:DT,tonemapping_pars_fragment:LT,transmission_fragment:IT,transmission_pars_fragment:UT,uv_pars_fragment:NT,uv_pars_vertex:OT,uv_vertex:FT,worldpos_vertex:BT,background_vert:zT,background_frag:kT,backgroundCube_vert:HT,backgroundCube_frag:VT,cube_vert:GT,cube_frag:WT,depth_vert:XT,depth_frag:YT,distanceRGBA_vert:qT,distanceRGBA_frag:$T,equirect_vert:jT,equirect_frag:KT,linedashed_vert:ZT,linedashed_frag:JT,meshbasic_vert:QT,meshbasic_frag:t1,meshlambert_vert:e1,meshlambert_frag:n1,meshmatcap_vert:i1,meshmatcap_frag:r1,meshnormal_vert:s1,meshnormal_frag:o1,meshphong_vert:a1,meshphong_frag:l1,meshphysical_vert:c1,meshphysical_frag:u1,meshtoon_vert:f1,meshtoon_frag:h1,points_vert:d1,points_frag:p1,shadow_vert:m1,shadow_frag:_1,sprite_vert:g1,sprite_frag:v1},At={common:{diffuse:{value:new ae(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new te},alphaMap:{value:null},alphaMapTransform:{value:new te},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new te}},envmap:{envMap:{value:null},envMapRotation:{value:new te},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new te}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new te}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new te},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new te},normalScale:{value:new Jt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new te},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new te}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new te}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new te}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ae(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ae(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new te},alphaTest:{value:0},uvTransform:{value:new te}},sprite:{diffuse:{value:new ae(16777215)},opacity:{value:1},center:{value:new Jt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new te},alphaMap:{value:null},alphaMapTransform:{value:new te},alphaTest:{value:0}}},qi={basic:{uniforms:Dn([At.common,At.specularmap,At.envmap,At.aomap,At.lightmap,At.fog]),vertexShader:ee.meshbasic_vert,fragmentShader:ee.meshbasic_frag},lambert:{uniforms:Dn([At.common,At.specularmap,At.envmap,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.fog,At.lights,{emissive:{value:new ae(0)}}]),vertexShader:ee.meshlambert_vert,fragmentShader:ee.meshlambert_frag},phong:{uniforms:Dn([At.common,At.specularmap,At.envmap,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.fog,At.lights,{emissive:{value:new ae(0)},specular:{value:new ae(1118481)},shininess:{value:30}}]),vertexShader:ee.meshphong_vert,fragmentShader:ee.meshphong_frag},standard:{uniforms:Dn([At.common,At.envmap,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.roughnessmap,At.metalnessmap,At.fog,At.lights,{emissive:{value:new ae(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ee.meshphysical_vert,fragmentShader:ee.meshphysical_frag},toon:{uniforms:Dn([At.common,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.gradientmap,At.fog,At.lights,{emissive:{value:new ae(0)}}]),vertexShader:ee.meshtoon_vert,fragmentShader:ee.meshtoon_frag},matcap:{uniforms:Dn([At.common,At.bumpmap,At.normalmap,At.displacementmap,At.fog,{matcap:{value:null}}]),vertexShader:ee.meshmatcap_vert,fragmentShader:ee.meshmatcap_frag},points:{uniforms:Dn([At.points,At.fog]),vertexShader:ee.points_vert,fragmentShader:ee.points_frag},dashed:{uniforms:Dn([At.common,At.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ee.linedashed_vert,fragmentShader:ee.linedashed_frag},depth:{uniforms:Dn([At.common,At.displacementmap]),vertexShader:ee.depth_vert,fragmentShader:ee.depth_frag},normal:{uniforms:Dn([At.common,At.bumpmap,At.normalmap,At.displacementmap,{opacity:{value:1}}]),vertexShader:ee.meshnormal_vert,fragmentShader:ee.meshnormal_frag},sprite:{uniforms:Dn([At.sprite,At.fog]),vertexShader:ee.sprite_vert,fragmentShader:ee.sprite_frag},background:{uniforms:{uvTransform:{value:new te},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ee.background_vert,fragmentShader:ee.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new te}},vertexShader:ee.backgroundCube_vert,fragmentShader:ee.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ee.cube_vert,fragmentShader:ee.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ee.equirect_vert,fragmentShader:ee.equirect_frag},distanceRGBA:{uniforms:Dn([At.common,At.displacementmap,{referencePosition:{value:new Z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ee.distanceRGBA_vert,fragmentShader:ee.distanceRGBA_frag},shadow:{uniforms:Dn([At.lights,At.fog,{color:{value:new ae(0)},opacity:{value:1}}]),vertexShader:ee.shadow_vert,fragmentShader:ee.shadow_frag}};qi.physical={uniforms:Dn([qi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new te},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new te},clearcoatNormalScale:{value:new Jt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new te},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new te},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new te},sheen:{value:0},sheenColor:{value:new ae(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new te},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new te},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new te},transmissionSamplerSize:{value:new Jt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new te},attenuationDistance:{value:0},attenuationColor:{value:new ae(0)},specularColor:{value:new ae(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new te},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new te},anisotropyVector:{value:new Jt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new te}}]),vertexShader:ee.meshphysical_vert,fragmentShader:ee.meshphysical_frag};const jl={r:0,b:0,g:0},vs=new ir,x1=new ze;function y1(i,t,e,n,r,s,o){const a=new ae(0);let l=s===!0?0:1,c,u,f=null,h=0,d=null;function g(M){let b=M.isScene===!0?M.background:null;return b&&b.isTexture&&(b=(M.backgroundBlurriness>0?e:t).get(b)),b}function _(M){let b=!1;const v=g(M);v===null?p(a,l):v&&v.isColor&&(p(v,1),b=!0);const R=i.xr.getEnvironmentBlendMode();R==="additive"?n.buffers.color.setClear(0,0,0,1,o):R==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||b)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(M,b){const v=g(b);v&&(v.isCubeTexture||v.mapping===ou)?(u===void 0&&(u=new Me(new Oi(1,1,1),new rr({name:"BackgroundCubeMaterial",uniforms:Qo(qi.backgroundCube.uniforms),vertexShader:qi.backgroundCube.vertexShader,fragmentShader:qi.backgroundCube.fragmentShader,side:Kn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(R,C,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),vs.copy(b.backgroundRotation),vs.x*=-1,vs.y*=-1,vs.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(vs.y*=-1,vs.z*=-1),u.material.uniforms.envMap.value=v,u.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(x1.makeRotationFromEuler(vs)),u.material.toneMapped=fe.getTransfer(v.colorSpace)!==Se,(f!==v||h!==v.version||d!==i.toneMapping)&&(u.material.needsUpdate=!0,f=v,h=v.version,d=i.toneMapping),u.layers.enableAll(),M.unshift(u,u.geometry,u.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new Me(new jr(2,2),new rr({name:"BackgroundMaterial",uniforms:Qo(qi.background.uniforms),vertexShader:qi.background.vertexShader,fragmentShader:qi.background.fragmentShader,side:as,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.toneMapped=fe.getTransfer(v.colorSpace)!==Se,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(f!==v||h!==v.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,f=v,h=v.version,d=i.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function p(M,b){M.getRGB(jl,nv(i)),n.buffers.color.setClear(jl.r,jl.g,jl.b,b,o)}return{getClearColor:function(){return a},setClearColor:function(M,b=1){a.set(M),l=b,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(M){l=M,p(a,l)},render:_,addToRenderList:m}}function M1(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=h(null);let s=r,o=!1;function a(x,I,F,z,W){let tt=!1;const G=f(z,F,I);s!==G&&(s=G,c(s.object)),tt=d(x,z,F,W),tt&&g(x,z,F,W),W!==null&&t.update(W,i.ELEMENT_ARRAY_BUFFER),(tt||o)&&(o=!1,v(x,I,F,z),W!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(W).buffer))}function l(){return i.createVertexArray()}function c(x){return i.bindVertexArray(x)}function u(x){return i.deleteVertexArray(x)}function f(x,I,F){const z=F.wireframe===!0;let W=n[x.id];W===void 0&&(W={},n[x.id]=W);let tt=W[I.id];tt===void 0&&(tt={},W[I.id]=tt);let G=tt[z];return G===void 0&&(G=h(l()),tt[z]=G),G}function h(x){const I=[],F=[],z=[];for(let W=0;W<e;W++)I[W]=0,F[W]=0,z[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:F,attributeDivisors:z,object:x,attributes:{},index:null}}function d(x,I,F,z){const W=s.attributes,tt=I.attributes;let G=0;const K=F.getAttributes();for(const H in K)if(K[H].location>=0){const N=W[H];let vt=tt[H];if(vt===void 0&&(H==="instanceMatrix"&&x.instanceMatrix&&(vt=x.instanceMatrix),H==="instanceColor"&&x.instanceColor&&(vt=x.instanceColor)),N===void 0||N.attribute!==vt||vt&&N.data!==vt.data)return!0;G++}return s.attributesNum!==G||s.index!==z}function g(x,I,F,z){const W={},tt=I.attributes;let G=0;const K=F.getAttributes();for(const H in K)if(K[H].location>=0){let N=tt[H];N===void 0&&(H==="instanceMatrix"&&x.instanceMatrix&&(N=x.instanceMatrix),H==="instanceColor"&&x.instanceColor&&(N=x.instanceColor));const vt={};vt.attribute=N,N&&N.data&&(vt.data=N.data),W[H]=vt,G++}s.attributes=W,s.attributesNum=G,s.index=z}function _(){const x=s.newAttributes;for(let I=0,F=x.length;I<F;I++)x[I]=0}function m(x){p(x,0)}function p(x,I){const F=s.newAttributes,z=s.enabledAttributes,W=s.attributeDivisors;F[x]=1,z[x]===0&&(i.enableVertexAttribArray(x),z[x]=1),W[x]!==I&&(i.vertexAttribDivisor(x,I),W[x]=I)}function M(){const x=s.newAttributes,I=s.enabledAttributes;for(let F=0,z=I.length;F<z;F++)I[F]!==x[F]&&(i.disableVertexAttribArray(F),I[F]=0)}function b(x,I,F,z,W,tt,G){G===!0?i.vertexAttribIPointer(x,I,F,W,tt):i.vertexAttribPointer(x,I,F,z,W,tt)}function v(x,I,F,z){_();const W=z.attributes,tt=F.getAttributes(),G=I.defaultAttributeValues;for(const K in tt){const H=tt[K];if(H.location>=0){let ct=W[K];if(ct===void 0&&(K==="instanceMatrix"&&x.instanceMatrix&&(ct=x.instanceMatrix),K==="instanceColor"&&x.instanceColor&&(ct=x.instanceColor)),ct!==void 0){const N=ct.normalized,vt=ct.itemSize,Lt=t.get(ct);if(Lt===void 0)continue;const qt=Lt.buffer,nt=Lt.type,ht=Lt.bytesPerElement,yt=nt===i.INT||nt===i.UNSIGNED_INT||ct.gpuType===Pd;if(ct.isInterleavedBufferAttribute){const dt=ct.data,Pt=dt.stride,It=ct.offset;if(dt.isInstancedInterleavedBuffer){for(let kt=0;kt<H.locationSize;kt++)p(H.location+kt,dt.meshPerAttribute);x.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=dt.meshPerAttribute*dt.count)}else for(let kt=0;kt<H.locationSize;kt++)m(H.location+kt);i.bindBuffer(i.ARRAY_BUFFER,qt);for(let kt=0;kt<H.locationSize;kt++)b(H.location+kt,vt/H.locationSize,nt,N,Pt*ht,(It+vt/H.locationSize*kt)*ht,yt)}else{if(ct.isInstancedBufferAttribute){for(let dt=0;dt<H.locationSize;dt++)p(H.location+dt,ct.meshPerAttribute);x.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=ct.meshPerAttribute*ct.count)}else for(let dt=0;dt<H.locationSize;dt++)m(H.location+dt);i.bindBuffer(i.ARRAY_BUFFER,qt);for(let dt=0;dt<H.locationSize;dt++)b(H.location+dt,vt/H.locationSize,nt,N,vt*ht,vt/H.locationSize*dt*ht,yt)}}else if(G!==void 0){const N=G[K];if(N!==void 0)switch(N.length){case 2:i.vertexAttrib2fv(H.location,N);break;case 3:i.vertexAttrib3fv(H.location,N);break;case 4:i.vertexAttrib4fv(H.location,N);break;default:i.vertexAttrib1fv(H.location,N)}}}}M()}function R(){D();for(const x in n){const I=n[x];for(const F in I){const z=I[F];for(const W in z)u(z[W].object),delete z[W];delete I[F]}delete n[x]}}function C(x){if(n[x.id]===void 0)return;const I=n[x.id];for(const F in I){const z=I[F];for(const W in z)u(z[W].object),delete z[W];delete I[F]}delete n[x.id]}function T(x){for(const I in n){const F=n[I];if(F[x.id]===void 0)continue;const z=F[x.id];for(const W in z)u(z[W].object),delete z[W];delete F[x.id]}}function D(){S(),o=!0,s!==r&&(s=r,c(s.object))}function S(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:D,resetDefaultState:S,dispose:R,releaseStatesOfGeometry:C,releaseStatesOfProgram:T,initAttributes:_,enableAttribute:m,disableUnusedAttributes:M}}function S1(i,t,e){let n;function r(c){n=c}function s(c,u){i.drawArrays(n,c,u),e.update(u,n,1)}function o(c,u,f){f!==0&&(i.drawArraysInstanced(n,c,u,f),e.update(u,n,f))}function a(c,u,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,f);let d=0;for(let g=0;g<f;g++)d+=u[g];e.update(d,n,1)}function l(c,u,f,h){if(f===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<c.length;g++)o(c[g],u[g],h[g]);else{d.multiDrawArraysInstancedWEBGL(n,c,0,u,0,h,0,f);let g=0;for(let _=0;_<f;_++)g+=u[_]*h[_];e.update(g,n,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function b1(i,t,e,n){let r;function s(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const T=t.get("EXT_texture_filter_anisotropic");r=i.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(T){return!(T!==Bi&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(T){const D=T===fl&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(T!==Cr&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==yr&&!D)}function l(T){if(T==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const f=e.logarithmicDepthBuffer===!0,h=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),b=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),R=g>0,C=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:f,reverseDepthBuffer:h,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:M,maxVaryings:b,maxFragmentUniforms:v,vertexTextures:R,maxSamples:C}}function E1(i){const t=this;let e=null,n=0,r=!1,s=!1;const o=new Hr,a=new te,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const d=f.length!==0||h||n!==0||r;return r=h,n=f.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,h){e=u(f,h,0)},this.setState=function(f,h,d){const g=f.clippingPlanes,_=f.clipIntersection,m=f.clipShadows,p=i.get(f);if(!r||g===null||g.length===0||s&&!m)s?u(null):c();else{const M=s?0:n,b=M*4;let v=p.clippingState||null;l.value=v,v=u(g,h,b,d);for(let R=0;R!==b;++R)v[R]=e[R];p.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(f,h,d,g){const _=f!==null?f.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const p=d+_*4,M=h.matrixWorldInverse;a.getNormalMatrix(M),(m===null||m.length<p)&&(m=new Float32Array(p));for(let b=0,v=d;b!==_;++b,v+=4)o.copy(f[b]).applyMatrix4(M,a),o.normal.toArray(m,v),m[v+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function T1(i){let t=new WeakMap;function e(o,a){return a===rh?o.mapping=jo:a===sh&&(o.mapping=Ko),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===rh||a===sh)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Ob(l.height);return c.fromEquirectangularTexture(i,o),t.set(o,c),o.addEventListener("dispose",r),e(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}class ov extends iv{constructor(t=-1,e=1,n=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-t,o=n+t,a=r+e,l=r-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const bo=4,Tm=[.125,.215,.35,.446,.526,.582],ws=20,rf=new ov,wm=new ae;let sf=null,of=0,af=0,lf=!1;const Es=(1+Math.sqrt(5))/2,mo=1/Es,Am=[new Z(-Es,mo,0),new Z(Es,mo,0),new Z(-mo,0,Es),new Z(mo,0,Es),new Z(0,Es,-mo),new Z(0,Es,mo),new Z(-1,1,-1),new Z(1,1,-1),new Z(-1,1,1),new Z(1,1,1)];class Cm{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,r=100){sf=this._renderer.getRenderTarget(),of=this._renderer.getActiveCubeFace(),af=this._renderer.getActiveMipmapLevel(),lf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,n,r,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Dm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Pm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(sf,of,af),this._renderer.xr.enabled=lf,t.scissorTest=!1,Kl(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===jo||t.mapping===Ko?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),sf=this._renderer.getRenderTarget(),of=this._renderer.getActiveCubeFace(),af=this._renderer.getActiveMipmapLevel(),lf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Ji,minFilter:Ji,generateMipmaps:!1,type:fl,format:Bi,colorSpace:ea,depthBuffer:!1},r=Rm(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Rm(t,e,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=w1(s)),this._blurMaterial=A1(s,t,e)}return r}_compileMaterial(t){const e=new Me(this._lodPlanes[0],t);this._renderer.compile(e,rf)}_sceneToCubeUV(t,e,n,r){const a=new li(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,h=u.toneMapping;u.getClearColor(wm),u.toneMapping=es,u.autoClear=!1;const d=new Q0({name:"PMREM.Background",side:Kn,depthWrite:!1,depthTest:!1}),g=new Me(new Oi,d);let _=!1;const m=t.background;m?m.isColor&&(d.color.copy(m),t.background=null,_=!0):(d.color.copy(wm),_=!0);for(let p=0;p<6;p++){const M=p%3;M===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):M===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const b=this._cubeSize;Kl(r,M*b,p>2?b:0,b,b),u.setRenderTarget(r),_&&u.render(g,a),u.render(t,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=h,u.autoClear=f,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,r=t.mapping===jo||t.mapping===Ko;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Dm()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Pm());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new Me(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;const l=this._cubeSize;Kl(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,rf)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Am[(r-s-1)%Am.length];this._blur(t,s-1,s,o,a)}e.autoClear=n}_blur(t,e,n,r,s){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,r,"latitudinal",s),this._halfBlur(o,t,n,n,r,"longitudinal",s)}_halfBlur(t,e,n,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,f=new Me(this._lodPlanes[r],c),h=c.uniforms,d=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*ws-1),_=s/g,m=isFinite(s)?1+Math.floor(u*_):ws;m>ws&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ws}`);const p=[];let M=0;for(let T=0;T<ws;++T){const D=T/_,S=Math.exp(-D*D/2);p.push(S),T===0?M+=S:T<m&&(M+=2*S)}for(let T=0;T<p.length;T++)p[T]=p[T]/M;h.envMap.value=t.texture,h.samples.value=m,h.weights.value=p,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:b}=this;h.dTheta.value=g,h.mipInt.value=b-n;const v=this._sizeLods[r],R=3*v*(r>b-bo?r-b+bo:0),C=4*(this._cubeSize-v);Kl(e,R,C,3*v,2*v),l.setRenderTarget(e),l.render(f,rf)}}function w1(i){const t=[],e=[],n=[];let r=i;const s=i-bo+1+Tm.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);e.push(a);let l=1/a;o>i-bo?l=Tm[o-i+bo-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,f=1+c,h=[u,u,f,u,f,f,u,u,f,f,u,f],d=6,g=6,_=3,m=2,p=1,M=new Float32Array(_*g*d),b=new Float32Array(m*g*d),v=new Float32Array(p*g*d);for(let C=0;C<d;C++){const T=C%3*2/3-1,D=C>2?0:-1,S=[T,D,0,T+2/3,D,0,T+2/3,D+1,0,T,D,0,T+2/3,D+1,0,T,D+1,0];M.set(S,_*g*C),b.set(h,m*g*C);const x=[C,C,C,C,C,C];v.set(x,p*g*C)}const R=new Ri;R.setAttribute("position",new cn(M,_)),R.setAttribute("uv",new cn(b,m)),R.setAttribute("faceIndex",new cn(v,p)),t.push(R),r>bo&&r--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Rm(i,t,e){const n=new Xs(i,t,e);return n.texture.mapping=ou,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Kl(i,t,e,n,r){i.viewport.set(t,e,n,r),i.scissor.set(t,e,n,r)}function A1(i,t,e){const n=new Float32Array(ws),r=new Z(0,1,0);return new rr({name:"SphericalGaussianBlur",defines:{n:ws,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Bd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ts,depthTest:!1,depthWrite:!1})}function Pm(){return new rr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Bd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ts,depthTest:!1,depthWrite:!1})}function Dm(){return new rr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Bd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ts,depthTest:!1,depthWrite:!1})}function Bd(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function C1(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===rh||l===sh,u=l===jo||l===Ko;if(c||u){let f=t.get(a);const h=f!==void 0?f.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==h)return e===null&&(e=new Cm(i)),f=c?e.fromEquirectangular(a,f):e.fromCubemap(a,f),f.texture.pmremVersion=a.pmremVersion,t.set(a,f),f.texture;if(f!==void 0)return f.texture;{const d=a.image;return c&&d&&d.height>0||u&&d&&r(d)?(e===null&&(e=new Cm(i)),f=c?e.fromEquirectangular(a):e.fromCubemap(a),f.texture.pmremVersion=a.pmremVersion,t.set(a,f),a.addEventListener("dispose",s),f.texture):null}}}return a}function r(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function R1(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return t[n]=r,r}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const r=e(n);return r===null&&Ea("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function P1(i,t,e,n){const r={},s=new WeakMap;function o(f){const h=f.target;h.index!==null&&t.remove(h.index);for(const g in h.attributes)t.remove(h.attributes[g]);for(const g in h.morphAttributes){const _=h.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)t.remove(_[m])}h.removeEventListener("dispose",o),delete r[h.id];const d=s.get(h);d&&(t.remove(d),s.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function a(f,h){return r[h.id]===!0||(h.addEventListener("dispose",o),r[h.id]=!0,e.memory.geometries++),h}function l(f){const h=f.attributes;for(const g in h)t.update(h[g],i.ARRAY_BUFFER);const d=f.morphAttributes;for(const g in d){const _=d[g];for(let m=0,p=_.length;m<p;m++)t.update(_[m],i.ARRAY_BUFFER)}}function c(f){const h=[],d=f.index,g=f.attributes.position;let _=0;if(d!==null){const M=d.array;_=d.version;for(let b=0,v=M.length;b<v;b+=3){const R=M[b+0],C=M[b+1],T=M[b+2];h.push(R,C,C,T,T,R)}}else if(g!==void 0){const M=g.array;_=g.version;for(let b=0,v=M.length/3-1;b<v;b+=3){const R=b+0,C=b+1,T=b+2;h.push(R,C,C,T,T,R)}}else return;const m=new($0(h)?ev:tv)(h,1);m.version=_;const p=s.get(f);p&&t.remove(p),s.set(f,m)}function u(f){const h=s.get(f);if(h){const d=f.index;d!==null&&h.version<d.version&&c(f)}else c(f);return s.get(f)}return{get:a,update:l,getWireframeAttribute:u}}function D1(i,t,e){let n;function r(h){n=h}let s,o;function a(h){s=h.type,o=h.bytesPerElement}function l(h,d){i.drawElements(n,d,s,h*o),e.update(d,n,1)}function c(h,d,g){g!==0&&(i.drawElementsInstanced(n,d,s,h*o,g),e.update(d,n,g))}function u(h,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,s,h,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];e.update(m,n,1)}function f(h,d,g,_){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<h.length;p++)c(h[p]/o,d[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,s,h,0,_,0,g);let p=0;for(let M=0;M<g;M++)p+=d[M]*_[M];e.update(p,n,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=f}function L1(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(s/3);break;case i.LINES:e.lines+=a*(s/2);break;case i.LINE_STRIP:e.lines+=a*(s-1);break;case i.LINE_LOOP:e.lines+=a*s;break;case i.POINTS:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:n}}function I1(i,t,e){const n=new WeakMap,r=new He;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=u!==void 0?u.length:0;let h=n.get(a);if(h===void 0||h.count!==f){let S=function(){T.dispose(),n.delete(a),a.removeEventListener("dispose",S)};h!==void 0&&h.texture.dispose();const d=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],M=a.morphAttributes.color||[];let b=0;d===!0&&(b=1),g===!0&&(b=2),_===!0&&(b=3);let v=a.attributes.position.count*b,R=1;v>t.maxTextureSize&&(R=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);const C=new Float32Array(v*R*4*f),T=new K0(C,v,R,f);T.type=yr,T.needsUpdate=!0;const D=b*4;for(let x=0;x<f;x++){const I=m[x],F=p[x],z=M[x],W=v*R*4*x;for(let tt=0;tt<I.count;tt++){const G=tt*D;d===!0&&(r.fromBufferAttribute(I,tt),C[W+G+0]=r.x,C[W+G+1]=r.y,C[W+G+2]=r.z,C[W+G+3]=0),g===!0&&(r.fromBufferAttribute(F,tt),C[W+G+4]=r.x,C[W+G+5]=r.y,C[W+G+6]=r.z,C[W+G+7]=0),_===!0&&(r.fromBufferAttribute(z,tt),C[W+G+8]=r.x,C[W+G+9]=r.y,C[W+G+10]=r.z,C[W+G+11]=z.itemSize===4?r.w:1)}}h={count:f,texture:T,size:new Jt(v,R)},n.set(a,h),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let d=0;for(let _=0;_<c.length;_++)d+=c[_];const g=a.morphTargetsRelative?1:1-d;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",h.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:s}}function U1(i,t,e,n){let r=new WeakMap;function s(l){const c=n.render.frame,u=l.geometry,f=t.get(l,u);if(r.get(f)!==c&&(t.update(f),r.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;r.get(h)!==c&&(h.update(),r.set(h,c))}return f}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:o}}class av extends Zn{constructor(t,e,n,r,s,o,a,l,c,u=Fo){if(u!==Fo&&u!==Jo)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Fo&&(n=Ws),n===void 0&&u===Jo&&(n=Zo),super(null,r,s,o,a,l,u,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:ki,this.minFilter=l!==void 0?l:ki,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const lv=new Zn,Lm=new av(1,1),cv=new K0,uv=new yb,fv=new rv,Im=[],Um=[],Nm=new Float32Array(16),Om=new Float32Array(9),Fm=new Float32Array(4);function ia(i,t,e){const n=i[0];if(n<=0||n>0)return i;const r=t*e;let s=Im[r];if(s===void 0&&(s=new Float32Array(r),Im[r]=s),t!==0){n.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(s,a)}return s}function rn(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function sn(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function cu(i,t){let e=Um[t];e===void 0&&(e=new Int32Array(t),Um[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function N1(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function O1(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(rn(e,t))return;i.uniform2fv(this.addr,t),sn(e,t)}}function F1(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(rn(e,t))return;i.uniform3fv(this.addr,t),sn(e,t)}}function B1(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(rn(e,t))return;i.uniform4fv(this.addr,t),sn(e,t)}}function z1(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(rn(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),sn(e,t)}else{if(rn(e,n))return;Fm.set(n),i.uniformMatrix2fv(this.addr,!1,Fm),sn(e,n)}}function k1(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(rn(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),sn(e,t)}else{if(rn(e,n))return;Om.set(n),i.uniformMatrix3fv(this.addr,!1,Om),sn(e,n)}}function H1(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(rn(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),sn(e,t)}else{if(rn(e,n))return;Nm.set(n),i.uniformMatrix4fv(this.addr,!1,Nm),sn(e,n)}}function V1(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function G1(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(rn(e,t))return;i.uniform2iv(this.addr,t),sn(e,t)}}function W1(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(rn(e,t))return;i.uniform3iv(this.addr,t),sn(e,t)}}function X1(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(rn(e,t))return;i.uniform4iv(this.addr,t),sn(e,t)}}function Y1(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function q1(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(rn(e,t))return;i.uniform2uiv(this.addr,t),sn(e,t)}}function $1(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(rn(e,t))return;i.uniform3uiv(this.addr,t),sn(e,t)}}function j1(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(rn(e,t))return;i.uniform4uiv(this.addr,t),sn(e,t)}}function K1(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(Lm.compareFunction=q0,s=Lm):s=lv,e.setTexture2D(t||s,r)}function Z1(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture3D(t||uv,r)}function J1(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTextureCube(t||fv,r)}function Q1(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture2DArray(t||cv,r)}function tw(i){switch(i){case 5126:return N1;case 35664:return O1;case 35665:return F1;case 35666:return B1;case 35674:return z1;case 35675:return k1;case 35676:return H1;case 5124:case 35670:return V1;case 35667:case 35671:return G1;case 35668:case 35672:return W1;case 35669:case 35673:return X1;case 5125:return Y1;case 36294:return q1;case 36295:return $1;case 36296:return j1;case 35678:case 36198:case 36298:case 36306:case 35682:return K1;case 35679:case 36299:case 36307:return Z1;case 35680:case 36300:case 36308:case 36293:return J1;case 36289:case 36303:case 36311:case 36292:return Q1}}function ew(i,t){i.uniform1fv(this.addr,t)}function nw(i,t){const e=ia(t,this.size,2);i.uniform2fv(this.addr,e)}function iw(i,t){const e=ia(t,this.size,3);i.uniform3fv(this.addr,e)}function rw(i,t){const e=ia(t,this.size,4);i.uniform4fv(this.addr,e)}function sw(i,t){const e=ia(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function ow(i,t){const e=ia(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function aw(i,t){const e=ia(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function lw(i,t){i.uniform1iv(this.addr,t)}function cw(i,t){i.uniform2iv(this.addr,t)}function uw(i,t){i.uniform3iv(this.addr,t)}function fw(i,t){i.uniform4iv(this.addr,t)}function hw(i,t){i.uniform1uiv(this.addr,t)}function dw(i,t){i.uniform2uiv(this.addr,t)}function pw(i,t){i.uniform3uiv(this.addr,t)}function mw(i,t){i.uniform4uiv(this.addr,t)}function _w(i,t,e){const n=this.cache,r=t.length,s=cu(e,r);rn(n,s)||(i.uniform1iv(this.addr,s),sn(n,s));for(let o=0;o!==r;++o)e.setTexture2D(t[o]||lv,s[o])}function gw(i,t,e){const n=this.cache,r=t.length,s=cu(e,r);rn(n,s)||(i.uniform1iv(this.addr,s),sn(n,s));for(let o=0;o!==r;++o)e.setTexture3D(t[o]||uv,s[o])}function vw(i,t,e){const n=this.cache,r=t.length,s=cu(e,r);rn(n,s)||(i.uniform1iv(this.addr,s),sn(n,s));for(let o=0;o!==r;++o)e.setTextureCube(t[o]||fv,s[o])}function xw(i,t,e){const n=this.cache,r=t.length,s=cu(e,r);rn(n,s)||(i.uniform1iv(this.addr,s),sn(n,s));for(let o=0;o!==r;++o)e.setTexture2DArray(t[o]||cv,s[o])}function yw(i){switch(i){case 5126:return ew;case 35664:return nw;case 35665:return iw;case 35666:return rw;case 35674:return sw;case 35675:return ow;case 35676:return aw;case 5124:case 35670:return lw;case 35667:case 35671:return cw;case 35668:case 35672:return uw;case 35669:case 35673:return fw;case 5125:return hw;case 36294:return dw;case 36295:return pw;case 36296:return mw;case 35678:case 36198:case 36298:case 36306:case 35682:return _w;case 35679:case 36299:case 36307:return gw;case 35680:case 36300:case 36308:case 36293:return vw;case 36289:case 36303:case 36311:case 36292:return xw}}class Mw{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=tw(e.type)}}class Sw{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=yw(e.type)}}class bw{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(t,e[a.id],n)}}}const cf=/(\w+)(\])?(\[|\.)?/g;function Bm(i,t){i.seq.push(t),i.map[t.id]=t}function Ew(i,t,e){const n=i.name,r=n.length;for(cf.lastIndex=0;;){const s=cf.exec(n),o=cf.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){Bm(e,c===void 0?new Mw(a,i,t):new Sw(a,i,t));break}else{let f=e.map[a];f===void 0&&(f=new bw(a),Bm(e,f)),e=f}}}class Mc{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=t.getActiveUniform(e,r),o=t.getUniformLocation(e,s.name);Ew(s,o,this)}}setValue(t,e,n,r){const s=this.map[e];s!==void 0&&s.setValue(t,n,r)}setOptional(t,e,n){const r=e[n];r!==void 0&&this.setValue(t,n,r)}static upload(t,e,n,r){for(let s=0,o=e.length;s!==o;++s){const a=e[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,r)}}static seqWithValue(t,e){const n=[];for(let r=0,s=t.length;r!==s;++r){const o=t[r];o.id in e&&n.push(o)}return n}}function zm(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const Tw=37297;let ww=0;function Aw(i,t){const e=i.split(`
`),n=[],r=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=r;o<s;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const km=new te;function Cw(i){fe._getMatrix(km,fe.workingColorSpace,i);const t=`mat3( ${km.elements.map(e=>e.toFixed(4))} )`;switch(fe.getTransfer(i)){case au:return[t,"LinearTransferOETF"];case Se:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Hm(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=i.getShaderInfoLog(t).trim();if(n&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return e.toUpperCase()+`

`+r+`

`+Aw(i.getShaderSource(t),o)}else return r}function Rw(i,t){const e=Cw(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Pw(i,t){let e;switch(t){case YS:e="Linear";break;case qS:e="Reinhard";break;case $S:e="Cineon";break;case jS:e="ACESFilmic";break;case ZS:e="AgX";break;case JS:e="Neutral";break;case KS:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Zl=new Z;function Dw(){fe.getLuminanceCoefficients(Zl);const i=Zl.x.toFixed(4),t=Zl.y.toFixed(4),e=Zl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Lw(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ta).join(`
`)}function Iw(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Uw(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(t,r),o=s.name;let a=1;s.type===i.FLOAT_MAT2&&(a=2),s.type===i.FLOAT_MAT3&&(a=3),s.type===i.FLOAT_MAT4&&(a=4),e[o]={type:s.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Ta(i){return i!==""}function Vm(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Gm(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Nw=/^[ \t]*#include +<([\w\d./]+)>/gm;function Nh(i){return i.replace(Nw,Fw)}const Ow=new Map;function Fw(i,t){let e=ee[t];if(e===void 0){const n=Ow.get(t);if(n!==void 0)e=ee[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Nh(e)}const Bw=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Wm(i){return i.replace(Bw,zw)}function zw(i,t,e,n){let r="";for(let s=parseInt(t);s<parseInt(e);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Xm(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function kw(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===U0?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===TS?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===dr&&(t="SHADOWMAP_TYPE_VSM"),t}function Hw(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case jo:case Ko:t="ENVMAP_TYPE_CUBE";break;case ou:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Vw(i){let t="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===Ko&&(t="ENVMAP_MODE_REFRACTION"),t}function Gw(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Rd:t="ENVMAP_BLENDING_MULTIPLY";break;case WS:t="ENVMAP_BLENDING_MIX";break;case XS:t="ENVMAP_BLENDING_ADD";break}return t}function Ww(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Xw(i,t,e,n){const r=i.getContext(),s=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=kw(e),c=Hw(e),u=Vw(e),f=Gw(e),h=Ww(e),d=Lw(e),g=Iw(s),_=r.createProgram();let m,p,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ta).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ta).join(`
`),p.length>0&&(p+=`
`)):(m=[Xm(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ta).join(`
`),p=[Xm(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==es?"#define TONE_MAPPING":"",e.toneMapping!==es?ee.tonemapping_pars_fragment:"",e.toneMapping!==es?Pw("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ee.colorspace_pars_fragment,Rw("linearToOutputTexel",e.outputColorSpace),Dw(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ta).join(`
`)),o=Nh(o),o=Vm(o,e),o=Gm(o,e),a=Nh(a),a=Vm(a,e),a=Gm(a,e),o=Wm(o),a=Wm(a),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===rm?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===rm?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const b=M+m+o,v=M+p+a,R=zm(r,r.VERTEX_SHADER,b),C=zm(r,r.FRAGMENT_SHADER,v);r.attachShader(_,R),r.attachShader(_,C),e.index0AttributeName!==void 0?r.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function T(I){if(i.debug.checkShaderErrors){const F=r.getProgramInfoLog(_).trim(),z=r.getShaderInfoLog(R).trim(),W=r.getShaderInfoLog(C).trim();let tt=!0,G=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(tt=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,_,R,C);else{const K=Hm(r,R,"vertex"),H=Hm(r,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+F+`
`+K+`
`+H)}else F!==""?console.warn("THREE.WebGLProgram: Program Info Log:",F):(z===""||W==="")&&(G=!1);G&&(I.diagnostics={runnable:tt,programLog:F,vertexShader:{log:z,prefix:m},fragmentShader:{log:W,prefix:p}})}r.deleteShader(R),r.deleteShader(C),D=new Mc(r,_),S=Uw(r,_)}let D;this.getUniforms=function(){return D===void 0&&T(this),D};let S;this.getAttributes=function(){return S===void 0&&T(this),S};let x=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=r.getProgramParameter(_,Tw)),x},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=ww++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=R,this.fragmentShader=C,this}let Yw=0;class qw{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,r=this._getShaderStage(e),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new $w(t),e.set(t,n)),n}}class $w{constructor(t){this.id=Yw++,this.code=t,this.usedTimes=0}}function jw(i,t,e,n,r,s,o){const a=new Z0,l=new qw,c=new Set,u=[],f=r.logarithmicDepthBuffer,h=r.vertexTextures;let d=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(S){return c.add(S),S===0?"uv":`uv${S}`}function m(S,x,I,F,z){const W=F.fog,tt=z.geometry,G=S.isMeshStandardMaterial?F.environment:null,K=(S.isMeshStandardMaterial?e:t).get(S.envMap||G),H=K&&K.mapping===ou?K.image.height:null,ct=g[S.type];S.precision!==null&&(d=r.getMaxPrecision(S.precision),d!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",d,"instead."));const N=tt.morphAttributes.position||tt.morphAttributes.normal||tt.morphAttributes.color,vt=N!==void 0?N.length:0;let Lt=0;tt.morphAttributes.position!==void 0&&(Lt=1),tt.morphAttributes.normal!==void 0&&(Lt=2),tt.morphAttributes.color!==void 0&&(Lt=3);let qt,nt,ht,yt;if(ct){const Rt=qi[ct];qt=Rt.vertexShader,nt=Rt.fragmentShader}else qt=S.vertexShader,nt=S.fragmentShader,l.update(S),ht=l.getVertexShaderID(S),yt=l.getFragmentShaderID(S);const dt=i.getRenderTarget(),Pt=i.state.buffers.depth.getReversed(),It=z.isInstancedMesh===!0,kt=z.isBatchedMesh===!0,Zt=!!S.map,P=!!S.matcap,U=!!K,A=!!S.aoMap,st=!!S.lightMap,J=!!S.bumpMap,L=!!S.normalMap,it=!!S.displacementMap,ot=!!S.emissiveMap,Q=!!S.metalnessMap,E=!!S.roughnessMap,y=S.anisotropy>0,O=S.clearcoat>0,X=S.dispersion>0,Y=S.iridescence>0,$=S.sheen>0,ut=S.transmission>0,lt=y&&!!S.anisotropyMap,mt=O&&!!S.clearcoatMap,Ot=O&&!!S.clearcoatNormalMap,ft=O&&!!S.clearcoatRoughnessMap,et=Y&&!!S.iridescenceMap,bt=Y&&!!S.iridescenceThicknessMap,Ct=$&&!!S.sheenColorMap,_t=$&&!!S.sheenRoughnessMap,Ht=!!S.specularMap,Vt=!!S.specularColorMap,ce=!!S.specularIntensityMap,B=ut&&!!S.transmissionMap,St=ut&&!!S.thicknessMap,rt=!!S.gradientMap,at=!!S.alphaMap,Mt=S.alphaTest>0,Et=!!S.alphaHash,Gt=!!S.extensions;let he=es;S.toneMapped&&(dt===null||dt.isXRRenderTarget===!0)&&(he=i.toneMapping);const ke={shaderID:ct,shaderType:S.type,shaderName:S.name,vertexShader:qt,fragmentShader:nt,defines:S.defines,customVertexShaderID:ht,customFragmentShaderID:yt,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:d,batching:kt,batchingColor:kt&&z._colorsTexture!==null,instancing:It,instancingColor:It&&z.instanceColor!==null,instancingMorph:It&&z.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:dt===null?i.outputColorSpace:dt.isXRRenderTarget===!0?dt.texture.colorSpace:ea,alphaToCoverage:!!S.alphaToCoverage,map:Zt,matcap:P,envMap:U,envMapMode:U&&K.mapping,envMapCubeUVHeight:H,aoMap:A,lightMap:st,bumpMap:J,normalMap:L,displacementMap:h&&it,emissiveMap:ot,normalMapObjectSpace:L&&S.normalMapType===nb,normalMapTangentSpace:L&&S.normalMapType===Y0,metalnessMap:Q,roughnessMap:E,anisotropy:y,anisotropyMap:lt,clearcoat:O,clearcoatMap:mt,clearcoatNormalMap:Ot,clearcoatRoughnessMap:ft,dispersion:X,iridescence:Y,iridescenceMap:et,iridescenceThicknessMap:bt,sheen:$,sheenColorMap:Ct,sheenRoughnessMap:_t,specularMap:Ht,specularColorMap:Vt,specularIntensityMap:ce,transmission:ut,transmissionMap:B,thicknessMap:St,gradientMap:rt,opaque:S.transparent===!1&&S.blending===Oo&&S.alphaToCoverage===!1,alphaMap:at,alphaTest:Mt,alphaHash:Et,combine:S.combine,mapUv:Zt&&_(S.map.channel),aoMapUv:A&&_(S.aoMap.channel),lightMapUv:st&&_(S.lightMap.channel),bumpMapUv:J&&_(S.bumpMap.channel),normalMapUv:L&&_(S.normalMap.channel),displacementMapUv:it&&_(S.displacementMap.channel),emissiveMapUv:ot&&_(S.emissiveMap.channel),metalnessMapUv:Q&&_(S.metalnessMap.channel),roughnessMapUv:E&&_(S.roughnessMap.channel),anisotropyMapUv:lt&&_(S.anisotropyMap.channel),clearcoatMapUv:mt&&_(S.clearcoatMap.channel),clearcoatNormalMapUv:Ot&&_(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ft&&_(S.clearcoatRoughnessMap.channel),iridescenceMapUv:et&&_(S.iridescenceMap.channel),iridescenceThicknessMapUv:bt&&_(S.iridescenceThicknessMap.channel),sheenColorMapUv:Ct&&_(S.sheenColorMap.channel),sheenRoughnessMapUv:_t&&_(S.sheenRoughnessMap.channel),specularMapUv:Ht&&_(S.specularMap.channel),specularColorMapUv:Vt&&_(S.specularColorMap.channel),specularIntensityMapUv:ce&&_(S.specularIntensityMap.channel),transmissionMapUv:B&&_(S.transmissionMap.channel),thicknessMapUv:St&&_(S.thicknessMap.channel),alphaMapUv:at&&_(S.alphaMap.channel),vertexTangents:!!tt.attributes.tangent&&(L||y),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!tt.attributes.color&&tt.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!tt.attributes.uv&&(Zt||at),fog:!!W,useFog:S.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:f,reverseDepthBuffer:Pt,skinning:z.isSkinnedMesh===!0,morphTargets:tt.morphAttributes.position!==void 0,morphNormals:tt.morphAttributes.normal!==void 0,morphColors:tt.morphAttributes.color!==void 0,morphTargetsCount:vt,morphTextureStride:Lt,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:he,decodeVideoTexture:Zt&&S.map.isVideoTexture===!0&&fe.getTransfer(S.map.colorSpace)===Se,decodeVideoTextureEmissive:ot&&S.emissiveMap.isVideoTexture===!0&&fe.getTransfer(S.emissiveMap.colorSpace)===Se,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===bi,flipSided:S.side===Kn,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Gt&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Gt&&S.extensions.multiDraw===!0||kt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return ke.vertexUv1s=c.has(1),ke.vertexUv2s=c.has(2),ke.vertexUv3s=c.has(3),c.clear(),ke}function p(S){const x=[];if(S.shaderID?x.push(S.shaderID):(x.push(S.customVertexShaderID),x.push(S.customFragmentShaderID)),S.defines!==void 0)for(const I in S.defines)x.push(I),x.push(S.defines[I]);return S.isRawShaderMaterial===!1&&(M(x,S),b(x,S),x.push(i.outputColorSpace)),x.push(S.customProgramCacheKey),x.join()}function M(S,x){S.push(x.precision),S.push(x.outputColorSpace),S.push(x.envMapMode),S.push(x.envMapCubeUVHeight),S.push(x.mapUv),S.push(x.alphaMapUv),S.push(x.lightMapUv),S.push(x.aoMapUv),S.push(x.bumpMapUv),S.push(x.normalMapUv),S.push(x.displacementMapUv),S.push(x.emissiveMapUv),S.push(x.metalnessMapUv),S.push(x.roughnessMapUv),S.push(x.anisotropyMapUv),S.push(x.clearcoatMapUv),S.push(x.clearcoatNormalMapUv),S.push(x.clearcoatRoughnessMapUv),S.push(x.iridescenceMapUv),S.push(x.iridescenceThicknessMapUv),S.push(x.sheenColorMapUv),S.push(x.sheenRoughnessMapUv),S.push(x.specularMapUv),S.push(x.specularColorMapUv),S.push(x.specularIntensityMapUv),S.push(x.transmissionMapUv),S.push(x.thicknessMapUv),S.push(x.combine),S.push(x.fogExp2),S.push(x.sizeAttenuation),S.push(x.morphTargetsCount),S.push(x.morphAttributeCount),S.push(x.numDirLights),S.push(x.numPointLights),S.push(x.numSpotLights),S.push(x.numSpotLightMaps),S.push(x.numHemiLights),S.push(x.numRectAreaLights),S.push(x.numDirLightShadows),S.push(x.numPointLightShadows),S.push(x.numSpotLightShadows),S.push(x.numSpotLightShadowsWithMaps),S.push(x.numLightProbes),S.push(x.shadowMapType),S.push(x.toneMapping),S.push(x.numClippingPlanes),S.push(x.numClipIntersection),S.push(x.depthPacking)}function b(S,x){a.disableAll(),x.supportsVertexTextures&&a.enable(0),x.instancing&&a.enable(1),x.instancingColor&&a.enable(2),x.instancingMorph&&a.enable(3),x.matcap&&a.enable(4),x.envMap&&a.enable(5),x.normalMapObjectSpace&&a.enable(6),x.normalMapTangentSpace&&a.enable(7),x.clearcoat&&a.enable(8),x.iridescence&&a.enable(9),x.alphaTest&&a.enable(10),x.vertexColors&&a.enable(11),x.vertexAlphas&&a.enable(12),x.vertexUv1s&&a.enable(13),x.vertexUv2s&&a.enable(14),x.vertexUv3s&&a.enable(15),x.vertexTangents&&a.enable(16),x.anisotropy&&a.enable(17),x.alphaHash&&a.enable(18),x.batching&&a.enable(19),x.dispersion&&a.enable(20),x.batchingColor&&a.enable(21),S.push(a.mask),a.disableAll(),x.fog&&a.enable(0),x.useFog&&a.enable(1),x.flatShading&&a.enable(2),x.logarithmicDepthBuffer&&a.enable(3),x.reverseDepthBuffer&&a.enable(4),x.skinning&&a.enable(5),x.morphTargets&&a.enable(6),x.morphNormals&&a.enable(7),x.morphColors&&a.enable(8),x.premultipliedAlpha&&a.enable(9),x.shadowMapEnabled&&a.enable(10),x.doubleSided&&a.enable(11),x.flipSided&&a.enable(12),x.useDepthPacking&&a.enable(13),x.dithering&&a.enable(14),x.transmission&&a.enable(15),x.sheen&&a.enable(16),x.opaque&&a.enable(17),x.pointsUvs&&a.enable(18),x.decodeVideoTexture&&a.enable(19),x.decodeVideoTextureEmissive&&a.enable(20),x.alphaToCoverage&&a.enable(21),S.push(a.mask)}function v(S){const x=g[S.type];let I;if(x){const F=qi[x];I=Lb.clone(F.uniforms)}else I=S.uniforms;return I}function R(S,x){let I;for(let F=0,z=u.length;F<z;F++){const W=u[F];if(W.cacheKey===x){I=W,++I.usedTimes;break}}return I===void 0&&(I=new Xw(i,x,S,s),u.push(I)),I}function C(S){if(--S.usedTimes===0){const x=u.indexOf(S);u[x]=u[u.length-1],u.pop(),S.destroy()}}function T(S){l.remove(S)}function D(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:R,releaseProgram:C,releaseShaderCache:T,programs:u,dispose:D}}function Kw(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function r(o,a,l){i.get(o)[a]=l}function s(){i=new WeakMap}return{has:t,get:e,remove:n,update:r,dispose:s}}function Zw(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Ym(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function qm(){const i=[];let t=0;const e=[],n=[],r=[];function s(){t=0,e.length=0,n.length=0,r.length=0}function o(f,h,d,g,_,m){let p=i[t];return p===void 0?(p={id:f.id,object:f,geometry:h,material:d,groupOrder:g,renderOrder:f.renderOrder,z:_,group:m},i[t]=p):(p.id=f.id,p.object=f,p.geometry=h,p.material=d,p.groupOrder=g,p.renderOrder=f.renderOrder,p.z=_,p.group=m),t++,p}function a(f,h,d,g,_,m){const p=o(f,h,d,g,_,m);d.transmission>0?n.push(p):d.transparent===!0?r.push(p):e.push(p)}function l(f,h,d,g,_,m){const p=o(f,h,d,g,_,m);d.transmission>0?n.unshift(p):d.transparent===!0?r.unshift(p):e.unshift(p)}function c(f,h){e.length>1&&e.sort(f||Zw),n.length>1&&n.sort(h||Ym),r.length>1&&r.sort(h||Ym)}function u(){for(let f=t,h=i.length;f<h;f++){const d=i[f];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:r,init:s,push:a,unshift:l,finish:u,sort:c}}function Jw(){let i=new WeakMap;function t(n,r){const s=i.get(n);let o;return s===void 0?(o=new qm,i.set(n,[o])):r>=s.length?(o=new qm,s.push(o)):o=s[r],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function Qw(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new Z,color:new ae};break;case"SpotLight":e={position:new Z,direction:new Z,color:new ae,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new Z,color:new ae,distance:0,decay:0};break;case"HemisphereLight":e={direction:new Z,skyColor:new ae,groundColor:new ae};break;case"RectAreaLight":e={color:new ae,position:new Z,halfWidth:new Z,halfHeight:new Z};break}return i[t.id]=e,e}}}function tA(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Jt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Jt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Jt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let eA=0;function nA(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function iA(i){const t=new Qw,e=tA(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new Z);const r=new Z,s=new ze,o=new ze;function a(c){let u=0,f=0,h=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let d=0,g=0,_=0,m=0,p=0,M=0,b=0,v=0,R=0,C=0,T=0;c.sort(nA);for(let S=0,x=c.length;S<x;S++){const I=c[S],F=I.color,z=I.intensity,W=I.distance,tt=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)u+=F.r*z,f+=F.g*z,h+=F.b*z;else if(I.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(I.sh.coefficients[G],z);T++}else if(I.isDirectionalLight){const G=t.get(I);if(G.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const K=I.shadow,H=e.get(I);H.shadowIntensity=K.intensity,H.shadowBias=K.bias,H.shadowNormalBias=K.normalBias,H.shadowRadius=K.radius,H.shadowMapSize=K.mapSize,n.directionalShadow[d]=H,n.directionalShadowMap[d]=tt,n.directionalShadowMatrix[d]=I.shadow.matrix,M++}n.directional[d]=G,d++}else if(I.isSpotLight){const G=t.get(I);G.position.setFromMatrixPosition(I.matrixWorld),G.color.copy(F).multiplyScalar(z),G.distance=W,G.coneCos=Math.cos(I.angle),G.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),G.decay=I.decay,n.spot[_]=G;const K=I.shadow;if(I.map&&(n.spotLightMap[R]=I.map,R++,K.updateMatrices(I),I.castShadow&&C++),n.spotLightMatrix[_]=K.matrix,I.castShadow){const H=e.get(I);H.shadowIntensity=K.intensity,H.shadowBias=K.bias,H.shadowNormalBias=K.normalBias,H.shadowRadius=K.radius,H.shadowMapSize=K.mapSize,n.spotShadow[_]=H,n.spotShadowMap[_]=tt,v++}_++}else if(I.isRectAreaLight){const G=t.get(I);G.color.copy(F).multiplyScalar(z),G.halfWidth.set(I.width*.5,0,0),G.halfHeight.set(0,I.height*.5,0),n.rectArea[m]=G,m++}else if(I.isPointLight){const G=t.get(I);if(G.color.copy(I.color).multiplyScalar(I.intensity),G.distance=I.distance,G.decay=I.decay,I.castShadow){const K=I.shadow,H=e.get(I);H.shadowIntensity=K.intensity,H.shadowBias=K.bias,H.shadowNormalBias=K.normalBias,H.shadowRadius=K.radius,H.shadowMapSize=K.mapSize,H.shadowCameraNear=K.camera.near,H.shadowCameraFar=K.camera.far,n.pointShadow[g]=H,n.pointShadowMap[g]=tt,n.pointShadowMatrix[g]=I.shadow.matrix,b++}n.point[g]=G,g++}else if(I.isHemisphereLight){const G=t.get(I);G.skyColor.copy(I.color).multiplyScalar(z),G.groundColor.copy(I.groundColor).multiplyScalar(z),n.hemi[p]=G,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=At.LTC_FLOAT_1,n.rectAreaLTC2=At.LTC_FLOAT_2):(n.rectAreaLTC1=At.LTC_HALF_1,n.rectAreaLTC2=At.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=f,n.ambient[2]=h;const D=n.hash;(D.directionalLength!==d||D.pointLength!==g||D.spotLength!==_||D.rectAreaLength!==m||D.hemiLength!==p||D.numDirectionalShadows!==M||D.numPointShadows!==b||D.numSpotShadows!==v||D.numSpotMaps!==R||D.numLightProbes!==T)&&(n.directional.length=d,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=b,n.spotLightMatrix.length=v+R-C,n.spotLightMap.length=R,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=T,D.directionalLength=d,D.pointLength=g,D.spotLength=_,D.rectAreaLength=m,D.hemiLength=p,D.numDirectionalShadows=M,D.numPointShadows=b,D.numSpotShadows=v,D.numSpotMaps=R,D.numLightProbes=T,n.version=eA++)}function l(c,u){let f=0,h=0,d=0,g=0,_=0;const m=u.matrixWorldInverse;for(let p=0,M=c.length;p<M;p++){const b=c[p];if(b.isDirectionalLight){const v=n.directional[f];v.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(m),f++}else if(b.isSpotLight){const v=n.spot[d];v.position.setFromMatrixPosition(b.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(m),d++}else if(b.isRectAreaLight){const v=n.rectArea[g];v.position.setFromMatrixPosition(b.matrixWorld),v.position.applyMatrix4(m),o.identity(),s.copy(b.matrixWorld),s.premultiply(m),o.extractRotation(s),v.halfWidth.set(b.width*.5,0,0),v.halfHeight.set(0,b.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),g++}else if(b.isPointLight){const v=n.point[h];v.position.setFromMatrixPosition(b.matrixWorld),v.position.applyMatrix4(m),h++}else if(b.isHemisphereLight){const v=n.hemi[_];v.direction.setFromMatrixPosition(b.matrixWorld),v.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:n}}function $m(i){const t=new iA(i),e=[],n=[];function r(u){c.camera=u,e.length=0,n.length=0}function s(u){e.push(u)}function o(u){n.push(u)}function a(){t.setup(e)}function l(u){t.setupView(e,u)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function rA(i){let t=new WeakMap;function e(r,s=0){const o=t.get(r);let a;return o===void 0?(a=new $m(i),t.set(r,[a])):s>=o.length?(a=new $m(i),o.push(a)):a=o[s],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class sA extends na{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=tb,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class oA extends na{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const aA=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,lA=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function cA(i,t,e){let n=new Fd;const r=new Jt,s=new Jt,o=new He,a=new sA({depthPacking:eb}),l=new oA,c={},u=e.maxTextureSize,f={[as]:Kn,[Kn]:as,[bi]:bi},h=new rr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Jt},radius:{value:4}},vertexShader:aA,fragmentShader:lA}),d=h.clone();d.defines.HORIZONTAL_PASS=1;const g=new Ri;g.setAttribute("position",new cn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Me(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=U0;let p=this.type;this.render=function(C,T,D){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;const S=i.getRenderTarget(),x=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),F=i.state;F.setBlending(ts),F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const z=p!==dr&&this.type===dr,W=p===dr&&this.type!==dr;for(let tt=0,G=C.length;tt<G;tt++){const K=C[tt],H=K.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;r.copy(H.mapSize);const ct=H.getFrameExtents();if(r.multiply(ct),s.copy(H.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/ct.x),r.x=s.x*ct.x,H.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/ct.y),r.y=s.y*ct.y,H.mapSize.y=s.y)),H.map===null||z===!0||W===!0){const vt=this.type!==dr?{minFilter:ki,magFilter:ki}:{};H.map!==null&&H.map.dispose(),H.map=new Xs(r.x,r.y,vt),H.map.texture.name=K.name+".shadowMap",H.camera.updateProjectionMatrix()}i.setRenderTarget(H.map),i.clear();const N=H.getViewportCount();for(let vt=0;vt<N;vt++){const Lt=H.getViewport(vt);o.set(s.x*Lt.x,s.y*Lt.y,s.x*Lt.z,s.y*Lt.w),F.viewport(o),H.updateMatrices(K,vt),n=H.getFrustum(),v(T,D,H.camera,K,this.type)}H.isPointLightShadow!==!0&&this.type===dr&&M(H,D),H.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(S,x,I)};function M(C,T){const D=t.update(_);h.defines.VSM_SAMPLES!==C.blurSamples&&(h.defines.VSM_SAMPLES=C.blurSamples,d.defines.VSM_SAMPLES=C.blurSamples,h.needsUpdate=!0,d.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new Xs(r.x,r.y)),h.uniforms.shadow_pass.value=C.map.texture,h.uniforms.resolution.value=C.mapSize,h.uniforms.radius.value=C.radius,i.setRenderTarget(C.mapPass),i.clear(),i.renderBufferDirect(T,null,D,h,_,null),d.uniforms.shadow_pass.value=C.mapPass.texture,d.uniforms.resolution.value=C.mapSize,d.uniforms.radius.value=C.radius,i.setRenderTarget(C.map),i.clear(),i.renderBufferDirect(T,null,D,d,_,null)}function b(C,T,D,S){let x=null;const I=D.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(I!==void 0)x=I;else if(x=D.isPointLight===!0?l:a,i.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const F=x.uuid,z=T.uuid;let W=c[F];W===void 0&&(W={},c[F]=W);let tt=W[z];tt===void 0&&(tt=x.clone(),W[z]=tt,T.addEventListener("dispose",R)),x=tt}if(x.visible=T.visible,x.wireframe=T.wireframe,S===dr?x.side=T.shadowSide!==null?T.shadowSide:T.side:x.side=T.shadowSide!==null?T.shadowSide:f[T.side],x.alphaMap=T.alphaMap,x.alphaTest=T.alphaTest,x.map=T.map,x.clipShadows=T.clipShadows,x.clippingPlanes=T.clippingPlanes,x.clipIntersection=T.clipIntersection,x.displacementMap=T.displacementMap,x.displacementScale=T.displacementScale,x.displacementBias=T.displacementBias,x.wireframeLinewidth=T.wireframeLinewidth,x.linewidth=T.linewidth,D.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const F=i.properties.get(x);F.light=D}return x}function v(C,T,D,S,x){if(C.visible===!1)return;if(C.layers.test(T.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&x===dr)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,C.matrixWorld);const z=t.update(C),W=C.material;if(Array.isArray(W)){const tt=z.groups;for(let G=0,K=tt.length;G<K;G++){const H=tt[G],ct=W[H.materialIndex];if(ct&&ct.visible){const N=b(C,ct,S,x);C.onBeforeShadow(i,C,T,D,z,N,H),i.renderBufferDirect(D,null,z,N,C,H),C.onAfterShadow(i,C,T,D,z,N,H)}}}else if(W.visible){const tt=b(C,W,S,x);C.onBeforeShadow(i,C,T,D,z,tt,null),i.renderBufferDirect(D,null,z,tt,C,null),C.onAfterShadow(i,C,T,D,z,tt,null)}}const F=C.children;for(let z=0,W=F.length;z<W;z++)v(F[z],T,D,S,x)}function R(C){C.target.removeEventListener("dispose",R);for(const D in c){const S=c[D],x=C.target.uuid;x in S&&(S[x].dispose(),delete S[x])}}}const uA={[Zf]:Jf,[Qf]:nh,[th]:ih,[$o]:eh,[Jf]:Zf,[nh]:Qf,[ih]:th,[eh]:$o};function fA(i,t){function e(){let B=!1;const St=new He;let rt=null;const at=new He(0,0,0,0);return{setMask:function(Mt){rt!==Mt&&!B&&(i.colorMask(Mt,Mt,Mt,Mt),rt=Mt)},setLocked:function(Mt){B=Mt},setClear:function(Mt,Et,Gt,he,ke){ke===!0&&(Mt*=he,Et*=he,Gt*=he),St.set(Mt,Et,Gt,he),at.equals(St)===!1&&(i.clearColor(Mt,Et,Gt,he),at.copy(St))},reset:function(){B=!1,rt=null,at.set(-1,0,0,0)}}}function n(){let B=!1,St=!1,rt=null,at=null,Mt=null;return{setReversed:function(Et){if(St!==Et){const Gt=t.get("EXT_clip_control");St?Gt.clipControlEXT(Gt.LOWER_LEFT_EXT,Gt.ZERO_TO_ONE_EXT):Gt.clipControlEXT(Gt.LOWER_LEFT_EXT,Gt.NEGATIVE_ONE_TO_ONE_EXT);const he=Mt;Mt=null,this.setClear(he)}St=Et},getReversed:function(){return St},setTest:function(Et){Et?dt(i.DEPTH_TEST):Pt(i.DEPTH_TEST)},setMask:function(Et){rt!==Et&&!B&&(i.depthMask(Et),rt=Et)},setFunc:function(Et){if(St&&(Et=uA[Et]),at!==Et){switch(Et){case Zf:i.depthFunc(i.NEVER);break;case Jf:i.depthFunc(i.ALWAYS);break;case Qf:i.depthFunc(i.LESS);break;case $o:i.depthFunc(i.LEQUAL);break;case th:i.depthFunc(i.EQUAL);break;case eh:i.depthFunc(i.GEQUAL);break;case nh:i.depthFunc(i.GREATER);break;case ih:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}at=Et}},setLocked:function(Et){B=Et},setClear:function(Et){Mt!==Et&&(St&&(Et=1-Et),i.clearDepth(Et),Mt=Et)},reset:function(){B=!1,rt=null,at=null,Mt=null,St=!1}}}function r(){let B=!1,St=null,rt=null,at=null,Mt=null,Et=null,Gt=null,he=null,ke=null;return{setTest:function(Rt){B||(Rt?dt(i.STENCIL_TEST):Pt(i.STENCIL_TEST))},setMask:function(Rt){St!==Rt&&!B&&(i.stencilMask(Rt),St=Rt)},setFunc:function(Rt,Ft,Qt){(rt!==Rt||at!==Ft||Mt!==Qt)&&(i.stencilFunc(Rt,Ft,Qt),rt=Rt,at=Ft,Mt=Qt)},setOp:function(Rt,Ft,Qt){(Et!==Rt||Gt!==Ft||he!==Qt)&&(i.stencilOp(Rt,Ft,Qt),Et=Rt,Gt=Ft,he=Qt)},setLocked:function(Rt){B=Rt},setClear:function(Rt){ke!==Rt&&(i.clearStencil(Rt),ke=Rt)},reset:function(){B=!1,St=null,rt=null,at=null,Mt=null,Et=null,Gt=null,he=null,ke=null}}}const s=new e,o=new n,a=new r,l=new WeakMap,c=new WeakMap;let u={},f={},h=new WeakMap,d=[],g=null,_=!1,m=null,p=null,M=null,b=null,v=null,R=null,C=null,T=new ae(0,0,0),D=0,S=!1,x=null,I=null,F=null,z=null,W=null;const tt=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,K=0;const H=i.getParameter(i.VERSION);H.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(H)[1]),G=K>=1):H.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),G=K>=2);let ct=null,N={};const vt=i.getParameter(i.SCISSOR_BOX),Lt=i.getParameter(i.VIEWPORT),qt=new He().fromArray(vt),nt=new He().fromArray(Lt);function ht(B,St,rt,at){const Mt=new Uint8Array(4),Et=i.createTexture();i.bindTexture(B,Et),i.texParameteri(B,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(B,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Gt=0;Gt<rt;Gt++)B===i.TEXTURE_3D||B===i.TEXTURE_2D_ARRAY?i.texImage3D(St,0,i.RGBA,1,1,at,0,i.RGBA,i.UNSIGNED_BYTE,Mt):i.texImage2D(St+Gt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Mt);return Et}const yt={};yt[i.TEXTURE_2D]=ht(i.TEXTURE_2D,i.TEXTURE_2D,1),yt[i.TEXTURE_CUBE_MAP]=ht(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),yt[i.TEXTURE_2D_ARRAY]=ht(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),yt[i.TEXTURE_3D]=ht(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),dt(i.DEPTH_TEST),o.setFunc($o),J(!1),L(Qp),dt(i.CULL_FACE),A(ts);function dt(B){u[B]!==!0&&(i.enable(B),u[B]=!0)}function Pt(B){u[B]!==!1&&(i.disable(B),u[B]=!1)}function It(B,St){return f[B]!==St?(i.bindFramebuffer(B,St),f[B]=St,B===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=St),B===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=St),!0):!1}function kt(B,St){let rt=d,at=!1;if(B){rt=h.get(St),rt===void 0&&(rt=[],h.set(St,rt));const Mt=B.textures;if(rt.length!==Mt.length||rt[0]!==i.COLOR_ATTACHMENT0){for(let Et=0,Gt=Mt.length;Et<Gt;Et++)rt[Et]=i.COLOR_ATTACHMENT0+Et;rt.length=Mt.length,at=!0}}else rt[0]!==i.BACK&&(rt[0]=i.BACK,at=!0);at&&i.drawBuffers(rt)}function Zt(B){return g!==B?(i.useProgram(B),g=B,!0):!1}const P={[Ts]:i.FUNC_ADD,[AS]:i.FUNC_SUBTRACT,[CS]:i.FUNC_REVERSE_SUBTRACT};P[RS]=i.MIN,P[PS]=i.MAX;const U={[DS]:i.ZERO,[LS]:i.ONE,[IS]:i.SRC_COLOR,[jf]:i.SRC_ALPHA,[zS]:i.SRC_ALPHA_SATURATE,[FS]:i.DST_COLOR,[NS]:i.DST_ALPHA,[US]:i.ONE_MINUS_SRC_COLOR,[Kf]:i.ONE_MINUS_SRC_ALPHA,[BS]:i.ONE_MINUS_DST_COLOR,[OS]:i.ONE_MINUS_DST_ALPHA,[kS]:i.CONSTANT_COLOR,[HS]:i.ONE_MINUS_CONSTANT_COLOR,[VS]:i.CONSTANT_ALPHA,[GS]:i.ONE_MINUS_CONSTANT_ALPHA};function A(B,St,rt,at,Mt,Et,Gt,he,ke,Rt){if(B===ts){_===!0&&(Pt(i.BLEND),_=!1);return}if(_===!1&&(dt(i.BLEND),_=!0),B!==wS){if(B!==m||Rt!==S){if((p!==Ts||v!==Ts)&&(i.blendEquation(i.FUNC_ADD),p=Ts,v=Ts),Rt)switch(B){case Oo:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Vc:i.blendFunc(i.ONE,i.ONE);break;case tm:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case em:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}else switch(B){case Oo:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Vc:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case tm:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case em:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}M=null,b=null,R=null,C=null,T.set(0,0,0),D=0,m=B,S=Rt}return}Mt=Mt||St,Et=Et||rt,Gt=Gt||at,(St!==p||Mt!==v)&&(i.blendEquationSeparate(P[St],P[Mt]),p=St,v=Mt),(rt!==M||at!==b||Et!==R||Gt!==C)&&(i.blendFuncSeparate(U[rt],U[at],U[Et],U[Gt]),M=rt,b=at,R=Et,C=Gt),(he.equals(T)===!1||ke!==D)&&(i.blendColor(he.r,he.g,he.b,ke),T.copy(he),D=ke),m=B,S=!1}function st(B,St){B.side===bi?Pt(i.CULL_FACE):dt(i.CULL_FACE);let rt=B.side===Kn;St&&(rt=!rt),J(rt),B.blending===Oo&&B.transparent===!1?A(ts):A(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),o.setFunc(B.depthFunc),o.setTest(B.depthTest),o.setMask(B.depthWrite),s.setMask(B.colorWrite);const at=B.stencilWrite;a.setTest(at),at&&(a.setMask(B.stencilWriteMask),a.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),a.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),ot(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?dt(i.SAMPLE_ALPHA_TO_COVERAGE):Pt(i.SAMPLE_ALPHA_TO_COVERAGE)}function J(B){x!==B&&(B?i.frontFace(i.CW):i.frontFace(i.CCW),x=B)}function L(B){B!==bS?(dt(i.CULL_FACE),B!==I&&(B===Qp?i.cullFace(i.BACK):B===ES?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Pt(i.CULL_FACE),I=B}function it(B){B!==F&&(G&&i.lineWidth(B),F=B)}function ot(B,St,rt){B?(dt(i.POLYGON_OFFSET_FILL),(z!==St||W!==rt)&&(i.polygonOffset(St,rt),z=St,W=rt)):Pt(i.POLYGON_OFFSET_FILL)}function Q(B){B?dt(i.SCISSOR_TEST):Pt(i.SCISSOR_TEST)}function E(B){B===void 0&&(B=i.TEXTURE0+tt-1),ct!==B&&(i.activeTexture(B),ct=B)}function y(B,St,rt){rt===void 0&&(ct===null?rt=i.TEXTURE0+tt-1:rt=ct);let at=N[rt];at===void 0&&(at={type:void 0,texture:void 0},N[rt]=at),(at.type!==B||at.texture!==St)&&(ct!==rt&&(i.activeTexture(rt),ct=rt),i.bindTexture(B,St||yt[B]),at.type=B,at.texture=St)}function O(){const B=N[ct];B!==void 0&&B.type!==void 0&&(i.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function X(){try{i.compressedTexImage2D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Y(){try{i.compressedTexImage3D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function $(){try{i.texSubImage2D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ut(){try{i.texSubImage3D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function lt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function mt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Ot(){try{i.texStorage2D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ft(){try{i.texStorage3D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function et(){try{i.texImage2D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function bt(){try{i.texImage3D.apply(i,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Ct(B){qt.equals(B)===!1&&(i.scissor(B.x,B.y,B.z,B.w),qt.copy(B))}function _t(B){nt.equals(B)===!1&&(i.viewport(B.x,B.y,B.z,B.w),nt.copy(B))}function Ht(B,St){let rt=c.get(St);rt===void 0&&(rt=new WeakMap,c.set(St,rt));let at=rt.get(B);at===void 0&&(at=i.getUniformBlockIndex(St,B.name),rt.set(B,at))}function Vt(B,St){const at=c.get(St).get(B);l.get(St)!==at&&(i.uniformBlockBinding(St,at,B.__bindingPointIndex),l.set(St,at))}function ce(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},ct=null,N={},f={},h=new WeakMap,d=[],g=null,_=!1,m=null,p=null,M=null,b=null,v=null,R=null,C=null,T=new ae(0,0,0),D=0,S=!1,x=null,I=null,F=null,z=null,W=null,qt.set(0,0,i.canvas.width,i.canvas.height),nt.set(0,0,i.canvas.width,i.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:dt,disable:Pt,bindFramebuffer:It,drawBuffers:kt,useProgram:Zt,setBlending:A,setMaterial:st,setFlipSided:J,setCullFace:L,setLineWidth:it,setPolygonOffset:ot,setScissorTest:Q,activeTexture:E,bindTexture:y,unbindTexture:O,compressedTexImage2D:X,compressedTexImage3D:Y,texImage2D:et,texImage3D:bt,updateUBOMapping:Ht,uniformBlockBinding:Vt,texStorage2D:Ot,texStorage3D:ft,texSubImage2D:$,texSubImage3D:ut,compressedTexSubImage2D:lt,compressedTexSubImage3D:mt,scissor:Ct,viewport:_t,reset:ce}}function jm(i,t,e,n){const r=hA(n);switch(e){case z0:return i*t;case H0:return i*t;case V0:return i*t*2;case G0:return i*t/r.components*r.byteLength;case Id:return i*t/r.components*r.byteLength;case W0:return i*t*2/r.components*r.byteLength;case Ud:return i*t*2/r.components*r.byteLength;case k0:return i*t*3/r.components*r.byteLength;case Bi:return i*t*4/r.components*r.byteLength;case Nd:return i*t*4/r.components*r.byteLength;case mc:case _c:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case gc:case vc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ch:case fh:return Math.max(i,16)*Math.max(t,8)/4;case lh:case uh:return Math.max(i,8)*Math.max(t,8)/2;case hh:case dh:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ph:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case mh:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case _h:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case gh:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case vh:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case xh:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case yh:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Mh:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Sh:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case bh:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Eh:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Th:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case wh:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Ah:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Ch:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case xc:case Rh:case Ph:return Math.ceil(i/4)*Math.ceil(t/4)*16;case X0:case Dh:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Lh:case Ih:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function hA(i){switch(i){case Cr:case O0:return{byteLength:1,components:1};case ol:case F0:case fl:return{byteLength:2,components:1};case Dd:case Ld:return{byteLength:2,components:4};case Ws:case Pd:case yr:return{byteLength:4,components:1};case B0:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function dA(i,t,e,n,r,s,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Jt,u=new WeakMap;let f;const h=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,y){return d?new OffscreenCanvas(E,y):Wc("canvas")}function _(E,y,O){let X=1;const Y=Q(E);if((Y.width>O||Y.height>O)&&(X=O/Math.max(Y.width,Y.height)),X<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){const $=Math.floor(X*Y.width),ut=Math.floor(X*Y.height);f===void 0&&(f=g($,ut));const lt=y?g($,ut):f;return lt.width=$,lt.height=ut,lt.getContext("2d").drawImage(E,0,0,$,ut),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Y.width+"x"+Y.height+") to ("+$+"x"+ut+")."),lt}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Y.width+"x"+Y.height+")."),E;return E}function m(E){return E.generateMipmaps}function p(E){i.generateMipmap(E)}function M(E){return E.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?i.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function b(E,y,O,X,Y=!1){if(E!==null){if(i[E]!==void 0)return i[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let $=y;if(y===i.RED&&(O===i.FLOAT&&($=i.R32F),O===i.HALF_FLOAT&&($=i.R16F),O===i.UNSIGNED_BYTE&&($=i.R8)),y===i.RED_INTEGER&&(O===i.UNSIGNED_BYTE&&($=i.R8UI),O===i.UNSIGNED_SHORT&&($=i.R16UI),O===i.UNSIGNED_INT&&($=i.R32UI),O===i.BYTE&&($=i.R8I),O===i.SHORT&&($=i.R16I),O===i.INT&&($=i.R32I)),y===i.RG&&(O===i.FLOAT&&($=i.RG32F),O===i.HALF_FLOAT&&($=i.RG16F),O===i.UNSIGNED_BYTE&&($=i.RG8)),y===i.RG_INTEGER&&(O===i.UNSIGNED_BYTE&&($=i.RG8UI),O===i.UNSIGNED_SHORT&&($=i.RG16UI),O===i.UNSIGNED_INT&&($=i.RG32UI),O===i.BYTE&&($=i.RG8I),O===i.SHORT&&($=i.RG16I),O===i.INT&&($=i.RG32I)),y===i.RGB_INTEGER&&(O===i.UNSIGNED_BYTE&&($=i.RGB8UI),O===i.UNSIGNED_SHORT&&($=i.RGB16UI),O===i.UNSIGNED_INT&&($=i.RGB32UI),O===i.BYTE&&($=i.RGB8I),O===i.SHORT&&($=i.RGB16I),O===i.INT&&($=i.RGB32I)),y===i.RGBA_INTEGER&&(O===i.UNSIGNED_BYTE&&($=i.RGBA8UI),O===i.UNSIGNED_SHORT&&($=i.RGBA16UI),O===i.UNSIGNED_INT&&($=i.RGBA32UI),O===i.BYTE&&($=i.RGBA8I),O===i.SHORT&&($=i.RGBA16I),O===i.INT&&($=i.RGBA32I)),y===i.RGB&&O===i.UNSIGNED_INT_5_9_9_9_REV&&($=i.RGB9_E5),y===i.RGBA){const ut=Y?au:fe.getTransfer(X);O===i.FLOAT&&($=i.RGBA32F),O===i.HALF_FLOAT&&($=i.RGBA16F),O===i.UNSIGNED_BYTE&&($=ut===Se?i.SRGB8_ALPHA8:i.RGBA8),O===i.UNSIGNED_SHORT_4_4_4_4&&($=i.RGBA4),O===i.UNSIGNED_SHORT_5_5_5_1&&($=i.RGB5_A1)}return($===i.R16F||$===i.R32F||$===i.RG16F||$===i.RG32F||$===i.RGBA16F||$===i.RGBA32F)&&t.get("EXT_color_buffer_float"),$}function v(E,y){let O;return E?y===null||y===Ws||y===Zo?O=i.DEPTH24_STENCIL8:y===yr?O=i.DEPTH32F_STENCIL8:y===ol&&(O=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===Ws||y===Zo?O=i.DEPTH_COMPONENT24:y===yr?O=i.DEPTH_COMPONENT32F:y===ol&&(O=i.DEPTH_COMPONENT16),O}function R(E,y){return m(E)===!0||E.isFramebufferTexture&&E.minFilter!==ki&&E.minFilter!==Ji?Math.log2(Math.max(y.width,y.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?y.mipmaps.length:1}function C(E){const y=E.target;y.removeEventListener("dispose",C),D(y),y.isVideoTexture&&u.delete(y)}function T(E){const y=E.target;y.removeEventListener("dispose",T),x(y)}function D(E){const y=n.get(E);if(y.__webglInit===void 0)return;const O=E.source,X=h.get(O);if(X){const Y=X[y.__cacheKey];Y.usedTimes--,Y.usedTimes===0&&S(E),Object.keys(X).length===0&&h.delete(O)}n.remove(E)}function S(E){const y=n.get(E);i.deleteTexture(y.__webglTexture);const O=E.source,X=h.get(O);delete X[y.__cacheKey],o.memory.textures--}function x(E){const y=n.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),n.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(y.__webglFramebuffer[X]))for(let Y=0;Y<y.__webglFramebuffer[X].length;Y++)i.deleteFramebuffer(y.__webglFramebuffer[X][Y]);else i.deleteFramebuffer(y.__webglFramebuffer[X]);y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer[X])}else{if(Array.isArray(y.__webglFramebuffer))for(let X=0;X<y.__webglFramebuffer.length;X++)i.deleteFramebuffer(y.__webglFramebuffer[X]);else i.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&i.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let X=0;X<y.__webglColorRenderbuffer.length;X++)y.__webglColorRenderbuffer[X]&&i.deleteRenderbuffer(y.__webglColorRenderbuffer[X]);y.__webglDepthRenderbuffer&&i.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const O=E.textures;for(let X=0,Y=O.length;X<Y;X++){const $=n.get(O[X]);$.__webglTexture&&(i.deleteTexture($.__webglTexture),o.memory.textures--),n.remove(O[X])}n.remove(E)}let I=0;function F(){I=0}function z(){const E=I;return E>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+r.maxTextures),I+=1,E}function W(E){const y=[];return y.push(E.wrapS),y.push(E.wrapT),y.push(E.wrapR||0),y.push(E.magFilter),y.push(E.minFilter),y.push(E.anisotropy),y.push(E.internalFormat),y.push(E.format),y.push(E.type),y.push(E.generateMipmaps),y.push(E.premultiplyAlpha),y.push(E.flipY),y.push(E.unpackAlignment),y.push(E.colorSpace),y.join()}function tt(E,y){const O=n.get(E);if(E.isVideoTexture&&it(E),E.isRenderTargetTexture===!1&&E.version>0&&O.__version!==E.version){const X=E.image;if(X===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{nt(O,E,y);return}}e.bindTexture(i.TEXTURE_2D,O.__webglTexture,i.TEXTURE0+y)}function G(E,y){const O=n.get(E);if(E.version>0&&O.__version!==E.version){nt(O,E,y);return}e.bindTexture(i.TEXTURE_2D_ARRAY,O.__webglTexture,i.TEXTURE0+y)}function K(E,y){const O=n.get(E);if(E.version>0&&O.__version!==E.version){nt(O,E,y);return}e.bindTexture(i.TEXTURE_3D,O.__webglTexture,i.TEXTURE0+y)}function H(E,y){const O=n.get(E);if(E.version>0&&O.__version!==E.version){ht(O,E,y);return}e.bindTexture(i.TEXTURE_CUBE_MAP,O.__webglTexture,i.TEXTURE0+y)}const ct={[oh]:i.REPEAT,[Rs]:i.CLAMP_TO_EDGE,[ah]:i.MIRRORED_REPEAT},N={[ki]:i.NEAREST,[QS]:i.NEAREST_MIPMAP_NEAREST,[Dl]:i.NEAREST_MIPMAP_LINEAR,[Ji]:i.LINEAR,[Nu]:i.LINEAR_MIPMAP_NEAREST,[Ps]:i.LINEAR_MIPMAP_LINEAR},vt={[ib]:i.NEVER,[cb]:i.ALWAYS,[rb]:i.LESS,[q0]:i.LEQUAL,[sb]:i.EQUAL,[lb]:i.GEQUAL,[ob]:i.GREATER,[ab]:i.NOTEQUAL};function Lt(E,y){if(y.type===yr&&t.has("OES_texture_float_linear")===!1&&(y.magFilter===Ji||y.magFilter===Nu||y.magFilter===Dl||y.magFilter===Ps||y.minFilter===Ji||y.minFilter===Nu||y.minFilter===Dl||y.minFilter===Ps)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(E,i.TEXTURE_WRAP_S,ct[y.wrapS]),i.texParameteri(E,i.TEXTURE_WRAP_T,ct[y.wrapT]),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,ct[y.wrapR]),i.texParameteri(E,i.TEXTURE_MAG_FILTER,N[y.magFilter]),i.texParameteri(E,i.TEXTURE_MIN_FILTER,N[y.minFilter]),y.compareFunction&&(i.texParameteri(E,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(E,i.TEXTURE_COMPARE_FUNC,vt[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===ki||y.minFilter!==Dl&&y.minFilter!==Ps||y.type===yr&&t.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){const O=t.get("EXT_texture_filter_anisotropic");i.texParameterf(E,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,r.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function qt(E,y){let O=!1;E.__webglInit===void 0&&(E.__webglInit=!0,y.addEventListener("dispose",C));const X=y.source;let Y=h.get(X);Y===void 0&&(Y={},h.set(X,Y));const $=W(y);if($!==E.__cacheKey){Y[$]===void 0&&(Y[$]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,O=!0),Y[$].usedTimes++;const ut=Y[E.__cacheKey];ut!==void 0&&(Y[E.__cacheKey].usedTimes--,ut.usedTimes===0&&S(y)),E.__cacheKey=$,E.__webglTexture=Y[$].texture}return O}function nt(E,y,O){let X=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(X=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(X=i.TEXTURE_3D);const Y=qt(E,y),$=y.source;e.bindTexture(X,E.__webglTexture,i.TEXTURE0+O);const ut=n.get($);if($.version!==ut.__version||Y===!0){e.activeTexture(i.TEXTURE0+O);const lt=fe.getPrimaries(fe.workingColorSpace),mt=y.colorSpace===Gr?null:fe.getPrimaries(y.colorSpace),Ot=y.colorSpace===Gr||lt===mt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ot);let ft=_(y.image,!1,r.maxTextureSize);ft=ot(y,ft);const et=s.convert(y.format,y.colorSpace),bt=s.convert(y.type);let Ct=b(y.internalFormat,et,bt,y.colorSpace,y.isVideoTexture);Lt(X,y);let _t;const Ht=y.mipmaps,Vt=y.isVideoTexture!==!0,ce=ut.__version===void 0||Y===!0,B=$.dataReady,St=R(y,ft);if(y.isDepthTexture)Ct=v(y.format===Jo,y.type),ce&&(Vt?e.texStorage2D(i.TEXTURE_2D,1,Ct,ft.width,ft.height):e.texImage2D(i.TEXTURE_2D,0,Ct,ft.width,ft.height,0,et,bt,null));else if(y.isDataTexture)if(Ht.length>0){Vt&&ce&&e.texStorage2D(i.TEXTURE_2D,St,Ct,Ht[0].width,Ht[0].height);for(let rt=0,at=Ht.length;rt<at;rt++)_t=Ht[rt],Vt?B&&e.texSubImage2D(i.TEXTURE_2D,rt,0,0,_t.width,_t.height,et,bt,_t.data):e.texImage2D(i.TEXTURE_2D,rt,Ct,_t.width,_t.height,0,et,bt,_t.data);y.generateMipmaps=!1}else Vt?(ce&&e.texStorage2D(i.TEXTURE_2D,St,Ct,ft.width,ft.height),B&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ft.width,ft.height,et,bt,ft.data)):e.texImage2D(i.TEXTURE_2D,0,Ct,ft.width,ft.height,0,et,bt,ft.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Vt&&ce&&e.texStorage3D(i.TEXTURE_2D_ARRAY,St,Ct,Ht[0].width,Ht[0].height,ft.depth);for(let rt=0,at=Ht.length;rt<at;rt++)if(_t=Ht[rt],y.format!==Bi)if(et!==null)if(Vt){if(B)if(y.layerUpdates.size>0){const Mt=jm(_t.width,_t.height,y.format,y.type);for(const Et of y.layerUpdates){const Gt=_t.data.subarray(Et*Mt/_t.data.BYTES_PER_ELEMENT,(Et+1)*Mt/_t.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,rt,0,0,Et,_t.width,_t.height,1,et,Gt)}y.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,rt,0,0,0,_t.width,_t.height,ft.depth,et,_t.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,rt,Ct,_t.width,_t.height,ft.depth,0,_t.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Vt?B&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,rt,0,0,0,_t.width,_t.height,ft.depth,et,bt,_t.data):e.texImage3D(i.TEXTURE_2D_ARRAY,rt,Ct,_t.width,_t.height,ft.depth,0,et,bt,_t.data)}else{Vt&&ce&&e.texStorage2D(i.TEXTURE_2D,St,Ct,Ht[0].width,Ht[0].height);for(let rt=0,at=Ht.length;rt<at;rt++)_t=Ht[rt],y.format!==Bi?et!==null?Vt?B&&e.compressedTexSubImage2D(i.TEXTURE_2D,rt,0,0,_t.width,_t.height,et,_t.data):e.compressedTexImage2D(i.TEXTURE_2D,rt,Ct,_t.width,_t.height,0,_t.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Vt?B&&e.texSubImage2D(i.TEXTURE_2D,rt,0,0,_t.width,_t.height,et,bt,_t.data):e.texImage2D(i.TEXTURE_2D,rt,Ct,_t.width,_t.height,0,et,bt,_t.data)}else if(y.isDataArrayTexture)if(Vt){if(ce&&e.texStorage3D(i.TEXTURE_2D_ARRAY,St,Ct,ft.width,ft.height,ft.depth),B)if(y.layerUpdates.size>0){const rt=jm(ft.width,ft.height,y.format,y.type);for(const at of y.layerUpdates){const Mt=ft.data.subarray(at*rt/ft.data.BYTES_PER_ELEMENT,(at+1)*rt/ft.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,at,ft.width,ft.height,1,et,bt,Mt)}y.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ft.width,ft.height,ft.depth,et,bt,ft.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Ct,ft.width,ft.height,ft.depth,0,et,bt,ft.data);else if(y.isData3DTexture)Vt?(ce&&e.texStorage3D(i.TEXTURE_3D,St,Ct,ft.width,ft.height,ft.depth),B&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ft.width,ft.height,ft.depth,et,bt,ft.data)):e.texImage3D(i.TEXTURE_3D,0,Ct,ft.width,ft.height,ft.depth,0,et,bt,ft.data);else if(y.isFramebufferTexture){if(ce)if(Vt)e.texStorage2D(i.TEXTURE_2D,St,Ct,ft.width,ft.height);else{let rt=ft.width,at=ft.height;for(let Mt=0;Mt<St;Mt++)e.texImage2D(i.TEXTURE_2D,Mt,Ct,rt,at,0,et,bt,null),rt>>=1,at>>=1}}else if(Ht.length>0){if(Vt&&ce){const rt=Q(Ht[0]);e.texStorage2D(i.TEXTURE_2D,St,Ct,rt.width,rt.height)}for(let rt=0,at=Ht.length;rt<at;rt++)_t=Ht[rt],Vt?B&&e.texSubImage2D(i.TEXTURE_2D,rt,0,0,et,bt,_t):e.texImage2D(i.TEXTURE_2D,rt,Ct,et,bt,_t);y.generateMipmaps=!1}else if(Vt){if(ce){const rt=Q(ft);e.texStorage2D(i.TEXTURE_2D,St,Ct,rt.width,rt.height)}B&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,et,bt,ft)}else e.texImage2D(i.TEXTURE_2D,0,Ct,et,bt,ft);m(y)&&p(X),ut.__version=$.version,y.onUpdate&&y.onUpdate(y)}E.__version=y.version}function ht(E,y,O){if(y.image.length!==6)return;const X=qt(E,y),Y=y.source;e.bindTexture(i.TEXTURE_CUBE_MAP,E.__webglTexture,i.TEXTURE0+O);const $=n.get(Y);if(Y.version!==$.__version||X===!0){e.activeTexture(i.TEXTURE0+O);const ut=fe.getPrimaries(fe.workingColorSpace),lt=y.colorSpace===Gr?null:fe.getPrimaries(y.colorSpace),mt=y.colorSpace===Gr||ut===lt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,mt);const Ot=y.isCompressedTexture||y.image[0].isCompressedTexture,ft=y.image[0]&&y.image[0].isDataTexture,et=[];for(let at=0;at<6;at++)!Ot&&!ft?et[at]=_(y.image[at],!0,r.maxCubemapSize):et[at]=ft?y.image[at].image:y.image[at],et[at]=ot(y,et[at]);const bt=et[0],Ct=s.convert(y.format,y.colorSpace),_t=s.convert(y.type),Ht=b(y.internalFormat,Ct,_t,y.colorSpace),Vt=y.isVideoTexture!==!0,ce=$.__version===void 0||X===!0,B=Y.dataReady;let St=R(y,bt);Lt(i.TEXTURE_CUBE_MAP,y);let rt;if(Ot){Vt&&ce&&e.texStorage2D(i.TEXTURE_CUBE_MAP,St,Ht,bt.width,bt.height);for(let at=0;at<6;at++){rt=et[at].mipmaps;for(let Mt=0;Mt<rt.length;Mt++){const Et=rt[Mt];y.format!==Bi?Ct!==null?Vt?B&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,Mt,0,0,Et.width,Et.height,Ct,Et.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,Mt,Ht,Et.width,Et.height,0,Et.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Vt?B&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,Mt,0,0,Et.width,Et.height,Ct,_t,Et.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,Mt,Ht,Et.width,Et.height,0,Ct,_t,Et.data)}}}else{if(rt=y.mipmaps,Vt&&ce){rt.length>0&&St++;const at=Q(et[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,St,Ht,at.width,at.height)}for(let at=0;at<6;at++)if(ft){Vt?B&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,0,0,et[at].width,et[at].height,Ct,_t,et[at].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,Ht,et[at].width,et[at].height,0,Ct,_t,et[at].data);for(let Mt=0;Mt<rt.length;Mt++){const Gt=rt[Mt].image[at].image;Vt?B&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,Mt+1,0,0,Gt.width,Gt.height,Ct,_t,Gt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,Mt+1,Ht,Gt.width,Gt.height,0,Ct,_t,Gt.data)}}else{Vt?B&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,0,0,Ct,_t,et[at]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,Ht,Ct,_t,et[at]);for(let Mt=0;Mt<rt.length;Mt++){const Et=rt[Mt];Vt?B&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,Mt+1,0,0,Ct,_t,Et.image[at]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,Mt+1,Ht,Ct,_t,Et.image[at])}}}m(y)&&p(i.TEXTURE_CUBE_MAP),$.__version=Y.version,y.onUpdate&&y.onUpdate(y)}E.__version=y.version}function yt(E,y,O,X,Y,$){const ut=s.convert(O.format,O.colorSpace),lt=s.convert(O.type),mt=b(O.internalFormat,ut,lt,O.colorSpace),Ot=n.get(y),ft=n.get(O);if(ft.__renderTarget=y,!Ot.__hasExternalTextures){const et=Math.max(1,y.width>>$),bt=Math.max(1,y.height>>$);Y===i.TEXTURE_3D||Y===i.TEXTURE_2D_ARRAY?e.texImage3D(Y,$,mt,et,bt,y.depth,0,ut,lt,null):e.texImage2D(Y,$,mt,et,bt,0,ut,lt,null)}e.bindFramebuffer(i.FRAMEBUFFER,E),L(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,X,Y,ft.__webglTexture,0,J(y)):(Y===i.TEXTURE_2D||Y>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Y<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,X,Y,ft.__webglTexture,$),e.bindFramebuffer(i.FRAMEBUFFER,null)}function dt(E,y,O){if(i.bindRenderbuffer(i.RENDERBUFFER,E),y.depthBuffer){const X=y.depthTexture,Y=X&&X.isDepthTexture?X.type:null,$=v(y.stencilBuffer,Y),ut=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,lt=J(y);L(y)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,lt,$,y.width,y.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,lt,$,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,$,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ut,i.RENDERBUFFER,E)}else{const X=y.textures;for(let Y=0;Y<X.length;Y++){const $=X[Y],ut=s.convert($.format,$.colorSpace),lt=s.convert($.type),mt=b($.internalFormat,ut,lt,$.colorSpace),Ot=J(y);O&&L(y)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ot,mt,y.width,y.height):L(y)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ot,mt,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,mt,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Pt(E,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,E),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const X=n.get(y.depthTexture);X.__renderTarget=y,(!X.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),tt(y.depthTexture,0);const Y=X.__webglTexture,$=J(y);if(y.depthTexture.format===Fo)L(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Y,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Y,0);else if(y.depthTexture.format===Jo)L(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Y,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Y,0);else throw new Error("Unknown depthTexture format")}function It(E){const y=n.get(E),O=E.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==E.depthTexture){const X=E.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),X){const Y=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,X.removeEventListener("dispose",Y)};X.addEventListener("dispose",Y),y.__depthDisposeCallback=Y}y.__boundDepthTexture=X}if(E.depthTexture&&!y.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");Pt(y.__webglFramebuffer,E)}else if(O){y.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[X]),y.__webglDepthbuffer[X]===void 0)y.__webglDepthbuffer[X]=i.createRenderbuffer(),dt(y.__webglDepthbuffer[X],E,!1);else{const Y=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,$=y.__webglDepthbuffer[X];i.bindRenderbuffer(i.RENDERBUFFER,$),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,$)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=i.createRenderbuffer(),dt(y.__webglDepthbuffer,E,!1);else{const X=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Y=y.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Y),i.framebufferRenderbuffer(i.FRAMEBUFFER,X,i.RENDERBUFFER,Y)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function kt(E,y,O){const X=n.get(E);y!==void 0&&yt(X.__webglFramebuffer,E,E.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),O!==void 0&&It(E)}function Zt(E){const y=E.texture,O=n.get(E),X=n.get(y);E.addEventListener("dispose",T);const Y=E.textures,$=E.isWebGLCubeRenderTarget===!0,ut=Y.length>1;if(ut||(X.__webglTexture===void 0&&(X.__webglTexture=i.createTexture()),X.__version=y.version,o.memory.textures++),$){O.__webglFramebuffer=[];for(let lt=0;lt<6;lt++)if(y.mipmaps&&y.mipmaps.length>0){O.__webglFramebuffer[lt]=[];for(let mt=0;mt<y.mipmaps.length;mt++)O.__webglFramebuffer[lt][mt]=i.createFramebuffer()}else O.__webglFramebuffer[lt]=i.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){O.__webglFramebuffer=[];for(let lt=0;lt<y.mipmaps.length;lt++)O.__webglFramebuffer[lt]=i.createFramebuffer()}else O.__webglFramebuffer=i.createFramebuffer();if(ut)for(let lt=0,mt=Y.length;lt<mt;lt++){const Ot=n.get(Y[lt]);Ot.__webglTexture===void 0&&(Ot.__webglTexture=i.createTexture(),o.memory.textures++)}if(E.samples>0&&L(E)===!1){O.__webglMultisampledFramebuffer=i.createFramebuffer(),O.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let lt=0;lt<Y.length;lt++){const mt=Y[lt];O.__webglColorRenderbuffer[lt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,O.__webglColorRenderbuffer[lt]);const Ot=s.convert(mt.format,mt.colorSpace),ft=s.convert(mt.type),et=b(mt.internalFormat,Ot,ft,mt.colorSpace,E.isXRRenderTarget===!0),bt=J(E);i.renderbufferStorageMultisample(i.RENDERBUFFER,bt,et,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.RENDERBUFFER,O.__webglColorRenderbuffer[lt])}i.bindRenderbuffer(i.RENDERBUFFER,null),E.depthBuffer&&(O.__webglDepthRenderbuffer=i.createRenderbuffer(),dt(O.__webglDepthRenderbuffer,E,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if($){e.bindTexture(i.TEXTURE_CUBE_MAP,X.__webglTexture),Lt(i.TEXTURE_CUBE_MAP,y);for(let lt=0;lt<6;lt++)if(y.mipmaps&&y.mipmaps.length>0)for(let mt=0;mt<y.mipmaps.length;mt++)yt(O.__webglFramebuffer[lt][mt],E,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,mt);else yt(O.__webglFramebuffer[lt],E,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0);m(y)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ut){for(let lt=0,mt=Y.length;lt<mt;lt++){const Ot=Y[lt],ft=n.get(Ot);e.bindTexture(i.TEXTURE_2D,ft.__webglTexture),Lt(i.TEXTURE_2D,Ot),yt(O.__webglFramebuffer,E,Ot,i.COLOR_ATTACHMENT0+lt,i.TEXTURE_2D,0),m(Ot)&&p(i.TEXTURE_2D)}e.unbindTexture()}else{let lt=i.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(lt=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(lt,X.__webglTexture),Lt(lt,y),y.mipmaps&&y.mipmaps.length>0)for(let mt=0;mt<y.mipmaps.length;mt++)yt(O.__webglFramebuffer[mt],E,y,i.COLOR_ATTACHMENT0,lt,mt);else yt(O.__webglFramebuffer,E,y,i.COLOR_ATTACHMENT0,lt,0);m(y)&&p(lt),e.unbindTexture()}E.depthBuffer&&It(E)}function P(E){const y=E.textures;for(let O=0,X=y.length;O<X;O++){const Y=y[O];if(m(Y)){const $=M(E),ut=n.get(Y).__webglTexture;e.bindTexture($,ut),p($),e.unbindTexture()}}}const U=[],A=[];function st(E){if(E.samples>0){if(L(E)===!1){const y=E.textures,O=E.width,X=E.height;let Y=i.COLOR_BUFFER_BIT;const $=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ut=n.get(E),lt=y.length>1;if(lt)for(let mt=0;mt<y.length;mt++)e.bindFramebuffer(i.FRAMEBUFFER,ut.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+mt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,ut.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+mt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,ut.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ut.__webglFramebuffer);for(let mt=0;mt<y.length;mt++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(Y|=i.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(Y|=i.STENCIL_BUFFER_BIT)),lt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ut.__webglColorRenderbuffer[mt]);const Ot=n.get(y[mt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Ot,0)}i.blitFramebuffer(0,0,O,X,0,0,O,X,Y,i.NEAREST),l===!0&&(U.length=0,A.length=0,U.push(i.COLOR_ATTACHMENT0+mt),E.depthBuffer&&E.resolveDepthBuffer===!1&&(U.push($),A.push($),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,A)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,U))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),lt)for(let mt=0;mt<y.length;mt++){e.bindFramebuffer(i.FRAMEBUFFER,ut.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+mt,i.RENDERBUFFER,ut.__webglColorRenderbuffer[mt]);const Ot=n.get(y[mt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,ut.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+mt,i.TEXTURE_2D,Ot,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ut.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&l){const y=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[y])}}}function J(E){return Math.min(r.maxSamples,E.samples)}function L(E){const y=n.get(E);return E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function it(E){const y=o.render.frame;u.get(E)!==y&&(u.set(E,y),E.update())}function ot(E,y){const O=E.colorSpace,X=E.format,Y=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||O!==ea&&O!==Gr&&(fe.getTransfer(O)===Se?(X!==Bi||Y!==Cr)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),y}function Q(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=z,this.resetTextureUnits=F,this.setTexture2D=tt,this.setTexture2DArray=G,this.setTexture3D=K,this.setTextureCube=H,this.rebindTextures=kt,this.setupRenderTarget=Zt,this.updateRenderTargetMipmap=P,this.updateMultisampleRenderTarget=st,this.setupDepthRenderbuffer=It,this.setupFrameBufferTexture=yt,this.useMultisampledRTT=L}function pA(i,t){function e(n,r=Gr){let s;const o=fe.getTransfer(r);if(n===Cr)return i.UNSIGNED_BYTE;if(n===Dd)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ld)return i.UNSIGNED_SHORT_5_5_5_1;if(n===B0)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===O0)return i.BYTE;if(n===F0)return i.SHORT;if(n===ol)return i.UNSIGNED_SHORT;if(n===Pd)return i.INT;if(n===Ws)return i.UNSIGNED_INT;if(n===yr)return i.FLOAT;if(n===fl)return i.HALF_FLOAT;if(n===z0)return i.ALPHA;if(n===k0)return i.RGB;if(n===Bi)return i.RGBA;if(n===H0)return i.LUMINANCE;if(n===V0)return i.LUMINANCE_ALPHA;if(n===Fo)return i.DEPTH_COMPONENT;if(n===Jo)return i.DEPTH_STENCIL;if(n===G0)return i.RED;if(n===Id)return i.RED_INTEGER;if(n===W0)return i.RG;if(n===Ud)return i.RG_INTEGER;if(n===Nd)return i.RGBA_INTEGER;if(n===mc||n===_c||n===gc||n===vc)if(o===Se)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===mc)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===_c)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===gc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===vc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===mc)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===_c)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===gc)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===vc)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===lh||n===ch||n===uh||n===fh)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===lh)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ch)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===uh)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===fh)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===hh||n===dh||n===ph)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===hh||n===dh)return o===Se?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===ph)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===mh||n===_h||n===gh||n===vh||n===xh||n===yh||n===Mh||n===Sh||n===bh||n===Eh||n===Th||n===wh||n===Ah||n===Ch)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===mh)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===_h)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===gh)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===vh)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===xh)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===yh)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Mh)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Sh)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===bh)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Eh)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Th)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===wh)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ah)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ch)return o===Se?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===xc||n===Rh||n===Ph)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===xc)return o===Se?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Rh)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ph)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===X0||n===Dh||n===Lh||n===Ih)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===xc)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Dh)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Lh)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ih)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Zo?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class mA extends li{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class wa extends un{constructor(){super(),this.isGroup=!0,this.type="Group"}}const _A={type:"move"};class uf{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new wa,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new wa,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new wa,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Z),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,n),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=u.position.distanceTo(f.position),d=.02,g=.005;c.inputState.pinching&&h>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&h<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=e.getPose(t.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(_A)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new wa;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const gA=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,vA=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class xA{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const r=new Zn,s=t.properties.get(r);s.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new rr({vertexShader:gA,fragmentShader:vA,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Me(new jr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class yA extends js{constructor(t,e){super();const n=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,f=null,h=null,d=null,g=null;const _=new xA,m=e.getContextAttributes();let p=null,M=null;const b=[],v=[],R=new Jt;let C=null;const T=new li;T.viewport=new He;const D=new li;D.viewport=new He;const S=[T,D],x=new mA;let I=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(nt){let ht=b[nt];return ht===void 0&&(ht=new uf,b[nt]=ht),ht.getTargetRaySpace()},this.getControllerGrip=function(nt){let ht=b[nt];return ht===void 0&&(ht=new uf,b[nt]=ht),ht.getGripSpace()},this.getHand=function(nt){let ht=b[nt];return ht===void 0&&(ht=new uf,b[nt]=ht),ht.getHandSpace()};function z(nt){const ht=v.indexOf(nt.inputSource);if(ht===-1)return;const yt=b[ht];yt!==void 0&&(yt.update(nt.inputSource,nt.frame,c||o),yt.dispatchEvent({type:nt.type,data:nt.inputSource}))}function W(){r.removeEventListener("select",z),r.removeEventListener("selectstart",z),r.removeEventListener("selectend",z),r.removeEventListener("squeeze",z),r.removeEventListener("squeezestart",z),r.removeEventListener("squeezeend",z),r.removeEventListener("end",W),r.removeEventListener("inputsourceschange",tt);for(let nt=0;nt<b.length;nt++){const ht=v[nt];ht!==null&&(v[nt]=null,b[nt].disconnect(ht))}I=null,F=null,_.reset(),t.setRenderTarget(p),d=null,h=null,f=null,r=null,M=null,qt.stop(),n.isPresenting=!1,t.setPixelRatio(C),t.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(nt){s=nt,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(nt){a=nt,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(nt){c=nt},this.getBaseLayer=function(){return h!==null?h:d},this.getBinding=function(){return f},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(nt){if(r=nt,r!==null){if(p=t.getRenderTarget(),r.addEventListener("select",z),r.addEventListener("selectstart",z),r.addEventListener("selectend",z),r.addEventListener("squeeze",z),r.addEventListener("squeezestart",z),r.addEventListener("squeezeend",z),r.addEventListener("end",W),r.addEventListener("inputsourceschange",tt),m.xrCompatible!==!0&&await e.makeXRCompatible(),C=t.getPixelRatio(),t.getSize(R),r.renderState.layers===void 0){const ht={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(r,e,ht),r.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),M=new Xs(d.framebufferWidth,d.framebufferHeight,{format:Bi,type:Cr,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let ht=null,yt=null,dt=null;m.depth&&(dt=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ht=m.stencil?Jo:Fo,yt=m.stencil?Zo:Ws);const Pt={colorFormat:e.RGBA8,depthFormat:dt,scaleFactor:s};f=new XRWebGLBinding(r,e),h=f.createProjectionLayer(Pt),r.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),M=new Xs(h.textureWidth,h.textureHeight,{format:Bi,type:Cr,depthTexture:new av(h.textureWidth,h.textureHeight,yt,void 0,void 0,void 0,void 0,void 0,void 0,ht),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),qt.setContext(r),qt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function tt(nt){for(let ht=0;ht<nt.removed.length;ht++){const yt=nt.removed[ht],dt=v.indexOf(yt);dt>=0&&(v[dt]=null,b[dt].disconnect(yt))}for(let ht=0;ht<nt.added.length;ht++){const yt=nt.added[ht];let dt=v.indexOf(yt);if(dt===-1){for(let It=0;It<b.length;It++)if(It>=v.length){v.push(yt),dt=It;break}else if(v[It]===null){v[It]=yt,dt=It;break}if(dt===-1)break}const Pt=b[dt];Pt&&Pt.connect(yt)}}const G=new Z,K=new Z;function H(nt,ht,yt){G.setFromMatrixPosition(ht.matrixWorld),K.setFromMatrixPosition(yt.matrixWorld);const dt=G.distanceTo(K),Pt=ht.projectionMatrix.elements,It=yt.projectionMatrix.elements,kt=Pt[14]/(Pt[10]-1),Zt=Pt[14]/(Pt[10]+1),P=(Pt[9]+1)/Pt[5],U=(Pt[9]-1)/Pt[5],A=(Pt[8]-1)/Pt[0],st=(It[8]+1)/It[0],J=kt*A,L=kt*st,it=dt/(-A+st),ot=it*-A;if(ht.matrixWorld.decompose(nt.position,nt.quaternion,nt.scale),nt.translateX(ot),nt.translateZ(it),nt.matrixWorld.compose(nt.position,nt.quaternion,nt.scale),nt.matrixWorldInverse.copy(nt.matrixWorld).invert(),Pt[10]===-1)nt.projectionMatrix.copy(ht.projectionMatrix),nt.projectionMatrixInverse.copy(ht.projectionMatrixInverse);else{const Q=kt+it,E=Zt+it,y=J-ot,O=L+(dt-ot),X=P*Zt/E*Q,Y=U*Zt/E*Q;nt.projectionMatrix.makePerspective(y,O,X,Y,Q,E),nt.projectionMatrixInverse.copy(nt.projectionMatrix).invert()}}function ct(nt,ht){ht===null?nt.matrixWorld.copy(nt.matrix):nt.matrixWorld.multiplyMatrices(ht.matrixWorld,nt.matrix),nt.matrixWorldInverse.copy(nt.matrixWorld).invert()}this.updateCamera=function(nt){if(r===null)return;let ht=nt.near,yt=nt.far;_.texture!==null&&(_.depthNear>0&&(ht=_.depthNear),_.depthFar>0&&(yt=_.depthFar)),x.near=D.near=T.near=ht,x.far=D.far=T.far=yt,(I!==x.near||F!==x.far)&&(r.updateRenderState({depthNear:x.near,depthFar:x.far}),I=x.near,F=x.far),T.layers.mask=nt.layers.mask|2,D.layers.mask=nt.layers.mask|4,x.layers.mask=T.layers.mask|D.layers.mask;const dt=nt.parent,Pt=x.cameras;ct(x,dt);for(let It=0;It<Pt.length;It++)ct(Pt[It],dt);Pt.length===2?H(x,T,D):x.projectionMatrix.copy(T.projectionMatrix),N(nt,x,dt)};function N(nt,ht,yt){yt===null?nt.matrix.copy(ht.matrixWorld):(nt.matrix.copy(yt.matrixWorld),nt.matrix.invert(),nt.matrix.multiply(ht.matrixWorld)),nt.matrix.decompose(nt.position,nt.quaternion,nt.scale),nt.updateMatrixWorld(!0),nt.projectionMatrix.copy(ht.projectionMatrix),nt.projectionMatrixInverse.copy(ht.projectionMatrixInverse),nt.isPerspectiveCamera&&(nt.fov=Uh*2*Math.atan(1/nt.projectionMatrix.elements[5]),nt.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(h===null&&d===null))return l},this.setFoveation=function(nt){l=nt,h!==null&&(h.fixedFoveation=nt),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=nt)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(x)};let vt=null;function Lt(nt,ht){if(u=ht.getViewerPose(c||o),g=ht,u!==null){const yt=u.views;d!==null&&(t.setRenderTargetFramebuffer(M,d.framebuffer),t.setRenderTarget(M));let dt=!1;yt.length!==x.cameras.length&&(x.cameras.length=0,dt=!0);for(let It=0;It<yt.length;It++){const kt=yt[It];let Zt=null;if(d!==null)Zt=d.getViewport(kt);else{const U=f.getViewSubImage(h,kt);Zt=U.viewport,It===0&&(t.setRenderTargetTextures(M,U.colorTexture,h.ignoreDepthValues?void 0:U.depthStencilTexture),t.setRenderTarget(M))}let P=S[It];P===void 0&&(P=new li,P.layers.enable(It),P.viewport=new He,S[It]=P),P.matrix.fromArray(kt.transform.matrix),P.matrix.decompose(P.position,P.quaternion,P.scale),P.projectionMatrix.fromArray(kt.projectionMatrix),P.projectionMatrixInverse.copy(P.projectionMatrix).invert(),P.viewport.set(Zt.x,Zt.y,Zt.width,Zt.height),It===0&&(x.matrix.copy(P.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),dt===!0&&x.cameras.push(P)}const Pt=r.enabledFeatures;if(Pt&&Pt.includes("depth-sensing")){const It=f.getDepthInformation(yt[0]);It&&It.isValid&&It.texture&&_.init(t,It,r.renderState)}}for(let yt=0;yt<b.length;yt++){const dt=v[yt],Pt=b[yt];dt!==null&&Pt!==void 0&&Pt.update(dt,ht,c||o)}vt&&vt(nt,ht),ht.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ht}),g=null}const qt=new sv;qt.setAnimationLoop(Lt),this.setAnimationLoop=function(nt){vt=nt},this.dispose=function(){}}}const xs=new ir,MA=new ze;function SA(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,nv(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,M,b,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),f(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p)):p.isMeshStandardMaterial?(s(m,p),h(m,p),p.isMeshPhysicalMaterial&&d(m,p,v)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),_(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,M,b):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Kn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Kn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const M=t.get(p),b=M.envMap,v=M.envMapRotation;b&&(m.envMap.value=b,xs.copy(v),xs.x*=-1,xs.y*=-1,xs.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(xs.y*=-1,xs.z*=-1),m.envMapRotation.value.setFromMatrix4(MA.makeRotationFromEuler(xs)),m.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,M,b){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*M,m.scale.value=b*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function f(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function h(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,M){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Kn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const M=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function bA(i,t,e,n){let r={},s={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,b){const v=b.program;n.uniformBlockBinding(M,v)}function c(M,b){let v=r[M.id];v===void 0&&(g(M),v=u(M),r[M.id]=v,M.addEventListener("dispose",m));const R=b.program;n.updateUBOMapping(M,R);const C=t.render.frame;s[M.id]!==C&&(h(M),s[M.id]=C)}function u(M){const b=f();M.__bindingPointIndex=b;const v=i.createBuffer(),R=M.__size,C=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,R,C),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,b,v),v}function f(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(M){const b=r[M.id],v=M.uniforms,R=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let C=0,T=v.length;C<T;C++){const D=Array.isArray(v[C])?v[C]:[v[C]];for(let S=0,x=D.length;S<x;S++){const I=D[S];if(d(I,C,S,R)===!0){const F=I.__offset,z=Array.isArray(I.value)?I.value:[I.value];let W=0;for(let tt=0;tt<z.length;tt++){const G=z[tt],K=_(G);typeof G=="number"||typeof G=="boolean"?(I.__data[0]=G,i.bufferSubData(i.UNIFORM_BUFFER,F+W,I.__data)):G.isMatrix3?(I.__data[0]=G.elements[0],I.__data[1]=G.elements[1],I.__data[2]=G.elements[2],I.__data[3]=0,I.__data[4]=G.elements[3],I.__data[5]=G.elements[4],I.__data[6]=G.elements[5],I.__data[7]=0,I.__data[8]=G.elements[6],I.__data[9]=G.elements[7],I.__data[10]=G.elements[8],I.__data[11]=0):(G.toArray(I.__data,W),W+=K.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,F,I.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(M,b,v,R){const C=M.value,T=b+"_"+v;if(R[T]===void 0)return typeof C=="number"||typeof C=="boolean"?R[T]=C:R[T]=C.clone(),!0;{const D=R[T];if(typeof C=="number"||typeof C=="boolean"){if(D!==C)return R[T]=C,!0}else if(D.equals(C)===!1)return D.copy(C),!0}return!1}function g(M){const b=M.uniforms;let v=0;const R=16;for(let T=0,D=b.length;T<D;T++){const S=Array.isArray(b[T])?b[T]:[b[T]];for(let x=0,I=S.length;x<I;x++){const F=S[x],z=Array.isArray(F.value)?F.value:[F.value];for(let W=0,tt=z.length;W<tt;W++){const G=z[W],K=_(G),H=v%R,ct=H%K.boundary,N=H+ct;v+=ct,N!==0&&R-N<K.storage&&(v+=R-N),F.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=v,v+=K.storage}}}const C=v%R;return C>0&&(v+=R-C),M.__size=v,M.__cache={},this}function _(M){const b={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(b.boundary=4,b.storage=4):M.isVector2?(b.boundary=8,b.storage=8):M.isVector3||M.isColor?(b.boundary=16,b.storage=12):M.isVector4?(b.boundary=16,b.storage=16):M.isMatrix3?(b.boundary=48,b.storage=48):M.isMatrix4?(b.boundary=64,b.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),b}function m(M){const b=M.target;b.removeEventListener("dispose",m);const v=o.indexOf(b.__bindingPointIndex);o.splice(v,1),i.deleteBuffer(r[b.id]),delete r[b.id],delete s[b.id]}function p(){for(const M in r)i.deleteBuffer(r[M]);o=[],r={},s={}}return{bind:l,update:c,dispose:p}}class hv{constructor(t={}){const{canvas:e=hb(),context:n=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reverseDepthBuffer:h=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const M=[],b=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=yi,this.toneMapping=es,this.toneMappingExposure=1;const v=this;let R=!1,C=0,T=0,D=null,S=-1,x=null;const I=new He,F=new He;let z=null;const W=new ae(0);let tt=0,G=e.width,K=e.height,H=1,ct=null,N=null;const vt=new He(0,0,G,K),Lt=new He(0,0,G,K);let qt=!1;const nt=new Fd;let ht=!1,yt=!1;const dt=new ze,Pt=new ze,It=new Z,kt=new He,Zt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let P=!1;function U(){return D===null?H:1}let A=n;function st(w,k){return e.getContext(w,k)}try{const w={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Cd}`),e.addEventListener("webglcontextlost",at,!1),e.addEventListener("webglcontextrestored",Mt,!1),e.addEventListener("webglcontextcreationerror",Et,!1),A===null){const k="webgl2";if(A=st(k,w),A===null)throw st(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let J,L,it,ot,Q,E,y,O,X,Y,$,ut,lt,mt,Ot,ft,et,bt,Ct,_t,Ht,Vt,ce,B;function St(){J=new R1(A),J.init(),Vt=new pA(A,J),L=new b1(A,J,t,Vt),it=new fA(A,J),L.reverseDepthBuffer&&h&&it.buffers.depth.setReversed(!0),ot=new L1(A),Q=new Kw,E=new dA(A,J,it,Q,L,Vt,ot),y=new T1(v),O=new C1(v),X=new zb(A),ce=new M1(A,X),Y=new P1(A,X,ot,ce),$=new U1(A,Y,X,ot),Ct=new I1(A,L,E),ft=new E1(Q),ut=new jw(v,y,O,J,L,ce,ft),lt=new SA(v,Q),mt=new Jw,Ot=new rA(J),bt=new y1(v,y,O,it,$,d,l),et=new cA(v,$,L),B=new bA(A,ot,L,it),_t=new S1(A,J,ot),Ht=new D1(A,J,ot),ot.programs=ut.programs,v.capabilities=L,v.extensions=J,v.properties=Q,v.renderLists=mt,v.shadowMap=et,v.state=it,v.info=ot}St();const rt=new yA(v,A);this.xr=rt,this.getContext=function(){return A},this.getContextAttributes=function(){return A.getContextAttributes()},this.forceContextLoss=function(){const w=J.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=J.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(w){w!==void 0&&(H=w,this.setSize(G,K,!1))},this.getSize=function(w){return w.set(G,K)},this.setSize=function(w,k,q=!0){if(rt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=w,K=k,e.width=Math.floor(w*H),e.height=Math.floor(k*H),q===!0&&(e.style.width=w+"px",e.style.height=k+"px"),this.setViewport(0,0,w,k)},this.getDrawingBufferSize=function(w){return w.set(G*H,K*H).floor()},this.setDrawingBufferSize=function(w,k,q){G=w,K=k,H=q,e.width=Math.floor(w*q),e.height=Math.floor(k*q),this.setViewport(0,0,w,k)},this.getCurrentViewport=function(w){return w.copy(I)},this.getViewport=function(w){return w.copy(vt)},this.setViewport=function(w,k,q,j){w.isVector4?vt.set(w.x,w.y,w.z,w.w):vt.set(w,k,q,j),it.viewport(I.copy(vt).multiplyScalar(H).round())},this.getScissor=function(w){return w.copy(Lt)},this.setScissor=function(w,k,q,j){w.isVector4?Lt.set(w.x,w.y,w.z,w.w):Lt.set(w,k,q,j),it.scissor(F.copy(Lt).multiplyScalar(H).round())},this.getScissorTest=function(){return qt},this.setScissorTest=function(w){it.setScissorTest(qt=w)},this.setOpaqueSort=function(w){ct=w},this.setTransparentSort=function(w){N=w},this.getClearColor=function(w){return w.copy(bt.getClearColor())},this.setClearColor=function(){bt.setClearColor.apply(bt,arguments)},this.getClearAlpha=function(){return bt.getClearAlpha()},this.setClearAlpha=function(){bt.setClearAlpha.apply(bt,arguments)},this.clear=function(w=!0,k=!0,q=!0){let j=0;if(w){let V=!1;if(D!==null){const gt=D.texture.format;V=gt===Nd||gt===Ud||gt===Id}if(V){const gt=D.texture.type,xt=gt===Cr||gt===Ws||gt===ol||gt===Zo||gt===Dd||gt===Ld,Tt=bt.getClearColor(),Dt=bt.getClearAlpha(),Wt=Tt.r,$t=Tt.g,Nt=Tt.b;xt?(g[0]=Wt,g[1]=$t,g[2]=Nt,g[3]=Dt,A.clearBufferuiv(A.COLOR,0,g)):(_[0]=Wt,_[1]=$t,_[2]=Nt,_[3]=Dt,A.clearBufferiv(A.COLOR,0,_))}else j|=A.COLOR_BUFFER_BIT}k&&(j|=A.DEPTH_BUFFER_BIT),q&&(j|=A.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),A.clear(j)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",at,!1),e.removeEventListener("webglcontextrestored",Mt,!1),e.removeEventListener("webglcontextcreationerror",Et,!1),mt.dispose(),Ot.dispose(),Q.dispose(),y.dispose(),O.dispose(),$.dispose(),ce.dispose(),B.dispose(),ut.dispose(),rt.dispose(),rt.removeEventListener("sessionstart",wt),rt.removeEventListener("sessionend",Yt),Bt.stop()};function at(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function Mt(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;const w=ot.autoReset,k=et.enabled,q=et.autoUpdate,j=et.needsUpdate,V=et.type;St(),ot.autoReset=w,et.enabled=k,et.autoUpdate=q,et.needsUpdate=j,et.type=V}function Et(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function Gt(w){const k=w.target;k.removeEventListener("dispose",Gt),he(k)}function he(w){ke(w),Q.remove(w)}function ke(w){const k=Q.get(w).programs;k!==void 0&&(k.forEach(function(q){ut.releaseProgram(q)}),w.isShaderMaterial&&ut.releaseShaderCache(w))}this.renderBufferDirect=function(w,k,q,j,V,gt){k===null&&(k=Zt);const xt=V.isMesh&&V.matrixWorld.determinant()<0,Tt=Qn(w,k,q,j,V);it.setMaterial(j,xt);let Dt=q.index,Wt=1;if(j.wireframe===!0){if(Dt=Y.getWireframeAttribute(q),Dt===void 0)return;Wt=2}const $t=q.drawRange,Nt=q.attributes.position;let jt=$t.start*Wt,de=($t.start+$t.count)*Wt;gt!==null&&(jt=Math.max(jt,gt.start*Wt),de=Math.min(de,(gt.start+gt.count)*Wt)),Dt!==null?(jt=Math.max(jt,0),de=Math.min(de,Dt.count)):Nt!=null&&(jt=Math.max(jt,0),de=Math.min(de,Nt.count));const me=de-jt;if(me<0||me===1/0)return;ce.setup(V,j,Tt,q,Dt);let Oe,_e=_t;if(Dt!==null&&(Oe=X.get(Dt),_e=Ht,_e.setIndex(Oe)),V.isMesh)j.wireframe===!0?(it.setLineWidth(j.wireframeLinewidth*U()),_e.setMode(A.LINES)):_e.setMode(A.TRIANGLES);else if(V.isLine){let zt=j.linewidth;zt===void 0&&(zt=1),it.setLineWidth(zt*U()),V.isLineSegments?_e.setMode(A.LINES):V.isLineLoop?_e.setMode(A.LINE_LOOP):_e.setMode(A.LINE_STRIP)}else V.isPoints?_e.setMode(A.POINTS):V.isSprite&&_e.setMode(A.TRIANGLES);if(V.isBatchedMesh)if(V._multiDrawInstances!==null)_e.renderMultiDrawInstances(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount,V._multiDrawInstances);else if(J.get("WEBGL_multi_draw"))_e.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{const zt=V._multiDrawStarts,sr=V._multiDrawCounts,ge=V._multiDrawCount,Pi=Dt?X.get(Dt).bytesPerElement:1,Ks=Q.get(j).currentProgram.getUniforms();for(let ti=0;ti<ge;ti++)Ks.setValue(A,"_gl_DrawID",ti),_e.render(zt[ti]/Pi,sr[ti])}else if(V.isInstancedMesh)_e.renderInstances(jt,me,V.count);else if(q.isInstancedBufferGeometry){const zt=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,sr=Math.min(q.instanceCount,zt);_e.renderInstances(jt,me,sr)}else _e.render(jt,me)};function Rt(w,k,q){w.transparent===!0&&w.side===bi&&w.forceSinglePass===!1?(w.side=Kn,w.needsUpdate=!0,Ee(w,k,q),w.side=as,w.needsUpdate=!0,Ee(w,k,q),w.side=bi):Ee(w,k,q)}this.compile=function(w,k,q=null){q===null&&(q=w),p=Ot.get(q),p.init(k),b.push(p),q.traverseVisible(function(V){V.isLight&&V.layers.test(k.layers)&&(p.pushLight(V),V.castShadow&&p.pushShadow(V))}),w!==q&&w.traverseVisible(function(V){V.isLight&&V.layers.test(k.layers)&&(p.pushLight(V),V.castShadow&&p.pushShadow(V))}),p.setupLights();const j=new Set;return w.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;const gt=V.material;if(gt)if(Array.isArray(gt))for(let xt=0;xt<gt.length;xt++){const Tt=gt[xt];Rt(Tt,q,V),j.add(Tt)}else Rt(gt,q,V),j.add(gt)}),b.pop(),p=null,j},this.compileAsync=function(w,k,q=null){const j=this.compile(w,k,q);return new Promise(V=>{function gt(){if(j.forEach(function(xt){Q.get(xt).currentProgram.isReady()&&j.delete(xt)}),j.size===0){V(w);return}setTimeout(gt,10)}J.get("KHR_parallel_shader_compile")!==null?gt():setTimeout(gt,10)})};let Ft=null;function Qt(w){Ft&&Ft(w)}function wt(){Bt.stop()}function Yt(){Bt.start()}const Bt=new sv;Bt.setAnimationLoop(Qt),typeof self<"u"&&Bt.setContext(self),this.setAnimationLoop=function(w){Ft=w,rt.setAnimationLoop(w),w===null?Bt.stop():Bt.start()},rt.addEventListener("sessionstart",wt),rt.addEventListener("sessionend",Yt),this.render=function(w,k){if(k!==void 0&&k.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),rt.enabled===!0&&rt.isPresenting===!0&&(rt.cameraAutoUpdate===!0&&rt.updateCamera(k),k=rt.getCamera()),w.isScene===!0&&w.onBeforeRender(v,w,k,D),p=Ot.get(w,b.length),p.init(k),b.push(p),Pt.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),nt.setFromProjectionMatrix(Pt),yt=this.localClippingEnabled,ht=ft.init(this.clippingPlanes,yt),m=mt.get(w,M.length),m.init(),M.push(m),rt.enabled===!0&&rt.isPresenting===!0){const gt=v.xr.getDepthSensingMesh();gt!==null&&Xt(gt,k,-1/0,v.sortObjects)}Xt(w,k,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(ct,N),P=rt.enabled===!1||rt.isPresenting===!1||rt.hasDepthSensing()===!1,P&&bt.addToRenderList(m,w),this.info.render.frame++,ht===!0&&ft.beginShadows();const q=p.state.shadowsArray;et.render(q,w,k),ht===!0&&ft.endShadows(),this.info.autoReset===!0&&this.info.reset();const j=m.opaque,V=m.transmissive;if(p.setupLights(),k.isArrayCamera){const gt=k.cameras;if(V.length>0)for(let xt=0,Tt=gt.length;xt<Tt;xt++){const Dt=gt[xt];re(j,V,w,Dt)}P&&bt.render(w);for(let xt=0,Tt=gt.length;xt<Tt;xt++){const Dt=gt[xt];Ge(m,w,Dt,Dt.viewport)}}else V.length>0&&re(j,V,w,k),P&&bt.render(w),Ge(m,w,k);D!==null&&(E.updateMultisampleRenderTarget(D),E.updateRenderTargetMipmap(D)),w.isScene===!0&&w.onAfterRender(v,w,k),ce.resetDefaultState(),S=-1,x=null,b.pop(),b.length>0?(p=b[b.length-1],ht===!0&&ft.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,M.pop(),M.length>0?m=M[M.length-1]:m=null};function Xt(w,k,q,j){if(w.visible===!1)return;if(w.layers.test(k.layers)){if(w.isGroup)q=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(k);else if(w.isLight)p.pushLight(w),w.castShadow&&p.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||nt.intersectsSprite(w)){j&&kt.setFromMatrixPosition(w.matrixWorld).applyMatrix4(Pt);const xt=$.update(w),Tt=w.material;Tt.visible&&m.push(w,xt,Tt,q,kt.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||nt.intersectsObject(w))){const xt=$.update(w),Tt=w.material;if(j&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),kt.copy(w.boundingSphere.center)):(xt.boundingSphere===null&&xt.computeBoundingSphere(),kt.copy(xt.boundingSphere.center)),kt.applyMatrix4(w.matrixWorld).applyMatrix4(Pt)),Array.isArray(Tt)){const Dt=xt.groups;for(let Wt=0,$t=Dt.length;Wt<$t;Wt++){const Nt=Dt[Wt],jt=Tt[Nt.materialIndex];jt&&jt.visible&&m.push(w,xt,jt,q,kt.z,Nt)}}else Tt.visible&&m.push(w,xt,Tt,q,kt.z,null)}}const gt=w.children;for(let xt=0,Tt=gt.length;xt<Tt;xt++)Xt(gt[xt],k,q,j)}function Ge(w,k,q,j){const V=w.opaque,gt=w.transmissive,xt=w.transparent;p.setupLightsView(q),ht===!0&&ft.setGlobalState(v.clippingPlanes,q),j&&it.viewport(I.copy(j)),V.length>0&&Ce(V,k,q),gt.length>0&&Ce(gt,k,q),xt.length>0&&Ce(xt,k,q),it.buffers.depth.setTest(!0),it.buffers.depth.setMask(!0),it.buffers.color.setMask(!0),it.setPolygonOffset(!1)}function re(w,k,q,j){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[j.id]===void 0&&(p.state.transmissionRenderTarget[j.id]=new Xs(1,1,{generateMipmaps:!0,type:J.has("EXT_color_buffer_half_float")||J.has("EXT_color_buffer_float")?fl:Cr,minFilter:Ps,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:fe.workingColorSpace}));const gt=p.state.transmissionRenderTarget[j.id],xt=j.viewport||I;gt.setSize(xt.z,xt.w);const Tt=v.getRenderTarget();v.setRenderTarget(gt),v.getClearColor(W),tt=v.getClearAlpha(),tt<1&&v.setClearColor(16777215,.5),v.clear(),P&&bt.render(q);const Dt=v.toneMapping;v.toneMapping=es;const Wt=j.viewport;if(j.viewport!==void 0&&(j.viewport=void 0),p.setupLightsView(j),ht===!0&&ft.setGlobalState(v.clippingPlanes,j),Ce(w,q,j),E.updateMultisampleRenderTarget(gt),E.updateRenderTargetMipmap(gt),J.has("WEBGL_multisampled_render_to_texture")===!1){let $t=!1;for(let Nt=0,jt=k.length;Nt<jt;Nt++){const de=k[Nt],me=de.object,Oe=de.geometry,_e=de.material,zt=de.group;if(_e.side===bi&&me.layers.test(j.layers)){const sr=_e.side;_e.side=Kn,_e.needsUpdate=!0,Ze(me,q,j,Oe,_e,zt),_e.side=sr,_e.needsUpdate=!0,$t=!0}}$t===!0&&(E.updateMultisampleRenderTarget(gt),E.updateRenderTargetMipmap(gt))}v.setRenderTarget(Tt),v.setClearColor(W,tt),Wt!==void 0&&(j.viewport=Wt),v.toneMapping=Dt}function Ce(w,k,q){const j=k.isScene===!0?k.overrideMaterial:null;for(let V=0,gt=w.length;V<gt;V++){const xt=w[V],Tt=xt.object,Dt=xt.geometry,Wt=j===null?xt.material:j,$t=xt.group;Tt.layers.test(q.layers)&&Ze(Tt,k,q,Dt,Wt,$t)}}function Ze(w,k,q,j,V,gt){w.onBeforeRender(v,k,q,j,V,gt),w.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),V.onBeforeRender(v,k,q,j,w,gt),V.transparent===!0&&V.side===bi&&V.forceSinglePass===!1?(V.side=Kn,V.needsUpdate=!0,v.renderBufferDirect(q,k,j,V,w,gt),V.side=as,V.needsUpdate=!0,v.renderBufferDirect(q,k,j,V,w,gt),V.side=bi):v.renderBufferDirect(q,k,j,V,w,gt),w.onAfterRender(v,k,q,j,V,gt)}function Ee(w,k,q){k.isScene!==!0&&(k=Zt);const j=Q.get(w),V=p.state.lights,gt=p.state.shadowsArray,xt=V.state.version,Tt=ut.getParameters(w,V.state,gt,k,q),Dt=ut.getProgramCacheKey(Tt);let Wt=j.programs;j.environment=w.isMeshStandardMaterial?k.environment:null,j.fog=k.fog,j.envMap=(w.isMeshStandardMaterial?O:y).get(w.envMap||j.environment),j.envMapRotation=j.environment!==null&&w.envMap===null?k.environmentRotation:w.envMapRotation,Wt===void 0&&(w.addEventListener("dispose",Gt),Wt=new Map,j.programs=Wt);let $t=Wt.get(Dt);if($t!==void 0){if(j.currentProgram===$t&&j.lightsStateVersion===xt)return pe(w,Tt),$t}else Tt.uniforms=ut.getUniforms(w),w.onBeforeCompile(Tt,v),$t=ut.acquireProgram(Tt,Dt),Wt.set(Dt,$t),j.uniforms=Tt.uniforms;const Nt=j.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Nt.clippingPlanes=ft.uniform),pe(w,Tt),j.needsLights=An(w),j.lightsStateVersion=xt,j.needsLights&&(Nt.ambientLightColor.value=V.state.ambient,Nt.lightProbe.value=V.state.probe,Nt.directionalLights.value=V.state.directional,Nt.directionalLightShadows.value=V.state.directionalShadow,Nt.spotLights.value=V.state.spot,Nt.spotLightShadows.value=V.state.spotShadow,Nt.rectAreaLights.value=V.state.rectArea,Nt.ltc_1.value=V.state.rectAreaLTC1,Nt.ltc_2.value=V.state.rectAreaLTC2,Nt.pointLights.value=V.state.point,Nt.pointLightShadows.value=V.state.pointShadow,Nt.hemisphereLights.value=V.state.hemi,Nt.directionalShadowMap.value=V.state.directionalShadowMap,Nt.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Nt.spotShadowMap.value=V.state.spotShadowMap,Nt.spotLightMatrix.value=V.state.spotLightMatrix,Nt.spotLightMap.value=V.state.spotLightMap,Nt.pointShadowMap.value=V.state.pointShadowMap,Nt.pointShadowMatrix.value=V.state.pointShadowMatrix),j.currentProgram=$t,j.uniformsList=null,$t}function Te(w){if(w.uniformsList===null){const k=w.currentProgram.getUniforms();w.uniformsList=Mc.seqWithValue(k.seq,w.uniforms)}return w.uniformsList}function pe(w,k){const q=Q.get(w);q.outputColorSpace=k.outputColorSpace,q.batching=k.batching,q.batchingColor=k.batchingColor,q.instancing=k.instancing,q.instancingColor=k.instancingColor,q.instancingMorph=k.instancingMorph,q.skinning=k.skinning,q.morphTargets=k.morphTargets,q.morphNormals=k.morphNormals,q.morphColors=k.morphColors,q.morphTargetsCount=k.morphTargetsCount,q.numClippingPlanes=k.numClippingPlanes,q.numIntersection=k.numClipIntersection,q.vertexAlphas=k.vertexAlphas,q.vertexTangents=k.vertexTangents,q.toneMapping=k.toneMapping}function Qn(w,k,q,j,V){k.isScene!==!0&&(k=Zt),E.resetTextureUnits();const gt=k.fog,xt=j.isMeshStandardMaterial?k.environment:null,Tt=D===null?v.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:ea,Dt=(j.isMeshStandardMaterial?O:y).get(j.envMap||xt),Wt=j.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,$t=!!q.attributes.tangent&&(!!j.normalMap||j.anisotropy>0),Nt=!!q.morphAttributes.position,jt=!!q.morphAttributes.normal,de=!!q.morphAttributes.color;let me=es;j.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(me=v.toneMapping);const Oe=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,_e=Oe!==void 0?Oe.length:0,zt=Q.get(j),sr=p.state.lights;if(ht===!0&&(yt===!0||w!==x)){const gi=w===x&&j.id===S;ft.setState(j,w,gi)}let ge=!1;j.version===zt.__version?(zt.needsLights&&zt.lightsStateVersion!==sr.state.version||zt.outputColorSpace!==Tt||V.isBatchedMesh&&zt.batching===!1||!V.isBatchedMesh&&zt.batching===!0||V.isBatchedMesh&&zt.batchingColor===!0&&V.colorTexture===null||V.isBatchedMesh&&zt.batchingColor===!1&&V.colorTexture!==null||V.isInstancedMesh&&zt.instancing===!1||!V.isInstancedMesh&&zt.instancing===!0||V.isSkinnedMesh&&zt.skinning===!1||!V.isSkinnedMesh&&zt.skinning===!0||V.isInstancedMesh&&zt.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&zt.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&zt.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&zt.instancingMorph===!1&&V.morphTexture!==null||zt.envMap!==Dt||j.fog===!0&&zt.fog!==gt||zt.numClippingPlanes!==void 0&&(zt.numClippingPlanes!==ft.numPlanes||zt.numIntersection!==ft.numIntersection)||zt.vertexAlphas!==Wt||zt.vertexTangents!==$t||zt.morphTargets!==Nt||zt.morphNormals!==jt||zt.morphColors!==de||zt.toneMapping!==me||zt.morphTargetsCount!==_e)&&(ge=!0):(ge=!0,zt.__version=j.version);let Pi=zt.currentProgram;ge===!0&&(Pi=Ee(j,k,V));let Ks=!1,ti=!1,ra=!1;const Ie=Pi.getUniforms(),Hi=zt.uniforms;if(it.useProgram(Pi.program)&&(Ks=!0,ti=!0,ra=!0),j.id!==S&&(S=j.id,ti=!0),Ks||x!==w){it.buffers.depth.getReversed()?(dt.copy(w.projectionMatrix),pb(dt),mb(dt),Ie.setValue(A,"projectionMatrix",dt)):Ie.setValue(A,"projectionMatrix",w.projectionMatrix),Ie.setValue(A,"viewMatrix",w.matrixWorldInverse);const Pr=Ie.map.cameraPosition;Pr!==void 0&&Pr.setValue(A,It.setFromMatrixPosition(w.matrixWorld)),L.logarithmicDepthBuffer&&Ie.setValue(A,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(j.isMeshPhongMaterial||j.isMeshToonMaterial||j.isMeshLambertMaterial||j.isMeshBasicMaterial||j.isMeshStandardMaterial||j.isShaderMaterial)&&Ie.setValue(A,"isOrthographic",w.isOrthographicCamera===!0),x!==w&&(x=w,ti=!0,ra=!0)}if(V.isSkinnedMesh){Ie.setOptional(A,V,"bindMatrix"),Ie.setOptional(A,V,"bindMatrixInverse");const gi=V.skeleton;gi&&(gi.boneTexture===null&&gi.computeBoneTexture(),Ie.setValue(A,"boneTexture",gi.boneTexture,E))}V.isBatchedMesh&&(Ie.setOptional(A,V,"batchingTexture"),Ie.setValue(A,"batchingTexture",V._matricesTexture,E),Ie.setOptional(A,V,"batchingIdTexture"),Ie.setValue(A,"batchingIdTexture",V._indirectTexture,E),Ie.setOptional(A,V,"batchingColorTexture"),V._colorsTexture!==null&&Ie.setValue(A,"batchingColorTexture",V._colorsTexture,E));const sa=q.morphAttributes;if((sa.position!==void 0||sa.normal!==void 0||sa.color!==void 0)&&Ct.update(V,q,Pi),(ti||zt.receiveShadow!==V.receiveShadow)&&(zt.receiveShadow=V.receiveShadow,Ie.setValue(A,"receiveShadow",V.receiveShadow)),j.isMeshGouraudMaterial&&j.envMap!==null&&(Hi.envMap.value=Dt,Hi.flipEnvMap.value=Dt.isCubeTexture&&Dt.isRenderTargetTexture===!1?-1:1),j.isMeshStandardMaterial&&j.envMap===null&&k.environment!==null&&(Hi.envMapIntensity.value=k.environmentIntensity),ti&&(Ie.setValue(A,"toneMappingExposure",v.toneMappingExposure),zt.needsLights&&Le(Hi,ra),gt&&j.fog===!0&&lt.refreshFogUniforms(Hi,gt),lt.refreshMaterialUniforms(Hi,j,H,K,p.state.transmissionRenderTarget[w.id]),Mc.upload(A,Te(zt),Hi,E)),j.isShaderMaterial&&j.uniformsNeedUpdate===!0&&(Mc.upload(A,Te(zt),Hi,E),j.uniformsNeedUpdate=!1),j.isSpriteMaterial&&Ie.setValue(A,"center",V.center),Ie.setValue(A,"modelViewMatrix",V.modelViewMatrix),Ie.setValue(A,"normalMatrix",V.normalMatrix),Ie.setValue(A,"modelMatrix",V.matrixWorld),j.isShaderMaterial||j.isRawShaderMaterial){const gi=j.uniformsGroups;for(let Pr=0,Dr=gi.length;Pr<Dr;Pr++){const Gd=gi[Pr];B.update(Gd,Pi),B.bind(Gd,Pi)}}return Pi}function Le(w,k){w.ambientLightColor.needsUpdate=k,w.lightProbe.needsUpdate=k,w.directionalLights.needsUpdate=k,w.directionalLightShadows.needsUpdate=k,w.pointLights.needsUpdate=k,w.pointLightShadows.needsUpdate=k,w.spotLights.needsUpdate=k,w.spotLightShadows.needsUpdate=k,w.rectAreaLights.needsUpdate=k,w.hemisphereLights.needsUpdate=k}function An(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(w,k,q){Q.get(w.texture).__webglTexture=k,Q.get(w.depthTexture).__webglTexture=q;const j=Q.get(w);j.__hasExternalTextures=!0,j.__autoAllocateDepthBuffer=q===void 0,j.__autoAllocateDepthBuffer||J.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),j.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,k){const q=Q.get(w);q.__webglFramebuffer=k,q.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(w,k=0,q=0){D=w,C=k,T=q;let j=!0,V=null,gt=!1,xt=!1;if(w){const Dt=Q.get(w);if(Dt.__useDefaultFramebuffer!==void 0)it.bindFramebuffer(A.FRAMEBUFFER,null),j=!1;else if(Dt.__webglFramebuffer===void 0)E.setupRenderTarget(w);else if(Dt.__hasExternalTextures)E.rebindTextures(w,Q.get(w.texture).__webglTexture,Q.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const Nt=w.depthTexture;if(Dt.__boundDepthTexture!==Nt){if(Nt!==null&&Q.has(Nt)&&(w.width!==Nt.image.width||w.height!==Nt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");E.setupDepthRenderbuffer(w)}}const Wt=w.texture;(Wt.isData3DTexture||Wt.isDataArrayTexture||Wt.isCompressedArrayTexture)&&(xt=!0);const $t=Q.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray($t[k])?V=$t[k][q]:V=$t[k],gt=!0):w.samples>0&&E.useMultisampledRTT(w)===!1?V=Q.get(w).__webglMultisampledFramebuffer:Array.isArray($t)?V=$t[q]:V=$t,I.copy(w.viewport),F.copy(w.scissor),z=w.scissorTest}else I.copy(vt).multiplyScalar(H).floor(),F.copy(Lt).multiplyScalar(H).floor(),z=qt;if(it.bindFramebuffer(A.FRAMEBUFFER,V)&&j&&it.drawBuffers(w,V),it.viewport(I),it.scissor(F),it.setScissorTest(z),gt){const Dt=Q.get(w.texture);A.framebufferTexture2D(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0,A.TEXTURE_CUBE_MAP_POSITIVE_X+k,Dt.__webglTexture,q)}else if(xt){const Dt=Q.get(w.texture),Wt=k||0;A.framebufferTextureLayer(A.FRAMEBUFFER,A.COLOR_ATTACHMENT0,Dt.__webglTexture,q||0,Wt)}S=-1},this.readRenderTargetPixels=function(w,k,q,j,V,gt,xt){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Tt=Q.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&xt!==void 0&&(Tt=Tt[xt]),Tt){it.bindFramebuffer(A.FRAMEBUFFER,Tt);try{const Dt=w.texture,Wt=Dt.format,$t=Dt.type;if(!L.textureFormatReadable(Wt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!L.textureTypeReadable($t)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=w.width-j&&q>=0&&q<=w.height-V&&A.readPixels(k,q,j,V,Vt.convert(Wt),Vt.convert($t),gt)}finally{const Dt=D!==null?Q.get(D).__webglFramebuffer:null;it.bindFramebuffer(A.FRAMEBUFFER,Dt)}}},this.readRenderTargetPixelsAsync=async function(w,k,q,j,V,gt,xt){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Tt=Q.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&xt!==void 0&&(Tt=Tt[xt]),Tt){const Dt=w.texture,Wt=Dt.format,$t=Dt.type;if(!L.textureFormatReadable(Wt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!L.textureTypeReadable($t))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(k>=0&&k<=w.width-j&&q>=0&&q<=w.height-V){it.bindFramebuffer(A.FRAMEBUFFER,Tt);const Nt=A.createBuffer();A.bindBuffer(A.PIXEL_PACK_BUFFER,Nt),A.bufferData(A.PIXEL_PACK_BUFFER,gt.byteLength,A.STREAM_READ),A.readPixels(k,q,j,V,Vt.convert(Wt),Vt.convert($t),0);const jt=D!==null?Q.get(D).__webglFramebuffer:null;it.bindFramebuffer(A.FRAMEBUFFER,jt);const de=A.fenceSync(A.SYNC_GPU_COMMANDS_COMPLETE,0);return A.flush(),await db(A,de,4),A.bindBuffer(A.PIXEL_PACK_BUFFER,Nt),A.getBufferSubData(A.PIXEL_PACK_BUFFER,0,gt),A.deleteBuffer(Nt),A.deleteSync(de),gt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(w,k=null,q=0){w.isTexture!==!0&&(Ea("WebGLRenderer: copyFramebufferToTexture function signature has changed."),k=arguments[0]||null,w=arguments[1]);const j=Math.pow(2,-q),V=Math.floor(w.image.width*j),gt=Math.floor(w.image.height*j),xt=k!==null?k.x:0,Tt=k!==null?k.y:0;E.setTexture2D(w,0),A.copyTexSubImage2D(A.TEXTURE_2D,q,0,0,xt,Tt,V,gt),it.unbindTexture()},this.copyTextureToTexture=function(w,k,q=null,j=null,V=0){w.isTexture!==!0&&(Ea("WebGLRenderer: copyTextureToTexture function signature has changed."),j=arguments[0]||null,w=arguments[1],k=arguments[2],V=arguments[3]||0,q=null);let gt,xt,Tt,Dt,Wt,$t,Nt,jt,de;const me=w.isCompressedTexture?w.mipmaps[V]:w.image;q!==null?(gt=q.max.x-q.min.x,xt=q.max.y-q.min.y,Tt=q.isBox3?q.max.z-q.min.z:1,Dt=q.min.x,Wt=q.min.y,$t=q.isBox3?q.min.z:0):(gt=me.width,xt=me.height,Tt=me.depth||1,Dt=0,Wt=0,$t=0),j!==null?(Nt=j.x,jt=j.y,de=j.z):(Nt=0,jt=0,de=0);const Oe=Vt.convert(k.format),_e=Vt.convert(k.type);let zt;k.isData3DTexture?(E.setTexture3D(k,0),zt=A.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(E.setTexture2DArray(k,0),zt=A.TEXTURE_2D_ARRAY):(E.setTexture2D(k,0),zt=A.TEXTURE_2D),A.pixelStorei(A.UNPACK_FLIP_Y_WEBGL,k.flipY),A.pixelStorei(A.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),A.pixelStorei(A.UNPACK_ALIGNMENT,k.unpackAlignment);const sr=A.getParameter(A.UNPACK_ROW_LENGTH),ge=A.getParameter(A.UNPACK_IMAGE_HEIGHT),Pi=A.getParameter(A.UNPACK_SKIP_PIXELS),Ks=A.getParameter(A.UNPACK_SKIP_ROWS),ti=A.getParameter(A.UNPACK_SKIP_IMAGES);A.pixelStorei(A.UNPACK_ROW_LENGTH,me.width),A.pixelStorei(A.UNPACK_IMAGE_HEIGHT,me.height),A.pixelStorei(A.UNPACK_SKIP_PIXELS,Dt),A.pixelStorei(A.UNPACK_SKIP_ROWS,Wt),A.pixelStorei(A.UNPACK_SKIP_IMAGES,$t);const ra=w.isDataArrayTexture||w.isData3DTexture,Ie=k.isDataArrayTexture||k.isData3DTexture;if(w.isRenderTargetTexture||w.isDepthTexture){const Hi=Q.get(w),sa=Q.get(k),gi=Q.get(Hi.__renderTarget),Pr=Q.get(sa.__renderTarget);it.bindFramebuffer(A.READ_FRAMEBUFFER,gi.__webglFramebuffer),it.bindFramebuffer(A.DRAW_FRAMEBUFFER,Pr.__webglFramebuffer);for(let Dr=0;Dr<Tt;Dr++)ra&&A.framebufferTextureLayer(A.READ_FRAMEBUFFER,A.COLOR_ATTACHMENT0,Q.get(w).__webglTexture,V,$t+Dr),w.isDepthTexture?(Ie&&A.framebufferTextureLayer(A.DRAW_FRAMEBUFFER,A.COLOR_ATTACHMENT0,Q.get(k).__webglTexture,V,de+Dr),A.blitFramebuffer(Dt,Wt,gt,xt,Nt,jt,gt,xt,A.DEPTH_BUFFER_BIT,A.NEAREST)):Ie?A.copyTexSubImage3D(zt,V,Nt,jt,de+Dr,Dt,Wt,gt,xt):A.copyTexSubImage2D(zt,V,Nt,jt,de+Dr,Dt,Wt,gt,xt);it.bindFramebuffer(A.READ_FRAMEBUFFER,null),it.bindFramebuffer(A.DRAW_FRAMEBUFFER,null)}else Ie?w.isDataTexture||w.isData3DTexture?A.texSubImage3D(zt,V,Nt,jt,de,gt,xt,Tt,Oe,_e,me.data):k.isCompressedArrayTexture?A.compressedTexSubImage3D(zt,V,Nt,jt,de,gt,xt,Tt,Oe,me.data):A.texSubImage3D(zt,V,Nt,jt,de,gt,xt,Tt,Oe,_e,me):w.isDataTexture?A.texSubImage2D(A.TEXTURE_2D,V,Nt,jt,gt,xt,Oe,_e,me.data):w.isCompressedTexture?A.compressedTexSubImage2D(A.TEXTURE_2D,V,Nt,jt,me.width,me.height,Oe,me.data):A.texSubImage2D(A.TEXTURE_2D,V,Nt,jt,gt,xt,Oe,_e,me);A.pixelStorei(A.UNPACK_ROW_LENGTH,sr),A.pixelStorei(A.UNPACK_IMAGE_HEIGHT,ge),A.pixelStorei(A.UNPACK_SKIP_PIXELS,Pi),A.pixelStorei(A.UNPACK_SKIP_ROWS,Ks),A.pixelStorei(A.UNPACK_SKIP_IMAGES,ti),V===0&&k.generateMipmaps&&A.generateMipmap(zt),it.unbindTexture()},this.copyTextureToTexture3D=function(w,k,q=null,j=null,V=0){return w.isTexture!==!0&&(Ea("WebGLRenderer: copyTextureToTexture3D function signature has changed."),q=arguments[0]||null,j=arguments[1]||null,w=arguments[2],k=arguments[3],V=arguments[4]||0),Ea('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(w,k,q,j,V)},this.initRenderTarget=function(w){Q.get(w).__webglFramebuffer===void 0&&E.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?E.setTextureCube(w,0):w.isData3DTexture?E.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?E.setTexture2DArray(w,0):E.setTexture2D(w,0),it.unbindTexture()},this.resetState=function(){C=0,T=0,D=null,it.reset(),ce.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Mr}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=fe._getDrawingBufferColorSpace(t),e.unpackColorSpace=fe._getUnpackColorSpace()}}class dv extends un{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ir,this.environmentIntensity=1,this.environmentRotation=new ir,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class EA extends na{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new ae(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Km=new ze,Oh=new Od,Jl=new lu,Ql=new Z;class Zm extends un{constructor(t=new Ri,e=new EA){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,r=this.matrixWorld,s=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Jl.copy(n.boundingSphere),Jl.applyMatrix4(r),Jl.radius+=s,t.ray.intersectsSphere(Jl)===!1)return;Km.copy(r).invert(),Oh.copy(t.ray).applyMatrix4(Km);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,f=n.attributes.position;if(c!==null){const h=Math.max(0,o.start),d=Math.min(c.count,o.start+o.count);for(let g=h,_=d;g<_;g++){const m=c.getX(g);Ql.fromBufferAttribute(f,m),Jm(Ql,m,l,r,t,e,this)}}else{const h=Math.max(0,o.start),d=Math.min(f.count,o.start+o.count);for(let g=h,_=d;g<_;g++)Ql.fromBufferAttribute(f,g),Jm(Ql,g,l,r,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Jm(i,t,e,n,r,s,o){const a=Oh.distanceSqToPoint(i);if(a<e){const l=new Z;Oh.closestPointToPoint(i,l),l.applyMatrix4(n);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class Ni extends Ri{constructor(t=1,e=1,n=1,r=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],f=[],h=[],d=[];let g=0;const _=[],m=n/2;let p=0;M(),o===!1&&(t>0&&b(!0),e>0&&b(!1)),this.setIndex(u),this.setAttribute("position",new pi(f,3)),this.setAttribute("normal",new pi(h,3)),this.setAttribute("uv",new pi(d,2));function M(){const v=new Z,R=new Z;let C=0;const T=(e-t)/n;for(let D=0;D<=s;D++){const S=[],x=D/s,I=x*(e-t)+t;for(let F=0;F<=r;F++){const z=F/r,W=z*l+a,tt=Math.sin(W),G=Math.cos(W);R.x=I*tt,R.y=-x*n+m,R.z=I*G,f.push(R.x,R.y,R.z),v.set(tt,T,G).normalize(),h.push(v.x,v.y,v.z),d.push(z,1-x),S.push(g++)}_.push(S)}for(let D=0;D<r;D++)for(let S=0;S<s;S++){const x=_[S][D],I=_[S+1][D],F=_[S+1][D+1],z=_[S][D+1];(t>0||S!==0)&&(u.push(x,I,z),C+=3),(e>0||S!==s-1)&&(u.push(I,F,z),C+=3)}c.addGroup(p,C,0),p+=C}function b(v){const R=g,C=new Jt,T=new Z;let D=0;const S=v===!0?t:e,x=v===!0?1:-1;for(let F=1;F<=r;F++)f.push(0,m*x,0),h.push(0,x,0),d.push(.5,.5),g++;const I=g;for(let F=0;F<=r;F++){const W=F/r*l+a,tt=Math.cos(W),G=Math.sin(W);T.x=S*G,T.y=m*x,T.z=S*tt,f.push(T.x,T.y,T.z),h.push(0,x,0),C.x=tt*.5+.5,C.y=G*.5*x+.5,d.push(C.x,C.y),g++}for(let F=0;F<r;F++){const z=R+F,W=I+F;v===!0?u.push(W,W+1,z):u.push(W+1,W,z),D+=3}c.addGroup(p,D,v===!0?1:2),p+=D}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ni(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class zd extends Ni{constructor(t=1,e=1,n=32,r=1,s=!1,o=0,a=Math.PI*2){super(0,t,e,n,r,s,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(t){return new zd(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class kd extends Ri{constructor(t=1,e=32,n=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const u=[],f=new Z,h=new Z,d=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){const M=[],b=p/n;let v=0;p===0&&o===0?v=.5/e:p===n&&l===Math.PI&&(v=-.5/e);for(let R=0;R<=e;R++){const C=R/e;f.x=-t*Math.cos(r+C*s)*Math.sin(o+b*a),f.y=t*Math.cos(o+b*a),f.z=t*Math.sin(r+C*s)*Math.sin(o+b*a),g.push(f.x,f.y,f.z),h.copy(f).normalize(),_.push(h.x,h.y,h.z),m.push(C+v,1-b),M.push(c++)}u.push(M)}for(let p=0;p<n;p++)for(let M=0;M<e;M++){const b=u[p][M+1],v=u[p][M],R=u[p+1][M],C=u[p+1][M+1];(p!==0||o>0)&&d.push(b,v,C),(p!==n-1||l<Math.PI)&&d.push(v,R,C)}this.setIndex(d),this.setAttribute("position",new pi(g,3)),this.setAttribute("normal",new pi(_,3)),this.setAttribute("uv",new pi(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new kd(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class hr extends na{static get type(){return"MeshPhongMaterial"}constructor(t){super(),this.isMeshPhongMaterial=!0,this.color=new ae(16777215),this.specular=new ae(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ae(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Y0,this.normalScale=new Jt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ir,this.combine=Rd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Hd extends un{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new ae(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class TA extends Hd{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(un.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ae(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const ff=new ze,Qm=new Z,t_=new Z;class wA{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Jt(512,512),this.map=null,this.mapPass=null,this.matrix=new ze,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Fd,this._frameExtents=new Jt(1,1),this._viewportCount=1,this._viewports=[new He(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Qm.setFromMatrixPosition(t.matrixWorld),e.position.copy(Qm),t_.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(t_),e.updateMatrixWorld(),ff.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ff),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ff)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class AA extends wA{constructor(){super(new ov(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class e_ extends Hd{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(un.DEFAULT_UP),this.updateMatrix(),this.target=new un,this.shadow=new AA}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class CA extends Hd{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class RA{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=n_(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=n_();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function n_(){return performance.now()}class i_{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(On(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class PA extends js{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Cd}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Cd);const r_={type:"change"},Vd={type:"start"},pv={type:"end"},tc=new Od,s_=new Hr,DA=Math.cos(70*fb.DEG2RAD),Je=new Z,Vn=2*Math.PI,be={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},hf=1e-6;class LA extends PA{constructor(t,e=null){super(t,e),this.state=be.NONE,this.enabled=!0,this.target=new Z,this.cursor=new Z,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:No.ROTATE,MIDDLE:No.DOLLY,RIGHT:No.PAN},this.touches={ONE:So.ROTATE,TWO:So.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new Z,this._lastQuaternion=new Ys,this._lastTargetPosition=new Z,this._quat=new Ys().setFromUnitVectors(t.up,new Z(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new i_,this._sphericalDelta=new i_,this._scale=1,this._panOffset=new Z,this._rotateStart=new Jt,this._rotateEnd=new Jt,this._rotateDelta=new Jt,this._panStart=new Jt,this._panEnd=new Jt,this._panDelta=new Jt,this._dollyStart=new Jt,this._dollyEnd=new Jt,this._dollyDelta=new Jt,this._dollyDirection=new Z,this._mouse=new Jt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=UA.bind(this),this._onPointerDown=IA.bind(this),this._onPointerUp=NA.bind(this),this._onContextMenu=VA.bind(this),this._onMouseWheel=BA.bind(this),this._onKeyDown=zA.bind(this),this._onTouchStart=kA.bind(this),this._onTouchMove=HA.bind(this),this._onMouseDown=OA.bind(this),this._onMouseMove=FA.bind(this),this._interceptControlDown=GA.bind(this),this._interceptControlUp=WA.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(r_),this.update(),this.state=be.NONE}update(t=null){const e=this.object.position;Je.copy(e).sub(this.target),Je.applyQuaternion(this._quat),this._spherical.setFromVector3(Je),this.autoRotate&&this.state===be.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(n)&&isFinite(r)&&(n<-Math.PI?n+=Vn:n>Math.PI&&(n-=Vn),r<-Math.PI?r+=Vn:r>Math.PI&&(r-=Vn),n<=r?this._spherical.theta=Math.max(n,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+r)/2?Math.max(n,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=o!=this._spherical.radius}if(Je.setFromSpherical(this._spherical),Je.applyQuaternion(this._quatInverse),e.copy(this.target).add(Je),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Je.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){const a=new Z(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;const c=new Z(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Je.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(tc.origin.copy(this.object.position),tc.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(tc.direction))<DA?this.object.lookAt(this.target):(s_.setFromNormalAndCoplanarPoint(this.object.up,this.target),tc.intersectPlane(s_,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>hf||8*(1-this._lastQuaternion.dot(this.object.quaternion))>hf||this._lastTargetPosition.distanceToSquared(this.target)>hf?(this.dispatchEvent(r_),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Vn/60*this.autoRotateSpeed*t:Vn/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Je.setFromMatrixColumn(e,0),Je.multiplyScalar(-t),this._panOffset.add(Je)}_panUp(t,e){this.screenSpacePanning===!0?Je.setFromMatrixColumn(e,1):(Je.setFromMatrixColumn(e,0),Je.crossVectors(this.object.up,Je)),Je.multiplyScalar(t),this._panOffset.add(Je)}_pan(t,e){const n=this.domElement;if(this.object.isPerspectiveCamera){const r=this.object.position;Je.copy(r).sub(this.target);let s=Je.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*s/n.clientHeight,this.object.matrix),this._panUp(2*e*s/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),r=t-n.left,s=e-n.top,o=n.width,a=n.height;this._mouse.x=r/o*2-1,this._mouse.y=-(s/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Vn*this._rotateDelta.x/e.clientHeight),this._rotateUp(Vn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(Vn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-Vn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(Vn*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-Vn*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),r=.5*(t.pageY+e.y);this._rotateStart.set(n,r)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),r=.5*(t.pageY+e.y);this._panStart.set(n,r)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,r=t.pageY-e.y,s=Math.sqrt(n*n+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),r=.5*(t.pageX+n.x),s=.5*(t.pageY+n.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Vn*this._rotateDelta.x/e.clientHeight),this._rotateUp(Vn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),r=.5*(t.pageY+e.y);this._panEnd.set(n,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,r=t.pageY-e.y,s=Math.sqrt(n*n+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Jt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function IA(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function UA(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function NA(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(pv),this.state=be.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function OA(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case No.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=be.DOLLY;break;case No.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=be.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=be.ROTATE}break;case No.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=be.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=be.PAN}break;default:this.state=be.NONE}this.state!==be.NONE&&this.dispatchEvent(Vd)}function FA(i){switch(this.state){case be.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case be.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case be.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function BA(i){this.enabled===!1||this.enableZoom===!1||this.state!==be.NONE||(i.preventDefault(),this.dispatchEvent(Vd),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(pv))}function zA(i){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(i)}function kA(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case So.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=be.TOUCH_ROTATE;break;case So.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=be.TOUCH_PAN;break;default:this.state=be.NONE}break;case 2:switch(this.touches.TWO){case So.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=be.TOUCH_DOLLY_PAN;break;case So.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=be.TOUCH_DOLLY_ROTATE;break;default:this.state=be.NONE}break;default:this.state=be.NONE}this.state!==be.NONE&&this.dispatchEvent(Vd)}function HA(i){switch(this._trackPointer(i),this.state){case be.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case be.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case be.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case be.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=be.NONE}}function VA(i){this.enabled!==!1&&i.preventDefault()}function GA(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function WA(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const pl=(i,t)=>{const e=i.__vccOpts||i;for(const[n,r]of t)e[n]=r;return e},XA=6109722,YA=9133620,qA=10910802,$A=16775399,o_=13369344,jA=16106776,KA=959977,ZA=223649,JA={__name:"Ship3D",setup(i){const t=jh(null);let e=null,n=null,r=null,s=null,o=null,a=null,l=null,c=null;const u=()=>{const m=new wa,p=new hr({color:XA}),M=new hr({color:YA}),b=new hr({color:qA}),v=new hr({color:$A,side:bi}),R=new hr({color:o_,side:bi}),C=new hr({color:jA}),T=new Oi(2.2,1,5,4,2,8),D=T.attributes.position;for(let et=0;et<D.count;et++){let bt=D.getX(et);const Ct=D.getY(et),_t=D.getZ(et);if(_t<-1){const Ht=Math.pow((-_t-1)/1.5,.8)*.75;bt*=1-Ht}_t>1.5&&(bt*=1-(_t-1.5)/1*.2),Ct<0&&(bt*=1- -Ct/.5*.35),D.setX(et,bt)}T.computeVertexNormals();const S=new Me(T,p);S.position.y=-.1,m.add(S);const x=new Oi(2.25,.12,4.5),I=x.attributes.position;for(let et=0;et<I.count;et++){let bt=I.getX(et);const Ct=I.getZ(et);Ct<-.8&&(bt*=1-Math.pow((-Ct-.8)/1.45,.8)*.7),I.setX(et,bt)}x.computeVertexNormals();const F=new Me(x,new hr({color:o_}));F.position.y=.15,m.add(F);const z=new Oi(1.9,.08,4),W=z.attributes.position;for(let et=0;et<W.count;et++){let bt=W.getX(et);const Ct=W.getZ(et);Ct<-.5&&(bt*=1-Math.pow((-Ct-.5)/1.5,.8)*.65),W.setX(et,bt)}z.computeVertexNormals();const tt=new Me(z,b);tt.position.y=.45,m.add(tt);const G=new Oi(1.5,.9,1.2),K=new Me(G,M);K.position.set(0,.9,1.6),m.add(K);const H=new Oi(1.7,.08,1.4),ct=new Me(H,p);ct.position.set(0,1.4,1.6),m.add(ct);const N=new hr({color:8900331,emissive:2113632});for(let et=-.4;et<=.4;et+=.4){const bt=new Oi(.18,.18,.02),Ct=new Me(bt,N);Ct.position.set(et,.9,2.21),m.add(Ct)}const vt=new Ni(.06,.09,3.5,8),Lt=new Me(vt,p);Lt.position.set(0,2.2,-.3),m.add(Lt);const qt=new Ni(.3,.25,.15,12),nt=new Me(qt,M);nt.position.set(0,3.6,-.3),m.add(nt);const ht=new Ni(.03,.03,2.2,6),yt=new Me(ht,p);yt.rotation.z=Math.PI/2,yt.position.set(0,2.8,-.3),m.add(yt);const dt=yt.clone();dt.position.set(0,1.5,-.3),dt.scale.set(.85,.85,.85),m.add(dt);const Pt=new jr(2,1.2,8,4),It=Pt.attributes.position;for(let et=0;et<It.count;et++){const bt=It.getX(et),Ct=It.getY(et);It.setZ(et,Math.sin(bt*1.5)*.15+Math.cos(Ct*2)*.05)}Pt.computeVertexNormals();const kt=new Me(Pt,v);kt.position.set(0,2.15,-.3),m.add(kt);const Zt=new Ni(.05,.07,2.5,8),P=new Me(Zt,p);P.position.set(0,1.7,-1.5),m.add(P);const U=new Ni(.025,.025,1.6,6),A=new Me(U,p);A.rotation.z=Math.PI/2,A.position.set(0,2.4,-1.5),m.add(A);const st=new jr(1.4,1,6,3),J=st.attributes.position;for(let et=0;et<J.count;et++)J.setZ(et,Math.sin(J.getX(et)*1.8)*.1);st.computeVertexNormals();const L=new Me(st,v);L.position.set(0,1.85,-1.5),m.add(L);const it=new Ni(.04,.03,1.8,6),ot=new Me(it,p);ot.rotation.x=-Math.PI/5,ot.position.set(0,.5,-3.1),m.add(ot);const Q=new kd(.2,10,10),E=new Me(Q,C);E.position.set(0,.25,-3.8),m.add(E);const y=new zd(.28,.35,8),O=new Me(y,C);O.rotation.x=Math.PI/2,O.position.set(0,.25,-3.65),m.add(O);const X=new jr(.6,.4,4,2),Y=X.attributes.position;for(let et=0;et<Y.count;et++){const bt=Y.getX(et);Y.setZ(et,Math.sin(bt*4)*.04)}X.computeVertexNormals();const $=new Me(X,R);$.position.set(.35,3.85,-.3),m.add($);const ut=p,lt=[];for(let et=-2;et<=2;et+=.5)lt.push([-.9,et],[.9,et]);lt.forEach(([et,bt])=>{const Ct=new Ni(.02,.02,.4,4),_t=new Me(Ct,ut);_t.position.set(et,.7,bt),m.add(_t)});const mt=new Ni(.015,.015,4,4),Ot=new Me(mt,ut);Ot.position.set(-.9,.85,0),m.add(Ot);const ft=Ot.clone();return ft.position.set(.9,.85,0),m.add(ft),m},f=()=>{const m=new jr(30,30,48,48),p=new hr({color:KA,transparent:!0,opacity:.75,shininess:120,specular:new ae(12248829),side:bi}),M=new Me(m,p);return M.rotation.x=-Math.PI/2,M.position.y=-.7,M},h=()=>{if(!t.value)return;const m=t.value.clientWidth,p=t.value.clientHeight;if(m<=0||p<=0)return;c=new RA,e=new dv,n=new li(40,m/p,.1,200),n.position.set(4,3.5,7),r=new hv({antialias:!0,alpha:!0}),r.setSize(m,p),r.setPixelRatio(Math.min(window.devicePixelRatio,2)),r.setClearColor(0,0),t.value.appendChild(r.domElement);const M=new CA(16775393,.6);e.add(M);const b=new e_(16775885,1.6);b.position.set(5,8,3),e.add(b);const v=new e_(8900331,.5);v.position.set(-3,2,-2),e.add(v);const R=new TA(8900331,ZA,.4);e.add(R),o=u(),e.add(o),a=f(),e.add(a),s=new LA(n,r.domElement),s.target.set(0,1.2,0),s.enableZoom=!1,s.enablePan=!1,s.enableDamping=!0,s.dampingFactor=.05,s.rotateSpeed=.6,s.minPolarAngle=Math.PI*.2,s.maxPolarAngle=Math.PI*.55,d()},d=()=>{if(l=requestAnimationFrame(d),!e||!n||!r)return;const m=c.getElapsedTime();if(s&&s.update(),o&&(o.position.y=Math.sin(m*.8)*.12,o.rotation.z=Math.sin(m*.6)*.03,o.rotation.x=Math.cos(m*.5)*.02),a){const p=a.geometry.attributes.position;for(let M=0;M<p.count;M++){const b=p.getX(M),v=p.getY(M);p.setZ(M,Math.sin(b*.4+m*.8)*.15+Math.cos(v*.3+m*.6)*.1+Math.sin((b+v)*.2+m*1.1)*.05)}p.needsUpdate=!0,a.geometry.computeVertexNormals()}r.render(e,n)},g=()=>{if(!t.value||!n||!r)return;const m=t.value.clientWidth,p=t.value.clientHeight;n.aspect=m/p,n.updateProjectionMatrix(),r.setSize(m,p)},_=()=>{l&&cancelAnimationFrame(l),window.removeEventListener("resize",g),s&&(s.dispose(),s=null),r&&t.value?.contains(r.domElement)&&(t.value.removeChild(r.domElement),r.dispose()),e=null,n=null,r=null,o=null,a=null};return ta(()=>{h(),window.addEventListener("resize",g)}),ll(_),(m,p)=>(en(),nn("div",{ref_key:"containerRef",ref:t,class:"ship-container cursor-grab active:cursor-grabbing"},null,512))}},QA=pl(JA,[["__scopeId","data-v-8427d22f"]]),tC={id:"home",class:"hero-section min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden"},eC={class:"ship-layer"},nC={class:"hero-content relative z-20 flex flex-col items-center text-center max-w-4xl w-full"},iC={class:"flex justify-center gap-6 mb-10"},rC={__name:"HeroSection",setup(i){const t=e=>{document.getElementById(e)?.scrollIntoView({behavior:"smooth"})};return ta(()=>{Gn.timeline({delay:.3}).fromTo(".hero-title",{opacity:0,y:40,scale:.9},{opacity:1,y:0,scale:1,duration:.8,ease:"back.out(1.4)"}).fromTo(".hero-subtitle",{opacity:0,y:30},{opacity:1,y:0,duration:.6,ease:"power2.out"},"-=0.4").fromTo(".hero-desc",{opacity:0,y:20},{opacity:1,y:0,duration:.5,ease:"power2.out"},"-=0.3").fromTo(".hero-cta",{opacity:0,scale:.8},{opacity:1,scale:1,duration:.5,ease:"back.out(2)"},"-=0.2").fromTo(".hero-social",{opacity:0,y:20},{opacity:1,y:0,duration:.4,ease:"power2.out",stagger:.1},"-=0.2")}),(e,n)=>(en(),nn("section",tC,[n[6]||(n[6]=pt("div",{class:"hero-atmosphere","aria-hidden":"true"},[pt("div",{class:"hero-sun-glow"}),pt("div",{class:"hero-sky-haze hero-sky-haze-1"}),pt("div",{class:"hero-sky-haze hero-sky-haze-2"})],-1)),pt("div",eC,[hn(QA)]),pt("div",nC,[n[2]||(n[2]=pt("h1",{class:"hero-title text-6xl md:text-8xl font-bold mb-4 text-cream",style:{"text-shadow":"0 2px 12px rgba(0,0,0,0.4), 0 4px 24px rgba(0,0,0,0.3)"}}," SAFWAN HAKIM ",-1)),n[3]||(n[3]=pt("p",{class:"hero-subtitle text-2xl md:text-3xl mb-6 text-cream font-semibold",style:{"text-shadow":"0 2px 8px rgba(0,0,0,0.3)"}}," Associate Software Manager ",-1)),n[4]||(n[4]=pt("p",{class:"hero-desc text-lg md:text-xl mb-10 text-cream/90 max-w-2xl mx-auto leading-relaxed font-medium",style:{"text-shadow":"0 1px 6px rgba(0,0,0,0.2)"}}," 8+ years steering products, mentoring crews, and shipping resilient systems across the Grand Line of software engineering. ",-1)),pt("div",iC,[pt("button",{onClick:n[0]||(n[0]=r=>t("projects")),class:"hero-cta group px-10 py-4 bg-[#000920] text-[#F4EBDF] font-extrabold rounded-full transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:bg-[#001a3d] border-2 border-cream/30",style:{"text-shadow":"0 1px 3px rgba(0,0,0,0.2)"}},[...n[1]||(n[1]=[pt("span",{class:"inline-flex items-center gap-2"},[ag(" Explore My Voyage "),pt("svg",{class:"w-5 h-5 group-hover:translate-x-1 transition-transform",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[pt("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M17 8l4 4m0 0l-4 4m4-4H3"})])],-1)])])]),n[5]||(n[5]=Cc('<div class="flex justify-center items-center gap-6 flex-wrap" data-v-955ae3db><a href="mailto:putrafyp@gmail.com" target="_blank" class="hero-social group flex items-center gap-3 px-6 py-3 bg-ocean-500/15 backdrop-blur-md rounded-full text-cream border border-sky/30 transition-all duration-300 hover:bg-ocean-500/25 hover:border-secondary/50 hover:scale-105 shadow-md" data-v-955ae3db><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" data-v-955ae3db><rect x="3" y="5" width="18" height="14" rx="2" data-v-955ae3db></rect><polyline points="3 7 12 13 21 7" data-v-955ae3db></polyline></svg><span class="font-semibold" data-v-955ae3db>Email</span></a><a href="https://www.linkedin.com/in/safwan-hakim/" target="_blank" class="hero-social group flex items-center gap-3 px-6 py-3 bg-ocean-500/15 backdrop-blur-md rounded-full text-cream border border-sky/30 transition-all duration-300 hover:bg-ocean-500/25 hover:border-secondary/50 hover:scale-105 shadow-md" data-v-955ae3db><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" data-v-955ae3db><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" data-v-955ae3db></path></svg><span class="font-semibold" data-v-955ae3db>LinkedIn</span></a><a href="https://github.com/wankimmy" target="_blank" class="hero-social group flex items-center gap-3 px-6 py-3 bg-ocean-500/15 backdrop-blur-md rounded-full text-cream border border-sky/30 transition-all duration-300 hover:bg-ocean-500/25 hover:border-secondary/50 hover:scale-105 shadow-md" data-v-955ae3db><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" data-v-955ae3db><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" data-v-955ae3db></path></svg><span class="font-semibold" data-v-955ae3db>GitHub</span></a></div>',1))])]))}},sC=pl(rC,[["__scopeId","data-v-955ae3db"]]),oC=""+new URL("profile-FxYCS_bC.png",import.meta.url).href,aC={},lC={id:"about",class:"relative py-20 px-4 sm:px-6 md:px-8"};function cC(i,t){return en(),nn("section",lC,[...t[0]||(t[0]=[Cc('<div class="max-w-7xl mx-auto relative z-10"><div class="section-heading text-center mb-16"><h2 class="section-title text-5xl md:text-6xl font-extrabold mb-4" style="text-shadow:0 2px 10px rgba(0,0,0,0.3);"> About Me </h2><p class="section-subtitle text-xl text-cream/80 font-medium">Get to know the captain behind the code</p></div><div class="grid md:grid-cols-2 gap-16 items-center"><div class="about-image flex justify-center"><div class="w-80 h-80 md:w-[26rem] md:h-[26rem] rounded-3xl overflow-hidden transform hover:scale-105 transition-transform duration-300 shadow-2xl ring-2 ring-white/10"><img src="'+oC+'" alt="Safwan Hakim" class="w-full h-full object-cover"></div></div><div class="about-text"><h3 class="text-4xl font-bold text-cream mb-6" style="text-shadow:0 1px 6px rgba(0,0,0,0.2);"> Hi, I&#39;m <span class="text-secondary">SAFWAN HAKIM</span></h3><p class="text-lg text-cream/80 leading-relaxed mb-10 font-medium"> I navigate the Grand Line of software engineering the way a captain steers through uncharted waters: stay calm in rough seas, read the map with care, and keep the crew moving forward. Across 8 years, I&#39;ve shipped products with Laravel, Vue.js, Node.js, AWS, and IoT tools while mentoring developers, reviewing code, and helping teams deliver with confidence. </p><div class="grid grid-cols-3 gap-5"><div class="trait-card sea-card p-5 rounded-2xl text-center transform hover:scale-110 transition-transform duration-300"><div class="text-5xl mb-3">🧭</div><p class="text-cream text-sm font-bold">Navigator</p></div><div class="trait-card sea-card p-5 rounded-2xl text-center transform hover:scale-110 transition-transform duration-300"><div class="text-5xl mb-3">⚓</div><p class="text-cream text-sm font-bold">Builder</p></div><div class="trait-card sea-card p-5 rounded-2xl text-center transform hover:scale-110 transition-transform duration-300"><div class="text-5xl mb-3">🏴‍☠️</div><p class="text-cream text-sm font-bold">Captain</p></div></div></div></div></div>',1)])])}const uC=pl(aC,[["render",cC]]),fC={id:"tech",class:"relative py-10 sm:py-14 md:py-20 px-4 sm:px-6 md:px-8"},hC={class:"max-w-7xl mx-auto relative z-10"},dC={class:"sea-card p-4 sm:p-6 lg:p-10 rounded-3xl"},pC={class:"grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-5 md:gap-6 lg:gap-8"},mC=["title"],_C={class:"w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 lg:w-[90px] lg:h-[90px] xl:w-[100px] xl:h-[100px] flex items-center justify-center flex-shrink-0"},gC=["src","alt"],vC={__name:"TechSection",setup(i){const t=[{name:"PHP",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/php/php-original.svg"},{name:"HTML",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/html5/html5-original.svg"},{name:"CSS",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/css3/css3-original.svg"},{name:"JavaScript",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/javascript/javascript-original.svg"},{name:"jQuery",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/jquery/jquery-original-wordmark.svg"},{name:"Laravel",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/laravel/laravel-original.svg"},{name:"Yii2",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/yii/yii-original.svg"},{name:"Node.js",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/nodejs/nodejs-original.svg"},{name:"Vue.js",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/vuejs/vuejs-original.svg"},{name:"WordPress",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/wordpress/wordpress-original.svg"},{name:"Node-Red",icon:"https://raw.githubusercontent.com/devicons/devicon/master/icons/nodered/nodered-original.svg"},{name:"MySQL",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/mysql/mysql-original.svg"},{name:"CouchDB",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/couchdb/couchdb-original.svg"},{name:"Redis",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/redis/redis-original.svg"},{name:"Docker",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/docker/docker-original.svg"},{name:"AWS",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"},{name:"Git",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/git/git-original.svg"},{name:"Nginx",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/nginx/nginx-original.svg"},{name:"Postman",icon:"https://raw.githubusercontent.com/simple-icons/simple-icons/master/icons/postman.svg"},{name:"Cloudflare",icon:"https://raw.githubusercontent.com/simple-icons/simple-icons/master/icons/cloudflare.svg"},{name:"Hostinger",icon:"https://raw.githubusercontent.com/simple-icons/simple-icons/master/icons/hostinger.svg"},{name:"Raspberry Pi",icon:"https://raw.githubusercontent.com/devicons/devicon/master/icons/raspberrypi/raspberrypi-original.svg"},{name:"Arduino",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/arduino/arduino-original.svg"},{name:"MQTT",icon:"https://raw.githubusercontent.com/simple-icons/simple-icons/master/icons/eclipsemosquitto.svg"}];return(e,n)=>(en(),nn("section",fC,[pt("div",hC,[n[0]||(n[0]=pt("div",{class:"section-heading text-center mb-8 sm:mb-12 md:mb-16"},[pt("h2",{class:"section-title text-5xl md:text-6xl font-extrabold mb-4",style:{"text-shadow":"0 2px 10px rgba(0,0,0,0.3)"}}," Arsenal "),pt("p",{class:"section-subtitle text-xl text-cream/80 font-medium"},"Weapons, tools, and shipwright essentials")],-1)),pt("div",dC,[pt("div",pC,[(en(),nn(Sn,null,zs(t,r=>pt("div",{key:r.name,title:r.name,class:"tech-item flex items-center justify-center p-3 sm:p-4 md:p-5 lg:p-6 bg-ocean-500/10 rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 sm:hover:-translate-y-3 hover:scale-105 sm:hover:scale-110 border border-sky/20 hover:border-secondary/40 group min-h-[100px] sm:min-h-[130px] md:min-h-[150px] lg:min-h-[160px]"},[pt("div",_C,[pt("img",{src:r.icon,alt:r.name,loading:"lazy",class:"w-full h-full object-contain block max-w-full max-h-full opacity-90 group-hover:opacity-100 transition-opacity"},null,8,gC)])],8,mC)),64))])])])]))}},xC=pl(vC,[["__scopeId","data-v-2a3fa285"]]),yC={id:"experience",class:"relative py-20 px-8"},MC={class:"max-w-5xl mx-auto relative z-10"},SC={class:"relative"},bC={class:"sea-card p-8 md:p-10 rounded-3xl md:ml-0 ml-0 hover:scale-[1.02] transition-all duration-300"},EC={class:"text-secondary font-extrabold text-lg mb-2"},TC={class:"text-2xl md:text-3xl font-bold text-cream mb-1"},wC={class:"text-secondary/80 font-bold text-lg mb-5"},AC={class:"list-none space-y-3"},CC={class:"font-medium"},RC={__name:"ExperienceSection",setup(i){const t=[{period:"April 2020 - Present",title:"Associate Software Manager",company:"Fiuu (formerly Razer Merchant Services)",duties:["Started as Software Engineer, promoted to Senior Software Engineer, now serves as Associate Software Manager with Engineering Management (EM) responsibilities","Conduct code reviews, guide team members, and find bugs to ensure code quality and best practices","Perform hotfixes when required to address critical production issues and ensure system reliability","Manage and guide team of developers, overseeing projects from planning through execution with realistic timelines","Lead project management efforts including timeline planning, resource allocation, and milestone tracking","Perform customization for merchants including report customization, feature customization, and system improvements to meet specific business requirements","Assist Business-As-Usual (BAU) operations across departments and provide technical support to merchants in various countries (PH, SG, ID, MY)","Collaborate with business and product teams to develop and implement new features and improvements","Delivered over 850 bug fixes and enhancements, improving system performance, stability, scalability, and functionality"]},{period:"January 2020 - October 2021",title:"Web Software Developer",company:"My Innovative Wellness SDN BHD (Part-Time)",duties:["Developed user-friendly e-commerce platform using WooCommerce, boosting online sales by up to 10,000 ringgit monthly","Created internal systems to streamline sales and increase productivity","Set up cloud hosting services (AWS EC2, Hostinger) with CloudFlare, Facebook Pixel, and Google Analytics","Led planning and design for company technical infrastructure including data and email migration"]},{period:"January 2018 - December 2019",title:"Freelance Programmer & Raspberry Pi Node-Red Trainer",company:"Freelance / Tertiary Courses Malaysia",duties:["Developed websites, apps, and e-commerce systems for startups like EzDisposal, TTDI Meatpoint, and RNR Enterprise","Served as Raspberry Pi and Node-Red trainer, teaching Industry 4.0 concepts to universities (UniKL, MSU, UUM)","Provided technical advisory and implemented solutions using PHP, WordPress, and Laravel Framework"]},{period:"August 2016 - August 2018",title:"Junior Programmer",company:"Unijaya Resource Sdn Bhd",duties:["Contributed to RM 3 million project, successfully delivering two modules with team of 5 members","Developed and deployed mobile app to Google Play Store and Apple App Store","Developed company website with improved UI/UX, enhancing user engagement and satisfaction"]}];return(e,n)=>(en(),nn("section",yC,[pt("div",MC,[n[3]||(n[3]=pt("div",{class:"section-heading text-center mb-16"},[pt("h2",{class:"section-title text-5xl md:text-6xl font-extrabold mb-4",style:{"text-shadow":"0 2px 10px rgba(0,0,0,0.3)"}}," Voyage Log "),pt("p",{class:"section-subtitle text-xl text-cream/80 font-medium"},"Every major arc in my engineering adventure")],-1)),pt("div",SC,[n[2]||(n[2]=pt("div",{class:"timeline-line hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-secondary/60 via-white/30 to-primary/50 transform -translate-x-1/2 rounded-full"},null,-1)),(en(),nn(Sn,null,zs(t,(r,s)=>pt("div",{key:s,class:"exp-card relative mb-16 pl-0 md:pl-1/2 md:ml-24"},[n[1]||(n[1]=pt("div",{class:"timeline-dot hidden md:flex absolute left-1/2 top-0 w-7 h-7 rounded-full bg-gradient-to-r from-secondary to-primary border-4 border-ocean-900 shadow-lg shadow-secondary/30 -ml-3.5 transform -translate-x-1/2"},null,-1)),pt("div",bC,[pt("div",EC,dn(r.period),1),pt("h3",TC,dn(r.title),1),pt("p",wC,dn(r.company),1),pt("ul",AC,[(en(!0),nn(Sn,null,zs(r.duties,o=>(en(),nn("li",{key:o,class:"flex items-start gap-3 text-cream/75"},[n[0]||(n[0]=pt("span",{class:"text-secondary font-bold text-xl flex-shrink-0 mt-0.5"},"✦",-1)),pt("span",CC,dn(o),1)]))),128))])])])),64))])])]))}},PC={id:"projects",class:"relative py-20 px-8"},DC={class:"max-w-7xl mx-auto relative z-10"},LC={class:"grid md:grid-cols-2 lg:grid-cols-2 gap-10"},IC={class:"relative h-56 overflow-hidden bg-gradient-to-br from-sky/5 via-ocean-500/10 to-secondary/10"},UC={class:"absolute inset-0 flex items-center justify-center text-7xl"},NC={class:"absolute inset-0 bg-ocean-900/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"},OC=["href"],FC={class:"p-8"},BC={class:"text-2xl font-bold text-cream mb-2"},zC={class:"text-secondary/80 mb-1 text-sm font-semibold"},kC={class:"text-cream/70 mb-6 leading-relaxed font-medium"},HC={class:"flex flex-wrap gap-3"},VC={__name:"ProjectsSection",setup(i){const t=[{id:1,name:"Festivent",url:"festivent.com.my",description:"E-commerce platform for finding event vendors in Malaysia. Connect event organizers with professional vendors for any type of event.",icon:"🎪",live:"https://festivent.com.my/home",tech:["Laravel","PHP","MySQL","Bootstrap CSS","Hostinger"]},{id:2,name:"EZDisposal",url:"ezdisposal.my",description:"Hassle-free disposal service booking platform. Book disposal services for furniture, appliances, and e-waste with multiple vehicle options.",icon:"🗑️",live:"https://ezdisposal.my",tech:["Laravel","PHP","MySQL","Hostinger"]},{id:3,name:"Entrusol",url:"entrusol.com",description:"E-commerce platform for wellness products with integrated sales system. Built with WordPress and WooCommerce for seamless online shopping.",icon:"🌿",live:"https://entrusol.com",tech:["WordPress","WooCommerce","MySQL","Hostinger","Google Analytics"]},{id:4,name:"TTDI Meatpoint",url:"ttdimeatpoint.com",description:"Restaurant website with custom booking system. Complete dining experience with online reservations and menu management.",icon:"🍖",live:"https://www.ttdimeatpoint.com",tech:["Laravel","PHP","MySQL","Bootstrap CSS","Hostinger"]}];return(e,n)=>(en(),nn("section",PC,[pt("div",DC,[n[0]||(n[0]=pt("div",{class:"section-heading text-center mb-16"},[pt("h2",{class:"section-title text-5xl md:text-6xl font-extrabold mb-4",style:{"text-shadow":"0 2px 10px rgba(0,0,0,0.3)"}}," Bounty Board "),pt("p",{class:"section-subtitle text-xl text-cream/80 font-medium"},"Flagships and products worth charting")],-1)),pt("div",LC,[(en(),nn(Sn,null,zs(t,r=>pt("div",{key:r.id,class:"project-card sea-card rounded-3xl overflow-hidden hover:scale-[1.02] transition-all duration-300 group"},[pt("div",IC,[pt("div",UC,dn(r.icon),1),pt("div",NC,[pt("a",{href:r.live,target:"_blank",class:"px-10 py-4 bg-[#000920] text-[#F4EBDF] font-extrabold rounded-full transition-all hover:scale-110 shadow-xl border-2 border-cream/30"}," Board This Ship ",8,OC)])]),pt("div",FC,[pt("h3",BC,dn(r.name),1),pt("p",zC,dn(r.url),1),pt("p",kC,dn(r.description),1),pt("div",HC,[(en(!0),nn(Sn,null,zs(r.tech,s=>(en(),nn("span",{key:s,class:"px-4 py-1.5 bg-ocean-500/20 text-cream/90 rounded-full text-sm font-bold border border-sky/20"},dn(s),1))),128))])])])),64))])])]))}},GC={id:"certificates",class:"relative py-20 px-8"},WC={class:"max-w-7xl mx-auto relative z-10"},XC={class:"grid md:grid-cols-2 lg:grid-cols-4 gap-8"},YC={class:"relative h-52 bg-gradient-to-br from-white/5 via-secondary/10 to-primary/10 flex items-center justify-center flex-shrink-0"},qC={class:"relative z-10 text-center"},$C={class:"text-6xl mb-3"},jC={class:"text-cream font-bold text-sm px-4 py-2 bg-ocean-500/20 backdrop-blur-md rounded-full border border-sky/20"},KC={class:"p-7 flex-1 flex flex-col"},ZC={class:"flex-1"},JC={class:"text-xl font-bold text-cream mb-2"},QC={class:"text-secondary/80 mb-1 text-sm font-semibold"},tR={class:"text-cream/50 text-sm mb-3"},eR={class:"text-cream/70 leading-relaxed text-sm"},nR={class:"flex justify-center pt-5 mt-auto"},iR=["href"],rR={__name:"CertificatesSection",setup(i){const t=[{id:1,name:"Web Application Hacking And Defense",issuer:"Condition Zebra",date:"Issued in 2024",description:"Comprehensive training in ethical hacking and web application security. Learn offensive security techniques to identify vulnerabilities, perform penetration testing, and implement defensive strategies.",icon:"🎖️",file:"/assets/R001174-Safwan-Hakim-Bin-Yacob.pdf"},{id:2,name:"OWASP Security Foundation",issuer:"OWASP Foundation",date:"Issued in 2022",description:"Foundational knowledge in web application security, covering vulnerabilities, threats, and best practices.",icon:"🔐",file:"/assets/Safwan_Hakim_owasp.pdf"},{id:3,name:"IoT Security Certification",issuer:"Tertiary Courses / Industry",date:"Issued in 2021",description:"Professional certification in IoT security, covering secure device deployment, data encryption, and network protection for IoT ecosystems.",icon:"🌐",file:"/assets/E-cert_IoT_Security_Safwan_Hakim.pdf"},{id:4,name:"Industry 4.0 E-Certification",issuer:"Tertiary Courses / Industry",date:"Issued in 2021",description:"Certification in Industry 4.0 technologies including automation, data analytics, IoT integration, and smart manufacturing systems.",icon:"🏭",file:"/assets/IR4.0_E-Cert_Safwan_Hakim_Bin_Yacob.pdf"}];return(e,n)=>(en(),nn("section",GC,[pt("div",WC,[n[1]||(n[1]=pt("div",{class:"section-heading text-center mb-16"},[pt("h2",{class:"section-title text-5xl md:text-6xl font-extrabold mb-4",style:{"text-shadow":"0 2px 10px rgba(0,0,0,0.3)"}}," Training Arc "),pt("p",{class:"section-subtitle text-xl text-cream/80 font-medium"},"Proof of every skill-up and security drill")],-1)),pt("div",XC,[(en(),nn(Sn,null,zs(t,r=>pt("div",{key:r.id,class:"cert-card sea-card rounded-3xl overflow-hidden hover:scale-[1.02] transition-all duration-300 group flex flex-col"},[pt("div",YC,[n[0]||(n[0]=pt("div",{class:"absolute inset-0 flex items-center justify-center text-8xl opacity-10"},"🎓",-1)),pt("div",qC,[pt("div",$C,dn(r.icon),1),pt("div",jC,dn(r.issuer),1)])]),pt("div",KC,[pt("div",ZC,[pt("h3",JC,dn(r.name),1),pt("p",QC,dn(r.issuer),1),pt("p",tR,dn(r.date),1),pt("p",eR,dn(r.description),1)]),pt("div",nR,[pt("a",{href:r.file,target:"_blank",class:"px-5 py-3 bg-[#000920] text-[#F4EBDF] font-bold rounded-xl text-center transition-all hover:bg-[#001a3d] hover:scale-105 shadow-md"}," View Certificate ",8,iR)])])])),64))])])]))}},sR={__name:"Scene3D",props:{particleCount:{type:Number,default:3e3},speed:{type:Number,default:1},theme:{type:String,default:"ocean"},pauseOnHidden:{type:Boolean,default:!0}},setup(i){const t=i,e=jh(null);let n=null,r=null,s=null,o=null,a=null,l=!0;const c={ocean:[16777215,9617383,94135,16051167,12114680,16106776,16051167],stars:[16777215,16775408,15266047,16772829,13689087,16774368,16769216,12638463],gradient:[6717162,3900150,6514417,7752610]},u=()=>c[t.theme]||c.ocean,f=()=>{if(!e.value)return;n=new dv;const M=e.value.clientWidth||window.innerWidth,b=e.value.clientHeight||window.innerHeight;r=new li(60,M/b,.1,1e3),r.position.z=100,s=new hv({antialias:!0,alpha:!0,powerPreference:"high-performance"}),s.setSize(M,b),s.setPixelRatio(Math.min(window.devicePixelRatio,2)),s.setClearColor(0,0),e.value.appendChild(s.domElement),t.theme==="ocean"?h():d(),t.pauseOnHidden&&document.addEventListener("visibilitychange",g),_()},h=()=>{const M=t.particleCount,b=new Ri,v=new Float32Array(M*3),R=new Float32Array(M*3),C=new Float32Array(M),T=new Float32Array(M),D=new Float32Array(M),S=u(),x=new ae;for(let F=0;F<M;F++){const z=F*3;v[z]=(Math.random()-.5)*300,v[z+1]=(Math.random()-.5)*200,v[z+2]=(Math.random()-.5)*200;const W=Math.pow(Math.random(),2);C[F]=.4+W*2.5,T[F]=.2+Math.random()*.8,D[F]=Math.random()*Math.PI*2;const tt=Math.floor(Math.random()*S.length);x.setHex(S[tt]),R[z]=x.r,R[z+1]=x.g,R[z+2]=x.b}b.setAttribute("position",new cn(v,3)),b.setAttribute("particleColor",new cn(R,3)),b.setAttribute("size",new cn(C,1)),b.setAttribute("driftSpeed",new cn(T,1)),b.setAttribute("phase",new cn(D,1));const I=new rr({uniforms:{time:{value:0},pixelRatio:{value:Math.min(window.devicePixelRatio,2)}},vertexShader:`
      precision highp float;
      attribute float size;
      attribute vec3 particleColor;
      attribute float driftSpeed;
      attribute float phase;
      varying vec3 vColor;
      varying float vAlpha;
      uniform float time;
      uniform float pixelRatio;
      void main() {
        vColor = particleColor;
        float shimmer = sin(time * driftSpeed * 2.0 + phase) * 0.4 + 0.6;
        vAlpha = shimmer * 0.5;
        vec3 pos = position;
        pos.y += sin(time * driftSpeed * 0.5 + phase) * 3.0;
        pos.x += cos(time * driftSpeed * 0.3 + phase * 1.4) * 2.0;
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = max(size * (350.0 / -mvPosition.z) * pixelRatio, 0.5);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,fragmentShader:`
      precision highp float;
      varying vec3 vColor;
      varying float vAlpha;
      void main() {
        float d = distance(gl_PointCoord, vec2(0.5));
        float core = 1.0 - smoothstep(0.0, 0.25, d);
        float glow = (1.0 - smoothstep(0.0, 0.5, d)) * 0.3;
        float alpha = (core + glow) * vAlpha;
        gl_FragColor = vec4(vColor, alpha);
      }
    `,transparent:!0,blending:Vc,depthTest:!1});o=new Zm(b,I),n.add(o)},d=()=>{const M=new Ri,b=new Float32Array(t.particleCount*3),v=new Float32Array(t.particleCount*3),R=new Float32Array(t.particleCount),C=u(),T=new ae;for(let S=0;S<t.particleCount;S++){const x=S*3,I=50+Math.random()*50,F=Math.random()*Math.PI*2,z=Math.acos(Math.random()*2-1);b[x]=I*Math.sin(z)*Math.cos(F),b[x+1]=I*Math.sin(z)*Math.sin(F),b[x+2]=I*Math.cos(z),R[S]=Math.random()*2+.5;const W=Math.floor(Math.random()*C.length);T.setHex(C[W]),v[x]=T.r,v[x+1]=T.g,v[x+2]=T.b}M.setAttribute("position",new cn(b,3)),M.setAttribute("particleColor",new cn(v,3)),M.setAttribute("size",new cn(R,1));const D=new rr({uniforms:{time:{value:0},pixelRatio:{value:Math.min(window.devicePixelRatio,2)}},vertexShader:`
      precision mediump float;
      attribute float size;
      attribute vec3 particleColor;
      varying vec3 vColor;
      uniform float time;
      uniform float pixelRatio;
      void main() {
        vColor = particleColor;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z) * pixelRatio * (1.0 + sin(time * 0.5) * 0.1);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,fragmentShader:`
      precision mediump float;
      varying vec3 vColor;
      void main() {
        float d = distance(gl_PointCoord, vec2(0.5));
        float alpha = (1.0 - smoothstep(0.0, 0.5, d)) * 0.8;
        gl_FragColor = vec4(vColor, alpha);
      }
    `,transparent:!0,blending:Vc,depthTest:!1});o=new Zm(M,D),n.add(o)},g=()=>{l=!document.hidden,l&&!a&&_()},_=()=>{if(!l&&t.pauseOnHidden){a=null;return}if(a=requestAnimationFrame(_),!n||!r||!s||!o)return;const M=performance.now()*.001*t.speed;o.material.uniforms&&(o.material.uniforms.time.value=M),r.position.x=Math.sin(M*.04)*2,r.position.y=Math.cos(M*.03)*1.5,r.lookAt(n.position),s.render(n,r)},m=()=>{if(!e.value||!r||!s)return;const M=e.value.clientWidth||window.innerWidth,b=e.value.clientHeight||window.innerHeight;r.aspect=M/b,r.updateProjectionMatrix(),s.setSize(M,b)},p=()=>{a&&(cancelAnimationFrame(a),a=null),t.pauseOnHidden&&document.removeEventListener("visibilitychange",g),window.removeEventListener("resize",m),o&&(o.geometry&&o.geometry.dispose(),o.material&&o.material.dispose(),n&&n.remove(o),o=null),s&&(e.value&&s.domElement&&e.value.removeChild(s.domElement),s.dispose(),s=null),n=null,r=null};return ta(()=>{f(),window.addEventListener("resize",m)}),ll(p),nc(()=>t.theme,()=>{if(o&&o.geometry){const M=o.geometry.attributes.particleColor,b=u(),v=new ae;for(let R=0;R<t.particleCount;R++){const C=R*3;v.setHex(b[Math.floor(Math.random()*b.length)]),M.array[C]=v.r,M.array[C+1]=v.g,M.array[C+2]=v.b}M.needsUpdate=!0}}),(M,b)=>(en(),nn("div",{ref_key:"containerRef",ref:e,class:"absolute inset-0 w-full h-full overflow-hidden pointer-events-none"},null,512))}},oR=pl(sR,[["__scopeId","data-v-42215e52"]]),aR=""+new URL("strawhat-CKPJ-6zA.png",import.meta.url).href,lR={class:"relative w-full min-h-screen overflow-x-hidden bg-ocean-900"},cR={class:"relative z-0"},uR={class:"absolute inset-0 w-full h-full z-[2]"},fR={class:"relative z-10 bg-gradient-to-b from-ocean-500 via-ocean-700 to-ocean-900"},hR={id:"crew",class:"relative py-0"},dR={__name:"App",setup(i){return Gn.registerPlugin(le),ta(async()=>{await U_(),document.querySelectorAll(".section-heading").forEach(u=>{const f=u.querySelector(".section-title"),h=u.querySelector(".section-subtitle"),d=Gn.timeline({scrollTrigger:{trigger:u,start:"top 85%",toggleActions:"play none none none"}});f&&d.fromTo(f,{opacity:0,y:40,scale:.92},{opacity:1,y:0,scale:1,duration:.8,ease:"back.out(1.4)"}),h&&d.fromTo(h,{opacity:0,y:20},{opacity:1,y:0,duration:.5,ease:"power2.out"},"-=0.4")});const t=document.querySelector(".about-image"),e=document.querySelector(".about-text"),n=document.querySelectorAll(".trait-card");t&&Gn.fromTo(t,{opacity:0,x:-80,rotate:-2},{opacity:1,x:0,rotate:0,duration:1,ease:"power3.out",scrollTrigger:{trigger:t,start:"top 82%",toggleActions:"play none none none"}}),e&&Gn.fromTo(e,{opacity:0,x:80},{opacity:1,x:0,duration:1,ease:"power3.out",scrollTrigger:{trigger:e,start:"top 82%",toggleActions:"play none none none"}}),n.length&&Gn.fromTo(n,{opacity:0,y:40,scale:.7},{opacity:1,y:0,scale:1,duration:.6,ease:"back.out(2)",stagger:.15,scrollTrigger:{trigger:n[0],start:"top 90%",toggleActions:"play none none none"}});const r=document.querySelectorAll(".tech-item");r.length&&Gn.fromTo(r,{opacity:0,scale:.4,y:30},{opacity:1,scale:1,y:0,duration:.5,ease:"back.out(1.5)",stagger:{each:.04,from:"random"},scrollTrigger:{trigger:"#tech",start:"top 75%",toggleActions:"play none none none"}});const s=document.querySelector(".timeline-line"),o=document.querySelectorAll(".exp-card"),a=document.querySelectorAll(".timeline-dot");s&&Gn.fromTo(s,{scaleY:0,transformOrigin:"top center"},{scaleY:1,duration:1.5,ease:"power2.inOut",scrollTrigger:{trigger:"#experience",start:"top 70%",toggleActions:"play none none none"}}),o.forEach((u,f)=>{Gn.fromTo(u,{opacity:0,x:f%2===0?-60:60,y:30},{opacity:1,x:0,y:0,duration:.8,ease:"power3.out",scrollTrigger:{trigger:u,start:"top 85%",toggleActions:"play none none none"}})}),a.forEach(u=>{Gn.fromTo(u,{scale:0,opacity:0},{scale:1,opacity:1,duration:.5,ease:"back.out(2)",scrollTrigger:{trigger:u,start:"top 85%",toggleActions:"play none none none"}})});const l=document.querySelectorAll(".project-card");l.length&&Gn.fromTo(l,{opacity:0,y:80,rotateX:8},{opacity:1,y:0,rotateX:0,duration:.8,ease:"power3.out",stagger:.2,scrollTrigger:{trigger:"#projects",start:"top 72%",toggleActions:"play none none none"}});const c=document.querySelectorAll(".cert-card");c.length&&Gn.fromTo(c,{opacity:0,y:50,scale:.85},{opacity:1,y:0,scale:1,duration:.7,ease:"back.out(1.3)",stagger:.15,scrollTrigger:{trigger:"#certificates",start:"top 75%",toggleActions:"play none none none"}})}),(t,e)=>(en(),nn("div",lR,[pt("div",cR,[e[0]||(e[0]=Cc('<div class="absolute inset-0 bg-[linear-gradient(180deg,_#dff3ff_0%,_#c5e1f6_18%,_#92BFE7_48%,_#5fa2d8_72%,_#2c79bf_100%)]"></div><div class="absolute inset-0 z-[1] pointer-events-none overflow-hidden"><div class="cloud cloud-1"></div><div class="cloud cloud-2"></div><div class="cloud cloud-3"></div><div class="cloud cloud-4"></div><div class="cloud cloud-5"></div><div class="cloud cloud-6"></div><div class="cloud cloud-7"></div></div>',2)),pt("div",uR,[hn(oR,{"particle-count":1200,speed:.4,theme:"ocean",class:"w-full h-full"})]),hn(SS),hn(sC),e[1]||(e[1]=Cc('<div class="anime-wave relative" style="margin-top:-2px;"><svg viewBox="0 0 2880 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path class="wave-back" d="M0,40 C320,80 640,10 960,50 C1280,90 1600,20 1920,60 C2240,100 2560,30 2880,70 L2880,100 L0,100Z" fill="rgba(1,111,183,0.5)"></path><path class="wave-mid" d="M0,55 C240,25 480,75 720,45 C960,15 1200,65 1440,35 C1680,5 1920,55 2160,25 C2400,65 2640,35 2880,55 L2880,100 L0,100Z" fill="rgba(0,50,128,0.7)"></path><path class="wave-front" d="M0,65 C360,45 720,85 1080,55 C1440,25 1800,75 2160,50 C2520,80 2700,45 2880,60 L2880,100 L0,100Z" fill="rgb(0,50,128)"></path></svg></div>',1))]),pt("div",fR,[hn(uC),e[2]||(e[2]=pt("div",{class:"anime-wave"},[pt("svg",{viewBox:"0 0 2880 80",preserveAspectRatio:"none",xmlns:"http://www.w3.org/2000/svg"},[pt("path",{class:"wave-back",d:"M0,30 C320,60 640,10 960,40 C1280,70 1600,20 1920,50 C2240,80 2560,30 2880,60 L2880,80 L0,80Z",fill:"rgba(146,191,231,0.08)"}),pt("path",{class:"wave-front",d:"M0,50 C360,30 720,70 1080,40 C1440,10 1800,60 2160,35 C2520,65 2700,35 2880,50 L2880,80 L0,80Z",fill:"rgba(146,191,231,0.05)"})])],-1)),hn(xC),e[3]||(e[3]=pt("div",{class:"anime-wave"},[pt("svg",{viewBox:"0 0 2880 80",preserveAspectRatio:"none",xmlns:"http://www.w3.org/2000/svg"},[pt("path",{class:"wave-back",d:"M0,35 C320,65 640,15 960,45 C1280,75 1600,25 1920,55 C2240,85 2560,35 2880,65 L2880,80 L0,80Z",fill:"rgba(146,191,231,0.08)"}),pt("path",{class:"wave-front",d:"M0,50 C360,25 720,65 1080,35 C1440,15 1800,55 2160,30 C2520,60 2700,30 2880,50 L2880,80 L0,80Z",fill:"rgba(146,191,231,0.05)"})])],-1)),hn(RC),e[4]||(e[4]=pt("div",{class:"anime-wave"},[pt("svg",{viewBox:"0 0 2880 80",preserveAspectRatio:"none",xmlns:"http://www.w3.org/2000/svg"},[pt("path",{class:"wave-back",d:"M0,40 C320,70 640,20 960,50 C1280,80 1600,30 1920,60 C2240,90 2560,40 2880,70 L2880,80 L0,80Z",fill:"rgba(146,191,231,0.08)"}),pt("path",{class:"wave-front",d:"M0,55 C360,30 720,70 1080,40 C1440,20 1800,60 2160,35 C2520,65 2700,35 2880,55 L2880,80 L0,80Z",fill:"rgba(146,191,231,0.05)"})])],-1)),hn(VC),e[5]||(e[5]=pt("div",{class:"anime-wave"},[pt("svg",{viewBox:"0 0 2880 80",preserveAspectRatio:"none",xmlns:"http://www.w3.org/2000/svg"},[pt("path",{class:"wave-back",d:"M0,30 C320,60 640,10 960,40 C1280,70 1600,20 1920,50 C2240,80 2560,30 2880,60 L2880,80 L0,80Z",fill:"rgba(146,191,231,0.08)"}),pt("path",{class:"wave-front",d:"M0,45 C360,25 720,60 1080,35 C1440,15 1800,55 2160,30 C2520,60 2700,30 2880,45 L2880,80 L0,80Z",fill:"rgba(146,191,231,0.05)"})])],-1)),hn(rR),pt("section",hR,[pt("div",{class:"w-full min-h-[75vh] bg-cover bg-center bg-no-repeat",style:jc({backgroundImage:`url(${D_(aR)})`})},null,4)])])]))}};Gn.registerPlugin(le);Fy(dR).mount("#app");
