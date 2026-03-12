(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();function Oh(i){const t=Object.create(null);for(const e of i.split(","))t[e]=1;return e=>e in t}const Pe={},yo=[],$i=()=>{},n_=()=>!1,Wc=i=>i.charCodeAt(0)===111&&i.charCodeAt(1)===110&&(i.charCodeAt(2)>122||i.charCodeAt(2)<97),Fh=i=>i.startsWith("onUpdate:"),Hn=Object.assign,Bh=(i,t)=>{const e=i.indexOf(t);e>-1&&i.splice(e,1)},hv=Object.prototype.hasOwnProperty,ye=(i,t)=>hv.call(i,t),jt=Array.isArray,Mo=i=>Xc(i)==="[object Map]",i_=i=>Xc(i)==="[object Set]",ne=i=>typeof i=="function",je=i=>typeof i=="string",rs=i=>typeof i=="symbol",Ue=i=>i!==null&&typeof i=="object",r_=i=>(Ue(i)||ne(i))&&ne(i.then)&&ne(i.catch),s_=Object.prototype.toString,Xc=i=>s_.call(i),dv=i=>Xc(i).slice(8,-1),o_=i=>Xc(i)==="[object Object]",zh=i=>je(i)&&i!=="NaN"&&i[0]!=="-"&&""+parseInt(i,10)===i,Sa=Oh(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Yc=i=>{const t=Object.create(null);return(e=>t[e]||(t[e]=i(e)))},pv=/-\w/g,Jr=Yc(i=>i.replace(pv,t=>t.slice(1).toUpperCase())),mv=/\B([A-Z])/g,Gs=Yc(i=>i.replace(mv,"-$1").toLowerCase()),a_=Yc(i=>i.charAt(0).toUpperCase()+i.slice(1)),lu=Yc(i=>i?`on${a_(i)}`:""),Yr=(i,t)=>!Object.is(i,t),cu=(i,...t)=>{for(let e=0;e<i.length;e++)i[e](...t)},l_=(i,t,e,n=!1)=>{Object.defineProperty(i,t,{configurable:!0,enumerable:!1,writable:n,value:e})},_v=i=>{const t=parseFloat(i);return isNaN(t)?i:t};let Vd;const qc=()=>Vd||(Vd=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function kh(i){if(jt(i)){const t={};for(let e=0;e<i.length;e++){const n=i[e],r=je(n)?yv(n):kh(n);if(r)for(const s in r)t[s]=r[s]}return t}else if(je(i)||Ue(i))return i}const gv=/;(?![^(]*\))/g,vv=/:([^]+)/,xv=/\/\*[^]*?\*\//g;function yv(i){const t={};return i.replace(xv,"").split(gv).forEach(e=>{if(e){const n=e.split(vv);n.length>1&&(t[n[0].trim()]=n[1].trim())}}),t}function Va(i){let t="";if(je(i))t=i;else if(jt(i))for(let e=0;e<i.length;e++){const n=Va(i[e]);n&&(t+=n+" ")}else if(Ue(i))for(const e in i)i[e]&&(t+=e+" ");return t.trim()}const Mv="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Sv=Oh(Mv);function c_(i){return!!i||i===""}const u_=i=>!!(i&&i.__v_isRef===!0),un=i=>je(i)?i:i==null?"":jt(i)||Ue(i)&&(i.toString===s_||!ne(i.toString))?u_(i)?un(i.value):JSON.stringify(i,f_,2):String(i),f_=(i,t)=>u_(t)?f_(i,t.value):Mo(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((e,[n,r],s)=>(e[uu(n,s)+" =>"]=r,e),{})}:i_(t)?{[`Set(${t.size})`]:[...t.values()].map(e=>uu(e))}:rs(t)?uu(t):Ue(t)&&!jt(t)&&!o_(t)?String(t):t,uu=(i,t="")=>{var e;return rs(i)?`Symbol(${(e=i.description)!=null?e:t})`:i};let Wn;class bv{constructor(t=!1){this.detached=t,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=Wn,!t&&Wn&&(this.index=(Wn.scopes||(Wn.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,e;if(this.scopes)for(t=0,e=this.scopes.length;t<e;t++)this.scopes[t].pause();for(t=0,e=this.effects.length;t<e;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,e;if(this.scopes)for(t=0,e=this.scopes.length;t<e;t++)this.scopes[t].resume();for(t=0,e=this.effects.length;t<e;t++)this.effects[t].resume()}}run(t){if(this._active){const e=Wn;try{return Wn=this,t()}finally{Wn=e}}}on(){++this._on===1&&(this.prevScope=Wn,Wn=this)}off(){this._on>0&&--this._on===0&&(Wn=this.prevScope,this.prevScope=void 0)}stop(t){if(this._active){this._active=!1;let e,n;for(e=0,n=this.effects.length;e<n;e++)this.effects[e].stop();for(this.effects.length=0,e=0,n=this.cleanups.length;e<n;e++)this.cleanups[e]();if(this.cleanups.length=0,this.scopes){for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){const r=this.parent.scopes.pop();r&&r!==this&&(this.parent.scopes[this.index]=r,r.index=this.index)}this.parent=void 0}}}function Ev(){return Wn}let Re;const fu=new WeakSet;class h_{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Wn&&Wn.active&&Wn.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,fu.has(this)&&(fu.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||p_(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Gd(this),m_(this);const t=Re,e=Ui;Re=this,Ui=!0;try{return this.fn()}finally{__(this),Re=t,Ui=e,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)Gh(t);this.deps=this.depsTail=void 0,Gd(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?fu.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){hf(this)&&this.run()}get dirty(){return hf(this)}}let d_=0,ba,Ea;function p_(i,t=!1){if(i.flags|=8,t){i.next=Ea,Ea=i;return}i.next=ba,ba=i}function Hh(){d_++}function Vh(){if(--d_>0)return;if(Ea){let t=Ea;for(Ea=void 0;t;){const e=t.next;t.next=void 0,t.flags&=-9,t=e}}let i;for(;ba;){let t=ba;for(ba=void 0;t;){const e=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(n){i||(i=n)}t=e}}if(i)throw i}function m_(i){for(let t=i.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function __(i){let t,e=i.depsTail,n=e;for(;n;){const r=n.prevDep;n.version===-1?(n===e&&(e=r),Gh(n),Tv(n)):t=n,n.dep.activeLink=n.prevActiveLink,n.prevActiveLink=void 0,n=r}i.deps=t,i.depsTail=e}function hf(i){for(let t=i.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(g_(t.dep.computed)||t.dep.version!==t.version))return!0;return!!i._dirty}function g_(i){if(i.flags&4&&!(i.flags&16)||(i.flags&=-17,i.globalVersion===Ga)||(i.globalVersion=Ga,!i.isSSR&&i.flags&128&&(!i.deps&&!i._dirty||!hf(i))))return;i.flags|=2;const t=i.dep,e=Re,n=Ui;Re=i,Ui=!0;try{m_(i);const r=i.fn(i._value);(t.version===0||Yr(r,i._value))&&(i.flags|=128,i._value=r,t.version++)}catch(r){throw t.version++,r}finally{Re=e,Ui=n,__(i),i.flags&=-3}}function Gh(i,t=!1){const{dep:e,prevSub:n,nextSub:r}=i;if(n&&(n.nextSub=r,i.prevSub=void 0),r&&(r.prevSub=n,i.nextSub=void 0),e.subs===i&&(e.subs=n,!n&&e.computed)){e.computed.flags&=-5;for(let s=e.computed.deps;s;s=s.nextDep)Gh(s,!0)}!t&&!--e.sc&&e.map&&e.map.delete(e.key)}function Tv(i){const{prevDep:t,nextDep:e}=i;t&&(t.nextDep=e,i.prevDep=void 0),e&&(e.prevDep=t,i.nextDep=void 0)}let Ui=!0;const v_=[];function Mr(){v_.push(Ui),Ui=!1}function Sr(){const i=v_.pop();Ui=i===void 0?!0:i}function Gd(i){const{cleanup:t}=i;if(i.cleanup=void 0,t){const e=Re;Re=void 0;try{t()}finally{Re=e}}}let Ga=0;class wv{constructor(t,e){this.sub=t,this.dep=e,this.version=e.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Wh{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(t){if(!Re||!Ui||Re===this.computed)return;let e=this.activeLink;if(e===void 0||e.sub!==Re)e=this.activeLink=new wv(Re,this),Re.deps?(e.prevDep=Re.depsTail,Re.depsTail.nextDep=e,Re.depsTail=e):Re.deps=Re.depsTail=e,x_(e);else if(e.version===-1&&(e.version=this.version,e.nextDep)){const n=e.nextDep;n.prevDep=e.prevDep,e.prevDep&&(e.prevDep.nextDep=n),e.prevDep=Re.depsTail,e.nextDep=void 0,Re.depsTail.nextDep=e,Re.depsTail=e,Re.deps===e&&(Re.deps=n)}return e}trigger(t){this.version++,Ga++,this.notify(t)}notify(t){Hh();try{for(let e=this.subs;e;e=e.prevSub)e.sub.notify()&&e.sub.dep.notify()}finally{Vh()}}}function x_(i){if(i.dep.sc++,i.sub.flags&4){const t=i.dep.computed;if(t&&!i.dep.subs){t.flags|=20;for(let n=t.deps;n;n=n.nextDep)x_(n)}const e=i.dep.subs;e!==i&&(i.prevSub=e,e&&(e.nextSub=i)),i.dep.subs=i}}const df=new WeakMap,As=Symbol(""),pf=Symbol(""),Wa=Symbol("");function xn(i,t,e){if(Ui&&Re){let n=df.get(i);n||df.set(i,n=new Map);let r=n.get(e);r||(n.set(e,r=new Wh),r.map=n,r.key=e),r.track()}}function dr(i,t,e,n,r,s){const o=df.get(i);if(!o){Ga++;return}const a=l=>{l&&l.trigger()};if(Hh(),t==="clear")o.forEach(a);else{const l=jt(i),c=l&&zh(e);if(l&&e==="length"){const u=Number(n);o.forEach((f,d)=>{(d==="length"||d===Wa||!rs(d)&&d>=u)&&a(f)})}else switch((e!==void 0||o.has(void 0))&&a(o.get(e)),c&&a(o.get(Wa)),t){case"add":l?c&&a(o.get("length")):(a(o.get(As)),Mo(i)&&a(o.get(pf)));break;case"delete":l||(a(o.get(As)),Mo(i)&&a(o.get(pf)));break;case"set":Mo(i)&&a(o.get(As));break}}Vh()}function qs(i){const t=xe(i);return t===i?t:(xn(t,"iterate",Wa),Ti(i)?t:t.map(fn))}function $c(i){return xn(i=xe(i),"iterate",Wa),i}const Av={__proto__:null,[Symbol.iterator](){return hu(this,Symbol.iterator,fn)},concat(...i){return qs(this).concat(...i.map(t=>jt(t)?qs(t):t))},entries(){return hu(this,"entries",i=>(i[1]=fn(i[1]),i))},every(i,t){return ir(this,"every",i,t,void 0,arguments)},filter(i,t){return ir(this,"filter",i,t,e=>e.map(fn),arguments)},find(i,t){return ir(this,"find",i,t,fn,arguments)},findIndex(i,t){return ir(this,"findIndex",i,t,void 0,arguments)},findLast(i,t){return ir(this,"findLast",i,t,fn,arguments)},findLastIndex(i,t){return ir(this,"findLastIndex",i,t,void 0,arguments)},forEach(i,t){return ir(this,"forEach",i,t,void 0,arguments)},includes(...i){return du(this,"includes",i)},indexOf(...i){return du(this,"indexOf",i)},join(i){return qs(this).join(i)},lastIndexOf(...i){return du(this,"lastIndexOf",i)},map(i,t){return ir(this,"map",i,t,void 0,arguments)},pop(){return na(this,"pop")},push(...i){return na(this,"push",i)},reduce(i,...t){return Wd(this,"reduce",i,t)},reduceRight(i,...t){return Wd(this,"reduceRight",i,t)},shift(){return na(this,"shift")},some(i,t){return ir(this,"some",i,t,void 0,arguments)},splice(...i){return na(this,"splice",i)},toReversed(){return qs(this).toReversed()},toSorted(i){return qs(this).toSorted(i)},toSpliced(...i){return qs(this).toSpliced(...i)},unshift(...i){return na(this,"unshift",i)},values(){return hu(this,"values",fn)}};function hu(i,t,e){const n=$c(i),r=n[t]();return n!==i&&!Ti(i)&&(r._next=r.next,r.next=()=>{const s=r._next();return s.done||(s.value=e(s.value)),s}),r}const Cv=Array.prototype;function ir(i,t,e,n,r,s){const o=$c(i),a=o!==i&&!Ti(i),l=o[t];if(l!==Cv[t]){const f=l.apply(i,s);return a?fn(f):f}let c=e;o!==i&&(a?c=function(f,d){return e.call(this,fn(f),d,i)}:e.length>2&&(c=function(f,d){return e.call(this,f,d,i)}));const u=l.call(o,c,n);return a&&r?r(u):u}function Wd(i,t,e,n){const r=$c(i);let s=e;return r!==i&&(Ti(i)?e.length>3&&(s=function(o,a,l){return e.call(this,o,a,l,i)}):s=function(o,a,l){return e.call(this,o,fn(a),l,i)}),r[t](s,...n)}function du(i,t,e){const n=xe(i);xn(n,"iterate",Wa);const r=n[t](...e);return(r===-1||r===!1)&&$h(e[0])?(e[0]=xe(e[0]),n[t](...e)):r}function na(i,t,e=[]){Mr(),Hh();const n=xe(i)[t].apply(i,e);return Vh(),Sr(),n}const Rv=Oh("__proto__,__v_isRef,__isVue"),y_=new Set(Object.getOwnPropertyNames(Symbol).filter(i=>i!=="arguments"&&i!=="caller").map(i=>Symbol[i]).filter(rs));function Pv(i){rs(i)||(i=String(i));const t=xe(this);return xn(t,"has",i),t.hasOwnProperty(i)}class M_{constructor(t=!1,e=!1){this._isReadonly=t,this._isShallow=e}get(t,e,n){if(e==="__v_skip")return t.__v_skip;const r=this._isReadonly,s=this._isShallow;if(e==="__v_isReactive")return!r;if(e==="__v_isReadonly")return r;if(e==="__v_isShallow")return s;if(e==="__v_raw")return n===(r?s?kv:T_:s?E_:b_).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(n)?t:void 0;const o=jt(t);if(!r){let l;if(o&&(l=Av[e]))return l;if(e==="hasOwnProperty")return Pv}const a=Reflect.get(t,e,bn(t)?t:n);if((rs(e)?y_.has(e):Rv(e))||(r||xn(t,"get",e),s))return a;if(bn(a)){const l=o&&zh(e)?a:a.value;return r&&Ue(l)?_f(l):l}return Ue(a)?r?_f(a):Yh(a):a}}class S_ extends M_{constructor(t=!1){super(!1,t)}set(t,e,n,r){let s=t[e];if(!this._isShallow){const l=Qr(s);if(!Ti(n)&&!Qr(n)&&(s=xe(s),n=xe(n)),!jt(t)&&bn(s)&&!bn(n))return l||(s.value=n),!0}const o=jt(t)&&zh(e)?Number(e)<t.length:ye(t,e),a=Reflect.set(t,e,n,bn(t)?t:r);return t===xe(r)&&(o?Yr(n,s)&&dr(t,"set",e,n):dr(t,"add",e,n)),a}deleteProperty(t,e){const n=ye(t,e);t[e];const r=Reflect.deleteProperty(t,e);return r&&n&&dr(t,"delete",e,void 0),r}has(t,e){const n=Reflect.has(t,e);return(!rs(e)||!y_.has(e))&&xn(t,"has",e),n}ownKeys(t){return xn(t,"iterate",jt(t)?"length":As),Reflect.ownKeys(t)}}class Dv extends M_{constructor(t=!1){super(!0,t)}set(t,e){return!0}deleteProperty(t,e){return!0}}const Lv=new S_,Iv=new Dv,Uv=new S_(!0);const mf=i=>i,pl=i=>Reflect.getPrototypeOf(i);function Nv(i,t,e){return function(...n){const r=this.__v_raw,s=xe(r),o=Mo(s),a=i==="entries"||i===Symbol.iterator&&o,l=i==="keys"&&o,c=r[i](...n),u=e?mf:t?bc:fn;return!t&&xn(s,"iterate",l?pf:As),{next(){const{value:f,done:d}=c.next();return d?{value:f,done:d}:{value:a?[u(f[0]),u(f[1])]:u(f),done:d}},[Symbol.iterator](){return this}}}}function ml(i){return function(...t){return i==="delete"?!1:i==="clear"?void 0:this}}function Ov(i,t){const e={get(r){const s=this.__v_raw,o=xe(s),a=xe(r);i||(Yr(r,a)&&xn(o,"get",r),xn(o,"get",a));const{has:l}=pl(o),c=t?mf:i?bc:fn;if(l.call(o,r))return c(s.get(r));if(l.call(o,a))return c(s.get(a));s!==o&&s.get(r)},get size(){const r=this.__v_raw;return!i&&xn(xe(r),"iterate",As),r.size},has(r){const s=this.__v_raw,o=xe(s),a=xe(r);return i||(Yr(r,a)&&xn(o,"has",r),xn(o,"has",a)),r===a?s.has(r):s.has(r)||s.has(a)},forEach(r,s){const o=this,a=o.__v_raw,l=xe(a),c=t?mf:i?bc:fn;return!i&&xn(l,"iterate",As),a.forEach((u,f)=>r.call(s,c(u),c(f),o))}};return Hn(e,i?{add:ml("add"),set:ml("set"),delete:ml("delete"),clear:ml("clear")}:{add(r){!t&&!Ti(r)&&!Qr(r)&&(r=xe(r));const s=xe(this);return pl(s).has.call(s,r)||(s.add(r),dr(s,"add",r,r)),this},set(r,s){!t&&!Ti(s)&&!Qr(s)&&(s=xe(s));const o=xe(this),{has:a,get:l}=pl(o);let c=a.call(o,r);c||(r=xe(r),c=a.call(o,r));const u=l.call(o,r);return o.set(r,s),c?Yr(s,u)&&dr(o,"set",r,s):dr(o,"add",r,s),this},delete(r){const s=xe(this),{has:o,get:a}=pl(s);let l=o.call(s,r);l||(r=xe(r),l=o.call(s,r)),a&&a.call(s,r);const c=s.delete(r);return l&&dr(s,"delete",r,void 0),c},clear(){const r=xe(this),s=r.size!==0,o=r.clear();return s&&dr(r,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(r=>{e[r]=Nv(r,i,t)}),e}function Xh(i,t){const e=Ov(i,t);return(n,r,s)=>r==="__v_isReactive"?!i:r==="__v_isReadonly"?i:r==="__v_raw"?n:Reflect.get(ye(e,r)&&r in n?e:n,r,s)}const Fv={get:Xh(!1,!1)},Bv={get:Xh(!1,!0)},zv={get:Xh(!0,!1)};const b_=new WeakMap,E_=new WeakMap,T_=new WeakMap,kv=new WeakMap;function Hv(i){switch(i){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Vv(i){return i.__v_skip||!Object.isExtensible(i)?0:Hv(dv(i))}function Yh(i){return Qr(i)?i:qh(i,!1,Lv,Fv,b_)}function Gv(i){return qh(i,!1,Uv,Bv,E_)}function _f(i){return qh(i,!0,Iv,zv,T_)}function qh(i,t,e,n,r){if(!Ue(i)||i.__v_raw&&!(t&&i.__v_isReactive))return i;const s=Vv(i);if(s===0)return i;const o=r.get(i);if(o)return o;const a=new Proxy(i,s===2?n:e);return r.set(i,a),a}function So(i){return Qr(i)?So(i.__v_raw):!!(i&&i.__v_isReactive)}function Qr(i){return!!(i&&i.__v_isReadonly)}function Ti(i){return!!(i&&i.__v_isShallow)}function $h(i){return i?!!i.__v_raw:!1}function xe(i){const t=i&&i.__v_raw;return t?xe(t):i}function Wv(i){return!ye(i,"__v_skip")&&Object.isExtensible(i)&&l_(i,"__v_skip",!0),i}const fn=i=>Ue(i)?Yh(i):i,bc=i=>Ue(i)?_f(i):i;function bn(i){return i?i.__v_isRef===!0:!1}function jh(i){return Xv(i,!1)}function Xv(i,t){return bn(i)?i:new Yv(i,t)}class Yv{constructor(t,e){this.dep=new Wh,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=e?t:xe(t),this._value=e?t:fn(t),this.__v_isShallow=e}get value(){return this.dep.track(),this._value}set value(t){const e=this._rawValue,n=this.__v_isShallow||Ti(t)||Qr(t);t=n?t:xe(t),Yr(t,e)&&(this._rawValue=t,this._value=n?t:fn(t),this.dep.trigger())}}function qv(i){return bn(i)?i.value:i}const $v={get:(i,t,e)=>t==="__v_raw"?i:qv(Reflect.get(i,t,e)),set:(i,t,e,n)=>{const r=i[t];return bn(r)&&!bn(e)?(r.value=e,!0):Reflect.set(i,t,e,n)}};function w_(i){return So(i)?i:new Proxy(i,$v)}class jv{constructor(t,e,n){this.fn=t,this.setter=e,this._value=void 0,this.dep=new Wh(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=Ga-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!e,this.isSSR=n}notify(){if(this.flags|=16,!(this.flags&8)&&Re!==this)return p_(this,!0),!0}get value(){const t=this.dep.track();return g_(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}}function Kv(i,t,e=!1){let n,r;return ne(i)?n=i:(n=i.get,r=i.set),new jv(n,r,e)}const _l={},Ec=new WeakMap;let _s;function Zv(i,t=!1,e=_s){if(e){let n=Ec.get(e);n||Ec.set(e,n=[]),n.push(i)}}function Jv(i,t,e=Pe){const{immediate:n,deep:r,once:s,scheduler:o,augmentJob:a,call:l}=e,c=v=>r?v:Ti(v)||r===!1||r===0?zr(v,1):zr(v);let u,f,d,h,g=!1,_=!1;if(bn(i)?(f=()=>i.value,g=Ti(i)):So(i)?(f=()=>c(i),g=!0):jt(i)?(_=!0,g=i.some(v=>So(v)||Ti(v)),f=()=>i.map(v=>{if(bn(v))return v.value;if(So(v))return c(v);if(ne(v))return l?l(v,2):v()})):ne(i)?t?f=l?()=>l(i,2):i:f=()=>{if(d){Mr();try{d()}finally{Sr()}}const v=_s;_s=u;try{return l?l(i,3,[h]):i(h)}finally{_s=v}}:f=$i,t&&r){const v=f,R=r===!0?1/0:r;f=()=>zr(v(),R)}const m=Ev(),p=()=>{u.stop(),m&&m.active&&Bh(m.effects,u)};if(s&&t){const v=t;t=(...R)=>{v(...R),p()}}let b=_?new Array(i.length).fill(_l):_l;const E=v=>{if(!(!(u.flags&1)||!u.dirty&&!v))if(t){const R=u.run();if(r||g||(_?R.some((C,A)=>Yr(C,b[A])):Yr(R,b))){d&&d();const C=_s;_s=u;try{const A=[R,b===_l?void 0:_&&b[0]===_l?[]:b,h];b=R,l?l(t,3,A):t(...A)}finally{_s=C}}}else u.run()};return a&&a(E),u=new h_(f),u.scheduler=o?()=>o(E,!1):E,h=v=>Zv(v,!1,u),d=u.onStop=()=>{const v=Ec.get(u);if(v){if(l)l(v,4);else for(const R of v)R();Ec.delete(u)}},t?n?E(!0):b=u.run():o?o(E.bind(null,!0),!0):u.run(),p.pause=u.pause.bind(u),p.resume=u.resume.bind(u),p.stop=p,p}function zr(i,t=1/0,e){if(t<=0||!Ue(i)||i.__v_skip||(e=e||new Map,(e.get(i)||0)>=t))return i;if(e.set(i,t),t--,bn(i))zr(i.value,t,e);else if(jt(i))for(let n=0;n<i.length;n++)zr(i[n],t,e);else if(i_(i)||Mo(i))i.forEach(n=>{zr(n,t,e)});else if(o_(i)){for(const n in i)zr(i[n],t,e);for(const n of Object.getOwnPropertySymbols(i))Object.prototype.propertyIsEnumerable.call(i,n)&&zr(i[n],t,e)}return i}function sl(i,t,e,n){try{return n?i(...n):i()}catch(r){jc(r,t,e)}}function Zi(i,t,e,n){if(ne(i)){const r=sl(i,t,e,n);return r&&r_(r)&&r.catch(s=>{jc(s,t,e)}),r}if(jt(i)){const r=[];for(let s=0;s<i.length;s++)r.push(Zi(i[s],t,e,n));return r}}function jc(i,t,e,n=!0){const r=t?t.vnode:null,{errorHandler:s,throwUnhandledErrorInProduction:o}=t&&t.appContext.config||Pe;if(t){let a=t.parent;const l=t.proxy,c=`https://vuejs.org/error-reference/#runtime-${e}`;for(;a;){const u=a.ec;if(u){for(let f=0;f<u.length;f++)if(u[f](i,l,c)===!1)return}a=a.parent}if(s){Mr(),sl(s,null,10,[i,l,c]),Sr();return}}Qv(i,e,r,n,o)}function Qv(i,t,e,n=!0,r=!1){if(r)throw i;console.error(i)}const Un=[];let Bi=-1;const bo=[];let Or=null,fo=0;const A_=Promise.resolve();let Tc=null;function C_(i){const t=Tc||A_;return i?t.then(this?i.bind(this):i):t}function tx(i){let t=Bi+1,e=Un.length;for(;t<e;){const n=t+e>>>1,r=Un[n],s=Xa(r);s<i||s===i&&r.flags&2?t=n+1:e=n}return t}function Kh(i){if(!(i.flags&1)){const t=Xa(i),e=Un[Un.length-1];!e||!(i.flags&2)&&t>=Xa(e)?Un.push(i):Un.splice(tx(t),0,i),i.flags|=1,R_()}}function R_(){Tc||(Tc=A_.then(D_))}function ex(i){jt(i)?bo.push(...i):Or&&i.id===-1?Or.splice(fo+1,0,i):i.flags&1||(bo.push(i),i.flags|=1),R_()}function Xd(i,t,e=Bi+1){for(;e<Un.length;e++){const n=Un[e];if(n&&n.flags&2){if(i&&n.id!==i.uid)continue;Un.splice(e,1),e--,n.flags&4&&(n.flags&=-2),n(),n.flags&4||(n.flags&=-2)}}}function P_(i){if(bo.length){const t=[...new Set(bo)].sort((e,n)=>Xa(e)-Xa(n));if(bo.length=0,Or){Or.push(...t);return}for(Or=t,fo=0;fo<Or.length;fo++){const e=Or[fo];e.flags&4&&(e.flags&=-2),e.flags&8||e(),e.flags&=-2}Or=null,fo=0}}const Xa=i=>i.id==null?i.flags&2?-1:1/0:i.id;function D_(i){try{for(Bi=0;Bi<Un.length;Bi++){const t=Un[Bi];t&&!(t.flags&8)&&(t.flags&4&&(t.flags&=-2),sl(t,t.i,t.i?15:14),t.flags&4||(t.flags&=-2))}}finally{for(;Bi<Un.length;Bi++){const t=Un[Bi];t&&(t.flags&=-2)}Bi=-1,Un.length=0,P_(),Tc=null,(Un.length||bo.length)&&D_()}}let Wi=null,L_=null;function wc(i){const t=Wi;return Wi=i,L_=i&&i.type.__scopeId||null,t}function nx(i,t=Wi,e){if(!t||i._n)return i;const n=(...r)=>{n._d&&ep(-1);const s=wc(t);let o;try{o=i(...r)}finally{wc(s),n._d&&ep(1)}return o};return n._n=!0,n._c=!0,n._d=!0,n}function os(i,t,e,n){const r=i.dirs,s=t&&t.dirs;for(let o=0;o<r.length;o++){const a=r[o];s&&(a.oldValue=s[o].value);let l=a.dir[n];l&&(Mr(),Zi(l,e,8,[i.el,a,i,t]),Sr())}}const ix=Symbol("_vte"),rx=i=>i.__isTeleport,sx=Symbol("_leaveCb");function Zh(i,t){i.shapeFlag&6&&i.component?(i.transition=t,Zh(i.component.subTree,t)):i.shapeFlag&128?(i.ssContent.transition=t.clone(i.ssContent),i.ssFallback.transition=t.clone(i.ssFallback)):i.transition=t}function I_(i){i.ids=[i.ids[0]+i.ids[2]+++"-",0,0]}const Ac=new WeakMap;function Ta(i,t,e,n,r=!1){if(jt(i)){i.forEach((g,_)=>Ta(g,t&&(jt(t)?t[_]:t),e,n,r));return}if(wa(n)&&!r){n.shapeFlag&512&&n.type.__asyncResolved&&n.component.subTree.component&&Ta(i,t,e,n.component.subTree);return}const s=n.shapeFlag&4?ed(n.component):n.el,o=r?null:s,{i:a,r:l}=i,c=t&&t.r,u=a.refs===Pe?a.refs={}:a.refs,f=a.setupState,d=xe(f),h=f===Pe?n_:g=>ye(d,g);if(c!=null&&c!==l){if(Yd(t),je(c))u[c]=null,h(c)&&(f[c]=null);else if(bn(c)){c.value=null;const g=t;g.k&&(u[g.k]=null)}}if(ne(l))sl(l,a,12,[o,u]);else{const g=je(l),_=bn(l);if(g||_){const m=()=>{if(i.f){const p=g?h(l)?f[l]:u[l]:l.value;if(r)jt(p)&&Bh(p,s);else if(jt(p))p.includes(s)||p.push(s);else if(g)u[l]=[s],h(l)&&(f[l]=u[l]);else{const b=[s];l.value=b,i.k&&(u[i.k]=b)}}else g?(u[l]=o,h(l)&&(f[l]=o)):_&&(l.value=o,i.k&&(u[i.k]=o))};if(o){const p=()=>{m(),Ac.delete(i)};p.id=-1,Ac.set(i,p),ni(p,e)}else Yd(i),m()}}}function Yd(i){const t=Ac.get(i);t&&(t.flags|=8,Ac.delete(i))}qc().requestIdleCallback;qc().cancelIdleCallback;const wa=i=>!!i.type.__asyncLoader,U_=i=>i.type.__isKeepAlive;function ox(i,t){N_(i,"a",t)}function ax(i,t){N_(i,"da",t)}function N_(i,t,e=On){const n=i.__wdc||(i.__wdc=()=>{let r=e;for(;r;){if(r.isDeactivated)return;r=r.parent}return i()});if(Kc(t,n,e),e){let r=e.parent;for(;r&&r.parent;)U_(r.parent.vnode)&&lx(n,t,e,r),r=r.parent}}function lx(i,t,e,n){const r=Kc(t,i,n,!0);ol(()=>{Bh(n[t],r)},e)}function Kc(i,t,e=On,n=!1){if(e){const r=e[i]||(e[i]=[]),s=t.__weh||(t.__weh=(...o)=>{Mr();const a=al(e),l=Zi(t,e,i,o);return a(),Sr(),l});return n?r.unshift(s):r.push(s),s}}const wr=i=>(t,e=On)=>{(!qa||i==="sp")&&Kc(i,(...n)=>t(...n),e)},cx=wr("bm"),Ko=wr("m"),ux=wr("bu"),fx=wr("u"),hx=wr("bum"),ol=wr("um"),dx=wr("sp"),px=wr("rtg"),mx=wr("rtc");function _x(i,t=On){Kc("ec",i,t)}const gx=Symbol.for("v-ndc");function Ns(i,t,e,n){let r;const s=e,o=jt(i);if(o||je(i)){const a=o&&So(i);let l=!1,c=!1;a&&(l=!Ti(i),c=Qr(i),i=$c(i)),r=new Array(i.length);for(let u=0,f=i.length;u<f;u++)r[u]=t(l?c?bc(fn(i[u])):fn(i[u]):i[u],u,void 0,s)}else if(typeof i=="number"){r=new Array(i);for(let a=0;a<i;a++)r[a]=t(a+1,a,void 0,s)}else if(Ue(i))if(i[Symbol.iterator])r=Array.from(i,(a,l)=>t(a,l,void 0,s));else{const a=Object.keys(i);r=new Array(a.length);for(let l=0,c=a.length;l<c;l++){const u=a[l];r[l]=t(i[u],u,l,s)}}else r=[];return r}const gf=i=>i?ig(i)?ed(i):gf(i.parent):null,Aa=Hn(Object.create(null),{$:i=>i,$el:i=>i.vnode.el,$data:i=>i.data,$props:i=>i.props,$attrs:i=>i.attrs,$slots:i=>i.slots,$refs:i=>i.refs,$parent:i=>gf(i.parent),$root:i=>gf(i.root),$host:i=>i.ce,$emit:i=>i.emit,$options:i=>F_(i),$forceUpdate:i=>i.f||(i.f=()=>{Kh(i.update)}),$nextTick:i=>i.n||(i.n=C_.bind(i.proxy)),$watch:i=>zx.bind(i)}),pu=(i,t)=>i!==Pe&&!i.__isScriptSetup&&ye(i,t),vx={get({_:i},t){if(t==="__v_skip")return!0;const{ctx:e,setupState:n,data:r,props:s,accessCache:o,type:a,appContext:l}=i;let c;if(t[0]!=="$"){const h=o[t];if(h!==void 0)switch(h){case 1:return n[t];case 2:return r[t];case 4:return e[t];case 3:return s[t]}else{if(pu(n,t))return o[t]=1,n[t];if(r!==Pe&&ye(r,t))return o[t]=2,r[t];if((c=i.propsOptions[0])&&ye(c,t))return o[t]=3,s[t];if(e!==Pe&&ye(e,t))return o[t]=4,e[t];vf&&(o[t]=0)}}const u=Aa[t];let f,d;if(u)return t==="$attrs"&&xn(i.attrs,"get",""),u(i);if((f=a.__cssModules)&&(f=f[t]))return f;if(e!==Pe&&ye(e,t))return o[t]=4,e[t];if(d=l.config.globalProperties,ye(d,t))return d[t]},set({_:i},t,e){const{data:n,setupState:r,ctx:s}=i;return pu(r,t)?(r[t]=e,!0):n!==Pe&&ye(n,t)?(n[t]=e,!0):ye(i.props,t)||t[0]==="$"&&t.slice(1)in i?!1:(s[t]=e,!0)},has({_:{data:i,setupState:t,accessCache:e,ctx:n,appContext:r,propsOptions:s,type:o}},a){let l,c;return!!(e[a]||i!==Pe&&a[0]!=="$"&&ye(i,a)||pu(t,a)||(l=s[0])&&ye(l,a)||ye(n,a)||ye(Aa,a)||ye(r.config.globalProperties,a)||(c=o.__cssModules)&&c[a])},defineProperty(i,t,e){return e.get!=null?i._.accessCache[t]=0:ye(e,"value")&&this.set(i,t,e.value,null),Reflect.defineProperty(i,t,e)}};function qd(i){return jt(i)?i.reduce((t,e)=>(t[e]=null,t),{}):i}let vf=!0;function xx(i){const t=F_(i),e=i.proxy,n=i.ctx;vf=!1,t.beforeCreate&&$d(t.beforeCreate,i,"bc");const{data:r,computed:s,methods:o,watch:a,provide:l,inject:c,created:u,beforeMount:f,mounted:d,beforeUpdate:h,updated:g,activated:_,deactivated:m,beforeDestroy:p,beforeUnmount:b,destroyed:E,unmounted:v,render:R,renderTracked:C,renderTriggered:A,errorCaptured:L,serverPrefetch:S,expose:y,inheritAttrs:I,components:B,directives:G,filters:Y}=t;if(c&&yx(c,n,null),o)for(const K in o){const k=o[K];ne(k)&&(n[K]=k.bind(e))}if(r){const K=r.call(e,e);Ue(K)&&(i.data=Yh(K))}if(vf=!0,s)for(const K in s){const k=s[K],lt=ne(k)?k.bind(e,e):ne(k.get)?k.get.bind(e,e):$i,N=!ne(k)&&ne(k.set)?k.set.bind(e):$i,_t=ly({get:lt,set:N});Object.defineProperty(n,K,{enumerable:!0,configurable:!0,get:()=>_t.value,set:Dt=>_t.value=Dt})}if(a)for(const K in a)O_(a[K],n,e,K);if(l){const K=ne(l)?l.call(e):l;Reflect.ownKeys(K).forEach(k=>{wx(k,K[k])})}u&&$d(u,i,"c");function V(K,k){jt(k)?k.forEach(lt=>K(lt.bind(e))):k&&K(k.bind(e))}if(V(cx,f),V(Ko,d),V(ux,h),V(fx,g),V(ox,_),V(ax,m),V(_x,L),V(mx,C),V(px,A),V(hx,b),V(ol,v),V(dx,S),jt(y))if(y.length){const K=i.exposed||(i.exposed={});y.forEach(k=>{Object.defineProperty(K,k,{get:()=>e[k],set:lt=>e[k]=lt,enumerable:!0})})}else i.exposed||(i.exposed={});R&&i.render===$i&&(i.render=R),I!=null&&(i.inheritAttrs=I),B&&(i.components=B),G&&(i.directives=G),S&&I_(i)}function yx(i,t,e=$i){jt(i)&&(i=xf(i));for(const n in i){const r=i[n];let s;Ue(r)?"default"in r?s=nc(r.from||n,r.default,!0):s=nc(r.from||n):s=nc(r),bn(s)?Object.defineProperty(t,n,{enumerable:!0,configurable:!0,get:()=>s.value,set:o=>s.value=o}):t[n]=s}}function $d(i,t,e){Zi(jt(i)?i.map(n=>n.bind(t.proxy)):i.bind(t.proxy),t,e)}function O_(i,t,e,n){let r=n.includes(".")?K_(e,n):()=>e[n];if(je(i)){const s=t[i];ne(s)&&ic(r,s)}else if(ne(i))ic(r,i.bind(e));else if(Ue(i))if(jt(i))i.forEach(s=>O_(s,t,e,n));else{const s=ne(i.handler)?i.handler.bind(e):t[i.handler];ne(s)&&ic(r,s,i)}}function F_(i){const t=i.type,{mixins:e,extends:n}=t,{mixins:r,optionsCache:s,config:{optionMergeStrategies:o}}=i.appContext,a=s.get(t);let l;return a?l=a:!r.length&&!e&&!n?l=t:(l={},r.length&&r.forEach(c=>Cc(l,c,o,!0)),Cc(l,t,o)),Ue(t)&&s.set(t,l),l}function Cc(i,t,e,n=!1){const{mixins:r,extends:s}=t;s&&Cc(i,s,e,!0),r&&r.forEach(o=>Cc(i,o,e,!0));for(const o in t)if(!(n&&o==="expose")){const a=Mx[o]||e&&e[o];i[o]=a?a(i[o],t[o]):t[o]}return i}const Mx={data:jd,props:Kd,emits:Kd,methods:ha,computed:ha,beforeCreate:An,created:An,beforeMount:An,mounted:An,beforeUpdate:An,updated:An,beforeDestroy:An,beforeUnmount:An,destroyed:An,unmounted:An,activated:An,deactivated:An,errorCaptured:An,serverPrefetch:An,components:ha,directives:ha,watch:bx,provide:jd,inject:Sx};function jd(i,t){return t?i?function(){return Hn(ne(i)?i.call(this,this):i,ne(t)?t.call(this,this):t)}:t:i}function Sx(i,t){return ha(xf(i),xf(t))}function xf(i){if(jt(i)){const t={};for(let e=0;e<i.length;e++)t[i[e]]=i[e];return t}return i}function An(i,t){return i?[...new Set([].concat(i,t))]:t}function ha(i,t){return i?Hn(Object.create(null),i,t):t}function Kd(i,t){return i?jt(i)&&jt(t)?[...new Set([...i,...t])]:Hn(Object.create(null),qd(i),qd(t??{})):t}function bx(i,t){if(!i)return t;if(!t)return i;const e=Hn(Object.create(null),i);for(const n in t)e[n]=An(i[n],t[n]);return e}function B_(){return{app:null,config:{isNativeTag:n_,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Ex=0;function Tx(i,t){return function(n,r=null){ne(n)||(n=Hn({},n)),r!=null&&!Ue(r)&&(r=null);const s=B_(),o=new WeakSet,a=[];let l=!1;const c=s.app={_uid:Ex++,_component:n,_props:r,_container:null,_context:s,_instance:null,version:cy,get config(){return s.config},set config(u){},use(u,...f){return o.has(u)||(u&&ne(u.install)?(o.add(u),u.install(c,...f)):ne(u)&&(o.add(u),u(c,...f))),c},mixin(u){return s.mixins.includes(u)||s.mixins.push(u),c},component(u,f){return f?(s.components[u]=f,c):s.components[u]},directive(u,f){return f?(s.directives[u]=f,c):s.directives[u]},mount(u,f,d){if(!l){const h=c._ceVNode||ln(n,r);return h.appContext=s,d===!0?d="svg":d===!1&&(d=void 0),i(h,u,d),l=!0,c._container=u,u.__vue_app__=c,ed(h.component)}},onUnmount(u){a.push(u)},unmount(){l&&(Zi(a,c._instance,16),i(null,c._container),delete c._container.__vue_app__)},provide(u,f){return s.provides[u]=f,c},runWithContext(u){const f=Eo;Eo=c;try{return u()}finally{Eo=f}}};return c}}let Eo=null;function wx(i,t){if(On){let e=On.provides;const n=On.parent&&On.parent.provides;n===e&&(e=On.provides=Object.create(n)),e[i]=t}}function nc(i,t,e=!1){const n=ny();if(n||Eo){let r=Eo?Eo._context.provides:n?n.parent==null||n.ce?n.vnode.appContext&&n.vnode.appContext.provides:n.parent.provides:void 0;if(r&&i in r)return r[i];if(arguments.length>1)return e&&ne(t)?t.call(n&&n.proxy):t}}const z_={},k_=()=>Object.create(z_),H_=i=>Object.getPrototypeOf(i)===z_;function Ax(i,t,e,n=!1){const r={},s=k_();i.propsDefaults=Object.create(null),V_(i,t,r,s);for(const o in i.propsOptions[0])o in r||(r[o]=void 0);e?i.props=n?r:Gv(r):i.type.props?i.props=r:i.props=s,i.attrs=s}function Cx(i,t,e,n){const{props:r,attrs:s,vnode:{patchFlag:o}}=i,a=xe(r),[l]=i.propsOptions;let c=!1;if((n||o>0)&&!(o&16)){if(o&8){const u=i.vnode.dynamicProps;for(let f=0;f<u.length;f++){let d=u[f];if(Zc(i.emitsOptions,d))continue;const h=t[d];if(l)if(ye(s,d))h!==s[d]&&(s[d]=h,c=!0);else{const g=Jr(d);r[g]=yf(l,a,g,h,i,!1)}else h!==s[d]&&(s[d]=h,c=!0)}}}else{V_(i,t,r,s)&&(c=!0);let u;for(const f in a)(!t||!ye(t,f)&&((u=Gs(f))===f||!ye(t,u)))&&(l?e&&(e[f]!==void 0||e[u]!==void 0)&&(r[f]=yf(l,a,f,void 0,i,!0)):delete r[f]);if(s!==a)for(const f in s)(!t||!ye(t,f))&&(delete s[f],c=!0)}c&&dr(i.attrs,"set","")}function V_(i,t,e,n){const[r,s]=i.propsOptions;let o=!1,a;if(t)for(let l in t){if(Sa(l))continue;const c=t[l];let u;r&&ye(r,u=Jr(l))?!s||!s.includes(u)?e[u]=c:(a||(a={}))[u]=c:Zc(i.emitsOptions,l)||(!(l in n)||c!==n[l])&&(n[l]=c,o=!0)}if(s){const l=xe(e),c=a||Pe;for(let u=0;u<s.length;u++){const f=s[u];e[f]=yf(r,l,f,c[f],i,!ye(c,f))}}return o}function yf(i,t,e,n,r,s){const o=i[e];if(o!=null){const a=ye(o,"default");if(a&&n===void 0){const l=o.default;if(o.type!==Function&&!o.skipFactory&&ne(l)){const{propsDefaults:c}=r;if(e in c)n=c[e];else{const u=al(r);n=c[e]=l.call(null,t),u()}}else n=l;r.ce&&r.ce._setProp(e,n)}o[0]&&(s&&!a?n=!1:o[1]&&(n===""||n===Gs(e))&&(n=!0))}return n}const Rx=new WeakMap;function G_(i,t,e=!1){const n=e?Rx:t.propsCache,r=n.get(i);if(r)return r;const s=i.props,o={},a=[];let l=!1;if(!ne(i)){const u=f=>{l=!0;const[d,h]=G_(f,t,!0);Hn(o,d),h&&a.push(...h)};!e&&t.mixins.length&&t.mixins.forEach(u),i.extends&&u(i.extends),i.mixins&&i.mixins.forEach(u)}if(!s&&!l)return Ue(i)&&n.set(i,yo),yo;if(jt(s))for(let u=0;u<s.length;u++){const f=Jr(s[u]);Zd(f)&&(o[f]=Pe)}else if(s)for(const u in s){const f=Jr(u);if(Zd(f)){const d=s[u],h=o[f]=jt(d)||ne(d)?{type:d}:Hn({},d),g=h.type;let _=!1,m=!0;if(jt(g))for(let p=0;p<g.length;++p){const b=g[p],E=ne(b)&&b.name;if(E==="Boolean"){_=!0;break}else E==="String"&&(m=!1)}else _=ne(g)&&g.name==="Boolean";h[0]=_,h[1]=m,(_||ye(h,"default"))&&a.push(f)}}const c=[o,a];return Ue(i)&&n.set(i,c),c}function Zd(i){return i[0]!=="$"&&!Sa(i)}const Jh=i=>i==="_"||i==="_ctx"||i==="$stable",Qh=i=>jt(i)?i.map(Hi):[Hi(i)],Px=(i,t,e)=>{if(t._n)return t;const n=nx((...r)=>Qh(t(...r)),e);return n._c=!1,n},W_=(i,t,e)=>{const n=i._ctx;for(const r in i){if(Jh(r))continue;const s=i[r];if(ne(s))t[r]=Px(r,s,n);else if(s!=null){const o=Qh(s);t[r]=()=>o}}},X_=(i,t)=>{const e=Qh(t);i.slots.default=()=>e},Y_=(i,t,e)=>{for(const n in t)(e||!Jh(n))&&(i[n]=t[n])},Dx=(i,t,e)=>{const n=i.slots=k_();if(i.vnode.shapeFlag&32){const r=t._;r?(Y_(n,t,e),e&&l_(n,"_",r,!0)):W_(t,n)}else t&&X_(i,t)},Lx=(i,t,e)=>{const{vnode:n,slots:r}=i;let s=!0,o=Pe;if(n.shapeFlag&32){const a=t._;a?e&&a===1?s=!1:Y_(r,t,e):(s=!t.$stable,W_(t,r)),o=t}else t&&(X_(i,t),o={default:1});if(s)for(const a in r)!Jh(a)&&o[a]==null&&delete r[a]},ni=qx;function Ix(i){return Ux(i)}function Ux(i,t){const e=qc();e.__VUE__=!0;const{insert:n,remove:r,patchProp:s,createElement:o,createText:a,createComment:l,setText:c,setElementText:u,parentNode:f,nextSibling:d,setScopeId:h=$i,insertStaticContent:g}=i,_=(P,U,w,rt=null,J=null,D=null,nt=void 0,ot=null,Q=!!U.dynamicChildren)=>{if(P===U)return;P&&!ia(P,U)&&(rt=ht(P),Dt(P,J,D,!0),P=null),U.patchFlag===-2&&(Q=!1,U.dynamicChildren=null);const{type:M,ref:x,shapeFlag:O}=U;switch(M){case Jc:m(P,U,w,rt);break;case No:p(P,U,w,rt);break;case rc:P==null&&b(U,w,rt,nt);break;case yn:B(P,U,w,rt,J,D,nt,ot,Q);break;default:O&1?R(P,U,w,rt,J,D,nt,ot,Q):O&6?G(P,U,w,rt,J,D,nt,ot,Q):(O&64||O&128)&&M.process(P,U,w,rt,J,D,nt,ot,Q,kt)}x!=null&&J?Ta(x,P&&P.ref,D,U||P,!U):x==null&&P&&P.ref!=null&&Ta(P.ref,null,D,P,!0)},m=(P,U,w,rt)=>{if(P==null)n(U.el=a(U.children),w,rt);else{const J=U.el=P.el;U.children!==P.children&&c(J,U.children)}},p=(P,U,w,rt)=>{P==null?n(U.el=l(U.children||""),w,rt):U.el=P.el},b=(P,U,w,rt)=>{[P.el,P.anchor]=g(P.children,U,w,rt,P.el,P.anchor)},E=({el:P,anchor:U},w,rt)=>{let J;for(;P&&P!==U;)J=d(P),n(P,w,rt),P=J;n(U,w,rt)},v=({el:P,anchor:U})=>{let w;for(;P&&P!==U;)w=d(P),r(P),P=w;r(U)},R=(P,U,w,rt,J,D,nt,ot,Q)=>{U.type==="svg"?nt="svg":U.type==="math"&&(nt="mathml"),P==null?C(U,w,rt,J,D,nt,ot,Q):S(P,U,J,D,nt,ot,Q)},C=(P,U,w,rt,J,D,nt,ot)=>{let Q,M;const{props:x,shapeFlag:O,transition:W,dirs:X}=P;if(Q=P.el=o(P.type,D,x&&x.is,x),O&8?u(Q,P.children):O&16&&L(P.children,Q,null,rt,J,mu(P,D),nt,ot),X&&os(P,null,rt,"created"),A(Q,P,P.scopeId,nt,rt),x){for(const ct in x)ct!=="value"&&!Sa(ct)&&s(Q,ct,null,x[ct],D,rt);"value"in x&&s(Q,"value",null,x.value,D),(M=x.onVnodeBeforeMount)&&Fi(M,rt,P)}X&&os(P,null,rt,"beforeMount");const j=Nx(J,W);j&&W.beforeEnter(Q),n(Q,U,w),((M=x&&x.onVnodeMounted)||j||X)&&ni(()=>{M&&Fi(M,rt,P),j&&W.enter(Q),X&&os(P,null,rt,"mounted")},J)},A=(P,U,w,rt,J)=>{if(w&&h(P,w),rt)for(let D=0;D<rt.length;D++)h(P,rt[D]);if(J){let D=J.subTree;if(U===D||J_(D.type)&&(D.ssContent===U||D.ssFallback===U)){const nt=J.vnode;A(P,nt,nt.scopeId,nt.slotScopeIds,J.parent)}}},L=(P,U,w,rt,J,D,nt,ot,Q=0)=>{for(let M=Q;M<P.length;M++){const x=P[M]=ot?Fr(P[M]):Hi(P[M]);_(null,x,U,w,rt,J,D,nt,ot)}},S=(P,U,w,rt,J,D,nt)=>{const ot=U.el=P.el;let{patchFlag:Q,dynamicChildren:M,dirs:x}=U;Q|=P.patchFlag&16;const O=P.props||Pe,W=U.props||Pe;let X;if(w&&as(w,!1),(X=W.onVnodeBeforeUpdate)&&Fi(X,w,U,P),x&&os(U,P,w,"beforeUpdate"),w&&as(w,!0),(O.innerHTML&&W.innerHTML==null||O.textContent&&W.textContent==null)&&u(ot,""),M?y(P.dynamicChildren,M,ot,w,rt,mu(U,J),D):nt||k(P,U,ot,null,w,rt,mu(U,J),D,!1),Q>0){if(Q&16)I(ot,O,W,w,J);else if(Q&2&&O.class!==W.class&&s(ot,"class",null,W.class,J),Q&4&&s(ot,"style",O.style,W.style,J),Q&8){const j=U.dynamicProps;for(let ct=0;ct<j.length;ct++){const at=j[ct],pt=O[at],Ft=W[at];(Ft!==pt||at==="value")&&s(ot,at,pt,Ft,J,w)}}Q&1&&P.children!==U.children&&u(ot,U.children)}else!nt&&M==null&&I(ot,O,W,w,J);((X=W.onVnodeUpdated)||x)&&ni(()=>{X&&Fi(X,w,U,P),x&&os(U,P,w,"updated")},rt)},y=(P,U,w,rt,J,D,nt)=>{for(let ot=0;ot<U.length;ot++){const Q=P[ot],M=U[ot],x=Q.el&&(Q.type===yn||!ia(Q,M)||Q.shapeFlag&198)?f(Q.el):w;_(Q,M,x,null,rt,J,D,nt,!0)}},I=(P,U,w,rt,J)=>{if(U!==w){if(U!==Pe)for(const D in U)!Sa(D)&&!(D in w)&&s(P,D,U[D],null,J,rt);for(const D in w){if(Sa(D))continue;const nt=w[D],ot=U[D];nt!==ot&&D!=="value"&&s(P,D,ot,nt,J,rt)}"value"in w&&s(P,"value",U.value,w.value,J)}},B=(P,U,w,rt,J,D,nt,ot,Q)=>{const M=U.el=P?P.el:a(""),x=U.anchor=P?P.anchor:a("");let{patchFlag:O,dynamicChildren:W,slotScopeIds:X}=U;X&&(ot=ot?ot.concat(X):X),P==null?(n(M,w,rt),n(x,w,rt),L(U.children||[],w,x,J,D,nt,ot,Q)):O>0&&O&64&&W&&P.dynamicChildren?(y(P.dynamicChildren,W,w,J,D,nt,ot),(U.key!=null||J&&U===J.subTree)&&q_(P,U,!0)):k(P,U,w,x,J,D,nt,ot,Q)},G=(P,U,w,rt,J,D,nt,ot,Q)=>{U.slotScopeIds=ot,P==null?U.shapeFlag&512?J.ctx.activate(U,w,rt,nt,Q):Y(U,w,rt,J,D,nt,Q):et(P,U,Q)},Y=(P,U,w,rt,J,D,nt)=>{const ot=P.component=ey(P,rt,J);if(U_(P)&&(ot.ctx.renderer=kt),iy(ot,!1,nt),ot.asyncDep){if(J&&J.registerDep(ot,V,nt),!P.el){const Q=ot.subTree=ln(No);p(null,Q,U,w),P.placeholder=Q.el}}else V(ot,P,U,w,J,D,nt)},et=(P,U,w)=>{const rt=U.component=P.component;if(Xx(P,U,w))if(rt.asyncDep&&!rt.asyncResolved){K(rt,U,w);return}else rt.next=U,rt.update();else U.el=P.el,rt.vnode=U},V=(P,U,w,rt,J,D,nt)=>{const ot=()=>{if(P.isMounted){let{next:O,bu:W,u:X,parent:j,vnode:ct}=P;{const dt=$_(P);if(dt){O&&(O.el=ct.el,K(P,O,nt)),dt.asyncDep.then(()=>{P.isUnmounted||ot()});return}}let at=O,pt;as(P,!1),O?(O.el=ct.el,K(P,O,nt)):O=ct,W&&cu(W),(pt=O.props&&O.props.onVnodeBeforeUpdate)&&Fi(pt,j,O,ct),as(P,!0);const Ft=Qd(P),ft=P.subTree;P.subTree=Ft,_(ft,Ft,f(ft.el),ht(ft),P,J,D),O.el=Ft.el,at===null&&Yx(P,Ft.el),X&&ni(X,J),(pt=O.props&&O.props.onVnodeUpdated)&&ni(()=>Fi(pt,j,O,ct),J)}else{let O;const{el:W,props:X}=U,{bm:j,m:ct,parent:at,root:pt,type:Ft}=P,ft=wa(U);as(P,!1),j&&cu(j),!ft&&(O=X&&X.onVnodeBeforeMount)&&Fi(O,at,U),as(P,!0);{pt.ce&&pt.ce._def.shadowRoot!==!1&&pt.ce._injectChildStyle(Ft);const dt=P.subTree=Qd(P);_(null,dt,w,rt,P,J,D),U.el=dt.el}if(ct&&ni(ct,J),!ft&&(O=X&&X.onVnodeMounted)){const dt=U;ni(()=>Fi(O,at,dt),J)}(U.shapeFlag&256||at&&wa(at.vnode)&&at.vnode.shapeFlag&256)&&P.a&&ni(P.a,J),P.isMounted=!0,U=w=rt=null}};P.scope.on();const Q=P.effect=new h_(ot);P.scope.off();const M=P.update=Q.run.bind(Q),x=P.job=Q.runIfDirty.bind(Q);x.i=P,x.id=P.uid,Q.scheduler=()=>Kh(x),as(P,!0),M()},K=(P,U,w)=>{U.component=P;const rt=P.vnode.props;P.vnode=U,P.next=null,Cx(P,U.props,rt,w),Lx(P,U.children,w),Mr(),Xd(P),Sr()},k=(P,U,w,rt,J,D,nt,ot,Q=!1)=>{const M=P&&P.children,x=P?P.shapeFlag:0,O=U.children,{patchFlag:W,shapeFlag:X}=U;if(W>0){if(W&128){N(M,O,w,rt,J,D,nt,ot,Q);return}else if(W&256){lt(M,O,w,rt,J,D,nt,ot,Q);return}}X&8?(x&16&&Mt(M,J,D),O!==M&&u(w,O)):x&16?X&16?N(M,O,w,rt,J,D,nt,ot,Q):Mt(M,J,D,!0):(x&8&&u(w,""),X&16&&L(O,w,rt,J,D,nt,ot,Q))},lt=(P,U,w,rt,J,D,nt,ot,Q)=>{P=P||yo,U=U||yo;const M=P.length,x=U.length,O=Math.min(M,x);let W;for(W=0;W<O;W++){const X=U[W]=Q?Fr(U[W]):Hi(U[W]);_(P[W],X,w,null,J,D,nt,ot,Q)}M>x?Mt(P,J,D,!0,!1,O):L(U,w,rt,J,D,nt,ot,Q,O)},N=(P,U,w,rt,J,D,nt,ot,Q)=>{let M=0;const x=U.length;let O=P.length-1,W=x-1;for(;M<=O&&M<=W;){const X=P[M],j=U[M]=Q?Fr(U[M]):Hi(U[M]);if(ia(X,j))_(X,j,w,null,J,D,nt,ot,Q);else break;M++}for(;M<=O&&M<=W;){const X=P[O],j=U[W]=Q?Fr(U[W]):Hi(U[W]);if(ia(X,j))_(X,j,w,null,J,D,nt,ot,Q);else break;O--,W--}if(M>O){if(M<=W){const X=W+1,j=X<x?U[X].el:rt;for(;M<=W;)_(null,U[M]=Q?Fr(U[M]):Hi(U[M]),w,j,J,D,nt,ot,Q),M++}}else if(M>W)for(;M<=O;)Dt(P[M],J,D,!0),M++;else{const X=M,j=M,ct=new Map;for(M=j;M<=W;M++){const xt=U[M]=Q?Fr(U[M]):Hi(U[M]);xt.key!=null&&ct.set(xt.key,M)}let at,pt=0;const Ft=W-j+1;let ft=!1,dt=0;const Ot=new Array(Ft);for(M=0;M<Ft;M++)Ot[M]=0;for(M=X;M<=O;M++){const xt=P[M];if(pt>=Ft){Dt(xt,J,D,!0);continue}let Ht;if(xt.key!=null)Ht=ct.get(xt.key);else for(at=j;at<=W;at++)if(Ot[at-j]===0&&ia(xt,U[at])){Ht=at;break}Ht===void 0?Dt(xt,J,D,!0):(Ot[Ht-j]=M+1,Ht>=dt?dt=Ht:ft=!0,_(xt,U[Ht],w,null,J,D,nt,ot,Q),pt++)}const Bt=ft?Ox(Ot):yo;for(at=Bt.length-1,M=Ft-1;M>=0;M--){const xt=j+M,Ht=U[xt],Vt=U[xt+1],ce=xt+1<x?Vt.el||Vt.placeholder:rt;Ot[M]===0?_(null,Ht,w,ce,J,D,nt,ot,Q):ft&&(at<0||M!==Bt[at]?_t(Ht,w,ce,2):at--)}}},_t=(P,U,w,rt,J=null)=>{const{el:D,type:nt,transition:ot,children:Q,shapeFlag:M}=P;if(M&6){_t(P.component.subTree,U,w,rt);return}if(M&128){P.suspense.move(U,w,rt);return}if(M&64){nt.move(P,U,w,kt);return}if(nt===yn){n(D,U,w);for(let O=0;O<Q.length;O++)_t(Q[O],U,w,rt);n(P.anchor,U,w);return}if(nt===rc){E(P,U,w);return}if(rt!==2&&M&1&&ot)if(rt===0)ot.beforeEnter(D),n(D,U,w),ni(()=>ot.enter(D),J);else{const{leave:O,delayLeave:W,afterLeave:X}=ot,j=()=>{P.ctx.isUnmounted?r(D):n(D,U,w)},ct=()=>{D._isLeaving&&D[sx](!0),O(D,()=>{j(),X&&X()})};W?W(D,j,ct):ct()}else n(D,U,w)},Dt=(P,U,w,rt=!1,J=!1)=>{const{type:D,props:nt,ref:ot,children:Q,dynamicChildren:M,shapeFlag:x,patchFlag:O,dirs:W,cacheIndex:X}=P;if(O===-2&&(J=!1),ot!=null&&(Mr(),Ta(ot,null,w,P,!0),Sr()),X!=null&&(U.renderCache[X]=void 0),x&256){U.ctx.deactivate(P);return}const j=x&1&&W,ct=!wa(P);let at;if(ct&&(at=nt&&nt.onVnodeBeforeUnmount)&&Fi(at,U,P),x&6)ut(P.component,w,rt);else{if(x&128){P.suspense.unmount(w,rt);return}j&&os(P,null,U,"beforeUnmount"),x&64?P.type.remove(P,U,w,kt,rt):M&&!M.hasOnce&&(D!==yn||O>0&&O&64)?Mt(M,U,w,!1,!0):(D===yn&&O&384||!J&&x&16)&&Mt(Q,U,w),rt&&Kt(P)}(ct&&(at=nt&&nt.onVnodeUnmounted)||j)&&ni(()=>{at&&Fi(at,U,P),j&&os(P,null,U,"unmounted")},w)},Kt=P=>{const{type:U,el:w,anchor:rt,transition:J}=P;if(U===yn){it(w,rt);return}if(U===rc){v(P);return}const D=()=>{r(w),J&&!J.persisted&&J.afterLeave&&J.afterLeave()};if(P.shapeFlag&1&&J&&!J.persisted){const{leave:nt,delayLeave:ot}=J,Q=()=>nt(w,D);ot?ot(P.el,D,Q):Q()}else D()},it=(P,U)=>{let w;for(;P!==U;)w=d(P),r(P),P=w;r(U)},ut=(P,U,w)=>{const{bum:rt,scope:J,job:D,subTree:nt,um:ot,m:Q,a:M}=P;Jd(Q),Jd(M),rt&&cu(rt),J.stop(),D&&(D.flags|=8,Dt(nt,P,U,w)),ot&&ni(ot,U),ni(()=>{P.isUnmounted=!0},U)},Mt=(P,U,w,rt=!1,J=!1,D=0)=>{for(let nt=D;nt<P.length;nt++)Dt(P[nt],U,w,rt,J)},ht=P=>{if(P.shapeFlag&6)return ht(P.component.subTree);if(P.shapeFlag&128)return P.suspense.next();const U=d(P.anchor||P.el),w=U&&U[ix];return w?d(w):U};let Rt=!1;const It=(P,U,w)=>{P==null?U._vnode&&Dt(U._vnode,null,null,!0):_(U._vnode||null,P,U,null,null,null,w),U._vnode=P,Rt||(Rt=!0,Xd(),P_(),Rt=!1)},kt={p:_,um:Dt,m:_t,r:Kt,mt:Y,mc:L,pc:k,pbc:y,n:ht,o:i};return{render:It,hydrate:void 0,createApp:Tx(It)}}function mu({type:i,props:t},e){return e==="svg"&&i==="foreignObject"||e==="mathml"&&i==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:e}function as({effect:i,job:t},e){e?(i.flags|=32,t.flags|=4):(i.flags&=-33,t.flags&=-5)}function Nx(i,t){return(!i||i&&!i.pendingBranch)&&t&&!t.persisted}function q_(i,t,e=!1){const n=i.children,r=t.children;if(jt(n)&&jt(r))for(let s=0;s<n.length;s++){const o=n[s];let a=r[s];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=r[s]=Fr(r[s]),a.el=o.el),!e&&a.patchFlag!==-2&&q_(o,a)),a.type===Jc&&a.patchFlag!==-1&&(a.el=o.el),a.type===No&&!a.el&&(a.el=o.el)}}function Ox(i){const t=i.slice(),e=[0];let n,r,s,o,a;const l=i.length;for(n=0;n<l;n++){const c=i[n];if(c!==0){if(r=e[e.length-1],i[r]<c){t[n]=r,e.push(n);continue}for(s=0,o=e.length-1;s<o;)a=s+o>>1,i[e[a]]<c?s=a+1:o=a;c<i[e[s]]&&(s>0&&(t[n]=e[s-1]),e[s]=n)}}for(s=e.length,o=e[s-1];s-- >0;)e[s]=o,o=t[o];return e}function $_(i){const t=i.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:$_(t)}function Jd(i){if(i)for(let t=0;t<i.length;t++)i[t].flags|=8}const Fx=Symbol.for("v-scx"),Bx=()=>nc(Fx);function ic(i,t,e){return j_(i,t,e)}function j_(i,t,e=Pe){const{immediate:n,deep:r,flush:s,once:o}=e,a=Hn({},e),l=t&&n||!t&&s!=="post";let c;if(qa){if(s==="sync"){const h=Bx();c=h.__watcherHandles||(h.__watcherHandles=[])}else if(!l){const h=()=>{};return h.stop=$i,h.resume=$i,h.pause=$i,h}}const u=On;a.call=(h,g,_)=>Zi(h,u,g,_);let f=!1;s==="post"?a.scheduler=h=>{ni(h,u&&u.suspense)}:s!=="sync"&&(f=!0,a.scheduler=(h,g)=>{g?h():Kh(h)}),a.augmentJob=h=>{t&&(h.flags|=4),f&&(h.flags|=2,u&&(h.id=u.uid,h.i=u))};const d=Jv(i,t,a);return qa&&(c?c.push(d):l&&d()),d}function zx(i,t,e){const n=this.proxy,r=je(i)?i.includes(".")?K_(n,i):()=>n[i]:i.bind(n,n);let s;ne(t)?s=t:(s=t.handler,e=t);const o=al(this),a=j_(r,s.bind(n),e);return o(),a}function K_(i,t){const e=t.split(".");return()=>{let n=i;for(let r=0;r<e.length&&n;r++)n=n[e[r]];return n}}const kx=(i,t)=>t==="modelValue"||t==="model-value"?i.modelModifiers:i[`${t}Modifiers`]||i[`${Jr(t)}Modifiers`]||i[`${Gs(t)}Modifiers`];function Hx(i,t,...e){if(i.isUnmounted)return;const n=i.vnode.props||Pe;let r=e;const s=t.startsWith("update:"),o=s&&kx(n,t.slice(7));o&&(o.trim&&(r=e.map(u=>je(u)?u.trim():u)),o.number&&(r=e.map(_v)));let a,l=n[a=lu(t)]||n[a=lu(Jr(t))];!l&&s&&(l=n[a=lu(Gs(t))]),l&&Zi(l,i,6,r);const c=n[a+"Once"];if(c){if(!i.emitted)i.emitted={};else if(i.emitted[a])return;i.emitted[a]=!0,Zi(c,i,6,r)}}const Vx=new WeakMap;function Z_(i,t,e=!1){const n=e?Vx:t.emitsCache,r=n.get(i);if(r!==void 0)return r;const s=i.emits;let o={},a=!1;if(!ne(i)){const l=c=>{const u=Z_(c,t,!0);u&&(a=!0,Hn(o,u))};!e&&t.mixins.length&&t.mixins.forEach(l),i.extends&&l(i.extends),i.mixins&&i.mixins.forEach(l)}return!s&&!a?(Ue(i)&&n.set(i,null),null):(jt(s)?s.forEach(l=>o[l]=null):Hn(o,s),Ue(i)&&n.set(i,o),o)}function Zc(i,t){return!i||!Wc(t)?!1:(t=t.slice(2).replace(/Once$/,""),ye(i,t[0].toLowerCase()+t.slice(1))||ye(i,Gs(t))||ye(i,t))}function Qd(i){const{type:t,vnode:e,proxy:n,withProxy:r,propsOptions:[s],slots:o,attrs:a,emit:l,render:c,renderCache:u,props:f,data:d,setupState:h,ctx:g,inheritAttrs:_}=i,m=wc(i);let p,b;try{if(e.shapeFlag&4){const v=r||n,R=v;p=Hi(c.call(R,v,u,f,h,d,g)),b=a}else{const v=t;p=Hi(v.length>1?v(f,{attrs:a,slots:o,emit:l}):v(f,null)),b=t.props?a:Gx(a)}}catch(v){Ca.length=0,jc(v,i,1),p=ln(No)}let E=p;if(b&&_!==!1){const v=Object.keys(b),{shapeFlag:R}=E;v.length&&R&7&&(s&&v.some(Fh)&&(b=Wx(b,s)),E=Oo(E,b,!1,!0))}return e.dirs&&(E=Oo(E,null,!1,!0),E.dirs=E.dirs?E.dirs.concat(e.dirs):e.dirs),e.transition&&Zh(E,e.transition),p=E,wc(m),p}const Gx=i=>{let t;for(const e in i)(e==="class"||e==="style"||Wc(e))&&((t||(t={}))[e]=i[e]);return t},Wx=(i,t)=>{const e={};for(const n in i)(!Fh(n)||!(n.slice(9)in t))&&(e[n]=i[n]);return e};function Xx(i,t,e){const{props:n,children:r,component:s}=i,{props:o,children:a,patchFlag:l}=t,c=s.emitsOptions;if(t.dirs||t.transition)return!0;if(e&&l>=0){if(l&1024)return!0;if(l&16)return n?tp(n,o,c):!!o;if(l&8){const u=t.dynamicProps;for(let f=0;f<u.length;f++){const d=u[f];if(o[d]!==n[d]&&!Zc(c,d))return!0}}}else return(r||a)&&(!a||!a.$stable)?!0:n===o?!1:n?o?tp(n,o,c):!0:!!o;return!1}function tp(i,t,e){const n=Object.keys(t);if(n.length!==Object.keys(i).length)return!0;for(let r=0;r<n.length;r++){const s=n[r];if(t[s]!==i[s]&&!Zc(e,s))return!0}return!1}function Yx({vnode:i,parent:t},e){for(;t;){const n=t.subTree;if(n.suspense&&n.suspense.activeBranch===i&&(n.el=i.el),n===i)(i=t.vnode).el=e,t=t.parent;else break}}const J_=i=>i.__isSuspense;function qx(i,t){t&&t.pendingBranch?jt(i)?t.effects.push(...i):t.effects.push(i):ex(i)}const yn=Symbol.for("v-fgt"),Jc=Symbol.for("v-txt"),No=Symbol.for("v-cmt"),rc=Symbol.for("v-stc"),Ca=[];let fi=null;function tn(i=!1){Ca.push(fi=i?null:[])}function $x(){Ca.pop(),fi=Ca[Ca.length-1]||null}let Ya=1;function ep(i,t=!1){Ya+=i,i<0&&fi&&t&&(fi.hasOnce=!0)}function jx(i){return i.dynamicChildren=Ya>0?fi||yo:null,$x(),Ya>0&&fi&&fi.push(i),i}function en(i,t,e,n,r,s){return jx(vt(i,t,e,n,r,s,!0))}function Q_(i){return i?i.__v_isVNode===!0:!1}function ia(i,t){return i.type===t.type&&i.key===t.key}const tg=({key:i})=>i??null,sc=({ref:i,ref_key:t,ref_for:e})=>(typeof i=="number"&&(i=""+i),i!=null?je(i)||bn(i)||ne(i)?{i:Wi,r:i,k:t,f:!!e}:i:null);function vt(i,t=null,e=null,n=0,r=null,s=i===yn?0:1,o=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:i,props:t,key:t&&tg(t),ref:t&&sc(t),scopeId:L_,slotScopeIds:null,children:e,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:s,patchFlag:n,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:Wi};return a?(td(l,e),s&128&&i.normalize(l)):e&&(l.shapeFlag|=je(e)?8:16),Ya>0&&!o&&fi&&(l.patchFlag>0||s&6)&&l.patchFlag!==32&&fi.push(l),l}const ln=Kx;function Kx(i,t=null,e=null,n=0,r=null,s=!1){if((!i||i===gx)&&(i=No),Q_(i)){const a=Oo(i,t,!0);return e&&td(a,e),Ya>0&&!s&&fi&&(a.shapeFlag&6?fi[fi.indexOf(i)]=a:fi.push(a)),a.patchFlag=-2,a}if(ay(i)&&(i=i.__vccOpts),t){t=Zx(t);let{class:a,style:l}=t;a&&!je(a)&&(t.class=Va(a)),Ue(l)&&($h(l)&&!jt(l)&&(l=Hn({},l)),t.style=kh(l))}const o=je(i)?1:J_(i)?128:rx(i)?64:Ue(i)?4:ne(i)?2:0;return vt(i,t,e,n,r,o,s,!0)}function Zx(i){return i?$h(i)||H_(i)?Hn({},i):i:null}function Oo(i,t,e=!1,n=!1){const{props:r,ref:s,patchFlag:o,children:a,transition:l}=i,c=t?Jx(r||{},t):r,u={__v_isVNode:!0,__v_skip:!0,type:i.type,props:c,key:c&&tg(c),ref:t&&t.ref?e&&s?jt(s)?s.concat(sc(t)):[s,sc(t)]:sc(t):s,scopeId:i.scopeId,slotScopeIds:i.slotScopeIds,children:a,target:i.target,targetStart:i.targetStart,targetAnchor:i.targetAnchor,staticCount:i.staticCount,shapeFlag:i.shapeFlag,patchFlag:t&&i.type!==yn?o===-1?16:o|16:o,dynamicProps:i.dynamicProps,dynamicChildren:i.dynamicChildren,appContext:i.appContext,dirs:i.dirs,transition:l,component:i.component,suspense:i.suspense,ssContent:i.ssContent&&Oo(i.ssContent),ssFallback:i.ssFallback&&Oo(i.ssFallback),placeholder:i.placeholder,el:i.el,anchor:i.anchor,ctx:i.ctx,ce:i.ce};return l&&n&&Zh(u,l.clone(u)),u}function eg(i=" ",t=0){return ln(Jc,null,i,t)}function ng(i,t){const e=ln(rc,null,i);return e.staticCount=t,e}function Hi(i){return i==null||typeof i=="boolean"?ln(No):jt(i)?ln(yn,null,i.slice()):Q_(i)?Fr(i):ln(Jc,null,String(i))}function Fr(i){return i.el===null&&i.patchFlag!==-1||i.memo?i:Oo(i)}function td(i,t){let e=0;const{shapeFlag:n}=i;if(t==null)t=null;else if(jt(t))e=16;else if(typeof t=="object")if(n&65){const r=t.default;r&&(r._c&&(r._d=!1),td(i,r()),r._c&&(r._d=!0));return}else{e=32;const r=t._;!r&&!H_(t)?t._ctx=Wi:r===3&&Wi&&(Wi.slots._===1?t._=1:(t._=2,i.patchFlag|=1024))}else ne(t)?(t={default:t,_ctx:Wi},e=32):(t=String(t),n&64?(e=16,t=[eg(t)]):e=8);i.children=t,i.shapeFlag|=e}function Jx(...i){const t={};for(let e=0;e<i.length;e++){const n=i[e];for(const r in n)if(r==="class")t.class!==n.class&&(t.class=Va([t.class,n.class]));else if(r==="style")t.style=kh([t.style,n.style]);else if(Wc(r)){const s=t[r],o=n[r];o&&s!==o&&!(jt(s)&&s.includes(o))&&(t[r]=s?[].concat(s,o):o)}else r!==""&&(t[r]=n[r])}return t}function Fi(i,t,e,n=null){Zi(i,t,7,[e,n])}const Qx=B_();let ty=0;function ey(i,t,e){const n=i.type,r=(t?t.appContext:i.appContext)||Qx,s={uid:ty++,vnode:i,type:n,parent:t,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new bv(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(r.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:G_(n,r),emitsOptions:Z_(n,r),emit:null,emitted:null,propsDefaults:Pe,inheritAttrs:n.inheritAttrs,ctx:Pe,data:Pe,props:Pe,attrs:Pe,slots:Pe,refs:Pe,setupState:Pe,setupContext:null,suspense:e,suspenseId:e?e.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return s.ctx={_:s},s.root=t?t.root:s,s.emit=Hx.bind(null,s),i.ce&&i.ce(s),s}let On=null;const ny=()=>On||Wi;let Rc,Mf;{const i=qc(),t=(e,n)=>{let r;return(r=i[e])||(r=i[e]=[]),r.push(n),s=>{r.length>1?r.forEach(o=>o(s)):r[0](s)}};Rc=t("__VUE_INSTANCE_SETTERS__",e=>On=e),Mf=t("__VUE_SSR_SETTERS__",e=>qa=e)}const al=i=>{const t=On;return Rc(i),i.scope.on(),()=>{i.scope.off(),Rc(t)}},np=()=>{On&&On.scope.off(),Rc(null)};function ig(i){return i.vnode.shapeFlag&4}let qa=!1;function iy(i,t=!1,e=!1){t&&Mf(t);const{props:n,children:r}=i.vnode,s=ig(i);Ax(i,n,s,t),Dx(i,r,e||t);const o=s?ry(i,t):void 0;return t&&Mf(!1),o}function ry(i,t){const e=i.type;i.accessCache=Object.create(null),i.proxy=new Proxy(i.ctx,vx);const{setup:n}=e;if(n){Mr();const r=i.setupContext=n.length>1?oy(i):null,s=al(i),o=sl(n,i,0,[i.props,r]),a=r_(o);if(Sr(),s(),(a||i.sp)&&!wa(i)&&I_(i),a){if(o.then(np,np),t)return o.then(l=>{ip(i,l)}).catch(l=>{jc(l,i,0)});i.asyncDep=o}else ip(i,o)}else rg(i)}function ip(i,t,e){ne(t)?i.type.__ssrInlineRender?i.ssrRender=t:i.render=t:Ue(t)&&(i.setupState=w_(t)),rg(i)}function rg(i,t,e){const n=i.type;i.render||(i.render=n.render||$i);{const r=al(i);Mr();try{xx(i)}finally{Sr(),r()}}}const sy={get(i,t){return xn(i,"get",""),i[t]}};function oy(i){const t=e=>{i.exposed=e||{}};return{attrs:new Proxy(i.attrs,sy),slots:i.slots,emit:i.emit,expose:t}}function ed(i){return i.exposed?i.exposeProxy||(i.exposeProxy=new Proxy(w_(Wv(i.exposed)),{get(t,e){if(e in t)return t[e];if(e in Aa)return Aa[e](i)},has(t,e){return e in t||e in Aa}})):i.proxy}function ay(i){return ne(i)&&"__vccOpts"in i}const ly=(i,t)=>Kv(i,t,qa),cy="3.5.22";let Sf;const rp=typeof window<"u"&&window.trustedTypes;if(rp)try{Sf=rp.createPolicy("vue",{createHTML:i=>i})}catch{}const sg=Sf?i=>Sf.createHTML(i):i=>i,uy="http://www.w3.org/2000/svg",fy="http://www.w3.org/1998/Math/MathML",ur=typeof document<"u"?document:null,sp=ur&&ur.createElement("template"),hy={insert:(i,t,e)=>{t.insertBefore(i,e||null)},remove:i=>{const t=i.parentNode;t&&t.removeChild(i)},createElement:(i,t,e,n)=>{const r=t==="svg"?ur.createElementNS(uy,i):t==="mathml"?ur.createElementNS(fy,i):e?ur.createElement(i,{is:e}):ur.createElement(i);return i==="select"&&n&&n.multiple!=null&&r.setAttribute("multiple",n.multiple),r},createText:i=>ur.createTextNode(i),createComment:i=>ur.createComment(i),setText:(i,t)=>{i.nodeValue=t},setElementText:(i,t)=>{i.textContent=t},parentNode:i=>i.parentNode,nextSibling:i=>i.nextSibling,querySelector:i=>ur.querySelector(i),setScopeId(i,t){i.setAttribute(t,"")},insertStaticContent(i,t,e,n,r,s){const o=e?e.previousSibling:t.lastChild;if(r&&(r===s||r.nextSibling))for(;t.insertBefore(r.cloneNode(!0),e),!(r===s||!(r=r.nextSibling)););else{sp.innerHTML=sg(n==="svg"?`<svg>${i}</svg>`:n==="mathml"?`<math>${i}</math>`:i);const a=sp.content;if(n==="svg"||n==="mathml"){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}t.insertBefore(a,e)}return[o?o.nextSibling:t.firstChild,e?e.previousSibling:t.lastChild]}},dy=Symbol("_vtc");function py(i,t,e){const n=i[dy];n&&(t=(t?[t,...n]:[...n]).join(" ")),t==null?i.removeAttribute("class"):e?i.setAttribute("class",t):i.className=t}const op=Symbol("_vod"),my=Symbol("_vsh"),_y=Symbol(""),gy=/(?:^|;)\s*display\s*:/;function vy(i,t,e){const n=i.style,r=je(e);let s=!1;if(e&&!r){if(t)if(je(t))for(const o of t.split(";")){const a=o.slice(0,o.indexOf(":")).trim();e[a]==null&&oc(n,a,"")}else for(const o in t)e[o]==null&&oc(n,o,"");for(const o in e)o==="display"&&(s=!0),oc(n,o,e[o])}else if(r){if(t!==e){const o=n[_y];o&&(e+=";"+o),n.cssText=e,s=gy.test(e)}}else t&&i.removeAttribute("style");op in i&&(i[op]=s?n.display:"",i[my]&&(n.display="none"))}const ap=/\s*!important$/;function oc(i,t,e){if(jt(e))e.forEach(n=>oc(i,t,n));else if(e==null&&(e=""),t.startsWith("--"))i.setProperty(t,e);else{const n=xy(i,t);ap.test(e)?i.setProperty(Gs(n),e.replace(ap,""),"important"):i[n]=e}}const lp=["Webkit","Moz","ms"],_u={};function xy(i,t){const e=_u[t];if(e)return e;let n=Jr(t);if(n!=="filter"&&n in i)return _u[t]=n;n=a_(n);for(let r=0;r<lp.length;r++){const s=lp[r]+n;if(s in i)return _u[t]=s}return t}const cp="http://www.w3.org/1999/xlink";function up(i,t,e,n,r,s=Sv(t)){n&&t.startsWith("xlink:")?e==null?i.removeAttributeNS(cp,t.slice(6,t.length)):i.setAttributeNS(cp,t,e):e==null||s&&!c_(e)?i.removeAttribute(t):i.setAttribute(t,s?"":rs(e)?String(e):e)}function fp(i,t,e,n,r){if(t==="innerHTML"||t==="textContent"){e!=null&&(i[t]=t==="innerHTML"?sg(e):e);return}const s=i.tagName;if(t==="value"&&s!=="PROGRESS"&&!s.includes("-")){const a=s==="OPTION"?i.getAttribute("value")||"":i.value,l=e==null?i.type==="checkbox"?"on":"":String(e);(a!==l||!("_value"in i))&&(i.value=l),e==null&&i.removeAttribute(t),i._value=e;return}let o=!1;if(e===""||e==null){const a=typeof i[t];a==="boolean"?e=c_(e):e==null&&a==="string"?(e="",o=!0):a==="number"&&(e=0,o=!0)}try{i[t]=e}catch{}o&&i.removeAttribute(r||t)}function yy(i,t,e,n){i.addEventListener(t,e,n)}function My(i,t,e,n){i.removeEventListener(t,e,n)}const hp=Symbol("_vei");function Sy(i,t,e,n,r=null){const s=i[hp]||(i[hp]={}),o=s[t];if(n&&o)o.value=n;else{const[a,l]=by(t);if(n){const c=s[t]=wy(n,r);yy(i,a,c,l)}else o&&(My(i,a,o,l),s[t]=void 0)}}const dp=/(?:Once|Passive|Capture)$/;function by(i){let t;if(dp.test(i)){t={};let n;for(;n=i.match(dp);)i=i.slice(0,i.length-n[0].length),t[n[0].toLowerCase()]=!0}return[i[2]===":"?i.slice(3):Gs(i.slice(2)),t]}let gu=0;const Ey=Promise.resolve(),Ty=()=>gu||(Ey.then(()=>gu=0),gu=Date.now());function wy(i,t){const e=n=>{if(!n._vts)n._vts=Date.now();else if(n._vts<=e.attached)return;Zi(Ay(n,e.value),t,5,[n])};return e.value=i,e.attached=Ty(),e}function Ay(i,t){if(jt(t)){const e=i.stopImmediatePropagation;return i.stopImmediatePropagation=()=>{e.call(i),i._stopped=!0},t.map(n=>r=>!r._stopped&&n&&n(r))}else return t}const pp=i=>i.charCodeAt(0)===111&&i.charCodeAt(1)===110&&i.charCodeAt(2)>96&&i.charCodeAt(2)<123,Cy=(i,t,e,n,r,s)=>{const o=r==="svg";t==="class"?py(i,n,o):t==="style"?vy(i,e,n):Wc(t)?Fh(t)||Sy(i,t,e,n,s):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):Ry(i,t,n,o))?(fp(i,t,n),!i.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&up(i,t,n,o,s,t!=="value")):i._isVueCE&&(/[A-Z]/.test(t)||!je(n))?fp(i,Jr(t),n,s,t):(t==="true-value"?i._trueValue=n:t==="false-value"&&(i._falseValue=n),up(i,t,n,o))};function Ry(i,t,e,n){if(n)return!!(t==="innerHTML"||t==="textContent"||t in i&&pp(t)&&ne(e));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="autocorrect"||t==="form"||t==="list"&&i.tagName==="INPUT"||t==="type"&&i.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const r=i.tagName;if(r==="IMG"||r==="VIDEO"||r==="CANVAS"||r==="SOURCE")return!1}return pp(t)&&je(e)?!1:t in i}const Py=["ctrl","shift","alt","meta"],Dy={stop:i=>i.stopPropagation(),prevent:i=>i.preventDefault(),self:i=>i.target!==i.currentTarget,ctrl:i=>!i.ctrlKey,shift:i=>!i.shiftKey,alt:i=>!i.altKey,meta:i=>!i.metaKey,left:i=>"button"in i&&i.button!==0,middle:i=>"button"in i&&i.button!==1,right:i=>"button"in i&&i.button!==2,exact:(i,t)=>Py.some(e=>i[`${e}Key`]&&!t.includes(e))},Ly=(i,t)=>{const e=i._withMods||(i._withMods={}),n=t.join(".");return e[n]||(e[n]=((r,...s)=>{for(let o=0;o<t.length;o++){const a=Dy[t[o]];if(a&&a(r,t))return}return i(r,...s)}))},Iy=Hn({patchProp:Cy},hy);let mp;function Uy(){return mp||(mp=Ix(Iy))}const Ny=((...i)=>{const t=Uy().createApp(...i),{mount:e}=t;return t.mount=n=>{const r=Fy(n);if(!r)return;const s=t._component;!ne(s)&&!s.render&&!s.template&&(s.template=r.innerHTML),r.nodeType===1&&(r.textContent="");const o=e(r,!1,Oy(r));return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),o},t});function Oy(i){if(i instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&i instanceof MathMLElement)return"mathml"}function Fy(i){return je(i)?document.querySelector(i):i}function fr(i){if(i===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return i}function og(i,t){i.prototype=Object.create(t.prototype),i.prototype.constructor=i,i.__proto__=t}var di={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Fo={duration:.5,overwrite:!1,delay:0},nd,dn,Ie,Mi=1e8,we=1/Mi,bf=Math.PI*2,By=bf/4,zy=0,ag=Math.sqrt,ky=Math.cos,Hy=Math.sin,cn=function(t){return typeof t=="string"},He=function(t){return typeof t=="function"},br=function(t){return typeof t=="number"},id=function(t){return typeof t>"u"},Ji=function(t){return typeof t=="object"},qn=function(t){return t!==!1},rd=function(){return typeof window<"u"},gl=function(t){return He(t)||cn(t)},lg=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},En=Array.isArray,Ef=/(?:-?\.?\d|\.)+/gi,cg=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,mo=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,vu=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,ug=/[+-]=-?[.\d]+/,fg=/[^,'"\[\]\s]+/gi,Vy=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Oe,zi,Tf,sd,pi={},Pc={},hg,dg=function(t){return(Pc=Bo(t,pi))&&Zn},od=function(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")},$a=function(t,e){return!e&&console.warn(t)},pg=function(t,e){return t&&(pi[t]=e)&&Pc&&(Pc[t]=e)||pi},ja=function(){return 0},Gy={suppressEvents:!0,isStart:!0,kill:!1},ac={suppressEvents:!0,kill:!1},Wy={suppressEvents:!0},ad={},qr=[],wf={},mg,si={},xu={},_p=30,lc=[],ld="",cd=function(t){var e=t[0],n,r;if(Ji(e)||He(e)||(t=[t]),!(n=(e._gsap||{}).harness)){for(r=lc.length;r--&&!lc[r].targetTest(e););n=lc[r]}for(r=t.length;r--;)t[r]&&(t[r]._gsap||(t[r]._gsap=new zg(t[r],n)))||t.splice(r,1);return t},Cs=function(t){return t._gsap||cd(Si(t))[0]._gsap},_g=function(t,e,n){return(n=t[e])&&He(n)?t[e]():id(n)&&t.getAttribute&&t.getAttribute(e)||n},$n=function(t,e){return(t=t.split(",")).forEach(e)||t},Ge=function(t){return Math.round(t*1e5)/1e5||0},$e=function(t){return Math.round(t*1e7)/1e7||0},To=function(t,e){var n=e.charAt(0),r=parseFloat(e.substr(2));return t=parseFloat(t),n==="+"?t+r:n==="-"?t-r:n==="*"?t*r:t/r},Xy=function(t,e){for(var n=e.length,r=0;t.indexOf(e[r])<0&&++r<n;);return r<n},Dc=function(){var t=qr.length,e=qr.slice(0),n,r;for(wf={},qr.length=0,n=0;n<t;n++)r=e[n],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},ud=function(t){return!!(t._initted||t._startAt||t.add)},gg=function(t,e,n,r){qr.length&&!dn&&Dc(),t.render(e,n,!!(dn&&e<0&&ud(t))),qr.length&&!dn&&Dc()},vg=function(t){var e=parseFloat(t);return(e||e===0)&&(t+"").match(fg).length<2?e:cn(t)?t.trim():t},xg=function(t){return t},mi=function(t,e){for(var n in e)n in t||(t[n]=e[n]);return t},Yy=function(t){return function(e,n){for(var r in n)r in e||r==="duration"&&t||r==="ease"||(e[r]=n[r])}},Bo=function(t,e){for(var n in e)t[n]=e[n];return t},gp=function i(t,e){for(var n in e)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(t[n]=Ji(e[n])?i(t[n]||(t[n]={}),e[n]):e[n]);return t},Lc=function(t,e){var n={},r;for(r in t)r in e||(n[r]=t[r]);return n},Ra=function(t){var e=t.parent||Oe,n=t.keyframes?Yy(En(t.keyframes)):mi;if(qn(t.inherit))for(;e;)n(t,e.vars.defaults),e=e.parent||e._dp;return t},qy=function(t,e){for(var n=t.length,r=n===e.length;r&&n--&&t[n]===e[n];);return n<0},yg=function(t,e,n,r,s){var o=t[r],a;if(s)for(a=e[s];o&&o[s]>a;)o=o._prev;return o?(e._next=o._next,o._next=e):(e._next=t[n],t[n]=e),e._next?e._next._prev=e:t[r]=e,e._prev=o,e.parent=e._dp=t,e},Qc=function(t,e,n,r){n===void 0&&(n="_first"),r===void 0&&(r="_last");var s=e._prev,o=e._next;s?s._next=o:t[n]===e&&(t[n]=o),o?o._prev=s:t[r]===e&&(t[r]=s),e._next=e._prev=e.parent=null},ts=function(t,e){t.parent&&(!e||t.parent.autoRemoveChildren)&&t.parent.remove&&t.parent.remove(t),t._act=0},Rs=function(t,e){if(t&&(!e||e._end>t._dur||e._start<0))for(var n=t;n;)n._dirty=1,n=n.parent;return t},$y=function(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t},Af=function(t,e,n,r){return t._startAt&&(dn?t._startAt.revert(ac):t.vars.immediateRender&&!t.vars.autoRevert||t._startAt.render(e,!0,r))},jy=function i(t){return!t||t._ts&&i(t.parent)},vp=function(t){return t._repeat?zo(t._tTime,t=t.duration()+t._rDelay)*t:0},zo=function(t,e){var n=Math.floor(t=$e(t/e));return t&&n===t?n-1:n},Ic=function(t,e){return(t-e._start)*e._ts+(e._ts>=0?0:e._dirty?e.totalDuration():e._tDur)},tu=function(t){return t._end=$e(t._start+(t._tDur/Math.abs(t._ts||t._rts||we)||0))},eu=function(t,e){var n=t._dp;return n&&n.smoothChildTiming&&t._ts&&(t._start=$e(n._time-(t._ts>0?e/t._ts:((t._dirty?t.totalDuration():t._tDur)-e)/-t._ts)),tu(t),n._dirty||Rs(n,t)),t},Mg=function(t,e){var n;if((e._time||!e._dur&&e._initted||e._start<t._time&&(e._dur||!e.add))&&(n=Ic(t.rawTime(),e),(!e._dur||ll(0,e.totalDuration(),n)-e._tTime>we)&&e.render(n,!0)),Rs(t,e)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(n=t;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;t._zTime=-we}},Gi=function(t,e,n,r){return e.parent&&ts(e),e._start=$e((br(n)?n:n||t!==Oe?vi(t,n,e):t._time)+e._delay),e._end=$e(e._start+(e.totalDuration()/Math.abs(e.timeScale())||0)),yg(t,e,"_first","_last",t._sort?"_start":0),Cf(e)||(t._recent=e),r||Mg(t,e),t._ts<0&&eu(t,t._tTime),t},Sg=function(t,e){return(pi.ScrollTrigger||od("scrollTrigger",e))&&pi.ScrollTrigger.create(e,t)},bg=function(t,e,n,r,s){if(hd(t,e,s),!t._initted)return 1;if(!n&&t._pt&&!dn&&(t._dur&&t.vars.lazy!==!1||!t._dur&&t.vars.lazy)&&mg!==ci.frame)return qr.push(t),t._lazy=[s,r],1},Ky=function i(t){var e=t.parent;return e&&e._ts&&e._initted&&!e._lock&&(e.rawTime()<0||i(e))},Cf=function(t){var e=t.data;return e==="isFromStart"||e==="isStart"},Zy=function(t,e,n,r){var s=t.ratio,o=e<0||!e&&(!t._start&&Ky(t)&&!(!t._initted&&Cf(t))||(t._ts<0||t._dp._ts<0)&&!Cf(t))?0:1,a=t._rDelay,l=0,c,u,f;if(a&&t._repeat&&(l=ll(0,t._tDur,e),u=zo(l,a),t._yoyo&&u&1&&(o=1-o),u!==zo(t._tTime,a)&&(s=1-o,t.vars.repeatRefresh&&t._initted&&t.invalidate())),o!==s||dn||r||t._zTime===we||!e&&t._zTime){if(!t._initted&&bg(t,e,r,n,l))return;for(f=t._zTime,t._zTime=e||(n?we:0),n||(n=e&&!f),t.ratio=o,t._from&&(o=1-o),t._time=0,t._tTime=l,c=t._pt;c;)c.r(o,c.d),c=c._next;e<0&&Af(t,e,n,!0),t._onUpdate&&!n&&hi(t,"onUpdate"),l&&t._repeat&&!n&&t.parent&&hi(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===o&&(o&&ts(t,1),!n&&!dn&&(hi(t,o?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=e)},Jy=function(t,e,n){var r;if(n>e)for(r=t._first;r&&r._start<=n;){if(r.data==="isPause"&&r._start>e)return r;r=r._next}else for(r=t._last;r&&r._start>=n;){if(r.data==="isPause"&&r._start<e)return r;r=r._prev}},ko=function(t,e,n,r){var s=t._repeat,o=$e(e)||0,a=t._tTime/t._tDur;return a&&!r&&(t._time*=o/t._dur),t._dur=o,t._tDur=s?s<0?1e10:$e(o*(s+1)+t._rDelay*s):o,a>0&&!r&&eu(t,t._tTime=t._tDur*a),t.parent&&tu(t),n||Rs(t.parent,t),t},xp=function(t){return t instanceof Fn?Rs(t):ko(t,t._dur)},Qy={_start:0,endTime:ja,totalDuration:ja},vi=function i(t,e,n){var r=t.labels,s=t._recent||Qy,o=t.duration()>=Mi?s.endTime(!1):t._dur,a,l,c;return cn(e)&&(isNaN(e)||e in r)?(l=e.charAt(0),c=e.substr(-1)==="%",a=e.indexOf("="),l==="<"||l===">"?(a>=0&&(e=e.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(e.substr(1))||0)*(c?(a<0?s:n).totalDuration()/100:1)):a<0?(e in r||(r[e]=o),r[e]):(l=parseFloat(e.charAt(a-1)+e.substr(a+1)),c&&n&&(l=l/100*(En(n)?n[0]:n).totalDuration()),a>1?i(t,e.substr(0,a-1),n)+l:o+l)):e==null?o:+e},Pa=function(t,e,n){var r=br(e[1]),s=(r?2:1)+(t<2?0:1),o=e[s],a,l;if(r&&(o.duration=e[1]),o.parent=n,t){for(a=o,l=n;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=qn(l.vars.inherit)&&l.parent;o.immediateRender=qn(a.immediateRender),t<2?o.runBackwards=1:o.startAt=e[s-1]}return new qe(e[0],o,e[s+1])},ss=function(t,e){return t||t===0?e(t):e},ll=function(t,e,n){return n<t?t:n>e?e:n},Mn=function(t,e){return!cn(t)||!(e=Vy.exec(t))?"":e[1]},tM=function(t,e,n){return ss(n,function(r){return ll(t,e,r)})},Rf=[].slice,Eg=function(t,e){return t&&Ji(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&Ji(t[0]))&&!t.nodeType&&t!==zi},eM=function(t,e,n){return n===void 0&&(n=[]),t.forEach(function(r){var s;return cn(r)&&!e||Eg(r,1)?(s=n).push.apply(s,Si(r)):n.push(r)})||n},Si=function(t,e,n){return Ie&&!e&&Ie.selector?Ie.selector(t):cn(t)&&!n&&(Tf||!Ho())?Rf.call((e||sd).querySelectorAll(t),0):En(t)?eM(t,n):Eg(t)?Rf.call(t,0):t?[t]:[]},Pf=function(t){return t=Si(t)[0]||$a("Invalid scope")||{},function(e){var n=t.current||t.nativeElement||t;return Si(e,n.querySelectorAll?n:n===t?$a("Invalid scope")||sd.createElement("div"):t)}},Tg=function(t){return t.sort(function(){return .5-Math.random()})},wg=function(t){if(He(t))return t;var e=Ji(t)?t:{each:t},n=Ps(e.ease),r=e.from||0,s=parseFloat(e.base)||0,o={},a=r>0&&r<1,l=isNaN(r)||a,c=e.axis,u=r,f=r;return cn(r)?u=f={center:.5,edges:.5,end:1}[r]||0:!a&&l&&(u=r[0],f=r[1]),function(d,h,g){var _=(g||e).length,m=o[_],p,b,E,v,R,C,A,L,S;if(!m){if(S=e.grid==="auto"?0:(e.grid||[1,Mi])[1],!S){for(A=-Mi;A<(A=g[S++].getBoundingClientRect().left)&&S<_;);S<_&&S--}for(m=o[_]=[],p=l?Math.min(S,_)*u-.5:r%S,b=S===Mi?0:l?_*f/S-.5:r/S|0,A=0,L=Mi,C=0;C<_;C++)E=C%S-p,v=b-(C/S|0),m[C]=R=c?Math.abs(c==="y"?v:E):ag(E*E+v*v),R>A&&(A=R),R<L&&(L=R);r==="random"&&Tg(m),m.max=A-L,m.min=L,m.v=_=(parseFloat(e.amount)||parseFloat(e.each)*(S>_?_-1:c?c==="y"?_/S:S:Math.max(S,_/S))||0)*(r==="edges"?-1:1),m.b=_<0?s-_:s,m.u=Mn(e.amount||e.each)||0,n=n&&_<0?Og(n):n}return _=(m[d]-m.min)/m.max||0,$e(m.b+(n?n(_):_)*m.v)+m.u}},Df=function(t){var e=Math.pow(10,((t+"").split(".")[1]||"").length);return function(n){var r=$e(Math.round(parseFloat(n)/t)*t*e);return(r-r%1)/e+(br(n)?0:Mn(n))}},Ag=function(t,e){var n=En(t),r,s;return!n&&Ji(t)&&(r=n=t.radius||Mi,t.values?(t=Si(t.values),(s=!br(t[0]))&&(r*=r)):t=Df(t.increment)),ss(e,n?He(t)?function(o){return s=t(o),Math.abs(s-o)<=r?s:o}:function(o){for(var a=parseFloat(s?o.x:o),l=parseFloat(s?o.y:0),c=Mi,u=0,f=t.length,d,h;f--;)s?(d=t[f].x-a,h=t[f].y-l,d=d*d+h*h):d=Math.abs(t[f]-a),d<c&&(c=d,u=f);return u=!r||c<=r?t[u]:o,s||u===o||br(o)?u:u+Mn(o)}:Df(t))},Cg=function(t,e,n,r){return ss(En(t)?!e:n===!0?!!(n=0):!r,function(){return En(t)?t[~~(Math.random()*t.length)]:(n=n||1e-5)&&(r=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((t-n/2+Math.random()*(e-t+n*.99))/n)*n*r)/r})},nM=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(r){return e.reduce(function(s,o){return o(s)},r)}},iM=function(t,e){return function(n){return t(parseFloat(n))+(e||Mn(n))}},rM=function(t,e,n){return Pg(t,e,0,1,n)},Rg=function(t,e,n){return ss(n,function(r){return t[~~e(r)]})},sM=function i(t,e,n){var r=e-t;return En(t)?Rg(t,i(0,t.length),e):ss(n,function(s){return(r+(s-t)%r)%r+t})},oM=function i(t,e,n){var r=e-t,s=r*2;return En(t)?Rg(t,i(0,t.length-1),e):ss(n,function(o){return o=(s+(o-t)%s)%s||0,t+(o>r?s-o:o)})},Ka=function(t){for(var e=0,n="",r,s,o,a;~(r=t.indexOf("random(",e));)o=t.indexOf(")",r),a=t.charAt(r+7)==="[",s=t.substr(r+7,o-r-7).match(a?fg:Ef),n+=t.substr(e,r-e)+Cg(a?s:+s[0],a?0:+s[1],+s[2]||1e-5),e=o+1;return n+t.substr(e,t.length-e)},Pg=function(t,e,n,r,s){var o=e-t,a=r-n;return ss(s,function(l){return n+((l-t)/o*a||0)})},aM=function i(t,e,n,r){var s=isNaN(t+e)?0:function(h){return(1-h)*t+h*e};if(!s){var o=cn(t),a={},l,c,u,f,d;if(n===!0&&(r=1)&&(n=null),o)t={p:t},e={p:e};else if(En(t)&&!En(e)){for(u=[],f=t.length,d=f-2,c=1;c<f;c++)u.push(i(t[c-1],t[c]));f--,s=function(g){g*=f;var _=Math.min(d,~~g);return u[_](g-_)},n=e}else r||(t=Bo(En(t)?[]:{},t));if(!u){for(l in e)fd.call(a,t,l,"get",e[l]);s=function(g){return md(g,a)||(o?t.p:t)}}}return ss(n,s)},yp=function(t,e,n){var r=t.labels,s=Mi,o,a,l;for(o in r)a=r[o]-e,a<0==!!n&&a&&s>(a=Math.abs(a))&&(l=o,s=a);return l},hi=function(t,e,n){var r=t.vars,s=r[e],o=Ie,a=t._ctx,l,c,u;if(s)return l=r[e+"Params"],c=r.callbackScope||t,n&&qr.length&&Dc(),a&&(Ie=a),u=l?s.apply(c,l):s.call(c),Ie=o,u},da=function(t){return ts(t),t.scrollTrigger&&t.scrollTrigger.kill(!!dn),t.progress()<1&&hi(t,"onInterrupt"),t},_o,Dg=[],Lg=function(t){if(t)if(t=!t.name&&t.default||t,rd()||t.headless){var e=t.name,n=He(t),r=e&&!n&&t.init?function(){this._props=[]}:t,s={init:ja,render:md,add:fd,kill:bM,modifier:SM,rawVars:0},o={targetTest:0,get:0,getSetter:pd,aliases:{},register:0};if(Ho(),t!==r){if(si[e])return;mi(r,mi(Lc(t,s),o)),Bo(r.prototype,Bo(s,Lc(t,o))),si[r.prop=e]=r,t.targetTest&&(lc.push(r),ad[e]=1),e=(e==="css"?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}pg(e,r),t.register&&t.register(Zn,r,jn)}else Dg.push(t)},Te=255,pa={aqua:[0,Te,Te],lime:[0,Te,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Te],navy:[0,0,128],white:[Te,Te,Te],olive:[128,128,0],yellow:[Te,Te,0],orange:[Te,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Te,0,0],pink:[Te,192,203],cyan:[0,Te,Te],transparent:[Te,Te,Te,0]},yu=function(t,e,n){return t+=t<0?1:t>1?-1:0,(t*6<1?e+(n-e)*t*6:t<.5?n:t*3<2?e+(n-e)*(2/3-t)*6:e)*Te+.5|0},Ig=function(t,e,n){var r=t?br(t)?[t>>16,t>>8&Te,t&Te]:0:pa.black,s,o,a,l,c,u,f,d,h,g;if(!r){if(t.substr(-1)===","&&(t=t.substr(0,t.length-1)),pa[t])r=pa[t];else if(t.charAt(0)==="#"){if(t.length<6&&(s=t.charAt(1),o=t.charAt(2),a=t.charAt(3),t="#"+s+s+o+o+a+a+(t.length===5?t.charAt(4)+t.charAt(4):"")),t.length===9)return r=parseInt(t.substr(1,6),16),[r>>16,r>>8&Te,r&Te,parseInt(t.substr(7),16)/255];t=parseInt(t.substr(1),16),r=[t>>16,t>>8&Te,t&Te]}else if(t.substr(0,3)==="hsl"){if(r=g=t.match(Ef),!e)l=+r[0]%360/360,c=+r[1]/100,u=+r[2]/100,o=u<=.5?u*(c+1):u+c-u*c,s=u*2-o,r.length>3&&(r[3]*=1),r[0]=yu(l+1/3,s,o),r[1]=yu(l,s,o),r[2]=yu(l-1/3,s,o);else if(~t.indexOf("="))return r=t.match(cg),n&&r.length<4&&(r[3]=1),r}else r=t.match(Ef)||pa.transparent;r=r.map(Number)}return e&&!g&&(s=r[0]/Te,o=r[1]/Te,a=r[2]/Te,f=Math.max(s,o,a),d=Math.min(s,o,a),u=(f+d)/2,f===d?l=c=0:(h=f-d,c=u>.5?h/(2-f-d):h/(f+d),l=f===s?(o-a)/h+(o<a?6:0):f===o?(a-s)/h+2:(s-o)/h+4,l*=60),r[0]=~~(l+.5),r[1]=~~(c*100+.5),r[2]=~~(u*100+.5)),n&&r.length<4&&(r[3]=1),r},Ug=function(t){var e=[],n=[],r=-1;return t.split($r).forEach(function(s){var o=s.match(mo)||[];e.push.apply(e,o),n.push(r+=o.length+1)}),e.c=n,e},Mp=function(t,e,n){var r="",s=(t+r).match($r),o=e?"hsla(":"rgba(",a=0,l,c,u,f;if(!s)return t;if(s=s.map(function(d){return(d=Ig(d,e,1))&&o+(e?d[0]+","+d[1]+"%,"+d[2]+"%,"+d[3]:d.join(","))+")"}),n&&(u=Ug(t),l=n.c,l.join(r)!==u.c.join(r)))for(c=t.replace($r,"1").split(mo),f=c.length-1;a<f;a++)r+=c[a]+(~l.indexOf(a)?s.shift()||o+"0,0,0,0)":(u.length?u:s.length?s:n).shift());if(!c)for(c=t.split($r),f=c.length-1;a<f;a++)r+=c[a]+s[a];return r+c[f]},$r=(function(){var i="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",t;for(t in pa)i+="|"+t+"\\b";return new RegExp(i+")","gi")})(),lM=/hsl[a]?\(/,Ng=function(t){var e=t.join(" "),n;if($r.lastIndex=0,$r.test(e))return n=lM.test(e),t[1]=Mp(t[1],n),t[0]=Mp(t[0],n,Ug(t[1])),!0},Za,ci=(function(){var i=Date.now,t=500,e=33,n=i(),r=n,s=1e3/240,o=s,a=[],l,c,u,f,d,h,g=function _(m){var p=i()-r,b=m===!0,E,v,R,C;if((p>t||p<0)&&(n+=p-e),r+=p,R=r-n,E=R-o,(E>0||b)&&(C=++f.frame,d=R-f.time*1e3,f.time=R=R/1e3,o+=E+(E>=s?4:s-E),v=1),b||(l=c(_)),v)for(h=0;h<a.length;h++)a[h](R,d,C,m)};return f={time:0,frame:0,tick:function(){g(!0)},deltaRatio:function(m){return d/(1e3/(m||60))},wake:function(){hg&&(!Tf&&rd()&&(zi=Tf=window,sd=zi.document||{},pi.gsap=Zn,(zi.gsapVersions||(zi.gsapVersions=[])).push(Zn.version),dg(Pc||zi.GreenSockGlobals||!zi.gsap&&zi||{}),Dg.forEach(Lg)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&f.sleep(),c=u||function(m){return setTimeout(m,o-f.time*1e3+1|0)},Za=1,g(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),Za=0,c=ja},lagSmoothing:function(m,p){t=m||1/0,e=Math.min(p||33,t)},fps:function(m){s=1e3/(m||240),o=f.time*1e3+s},add:function(m,p,b){var E=p?function(v,R,C,A){m(v,R,C,A),f.remove(E)}:m;return f.remove(m),a[b?"unshift":"push"](E),Ho(),E},remove:function(m,p){~(p=a.indexOf(m))&&a.splice(p,1)&&h>=p&&h--},_listeners:a},f})(),Ho=function(){return!Za&&ci.wake()},ue={},cM=/^[\d.\-M][\d.\-,\s]/,uM=/["']/g,fM=function(t){for(var e={},n=t.substr(1,t.length-3).split(":"),r=n[0],s=1,o=n.length,a,l,c;s<o;s++)l=n[s],a=s!==o-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),e[r]=isNaN(c)?c.replace(uM,"").trim():+c,r=l.substr(a+1).trim();return e},hM=function(t){var e=t.indexOf("(")+1,n=t.indexOf(")"),r=t.indexOf("(",e);return t.substring(e,~r&&r<n?t.indexOf(")",n+1):n)},dM=function(t){var e=(t+"").split("("),n=ue[e[0]];return n&&e.length>1&&n.config?n.config.apply(null,~t.indexOf("{")?[fM(e[1])]:hM(t).split(",").map(vg)):ue._CE&&cM.test(t)?ue._CE("",t):n},Og=function(t){return function(e){return 1-t(1-e)}},Fg=function i(t,e){for(var n=t._first,r;n;)n instanceof Fn?i(n,e):n.vars.yoyoEase&&(!n._yoyo||!n._repeat)&&n._yoyo!==e&&(n.timeline?i(n.timeline,e):(r=n._ease,n._ease=n._yEase,n._yEase=r,n._yoyo=e)),n=n._next},Ps=function(t,e){return t&&(He(t)?t:ue[t]||dM(t))||e},Ws=function(t,e,n,r){n===void 0&&(n=function(l){return 1-e(1-l)}),r===void 0&&(r=function(l){return l<.5?e(l*2)/2:1-e((1-l)*2)/2});var s={easeIn:e,easeOut:n,easeInOut:r},o;return $n(t,function(a){ue[a]=pi[a]=s,ue[o=a.toLowerCase()]=n;for(var l in s)ue[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=ue[a+"."+l]=s[l]}),s},Bg=function(t){return function(e){return e<.5?(1-t(1-e*2))/2:.5+t((e-.5)*2)/2}},Mu=function i(t,e,n){var r=e>=1?e:1,s=(n||(t?.3:.45))/(e<1?e:1),o=s/bf*(Math.asin(1/r)||0),a=function(u){return u===1?1:r*Math.pow(2,-10*u)*Hy((u-o)*s)+1},l=t==="out"?a:t==="in"?function(c){return 1-a(1-c)}:Bg(a);return s=bf/s,l.config=function(c,u){return i(t,c,u)},l},Su=function i(t,e){e===void 0&&(e=1.70158);var n=function(o){return o?--o*o*((e+1)*o+e)+1:0},r=t==="out"?n:t==="in"?function(s){return 1-n(1-s)}:Bg(n);return r.config=function(s){return i(t,s)},r};$n("Linear,Quad,Cubic,Quart,Quint,Strong",function(i,t){var e=t<5?t+1:t;Ws(i+",Power"+(e-1),t?function(n){return Math.pow(n,e)}:function(n){return n},function(n){return 1-Math.pow(1-n,e)},function(n){return n<.5?Math.pow(n*2,e)/2:1-Math.pow((1-n)*2,e)/2})});ue.Linear.easeNone=ue.none=ue.Linear.easeIn;Ws("Elastic",Mu("in"),Mu("out"),Mu());(function(i,t){var e=1/t,n=2*e,r=2.5*e,s=function(a){return a<e?i*a*a:a<n?i*Math.pow(a-1.5/t,2)+.75:a<r?i*(a-=2.25/t)*a+.9375:i*Math.pow(a-2.625/t,2)+.984375};Ws("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);Ws("Expo",function(i){return Math.pow(2,10*(i-1))*i+i*i*i*i*i*i*(1-i)});Ws("Circ",function(i){return-(ag(1-i*i)-1)});Ws("Sine",function(i){return i===1?1:-ky(i*By)+1});Ws("Back",Su("in"),Su("out"),Su());ue.SteppedEase=ue.steps=pi.SteppedEase={config:function(t,e){t===void 0&&(t=1);var n=1/t,r=t+(e?0:1),s=e?1:0,o=1-we;return function(a){return((r*ll(0,o,a)|0)+s)*n}}};Fo.ease=ue["quad.out"];$n("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(i){return ld+=i+","+i+"Params,"});var zg=function(t,e){this.id=zy++,t._gsap=this,this.target=t,this.harness=e,this.get=e?e.get:_g,this.set=e?e.getSetter:pd},Ja=(function(){function i(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,ko(this,+e.duration,1,1),this.data=e.data,Ie&&(this._ctx=Ie,Ie.data.push(this)),Za||ci.wake()}var t=i.prototype;return t.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},t.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},t.totalDuration=function(n){return arguments.length?(this._dirty=0,ko(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(n,r){if(Ho(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(eu(this,n),!s._dp||s.parent||Mg(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&Gi(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!r||this._initted&&Math.abs(this._zTime)===we||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),gg(this,n,r)),this},t.time=function(n,r){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+vp(this))%(this._dur+this._rDelay)||(n?this._dur:0),r):this._time},t.totalProgress=function(n,r){return arguments.length?this.totalTime(this.totalDuration()*n,r):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},t.progress=function(n,r){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+vp(this),r):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},t.iteration=function(n,r){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,r):this._repeat?zo(this._tTime,s)+1:1},t.timeScale=function(n,r){if(!arguments.length)return this._rts===-we?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?Ic(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-we?0:this._rts,this.totalTime(ll(-Math.abs(this._delay),this.totalDuration(),s),r!==!1),tu(this),$y(this)},t.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Ho(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==we&&(this._tTime-=we)))),this):this._ps},t.startTime=function(n){if(arguments.length){this._start=n;var r=this.parent||this._dp;return r&&(r._sort||!this.parent)&&Gi(r,this,n-this._delay),this}return this._start},t.endTime=function(n){return this._start+(qn(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(n){var r=this.parent||this._dp;return r?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Ic(r.rawTime(n),this):this._tTime:this._tTime},t.revert=function(n){n===void 0&&(n=Wy);var r=dn;return dn=n,ud(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),dn=r,this},t.globalTime=function(n){for(var r=this,s=arguments.length?n:r.rawTime();r;)s=r._start+s/(Math.abs(r._ts)||1),r=r._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},t.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,xp(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(n){if(arguments.length){var r=this._time;return this._rDelay=n,xp(this),r?this.time(r):this}return this._rDelay},t.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},t.seek=function(n,r){return this.totalTime(vi(this,n),qn(r))},t.restart=function(n,r){return this.play().totalTime(n?-this._delay:0,qn(r)),this._dur||(this._zTime=-we),this},t.play=function(n,r){return n!=null&&this.seek(n,r),this.reversed(!1).paused(!1)},t.reverse=function(n,r){return n!=null&&this.seek(n||this.totalDuration(),r),this.reversed(!0).paused(!1)},t.pause=function(n,r){return n!=null&&this.seek(n,r),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-we:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-we,this},t.isActive=function(){var n=this.parent||this._dp,r=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=r&&s<this.endTime(!0)-we)},t.eventCallback=function(n,r,s){var o=this.vars;return arguments.length>1?(r?(o[n]=r,s&&(o[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=r)):delete o[n],this):o[n]},t.then=function(n){var r=this;return new Promise(function(s){var o=He(n)?n:xg,a=function(){var c=r.then;r.then=null,He(o)&&(o=o(r))&&(o.then||o===r)&&(r.then=c),s(o),r.then=c};r._initted&&r.totalProgress()===1&&r._ts>=0||!r._tTime&&r._ts<0?a():r._prom=a})},t.kill=function(){da(this)},i})();mi(Ja.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-we,_prom:0,_ps:!1,_rts:1});var Fn=(function(i){og(t,i);function t(n,r){var s;return n===void 0&&(n={}),s=i.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=qn(n.sortChildren),Oe&&Gi(n.parent||Oe,fr(s),r),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&Sg(fr(s),n.scrollTrigger),s}var e=t.prototype;return e.to=function(r,s,o){return Pa(0,arguments,this),this},e.from=function(r,s,o){return Pa(1,arguments,this),this},e.fromTo=function(r,s,o,a){return Pa(2,arguments,this),this},e.set=function(r,s,o){return s.duration=0,s.parent=this,Ra(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new qe(r,s,vi(this,o),1),this},e.call=function(r,s,o){return Gi(this,qe.delayedCall(0,r,s),o)},e.staggerTo=function(r,s,o,a,l,c,u){return o.duration=s,o.stagger=o.stagger||a,o.onComplete=c,o.onCompleteParams=u,o.parent=this,new qe(r,o,vi(this,l)),this},e.staggerFrom=function(r,s,o,a,l,c,u){return o.runBackwards=1,Ra(o).immediateRender=qn(o.immediateRender),this.staggerTo(r,s,o,a,l,c,u)},e.staggerFromTo=function(r,s,o,a,l,c,u,f){return a.startAt=o,Ra(a).immediateRender=qn(a.immediateRender),this.staggerTo(r,s,a,l,c,u,f)},e.render=function(r,s,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=r<=0?0:$e(r),f=this._zTime<0!=r<0&&(this._initted||!c),d,h,g,_,m,p,b,E,v,R,C,A;if(this!==Oe&&u>l&&r>=0&&(u=l),u!==this._tTime||o||f){if(a!==this._time&&c&&(u+=this._time-a,r+=this._time-a),d=u,v=this._start,E=this._ts,p=!E,f&&(c||(a=this._zTime),(r||!s)&&(this._zTime=r)),this._repeat){if(C=this._yoyo,m=c+this._rDelay,this._repeat<-1&&r<0)return this.totalTime(m*100+r,s,o);if(d=$e(u%m),u===l?(_=this._repeat,d=c):(R=$e(u/m),_=~~R,_&&_===R&&(d=c,_--),d>c&&(d=c)),R=zo(this._tTime,m),!a&&this._tTime&&R!==_&&this._tTime-R*m-this._dur<=0&&(R=_),C&&_&1&&(d=c-d,A=1),_!==R&&!this._lock){var L=C&&R&1,S=L===(C&&_&1);if(_<R&&(L=!L),a=L?0:u%c?c:u,this._lock=1,this.render(a||(A?0:$e(_*m)),s,!c)._lock=0,this._tTime=u,!s&&this.parent&&hi(this,"onRepeat"),this.vars.repeatRefresh&&!A&&(this.invalidate()._lock=1),a&&a!==this._time||p!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,S&&(this._lock=2,a=L?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!A&&this.invalidate()),this._lock=0,!this._ts&&!p)return this;Fg(this,A)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(b=Jy(this,$e(a),$e(d)),b&&(u-=d-(d=b._start))),this._tTime=u,this._time=d,this._act=!E,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=r,a=0),!a&&u&&!s&&!R&&(hi(this,"onStart"),this._tTime!==u))return this;if(d>=a&&r>=0)for(h=this._first;h;){if(g=h._next,(h._act||d>=h._start)&&h._ts&&b!==h){if(h.parent!==this)return this.render(r,s,o);if(h.render(h._ts>0?(d-h._start)*h._ts:(h._dirty?h.totalDuration():h._tDur)+(d-h._start)*h._ts,s,o),d!==this._time||!this._ts&&!p){b=0,g&&(u+=this._zTime=-we);break}}h=g}else{h=this._last;for(var y=r<0?r:d;h;){if(g=h._prev,(h._act||y<=h._end)&&h._ts&&b!==h){if(h.parent!==this)return this.render(r,s,o);if(h.render(h._ts>0?(y-h._start)*h._ts:(h._dirty?h.totalDuration():h._tDur)+(y-h._start)*h._ts,s,o||dn&&ud(h)),d!==this._time||!this._ts&&!p){b=0,g&&(u+=this._zTime=y?-we:we);break}}h=g}}if(b&&!s&&(this.pause(),b.render(d>=a?0:-we)._zTime=d>=a?1:-1,this._ts))return this._start=v,tu(this),this.render(r,s,o);this._onUpdate&&!s&&hi(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&a)&&(v===this._start||Math.abs(E)!==Math.abs(this._ts))&&(this._lock||((r||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&ts(this,1),!s&&!(r<0&&!a)&&(u||a||!l)&&(hi(this,u===l&&r>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},e.add=function(r,s){var o=this;if(br(s)||(s=vi(this,s,r)),!(r instanceof Ja)){if(En(r))return r.forEach(function(a){return o.add(a,s)}),this;if(cn(r))return this.addLabel(r,s);if(He(r))r=qe.delayedCall(0,r);else return this}return this!==r?Gi(this,r,s):this},e.getChildren=function(r,s,o,a){r===void 0&&(r=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),a===void 0&&(a=-Mi);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof qe?s&&l.push(c):(o&&l.push(c),r&&l.push.apply(l,c.getChildren(!0,s,o)))),c=c._next;return l},e.getById=function(r){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===r)return s[o]},e.remove=function(r){return cn(r)?this.removeLabel(r):He(r)?this.killTweensOf(r):(r.parent===this&&Qc(this,r),r===this._recent&&(this._recent=this._last),Rs(this))},e.totalTime=function(r,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=$e(ci.time-(this._ts>0?r/this._ts:(this.totalDuration()-r)/-this._ts))),i.prototype.totalTime.call(this,r,s),this._forcing=0,this):this._tTime},e.addLabel=function(r,s){return this.labels[r]=vi(this,s),this},e.removeLabel=function(r){return delete this.labels[r],this},e.addPause=function(r,s,o){var a=qe.delayedCall(0,s||ja,o);return a.data="isPause",this._hasPause=1,Gi(this,a,vi(this,r))},e.removePause=function(r){var s=this._first;for(r=vi(this,r);s;)s._start===r&&s.data==="isPause"&&ts(s),s=s._next},e.killTweensOf=function(r,s,o){for(var a=this.getTweensOf(r,o),l=a.length;l--;)Hr!==a[l]&&a[l].kill(r,s);return this},e.getTweensOf=function(r,s){for(var o=[],a=Si(r),l=this._first,c=br(s),u;l;)l instanceof qe?Xy(l._targets,a)&&(c?(!Hr||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&o.push(l):(u=l.getTweensOf(a,s)).length&&o.push.apply(o,u),l=l._next;return o},e.tweenTo=function(r,s){s=s||{};var o=this,a=vi(o,r),l=s,c=l.startAt,u=l.onStart,f=l.onStartParams,d=l.immediateRender,h,g=qe.to(o,mi({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale())||we,onStart:function(){if(o.pause(),!h){var m=s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale());g._dur!==m&&ko(g,m,0,1).render(g._time,!0,!0),h=1}u&&u.apply(g,f||[])}},s));return d?g.render(0):g},e.tweenFromTo=function(r,s,o){return this.tweenTo(s,mi({startAt:{time:vi(this,r)}},o))},e.recent=function(){return this._recent},e.nextLabel=function(r){return r===void 0&&(r=this._time),yp(this,vi(this,r))},e.previousLabel=function(r){return r===void 0&&(r=this._time),yp(this,vi(this,r),1)},e.currentLabel=function(r){return arguments.length?this.seek(r,!0):this.previousLabel(this._time+we)},e.shiftChildren=function(r,s,o){o===void 0&&(o=0);for(var a=this._first,l=this.labels,c;a;)a._start>=o&&(a._start+=r,a._end+=r),a=a._next;if(s)for(c in l)l[c]>=o&&(l[c]+=r);return Rs(this)},e.invalidate=function(r){var s=this._first;for(this._lock=0;s;)s.invalidate(r),s=s._next;return i.prototype.invalidate.call(this,r)},e.clear=function(r){r===void 0&&(r=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),r&&(this.labels={}),Rs(this)},e.totalDuration=function(r){var s=0,o=this,a=o._last,l=Mi,c,u,f;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-r:r));if(o._dirty){for(f=o.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),u=a._start,u>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,Gi(o,a,u-a._delay,1)._lock=0):l=u,u<0&&a._ts&&(s-=u,(!f&&!o._dp||f&&f.smoothChildTiming)&&(o._start+=u/o._ts,o._time-=u,o._tTime-=u),o.shiftChildren(-u,!1,-1/0),l=0),a._end>s&&a._ts&&(s=a._end),a=c;ko(o,o===Oe&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},t.updateRoot=function(r){if(Oe._ts&&(gg(Oe,Ic(r,Oe)),mg=ci.frame),ci.frame>=_p){_p+=di.autoSleep||120;var s=Oe._first;if((!s||!s._ts)&&di.autoSleep&&ci._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||ci.sleep()}}},t})(Ja);mi(Fn.prototype,{_lock:0,_hasPause:0,_forcing:0});var pM=function(t,e,n,r,s,o,a){var l=new jn(this._pt,t,e,0,1,Xg,null,s),c=0,u=0,f,d,h,g,_,m,p,b;for(l.b=n,l.e=r,n+="",r+="",(p=~r.indexOf("random("))&&(r=Ka(r)),o&&(b=[n,r],o(b,t,e),n=b[0],r=b[1]),d=n.match(vu)||[];f=vu.exec(r);)g=f[0],_=r.substring(c,f.index),h?h=(h+1)%5:_.substr(-5)==="rgba("&&(h=1),g!==d[u++]&&(m=parseFloat(d[u-1])||0,l._pt={_next:l._pt,p:_||u===1?_:",",s:m,c:g.charAt(1)==="="?To(m,g)-m:parseFloat(g)-m,m:h&&h<4?Math.round:0},c=vu.lastIndex);return l.c=c<r.length?r.substring(c,r.length):"",l.fp=a,(ug.test(r)||p)&&(l.e=0),this._pt=l,l},fd=function(t,e,n,r,s,o,a,l,c,u){He(r)&&(r=r(s||0,t,o));var f=t[e],d=n!=="get"?n:He(f)?c?t[e.indexOf("set")||!He(t["get"+e.substr(3)])?e:"get"+e.substr(3)](c):t[e]():f,h=He(f)?c?xM:Gg:dd,g;if(cn(r)&&(~r.indexOf("random(")&&(r=Ka(r)),r.charAt(1)==="="&&(g=To(d,r)+(Mn(d)||0),(g||g===0)&&(r=g))),!u||d!==r||Lf)return!isNaN(d*r)&&r!==""?(g=new jn(this._pt,t,e,+d||0,r-(d||0),typeof f=="boolean"?MM:Wg,0,h),c&&(g.fp=c),a&&g.modifier(a,this,t),this._pt=g):(!f&&!(e in t)&&od(e,r),pM.call(this,t,e,d,r,h,l||di.stringFilter,c))},mM=function(t,e,n,r,s){if(He(t)&&(t=Da(t,s,e,n,r)),!Ji(t)||t.style&&t.nodeType||En(t)||lg(t))return cn(t)?Da(t,s,e,n,r):t;var o={},a;for(a in t)o[a]=Da(t[a],s,e,n,r);return o},kg=function(t,e,n,r,s,o){var a,l,c,u;if(si[t]&&(a=new si[t]).init(s,a.rawVars?e[t]:mM(e[t],r,s,o,n),n,r,o)!==!1&&(n._pt=l=new jn(n._pt,s,t,0,1,a.render,a,0,a.priority),n!==_o))for(c=n._ptLookup[n._targets.indexOf(s)],u=a._props.length;u--;)c[a._props[u]]=l;return a},Hr,Lf,hd=function i(t,e,n){var r=t.vars,s=r.ease,o=r.startAt,a=r.immediateRender,l=r.lazy,c=r.onUpdate,u=r.runBackwards,f=r.yoyoEase,d=r.keyframes,h=r.autoRevert,g=t._dur,_=t._startAt,m=t._targets,p=t.parent,b=p&&p.data==="nested"?p.vars.targets:m,E=t._overwrite==="auto"&&!nd,v=t.timeline,R,C,A,L,S,y,I,B,G,Y,et,V,K;if(v&&(!d||!s)&&(s="none"),t._ease=Ps(s,Fo.ease),t._yEase=f?Og(Ps(f===!0?s:f,Fo.ease)):0,f&&t._yoyo&&!t._repeat&&(f=t._yEase,t._yEase=t._ease,t._ease=f),t._from=!v&&!!r.runBackwards,!v||d&&!r.stagger){if(B=m[0]?Cs(m[0]).harness:0,V=B&&r[B.prop],R=Lc(r,ad),_&&(_._zTime<0&&_.progress(1),e<0&&u&&a&&!h?_.render(-1,!0):_.revert(u&&g?ac:Gy),_._lazy=0),o){if(ts(t._startAt=qe.set(m,mi({data:"isStart",overwrite:!1,parent:p,immediateRender:!0,lazy:!_&&qn(l),startAt:null,delay:0,onUpdate:c&&function(){return hi(t,"onUpdate")},stagger:0},o))),t._startAt._dp=0,t._startAt._sat=t,e<0&&(dn||!a&&!h)&&t._startAt.revert(ac),a&&g&&e<=0&&n<=0){e&&(t._zTime=e);return}}else if(u&&g&&!_){if(e&&(a=!1),A=mi({overwrite:!1,data:"isFromStart",lazy:a&&!_&&qn(l),immediateRender:a,stagger:0,parent:p},R),V&&(A[B.prop]=V),ts(t._startAt=qe.set(m,A)),t._startAt._dp=0,t._startAt._sat=t,e<0&&(dn?t._startAt.revert(ac):t._startAt.render(-1,!0)),t._zTime=e,!a)i(t._startAt,we,we);else if(!e)return}for(t._pt=t._ptCache=0,l=g&&qn(l)||l&&!g,C=0;C<m.length;C++){if(S=m[C],I=S._gsap||cd(m)[C]._gsap,t._ptLookup[C]=Y={},wf[I.id]&&qr.length&&Dc(),et=b===m?C:b.indexOf(S),B&&(G=new B).init(S,V||R,t,et,b)!==!1&&(t._pt=L=new jn(t._pt,S,G.name,0,1,G.render,G,0,G.priority),G._props.forEach(function(k){Y[k]=L}),G.priority&&(y=1)),!B||V)for(A in R)si[A]&&(G=kg(A,R,t,et,S,b))?G.priority&&(y=1):Y[A]=L=fd.call(t,S,A,"get",R[A],et,b,0,r.stringFilter);t._op&&t._op[C]&&t.kill(S,t._op[C]),E&&t._pt&&(Hr=t,Oe.killTweensOf(S,Y,t.globalTime(e)),K=!t.parent,Hr=0),t._pt&&l&&(wf[I.id]=1)}y&&Yg(t),t._onInit&&t._onInit(t)}t._onUpdate=c,t._initted=(!t._op||t._pt)&&!K,d&&e<=0&&v.render(Mi,!0,!0)},_M=function(t,e,n,r,s,o,a,l){var c=(t._pt&&t._ptCache||(t._ptCache={}))[e],u,f,d,h;if(!c)for(c=t._ptCache[e]=[],d=t._ptLookup,h=t._targets.length;h--;){if(u=d[h][e],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==e&&u.fp!==e;)u=u._next;if(!u)return Lf=1,t.vars[e]="+=0",hd(t,a),Lf=0,l?$a(e+" not eligible for reset"):1;c.push(u)}for(h=c.length;h--;)f=c[h],u=f._pt||f,u.s=(r||r===0)&&!s?r:u.s+(r||0)+o*u.c,u.c=n-u.s,f.e&&(f.e=Ge(n)+Mn(f.e)),f.b&&(f.b=u.s+Mn(f.b))},gM=function(t,e){var n=t[0]?Cs(t[0]).harness:0,r=n&&n.aliases,s,o,a,l;if(!r)return e;s=Bo({},e);for(o in r)if(o in s)for(l=r[o].split(","),a=l.length;a--;)s[l[a]]=s[o];return s},vM=function(t,e,n,r){var s=e.ease||r||"power1.inOut",o,a;if(En(e))a=n[t]||(n[t]=[]),e.forEach(function(l,c){return a.push({t:c/(e.length-1)*100,v:l,e:s})});else for(o in e)a=n[o]||(n[o]=[]),o==="ease"||a.push({t:parseFloat(t),v:e[o],e:s})},Da=function(t,e,n,r,s){return He(t)?t.call(e,n,r,s):cn(t)&&~t.indexOf("random(")?Ka(t):t},Hg=ld+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",Vg={};$n(Hg+",id,stagger,delay,duration,paused,scrollTrigger",function(i){return Vg[i]=1});var qe=(function(i){og(t,i);function t(n,r,s,o){var a;typeof r=="number"&&(s.duration=r,r=s,s=null),a=i.call(this,o?r:Ra(r))||this;var l=a.vars,c=l.duration,u=l.delay,f=l.immediateRender,d=l.stagger,h=l.overwrite,g=l.keyframes,_=l.defaults,m=l.scrollTrigger,p=l.yoyoEase,b=r.parent||Oe,E=(En(n)||lg(n)?br(n[0]):"length"in r)?[n]:Si(n),v,R,C,A,L,S,y,I;if(a._targets=E.length?cd(E):$a("GSAP target "+n+" not found. https://gsap.com",!di.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=h,g||d||gl(c)||gl(u)){if(r=a.vars,v=a.timeline=new Fn({data:"nested",defaults:_||{},targets:b&&b.data==="nested"?b.vars.targets:E}),v.kill(),v.parent=v._dp=fr(a),v._start=0,d||gl(c)||gl(u)){if(A=E.length,y=d&&wg(d),Ji(d))for(L in d)~Hg.indexOf(L)&&(I||(I={}),I[L]=d[L]);for(R=0;R<A;R++)C=Lc(r,Vg),C.stagger=0,p&&(C.yoyoEase=p),I&&Bo(C,I),S=E[R],C.duration=+Da(c,fr(a),R,S,E),C.delay=(+Da(u,fr(a),R,S,E)||0)-a._delay,!d&&A===1&&C.delay&&(a._delay=u=C.delay,a._start+=u,C.delay=0),v.to(S,C,y?y(R,S,E):0),v._ease=ue.none;v.duration()?c=u=0:a.timeline=0}else if(g){Ra(mi(v.vars.defaults,{ease:"none"})),v._ease=Ps(g.ease||r.ease||"none");var B=0,G,Y,et;if(En(g))g.forEach(function(V){return v.to(E,V,">")}),v.duration();else{C={};for(L in g)L==="ease"||L==="easeEach"||vM(L,g[L],C,g.easeEach);for(L in C)for(G=C[L].sort(function(V,K){return V.t-K.t}),B=0,R=0;R<G.length;R++)Y=G[R],et={ease:Y.e,duration:(Y.t-(R?G[R-1].t:0))/100*c},et[L]=Y.v,v.to(E,et,B),B+=et.duration;v.duration()<c&&v.to({},{duration:c-v.duration()})}}c||a.duration(c=v.duration())}else a.timeline=0;return h===!0&&!nd&&(Hr=fr(a),Oe.killTweensOf(E),Hr=0),Gi(b,fr(a),s),r.reversed&&a.reverse(),r.paused&&a.paused(!0),(f||!c&&!g&&a._start===$e(b._time)&&qn(f)&&jy(fr(a))&&b.data!=="nested")&&(a._tTime=-we,a.render(Math.max(0,-u)||0)),m&&Sg(fr(a),m),a}var e=t.prototype;return e.render=function(r,s,o){var a=this._time,l=this._tDur,c=this._dur,u=r<0,f=r>l-we&&!u?l:r<we?0:r,d,h,g,_,m,p,b,E,v;if(!c)Zy(this,r,s,o);else if(f!==this._tTime||!r||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(d=f,E=this.timeline,this._repeat){if(_=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(_*100+r,s,o);if(d=$e(f%_),f===l?(g=this._repeat,d=c):(m=$e(f/_),g=~~m,g&&g===m?(d=c,g--):d>c&&(d=c)),p=this._yoyo&&g&1,p&&(v=this._yEase,d=c-d),m=zo(this._tTime,_),d===a&&!o&&this._initted&&g===m)return this._tTime=f,this;g!==m&&(E&&this._yEase&&Fg(E,p),this.vars.repeatRefresh&&!p&&!this._lock&&d!==_&&this._initted&&(this._lock=o=1,this.render($e(_*g),!0).invalidate()._lock=0))}if(!this._initted){if(bg(this,u?r:d,o,s,f))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&g!==m))return this;if(c!==this._dur)return this.render(r,s,o)}if(this._tTime=f,this._time=d,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=b=(v||this._ease)(d/c),this._from&&(this.ratio=b=1-b),!a&&f&&!s&&!m&&(hi(this,"onStart"),this._tTime!==f))return this;for(h=this._pt;h;)h.r(b,h.d),h=h._next;E&&E.render(r<0?r:E._dur*E._ease(d/this._dur),s,o)||this._startAt&&(this._zTime=r),this._onUpdate&&!s&&(u&&Af(this,r,s,o),hi(this,"onUpdate")),this._repeat&&g!==m&&this.vars.onRepeat&&!s&&this.parent&&hi(this,"onRepeat"),(f===this._tDur||!f)&&this._tTime===f&&(u&&!this._onUpdate&&Af(this,r,!0,!0),(r||!c)&&(f===this._tDur&&this._ts>0||!f&&this._ts<0)&&ts(this,1),!s&&!(u&&!a)&&(f||a||p)&&(hi(this,f===l?"onComplete":"onReverseComplete",!0),this._prom&&!(f<l&&this.timeScale()>0)&&this._prom()))}return this},e.targets=function(){return this._targets},e.invalidate=function(r){return(!r||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(r),i.prototype.invalidate.call(this,r)},e.resetTo=function(r,s,o,a,l){Za||ci.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||hd(this,c),u=this._ease(c/this._dur),_M(this,r,s,o,a,u,c,l)?this.resetTo(r,s,o,a,1):(eu(this,0),this.parent||yg(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},e.kill=function(r,s){if(s===void 0&&(s="all"),!r&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?da(this):this.scrollTrigger&&this.scrollTrigger.kill(!!dn),this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(r,s,Hr&&Hr.vars.overwrite!==!0)._first||da(this),this.parent&&o!==this.timeline.totalDuration()&&ko(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=r?Si(r):a,c=this._ptLookup,u=this._pt,f,d,h,g,_,m,p;if((!s||s==="all")&&qy(a,l))return s==="all"&&(this._pt=0),da(this);for(f=this._op=this._op||[],s!=="all"&&(cn(s)&&(_={},$n(s,function(b){return _[b]=1}),s=_),s=gM(a,s)),p=a.length;p--;)if(~l.indexOf(a[p])){d=c[p],s==="all"?(f[p]=s,g=d,h={}):(h=f[p]=f[p]||{},g=s);for(_ in g)m=d&&d[_],m&&((!("kill"in m.d)||m.d.kill(_)===!0)&&Qc(this,m,"_pt"),delete d[_]),h!=="all"&&(h[_]=1)}return this._initted&&!this._pt&&u&&da(this),this},t.to=function(r,s){return new t(r,s,arguments[2])},t.from=function(r,s){return Pa(1,arguments)},t.delayedCall=function(r,s,o,a){return new t(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:r,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},t.fromTo=function(r,s,o){return Pa(2,arguments)},t.set=function(r,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new t(r,s)},t.killTweensOf=function(r,s,o){return Oe.killTweensOf(r,s,o)},t})(Ja);mi(qe.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});$n("staggerTo,staggerFrom,staggerFromTo",function(i){qe[i]=function(){var t=new Fn,e=Rf.call(arguments,0);return e.splice(i==="staggerFromTo"?5:4,0,0),t[i].apply(t,e)}});var dd=function(t,e,n){return t[e]=n},Gg=function(t,e,n){return t[e](n)},xM=function(t,e,n,r){return t[e](r.fp,n)},yM=function(t,e,n){return t.setAttribute(e,n)},pd=function(t,e){return He(t[e])?Gg:id(t[e])&&t.setAttribute?yM:dd},Wg=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e6)/1e6,e)},MM=function(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},Xg=function(t,e){var n=e._pt,r="";if(!t&&e.b)r=e.b;else if(t===1&&e.e)r=e.e;else{for(;n;)r=n.p+(n.m?n.m(n.s+n.c*t):Math.round((n.s+n.c*t)*1e4)/1e4)+r,n=n._next;r+=e.c}e.set(e.t,e.p,r,e)},md=function(t,e){for(var n=e._pt;n;)n.r(t,n.d),n=n._next},SM=function(t,e,n,r){for(var s=this._pt,o;s;)o=s._next,s.p===r&&s.modifier(t,e,n),s=o},bM=function(t){for(var e=this._pt,n,r;e;)r=e._next,e.p===t&&!e.op||e.op===t?Qc(this,e,"_pt"):e.dep||(n=1),e=r;return!n},EM=function(t,e,n,r){r.mSet(t,e,r.m.call(r.tween,n,r.mt),r)},Yg=function(t){for(var e=t._pt,n,r,s,o;e;){for(n=e._next,r=s;r&&r.pr>e.pr;)r=r._next;(e._prev=r?r._prev:o)?e._prev._next=e:s=e,(e._next=r)?r._prev=e:o=e,e=n}t._pt=s},jn=(function(){function i(e,n,r,s,o,a,l,c,u){this.t=n,this.s=s,this.c=o,this.p=r,this.r=a||Wg,this.d=l||this,this.set=c||dd,this.pr=u||0,this._next=e,e&&(e._prev=this)}var t=i.prototype;return t.modifier=function(n,r,s){this.mSet=this.mSet||this.set,this.set=EM,this.m=n,this.mt=s,this.tween=r},i})();$n(ld+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(i){return ad[i]=1});pi.TweenMax=pi.TweenLite=qe;pi.TimelineLite=pi.TimelineMax=Fn;Oe=new Fn({sortChildren:!1,defaults:Fo,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});di.stringFilter=Ng;var Ds=[],cc={},TM=[],Sp=0,wM=0,bu=function(t){return(cc[t]||TM).map(function(e){return e()})},If=function(){var t=Date.now(),e=[];t-Sp>2&&(bu("matchMediaInit"),Ds.forEach(function(n){var r=n.queries,s=n.conditions,o,a,l,c;for(a in r)o=zi.matchMedia(r[a]).matches,o&&(l=1),o!==s[a]&&(s[a]=o,c=1);c&&(n.revert(),l&&e.push(n))}),bu("matchMediaRevert"),e.forEach(function(n){return n.onMatch(n,function(r){return n.add(null,r)})}),Sp=t,bu("matchMedia"))},qg=(function(){function i(e,n){this.selector=n&&Pf(n),this.data=[],this._r=[],this.isReverted=!1,this.id=wM++,e&&this.add(e)}var t=i.prototype;return t.add=function(n,r,s){He(n)&&(s=r,r=n,n=He);var o=this,a=function(){var c=Ie,u=o.selector,f;return c&&c!==o&&c.data.push(o),s&&(o.selector=Pf(s)),Ie=o,f=r.apply(o,arguments),He(f)&&o._r.push(f),Ie=c,o.selector=u,o.isReverted=!1,f};return o.last=a,n===He?a(o,function(l){return o.add(null,l)}):n?o[n]=a:a},t.ignore=function(n){var r=Ie;Ie=null,n(this),Ie=r},t.getTweens=function(){var n=[];return this.data.forEach(function(r){return r instanceof i?n.push.apply(n,r.getTweens()):r instanceof qe&&!(r.parent&&r.parent.data==="nested")&&n.push(r)}),n},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(n,r){var s=this;if(n?(function(){for(var a=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return a.splice(a.indexOf(u),1)}));for(a.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,f){return f.g-u.g||-1/0}).forEach(function(u){return u.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof Fn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof qe)&&c.revert&&c.revert(n);s._r.forEach(function(u){return u(n,s)}),s.isReverted=!0})():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),r)for(var o=Ds.length;o--;)Ds[o].id===this.id&&Ds.splice(o,1)},t.revert=function(n){this.kill(n||{})},i})(),AM=(function(){function i(e){this.contexts=[],this.scope=e,Ie&&Ie.data.push(this)}var t=i.prototype;return t.add=function(n,r,s){Ji(n)||(n={matches:n});var o=new qg(0,s||this.scope),a=o.conditions={},l,c,u;Ie&&!o.selector&&(o.selector=Ie.selector),this.contexts.push(o),r=o.add("onMatch",r),o.queries=n;for(c in n)c==="all"?u=1:(l=zi.matchMedia(n[c]),l&&(Ds.indexOf(o)<0&&Ds.push(o),(a[c]=l.matches)&&(u=1),l.addListener?l.addListener(If):l.addEventListener("change",If)));return u&&r(o,function(f){return o.add(null,f)}),this},t.revert=function(n){this.kill(n||{})},t.kill=function(n){this.contexts.forEach(function(r){return r.kill(n,!0)})},i})(),Uc={registerPlugin:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];e.forEach(function(r){return Lg(r)})},timeline:function(t){return new Fn(t)},getTweensOf:function(t,e){return Oe.getTweensOf(t,e)},getProperty:function(t,e,n,r){cn(t)&&(t=Si(t)[0]);var s=Cs(t||{}).get,o=n?xg:vg;return n==="native"&&(n=""),t&&(e?o((si[e]&&si[e].get||s)(t,e,n,r)):function(a,l,c){return o((si[a]&&si[a].get||s)(t,a,l,c))})},quickSetter:function(t,e,n){if(t=Si(t),t.length>1){var r=t.map(function(u){return Zn.quickSetter(u,e,n)}),s=r.length;return function(u){for(var f=s;f--;)r[f](u)}}t=t[0]||{};var o=si[e],a=Cs(t),l=a.harness&&(a.harness.aliases||{})[e]||e,c=o?function(u){var f=new o;_o._pt=0,f.init(t,n?u+n:u,_o,0,[t]),f.render(1,f),_o._pt&&md(1,_o)}:a.set(t,l);return o?c:function(u){return c(t,l,n?u+n:u,a,1)}},quickTo:function(t,e,n){var r,s=Zn.to(t,mi((r={},r[e]="+=0.1",r.paused=!0,r.stagger=0,r),n||{})),o=function(l,c,u){return s.resetTo(e,l,c,u)};return o.tween=s,o},isTweening:function(t){return Oe.getTweensOf(t,!0).length>0},defaults:function(t){return t&&t.ease&&(t.ease=Ps(t.ease,Fo.ease)),gp(Fo,t||{})},config:function(t){return gp(di,t||{})},registerEffect:function(t){var e=t.name,n=t.effect,r=t.plugins,s=t.defaults,o=t.extendTimeline;(r||"").split(",").forEach(function(a){return a&&!si[a]&&!pi[a]&&$a(e+" effect requires "+a+" plugin.")}),xu[e]=function(a,l,c){return n(Si(a),mi(l||{},s),c)},o&&(Fn.prototype[e]=function(a,l,c){return this.add(xu[e](a,Ji(l)?l:(c=l)&&{},this),c)})},registerEase:function(t,e){ue[t]=Ps(e)},parseEase:function(t,e){return arguments.length?Ps(t,e):ue},getById:function(t){return Oe.getById(t)},exportRoot:function(t,e){t===void 0&&(t={});var n=new Fn(t),r,s;for(n.smoothChildTiming=qn(t.smoothChildTiming),Oe.remove(n),n._dp=0,n._time=n._tTime=Oe._time,r=Oe._first;r;)s=r._next,(e||!(!r._dur&&r instanceof qe&&r.vars.onComplete===r._targets[0]))&&Gi(n,r,r._start-r._delay),r=s;return Gi(Oe,n,0),n},context:function(t,e){return t?new qg(t,e):Ie},matchMedia:function(t){return new AM(t)},matchMediaRefresh:function(){return Ds.forEach(function(t){var e=t.conditions,n,r;for(r in e)e[r]&&(e[r]=!1,n=1);n&&t.revert()})||If()},addEventListener:function(t,e){var n=cc[t]||(cc[t]=[]);~n.indexOf(e)||n.push(e)},removeEventListener:function(t,e){var n=cc[t],r=n&&n.indexOf(e);r>=0&&n.splice(r,1)},utils:{wrap:sM,wrapYoyo:oM,distribute:wg,random:Cg,snap:Ag,normalize:rM,getUnit:Mn,clamp:tM,splitColor:Ig,toArray:Si,selector:Pf,mapRange:Pg,pipe:nM,unitize:iM,interpolate:aM,shuffle:Tg},install:dg,effects:xu,ticker:ci,updateRoot:Fn.updateRoot,plugins:si,globalTimeline:Oe,core:{PropTween:jn,globals:pg,Tween:qe,Timeline:Fn,Animation:Ja,getCache:Cs,_removeLinkedListItem:Qc,reverting:function(){return dn},context:function(t){return t&&Ie&&(Ie.data.push(t),t._ctx=Ie),Ie},suppressOverwrites:function(t){return nd=t}}};$n("to,from,fromTo,delayedCall,set,killTweensOf",function(i){return Uc[i]=qe[i]});ci.add(Fn.updateRoot);_o=Uc.to({},{duration:0});var CM=function(t,e){for(var n=t._pt;n&&n.p!==e&&n.op!==e&&n.fp!==e;)n=n._next;return n},RM=function(t,e){var n=t._targets,r,s,o;for(r in e)for(s=n.length;s--;)o=t._ptLookup[s][r],o&&(o=o.d)&&(o._pt&&(o=CM(o,r)),o&&o.modifier&&o.modifier(e[r],t,n[s],r))},Eu=function(t,e){return{name:t,headless:1,rawVars:1,init:function(r,s,o){o._onInit=function(a){var l,c;if(cn(s)&&(l={},$n(s,function(u){return l[u]=1}),s=l),e){l={};for(c in s)l[c]=e(s[c]);s=l}RM(a,s)}}}},Zn=Uc.registerPlugin({name:"attr",init:function(t,e,n,r,s){var o,a,l;this.tween=n;for(o in e)l=t.getAttribute(o)||"",a=this.add(t,"setAttribute",(l||0)+"",e[o],r,s,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(t,e){for(var n=e._pt;n;)dn?n.set(n.t,n.p,n.b,n):n.r(t,n.d),n=n._next}},{name:"endArray",headless:1,init:function(t,e){for(var n=e.length;n--;)this.add(t,n,t[n]||0,e[n],0,0,0,0,0,1)}},Eu("roundProps",Df),Eu("modifiers"),Eu("snap",Ag))||Uc;qe.version=Fn.version=Zn.version="3.13.0";hg=1;rd()&&Ho();ue.Power0;ue.Power1;ue.Power2;ue.Power3;ue.Power4;ue.Linear;ue.Quad;ue.Cubic;ue.Quart;ue.Quint;ue.Strong;ue.Elastic;ue.Back;ue.SteppedEase;ue.Bounce;ue.Sine;ue.Expo;ue.Circ;var bp,Vr,wo,_d,bs,Ep,gd,PM=function(){return typeof window<"u"},Er={},gs=180/Math.PI,Ao=Math.PI/180,$s=Math.atan2,Tp=1e8,vd=/([A-Z])/g,DM=/(left|right|width|margin|padding|x)/i,LM=/[\s,\(]\S/,Xi={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Uf=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},IM=function(t,e){return e.set(e.t,e.p,t===1?e.e:Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},UM=function(t,e){return e.set(e.t,e.p,t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},NM=function(t,e){var n=e.s+e.c*t;e.set(e.t,e.p,~~(n+(n<0?-.5:.5))+e.u,e)},$g=function(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)},jg=function(t,e){return e.set(e.t,e.p,t!==1?e.b:e.e,e)},OM=function(t,e,n){return t.style[e]=n},FM=function(t,e,n){return t.style.setProperty(e,n)},BM=function(t,e,n){return t._gsap[e]=n},zM=function(t,e,n){return t._gsap.scaleX=t._gsap.scaleY=n},kM=function(t,e,n,r,s){var o=t._gsap;o.scaleX=o.scaleY=n,o.renderTransform(s,o)},HM=function(t,e,n,r,s){var o=t._gsap;o[e]=n,o.renderTransform(s,o)},Fe="transform",Kn=Fe+"Origin",VM=function i(t,e){var n=this,r=this.target,s=r.style,o=r._gsap;if(t in Er&&s){if(this.tfm=this.tfm||{},t!=="transform")t=Xi[t]||t,~t.indexOf(",")?t.split(",").forEach(function(a){return n.tfm[a]=hr(r,a)}):this.tfm[t]=o.x?o[t]:hr(r,t),t===Kn&&(this.tfm.zOrigin=o.zOrigin);else return Xi.transform.split(",").forEach(function(a){return i.call(n,a,e)});if(this.props.indexOf(Fe)>=0)return;o.svg&&(this.svgo=r.getAttribute("data-svg-origin"),this.props.push(Kn,e,"")),t=Fe}(s||e)&&this.props.push(t,e,s[t])},Kg=function(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))},GM=function(){var t=this.props,e=this.target,n=e.style,r=e._gsap,s,o;for(s=0;s<t.length;s+=3)t[s+1]?t[s+1]===2?e[t[s]](t[s+2]):e[t[s]]=t[s+2]:t[s+2]?n[t[s]]=t[s+2]:n.removeProperty(t[s].substr(0,2)==="--"?t[s]:t[s].replace(vd,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)r[o]=this.tfm[o];r.svg&&(r.renderTransform(),e.setAttribute("data-svg-origin",this.svgo||"")),s=gd(),(!s||!s.isStart)&&!n[Fe]&&(Kg(n),r.zOrigin&&n[Kn]&&(n[Kn]+=" "+r.zOrigin+"px",r.zOrigin=0,r.renderTransform()),r.uncache=1)}},Zg=function(t,e){var n={target:t,props:[],revert:GM,save:VM};return t._gsap||Zn.core.getCache(t),e&&t.style&&t.nodeType&&e.split(",").forEach(function(r){return n.save(r)}),n},Jg,Nf=function(t,e){var n=Vr.createElementNS?Vr.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):Vr.createElement(t);return n&&n.style?n:Vr.createElement(t)},bi=function i(t,e,n){var r=getComputedStyle(t);return r[e]||r.getPropertyValue(e.replace(vd,"-$1").toLowerCase())||r.getPropertyValue(e)||!n&&i(t,Vo(e)||e,1)||""},wp="O,Moz,ms,Ms,Webkit".split(","),Vo=function(t,e,n){var r=e||bs,s=r.style,o=5;if(t in s&&!n)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);o--&&!(wp[o]+t in s););return o<0?null:(o===3?"ms":o>=0?wp[o]:"")+t},Of=function(){PM()&&window.document&&(bp=window,Vr=bp.document,wo=Vr.documentElement,bs=Nf("div")||{style:{}},Nf("div"),Fe=Vo(Fe),Kn=Fe+"Origin",bs.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Jg=!!Vo("perspective"),gd=Zn.core.reverting,_d=1)},Ap=function(t){var e=t.ownerSVGElement,n=Nf("svg",e&&e.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),r=t.cloneNode(!0),s;r.style.display="block",n.appendChild(r),wo.appendChild(n);try{s=r.getBBox()}catch{}return n.removeChild(r),wo.removeChild(n),s},Cp=function(t,e){for(var n=e.length;n--;)if(t.hasAttribute(e[n]))return t.getAttribute(e[n])},Qg=function(t){var e,n;try{e=t.getBBox()}catch{e=Ap(t),n=1}return e&&(e.width||e.height)||n||(e=Ap(t)),e&&!e.width&&!e.x&&!e.y?{x:+Cp(t,["x","cx","x1"])||0,y:+Cp(t,["y","cy","y1"])||0,width:0,height:0}:e},t0=function(t){return!!(t.getCTM&&(!t.parentNode||t.ownerSVGElement)&&Qg(t))},Os=function(t,e){if(e){var n=t.style,r;e in Er&&e!==Kn&&(e=Fe),n.removeProperty?(r=e.substr(0,2),(r==="ms"||e.substr(0,6)==="webkit")&&(e="-"+e),n.removeProperty(r==="--"?e:e.replace(vd,"-$1").toLowerCase())):n.removeAttribute(e)}},Gr=function(t,e,n,r,s,o){var a=new jn(t._pt,e,n,0,1,o?jg:$g);return t._pt=a,a.b=r,a.e=s,t._props.push(n),a},Rp={deg:1,rad:1,turn:1},WM={grid:1,flex:1},es=function i(t,e,n,r){var s=parseFloat(n)||0,o=(n+"").trim().substr((s+"").length)||"px",a=bs.style,l=DM.test(e),c=t.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),f=100,d=r==="px",h=r==="%",g,_,m,p;if(r===o||!s||Rp[r]||Rp[o])return s;if(o!=="px"&&!d&&(s=i(t,e,n,"px")),p=t.getCTM&&t0(t),(h||o==="%")&&(Er[e]||~e.indexOf("adius")))return g=p?t.getBBox()[l?"width":"height"]:t[u],Ge(h?s/g*f:s/100*g);if(a[l?"width":"height"]=f+(d?o:r),_=r!=="rem"&&~e.indexOf("adius")||r==="em"&&t.appendChild&&!c?t:t.parentNode,p&&(_=(t.ownerSVGElement||{}).parentNode),(!_||_===Vr||!_.appendChild)&&(_=Vr.body),m=_._gsap,m&&h&&m.width&&l&&m.time===ci.time&&!m.uncache)return Ge(s/m.width*f);if(h&&(e==="height"||e==="width")){var b=t.style[e];t.style[e]=f+r,g=t[u],b?t.style[e]=b:Os(t,e)}else(h||o==="%")&&!WM[bi(_,"display")]&&(a.position=bi(t,"position")),_===t&&(a.position="static"),_.appendChild(bs),g=bs[u],_.removeChild(bs),a.position="absolute";return l&&h&&(m=Cs(_),m.time=ci.time,m.width=_[u]),Ge(d?g*s/f:g&&s?f/g*s:0)},hr=function(t,e,n,r){var s;return _d||Of(),e in Xi&&e!=="transform"&&(e=Xi[e],~e.indexOf(",")&&(e=e.split(",")[0])),Er[e]&&e!=="transform"?(s=tl(t,r),s=e!=="transformOrigin"?s[e]:s.svg?s.origin:Oc(bi(t,Kn))+" "+s.zOrigin+"px"):(s=t.style[e],(!s||s==="auto"||r||~(s+"").indexOf("calc("))&&(s=Nc[e]&&Nc[e](t,e,n)||bi(t,e)||_g(t,e)||(e==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?es(t,e,s,n)+n:s},XM=function(t,e,n,r){if(!n||n==="none"){var s=Vo(e,t,1),o=s&&bi(t,s,1);o&&o!==n?(e=s,n=o):e==="borderColor"&&(n=bi(t,"borderTopColor"))}var a=new jn(this._pt,t.style,e,0,1,Xg),l=0,c=0,u,f,d,h,g,_,m,p,b,E,v,R;if(a.b=n,a.e=r,n+="",r+="",r.substring(0,6)==="var(--"&&(r=bi(t,r.substring(4,r.indexOf(")")))),r==="auto"&&(_=t.style[e],t.style[e]=r,r=bi(t,e)||r,_?t.style[e]=_:Os(t,e)),u=[n,r],Ng(u),n=u[0],r=u[1],d=n.match(mo)||[],R=r.match(mo)||[],R.length){for(;f=mo.exec(r);)m=f[0],b=r.substring(l,f.index),g?g=(g+1)%5:(b.substr(-5)==="rgba("||b.substr(-5)==="hsla(")&&(g=1),m!==(_=d[c++]||"")&&(h=parseFloat(_)||0,v=_.substr((h+"").length),m.charAt(1)==="="&&(m=To(h,m)+v),p=parseFloat(m),E=m.substr((p+"").length),l=mo.lastIndex-E.length,E||(E=E||di.units[e]||v,l===r.length&&(r+=E,a.e+=E)),v!==E&&(h=es(t,e,_,E)||0),a._pt={_next:a._pt,p:b||c===1?b:",",s:h,c:p-h,m:g&&g<4||e==="zIndex"?Math.round:0});a.c=l<r.length?r.substring(l,r.length):""}else a.r=e==="display"&&r==="none"?jg:$g;return ug.test(r)&&(a.e=0),this._pt=a,a},Pp={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},YM=function(t){var e=t.split(" "),n=e[0],r=e[1]||"50%";return(n==="top"||n==="bottom"||r==="left"||r==="right")&&(t=n,n=r,r=t),e[0]=Pp[n]||n,e[1]=Pp[r]||r,e.join(" ")},qM=function(t,e){if(e.tween&&e.tween._time===e.tween._dur){var n=e.t,r=n.style,s=e.u,o=n._gsap,a,l,c;if(s==="all"||s===!0)r.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)a=s[c],Er[a]&&(l=1,a=a==="transformOrigin"?Kn:Fe),Os(n,a);l&&(Os(n,Fe),o&&(o.svg&&n.removeAttribute("transform"),r.scale=r.rotate=r.translate="none",tl(n,1),o.uncache=1,Kg(r)))}},Nc={clearProps:function(t,e,n,r,s){if(s.data!=="isFromStart"){var o=t._pt=new jn(t._pt,e,n,0,0,qM);return o.u=r,o.pr=-10,o.tween=s,t._props.push(n),1}}},Qa=[1,0,0,1,0,0],e0={},n0=function(t){return t==="matrix(1, 0, 0, 1, 0, 0)"||t==="none"||!t},Dp=function(t){var e=bi(t,Fe);return n0(e)?Qa:e.substr(7).match(cg).map(Ge)},xd=function(t,e){var n=t._gsap||Cs(t),r=t.style,s=Dp(t),o,a,l,c;return n.svg&&t.getAttribute("transform")?(l=t.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?Qa:s):(s===Qa&&!t.offsetParent&&t!==wo&&!n.svg&&(l=r.display,r.display="block",o=t.parentNode,(!o||!t.offsetParent&&!t.getBoundingClientRect().width)&&(c=1,a=t.nextElementSibling,wo.appendChild(t)),s=Dp(t),l?r.display=l:Os(t,"display"),c&&(a?o.insertBefore(t,a):o?o.appendChild(t):wo.removeChild(t))),e&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},Ff=function(t,e,n,r,s,o){var a=t._gsap,l=s||xd(t,!0),c=a.xOrigin||0,u=a.yOrigin||0,f=a.xOffset||0,d=a.yOffset||0,h=l[0],g=l[1],_=l[2],m=l[3],p=l[4],b=l[5],E=e.split(" "),v=parseFloat(E[0])||0,R=parseFloat(E[1])||0,C,A,L,S;n?l!==Qa&&(A=h*m-g*_)&&(L=v*(m/A)+R*(-_/A)+(_*b-m*p)/A,S=v*(-g/A)+R*(h/A)-(h*b-g*p)/A,v=L,R=S):(C=Qg(t),v=C.x+(~E[0].indexOf("%")?v/100*C.width:v),R=C.y+(~(E[1]||E[0]).indexOf("%")?R/100*C.height:R)),r||r!==!1&&a.smooth?(p=v-c,b=R-u,a.xOffset=f+(p*h+b*_)-p,a.yOffset=d+(p*g+b*m)-b):a.xOffset=a.yOffset=0,a.xOrigin=v,a.yOrigin=R,a.smooth=!!r,a.origin=e,a.originIsAbsolute=!!n,t.style[Kn]="0px 0px",o&&(Gr(o,a,"xOrigin",c,v),Gr(o,a,"yOrigin",u,R),Gr(o,a,"xOffset",f,a.xOffset),Gr(o,a,"yOffset",d,a.yOffset)),t.setAttribute("data-svg-origin",v+" "+R)},tl=function(t,e){var n=t._gsap||new zg(t);if("x"in n&&!e&&!n.uncache)return n;var r=t.style,s=n.scaleX<0,o="px",a="deg",l=getComputedStyle(t),c=bi(t,Kn)||"0",u,f,d,h,g,_,m,p,b,E,v,R,C,A,L,S,y,I,B,G,Y,et,V,K,k,lt,N,_t,Dt,Kt,it,ut;return u=f=d=_=m=p=b=E=v=0,h=g=1,n.svg=!!(t.getCTM&&t0(t)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(r[Fe]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[Fe]!=="none"?l[Fe]:"")),r.scale=r.rotate=r.translate="none"),A=xd(t,n.svg),n.svg&&(n.uncache?(k=t.getBBox(),c=n.xOrigin-k.x+"px "+(n.yOrigin-k.y)+"px",K=""):K=!e&&t.getAttribute("data-svg-origin"),Ff(t,K||c,!!K||n.originIsAbsolute,n.smooth!==!1,A)),R=n.xOrigin||0,C=n.yOrigin||0,A!==Qa&&(I=A[0],B=A[1],G=A[2],Y=A[3],u=et=A[4],f=V=A[5],A.length===6?(h=Math.sqrt(I*I+B*B),g=Math.sqrt(Y*Y+G*G),_=I||B?$s(B,I)*gs:0,b=G||Y?$s(G,Y)*gs+_:0,b&&(g*=Math.abs(Math.cos(b*Ao))),n.svg&&(u-=R-(R*I+C*G),f-=C-(R*B+C*Y))):(ut=A[6],Kt=A[7],N=A[8],_t=A[9],Dt=A[10],it=A[11],u=A[12],f=A[13],d=A[14],L=$s(ut,Dt),m=L*gs,L&&(S=Math.cos(-L),y=Math.sin(-L),K=et*S+N*y,k=V*S+_t*y,lt=ut*S+Dt*y,N=et*-y+N*S,_t=V*-y+_t*S,Dt=ut*-y+Dt*S,it=Kt*-y+it*S,et=K,V=k,ut=lt),L=$s(-G,Dt),p=L*gs,L&&(S=Math.cos(-L),y=Math.sin(-L),K=I*S-N*y,k=B*S-_t*y,lt=G*S-Dt*y,it=Y*y+it*S,I=K,B=k,G=lt),L=$s(B,I),_=L*gs,L&&(S=Math.cos(L),y=Math.sin(L),K=I*S+B*y,k=et*S+V*y,B=B*S-I*y,V=V*S-et*y,I=K,et=k),m&&Math.abs(m)+Math.abs(_)>359.9&&(m=_=0,p=180-p),h=Ge(Math.sqrt(I*I+B*B+G*G)),g=Ge(Math.sqrt(V*V+ut*ut)),L=$s(et,V),b=Math.abs(L)>2e-4?L*gs:0,v=it?1/(it<0?-it:it):0),n.svg&&(K=t.getAttribute("transform"),n.forceCSS=t.setAttribute("transform","")||!n0(bi(t,Fe)),K&&t.setAttribute("transform",K))),Math.abs(b)>90&&Math.abs(b)<270&&(s?(h*=-1,b+=_<=0?180:-180,_+=_<=0?180:-180):(g*=-1,b+=b<=0?180:-180)),e=e||n.uncache,n.x=u-((n.xPercent=u&&(!e&&n.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-u)?-50:0)))?t.offsetWidth*n.xPercent/100:0)+o,n.y=f-((n.yPercent=f&&(!e&&n.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-f)?-50:0)))?t.offsetHeight*n.yPercent/100:0)+o,n.z=d+o,n.scaleX=Ge(h),n.scaleY=Ge(g),n.rotation=Ge(_)+a,n.rotationX=Ge(m)+a,n.rotationY=Ge(p)+a,n.skewX=b+a,n.skewY=E+a,n.transformPerspective=v+o,(n.zOrigin=parseFloat(c.split(" ")[2])||!e&&n.zOrigin||0)&&(r[Kn]=Oc(c)),n.xOffset=n.yOffset=0,n.force3D=di.force3D,n.renderTransform=n.svg?jM:Jg?i0:$M,n.uncache=0,n},Oc=function(t){return(t=t.split(" "))[0]+" "+t[1]},Tu=function(t,e,n){var r=Mn(e);return Ge(parseFloat(e)+parseFloat(es(t,"x",n+"px",r)))+r},$M=function(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,i0(t,e)},ls="0deg",ra="0px",cs=") ",i0=function(t,e){var n=e||this,r=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.z,c=n.rotation,u=n.rotationY,f=n.rotationX,d=n.skewX,h=n.skewY,g=n.scaleX,_=n.scaleY,m=n.transformPerspective,p=n.force3D,b=n.target,E=n.zOrigin,v="",R=p==="auto"&&t&&t!==1||p===!0;if(E&&(f!==ls||u!==ls)){var C=parseFloat(u)*Ao,A=Math.sin(C),L=Math.cos(C),S;C=parseFloat(f)*Ao,S=Math.cos(C),o=Tu(b,o,A*S*-E),a=Tu(b,a,-Math.sin(C)*-E),l=Tu(b,l,L*S*-E+E)}m!==ra&&(v+="perspective("+m+cs),(r||s)&&(v+="translate("+r+"%, "+s+"%) "),(R||o!==ra||a!==ra||l!==ra)&&(v+=l!==ra||R?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+cs),c!==ls&&(v+="rotate("+c+cs),u!==ls&&(v+="rotateY("+u+cs),f!==ls&&(v+="rotateX("+f+cs),(d!==ls||h!==ls)&&(v+="skew("+d+", "+h+cs),(g!==1||_!==1)&&(v+="scale("+g+", "+_+cs),b.style[Fe]=v||"translate(0, 0)"},jM=function(t,e){var n=e||this,r=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.rotation,c=n.skewX,u=n.skewY,f=n.scaleX,d=n.scaleY,h=n.target,g=n.xOrigin,_=n.yOrigin,m=n.xOffset,p=n.yOffset,b=n.forceCSS,E=parseFloat(o),v=parseFloat(a),R,C,A,L,S;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=Ao,c*=Ao,R=Math.cos(l)*f,C=Math.sin(l)*f,A=Math.sin(l-c)*-d,L=Math.cos(l-c)*d,c&&(u*=Ao,S=Math.tan(c-u),S=Math.sqrt(1+S*S),A*=S,L*=S,u&&(S=Math.tan(u),S=Math.sqrt(1+S*S),R*=S,C*=S)),R=Ge(R),C=Ge(C),A=Ge(A),L=Ge(L)):(R=f,L=d,C=A=0),(E&&!~(o+"").indexOf("px")||v&&!~(a+"").indexOf("px"))&&(E=es(h,"x",o,"px"),v=es(h,"y",a,"px")),(g||_||m||p)&&(E=Ge(E+g-(g*R+_*A)+m),v=Ge(v+_-(g*C+_*L)+p)),(r||s)&&(S=h.getBBox(),E=Ge(E+r/100*S.width),v=Ge(v+s/100*S.height)),S="matrix("+R+","+C+","+A+","+L+","+E+","+v+")",h.setAttribute("transform",S),b&&(h.style[Fe]=S)},KM=function(t,e,n,r,s){var o=360,a=cn(s),l=parseFloat(s)*(a&&~s.indexOf("rad")?gs:1),c=l-r,u=r+c+"deg",f,d;return a&&(f=s.split("_")[1],f==="short"&&(c%=o,c!==c%(o/2)&&(c+=c<0?o:-o)),f==="cw"&&c<0?c=(c+o*Tp)%o-~~(c/o)*o:f==="ccw"&&c>0&&(c=(c-o*Tp)%o-~~(c/o)*o)),t._pt=d=new jn(t._pt,e,n,r,c,IM),d.e=u,d.u="deg",t._props.push(n),d},Lp=function(t,e){for(var n in e)t[n]=e[n];return t},ZM=function(t,e,n){var r=Lp({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=n.style,a,l,c,u,f,d,h,g;r.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),o[Fe]=e,a=tl(n,1),Os(n,Fe),n.setAttribute("transform",c)):(c=getComputedStyle(n)[Fe],o[Fe]=e,a=tl(n,1),o[Fe]=c);for(l in Er)c=r[l],u=a[l],c!==u&&s.indexOf(l)<0&&(h=Mn(c),g=Mn(u),f=h!==g?es(n,l,c,g):parseFloat(c),d=parseFloat(u),t._pt=new jn(t._pt,a,l,f,d-f,Uf),t._pt.u=g||0,t._props.push(l));Lp(a,r)};$n("padding,margin,Width,Radius",function(i,t){var e="Top",n="Right",r="Bottom",s="Left",o=(t<3?[e,n,r,s]:[e+s,e+n,r+n,r+s]).map(function(a){return t<2?i+a:"border"+a+i});Nc[t>1?"border"+i:i]=function(a,l,c,u,f){var d,h;if(arguments.length<4)return d=o.map(function(g){return hr(a,g,c)}),h=d.join(" "),h.split(d[0]).length===5?d[0]:h;d=(u+"").split(" "),h={},o.forEach(function(g,_){return h[g]=d[_]=d[_]||d[(_-1)/2|0]}),a.init(l,h,f)}});var r0={name:"css",register:Of,targetTest:function(t){return t.style&&t.nodeType},init:function(t,e,n,r,s){var o=this._props,a=t.style,l=n.vars.startAt,c,u,f,d,h,g,_,m,p,b,E,v,R,C,A,L;_d||Of(),this.styles=this.styles||Zg(t),L=this.styles.props,this.tween=n;for(_ in e)if(_!=="autoRound"&&(u=e[_],!(si[_]&&kg(_,e,n,r,t,s)))){if(h=typeof u,g=Nc[_],h==="function"&&(u=u.call(n,r,t,s),h=typeof u),h==="string"&&~u.indexOf("random(")&&(u=Ka(u)),g)g(this,t,_,u,n)&&(A=1);else if(_.substr(0,2)==="--")c=(getComputedStyle(t).getPropertyValue(_)+"").trim(),u+="",$r.lastIndex=0,$r.test(c)||(m=Mn(c),p=Mn(u)),p?m!==p&&(c=es(t,_,c,p)+p):m&&(u+=m),this.add(a,"setProperty",c,u,r,s,0,0,_),o.push(_),L.push(_,0,a[_]);else if(h!=="undefined"){if(l&&_ in l?(c=typeof l[_]=="function"?l[_].call(n,r,t,s):l[_],cn(c)&&~c.indexOf("random(")&&(c=Ka(c)),Mn(c+"")||c==="auto"||(c+=di.units[_]||Mn(hr(t,_))||""),(c+"").charAt(1)==="="&&(c=hr(t,_))):c=hr(t,_),d=parseFloat(c),b=h==="string"&&u.charAt(1)==="="&&u.substr(0,2),b&&(u=u.substr(2)),f=parseFloat(u),_ in Xi&&(_==="autoAlpha"&&(d===1&&hr(t,"visibility")==="hidden"&&f&&(d=0),L.push("visibility",0,a.visibility),Gr(this,a,"visibility",d?"inherit":"hidden",f?"inherit":"hidden",!f)),_!=="scale"&&_!=="transform"&&(_=Xi[_],~_.indexOf(",")&&(_=_.split(",")[0]))),E=_ in Er,E){if(this.styles.save(_),h==="string"&&u.substring(0,6)==="var(--"&&(u=bi(t,u.substring(4,u.indexOf(")"))),f=parseFloat(u)),v||(R=t._gsap,R.renderTransform&&!e.parseTransform||tl(t,e.parseTransform),C=e.smoothOrigin!==!1&&R.smooth,v=this._pt=new jn(this._pt,a,Fe,0,1,R.renderTransform,R,0,-1),v.dep=1),_==="scale")this._pt=new jn(this._pt,R,"scaleY",R.scaleY,(b?To(R.scaleY,b+f):f)-R.scaleY||0,Uf),this._pt.u=0,o.push("scaleY",_),_+="X";else if(_==="transformOrigin"){L.push(Kn,0,a[Kn]),u=YM(u),R.svg?Ff(t,u,0,C,0,this):(p=parseFloat(u.split(" ")[2])||0,p!==R.zOrigin&&Gr(this,R,"zOrigin",R.zOrigin,p),Gr(this,a,_,Oc(c),Oc(u)));continue}else if(_==="svgOrigin"){Ff(t,u,1,C,0,this);continue}else if(_ in e0){KM(this,R,_,d,b?To(d,b+u):u);continue}else if(_==="smoothOrigin"){Gr(this,R,"smooth",R.smooth,u);continue}else if(_==="force3D"){R[_]=u;continue}else if(_==="transform"){ZM(this,u,t);continue}}else _ in a||(_=Vo(_)||_);if(E||(f||f===0)&&(d||d===0)&&!LM.test(u)&&_ in a)m=(c+"").substr((d+"").length),f||(f=0),p=Mn(u)||(_ in di.units?di.units[_]:m),m!==p&&(d=es(t,_,c,p)),this._pt=new jn(this._pt,E?R:a,_,d,(b?To(d,b+f):f)-d,!E&&(p==="px"||_==="zIndex")&&e.autoRound!==!1?NM:Uf),this._pt.u=p||0,m!==p&&p!=="%"&&(this._pt.b=c,this._pt.r=UM);else if(_ in a)XM.call(this,t,_,c,b?b+u:u);else if(_ in t)this.add(t,_,c||t[_],b?b+u:u,r,s);else if(_!=="parseTransform"){od(_,u);continue}E||(_ in a?L.push(_,0,a[_]):typeof t[_]=="function"?L.push(_,2,t[_]()):L.push(_,1,c||t[_])),o.push(_)}}A&&Yg(this)},render:function(t,e){if(e.tween._time||!gd())for(var n=e._pt;n;)n.r(t,n.d),n=n._next;else e.styles.revert()},get:hr,aliases:Xi,getSetter:function(t,e,n){var r=Xi[e];return r&&r.indexOf(",")<0&&(e=r),e in Er&&e!==Kn&&(t._gsap.x||hr(t,"x"))?n&&Ep===n?e==="scale"?zM:BM:(Ep=n||{})&&(e==="scale"?kM:HM):t.style&&!id(t.style[e])?OM:~e.indexOf("-")?FM:pd(t,e)},core:{_removeProperty:Os,_getMatrix:xd}};Zn.utils.checkPrefix=Vo;Zn.core.getStyleSaver=Zg;(function(i,t,e,n){var r=$n(i+","+t+","+e,function(s){Er[s]=1});$n(t,function(s){di.units[s]="deg",e0[s]=1}),Xi[r[13]]=i+","+t,$n(n,function(s){var o=s.split(":");Xi[o[1]]=r[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");$n("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(i){di.units[i]="px"});Zn.registerPlugin(r0);var Pn=Zn.registerPlugin(r0)||Zn;Pn.core.Tween;function JM(i,t){for(var e=0;e<t.length;e++){var n=t[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(i,n.key,n)}}function QM(i,t,e){return t&&JM(i.prototype,t),i}var hn,uc,ui,Wr,Xr,Co,s0,vs,La,o0,_r,Di,a0,l0=function(){return hn||typeof window<"u"&&(hn=window.gsap)&&hn.registerPlugin&&hn},c0=1,go=[],oe=[],ji=[],Ia=Date.now,Bf=function(t,e){return e},tS=function(){var t=La.core,e=t.bridge||{},n=t._scrollers,r=t._proxies;n.push.apply(n,oe),r.push.apply(r,ji),oe=n,ji=r,Bf=function(o,a){return e[o](a)}},jr=function(t,e){return~ji.indexOf(t)&&ji[ji.indexOf(t)+1][e]},Ua=function(t){return!!~o0.indexOf(t)},Cn=function(t,e,n,r,s){return t.addEventListener(e,n,{passive:r!==!1,capture:!!s})},wn=function(t,e,n,r){return t.removeEventListener(e,n,!!r)},vl="scrollLeft",xl="scrollTop",zf=function(){return _r&&_r.isPressed||oe.cache++},Fc=function(t,e){var n=function r(s){if(s||s===0){c0&&(ui.history.scrollRestoration="manual");var o=_r&&_r.isPressed;s=r.v=Math.round(s)||(_r&&_r.iOS?1:0),t(s),r.cacheID=oe.cache,o&&Bf("ss",s)}else(e||oe.cache!==r.cacheID||Bf("ref"))&&(r.cacheID=oe.cache,r.v=t());return r.v+r.offset};return n.offset=0,t&&n},Bn={s:vl,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:Fc(function(i){return arguments.length?ui.scrollTo(i,Qe.sc()):ui.pageXOffset||Wr[vl]||Xr[vl]||Co[vl]||0})},Qe={s:xl,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:Bn,sc:Fc(function(i){return arguments.length?ui.scrollTo(Bn.sc(),i):ui.pageYOffset||Wr[xl]||Xr[xl]||Co[xl]||0})},Xn=function(t,e){return(e&&e._ctx&&e._ctx.selector||hn.utils.toArray)(t)[0]||(typeof t=="string"&&hn.config().nullTargetWarn!==!1?console.warn("Element not found:",t):null)},eS=function(t,e){for(var n=e.length;n--;)if(e[n]===t||e[n].contains(t))return!0;return!1},ns=function(t,e){var n=e.s,r=e.sc;Ua(t)&&(t=Wr.scrollingElement||Xr);var s=oe.indexOf(t),o=r===Qe.sc?1:2;!~s&&(s=oe.push(t)-1),oe[s+o]||Cn(t,"scroll",zf);var a=oe[s+o],l=a||(oe[s+o]=Fc(jr(t,n),!0)||(Ua(t)?r:Fc(function(c){return arguments.length?t[n]=c:t[n]})));return l.target=t,a||(l.smooth=hn.getProperty(t,"scrollBehavior")==="smooth"),l},kf=function(t,e,n){var r=t,s=t,o=Ia(),a=o,l=e||50,c=Math.max(500,l*3),u=function(g,_){var m=Ia();_||m-o>l?(s=r,r=g,a=o,o=m):n?r+=g:r=s+(g-s)/(m-a)*(o-a)},f=function(){s=r=n?0:r,a=o=0},d=function(g){var _=a,m=s,p=Ia();return(g||g===0)&&g!==r&&u(g),o===a||p-a>c?0:(r+(n?m:-m))/((n?p:o)-_)*1e3};return{update:u,reset:f,getVelocity:d}},sa=function(t,e){return e&&!t._gsapAllow&&t.preventDefault(),t.changedTouches?t.changedTouches[0]:t},Ip=function(t){var e=Math.max.apply(Math,t),n=Math.min.apply(Math,t);return Math.abs(e)>=Math.abs(n)?e:n},u0=function(){La=hn.core.globals().ScrollTrigger,La&&La.core&&tS()},f0=function(t){return hn=t||l0(),!uc&&hn&&typeof document<"u"&&document.body&&(ui=window,Wr=document,Xr=Wr.documentElement,Co=Wr.body,o0=[ui,Wr,Xr,Co],hn.utils.clamp,a0=hn.core.context||function(){},vs="onpointerenter"in Co?"pointer":"mouse",s0=We.isTouch=ui.matchMedia&&ui.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in ui||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,Di=We.eventTypes=("ontouchstart"in Xr?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in Xr?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return c0=0},500),u0(),uc=1),uc};Bn.op=Qe;oe.cache=0;var We=(function(){function i(e){this.init(e)}var t=i.prototype;return t.init=function(n){uc||f0(hn)||console.warn("Please gsap.registerPlugin(Observer)"),La||u0();var r=n.tolerance,s=n.dragMinimum,o=n.type,a=n.target,l=n.lineHeight,c=n.debounce,u=n.preventDefault,f=n.onStop,d=n.onStopDelay,h=n.ignore,g=n.wheelSpeed,_=n.event,m=n.onDragStart,p=n.onDragEnd,b=n.onDrag,E=n.onPress,v=n.onRelease,R=n.onRight,C=n.onLeft,A=n.onUp,L=n.onDown,S=n.onChangeX,y=n.onChangeY,I=n.onChange,B=n.onToggleX,G=n.onToggleY,Y=n.onHover,et=n.onHoverEnd,V=n.onMove,K=n.ignoreCheck,k=n.isNormalizer,lt=n.onGestureStart,N=n.onGestureEnd,_t=n.onWheel,Dt=n.onEnable,Kt=n.onDisable,it=n.onClick,ut=n.scrollSpeed,Mt=n.capture,ht=n.allowClicks,Rt=n.lockAxis,It=n.onLockAxis;this.target=a=Xn(a)||Xr,this.vars=n,h&&(h=hn.utils.toArray(h)),r=r||1e-9,s=s||0,g=g||1,ut=ut||1,o=o||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(ui.getComputedStyle(Co).lineHeight)||22);var kt,te,P,U,w,rt,J,D=this,nt=0,ot=0,Q=n.passive||!u&&n.passive!==!1,M=ns(a,Bn),x=ns(a,Qe),O=M(),W=x(),X=~o.indexOf("touch")&&!~o.indexOf("pointer")&&Di[0]==="pointerdown",j=Ua(a),ct=a.ownerDocument||Wr,at=[0,0,0],pt=[0,0,0],Ft=0,ft=function(){return Ft=Ia()},dt=function(Ut,Zt){return(D.event=Ut)&&h&&eS(Ut.target,h)||Zt&&X&&Ut.pointerType!=="touch"||K&&K(Ut,Zt)},Ot=function(){D._vx.reset(),D._vy.reset(),te.pause(),f&&f(D)},Bt=function(){var Ut=D.deltaX=Ip(at),Zt=D.deltaY=Ip(pt),Tt=Math.abs(Ut)>=r,Yt=Math.abs(Zt)>=r;I&&(Tt||Yt)&&I(D,Ut,Zt,at,pt),Tt&&(R&&D.deltaX>0&&R(D),C&&D.deltaX<0&&C(D),S&&S(D),B&&D.deltaX<0!=nt<0&&B(D),nt=D.deltaX,at[0]=at[1]=at[2]=0),Yt&&(L&&D.deltaY>0&&L(D),A&&D.deltaY<0&&A(D),y&&y(D),G&&D.deltaY<0!=ot<0&&G(D),ot=D.deltaY,pt[0]=pt[1]=pt[2]=0),(U||P)&&(V&&V(D),P&&(m&&P===1&&m(D),b&&b(D),P=0),U=!1),rt&&!(rt=!1)&&It&&It(D),w&&(_t(D),w=!1),kt=0},xt=function(Ut,Zt,Tt){at[Tt]+=Ut,pt[Tt]+=Zt,D._vx.update(Ut),D._vy.update(Zt),c?kt||(kt=requestAnimationFrame(Bt)):Bt()},Ht=function(Ut,Zt){Rt&&!J&&(D.axis=J=Math.abs(Ut)>Math.abs(Zt)?"x":"y",rt=!0),J!=="y"&&(at[2]+=Ut,D._vx.update(Ut,!0)),J!=="x"&&(pt[2]+=Zt,D._vy.update(Zt,!0)),c?kt||(kt=requestAnimationFrame(Bt)):Bt()},Vt=function(Ut){if(!dt(Ut,1)){Ut=sa(Ut,u);var Zt=Ut.clientX,Tt=Ut.clientY,Yt=Zt-D.x,Nt=Tt-D.y,Xt=D.isDragging;D.x=Zt,D.y=Tt,(Xt||(Yt||Nt)&&(Math.abs(D.startX-Zt)>=s||Math.abs(D.startY-Tt)>=s))&&(P=Xt?2:1,Xt||(D.isDragging=!0),Ht(Yt,Nt))}},ce=D.onPress=function(At){dt(At,1)||At&&At.button||(D.axis=J=null,te.pause(),D.isPressed=!0,At=sa(At),nt=ot=0,D.startX=D.x=At.clientX,D.startY=D.y=At.clientY,D._vx.reset(),D._vy.reset(),Cn(k?a:ct,Di[1],Vt,Q,!0),D.deltaX=D.deltaY=0,E&&E(D))},F=D.onRelease=function(At){if(!dt(At,1)){wn(k?a:ct,Di[1],Vt,!0);var Ut=!isNaN(D.y-D.startY),Zt=D.isDragging,Tt=Zt&&(Math.abs(D.x-D.startX)>3||Math.abs(D.y-D.startY)>3),Yt=sa(At);!Tt&&Ut&&(D._vx.reset(),D._vy.reset(),u&&ht&&hn.delayedCall(.08,function(){if(Ia()-Ft>300&&!At.defaultPrevented){if(At.target.click)At.target.click();else if(ct.createEvent){var Nt=ct.createEvent("MouseEvents");Nt.initMouseEvent("click",!0,!0,ui,1,Yt.screenX,Yt.screenY,Yt.clientX,Yt.clientY,!1,!1,!1,!1,0,null),At.target.dispatchEvent(Nt)}}})),D.isDragging=D.isGesturing=D.isPressed=!1,f&&Zt&&!k&&te.restart(!0),P&&Bt(),p&&Zt&&p(D),v&&v(D,Tt)}},St=function(Ut){return Ut.touches&&Ut.touches.length>1&&(D.isGesturing=!0)&&lt(Ut,D.isDragging)},tt=function(){return(D.isGesturing=!1)||N(D)},st=function(Ut){if(!dt(Ut)){var Zt=M(),Tt=x();xt((Zt-O)*ut,(Tt-W)*ut,1),O=Zt,W=Tt,f&&te.restart(!0)}},yt=function(Ut){if(!dt(Ut)){Ut=sa(Ut,u),_t&&(w=!0);var Zt=(Ut.deltaMode===1?l:Ut.deltaMode===2?ui.innerHeight:1)*g;xt(Ut.deltaX*Zt,Ut.deltaY*Zt,0),f&&!k&&te.restart(!0)}},bt=function(Ut){if(!dt(Ut)){var Zt=Ut.clientX,Tt=Ut.clientY,Yt=Zt-D.x,Nt=Tt-D.y;D.x=Zt,D.y=Tt,U=!0,f&&te.restart(!0),(Yt||Nt)&&Ht(Yt,Nt)}},Gt=function(Ut){D.event=Ut,Y(D)},he=function(Ut){D.event=Ut,et(D)},ze=function(Ut){return dt(Ut)||sa(Ut,u)&&it(D)};te=D._dc=hn.delayedCall(d||.25,Ot).pause(),D.deltaX=D.deltaY=0,D._vx=kf(0,50,!0),D._vy=kf(0,50,!0),D.scrollX=M,D.scrollY=x,D.isDragging=D.isGesturing=D.isPressed=!1,a0(this),D.enable=function(At){return D.isEnabled||(Cn(j?ct:a,"scroll",zf),o.indexOf("scroll")>=0&&Cn(j?ct:a,"scroll",st,Q,Mt),o.indexOf("wheel")>=0&&Cn(a,"wheel",yt,Q,Mt),(o.indexOf("touch")>=0&&s0||o.indexOf("pointer")>=0)&&(Cn(a,Di[0],ce,Q,Mt),Cn(ct,Di[2],F),Cn(ct,Di[3],F),ht&&Cn(a,"click",ft,!0,!0),it&&Cn(a,"click",ze),lt&&Cn(ct,"gesturestart",St),N&&Cn(ct,"gestureend",tt),Y&&Cn(a,vs+"enter",Gt),et&&Cn(a,vs+"leave",he),V&&Cn(a,vs+"move",bt)),D.isEnabled=!0,D.isDragging=D.isGesturing=D.isPressed=U=P=!1,D._vx.reset(),D._vy.reset(),O=M(),W=x(),At&&At.type&&ce(At),Dt&&Dt(D)),D},D.disable=function(){D.isEnabled&&(go.filter(function(At){return At!==D&&Ua(At.target)}).length||wn(j?ct:a,"scroll",zf),D.isPressed&&(D._vx.reset(),D._vy.reset(),wn(k?a:ct,Di[1],Vt,!0)),wn(j?ct:a,"scroll",st,Mt),wn(a,"wheel",yt,Mt),wn(a,Di[0],ce,Mt),wn(ct,Di[2],F),wn(ct,Di[3],F),wn(a,"click",ft,!0),wn(a,"click",ze),wn(ct,"gesturestart",St),wn(ct,"gestureend",tt),wn(a,vs+"enter",Gt),wn(a,vs+"leave",he),wn(a,vs+"move",bt),D.isEnabled=D.isPressed=D.isDragging=!1,Kt&&Kt(D))},D.kill=D.revert=function(){D.disable();var At=go.indexOf(D);At>=0&&go.splice(At,1),_r===D&&(_r=0)},go.push(D),k&&Ua(a)&&(_r=D),D.enable(_)},QM(i,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),i})();We.version="3.13.0";We.create=function(i){return new We(i)};We.register=f0;We.getAll=function(){return go.slice()};We.getById=function(i){return go.filter(function(t){return t.vars.id===i})[0]};l0()&&hn.registerPlugin(We);var Pt,ho,se,Ce,ai,ve,yd,Bc,el,Na,ma,yl,gn,nu,Hf,Ln,Up,Np,po,h0,wu,d0,Dn,Vf,p0,m0,Nr,Gf,Md,Ro,Sd,zc,Wf,Au,Ml=1,vn=Date.now,Cu=vn(),wi=0,_a=0,Op=function(t,e,n){var r=ri(t)&&(t.substr(0,6)==="clamp("||t.indexOf("max")>-1);return n["_"+e+"Clamp"]=r,r?t.substr(6,t.length-7):t},Fp=function(t,e){return e&&(!ri(t)||t.substr(0,6)!=="clamp(")?"clamp("+t+")":t},nS=function i(){return _a&&requestAnimationFrame(i)},Bp=function(){return nu=1},zp=function(){return nu=0},ki=function(t){return t},ga=function(t){return Math.round(t*1e5)/1e5||0},_0=function(){return typeof window<"u"},g0=function(){return Pt||_0()&&(Pt=window.gsap)&&Pt.registerPlugin&&Pt},Fs=function(t){return!!~yd.indexOf(t)},v0=function(t){return(t==="Height"?Sd:se["inner"+t])||ai["client"+t]||ve["client"+t]},x0=function(t){return jr(t,"getBoundingClientRect")||(Fs(t)?function(){return mc.width=se.innerWidth,mc.height=Sd,mc}:function(){return pr(t)})},iS=function(t,e,n){var r=n.d,s=n.d2,o=n.a;return(o=jr(t,"getBoundingClientRect"))?function(){return o()[r]}:function(){return(e?v0(s):t["client"+s])||0}},rS=function(t,e){return!e||~ji.indexOf(t)?x0(t):function(){return mc}},Yi=function(t,e){var n=e.s,r=e.d2,s=e.d,o=e.a;return Math.max(0,(n="scroll"+r)&&(o=jr(t,n))?o()-x0(t)()[s]:Fs(t)?(ai[n]||ve[n])-v0(r):t[n]-t["offset"+r])},Sl=function(t,e){for(var n=0;n<po.length;n+=3)(!e||~e.indexOf(po[n+1]))&&t(po[n],po[n+1],po[n+2])},ri=function(t){return typeof t=="string"},Sn=function(t){return typeof t=="function"},va=function(t){return typeof t=="number"},xs=function(t){return typeof t=="object"},oa=function(t,e,n){return t&&t.progress(e?0:1)&&n&&t.pause()},Ru=function(t,e){if(t.enabled){var n=t._ctx?t._ctx.add(function(){return e(t)}):e(t);n&&n.totalTime&&(t.callbackAnimation=n)}},js=Math.abs,y0="left",M0="top",bd="right",Ed="bottom",Ls="width",Is="height",Oa="Right",Fa="Left",Ba="Top",za="Bottom",Ye="padding",xi="margin",Go="Width",Td="Height",Je="px",yi=function(t){return se.getComputedStyle(t)},sS=function(t){var e=yi(t).position;t.style.position=e==="absolute"||e==="fixed"?e:"relative"},kp=function(t,e){for(var n in e)n in t||(t[n]=e[n]);return t},pr=function(t,e){var n=e&&yi(t)[Hf]!=="matrix(1, 0, 0, 1, 0, 0)"&&Pt.to(t,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),r=t.getBoundingClientRect();return n&&n.progress(0).kill(),r},kc=function(t,e){var n=e.d2;return t["offset"+n]||t["client"+n]||0},S0=function(t){var e=[],n=t.labels,r=t.duration(),s;for(s in n)e.push(n[s]/r);return e},oS=function(t){return function(e){return Pt.utils.snap(S0(t),e)}},wd=function(t){var e=Pt.utils.snap(t),n=Array.isArray(t)&&t.slice(0).sort(function(r,s){return r-s});return n?function(r,s,o){o===void 0&&(o=.001);var a;if(!s)return e(r);if(s>0){for(r-=o,a=0;a<n.length;a++)if(n[a]>=r)return n[a];return n[a-1]}else for(a=n.length,r+=o;a--;)if(n[a]<=r)return n[a];return n[0]}:function(r,s,o){o===void 0&&(o=.001);var a=e(r);return!s||Math.abs(a-r)<o||a-r<0==s<0?a:e(s<0?r-t:r+t)}},aS=function(t){return function(e,n){return wd(S0(t))(e,n.direction)}},bl=function(t,e,n,r){return n.split(",").forEach(function(s){return t(e,s,r)})},an=function(t,e,n,r,s){return t.addEventListener(e,n,{passive:!r,capture:!!s})},on=function(t,e,n,r){return t.removeEventListener(e,n,!!r)},El=function(t,e,n){n=n&&n.wheelHandler,n&&(t(e,"wheel",n),t(e,"touchmove",n))},Hp={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},Tl={toggleActions:"play",anticipatePin:0},Hc={top:0,left:0,center:.5,bottom:1,right:1},fc=function(t,e){if(ri(t)){var n=t.indexOf("="),r=~n?+(t.charAt(n-1)+1)*parseFloat(t.substr(n+1)):0;~n&&(t.indexOf("%")>n&&(r*=e/100),t=t.substr(0,n-1)),t=r+(t in Hc?Hc[t]*e:~t.indexOf("%")?parseFloat(t)*e/100:parseFloat(t)||0)}return t},wl=function(t,e,n,r,s,o,a,l){var c=s.startColor,u=s.endColor,f=s.fontSize,d=s.indent,h=s.fontWeight,g=Ce.createElement("div"),_=Fs(n)||jr(n,"pinType")==="fixed",m=t.indexOf("scroller")!==-1,p=_?ve:n,b=t.indexOf("start")!==-1,E=b?c:u,v="border-color:"+E+";font-size:"+f+";color:"+E+";font-weight:"+h+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return v+="position:"+((m||l)&&_?"fixed;":"absolute;"),(m||l||!_)&&(v+=(r===Qe?bd:Ed)+":"+(o+parseFloat(d))+"px;"),a&&(v+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),g._isStart=b,g.setAttribute("class","gsap-marker-"+t+(e?" marker-"+e:"")),g.style.cssText=v,g.innerText=e||e===0?t+"-"+e:t,p.children[0]?p.insertBefore(g,p.children[0]):p.appendChild(g),g._offset=g["offset"+r.op.d2],hc(g,0,r,b),g},hc=function(t,e,n,r){var s={display:"block"},o=n[r?"os2":"p2"],a=n[r?"p2":"os2"];t._isFlipped=r,s[n.a+"Percent"]=r?-100:0,s[n.a]=r?"1px":0,s["border"+o+Go]=1,s["border"+a+Go]=0,s[n.p]=e+"px",Pt.set(t,s)},ie=[],Xf={},nl,Vp=function(){return vn()-wi>34&&(nl||(nl=requestAnimationFrame(xr)))},Ks=function(){(!Dn||!Dn.isPressed||Dn.startX>ve.clientWidth)&&(oe.cache++,Dn?nl||(nl=requestAnimationFrame(xr)):xr(),wi||zs("scrollStart"),wi=vn())},Pu=function(){m0=se.innerWidth,p0=se.innerHeight},xa=function(t){oe.cache++,(t===!0||!gn&&!d0&&!Ce.fullscreenElement&&!Ce.webkitFullscreenElement&&(!Vf||m0!==se.innerWidth||Math.abs(se.innerHeight-p0)>se.innerHeight*.25))&&Bc.restart(!0)},Bs={},lS=[],b0=function i(){return on(le,"scrollEnd",i)||Es(!0)},zs=function(t){return Bs[t]&&Bs[t].map(function(e){return e()})||lS},ii=[],E0=function(t){for(var e=0;e<ii.length;e+=5)(!t||ii[e+4]&&ii[e+4].query===t)&&(ii[e].style.cssText=ii[e+1],ii[e].getBBox&&ii[e].setAttribute("transform",ii[e+2]||""),ii[e+3].uncache=1)},Ad=function(t,e){var n;for(Ln=0;Ln<ie.length;Ln++)n=ie[Ln],n&&(!e||n._ctx===e)&&(t?n.kill(1):n.revert(!0,!0));zc=!0,e&&E0(e),e||zs("revert")},T0=function(t,e){oe.cache++,(e||!In)&&oe.forEach(function(n){return Sn(n)&&n.cacheID++&&(n.rec=0)}),ri(t)&&(se.history.scrollRestoration=Md=t)},In,Us=0,Gp,cS=function(){if(Gp!==Us){var t=Gp=Us;requestAnimationFrame(function(){return t===Us&&Es(!0)})}},w0=function(){ve.appendChild(Ro),Sd=!Dn&&Ro.offsetHeight||se.innerHeight,ve.removeChild(Ro)},Wp=function(t){return el(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(e){return e.style.display=t?"none":"block"})},Es=function(t,e){if(ai=Ce.documentElement,ve=Ce.body,yd=[se,Ce,ai,ve],wi&&!t&&!zc){an(le,"scrollEnd",b0);return}w0(),In=le.isRefreshing=!0,oe.forEach(function(r){return Sn(r)&&++r.cacheID&&(r.rec=r())});var n=zs("refreshInit");h0&&le.sort(),e||Ad(),oe.forEach(function(r){Sn(r)&&(r.smooth&&(r.target.style.scrollBehavior="auto"),r(0))}),ie.slice(0).forEach(function(r){return r.refresh()}),zc=!1,ie.forEach(function(r){if(r._subPinOffset&&r.pin){var s=r.vars.horizontal?"offsetWidth":"offsetHeight",o=r.pin[s];r.revert(!0,1),r.adjustPinSpacing(r.pin[s]-o),r.refresh()}}),Wf=1,Wp(!0),ie.forEach(function(r){var s=Yi(r.scroller,r._dir),o=r.vars.end==="max"||r._endClamp&&r.end>s,a=r._startClamp&&r.start>=s;(o||a)&&r.setPositions(a?s-1:r.start,o?Math.max(a?s:r.start+1,s):r.end,!0)}),Wp(!1),Wf=0,n.forEach(function(r){return r&&r.render&&r.render(-1)}),oe.forEach(function(r){Sn(r)&&(r.smooth&&requestAnimationFrame(function(){return r.target.style.scrollBehavior="smooth"}),r.rec&&r(r.rec))}),T0(Md,1),Bc.pause(),Us++,In=2,xr(2),ie.forEach(function(r){return Sn(r.vars.onRefresh)&&r.vars.onRefresh(r)}),In=le.isRefreshing=!1,zs("refresh")},Yf=0,dc=1,ka,xr=function(t){if(t===2||!In&&!zc){le.isUpdating=!0,ka&&ka.update(0);var e=ie.length,n=vn(),r=n-Cu>=50,s=e&&ie[0].scroll();if(dc=Yf>s?-1:1,In||(Yf=s),r&&(wi&&!nu&&n-wi>200&&(wi=0,zs("scrollEnd")),ma=Cu,Cu=n),dc<0){for(Ln=e;Ln-- >0;)ie[Ln]&&ie[Ln].update(0,r);dc=1}else for(Ln=0;Ln<e;Ln++)ie[Ln]&&ie[Ln].update(0,r);le.isUpdating=!1}nl=0},qf=[y0,M0,Ed,bd,xi+za,xi+Oa,xi+Ba,xi+Fa,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],pc=qf.concat([Ls,Is,"boxSizing","max"+Go,"max"+Td,"position",xi,Ye,Ye+Ba,Ye+Oa,Ye+za,Ye+Fa]),uS=function(t,e,n){Po(n);var r=t._gsap;if(r.spacerIsNative)Po(r.spacerState);else if(t._gsap.swappedIn){var s=e.parentNode;s&&(s.insertBefore(t,e),s.removeChild(e))}t._gsap.swappedIn=!1},Du=function(t,e,n,r){if(!t._gsap.swappedIn){for(var s=qf.length,o=e.style,a=t.style,l;s--;)l=qf[s],o[l]=n[l];o.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(o.display="inline-block"),a[Ed]=a[bd]="auto",o.flexBasis=n.flexBasis||"auto",o.overflow="visible",o.boxSizing="border-box",o[Ls]=kc(t,Bn)+Je,o[Is]=kc(t,Qe)+Je,o[Ye]=a[xi]=a[M0]=a[y0]="0",Po(r),a[Ls]=a["max"+Go]=n[Ls],a[Is]=a["max"+Td]=n[Is],a[Ye]=n[Ye],t.parentNode!==e&&(t.parentNode.insertBefore(e,t),e.appendChild(t)),t._gsap.swappedIn=!0}},fS=/([A-Z])/g,Po=function(t){if(t){var e=t.t.style,n=t.length,r=0,s,o;for((t.t._gsap||Pt.core.getCache(t.t)).uncache=1;r<n;r+=2)o=t[r+1],s=t[r],o?e[s]=o:e[s]&&e.removeProperty(s.replace(fS,"-$1").toLowerCase())}},Al=function(t){for(var e=pc.length,n=t.style,r=[],s=0;s<e;s++)r.push(pc[s],n[pc[s]]);return r.t=t,r},hS=function(t,e,n){for(var r=[],s=t.length,o=n?8:0,a;o<s;o+=2)a=t[o],r.push(a,a in e?e[a]:t[o+1]);return r.t=t.t,r},mc={left:0,top:0},Xp=function(t,e,n,r,s,o,a,l,c,u,f,d,h,g){Sn(t)&&(t=t(l)),ri(t)&&t.substr(0,3)==="max"&&(t=d+(t.charAt(4)==="="?fc("0"+t.substr(3),n):0));var _=h?h.time():0,m,p,b;if(h&&h.seek(0),isNaN(t)||(t=+t),va(t))h&&(t=Pt.utils.mapRange(h.scrollTrigger.start,h.scrollTrigger.end,0,d,t)),a&&hc(a,n,r,!0);else{Sn(e)&&(e=e(l));var E=(t||"0").split(" "),v,R,C,A;b=Xn(e,l)||ve,v=pr(b)||{},(!v||!v.left&&!v.top)&&yi(b).display==="none"&&(A=b.style.display,b.style.display="block",v=pr(b),A?b.style.display=A:b.style.removeProperty("display")),R=fc(E[0],v[r.d]),C=fc(E[1]||"0",n),t=v[r.p]-c[r.p]-u+R+s-C,a&&hc(a,C,r,n-C<20||a._isStart&&C>20),n-=n-C}if(g&&(l[g]=t||-.001,t<0&&(t=0)),o){var L=t+n,S=o._isStart;m="scroll"+r.d2,hc(o,L,r,S&&L>20||!S&&(f?Math.max(ve[m],ai[m]):o.parentNode[m])<=L+1),f&&(c=pr(a),f&&(o.style[r.op.p]=c[r.op.p]-r.op.m-o._offset+Je))}return h&&b&&(m=pr(b),h.seek(d),p=pr(b),h._caScrollDist=m[r.p]-p[r.p],t=t/h._caScrollDist*d),h&&h.seek(_),h?t:Math.round(t)},dS=/(webkit|moz|length|cssText|inset)/i,Yp=function(t,e,n,r){if(t.parentNode!==e){var s=t.style,o,a;if(e===ve){t._stOrig=s.cssText,a=yi(t);for(o in a)!+o&&!dS.test(o)&&a[o]&&typeof s[o]=="string"&&o!=="0"&&(s[o]=a[o]);s.top=n,s.left=r}else s.cssText=t._stOrig;Pt.core.getCache(t).uncache=1,e.appendChild(t)}},A0=function(t,e,n){var r=e,s=r;return function(o){var a=Math.round(t());return a!==r&&a!==s&&Math.abs(a-r)>3&&Math.abs(a-s)>3&&(o=a,n&&n()),s=r,r=Math.round(o),r}},Cl=function(t,e,n){var r={};r[e.p]="+="+n,Pt.set(t,r)},qp=function(t,e){var n=ns(t,e),r="_scroll"+e.p2,s=function o(a,l,c,u,f){var d=o.tween,h=l.onComplete,g={};c=c||n();var _=A0(n,c,function(){d.kill(),o.tween=0});return f=u&&f||0,u=u||a-c,d&&d.kill(),l[r]=a,l.inherit=!1,l.modifiers=g,g[r]=function(){return _(c+u*d.ratio+f*d.ratio*d.ratio)},l.onUpdate=function(){oe.cache++,o.tween&&xr()},l.onComplete=function(){o.tween=0,h&&h.call(d)},d=o.tween=Pt.to(t,l),d};return t[r]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},an(t,"wheel",n.wheelHandler),le.isTouch&&an(t,"touchmove",n.wheelHandler),s},le=(function(){function i(e,n){ho||i.register(Pt)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),Gf(this),this.init(e,n)}var t=i.prototype;return t.init=function(n,r){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!_a){this.update=this.refresh=this.kill=ki;return}n=kp(ri(n)||va(n)||n.nodeType?{trigger:n}:n,Tl);var s=n,o=s.onUpdate,a=s.toggleClass,l=s.id,c=s.onToggle,u=s.onRefresh,f=s.scrub,d=s.trigger,h=s.pin,g=s.pinSpacing,_=s.invalidateOnRefresh,m=s.anticipatePin,p=s.onScrubComplete,b=s.onSnapComplete,E=s.once,v=s.snap,R=s.pinReparent,C=s.pinSpacer,A=s.containerAnimation,L=s.fastScrollEnd,S=s.preventOverlaps,y=n.horizontal||n.containerAnimation&&n.horizontal!==!1?Bn:Qe,I=!f&&f!==0,B=Xn(n.scroller||se),G=Pt.core.getCache(B),Y=Fs(B),et=("pinType"in n?n.pinType:jr(B,"pinType")||Y&&"fixed")==="fixed",V=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],K=I&&n.toggleActions.split(" "),k="markers"in n?n.markers:Tl.markers,lt=Y?0:parseFloat(yi(B)["border"+y.p2+Go])||0,N=this,_t=n.onRefreshInit&&function(){return n.onRefreshInit(N)},Dt=iS(B,Y,y),Kt=rS(B,Y),it=0,ut=0,Mt=0,ht=ns(B,y),Rt,It,kt,te,P,U,w,rt,J,D,nt,ot,Q,M,x,O,W,X,j,ct,at,pt,Ft,ft,dt,Ot,Bt,xt,Ht,Vt,ce,F,St,tt,st,yt,bt,Gt,he;if(N._startClamp=N._endClamp=!1,N._dir=y,m*=45,N.scroller=B,N.scroll=A?A.time.bind(A):ht,te=ht(),N.vars=n,r=r||n.animation,"refreshPriority"in n&&(h0=1,n.refreshPriority===-9999&&(ka=N)),G.tweenScroll=G.tweenScroll||{top:qp(B,Qe),left:qp(B,Bn)},N.tweenTo=Rt=G.tweenScroll[y.p],N.scrubDuration=function(Tt){St=va(Tt)&&Tt,St?F?F.duration(Tt):F=Pt.to(r,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:St,paused:!0,onComplete:function(){return p&&p(N)}}):(F&&F.progress(1).kill(),F=0)},r&&(r.vars.lazy=!1,r._initted&&!N.isReverted||r.vars.immediateRender!==!1&&n.immediateRender!==!1&&r.duration()&&r.render(0,!0,!0),N.animation=r.pause(),r.scrollTrigger=N,N.scrubDuration(f),Vt=0,l||(l=r.vars.id)),v&&((!xs(v)||v.push)&&(v={snapTo:v}),"scrollBehavior"in ve.style&&Pt.set(Y?[ve,ai]:B,{scrollBehavior:"auto"}),oe.forEach(function(Tt){return Sn(Tt)&&Tt.target===(Y?Ce.scrollingElement||ai:B)&&(Tt.smooth=!1)}),kt=Sn(v.snapTo)?v.snapTo:v.snapTo==="labels"?oS(r):v.snapTo==="labelsDirectional"?aS(r):v.directional!==!1?function(Tt,Yt){return wd(v.snapTo)(Tt,vn()-ut<500?0:Yt.direction)}:Pt.utils.snap(v.snapTo),tt=v.duration||{min:.1,max:2},tt=xs(tt)?Na(tt.min,tt.max):Na(tt,tt),st=Pt.delayedCall(v.delay||St/2||.1,function(){var Tt=ht(),Yt=vn()-ut<500,Nt=Rt.tween;if((Yt||Math.abs(N.getVelocity())<10)&&!Nt&&!nu&&it!==Tt){var Xt=(Tt-U)/M,Ve=r&&!I?r.totalProgress():Xt,re=Yt?0:(Ve-ce)/(vn()-ma)*1e3||0,Ae=Pt.utils.clamp(-Xt,1-Xt,js(re/2)*re/.185),Ke=Xt+(v.inertia===!1?0:Ae),be,Ee,pe=v,Jn=pe.onStart,De=pe.onInterrupt,Tn=pe.onComplete;if(be=kt(Ke,N),va(be)||(be=Ke),Ee=Math.max(0,Math.round(U+be*M)),Tt<=w&&Tt>=U&&Ee!==Tt){if(Nt&&!Nt._initted&&Nt.data<=js(Ee-Tt))return;v.inertia===!1&&(Ae=be-Xt),Rt(Ee,{duration:tt(js(Math.max(js(Ke-Ve),js(be-Ve))*.185/re/.05||0)),ease:v.ease||"power3",data:js(Ee-Tt),onInterrupt:function(){return st.restart(!0)&&De&&De(N)},onComplete:function(){N.update(),it=ht(),r&&!I&&(F?F.resetTo("totalProgress",be,r._tTime/r._tDur):r.progress(be)),Vt=ce=r&&!I?r.totalProgress():N.progress,b&&b(N),Tn&&Tn(N)}},Tt,Ae*M,Ee-Tt-Ae*M),Jn&&Jn(N,Rt.tween)}}else N.isActive&&it!==Tt&&st.restart(!0)}).pause()),l&&(Xf[l]=N),d=N.trigger=Xn(d||h!==!0&&h),he=d&&d._gsap&&d._gsap.stRevert,he&&(he=he(N)),h=h===!0?d:Xn(h),ri(a)&&(a={targets:d,className:a}),h&&(g===!1||g===xi||(g=!g&&h.parentNode&&h.parentNode.style&&yi(h.parentNode).display==="flex"?!1:Ye),N.pin=h,It=Pt.core.getCache(h),It.spacer?x=It.pinState:(C&&(C=Xn(C),C&&!C.nodeType&&(C=C.current||C.nativeElement),It.spacerIsNative=!!C,C&&(It.spacerState=Al(C))),It.spacer=X=C||Ce.createElement("div"),X.classList.add("pin-spacer"),l&&X.classList.add("pin-spacer-"+l),It.pinState=x=Al(h)),n.force3D!==!1&&Pt.set(h,{force3D:!0}),N.spacer=X=It.spacer,Ht=yi(h),ft=Ht[g+y.os2],ct=Pt.getProperty(h),at=Pt.quickSetter(h,y.a,Je),Du(h,X,Ht),W=Al(h)),k){ot=xs(k)?kp(k,Hp):Hp,D=wl("scroller-start",l,B,y,ot,0),nt=wl("scroller-end",l,B,y,ot,0,D),j=D["offset"+y.op.d2];var ze=Xn(jr(B,"content")||B);rt=this.markerStart=wl("start",l,ze,y,ot,j,0,A),J=this.markerEnd=wl("end",l,ze,y,ot,j,0,A),A&&(Gt=Pt.quickSetter([rt,J],y.a,Je)),!et&&!(ji.length&&jr(B,"fixedMarkers")===!0)&&(sS(Y?ve:B),Pt.set([D,nt],{force3D:!0}),Ot=Pt.quickSetter(D,y.a,Je),xt=Pt.quickSetter(nt,y.a,Je))}if(A){var At=A.vars.onUpdate,Ut=A.vars.onUpdateParams;A.eventCallback("onUpdate",function(){N.update(0,0,1),At&&At.apply(A,Ut||[])})}if(N.previous=function(){return ie[ie.indexOf(N)-1]},N.next=function(){return ie[ie.indexOf(N)+1]},N.revert=function(Tt,Yt){if(!Yt)return N.kill(!0);var Nt=Tt!==!1||!N.enabled,Xt=gn;Nt!==N.isReverted&&(Nt&&(yt=Math.max(ht(),N.scroll.rec||0),Mt=N.progress,bt=r&&r.progress()),rt&&[rt,J,D,nt].forEach(function(Ve){return Ve.style.display=Nt?"none":"block"}),Nt&&(gn=N,N.update(Nt)),h&&(!R||!N.isActive)&&(Nt?uS(h,X,x):Du(h,X,yi(h),dt)),Nt||N.update(Nt),gn=Xt,N.isReverted=Nt)},N.refresh=function(Tt,Yt,Nt,Xt){if(!((gn||!N.enabled)&&!Yt)){if(h&&Tt&&wi){an(i,"scrollEnd",b0);return}!In&&_t&&_t(N),gn=N,Rt.tween&&!Nt&&(Rt.tween.kill(),Rt.tween=0),F&&F.pause(),_&&r&&(r.revert({kill:!1}).invalidate(),r.getChildren&&r.getChildren(!0,!0,!1).forEach(function(Ne){return Ne.vars.immediateRender&&Ne.render(0,!0,!0)})),N.isReverted||N.revert(!0,!0),N._subPinOffset=!1;var Ve=Dt(),re=Kt(),Ae=A?A.duration():Yi(B,y),Ke=M<=.01||!M,be=0,Ee=Xt||0,pe=xs(Nt)?Nt.end:n.end,Jn=n.endTrigger||d,De=xs(Nt)?Nt.start:n.start||(n.start===0||!d?0:h?"0 0":"0 100%"),Tn=N.pinnedContainer=n.pinnedContainer&&Xn(n.pinnedContainer,N),T=d&&Math.max(0,ie.indexOf(N))||0,z=T,q,$,H,mt,gt,Et,Ct,Wt,qt,Lt,$t,de,me;for(k&&xs(Nt)&&(de=Pt.getProperty(D,y.p),me=Pt.getProperty(nt,y.p));z-- >0;)Et=ie[z],Et.end||Et.refresh(0,1)||(gn=N),Ct=Et.pin,Ct&&(Ct===d||Ct===h||Ct===Tn)&&!Et.isReverted&&(Lt||(Lt=[]),Lt.unshift(Et),Et.revert(!0,!0)),Et!==ie[z]&&(T--,z--);for(Sn(De)&&(De=De(N)),De=Op(De,"start",N),U=Xp(De,d,Ve,y,ht(),rt,D,N,re,lt,et,Ae,A,N._startClamp&&"_startClamp")||(h?-.001:0),Sn(pe)&&(pe=pe(N)),ri(pe)&&!pe.indexOf("+=")&&(~pe.indexOf(" ")?pe=(ri(De)?De.split(" ")[0]:"")+pe:(be=fc(pe.substr(2),Ve),pe=ri(De)?De:(A?Pt.utils.mapRange(0,A.duration(),A.scrollTrigger.start,A.scrollTrigger.end,U):U)+be,Jn=d)),pe=Op(pe,"end",N),w=Math.max(U,Xp(pe||(Jn?"100% 0":Ae),Jn,Ve,y,ht()+be,J,nt,N,re,lt,et,Ae,A,N._endClamp&&"_endClamp"))||-.001,be=0,z=T;z--;)Et=ie[z],Ct=Et.pin,Ct&&Et.start-Et._pinPush<=U&&!A&&Et.end>0&&(q=Et.end-(N._startClamp?Math.max(0,Et.start):Et.start),(Ct===d&&Et.start-Et._pinPush<U||Ct===Tn)&&isNaN(De)&&(be+=q*(1-Et.progress)),Ct===h&&(Ee+=q));if(U+=be,w+=be,N._startClamp&&(N._startClamp+=be),N._endClamp&&!In&&(N._endClamp=w||-.001,w=Math.min(w,Yi(B,y))),M=w-U||(U-=.01)&&.001,Ke&&(Mt=Pt.utils.clamp(0,1,Pt.utils.normalize(U,w,yt))),N._pinPush=Ee,rt&&be&&(q={},q[y.a]="+="+be,Tn&&(q[y.p]="-="+ht()),Pt.set([rt,J],q)),h&&!(Wf&&N.end>=Yi(B,y)))q=yi(h),mt=y===Qe,H=ht(),pt=parseFloat(ct(y.a))+Ee,!Ae&&w>1&&($t=(Y?Ce.scrollingElement||ai:B).style,$t={style:$t,value:$t["overflow"+y.a.toUpperCase()]},Y&&yi(ve)["overflow"+y.a.toUpperCase()]!=="scroll"&&($t.style["overflow"+y.a.toUpperCase()]="scroll")),Du(h,X,q),W=Al(h),$=pr(h,!0),Wt=et&&ns(B,mt?Bn:Qe)(),g?(dt=[g+y.os2,M+Ee+Je],dt.t=X,z=g===Ye?kc(h,y)+M+Ee:0,z&&(dt.push(y.d,z+Je),X.style.flexBasis!=="auto"&&(X.style.flexBasis=z+Je)),Po(dt),Tn&&ie.forEach(function(Ne){Ne.pin===Tn&&Ne.vars.pinSpacing!==!1&&(Ne._subPinOffset=!0)}),et&&ht(yt)):(z=kc(h,y),z&&X.style.flexBasis!=="auto"&&(X.style.flexBasis=z+Je)),et&&(gt={top:$.top+(mt?H-U:Wt)+Je,left:$.left+(mt?Wt:H-U)+Je,boxSizing:"border-box",position:"fixed"},gt[Ls]=gt["max"+Go]=Math.ceil($.width)+Je,gt[Is]=gt["max"+Td]=Math.ceil($.height)+Je,gt[xi]=gt[xi+Ba]=gt[xi+Oa]=gt[xi+za]=gt[xi+Fa]="0",gt[Ye]=q[Ye],gt[Ye+Ba]=q[Ye+Ba],gt[Ye+Oa]=q[Ye+Oa],gt[Ye+za]=q[Ye+za],gt[Ye+Fa]=q[Ye+Fa],O=hS(x,gt,R),In&&ht(0)),r?(qt=r._initted,wu(1),r.render(r.duration(),!0,!0),Ft=ct(y.a)-pt+M+Ee,Bt=Math.abs(M-Ft)>1,et&&Bt&&O.splice(O.length-2,2),r.render(0,!0,!0),qt||r.invalidate(!0),r.parent||r.totalTime(r.totalTime()),wu(0)):Ft=M,$t&&($t.value?$t.style["overflow"+y.a.toUpperCase()]=$t.value:$t.style.removeProperty("overflow-"+y.a));else if(d&&ht()&&!A)for($=d.parentNode;$&&$!==ve;)$._pinOffset&&(U-=$._pinOffset,w-=$._pinOffset),$=$.parentNode;Lt&&Lt.forEach(function(Ne){return Ne.revert(!1,!0)}),N.start=U,N.end=w,te=P=In?yt:ht(),!A&&!In&&(te<yt&&ht(yt),N.scroll.rec=0),N.revert(!1,!0),ut=vn(),st&&(it=-1,st.restart(!0)),gn=0,r&&I&&(r._initted||bt)&&r.progress()!==bt&&r.progress(bt||0,!0).render(r.time(),!0,!0),(Ke||Mt!==N.progress||A||_||r&&!r._initted)&&(r&&!I&&(r._initted||Mt||r.vars.immediateRender!==!1)&&r.totalProgress(A&&U<-.001&&!Mt?Pt.utils.normalize(U,w,0):Mt,!0),N.progress=Ke||(te-U)/M===Mt?0:Mt),h&&g&&(X._pinOffset=Math.round(N.progress*Ft)),F&&F.invalidate(),isNaN(de)||(de-=Pt.getProperty(D,y.p),me-=Pt.getProperty(nt,y.p),Cl(D,y,de),Cl(rt,y,de-(Xt||0)),Cl(nt,y,me),Cl(J,y,me-(Xt||0))),Ke&&!In&&N.update(),u&&!In&&!Q&&(Q=!0,u(N),Q=!1)}},N.getVelocity=function(){return(ht()-P)/(vn()-ma)*1e3||0},N.endAnimation=function(){oa(N.callbackAnimation),r&&(F?F.progress(1):r.paused()?I||oa(r,N.direction<0,1):oa(r,r.reversed()))},N.labelToScroll=function(Tt){return r&&r.labels&&(U||N.refresh()||U)+r.labels[Tt]/r.duration()*M||0},N.getTrailing=function(Tt){var Yt=ie.indexOf(N),Nt=N.direction>0?ie.slice(0,Yt).reverse():ie.slice(Yt+1);return(ri(Tt)?Nt.filter(function(Xt){return Xt.vars.preventOverlaps===Tt}):Nt).filter(function(Xt){return N.direction>0?Xt.end<=U:Xt.start>=w})},N.update=function(Tt,Yt,Nt){if(!(A&&!Nt&&!Tt)){var Xt=In===!0?yt:N.scroll(),Ve=Tt?0:(Xt-U)/M,re=Ve<0?0:Ve>1?1:Ve||0,Ae=N.progress,Ke,be,Ee,pe,Jn,De,Tn,T;if(Yt&&(P=te,te=A?ht():Xt,v&&(ce=Vt,Vt=r&&!I?r.totalProgress():re)),m&&h&&!gn&&!Ml&&wi&&(!re&&U<Xt+(Xt-P)/(vn()-ma)*m?re=1e-4:re===1&&w>Xt+(Xt-P)/(vn()-ma)*m&&(re=.9999)),re!==Ae&&N.enabled){if(Ke=N.isActive=!!re&&re<1,be=!!Ae&&Ae<1,De=Ke!==be,Jn=De||!!re!=!!Ae,N.direction=re>Ae?1:-1,N.progress=re,Jn&&!gn&&(Ee=re&&!Ae?0:re===1?1:Ae===1?2:3,I&&(pe=!De&&K[Ee+1]!=="none"&&K[Ee+1]||K[Ee],T=r&&(pe==="complete"||pe==="reset"||pe in r))),S&&(De||T)&&(T||f||!r)&&(Sn(S)?S(N):N.getTrailing(S).forEach(function(H){return H.endAnimation()})),I||(F&&!gn&&!Ml?(F._dp._time-F._start!==F._time&&F.render(F._dp._time-F._start),F.resetTo?F.resetTo("totalProgress",re,r._tTime/r._tDur):(F.vars.totalProgress=re,F.invalidate().restart())):r&&r.totalProgress(re,!!(gn&&(ut||Tt)))),h){if(Tt&&g&&(X.style[g+y.os2]=ft),!et)at(ga(pt+Ft*re));else if(Jn){if(Tn=!Tt&&re>Ae&&w+1>Xt&&Xt+1>=Yi(B,y),R)if(!Tt&&(Ke||Tn)){var z=pr(h,!0),q=Xt-U;Yp(h,ve,z.top+(y===Qe?q:0)+Je,z.left+(y===Qe?0:q)+Je)}else Yp(h,X);Po(Ke||Tn?O:W),Bt&&re<1&&Ke||at(pt+(re===1&&!Tn?Ft:0))}}v&&!Rt.tween&&!gn&&!Ml&&st.restart(!0),a&&(De||E&&re&&(re<1||!Au))&&el(a.targets).forEach(function(H){return H.classList[Ke||E?"add":"remove"](a.className)}),o&&!I&&!Tt&&o(N),Jn&&!gn?(I&&(T&&(pe==="complete"?r.pause().totalProgress(1):pe==="reset"?r.restart(!0).pause():pe==="restart"?r.restart(!0):r[pe]()),o&&o(N)),(De||!Au)&&(c&&De&&Ru(N,c),V[Ee]&&Ru(N,V[Ee]),E&&(re===1?N.kill(!1,1):V[Ee]=0),De||(Ee=re===1?1:3,V[Ee]&&Ru(N,V[Ee]))),L&&!Ke&&Math.abs(N.getVelocity())>(va(L)?L:2500)&&(oa(N.callbackAnimation),F?F.progress(1):oa(r,pe==="reverse"?1:!re,1))):I&&o&&!gn&&o(N)}if(xt){var $=A?Xt/A.duration()*(A._caScrollDist||0):Xt;Ot($+(D._isFlipped?1:0)),xt($)}Gt&&Gt(-Xt/A.duration()*(A._caScrollDist||0))}},N.enable=function(Tt,Yt){N.enabled||(N.enabled=!0,an(B,"resize",xa),Y||an(B,"scroll",Ks),_t&&an(i,"refreshInit",_t),Tt!==!1&&(N.progress=Mt=0,te=P=it=ht()),Yt!==!1&&N.refresh())},N.getTween=function(Tt){return Tt&&Rt?Rt.tween:F},N.setPositions=function(Tt,Yt,Nt,Xt){if(A){var Ve=A.scrollTrigger,re=A.duration(),Ae=Ve.end-Ve.start;Tt=Ve.start+Ae*Tt/re,Yt=Ve.start+Ae*Yt/re}N.refresh(!1,!1,{start:Fp(Tt,Nt&&!!N._startClamp),end:Fp(Yt,Nt&&!!N._endClamp)},Xt),N.update()},N.adjustPinSpacing=function(Tt){if(dt&&Tt){var Yt=dt.indexOf(y.d)+1;dt[Yt]=parseFloat(dt[Yt])+Tt+Je,dt[1]=parseFloat(dt[1])+Tt+Je,Po(dt)}},N.disable=function(Tt,Yt){if(N.enabled&&(Tt!==!1&&N.revert(!0,!0),N.enabled=N.isActive=!1,Yt||F&&F.pause(),yt=0,It&&(It.uncache=1),_t&&on(i,"refreshInit",_t),st&&(st.pause(),Rt.tween&&Rt.tween.kill()&&(Rt.tween=0)),!Y)){for(var Nt=ie.length;Nt--;)if(ie[Nt].scroller===B&&ie[Nt]!==N)return;on(B,"resize",xa),Y||on(B,"scroll",Ks)}},N.kill=function(Tt,Yt){N.disable(Tt,Yt),F&&!Yt&&F.kill(),l&&delete Xf[l];var Nt=ie.indexOf(N);Nt>=0&&ie.splice(Nt,1),Nt===Ln&&dc>0&&Ln--,Nt=0,ie.forEach(function(Xt){return Xt.scroller===N.scroller&&(Nt=1)}),Nt||In||(N.scroll.rec=0),r&&(r.scrollTrigger=null,Tt&&r.revert({kill:!1}),Yt||r.kill()),rt&&[rt,J,D,nt].forEach(function(Xt){return Xt.parentNode&&Xt.parentNode.removeChild(Xt)}),ka===N&&(ka=0),h&&(It&&(It.uncache=1),Nt=0,ie.forEach(function(Xt){return Xt.pin===h&&Nt++}),Nt||(It.spacer=0)),n.onKill&&n.onKill(N)},ie.push(N),N.enable(!1,!1),he&&he(N),r&&r.add&&!M){var Zt=N.update;N.update=function(){N.update=Zt,oe.cache++,U||w||N.refresh()},Pt.delayedCall(.01,N.update),M=.01,U=w=0}else N.refresh();h&&cS()},i.register=function(n){return ho||(Pt=n||g0(),_0()&&window.document&&i.enable(),ho=_a),ho},i.defaults=function(n){if(n)for(var r in n)Tl[r]=n[r];return Tl},i.disable=function(n,r){_a=0,ie.forEach(function(o){return o[r?"kill":"disable"](n)}),on(se,"wheel",Ks),on(Ce,"scroll",Ks),clearInterval(yl),on(Ce,"touchcancel",ki),on(ve,"touchstart",ki),bl(on,Ce,"pointerdown,touchstart,mousedown",Bp),bl(on,Ce,"pointerup,touchend,mouseup",zp),Bc.kill(),Sl(on);for(var s=0;s<oe.length;s+=3)El(on,oe[s],oe[s+1]),El(on,oe[s],oe[s+2])},i.enable=function(){if(se=window,Ce=document,ai=Ce.documentElement,ve=Ce.body,Pt&&(el=Pt.utils.toArray,Na=Pt.utils.clamp,Gf=Pt.core.context||ki,wu=Pt.core.suppressOverwrites||ki,Md=se.history.scrollRestoration||"auto",Yf=se.pageYOffset||0,Pt.core.globals("ScrollTrigger",i),ve)){_a=1,Ro=document.createElement("div"),Ro.style.height="100vh",Ro.style.position="absolute",w0(),nS(),We.register(Pt),i.isTouch=We.isTouch,Nr=We.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),Vf=We.isTouch===1,an(se,"wheel",Ks),yd=[se,Ce,ai,ve],Pt.matchMedia?(i.matchMedia=function(c){var u=Pt.matchMedia(),f;for(f in c)u.add(f,c[f]);return u},Pt.addEventListener("matchMediaInit",function(){return Ad()}),Pt.addEventListener("matchMediaRevert",function(){return E0()}),Pt.addEventListener("matchMedia",function(){Es(0,1),zs("matchMedia")}),Pt.matchMedia().add("(orientation: portrait)",function(){return Pu(),Pu})):console.warn("Requires GSAP 3.11.0 or later"),Pu(),an(Ce,"scroll",Ks);var n=ve.hasAttribute("style"),r=ve.style,s=r.borderTopStyle,o=Pt.core.Animation.prototype,a,l;for(o.revert||Object.defineProperty(o,"revert",{value:function(){return this.time(-.01,!0)}}),r.borderTopStyle="solid",a=pr(ve),Qe.m=Math.round(a.top+Qe.sc())||0,Bn.m=Math.round(a.left+Bn.sc())||0,s?r.borderTopStyle=s:r.removeProperty("border-top-style"),n||(ve.setAttribute("style",""),ve.removeAttribute("style")),yl=setInterval(Vp,250),Pt.delayedCall(.5,function(){return Ml=0}),an(Ce,"touchcancel",ki),an(ve,"touchstart",ki),bl(an,Ce,"pointerdown,touchstart,mousedown",Bp),bl(an,Ce,"pointerup,touchend,mouseup",zp),Hf=Pt.utils.checkPrefix("transform"),pc.push(Hf),ho=vn(),Bc=Pt.delayedCall(.2,Es).pause(),po=[Ce,"visibilitychange",function(){var c=se.innerWidth,u=se.innerHeight;Ce.hidden?(Up=c,Np=u):(Up!==c||Np!==u)&&xa()},Ce,"DOMContentLoaded",Es,se,"load",Es,se,"resize",xa],Sl(an),ie.forEach(function(c){return c.enable(0,1)}),l=0;l<oe.length;l+=3)El(on,oe[l],oe[l+1]),El(on,oe[l],oe[l+2])}},i.config=function(n){"limitCallbacks"in n&&(Au=!!n.limitCallbacks);var r=n.syncInterval;r&&clearInterval(yl)||(yl=r)&&setInterval(Vp,r),"ignoreMobileResize"in n&&(Vf=i.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(Sl(on)||Sl(an,n.autoRefreshEvents||"none"),d0=(n.autoRefreshEvents+"").indexOf("resize")===-1)},i.scrollerProxy=function(n,r){var s=Xn(n),o=oe.indexOf(s),a=Fs(s);~o&&oe.splice(o,a?6:2),r&&(a?ji.unshift(se,r,ve,r,ai,r):ji.unshift(s,r))},i.clearMatchMedia=function(n){ie.forEach(function(r){return r._ctx&&r._ctx.query===n&&r._ctx.kill(!0,!0)})},i.isInViewport=function(n,r,s){var o=(ri(n)?Xn(n):n).getBoundingClientRect(),a=o[s?Ls:Is]*r||0;return s?o.right-a>0&&o.left+a<se.innerWidth:o.bottom-a>0&&o.top+a<se.innerHeight},i.positionInViewport=function(n,r,s){ri(n)&&(n=Xn(n));var o=n.getBoundingClientRect(),a=o[s?Ls:Is],l=r==null?a/2:r in Hc?Hc[r]*a:~r.indexOf("%")?parseFloat(r)*a/100:parseFloat(r)||0;return s?(o.left+l)/se.innerWidth:(o.top+l)/se.innerHeight},i.killAll=function(n){if(ie.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var r=Bs.killAll||[];Bs={},r.forEach(function(s){return s()})}},i})();le.version="3.13.0";le.saveStyles=function(i){return i?el(i).forEach(function(t){if(t&&t.style){var e=ii.indexOf(t);e>=0&&ii.splice(e,5),ii.push(t,t.style.cssText,t.getBBox&&t.getAttribute("transform"),Pt.core.getCache(t),Gf())}}):ii};le.revert=function(i,t){return Ad(!i,t)};le.create=function(i,t){return new le(i,t)};le.refresh=function(i){return i?xa(!0):(ho||le.register())&&Es(!0)};le.update=function(i){return++oe.cache&&xr(i===!0?2:0)};le.clearScrollMemory=T0;le.maxScroll=function(i,t){return Yi(i,t?Bn:Qe)};le.getScrollFunc=function(i,t){return ns(Xn(i),t?Bn:Qe)};le.getById=function(i){return Xf[i]};le.getAll=function(){return ie.filter(function(i){return i.vars.id!=="ScrollSmoother"})};le.isScrolling=function(){return!!wi};le.snapDirectional=wd;le.addEventListener=function(i,t){var e=Bs[i]||(Bs[i]=[]);~e.indexOf(t)||e.push(t)};le.removeEventListener=function(i,t){var e=Bs[i],n=e&&e.indexOf(t);n>=0&&e.splice(n,1)};le.batch=function(i,t){var e=[],n={},r=t.interval||.016,s=t.batchMax||1e9,o=function(c,u){var f=[],d=[],h=Pt.delayedCall(r,function(){u(f,d),f=[],d=[]}).pause();return function(g){f.length||h.restart(!0),f.push(g.trigger),d.push(g),s<=f.length&&h.progress(1)}},a;for(a in t)n[a]=a.substr(0,2)==="on"&&Sn(t[a])&&a!=="onRefreshInit"?o(a,t[a]):t[a];return Sn(s)&&(s=s(),an(le,"refresh",function(){return s=t.batchMax()})),el(i).forEach(function(l){var c={};for(a in n)c[a]=n[a];c.trigger=l,e.push(le.create(c))}),e};var $p=function(t,e,n,r){return e>r?t(r):e<0&&t(0),n>r?(r-e)/(n-e):n<0?e/(e-n):1},Lu=function i(t,e){e===!0?t.style.removeProperty("touch-action"):t.style.touchAction=e===!0?"auto":e?"pan-"+e+(We.isTouch?" pinch-zoom":""):"none",t===ai&&i(ve,e)},Rl={auto:1,scroll:1},pS=function(t){var e=t.event,n=t.target,r=t.axis,s=(e.changedTouches?e.changedTouches[0]:e).target,o=s._gsap||Pt.core.getCache(s),a=vn(),l;if(!o._isScrollT||a-o._isScrollT>2e3){for(;s&&s!==ve&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(Rl[(l=yi(s)).overflowY]||Rl[l.overflowX]));)s=s.parentNode;o._isScroll=s&&s!==n&&!Fs(s)&&(Rl[(l=yi(s)).overflowY]||Rl[l.overflowX]),o._isScrollT=a}(o._isScroll||r==="x")&&(e.stopPropagation(),e._gsapAllow=!0)},C0=function(t,e,n,r){return We.create({target:t,capture:!0,debounce:!1,lockAxis:!0,type:e,onWheel:r=r&&pS,onPress:r,onDrag:r,onScroll:r,onEnable:function(){return n&&an(Ce,We.eventTypes[0],Kp,!1,!0)},onDisable:function(){return on(Ce,We.eventTypes[0],Kp,!0)}})},mS=/(input|label|select|textarea)/i,jp,Kp=function(t){var e=mS.test(t.target.tagName);(e||jp)&&(t._gsapAllow=!0,jp=e)},_S=function(t){xs(t)||(t={}),t.preventDefault=t.isNormalizer=t.allowClicks=!0,t.type||(t.type="wheel,touch"),t.debounce=!!t.debounce,t.id=t.id||"normalizer";var e=t,n=e.normalizeScrollX,r=e.momentum,s=e.allowNestedScroll,o=e.onRelease,a,l,c=Xn(t.target)||ai,u=Pt.core.globals().ScrollSmoother,f=u&&u.get(),d=Nr&&(t.content&&Xn(t.content)||f&&t.content!==!1&&!f.smooth()&&f.content()),h=ns(c,Qe),g=ns(c,Bn),_=1,m=(We.isTouch&&se.visualViewport?se.visualViewport.scale*se.visualViewport.width:se.outerWidth)/se.innerWidth,p=0,b=Sn(r)?function(){return r(a)}:function(){return r||2.8},E,v,R=C0(c,t.type,!0,s),C=function(){return v=!1},A=ki,L=ki,S=function(){l=Yi(c,Qe),L=Na(Nr?1:0,l),n&&(A=Na(0,Yi(c,Bn))),E=Us},y=function(){d._gsap.y=ga(parseFloat(d._gsap.y)+h.offset)+"px",d.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(d._gsap.y)+", 0, 1)",h.offset=h.cacheID=0},I=function(){if(v){requestAnimationFrame(C);var k=ga(a.deltaY/2),lt=L(h.v-k);if(d&&lt!==h.v+h.offset){h.offset=lt-h.v;var N=ga((parseFloat(d&&d._gsap.y)||0)-h.offset);d.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+N+", 0, 1)",d._gsap.y=N+"px",h.cacheID=oe.cache,xr()}return!0}h.offset&&y(),v=!0},B,G,Y,et,V=function(){S(),B.isActive()&&B.vars.scrollY>l&&(h()>l?B.progress(1)&&h(l):B.resetTo("scrollY",l))};return d&&Pt.set(d,{y:"+=0"}),t.ignoreCheck=function(K){return Nr&&K.type==="touchmove"&&I()||_>1.05&&K.type!=="touchstart"||a.isGesturing||K.touches&&K.touches.length>1},t.onPress=function(){v=!1;var K=_;_=ga((se.visualViewport&&se.visualViewport.scale||1)/m),B.pause(),K!==_&&Lu(c,_>1.01?!0:n?!1:"x"),G=g(),Y=h(),S(),E=Us},t.onRelease=t.onGestureStart=function(K,k){if(h.offset&&y(),!k)et.restart(!0);else{oe.cache++;var lt=b(),N,_t;n&&(N=g(),_t=N+lt*.05*-K.velocityX/.227,lt*=$p(g,N,_t,Yi(c,Bn)),B.vars.scrollX=A(_t)),N=h(),_t=N+lt*.05*-K.velocityY/.227,lt*=$p(h,N,_t,Yi(c,Qe)),B.vars.scrollY=L(_t),B.invalidate().duration(lt).play(.01),(Nr&&B.vars.scrollY>=l||N>=l-1)&&Pt.to({},{onUpdate:V,duration:lt})}o&&o(K)},t.onWheel=function(){B._ts&&B.pause(),vn()-p>1e3&&(E=0,p=vn())},t.onChange=function(K,k,lt,N,_t){if(Us!==E&&S(),k&&n&&g(A(N[2]===k?G+(K.startX-K.x):g()+k-N[1])),lt){h.offset&&y();var Dt=_t[2]===lt,Kt=Dt?Y+K.startY-K.y:h()+lt-_t[1],it=L(Kt);Dt&&Kt!==it&&(Y+=it-Kt),h(it)}(lt||k)&&xr()},t.onEnable=function(){Lu(c,n?!1:"x"),le.addEventListener("refresh",V),an(se,"resize",V),h.smooth&&(h.target.style.scrollBehavior="auto",h.smooth=g.smooth=!1),R.enable()},t.onDisable=function(){Lu(c,!0),on(se,"resize",V),le.removeEventListener("refresh",V),R.kill()},t.lockAxis=t.lockAxis!==!1,a=new We(t),a.iOS=Nr,Nr&&!h()&&h(1),Nr&&Pt.ticker.add(ki),et=a._dc,B=Pt.to(a,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:A0(h,h(),function(){return B.pause()})},onUpdate:xr,onComplete:et.vars.onComplete}),a};le.sort=function(i){if(Sn(i))return ie.sort(i);var t=se.pageYOffset||0;return le.getAll().forEach(function(e){return e._sortY=e.trigger?t+e.trigger.getBoundingClientRect().top:e.start+se.innerHeight}),ie.sort(i||function(e,n){return(e.vars.refreshPriority||0)*-1e6+(e.vars.containerAnimation?1e6:e._sortY)-((n.vars.containerAnimation?1e6:n._sortY)+(n.vars.refreshPriority||0)*-1e6)})};le.observe=function(i){return new We(i)};le.normalizeScroll=function(i){if(typeof i>"u")return Dn;if(i===!0&&Dn)return Dn.enable();if(i===!1){Dn&&Dn.kill(),Dn=i;return}var t=i instanceof We?i:_S(i);return Dn&&Dn.target===t.target&&Dn.kill(),Fs(t.target)&&(Dn=t),t};le.core={_getVelocityProp:kf,_inputObserver:C0,_scrollers:oe,_proxies:ji,bridge:{ss:function(){wi||zs("scrollStart"),wi=vn()},ref:function(){return gn}}};g0()&&Pt.registerPlugin(le);const gS={class:"max-w-7xl mx-auto flex justify-between items-center"},vS={class:"hidden md:flex list-none gap-8"},xS=["href"],yS={__name:"Navbar",setup(i){const t=jh(!1),e=[{id:1,name:"Home",href:"home"},{id:2,name:"About",href:"about"},{id:3,name:"Tech",href:"tech"},{id:4,name:"Experience",href:"experience"},{id:5,name:"Projects",href:"projects"},{id:6,name:"Certificates",href:"certificates"}],n=s=>{const o=s.target.getAttribute("href"),a=document.querySelector(o);a&&a.scrollIntoView({behavior:"smooth"})},r=()=>{t.value=window.scrollY>50};return Ko(()=>{window.addEventListener("scroll",r)}),ol(()=>{window.removeEventListener("scroll",r)}),(s,o)=>(tn(),en("nav",{class:Va(["fixed top-0 w-full py-3 px-4 md:py-6 md:px-8 transition-all duration-300 z-50 backdrop-blur-xl",t.value?"bg-slate-900/90 shadow-xl border-b border-cyan-500/20":"bg-transparent"])},[vt("div",gS,[o[0]||(o[0]=vt("div",{class:"text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-primary to-secondary bg-clip-text text-transparent tracking-tight"}," SH ",-1)),vt("ul",vS,[(tn(),en(yn,null,Ns(e,a=>vt("li",{key:a.id},[vt("a",{href:`#${a.href}`,onClick:Ly(n,["prevent"]),class:Va(["font-semibold px-4 py-2 rounded-lg relative transition-all after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-cyan-400 after:to-primary after:transition-all after:duration-300 hover:after:w-4/5 hover:after:left-[10%]",t.value?"text-slate-200 hover:text-cyan-300 hover:bg-white/5":"text-white hover:text-cyan-200"])},un(a.name),11,xS)])),64))])])],2))}};const Cd="170",Do={ROTATE:0,DOLLY:1,PAN:2},vo={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},MS=0,Zp=1,SS=2,R0=1,bS=2,cr=3,is=0,zn=1,mr=2,Kr=0,Lo=1,Vc=2,Jp=3,Qp=4,ES=5,Ms=100,TS=101,wS=102,AS=103,CS=104,RS=200,PS=201,DS=202,LS=203,$f=204,jf=205,IS=206,US=207,NS=208,OS=209,FS=210,BS=211,zS=212,kS=213,HS=214,Kf=0,Zf=1,Jf=2,Wo=3,Qf=4,th=5,eh=6,nh=7,Rd=0,VS=1,GS=2,Zr=0,WS=1,XS=2,YS=3,qS=4,$S=5,jS=6,KS=7,P0=300,Xo=301,Yo=302,ih=303,rh=304,iu=306,sh=1e3,Ts=1001,oh=1002,Ni=1003,ZS=1004,Pl=1005,qi=1006,Iu=1007,ws=1008,Tr=1009,D0=1010,L0=1011,il=1012,Pd=1013,ks=1014,gr=1015,cl=1016,Dd=1017,Ld=1018,qo=1020,I0=35902,U0=1021,N0=1022,Ii=1023,O0=1024,F0=1025,Io=1026,$o=1027,B0=1028,Id=1029,z0=1030,Ud=1031,Nd=1033,_c=33776,gc=33777,vc=33778,xc=33779,ah=35840,lh=35841,ch=35842,uh=35843,fh=36196,hh=37492,dh=37496,ph=37808,mh=37809,_h=37810,gh=37811,vh=37812,xh=37813,yh=37814,Mh=37815,Sh=37816,bh=37817,Eh=37818,Th=37819,wh=37820,Ah=37821,yc=36492,Ch=36494,Rh=36495,k0=36283,Ph=36284,Dh=36285,Lh=36286,JS=3200,QS=3201,H0=0,tb=1,kr="",oi="srgb",Zo="srgb-linear",ru="linear",Me="srgb",Zs=7680,tm=519,eb=512,nb=513,ib=514,V0=515,rb=516,sb=517,ob=518,ab=519,em=35044,nm="300 es",vr=2e3,Gc=2001;class Xs{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const r=this._listeners[t];if(r!==void 0){const s=r.indexOf(e);s!==-1&&r.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const r=n.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,t);t.target=null}}}const mn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Mc=Math.PI/180,Ih=180/Math.PI;function ul(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(mn[i&255]+mn[i>>8&255]+mn[i>>16&255]+mn[i>>24&255]+"-"+mn[t&255]+mn[t>>8&255]+"-"+mn[t>>16&15|64]+mn[t>>24&255]+"-"+mn[e&63|128]+mn[e>>8&255]+"-"+mn[e>>16&255]+mn[e>>24&255]+mn[n&255]+mn[n>>8&255]+mn[n>>16&255]+mn[n>>24&255]).toLowerCase()}function Nn(i,t,e){return Math.max(t,Math.min(e,i))}function lb(i,t){return(i%t+t)%t}function Uu(i,t,e){return(1-e)*i+e*t}function aa(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Vn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const cb={DEG2RAD:Mc};class Qt{constructor(t=0,e=0){Qt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6],this.y=r[1]*e+r[4]*n+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Nn(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),r=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*n-o*r+t.x,this.y=s*r+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Jt{constructor(t,e,n,r,s,o,a,l,c){Jt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,o,a,l,c)}set(t,e,n,r,s,o,a,l,c){const u=this.elements;return u[0]=t,u[1]=r,u[2]=a,u[3]=e,u[4]=s,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],f=n[7],d=n[2],h=n[5],g=n[8],_=r[0],m=r[3],p=r[6],b=r[1],E=r[4],v=r[7],R=r[2],C=r[5],A=r[8];return s[0]=o*_+a*b+l*R,s[3]=o*m+a*E+l*C,s[6]=o*p+a*v+l*A,s[1]=c*_+u*b+f*R,s[4]=c*m+u*E+f*C,s[7]=c*p+u*v+f*A,s[2]=d*_+h*b+g*R,s[5]=d*m+h*E+g*C,s[8]=d*p+h*v+g*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8];return e*o*u-e*a*c-n*s*u+n*a*l+r*s*c-r*o*l}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],f=u*o-a*c,d=a*l-u*s,h=c*s-o*l,g=e*f+n*d+r*h;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=f*_,t[1]=(r*c-u*n)*_,t[2]=(a*n-r*o)*_,t[3]=d*_,t[4]=(u*e-r*l)*_,t[5]=(r*s-a*e)*_,t[6]=h*_,t[7]=(n*l-c*e)*_,t[8]=(o*e-n*s)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-r*c,r*l,-r*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Nu.makeScale(t,e)),this}rotate(t){return this.premultiply(Nu.makeRotation(-t)),this}translate(t,e){return this.premultiply(Nu.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<9;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Nu=new Jt;function G0(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function rl(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function ub(){const i=rl("canvas");return i.style.display="block",i}const im={};function ya(i){i in im||(im[i]=!0,console.warn(i))}function fb(i,t,e){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}function hb(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function db(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const fe={enabled:!0,workingColorSpace:Zo,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===Me&&(i.r=yr(i.r),i.g=yr(i.g),i.b=yr(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===Me&&(i.r=Uo(i.r),i.g=Uo(i.g),i.b=Uo(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===kr?ru:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function yr(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Uo(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const rm=[.64,.33,.3,.6,.15,.06],sm=[.2126,.7152,.0722],om=[.3127,.329],am=new Jt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),lm=new Jt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);fe.define({[Zo]:{primaries:rm,whitePoint:om,transfer:ru,toXYZ:am,fromXYZ:lm,luminanceCoefficients:sm,workingColorSpaceConfig:{unpackColorSpace:oi},outputColorSpaceConfig:{drawingBufferColorSpace:oi}},[oi]:{primaries:rm,whitePoint:om,transfer:Me,toXYZ:am,fromXYZ:lm,luminanceCoefficients:sm,outputColorSpaceConfig:{drawingBufferColorSpace:oi}}});let Js;class pb{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Js===void 0&&(Js=rl("canvas")),Js.width=t.width,Js.height=t.height;const n=Js.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Js}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=rl("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const r=n.getImageData(0,0,t.width,t.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=yr(s[o]/255)*255;return n.putImageData(r,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(yr(e[n]/255)*255):e[n]=yr(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let mb=0;class W0{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:mb++}),this.uuid=ul(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Ou(r[o].image)):s.push(Ou(r[o]))}else s=Ou(r);n.url=s}return e||(t.images[this.uuid]=n),n}}function Ou(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?pb.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let _b=0;class kn extends Xs{constructor(t=kn.DEFAULT_IMAGE,e=kn.DEFAULT_MAPPING,n=Ts,r=Ts,s=qi,o=ws,a=Ii,l=Tr,c=kn.DEFAULT_ANISOTROPY,u=kr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:_b++}),this.uuid=ul(),this.name="",this.source=new W0(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Qt(0,0),this.repeat=new Qt(1,1),this.center=new Qt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Jt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==P0)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case sh:t.x=t.x-Math.floor(t.x);break;case Ts:t.x=t.x<0?0:1;break;case oh:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case sh:t.y=t.y-Math.floor(t.y);break;case Ts:t.y=t.y<0?0:1;break;case oh:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}kn.DEFAULT_IMAGE=null;kn.DEFAULT_MAPPING=P0;kn.DEFAULT_ANISOTROPY=1;class ke{constructor(t=0,e=0,n=0,r=1){ke.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,r){return this.x=t,this.y=e,this.z=n,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*r+o[12]*s,this.y=o[1]*e+o[5]*n+o[9]*r+o[13]*s,this.z=o[2]*e+o[6]*n+o[10]*r+o[14]*s,this.w=o[3]*e+o[7]*n+o[11]*r+o[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,r,s;const l=t.elements,c=l[0],u=l[4],f=l[8],d=l[1],h=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(u-d)<.01&&Math.abs(f-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(f+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+h+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const E=(c+1)/2,v=(h+1)/2,R=(p+1)/2,C=(u+d)/4,A=(f+_)/4,L=(g+m)/4;return E>v&&E>R?E<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(E),r=C/n,s=A/n):v>R?v<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(v),n=C/r,s=L/r):R<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(R),n=A/s,r=L/s),this.set(n,r,s,e),this}let b=Math.sqrt((m-g)*(m-g)+(f-_)*(f-_)+(d-u)*(d-u));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(f-_)/b,this.z=(d-u)/b,this.w=Math.acos((c+h+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class gb extends Xs{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ke(0,0,t,e),this.scissorTest=!1,this.viewport=new ke(0,0,t,e);const r={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:qi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new kn(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,r=t.textures.length;n<r;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new W0(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Hs extends gb{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class X0 extends kn{constructor(t=null,e=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=Ni,this.minFilter=Ni,this.wrapR=Ts,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class vb extends kn{constructor(t=null,e=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=Ni,this.minFilter=Ni,this.wrapR=Ts,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Vs{constructor(t=0,e=0,n=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=r}static slerpFlat(t,e,n,r,s,o,a){let l=n[r+0],c=n[r+1],u=n[r+2],f=n[r+3];const d=s[o+0],h=s[o+1],g=s[o+2],_=s[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=f;return}if(a===1){t[e+0]=d,t[e+1]=h,t[e+2]=g,t[e+3]=_;return}if(f!==_||l!==d||c!==h||u!==g){let m=1-a;const p=l*d+c*h+u*g+f*_,b=p>=0?1:-1,E=1-p*p;if(E>Number.EPSILON){const R=Math.sqrt(E),C=Math.atan2(R,p*b);m=Math.sin(m*C)/R,a=Math.sin(a*C)/R}const v=a*b;if(l=l*m+d*v,c=c*m+h*v,u=u*m+g*v,f=f*m+_*v,m===1-a){const R=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=R,c*=R,u*=R,f*=R}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=f}static multiplyQuaternionsFlat(t,e,n,r,s,o){const a=n[r],l=n[r+1],c=n[r+2],u=n[r+3],f=s[o],d=s[o+1],h=s[o+2],g=s[o+3];return t[e]=a*g+u*f+l*h-c*d,t[e+1]=l*g+u*d+c*f-a*h,t[e+2]=c*g+u*h+a*d-l*f,t[e+3]=u*g-a*f-l*d-c*h,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,r){return this._x=t,this._y=e,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,r=t._y,s=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(r/2),f=a(s/2),d=l(n/2),h=l(r/2),g=l(s/2);switch(o){case"XYZ":this._x=d*u*f+c*h*g,this._y=c*h*f-d*u*g,this._z=c*u*g+d*h*f,this._w=c*u*f-d*h*g;break;case"YXZ":this._x=d*u*f+c*h*g,this._y=c*h*f-d*u*g,this._z=c*u*g-d*h*f,this._w=c*u*f+d*h*g;break;case"ZXY":this._x=d*u*f-c*h*g,this._y=c*h*f+d*u*g,this._z=c*u*g+d*h*f,this._w=c*u*f-d*h*g;break;case"ZYX":this._x=d*u*f-c*h*g,this._y=c*h*f+d*u*g,this._z=c*u*g-d*h*f,this._w=c*u*f+d*h*g;break;case"YZX":this._x=d*u*f+c*h*g,this._y=c*h*f+d*u*g,this._z=c*u*g-d*h*f,this._w=c*u*f-d*h*g;break;case"XZY":this._x=d*u*f-c*h*g,this._y=c*h*f-d*u*g,this._z=c*u*g+d*h*f,this._w=c*u*f+d*h*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,r=Math.sin(n);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],r=e[4],s=e[8],o=e[1],a=e[5],l=e[9],c=e[2],u=e[6],f=e[10],d=n+a+f;if(d>0){const h=.5/Math.sqrt(d+1);this._w=.25/h,this._x=(u-l)*h,this._y=(s-c)*h,this._z=(o-r)*h}else if(n>a&&n>f){const h=2*Math.sqrt(1+n-a-f);this._w=(u-l)/h,this._x=.25*h,this._y=(r+o)/h,this._z=(s+c)/h}else if(a>f){const h=2*Math.sqrt(1+a-n-f);this._w=(s-c)/h,this._x=(r+o)/h,this._y=.25*h,this._z=(l+u)/h}else{const h=2*Math.sqrt(1+f-n-a);this._w=(o-r)/h,this._x=(s+c)/h,this._y=(l+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Nn(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const r=Math.min(1,e/n);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,r=t._y,s=t._z,o=t._w,a=e._x,l=e._y,c=e._z,u=e._w;return this._x=n*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-n*c,this._z=s*u+o*c+n*l-r*a,this._w=o*u-n*a-r*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,r=this._y,s=this._z,o=this._w;let a=o*t._w+n*t._x+r*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const h=1-e;return this._w=h*o+e*this._w,this._x=h*n+e*this._x,this._y=h*r+e*this._y,this._z=h*s+e*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),f=Math.sin((1-e)*u)/c,d=Math.sin(e*u)/c;return this._w=o*f+this._w*d,this._x=n*f+this._x*d,this._y=r*f+this._y*d,this._z=s*f+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(t),r*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class Z{constructor(t=0,e=0,n=0){Z.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(cm.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(cm.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*r,this.y=s[1]*e+s[4]*n+s[7]*r,this.z=s[2]*e+s[5]*n+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,s=t.elements,o=1/(s[3]*e+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*r+s[12])*o,this.y=(s[1]*e+s[5]*n+s[9]*r+s[13])*o,this.z=(s[2]*e+s[6]*n+s[10]*r+s[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,r=this.z,s=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*r-a*n),u=2*(a*e-s*r),f=2*(s*n-o*e);return this.x=e+l*c+o*f-a*u,this.y=n+l*u+a*c-s*f,this.z=r+l*f+s*u-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*r,this.y=s[1]*e+s[5]*n+s[9]*r,this.z=s[2]*e+s[6]*n+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,r=t.y,s=t.z,o=e.x,a=e.y,l=e.z;return this.x=r*l-s*a,this.y=s*o-n*l,this.z=n*a-r*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Fu.copy(this).projectOnVector(t),this.sub(Fu)}reflect(t){return this.sub(Fu.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Nn(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,r=this.z-t.z;return e*e+n*n+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const r=Math.sin(e)*t;return this.x=r*Math.sin(n),this.y=Math.cos(e)*t,this.z=r*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Fu=new Z,cm=new Vs;class fl{constructor(t=new Z(1/0,1/0,1/0),e=new Z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Ci.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Ci.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Ci.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Ci):Ci.fromBufferAttribute(s,o),Ci.applyMatrix4(t.matrixWorld),this.expandByPoint(Ci);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Dl.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Dl.copy(n.boundingBox)),Dl.applyMatrix4(t.matrixWorld),this.union(Dl)}const r=t.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Ci),Ci.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(la),Ll.subVectors(this.max,la),Qs.subVectors(t.a,la),to.subVectors(t.b,la),eo.subVectors(t.c,la),Rr.subVectors(to,Qs),Pr.subVectors(eo,to),us.subVectors(Qs,eo);let e=[0,-Rr.z,Rr.y,0,-Pr.z,Pr.y,0,-us.z,us.y,Rr.z,0,-Rr.x,Pr.z,0,-Pr.x,us.z,0,-us.x,-Rr.y,Rr.x,0,-Pr.y,Pr.x,0,-us.y,us.x,0];return!Bu(e,Qs,to,eo,Ll)||(e=[1,0,0,0,1,0,0,0,1],!Bu(e,Qs,to,eo,Ll))?!1:(Il.crossVectors(Rr,Pr),e=[Il.x,Il.y,Il.z],Bu(e,Qs,to,eo,Ll))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Ci).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Ci).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(rr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),rr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),rr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),rr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),rr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),rr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),rr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),rr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(rr),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const rr=[new Z,new Z,new Z,new Z,new Z,new Z,new Z,new Z],Ci=new Z,Dl=new fl,Qs=new Z,to=new Z,eo=new Z,Rr=new Z,Pr=new Z,us=new Z,la=new Z,Ll=new Z,Il=new Z,fs=new Z;function Bu(i,t,e,n,r){for(let s=0,o=i.length-3;s<=o;s+=3){fs.fromArray(i,s);const a=r.x*Math.abs(fs.x)+r.y*Math.abs(fs.y)+r.z*Math.abs(fs.z),l=t.dot(fs),c=e.dot(fs),u=n.dot(fs);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const xb=new fl,ca=new Z,zu=new Z;class su{constructor(t=new Z,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):xb.setFromPoints(t).getCenter(n);let r=0;for(let s=0,o=t.length;s<o;s++)r=Math.max(r,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ca.subVectors(t,this.center);const e=ca.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),r=(n-this.radius)*.5;this.center.addScaledVector(ca,r/n),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(zu.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ca.copy(t.center).add(zu)),this.expandByPoint(ca.copy(t.center).sub(zu))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const sr=new Z,ku=new Z,Ul=new Z,Dr=new Z,Hu=new Z,Nl=new Z,Vu=new Z;class Od{constructor(t=new Z,e=new Z(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,sr)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=sr.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(sr.copy(this.origin).addScaledVector(this.direction,e),sr.distanceToSquared(t))}distanceSqToSegment(t,e,n,r){ku.copy(t).add(e).multiplyScalar(.5),Ul.copy(e).sub(t).normalize(),Dr.copy(this.origin).sub(ku);const s=t.distanceTo(e)*.5,o=-this.direction.dot(Ul),a=Dr.dot(this.direction),l=-Dr.dot(Ul),c=Dr.lengthSq(),u=Math.abs(1-o*o);let f,d,h,g;if(u>0)if(f=o*l-a,d=o*a-l,g=s*u,f>=0)if(d>=-g)if(d<=g){const _=1/u;f*=_,d*=_,h=f*(f+o*d+2*a)+d*(o*f+d+2*l)+c}else d=s,f=Math.max(0,-(o*d+a)),h=-f*f+d*(d+2*l)+c;else d=-s,f=Math.max(0,-(o*d+a)),h=-f*f+d*(d+2*l)+c;else d<=-g?(f=Math.max(0,-(-o*s+a)),d=f>0?-s:Math.min(Math.max(-s,-l),s),h=-f*f+d*(d+2*l)+c):d<=g?(f=0,d=Math.min(Math.max(-s,-l),s),h=d*(d+2*l)+c):(f=Math.max(0,-(o*s+a)),d=f>0?s:Math.min(Math.max(-s,-l),s),h=-f*f+d*(d+2*l)+c);else d=o>0?-s:s,f=Math.max(0,-(o*d+a)),h=-f*f+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(ku).addScaledVector(Ul,d),h}intersectSphere(t,e){sr.subVectors(t.center,this.origin);const n=sr.dot(this.direction),r=sr.dot(sr)-n*n,s=t.radius*t.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,r,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,r=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,r=(t.min.x-d.x)*c),u>=0?(s=(t.min.y-d.y)*u,o=(t.max.y-d.y)*u):(s=(t.max.y-d.y)*u,o=(t.min.y-d.y)*u),n>o||s>r||((s>n||isNaN(n))&&(n=s),(o<r||isNaN(r))&&(r=o),f>=0?(a=(t.min.z-d.z)*f,l=(t.max.z-d.z)*f):(a=(t.max.z-d.z)*f,l=(t.min.z-d.z)*f),n>l||a>r)||((a>n||n!==n)&&(n=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,e)}intersectsBox(t){return this.intersectBox(t,sr)!==null}intersectTriangle(t,e,n,r,s){Hu.subVectors(e,t),Nl.subVectors(n,t),Vu.crossVectors(Hu,Nl);let o=this.direction.dot(Vu),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Dr.subVectors(this.origin,t);const l=a*this.direction.dot(Nl.crossVectors(Dr,Nl));if(l<0)return null;const c=a*this.direction.dot(Hu.cross(Dr));if(c<0||l+c>o)return null;const u=-a*Dr.dot(Vu);return u<0?null:this.at(u/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Be{constructor(t,e,n,r,s,o,a,l,c,u,f,d,h,g,_,m){Be.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,o,a,l,c,u,f,d,h,g,_,m)}set(t,e,n,r,s,o,a,l,c,u,f,d,h,g,_,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=r,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=f,p[14]=d,p[3]=h,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Be().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,r=1/no.setFromMatrixColumn(t,0).length(),s=1/no.setFromMatrixColumn(t,1).length(),o=1/no.setFromMatrixColumn(t,2).length();return e[0]=n[0]*r,e[1]=n[1]*r,e[2]=n[2]*r,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,r=t.y,s=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(t.order==="XYZ"){const d=o*u,h=o*f,g=a*u,_=a*f;e[0]=l*u,e[4]=-l*f,e[8]=c,e[1]=h+g*c,e[5]=d-_*c,e[9]=-a*l,e[2]=_-d*c,e[6]=g+h*c,e[10]=o*l}else if(t.order==="YXZ"){const d=l*u,h=l*f,g=c*u,_=c*f;e[0]=d+_*a,e[4]=g*a-h,e[8]=o*c,e[1]=o*f,e[5]=o*u,e[9]=-a,e[2]=h*a-g,e[6]=_+d*a,e[10]=o*l}else if(t.order==="ZXY"){const d=l*u,h=l*f,g=c*u,_=c*f;e[0]=d-_*a,e[4]=-o*f,e[8]=g+h*a,e[1]=h+g*a,e[5]=o*u,e[9]=_-d*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const d=o*u,h=o*f,g=a*u,_=a*f;e[0]=l*u,e[4]=g*c-h,e[8]=d*c+_,e[1]=l*f,e[5]=_*c+d,e[9]=h*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const d=o*l,h=o*c,g=a*l,_=a*c;e[0]=l*u,e[4]=_-d*f,e[8]=g*f+h,e[1]=f,e[5]=o*u,e[9]=-a*u,e[2]=-c*u,e[6]=h*f+g,e[10]=d-_*f}else if(t.order==="XZY"){const d=o*l,h=o*c,g=a*l,_=a*c;e[0]=l*u,e[4]=-f,e[8]=c*u,e[1]=d*f+_,e[5]=o*u,e[9]=h*f-g,e[2]=g*f-h,e[6]=a*u,e[10]=_*f+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(yb,t,Mb)}lookAt(t,e,n){const r=this.elements;return ti.subVectors(t,e),ti.lengthSq()===0&&(ti.z=1),ti.normalize(),Lr.crossVectors(n,ti),Lr.lengthSq()===0&&(Math.abs(n.z)===1?ti.x+=1e-4:ti.z+=1e-4,ti.normalize(),Lr.crossVectors(n,ti)),Lr.normalize(),Ol.crossVectors(ti,Lr),r[0]=Lr.x,r[4]=Ol.x,r[8]=ti.x,r[1]=Lr.y,r[5]=Ol.y,r[9]=ti.y,r[2]=Lr.z,r[6]=Ol.z,r[10]=ti.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],f=n[5],d=n[9],h=n[13],g=n[2],_=n[6],m=n[10],p=n[14],b=n[3],E=n[7],v=n[11],R=n[15],C=r[0],A=r[4],L=r[8],S=r[12],y=r[1],I=r[5],B=r[9],G=r[13],Y=r[2],et=r[6],V=r[10],K=r[14],k=r[3],lt=r[7],N=r[11],_t=r[15];return s[0]=o*C+a*y+l*Y+c*k,s[4]=o*A+a*I+l*et+c*lt,s[8]=o*L+a*B+l*V+c*N,s[12]=o*S+a*G+l*K+c*_t,s[1]=u*C+f*y+d*Y+h*k,s[5]=u*A+f*I+d*et+h*lt,s[9]=u*L+f*B+d*V+h*N,s[13]=u*S+f*G+d*K+h*_t,s[2]=g*C+_*y+m*Y+p*k,s[6]=g*A+_*I+m*et+p*lt,s[10]=g*L+_*B+m*V+p*N,s[14]=g*S+_*G+m*K+p*_t,s[3]=b*C+E*y+v*Y+R*k,s[7]=b*A+E*I+v*et+R*lt,s[11]=b*L+E*B+v*V+R*N,s[15]=b*S+E*G+v*K+R*_t,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],r=t[8],s=t[12],o=t[1],a=t[5],l=t[9],c=t[13],u=t[2],f=t[6],d=t[10],h=t[14],g=t[3],_=t[7],m=t[11],p=t[15];return g*(+s*l*f-r*c*f-s*a*d+n*c*d+r*a*h-n*l*h)+_*(+e*l*h-e*c*d+s*o*d-r*o*h+r*c*u-s*l*u)+m*(+e*c*f-e*a*h-s*o*f+n*o*h+s*a*u-n*c*u)+p*(-r*a*u-e*l*f+e*a*d+r*o*f-n*o*d+n*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],f=t[9],d=t[10],h=t[11],g=t[12],_=t[13],m=t[14],p=t[15],b=f*m*c-_*d*c+_*l*h-a*m*h-f*l*p+a*d*p,E=g*d*c-u*m*c-g*l*h+o*m*h+u*l*p-o*d*p,v=u*_*c-g*f*c+g*a*h-o*_*h-u*a*p+o*f*p,R=g*f*l-u*_*l-g*a*d+o*_*d+u*a*m-o*f*m,C=e*b+n*E+r*v+s*R;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/C;return t[0]=b*A,t[1]=(_*d*s-f*m*s-_*r*h+n*m*h+f*r*p-n*d*p)*A,t[2]=(a*m*s-_*l*s+_*r*c-n*m*c-a*r*p+n*l*p)*A,t[3]=(f*l*s-a*d*s-f*r*c+n*d*c+a*r*h-n*l*h)*A,t[4]=E*A,t[5]=(u*m*s-g*d*s+g*r*h-e*m*h-u*r*p+e*d*p)*A,t[6]=(g*l*s-o*m*s-g*r*c+e*m*c+o*r*p-e*l*p)*A,t[7]=(o*d*s-u*l*s+u*r*c-e*d*c-o*r*h+e*l*h)*A,t[8]=v*A,t[9]=(g*f*s-u*_*s-g*n*h+e*_*h+u*n*p-e*f*p)*A,t[10]=(o*_*s-g*a*s+g*n*c-e*_*c-o*n*p+e*a*p)*A,t[11]=(u*a*s-o*f*s-u*n*c+e*f*c+o*n*h-e*a*h)*A,t[12]=R*A,t[13]=(u*_*r-g*f*r+g*n*d-e*_*d-u*n*m+e*f*m)*A,t[14]=(g*a*r-o*_*r-g*n*l+e*_*l+o*n*m-e*a*m)*A,t[15]=(o*f*r-u*a*r+u*n*l-e*f*l-o*n*d+e*a*d)*A,this}scale(t){const e=this.elements,n=t.x,r=t.y,s=t.z;return e[0]*=n,e[4]*=r,e[8]*=s,e[1]*=n,e[5]*=r,e[9]*=s,e[2]*=n,e[6]*=r,e[10]*=s,e[3]*=n,e[7]*=r,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,r))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),r=Math.sin(e),s=1-n,o=t.x,a=t.y,l=t.z,c=s*o,u=s*a;return this.set(c*o+n,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+n,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,r,s,o){return this.set(1,n,s,0,t,1,o,0,e,r,1,0,0,0,0,1),this}compose(t,e,n){const r=this.elements,s=e._x,o=e._y,a=e._z,l=e._w,c=s+s,u=o+o,f=a+a,d=s*c,h=s*u,g=s*f,_=o*u,m=o*f,p=a*f,b=l*c,E=l*u,v=l*f,R=n.x,C=n.y,A=n.z;return r[0]=(1-(_+p))*R,r[1]=(h+v)*R,r[2]=(g-E)*R,r[3]=0,r[4]=(h-v)*C,r[5]=(1-(d+p))*C,r[6]=(m+b)*C,r[7]=0,r[8]=(g+E)*A,r[9]=(m-b)*A,r[10]=(1-(d+_))*A,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,n){const r=this.elements;let s=no.set(r[0],r[1],r[2]).length();const o=no.set(r[4],r[5],r[6]).length(),a=no.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),t.x=r[12],t.y=r[13],t.z=r[14],Ri.copy(this);const c=1/s,u=1/o,f=1/a;return Ri.elements[0]*=c,Ri.elements[1]*=c,Ri.elements[2]*=c,Ri.elements[4]*=u,Ri.elements[5]*=u,Ri.elements[6]*=u,Ri.elements[8]*=f,Ri.elements[9]*=f,Ri.elements[10]*=f,e.setFromRotationMatrix(Ri),n.x=s,n.y=o,n.z=a,this}makePerspective(t,e,n,r,s,o,a=vr){const l=this.elements,c=2*s/(e-t),u=2*s/(n-r),f=(e+t)/(e-t),d=(n+r)/(n-r);let h,g;if(a===vr)h=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===Gc)h=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=h,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,r,s,o,a=vr){const l=this.elements,c=1/(e-t),u=1/(n-r),f=1/(o-s),d=(e+t)*c,h=(n+r)*u;let g,_;if(a===vr)g=(o+s)*f,_=-2*f;else if(a===Gc)g=s*f,_=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-h,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<16;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const no=new Z,Ri=new Be,yb=new Z(0,0,0),Mb=new Z(1,1,1),Lr=new Z,Ol=new Z,ti=new Z,um=new Be,fm=new Vs;class Qi{constructor(t=0,e=0,n=0,r=Qi.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,r=this._order){return this._x=t,this._y=e,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const r=t.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],f=r[2],d=r[6],h=r[10];switch(e){case"XYZ":this._y=Math.asin(Nn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,h),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Nn(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,h),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(Nn(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,h),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Nn(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,h),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Nn(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(a,h));break;case"XZY":this._z=Math.asin(-Nn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,h),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return um.makeRotationFromQuaternion(t),this.setFromRotationMatrix(um,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return fm.setFromEuler(this),this.setFromQuaternion(fm,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Qi.DEFAULT_ORDER="XYZ";class Y0{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Sb=0;const hm=new Z,io=new Vs,or=new Be,Fl=new Z,ua=new Z,bb=new Z,Eb=new Vs,dm=new Z(1,0,0),pm=new Z(0,1,0),mm=new Z(0,0,1),_m={type:"added"},Tb={type:"removed"},ro={type:"childadded",child:null},Gu={type:"childremoved",child:null};class pn extends Xs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Sb++}),this.uuid=ul(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=pn.DEFAULT_UP.clone();const t=new Z,e=new Qi,n=new Vs,r=new Z(1,1,1);function s(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Be},normalMatrix:{value:new Jt}}),this.matrix=new Be,this.matrixWorld=new Be,this.matrixAutoUpdate=pn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=pn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Y0,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return io.setFromAxisAngle(t,e),this.quaternion.multiply(io),this}rotateOnWorldAxis(t,e){return io.setFromAxisAngle(t,e),this.quaternion.premultiply(io),this}rotateX(t){return this.rotateOnAxis(dm,t)}rotateY(t){return this.rotateOnAxis(pm,t)}rotateZ(t){return this.rotateOnAxis(mm,t)}translateOnAxis(t,e){return hm.copy(t).applyQuaternion(this.quaternion),this.position.add(hm.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(dm,t)}translateY(t){return this.translateOnAxis(pm,t)}translateZ(t){return this.translateOnAxis(mm,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(or.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Fl.copy(t):Fl.set(t,e,n);const r=this.parent;this.updateWorldMatrix(!0,!1),ua.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?or.lookAt(ua,Fl,this.up):or.lookAt(Fl,ua,this.up),this.quaternion.setFromRotationMatrix(or),r&&(or.extractRotation(r.matrixWorld),io.setFromRotationMatrix(or),this.quaternion.premultiply(io.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(_m),ro.child=t,this.dispatchEvent(ro),ro.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Tb),Gu.child=t,this.dispatchEvent(Gu),Gu.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),or.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),or.multiply(t.parent.matrixWorld)),t.applyMatrix4(or),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(_m),ro.child=t,this.dispatchEvent(ro),ro.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,r=this.children.length;n<r;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ua,t,bb),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ua,Eb,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];s(t.shapes,f)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(t.materials,this.material[l]));r.material=a}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),u=o(t.images),f=o(t.shapes),d=o(t.skeletons),h=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),f.length>0&&(n.shapes=f),d.length>0&&(n.skeletons=d),h.length>0&&(n.animations=h),g.length>0&&(n.nodes=g)}return n.object=r,n;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const r=t.children[n];this.add(r.clone())}return this}}pn.DEFAULT_UP=new Z(0,1,0);pn.DEFAULT_MATRIX_AUTO_UPDATE=!0;pn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Pi=new Z,ar=new Z,Wu=new Z,lr=new Z,so=new Z,oo=new Z,gm=new Z,Xu=new Z,Yu=new Z,qu=new Z,$u=new ke,ju=new ke,Ku=new ke;class Li{constructor(t=new Z,e=new Z,n=new Z){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,r){r.subVectors(n,e),Pi.subVectors(t,e),r.cross(Pi);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,e,n,r,s){Pi.subVectors(r,e),ar.subVectors(n,e),Wu.subVectors(t,e);const o=Pi.dot(Pi),a=Pi.dot(ar),l=Pi.dot(Wu),c=ar.dot(ar),u=ar.dot(Wu),f=o*c-a*a;if(f===0)return s.set(0,0,0),null;const d=1/f,h=(c*l-a*u)*d,g=(o*u-a*l)*d;return s.set(1-h-g,g,h)}static containsPoint(t,e,n,r){return this.getBarycoord(t,e,n,r,lr)===null?!1:lr.x>=0&&lr.y>=0&&lr.x+lr.y<=1}static getInterpolation(t,e,n,r,s,o,a,l){return this.getBarycoord(t,e,n,r,lr)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,lr.x),l.addScaledVector(o,lr.y),l.addScaledVector(a,lr.z),l)}static getInterpolatedAttribute(t,e,n,r,s,o){return $u.setScalar(0),ju.setScalar(0),Ku.setScalar(0),$u.fromBufferAttribute(t,e),ju.fromBufferAttribute(t,n),Ku.fromBufferAttribute(t,r),o.setScalar(0),o.addScaledVector($u,s.x),o.addScaledVector(ju,s.y),o.addScaledVector(Ku,s.z),o}static isFrontFacing(t,e,n,r){return Pi.subVectors(n,e),ar.subVectors(t,e),Pi.cross(ar).dot(r)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,r){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,n,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Pi.subVectors(this.c,this.b),ar.subVectors(this.a,this.b),Pi.cross(ar).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Li.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Li.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,r,s){return Li.getInterpolation(t,this.a,this.b,this.c,e,n,r,s)}containsPoint(t){return Li.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Li.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,r=this.b,s=this.c;let o,a;so.subVectors(r,n),oo.subVectors(s,n),Xu.subVectors(t,n);const l=so.dot(Xu),c=oo.dot(Xu);if(l<=0&&c<=0)return e.copy(n);Yu.subVectors(t,r);const u=so.dot(Yu),f=oo.dot(Yu);if(u>=0&&f<=u)return e.copy(r);const d=l*f-u*c;if(d<=0&&l>=0&&u<=0)return o=l/(l-u),e.copy(n).addScaledVector(so,o);qu.subVectors(t,s);const h=so.dot(qu),g=oo.dot(qu);if(g>=0&&h<=g)return e.copy(s);const _=h*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(oo,a);const m=u*g-h*f;if(m<=0&&f-u>=0&&h-g>=0)return gm.subVectors(s,r),a=(f-u)/(f-u+(h-g)),e.copy(r).addScaledVector(gm,a);const p=1/(m+_+d);return o=_*p,a=d*p,e.copy(n).addScaledVector(so,o).addScaledVector(oo,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const q0={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ir={h:0,s:0,l:0},Bl={h:0,s:0,l:0};function Zu(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class ae{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=oi){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,fe.toWorkingColorSpace(this,e),this}setRGB(t,e,n,r=fe.workingColorSpace){return this.r=t,this.g=e,this.b=n,fe.toWorkingColorSpace(this,r),this}setHSL(t,e,n,r=fe.workingColorSpace){if(t=lb(t,1),e=Nn(e,0,1),n=Nn(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,o=2*n-s;this.r=Zu(o,s,t+1/3),this.g=Zu(o,s,t),this.b=Zu(o,s,t-1/3)}return fe.toWorkingColorSpace(this,r),this}setStyle(t,e=oi){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=oi){const n=q0[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=yr(t.r),this.g=yr(t.g),this.b=yr(t.b),this}copyLinearToSRGB(t){return this.r=Uo(t.r),this.g=Uo(t.g),this.b=Uo(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=oi){return fe.fromWorkingColorSpace(_n.copy(this),t),Math.round(Nn(_n.r*255,0,255))*65536+Math.round(Nn(_n.g*255,0,255))*256+Math.round(Nn(_n.b*255,0,255))}getHexString(t=oi){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=fe.workingColorSpace){fe.fromWorkingColorSpace(_n.copy(this),e);const n=_n.r,r=_n.g,s=_n.b,o=Math.max(n,r,s),a=Math.min(n,r,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const f=o-a;switch(c=u<=.5?f/(o+a):f/(2-o-a),o){case n:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-n)/f+2;break;case s:l=(n-r)/f+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=fe.workingColorSpace){return fe.fromWorkingColorSpace(_n.copy(this),e),t.r=_n.r,t.g=_n.g,t.b=_n.b,t}getStyle(t=oi){fe.fromWorkingColorSpace(_n.copy(this),t);const e=_n.r,n=_n.g,r=_n.b;return t!==oi?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(t,e,n){return this.getHSL(Ir),this.setHSL(Ir.h+t,Ir.s+e,Ir.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Ir),t.getHSL(Bl);const n=Uu(Ir.h,Bl.h,e),r=Uu(Ir.s,Bl.s,e),s=Uu(Ir.l,Bl.l,e);return this.setHSL(n,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,r=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*r,this.g=s[1]*e+s[4]*n+s[7]*r,this.b=s[2]*e+s[5]*n+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const _n=new ae;ae.NAMES=q0;let wb=0;class Jo extends Xs{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:wb++}),this.uuid=ul(),this.name="",this.blending=Lo,this.side=is,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=$f,this.blendDst=jf,this.blendEquation=Ms,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ae(0,0,0),this.blendAlpha=0,this.depthFunc=Wo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=tm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Zs,this.stencilZFail=Zs,this.stencilZPass=Zs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Lo&&(n.blending=this.blending),this.side!==is&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==$f&&(n.blendSrc=this.blendSrc),this.blendDst!==jf&&(n.blendDst=this.blendDst),this.blendEquation!==Ms&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Wo&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==tm&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Zs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Zs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Zs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(e){const s=r(t.textures),o=r(t.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const r=e.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class $0 extends Jo{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new ae(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qi,this.combine=Rd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Xe=new Z,zl=new Qt;class Yn{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=em,this.updateRanges=[],this.gpuType=gr,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=e.array[n+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)zl.fromBufferAttribute(this,e),zl.applyMatrix3(t),this.setXY(e,zl.x,zl.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Xe.fromBufferAttribute(this,e),Xe.applyMatrix3(t),this.setXYZ(e,Xe.x,Xe.y,Xe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Xe.fromBufferAttribute(this,e),Xe.applyMatrix4(t),this.setXYZ(e,Xe.x,Xe.y,Xe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Xe.fromBufferAttribute(this,e),Xe.applyNormalMatrix(t),this.setXYZ(e,Xe.x,Xe.y,Xe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Xe.fromBufferAttribute(this,e),Xe.transformDirection(t),this.setXYZ(e,Xe.x,Xe.y,Xe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=aa(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Vn(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=aa(e,this.array)),e}setX(t,e){return this.normalized&&(e=Vn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=aa(e,this.array)),e}setY(t,e){return this.normalized&&(e=Vn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=aa(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Vn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=aa(e,this.array)),e}setW(t,e){return this.normalized&&(e=Vn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Vn(e,this.array),n=Vn(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,r){return t*=this.itemSize,this.normalized&&(e=Vn(e,this.array),n=Vn(n,this.array),r=Vn(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this}setXYZW(t,e,n,r,s){return t*=this.itemSize,this.normalized&&(e=Vn(e,this.array),n=Vn(n,this.array),r=Vn(r,this.array),s=Vn(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==em&&(t.usage=this.usage),t}}class j0 extends Yn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class K0 extends Yn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Ki extends Yn{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Ab=0;const gi=new Be,Ju=new pn,ao=new Z,ei=new fl,fa=new fl,sn=new Z;class er extends Xs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ab++}),this.uuid=ul(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(G0(t)?K0:j0)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Jt().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return gi.makeRotationFromQuaternion(t),this.applyMatrix4(gi),this}rotateX(t){return gi.makeRotationX(t),this.applyMatrix4(gi),this}rotateY(t){return gi.makeRotationY(t),this.applyMatrix4(gi),this}rotateZ(t){return gi.makeRotationZ(t),this.applyMatrix4(gi),this}translate(t,e,n){return gi.makeTranslation(t,e,n),this.applyMatrix4(gi),this}scale(t,e,n){return gi.makeScale(t,e,n),this.applyMatrix4(gi),this}lookAt(t){return Ju.lookAt(t),Ju.updateMatrix(),this.applyMatrix4(Ju.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ao).negate(),this.translate(ao.x,ao.y,ao.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let r=0,s=t.length;r<s;r++){const o=t[r];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Ki(n,3))}else{for(let n=0,r=e.count;n<r;n++){const s=t[n];e.setXYZ(n,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new fl);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new Z(-1/0,-1/0,-1/0),new Z(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,r=e.length;n<r;n++){const s=e[n];ei.setFromBufferAttribute(s),this.morphTargetsRelative?(sn.addVectors(this.boundingBox.min,ei.min),this.boundingBox.expandByPoint(sn),sn.addVectors(this.boundingBox.max,ei.max),this.boundingBox.expandByPoint(sn)):(this.boundingBox.expandByPoint(ei.min),this.boundingBox.expandByPoint(ei.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new su);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new Z,1/0);return}if(t){const n=this.boundingSphere.center;if(ei.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){const a=e[s];fa.setFromBufferAttribute(a),this.morphTargetsRelative?(sn.addVectors(ei.min,fa.min),ei.expandByPoint(sn),sn.addVectors(ei.max,fa.max),ei.expandByPoint(sn)):(ei.expandByPoint(fa.min),ei.expandByPoint(fa.max))}ei.getCenter(n);let r=0;for(let s=0,o=t.count;s<o;s++)sn.fromBufferAttribute(t,s),r=Math.max(r,n.distanceToSquared(sn));if(e)for(let s=0,o=e.length;s<o;s++){const a=e[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)sn.fromBufferAttribute(a,c),l&&(ao.fromBufferAttribute(t,c),sn.add(ao)),r=Math.max(r,n.distanceToSquared(sn))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,r=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Yn(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let L=0;L<n.count;L++)a[L]=new Z,l[L]=new Z;const c=new Z,u=new Z,f=new Z,d=new Qt,h=new Qt,g=new Qt,_=new Z,m=new Z;function p(L,S,y){c.fromBufferAttribute(n,L),u.fromBufferAttribute(n,S),f.fromBufferAttribute(n,y),d.fromBufferAttribute(s,L),h.fromBufferAttribute(s,S),g.fromBufferAttribute(s,y),u.sub(c),f.sub(c),h.sub(d),g.sub(d);const I=1/(h.x*g.y-g.x*h.y);isFinite(I)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(f,-h.y).multiplyScalar(I),m.copy(f).multiplyScalar(h.x).addScaledVector(u,-g.x).multiplyScalar(I),a[L].add(_),a[S].add(_),a[y].add(_),l[L].add(m),l[S].add(m),l[y].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let L=0,S=b.length;L<S;++L){const y=b[L],I=y.start,B=y.count;for(let G=I,Y=I+B;G<Y;G+=3)p(t.getX(G+0),t.getX(G+1),t.getX(G+2))}const E=new Z,v=new Z,R=new Z,C=new Z;function A(L){R.fromBufferAttribute(r,L),C.copy(R);const S=a[L];E.copy(S),E.sub(R.multiplyScalar(R.dot(S))).normalize(),v.crossVectors(C,S);const I=v.dot(l[L])<0?-1:1;o.setXYZW(L,E.x,E.y,E.z,I)}for(let L=0,S=b.length;L<S;++L){const y=b[L],I=y.start,B=y.count;for(let G=I,Y=I+B;G<Y;G+=3)A(t.getX(G+0)),A(t.getX(G+1)),A(t.getX(G+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Yn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,h=n.count;d<h;d++)n.setXYZ(d,0,0,0);const r=new Z,s=new Z,o=new Z,a=new Z,l=new Z,c=new Z,u=new Z,f=new Z;if(t)for(let d=0,h=t.count;d<h;d+=3){const g=t.getX(d+0),_=t.getX(d+1),m=t.getX(d+2);r.fromBufferAttribute(e,g),s.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),a.add(u),l.add(u),c.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,h=e.count;d<h;d+=3)r.fromBufferAttribute(e,d+0),s.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)sn.fromBufferAttribute(t,e),sn.normalize(),t.setXYZ(e,sn.x,sn.y,sn.z)}toNonIndexed(){function t(a,l){const c=a.array,u=a.itemSize,f=a.normalized,d=new c.constructor(l.length*u);let h=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?h=l[_]*a.data.stride+a.offset:h=l[_]*u;for(let p=0;p<u;p++)d[g++]=c[h++]}return new Yn(d,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new er,n=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=t(l,n);e.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,f=c.length;u<f;u++){const d=c[u],h=t(d,n);l.push(h)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,d=c.length;f<d;f++){const h=c[f];u.push(h.toJSON(t.data))}u.length>0&&(r[l]=u,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const r=t.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(e))}const s=t.morphAttributes;for(const c in s){const u=[],f=s[c];for(let d=0,h=f.length;d<h;d++)u.push(f[d].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,u=o.length;c<u;c++){const f=o[c];this.addGroup(f.start,f.count,f.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const vm=new Be,hs=new Od,kl=new su,xm=new Z,Hl=new Z,Vl=new Z,Gl=new Z,Qu=new Z,Wl=new Z,ym=new Z,Xl=new Z;class Ei extends pn{constructor(t=new er,e=new $0){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(r,t);const a=this.morphTargetInfluences;if(s&&a){Wl.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],f=s[l];u!==0&&(Qu.fromBufferAttribute(f,t),o?Wl.addScaledVector(Qu,u):Wl.addScaledVector(Qu.sub(e),u))}e.add(Wl)}return e}raycast(t,e){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),kl.copy(n.boundingSphere),kl.applyMatrix4(s),hs.copy(t.ray).recast(t.near),!(kl.containsPoint(hs.origin)===!1&&(hs.intersectSphere(kl,xm)===null||hs.origin.distanceToSquared(xm)>(t.far-t.near)**2))&&(vm.copy(s).invert(),hs.copy(t.ray).applyMatrix4(vm),!(n.boundingBox!==null&&hs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,hs)))}_computeIntersections(t,e,n){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,d=s.groups,h=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=o[m.materialIndex],b=Math.max(m.start,h.start),E=Math.min(a.count,Math.min(m.start+m.count,h.start+h.count));for(let v=b,R=E;v<R;v+=3){const C=a.getX(v),A=a.getX(v+1),L=a.getX(v+2);r=Yl(this,p,t,n,c,u,f,C,A,L),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const g=Math.max(0,h.start),_=Math.min(a.count,h.start+h.count);for(let m=g,p=_;m<p;m+=3){const b=a.getX(m),E=a.getX(m+1),v=a.getX(m+2);r=Yl(this,o,t,n,c,u,f,b,E,v),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=o[m.materialIndex],b=Math.max(m.start,h.start),E=Math.min(l.count,Math.min(m.start+m.count,h.start+h.count));for(let v=b,R=E;v<R;v+=3){const C=v,A=v+1,L=v+2;r=Yl(this,p,t,n,c,u,f,C,A,L),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const g=Math.max(0,h.start),_=Math.min(l.count,h.start+h.count);for(let m=g,p=_;m<p;m+=3){const b=m,E=m+1,v=m+2;r=Yl(this,o,t,n,c,u,f,b,E,v),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}}}function Cb(i,t,e,n,r,s,o,a){let l;if(t.side===zn?l=n.intersectTriangle(o,s,r,!0,a):l=n.intersectTriangle(r,s,o,t.side===is,a),l===null)return null;Xl.copy(a),Xl.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Xl);return c<e.near||c>e.far?null:{distance:c,point:Xl.clone(),object:i}}function Yl(i,t,e,n,r,s,o,a,l,c){i.getVertexPosition(a,Hl),i.getVertexPosition(l,Vl),i.getVertexPosition(c,Gl);const u=Cb(i,t,e,n,Hl,Vl,Gl,ym);if(u){const f=new Z;Li.getBarycoord(ym,Hl,Vl,Gl,f),r&&(u.uv=Li.getInterpolatedAttribute(r,a,l,c,f,new Qt)),s&&(u.uv1=Li.getInterpolatedAttribute(s,a,l,c,f,new Qt)),o&&(u.normal=Li.getInterpolatedAttribute(o,a,l,c,f,new Z),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new Z,materialIndex:0};Li.getNormal(Hl,Vl,Gl,d.normal),u.face=d,u.barycoord=f}return u}class hl extends er{constructor(t=1,e=1,n=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],f=[];let d=0,h=0;g("z","y","x",-1,-1,n,e,t,o,s,0),g("z","y","x",1,-1,n,e,-t,o,s,1),g("x","z","y",1,1,t,n,e,r,o,2),g("x","z","y",1,-1,t,n,-e,r,o,3),g("x","y","z",1,-1,t,e,n,r,s,4),g("x","y","z",-1,-1,t,e,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new Ki(c,3)),this.setAttribute("normal",new Ki(u,3)),this.setAttribute("uv",new Ki(f,2));function g(_,m,p,b,E,v,R,C,A,L,S){const y=v/A,I=R/L,B=v/2,G=R/2,Y=C/2,et=A+1,V=L+1;let K=0,k=0;const lt=new Z;for(let N=0;N<V;N++){const _t=N*I-G;for(let Dt=0;Dt<et;Dt++){const Kt=Dt*y-B;lt[_]=Kt*b,lt[m]=_t*E,lt[p]=Y,c.push(lt.x,lt.y,lt.z),lt[_]=0,lt[m]=0,lt[p]=C>0?1:-1,u.push(lt.x,lt.y,lt.z),f.push(Dt/A),f.push(1-N/L),K+=1}}for(let N=0;N<L;N++)for(let _t=0;_t<A;_t++){const Dt=d+_t+et*N,Kt=d+_t+et*(N+1),it=d+(_t+1)+et*(N+1),ut=d+(_t+1)+et*N;l.push(Dt,Kt,ut),l.push(Kt,it,ut),k+=6}a.addGroup(h,k,S),h+=k,d+=K}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new hl(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function jo(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const r=i[e][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=r.clone():Array.isArray(r)?t[e][n]=r.slice():t[e][n]=r}}return t}function Rn(i){const t={};for(let e=0;e<i.length;e++){const n=jo(i[e]);for(const r in n)t[r]=n[r]}return t}function Rb(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Z0(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:fe.workingColorSpace}const Pb={clone:jo,merge:Rn};var Db=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Lb=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class tr extends Jo{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Db,this.fragmentShader=Lb,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=jo(t.uniforms),this.uniformsGroups=Rb(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?e.uniforms[r]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[r]={type:"m4",value:o.toArray()}:e.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class J0 extends pn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Be,this.projectionMatrix=new Be,this.projectionMatrixInverse=new Be,this.coordinateSystem=vr}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ur=new Z,Mm=new Qt,Sm=new Qt;class li extends J0{constructor(t=50,e=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Ih*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Mc*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ih*2*Math.atan(Math.tan(Mc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Ur.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ur.x,Ur.y).multiplyScalar(-t/Ur.z),Ur.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ur.x,Ur.y).multiplyScalar(-t/Ur.z)}getViewSize(t,e){return this.getViewBounds(t,Mm,Sm),e.subVectors(Sm,Mm)}setViewOffset(t,e,n,r,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Mc*.5*this.fov)/this.zoom,n=2*e,r=this.aspect*n,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,e-=o.offsetY*n/c,r*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const lo=-90,co=1;class Ib extends pn{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new li(lo,co,t,e);r.layers=this.layers,this.add(r);const s=new li(lo,co,t,e);s.layers=this.layers,this.add(s);const o=new li(lo,co,t,e);o.layers=this.layers,this.add(o);const a=new li(lo,co,t,e);a.layers=this.layers,this.add(a);const l=new li(lo,co,t,e);l.layers=this.layers,this.add(l);const c=new li(lo,co,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,r,s,o,a,l]=e;for(const c of e)this.remove(c);if(t===vr)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Gc)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,f=t.getRenderTarget(),d=t.getActiveCubeFace(),h=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,r),t.render(e,s),t.setRenderTarget(n,1,r),t.render(e,o),t.setRenderTarget(n,2,r),t.render(e,a),t.setRenderTarget(n,3,r),t.render(e,l),t.setRenderTarget(n,4,r),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,r),t.render(e,u),t.setRenderTarget(f,d,h),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Q0 extends kn{constructor(t,e,n,r,s,o,a,l,c,u){t=t!==void 0?t:[],e=e!==void 0?e:Xo,super(t,e,n,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Ub extends Hs{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},r=[n,n,n,n,n,n];this.texture=new Q0(r,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:qi}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new hl(5,5,5),s=new tr({name:"CubemapFromEquirect",uniforms:jo(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:zn,blending:Kr});s.uniforms.tEquirect.value=e;const o=new Ei(r,s),a=e.minFilter;return e.minFilter===ws&&(e.minFilter=qi),new Ib(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,r){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,r);t.setRenderTarget(s)}}const tf=new Z,Nb=new Z,Ob=new Jt;class Br{constructor(t=new Z(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,r){return this.normal.set(t,e,n),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const r=tf.subVectors(n,e).cross(Nb.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(tf),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Ob.getNormalMatrix(t),r=this.coplanarPoint(tf).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ds=new su,ql=new Z;class Fd{constructor(t=new Br,e=new Br,n=new Br,r=new Br,s=new Br,o=new Br){this.planes=[t,e,n,r,s,o]}set(t,e,n,r,s,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=vr){const n=this.planes,r=t.elements,s=r[0],o=r[1],a=r[2],l=r[3],c=r[4],u=r[5],f=r[6],d=r[7],h=r[8],g=r[9],_=r[10],m=r[11],p=r[12],b=r[13],E=r[14],v=r[15];if(n[0].setComponents(l-s,d-c,m-h,v-p).normalize(),n[1].setComponents(l+s,d+c,m+h,v+p).normalize(),n[2].setComponents(l+o,d+u,m+g,v+b).normalize(),n[3].setComponents(l-o,d-u,m-g,v-b).normalize(),n[4].setComponents(l-a,d-f,m-_,v-E).normalize(),e===vr)n[5].setComponents(l+a,d+f,m+_,v+E).normalize();else if(e===Gc)n[5].setComponents(a,f,_,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ds.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ds.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ds)}intersectsSprite(t){return ds.center.set(0,0,0),ds.radius=.7071067811865476,ds.applyMatrix4(t.matrixWorld),this.intersectsSphere(ds)}intersectsSphere(t){const e=this.planes,n=t.center,r=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const r=e[n];if(ql.x=r.normal.x>0?t.max.x:t.min.x,ql.y=r.normal.y>0?t.max.y:t.min.y,ql.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(ql)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function tv(){let i=null,t=!1,e=null,n=null;function r(s,o){e(s,o),n=i.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(r),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){i=s}}}function Fb(i){const t=new WeakMap;function e(a,l){const c=a.array,u=a.usage,f=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,u),a.onUploadCallback();let h;if(c instanceof Float32Array)h=i.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?h=i.HALF_FLOAT:h=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)h=i.SHORT;else if(c instanceof Uint32Array)h=i.UNSIGNED_INT;else if(c instanceof Int32Array)h=i.INT;else if(c instanceof Int8Array)h=i.BYTE;else if(c instanceof Uint8Array)h=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)h=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:h,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:f}}function n(a,l,c){const u=l.array,f=l.updateRanges;if(i.bindBuffer(c,a),f.length===0)i.bufferSubData(c,0,u);else{f.sort((h,g)=>h.start-g.start);let d=0;for(let h=1;h<f.length;h++){const g=f[d],_=f[h];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++d,f[d]=_)}f.length=d+1;for(let h=0,g=f.length;h<g;h++){const _=f[h];i.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}class ou extends er{constructor(t=1,e=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:r};const s=t/2,o=e/2,a=Math.floor(n),l=Math.floor(r),c=a+1,u=l+1,f=t/a,d=e/l,h=[],g=[],_=[],m=[];for(let p=0;p<u;p++){const b=p*d-o;for(let E=0;E<c;E++){const v=E*f-s;g.push(v,-b,0),_.push(0,0,1),m.push(E/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let b=0;b<a;b++){const E=b+c*p,v=b+c*(p+1),R=b+1+c*(p+1),C=b+1+c*p;h.push(E,v,C),h.push(v,R,C)}this.setIndex(h),this.setAttribute("position",new Ki(g,3)),this.setAttribute("normal",new Ki(_,3)),this.setAttribute("uv",new Ki(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ou(t.width,t.height,t.widthSegments,t.heightSegments)}}var Bb=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,zb=`#ifdef USE_ALPHAHASH
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
#endif`,kb=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Hb=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Vb=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Gb=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Wb=`#ifdef USE_AOMAP
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
#endif`,Xb=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Yb=`#ifdef USE_BATCHING
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
#endif`,qb=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,$b=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,jb=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Kb=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Zb=`#ifdef USE_IRIDESCENCE
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
#endif`,Jb=`#ifdef USE_BUMPMAP
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
#endif`,Qb=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,tE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,eE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,nE=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,iE=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,rE=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,sE=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,oE=`#if defined( USE_COLOR_ALPHA )
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
#endif`,aE=`#define PI 3.141592653589793
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
} // validated`,lE=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,cE=`vec3 transformedNormal = objectNormal;
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
#endif`,uE=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,fE=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,hE=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,dE=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,pE="gl_FragColor = linearToOutputTexel( gl_FragColor );",mE=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,_E=`#ifdef USE_ENVMAP
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
#endif`,gE=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,vE=`#ifdef USE_ENVMAP
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
#endif`,xE=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,yE=`#ifdef USE_ENVMAP
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
#endif`,ME=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,SE=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,bE=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,EE=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,TE=`#ifdef USE_GRADIENTMAP
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
}`,wE=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,AE=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,CE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,RE=`uniform bool receiveShadow;
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
#endif`,PE=`#ifdef USE_ENVMAP
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
#endif`,DE=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,LE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,IE=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,UE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,NE=`PhysicalMaterial material;
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
#endif`,OE=`struct PhysicalMaterial {
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
}`,FE=`
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
#endif`,BE=`#if defined( RE_IndirectDiffuse )
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
#endif`,zE=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,kE=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,HE=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,VE=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,GE=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,WE=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,XE=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,YE=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,qE=`#if defined( USE_POINTS_UV )
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
#endif`,$E=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,jE=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,KE=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ZE=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,JE=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,QE=`#ifdef USE_MORPHTARGETS
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
#endif`,tT=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,eT=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,nT=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,iT=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,rT=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sT=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,oT=`#ifdef USE_NORMALMAP
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
#endif`,aT=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,lT=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,cT=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,uT=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,fT=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,hT=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,dT=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,pT=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,mT=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,_T=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,gT=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,vT=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,xT=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,yT=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,MT=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,ST=`float getShadowMask() {
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
}`,bT=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ET=`#ifdef USE_SKINNING
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
#endif`,TT=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,wT=`#ifdef USE_SKINNING
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
#endif`,AT=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,CT=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,RT=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,PT=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,DT=`#ifdef USE_TRANSMISSION
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
#endif`,LT=`#ifdef USE_TRANSMISSION
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
#endif`,IT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,UT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,NT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,OT=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const FT=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,BT=`uniform sampler2D t2D;
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
}`,zT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,kT=`#ifdef ENVMAP_TYPE_CUBE
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
}`,HT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,VT=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,GT=`#include <common>
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
}`,WT=`#if DEPTH_PACKING == 3200
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
}`,XT=`#define DISTANCE
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
}`,YT=`#define DISTANCE
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
}`,qT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,$T=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jT=`uniform float scale;
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
}`,KT=`uniform vec3 diffuse;
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
}`,ZT=`#include <common>
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
}`,JT=`uniform vec3 diffuse;
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
}`,QT=`#define LAMBERT
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
}`,t1=`#define LAMBERT
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
}`,e1=`#define MATCAP
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
}`,n1=`#define MATCAP
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
}`,i1=`#define NORMAL
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
}`,r1=`#define NORMAL
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
}`,s1=`#define PHONG
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
}`,o1=`#define PHONG
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
}`,a1=`#define STANDARD
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
}`,l1=`#define STANDARD
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
}`,c1=`#define TOON
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
}`,u1=`#define TOON
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
}`,f1=`uniform float size;
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
}`,h1=`uniform vec3 diffuse;
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
}`,d1=`#include <common>
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
}`,p1=`uniform vec3 color;
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
}`,m1=`uniform float rotation;
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
}`,_1=`uniform vec3 diffuse;
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
}`,ee={alphahash_fragment:Bb,alphahash_pars_fragment:zb,alphamap_fragment:kb,alphamap_pars_fragment:Hb,alphatest_fragment:Vb,alphatest_pars_fragment:Gb,aomap_fragment:Wb,aomap_pars_fragment:Xb,batching_pars_vertex:Yb,batching_vertex:qb,begin_vertex:$b,beginnormal_vertex:jb,bsdfs:Kb,iridescence_fragment:Zb,bumpmap_pars_fragment:Jb,clipping_planes_fragment:Qb,clipping_planes_pars_fragment:tE,clipping_planes_pars_vertex:eE,clipping_planes_vertex:nE,color_fragment:iE,color_pars_fragment:rE,color_pars_vertex:sE,color_vertex:oE,common:aE,cube_uv_reflection_fragment:lE,defaultnormal_vertex:cE,displacementmap_pars_vertex:uE,displacementmap_vertex:fE,emissivemap_fragment:hE,emissivemap_pars_fragment:dE,colorspace_fragment:pE,colorspace_pars_fragment:mE,envmap_fragment:_E,envmap_common_pars_fragment:gE,envmap_pars_fragment:vE,envmap_pars_vertex:xE,envmap_physical_pars_fragment:PE,envmap_vertex:yE,fog_vertex:ME,fog_pars_vertex:SE,fog_fragment:bE,fog_pars_fragment:EE,gradientmap_pars_fragment:TE,lightmap_pars_fragment:wE,lights_lambert_fragment:AE,lights_lambert_pars_fragment:CE,lights_pars_begin:RE,lights_toon_fragment:DE,lights_toon_pars_fragment:LE,lights_phong_fragment:IE,lights_phong_pars_fragment:UE,lights_physical_fragment:NE,lights_physical_pars_fragment:OE,lights_fragment_begin:FE,lights_fragment_maps:BE,lights_fragment_end:zE,logdepthbuf_fragment:kE,logdepthbuf_pars_fragment:HE,logdepthbuf_pars_vertex:VE,logdepthbuf_vertex:GE,map_fragment:WE,map_pars_fragment:XE,map_particle_fragment:YE,map_particle_pars_fragment:qE,metalnessmap_fragment:$E,metalnessmap_pars_fragment:jE,morphinstance_vertex:KE,morphcolor_vertex:ZE,morphnormal_vertex:JE,morphtarget_pars_vertex:QE,morphtarget_vertex:tT,normal_fragment_begin:eT,normal_fragment_maps:nT,normal_pars_fragment:iT,normal_pars_vertex:rT,normal_vertex:sT,normalmap_pars_fragment:oT,clearcoat_normal_fragment_begin:aT,clearcoat_normal_fragment_maps:lT,clearcoat_pars_fragment:cT,iridescence_pars_fragment:uT,opaque_fragment:fT,packing:hT,premultiplied_alpha_fragment:dT,project_vertex:pT,dithering_fragment:mT,dithering_pars_fragment:_T,roughnessmap_fragment:gT,roughnessmap_pars_fragment:vT,shadowmap_pars_fragment:xT,shadowmap_pars_vertex:yT,shadowmap_vertex:MT,shadowmask_pars_fragment:ST,skinbase_vertex:bT,skinning_pars_vertex:ET,skinning_vertex:TT,skinnormal_vertex:wT,specularmap_fragment:AT,specularmap_pars_fragment:CT,tonemapping_fragment:RT,tonemapping_pars_fragment:PT,transmission_fragment:DT,transmission_pars_fragment:LT,uv_pars_fragment:IT,uv_pars_vertex:UT,uv_vertex:NT,worldpos_vertex:OT,background_vert:FT,background_frag:BT,backgroundCube_vert:zT,backgroundCube_frag:kT,cube_vert:HT,cube_frag:VT,depth_vert:GT,depth_frag:WT,distanceRGBA_vert:XT,distanceRGBA_frag:YT,equirect_vert:qT,equirect_frag:$T,linedashed_vert:jT,linedashed_frag:KT,meshbasic_vert:ZT,meshbasic_frag:JT,meshlambert_vert:QT,meshlambert_frag:t1,meshmatcap_vert:e1,meshmatcap_frag:n1,meshnormal_vert:i1,meshnormal_frag:r1,meshphong_vert:s1,meshphong_frag:o1,meshphysical_vert:a1,meshphysical_frag:l1,meshtoon_vert:c1,meshtoon_frag:u1,points_vert:f1,points_frag:h1,shadow_vert:d1,shadow_frag:p1,sprite_vert:m1,sprite_frag:_1},wt={common:{diffuse:{value:new ae(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Jt},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Jt}},envmap:{envMap:{value:null},envMapRotation:{value:new Jt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Jt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Jt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Jt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Jt},normalScale:{value:new Qt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Jt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Jt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Jt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Jt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ae(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ae(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0},uvTransform:{value:new Jt}},sprite:{diffuse:{value:new ae(16777215)},opacity:{value:1},center:{value:new Qt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Jt},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0}}},Vi={basic:{uniforms:Rn([wt.common,wt.specularmap,wt.envmap,wt.aomap,wt.lightmap,wt.fog]),vertexShader:ee.meshbasic_vert,fragmentShader:ee.meshbasic_frag},lambert:{uniforms:Rn([wt.common,wt.specularmap,wt.envmap,wt.aomap,wt.lightmap,wt.emissivemap,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.fog,wt.lights,{emissive:{value:new ae(0)}}]),vertexShader:ee.meshlambert_vert,fragmentShader:ee.meshlambert_frag},phong:{uniforms:Rn([wt.common,wt.specularmap,wt.envmap,wt.aomap,wt.lightmap,wt.emissivemap,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.fog,wt.lights,{emissive:{value:new ae(0)},specular:{value:new ae(1118481)},shininess:{value:30}}]),vertexShader:ee.meshphong_vert,fragmentShader:ee.meshphong_frag},standard:{uniforms:Rn([wt.common,wt.envmap,wt.aomap,wt.lightmap,wt.emissivemap,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.roughnessmap,wt.metalnessmap,wt.fog,wt.lights,{emissive:{value:new ae(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ee.meshphysical_vert,fragmentShader:ee.meshphysical_frag},toon:{uniforms:Rn([wt.common,wt.aomap,wt.lightmap,wt.emissivemap,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.gradientmap,wt.fog,wt.lights,{emissive:{value:new ae(0)}}]),vertexShader:ee.meshtoon_vert,fragmentShader:ee.meshtoon_frag},matcap:{uniforms:Rn([wt.common,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.fog,{matcap:{value:null}}]),vertexShader:ee.meshmatcap_vert,fragmentShader:ee.meshmatcap_frag},points:{uniforms:Rn([wt.points,wt.fog]),vertexShader:ee.points_vert,fragmentShader:ee.points_frag},dashed:{uniforms:Rn([wt.common,wt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ee.linedashed_vert,fragmentShader:ee.linedashed_frag},depth:{uniforms:Rn([wt.common,wt.displacementmap]),vertexShader:ee.depth_vert,fragmentShader:ee.depth_frag},normal:{uniforms:Rn([wt.common,wt.bumpmap,wt.normalmap,wt.displacementmap,{opacity:{value:1}}]),vertexShader:ee.meshnormal_vert,fragmentShader:ee.meshnormal_frag},sprite:{uniforms:Rn([wt.sprite,wt.fog]),vertexShader:ee.sprite_vert,fragmentShader:ee.sprite_frag},background:{uniforms:{uvTransform:{value:new Jt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ee.background_vert,fragmentShader:ee.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Jt}},vertexShader:ee.backgroundCube_vert,fragmentShader:ee.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ee.cube_vert,fragmentShader:ee.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ee.equirect_vert,fragmentShader:ee.equirect_frag},distanceRGBA:{uniforms:Rn([wt.common,wt.displacementmap,{referencePosition:{value:new Z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ee.distanceRGBA_vert,fragmentShader:ee.distanceRGBA_frag},shadow:{uniforms:Rn([wt.lights,wt.fog,{color:{value:new ae(0)},opacity:{value:1}}]),vertexShader:ee.shadow_vert,fragmentShader:ee.shadow_frag}};Vi.physical={uniforms:Rn([Vi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Jt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Jt},clearcoatNormalScale:{value:new Qt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Jt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Jt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Jt},sheen:{value:0},sheenColor:{value:new ae(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Jt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Jt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Jt},transmissionSamplerSize:{value:new Qt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Jt},attenuationDistance:{value:0},attenuationColor:{value:new ae(0)},specularColor:{value:new ae(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Jt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Jt},anisotropyVector:{value:new Qt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Jt}}]),vertexShader:ee.meshphysical_vert,fragmentShader:ee.meshphysical_frag};const $l={r:0,b:0,g:0},ps=new Qi,g1=new Be;function v1(i,t,e,n,r,s,o){const a=new ae(0);let l=s===!0?0:1,c,u,f=null,d=0,h=null;function g(b){let E=b.isScene===!0?b.background:null;return E&&E.isTexture&&(E=(b.backgroundBlurriness>0?e:t).get(E)),E}function _(b){let E=!1;const v=g(b);v===null?p(a,l):v&&v.isColor&&(p(v,1),E=!0);const R=i.xr.getEnvironmentBlendMode();R==="additive"?n.buffers.color.setClear(0,0,0,1,o):R==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||E)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(b,E){const v=g(E);v&&(v.isCubeTexture||v.mapping===iu)?(u===void 0&&(u=new Ei(new hl(1,1,1),new tr({name:"BackgroundCubeMaterial",uniforms:jo(Vi.backgroundCube.uniforms),vertexShader:Vi.backgroundCube.vertexShader,fragmentShader:Vi.backgroundCube.fragmentShader,side:zn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(R,C,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),ps.copy(E.backgroundRotation),ps.x*=-1,ps.y*=-1,ps.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(ps.y*=-1,ps.z*=-1),u.material.uniforms.envMap.value=v,u.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(g1.makeRotationFromEuler(ps)),u.material.toneMapped=fe.getTransfer(v.colorSpace)!==Me,(f!==v||d!==v.version||h!==i.toneMapping)&&(u.material.needsUpdate=!0,f=v,d=v.version,h=i.toneMapping),u.layers.enableAll(),b.unshift(u,u.geometry,u.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new Ei(new ou(2,2),new tr({name:"BackgroundMaterial",uniforms:jo(Vi.background.uniforms),vertexShader:Vi.background.vertexShader,fragmentShader:Vi.background.fragmentShader,side:is,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.toneMapped=fe.getTransfer(v.colorSpace)!==Me,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(f!==v||d!==v.version||h!==i.toneMapping)&&(c.material.needsUpdate=!0,f=v,d=v.version,h=i.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function p(b,E){b.getRGB($l,Z0(i)),n.buffers.color.setClear($l.r,$l.g,$l.b,E,o)}return{getClearColor:function(){return a},setClearColor:function(b,E=1){a.set(b),l=E,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(b){l=b,p(a,l)},render:_,addToRenderList:m}}function x1(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=d(null);let s=r,o=!1;function a(y,I,B,G,Y){let et=!1;const V=f(G,B,I);s!==V&&(s=V,c(s.object)),et=h(y,G,B,Y),et&&g(y,G,B,Y),Y!==null&&t.update(Y,i.ELEMENT_ARRAY_BUFFER),(et||o)&&(o=!1,v(y,I,B,G),Y!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(Y).buffer))}function l(){return i.createVertexArray()}function c(y){return i.bindVertexArray(y)}function u(y){return i.deleteVertexArray(y)}function f(y,I,B){const G=B.wireframe===!0;let Y=n[y.id];Y===void 0&&(Y={},n[y.id]=Y);let et=Y[I.id];et===void 0&&(et={},Y[I.id]=et);let V=et[G];return V===void 0&&(V=d(l()),et[G]=V),V}function d(y){const I=[],B=[],G=[];for(let Y=0;Y<e;Y++)I[Y]=0,B[Y]=0,G[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:B,attributeDivisors:G,object:y,attributes:{},index:null}}function h(y,I,B,G){const Y=s.attributes,et=I.attributes;let V=0;const K=B.getAttributes();for(const k in K)if(K[k].location>=0){const N=Y[k];let _t=et[k];if(_t===void 0&&(k==="instanceMatrix"&&y.instanceMatrix&&(_t=y.instanceMatrix),k==="instanceColor"&&y.instanceColor&&(_t=y.instanceColor)),N===void 0||N.attribute!==_t||_t&&N.data!==_t.data)return!0;V++}return s.attributesNum!==V||s.index!==G}function g(y,I,B,G){const Y={},et=I.attributes;let V=0;const K=B.getAttributes();for(const k in K)if(K[k].location>=0){let N=et[k];N===void 0&&(k==="instanceMatrix"&&y.instanceMatrix&&(N=y.instanceMatrix),k==="instanceColor"&&y.instanceColor&&(N=y.instanceColor));const _t={};_t.attribute=N,N&&N.data&&(_t.data=N.data),Y[k]=_t,V++}s.attributes=Y,s.attributesNum=V,s.index=G}function _(){const y=s.newAttributes;for(let I=0,B=y.length;I<B;I++)y[I]=0}function m(y){p(y,0)}function p(y,I){const B=s.newAttributes,G=s.enabledAttributes,Y=s.attributeDivisors;B[y]=1,G[y]===0&&(i.enableVertexAttribArray(y),G[y]=1),Y[y]!==I&&(i.vertexAttribDivisor(y,I),Y[y]=I)}function b(){const y=s.newAttributes,I=s.enabledAttributes;for(let B=0,G=I.length;B<G;B++)I[B]!==y[B]&&(i.disableVertexAttribArray(B),I[B]=0)}function E(y,I,B,G,Y,et,V){V===!0?i.vertexAttribIPointer(y,I,B,Y,et):i.vertexAttribPointer(y,I,B,G,Y,et)}function v(y,I,B,G){_();const Y=G.attributes,et=B.getAttributes(),V=I.defaultAttributeValues;for(const K in et){const k=et[K];if(k.location>=0){let lt=Y[K];if(lt===void 0&&(K==="instanceMatrix"&&y.instanceMatrix&&(lt=y.instanceMatrix),K==="instanceColor"&&y.instanceColor&&(lt=y.instanceColor)),lt!==void 0){const N=lt.normalized,_t=lt.itemSize,Dt=t.get(lt);if(Dt===void 0)continue;const Kt=Dt.buffer,it=Dt.type,ut=Dt.bytesPerElement,Mt=it===i.INT||it===i.UNSIGNED_INT||lt.gpuType===Pd;if(lt.isInterleavedBufferAttribute){const ht=lt.data,Rt=ht.stride,It=lt.offset;if(ht.isInstancedInterleavedBuffer){for(let kt=0;kt<k.locationSize;kt++)p(k.location+kt,ht.meshPerAttribute);y.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=ht.meshPerAttribute*ht.count)}else for(let kt=0;kt<k.locationSize;kt++)m(k.location+kt);i.bindBuffer(i.ARRAY_BUFFER,Kt);for(let kt=0;kt<k.locationSize;kt++)E(k.location+kt,_t/k.locationSize,it,N,Rt*ut,(It+_t/k.locationSize*kt)*ut,Mt)}else{if(lt.isInstancedBufferAttribute){for(let ht=0;ht<k.locationSize;ht++)p(k.location+ht,lt.meshPerAttribute);y.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=lt.meshPerAttribute*lt.count)}else for(let ht=0;ht<k.locationSize;ht++)m(k.location+ht);i.bindBuffer(i.ARRAY_BUFFER,Kt);for(let ht=0;ht<k.locationSize;ht++)E(k.location+ht,_t/k.locationSize,it,N,_t*ut,_t/k.locationSize*ht*ut,Mt)}}else if(V!==void 0){const N=V[K];if(N!==void 0)switch(N.length){case 2:i.vertexAttrib2fv(k.location,N);break;case 3:i.vertexAttrib3fv(k.location,N);break;case 4:i.vertexAttrib4fv(k.location,N);break;default:i.vertexAttrib1fv(k.location,N)}}}}b()}function R(){L();for(const y in n){const I=n[y];for(const B in I){const G=I[B];for(const Y in G)u(G[Y].object),delete G[Y];delete I[B]}delete n[y]}}function C(y){if(n[y.id]===void 0)return;const I=n[y.id];for(const B in I){const G=I[B];for(const Y in G)u(G[Y].object),delete G[Y];delete I[B]}delete n[y.id]}function A(y){for(const I in n){const B=n[I];if(B[y.id]===void 0)continue;const G=B[y.id];for(const Y in G)u(G[Y].object),delete G[Y];delete B[y.id]}}function L(){S(),o=!0,s!==r&&(s=r,c(s.object))}function S(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:L,resetDefaultState:S,dispose:R,releaseStatesOfGeometry:C,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:m,disableUnusedAttributes:b}}function y1(i,t,e){let n;function r(c){n=c}function s(c,u){i.drawArrays(n,c,u),e.update(u,n,1)}function o(c,u,f){f!==0&&(i.drawArraysInstanced(n,c,u,f),e.update(u,n,f))}function a(c,u,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,f);let h=0;for(let g=0;g<f;g++)h+=u[g];e.update(h,n,1)}function l(c,u,f,d){if(f===0)return;const h=t.get("WEBGL_multi_draw");if(h===null)for(let g=0;g<c.length;g++)o(c[g],u[g],d[g]);else{h.multiDrawArraysInstancedWEBGL(n,c,0,u,0,d,0,f);let g=0;for(let _=0;_<f;_++)g+=u[_]*d[_];e.update(g,n,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function M1(i,t,e,n){let r;function s(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");r=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(A){return!(A!==Ii&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const L=A===cl&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==Tr&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==gr&&!L)}function l(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const f=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),h=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),R=g>0,C=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:f,reverseDepthBuffer:d,maxTextures:h,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:b,maxVaryings:E,maxFragmentUniforms:v,vertexTextures:R,maxSamples:C}}function S1(i){const t=this;let e=null,n=0,r=!1,s=!1;const o=new Br,a=new Jt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){const h=f.length!==0||d||n!==0||r;return r=d,n=f.length,h},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,d){e=u(f,d,0)},this.setState=function(f,d,h){const g=f.clippingPlanes,_=f.clipIntersection,m=f.clipShadows,p=i.get(f);if(!r||g===null||g.length===0||s&&!m)s?u(null):c();else{const b=s?0:n,E=b*4;let v=p.clippingState||null;l.value=v,v=u(g,d,E,h);for(let R=0;R!==E;++R)v[R]=e[R];p.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(f,d,h,g){const _=f!==null?f.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const p=h+_*4,b=d.matrixWorldInverse;a.getNormalMatrix(b),(m===null||m.length<p)&&(m=new Float32Array(p));for(let E=0,v=h;E!==_;++E,v+=4)o.copy(f[E]).applyMatrix4(b,a),o.normal.toArray(m,v),m[v+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function b1(i){let t=new WeakMap;function e(o,a){return a===ih?o.mapping=Xo:a===rh&&(o.mapping=Yo),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===ih||a===rh)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Ub(l.height);return c.fromEquirectangularTexture(i,o),t.set(o,c),o.addEventListener("dispose",r),e(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}class ev extends J0{constructor(t=-1,e=1,n=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-t,o=n+t,a=r+e,l=r-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const xo=4,bm=[.125,.215,.35,.446,.526,.582],Ss=20,ef=new ev,Em=new ae;let nf=null,rf=0,sf=0,of=!1;const ys=(1+Math.sqrt(5))/2,uo=1/ys,Tm=[new Z(-ys,uo,0),new Z(ys,uo,0),new Z(-uo,0,ys),new Z(uo,0,ys),new Z(0,ys,-uo),new Z(0,ys,uo),new Z(-1,1,-1),new Z(1,1,-1),new Z(-1,1,1),new Z(1,1,1)];class wm{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,r=100){nf=this._renderer.getRenderTarget(),rf=this._renderer.getActiveCubeFace(),sf=this._renderer.getActiveMipmapLevel(),of=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,n,r,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Rm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Cm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(nf,rf,sf),this._renderer.xr.enabled=of,t.scissorTest=!1,jl(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Xo||t.mapping===Yo?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),nf=this._renderer.getRenderTarget(),rf=this._renderer.getActiveCubeFace(),sf=this._renderer.getActiveMipmapLevel(),of=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:qi,minFilter:qi,generateMipmaps:!1,type:cl,format:Ii,colorSpace:Zo,depthBuffer:!1},r=Am(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Am(t,e,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=E1(s)),this._blurMaterial=T1(s,t,e)}return r}_compileMaterial(t){const e=new Ei(this._lodPlanes[0],t);this._renderer.compile(e,ef)}_sceneToCubeUV(t,e,n,r){const a=new li(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,d=u.toneMapping;u.getClearColor(Em),u.toneMapping=Zr,u.autoClear=!1;const h=new $0({name:"PMREM.Background",side:zn,depthWrite:!1,depthTest:!1}),g=new Ei(new hl,h);let _=!1;const m=t.background;m?m.isColor&&(h.color.copy(m),t.background=null,_=!0):(h.color.copy(Em),_=!0);for(let p=0;p<6;p++){const b=p%3;b===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):b===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const E=this._cubeSize;jl(r,b*E,p>2?E:0,E,E),u.setRenderTarget(r),_&&u.render(g,a),u.render(t,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=d,u.autoClear=f,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,r=t.mapping===Xo||t.mapping===Yo;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Rm()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Cm());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new Ei(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;const l=this._cubeSize;jl(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,ef)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Tm[(r-s-1)%Tm.length];this._blur(t,s-1,s,o,a)}e.autoClear=n}_blur(t,e,n,r,s){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,r,"latitudinal",s),this._halfBlur(o,t,n,n,r,"longitudinal",s)}_halfBlur(t,e,n,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,f=new Ei(this._lodPlanes[r],c),d=c.uniforms,h=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*h):2*Math.PI/(2*Ss-1),_=s/g,m=isFinite(s)?1+Math.floor(u*_):Ss;m>Ss&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ss}`);const p=[];let b=0;for(let A=0;A<Ss;++A){const L=A/_,S=Math.exp(-L*L/2);p.push(S),A===0?b+=S:A<m&&(b+=2*S)}for(let A=0;A<p.length;A++)p[A]=p[A]/b;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:E}=this;d.dTheta.value=g,d.mipInt.value=E-n;const v=this._sizeLods[r],R=3*v*(r>E-xo?r-E+xo:0),C=4*(this._cubeSize-v);jl(e,R,C,3*v,2*v),l.setRenderTarget(e),l.render(f,ef)}}function E1(i){const t=[],e=[],n=[];let r=i;const s=i-xo+1+bm.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);e.push(a);let l=1/a;o>i-xo?l=bm[o-i+xo-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,f=1+c,d=[u,u,f,u,f,f,u,u,f,f,u,f],h=6,g=6,_=3,m=2,p=1,b=new Float32Array(_*g*h),E=new Float32Array(m*g*h),v=new Float32Array(p*g*h);for(let C=0;C<h;C++){const A=C%3*2/3-1,L=C>2?0:-1,S=[A,L,0,A+2/3,L,0,A+2/3,L+1,0,A,L,0,A+2/3,L+1,0,A,L+1,0];b.set(S,_*g*C),E.set(d,m*g*C);const y=[C,C,C,C,C,C];v.set(y,p*g*C)}const R=new er;R.setAttribute("position",new Yn(b,_)),R.setAttribute("uv",new Yn(E,m)),R.setAttribute("faceIndex",new Yn(v,p)),t.push(R),r>xo&&r--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Am(i,t,e){const n=new Hs(i,t,e);return n.texture.mapping=iu,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function jl(i,t,e,n,r){i.viewport.set(t,e,n,r),i.scissor.set(t,e,n,r)}function T1(i,t,e){const n=new Float32Array(Ss),r=new Z(0,1,0);return new tr({name:"SphericalGaussianBlur",defines:{n:Ss,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Bd(),fragmentShader:`

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
		`,blending:Kr,depthTest:!1,depthWrite:!1})}function Cm(){return new tr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Bd(),fragmentShader:`

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
		`,blending:Kr,depthTest:!1,depthWrite:!1})}function Rm(){return new tr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Bd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Kr,depthTest:!1,depthWrite:!1})}function Bd(){return`

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
	`}function w1(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===ih||l===rh,u=l===Xo||l===Yo;if(c||u){let f=t.get(a);const d=f!==void 0?f.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new wm(i)),f=c?e.fromEquirectangular(a,f):e.fromCubemap(a,f),f.texture.pmremVersion=a.pmremVersion,t.set(a,f),f.texture;if(f!==void 0)return f.texture;{const h=a.image;return c&&h&&h.height>0||u&&h&&r(h)?(e===null&&(e=new wm(i)),f=c?e.fromEquirectangular(a):e.fromCubemap(a),f.texture.pmremVersion=a.pmremVersion,t.set(a,f),a.addEventListener("dispose",s),f.texture):null}}}return a}function r(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function A1(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return t[n]=r,r}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const r=e(n);return r===null&&ya("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function C1(i,t,e,n){const r={},s=new WeakMap;function o(f){const d=f.target;d.index!==null&&t.remove(d.index);for(const g in d.attributes)t.remove(d.attributes[g]);for(const g in d.morphAttributes){const _=d.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)t.remove(_[m])}d.removeEventListener("dispose",o),delete r[d.id];const h=s.get(d);h&&(t.remove(h),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(f,d){return r[d.id]===!0||(d.addEventListener("dispose",o),r[d.id]=!0,e.memory.geometries++),d}function l(f){const d=f.attributes;for(const g in d)t.update(d[g],i.ARRAY_BUFFER);const h=f.morphAttributes;for(const g in h){const _=h[g];for(let m=0,p=_.length;m<p;m++)t.update(_[m],i.ARRAY_BUFFER)}}function c(f){const d=[],h=f.index,g=f.attributes.position;let _=0;if(h!==null){const b=h.array;_=h.version;for(let E=0,v=b.length;E<v;E+=3){const R=b[E+0],C=b[E+1],A=b[E+2];d.push(R,C,C,A,A,R)}}else if(g!==void 0){const b=g.array;_=g.version;for(let E=0,v=b.length/3-1;E<v;E+=3){const R=E+0,C=E+1,A=E+2;d.push(R,C,C,A,A,R)}}else return;const m=new(G0(d)?K0:j0)(d,1);m.version=_;const p=s.get(f);p&&t.remove(p),s.set(f,m)}function u(f){const d=s.get(f);if(d){const h=f.index;h!==null&&d.version<h.version&&c(f)}else c(f);return s.get(f)}return{get:a,update:l,getWireframeAttribute:u}}function R1(i,t,e){let n;function r(d){n=d}let s,o;function a(d){s=d.type,o=d.bytesPerElement}function l(d,h){i.drawElements(n,h,s,d*o),e.update(h,n,1)}function c(d,h,g){g!==0&&(i.drawElementsInstanced(n,h,s,d*o,g),e.update(h,n,g))}function u(d,h,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,s,d,0,g);let m=0;for(let p=0;p<g;p++)m+=h[p];e.update(m,n,1)}function f(d,h,g,_){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)c(d[p]/o,h[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,h,0,s,d,0,_,0,g);let p=0;for(let b=0;b<g;b++)p+=h[b]*_[b];e.update(p,n,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=f}function P1(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(s/3);break;case i.LINES:e.lines+=a*(s/2);break;case i.LINE_STRIP:e.lines+=a*(s-1);break;case i.LINE_LOOP:e.lines+=a*s;break;case i.POINTS:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:n}}function D1(i,t,e){const n=new WeakMap,r=new ke;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=u!==void 0?u.length:0;let d=n.get(a);if(d===void 0||d.count!==f){let S=function(){A.dispose(),n.delete(a),a.removeEventListener("dispose",S)};d!==void 0&&d.texture.dispose();const h=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],b=a.morphAttributes.color||[];let E=0;h===!0&&(E=1),g===!0&&(E=2),_===!0&&(E=3);let v=a.attributes.position.count*E,R=1;v>t.maxTextureSize&&(R=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);const C=new Float32Array(v*R*4*f),A=new X0(C,v,R,f);A.type=gr,A.needsUpdate=!0;const L=E*4;for(let y=0;y<f;y++){const I=m[y],B=p[y],G=b[y],Y=v*R*4*y;for(let et=0;et<I.count;et++){const V=et*L;h===!0&&(r.fromBufferAttribute(I,et),C[Y+V+0]=r.x,C[Y+V+1]=r.y,C[Y+V+2]=r.z,C[Y+V+3]=0),g===!0&&(r.fromBufferAttribute(B,et),C[Y+V+4]=r.x,C[Y+V+5]=r.y,C[Y+V+6]=r.z,C[Y+V+7]=0),_===!0&&(r.fromBufferAttribute(G,et),C[Y+V+8]=r.x,C[Y+V+9]=r.y,C[Y+V+10]=r.z,C[Y+V+11]=G.itemSize===4?r.w:1)}}d={count:f,texture:A,size:new Qt(v,R)},n.set(a,d),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let h=0;for(let _=0;_<c.length;_++)h+=c[_];const g=a.morphTargetsRelative?1:1-h;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:s}}function L1(i,t,e,n){let r=new WeakMap;function s(l){const c=n.render.frame,u=l.geometry,f=t.get(l,u);if(r.get(f)!==c&&(t.update(f),r.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;r.get(d)!==c&&(d.update(),r.set(d,c))}return f}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:o}}class nv extends kn{constructor(t,e,n,r,s,o,a,l,c,u=Io){if(u!==Io&&u!==$o)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Io&&(n=ks),n===void 0&&u===$o&&(n=qo),super(null,r,s,o,a,l,u,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Ni,this.minFilter=l!==void 0?l:Ni,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const iv=new kn,Pm=new nv(1,1),rv=new X0,sv=new vb,ov=new Q0,Dm=[],Lm=[],Im=new Float32Array(16),Um=new Float32Array(9),Nm=new Float32Array(4);function Qo(i,t,e){const n=i[0];if(n<=0||n>0)return i;const r=t*e;let s=Dm[r];if(s===void 0&&(s=new Float32Array(r),Dm[r]=s),t!==0){n.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(s,a)}return s}function nn(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function rn(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function au(i,t){let e=Lm[t];e===void 0&&(e=new Int32Array(t),Lm[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function I1(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function U1(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(nn(e,t))return;i.uniform2fv(this.addr,t),rn(e,t)}}function N1(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(nn(e,t))return;i.uniform3fv(this.addr,t),rn(e,t)}}function O1(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(nn(e,t))return;i.uniform4fv(this.addr,t),rn(e,t)}}function F1(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(nn(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),rn(e,t)}else{if(nn(e,n))return;Nm.set(n),i.uniformMatrix2fv(this.addr,!1,Nm),rn(e,n)}}function B1(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(nn(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),rn(e,t)}else{if(nn(e,n))return;Um.set(n),i.uniformMatrix3fv(this.addr,!1,Um),rn(e,n)}}function z1(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(nn(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),rn(e,t)}else{if(nn(e,n))return;Im.set(n),i.uniformMatrix4fv(this.addr,!1,Im),rn(e,n)}}function k1(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function H1(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(nn(e,t))return;i.uniform2iv(this.addr,t),rn(e,t)}}function V1(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(nn(e,t))return;i.uniform3iv(this.addr,t),rn(e,t)}}function G1(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(nn(e,t))return;i.uniform4iv(this.addr,t),rn(e,t)}}function W1(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function X1(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(nn(e,t))return;i.uniform2uiv(this.addr,t),rn(e,t)}}function Y1(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(nn(e,t))return;i.uniform3uiv(this.addr,t),rn(e,t)}}function q1(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(nn(e,t))return;i.uniform4uiv(this.addr,t),rn(e,t)}}function $1(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(Pm.compareFunction=V0,s=Pm):s=iv,e.setTexture2D(t||s,r)}function j1(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture3D(t||sv,r)}function K1(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTextureCube(t||ov,r)}function Z1(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture2DArray(t||rv,r)}function J1(i){switch(i){case 5126:return I1;case 35664:return U1;case 35665:return N1;case 35666:return O1;case 35674:return F1;case 35675:return B1;case 35676:return z1;case 5124:case 35670:return k1;case 35667:case 35671:return H1;case 35668:case 35672:return V1;case 35669:case 35673:return G1;case 5125:return W1;case 36294:return X1;case 36295:return Y1;case 36296:return q1;case 35678:case 36198:case 36298:case 36306:case 35682:return $1;case 35679:case 36299:case 36307:return j1;case 35680:case 36300:case 36308:case 36293:return K1;case 36289:case 36303:case 36311:case 36292:return Z1}}function Q1(i,t){i.uniform1fv(this.addr,t)}function tw(i,t){const e=Qo(t,this.size,2);i.uniform2fv(this.addr,e)}function ew(i,t){const e=Qo(t,this.size,3);i.uniform3fv(this.addr,e)}function nw(i,t){const e=Qo(t,this.size,4);i.uniform4fv(this.addr,e)}function iw(i,t){const e=Qo(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function rw(i,t){const e=Qo(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function sw(i,t){const e=Qo(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function ow(i,t){i.uniform1iv(this.addr,t)}function aw(i,t){i.uniform2iv(this.addr,t)}function lw(i,t){i.uniform3iv(this.addr,t)}function cw(i,t){i.uniform4iv(this.addr,t)}function uw(i,t){i.uniform1uiv(this.addr,t)}function fw(i,t){i.uniform2uiv(this.addr,t)}function hw(i,t){i.uniform3uiv(this.addr,t)}function dw(i,t){i.uniform4uiv(this.addr,t)}function pw(i,t,e){const n=this.cache,r=t.length,s=au(e,r);nn(n,s)||(i.uniform1iv(this.addr,s),rn(n,s));for(let o=0;o!==r;++o)e.setTexture2D(t[o]||iv,s[o])}function mw(i,t,e){const n=this.cache,r=t.length,s=au(e,r);nn(n,s)||(i.uniform1iv(this.addr,s),rn(n,s));for(let o=0;o!==r;++o)e.setTexture3D(t[o]||sv,s[o])}function _w(i,t,e){const n=this.cache,r=t.length,s=au(e,r);nn(n,s)||(i.uniform1iv(this.addr,s),rn(n,s));for(let o=0;o!==r;++o)e.setTextureCube(t[o]||ov,s[o])}function gw(i,t,e){const n=this.cache,r=t.length,s=au(e,r);nn(n,s)||(i.uniform1iv(this.addr,s),rn(n,s));for(let o=0;o!==r;++o)e.setTexture2DArray(t[o]||rv,s[o])}function vw(i){switch(i){case 5126:return Q1;case 35664:return tw;case 35665:return ew;case 35666:return nw;case 35674:return iw;case 35675:return rw;case 35676:return sw;case 5124:case 35670:return ow;case 35667:case 35671:return aw;case 35668:case 35672:return lw;case 35669:case 35673:return cw;case 5125:return uw;case 36294:return fw;case 36295:return hw;case 36296:return dw;case 35678:case 36198:case 36298:case 36306:case 35682:return pw;case 35679:case 36299:case 36307:return mw;case 35680:case 36300:case 36308:case 36293:return _w;case 36289:case 36303:case 36311:case 36292:return gw}}class xw{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=J1(e.type)}}class yw{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=vw(e.type)}}class Mw{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(t,e[a.id],n)}}}const af=/(\w+)(\])?(\[|\.)?/g;function Om(i,t){i.seq.push(t),i.map[t.id]=t}function Sw(i,t,e){const n=i.name,r=n.length;for(af.lastIndex=0;;){const s=af.exec(n),o=af.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){Om(e,c===void 0?new xw(a,i,t):new yw(a,i,t));break}else{let f=e.map[a];f===void 0&&(f=new Mw(a),Om(e,f)),e=f}}}class Sc{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=t.getActiveUniform(e,r),o=t.getUniformLocation(e,s.name);Sw(s,o,this)}}setValue(t,e,n,r){const s=this.map[e];s!==void 0&&s.setValue(t,n,r)}setOptional(t,e,n){const r=e[n];r!==void 0&&this.setValue(t,n,r)}static upload(t,e,n,r){for(let s=0,o=e.length;s!==o;++s){const a=e[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,r)}}static seqWithValue(t,e){const n=[];for(let r=0,s=t.length;r!==s;++r){const o=t[r];o.id in e&&n.push(o)}return n}}function Fm(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const bw=37297;let Ew=0;function Tw(i,t){const e=i.split(`
`),n=[],r=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=r;o<s;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const Bm=new Jt;function ww(i){fe._getMatrix(Bm,fe.workingColorSpace,i);const t=`mat3( ${Bm.elements.map(e=>e.toFixed(4))} )`;switch(fe.getTransfer(i)){case ru:return[t,"LinearTransferOETF"];case Me:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function zm(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=i.getShaderInfoLog(t).trim();if(n&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return e.toUpperCase()+`

`+r+`

`+Tw(i.getShaderSource(t),o)}else return r}function Aw(i,t){const e=ww(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Cw(i,t){let e;switch(t){case WS:e="Linear";break;case XS:e="Reinhard";break;case YS:e="Cineon";break;case qS:e="ACESFilmic";break;case jS:e="AgX";break;case KS:e="Neutral";break;case $S:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Kl=new Z;function Rw(){fe.getLuminanceCoefficients(Kl);const i=Kl.x.toFixed(4),t=Kl.y.toFixed(4),e=Kl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Pw(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ma).join(`
`)}function Dw(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Lw(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(t,r),o=s.name;let a=1;s.type===i.FLOAT_MAT2&&(a=2),s.type===i.FLOAT_MAT3&&(a=3),s.type===i.FLOAT_MAT4&&(a=4),e[o]={type:s.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Ma(i){return i!==""}function km(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Hm(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Iw=/^[ \t]*#include +<([\w\d./]+)>/gm;function Uh(i){return i.replace(Iw,Nw)}const Uw=new Map;function Nw(i,t){let e=ee[t];if(e===void 0){const n=Uw.get(t);if(n!==void 0)e=ee[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Uh(e)}const Ow=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Vm(i){return i.replace(Ow,Fw)}function Fw(i,t,e,n){let r="";for(let s=parseInt(t);s<parseInt(e);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Gm(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function Bw(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===R0?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===bS?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===cr&&(t="SHADOWMAP_TYPE_VSM"),t}function zw(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Xo:case Yo:t="ENVMAP_TYPE_CUBE";break;case iu:t="ENVMAP_TYPE_CUBE_UV";break}return t}function kw(i){let t="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===Yo&&(t="ENVMAP_MODE_REFRACTION"),t}function Hw(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Rd:t="ENVMAP_BLENDING_MULTIPLY";break;case VS:t="ENVMAP_BLENDING_MIX";break;case GS:t="ENVMAP_BLENDING_ADD";break}return t}function Vw(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Gw(i,t,e,n){const r=i.getContext(),s=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=Bw(e),c=zw(e),u=kw(e),f=Hw(e),d=Vw(e),h=Pw(e),g=Dw(s),_=r.createProgram();let m,p,b=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ma).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ma).join(`
`),p.length>0&&(p+=`
`)):(m=[Gm(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ma).join(`
`),p=[Gm(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Zr?"#define TONE_MAPPING":"",e.toneMapping!==Zr?ee.tonemapping_pars_fragment:"",e.toneMapping!==Zr?Cw("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ee.colorspace_pars_fragment,Aw("linearToOutputTexel",e.outputColorSpace),Rw(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ma).join(`
`)),o=Uh(o),o=km(o,e),o=Hm(o,e),a=Uh(a),a=km(a,e),a=Hm(a,e),o=Vm(o),a=Vm(a),e.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===nm?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===nm?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const E=b+m+o,v=b+p+a,R=Fm(r,r.VERTEX_SHADER,E),C=Fm(r,r.FRAGMENT_SHADER,v);r.attachShader(_,R),r.attachShader(_,C),e.index0AttributeName!==void 0?r.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function A(I){if(i.debug.checkShaderErrors){const B=r.getProgramInfoLog(_).trim(),G=r.getShaderInfoLog(R).trim(),Y=r.getShaderInfoLog(C).trim();let et=!0,V=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(et=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,_,R,C);else{const K=zm(r,R,"vertex"),k=zm(r,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+B+`
`+K+`
`+k)}else B!==""?console.warn("THREE.WebGLProgram: Program Info Log:",B):(G===""||Y==="")&&(V=!1);V&&(I.diagnostics={runnable:et,programLog:B,vertexShader:{log:G,prefix:m},fragmentShader:{log:Y,prefix:p}})}r.deleteShader(R),r.deleteShader(C),L=new Sc(r,_),S=Lw(r,_)}let L;this.getUniforms=function(){return L===void 0&&A(this),L};let S;this.getAttributes=function(){return S===void 0&&A(this),S};let y=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=r.getProgramParameter(_,bw)),y},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Ew++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=R,this.fragmentShader=C,this}let Ww=0;class Xw{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,r=this._getShaderStage(e),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Yw(t),e.set(t,n)),n}}class Yw{constructor(t){this.id=Ww++,this.code=t,this.usedTimes=0}}function qw(i,t,e,n,r,s,o){const a=new Y0,l=new Xw,c=new Set,u=[],f=r.logarithmicDepthBuffer,d=r.vertexTextures;let h=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(S){return c.add(S),S===0?"uv":`uv${S}`}function m(S,y,I,B,G){const Y=B.fog,et=G.geometry,V=S.isMeshStandardMaterial?B.environment:null,K=(S.isMeshStandardMaterial?e:t).get(S.envMap||V),k=K&&K.mapping===iu?K.image.height:null,lt=g[S.type];S.precision!==null&&(h=r.getMaxPrecision(S.precision),h!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",h,"instead."));const N=et.morphAttributes.position||et.morphAttributes.normal||et.morphAttributes.color,_t=N!==void 0?N.length:0;let Dt=0;et.morphAttributes.position!==void 0&&(Dt=1),et.morphAttributes.normal!==void 0&&(Dt=2),et.morphAttributes.color!==void 0&&(Dt=3);let Kt,it,ut,Mt;if(lt){const At=Vi[lt];Kt=At.vertexShader,it=At.fragmentShader}else Kt=S.vertexShader,it=S.fragmentShader,l.update(S),ut=l.getVertexShaderID(S),Mt=l.getFragmentShaderID(S);const ht=i.getRenderTarget(),Rt=i.state.buffers.depth.getReversed(),It=G.isInstancedMesh===!0,kt=G.isBatchedMesh===!0,te=!!S.map,P=!!S.matcap,U=!!K,w=!!S.aoMap,rt=!!S.lightMap,J=!!S.bumpMap,D=!!S.normalMap,nt=!!S.displacementMap,ot=!!S.emissiveMap,Q=!!S.metalnessMap,M=!!S.roughnessMap,x=S.anisotropy>0,O=S.clearcoat>0,W=S.dispersion>0,X=S.iridescence>0,j=S.sheen>0,ct=S.transmission>0,at=x&&!!S.anisotropyMap,pt=O&&!!S.clearcoatMap,Ft=O&&!!S.clearcoatNormalMap,ft=O&&!!S.clearcoatRoughnessMap,dt=X&&!!S.iridescenceMap,Ot=X&&!!S.iridescenceThicknessMap,Bt=j&&!!S.sheenColorMap,xt=j&&!!S.sheenRoughnessMap,Ht=!!S.specularMap,Vt=!!S.specularColorMap,ce=!!S.specularIntensityMap,F=ct&&!!S.transmissionMap,St=ct&&!!S.thicknessMap,tt=!!S.gradientMap,st=!!S.alphaMap,yt=S.alphaTest>0,bt=!!S.alphaHash,Gt=!!S.extensions;let he=Zr;S.toneMapped&&(ht===null||ht.isXRRenderTarget===!0)&&(he=i.toneMapping);const ze={shaderID:lt,shaderType:S.type,shaderName:S.name,vertexShader:Kt,fragmentShader:it,defines:S.defines,customVertexShaderID:ut,customFragmentShaderID:Mt,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:h,batching:kt,batchingColor:kt&&G._colorsTexture!==null,instancing:It,instancingColor:It&&G.instanceColor!==null,instancingMorph:It&&G.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:ht===null?i.outputColorSpace:ht.isXRRenderTarget===!0?ht.texture.colorSpace:Zo,alphaToCoverage:!!S.alphaToCoverage,map:te,matcap:P,envMap:U,envMapMode:U&&K.mapping,envMapCubeUVHeight:k,aoMap:w,lightMap:rt,bumpMap:J,normalMap:D,displacementMap:d&&nt,emissiveMap:ot,normalMapObjectSpace:D&&S.normalMapType===tb,normalMapTangentSpace:D&&S.normalMapType===H0,metalnessMap:Q,roughnessMap:M,anisotropy:x,anisotropyMap:at,clearcoat:O,clearcoatMap:pt,clearcoatNormalMap:Ft,clearcoatRoughnessMap:ft,dispersion:W,iridescence:X,iridescenceMap:dt,iridescenceThicknessMap:Ot,sheen:j,sheenColorMap:Bt,sheenRoughnessMap:xt,specularMap:Ht,specularColorMap:Vt,specularIntensityMap:ce,transmission:ct,transmissionMap:F,thicknessMap:St,gradientMap:tt,opaque:S.transparent===!1&&S.blending===Lo&&S.alphaToCoverage===!1,alphaMap:st,alphaTest:yt,alphaHash:bt,combine:S.combine,mapUv:te&&_(S.map.channel),aoMapUv:w&&_(S.aoMap.channel),lightMapUv:rt&&_(S.lightMap.channel),bumpMapUv:J&&_(S.bumpMap.channel),normalMapUv:D&&_(S.normalMap.channel),displacementMapUv:nt&&_(S.displacementMap.channel),emissiveMapUv:ot&&_(S.emissiveMap.channel),metalnessMapUv:Q&&_(S.metalnessMap.channel),roughnessMapUv:M&&_(S.roughnessMap.channel),anisotropyMapUv:at&&_(S.anisotropyMap.channel),clearcoatMapUv:pt&&_(S.clearcoatMap.channel),clearcoatNormalMapUv:Ft&&_(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ft&&_(S.clearcoatRoughnessMap.channel),iridescenceMapUv:dt&&_(S.iridescenceMap.channel),iridescenceThicknessMapUv:Ot&&_(S.iridescenceThicknessMap.channel),sheenColorMapUv:Bt&&_(S.sheenColorMap.channel),sheenRoughnessMapUv:xt&&_(S.sheenRoughnessMap.channel),specularMapUv:Ht&&_(S.specularMap.channel),specularColorMapUv:Vt&&_(S.specularColorMap.channel),specularIntensityMapUv:ce&&_(S.specularIntensityMap.channel),transmissionMapUv:F&&_(S.transmissionMap.channel),thicknessMapUv:St&&_(S.thicknessMap.channel),alphaMapUv:st&&_(S.alphaMap.channel),vertexTangents:!!et.attributes.tangent&&(D||x),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!et.attributes.color&&et.attributes.color.itemSize===4,pointsUvs:G.isPoints===!0&&!!et.attributes.uv&&(te||st),fog:!!Y,useFog:S.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:f,reverseDepthBuffer:Rt,skinning:G.isSkinnedMesh===!0,morphTargets:et.morphAttributes.position!==void 0,morphNormals:et.morphAttributes.normal!==void 0,morphColors:et.morphAttributes.color!==void 0,morphTargetsCount:_t,morphTextureStride:Dt,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:he,decodeVideoTexture:te&&S.map.isVideoTexture===!0&&fe.getTransfer(S.map.colorSpace)===Me,decodeVideoTextureEmissive:ot&&S.emissiveMap.isVideoTexture===!0&&fe.getTransfer(S.emissiveMap.colorSpace)===Me,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===mr,flipSided:S.side===zn,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Gt&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Gt&&S.extensions.multiDraw===!0||kt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return ze.vertexUv1s=c.has(1),ze.vertexUv2s=c.has(2),ze.vertexUv3s=c.has(3),c.clear(),ze}function p(S){const y=[];if(S.shaderID?y.push(S.shaderID):(y.push(S.customVertexShaderID),y.push(S.customFragmentShaderID)),S.defines!==void 0)for(const I in S.defines)y.push(I),y.push(S.defines[I]);return S.isRawShaderMaterial===!1&&(b(y,S),E(y,S),y.push(i.outputColorSpace)),y.push(S.customProgramCacheKey),y.join()}function b(S,y){S.push(y.precision),S.push(y.outputColorSpace),S.push(y.envMapMode),S.push(y.envMapCubeUVHeight),S.push(y.mapUv),S.push(y.alphaMapUv),S.push(y.lightMapUv),S.push(y.aoMapUv),S.push(y.bumpMapUv),S.push(y.normalMapUv),S.push(y.displacementMapUv),S.push(y.emissiveMapUv),S.push(y.metalnessMapUv),S.push(y.roughnessMapUv),S.push(y.anisotropyMapUv),S.push(y.clearcoatMapUv),S.push(y.clearcoatNormalMapUv),S.push(y.clearcoatRoughnessMapUv),S.push(y.iridescenceMapUv),S.push(y.iridescenceThicknessMapUv),S.push(y.sheenColorMapUv),S.push(y.sheenRoughnessMapUv),S.push(y.specularMapUv),S.push(y.specularColorMapUv),S.push(y.specularIntensityMapUv),S.push(y.transmissionMapUv),S.push(y.thicknessMapUv),S.push(y.combine),S.push(y.fogExp2),S.push(y.sizeAttenuation),S.push(y.morphTargetsCount),S.push(y.morphAttributeCount),S.push(y.numDirLights),S.push(y.numPointLights),S.push(y.numSpotLights),S.push(y.numSpotLightMaps),S.push(y.numHemiLights),S.push(y.numRectAreaLights),S.push(y.numDirLightShadows),S.push(y.numPointLightShadows),S.push(y.numSpotLightShadows),S.push(y.numSpotLightShadowsWithMaps),S.push(y.numLightProbes),S.push(y.shadowMapType),S.push(y.toneMapping),S.push(y.numClippingPlanes),S.push(y.numClipIntersection),S.push(y.depthPacking)}function E(S,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),S.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reverseDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),S.push(a.mask)}function v(S){const y=g[S.type];let I;if(y){const B=Vi[y];I=Pb.clone(B.uniforms)}else I=S.uniforms;return I}function R(S,y){let I;for(let B=0,G=u.length;B<G;B++){const Y=u[B];if(Y.cacheKey===y){I=Y,++I.usedTimes;break}}return I===void 0&&(I=new Gw(i,y,S,s),u.push(I)),I}function C(S){if(--S.usedTimes===0){const y=u.indexOf(S);u[y]=u[u.length-1],u.pop(),S.destroy()}}function A(S){l.remove(S)}function L(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:R,releaseProgram:C,releaseShaderCache:A,programs:u,dispose:L}}function $w(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function r(o,a,l){i.get(o)[a]=l}function s(){i=new WeakMap}return{has:t,get:e,remove:n,update:r,dispose:s}}function jw(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Wm(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Xm(){const i=[];let t=0;const e=[],n=[],r=[];function s(){t=0,e.length=0,n.length=0,r.length=0}function o(f,d,h,g,_,m){let p=i[t];return p===void 0?(p={id:f.id,object:f,geometry:d,material:h,groupOrder:g,renderOrder:f.renderOrder,z:_,group:m},i[t]=p):(p.id=f.id,p.object=f,p.geometry=d,p.material=h,p.groupOrder=g,p.renderOrder=f.renderOrder,p.z=_,p.group=m),t++,p}function a(f,d,h,g,_,m){const p=o(f,d,h,g,_,m);h.transmission>0?n.push(p):h.transparent===!0?r.push(p):e.push(p)}function l(f,d,h,g,_,m){const p=o(f,d,h,g,_,m);h.transmission>0?n.unshift(p):h.transparent===!0?r.unshift(p):e.unshift(p)}function c(f,d){e.length>1&&e.sort(f||jw),n.length>1&&n.sort(d||Wm),r.length>1&&r.sort(d||Wm)}function u(){for(let f=t,d=i.length;f<d;f++){const h=i[f];if(h.id===null)break;h.id=null,h.object=null,h.geometry=null,h.material=null,h.group=null}}return{opaque:e,transmissive:n,transparent:r,init:s,push:a,unshift:l,finish:u,sort:c}}function Kw(){let i=new WeakMap;function t(n,r){const s=i.get(n);let o;return s===void 0?(o=new Xm,i.set(n,[o])):r>=s.length?(o=new Xm,s.push(o)):o=s[r],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function Zw(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new Z,color:new ae};break;case"SpotLight":e={position:new Z,direction:new Z,color:new ae,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new Z,color:new ae,distance:0,decay:0};break;case"HemisphereLight":e={direction:new Z,skyColor:new ae,groundColor:new ae};break;case"RectAreaLight":e={color:new ae,position:new Z,halfWidth:new Z,halfHeight:new Z};break}return i[t.id]=e,e}}}function Jw(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Qt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Qt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Qt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let Qw=0;function tA(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function eA(i){const t=new Zw,e=Jw(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new Z);const r=new Z,s=new Be,o=new Be;function a(c){let u=0,f=0,d=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let h=0,g=0,_=0,m=0,p=0,b=0,E=0,v=0,R=0,C=0,A=0;c.sort(tA);for(let S=0,y=c.length;S<y;S++){const I=c[S],B=I.color,G=I.intensity,Y=I.distance,et=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)u+=B.r*G,f+=B.g*G,d+=B.b*G;else if(I.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(I.sh.coefficients[V],G);A++}else if(I.isDirectionalLight){const V=t.get(I);if(V.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const K=I.shadow,k=e.get(I);k.shadowIntensity=K.intensity,k.shadowBias=K.bias,k.shadowNormalBias=K.normalBias,k.shadowRadius=K.radius,k.shadowMapSize=K.mapSize,n.directionalShadow[h]=k,n.directionalShadowMap[h]=et,n.directionalShadowMatrix[h]=I.shadow.matrix,b++}n.directional[h]=V,h++}else if(I.isSpotLight){const V=t.get(I);V.position.setFromMatrixPosition(I.matrixWorld),V.color.copy(B).multiplyScalar(G),V.distance=Y,V.coneCos=Math.cos(I.angle),V.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),V.decay=I.decay,n.spot[_]=V;const K=I.shadow;if(I.map&&(n.spotLightMap[R]=I.map,R++,K.updateMatrices(I),I.castShadow&&C++),n.spotLightMatrix[_]=K.matrix,I.castShadow){const k=e.get(I);k.shadowIntensity=K.intensity,k.shadowBias=K.bias,k.shadowNormalBias=K.normalBias,k.shadowRadius=K.radius,k.shadowMapSize=K.mapSize,n.spotShadow[_]=k,n.spotShadowMap[_]=et,v++}_++}else if(I.isRectAreaLight){const V=t.get(I);V.color.copy(B).multiplyScalar(G),V.halfWidth.set(I.width*.5,0,0),V.halfHeight.set(0,I.height*.5,0),n.rectArea[m]=V,m++}else if(I.isPointLight){const V=t.get(I);if(V.color.copy(I.color).multiplyScalar(I.intensity),V.distance=I.distance,V.decay=I.decay,I.castShadow){const K=I.shadow,k=e.get(I);k.shadowIntensity=K.intensity,k.shadowBias=K.bias,k.shadowNormalBias=K.normalBias,k.shadowRadius=K.radius,k.shadowMapSize=K.mapSize,k.shadowCameraNear=K.camera.near,k.shadowCameraFar=K.camera.far,n.pointShadow[g]=k,n.pointShadowMap[g]=et,n.pointShadowMatrix[g]=I.shadow.matrix,E++}n.point[g]=V,g++}else if(I.isHemisphereLight){const V=t.get(I);V.skyColor.copy(I.color).multiplyScalar(G),V.groundColor.copy(I.groundColor).multiplyScalar(G),n.hemi[p]=V,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=wt.LTC_FLOAT_1,n.rectAreaLTC2=wt.LTC_FLOAT_2):(n.rectAreaLTC1=wt.LTC_HALF_1,n.rectAreaLTC2=wt.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=f,n.ambient[2]=d;const L=n.hash;(L.directionalLength!==h||L.pointLength!==g||L.spotLength!==_||L.rectAreaLength!==m||L.hemiLength!==p||L.numDirectionalShadows!==b||L.numPointShadows!==E||L.numSpotShadows!==v||L.numSpotMaps!==R||L.numLightProbes!==A)&&(n.directional.length=h,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=v+R-C,n.spotLightMap.length=R,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=A,L.directionalLength=h,L.pointLength=g,L.spotLength=_,L.rectAreaLength=m,L.hemiLength=p,L.numDirectionalShadows=b,L.numPointShadows=E,L.numSpotShadows=v,L.numSpotMaps=R,L.numLightProbes=A,n.version=Qw++)}function l(c,u){let f=0,d=0,h=0,g=0,_=0;const m=u.matrixWorldInverse;for(let p=0,b=c.length;p<b;p++){const E=c[p];if(E.isDirectionalLight){const v=n.directional[f];v.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(m),f++}else if(E.isSpotLight){const v=n.spot[h];v.position.setFromMatrixPosition(E.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(m),h++}else if(E.isRectAreaLight){const v=n.rectArea[g];v.position.setFromMatrixPosition(E.matrixWorld),v.position.applyMatrix4(m),o.identity(),s.copy(E.matrixWorld),s.premultiply(m),o.extractRotation(s),v.halfWidth.set(E.width*.5,0,0),v.halfHeight.set(0,E.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),g++}else if(E.isPointLight){const v=n.point[d];v.position.setFromMatrixPosition(E.matrixWorld),v.position.applyMatrix4(m),d++}else if(E.isHemisphereLight){const v=n.hemi[_];v.direction.setFromMatrixPosition(E.matrixWorld),v.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:n}}function Ym(i){const t=new eA(i),e=[],n=[];function r(u){c.camera=u,e.length=0,n.length=0}function s(u){e.push(u)}function o(u){n.push(u)}function a(){t.setup(e)}function l(u){t.setupView(e,u)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function nA(i){let t=new WeakMap;function e(r,s=0){const o=t.get(r);let a;return o===void 0?(a=new Ym(i),t.set(r,[a])):s>=o.length?(a=new Ym(i),o.push(a)):a=o[s],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class iA extends Jo{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=JS,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class rA extends Jo{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const sA=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,oA=`uniform sampler2D shadow_pass;
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
}`;function aA(i,t,e){let n=new Fd;const r=new Qt,s=new Qt,o=new ke,a=new iA({depthPacking:QS}),l=new rA,c={},u=e.maxTextureSize,f={[is]:zn,[zn]:is,[mr]:mr},d=new tr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Qt},radius:{value:4}},vertexShader:sA,fragmentShader:oA}),h=d.clone();h.defines.HORIZONTAL_PASS=1;const g=new er;g.setAttribute("position",new Yn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Ei(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=R0;let p=this.type;this.render=function(C,A,L){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;const S=i.getRenderTarget(),y=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),B=i.state;B.setBlending(Kr),B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const G=p!==cr&&this.type===cr,Y=p===cr&&this.type!==cr;for(let et=0,V=C.length;et<V;et++){const K=C[et],k=K.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;r.copy(k.mapSize);const lt=k.getFrameExtents();if(r.multiply(lt),s.copy(k.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/lt.x),r.x=s.x*lt.x,k.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/lt.y),r.y=s.y*lt.y,k.mapSize.y=s.y)),k.map===null||G===!0||Y===!0){const _t=this.type!==cr?{minFilter:Ni,magFilter:Ni}:{};k.map!==null&&k.map.dispose(),k.map=new Hs(r.x,r.y,_t),k.map.texture.name=K.name+".shadowMap",k.camera.updateProjectionMatrix()}i.setRenderTarget(k.map),i.clear();const N=k.getViewportCount();for(let _t=0;_t<N;_t++){const Dt=k.getViewport(_t);o.set(s.x*Dt.x,s.y*Dt.y,s.x*Dt.z,s.y*Dt.w),B.viewport(o),k.updateMatrices(K,_t),n=k.getFrustum(),v(A,L,k.camera,K,this.type)}k.isPointLightShadow!==!0&&this.type===cr&&b(k,L),k.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(S,y,I)};function b(C,A){const L=t.update(_);d.defines.VSM_SAMPLES!==C.blurSamples&&(d.defines.VSM_SAMPLES=C.blurSamples,h.defines.VSM_SAMPLES=C.blurSamples,d.needsUpdate=!0,h.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new Hs(r.x,r.y)),d.uniforms.shadow_pass.value=C.map.texture,d.uniforms.resolution.value=C.mapSize,d.uniforms.radius.value=C.radius,i.setRenderTarget(C.mapPass),i.clear(),i.renderBufferDirect(A,null,L,d,_,null),h.uniforms.shadow_pass.value=C.mapPass.texture,h.uniforms.resolution.value=C.mapSize,h.uniforms.radius.value=C.radius,i.setRenderTarget(C.map),i.clear(),i.renderBufferDirect(A,null,L,h,_,null)}function E(C,A,L,S){let y=null;const I=L.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(I!==void 0)y=I;else if(y=L.isPointLight===!0?l:a,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const B=y.uuid,G=A.uuid;let Y=c[B];Y===void 0&&(Y={},c[B]=Y);let et=Y[G];et===void 0&&(et=y.clone(),Y[G]=et,A.addEventListener("dispose",R)),y=et}if(y.visible=A.visible,y.wireframe=A.wireframe,S===cr?y.side=A.shadowSide!==null?A.shadowSide:A.side:y.side=A.shadowSide!==null?A.shadowSide:f[A.side],y.alphaMap=A.alphaMap,y.alphaTest=A.alphaTest,y.map=A.map,y.clipShadows=A.clipShadows,y.clippingPlanes=A.clippingPlanes,y.clipIntersection=A.clipIntersection,y.displacementMap=A.displacementMap,y.displacementScale=A.displacementScale,y.displacementBias=A.displacementBias,y.wireframeLinewidth=A.wireframeLinewidth,y.linewidth=A.linewidth,L.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const B=i.properties.get(y);B.light=L}return y}function v(C,A,L,S,y){if(C.visible===!1)return;if(C.layers.test(A.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&y===cr)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,C.matrixWorld);const G=t.update(C),Y=C.material;if(Array.isArray(Y)){const et=G.groups;for(let V=0,K=et.length;V<K;V++){const k=et[V],lt=Y[k.materialIndex];if(lt&&lt.visible){const N=E(C,lt,S,y);C.onBeforeShadow(i,C,A,L,G,N,k),i.renderBufferDirect(L,null,G,N,C,k),C.onAfterShadow(i,C,A,L,G,N,k)}}}else if(Y.visible){const et=E(C,Y,S,y);C.onBeforeShadow(i,C,A,L,G,et,null),i.renderBufferDirect(L,null,G,et,C,null),C.onAfterShadow(i,C,A,L,G,et,null)}}const B=C.children;for(let G=0,Y=B.length;G<Y;G++)v(B[G],A,L,S,y)}function R(C){C.target.removeEventListener("dispose",R);for(const L in c){const S=c[L],y=C.target.uuid;y in S&&(S[y].dispose(),delete S[y])}}}const lA={[Kf]:Zf,[Jf]:eh,[Qf]:nh,[Wo]:th,[Zf]:Kf,[eh]:Jf,[nh]:Qf,[th]:Wo};function cA(i,t){function e(){let F=!1;const St=new ke;let tt=null;const st=new ke(0,0,0,0);return{setMask:function(yt){tt!==yt&&!F&&(i.colorMask(yt,yt,yt,yt),tt=yt)},setLocked:function(yt){F=yt},setClear:function(yt,bt,Gt,he,ze){ze===!0&&(yt*=he,bt*=he,Gt*=he),St.set(yt,bt,Gt,he),st.equals(St)===!1&&(i.clearColor(yt,bt,Gt,he),st.copy(St))},reset:function(){F=!1,tt=null,st.set(-1,0,0,0)}}}function n(){let F=!1,St=!1,tt=null,st=null,yt=null;return{setReversed:function(bt){if(St!==bt){const Gt=t.get("EXT_clip_control");St?Gt.clipControlEXT(Gt.LOWER_LEFT_EXT,Gt.ZERO_TO_ONE_EXT):Gt.clipControlEXT(Gt.LOWER_LEFT_EXT,Gt.NEGATIVE_ONE_TO_ONE_EXT);const he=yt;yt=null,this.setClear(he)}St=bt},getReversed:function(){return St},setTest:function(bt){bt?ht(i.DEPTH_TEST):Rt(i.DEPTH_TEST)},setMask:function(bt){tt!==bt&&!F&&(i.depthMask(bt),tt=bt)},setFunc:function(bt){if(St&&(bt=lA[bt]),st!==bt){switch(bt){case Kf:i.depthFunc(i.NEVER);break;case Zf:i.depthFunc(i.ALWAYS);break;case Jf:i.depthFunc(i.LESS);break;case Wo:i.depthFunc(i.LEQUAL);break;case Qf:i.depthFunc(i.EQUAL);break;case th:i.depthFunc(i.GEQUAL);break;case eh:i.depthFunc(i.GREATER);break;case nh:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}st=bt}},setLocked:function(bt){F=bt},setClear:function(bt){yt!==bt&&(St&&(bt=1-bt),i.clearDepth(bt),yt=bt)},reset:function(){F=!1,tt=null,st=null,yt=null,St=!1}}}function r(){let F=!1,St=null,tt=null,st=null,yt=null,bt=null,Gt=null,he=null,ze=null;return{setTest:function(At){F||(At?ht(i.STENCIL_TEST):Rt(i.STENCIL_TEST))},setMask:function(At){St!==At&&!F&&(i.stencilMask(At),St=At)},setFunc:function(At,Ut,Zt){(tt!==At||st!==Ut||yt!==Zt)&&(i.stencilFunc(At,Ut,Zt),tt=At,st=Ut,yt=Zt)},setOp:function(At,Ut,Zt){(bt!==At||Gt!==Ut||he!==Zt)&&(i.stencilOp(At,Ut,Zt),bt=At,Gt=Ut,he=Zt)},setLocked:function(At){F=At},setClear:function(At){ze!==At&&(i.clearStencil(At),ze=At)},reset:function(){F=!1,St=null,tt=null,st=null,yt=null,bt=null,Gt=null,he=null,ze=null}}}const s=new e,o=new n,a=new r,l=new WeakMap,c=new WeakMap;let u={},f={},d=new WeakMap,h=[],g=null,_=!1,m=null,p=null,b=null,E=null,v=null,R=null,C=null,A=new ae(0,0,0),L=0,S=!1,y=null,I=null,B=null,G=null,Y=null;const et=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,K=0;const k=i.getParameter(i.VERSION);k.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(k)[1]),V=K>=1):k.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),V=K>=2);let lt=null,N={};const _t=i.getParameter(i.SCISSOR_BOX),Dt=i.getParameter(i.VIEWPORT),Kt=new ke().fromArray(_t),it=new ke().fromArray(Dt);function ut(F,St,tt,st){const yt=new Uint8Array(4),bt=i.createTexture();i.bindTexture(F,bt),i.texParameteri(F,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(F,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Gt=0;Gt<tt;Gt++)F===i.TEXTURE_3D||F===i.TEXTURE_2D_ARRAY?i.texImage3D(St,0,i.RGBA,1,1,st,0,i.RGBA,i.UNSIGNED_BYTE,yt):i.texImage2D(St+Gt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,yt);return bt}const Mt={};Mt[i.TEXTURE_2D]=ut(i.TEXTURE_2D,i.TEXTURE_2D,1),Mt[i.TEXTURE_CUBE_MAP]=ut(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Mt[i.TEXTURE_2D_ARRAY]=ut(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Mt[i.TEXTURE_3D]=ut(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ht(i.DEPTH_TEST),o.setFunc(Wo),J(!1),D(Zp),ht(i.CULL_FACE),w(Kr);function ht(F){u[F]!==!0&&(i.enable(F),u[F]=!0)}function Rt(F){u[F]!==!1&&(i.disable(F),u[F]=!1)}function It(F,St){return f[F]!==St?(i.bindFramebuffer(F,St),f[F]=St,F===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=St),F===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=St),!0):!1}function kt(F,St){let tt=h,st=!1;if(F){tt=d.get(St),tt===void 0&&(tt=[],d.set(St,tt));const yt=F.textures;if(tt.length!==yt.length||tt[0]!==i.COLOR_ATTACHMENT0){for(let bt=0,Gt=yt.length;bt<Gt;bt++)tt[bt]=i.COLOR_ATTACHMENT0+bt;tt.length=yt.length,st=!0}}else tt[0]!==i.BACK&&(tt[0]=i.BACK,st=!0);st&&i.drawBuffers(tt)}function te(F){return g!==F?(i.useProgram(F),g=F,!0):!1}const P={[Ms]:i.FUNC_ADD,[TS]:i.FUNC_SUBTRACT,[wS]:i.FUNC_REVERSE_SUBTRACT};P[AS]=i.MIN,P[CS]=i.MAX;const U={[RS]:i.ZERO,[PS]:i.ONE,[DS]:i.SRC_COLOR,[$f]:i.SRC_ALPHA,[FS]:i.SRC_ALPHA_SATURATE,[NS]:i.DST_COLOR,[IS]:i.DST_ALPHA,[LS]:i.ONE_MINUS_SRC_COLOR,[jf]:i.ONE_MINUS_SRC_ALPHA,[OS]:i.ONE_MINUS_DST_COLOR,[US]:i.ONE_MINUS_DST_ALPHA,[BS]:i.CONSTANT_COLOR,[zS]:i.ONE_MINUS_CONSTANT_COLOR,[kS]:i.CONSTANT_ALPHA,[HS]:i.ONE_MINUS_CONSTANT_ALPHA};function w(F,St,tt,st,yt,bt,Gt,he,ze,At){if(F===Kr){_===!0&&(Rt(i.BLEND),_=!1);return}if(_===!1&&(ht(i.BLEND),_=!0),F!==ES){if(F!==m||At!==S){if((p!==Ms||v!==Ms)&&(i.blendEquation(i.FUNC_ADD),p=Ms,v=Ms),At)switch(F){case Lo:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Vc:i.blendFunc(i.ONE,i.ONE);break;case Jp:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Qp:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case Lo:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Vc:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Jp:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Qp:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}b=null,E=null,R=null,C=null,A.set(0,0,0),L=0,m=F,S=At}return}yt=yt||St,bt=bt||tt,Gt=Gt||st,(St!==p||yt!==v)&&(i.blendEquationSeparate(P[St],P[yt]),p=St,v=yt),(tt!==b||st!==E||bt!==R||Gt!==C)&&(i.blendFuncSeparate(U[tt],U[st],U[bt],U[Gt]),b=tt,E=st,R=bt,C=Gt),(he.equals(A)===!1||ze!==L)&&(i.blendColor(he.r,he.g,he.b,ze),A.copy(he),L=ze),m=F,S=!1}function rt(F,St){F.side===mr?Rt(i.CULL_FACE):ht(i.CULL_FACE);let tt=F.side===zn;St&&(tt=!tt),J(tt),F.blending===Lo&&F.transparent===!1?w(Kr):w(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),o.setFunc(F.depthFunc),o.setTest(F.depthTest),o.setMask(F.depthWrite),s.setMask(F.colorWrite);const st=F.stencilWrite;a.setTest(st),st&&(a.setMask(F.stencilWriteMask),a.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),a.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),ot(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?ht(i.SAMPLE_ALPHA_TO_COVERAGE):Rt(i.SAMPLE_ALPHA_TO_COVERAGE)}function J(F){y!==F&&(F?i.frontFace(i.CW):i.frontFace(i.CCW),y=F)}function D(F){F!==MS?(ht(i.CULL_FACE),F!==I&&(F===Zp?i.cullFace(i.BACK):F===SS?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Rt(i.CULL_FACE),I=F}function nt(F){F!==B&&(V&&i.lineWidth(F),B=F)}function ot(F,St,tt){F?(ht(i.POLYGON_OFFSET_FILL),(G!==St||Y!==tt)&&(i.polygonOffset(St,tt),G=St,Y=tt)):Rt(i.POLYGON_OFFSET_FILL)}function Q(F){F?ht(i.SCISSOR_TEST):Rt(i.SCISSOR_TEST)}function M(F){F===void 0&&(F=i.TEXTURE0+et-1),lt!==F&&(i.activeTexture(F),lt=F)}function x(F,St,tt){tt===void 0&&(lt===null?tt=i.TEXTURE0+et-1:tt=lt);let st=N[tt];st===void 0&&(st={type:void 0,texture:void 0},N[tt]=st),(st.type!==F||st.texture!==St)&&(lt!==tt&&(i.activeTexture(tt),lt=tt),i.bindTexture(F,St||Mt[F]),st.type=F,st.texture=St)}function O(){const F=N[lt];F!==void 0&&F.type!==void 0&&(i.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function W(){try{i.compressedTexImage2D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function X(){try{i.compressedTexImage3D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function j(){try{i.texSubImage2D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ct(){try{i.texSubImage3D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function at(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function pt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ft(){try{i.texStorage2D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ft(){try{i.texStorage3D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function dt(){try{i.texImage2D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ot(){try{i.texImage3D.apply(i,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Bt(F){Kt.equals(F)===!1&&(i.scissor(F.x,F.y,F.z,F.w),Kt.copy(F))}function xt(F){it.equals(F)===!1&&(i.viewport(F.x,F.y,F.z,F.w),it.copy(F))}function Ht(F,St){let tt=c.get(St);tt===void 0&&(tt=new WeakMap,c.set(St,tt));let st=tt.get(F);st===void 0&&(st=i.getUniformBlockIndex(St,F.name),tt.set(F,st))}function Vt(F,St){const st=c.get(St).get(F);l.get(St)!==st&&(i.uniformBlockBinding(St,st,F.__bindingPointIndex),l.set(St,st))}function ce(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},lt=null,N={},f={},d=new WeakMap,h=[],g=null,_=!1,m=null,p=null,b=null,E=null,v=null,R=null,C=null,A=new ae(0,0,0),L=0,S=!1,y=null,I=null,B=null,G=null,Y=null,Kt.set(0,0,i.canvas.width,i.canvas.height),it.set(0,0,i.canvas.width,i.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:ht,disable:Rt,bindFramebuffer:It,drawBuffers:kt,useProgram:te,setBlending:w,setMaterial:rt,setFlipSided:J,setCullFace:D,setLineWidth:nt,setPolygonOffset:ot,setScissorTest:Q,activeTexture:M,bindTexture:x,unbindTexture:O,compressedTexImage2D:W,compressedTexImage3D:X,texImage2D:dt,texImage3D:Ot,updateUBOMapping:Ht,uniformBlockBinding:Vt,texStorage2D:Ft,texStorage3D:ft,texSubImage2D:j,texSubImage3D:ct,compressedTexSubImage2D:at,compressedTexSubImage3D:pt,scissor:Bt,viewport:xt,reset:ce}}function qm(i,t,e,n){const r=uA(n);switch(e){case U0:return i*t;case O0:return i*t;case F0:return i*t*2;case B0:return i*t/r.components*r.byteLength;case Id:return i*t/r.components*r.byteLength;case z0:return i*t*2/r.components*r.byteLength;case Ud:return i*t*2/r.components*r.byteLength;case N0:return i*t*3/r.components*r.byteLength;case Ii:return i*t*4/r.components*r.byteLength;case Nd:return i*t*4/r.components*r.byteLength;case _c:case gc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case vc:case xc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case lh:case uh:return Math.max(i,16)*Math.max(t,8)/4;case ah:case ch:return Math.max(i,8)*Math.max(t,8)/2;case fh:case hh:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case dh:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ph:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case mh:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case _h:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case gh:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case vh:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case xh:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case yh:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Mh:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Sh:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case bh:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Eh:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Th:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case wh:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Ah:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case yc:case Ch:case Rh:return Math.ceil(i/4)*Math.ceil(t/4)*16;case k0:case Ph:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Dh:case Lh:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function uA(i){switch(i){case Tr:case D0:return{byteLength:1,components:1};case il:case L0:case cl:return{byteLength:2,components:1};case Dd:case Ld:return{byteLength:2,components:4};case ks:case Pd:case gr:return{byteLength:4,components:1};case I0:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function fA(i,t,e,n,r,s,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Qt,u=new WeakMap;let f;const d=new WeakMap;let h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(M,x){return h?new OffscreenCanvas(M,x):rl("canvas")}function _(M,x,O){let W=1;const X=Q(M);if((X.width>O||X.height>O)&&(W=O/Math.max(X.width,X.height)),W<1)if(typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&M instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&M instanceof ImageBitmap||typeof VideoFrame<"u"&&M instanceof VideoFrame){const j=Math.floor(W*X.width),ct=Math.floor(W*X.height);f===void 0&&(f=g(j,ct));const at=x?g(j,ct):f;return at.width=j,at.height=ct,at.getContext("2d").drawImage(M,0,0,j,ct),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+X.width+"x"+X.height+") to ("+j+"x"+ct+")."),at}else return"data"in M&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+X.width+"x"+X.height+")."),M;return M}function m(M){return M.generateMipmaps}function p(M){i.generateMipmap(M)}function b(M){return M.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:M.isWebGL3DRenderTarget?i.TEXTURE_3D:M.isWebGLArrayRenderTarget||M.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function E(M,x,O,W,X=!1){if(M!==null){if(i[M]!==void 0)return i[M];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+M+"'")}let j=x;if(x===i.RED&&(O===i.FLOAT&&(j=i.R32F),O===i.HALF_FLOAT&&(j=i.R16F),O===i.UNSIGNED_BYTE&&(j=i.R8)),x===i.RED_INTEGER&&(O===i.UNSIGNED_BYTE&&(j=i.R8UI),O===i.UNSIGNED_SHORT&&(j=i.R16UI),O===i.UNSIGNED_INT&&(j=i.R32UI),O===i.BYTE&&(j=i.R8I),O===i.SHORT&&(j=i.R16I),O===i.INT&&(j=i.R32I)),x===i.RG&&(O===i.FLOAT&&(j=i.RG32F),O===i.HALF_FLOAT&&(j=i.RG16F),O===i.UNSIGNED_BYTE&&(j=i.RG8)),x===i.RG_INTEGER&&(O===i.UNSIGNED_BYTE&&(j=i.RG8UI),O===i.UNSIGNED_SHORT&&(j=i.RG16UI),O===i.UNSIGNED_INT&&(j=i.RG32UI),O===i.BYTE&&(j=i.RG8I),O===i.SHORT&&(j=i.RG16I),O===i.INT&&(j=i.RG32I)),x===i.RGB_INTEGER&&(O===i.UNSIGNED_BYTE&&(j=i.RGB8UI),O===i.UNSIGNED_SHORT&&(j=i.RGB16UI),O===i.UNSIGNED_INT&&(j=i.RGB32UI),O===i.BYTE&&(j=i.RGB8I),O===i.SHORT&&(j=i.RGB16I),O===i.INT&&(j=i.RGB32I)),x===i.RGBA_INTEGER&&(O===i.UNSIGNED_BYTE&&(j=i.RGBA8UI),O===i.UNSIGNED_SHORT&&(j=i.RGBA16UI),O===i.UNSIGNED_INT&&(j=i.RGBA32UI),O===i.BYTE&&(j=i.RGBA8I),O===i.SHORT&&(j=i.RGBA16I),O===i.INT&&(j=i.RGBA32I)),x===i.RGB&&O===i.UNSIGNED_INT_5_9_9_9_REV&&(j=i.RGB9_E5),x===i.RGBA){const ct=X?ru:fe.getTransfer(W);O===i.FLOAT&&(j=i.RGBA32F),O===i.HALF_FLOAT&&(j=i.RGBA16F),O===i.UNSIGNED_BYTE&&(j=ct===Me?i.SRGB8_ALPHA8:i.RGBA8),O===i.UNSIGNED_SHORT_4_4_4_4&&(j=i.RGBA4),O===i.UNSIGNED_SHORT_5_5_5_1&&(j=i.RGB5_A1)}return(j===i.R16F||j===i.R32F||j===i.RG16F||j===i.RG32F||j===i.RGBA16F||j===i.RGBA32F)&&t.get("EXT_color_buffer_float"),j}function v(M,x){let O;return M?x===null||x===ks||x===qo?O=i.DEPTH24_STENCIL8:x===gr?O=i.DEPTH32F_STENCIL8:x===il&&(O=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===ks||x===qo?O=i.DEPTH_COMPONENT24:x===gr?O=i.DEPTH_COMPONENT32F:x===il&&(O=i.DEPTH_COMPONENT16),O}function R(M,x){return m(M)===!0||M.isFramebufferTexture&&M.minFilter!==Ni&&M.minFilter!==qi?Math.log2(Math.max(x.width,x.height))+1:M.mipmaps!==void 0&&M.mipmaps.length>0?M.mipmaps.length:M.isCompressedTexture&&Array.isArray(M.image)?x.mipmaps.length:1}function C(M){const x=M.target;x.removeEventListener("dispose",C),L(x),x.isVideoTexture&&u.delete(x)}function A(M){const x=M.target;x.removeEventListener("dispose",A),y(x)}function L(M){const x=n.get(M);if(x.__webglInit===void 0)return;const O=M.source,W=d.get(O);if(W){const X=W[x.__cacheKey];X.usedTimes--,X.usedTimes===0&&S(M),Object.keys(W).length===0&&d.delete(O)}n.remove(M)}function S(M){const x=n.get(M);i.deleteTexture(x.__webglTexture);const O=M.source,W=d.get(O);delete W[x.__cacheKey],o.memory.textures--}function y(M){const x=n.get(M);if(M.depthTexture&&(M.depthTexture.dispose(),n.remove(M.depthTexture)),M.isWebGLCubeRenderTarget)for(let W=0;W<6;W++){if(Array.isArray(x.__webglFramebuffer[W]))for(let X=0;X<x.__webglFramebuffer[W].length;X++)i.deleteFramebuffer(x.__webglFramebuffer[W][X]);else i.deleteFramebuffer(x.__webglFramebuffer[W]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[W])}else{if(Array.isArray(x.__webglFramebuffer))for(let W=0;W<x.__webglFramebuffer.length;W++)i.deleteFramebuffer(x.__webglFramebuffer[W]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let W=0;W<x.__webglColorRenderbuffer.length;W++)x.__webglColorRenderbuffer[W]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[W]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const O=M.textures;for(let W=0,X=O.length;W<X;W++){const j=n.get(O[W]);j.__webglTexture&&(i.deleteTexture(j.__webglTexture),o.memory.textures--),n.remove(O[W])}n.remove(M)}let I=0;function B(){I=0}function G(){const M=I;return M>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+M+" texture units while this GPU supports only "+r.maxTextures),I+=1,M}function Y(M){const x=[];return x.push(M.wrapS),x.push(M.wrapT),x.push(M.wrapR||0),x.push(M.magFilter),x.push(M.minFilter),x.push(M.anisotropy),x.push(M.internalFormat),x.push(M.format),x.push(M.type),x.push(M.generateMipmaps),x.push(M.premultiplyAlpha),x.push(M.flipY),x.push(M.unpackAlignment),x.push(M.colorSpace),x.join()}function et(M,x){const O=n.get(M);if(M.isVideoTexture&&nt(M),M.isRenderTargetTexture===!1&&M.version>0&&O.__version!==M.version){const W=M.image;if(W===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(W.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{it(O,M,x);return}}e.bindTexture(i.TEXTURE_2D,O.__webglTexture,i.TEXTURE0+x)}function V(M,x){const O=n.get(M);if(M.version>0&&O.__version!==M.version){it(O,M,x);return}e.bindTexture(i.TEXTURE_2D_ARRAY,O.__webglTexture,i.TEXTURE0+x)}function K(M,x){const O=n.get(M);if(M.version>0&&O.__version!==M.version){it(O,M,x);return}e.bindTexture(i.TEXTURE_3D,O.__webglTexture,i.TEXTURE0+x)}function k(M,x){const O=n.get(M);if(M.version>0&&O.__version!==M.version){ut(O,M,x);return}e.bindTexture(i.TEXTURE_CUBE_MAP,O.__webglTexture,i.TEXTURE0+x)}const lt={[sh]:i.REPEAT,[Ts]:i.CLAMP_TO_EDGE,[oh]:i.MIRRORED_REPEAT},N={[Ni]:i.NEAREST,[ZS]:i.NEAREST_MIPMAP_NEAREST,[Pl]:i.NEAREST_MIPMAP_LINEAR,[qi]:i.LINEAR,[Iu]:i.LINEAR_MIPMAP_NEAREST,[ws]:i.LINEAR_MIPMAP_LINEAR},_t={[eb]:i.NEVER,[ab]:i.ALWAYS,[nb]:i.LESS,[V0]:i.LEQUAL,[ib]:i.EQUAL,[ob]:i.GEQUAL,[rb]:i.GREATER,[sb]:i.NOTEQUAL};function Dt(M,x){if(x.type===gr&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===qi||x.magFilter===Iu||x.magFilter===Pl||x.magFilter===ws||x.minFilter===qi||x.minFilter===Iu||x.minFilter===Pl||x.minFilter===ws)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(M,i.TEXTURE_WRAP_S,lt[x.wrapS]),i.texParameteri(M,i.TEXTURE_WRAP_T,lt[x.wrapT]),(M===i.TEXTURE_3D||M===i.TEXTURE_2D_ARRAY)&&i.texParameteri(M,i.TEXTURE_WRAP_R,lt[x.wrapR]),i.texParameteri(M,i.TEXTURE_MAG_FILTER,N[x.magFilter]),i.texParameteri(M,i.TEXTURE_MIN_FILTER,N[x.minFilter]),x.compareFunction&&(i.texParameteri(M,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(M,i.TEXTURE_COMPARE_FUNC,_t[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Ni||x.minFilter!==Pl&&x.minFilter!==ws||x.type===gr&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){const O=t.get("EXT_texture_filter_anisotropic");i.texParameterf(M,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,r.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function Kt(M,x){let O=!1;M.__webglInit===void 0&&(M.__webglInit=!0,x.addEventListener("dispose",C));const W=x.source;let X=d.get(W);X===void 0&&(X={},d.set(W,X));const j=Y(x);if(j!==M.__cacheKey){X[j]===void 0&&(X[j]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,O=!0),X[j].usedTimes++;const ct=X[M.__cacheKey];ct!==void 0&&(X[M.__cacheKey].usedTimes--,ct.usedTimes===0&&S(x)),M.__cacheKey=j,M.__webglTexture=X[j].texture}return O}function it(M,x,O){let W=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(W=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(W=i.TEXTURE_3D);const X=Kt(M,x),j=x.source;e.bindTexture(W,M.__webglTexture,i.TEXTURE0+O);const ct=n.get(j);if(j.version!==ct.__version||X===!0){e.activeTexture(i.TEXTURE0+O);const at=fe.getPrimaries(fe.workingColorSpace),pt=x.colorSpace===kr?null:fe.getPrimaries(x.colorSpace),Ft=x.colorSpace===kr||at===pt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ft);let ft=_(x.image,!1,r.maxTextureSize);ft=ot(x,ft);const dt=s.convert(x.format,x.colorSpace),Ot=s.convert(x.type);let Bt=E(x.internalFormat,dt,Ot,x.colorSpace,x.isVideoTexture);Dt(W,x);let xt;const Ht=x.mipmaps,Vt=x.isVideoTexture!==!0,ce=ct.__version===void 0||X===!0,F=j.dataReady,St=R(x,ft);if(x.isDepthTexture)Bt=v(x.format===$o,x.type),ce&&(Vt?e.texStorage2D(i.TEXTURE_2D,1,Bt,ft.width,ft.height):e.texImage2D(i.TEXTURE_2D,0,Bt,ft.width,ft.height,0,dt,Ot,null));else if(x.isDataTexture)if(Ht.length>0){Vt&&ce&&e.texStorage2D(i.TEXTURE_2D,St,Bt,Ht[0].width,Ht[0].height);for(let tt=0,st=Ht.length;tt<st;tt++)xt=Ht[tt],Vt?F&&e.texSubImage2D(i.TEXTURE_2D,tt,0,0,xt.width,xt.height,dt,Ot,xt.data):e.texImage2D(i.TEXTURE_2D,tt,Bt,xt.width,xt.height,0,dt,Ot,xt.data);x.generateMipmaps=!1}else Vt?(ce&&e.texStorage2D(i.TEXTURE_2D,St,Bt,ft.width,ft.height),F&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ft.width,ft.height,dt,Ot,ft.data)):e.texImage2D(i.TEXTURE_2D,0,Bt,ft.width,ft.height,0,dt,Ot,ft.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Vt&&ce&&e.texStorage3D(i.TEXTURE_2D_ARRAY,St,Bt,Ht[0].width,Ht[0].height,ft.depth);for(let tt=0,st=Ht.length;tt<st;tt++)if(xt=Ht[tt],x.format!==Ii)if(dt!==null)if(Vt){if(F)if(x.layerUpdates.size>0){const yt=qm(xt.width,xt.height,x.format,x.type);for(const bt of x.layerUpdates){const Gt=xt.data.subarray(bt*yt/xt.data.BYTES_PER_ELEMENT,(bt+1)*yt/xt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,tt,0,0,bt,xt.width,xt.height,1,dt,Gt)}x.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,tt,0,0,0,xt.width,xt.height,ft.depth,dt,xt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,tt,Bt,xt.width,xt.height,ft.depth,0,xt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Vt?F&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,tt,0,0,0,xt.width,xt.height,ft.depth,dt,Ot,xt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,tt,Bt,xt.width,xt.height,ft.depth,0,dt,Ot,xt.data)}else{Vt&&ce&&e.texStorage2D(i.TEXTURE_2D,St,Bt,Ht[0].width,Ht[0].height);for(let tt=0,st=Ht.length;tt<st;tt++)xt=Ht[tt],x.format!==Ii?dt!==null?Vt?F&&e.compressedTexSubImage2D(i.TEXTURE_2D,tt,0,0,xt.width,xt.height,dt,xt.data):e.compressedTexImage2D(i.TEXTURE_2D,tt,Bt,xt.width,xt.height,0,xt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Vt?F&&e.texSubImage2D(i.TEXTURE_2D,tt,0,0,xt.width,xt.height,dt,Ot,xt.data):e.texImage2D(i.TEXTURE_2D,tt,Bt,xt.width,xt.height,0,dt,Ot,xt.data)}else if(x.isDataArrayTexture)if(Vt){if(ce&&e.texStorage3D(i.TEXTURE_2D_ARRAY,St,Bt,ft.width,ft.height,ft.depth),F)if(x.layerUpdates.size>0){const tt=qm(ft.width,ft.height,x.format,x.type);for(const st of x.layerUpdates){const yt=ft.data.subarray(st*tt/ft.data.BYTES_PER_ELEMENT,(st+1)*tt/ft.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,st,ft.width,ft.height,1,dt,Ot,yt)}x.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ft.width,ft.height,ft.depth,dt,Ot,ft.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Bt,ft.width,ft.height,ft.depth,0,dt,Ot,ft.data);else if(x.isData3DTexture)Vt?(ce&&e.texStorage3D(i.TEXTURE_3D,St,Bt,ft.width,ft.height,ft.depth),F&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ft.width,ft.height,ft.depth,dt,Ot,ft.data)):e.texImage3D(i.TEXTURE_3D,0,Bt,ft.width,ft.height,ft.depth,0,dt,Ot,ft.data);else if(x.isFramebufferTexture){if(ce)if(Vt)e.texStorage2D(i.TEXTURE_2D,St,Bt,ft.width,ft.height);else{let tt=ft.width,st=ft.height;for(let yt=0;yt<St;yt++)e.texImage2D(i.TEXTURE_2D,yt,Bt,tt,st,0,dt,Ot,null),tt>>=1,st>>=1}}else if(Ht.length>0){if(Vt&&ce){const tt=Q(Ht[0]);e.texStorage2D(i.TEXTURE_2D,St,Bt,tt.width,tt.height)}for(let tt=0,st=Ht.length;tt<st;tt++)xt=Ht[tt],Vt?F&&e.texSubImage2D(i.TEXTURE_2D,tt,0,0,dt,Ot,xt):e.texImage2D(i.TEXTURE_2D,tt,Bt,dt,Ot,xt);x.generateMipmaps=!1}else if(Vt){if(ce){const tt=Q(ft);e.texStorage2D(i.TEXTURE_2D,St,Bt,tt.width,tt.height)}F&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,dt,Ot,ft)}else e.texImage2D(i.TEXTURE_2D,0,Bt,dt,Ot,ft);m(x)&&p(W),ct.__version=j.version,x.onUpdate&&x.onUpdate(x)}M.__version=x.version}function ut(M,x,O){if(x.image.length!==6)return;const W=Kt(M,x),X=x.source;e.bindTexture(i.TEXTURE_CUBE_MAP,M.__webglTexture,i.TEXTURE0+O);const j=n.get(X);if(X.version!==j.__version||W===!0){e.activeTexture(i.TEXTURE0+O);const ct=fe.getPrimaries(fe.workingColorSpace),at=x.colorSpace===kr?null:fe.getPrimaries(x.colorSpace),pt=x.colorSpace===kr||ct===at?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,pt);const Ft=x.isCompressedTexture||x.image[0].isCompressedTexture,ft=x.image[0]&&x.image[0].isDataTexture,dt=[];for(let st=0;st<6;st++)!Ft&&!ft?dt[st]=_(x.image[st],!0,r.maxCubemapSize):dt[st]=ft?x.image[st].image:x.image[st],dt[st]=ot(x,dt[st]);const Ot=dt[0],Bt=s.convert(x.format,x.colorSpace),xt=s.convert(x.type),Ht=E(x.internalFormat,Bt,xt,x.colorSpace),Vt=x.isVideoTexture!==!0,ce=j.__version===void 0||W===!0,F=X.dataReady;let St=R(x,Ot);Dt(i.TEXTURE_CUBE_MAP,x);let tt;if(Ft){Vt&&ce&&e.texStorage2D(i.TEXTURE_CUBE_MAP,St,Ht,Ot.width,Ot.height);for(let st=0;st<6;st++){tt=dt[st].mipmaps;for(let yt=0;yt<tt.length;yt++){const bt=tt[yt];x.format!==Ii?Bt!==null?Vt?F&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,yt,0,0,bt.width,bt.height,Bt,bt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,yt,Ht,bt.width,bt.height,0,bt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Vt?F&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,yt,0,0,bt.width,bt.height,Bt,xt,bt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,yt,Ht,bt.width,bt.height,0,Bt,xt,bt.data)}}}else{if(tt=x.mipmaps,Vt&&ce){tt.length>0&&St++;const st=Q(dt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,St,Ht,st.width,st.height)}for(let st=0;st<6;st++)if(ft){Vt?F&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,0,0,dt[st].width,dt[st].height,Bt,xt,dt[st].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,Ht,dt[st].width,dt[st].height,0,Bt,xt,dt[st].data);for(let yt=0;yt<tt.length;yt++){const Gt=tt[yt].image[st].image;Vt?F&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,yt+1,0,0,Gt.width,Gt.height,Bt,xt,Gt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,yt+1,Ht,Gt.width,Gt.height,0,Bt,xt,Gt.data)}}else{Vt?F&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,0,0,Bt,xt,dt[st]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,0,Ht,Bt,xt,dt[st]);for(let yt=0;yt<tt.length;yt++){const bt=tt[yt];Vt?F&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,yt+1,0,0,Bt,xt,bt.image[st]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+st,yt+1,Ht,Bt,xt,bt.image[st])}}}m(x)&&p(i.TEXTURE_CUBE_MAP),j.__version=X.version,x.onUpdate&&x.onUpdate(x)}M.__version=x.version}function Mt(M,x,O,W,X,j){const ct=s.convert(O.format,O.colorSpace),at=s.convert(O.type),pt=E(O.internalFormat,ct,at,O.colorSpace),Ft=n.get(x),ft=n.get(O);if(ft.__renderTarget=x,!Ft.__hasExternalTextures){const dt=Math.max(1,x.width>>j),Ot=Math.max(1,x.height>>j);X===i.TEXTURE_3D||X===i.TEXTURE_2D_ARRAY?e.texImage3D(X,j,pt,dt,Ot,x.depth,0,ct,at,null):e.texImage2D(X,j,pt,dt,Ot,0,ct,at,null)}e.bindFramebuffer(i.FRAMEBUFFER,M),D(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,W,X,ft.__webglTexture,0,J(x)):(X===i.TEXTURE_2D||X>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&X<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,W,X,ft.__webglTexture,j),e.bindFramebuffer(i.FRAMEBUFFER,null)}function ht(M,x,O){if(i.bindRenderbuffer(i.RENDERBUFFER,M),x.depthBuffer){const W=x.depthTexture,X=W&&W.isDepthTexture?W.type:null,j=v(x.stencilBuffer,X),ct=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,at=J(x);D(x)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,at,j,x.width,x.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,at,j,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,j,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ct,i.RENDERBUFFER,M)}else{const W=x.textures;for(let X=0;X<W.length;X++){const j=W[X],ct=s.convert(j.format,j.colorSpace),at=s.convert(j.type),pt=E(j.internalFormat,ct,at,j.colorSpace),Ft=J(x);O&&D(x)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ft,pt,x.width,x.height):D(x)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ft,pt,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,pt,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Rt(M,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,M),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const W=n.get(x.depthTexture);W.__renderTarget=x,(!W.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),et(x.depthTexture,0);const X=W.__webglTexture,j=J(x);if(x.depthTexture.format===Io)D(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,X,0,j):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,X,0);else if(x.depthTexture.format===$o)D(x)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,X,0,j):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,X,0);else throw new Error("Unknown depthTexture format")}function It(M){const x=n.get(M),O=M.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==M.depthTexture){const W=M.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),W){const X=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,W.removeEventListener("dispose",X)};W.addEventListener("dispose",X),x.__depthDisposeCallback=X}x.__boundDepthTexture=W}if(M.depthTexture&&!x.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");Rt(x.__webglFramebuffer,M)}else if(O){x.__webglDepthbuffer=[];for(let W=0;W<6;W++)if(e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[W]),x.__webglDepthbuffer[W]===void 0)x.__webglDepthbuffer[W]=i.createRenderbuffer(),ht(x.__webglDepthbuffer[W],M,!1);else{const X=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,j=x.__webglDepthbuffer[W];i.bindRenderbuffer(i.RENDERBUFFER,j),i.framebufferRenderbuffer(i.FRAMEBUFFER,X,i.RENDERBUFFER,j)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),ht(x.__webglDepthbuffer,M,!1);else{const W=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,X),i.framebufferRenderbuffer(i.FRAMEBUFFER,W,i.RENDERBUFFER,X)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function kt(M,x,O){const W=n.get(M);x!==void 0&&Mt(W.__webglFramebuffer,M,M.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),O!==void 0&&It(M)}function te(M){const x=M.texture,O=n.get(M),W=n.get(x);M.addEventListener("dispose",A);const X=M.textures,j=M.isWebGLCubeRenderTarget===!0,ct=X.length>1;if(ct||(W.__webglTexture===void 0&&(W.__webglTexture=i.createTexture()),W.__version=x.version,o.memory.textures++),j){O.__webglFramebuffer=[];for(let at=0;at<6;at++)if(x.mipmaps&&x.mipmaps.length>0){O.__webglFramebuffer[at]=[];for(let pt=0;pt<x.mipmaps.length;pt++)O.__webglFramebuffer[at][pt]=i.createFramebuffer()}else O.__webglFramebuffer[at]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){O.__webglFramebuffer=[];for(let at=0;at<x.mipmaps.length;at++)O.__webglFramebuffer[at]=i.createFramebuffer()}else O.__webglFramebuffer=i.createFramebuffer();if(ct)for(let at=0,pt=X.length;at<pt;at++){const Ft=n.get(X[at]);Ft.__webglTexture===void 0&&(Ft.__webglTexture=i.createTexture(),o.memory.textures++)}if(M.samples>0&&D(M)===!1){O.__webglMultisampledFramebuffer=i.createFramebuffer(),O.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let at=0;at<X.length;at++){const pt=X[at];O.__webglColorRenderbuffer[at]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,O.__webglColorRenderbuffer[at]);const Ft=s.convert(pt.format,pt.colorSpace),ft=s.convert(pt.type),dt=E(pt.internalFormat,Ft,ft,pt.colorSpace,M.isXRRenderTarget===!0),Ot=J(M);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ot,dt,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+at,i.RENDERBUFFER,O.__webglColorRenderbuffer[at])}i.bindRenderbuffer(i.RENDERBUFFER,null),M.depthBuffer&&(O.__webglDepthRenderbuffer=i.createRenderbuffer(),ht(O.__webglDepthRenderbuffer,M,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(j){e.bindTexture(i.TEXTURE_CUBE_MAP,W.__webglTexture),Dt(i.TEXTURE_CUBE_MAP,x);for(let at=0;at<6;at++)if(x.mipmaps&&x.mipmaps.length>0)for(let pt=0;pt<x.mipmaps.length;pt++)Mt(O.__webglFramebuffer[at][pt],M,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+at,pt);else Mt(O.__webglFramebuffer[at],M,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+at,0);m(x)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ct){for(let at=0,pt=X.length;at<pt;at++){const Ft=X[at],ft=n.get(Ft);e.bindTexture(i.TEXTURE_2D,ft.__webglTexture),Dt(i.TEXTURE_2D,Ft),Mt(O.__webglFramebuffer,M,Ft,i.COLOR_ATTACHMENT0+at,i.TEXTURE_2D,0),m(Ft)&&p(i.TEXTURE_2D)}e.unbindTexture()}else{let at=i.TEXTURE_2D;if((M.isWebGL3DRenderTarget||M.isWebGLArrayRenderTarget)&&(at=M.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(at,W.__webglTexture),Dt(at,x),x.mipmaps&&x.mipmaps.length>0)for(let pt=0;pt<x.mipmaps.length;pt++)Mt(O.__webglFramebuffer[pt],M,x,i.COLOR_ATTACHMENT0,at,pt);else Mt(O.__webglFramebuffer,M,x,i.COLOR_ATTACHMENT0,at,0);m(x)&&p(at),e.unbindTexture()}M.depthBuffer&&It(M)}function P(M){const x=M.textures;for(let O=0,W=x.length;O<W;O++){const X=x[O];if(m(X)){const j=b(M),ct=n.get(X).__webglTexture;e.bindTexture(j,ct),p(j),e.unbindTexture()}}}const U=[],w=[];function rt(M){if(M.samples>0){if(D(M)===!1){const x=M.textures,O=M.width,W=M.height;let X=i.COLOR_BUFFER_BIT;const j=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ct=n.get(M),at=x.length>1;if(at)for(let pt=0;pt<x.length;pt++)e.bindFramebuffer(i.FRAMEBUFFER,ct.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,ct.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+pt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,ct.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ct.__webglFramebuffer);for(let pt=0;pt<x.length;pt++){if(M.resolveDepthBuffer&&(M.depthBuffer&&(X|=i.DEPTH_BUFFER_BIT),M.stencilBuffer&&M.resolveStencilBuffer&&(X|=i.STENCIL_BUFFER_BIT)),at){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ct.__webglColorRenderbuffer[pt]);const Ft=n.get(x[pt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Ft,0)}i.blitFramebuffer(0,0,O,W,0,0,O,W,X,i.NEAREST),l===!0&&(U.length=0,w.length=0,U.push(i.COLOR_ATTACHMENT0+pt),M.depthBuffer&&M.resolveDepthBuffer===!1&&(U.push(j),w.push(j),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,w)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,U))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),at)for(let pt=0;pt<x.length;pt++){e.bindFramebuffer(i.FRAMEBUFFER,ct.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pt,i.RENDERBUFFER,ct.__webglColorRenderbuffer[pt]);const Ft=n.get(x[pt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,ct.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+pt,i.TEXTURE_2D,Ft,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ct.__webglMultisampledFramebuffer)}else if(M.depthBuffer&&M.resolveDepthBuffer===!1&&l){const x=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function J(M){return Math.min(r.maxSamples,M.samples)}function D(M){const x=n.get(M);return M.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function nt(M){const x=o.render.frame;u.get(M)!==x&&(u.set(M,x),M.update())}function ot(M,x){const O=M.colorSpace,W=M.format,X=M.type;return M.isCompressedTexture===!0||M.isVideoTexture===!0||O!==Zo&&O!==kr&&(fe.getTransfer(O)===Me?(W!==Ii||X!==Tr)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),x}function Q(M){return typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement?(c.width=M.naturalWidth||M.width,c.height=M.naturalHeight||M.height):typeof VideoFrame<"u"&&M instanceof VideoFrame?(c.width=M.displayWidth,c.height=M.displayHeight):(c.width=M.width,c.height=M.height),c}this.allocateTextureUnit=G,this.resetTextureUnits=B,this.setTexture2D=et,this.setTexture2DArray=V,this.setTexture3D=K,this.setTextureCube=k,this.rebindTextures=kt,this.setupRenderTarget=te,this.updateRenderTargetMipmap=P,this.updateMultisampleRenderTarget=rt,this.setupDepthRenderbuffer=It,this.setupFrameBufferTexture=Mt,this.useMultisampledRTT=D}function hA(i,t){function e(n,r=kr){let s;const o=fe.getTransfer(r);if(n===Tr)return i.UNSIGNED_BYTE;if(n===Dd)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ld)return i.UNSIGNED_SHORT_5_5_5_1;if(n===I0)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===D0)return i.BYTE;if(n===L0)return i.SHORT;if(n===il)return i.UNSIGNED_SHORT;if(n===Pd)return i.INT;if(n===ks)return i.UNSIGNED_INT;if(n===gr)return i.FLOAT;if(n===cl)return i.HALF_FLOAT;if(n===U0)return i.ALPHA;if(n===N0)return i.RGB;if(n===Ii)return i.RGBA;if(n===O0)return i.LUMINANCE;if(n===F0)return i.LUMINANCE_ALPHA;if(n===Io)return i.DEPTH_COMPONENT;if(n===$o)return i.DEPTH_STENCIL;if(n===B0)return i.RED;if(n===Id)return i.RED_INTEGER;if(n===z0)return i.RG;if(n===Ud)return i.RG_INTEGER;if(n===Nd)return i.RGBA_INTEGER;if(n===_c||n===gc||n===vc||n===xc)if(o===Me)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===_c)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===gc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===vc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===xc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===_c)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===gc)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===vc)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===xc)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ah||n===lh||n===ch||n===uh)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===ah)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===lh)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ch)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===uh)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===fh||n===hh||n===dh)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===fh||n===hh)return o===Me?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===dh)return o===Me?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ph||n===mh||n===_h||n===gh||n===vh||n===xh||n===yh||n===Mh||n===Sh||n===bh||n===Eh||n===Th||n===wh||n===Ah)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===ph)return o===Me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===mh)return o===Me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===_h)return o===Me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===gh)return o===Me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===vh)return o===Me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===xh)return o===Me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===yh)return o===Me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Mh)return o===Me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Sh)return o===Me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===bh)return o===Me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Eh)return o===Me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Th)return o===Me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===wh)return o===Me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ah)return o===Me?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===yc||n===Ch||n===Rh)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===yc)return o===Me?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ch)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Rh)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===k0||n===Ph||n===Dh||n===Lh)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===yc)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Ph)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Dh)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Lh)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===qo?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class dA extends li{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Zl extends pn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const pA={type:"move"};class lf{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Zl,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Zl,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Zl,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Z),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,n),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],d=u.position.distanceTo(f.position),h=.02,g=.005;c.inputState.pinching&&d>h+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=h-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=e.getPose(t.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(pA)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Zl;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const mA=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,_A=`
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

}`;class gA{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const r=new kn,s=t.properties.get(r);s.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new tr({vertexShader:mA,fragmentShader:_A,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Ei(new ou(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class vA extends Xs{constructor(t,e){super();const n=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,f=null,d=null,h=null,g=null;const _=new gA,m=e.getContextAttributes();let p=null,b=null;const E=[],v=[],R=new Qt;let C=null;const A=new li;A.viewport=new ke;const L=new li;L.viewport=new ke;const S=[A,L],y=new dA;let I=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(it){let ut=E[it];return ut===void 0&&(ut=new lf,E[it]=ut),ut.getTargetRaySpace()},this.getControllerGrip=function(it){let ut=E[it];return ut===void 0&&(ut=new lf,E[it]=ut),ut.getGripSpace()},this.getHand=function(it){let ut=E[it];return ut===void 0&&(ut=new lf,E[it]=ut),ut.getHandSpace()};function G(it){const ut=v.indexOf(it.inputSource);if(ut===-1)return;const Mt=E[ut];Mt!==void 0&&(Mt.update(it.inputSource,it.frame,c||o),Mt.dispatchEvent({type:it.type,data:it.inputSource}))}function Y(){r.removeEventListener("select",G),r.removeEventListener("selectstart",G),r.removeEventListener("selectend",G),r.removeEventListener("squeeze",G),r.removeEventListener("squeezestart",G),r.removeEventListener("squeezeend",G),r.removeEventListener("end",Y),r.removeEventListener("inputsourceschange",et);for(let it=0;it<E.length;it++){const ut=v[it];ut!==null&&(v[it]=null,E[it].disconnect(ut))}I=null,B=null,_.reset(),t.setRenderTarget(p),h=null,d=null,f=null,r=null,b=null,Kt.stop(),n.isPresenting=!1,t.setPixelRatio(C),t.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(it){s=it,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(it){a=it,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(it){c=it},this.getBaseLayer=function(){return d!==null?d:h},this.getBinding=function(){return f},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(it){if(r=it,r!==null){if(p=t.getRenderTarget(),r.addEventListener("select",G),r.addEventListener("selectstart",G),r.addEventListener("selectend",G),r.addEventListener("squeeze",G),r.addEventListener("squeezestart",G),r.addEventListener("squeezeend",G),r.addEventListener("end",Y),r.addEventListener("inputsourceschange",et),m.xrCompatible!==!0&&await e.makeXRCompatible(),C=t.getPixelRatio(),t.getSize(R),r.renderState.layers===void 0){const ut={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};h=new XRWebGLLayer(r,e,ut),r.updateRenderState({baseLayer:h}),t.setPixelRatio(1),t.setSize(h.framebufferWidth,h.framebufferHeight,!1),b=new Hs(h.framebufferWidth,h.framebufferHeight,{format:Ii,type:Tr,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let ut=null,Mt=null,ht=null;m.depth&&(ht=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ut=m.stencil?$o:Io,Mt=m.stencil?qo:ks);const Rt={colorFormat:e.RGBA8,depthFormat:ht,scaleFactor:s};f=new XRWebGLBinding(r,e),d=f.createProjectionLayer(Rt),r.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),b=new Hs(d.textureWidth,d.textureHeight,{format:Ii,type:Tr,depthTexture:new nv(d.textureWidth,d.textureHeight,Mt,void 0,void 0,void 0,void 0,void 0,void 0,ut),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),Kt.setContext(r),Kt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function et(it){for(let ut=0;ut<it.removed.length;ut++){const Mt=it.removed[ut],ht=v.indexOf(Mt);ht>=0&&(v[ht]=null,E[ht].disconnect(Mt))}for(let ut=0;ut<it.added.length;ut++){const Mt=it.added[ut];let ht=v.indexOf(Mt);if(ht===-1){for(let It=0;It<E.length;It++)if(It>=v.length){v.push(Mt),ht=It;break}else if(v[It]===null){v[It]=Mt,ht=It;break}if(ht===-1)break}const Rt=E[ht];Rt&&Rt.connect(Mt)}}const V=new Z,K=new Z;function k(it,ut,Mt){V.setFromMatrixPosition(ut.matrixWorld),K.setFromMatrixPosition(Mt.matrixWorld);const ht=V.distanceTo(K),Rt=ut.projectionMatrix.elements,It=Mt.projectionMatrix.elements,kt=Rt[14]/(Rt[10]-1),te=Rt[14]/(Rt[10]+1),P=(Rt[9]+1)/Rt[5],U=(Rt[9]-1)/Rt[5],w=(Rt[8]-1)/Rt[0],rt=(It[8]+1)/It[0],J=kt*w,D=kt*rt,nt=ht/(-w+rt),ot=nt*-w;if(ut.matrixWorld.decompose(it.position,it.quaternion,it.scale),it.translateX(ot),it.translateZ(nt),it.matrixWorld.compose(it.position,it.quaternion,it.scale),it.matrixWorldInverse.copy(it.matrixWorld).invert(),Rt[10]===-1)it.projectionMatrix.copy(ut.projectionMatrix),it.projectionMatrixInverse.copy(ut.projectionMatrixInverse);else{const Q=kt+nt,M=te+nt,x=J-ot,O=D+(ht-ot),W=P*te/M*Q,X=U*te/M*Q;it.projectionMatrix.makePerspective(x,O,W,X,Q,M),it.projectionMatrixInverse.copy(it.projectionMatrix).invert()}}function lt(it,ut){ut===null?it.matrixWorld.copy(it.matrix):it.matrixWorld.multiplyMatrices(ut.matrixWorld,it.matrix),it.matrixWorldInverse.copy(it.matrixWorld).invert()}this.updateCamera=function(it){if(r===null)return;let ut=it.near,Mt=it.far;_.texture!==null&&(_.depthNear>0&&(ut=_.depthNear),_.depthFar>0&&(Mt=_.depthFar)),y.near=L.near=A.near=ut,y.far=L.far=A.far=Mt,(I!==y.near||B!==y.far)&&(r.updateRenderState({depthNear:y.near,depthFar:y.far}),I=y.near,B=y.far),A.layers.mask=it.layers.mask|2,L.layers.mask=it.layers.mask|4,y.layers.mask=A.layers.mask|L.layers.mask;const ht=it.parent,Rt=y.cameras;lt(y,ht);for(let It=0;It<Rt.length;It++)lt(Rt[It],ht);Rt.length===2?k(y,A,L):y.projectionMatrix.copy(A.projectionMatrix),N(it,y,ht)};function N(it,ut,Mt){Mt===null?it.matrix.copy(ut.matrixWorld):(it.matrix.copy(Mt.matrixWorld),it.matrix.invert(),it.matrix.multiply(ut.matrixWorld)),it.matrix.decompose(it.position,it.quaternion,it.scale),it.updateMatrixWorld(!0),it.projectionMatrix.copy(ut.projectionMatrix),it.projectionMatrixInverse.copy(ut.projectionMatrixInverse),it.isPerspectiveCamera&&(it.fov=Ih*2*Math.atan(1/it.projectionMatrix.elements[5]),it.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(d===null&&h===null))return l},this.setFoveation=function(it){l=it,d!==null&&(d.fixedFoveation=it),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=it)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(y)};let _t=null;function Dt(it,ut){if(u=ut.getViewerPose(c||o),g=ut,u!==null){const Mt=u.views;h!==null&&(t.setRenderTargetFramebuffer(b,h.framebuffer),t.setRenderTarget(b));let ht=!1;Mt.length!==y.cameras.length&&(y.cameras.length=0,ht=!0);for(let It=0;It<Mt.length;It++){const kt=Mt[It];let te=null;if(h!==null)te=h.getViewport(kt);else{const U=f.getViewSubImage(d,kt);te=U.viewport,It===0&&(t.setRenderTargetTextures(b,U.colorTexture,d.ignoreDepthValues?void 0:U.depthStencilTexture),t.setRenderTarget(b))}let P=S[It];P===void 0&&(P=new li,P.layers.enable(It),P.viewport=new ke,S[It]=P),P.matrix.fromArray(kt.transform.matrix),P.matrix.decompose(P.position,P.quaternion,P.scale),P.projectionMatrix.fromArray(kt.projectionMatrix),P.projectionMatrixInverse.copy(P.projectionMatrix).invert(),P.viewport.set(te.x,te.y,te.width,te.height),It===0&&(y.matrix.copy(P.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),ht===!0&&y.cameras.push(P)}const Rt=r.enabledFeatures;if(Rt&&Rt.includes("depth-sensing")){const It=f.getDepthInformation(Mt[0]);It&&It.isValid&&It.texture&&_.init(t,It,r.renderState)}}for(let Mt=0;Mt<E.length;Mt++){const ht=v[Mt],Rt=E[Mt];ht!==null&&Rt!==void 0&&Rt.update(ht,ut,c||o)}_t&&_t(it,ut),ut.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ut}),g=null}const Kt=new tv;Kt.setAnimationLoop(Dt),this.setAnimationLoop=function(it){_t=it},this.dispose=function(){}}}const ms=new Qi,xA=new Be;function yA(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Z0(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,b,E,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),f(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p)):p.isMeshStandardMaterial?(s(m,p),d(m,p),p.isMeshPhysicalMaterial&&h(m,p,v)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),_(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,b,E):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===zn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===zn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const b=t.get(p),E=b.envMap,v=b.envMapRotation;E&&(m.envMap.value=E,ms.copy(v),ms.x*=-1,ms.y*=-1,ms.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(ms.y*=-1,ms.z*=-1),m.envMapRotation.value.setFromMatrix4(xA.makeRotationFromEuler(ms)),m.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,b,E){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*b,m.scale.value=E*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function f(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function h(m,p,b){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===zn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const b=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function MA(i,t,e,n){let r={},s={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,E){const v=E.program;n.uniformBlockBinding(b,v)}function c(b,E){let v=r[b.id];v===void 0&&(g(b),v=u(b),r[b.id]=v,b.addEventListener("dispose",m));const R=E.program;n.updateUBOMapping(b,R);const C=t.render.frame;s[b.id]!==C&&(d(b),s[b.id]=C)}function u(b){const E=f();b.__bindingPointIndex=E;const v=i.createBuffer(),R=b.__size,C=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,R,C),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,v),v}function f(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(b){const E=r[b.id],v=b.uniforms,R=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let C=0,A=v.length;C<A;C++){const L=Array.isArray(v[C])?v[C]:[v[C]];for(let S=0,y=L.length;S<y;S++){const I=L[S];if(h(I,C,S,R)===!0){const B=I.__offset,G=Array.isArray(I.value)?I.value:[I.value];let Y=0;for(let et=0;et<G.length;et++){const V=G[et],K=_(V);typeof V=="number"||typeof V=="boolean"?(I.__data[0]=V,i.bufferSubData(i.UNIFORM_BUFFER,B+Y,I.__data)):V.isMatrix3?(I.__data[0]=V.elements[0],I.__data[1]=V.elements[1],I.__data[2]=V.elements[2],I.__data[3]=0,I.__data[4]=V.elements[3],I.__data[5]=V.elements[4],I.__data[6]=V.elements[5],I.__data[7]=0,I.__data[8]=V.elements[6],I.__data[9]=V.elements[7],I.__data[10]=V.elements[8],I.__data[11]=0):(V.toArray(I.__data,Y),Y+=K.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,B,I.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function h(b,E,v,R){const C=b.value,A=E+"_"+v;if(R[A]===void 0)return typeof C=="number"||typeof C=="boolean"?R[A]=C:R[A]=C.clone(),!0;{const L=R[A];if(typeof C=="number"||typeof C=="boolean"){if(L!==C)return R[A]=C,!0}else if(L.equals(C)===!1)return L.copy(C),!0}return!1}function g(b){const E=b.uniforms;let v=0;const R=16;for(let A=0,L=E.length;A<L;A++){const S=Array.isArray(E[A])?E[A]:[E[A]];for(let y=0,I=S.length;y<I;y++){const B=S[y],G=Array.isArray(B.value)?B.value:[B.value];for(let Y=0,et=G.length;Y<et;Y++){const V=G[Y],K=_(V),k=v%R,lt=k%K.boundary,N=k+lt;v+=lt,N!==0&&R-N<K.storage&&(v+=R-N),B.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=v,v+=K.storage}}}const C=v%R;return C>0&&(v+=R-C),b.__size=v,b.__cache={},this}function _(b){const E={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(E.boundary=4,E.storage=4):b.isVector2?(E.boundary=8,E.storage=8):b.isVector3||b.isColor?(E.boundary=16,E.storage=12):b.isVector4?(E.boundary=16,E.storage=16):b.isMatrix3?(E.boundary=48,E.storage=48):b.isMatrix4?(E.boundary=64,E.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),E}function m(b){const E=b.target;E.removeEventListener("dispose",m);const v=o.indexOf(E.__bindingPointIndex);o.splice(v,1),i.deleteBuffer(r[E.id]),delete r[E.id],delete s[E.id]}function p(){for(const b in r)i.deleteBuffer(r[b]);o=[],r={},s={}}return{bind:l,update:c,dispose:p}}class av{constructor(t={}){const{canvas:e=ub(),context:n=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let h;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=n.getContextAttributes().alpha}else h=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const b=[],E=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=oi,this.toneMapping=Zr,this.toneMappingExposure=1;const v=this;let R=!1,C=0,A=0,L=null,S=-1,y=null;const I=new ke,B=new ke;let G=null;const Y=new ae(0);let et=0,V=e.width,K=e.height,k=1,lt=null,N=null;const _t=new ke(0,0,V,K),Dt=new ke(0,0,V,K);let Kt=!1;const it=new Fd;let ut=!1,Mt=!1;const ht=new Be,Rt=new Be,It=new Z,kt=new ke,te={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let P=!1;function U(){return L===null?k:1}let w=n;function rt(T,z){return e.getContext(T,z)}try{const T={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Cd}`),e.addEventListener("webglcontextlost",st,!1),e.addEventListener("webglcontextrestored",yt,!1),e.addEventListener("webglcontextcreationerror",bt,!1),w===null){const z="webgl2";if(w=rt(z,T),w===null)throw rt(z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let J,D,nt,ot,Q,M,x,O,W,X,j,ct,at,pt,Ft,ft,dt,Ot,Bt,xt,Ht,Vt,ce,F;function St(){J=new A1(w),J.init(),Vt=new hA(w,J),D=new M1(w,J,t,Vt),nt=new cA(w,J),D.reverseDepthBuffer&&d&&nt.buffers.depth.setReversed(!0),ot=new P1(w),Q=new $w,M=new fA(w,J,nt,Q,D,Vt,ot),x=new b1(v),O=new w1(v),W=new Fb(w),ce=new x1(w,W),X=new C1(w,W,ot,ce),j=new L1(w,X,W,ot),Bt=new D1(w,D,M),ft=new S1(Q),ct=new qw(v,x,O,J,D,ce,ft),at=new yA(v,Q),pt=new Kw,Ft=new nA(J),Ot=new v1(v,x,O,nt,j,h,l),dt=new aA(v,j,D),F=new MA(w,ot,D,nt),xt=new y1(w,J,ot),Ht=new R1(w,J,ot),ot.programs=ct.programs,v.capabilities=D,v.extensions=J,v.properties=Q,v.renderLists=pt,v.shadowMap=dt,v.state=nt,v.info=ot}St();const tt=new vA(v,w);this.xr=tt,this.getContext=function(){return w},this.getContextAttributes=function(){return w.getContextAttributes()},this.forceContextLoss=function(){const T=J.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=J.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return k},this.setPixelRatio=function(T){T!==void 0&&(k=T,this.setSize(V,K,!1))},this.getSize=function(T){return T.set(V,K)},this.setSize=function(T,z,q=!0){if(tt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}V=T,K=z,e.width=Math.floor(T*k),e.height=Math.floor(z*k),q===!0&&(e.style.width=T+"px",e.style.height=z+"px"),this.setViewport(0,0,T,z)},this.getDrawingBufferSize=function(T){return T.set(V*k,K*k).floor()},this.setDrawingBufferSize=function(T,z,q){V=T,K=z,k=q,e.width=Math.floor(T*q),e.height=Math.floor(z*q),this.setViewport(0,0,T,z)},this.getCurrentViewport=function(T){return T.copy(I)},this.getViewport=function(T){return T.copy(_t)},this.setViewport=function(T,z,q,$){T.isVector4?_t.set(T.x,T.y,T.z,T.w):_t.set(T,z,q,$),nt.viewport(I.copy(_t).multiplyScalar(k).round())},this.getScissor=function(T){return T.copy(Dt)},this.setScissor=function(T,z,q,$){T.isVector4?Dt.set(T.x,T.y,T.z,T.w):Dt.set(T,z,q,$),nt.scissor(B.copy(Dt).multiplyScalar(k).round())},this.getScissorTest=function(){return Kt},this.setScissorTest=function(T){nt.setScissorTest(Kt=T)},this.setOpaqueSort=function(T){lt=T},this.setTransparentSort=function(T){N=T},this.getClearColor=function(T){return T.copy(Ot.getClearColor())},this.setClearColor=function(){Ot.setClearColor.apply(Ot,arguments)},this.getClearAlpha=function(){return Ot.getClearAlpha()},this.setClearAlpha=function(){Ot.setClearAlpha.apply(Ot,arguments)},this.clear=function(T=!0,z=!0,q=!0){let $=0;if(T){let H=!1;if(L!==null){const mt=L.texture.format;H=mt===Nd||mt===Ud||mt===Id}if(H){const mt=L.texture.type,gt=mt===Tr||mt===ks||mt===il||mt===qo||mt===Dd||mt===Ld,Et=Ot.getClearColor(),Ct=Ot.getClearAlpha(),Wt=Et.r,qt=Et.g,Lt=Et.b;gt?(g[0]=Wt,g[1]=qt,g[2]=Lt,g[3]=Ct,w.clearBufferuiv(w.COLOR,0,g)):(_[0]=Wt,_[1]=qt,_[2]=Lt,_[3]=Ct,w.clearBufferiv(w.COLOR,0,_))}else $|=w.COLOR_BUFFER_BIT}z&&($|=w.DEPTH_BUFFER_BIT),q&&($|=w.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),w.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",st,!1),e.removeEventListener("webglcontextrestored",yt,!1),e.removeEventListener("webglcontextcreationerror",bt,!1),pt.dispose(),Ft.dispose(),Q.dispose(),x.dispose(),O.dispose(),j.dispose(),ce.dispose(),F.dispose(),ct.dispose(),tt.dispose(),tt.removeEventListener("sessionstart",Tt),tt.removeEventListener("sessionend",Yt),Nt.stop()};function st(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function yt(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;const T=ot.autoReset,z=dt.enabled,q=dt.autoUpdate,$=dt.needsUpdate,H=dt.type;St(),ot.autoReset=T,dt.enabled=z,dt.autoUpdate=q,dt.needsUpdate=$,dt.type=H}function bt(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Gt(T){const z=T.target;z.removeEventListener("dispose",Gt),he(z)}function he(T){ze(T),Q.remove(T)}function ze(T){const z=Q.get(T).programs;z!==void 0&&(z.forEach(function(q){ct.releaseProgram(q)}),T.isShaderMaterial&&ct.releaseShaderCache(T))}this.renderBufferDirect=function(T,z,q,$,H,mt){z===null&&(z=te);const gt=H.isMesh&&H.matrixWorld.determinant()<0,Et=Jn(T,z,q,$,H);nt.setMaterial($,gt);let Ct=q.index,Wt=1;if($.wireframe===!0){if(Ct=X.getWireframeAttribute(q),Ct===void 0)return;Wt=2}const qt=q.drawRange,Lt=q.attributes.position;let $t=qt.start*Wt,de=(qt.start+qt.count)*Wt;mt!==null&&($t=Math.max($t,mt.start*Wt),de=Math.min(de,(mt.start+mt.count)*Wt)),Ct!==null?($t=Math.max($t,0),de=Math.min(de,Ct.count)):Lt!=null&&($t=Math.max($t,0),de=Math.min(de,Lt.count));const me=de-$t;if(me<0||me===1/0)return;ce.setup(H,$,Et,q,Ct);let Ne,_e=xt;if(Ct!==null&&(Ne=W.get(Ct),_e=Ht,_e.setIndex(Ne)),H.isMesh)$.wireframe===!0?(nt.setLineWidth($.wireframeLinewidth*U()),_e.setMode(w.LINES)):_e.setMode(w.TRIANGLES);else if(H.isLine){let zt=$.linewidth;zt===void 0&&(zt=1),nt.setLineWidth(zt*U()),H.isLineSegments?_e.setMode(w.LINES):H.isLineLoop?_e.setMode(w.LINE_LOOP):_e.setMode(w.LINE_STRIP)}else H.isPoints?_e.setMode(w.POINTS):H.isSprite&&_e.setMode(w.TRIANGLES);if(H.isBatchedMesh)if(H._multiDrawInstances!==null)_e.renderMultiDrawInstances(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount,H._multiDrawInstances);else if(J.get("WEBGL_multi_draw"))_e.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const zt=H._multiDrawStarts,nr=H._multiDrawCounts,ge=H._multiDrawCount,Ai=Ct?W.get(Ct).bytesPerElement:1,Ys=Q.get($).currentProgram.getUniforms();for(let Qn=0;Qn<ge;Qn++)Ys.setValue(w,"_gl_DrawID",Qn),_e.render(zt[Qn]/Ai,nr[Qn])}else if(H.isInstancedMesh)_e.renderInstances($t,me,H.count);else if(q.isInstancedBufferGeometry){const zt=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,nr=Math.min(q.instanceCount,zt);_e.renderInstances($t,me,nr)}else _e.render($t,me)};function At(T,z,q){T.transparent===!0&&T.side===mr&&T.forceSinglePass===!1?(T.side=zn,T.needsUpdate=!0,be(T,z,q),T.side=is,T.needsUpdate=!0,be(T,z,q),T.side=mr):be(T,z,q)}this.compile=function(T,z,q=null){q===null&&(q=T),p=Ft.get(q),p.init(z),E.push(p),q.traverseVisible(function(H){H.isLight&&H.layers.test(z.layers)&&(p.pushLight(H),H.castShadow&&p.pushShadow(H))}),T!==q&&T.traverseVisible(function(H){H.isLight&&H.layers.test(z.layers)&&(p.pushLight(H),H.castShadow&&p.pushShadow(H))}),p.setupLights();const $=new Set;return T.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;const mt=H.material;if(mt)if(Array.isArray(mt))for(let gt=0;gt<mt.length;gt++){const Et=mt[gt];At(Et,q,H),$.add(Et)}else At(mt,q,H),$.add(mt)}),E.pop(),p=null,$},this.compileAsync=function(T,z,q=null){const $=this.compile(T,z,q);return new Promise(H=>{function mt(){if($.forEach(function(gt){Q.get(gt).currentProgram.isReady()&&$.delete(gt)}),$.size===0){H(T);return}setTimeout(mt,10)}J.get("KHR_parallel_shader_compile")!==null?mt():setTimeout(mt,10)})};let Ut=null;function Zt(T){Ut&&Ut(T)}function Tt(){Nt.stop()}function Yt(){Nt.start()}const Nt=new tv;Nt.setAnimationLoop(Zt),typeof self<"u"&&Nt.setContext(self),this.setAnimationLoop=function(T){Ut=T,tt.setAnimationLoop(T),T===null?Nt.stop():Nt.start()},tt.addEventListener("sessionstart",Tt),tt.addEventListener("sessionend",Yt),this.render=function(T,z){if(z!==void 0&&z.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),tt.enabled===!0&&tt.isPresenting===!0&&(tt.cameraAutoUpdate===!0&&tt.updateCamera(z),z=tt.getCamera()),T.isScene===!0&&T.onBeforeRender(v,T,z,L),p=Ft.get(T,E.length),p.init(z),E.push(p),Rt.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),it.setFromProjectionMatrix(Rt),Mt=this.localClippingEnabled,ut=ft.init(this.clippingPlanes,Mt),m=pt.get(T,b.length),m.init(),b.push(m),tt.enabled===!0&&tt.isPresenting===!0){const mt=v.xr.getDepthSensingMesh();mt!==null&&Xt(mt,z,-1/0,v.sortObjects)}Xt(T,z,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(lt,N),P=tt.enabled===!1||tt.isPresenting===!1||tt.hasDepthSensing()===!1,P&&Ot.addToRenderList(m,T),this.info.render.frame++,ut===!0&&ft.beginShadows();const q=p.state.shadowsArray;dt.render(q,T,z),ut===!0&&ft.endShadows(),this.info.autoReset===!0&&this.info.reset();const $=m.opaque,H=m.transmissive;if(p.setupLights(),z.isArrayCamera){const mt=z.cameras;if(H.length>0)for(let gt=0,Et=mt.length;gt<Et;gt++){const Ct=mt[gt];re($,H,T,Ct)}P&&Ot.render(T);for(let gt=0,Et=mt.length;gt<Et;gt++){const Ct=mt[gt];Ve(m,T,Ct,Ct.viewport)}}else H.length>0&&re($,H,T,z),P&&Ot.render(T),Ve(m,T,z);L!==null&&(M.updateMultisampleRenderTarget(L),M.updateRenderTargetMipmap(L)),T.isScene===!0&&T.onAfterRender(v,T,z),ce.resetDefaultState(),S=-1,y=null,E.pop(),E.length>0?(p=E[E.length-1],ut===!0&&ft.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,b.pop(),b.length>0?m=b[b.length-1]:m=null};function Xt(T,z,q,$){if(T.visible===!1)return;if(T.layers.test(z.layers)){if(T.isGroup)q=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(z);else if(T.isLight)p.pushLight(T),T.castShadow&&p.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||it.intersectsSprite(T)){$&&kt.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Rt);const gt=j.update(T),Et=T.material;Et.visible&&m.push(T,gt,Et,q,kt.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||it.intersectsObject(T))){const gt=j.update(T),Et=T.material;if($&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),kt.copy(T.boundingSphere.center)):(gt.boundingSphere===null&&gt.computeBoundingSphere(),kt.copy(gt.boundingSphere.center)),kt.applyMatrix4(T.matrixWorld).applyMatrix4(Rt)),Array.isArray(Et)){const Ct=gt.groups;for(let Wt=0,qt=Ct.length;Wt<qt;Wt++){const Lt=Ct[Wt],$t=Et[Lt.materialIndex];$t&&$t.visible&&m.push(T,gt,$t,q,kt.z,Lt)}}else Et.visible&&m.push(T,gt,Et,q,kt.z,null)}}const mt=T.children;for(let gt=0,Et=mt.length;gt<Et;gt++)Xt(mt[gt],z,q,$)}function Ve(T,z,q,$){const H=T.opaque,mt=T.transmissive,gt=T.transparent;p.setupLightsView(q),ut===!0&&ft.setGlobalState(v.clippingPlanes,q),$&&nt.viewport(I.copy($)),H.length>0&&Ae(H,z,q),mt.length>0&&Ae(mt,z,q),gt.length>0&&Ae(gt,z,q),nt.buffers.depth.setTest(!0),nt.buffers.depth.setMask(!0),nt.buffers.color.setMask(!0),nt.setPolygonOffset(!1)}function re(T,z,q,$){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[$.id]===void 0&&(p.state.transmissionRenderTarget[$.id]=new Hs(1,1,{generateMipmaps:!0,type:J.has("EXT_color_buffer_half_float")||J.has("EXT_color_buffer_float")?cl:Tr,minFilter:ws,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:fe.workingColorSpace}));const mt=p.state.transmissionRenderTarget[$.id],gt=$.viewport||I;mt.setSize(gt.z,gt.w);const Et=v.getRenderTarget();v.setRenderTarget(mt),v.getClearColor(Y),et=v.getClearAlpha(),et<1&&v.setClearColor(16777215,.5),v.clear(),P&&Ot.render(q);const Ct=v.toneMapping;v.toneMapping=Zr;const Wt=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),p.setupLightsView($),ut===!0&&ft.setGlobalState(v.clippingPlanes,$),Ae(T,q,$),M.updateMultisampleRenderTarget(mt),M.updateRenderTargetMipmap(mt),J.has("WEBGL_multisampled_render_to_texture")===!1){let qt=!1;for(let Lt=0,$t=z.length;Lt<$t;Lt++){const de=z[Lt],me=de.object,Ne=de.geometry,_e=de.material,zt=de.group;if(_e.side===mr&&me.layers.test($.layers)){const nr=_e.side;_e.side=zn,_e.needsUpdate=!0,Ke(me,q,$,Ne,_e,zt),_e.side=nr,_e.needsUpdate=!0,qt=!0}}qt===!0&&(M.updateMultisampleRenderTarget(mt),M.updateRenderTargetMipmap(mt))}v.setRenderTarget(Et),v.setClearColor(Y,et),Wt!==void 0&&($.viewport=Wt),v.toneMapping=Ct}function Ae(T,z,q){const $=z.isScene===!0?z.overrideMaterial:null;for(let H=0,mt=T.length;H<mt;H++){const gt=T[H],Et=gt.object,Ct=gt.geometry,Wt=$===null?gt.material:$,qt=gt.group;Et.layers.test(q.layers)&&Ke(Et,z,q,Ct,Wt,qt)}}function Ke(T,z,q,$,H,mt){T.onBeforeRender(v,z,q,$,H,mt),T.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),H.onBeforeRender(v,z,q,$,T,mt),H.transparent===!0&&H.side===mr&&H.forceSinglePass===!1?(H.side=zn,H.needsUpdate=!0,v.renderBufferDirect(q,z,$,H,T,mt),H.side=is,H.needsUpdate=!0,v.renderBufferDirect(q,z,$,H,T,mt),H.side=mr):v.renderBufferDirect(q,z,$,H,T,mt),T.onAfterRender(v,z,q,$,H,mt)}function be(T,z,q){z.isScene!==!0&&(z=te);const $=Q.get(T),H=p.state.lights,mt=p.state.shadowsArray,gt=H.state.version,Et=ct.getParameters(T,H.state,mt,z,q),Ct=ct.getProgramCacheKey(Et);let Wt=$.programs;$.environment=T.isMeshStandardMaterial?z.environment:null,$.fog=z.fog,$.envMap=(T.isMeshStandardMaterial?O:x).get(T.envMap||$.environment),$.envMapRotation=$.environment!==null&&T.envMap===null?z.environmentRotation:T.envMapRotation,Wt===void 0&&(T.addEventListener("dispose",Gt),Wt=new Map,$.programs=Wt);let qt=Wt.get(Ct);if(qt!==void 0){if($.currentProgram===qt&&$.lightsStateVersion===gt)return pe(T,Et),qt}else Et.uniforms=ct.getUniforms(T),T.onBeforeCompile(Et,v),qt=ct.acquireProgram(Et,Ct),Wt.set(Ct,qt),$.uniforms=Et.uniforms;const Lt=$.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Lt.clippingPlanes=ft.uniform),pe(T,Et),$.needsLights=Tn(T),$.lightsStateVersion=gt,$.needsLights&&(Lt.ambientLightColor.value=H.state.ambient,Lt.lightProbe.value=H.state.probe,Lt.directionalLights.value=H.state.directional,Lt.directionalLightShadows.value=H.state.directionalShadow,Lt.spotLights.value=H.state.spot,Lt.spotLightShadows.value=H.state.spotShadow,Lt.rectAreaLights.value=H.state.rectArea,Lt.ltc_1.value=H.state.rectAreaLTC1,Lt.ltc_2.value=H.state.rectAreaLTC2,Lt.pointLights.value=H.state.point,Lt.pointLightShadows.value=H.state.pointShadow,Lt.hemisphereLights.value=H.state.hemi,Lt.directionalShadowMap.value=H.state.directionalShadowMap,Lt.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Lt.spotShadowMap.value=H.state.spotShadowMap,Lt.spotLightMatrix.value=H.state.spotLightMatrix,Lt.spotLightMap.value=H.state.spotLightMap,Lt.pointShadowMap.value=H.state.pointShadowMap,Lt.pointShadowMatrix.value=H.state.pointShadowMatrix),$.currentProgram=qt,$.uniformsList=null,qt}function Ee(T){if(T.uniformsList===null){const z=T.currentProgram.getUniforms();T.uniformsList=Sc.seqWithValue(z.seq,T.uniforms)}return T.uniformsList}function pe(T,z){const q=Q.get(T);q.outputColorSpace=z.outputColorSpace,q.batching=z.batching,q.batchingColor=z.batchingColor,q.instancing=z.instancing,q.instancingColor=z.instancingColor,q.instancingMorph=z.instancingMorph,q.skinning=z.skinning,q.morphTargets=z.morphTargets,q.morphNormals=z.morphNormals,q.morphColors=z.morphColors,q.morphTargetsCount=z.morphTargetsCount,q.numClippingPlanes=z.numClippingPlanes,q.numIntersection=z.numClipIntersection,q.vertexAlphas=z.vertexAlphas,q.vertexTangents=z.vertexTangents,q.toneMapping=z.toneMapping}function Jn(T,z,q,$,H){z.isScene!==!0&&(z=te),M.resetTextureUnits();const mt=z.fog,gt=$.isMeshStandardMaterial?z.environment:null,Et=L===null?v.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:Zo,Ct=($.isMeshStandardMaterial?O:x).get($.envMap||gt),Wt=$.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,qt=!!q.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),Lt=!!q.morphAttributes.position,$t=!!q.morphAttributes.normal,de=!!q.morphAttributes.color;let me=Zr;$.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(me=v.toneMapping);const Ne=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,_e=Ne!==void 0?Ne.length:0,zt=Q.get($),nr=p.state.lights;if(ut===!0&&(Mt===!0||T!==y)){const _i=T===y&&$.id===S;ft.setState($,T,_i)}let ge=!1;$.version===zt.__version?(zt.needsLights&&zt.lightsStateVersion!==nr.state.version||zt.outputColorSpace!==Et||H.isBatchedMesh&&zt.batching===!1||!H.isBatchedMesh&&zt.batching===!0||H.isBatchedMesh&&zt.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&zt.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&zt.instancing===!1||!H.isInstancedMesh&&zt.instancing===!0||H.isSkinnedMesh&&zt.skinning===!1||!H.isSkinnedMesh&&zt.skinning===!0||H.isInstancedMesh&&zt.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&zt.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&zt.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&zt.instancingMorph===!1&&H.morphTexture!==null||zt.envMap!==Ct||$.fog===!0&&zt.fog!==mt||zt.numClippingPlanes!==void 0&&(zt.numClippingPlanes!==ft.numPlanes||zt.numIntersection!==ft.numIntersection)||zt.vertexAlphas!==Wt||zt.vertexTangents!==qt||zt.morphTargets!==Lt||zt.morphNormals!==$t||zt.morphColors!==de||zt.toneMapping!==me||zt.morphTargetsCount!==_e)&&(ge=!0):(ge=!0,zt.__version=$.version);let Ai=zt.currentProgram;ge===!0&&(Ai=be($,z,H));let Ys=!1,Qn=!1,ta=!1;const Le=Ai.getUniforms(),Oi=zt.uniforms;if(nt.useProgram(Ai.program)&&(Ys=!0,Qn=!0,ta=!0),$.id!==S&&(S=$.id,Qn=!0),Ys||y!==T){nt.buffers.depth.getReversed()?(ht.copy(T.projectionMatrix),hb(ht),db(ht),Le.setValue(w,"projectionMatrix",ht)):Le.setValue(w,"projectionMatrix",T.projectionMatrix),Le.setValue(w,"viewMatrix",T.matrixWorldInverse);const Ar=Le.map.cameraPosition;Ar!==void 0&&Ar.setValue(w,It.setFromMatrixPosition(T.matrixWorld)),D.logarithmicDepthBuffer&&Le.setValue(w,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&Le.setValue(w,"isOrthographic",T.isOrthographicCamera===!0),y!==T&&(y=T,Qn=!0,ta=!0)}if(H.isSkinnedMesh){Le.setOptional(w,H,"bindMatrix"),Le.setOptional(w,H,"bindMatrixInverse");const _i=H.skeleton;_i&&(_i.boneTexture===null&&_i.computeBoneTexture(),Le.setValue(w,"boneTexture",_i.boneTexture,M))}H.isBatchedMesh&&(Le.setOptional(w,H,"batchingTexture"),Le.setValue(w,"batchingTexture",H._matricesTexture,M),Le.setOptional(w,H,"batchingIdTexture"),Le.setValue(w,"batchingIdTexture",H._indirectTexture,M),Le.setOptional(w,H,"batchingColorTexture"),H._colorsTexture!==null&&Le.setValue(w,"batchingColorTexture",H._colorsTexture,M));const ea=q.morphAttributes;if((ea.position!==void 0||ea.normal!==void 0||ea.color!==void 0)&&Bt.update(H,q,Ai),(Qn||zt.receiveShadow!==H.receiveShadow)&&(zt.receiveShadow=H.receiveShadow,Le.setValue(w,"receiveShadow",H.receiveShadow)),$.isMeshGouraudMaterial&&$.envMap!==null&&(Oi.envMap.value=Ct,Oi.flipEnvMap.value=Ct.isCubeTexture&&Ct.isRenderTargetTexture===!1?-1:1),$.isMeshStandardMaterial&&$.envMap===null&&z.environment!==null&&(Oi.envMapIntensity.value=z.environmentIntensity),Qn&&(Le.setValue(w,"toneMappingExposure",v.toneMappingExposure),zt.needsLights&&De(Oi,ta),mt&&$.fog===!0&&at.refreshFogUniforms(Oi,mt),at.refreshMaterialUniforms(Oi,$,k,K,p.state.transmissionRenderTarget[T.id]),Sc.upload(w,Ee(zt),Oi,M)),$.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(Sc.upload(w,Ee(zt),Oi,M),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&Le.setValue(w,"center",H.center),Le.setValue(w,"modelViewMatrix",H.modelViewMatrix),Le.setValue(w,"normalMatrix",H.normalMatrix),Le.setValue(w,"modelMatrix",H.matrixWorld),$.isShaderMaterial||$.isRawShaderMaterial){const _i=$.uniformsGroups;for(let Ar=0,Cr=_i.length;Ar<Cr;Ar++){const Hd=_i[Ar];F.update(Hd,Ai),F.bind(Hd,Ai)}}return Ai}function De(T,z){T.ambientLightColor.needsUpdate=z,T.lightProbe.needsUpdate=z,T.directionalLights.needsUpdate=z,T.directionalLightShadows.needsUpdate=z,T.pointLights.needsUpdate=z,T.pointLightShadows.needsUpdate=z,T.spotLights.needsUpdate=z,T.spotLightShadows.needsUpdate=z,T.rectAreaLights.needsUpdate=z,T.hemisphereLights.needsUpdate=z}function Tn(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(T,z,q){Q.get(T.texture).__webglTexture=z,Q.get(T.depthTexture).__webglTexture=q;const $=Q.get(T);$.__hasExternalTextures=!0,$.__autoAllocateDepthBuffer=q===void 0,$.__autoAllocateDepthBuffer||J.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),$.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,z){const q=Q.get(T);q.__webglFramebuffer=z,q.__useDefaultFramebuffer=z===void 0},this.setRenderTarget=function(T,z=0,q=0){L=T,C=z,A=q;let $=!0,H=null,mt=!1,gt=!1;if(T){const Ct=Q.get(T);if(Ct.__useDefaultFramebuffer!==void 0)nt.bindFramebuffer(w.FRAMEBUFFER,null),$=!1;else if(Ct.__webglFramebuffer===void 0)M.setupRenderTarget(T);else if(Ct.__hasExternalTextures)M.rebindTextures(T,Q.get(T.texture).__webglTexture,Q.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Lt=T.depthTexture;if(Ct.__boundDepthTexture!==Lt){if(Lt!==null&&Q.has(Lt)&&(T.width!==Lt.image.width||T.height!==Lt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");M.setupDepthRenderbuffer(T)}}const Wt=T.texture;(Wt.isData3DTexture||Wt.isDataArrayTexture||Wt.isCompressedArrayTexture)&&(gt=!0);const qt=Q.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(qt[z])?H=qt[z][q]:H=qt[z],mt=!0):T.samples>0&&M.useMultisampledRTT(T)===!1?H=Q.get(T).__webglMultisampledFramebuffer:Array.isArray(qt)?H=qt[q]:H=qt,I.copy(T.viewport),B.copy(T.scissor),G=T.scissorTest}else I.copy(_t).multiplyScalar(k).floor(),B.copy(Dt).multiplyScalar(k).floor(),G=Kt;if(nt.bindFramebuffer(w.FRAMEBUFFER,H)&&$&&nt.drawBuffers(T,H),nt.viewport(I),nt.scissor(B),nt.setScissorTest(G),mt){const Ct=Q.get(T.texture);w.framebufferTexture2D(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_CUBE_MAP_POSITIVE_X+z,Ct.__webglTexture,q)}else if(gt){const Ct=Q.get(T.texture),Wt=z||0;w.framebufferTextureLayer(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,Ct.__webglTexture,q||0,Wt)}S=-1},this.readRenderTargetPixels=function(T,z,q,$,H,mt,gt){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Et=Q.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&gt!==void 0&&(Et=Et[gt]),Et){nt.bindFramebuffer(w.FRAMEBUFFER,Et);try{const Ct=T.texture,Wt=Ct.format,qt=Ct.type;if(!D.textureFormatReadable(Wt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!D.textureTypeReadable(qt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=T.width-$&&q>=0&&q<=T.height-H&&w.readPixels(z,q,$,H,Vt.convert(Wt),Vt.convert(qt),mt)}finally{const Ct=L!==null?Q.get(L).__webglFramebuffer:null;nt.bindFramebuffer(w.FRAMEBUFFER,Ct)}}},this.readRenderTargetPixelsAsync=async function(T,z,q,$,H,mt,gt){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Et=Q.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&gt!==void 0&&(Et=Et[gt]),Et){const Ct=T.texture,Wt=Ct.format,qt=Ct.type;if(!D.textureFormatReadable(Wt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!D.textureTypeReadable(qt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(z>=0&&z<=T.width-$&&q>=0&&q<=T.height-H){nt.bindFramebuffer(w.FRAMEBUFFER,Et);const Lt=w.createBuffer();w.bindBuffer(w.PIXEL_PACK_BUFFER,Lt),w.bufferData(w.PIXEL_PACK_BUFFER,mt.byteLength,w.STREAM_READ),w.readPixels(z,q,$,H,Vt.convert(Wt),Vt.convert(qt),0);const $t=L!==null?Q.get(L).__webglFramebuffer:null;nt.bindFramebuffer(w.FRAMEBUFFER,$t);const de=w.fenceSync(w.SYNC_GPU_COMMANDS_COMPLETE,0);return w.flush(),await fb(w,de,4),w.bindBuffer(w.PIXEL_PACK_BUFFER,Lt),w.getBufferSubData(w.PIXEL_PACK_BUFFER,0,mt),w.deleteBuffer(Lt),w.deleteSync(de),mt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,z=null,q=0){T.isTexture!==!0&&(ya("WebGLRenderer: copyFramebufferToTexture function signature has changed."),z=arguments[0]||null,T=arguments[1]);const $=Math.pow(2,-q),H=Math.floor(T.image.width*$),mt=Math.floor(T.image.height*$),gt=z!==null?z.x:0,Et=z!==null?z.y:0;M.setTexture2D(T,0),w.copyTexSubImage2D(w.TEXTURE_2D,q,0,0,gt,Et,H,mt),nt.unbindTexture()},this.copyTextureToTexture=function(T,z,q=null,$=null,H=0){T.isTexture!==!0&&(ya("WebGLRenderer: copyTextureToTexture function signature has changed."),$=arguments[0]||null,T=arguments[1],z=arguments[2],H=arguments[3]||0,q=null);let mt,gt,Et,Ct,Wt,qt,Lt,$t,de;const me=T.isCompressedTexture?T.mipmaps[H]:T.image;q!==null?(mt=q.max.x-q.min.x,gt=q.max.y-q.min.y,Et=q.isBox3?q.max.z-q.min.z:1,Ct=q.min.x,Wt=q.min.y,qt=q.isBox3?q.min.z:0):(mt=me.width,gt=me.height,Et=me.depth||1,Ct=0,Wt=0,qt=0),$!==null?(Lt=$.x,$t=$.y,de=$.z):(Lt=0,$t=0,de=0);const Ne=Vt.convert(z.format),_e=Vt.convert(z.type);let zt;z.isData3DTexture?(M.setTexture3D(z,0),zt=w.TEXTURE_3D):z.isDataArrayTexture||z.isCompressedArrayTexture?(M.setTexture2DArray(z,0),zt=w.TEXTURE_2D_ARRAY):(M.setTexture2D(z,0),zt=w.TEXTURE_2D),w.pixelStorei(w.UNPACK_FLIP_Y_WEBGL,z.flipY),w.pixelStorei(w.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),w.pixelStorei(w.UNPACK_ALIGNMENT,z.unpackAlignment);const nr=w.getParameter(w.UNPACK_ROW_LENGTH),ge=w.getParameter(w.UNPACK_IMAGE_HEIGHT),Ai=w.getParameter(w.UNPACK_SKIP_PIXELS),Ys=w.getParameter(w.UNPACK_SKIP_ROWS),Qn=w.getParameter(w.UNPACK_SKIP_IMAGES);w.pixelStorei(w.UNPACK_ROW_LENGTH,me.width),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,me.height),w.pixelStorei(w.UNPACK_SKIP_PIXELS,Ct),w.pixelStorei(w.UNPACK_SKIP_ROWS,Wt),w.pixelStorei(w.UNPACK_SKIP_IMAGES,qt);const ta=T.isDataArrayTexture||T.isData3DTexture,Le=z.isDataArrayTexture||z.isData3DTexture;if(T.isRenderTargetTexture||T.isDepthTexture){const Oi=Q.get(T),ea=Q.get(z),_i=Q.get(Oi.__renderTarget),Ar=Q.get(ea.__renderTarget);nt.bindFramebuffer(w.READ_FRAMEBUFFER,_i.__webglFramebuffer),nt.bindFramebuffer(w.DRAW_FRAMEBUFFER,Ar.__webglFramebuffer);for(let Cr=0;Cr<Et;Cr++)ta&&w.framebufferTextureLayer(w.READ_FRAMEBUFFER,w.COLOR_ATTACHMENT0,Q.get(T).__webglTexture,H,qt+Cr),T.isDepthTexture?(Le&&w.framebufferTextureLayer(w.DRAW_FRAMEBUFFER,w.COLOR_ATTACHMENT0,Q.get(z).__webglTexture,H,de+Cr),w.blitFramebuffer(Ct,Wt,mt,gt,Lt,$t,mt,gt,w.DEPTH_BUFFER_BIT,w.NEAREST)):Le?w.copyTexSubImage3D(zt,H,Lt,$t,de+Cr,Ct,Wt,mt,gt):w.copyTexSubImage2D(zt,H,Lt,$t,de+Cr,Ct,Wt,mt,gt);nt.bindFramebuffer(w.READ_FRAMEBUFFER,null),nt.bindFramebuffer(w.DRAW_FRAMEBUFFER,null)}else Le?T.isDataTexture||T.isData3DTexture?w.texSubImage3D(zt,H,Lt,$t,de,mt,gt,Et,Ne,_e,me.data):z.isCompressedArrayTexture?w.compressedTexSubImage3D(zt,H,Lt,$t,de,mt,gt,Et,Ne,me.data):w.texSubImage3D(zt,H,Lt,$t,de,mt,gt,Et,Ne,_e,me):T.isDataTexture?w.texSubImage2D(w.TEXTURE_2D,H,Lt,$t,mt,gt,Ne,_e,me.data):T.isCompressedTexture?w.compressedTexSubImage2D(w.TEXTURE_2D,H,Lt,$t,me.width,me.height,Ne,me.data):w.texSubImage2D(w.TEXTURE_2D,H,Lt,$t,mt,gt,Ne,_e,me);w.pixelStorei(w.UNPACK_ROW_LENGTH,nr),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,ge),w.pixelStorei(w.UNPACK_SKIP_PIXELS,Ai),w.pixelStorei(w.UNPACK_SKIP_ROWS,Ys),w.pixelStorei(w.UNPACK_SKIP_IMAGES,Qn),H===0&&z.generateMipmaps&&w.generateMipmap(zt),nt.unbindTexture()},this.copyTextureToTexture3D=function(T,z,q=null,$=null,H=0){return T.isTexture!==!0&&(ya("WebGLRenderer: copyTextureToTexture3D function signature has changed."),q=arguments[0]||null,$=arguments[1]||null,T=arguments[2],z=arguments[3],H=arguments[4]||0),ya('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,z,q,$,H)},this.initRenderTarget=function(T){Q.get(T).__webglFramebuffer===void 0&&M.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?M.setTextureCube(T,0):T.isData3DTexture?M.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?M.setTexture2DArray(T,0):M.setTexture2D(T,0),nt.unbindTexture()},this.resetState=function(){C=0,A=0,L=null,nt.reset(),ce.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return vr}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=fe._getDrawingBufferColorSpace(t),e.unpackColorSpace=fe._getUnpackColorSpace()}}class lv extends pn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Qi,this.environmentIntensity=1,this.environmentRotation=new Qi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class SA extends Jo{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new ae(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const $m=new Be,Nh=new Od,Jl=new su,Ql=new Z;class bA extends pn{constructor(t=new er,e=new SA){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,r=this.matrixWorld,s=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Jl.copy(n.boundingSphere),Jl.applyMatrix4(r),Jl.radius+=s,t.ray.intersectsSphere(Jl)===!1)return;$m.copy(r).invert(),Nh.copy(t.ray).applyMatrix4($m);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,f=n.attributes.position;if(c!==null){const d=Math.max(0,o.start),h=Math.min(c.count,o.start+o.count);for(let g=d,_=h;g<_;g++){const m=c.getX(g);Ql.fromBufferAttribute(f,m),jm(Ql,m,l,r,t,e,this)}}else{const d=Math.max(0,o.start),h=Math.min(f.count,o.start+o.count);for(let g=d,_=h;g<_;g++)Ql.fromBufferAttribute(f,g),jm(Ql,g,l,r,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function jm(i,t,e,n,r,s,o){const a=Nh.distanceSqToPoint(i);if(a<e){const l=new Z;Nh.closestPointToPoint(i,l),l.applyMatrix4(n);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class Ha extends er{constructor(t=1,e=32,n=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const u=[],f=new Z,d=new Z,h=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){const b=[],E=p/n;let v=0;p===0&&o===0?v=.5/e:p===n&&l===Math.PI&&(v=-.5/e);for(let R=0;R<=e;R++){const C=R/e;f.x=-t*Math.cos(r+C*s)*Math.sin(o+E*a),f.y=t*Math.cos(o+E*a),f.z=t*Math.sin(r+C*s)*Math.sin(o+E*a),g.push(f.x,f.y,f.z),d.copy(f).normalize(),_.push(d.x,d.y,d.z),m.push(C+v,1-E),b.push(c++)}u.push(b)}for(let p=0;p<n;p++)for(let b=0;b<e;b++){const E=u[p][b+1],v=u[p][b],R=u[p+1][b],C=u[p+1][b+1];(p!==0||o>0)&&h.push(E,v,C),(p!==n-1||l<Math.PI)&&h.push(v,R,C)}this.setIndex(h),this.setAttribute("position",new Ki(g,3)),this.setAttribute("normal",new Ki(_,3)),this.setAttribute("uv",new Ki(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ha(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class cf extends Jo{static get type(){return"MeshPhongMaterial"}constructor(t){super(),this.isMeshPhongMaterial=!0,this.color=new ae(16777215),this.specular=new ae(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ae(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=H0,this.normalScale=new Qt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qi,this.combine=Rd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}const Km={enabled:!1,files:{},add:function(i,t){this.enabled!==!1&&(this.files[i]=t)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class EA{constructor(t,e,n){const r=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(u){a++,s===!1&&r.onStart!==void 0&&r.onStart(u,o,a),s=!0},this.itemEnd=function(u){o++,r.onProgress!==void 0&&r.onProgress(u,o,a),o===a&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,f){return c.push(u,f),this},this.removeHandler=function(u){const f=c.indexOf(u);return f!==-1&&c.splice(f,2),this},this.getHandler=function(u){for(let f=0,d=c.length;f<d;f+=2){const h=c[f],g=c[f+1];if(h.global&&(h.lastIndex=0),h.test(u))return g}return null}}}const TA=new EA;class zd{constructor(t){this.manager=t!==void 0?t:TA,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(r,s){n.load(t,r,e,s)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}zd.DEFAULT_MATERIAL_NAME="__DEFAULT";class wA extends zd{constructor(t){super(t)}load(t,e,n,r){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const s=this,o=Km.get(t);if(o!==void 0)return s.manager.itemStart(t),setTimeout(function(){e&&e(o),s.manager.itemEnd(t)},0),o;const a=rl("img");function l(){u(),Km.add(t,this),e&&e(this),s.manager.itemEnd(t)}function c(f){u(),r&&r(f),s.manager.itemError(t),s.manager.itemEnd(t)}function u(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(t),a.src=t,a}}class AA extends zd{constructor(t){super(t)}load(t,e,n,r){const s=new kn,o=new wA(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){s.image=a,s.needsUpdate=!0,e!==void 0&&e(s)},n,r),s}}class cv extends pn{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new ae(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}const uf=new Be,Zm=new Z,Jm=new Z;class CA{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Qt(512,512),this.map=null,this.mapPass=null,this.matrix=new Be,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Fd,this._frameExtents=new Qt(1,1),this._viewportCount=1,this._viewports=[new ke(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Zm.setFromMatrixPosition(t.matrixWorld),e.position.copy(Zm),Jm.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Jm),e.updateMatrixWorld(),uf.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(uf),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(uf)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class RA extends CA{constructor(){super(new ev(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class tc extends cv{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(pn.DEFAULT_UP),this.updateMatrix(),this.target=new pn,this.shadow=new RA}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class PA extends cv{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class Qm{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Nn(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class DA extends Xs{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Cd}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Cd);const dl=(i,t)=>{const e=i.__vccOpts||i;for(const[n,r]of t)e[n]=r;return e},LA={__name:"Scene3D",props:{particleCount:{type:Number,default:3e3},speed:{type:Number,default:1},theme:{type:String,default:"gradient"},pauseOnHidden:{type:Boolean,default:!0}},setup(i){const t=i,e=jh(null);let n=null,r=null,s=null,o=null,a=null,l=!0;const c={purple:[6717162,7752610,10451690],blue:[3900150,2450411,1920728],indigo:[6514417,5195493,4405450],gradient:[6717162,3900150,6514417,7752610],stars:[16777215,14739711,16774368,13161712,16777215]},u=()=>c[t.theme]||c.gradient,f=()=>{if(!e.value)return;n=new lv;const m=e.value.clientWidth||window.innerWidth,p=e.value.clientHeight||window.innerHeight;r=new li(75,m/p,.1,1e3),r.position.z=100,s=new av({antialias:!0,alpha:!0,powerPreference:"high-performance"}),s.setSize(m,p),s.setPixelRatio(Math.min(window.devicePixelRatio,2)),s.setClearColor(0,0),e.value.appendChild(s.domElement);const b=new er,E=new Float32Array(t.particleCount*3),v=new Float32Array(t.particleCount*3),R=new Float32Array(t.particleCount),C=t.theme==="stars",A=C?new Float32Array(t.particleCount):null,L=u(),S=new ae;for(let I=0;I<t.particleCount;I++){const B=I*3;if(C){const Y=120+Math.random()*80,et=Math.random()*Math.PI*2,V=Math.acos(Math.random()*2-1);E[B]=Y*Math.sin(V)*Math.cos(et),E[B+1]=Y*Math.sin(V)*Math.sin(et),E[B+2]=Y*Math.cos(V),R[I]=Math.random()*2.2+1,A[I]=Math.random()*Math.PI*2}else{const Y=50+Math.random()*50,et=Math.random()*Math.PI*2,V=Math.acos(Math.random()*2-1);E[B]=Y*Math.sin(V)*Math.cos(et),E[B+1]=Y*Math.sin(V)*Math.sin(et),E[B+2]=Y*Math.cos(V),R[I]=Math.random()*2+.5}const G=Math.floor(Math.random()*L.length);S.setHex(L[G]),v[B]=S.r,v[B+1]=S.g,v[B+2]=S.b}b.setAttribute("position",new Yn(E,3)),b.setAttribute("particleColor",new Yn(v,3)),b.setAttribute("size",new Yn(R,1)),C&&b.setAttribute("twinklePhase",new Yn(A,1));const y=C?new tr({uniforms:{time:{value:0},pixelRatio:{value:Math.min(window.devicePixelRatio,2)}},vertexShader:`
          precision mediump float;
          attribute float size;
          attribute vec3 particleColor;
          attribute float twinklePhase;
          varying vec3 vColor;
          varying float vTwinkle;
          uniform float time;
          uniform float pixelRatio;
          void main() {
            vColor = particleColor;
            vTwinkle = 0.15 + 0.85 * sin(time * 3.5 + twinklePhase);
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            float scale = size * (420.0 / -mvPosition.z) * pixelRatio;
            gl_PointSize = scale;
            gl_Position = projectionMatrix * mvPosition;
          }
        `,fragmentShader:`
          precision mediump float;
          varying vec3 vColor;
          varying float vTwinkle;
          void main() {
            float d = distance(gl_PointCoord, vec2(0.5));
            float alpha = (1.0 - smoothstep(0.0, 0.5, d)) * vTwinkle * 0.95;
            gl_FragColor = vec4(vColor, alpha);
          }
        `,transparent:!0,blending:Vc,depthTest:!1}):new tr({uniforms:{time:{value:0},pixelRatio:{value:Math.min(window.devicePixelRatio,2)}},vertexShader:`
          precision mediump float;
          attribute float size;
          attribute vec3 particleColor;
          varying vec3 vColor;
          uniform float time;
          uniform float pixelRatio;
          void main() {
            vColor = particleColor;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            float scale = size * (300.0 / -mvPosition.z) * pixelRatio;
            gl_PointSize = scale * (1.0 + sin(time * 0.5) * 0.1);
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
        `,transparent:!0,blending:Vc,depthTest:!1});o=new bA(b,y),n.add(o),t.pauseOnHidden&&document.addEventListener("visibilitychange",d),h()},d=()=>{l=!document.hidden,l&&!a&&h()},h=()=>{if(!l&&t.pauseOnHidden){a=null;return}if(a=requestAnimationFrame(h),!n||!r||!s||!o)return;const m=performance.now()*.001*t.speed;o.material.uniforms&&(o.material.uniforms.time.value=m);const p=t.theme==="stars";p||(o.rotation.x=m*.1,o.rotation.y=m*.15),r.position.x=Math.sin(m*.2)*(p?2:5),r.position.y=Math.cos(m*.15)*(p?2:5),r.lookAt(n.position),s.render(n,r)},g=()=>{if(!e.value||!r||!s)return;const m=e.value.clientWidth||window.innerWidth,p=e.value.clientHeight||window.innerHeight;r.aspect=m/p,r.updateProjectionMatrix(),s.setSize(m,p)},_=()=>{a&&(cancelAnimationFrame(a),a=null),t.pauseOnHidden&&document.removeEventListener("visibilitychange",d),window.removeEventListener("resize",g),o&&(o.geometry&&o.geometry.dispose(),o.material&&(o.material.uniforms,o.material.dispose()),n&&n.remove(o),o=null),s&&(e.value&&s.domElement&&e.value.removeChild(s.domElement),s.dispose(),s=null),n=null,r=null};return Ko(()=>{f(),window.addEventListener("resize",g)}),ol(()=>{_()}),ic(()=>t.theme,()=>{if(o&&o.geometry){const m=o.geometry.attributes.particleColor,p=u(),b=new ae;for(let E=0;E<t.particleCount;E++){const v=E*3,R=Math.floor(Math.random()*p.length);b.setHex(p[R]),m.array[v]=b.r,m.array[v+1]=b.g,m.array[v+2]=b.b}m.needsUpdate=!0}}),(m,p)=>(tn(),en("div",{ref_key:"containerRef",ref:e,class:"absolute inset-0 w-full h-full overflow-hidden pointer-events-none"},null,512))}},uv=dl(LA,[["__scopeId","data-v-b82bab50"]]),t_={type:"change"},kd={type:"start"},fv={type:"end"},ec=new Od,e_=new Br,IA=Math.cos(70*cb.DEG2RAD),Ze=new Z,Gn=2*Math.PI,Se={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},ff=1e-6;class UA extends DA{constructor(t,e=null){super(t,e),this.state=Se.NONE,this.enabled=!0,this.target=new Z,this.cursor=new Z,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Do.ROTATE,MIDDLE:Do.DOLLY,RIGHT:Do.PAN},this.touches={ONE:vo.ROTATE,TWO:vo.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new Z,this._lastQuaternion=new Vs,this._lastTargetPosition=new Z,this._quat=new Vs().setFromUnitVectors(t.up,new Z(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Qm,this._sphericalDelta=new Qm,this._scale=1,this._panOffset=new Z,this._rotateStart=new Qt,this._rotateEnd=new Qt,this._rotateDelta=new Qt,this._panStart=new Qt,this._panEnd=new Qt,this._panDelta=new Qt,this._dollyStart=new Qt,this._dollyEnd=new Qt,this._dollyDelta=new Qt,this._dollyDirection=new Z,this._mouse=new Qt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=OA.bind(this),this._onPointerDown=NA.bind(this),this._onPointerUp=FA.bind(this),this._onContextMenu=WA.bind(this),this._onMouseWheel=kA.bind(this),this._onKeyDown=HA.bind(this),this._onTouchStart=VA.bind(this),this._onTouchMove=GA.bind(this),this._onMouseDown=BA.bind(this),this._onMouseMove=zA.bind(this),this._interceptControlDown=XA.bind(this),this._interceptControlUp=YA.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(t_),this.update(),this.state=Se.NONE}update(t=null){const e=this.object.position;Ze.copy(e).sub(this.target),Ze.applyQuaternion(this._quat),this._spherical.setFromVector3(Ze),this.autoRotate&&this.state===Se.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(n)&&isFinite(r)&&(n<-Math.PI?n+=Gn:n>Math.PI&&(n-=Gn),r<-Math.PI?r+=Gn:r>Math.PI&&(r-=Gn),n<=r?this._spherical.theta=Math.max(n,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+r)/2?Math.max(n,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=o!=this._spherical.radius}if(Ze.setFromSpherical(this._spherical),Ze.applyQuaternion(this._quatInverse),e.copy(this.target).add(Ze),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Ze.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){const a=new Z(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;const c=new Z(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Ze.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(ec.origin.copy(this.object.position),ec.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(ec.direction))<IA?this.object.lookAt(this.target):(e_.setFromNormalAndCoplanarPoint(this.object.up,this.target),ec.intersectPlane(e_,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>ff||8*(1-this._lastQuaternion.dot(this.object.quaternion))>ff||this._lastTargetPosition.distanceToSquared(this.target)>ff?(this.dispatchEvent(t_),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Gn/60*this.autoRotateSpeed*t:Gn/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Ze.setFromMatrixColumn(e,0),Ze.multiplyScalar(-t),this._panOffset.add(Ze)}_panUp(t,e){this.screenSpacePanning===!0?Ze.setFromMatrixColumn(e,1):(Ze.setFromMatrixColumn(e,0),Ze.crossVectors(this.object.up,Ze)),Ze.multiplyScalar(t),this._panOffset.add(Ze)}_pan(t,e){const n=this.domElement;if(this.object.isPerspectiveCamera){const r=this.object.position;Ze.copy(r).sub(this.target);let s=Ze.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*s/n.clientHeight,this.object.matrix),this._panUp(2*e*s/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),r=t-n.left,s=e-n.top,o=n.width,a=n.height;this._mouse.x=r/o*2-1,this._mouse.y=-(s/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Gn*this._rotateDelta.x/e.clientHeight),this._rotateUp(Gn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(Gn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-Gn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(Gn*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-Gn*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),r=.5*(t.pageY+e.y);this._rotateStart.set(n,r)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),r=.5*(t.pageY+e.y);this._panStart.set(n,r)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,r=t.pageY-e.y,s=Math.sqrt(n*n+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),r=.5*(t.pageX+n.x),s=.5*(t.pageY+n.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Gn*this._rotateDelta.x/e.clientHeight),this._rotateUp(Gn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),r=.5*(t.pageY+e.y);this._panEnd.set(n,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,r=t.pageY-e.y,s=Math.sqrt(n*n+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Qt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function NA(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function OA(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function FA(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(fv),this.state=Se.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function BA(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Do.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=Se.DOLLY;break;case Do.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Se.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Se.ROTATE}break;case Do.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Se.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Se.PAN}break;default:this.state=Se.NONE}this.state!==Se.NONE&&this.dispatchEvent(kd)}function zA(i){switch(this.state){case Se.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case Se.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case Se.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function kA(i){this.enabled===!1||this.enableZoom===!1||this.state!==Se.NONE||(i.preventDefault(),this.dispatchEvent(kd),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(fv))}function HA(i){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(i)}function VA(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case vo.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=Se.TOUCH_ROTATE;break;case vo.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=Se.TOUCH_PAN;break;default:this.state=Se.NONE}break;case 2:switch(this.touches.TWO){case vo.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=Se.TOUCH_DOLLY_PAN;break;case vo.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=Se.TOUCH_DOLLY_ROTATE;break;default:this.state=Se.NONE}break;default:this.state=Se.NONE}this.state!==Se.NONE&&this.dispatchEvent(kd)}function GA(i){switch(this._trackPointer(i),this.state){case Se.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case Se.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case Se.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case Se.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=Se.NONE}}function WA(i){this.enabled!==!1&&i.preventDefault()}function XA(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function YA(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const qA="https://cdn.apewebapps.com/threejs/160/examples/textures/planets/earth_atmos_2048.jpg",$A={__name:"Earth3D",setup(i){const t=jh(null);let e=null,n=null,r=null,s=null,o=null,a=null,l=null;const c=-(138*Math.PI)/180,u=()=>{if(!t.value)return;const g=t.value.clientWidth,_=t.value.clientHeight;if(g<=0||_<=0)return;e=new lv,n=new li(45,g/_,.1,100),n.position.z=3.5,r=new av({antialias:!0,alpha:!0}),r.setSize(g,_),r.setPixelRatio(Math.min(window.devicePixelRatio,2)),r.setClearColor(0,0),t.value.appendChild(r.domElement),new AA().load(qA,L=>{L.colorSpace=oi;const S=new Ha(1,64,64),y=new cf({map:L,specularMap:null,shininess:0,specular:new ae(0),emissive:new ae(333093),color:new ae(16777215)});s=new Ei(S,y),s.rotation.y=c,e.add(s)},void 0,()=>{const L=new Ha(1,32,32),S=new cf({color:8900331,emissive:2113632,specular:0,shininess:0});s=new Ei(L,S),s.rotation.y=c,e.add(s)});const p=new Ha(1.018,64,64),b=new cf({color:11393254,emissive:3174544,transparent:!0,opacity:.26,side:zn,shininess:0,specular:0});o=new Ei(p,b),o.rotation.y=c,e.add(o);const E=new PA(11393254,.85);e.add(E);const v=new tc(13954551,1.9);v.position.set(5,3,5),e.add(v);const R=new tc(12117232,.7);R.position.set(-3,2,3),e.add(R);const C=new tc(8900331,.6);C.position.set(-5,-2,-5),e.add(C);const A=new tc(13166325,.4);A.position.set(0,5,2),e.add(A),a=new UA(n,r.domElement),a.target.set(0,0,0),a.enableZoom=!1,a.enablePan=!1,a.enableDamping=!0,a.dampingFactor=.05,a.rotateSpeed=.8,f()},f=()=>{l=requestAnimationFrame(f),!(!e||!n||!r)&&(a&&a.update(),s&&(s.rotation.y+=8e-4),o&&(o.rotation.y+=8e-4),r.render(e,n))},d=()=>{if(!t.value||!n||!r)return;const g=t.value.clientWidth,_=t.value.clientHeight;n.aspect=g/_,n.updateProjectionMatrix(),r.setSize(g,_)},h=()=>{l&&cancelAnimationFrame(l),window.removeEventListener("resize",d),a&&(a.dispose(),a=null),o&&(o.geometry&&o.geometry.dispose(),o.material&&o.material.dispose(),o=null),s&&(s.geometry&&s.geometry.dispose(),s.material&&(s.material.map&&s.material.map.dispose(),s.material.dispose())),r&&t.value?.contains(r.domElement)&&(t.value.removeChild(r.domElement),r.dispose()),e=null,n=null,r=null,s=null,o=null};return Ko(()=>{u(),window.addEventListener("resize",d)}),ol(h),(g,_)=>(tn(),en("div",{ref_key:"containerRef",ref:t,class:"earth-container cursor-grab active:cursor-grabbing"},null,512))}},jA=dl($A,[["__scopeId","data-v-3c2df67a"]]),KA={id:"home",class:"hero-section min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden bg-gradient-to-b from-[#050510] via-slate-900/80 to-[#050510]"},ZA={class:"earth-layer"},JA={class:"hero-content relative z-10 flex flex-col items-center text-center text-white max-w-4xl w-full"},QA={class:"flex justify-center gap-6 mb-10"},tC={__name:"HeroSection",setup(i){const t=e=>{document.getElementById(e)?.scrollIntoView({behavior:"smooth"})};return Ko(()=>{Pn.timeline({delay:.3}).fromTo(".hero-badge",{opacity:0,y:-30},{opacity:1,y:0,duration:.6,ease:"power2.out"}).fromTo(".hero-title",{opacity:0,y:40,scale:.9},{opacity:1,y:0,scale:1,duration:.8,ease:"back.out(1.4)"},"-=0.3").fromTo(".hero-subtitle",{opacity:0,y:30},{opacity:1,y:0,duration:.6,ease:"power2.out"},"-=0.4").fromTo(".hero-desc",{opacity:0,y:20},{opacity:1,y:0,duration:.5,ease:"power2.out"},"-=0.3").fromTo(".hero-cta",{opacity:0,scale:.8},{opacity:1,scale:1,duration:.5,ease:"back.out(2)"},"-=0.2").fromTo(".hero-social",{opacity:0,y:20},{opacity:1,y:0,duration:.4,ease:"power2.out",stagger:.1},"-=0.2")}),(e,n)=>(tn(),en("section",KA,[ln(uv,{"particle-count":4e3,speed:1,theme:"stars",class:"absolute inset-0 z-0"}),vt("div",ZA,[ln(jA)]),vt("div",JA,[n[2]||(n[2]=vt("div",{class:"hero-badge inline-block px-6 py-3 bg-white/10 rounded-full mb-6 text-sm font-semibold backdrop-blur-md border border-cyan-400/40 text-cyan-100 shadow-lg shadow-cyan-500/10"}," Welcome to My Portfolio ",-1)),n[3]||(n[3]=vt("h1",{class:"hero-title text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent drop-shadow-lg"}," SAFWAN HAKIM ",-1)),n[4]||(n[4]=vt("p",{class:"hero-subtitle text-2xl md:text-3xl mb-6 text-cyan-200/90 font-medium"},"Associate Software Manager",-1)),n[5]||(n[5]=vt("p",{class:"hero-desc text-lg md:text-xl mb-10 text-slate-300 max-w-2xl mx-auto leading-relaxed"}," 8+ years experience exploring the digital universe ",-1)),vt("div",QA,[vt("button",{onClick:n[0]||(n[0]=r=>t("projects")),class:"hero-cta group px-10 py-4 bg-cyan-500/90 text-slate-900 font-bold rounded-full transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:bg-cyan-400 hover:shadow-cyan-400/30"},[...n[1]||(n[1]=[vt("span",{class:"inline-flex items-center gap-2"},[eg(" View My Work "),vt("svg",{class:"w-5 h-5 group-hover:translate-x-1 transition-transform",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[vt("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M17 8l4 4m0 0l-4 4m4-4H3"})])],-1)])])]),n[6]||(n[6]=ng('<div class="flex justify-center items-center gap-6 flex-wrap" data-v-b42f050b><a href="mailto:putrafyp@gmail.com" target="_blank" class="hero-social group flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-white border border-cyan-400/30 transition-all duration-300 hover:bg-white/20 hover:border-cyan-400/50 hover:scale-105" data-v-b42f050b><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" data-v-b42f050b><rect x="3" y="5" width="18" height="14" rx="2" data-v-b42f050b></rect><polyline points="3 7 12 13 21 7" data-v-b42f050b></polyline></svg><span class="font-medium" data-v-b42f050b>Email</span></a><a href="https://www.linkedin.com/in/safwan-hakim/" target="_blank" class="hero-social group flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-white border border-cyan-400/30 transition-all duration-300 hover:bg-white/20 hover:border-cyan-400/50 hover:scale-105" data-v-b42f050b><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" data-v-b42f050b><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" data-v-b42f050b></path></svg><span class="font-medium" data-v-b42f050b>LinkedIn</span></a><a href="https://github.com/wankimmy" target="_blank" class="hero-social group flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-white border border-cyan-400/30 transition-all duration-300 hover:bg-white/20 hover:border-cyan-400/50 hover:scale-105" data-v-b42f050b><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" data-v-b42f050b><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" data-v-b42f050b></path></svg><span class="font-medium" data-v-b42f050b>GitHub</span></a></div>',1))])]))}},eC=dl(tC,[["__scopeId","data-v-b42f050b"]]),nC=""+new URL("profile-C3_FXVjN.png",import.meta.url).href,iC={id:"about",class:"min-h-screen py-20 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-[#050510] via-slate-900/50 to-[#050510] relative"},rC={__name:"AboutSection",setup(i){return(t,e)=>(tn(),en("section",iC,[...e[0]||(e[0]=[ng('<div class="glow-orb absolute w-72 h-72 bg-cyan-500/8 rounded-full blur-3xl top-20 -left-20"></div><div class="glow-orb absolute w-96 h-96 bg-indigo-500/6 rounded-full blur-3xl bottom-10 -right-20"></div><div class="max-w-7xl mx-auto relative z-10"><div class="section-heading text-center mb-16"><h2 class="section-title text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 via-primary to-secondary bg-clip-text text-transparent"> About Me </h2><p class="section-subtitle text-xl text-slate-400 font-medium">Get to know the astronaut</p></div><div class="grid md:grid-cols-2 gap-20 items-center"><div class="about-image flex justify-center"><div class="w-96 h-96 md:w-[28rem] md:h-[28rem] rounded-3xl overflow-hidden transform hover:scale-105 transition-transform duration-300 shadow-2xl shadow-cyan-500/10"><img src="'+nC+'" alt="Safwan Hakim" class="w-full h-full object-cover"></div></div><div class="about-text"><h3 class="text-4xl font-bold text-white mb-6">Hi, I&#39;m SAFWAN HAKIM</h3><p class="text-lg text-slate-300 leading-relaxed mb-10 font-medium"> With 8 years of experience in the software engineering industry, I am eager to embrace new challenges within forward-thinking and customer-focused organizations. Leveraging my profound love for technology and extensive knowledge of software engineering, I aim to contribute significantly to the team. My enthusiasm for continuous learning, especially in the realm of the Internet of Things, drives me to innovate and develop technologies that benefit our community. I specialize in modern web technologies including Laravel, Vue.js, Node.js, and cloud platforms like AWS, while also leading teams and mentoring junior developers. </p><div class="grid grid-cols-3 gap-6"><div class="trait-card bg-slate-800/80 backdrop-blur border border-slate-600/50 p-6 rounded-2xl shadow-xl text-center text-white transform hover:scale-110 transition-transform duration-300 hover:border-cyan-400/50 hover:shadow-cyan-500/20"><div class="text-6xl mb-3">🐱</div><p class="text-cyan-100 text-sm font-semibold">Curious Cat</p></div><div class="trait-card bg-slate-800/80 backdrop-blur border border-primary/40 p-6 rounded-2xl shadow-xl text-center text-white transform hover:scale-110 transition-transform duration-300 hover:border-primary/60 hover:shadow-indigo-500/20"><div class="text-6xl mb-3">🔧</div><p class="text-slate-200 text-sm font-semibold">Problem Solver</p></div><div class="trait-card bg-slate-800/80 backdrop-blur border border-secondary/40 p-6 rounded-2xl shadow-xl text-center text-white transform hover:scale-110 transition-transform duration-300 hover:border-secondary/60 hover:shadow-violet-500/20"><div class="text-6xl mb-3">🤔</div><p class="text-slate-200 text-sm font-semibold">Skeptical Thinker</p></div></div></div></div></div>',3)])]))}},sC={id:"tech",class:"min-h-screen py-10 sm:py-14 md:py-20 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-[#050510] via-slate-900/40 to-[#050510] relative"},oC={class:"max-w-7xl mx-auto relative z-10"},aC={class:"bg-slate-800/60 backdrop-blur-sm p-4 sm:p-6 lg:p-10 rounded-3xl shadow-2xl border border-cyan-500/20"},lC={class:"grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-5 md:gap-6 lg:gap-8"},cC=["title"],uC={class:"w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 lg:w-[90px] lg:h-[90px] xl:w-[100px] xl:h-[100px] flex items-center justify-center flex-shrink-0"},fC=["src","alt"],hC={__name:"TechSection",setup(i){const t=[{name:"PHP",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/php/php-plain.svg"},{name:"HTML",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/html5/html5-plain.svg"},{name:"CSS",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/css3/css3-plain.svg"},{name:"JavaScript",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/javascript/javascript-plain.svg"},{name:"jQuery",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/jquery/jquery-plain-wordmark.svg"},{name:"Laravel",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/laravel/laravel-plain.svg"},{name:"Yii2",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/yii/yii-plain.svg"},{name:"Node.js",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/nodejs/nodejs-plain.svg"},{name:"Vue.js",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/vuejs/vuejs-plain.svg"},{name:"WordPress",icon:"https://raw.githubusercontent.com/devicons/devicon/master/icons/wordpress/wordpress-plain.svg"},{name:"Node-Red",icon:"https://raw.githubusercontent.com/devicons/devicon/master/icons/nodered/nodered-original.svg"},{name:"MySQL",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/mysql/mysql-plain.svg"},{name:"CouchDB",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/couchdb/couchdb-original.svg"},{name:"Redis",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/redis/redis-plain.svg"},{name:"Docker",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/docker/docker-plain.svg"},{name:"AWS",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/amazonwebservices/amazonwebservices-original.svg"},{name:"Git",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/git/git-plain.svg"},{name:"Nginx",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/nginx/nginx-original.svg"},{name:"Postman",icon:"https://raw.githubusercontent.com/simple-icons/simple-icons/master/icons/postman.svg"},{name:"Cloudflare",icon:"https://raw.githubusercontent.com/simple-icons/simple-icons/master/icons/cloudflare.svg"},{name:"Hostinger",icon:"https://raw.githubusercontent.com/simple-icons/simple-icons/master/icons/hostinger.svg"},{name:"Raspberry Pi",icon:"https://raw.githubusercontent.com/devicons/devicon/master/icons/raspberrypi/raspberrypi-original.svg"},{name:"Arduino",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/arduino/arduino-original.svg"},{name:"MQTT",icon:"https://raw.githubusercontent.com/simple-icons/simple-icons/master/icons/eclipsemosquitto.svg"}];return(e,n)=>(tn(),en("section",sC,[n[1]||(n[1]=vt("div",{class:"glow-orb absolute w-72 h-72 bg-cyan-500/8 rounded-full blur-3xl top-10 -right-20"},null,-1)),n[2]||(n[2]=vt("div",{class:"glow-orb absolute w-80 h-80 bg-violet-500/6 rounded-full blur-3xl bottom-10 -left-24"},null,-1)),vt("div",oC,[n[0]||(n[0]=vt("div",{class:"section-heading text-center mb-8 sm:mb-12 md:mb-16"},[vt("h2",{class:"section-title text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 via-primary to-secondary bg-clip-text text-transparent"}," Technologies "),vt("p",{class:"section-subtitle text-xl text-slate-400 font-medium"},"Tech stack for the mission")],-1)),vt("div",aC,[vt("div",lC,[(tn(),en(yn,null,Ns(t,r=>vt("div",{key:r.name,title:r.name,class:"tech-item flex items-center justify-center p-3 sm:p-4 md:p-5 lg:p-6 bg-slate-800/80 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 sm:hover:-translate-y-3 hover:scale-105 sm:hover:scale-110 border border-slate-600/50 hover:border-cyan-400/50 group min-h-[100px] sm:min-h-[130px] md:min-h-[150px] lg:min-h-[160px]"},[vt("div",uC,[vt("img",{src:r.icon,alt:r.name,loading:"lazy",class:"w-full h-full object-contain block max-w-full max-h-full",style:{filter:"drop-shadow(0 10px 15px rgba(0, 0, 0, 0.15))"}},null,8,fC)])],8,cC)),64))])])])]))}},dC=dl(hC,[["__scopeId","data-v-bb82970d"]]),pC={id:"experience",class:"min-h-screen py-20 px-8 bg-gradient-to-b from-[#050510] via-slate-900/50 to-[#050510] relative"},mC={class:"max-w-5xl mx-auto relative z-10"},_C={class:"relative"},gC={class:"bg-slate-800/70 backdrop-blur p-10 rounded-3xl shadow-xl md:ml-0 ml-0 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 hover:scale-[1.02] border border-cyan-500/20 hover:border-cyan-400/40"},vC={class:"text-cyan-400 font-bold text-lg mb-3"},xC={class:"text-3xl font-bold text-white mb-2"},yC={class:"text-primary font-bold text-lg mb-6"},MC={class:"list-none space-y-3"},SC={class:"font-medium"},bC={__name:"ExperienceSection",setup(i){const t=[{period:"April 2020 - Present",title:"Associate Software Manager",company:"Fiuu (formerly Razer Merchant Services)",duties:["Started as Software Engineer, promoted to Senior Software Engineer, now serves as Associate Software Manager with Engineering Management (EM) responsibilities","Conduct code reviews, guide team members, and find bugs to ensure code quality and best practices","Perform hotfixes when required to address critical production issues and ensure system reliability","Manage and guide team of developers, overseeing projects from planning through execution with realistic timelines","Lead project management efforts including timeline planning, resource allocation, and milestone tracking","Perform customization for merchants including report customization, feature customization, and system improvements to meet specific business requirements","Assist Business-As-Usual (BAU) operations across departments and provide technical support to merchants in various countries (PH, SG, ID, MY)","Collaborate with business and product teams to develop and implement new features and improvements","Delivered over 850 bug fixes and enhancements, improving system performance, stability, scalability, and functionality"]},{period:"January 2020 - October 2021",title:"Web Software Developer",company:"My Innovative Wellness SDN BHD (Part-Time)",duties:["Developed user-friendly e-commerce platform using WooCommerce, boosting online sales by up to 10,000 ringgit monthly","Created internal systems to streamline sales and increase productivity","Set up cloud hosting services (AWS EC2, Hostinger) with CloudFlare, Facebook Pixel, and Google Analytics","Led planning and design for company technical infrastructure including data and email migration"]},{period:"January 2018 - December 2019",title:"Freelance Programmer & Raspberry Pi Node-Red Trainer",company:"Freelance / Tertiary Courses Malaysia",duties:["Developed websites, apps, and e-commerce systems for startups like EzDisposal, TTDI Meatpoint, and RNR Enterprise","Served as Raspberry Pi and Node-Red trainer, teaching Industry 4.0 concepts to universities (UniKL, MSU, UUM)","Provided technical advisory and implemented solutions using PHP, WordPress, and Laravel Framework"]},{period:"August 2016 - August 2018",title:"Junior Programmer",company:"Unijaya Resource Sdn Bhd",duties:["Contributed to RM 3 million project, successfully delivering two modules with team of 5 members","Developed and deployed mobile app to Google Play Store and Apple App Store","Developed company website with improved UI/UX, enhancing user engagement and satisfaction"]}];return(e,n)=>(tn(),en("section",pC,[n[4]||(n[4]=vt("div",{class:"glow-orb absolute w-80 h-80 bg-indigo-500/6 rounded-full blur-3xl top-40 -right-32"},null,-1)),n[5]||(n[5]=vt("div",{class:"glow-orb absolute w-64 h-64 bg-cyan-500/8 rounded-full blur-3xl bottom-20 -left-20"},null,-1)),vt("div",mC,[n[3]||(n[3]=vt("div",{class:"section-heading text-center mb-16"},[vt("h2",{class:"section-title text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 via-primary to-secondary bg-clip-text text-transparent"}," Experience "),vt("p",{class:"section-subtitle text-xl text-slate-400 font-medium"},"Mission log — software engineering journey")],-1)),vt("div",_C,[n[2]||(n[2]=vt("div",{class:"timeline-line hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500/50 via-primary/50 to-secondary/50 transform -translate-x-1/2"},null,-1)),(tn(),en(yn,null,Ns(t,(r,s)=>vt("div",{key:s,class:"exp-card relative mb-16 pl-0 md:pl-1/2 md:ml-24"},[n[1]||(n[1]=vt("div",{class:"timeline-dot hidden md:flex absolute left-1/2 top-0 w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-primary border-4 border-slate-900 shadow-xl shadow-cyan-500/30 -ml-3 transform -translate-x-1/2"},null,-1)),vt("div",gC,[vt("div",vC,un(r.period),1),vt("h3",xC,un(r.title),1),vt("p",yC,un(r.company),1),vt("ul",MC,[(tn(!0),en(yn,null,Ns(r.duties,o=>(tn(),en("li",{key:o,class:"flex items-start gap-3 text-slate-300"},[n[0]||(n[0]=vt("span",{class:"text-cyan-400 font-bold text-xl flex-shrink-0"},"✓",-1)),vt("span",SC,un(o),1)]))),128))])])])),64))])])]))}},EC={id:"projects",class:"min-h-screen py-20 px-8 bg-gradient-to-b from-[#050510] via-slate-900/40 to-[#050510] relative"},TC={class:"max-w-7xl mx-auto relative z-10"},wC={class:"grid md:grid-cols-2 lg:grid-cols-2 gap-10"},AC={class:"relative h-72 overflow-hidden bg-gradient-to-br from-slate-700/80 to-slate-800/80"},CC={class:"absolute inset-0 flex items-center justify-center text-7xl"},RC={class:"absolute inset-0 bg-gradient-to-t from-cyan-900/90 to-slate-900/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"},PC=["href"],DC={class:"p-8"},LC={class:"text-2xl font-bold text-white mb-2"},IC={class:"text-cyan-300/90 mb-1 text-sm font-medium"},UC={class:"text-slate-400 mb-6 leading-relaxed font-medium"},NC={class:"flex flex-wrap gap-3"},OC={__name:"ProjectsSection",setup(i){const t=[{id:1,name:"Festivent",url:"festivent.com.my",description:"E-commerce platform for finding event vendors in Malaysia. Connect event organizers with professional vendors for any type of event.",icon:"🎪",live:"https://festivent.com.my/home",tech:["Laravel","PHP","MySQL","Bootstrap CSS","Hostinger"]},{id:2,name:"EZDisposal",url:"ezdisposal.my",description:"Hassle-free disposal service booking platform. Book disposal services for furniture, appliances, and e-waste with multiple vehicle options.",icon:"🗑️",live:"https://ezdisposal.my",tech:["Laravel","PHP","MySQL","Hostinger"]},{id:3,name:"Entrusol",url:"entrusol.com",description:"E-commerce platform for wellness products with integrated sales system. Built with WordPress and WooCommerce for seamless online shopping.",icon:"🌿",live:"https://entrusol.com",tech:["WordPress","WooCommerce","MySQL","Hostinger","Google Analytics"]},{id:4,name:"TTDI Meatpoint",url:"ttdimeatpoint.com",description:"Restaurant website with custom booking system. Complete dining experience with online reservations and menu management.",icon:"🍖",live:"https://www.ttdimeatpoint.com",tech:["Laravel","PHP","MySQL","Bootstrap CSS","Hostinger"]}];return(e,n)=>(tn(),en("section",EC,[n[1]||(n[1]=vt("div",{class:"glow-orb absolute w-96 h-96 bg-cyan-500/6 rounded-full blur-3xl top-32 -left-24"},null,-1)),n[2]||(n[2]=vt("div",{class:"glow-orb absolute w-72 h-72 bg-violet-500/6 rounded-full blur-3xl bottom-20 -right-16"},null,-1)),vt("div",TC,[n[0]||(n[0]=vt("div",{class:"section-heading text-center mb-16"},[vt("h2",{class:"section-title text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 via-primary to-secondary bg-clip-text text-transparent"}," Featured Projects "),vt("p",{class:"section-subtitle text-xl text-slate-400 font-medium"},"Launch history — recent missions")],-1)),vt("div",wC,[(tn(),en(yn,null,Ns(t,r=>vt("div",{key:r.id,class:"project-card bg-slate-800/70 backdrop-blur rounded-3xl overflow-hidden shadow-2xl hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 transform hover:-translate-y-2 group border border-cyan-500/20 hover:border-cyan-400/40"},[vt("div",AC,[vt("div",CC,un(r.icon),1),vt("div",RC,[vt("a",{href:r.live,target:"_blank",class:"px-10 py-4 bg-cyan-400 text-slate-900 font-bold rounded-full transition-all hover:scale-110 shadow-xl"}," 🔗 Visit Website ",8,PC)])]),vt("div",DC,[vt("h3",LC,un(r.name),1),vt("p",IC,un(r.url),1),vt("p",UC,un(r.description),1),vt("div",NC,[(tn(!0),en(yn,null,Ns(r.tech,s=>(tn(),en("span",{key:s,class:"px-5 py-2 bg-slate-700/80 text-cyan-200 rounded-full text-sm font-bold"},un(s),1))),128))])])])),64))])])]))}},FC={id:"certificates",class:"min-h-screen py-20 px-8 bg-gradient-to-b from-[#050510] via-slate-900/50 to-[#050510] relative"},BC={class:"max-w-7xl mx-auto relative z-10"},zC={class:"grid md:grid-cols-2 lg:grid-cols-3 gap-8"},kC={class:"relative h-64 bg-gradient-to-br from-cyan-900/80 via-slate-800 to-primary/80 flex items-center justify-center"},HC={class:"relative z-10 text-center"},VC={class:"text-7xl mb-4"},GC={class:"text-white font-bold text-sm px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-cyan-400/40"},WC={class:"p-8"},XC={class:"text-2xl font-bold text-white mb-3"},YC={class:"text-slate-400 mb-2 text-sm font-semibold"},qC={class:"text-slate-500 text-sm mb-4"},$C={class:"text-slate-300 mb-6 leading-relaxed text-sm"},jC={class:"flex gap-3"},KC=["href"],ZC={__name:"CertificatesSection",setup(i){const t=[{id:1,name:"Web Application Hacking And Defense",issuer:"Condition Zebra",date:"Issued in 2024",description:"Comprehensive training in ethical hacking and web application security. Learn offensive security techniques to identify vulnerabilities, perform penetration testing, and implement defensive strategies to protect web applications.",icon:"🎖️",file:"/assets/R001174-Safwan-Hakim-Bin-Yacob.pdf"},{id:2,name:"OWASP Security Foundation",issuer:"OWASP Foundation",date:"Issued in 2022",description:"Foundational knowledge in web application security, covering vulnerabilities, threats, and best practices.",icon:"🔐",file:"/assets/Safwan_Hakim_owasp.pdf"},{id:3,name:"IoT Security Certification",issuer:"Tertiary Courses / Industry",date:"Issued in 2021",description:"Professional certification in Internet of Things (IoT) security, covering secure device deployment, data encryption, and network protection for IoT ecosystems.",icon:"🌐",file:"/assets/E-cert_IoT_Security_Safwan_Hakim.pdf"},{id:4,name:"Industry 4.0 E-Certification",issuer:"Tertiary Courses / Industry",date:"Issued in 2021",description:"Certification in Industry 4.0 technologies including automation, data analytics, IoT integration, and smart manufacturing systems.",icon:"🏭",file:"/assets/IR4.0_E-Cert_Safwan_Hakim_Bin_Yacob.pdf"}];return(e,n)=>(tn(),en("section",FC,[n[2]||(n[2]=vt("div",{class:"glow-orb absolute w-80 h-80 bg-indigo-500/6 rounded-full blur-3xl top-20 -right-24"},null,-1)),n[3]||(n[3]=vt("div",{class:"glow-orb absolute w-64 h-64 bg-cyan-500/8 rounded-full blur-3xl bottom-32 -left-16"},null,-1)),vt("div",BC,[n[1]||(n[1]=vt("div",{class:"section-heading text-center mb-16"},[vt("h2",{class:"section-title text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 via-primary to-secondary bg-clip-text text-transparent"}," Professional Certifications "),vt("p",{class:"section-subtitle text-xl text-slate-400 font-medium"},"Credentials from the mission")],-1)),vt("div",zC,[(tn(),en(yn,null,Ns(t,r=>vt("div",{key:r.id,class:"cert-card bg-slate-800/70 backdrop-blur rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 transform hover:-translate-y-2 border border-cyan-500/20 hover:border-cyan-400/40 group"},[vt("div",kC,[n[0]||(n[0]=vt("div",{class:"absolute inset-0 flex items-center justify-center text-8xl opacity-20"}," 🎓 ",-1)),vt("div",HC,[vt("div",VC,un(r.icon),1),vt("div",GC,un(r.issuer),1)])]),vt("div",WC,[vt("h3",XC,un(r.name),1),vt("p",YC,un(r.issuer),1),vt("p",qC,un(r.date),1),vt("p",$C,un(r.description),1),vt("div",jC,[vt("a",{href:r.file,target:"_blank",class:"flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-primary text-slate-900 font-bold rounded-xl text-center transition-all hover:from-cyan-400 hover:to-primary hover:scale-105 shadow-lg"}," 📄 View Certificate ",8,KC)])])])),64))])])]))}},JC=dl(ZC,[["__scopeId","data-v-552114ed"]]),QC={class:"relative w-full min-h-screen bg-[#050510] overflow-x-hidden"},tR={class:"fixed inset-0 w-full h-full z-0"},eR={__name:"App",setup(i){return Pn.registerPlugin(le),Ko(async()=>{await C_(),document.querySelectorAll(".section-heading").forEach(u=>{const f=u.querySelector(".section-title"),d=u.querySelector(".section-subtitle"),h=Pn.timeline({scrollTrigger:{trigger:u,start:"top 85%",toggleActions:"play none none none"}});f&&h.fromTo(f,{opacity:0,y:40,scale:.92},{opacity:1,y:0,scale:1,duration:.8,ease:"back.out(1.4)"}),d&&h.fromTo(d,{opacity:0,y:20},{opacity:1,y:0,duration:.5,ease:"power2.out"},"-=0.4")});const t=document.querySelector(".about-image"),e=document.querySelector(".about-text"),n=document.querySelectorAll(".trait-card");t&&Pn.fromTo(t,{opacity:0,x:-80,rotate:-2},{opacity:1,x:0,rotate:0,duration:1,ease:"power3.out",scrollTrigger:{trigger:t,start:"top 82%",toggleActions:"play none none none"}}),e&&Pn.fromTo(e,{opacity:0,x:80},{opacity:1,x:0,duration:1,ease:"power3.out",scrollTrigger:{trigger:e,start:"top 82%",toggleActions:"play none none none"}}),n.length&&Pn.fromTo(n,{opacity:0,y:40,scale:.7},{opacity:1,y:0,scale:1,duration:.6,ease:"back.out(2)",stagger:.15,scrollTrigger:{trigger:n[0],start:"top 90%",toggleActions:"play none none none"}});const r=document.querySelectorAll(".tech-item");r.length&&Pn.fromTo(r,{opacity:0,scale:.4,y:30},{opacity:1,scale:1,y:0,duration:.5,ease:"back.out(1.5)",stagger:{each:.04,from:"random"},scrollTrigger:{trigger:"#tech",start:"top 75%",toggleActions:"play none none none"}});const s=document.querySelector(".timeline-line"),o=document.querySelectorAll(".exp-card"),a=document.querySelectorAll(".timeline-dot");s&&Pn.fromTo(s,{scaleY:0,transformOrigin:"top center"},{scaleY:1,duration:1.5,ease:"power2.inOut",scrollTrigger:{trigger:"#experience",start:"top 70%",toggleActions:"play none none none"}}),o.forEach((u,f)=>{Pn.fromTo(u,{opacity:0,x:f%2===0?-60:60,y:30},{opacity:1,x:0,y:0,duration:.8,ease:"power3.out",scrollTrigger:{trigger:u,start:"top 85%",toggleActions:"play none none none"}})}),a.forEach(u=>{Pn.fromTo(u,{scale:0,opacity:0},{scale:1,opacity:1,duration:.5,ease:"back.out(2)",scrollTrigger:{trigger:u,start:"top 85%",toggleActions:"play none none none"}})});const l=document.querySelectorAll(".project-card");l.length&&Pn.fromTo(l,{opacity:0,y:80,rotateX:8},{opacity:1,y:0,rotateX:0,duration:.8,ease:"power3.out",stagger:.2,scrollTrigger:{trigger:"#projects",start:"top 72%",toggleActions:"play none none none"}});const c=document.querySelectorAll(".cert-card");c.length&&Pn.fromTo(c,{opacity:0,y:50,scale:.85},{opacity:1,y:0,scale:1,duration:.7,ease:"back.out(1.3)",stagger:.15,scrollTrigger:{trigger:"#certificates",start:"top 75%",toggleActions:"play none none none"}}),document.querySelectorAll(".glow-orb").forEach(u=>{Pn.to(u,{y:()=>Math.random()*-100-50,scrollTrigger:{trigger:u.closest("section"),start:"top bottom",end:"bottom top",scrub:1}})})}),(t,e)=>(tn(),en("div",QC,[vt("div",tR,[ln(uv,{"particle-count":4500,speed:1,theme:"stars",class:"w-full h-full"})]),ln(yS),ln(eC),ln(rC),ln(dC),ln(bC),ln(OC),ln(JC),e[0]||(e[0]=vt("footer",{class:"relative z-10 py-14 text-center border-t border-white/5"},[vt("p",{class:"text-slate-500 text-sm tracking-widest uppercase font-medium"},"Designed & Built by Safwan Hakim")],-1))]))}};Pn.registerPlugin(le);Ny(eR).mount("#app");
