(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();function id(n){const e=Object.create(null);for(const t of n.split(","))e[t]=1;return t=>t in e}const It={},No=[],er=()=>{},k_=()=>!1,ou=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),rd=n=>n.startsWith("onUpdate:"),vn=Object.assign,sd=(n,e)=>{const t=n.indexOf(e);t>-1&&n.splice(t,1)},sx=Object.prototype.hasOwnProperty,Tt=(n,e)=>sx.call(n,e),je=Array.isArray,Oo=n=>au(n)==="[object Map]",z_=n=>au(n)==="[object Set]",it=n=>typeof n=="function",Zt=n=>typeof n=="string",gs=n=>typeof n=="symbol",Ft=n=>n!==null&&typeof n=="object",H_=n=>(Ft(n)||it(n))&&it(n.then)&&it(n.catch),V_=Object.prototype.toString,au=n=>V_.call(n),ox=n=>au(n).slice(8,-1),G_=n=>au(n)==="[object Object]",od=n=>Zt(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,Na=id(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),lu=n=>{const e=Object.create(null);return(t=>e[t]||(e[t]=n(t)))},ax=/-\w/g,ls=lu(n=>n.replace(ax,e=>e.slice(1).toUpperCase())),lx=/\B([A-Z])/g,vs=lu(n=>n.replace(lx,"-$1").toLowerCase()),W_=lu(n=>n.charAt(0).toUpperCase()+n.slice(1)),Cu=lu(n=>n?`on${W_(n)}`:""),ts=(n,e)=>!Object.is(n,e),mc=(n,...e)=>{for(let t=0;t<n.length;t++)n[t](...e)},X_=(n,e,t,i=!1)=>{Object.defineProperty(n,e,{configurable:!0,enumerable:!1,writable:i,value:t})},Lf=n=>{const e=parseFloat(n);return isNaN(e)?n:e},cx=n=>{const e=Zt(n)?Number(n):NaN;return isNaN(e)?n:e};let op;const cu=()=>op||(op=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Ir(n){if(je(n)){const e={};for(let t=0;t<n.length;t++){const i=n[t],r=Zt(i)?dx(i):Ir(i);if(r)for(const s in r)e[s]=r[s]}return e}else if(Zt(n)||Ft(n))return n}const ux=/;(?![^(]*\))/g,fx=/:([^]+)/,hx=/\/\*[^]*?\*\//g;function dx(n){const e={};return n.replace(hx,"").split(ux).forEach(t=>{if(t){const i=t.split(fx);i.length>1&&(e[i[0].trim()]=i[1].trim())}}),e}function Hi(n){let e="";if(Zt(n))e=n;else if(je(n))for(let t=0;t<n.length;t++){const i=Hi(n[t]);i&&(e+=i+" ")}else if(Ft(n))for(const t in n)n[t]&&(e+=t+" ");return e.trim()}const px="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",mx=id(px);function Y_(n){return!!n||n===""}const $_=n=>!!(n&&n.__v_isRef===!0),nt=n=>Zt(n)?n:n==null?"":je(n)||Ft(n)&&(n.toString===V_||!it(n.toString))?$_(n)?nt(n.value):JSON.stringify(n,q_,2):String(n),q_=(n,e)=>$_(e)?q_(n,e.value):Oo(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((t,[i,r],s)=>(t[Ru(i,s)+" =>"]=r,t),{})}:z_(e)?{[`Set(${e.size})`]:[...e.values()].map(t=>Ru(t))}:gs(e)?Ru(e):Ft(e)&&!je(e)&&!G_(e)?String(e):e,Ru=(n,e="")=>{var t;return gs(n)?`Symbol(${(t=n.description)!=null?t:e})`:n};let Xn;class _x{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=Xn,!e&&Xn&&(this.index=(Xn.scopes||(Xn.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].pause();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].resume();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].resume()}}run(e){if(this._active){const t=Xn;try{return Xn=this,e()}finally{Xn=t}}}on(){++this._on===1&&(this.prevScope=Xn,Xn=this)}off(){this._on>0&&--this._on===0&&(Xn=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let t,i;for(t=0,i=this.effects.length;t<i;t++)this.effects[t].stop();for(this.effects.length=0,t=0,i=this.cleanups.length;t<i;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){for(t=0,i=this.scopes.length;t<i;t++)this.scopes[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const r=this.parent.scopes.pop();r&&r!==this&&(this.parent.scopes[this.index]=r,r.index=this.index)}this.parent=void 0}}}function gx(){return Xn}let Ot;const Pu=new WeakSet;class K_{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Xn&&Xn.active&&Xn.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Pu.has(this)&&(Pu.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Z_(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,ap(this),J_(this);const e=Ot,t=Bi;Ot=this,Bi=!0;try{return this.fn()}finally{Q_(this),Ot=e,Bi=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)cd(e);this.deps=this.depsTail=void 0,ap(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Pu.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){If(this)&&this.run()}get dirty(){return If(this)}}let j_=0,Oa,Fa;function Z_(n,e=!1){if(n.flags|=8,e){n.next=Fa,Fa=n;return}n.next=Oa,Oa=n}function ad(){j_++}function ld(){if(--j_>0)return;if(Fa){let e=Fa;for(Fa=void 0;e;){const t=e.next;e.next=void 0,e.flags&=-9,e=t}}let n;for(;Oa;){let e=Oa;for(Oa=void 0;e;){const t=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(i){n||(n=i)}e=t}}if(n)throw n}function J_(n){for(let e=n.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function Q_(n){let e,t=n.depsTail,i=t;for(;i;){const r=i.prevDep;i.version===-1?(i===t&&(t=r),cd(i),vx(i)):e=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=r}n.deps=e,n.depsTail=t}function If(n){for(let e=n.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(eg(e.dep.computed)||e.dep.version!==e.version))return!0;return!!n._dirty}function eg(n){if(n.flags&4&&!(n.flags&16)||(n.flags&=-17,n.globalVersion===il)||(n.globalVersion=il,!n.isSSR&&n.flags&128&&(!n.deps&&!n._dirty||!If(n))))return;n.flags|=2;const e=n.dep,t=Ot,i=Bi;Ot=n,Bi=!0;try{J_(n);const r=n.fn(n._value);(e.version===0||ts(r,n._value))&&(n.flags|=128,n._value=r,e.version++)}catch(r){throw e.version++,r}finally{Ot=t,Bi=i,Q_(n),n.flags&=-3}}function cd(n,e=!1){const{dep:t,prevSub:i,nextSub:r}=n;if(i&&(i.nextSub=r,n.prevSub=void 0),r&&(r.prevSub=i,n.nextSub=void 0),t.subs===n&&(t.subs=i,!i&&t.computed)){t.computed.flags&=-5;for(let s=t.computed.deps;s;s=s.nextDep)cd(s,!0)}!e&&!--t.sc&&t.map&&t.map.delete(t.key)}function vx(n){const{prevDep:e,nextDep:t}=n;e&&(e.nextDep=t,n.prevDep=void 0),t&&(t.prevDep=e,n.nextDep=void 0)}let Bi=!0;const tg=[];function Cr(){tg.push(Bi),Bi=!1}function Rr(){const n=tg.pop();Bi=n===void 0?!0:n}function ap(n){const{cleanup:e}=n;if(n.cleanup=void 0,e){const t=Ot;Ot=void 0;try{e()}finally{Ot=t}}}let il=0;class xx{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class ud{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!Ot||!Bi||Ot===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==Ot)t=this.activeLink=new xx(Ot,this),Ot.deps?(t.prevDep=Ot.depsTail,Ot.depsTail.nextDep=t,Ot.depsTail=t):Ot.deps=Ot.depsTail=t,ng(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){const i=t.nextDep;i.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=i),t.prevDep=Ot.depsTail,t.nextDep=void 0,Ot.depsTail.nextDep=t,Ot.depsTail=t,Ot.deps===t&&(Ot.deps=i)}return t}trigger(e){this.version++,il++,this.notify(e)}notify(e){ad();try{for(let t=this.subs;t;t=t.prevSub)t.sub.notify()&&t.sub.dep.notify()}finally{ld()}}}function ng(n){if(n.dep.sc++,n.sub.flags&4){const e=n.dep.computed;if(e&&!n.dep.subs){e.flags|=20;for(let i=e.deps;i;i=i.nextDep)ng(i)}const t=n.dep.subs;t!==n&&(n.prevSub=t,t&&(t.nextSub=n)),n.dep.subs=n}}const Uf=new WeakMap,Xs=Symbol(""),Nf=Symbol(""),rl=Symbol("");function bn(n,e,t){if(Bi&&Ot){let i=Uf.get(n);i||Uf.set(n,i=new Map);let r=i.get(t);r||(i.set(t,r=new ud),r.map=i,r.key=t),r.track()}}function vr(n,e,t,i,r,s){const o=Uf.get(n);if(!o){il++;return}const a=l=>{l&&l.trigger()};if(ad(),e==="clear")o.forEach(a);else{const l=je(n),c=l&&od(t);if(l&&t==="length"){const u=Number(i);o.forEach((f,h)=>{(h==="length"||h===rl||!gs(h)&&h>=u)&&a(f)})}else switch((t!==void 0||o.has(void 0))&&a(o.get(t)),c&&a(o.get(rl)),e){case"add":l?c&&a(o.get("length")):(a(o.get(Xs)),Oo(n)&&a(o.get(Nf)));break;case"delete":l||(a(o.get(Xs)),Oo(n)&&a(o.get(Nf)));break;case"set":Oo(n)&&a(o.get(Xs));break}}ld()}function ao(n){const e=xt(n);return e===n?e:(bn(e,"iterate",rl),Ai(n)?e:e.map(dn))}function uu(n){return bn(n=xt(n),"iterate",rl),n}const yx={__proto__:null,[Symbol.iterator](){return Du(this,Symbol.iterator,dn)},concat(...n){return ao(this).concat(...n.map(e=>je(e)?ao(e):e))},entries(){return Du(this,"entries",n=>(n[1]=dn(n[1]),n))},every(n,e){return or(this,"every",n,e,void 0,arguments)},filter(n,e){return or(this,"filter",n,e,t=>t.map(dn),arguments)},find(n,e){return or(this,"find",n,e,dn,arguments)},findIndex(n,e){return or(this,"findIndex",n,e,void 0,arguments)},findLast(n,e){return or(this,"findLast",n,e,dn,arguments)},findLastIndex(n,e){return or(this,"findLastIndex",n,e,void 0,arguments)},forEach(n,e){return or(this,"forEach",n,e,void 0,arguments)},includes(...n){return Lu(this,"includes",n)},indexOf(...n){return Lu(this,"indexOf",n)},join(n){return ao(this).join(n)},lastIndexOf(...n){return Lu(this,"lastIndexOf",n)},map(n,e){return or(this,"map",n,e,void 0,arguments)},pop(){return ma(this,"pop")},push(...n){return ma(this,"push",n)},reduce(n,...e){return lp(this,"reduce",n,e)},reduceRight(n,...e){return lp(this,"reduceRight",n,e)},shift(){return ma(this,"shift")},some(n,e){return or(this,"some",n,e,void 0,arguments)},splice(...n){return ma(this,"splice",n)},toReversed(){return ao(this).toReversed()},toSorted(n){return ao(this).toSorted(n)},toSpliced(...n){return ao(this).toSpliced(...n)},unshift(...n){return ma(this,"unshift",n)},values(){return Du(this,"values",dn)}};function Du(n,e,t){const i=uu(n),r=i[e]();return i!==n&&!Ai(n)&&(r._next=r.next,r.next=()=>{const s=r._next();return s.done||(s.value=t(s.value)),s}),r}const Sx=Array.prototype;function or(n,e,t,i,r,s){const o=uu(n),a=o!==n&&!Ai(n),l=o[e];if(l!==Sx[e]){const f=l.apply(n,s);return a?dn(f):f}let c=t;o!==n&&(a?c=function(f,h){return t.call(this,dn(f),h,n)}:t.length>2&&(c=function(f,h){return t.call(this,f,h,n)}));const u=l.call(o,c,i);return a&&r?r(u):u}function lp(n,e,t,i){const r=uu(n);let s=t;return r!==n&&(Ai(n)?t.length>3&&(s=function(o,a,l){return t.call(this,o,a,l,n)}):s=function(o,a,l){return t.call(this,o,dn(a),l,n)}),r[e](s,...i)}function Lu(n,e,t){const i=xt(n);bn(i,"iterate",rl);const r=i[e](...t);return(r===-1||r===!1)&&pd(t[0])?(t[0]=xt(t[0]),i[e](...t)):r}function ma(n,e,t=[]){Cr(),ad();const i=xt(n)[e].apply(n,t);return ld(),Rr(),i}const Mx=id("__proto__,__v_isRef,__isVue"),ig=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(gs));function bx(n){gs(n)||(n=String(n));const e=xt(this);return bn(e,"has",n),e.hasOwnProperty(n)}class rg{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,i){if(t==="__v_skip")return e.__v_skip;const r=this._isReadonly,s=this._isShallow;if(t==="__v_isReactive")return!r;if(t==="__v_isReadonly")return r;if(t==="__v_isShallow")return s;if(t==="__v_raw")return i===(r?s?Ix:lg:s?ag:og).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(i)?e:void 0;const o=je(e);if(!r){let l;if(o&&(l=yx[t]))return l;if(t==="hasOwnProperty")return bx}const a=Reflect.get(e,t,wn(e)?e:i);if((gs(t)?ig.has(t):Mx(t))||(r||bn(e,"get",t),s))return a;if(wn(a)){const l=o&&od(t)?a:a.value;return r&&Ft(l)?Ff(l):l}return Ft(a)?r?Ff(a):hd(a):a}}class sg extends rg{constructor(e=!1){super(!1,e)}set(e,t,i,r){let s=e[t];if(!this._isShallow){const l=cs(s);if(!Ai(i)&&!cs(i)&&(s=xt(s),i=xt(i)),!je(e)&&wn(s)&&!wn(i))return l||(s.value=i),!0}const o=je(e)&&od(t)?Number(t)<e.length:Tt(e,t),a=Reflect.set(e,t,i,wn(e)?e:r);return e===xt(r)&&(o?ts(i,s)&&vr(e,"set",t,i):vr(e,"add",t,i)),a}deleteProperty(e,t){const i=Tt(e,t);e[t];const r=Reflect.deleteProperty(e,t);return r&&i&&vr(e,"delete",t,void 0),r}has(e,t){const i=Reflect.has(e,t);return(!gs(t)||!ig.has(t))&&bn(e,"has",t),i}ownKeys(e){return bn(e,"iterate",je(e)?"length":Xs),Reflect.ownKeys(e)}}class Ex extends rg{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}const Tx=new sg,wx=new Ex,Ax=new sg(!0);const Of=n=>n,Cl=n=>Reflect.getPrototypeOf(n);function Cx(n,e,t){return function(...i){const r=this.__v_raw,s=xt(r),o=Oo(s),a=n==="entries"||n===Symbol.iterator&&o,l=n==="keys"&&o,c=r[n](...i),u=t?Of:e?Nc:dn;return!e&&bn(s,"iterate",l?Nf:Xs),{next(){const{value:f,done:h}=c.next();return h?{value:f,done:h}:{value:a?[u(f[0]),u(f[1])]:u(f),done:h}},[Symbol.iterator](){return this}}}}function Rl(n){return function(...e){return n==="delete"?!1:n==="clear"?void 0:this}}function Rx(n,e){const t={get(r){const s=this.__v_raw,o=xt(s),a=xt(r);n||(ts(r,a)&&bn(o,"get",r),bn(o,"get",a));const{has:l}=Cl(o),c=e?Of:n?Nc:dn;if(l.call(o,r))return c(s.get(r));if(l.call(o,a))return c(s.get(a));s!==o&&s.get(r)},get size(){const r=this.__v_raw;return!n&&bn(xt(r),"iterate",Xs),r.size},has(r){const s=this.__v_raw,o=xt(s),a=xt(r);return n||(ts(r,a)&&bn(o,"has",r),bn(o,"has",a)),r===a?s.has(r):s.has(r)||s.has(a)},forEach(r,s){const o=this,a=o.__v_raw,l=xt(a),c=e?Of:n?Nc:dn;return!n&&bn(l,"iterate",Xs),a.forEach((u,f)=>r.call(s,c(u),c(f),o))}};return vn(t,n?{add:Rl("add"),set:Rl("set"),delete:Rl("delete"),clear:Rl("clear")}:{add(r){!e&&!Ai(r)&&!cs(r)&&(r=xt(r));const s=xt(this);return Cl(s).has.call(s,r)||(s.add(r),vr(s,"add",r,r)),this},set(r,s){!e&&!Ai(s)&&!cs(s)&&(s=xt(s));const o=xt(this),{has:a,get:l}=Cl(o);let c=a.call(o,r);c||(r=xt(r),c=a.call(o,r));const u=l.call(o,r);return o.set(r,s),c?ts(s,u)&&vr(o,"set",r,s):vr(o,"add",r,s),this},delete(r){const s=xt(this),{has:o,get:a}=Cl(s);let l=o.call(s,r);l||(r=xt(r),l=o.call(s,r)),a&&a.call(s,r);const c=s.delete(r);return l&&vr(s,"delete",r,void 0),c},clear(){const r=xt(this),s=r.size!==0,o=r.clear();return s&&vr(r,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(r=>{t[r]=Cx(r,n,e)}),t}function fd(n,e){const t=Rx(n,e);return(i,r,s)=>r==="__v_isReactive"?!n:r==="__v_isReadonly"?n:r==="__v_raw"?i:Reflect.get(Tt(t,r)&&r in i?t:i,r,s)}const Px={get:fd(!1,!1)},Dx={get:fd(!1,!0)},Lx={get:fd(!0,!1)};const og=new WeakMap,ag=new WeakMap,lg=new WeakMap,Ix=new WeakMap;function Ux(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Nx(n){return n.__v_skip||!Object.isExtensible(n)?0:Ux(ox(n))}function hd(n){return cs(n)?n:dd(n,!1,Tx,Px,og)}function Ox(n){return dd(n,!1,Ax,Dx,ag)}function Ff(n){return dd(n,!0,wx,Lx,lg)}function dd(n,e,t,i,r){if(!Ft(n)||n.__v_raw&&!(e&&n.__v_isReactive))return n;const s=Nx(n);if(s===0)return n;const o=r.get(n);if(o)return o;const a=new Proxy(n,s===2?i:t);return r.set(n,a),a}function Fo(n){return cs(n)?Fo(n.__v_raw):!!(n&&n.__v_isReactive)}function cs(n){return!!(n&&n.__v_isReadonly)}function Ai(n){return!!(n&&n.__v_isShallow)}function pd(n){return n?!!n.__v_raw:!1}function xt(n){const e=n&&n.__v_raw;return e?xt(e):n}function Fx(n){return!Tt(n,"__v_skip")&&Object.isExtensible(n)&&X_(n,"__v_skip",!0),n}const dn=n=>Ft(n)?hd(n):n,Nc=n=>Ft(n)?Ff(n):n;function wn(n){return n?n.__v_isRef===!0:!1}function vt(n){return Bx(n,!1)}function Bx(n,e){return wn(n)?n:new kx(n,e)}class kx{constructor(e,t){this.dep=new ud,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:xt(e),this._value=t?e:dn(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){const t=this._rawValue,i=this.__v_isShallow||Ai(e)||cs(e);e=i?e:xt(e),ts(e,t)&&(this._rawValue=e,this._value=i?e:dn(e),this.dep.trigger())}}function fu(n){return wn(n)?n.value:n}const zx={get:(n,e,t)=>e==="__v_raw"?n:fu(Reflect.get(n,e,t)),set:(n,e,t,i)=>{const r=n[e];return wn(r)&&!wn(t)?(r.value=t,!0):Reflect.set(n,e,t,i)}};function cg(n){return Fo(n)?n:new Proxy(n,zx)}class Hx{constructor(e,t,i){this.fn=e,this.setter=t,this._value=void 0,this.dep=new ud(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=il-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&Ot!==this)return Z_(this,!0),!0}get value(){const e=this.dep.track();return eg(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function Vx(n,e,t=!1){let i,r;return it(n)?i=n:(i=n.get,r=n.set),new Hx(i,r,t)}const Pl={},Oc=new WeakMap;let Ls;function Gx(n,e=!1,t=Ls){if(t){let i=Oc.get(t);i||Oc.set(t,i=[]),i.push(n)}}function Wx(n,e,t=It){const{immediate:i,deep:r,once:s,scheduler:o,augmentJob:a,call:l}=t,c=v=>r?v:Ai(v)||r===!1||r===0?xr(v,1):xr(v);let u,f,h,d,_=!1,g=!1;if(wn(n)?(f=()=>n.value,_=Ai(n)):Fo(n)?(f=()=>c(n),_=!0):je(n)?(g=!0,_=n.some(v=>Fo(v)||Ai(v)),f=()=>n.map(v=>{if(wn(v))return v.value;if(Fo(v))return c(v);if(it(v))return l?l(v,2):v()})):it(n)?e?f=l?()=>l(n,2):n:f=()=>{if(h){Cr();try{h()}finally{Rr()}}const v=Ls;Ls=u;try{return l?l(n,3,[d]):n(d)}finally{Ls=v}}:f=er,e&&r){const v=f,R=r===!0?1/0:r;f=()=>xr(v(),R)}const m=gx(),p=()=>{u.stop(),m&&m.active&&sd(m.effects,u)};if(s&&e){const v=e;e=(...R)=>{v(...R),p()}}let y=g?new Array(n.length).fill(Pl):Pl;const M=v=>{if(!(!(u.flags&1)||!u.dirty&&!v))if(e){const R=u.run();if(r||_||(g?R.some((w,T)=>ts(w,y[T])):ts(R,y))){h&&h();const w=Ls;Ls=u;try{const T=[R,y===Pl?void 0:g&&y[0]===Pl?[]:y,d];y=R,l?l(e,3,T):e(...T)}finally{Ls=w}}}else u.run()};return a&&a(M),u=new K_(f),u.scheduler=o?()=>o(M,!1):M,d=v=>Gx(v,!1,u),h=u.onStop=()=>{const v=Oc.get(u);if(v){if(l)l(v,4);else for(const R of v)R();Oc.delete(u)}},e?i?M(!0):y=u.run():o?o(M.bind(null,!0),!0):u.run(),p.pause=u.pause.bind(u),p.resume=u.resume.bind(u),p.stop=p,p}function xr(n,e=1/0,t){if(e<=0||!Ft(n)||n.__v_skip||(t=t||new Map,(t.get(n)||0)>=e))return n;if(t.set(n,e),e--,wn(n))xr(n.value,e,t);else if(je(n))for(let i=0;i<n.length;i++)xr(n[i],e,t);else if(z_(n)||Oo(n))n.forEach(i=>{xr(i,e,t)});else if(G_(n)){for(const i in n)xr(n[i],e,t);for(const i of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,i)&&xr(n[i],e,t)}return n}function Sl(n,e,t,i){try{return i?n(...i):n()}catch(r){hu(r,e,t)}}function Vi(n,e,t,i){if(it(n)){const r=Sl(n,e,t,i);return r&&H_(r)&&r.catch(s=>{hu(s,e,t)}),r}if(je(n)){const r=[];for(let s=0;s<n.length;s++)r.push(Vi(n[s],e,t,i));return r}}function hu(n,e,t,i=!0){const r=e?e.vnode:null,{errorHandler:s,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||It;if(e){let a=e.parent;const l=e.proxy,c=`https://vuejs.org/error-reference/#runtime-${t}`;for(;a;){const u=a.ec;if(u){for(let f=0;f<u.length;f++)if(u[f](n,l,c)===!1)return}a=a.parent}if(s){Cr(),Sl(s,null,10,[n,l,c]),Rr();return}}Xx(n,t,r,i,o)}function Xx(n,e,t,i=!0,r=!1){if(r)throw n;console.error(n)}const Fn=[];let Xi=-1;const Bo=[];let $r=null,wo=0;const ug=Promise.resolve();let Fc=null;function yr(n){const e=Fc||ug;return n?e.then(this?n.bind(this):n):e}function Yx(n){let e=Xi+1,t=Fn.length;for(;e<t;){const i=e+t>>>1,r=Fn[i],s=sl(r);s<n||s===n&&r.flags&2?e=i+1:t=i}return e}function md(n){if(!(n.flags&1)){const e=sl(n),t=Fn[Fn.length-1];!t||!(n.flags&2)&&e>=sl(t)?Fn.push(n):Fn.splice(Yx(e),0,n),n.flags|=1,fg()}}function fg(){Fc||(Fc=ug.then(dg))}function $x(n){je(n)?Bo.push(...n):$r&&n.id===-1?$r.splice(wo+1,0,n):n.flags&1||(Bo.push(n),n.flags|=1),fg()}function cp(n,e,t=Xi+1){for(;t<Fn.length;t++){const i=Fn[t];if(i&&i.flags&2){if(n&&i.id!==n.uid)continue;Fn.splice(t,1),t--,i.flags&4&&(i.flags&=-2),i(),i.flags&4||(i.flags&=-2)}}}function hg(n){if(Bo.length){const e=[...new Set(Bo)].sort((t,i)=>sl(t)-sl(i));if(Bo.length=0,$r){$r.push(...e);return}for($r=e,wo=0;wo<$r.length;wo++){const t=$r[wo];t.flags&4&&(t.flags&=-2),t.flags&8||t(),t.flags&=-2}$r=null,wo=0}}const sl=n=>n.id==null?n.flags&2?-1:1/0:n.id;function dg(n){try{for(Xi=0;Xi<Fn.length;Xi++){const e=Fn[Xi];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),Sl(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;Xi<Fn.length;Xi++){const e=Fn[Xi];e&&(e.flags&=-2)}Xi=-1,Fn.length=0,hg(),Fc=null,(Fn.length||Bo.length)&&dg()}}let bi=null,pg=null;function Bc(n){const e=bi;return bi=n,pg=n&&n.type.__scopeId||null,e}function mg(n,e=bi,t){if(!e||n._n)return n;const i=(...r)=>{i._d&&Hc(-1);const s=Bc(e);let o;try{o=n(...r)}finally{Bc(s),i._d&&Hc(1)}return o};return i._n=!0,i._c=!0,i._d=!0,i}function up(n,e){if(bi===null)return n;const t=gu(bi),i=n.dirs||(n.dirs=[]);for(let r=0;r<e.length;r++){let[s,o,a,l=It]=e[r];s&&(it(s)&&(s={mounted:s,updated:s}),s.deep&&xr(o),i.push({dir:s,instance:t,value:o,oldValue:void 0,arg:a,modifiers:l}))}return n}function ys(n,e,t,i){const r=n.dirs,s=e&&e.dirs;for(let o=0;o<r.length;o++){const a=r[o];s&&(a.oldValue=s[o].value);let l=a.dir[i];l&&(Cr(),Vi(l,t,8,[n.el,a,n,e]),Rr())}}const qx=Symbol("_vte"),_g=n=>n.__isTeleport,_r=Symbol("_leaveCb"),Dl=Symbol("_enterCb");function Kx(){const n={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return rr(()=>{n.isMounted=!0}),_d(()=>{n.isUnmounting=!0}),n}const gi=[Function,Array],gg={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:gi,onEnter:gi,onAfterEnter:gi,onEnterCancelled:gi,onBeforeLeave:gi,onLeave:gi,onAfterLeave:gi,onLeaveCancelled:gi,onBeforeAppear:gi,onAppear:gi,onAfterAppear:gi,onAppearCancelled:gi},vg=n=>{const e=n.subTree;return e.component?vg(e.component):e},jx={name:"BaseTransition",props:gg,setup(n,{slots:e}){const t=Gg(),i=Kx();return()=>{const r=e.default&&Sg(e.default(),!0);if(!r||!r.length)return;const s=xg(r),o=xt(n),{mode:a}=o;if(i.isLeaving)return Iu(s);const l=fp(s);if(!l)return Iu(s);let c=Bf(l,o,i,t,f=>c=f);l.type!==zn&&ol(l,c);let u=t.subTree&&fp(t.subTree);if(u&&u.type!==zn&&!Bs(u,l)&&vg(t).type!==zn){let f=Bf(u,o,i,t);if(ol(u,f),a==="out-in"&&l.type!==zn)return i.isLeaving=!0,f.afterLeave=()=>{i.isLeaving=!1,t.job.flags&8||t.update(),delete f.afterLeave,u=void 0},Iu(s);a==="in-out"&&l.type!==zn?f.delayLeave=(h,d,_)=>{const g=yg(i,u);g[String(u.key)]=u,h[_r]=()=>{d(),h[_r]=void 0,delete c.delayedLeave,u=void 0},c.delayedLeave=()=>{_(),delete c.delayedLeave,u=void 0}}:u=void 0}else u&&(u=void 0);return s}}};function xg(n){let e=n[0];if(n.length>1){for(const t of n)if(t.type!==zn){e=t;break}}return e}const Zx=jx;function yg(n,e){const{leavingVNodes:t}=n;let i=t.get(e.type);return i||(i=Object.create(null),t.set(e.type,i)),i}function Bf(n,e,t,i,r){const{appear:s,mode:o,persisted:a=!1,onBeforeEnter:l,onEnter:c,onAfterEnter:u,onEnterCancelled:f,onBeforeLeave:h,onLeave:d,onAfterLeave:_,onLeaveCancelled:g,onBeforeAppear:m,onAppear:p,onAfterAppear:y,onAppearCancelled:M}=e,v=String(n.key),R=yg(t,n),w=(S,x)=>{S&&Vi(S,i,9,x)},T=(S,x)=>{const P=x[1];w(S,x),je(S)?S.every(U=>U.length<=1)&&P():S.length<=1&&P()},D={mode:o,persisted:a,beforeEnter(S){let x=l;if(!t.isMounted)if(s)x=m||l;else return;S[_r]&&S[_r](!0);const P=R[v];P&&Bs(n,P)&&P.el[_r]&&P.el[_r](),w(x,[S])},enter(S){let x=c,P=u,U=f;if(!t.isMounted)if(s)x=p||c,P=y||u,U=M||f;else return;let k=!1;const Y=S[Dl]=te=>{k||(k=!0,te?w(U,[S]):w(P,[S]),D.delayedLeave&&D.delayedLeave(),S[Dl]=void 0)};x?T(x,[S,Y]):Y()},leave(S,x){const P=String(n.key);if(S[Dl]&&S[Dl](!0),t.isUnmounting)return x();w(h,[S]);let U=!1;const k=S[_r]=Y=>{U||(U=!0,x(),Y?w(g,[S]):w(_,[S]),S[_r]=void 0,R[P]===n&&delete R[P])};R[P]=n,d?T(d,[S,k]):k()},clone(S){const x=Bf(S,e,t,i,r);return r&&r(x),x}};return D}function Iu(n){if(du(n))return n=us(n),n.children=null,n}function fp(n){if(!du(n))return _g(n.type)&&n.children?xg(n.children):n;if(n.component)return n.component.subTree;const{shapeFlag:e,children:t}=n;if(t){if(e&16)return t[0];if(e&32&&it(t.default))return t.default()}}function ol(n,e){n.shapeFlag&6&&n.component?(n.transition=e,ol(n.component.subTree,e)):n.shapeFlag&128?(n.ssContent.transition=e.clone(n.ssContent),n.ssFallback.transition=e.clone(n.ssFallback)):n.transition=e}function Sg(n,e=!1,t){let i=[],r=0;for(let s=0;s<n.length;s++){let o=n[s];const a=t==null?o.key:String(t)+String(o.key!=null?o.key:s);o.type===At?(o.patchFlag&128&&r++,i=i.concat(Sg(o.children,e,a))):(e||o.type!==zn)&&i.push(a!=null?us(o,{key:a}):o)}if(r>1)for(let s=0;s<i.length;s++)i[s].patchFlag=-2;return i}function Mg(n){n.ids=[n.ids[0]+n.ids[2]+++"-",0,0]}const kc=new WeakMap;function Ba(n,e,t,i,r=!1){if(je(n)){n.forEach((_,g)=>Ba(_,e&&(je(e)?e[g]:e),t,i,r));return}if(ka(i)&&!r){i.shapeFlag&512&&i.type.__asyncResolved&&i.component.subTree.component&&Ba(n,e,t,i.component.subTree);return}const s=i.shapeFlag&4?gu(i.component):i.el,o=r?null:s,{i:a,r:l}=n,c=e&&e.r,u=a.refs===It?a.refs={}:a.refs,f=a.setupState,h=xt(f),d=f===It?k_:_=>Tt(h,_);if(c!=null&&c!==l){if(hp(e),Zt(c))u[c]=null,d(c)&&(f[c]=null);else if(wn(c)){c.value=null;const _=e;_.k&&(u[_.k]=null)}}if(it(l))Sl(l,a,12,[o,u]);else{const _=Zt(l),g=wn(l);if(_||g){const m=()=>{if(n.f){const p=_?d(l)?f[l]:u[l]:l.value;if(r)je(p)&&sd(p,s);else if(je(p))p.includes(s)||p.push(s);else if(_)u[l]=[s],d(l)&&(f[l]=u[l]);else{const y=[s];l.value=y,n.k&&(u[n.k]=y)}}else _?(u[l]=o,d(l)&&(f[l]=o)):g&&(l.value=o,n.k&&(u[n.k]=o))};if(o){const p=()=>{m(),kc.delete(n)};p.id=-1,kc.set(n,p),ii(p,t)}else hp(n),m()}}}function hp(n){const e=kc.get(n);e&&(e.flags|=8,kc.delete(n))}cu().requestIdleCallback;cu().cancelIdleCallback;const ka=n=>!!n.type.__asyncLoader,du=n=>n.type.__isKeepAlive;function Jx(n,e){bg(n,"a",e)}function Qx(n,e){bg(n,"da",e)}function bg(n,e,t=Hn){const i=n.__wdc||(n.__wdc=()=>{let r=t;for(;r;){if(r.isDeactivated)return;r=r.parent}return n()});if(pu(e,i,t),t){let r=t.parent;for(;r&&r.parent;)du(r.parent.vnode)&&ey(i,e,t,r),r=r.parent}}function ey(n,e,t,i){const r=pu(e,n,i,!0);Nr(()=>{sd(i[e],r)},t)}function pu(n,e,t=Hn,i=!1){if(t){const r=t[n]||(t[n]=[]),s=e.__weh||(e.__weh=(...o)=>{Cr();const a=Ml(t),l=Vi(e,t,n,o);return a(),Rr(),l});return i?r.unshift(s):r.push(s),s}}const Ur=n=>(e,t=Hn)=>{(!ll||n==="sp")&&pu(n,(...i)=>e(...i),t)},ty=Ur("bm"),rr=Ur("m"),ny=Ur("bu"),iy=Ur("u"),_d=Ur("bum"),Nr=Ur("um"),ry=Ur("sp"),sy=Ur("rtg"),oy=Ur("rtc");function ay(n,e=Hn){pu("ec",n,e)}const ly=Symbol.for("v-ndc");function fn(n,e,t,i){let r;const s=t,o=je(n);if(o||Zt(n)){const a=o&&Fo(n);let l=!1,c=!1;a&&(l=!Ai(n),c=cs(n),n=uu(n)),r=new Array(n.length);for(let u=0,f=n.length;u<f;u++)r[u]=e(l?c?Nc(dn(n[u])):dn(n[u]):n[u],u,void 0,s)}else if(typeof n=="number"){r=new Array(n);for(let a=0;a<n;a++)r[a]=e(a+1,a,void 0,s)}else if(Ft(n))if(n[Symbol.iterator])r=Array.from(n,(a,l)=>e(a,l,void 0,s));else{const a=Object.keys(n);r=new Array(a.length);for(let l=0,c=a.length;l<c;l++){const u=a[l];r[l]=e(n[u],u,l,s)}}else r=[];return r}const kf=n=>n?Wg(n)?gu(n):kf(n.parent):null,za=vn(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>kf(n.parent),$root:n=>kf(n.root),$host:n=>n.ce,$emit:n=>n.emit,$options:n=>Tg(n),$forceUpdate:n=>n.f||(n.f=()=>{md(n.update)}),$nextTick:n=>n.n||(n.n=yr.bind(n.proxy)),$watch:n=>Py.bind(n)}),Uu=(n,e)=>n!==It&&!n.__isScriptSetup&&Tt(n,e),cy={get({_:n},e){if(e==="__v_skip")return!0;const{ctx:t,setupState:i,data:r,props:s,accessCache:o,type:a,appContext:l}=n;let c;if(e[0]!=="$"){const d=o[e];if(d!==void 0)switch(d){case 1:return i[e];case 2:return r[e];case 4:return t[e];case 3:return s[e]}else{if(Uu(i,e))return o[e]=1,i[e];if(r!==It&&Tt(r,e))return o[e]=2,r[e];if((c=n.propsOptions[0])&&Tt(c,e))return o[e]=3,s[e];if(t!==It&&Tt(t,e))return o[e]=4,t[e];zf&&(o[e]=0)}}const u=za[e];let f,h;if(u)return e==="$attrs"&&bn(n.attrs,"get",""),u(n);if((f=a.__cssModules)&&(f=f[e]))return f;if(t!==It&&Tt(t,e))return o[e]=4,t[e];if(h=l.config.globalProperties,Tt(h,e))return h[e]},set({_:n},e,t){const{data:i,setupState:r,ctx:s}=n;return Uu(r,e)?(r[e]=t,!0):i!==It&&Tt(i,e)?(i[e]=t,!0):Tt(n.props,e)||e[0]==="$"&&e.slice(1)in n?!1:(s[e]=t,!0)},has({_:{data:n,setupState:e,accessCache:t,ctx:i,appContext:r,propsOptions:s,type:o}},a){let l,c;return!!(t[a]||n!==It&&a[0]!=="$"&&Tt(n,a)||Uu(e,a)||(l=s[0])&&Tt(l,a)||Tt(i,a)||Tt(za,a)||Tt(r.config.globalProperties,a)||(c=o.__cssModules)&&c[a])},defineProperty(n,e,t){return t.get!=null?n._.accessCache[e]=0:Tt(t,"value")&&this.set(n,e,t.value,null),Reflect.defineProperty(n,e,t)}};function dp(n){return je(n)?n.reduce((e,t)=>(e[t]=null,e),{}):n}let zf=!0;function uy(n){const e=Tg(n),t=n.proxy,i=n.ctx;zf=!1,e.beforeCreate&&pp(e.beforeCreate,n,"bc");const{data:r,computed:s,methods:o,watch:a,provide:l,inject:c,created:u,beforeMount:f,mounted:h,beforeUpdate:d,updated:_,activated:g,deactivated:m,beforeDestroy:p,beforeUnmount:y,destroyed:M,unmounted:v,render:R,renderTracked:w,renderTriggered:T,errorCaptured:D,serverPrefetch:S,expose:x,inheritAttrs:P,components:U,directives:k,filters:Y}=e;if(c&&fy(c,i,null),o)for(const X in o){const V=o[X];it(V)&&(i[X]=V.bind(t))}if(r){const X=r.call(t,t);Ft(X)&&(n.data=hd(X))}if(zf=!0,s)for(const X in s){const V=s[X],ae=it(V)?V.bind(t,t):it(V.get)?V.get.bind(t,t):er,N=!it(V)&&it(V.set)?V.set.bind(t):er,ge=Yg({get:ae,set:N});Object.defineProperty(i,X,{enumerable:!0,configurable:!0,get:()=>ge.value,set:we=>ge.value=we})}if(a)for(const X in a)Eg(a[X],i,t,X);if(l){const X=it(l)?l.call(t):l;Reflect.ownKeys(X).forEach(V=>{gy(V,X[V])})}u&&pp(u,n,"c");function W(X,V){je(V)?V.forEach(ae=>X(ae.bind(t))):V&&X(V.bind(t))}if(W(ty,f),W(rr,h),W(ny,d),W(iy,_),W(Jx,g),W(Qx,m),W(ay,D),W(oy,w),W(sy,T),W(_d,y),W(Nr,v),W(ry,S),je(x))if(x.length){const X=n.exposed||(n.exposed={});x.forEach(V=>{Object.defineProperty(X,V,{get:()=>t[V],set:ae=>t[V]=ae,enumerable:!0})})}else n.exposed||(n.exposed={});R&&n.render===er&&(n.render=R),P!=null&&(n.inheritAttrs=P),U&&(n.components=U),k&&(n.directives=k),S&&Mg(n)}function fy(n,e,t=er){je(n)&&(n=Hf(n));for(const i in n){const r=n[i];let s;Ft(r)?"default"in r?s=_c(r.from||i,r.default,!0):s=_c(r.from||i):s=_c(r),wn(s)?Object.defineProperty(e,i,{enumerable:!0,configurable:!0,get:()=>s.value,set:o=>s.value=o}):e[i]=s}}function pp(n,e,t){Vi(je(n)?n.map(i=>i.bind(e.proxy)):n.bind(e.proxy),e,t)}function Eg(n,e,t,i){let r=i.includes(".")?Bg(t,i):()=>t[i];if(Zt(n)){const s=e[n];it(s)&&Ou(r,s)}else if(it(n))Ou(r,n.bind(t));else if(Ft(n))if(je(n))n.forEach(s=>Eg(s,e,t,i));else{const s=it(n.handler)?n.handler.bind(t):e[n.handler];it(s)&&Ou(r,s,n)}}function Tg(n){const e=n.type,{mixins:t,extends:i}=e,{mixins:r,optionsCache:s,config:{optionMergeStrategies:o}}=n.appContext,a=s.get(e);let l;return a?l=a:!r.length&&!t&&!i?l=e:(l={},r.length&&r.forEach(c=>zc(l,c,o,!0)),zc(l,e,o)),Ft(e)&&s.set(e,l),l}function zc(n,e,t,i=!1){const{mixins:r,extends:s}=e;s&&zc(n,s,t,!0),r&&r.forEach(o=>zc(n,o,t,!0));for(const o in e)if(!(i&&o==="expose")){const a=hy[o]||t&&t[o];n[o]=a?a(n[o],e[o]):e[o]}return n}const hy={data:mp,props:_p,emits:_p,methods:Ta,computed:Ta,beforeCreate:Pn,created:Pn,beforeMount:Pn,mounted:Pn,beforeUpdate:Pn,updated:Pn,beforeDestroy:Pn,beforeUnmount:Pn,destroyed:Pn,unmounted:Pn,activated:Pn,deactivated:Pn,errorCaptured:Pn,serverPrefetch:Pn,components:Ta,directives:Ta,watch:py,provide:mp,inject:dy};function mp(n,e){return e?n?function(){return vn(it(n)?n.call(this,this):n,it(e)?e.call(this,this):e)}:e:n}function dy(n,e){return Ta(Hf(n),Hf(e))}function Hf(n){if(je(n)){const e={};for(let t=0;t<n.length;t++)e[n[t]]=n[t];return e}return n}function Pn(n,e){return n?[...new Set([].concat(n,e))]:e}function Ta(n,e){return n?vn(Object.create(null),n,e):e}function _p(n,e){return n?je(n)&&je(e)?[...new Set([...n,...e])]:vn(Object.create(null),dp(n),dp(e??{})):e}function py(n,e){if(!n)return e;if(!e)return n;const t=vn(Object.create(null),n);for(const i in e)t[i]=Pn(n[i],e[i]);return t}function wg(){return{app:null,config:{isNativeTag:k_,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let my=0;function _y(n,e){return function(i,r=null){it(i)||(i=vn({},i)),r!=null&&!Ft(r)&&(r=null);const s=wg(),o=new WeakSet,a=[];let l=!1;const c=s.app={_uid:my++,_component:i,_props:r,_container:null,_context:s,_instance:null,version:eS,get config(){return s.config},set config(u){},use(u,...f){return o.has(u)||(u&&it(u.install)?(o.add(u),u.install(c,...f)):it(u)&&(o.add(u),u(c,...f))),c},mixin(u){return s.mixins.includes(u)||s.mixins.push(u),c},component(u,f){return f?(s.components[u]=f,c):s.components[u]},directive(u,f){return f?(s.directives[u]=f,c):s.directives[u]},mount(u,f,h){if(!l){const d=c._ceVNode||Dt(i,r);return d.appContext=s,h===!0?h="svg":h===!1&&(h=void 0),n(d,u,h),l=!0,c._container=u,u.__vue_app__=c,gu(d.component)}},onUnmount(u){a.push(u)},unmount(){l&&(Vi(a,c._instance,16),n(null,c._container),delete c._container.__vue_app__)},provide(u,f){return s.provides[u]=f,c},runWithContext(u){const f=ko;ko=c;try{return u()}finally{ko=f}}};return c}}let ko=null;function gy(n,e){if(Hn){let t=Hn.provides;const i=Hn.parent&&Hn.parent.provides;i===t&&(t=Hn.provides=Object.create(i)),t[n]=e}}function _c(n,e,t=!1){const i=Gg();if(i||ko){let r=ko?ko._context.provides:i?i.parent==null||i.ce?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(r&&n in r)return r[n];if(arguments.length>1)return t&&it(e)?e.call(i&&i.proxy):e}}const Ag={},Cg=()=>Object.create(Ag),Rg=n=>Object.getPrototypeOf(n)===Ag;function vy(n,e,t,i=!1){const r={},s=Cg();n.propsDefaults=Object.create(null),Pg(n,e,r,s);for(const o in n.propsOptions[0])o in r||(r[o]=void 0);t?n.props=i?r:Ox(r):n.type.props?n.props=r:n.props=s,n.attrs=s}function xy(n,e,t,i){const{props:r,attrs:s,vnode:{patchFlag:o}}=n,a=xt(r),[l]=n.propsOptions;let c=!1;if((i||o>0)&&!(o&16)){if(o&8){const u=n.vnode.dynamicProps;for(let f=0;f<u.length;f++){let h=u[f];if(mu(n.emitsOptions,h))continue;const d=e[h];if(l)if(Tt(s,h))d!==s[h]&&(s[h]=d,c=!0);else{const _=ls(h);r[_]=Vf(l,a,_,d,n,!1)}else d!==s[h]&&(s[h]=d,c=!0)}}}else{Pg(n,e,r,s)&&(c=!0);let u;for(const f in a)(!e||!Tt(e,f)&&((u=vs(f))===f||!Tt(e,u)))&&(l?t&&(t[f]!==void 0||t[u]!==void 0)&&(r[f]=Vf(l,a,f,void 0,n,!0)):delete r[f]);if(s!==a)for(const f in s)(!e||!Tt(e,f))&&(delete s[f],c=!0)}c&&vr(n.attrs,"set","")}function Pg(n,e,t,i){const[r,s]=n.propsOptions;let o=!1,a;if(e)for(let l in e){if(Na(l))continue;const c=e[l];let u;r&&Tt(r,u=ls(l))?!s||!s.includes(u)?t[u]=c:(a||(a={}))[u]=c:mu(n.emitsOptions,l)||(!(l in i)||c!==i[l])&&(i[l]=c,o=!0)}if(s){const l=xt(t),c=a||It;for(let u=0;u<s.length;u++){const f=s[u];t[f]=Vf(r,l,f,c[f],n,!Tt(c,f))}}return o}function Vf(n,e,t,i,r,s){const o=n[t];if(o!=null){const a=Tt(o,"default");if(a&&i===void 0){const l=o.default;if(o.type!==Function&&!o.skipFactory&&it(l)){const{propsDefaults:c}=r;if(t in c)i=c[t];else{const u=Ml(r);i=c[t]=l.call(null,e),u()}}else i=l;r.ce&&r.ce._setProp(t,i)}o[0]&&(s&&!a?i=!1:o[1]&&(i===""||i===vs(t))&&(i=!0))}return i}const yy=new WeakMap;function Dg(n,e,t=!1){const i=t?yy:e.propsCache,r=i.get(n);if(r)return r;const s=n.props,o={},a=[];let l=!1;if(!it(n)){const u=f=>{l=!0;const[h,d]=Dg(f,e,!0);vn(o,h),d&&a.push(...d)};!t&&e.mixins.length&&e.mixins.forEach(u),n.extends&&u(n.extends),n.mixins&&n.mixins.forEach(u)}if(!s&&!l)return Ft(n)&&i.set(n,No),No;if(je(s))for(let u=0;u<s.length;u++){const f=ls(s[u]);gp(f)&&(o[f]=It)}else if(s)for(const u in s){const f=ls(u);if(gp(f)){const h=s[u],d=o[f]=je(h)||it(h)?{type:h}:vn({},h),_=d.type;let g=!1,m=!0;if(je(_))for(let p=0;p<_.length;++p){const y=_[p],M=it(y)&&y.name;if(M==="Boolean"){g=!0;break}else M==="String"&&(m=!1)}else g=it(_)&&_.name==="Boolean";d[0]=g,d[1]=m,(g||Tt(d,"default"))&&a.push(f)}}const c=[o,a];return Ft(n)&&i.set(n,c),c}function gp(n){return n[0]!=="$"&&!Na(n)}const gd=n=>n==="_"||n==="_ctx"||n==="$stable",vd=n=>je(n)?n.map(qi):[qi(n)],Sy=(n,e,t)=>{if(e._n)return e;const i=mg((...r)=>vd(e(...r)),t);return i._c=!1,i},Lg=(n,e,t)=>{const i=n._ctx;for(const r in n){if(gd(r))continue;const s=n[r];if(it(s))e[r]=Sy(r,s,i);else if(s!=null){const o=vd(s);e[r]=()=>o}}},Ig=(n,e)=>{const t=vd(e);n.slots.default=()=>t},Ug=(n,e,t)=>{for(const i in e)(t||!gd(i))&&(n[i]=e[i])},My=(n,e,t)=>{const i=n.slots=Cg();if(n.vnode.shapeFlag&32){const r=e._;r?(Ug(i,e,t),t&&X_(i,"_",r,!0)):Lg(e,i)}else e&&Ig(n,e)},by=(n,e,t)=>{const{vnode:i,slots:r}=n;let s=!0,o=It;if(i.shapeFlag&32){const a=e._;a?t&&a===1?s=!1:Ug(r,e,t):(s=!e.$stable,Lg(e,r)),o=e}else e&&(Ig(n,e),o={default:1});if(s)for(const a in r)!gd(a)&&o[a]==null&&delete r[a]},ii=By;function Ey(n){return Ty(n)}function Ty(n,e){const t=cu();t.__VUE__=!0;const{insert:i,remove:r,patchProp:s,createElement:o,createText:a,createComment:l,setText:c,setElementText:u,parentNode:f,nextSibling:h,setScopeId:d=er,insertStaticContent:_}=n,g=(I,O,C,oe=null,Q=null,L=null,ne=void 0,le=null,ie=!!O.dynamicChildren)=>{if(I===O)return;I&&!Bs(I,O)&&(oe=he(I),we(I,Q,L,!0),I=null),O.patchFlag===-2&&(ie=!1,O.dynamicChildren=null);const{type:E,ref:b,shapeFlag:F}=O;switch(E){case _u:m(I,O,C,oe);break;case zn:p(I,O,C,oe);break;case gc:I==null&&y(O,C,oe,ne);break;case At:U(I,O,C,oe,Q,L,ne,le,ie);break;default:F&1?R(I,O,C,oe,Q,L,ne,le,ie):F&6?k(I,O,C,oe,Q,L,ne,le,ie):(F&64||F&128)&&E.process(I,O,C,oe,Q,L,ne,le,ie,be)}b!=null&&Q?Ba(b,I&&I.ref,L,O||I,!O):b==null&&I&&I.ref!=null&&Ba(I.ref,null,L,I,!0)},m=(I,O,C,oe)=>{if(I==null)i(O.el=a(O.children),C,oe);else{const Q=O.el=I.el;O.children!==I.children&&c(Q,O.children)}},p=(I,O,C,oe)=>{I==null?i(O.el=l(O.children||""),C,oe):O.el=I.el},y=(I,O,C,oe)=>{[I.el,I.anchor]=_(I.children,O,C,oe,I.el,I.anchor)},M=({el:I,anchor:O},C,oe)=>{let Q;for(;I&&I!==O;)Q=h(I),i(I,C,oe),I=Q;i(O,C,oe)},v=({el:I,anchor:O})=>{let C;for(;I&&I!==O;)C=h(I),r(I),I=C;r(O)},R=(I,O,C,oe,Q,L,ne,le,ie)=>{O.type==="svg"?ne="svg":O.type==="math"&&(ne="mathml"),I==null?w(O,C,oe,Q,L,ne,le,ie):S(I,O,Q,L,ne,le,ie)},w=(I,O,C,oe,Q,L,ne,le)=>{let ie,E;const{props:b,shapeFlag:F,transition:$,dirs:q}=I;if(ie=I.el=o(I.type,L,b&&b.is,b),F&8?u(ie,I.children):F&16&&D(I.children,ie,null,oe,Q,Nu(I,L),ne,le),q&&ys(I,null,oe,"created"),T(ie,I,I.scopeId,ne,oe),b){for(const pe in b)pe!=="value"&&!Na(pe)&&s(ie,pe,null,b[pe],L,oe);"value"in b&&s(ie,"value",null,b.value,L),(E=b.onVnodeBeforeMount)&&Wi(E,oe,I)}q&&ys(I,null,oe,"beforeMount");const Z=wy(Q,$);Z&&$.beforeEnter(ie),i(ie,O,C),((E=b&&b.onVnodeMounted)||Z||q)&&ii(()=>{E&&Wi(E,oe,I),Z&&$.enter(ie),q&&ys(I,null,oe,"mounted")},Q)},T=(I,O,C,oe,Q)=>{if(C&&d(I,C),oe)for(let L=0;L<oe.length;L++)d(I,oe[L]);if(Q){let L=Q.subTree;if(O===L||zg(L.type)&&(L.ssContent===O||L.ssFallback===O)){const ne=Q.vnode;T(I,ne,ne.scopeId,ne.slotScopeIds,Q.parent)}}},D=(I,O,C,oe,Q,L,ne,le,ie=0)=>{for(let E=ie;E<I.length;E++){const b=I[E]=le?qr(I[E]):qi(I[E]);g(null,b,O,C,oe,Q,L,ne,le)}},S=(I,O,C,oe,Q,L,ne)=>{const le=O.el=I.el;let{patchFlag:ie,dynamicChildren:E,dirs:b}=O;ie|=I.patchFlag&16;const F=I.props||It,$=O.props||It;let q;if(C&&Ss(C,!1),(q=$.onVnodeBeforeUpdate)&&Wi(q,C,O,I),b&&ys(O,I,C,"beforeUpdate"),C&&Ss(C,!0),(F.innerHTML&&$.innerHTML==null||F.textContent&&$.textContent==null)&&u(le,""),E?x(I.dynamicChildren,E,le,C,oe,Nu(O,Q),L):ne||V(I,O,le,null,C,oe,Nu(O,Q),L,!1),ie>0){if(ie&16)P(le,F,$,C,Q);else if(ie&2&&F.class!==$.class&&s(le,"class",null,$.class,Q),ie&4&&s(le,"style",F.style,$.style,Q),ie&8){const Z=O.dynamicProps;for(let pe=0;pe<Z.length;pe++){const ue=Z[pe],xe=F[ue],He=$[ue];(He!==xe||ue==="value")&&s(le,ue,xe,He,Q,C)}}ie&1&&I.children!==O.children&&u(le,O.children)}else!ne&&E==null&&P(le,F,$,C,Q);((q=$.onVnodeUpdated)||b)&&ii(()=>{q&&Wi(q,C,O,I),b&&ys(O,I,C,"updated")},oe)},x=(I,O,C,oe,Q,L,ne)=>{for(let le=0;le<O.length;le++){const ie=I[le],E=O[le],b=ie.el&&(ie.type===At||!Bs(ie,E)||ie.shapeFlag&198)?f(ie.el):C;g(ie,E,b,null,oe,Q,L,ne,!0)}},P=(I,O,C,oe,Q)=>{if(O!==C){if(O!==It)for(const L in O)!Na(L)&&!(L in C)&&s(I,L,O[L],null,Q,oe);for(const L in C){if(Na(L))continue;const ne=C[L],le=O[L];ne!==le&&L!=="value"&&s(I,L,le,ne,Q,oe)}"value"in C&&s(I,"value",O.value,C.value,Q)}},U=(I,O,C,oe,Q,L,ne,le,ie)=>{const E=O.el=I?I.el:a(""),b=O.anchor=I?I.anchor:a("");let{patchFlag:F,dynamicChildren:$,slotScopeIds:q}=O;q&&(le=le?le.concat(q):q),I==null?(i(E,C,oe),i(b,C,oe),D(O.children||[],C,b,Q,L,ne,le,ie)):F>0&&F&64&&$&&I.dynamicChildren?(x(I.dynamicChildren,$,C,Q,L,ne,le),(O.key!=null||Q&&O===Q.subTree)&&Ng(I,O,!0)):V(I,O,C,b,Q,L,ne,le,ie)},k=(I,O,C,oe,Q,L,ne,le,ie)=>{O.slotScopeIds=le,I==null?O.shapeFlag&512?Q.ctx.activate(O,C,oe,ne,ie):Y(O,C,oe,Q,L,ne,ie):te(I,O,ie)},Y=(I,O,C,oe,Q,L,ne)=>{const le=I.component=$y(I,oe,Q);if(du(I)&&(le.ctx.renderer=be),qy(le,!1,ne),le.asyncDep){if(Q&&Q.registerDep(le,W,ne),!I.el){const ie=le.subTree=Dt(zn);p(null,ie,O,C),I.placeholder=ie.el}}else W(le,I,O,C,Q,L,ne)},te=(I,O,C)=>{const oe=O.component=I.component;if(Oy(I,O,C))if(oe.asyncDep&&!oe.asyncResolved){X(oe,O,C);return}else oe.next=O,oe.update();else O.el=I.el,oe.vnode=O},W=(I,O,C,oe,Q,L,ne)=>{const le=()=>{if(I.isMounted){let{next:F,bu:$,u:q,parent:Z,vnode:pe}=I;{const ve=Og(I);if(ve){F&&(F.el=pe.el,X(I,F,ne)),ve.asyncDep.then(()=>{I.isUnmounted||le()});return}}let ue=F,xe;Ss(I,!1),F?(F.el=pe.el,X(I,F,ne)):F=pe,$&&mc($),(xe=F.props&&F.props.onVnodeBeforeUpdate)&&Wi(xe,Z,F,pe),Ss(I,!0);const He=xp(I),me=I.subTree;I.subTree=He,g(me,He,f(me.el),he(me),I,Q,L),F.el=He.el,ue===null&&Fy(I,He.el),q&&ii(q,Q),(xe=F.props&&F.props.onVnodeUpdated)&&ii(()=>Wi(xe,Z,F,pe),Q)}else{let F;const{el:$,props:q}=O,{bm:Z,m:pe,parent:ue,root:xe,type:He}=I,me=ka(O);Ss(I,!1),Z&&mc(Z),!me&&(F=q&&q.onVnodeBeforeMount)&&Wi(F,ue,O),Ss(I,!0);{xe.ce&&xe.ce._def.shadowRoot!==!1&&xe.ce._injectChildStyle(He);const ve=I.subTree=xp(I);g(null,ve,C,oe,I,Q,L),O.el=ve.el}if(pe&&ii(pe,Q),!me&&(F=q&&q.onVnodeMounted)){const ve=O;ii(()=>Wi(F,ue,ve),Q)}(O.shapeFlag&256||ue&&ka(ue.vnode)&&ue.vnode.shapeFlag&256)&&I.a&&ii(I.a,Q),I.isMounted=!0,O=C=oe=null}};I.scope.on();const ie=I.effect=new K_(le);I.scope.off();const E=I.update=ie.run.bind(ie),b=I.job=ie.runIfDirty.bind(ie);b.i=I,b.id=I.uid,ie.scheduler=()=>md(b),Ss(I,!0),E()},X=(I,O,C)=>{O.component=I;const oe=I.vnode.props;I.vnode=O,I.next=null,xy(I,O.props,oe,C),by(I,O.children,C),Cr(),cp(I),Rr()},V=(I,O,C,oe,Q,L,ne,le,ie=!1)=>{const E=I&&I.children,b=I?I.shapeFlag:0,F=O.children,{patchFlag:$,shapeFlag:q}=O;if($>0){if($&128){N(E,F,C,oe,Q,L,ne,le,ie);return}else if($&256){ae(E,F,C,oe,Q,L,ne,le,ie);return}}q&8?(b&16&&de(E,Q,L),F!==E&&u(C,F)):b&16?q&16?N(E,F,C,oe,Q,L,ne,le,ie):de(E,Q,L,!0):(b&8&&u(C,""),q&16&&D(F,C,oe,Q,L,ne,le,ie))},ae=(I,O,C,oe,Q,L,ne,le,ie)=>{I=I||No,O=O||No;const E=I.length,b=O.length,F=Math.min(E,b);let $;for($=0;$<F;$++){const q=O[$]=ie?qr(O[$]):qi(O[$]);g(I[$],q,C,null,Q,L,ne,le,ie)}E>b?de(I,Q,L,!0,!1,F):D(O,C,oe,Q,L,ne,le,ie,F)},N=(I,O,C,oe,Q,L,ne,le,ie)=>{let E=0;const b=O.length;let F=I.length-1,$=b-1;for(;E<=F&&E<=$;){const q=I[E],Z=O[E]=ie?qr(O[E]):qi(O[E]);if(Bs(q,Z))g(q,Z,C,null,Q,L,ne,le,ie);else break;E++}for(;E<=F&&E<=$;){const q=I[F],Z=O[$]=ie?qr(O[$]):qi(O[$]);if(Bs(q,Z))g(q,Z,C,null,Q,L,ne,le,ie);else break;F--,$--}if(E>F){if(E<=$){const q=$+1,Z=q<b?O[q].el:oe;for(;E<=$;)g(null,O[E]=ie?qr(O[E]):qi(O[E]),C,Z,Q,L,ne,le,ie),E++}}else if(E>$)for(;E<=F;)we(I[E],Q,L,!0),E++;else{const q=E,Z=E,pe=new Map;for(E=Z;E<=$;E++){const Me=O[E]=ie?qr(O[E]):qi(O[E]);Me.key!=null&&pe.set(Me.key,E)}let ue,xe=0;const He=$-Z+1;let me=!1,ve=0;const ze=new Array(He);for(E=0;E<He;E++)ze[E]=0;for(E=q;E<=F;E++){const Me=I[E];if(xe>=He){we(Me,Q,L,!0);continue}let We;if(Me.key!=null)We=pe.get(Me.key);else for(ue=Z;ue<=$;ue++)if(ze[ue-Z]===0&&Bs(Me,O[ue])){We=ue;break}We===void 0?we(Me,Q,L,!0):(ze[We-Z]=E+1,We>=ve?ve=We:me=!0,g(Me,O[We],C,null,Q,L,ne,le,ie),xe++)}const Ve=me?Ay(ze):No;for(ue=Ve.length-1,E=He-1;E>=0;E--){const Me=Z+E,We=O[Me],Xe=O[Me+1],ft=Me+1<b?Xe.el||Xe.placeholder:oe;ze[E]===0?g(null,We,C,ft,Q,L,ne,le,ie):me&&(ue<0||E!==Ve[ue]?ge(We,C,ft,2):ue--)}}},ge=(I,O,C,oe,Q=null)=>{const{el:L,type:ne,transition:le,children:ie,shapeFlag:E}=I;if(E&6){ge(I.component.subTree,O,C,oe);return}if(E&128){I.suspense.move(O,C,oe);return}if(E&64){ne.move(I,O,C,be);return}if(ne===At){i(L,O,C);for(let F=0;F<ie.length;F++)ge(ie[F],O,C,oe);i(I.anchor,O,C);return}if(ne===gc){M(I,O,C);return}if(oe!==2&&E&1&&le)if(oe===0)le.beforeEnter(L),i(L,O,C),ii(()=>le.enter(L),Q);else{const{leave:F,delayLeave:$,afterLeave:q}=le,Z=()=>{I.ctx.isUnmounted?r(L):i(L,O,C)},pe=()=>{L._isLeaving&&L[_r](!0),F(L,()=>{Z(),q&&q()})};$?$(L,Z,pe):pe()}else i(L,O,C)},we=(I,O,C,oe=!1,Q=!1)=>{const{type:L,props:ne,ref:le,children:ie,dynamicChildren:E,shapeFlag:b,patchFlag:F,dirs:$,cacheIndex:q}=I;if(F===-2&&(Q=!1),le!=null&&(Cr(),Ba(le,null,C,I,!0),Rr()),q!=null&&(O.renderCache[q]=void 0),b&256){O.ctx.deactivate(I);return}const Z=b&1&&$,pe=!ka(I);let ue;if(pe&&(ue=ne&&ne.onVnodeBeforeUnmount)&&Wi(ue,O,I),b&6)fe(I.component,C,oe);else{if(b&128){I.suspense.unmount(C,oe);return}Z&&ys(I,null,O,"beforeUnmount"),b&64?I.type.remove(I,O,C,be,oe):E&&!E.hasOnce&&(L!==At||F>0&&F&64)?de(E,O,C,!1,!0):(L===At&&F&384||!Q&&b&16)&&de(ie,O,C),oe&&Be(I)}(pe&&(ue=ne&&ne.onVnodeUnmounted)||Z)&&ii(()=>{ue&&Wi(ue,O,I),Z&&ys(I,null,O,"unmounted")},C)},Be=I=>{const{type:O,el:C,anchor:oe,transition:Q}=I;if(O===At){ee(C,oe);return}if(O===gc){v(I);return}const L=()=>{r(C),Q&&!Q.persisted&&Q.afterLeave&&Q.afterLeave()};if(I.shapeFlag&1&&Q&&!Q.persisted){const{leave:ne,delayLeave:le}=Q,ie=()=>ne(C,L);le?le(I.el,L,ie):ie()}else L()},ee=(I,O)=>{let C;for(;I!==O;)C=h(I),r(I),I=C;r(O)},fe=(I,O,C)=>{const{bum:oe,scope:Q,job:L,subTree:ne,um:le,m:ie,a:E}=I;vp(ie),vp(E),oe&&mc(oe),Q.stop(),L&&(L.flags|=8,we(ne,I,O,C)),le&&ii(le,O),ii(()=>{I.isUnmounted=!0},O)},de=(I,O,C,oe=!1,Q=!1,L=0)=>{for(let ne=L;ne<I.length;ne++)we(I[ne],O,C,oe,Q)},he=I=>{if(I.shapeFlag&6)return he(I.component.subTree);if(I.shapeFlag&128)return I.suspense.next();const O=h(I.anchor||I.el),C=O&&O[qx];return C?h(C):O};let se=!1;const _e=(I,O,C)=>{I==null?O._vnode&&we(O._vnode,null,null,!0):g(O._vnode||null,I,O,null,null,null,C),O._vnode=I,se||(se=!0,cp(),hg(),se=!1)},be={p:g,um:we,m:ge,r:Be,mt:Y,mc:D,pc:V,pbc:x,n:he,o:n};return{render:_e,hydrate:void 0,createApp:_y(_e)}}function Nu({type:n,props:e},t){return t==="svg"&&n==="foreignObject"||t==="mathml"&&n==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:t}function Ss({effect:n,job:e},t){t?(n.flags|=32,e.flags|=4):(n.flags&=-33,e.flags&=-5)}function wy(n,e){return(!n||n&&!n.pendingBranch)&&e&&!e.persisted}function Ng(n,e,t=!1){const i=n.children,r=e.children;if(je(i)&&je(r))for(let s=0;s<i.length;s++){const o=i[s];let a=r[s];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=r[s]=qr(r[s]),a.el=o.el),!t&&a.patchFlag!==-2&&Ng(o,a)),a.type===_u&&a.patchFlag!==-1&&(a.el=o.el),a.type===zn&&!a.el&&(a.el=o.el)}}function Ay(n){const e=n.slice(),t=[0];let i,r,s,o,a;const l=n.length;for(i=0;i<l;i++){const c=n[i];if(c!==0){if(r=t[t.length-1],n[r]<c){e[i]=r,t.push(i);continue}for(s=0,o=t.length-1;s<o;)a=s+o>>1,n[t[a]]<c?s=a+1:o=a;c<n[t[s]]&&(s>0&&(e[i]=t[s-1]),t[s]=i)}}for(s=t.length,o=t[s-1];s-- >0;)t[s]=o,o=e[o];return t}function Og(n){const e=n.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:Og(e)}function vp(n){if(n)for(let e=0;e<n.length;e++)n[e].flags|=8}const Cy=Symbol.for("v-scx"),Ry=()=>_c(Cy);function Ou(n,e,t){return Fg(n,e,t)}function Fg(n,e,t=It){const{immediate:i,deep:r,flush:s,once:o}=t,a=vn({},t),l=e&&i||!e&&s!=="post";let c;if(ll){if(s==="sync"){const d=Ry();c=d.__watcherHandles||(d.__watcherHandles=[])}else if(!l){const d=()=>{};return d.stop=er,d.resume=er,d.pause=er,d}}const u=Hn;a.call=(d,_,g)=>Vi(d,u,_,g);let f=!1;s==="post"?a.scheduler=d=>{ii(d,u&&u.suspense)}:s!=="sync"&&(f=!0,a.scheduler=(d,_)=>{_?d():md(d)}),a.augmentJob=d=>{e&&(d.flags|=4),f&&(d.flags|=2,u&&(d.id=u.uid,d.i=u))};const h=Wx(n,e,a);return ll&&(c?c.push(h):l&&h()),h}function Py(n,e,t){const i=this.proxy,r=Zt(n)?n.includes(".")?Bg(i,n):()=>i[n]:n.bind(i,i);let s;it(e)?s=e:(s=e.handler,t=e);const o=Ml(this),a=Fg(r,s.bind(i),t);return o(),a}function Bg(n,e){const t=e.split(".");return()=>{let i=n;for(let r=0;r<t.length&&i;r++)i=i[t[r]];return i}}const Dy=(n,e)=>e==="modelValue"||e==="model-value"?n.modelModifiers:n[`${e}Modifiers`]||n[`${ls(e)}Modifiers`]||n[`${vs(e)}Modifiers`];function Ly(n,e,...t){if(n.isUnmounted)return;const i=n.vnode.props||It;let r=t;const s=e.startsWith("update:"),o=s&&Dy(i,e.slice(7));o&&(o.trim&&(r=t.map(u=>Zt(u)?u.trim():u)),o.number&&(r=t.map(Lf)));let a,l=i[a=Cu(e)]||i[a=Cu(ls(e))];!l&&s&&(l=i[a=Cu(vs(e))]),l&&Vi(l,n,6,r);const c=i[a+"Once"];if(c){if(!n.emitted)n.emitted={};else if(n.emitted[a])return;n.emitted[a]=!0,Vi(c,n,6,r)}}const Iy=new WeakMap;function kg(n,e,t=!1){const i=t?Iy:e.emitsCache,r=i.get(n);if(r!==void 0)return r;const s=n.emits;let o={},a=!1;if(!it(n)){const l=c=>{const u=kg(c,e,!0);u&&(a=!0,vn(o,u))};!t&&e.mixins.length&&e.mixins.forEach(l),n.extends&&l(n.extends),n.mixins&&n.mixins.forEach(l)}return!s&&!a?(Ft(n)&&i.set(n,null),null):(je(s)?s.forEach(l=>o[l]=null):vn(o,s),Ft(n)&&i.set(n,o),o)}function mu(n,e){return!n||!ou(e)?!1:(e=e.slice(2).replace(/Once$/,""),Tt(n,e[0].toLowerCase()+e.slice(1))||Tt(n,vs(e))||Tt(n,e))}function xp(n){const{type:e,vnode:t,proxy:i,withProxy:r,propsOptions:[s],slots:o,attrs:a,emit:l,render:c,renderCache:u,props:f,data:h,setupState:d,ctx:_,inheritAttrs:g}=n,m=Bc(n);let p,y;try{if(t.shapeFlag&4){const v=r||i,R=v;p=qi(c.call(R,v,u,f,d,h,_)),y=a}else{const v=e;p=qi(v.length>1?v(f,{attrs:a,slots:o,emit:l}):v(f,null)),y=e.props?a:Uy(a)}}catch(v){Ha.length=0,hu(v,n,1),p=Dt(zn)}let M=p;if(y&&g!==!1){const v=Object.keys(y),{shapeFlag:R}=M;v.length&&R&7&&(s&&v.some(rd)&&(y=Ny(y,s)),M=us(M,y,!1,!0))}return t.dirs&&(M=us(M,null,!1,!0),M.dirs=M.dirs?M.dirs.concat(t.dirs):t.dirs),t.transition&&ol(M,t.transition),p=M,Bc(m),p}const Uy=n=>{let e;for(const t in n)(t==="class"||t==="style"||ou(t))&&((e||(e={}))[t]=n[t]);return e},Ny=(n,e)=>{const t={};for(const i in n)(!rd(i)||!(i.slice(9)in e))&&(t[i]=n[i]);return t};function Oy(n,e,t){const{props:i,children:r,component:s}=n,{props:o,children:a,patchFlag:l}=e,c=s.emitsOptions;if(e.dirs||e.transition)return!0;if(t&&l>=0){if(l&1024)return!0;if(l&16)return i?yp(i,o,c):!!o;if(l&8){const u=e.dynamicProps;for(let f=0;f<u.length;f++){const h=u[f];if(o[h]!==i[h]&&!mu(c,h))return!0}}}else return(r||a)&&(!a||!a.$stable)?!0:i===o?!1:i?o?yp(i,o,c):!0:!!o;return!1}function yp(n,e,t){const i=Object.keys(e);if(i.length!==Object.keys(n).length)return!0;for(let r=0;r<i.length;r++){const s=i[r];if(e[s]!==n[s]&&!mu(t,s))return!0}return!1}function Fy({vnode:n,parent:e},t){for(;e;){const i=e.subTree;if(i.suspense&&i.suspense.activeBranch===n&&(i.el=n.el),i===n)(n=e.vnode).el=t,e=e.parent;else break}}const zg=n=>n.__isSuspense;function By(n,e){e&&e.pendingBranch?je(n)?e.effects.push(...n):e.effects.push(n):$x(n)}const At=Symbol.for("v-fgt"),_u=Symbol.for("v-txt"),zn=Symbol.for("v-cmt"),gc=Symbol.for("v-stc"),Ha=[];let fi=null;function Ye(n=!1){Ha.push(fi=n?null:[])}function ky(){Ha.pop(),fi=Ha[Ha.length-1]||null}let al=1;function Hc(n,e=!1){al+=n,n<0&&fi&&e&&(fi.hasOnce=!0)}function Hg(n){return n.dynamicChildren=al>0?fi||No:null,ky(),al>0&&fi&&fi.push(n),n}function $e(n,e,t,i,r,s){return Hg(z(n,e,t,i,r,s,!0))}function zy(n,e,t,i,r){return Hg(Dt(n,e,t,i,r,!0))}function Vc(n){return n?n.__v_isVNode===!0:!1}function Bs(n,e){return n.type===e.type&&n.key===e.key}const Vg=({key:n})=>n??null,vc=({ref:n,ref_key:e,ref_for:t})=>(typeof n=="number"&&(n=""+n),n!=null?Zt(n)||wn(n)||it(n)?{i:bi,r:n,k:e,f:!!t}:n:null);function z(n,e=null,t=null,i=0,r=null,s=n===At?0:1,o=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:n,props:e,key:e&&Vg(e),ref:e&&vc(e),scopeId:pg,slotScopeIds:null,children:t,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:s,patchFlag:i,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:bi};return a?(xd(l,t),s&128&&n.normalize(l)):t&&(l.shapeFlag|=Zt(t)?8:16),al>0&&!o&&fi&&(l.patchFlag>0||s&6)&&l.patchFlag!==32&&fi.push(l),l}const Dt=Hy;function Hy(n,e=null,t=null,i=0,r=null,s=!1){if((!n||n===ly)&&(n=zn),Vc(n)){const a=us(n,e,!0);return t&&xd(a,t),al>0&&!s&&fi&&(a.shapeFlag&6?fi[fi.indexOf(n)]=a:fi.push(a)),a.patchFlag=-2,a}if(Jy(n)&&(n=n.__vccOpts),e){e=Vy(e);let{class:a,style:l}=e;a&&!Zt(a)&&(e.class=Hi(a)),Ft(l)&&(pd(l)&&!je(l)&&(l=vn({},l)),e.style=Ir(l))}const o=Zt(n)?1:zg(n)?128:_g(n)?64:Ft(n)?4:it(n)?2:0;return z(n,e,t,i,r,o,s,!0)}function Vy(n){return n?pd(n)||Rg(n)?vn({},n):n:null}function us(n,e,t=!1,i=!1){const{props:r,ref:s,patchFlag:o,children:a,transition:l}=n,c=e?Wy(r||{},e):r,u={__v_isVNode:!0,__v_skip:!0,type:n.type,props:c,key:c&&Vg(c),ref:e&&e.ref?t&&s?je(s)?s.concat(vc(e)):[s,vc(e)]:vc(e):s,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:a,target:n.target,targetStart:n.targetStart,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:e&&n.type!==At?o===-1?16:o|16:o,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:l,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&us(n.ssContent),ssFallback:n.ssFallback&&us(n.ssFallback),placeholder:n.placeholder,el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce};return l&&i&&ol(u,l.clone(u)),u}function Gy(n=" ",e=0){return Dt(_u,null,n,e)}function fs(n,e){const t=Dt(gc,null,n);return t.staticCount=e,t}function ns(n="",e=!1){return e?(Ye(),zy(zn,null,n)):Dt(zn,null,n)}function qi(n){return n==null||typeof n=="boolean"?Dt(zn):je(n)?Dt(At,null,n.slice()):Vc(n)?qr(n):Dt(_u,null,String(n))}function qr(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:us(n)}function xd(n,e){let t=0;const{shapeFlag:i}=n;if(e==null)e=null;else if(je(e))t=16;else if(typeof e=="object")if(i&65){const r=e.default;r&&(r._c&&(r._d=!1),xd(n,r()),r._c&&(r._d=!0));return}else{t=32;const r=e._;!r&&!Rg(e)?e._ctx=bi:r===3&&bi&&(bi.slots._===1?e._=1:(e._=2,n.patchFlag|=1024))}else it(e)?(e={default:e,_ctx:bi},t=32):(e=String(e),i&64?(t=16,e=[Gy(e)]):t=8);n.children=e,n.shapeFlag|=t}function Wy(...n){const e={};for(let t=0;t<n.length;t++){const i=n[t];for(const r in i)if(r==="class")e.class!==i.class&&(e.class=Hi([e.class,i.class]));else if(r==="style")e.style=Ir([e.style,i.style]);else if(ou(r)){const s=e[r],o=i[r];o&&s!==o&&!(je(s)&&s.includes(o))&&(e[r]=s?[].concat(s,o):o)}else r!==""&&(e[r]=i[r])}return e}function Wi(n,e,t,i=null){Vi(n,e,7,[t,i])}const Xy=wg();let Yy=0;function $y(n,e,t){const i=n.type,r=(e?e.appContext:n.appContext)||Xy,s={uid:Yy++,vnode:n,type:i,parent:e,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new _x(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(r.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Dg(i,r),emitsOptions:kg(i,r),emit:null,emitted:null,propsDefaults:It,inheritAttrs:i.inheritAttrs,ctx:It,data:It,props:It,attrs:It,slots:It,refs:It,setupState:It,setupContext:null,suspense:t,suspenseId:t?t.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return s.ctx={_:s},s.root=e?e.root:s,s.emit=Ly.bind(null,s),n.ce&&n.ce(s),s}let Hn=null;const Gg=()=>Hn||bi;let Gc,Gf;{const n=cu(),e=(t,i)=>{let r;return(r=n[t])||(r=n[t]=[]),r.push(i),s=>{r.length>1?r.forEach(o=>o(s)):r[0](s)}};Gc=e("__VUE_INSTANCE_SETTERS__",t=>Hn=t),Gf=e("__VUE_SSR_SETTERS__",t=>ll=t)}const Ml=n=>{const e=Hn;return Gc(n),n.scope.on(),()=>{n.scope.off(),Gc(e)}},Sp=()=>{Hn&&Hn.scope.off(),Gc(null)};function Wg(n){return n.vnode.shapeFlag&4}let ll=!1;function qy(n,e=!1,t=!1){e&&Gf(e);const{props:i,children:r}=n.vnode,s=Wg(n);vy(n,i,s,e),My(n,r,t||e);const o=s?Ky(n,e):void 0;return e&&Gf(!1),o}function Ky(n,e){const t=n.type;n.accessCache=Object.create(null),n.proxy=new Proxy(n.ctx,cy);const{setup:i}=t;if(i){Cr();const r=n.setupContext=i.length>1?Zy(n):null,s=Ml(n),o=Sl(i,n,0,[n.props,r]),a=H_(o);if(Rr(),s(),(a||n.sp)&&!ka(n)&&Mg(n),a){if(o.then(Sp,Sp),e)return o.then(l=>{Mp(n,l)}).catch(l=>{hu(l,n,0)});n.asyncDep=o}else Mp(n,o)}else Xg(n)}function Mp(n,e,t){it(e)?n.type.__ssrInlineRender?n.ssrRender=e:n.render=e:Ft(e)&&(n.setupState=cg(e)),Xg(n)}function Xg(n,e,t){const i=n.type;n.render||(n.render=i.render||er);{const r=Ml(n);Cr();try{uy(n)}finally{Rr(),r()}}}const jy={get(n,e){return bn(n,"get",""),n[e]}};function Zy(n){const e=t=>{n.exposed=t||{}};return{attrs:new Proxy(n.attrs,jy),slots:n.slots,emit:n.emit,expose:e}}function gu(n){return n.exposed?n.exposeProxy||(n.exposeProxy=new Proxy(cg(Fx(n.exposed)),{get(e,t){if(t in e)return e[t];if(t in za)return za[t](n)},has(e,t){return t in e||t in za}})):n.proxy}function Jy(n){return it(n)&&"__vccOpts"in n}const Yg=(n,e)=>Vx(n,e,ll);function Qy(n,e,t){try{Hc(-1);const i=arguments.length;return i===2?Ft(e)&&!je(e)?Vc(e)?Dt(n,null,[e]):Dt(n,e):Dt(n,null,e):(i>3?t=Array.prototype.slice.call(arguments,2):i===3&&Vc(t)&&(t=[t]),Dt(n,e,t))}finally{Hc(1)}}const eS="3.5.22";let Wf;const bp=typeof window<"u"&&window.trustedTypes;if(bp)try{Wf=bp.createPolicy("vue",{createHTML:n=>n})}catch{}const $g=Wf?n=>Wf.createHTML(n):n=>n,tS="http://www.w3.org/2000/svg",nS="http://www.w3.org/1998/Math/MathML",pr=typeof document<"u"?document:null,Ep=pr&&pr.createElement("template"),iS={insert:(n,e,t)=>{e.insertBefore(n,t||null)},remove:n=>{const e=n.parentNode;e&&e.removeChild(n)},createElement:(n,e,t,i)=>{const r=e==="svg"?pr.createElementNS(tS,n):e==="mathml"?pr.createElementNS(nS,n):t?pr.createElement(n,{is:t}):pr.createElement(n);return n==="select"&&i&&i.multiple!=null&&r.setAttribute("multiple",i.multiple),r},createText:n=>pr.createTextNode(n),createComment:n=>pr.createComment(n),setText:(n,e)=>{n.nodeValue=e},setElementText:(n,e)=>{n.textContent=e},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>pr.querySelector(n),setScopeId(n,e){n.setAttribute(e,"")},insertStaticContent(n,e,t,i,r,s){const o=t?t.previousSibling:e.lastChild;if(r&&(r===s||r.nextSibling))for(;e.insertBefore(r.cloneNode(!0),t),!(r===s||!(r=r.nextSibling)););else{Ep.innerHTML=$g(i==="svg"?`<svg>${n}</svg>`:i==="mathml"?`<math>${n}</math>`:n);const a=Ep.content;if(i==="svg"||i==="mathml"){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}e.insertBefore(a,t)}return[o?o.nextSibling:e.firstChild,t?t.previousSibling:e.lastChild]}},Br="transition",_a="animation",cl=Symbol("_vtc"),qg={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},rS=vn({},gg,qg),sS=n=>(n.displayName="Transition",n.props=rS,n),oS=sS((n,{slots:e})=>Qy(Zx,aS(n),e)),Ms=(n,e=[])=>{je(n)?n.forEach(t=>t(...e)):n&&n(...e)},Tp=n=>n?je(n)?n.some(e=>e.length>1):n.length>1:!1;function aS(n){const e={};for(const U in n)U in qg||(e[U]=n[U]);if(n.css===!1)return e;const{name:t="v",type:i,duration:r,enterFromClass:s=`${t}-enter-from`,enterActiveClass:o=`${t}-enter-active`,enterToClass:a=`${t}-enter-to`,appearFromClass:l=s,appearActiveClass:c=o,appearToClass:u=a,leaveFromClass:f=`${t}-leave-from`,leaveActiveClass:h=`${t}-leave-active`,leaveToClass:d=`${t}-leave-to`}=n,_=lS(r),g=_&&_[0],m=_&&_[1],{onBeforeEnter:p,onEnter:y,onEnterCancelled:M,onLeave:v,onLeaveCancelled:R,onBeforeAppear:w=p,onAppear:T=y,onAppearCancelled:D=M}=e,S=(U,k,Y,te)=>{U._enterCancelled=te,bs(U,k?u:a),bs(U,k?c:o),Y&&Y()},x=(U,k)=>{U._isLeaving=!1,bs(U,f),bs(U,d),bs(U,h),k&&k()},P=U=>(k,Y)=>{const te=U?T:y,W=()=>S(k,U,Y);Ms(te,[k,W]),wp(()=>{bs(k,U?l:s),ar(k,U?u:a),Tp(te)||Ap(k,i,g,W)})};return vn(e,{onBeforeEnter(U){Ms(p,[U]),ar(U,s),ar(U,o)},onBeforeAppear(U){Ms(w,[U]),ar(U,l),ar(U,c)},onEnter:P(!1),onAppear:P(!0),onLeave(U,k){U._isLeaving=!0;const Y=()=>x(U,k);ar(U,f),U._enterCancelled?(ar(U,h),Pp(U)):(Pp(U),ar(U,h)),wp(()=>{U._isLeaving&&(bs(U,f),ar(U,d),Tp(v)||Ap(U,i,m,Y))}),Ms(v,[U,Y])},onEnterCancelled(U){S(U,!1,void 0,!0),Ms(M,[U])},onAppearCancelled(U){S(U,!0,void 0,!0),Ms(D,[U])},onLeaveCancelled(U){x(U),Ms(R,[U])}})}function lS(n){if(n==null)return null;if(Ft(n))return[Fu(n.enter),Fu(n.leave)];{const e=Fu(n);return[e,e]}}function Fu(n){return cx(n)}function ar(n,e){e.split(/\s+/).forEach(t=>t&&n.classList.add(t)),(n[cl]||(n[cl]=new Set)).add(e)}function bs(n,e){e.split(/\s+/).forEach(i=>i&&n.classList.remove(i));const t=n[cl];t&&(t.delete(e),t.size||(n[cl]=void 0))}function wp(n){requestAnimationFrame(()=>{requestAnimationFrame(n)})}let cS=0;function Ap(n,e,t,i){const r=n._endId=++cS,s=()=>{r===n._endId&&i()};if(t!=null)return setTimeout(s,t);const{type:o,timeout:a,propCount:l}=uS(n,e);if(!o)return i();const c=o+"end";let u=0;const f=()=>{n.removeEventListener(c,h),s()},h=d=>{d.target===n&&++u>=l&&f()};setTimeout(()=>{u<l&&f()},a+1),n.addEventListener(c,h)}function uS(n,e){const t=window.getComputedStyle(n),i=_=>(t[_]||"").split(", "),r=i(`${Br}Delay`),s=i(`${Br}Duration`),o=Cp(r,s),a=i(`${_a}Delay`),l=i(`${_a}Duration`),c=Cp(a,l);let u=null,f=0,h=0;e===Br?o>0&&(u=Br,f=o,h=s.length):e===_a?c>0&&(u=_a,f=c,h=l.length):(f=Math.max(o,c),u=f>0?o>c?Br:_a:null,h=u?u===Br?s.length:l.length:0);const d=u===Br&&/\b(?:transform|all)(?:,|$)/.test(i(`${Br}Property`).toString());return{type:u,timeout:f,propCount:h,hasTransform:d}}function Cp(n,e){for(;n.length<e.length;)n=n.concat(n);return Math.max(...e.map((t,i)=>Rp(t)+Rp(n[i])))}function Rp(n){return n==="auto"?0:Number(n.slice(0,-1).replace(",","."))*1e3}function Pp(n){return(n?n.ownerDocument:document).body.offsetHeight}function fS(n,e,t){const i=n[cl];i&&(e=(e?[e,...i]:[...i]).join(" ")),e==null?n.removeAttribute("class"):t?n.setAttribute("class",e):n.className=e}const Wc=Symbol("_vod"),Kg=Symbol("_vsh"),hS={name:"show",beforeMount(n,{value:e},{transition:t}){n[Wc]=n.style.display==="none"?"":n.style.display,t&&e?t.beforeEnter(n):ga(n,e)},mounted(n,{value:e},{transition:t}){t&&e&&t.enter(n)},updated(n,{value:e,oldValue:t},{transition:i}){!e!=!t&&(i?e?(i.beforeEnter(n),ga(n,!0),i.enter(n)):i.leave(n,()=>{ga(n,!1)}):ga(n,e))},beforeUnmount(n,{value:e}){ga(n,e)}};function ga(n,e){n.style.display=e?n[Wc]:"none",n[Kg]=!e}const dS=Symbol(""),pS=/(?:^|;)\s*display\s*:/;function mS(n,e,t){const i=n.style,r=Zt(t);let s=!1;if(t&&!r){if(e)if(Zt(e))for(const o of e.split(";")){const a=o.slice(0,o.indexOf(":")).trim();t[a]==null&&xc(i,a,"")}else for(const o in e)t[o]==null&&xc(i,o,"");for(const o in t)o==="display"&&(s=!0),xc(i,o,t[o])}else if(r){if(e!==t){const o=i[dS];o&&(t+=";"+o),i.cssText=t,s=pS.test(t)}}else e&&n.removeAttribute("style");Wc in n&&(n[Wc]=s?i.display:"",n[Kg]&&(i.display="none"))}const Dp=/\s*!important$/;function xc(n,e,t){if(je(t))t.forEach(i=>xc(n,e,i));else if(t==null&&(t=""),e.startsWith("--"))n.setProperty(e,t);else{const i=_S(n,e);Dp.test(t)?n.setProperty(vs(i),t.replace(Dp,""),"important"):n[i]=t}}const Lp=["Webkit","Moz","ms"],Bu={};function _S(n,e){const t=Bu[e];if(t)return t;let i=ls(e);if(i!=="filter"&&i in n)return Bu[e]=i;i=W_(i);for(let r=0;r<Lp.length;r++){const s=Lp[r]+i;if(s in n)return Bu[e]=s}return e}const Ip="http://www.w3.org/1999/xlink";function Up(n,e,t,i,r,s=mx(e)){i&&e.startsWith("xlink:")?t==null?n.removeAttributeNS(Ip,e.slice(6,e.length)):n.setAttributeNS(Ip,e,t):t==null||s&&!Y_(t)?n.removeAttribute(e):n.setAttribute(e,s?"":gs(t)?String(t):t)}function Np(n,e,t,i,r){if(e==="innerHTML"||e==="textContent"){t!=null&&(n[e]=e==="innerHTML"?$g(t):t);return}const s=n.tagName;if(e==="value"&&s!=="PROGRESS"&&!s.includes("-")){const a=s==="OPTION"?n.getAttribute("value")||"":n.value,l=t==null?n.type==="checkbox"?"on":"":String(t);(a!==l||!("_value"in n))&&(n.value=l),t==null&&n.removeAttribute(e),n._value=t;return}let o=!1;if(t===""||t==null){const a=typeof n[e];a==="boolean"?t=Y_(t):t==null&&a==="string"?(t="",o=!0):a==="number"&&(t=0,o=!0)}try{n[e]=t}catch{}o&&n.removeAttribute(r||e)}function Ao(n,e,t,i){n.addEventListener(e,t,i)}function gS(n,e,t,i){n.removeEventListener(e,t,i)}const Op=Symbol("_vei");function vS(n,e,t,i,r=null){const s=n[Op]||(n[Op]={}),o=s[e];if(i&&o)o.value=i;else{const[a,l]=xS(e);if(i){const c=s[e]=MS(i,r);Ao(n,a,c,l)}else o&&(gS(n,a,o,l),s[e]=void 0)}}const Fp=/(?:Once|Passive|Capture)$/;function xS(n){let e;if(Fp.test(n)){e={};let i;for(;i=n.match(Fp);)n=n.slice(0,n.length-i[0].length),e[i[0].toLowerCase()]=!0}return[n[2]===":"?n.slice(3):vs(n.slice(2)),e]}let ku=0;const yS=Promise.resolve(),SS=()=>ku||(yS.then(()=>ku=0),ku=Date.now());function MS(n,e){const t=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=t.attached)return;Vi(bS(i,t.value),e,5,[i])};return t.value=n,t.attached=SS(),t}function bS(n,e){if(je(e)){const t=n.stopImmediatePropagation;return n.stopImmediatePropagation=()=>{t.call(n),n._stopped=!0},e.map(i=>r=>!r._stopped&&i&&i(r))}else return e}const Bp=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,ES=(n,e,t,i,r,s)=>{const o=r==="svg";e==="class"?fS(n,i,o):e==="style"?mS(n,t,i):ou(e)?rd(e)||vS(n,e,t,i,s):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):TS(n,e,i,o))?(Np(n,e,i),!n.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&Up(n,e,i,o,s,e!=="value")):n._isVueCE&&(/[A-Z]/.test(e)||!Zt(i))?Np(n,ls(e),i,s,e):(e==="true-value"?n._trueValue=i:e==="false-value"&&(n._falseValue=i),Up(n,e,i,o))};function TS(n,e,t,i){if(i)return!!(e==="innerHTML"||e==="textContent"||e in n&&Bp(e)&&it(t));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="form"||e==="list"&&n.tagName==="INPUT"||e==="type"&&n.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const r=n.tagName;if(r==="IMG"||r==="VIDEO"||r==="CANVAS"||r==="SOURCE")return!1}return Bp(e)&&Zt(t)?!1:e in n}const kp=n=>{const e=n.props["onUpdate:modelValue"]||!1;return je(e)?t=>mc(e,t):e};function wS(n){n.target.composing=!0}function zp(n){const e=n.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const zu=Symbol("_assign"),AS={created(n,{modifiers:{lazy:e,trim:t,number:i}},r){n[zu]=kp(r);const s=i||r.props&&r.props.type==="number";Ao(n,e?"change":"input",o=>{if(o.target.composing)return;let a=n.value;t&&(a=a.trim()),s&&(a=Lf(a)),n[zu](a)}),t&&Ao(n,"change",()=>{n.value=n.value.trim()}),e||(Ao(n,"compositionstart",wS),Ao(n,"compositionend",zp),Ao(n,"change",zp))},mounted(n,{value:e}){n.value=e??""},beforeUpdate(n,{value:e,oldValue:t,modifiers:{lazy:i,trim:r,number:s}},o){if(n[zu]=kp(o),n.composing)return;const a=(s||n.type==="number")&&!/^0\d/.test(n.value)?Lf(n.value):n.value,l=e??"";a!==l&&(document.activeElement===n&&n.type!=="range"&&(i&&e===t||r&&n.value.trim()===l)||(n.value=l))}},CS=["ctrl","shift","alt","meta"],RS={stop:n=>n.stopPropagation(),prevent:n=>n.preventDefault(),self:n=>n.target!==n.currentTarget,ctrl:n=>!n.ctrlKey,shift:n=>!n.shiftKey,alt:n=>!n.altKey,meta:n=>!n.metaKey,left:n=>"button"in n&&n.button!==0,middle:n=>"button"in n&&n.button!==1,right:n=>"button"in n&&n.button!==2,exact:(n,e)=>CS.some(t=>n[`${t}Key`]&&!e.includes(t))},Hp=(n,e)=>{const t=n._withMods||(n._withMods={}),i=e.join(".");return t[i]||(t[i]=((r,...s)=>{for(let o=0;o<e.length;o++){const a=RS[e[o]];if(a&&a(r,e))return}return n(r,...s)}))},PS={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},Vp=(n,e)=>{const t=n._withKeys||(n._withKeys={}),i=e.join(".");return t[i]||(t[i]=(r=>{if(!("key"in r))return;const s=vs(r.key);if(e.some(o=>o===s||PS[o]===s))return n(r)}))},DS=vn({patchProp:ES},iS);let Gp;function LS(){return Gp||(Gp=Ey(DS))}const IS=((...n)=>{const e=LS().createApp(...n),{mount:t}=e;return e.mount=i=>{const r=NS(i);if(!r)return;const s=e._component;!it(s)&&!s.render&&!s.template&&(s.template=r.innerHTML),r.nodeType===1&&(r.textContent="");const o=t(r,!1,US(r));return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),o},e});function US(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function NS(n){return Zt(n)?document.querySelector(n):n}function mr(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function jg(n,e){n.prototype=Object.create(e.prototype),n.prototype.constructor=n,n.__proto__=e}var di={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Ko={duration:.5,overwrite:!1,delay:0},yd,mn,zt,Ei=1e8,Lt=1/Ei,Xf=Math.PI*2,OS=Xf/4,FS=0,Zg=Math.sqrt,BS=Math.cos,kS=Math.sin,hn=function(e){return typeof e=="string"},$t=function(e){return typeof e=="function"},Pr=function(e){return typeof e=="number"},Sd=function(e){return typeof e>"u"},nr=function(e){return typeof e=="object"},$n=function(e){return e!==!1},Md=function(){return typeof window<"u"},Ll=function(e){return $t(e)||hn(e)},Jg=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},An=Array.isArray,Yf=/(?:-?\.?\d|\.)+/gi,Qg=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Do=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Hu=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,e0=/[+-]=-?[.\d]+/,t0=/[^,'"\[\]\s]+/gi,zS=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Vt,Yi,$f,bd,pi={},Xc={},n0,i0=function(e){return(Xc=jo(e,pi))&&Jn},Ed=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},ul=function(e,t){return!t&&console.warn(e)},r0=function(e,t){return e&&(pi[e]=t)&&Xc&&(Xc[e]=t)||pi},fl=function(){return 0},HS={suppressEvents:!0,isStart:!0,kill:!1},yc={suppressEvents:!0,kill:!1},VS={suppressEvents:!0},Td={},is=[],qf={},s0,oi={},Vu={},Wp=30,Sc=[],wd="",Ad=function(e){var t=e[0],i,r;if(nr(t)||$t(t)||(e=[e]),!(i=(t._gsap||{}).harness)){for(r=Sc.length;r--&&!Sc[r].targetTest(t););i=Sc[r]}for(r=e.length;r--;)e[r]&&(e[r]._gsap||(e[r]._gsap=new R0(e[r],i)))||e.splice(r,1);return e},Ys=function(e){return e._gsap||Ad(Ti(e))[0]._gsap},o0=function(e,t,i){return(i=e[t])&&$t(i)?e[t]():Sd(i)&&e.getAttribute&&e.getAttribute(t)||i},qn=function(e,t){return(e=e.split(",")).forEach(t)||e},Kt=function(e){return Math.round(e*1e5)/1e5||0},tn=function(e){return Math.round(e*1e7)/1e7||0},zo=function(e,t){var i=t.charAt(0),r=parseFloat(t.substr(2));return e=parseFloat(e),i==="+"?e+r:i==="-"?e-r:i==="*"?e*r:e/r},GS=function(e,t){for(var i=t.length,r=0;e.indexOf(t[r])<0&&++r<i;);return r<i},Yc=function(){var e=is.length,t=is.slice(0),i,r;for(qf={},is.length=0,i=0;i<e;i++)r=t[i],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},Cd=function(e){return!!(e._initted||e._startAt||e.add)},a0=function(e,t,i,r){is.length&&!mn&&Yc(),e.render(t,i,!!(mn&&t<0&&Cd(e))),is.length&&!mn&&Yc()},l0=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(t0).length<2?t:hn(e)?e.trim():e},c0=function(e){return e},mi=function(e,t){for(var i in t)i in e||(e[i]=t[i]);return e},WS=function(e){return function(t,i){for(var r in i)r in t||r==="duration"&&e||r==="ease"||(t[r]=i[r])}},jo=function(e,t){for(var i in t)e[i]=t[i];return e},Xp=function n(e,t){for(var i in t)i!=="__proto__"&&i!=="constructor"&&i!=="prototype"&&(e[i]=nr(t[i])?n(e[i]||(e[i]={}),t[i]):t[i]);return e},$c=function(e,t){var i={},r;for(r in e)r in t||(i[r]=e[r]);return i},Va=function(e){var t=e.parent||Vt,i=e.keyframes?WS(An(e.keyframes)):mi;if($n(e.inherit))for(;t;)i(e,t.vars.defaults),t=t.parent||t._dp;return e},XS=function(e,t){for(var i=e.length,r=i===t.length;r&&i--&&e[i]===t[i];);return i<0},u0=function(e,t,i,r,s){var o=e[r],a;if(s)for(a=t[s];o&&o[s]>a;)o=o._prev;return o?(t._next=o._next,o._next=t):(t._next=e[i],e[i]=t),t._next?t._next._prev=t:e[r]=t,t._prev=o,t.parent=t._dp=e,t},vu=function(e,t,i,r){i===void 0&&(i="_first"),r===void 0&&(r="_last");var s=t._prev,o=t._next;s?s._next=o:e[i]===t&&(e[i]=o),o?o._prev=s:e[r]===t&&(e[r]=s),t._next=t._prev=t.parent=null},hs=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},$s=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var i=e;i;)i._dirty=1,i=i.parent;return e},YS=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},Kf=function(e,t,i,r){return e._startAt&&(mn?e._startAt.revert(yc):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,r))},$S=function n(e){return!e||e._ts&&n(e.parent)},Yp=function(e){return e._repeat?Zo(e._tTime,e=e.duration()+e._rDelay)*e:0},Zo=function(e,t){var i=Math.floor(e=tn(e/t));return e&&i===e?i-1:i},qc=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},xu=function(e){return e._end=tn(e._start+(e._tDur/Math.abs(e._ts||e._rts||Lt)||0))},yu=function(e,t){var i=e._dp;return i&&i.smoothChildTiming&&e._ts&&(e._start=tn(i._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),xu(e),i._dirty||$s(i,e)),e},f0=function(e,t){var i;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(i=qc(e.rawTime(),t),(!t._dur||bl(0,t.totalDuration(),i)-t._tTime>Lt)&&t.render(i,!0)),$s(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(i=e;i._dp;)i.rawTime()>=0&&i.totalTime(i._tTime),i=i._dp;e._zTime=-Lt}},ji=function(e,t,i,r){return t.parent&&hs(t),t._start=tn((Pr(i)?i:i||e!==Vt?xi(e,i,t):e._time)+t._delay),t._end=tn(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),u0(e,t,"_first","_last",e._sort?"_start":0),jf(t)||(e._recent=t),r||f0(e,t),e._ts<0&&yu(e,e._tTime),e},h0=function(e,t){return(pi.ScrollTrigger||Ed("scrollTrigger",t))&&pi.ScrollTrigger.create(t,e)},d0=function(e,t,i,r,s){if(Pd(e,t,s),!e._initted)return 1;if(!i&&e._pt&&!mn&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&s0!==ci.frame)return is.push(e),e._lazy=[s,r],1},qS=function n(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||n(t))},jf=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},KS=function(e,t,i,r){var s=e.ratio,o=t<0||!t&&(!e._start&&qS(e)&&!(!e._initted&&jf(e))||(e._ts<0||e._dp._ts<0)&&!jf(e))?0:1,a=e._rDelay,l=0,c,u,f;if(a&&e._repeat&&(l=bl(0,e._tDur,t),u=Zo(l,a),e._yoyo&&u&1&&(o=1-o),u!==Zo(e._tTime,a)&&(s=1-o,e.vars.repeatRefresh&&e._initted&&e.invalidate())),o!==s||mn||r||e._zTime===Lt||!t&&e._zTime){if(!e._initted&&d0(e,t,r,i,l))return;for(f=e._zTime,e._zTime=t||(i?Lt:0),i||(i=t&&!f),e.ratio=o,e._from&&(o=1-o),e._time=0,e._tTime=l,c=e._pt;c;)c.r(o,c.d),c=c._next;t<0&&Kf(e,t,i,!0),e._onUpdate&&!i&&hi(e,"onUpdate"),l&&e._repeat&&!i&&e.parent&&hi(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===o&&(o&&hs(e,1),!i&&!mn&&(hi(e,o?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},jS=function(e,t,i){var r;if(i>t)for(r=e._first;r&&r._start<=i;){if(r.data==="isPause"&&r._start>t)return r;r=r._next}else for(r=e._last;r&&r._start>=i;){if(r.data==="isPause"&&r._start<t)return r;r=r._prev}},Jo=function(e,t,i,r){var s=e._repeat,o=tn(t)||0,a=e._tTime/e._tDur;return a&&!r&&(e._time*=o/e._dur),e._dur=o,e._tDur=s?s<0?1e10:tn(o*(s+1)+e._rDelay*s):o,a>0&&!r&&yu(e,e._tTime=e._tDur*a),e.parent&&xu(e),i||$s(e.parent,e),e},$p=function(e){return e instanceof Vn?$s(e):Jo(e,e._dur)},ZS={_start:0,endTime:fl,totalDuration:fl},xi=function n(e,t,i){var r=e.labels,s=e._recent||ZS,o=e.duration()>=Ei?s.endTime(!1):e._dur,a,l,c;return hn(t)&&(isNaN(t)||t in r)?(l=t.charAt(0),c=t.substr(-1)==="%",a=t.indexOf("="),l==="<"||l===">"?(a>=0&&(t=t.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(a<0?s:i).totalDuration()/100:1)):a<0?(t in r||(r[t]=o),r[t]):(l=parseFloat(t.charAt(a-1)+t.substr(a+1)),c&&i&&(l=l/100*(An(i)?i[0]:i).totalDuration()),a>1?n(e,t.substr(0,a-1),i)+l:o+l)):t==null?o:+t},Ga=function(e,t,i){var r=Pr(t[1]),s=(r?2:1)+(e<2?0:1),o=t[s],a,l;if(r&&(o.duration=t[1]),o.parent=i,e){for(a=o,l=i;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=$n(l.vars.inherit)&&l.parent;o.immediateRender=$n(a.immediateRender),e<2?o.runBackwards=1:o.startAt=t[s-1]}return new en(t[0],o,t[s+1])},xs=function(e,t){return e||e===0?t(e):t},bl=function(e,t,i){return i<e?e:i>t?t:i},En=function(e,t){return!hn(e)||!(t=zS.exec(e))?"":t[1]},JS=function(e,t,i){return xs(i,function(r){return bl(e,t,r)})},Zf=[].slice,p0=function(e,t){return e&&nr(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&nr(e[0]))&&!e.nodeType&&e!==Yi},QS=function(e,t,i){return i===void 0&&(i=[]),e.forEach(function(r){var s;return hn(r)&&!t||p0(r,1)?(s=i).push.apply(s,Ti(r)):i.push(r)})||i},Ti=function(e,t,i){return zt&&!t&&zt.selector?zt.selector(e):hn(e)&&!i&&($f||!Qo())?Zf.call((t||bd).querySelectorAll(e),0):An(e)?QS(e,i):p0(e)?Zf.call(e,0):e?[e]:[]},Jf=function(e){return e=Ti(e)[0]||ul("Invalid scope")||{},function(t){var i=e.current||e.nativeElement||e;return Ti(t,i.querySelectorAll?i:i===e?ul("Invalid scope")||bd.createElement("div"):e)}},m0=function(e){return e.sort(function(){return .5-Math.random()})},_0=function(e){if($t(e))return e;var t=nr(e)?e:{each:e},i=qs(t.ease),r=t.from||0,s=parseFloat(t.base)||0,o={},a=r>0&&r<1,l=isNaN(r)||a,c=t.axis,u=r,f=r;return hn(r)?u=f={center:.5,edges:.5,end:1}[r]||0:!a&&l&&(u=r[0],f=r[1]),function(h,d,_){var g=(_||t).length,m=o[g],p,y,M,v,R,w,T,D,S;if(!m){if(S=t.grid==="auto"?0:(t.grid||[1,Ei])[1],!S){for(T=-Ei;T<(T=_[S++].getBoundingClientRect().left)&&S<g;);S<g&&S--}for(m=o[g]=[],p=l?Math.min(S,g)*u-.5:r%S,y=S===Ei?0:l?g*f/S-.5:r/S|0,T=0,D=Ei,w=0;w<g;w++)M=w%S-p,v=y-(w/S|0),m[w]=R=c?Math.abs(c==="y"?v:M):Zg(M*M+v*v),R>T&&(T=R),R<D&&(D=R);r==="random"&&m0(m),m.max=T-D,m.min=D,m.v=g=(parseFloat(t.amount)||parseFloat(t.each)*(S>g?g-1:c?c==="y"?g/S:S:Math.max(S,g/S))||0)*(r==="edges"?-1:1),m.b=g<0?s-g:s,m.u=En(t.amount||t.each)||0,i=i&&g<0?w0(i):i}return g=(m[h]-m.min)/m.max||0,tn(m.b+(i?i(g):g)*m.v)+m.u}},Qf=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(i){var r=tn(Math.round(parseFloat(i)/e)*e*t);return(r-r%1)/t+(Pr(i)?0:En(i))}},g0=function(e,t){var i=An(e),r,s;return!i&&nr(e)&&(r=i=e.radius||Ei,e.values?(e=Ti(e.values),(s=!Pr(e[0]))&&(r*=r)):e=Qf(e.increment)),xs(t,i?$t(e)?function(o){return s=e(o),Math.abs(s-o)<=r?s:o}:function(o){for(var a=parseFloat(s?o.x:o),l=parseFloat(s?o.y:0),c=Ei,u=0,f=e.length,h,d;f--;)s?(h=e[f].x-a,d=e[f].y-l,h=h*h+d*d):h=Math.abs(e[f]-a),h<c&&(c=h,u=f);return u=!r||c<=r?e[u]:o,s||u===o||Pr(o)?u:u+En(o)}:Qf(e))},v0=function(e,t,i,r){return xs(An(e)?!t:i===!0?!!(i=0):!r,function(){return An(e)?e[~~(Math.random()*e.length)]:(i=i||1e-5)&&(r=i<1?Math.pow(10,(i+"").length-2):1)&&Math.floor(Math.round((e-i/2+Math.random()*(t-e+i*.99))/i)*i*r)/r})},eM=function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];return function(r){return t.reduce(function(s,o){return o(s)},r)}},tM=function(e,t){return function(i){return e(parseFloat(i))+(t||En(i))}},nM=function(e,t,i){return y0(e,t,0,1,i)},x0=function(e,t,i){return xs(i,function(r){return e[~~t(r)]})},iM=function n(e,t,i){var r=t-e;return An(e)?x0(e,n(0,e.length),t):xs(i,function(s){return(r+(s-e)%r)%r+e})},rM=function n(e,t,i){var r=t-e,s=r*2;return An(e)?x0(e,n(0,e.length-1),t):xs(i,function(o){return o=(s+(o-e)%s)%s||0,e+(o>r?s-o:o)})},hl=function(e){for(var t=0,i="",r,s,o,a;~(r=e.indexOf("random(",t));)o=e.indexOf(")",r),a=e.charAt(r+7)==="[",s=e.substr(r+7,o-r-7).match(a?t0:Yf),i+=e.substr(t,r-t)+v0(a?s:+s[0],a?0:+s[1],+s[2]||1e-5),t=o+1;return i+e.substr(t,e.length-t)},y0=function(e,t,i,r,s){var o=t-e,a=r-i;return xs(s,function(l){return i+((l-e)/o*a||0)})},sM=function n(e,t,i,r){var s=isNaN(e+t)?0:function(d){return(1-d)*e+d*t};if(!s){var o=hn(e),a={},l,c,u,f,h;if(i===!0&&(r=1)&&(i=null),o)e={p:e},t={p:t};else if(An(e)&&!An(t)){for(u=[],f=e.length,h=f-2,c=1;c<f;c++)u.push(n(e[c-1],e[c]));f--,s=function(_){_*=f;var g=Math.min(h,~~_);return u[g](_-g)},i=t}else r||(e=jo(An(e)?[]:{},e));if(!u){for(l in t)Rd.call(a,e,l,"get",t[l]);s=function(_){return Id(_,a)||(o?e.p:e)}}}return xs(i,s)},qp=function(e,t,i){var r=e.labels,s=Ei,o,a,l;for(o in r)a=r[o]-t,a<0==!!i&&a&&s>(a=Math.abs(a))&&(l=o,s=a);return l},hi=function(e,t,i){var r=e.vars,s=r[t],o=zt,a=e._ctx,l,c,u;if(s)return l=r[t+"Params"],c=r.callbackScope||e,i&&is.length&&Yc(),a&&(zt=a),u=l?s.apply(c,l):s.call(c),zt=o,u},wa=function(e){return hs(e),e.scrollTrigger&&e.scrollTrigger.kill(!!mn),e.progress()<1&&hi(e,"onInterrupt"),e},Lo,S0=[],M0=function(e){if(e)if(e=!e.name&&e.default||e,Md()||e.headless){var t=e.name,i=$t(e),r=t&&!i&&e.init?function(){this._props=[]}:e,s={init:fl,render:Id,add:Rd,kill:SM,modifier:yM,rawVars:0},o={targetTest:0,get:0,getSetter:Ld,aliases:{},register:0};if(Qo(),e!==r){if(oi[t])return;mi(r,mi($c(e,s),o)),jo(r.prototype,jo(s,$c(e,o))),oi[r.prop=t]=r,e.targetTest&&(Sc.push(r),Td[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}r0(t,r),e.register&&e.register(Jn,r,Kn)}else S0.push(e)},Pt=255,Aa={aqua:[0,Pt,Pt],lime:[0,Pt,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Pt],navy:[0,0,128],white:[Pt,Pt,Pt],olive:[128,128,0],yellow:[Pt,Pt,0],orange:[Pt,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Pt,0,0],pink:[Pt,192,203],cyan:[0,Pt,Pt],transparent:[Pt,Pt,Pt,0]},Gu=function(e,t,i){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(i-t)*e*6:e<.5?i:e*3<2?t+(i-t)*(2/3-e)*6:t)*Pt+.5|0},b0=function(e,t,i){var r=e?Pr(e)?[e>>16,e>>8&Pt,e&Pt]:0:Aa.black,s,o,a,l,c,u,f,h,d,_;if(!r){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),Aa[e])r=Aa[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),o=e.charAt(2),a=e.charAt(3),e="#"+s+s+o+o+a+a+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return r=parseInt(e.substr(1,6),16),[r>>16,r>>8&Pt,r&Pt,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),r=[e>>16,e>>8&Pt,e&Pt]}else if(e.substr(0,3)==="hsl"){if(r=_=e.match(Yf),!t)l=+r[0]%360/360,c=+r[1]/100,u=+r[2]/100,o=u<=.5?u*(c+1):u+c-u*c,s=u*2-o,r.length>3&&(r[3]*=1),r[0]=Gu(l+1/3,s,o),r[1]=Gu(l,s,o),r[2]=Gu(l-1/3,s,o);else if(~e.indexOf("="))return r=e.match(Qg),i&&r.length<4&&(r[3]=1),r}else r=e.match(Yf)||Aa.transparent;r=r.map(Number)}return t&&!_&&(s=r[0]/Pt,o=r[1]/Pt,a=r[2]/Pt,f=Math.max(s,o,a),h=Math.min(s,o,a),u=(f+h)/2,f===h?l=c=0:(d=f-h,c=u>.5?d/(2-f-h):d/(f+h),l=f===s?(o-a)/d+(o<a?6:0):f===o?(a-s)/d+2:(s-o)/d+4,l*=60),r[0]=~~(l+.5),r[1]=~~(c*100+.5),r[2]=~~(u*100+.5)),i&&r.length<4&&(r[3]=1),r},E0=function(e){var t=[],i=[],r=-1;return e.split(rs).forEach(function(s){var o=s.match(Do)||[];t.push.apply(t,o),i.push(r+=o.length+1)}),t.c=i,t},Kp=function(e,t,i){var r="",s=(e+r).match(rs),o=t?"hsla(":"rgba(",a=0,l,c,u,f;if(!s)return e;if(s=s.map(function(h){return(h=b0(h,t,1))&&o+(t?h[0]+","+h[1]+"%,"+h[2]+"%,"+h[3]:h.join(","))+")"}),i&&(u=E0(e),l=i.c,l.join(r)!==u.c.join(r)))for(c=e.replace(rs,"1").split(Do),f=c.length-1;a<f;a++)r+=c[a]+(~l.indexOf(a)?s.shift()||o+"0,0,0,0)":(u.length?u:s.length?s:i).shift());if(!c)for(c=e.split(rs),f=c.length-1;a<f;a++)r+=c[a]+s[a];return r+c[f]},rs=(function(){var n="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in Aa)n+="|"+e+"\\b";return new RegExp(n+")","gi")})(),oM=/hsl[a]?\(/,T0=function(e){var t=e.join(" "),i;if(rs.lastIndex=0,rs.test(t))return i=oM.test(t),e[1]=Kp(e[1],i),e[0]=Kp(e[0],i,E0(e[1])),!0},dl,ci=(function(){var n=Date.now,e=500,t=33,i=n(),r=i,s=1e3/240,o=s,a=[],l,c,u,f,h,d,_=function g(m){var p=n()-r,y=m===!0,M,v,R,w;if((p>e||p<0)&&(i+=p-t),r+=p,R=r-i,M=R-o,(M>0||y)&&(w=++f.frame,h=R-f.time*1e3,f.time=R=R/1e3,o+=M+(M>=s?4:s-M),v=1),y||(l=c(g)),v)for(d=0;d<a.length;d++)a[d](R,h,w,m)};return f={time:0,frame:0,tick:function(){_(!0)},deltaRatio:function(m){return h/(1e3/(m||60))},wake:function(){n0&&(!$f&&Md()&&(Yi=$f=window,bd=Yi.document||{},pi.gsap=Jn,(Yi.gsapVersions||(Yi.gsapVersions=[])).push(Jn.version),i0(Xc||Yi.GreenSockGlobals||!Yi.gsap&&Yi||{}),S0.forEach(M0)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&f.sleep(),c=u||function(m){return setTimeout(m,o-f.time*1e3+1|0)},dl=1,_(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),dl=0,c=fl},lagSmoothing:function(m,p){e=m||1/0,t=Math.min(p||33,e)},fps:function(m){s=1e3/(m||240),o=f.time*1e3+s},add:function(m,p,y){var M=p?function(v,R,w,T){m(v,R,w,T),f.remove(M)}:m;return f.remove(m),a[y?"unshift":"push"](M),Qo(),M},remove:function(m,p){~(p=a.indexOf(m))&&a.splice(p,1)&&d>=p&&d--},_listeners:a},f})(),Qo=function(){return!dl&&ci.wake()},dt={},aM=/^[\d.\-M][\d.\-,\s]/,lM=/["']/g,cM=function(e){for(var t={},i=e.substr(1,e.length-3).split(":"),r=i[0],s=1,o=i.length,a,l,c;s<o;s++)l=i[s],a=s!==o-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),t[r]=isNaN(c)?c.replace(lM,"").trim():+c,r=l.substr(a+1).trim();return t},uM=function(e){var t=e.indexOf("(")+1,i=e.indexOf(")"),r=e.indexOf("(",t);return e.substring(t,~r&&r<i?e.indexOf(")",i+1):i)},fM=function(e){var t=(e+"").split("("),i=dt[t[0]];return i&&t.length>1&&i.config?i.config.apply(null,~e.indexOf("{")?[cM(t[1])]:uM(e).split(",").map(l0)):dt._CE&&aM.test(e)?dt._CE("",e):i},w0=function(e){return function(t){return 1-e(1-t)}},A0=function n(e,t){for(var i=e._first,r;i;)i instanceof Vn?n(i,t):i.vars.yoyoEase&&(!i._yoyo||!i._repeat)&&i._yoyo!==t&&(i.timeline?n(i.timeline,t):(r=i._ease,i._ease=i._yEase,i._yEase=r,i._yoyo=t)),i=i._next},qs=function(e,t){return e&&($t(e)?e:dt[e]||fM(e))||t},so=function(e,t,i,r){i===void 0&&(i=function(l){return 1-t(1-l)}),r===void 0&&(r=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var s={easeIn:t,easeOut:i,easeInOut:r},o;return qn(e,function(a){dt[a]=pi[a]=s,dt[o=a.toLowerCase()]=i;for(var l in s)dt[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=dt[a+"."+l]=s[l]}),s},C0=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},Wu=function n(e,t,i){var r=t>=1?t:1,s=(i||(e?.3:.45))/(t<1?t:1),o=s/Xf*(Math.asin(1/r)||0),a=function(u){return u===1?1:r*Math.pow(2,-10*u)*kS((u-o)*s)+1},l=e==="out"?a:e==="in"?function(c){return 1-a(1-c)}:C0(a);return s=Xf/s,l.config=function(c,u){return n(e,c,u)},l},Xu=function n(e,t){t===void 0&&(t=1.70158);var i=function(o){return o?--o*o*((t+1)*o+t)+1:0},r=e==="out"?i:e==="in"?function(s){return 1-i(1-s)}:C0(i);return r.config=function(s){return n(e,s)},r};qn("Linear,Quad,Cubic,Quart,Quint,Strong",function(n,e){var t=e<5?e+1:e;so(n+",Power"+(t-1),e?function(i){return Math.pow(i,t)}:function(i){return i},function(i){return 1-Math.pow(1-i,t)},function(i){return i<.5?Math.pow(i*2,t)/2:1-Math.pow((1-i)*2,t)/2})});dt.Linear.easeNone=dt.none=dt.Linear.easeIn;so("Elastic",Wu("in"),Wu("out"),Wu());(function(n,e){var t=1/e,i=2*t,r=2.5*t,s=function(a){return a<t?n*a*a:a<i?n*Math.pow(a-1.5/e,2)+.75:a<r?n*(a-=2.25/e)*a+.9375:n*Math.pow(a-2.625/e,2)+.984375};so("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);so("Expo",function(n){return Math.pow(2,10*(n-1))*n+n*n*n*n*n*n*(1-n)});so("Circ",function(n){return-(Zg(1-n*n)-1)});so("Sine",function(n){return n===1?1:-BS(n*OS)+1});so("Back",Xu("in"),Xu("out"),Xu());dt.SteppedEase=dt.steps=pi.SteppedEase={config:function(e,t){e===void 0&&(e=1);var i=1/e,r=e+(t?0:1),s=t?1:0,o=1-Lt;return function(a){return((r*bl(0,o,a)|0)+s)*i}}};Ko.ease=dt["quad.out"];qn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(n){return wd+=n+","+n+"Params,"});var R0=function(e,t){this.id=FS++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:o0,this.set=t?t.getSetter:Ld},pl=(function(){function n(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,Jo(this,+t.duration,1,1),this.data=t.data,zt&&(this._ctx=zt,zt.data.push(this)),dl||ci.wake()}var e=n.prototype;return e.delay=function(i){return i||i===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+i-this._delay),this._delay=i,this):this._delay},e.duration=function(i){return arguments.length?this.totalDuration(this._repeat>0?i+(i+this._rDelay)*this._repeat:i):this.totalDuration()&&this._dur},e.totalDuration=function(i){return arguments.length?(this._dirty=0,Jo(this,this._repeat<0?i:(i-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(i,r){if(Qo(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(yu(this,i),!s._dp||s.parent||f0(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&i<this._tDur||this._ts<0&&i>0||!this._tDur&&!i)&&ji(this._dp,this,this._start-this._delay)}return(this._tTime!==i||!this._dur&&!r||this._initted&&Math.abs(this._zTime)===Lt||!i&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=i),a0(this,i,r)),this},e.time=function(i,r){return arguments.length?this.totalTime(Math.min(this.totalDuration(),i+Yp(this))%(this._dur+this._rDelay)||(i?this._dur:0),r):this._time},e.totalProgress=function(i,r){return arguments.length?this.totalTime(this.totalDuration()*i,r):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(i,r){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-i:i)+Yp(this),r):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(i,r){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(i-1)*s,r):this._repeat?Zo(this._tTime,s)+1:1},e.timeScale=function(i,r){if(!arguments.length)return this._rts===-Lt?0:this._rts;if(this._rts===i)return this;var s=this.parent&&this._ts?qc(this.parent._time,this):this._tTime;return this._rts=+i||0,this._ts=this._ps||i===-Lt?0:this._rts,this.totalTime(bl(-Math.abs(this._delay),this.totalDuration(),s),r!==!1),xu(this),YS(this)},e.paused=function(i){return arguments.length?(this._ps!==i&&(this._ps=i,i?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Qo(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==Lt&&(this._tTime-=Lt)))),this):this._ps},e.startTime=function(i){if(arguments.length){this._start=i;var r=this.parent||this._dp;return r&&(r._sort||!this.parent)&&ji(r,this,i-this._delay),this}return this._start},e.endTime=function(i){return this._start+($n(i)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(i){var r=this.parent||this._dp;return r?i&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?qc(r.rawTime(i),this):this._tTime:this._tTime},e.revert=function(i){i===void 0&&(i=VS);var r=mn;return mn=i,Cd(this)&&(this.timeline&&this.timeline.revert(i),this.totalTime(-.01,i.suppressEvents)),this.data!=="nested"&&i.kill!==!1&&this.kill(),mn=r,this},e.globalTime=function(i){for(var r=this,s=arguments.length?i:r.rawTime();r;)s=r._start+s/(Math.abs(r._ts)||1),r=r._dp;return!this.parent&&this._sat?this._sat.globalTime(i):s},e.repeat=function(i){return arguments.length?(this._repeat=i===1/0?-2:i,$p(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(i){if(arguments.length){var r=this._time;return this._rDelay=i,$p(this),r?this.time(r):this}return this._rDelay},e.yoyo=function(i){return arguments.length?(this._yoyo=i,this):this._yoyo},e.seek=function(i,r){return this.totalTime(xi(this,i),$n(r))},e.restart=function(i,r){return this.play().totalTime(i?-this._delay:0,$n(r)),this._dur||(this._zTime=-Lt),this},e.play=function(i,r){return i!=null&&this.seek(i,r),this.reversed(!1).paused(!1)},e.reverse=function(i,r){return i!=null&&this.seek(i||this.totalDuration(),r),this.reversed(!0).paused(!1)},e.pause=function(i,r){return i!=null&&this.seek(i,r),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(i){return arguments.length?(!!i!==this.reversed()&&this.timeScale(-this._rts||(i?-Lt:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-Lt,this},e.isActive=function(){var i=this.parent||this._dp,r=this._start,s;return!!(!i||this._ts&&this._initted&&i.isActive()&&(s=i.rawTime(!0))>=r&&s<this.endTime(!0)-Lt)},e.eventCallback=function(i,r,s){var o=this.vars;return arguments.length>1?(r?(o[i]=r,s&&(o[i+"Params"]=s),i==="onUpdate"&&(this._onUpdate=r)):delete o[i],this):o[i]},e.then=function(i){var r=this;return new Promise(function(s){var o=$t(i)?i:c0,a=function(){var c=r.then;r.then=null,$t(o)&&(o=o(r))&&(o.then||o===r)&&(r.then=c),s(o),r.then=c};r._initted&&r.totalProgress()===1&&r._ts>=0||!r._tTime&&r._ts<0?a():r._prom=a})},e.kill=function(){wa(this)},n})();mi(pl.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-Lt,_prom:0,_ps:!1,_rts:1});var Vn=(function(n){jg(e,n);function e(i,r){var s;return i===void 0&&(i={}),s=n.call(this,i)||this,s.labels={},s.smoothChildTiming=!!i.smoothChildTiming,s.autoRemoveChildren=!!i.autoRemoveChildren,s._sort=$n(i.sortChildren),Vt&&ji(i.parent||Vt,mr(s),r),i.reversed&&s.reverse(),i.paused&&s.paused(!0),i.scrollTrigger&&h0(mr(s),i.scrollTrigger),s}var t=e.prototype;return t.to=function(r,s,o){return Ga(0,arguments,this),this},t.from=function(r,s,o){return Ga(1,arguments,this),this},t.fromTo=function(r,s,o,a){return Ga(2,arguments,this),this},t.set=function(r,s,o){return s.duration=0,s.parent=this,Va(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new en(r,s,xi(this,o),1),this},t.call=function(r,s,o){return ji(this,en.delayedCall(0,r,s),o)},t.staggerTo=function(r,s,o,a,l,c,u){return o.duration=s,o.stagger=o.stagger||a,o.onComplete=c,o.onCompleteParams=u,o.parent=this,new en(r,o,xi(this,l)),this},t.staggerFrom=function(r,s,o,a,l,c,u){return o.runBackwards=1,Va(o).immediateRender=$n(o.immediateRender),this.staggerTo(r,s,o,a,l,c,u)},t.staggerFromTo=function(r,s,o,a,l,c,u,f){return a.startAt=o,Va(a).immediateRender=$n(a.immediateRender),this.staggerTo(r,s,a,l,c,u,f)},t.render=function(r,s,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=r<=0?0:tn(r),f=this._zTime<0!=r<0&&(this._initted||!c),h,d,_,g,m,p,y,M,v,R,w,T;if(this!==Vt&&u>l&&r>=0&&(u=l),u!==this._tTime||o||f){if(a!==this._time&&c&&(u+=this._time-a,r+=this._time-a),h=u,v=this._start,M=this._ts,p=!M,f&&(c||(a=this._zTime),(r||!s)&&(this._zTime=r)),this._repeat){if(w=this._yoyo,m=c+this._rDelay,this._repeat<-1&&r<0)return this.totalTime(m*100+r,s,o);if(h=tn(u%m),u===l?(g=this._repeat,h=c):(R=tn(u/m),g=~~R,g&&g===R&&(h=c,g--),h>c&&(h=c)),R=Zo(this._tTime,m),!a&&this._tTime&&R!==g&&this._tTime-R*m-this._dur<=0&&(R=g),w&&g&1&&(h=c-h,T=1),g!==R&&!this._lock){var D=w&&R&1,S=D===(w&&g&1);if(g<R&&(D=!D),a=D?0:u%c?c:u,this._lock=1,this.render(a||(T?0:tn(g*m)),s,!c)._lock=0,this._tTime=u,!s&&this.parent&&hi(this,"onRepeat"),this.vars.repeatRefresh&&!T&&(this.invalidate()._lock=1),a&&a!==this._time||p!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,S&&(this._lock=2,a=D?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!T&&this.invalidate()),this._lock=0,!this._ts&&!p)return this;A0(this,T)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(y=jS(this,tn(a),tn(h)),y&&(u-=h-(h=y._start))),this._tTime=u,this._time=h,this._act=!M,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=r,a=0),!a&&u&&!s&&!R&&(hi(this,"onStart"),this._tTime!==u))return this;if(h>=a&&r>=0)for(d=this._first;d;){if(_=d._next,(d._act||h>=d._start)&&d._ts&&y!==d){if(d.parent!==this)return this.render(r,s,o);if(d.render(d._ts>0?(h-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(h-d._start)*d._ts,s,o),h!==this._time||!this._ts&&!p){y=0,_&&(u+=this._zTime=-Lt);break}}d=_}else{d=this._last;for(var x=r<0?r:h;d;){if(_=d._prev,(d._act||x<=d._end)&&d._ts&&y!==d){if(d.parent!==this)return this.render(r,s,o);if(d.render(d._ts>0?(x-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(x-d._start)*d._ts,s,o||mn&&Cd(d)),h!==this._time||!this._ts&&!p){y=0,_&&(u+=this._zTime=x?-Lt:Lt);break}}d=_}}if(y&&!s&&(this.pause(),y.render(h>=a?0:-Lt)._zTime=h>=a?1:-1,this._ts))return this._start=v,xu(this),this.render(r,s,o);this._onUpdate&&!s&&hi(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&a)&&(v===this._start||Math.abs(M)!==Math.abs(this._ts))&&(this._lock||((r||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&hs(this,1),!s&&!(r<0&&!a)&&(u||a||!l)&&(hi(this,u===l&&r>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(r,s){var o=this;if(Pr(s)||(s=xi(this,s,r)),!(r instanceof pl)){if(An(r))return r.forEach(function(a){return o.add(a,s)}),this;if(hn(r))return this.addLabel(r,s);if($t(r))r=en.delayedCall(0,r);else return this}return this!==r?ji(this,r,s):this},t.getChildren=function(r,s,o,a){r===void 0&&(r=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),a===void 0&&(a=-Ei);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof en?s&&l.push(c):(o&&l.push(c),r&&l.push.apply(l,c.getChildren(!0,s,o)))),c=c._next;return l},t.getById=function(r){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===r)return s[o]},t.remove=function(r){return hn(r)?this.removeLabel(r):$t(r)?this.killTweensOf(r):(r.parent===this&&vu(this,r),r===this._recent&&(this._recent=this._last),$s(this))},t.totalTime=function(r,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=tn(ci.time-(this._ts>0?r/this._ts:(this.totalDuration()-r)/-this._ts))),n.prototype.totalTime.call(this,r,s),this._forcing=0,this):this._tTime},t.addLabel=function(r,s){return this.labels[r]=xi(this,s),this},t.removeLabel=function(r){return delete this.labels[r],this},t.addPause=function(r,s,o){var a=en.delayedCall(0,s||fl,o);return a.data="isPause",this._hasPause=1,ji(this,a,xi(this,r))},t.removePause=function(r){var s=this._first;for(r=xi(this,r);s;)s._start===r&&s.data==="isPause"&&hs(s),s=s._next},t.killTweensOf=function(r,s,o){for(var a=this.getTweensOf(r,o),l=a.length;l--;)jr!==a[l]&&a[l].kill(r,s);return this},t.getTweensOf=function(r,s){for(var o=[],a=Ti(r),l=this._first,c=Pr(s),u;l;)l instanceof en?GS(l._targets,a)&&(c?(!jr||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&o.push(l):(u=l.getTweensOf(a,s)).length&&o.push.apply(o,u),l=l._next;return o},t.tweenTo=function(r,s){s=s||{};var o=this,a=xi(o,r),l=s,c=l.startAt,u=l.onStart,f=l.onStartParams,h=l.immediateRender,d,_=en.to(o,mi({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale())||Lt,onStart:function(){if(o.pause(),!d){var m=s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale());_._dur!==m&&Jo(_,m,0,1).render(_._time,!0,!0),d=1}u&&u.apply(_,f||[])}},s));return h?_.render(0):_},t.tweenFromTo=function(r,s,o){return this.tweenTo(s,mi({startAt:{time:xi(this,r)}},o))},t.recent=function(){return this._recent},t.nextLabel=function(r){return r===void 0&&(r=this._time),qp(this,xi(this,r))},t.previousLabel=function(r){return r===void 0&&(r=this._time),qp(this,xi(this,r),1)},t.currentLabel=function(r){return arguments.length?this.seek(r,!0):this.previousLabel(this._time+Lt)},t.shiftChildren=function(r,s,o){o===void 0&&(o=0);for(var a=this._first,l=this.labels,c;a;)a._start>=o&&(a._start+=r,a._end+=r),a=a._next;if(s)for(c in l)l[c]>=o&&(l[c]+=r);return $s(this)},t.invalidate=function(r){var s=this._first;for(this._lock=0;s;)s.invalidate(r),s=s._next;return n.prototype.invalidate.call(this,r)},t.clear=function(r){r===void 0&&(r=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),r&&(this.labels={}),$s(this)},t.totalDuration=function(r){var s=0,o=this,a=o._last,l=Ei,c,u,f;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-r:r));if(o._dirty){for(f=o.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),u=a._start,u>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,ji(o,a,u-a._delay,1)._lock=0):l=u,u<0&&a._ts&&(s-=u,(!f&&!o._dp||f&&f.smoothChildTiming)&&(o._start+=u/o._ts,o._time-=u,o._tTime-=u),o.shiftChildren(-u,!1,-1/0),l=0),a._end>s&&a._ts&&(s=a._end),a=c;Jo(o,o===Vt&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},e.updateRoot=function(r){if(Vt._ts&&(a0(Vt,qc(r,Vt)),s0=ci.frame),ci.frame>=Wp){Wp+=di.autoSleep||120;var s=Vt._first;if((!s||!s._ts)&&di.autoSleep&&ci._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||ci.sleep()}}},e})(pl);mi(Vn.prototype,{_lock:0,_hasPause:0,_forcing:0});var hM=function(e,t,i,r,s,o,a){var l=new Kn(this._pt,e,t,0,1,N0,null,s),c=0,u=0,f,h,d,_,g,m,p,y;for(l.b=i,l.e=r,i+="",r+="",(p=~r.indexOf("random("))&&(r=hl(r)),o&&(y=[i,r],o(y,e,t),i=y[0],r=y[1]),h=i.match(Hu)||[];f=Hu.exec(r);)_=f[0],g=r.substring(c,f.index),d?d=(d+1)%5:g.substr(-5)==="rgba("&&(d=1),_!==h[u++]&&(m=parseFloat(h[u-1])||0,l._pt={_next:l._pt,p:g||u===1?g:",",s:m,c:_.charAt(1)==="="?zo(m,_)-m:parseFloat(_)-m,m:d&&d<4?Math.round:0},c=Hu.lastIndex);return l.c=c<r.length?r.substring(c,r.length):"",l.fp=a,(e0.test(r)||p)&&(l.e=0),this._pt=l,l},Rd=function(e,t,i,r,s,o,a,l,c,u){$t(r)&&(r=r(s||0,e,o));var f=e[t],h=i!=="get"?i:$t(f)?c?e[t.indexOf("set")||!$t(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():f,d=$t(f)?c?gM:I0:Dd,_;if(hn(r)&&(~r.indexOf("random(")&&(r=hl(r)),r.charAt(1)==="="&&(_=zo(h,r)+(En(h)||0),(_||_===0)&&(r=_))),!u||h!==r||eh)return!isNaN(h*r)&&r!==""?(_=new Kn(this._pt,e,t,+h||0,r-(h||0),typeof f=="boolean"?xM:U0,0,d),c&&(_.fp=c),a&&_.modifier(a,this,e),this._pt=_):(!f&&!(t in e)&&Ed(t,r),hM.call(this,e,t,h,r,d,l||di.stringFilter,c))},dM=function(e,t,i,r,s){if($t(e)&&(e=Wa(e,s,t,i,r)),!nr(e)||e.style&&e.nodeType||An(e)||Jg(e))return hn(e)?Wa(e,s,t,i,r):e;var o={},a;for(a in e)o[a]=Wa(e[a],s,t,i,r);return o},P0=function(e,t,i,r,s,o){var a,l,c,u;if(oi[e]&&(a=new oi[e]).init(s,a.rawVars?t[e]:dM(t[e],r,s,o,i),i,r,o)!==!1&&(i._pt=l=new Kn(i._pt,s,e,0,1,a.render,a,0,a.priority),i!==Lo))for(c=i._ptLookup[i._targets.indexOf(s)],u=a._props.length;u--;)c[a._props[u]]=l;return a},jr,eh,Pd=function n(e,t,i){var r=e.vars,s=r.ease,o=r.startAt,a=r.immediateRender,l=r.lazy,c=r.onUpdate,u=r.runBackwards,f=r.yoyoEase,h=r.keyframes,d=r.autoRevert,_=e._dur,g=e._startAt,m=e._targets,p=e.parent,y=p&&p.data==="nested"?p.vars.targets:m,M=e._overwrite==="auto"&&!yd,v=e.timeline,R,w,T,D,S,x,P,U,k,Y,te,W,X;if(v&&(!h||!s)&&(s="none"),e._ease=qs(s,Ko.ease),e._yEase=f?w0(qs(f===!0?s:f,Ko.ease)):0,f&&e._yoyo&&!e._repeat&&(f=e._yEase,e._yEase=e._ease,e._ease=f),e._from=!v&&!!r.runBackwards,!v||h&&!r.stagger){if(U=m[0]?Ys(m[0]).harness:0,W=U&&r[U.prop],R=$c(r,Td),g&&(g._zTime<0&&g.progress(1),t<0&&u&&a&&!d?g.render(-1,!0):g.revert(u&&_?yc:HS),g._lazy=0),o){if(hs(e._startAt=en.set(m,mi({data:"isStart",overwrite:!1,parent:p,immediateRender:!0,lazy:!g&&$n(l),startAt:null,delay:0,onUpdate:c&&function(){return hi(e,"onUpdate")},stagger:0},o))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(mn||!a&&!d)&&e._startAt.revert(yc),a&&_&&t<=0&&i<=0){t&&(e._zTime=t);return}}else if(u&&_&&!g){if(t&&(a=!1),T=mi({overwrite:!1,data:"isFromStart",lazy:a&&!g&&$n(l),immediateRender:a,stagger:0,parent:p},R),W&&(T[U.prop]=W),hs(e._startAt=en.set(m,T)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(mn?e._startAt.revert(yc):e._startAt.render(-1,!0)),e._zTime=t,!a)n(e._startAt,Lt,Lt);else if(!t)return}for(e._pt=e._ptCache=0,l=_&&$n(l)||l&&!_,w=0;w<m.length;w++){if(S=m[w],P=S._gsap||Ad(m)[w]._gsap,e._ptLookup[w]=Y={},qf[P.id]&&is.length&&Yc(),te=y===m?w:y.indexOf(S),U&&(k=new U).init(S,W||R,e,te,y)!==!1&&(e._pt=D=new Kn(e._pt,S,k.name,0,1,k.render,k,0,k.priority),k._props.forEach(function(V){Y[V]=D}),k.priority&&(x=1)),!U||W)for(T in R)oi[T]&&(k=P0(T,R,e,te,S,y))?k.priority&&(x=1):Y[T]=D=Rd.call(e,S,T,"get",R[T],te,y,0,r.stringFilter);e._op&&e._op[w]&&e.kill(S,e._op[w]),M&&e._pt&&(jr=e,Vt.killTweensOf(S,Y,e.globalTime(t)),X=!e.parent,jr=0),e._pt&&l&&(qf[P.id]=1)}x&&O0(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!X,h&&t<=0&&v.render(Ei,!0,!0)},pM=function(e,t,i,r,s,o,a,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],u,f,h,d;if(!c)for(c=e._ptCache[t]=[],h=e._ptLookup,d=e._targets.length;d--;){if(u=h[d][t],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==t&&u.fp!==t;)u=u._next;if(!u)return eh=1,e.vars[t]="+=0",Pd(e,a),eh=0,l?ul(t+" not eligible for reset"):1;c.push(u)}for(d=c.length;d--;)f=c[d],u=f._pt||f,u.s=(r||r===0)&&!s?r:u.s+(r||0)+o*u.c,u.c=i-u.s,f.e&&(f.e=Kt(i)+En(f.e)),f.b&&(f.b=u.s+En(f.b))},mM=function(e,t){var i=e[0]?Ys(e[0]).harness:0,r=i&&i.aliases,s,o,a,l;if(!r)return t;s=jo({},t);for(o in r)if(o in s)for(l=r[o].split(","),a=l.length;a--;)s[l[a]]=s[o];return s},_M=function(e,t,i,r){var s=t.ease||r||"power1.inOut",o,a;if(An(t))a=i[e]||(i[e]=[]),t.forEach(function(l,c){return a.push({t:c/(t.length-1)*100,v:l,e:s})});else for(o in t)a=i[o]||(i[o]=[]),o==="ease"||a.push({t:parseFloat(e),v:t[o],e:s})},Wa=function(e,t,i,r,s){return $t(e)?e.call(t,i,r,s):hn(e)&&~e.indexOf("random(")?hl(e):e},D0=wd+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",L0={};qn(D0+",id,stagger,delay,duration,paused,scrollTrigger",function(n){return L0[n]=1});var en=(function(n){jg(e,n);function e(i,r,s,o){var a;typeof r=="number"&&(s.duration=r,r=s,s=null),a=n.call(this,o?r:Va(r))||this;var l=a.vars,c=l.duration,u=l.delay,f=l.immediateRender,h=l.stagger,d=l.overwrite,_=l.keyframes,g=l.defaults,m=l.scrollTrigger,p=l.yoyoEase,y=r.parent||Vt,M=(An(i)||Jg(i)?Pr(i[0]):"length"in r)?[i]:Ti(i),v,R,w,T,D,S,x,P;if(a._targets=M.length?Ad(M):ul("GSAP target "+i+" not found. https://gsap.com",!di.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=d,_||h||Ll(c)||Ll(u)){if(r=a.vars,v=a.timeline=new Vn({data:"nested",defaults:g||{},targets:y&&y.data==="nested"?y.vars.targets:M}),v.kill(),v.parent=v._dp=mr(a),v._start=0,h||Ll(c)||Ll(u)){if(T=M.length,x=h&&_0(h),nr(h))for(D in h)~D0.indexOf(D)&&(P||(P={}),P[D]=h[D]);for(R=0;R<T;R++)w=$c(r,L0),w.stagger=0,p&&(w.yoyoEase=p),P&&jo(w,P),S=M[R],w.duration=+Wa(c,mr(a),R,S,M),w.delay=(+Wa(u,mr(a),R,S,M)||0)-a._delay,!h&&T===1&&w.delay&&(a._delay=u=w.delay,a._start+=u,w.delay=0),v.to(S,w,x?x(R,S,M):0),v._ease=dt.none;v.duration()?c=u=0:a.timeline=0}else if(_){Va(mi(v.vars.defaults,{ease:"none"})),v._ease=qs(_.ease||r.ease||"none");var U=0,k,Y,te;if(An(_))_.forEach(function(W){return v.to(M,W,">")}),v.duration();else{w={};for(D in _)D==="ease"||D==="easeEach"||_M(D,_[D],w,_.easeEach);for(D in w)for(k=w[D].sort(function(W,X){return W.t-X.t}),U=0,R=0;R<k.length;R++)Y=k[R],te={ease:Y.e,duration:(Y.t-(R?k[R-1].t:0))/100*c},te[D]=Y.v,v.to(M,te,U),U+=te.duration;v.duration()<c&&v.to({},{duration:c-v.duration()})}}c||a.duration(c=v.duration())}else a.timeline=0;return d===!0&&!yd&&(jr=mr(a),Vt.killTweensOf(M),jr=0),ji(y,mr(a),s),r.reversed&&a.reverse(),r.paused&&a.paused(!0),(f||!c&&!_&&a._start===tn(y._time)&&$n(f)&&$S(mr(a))&&y.data!=="nested")&&(a._tTime=-Lt,a.render(Math.max(0,-u)||0)),m&&h0(mr(a),m),a}var t=e.prototype;return t.render=function(r,s,o){var a=this._time,l=this._tDur,c=this._dur,u=r<0,f=r>l-Lt&&!u?l:r<Lt?0:r,h,d,_,g,m,p,y,M,v;if(!c)KS(this,r,s,o);else if(f!==this._tTime||!r||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(h=f,M=this.timeline,this._repeat){if(g=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(g*100+r,s,o);if(h=tn(f%g),f===l?(_=this._repeat,h=c):(m=tn(f/g),_=~~m,_&&_===m?(h=c,_--):h>c&&(h=c)),p=this._yoyo&&_&1,p&&(v=this._yEase,h=c-h),m=Zo(this._tTime,g),h===a&&!o&&this._initted&&_===m)return this._tTime=f,this;_!==m&&(M&&this._yEase&&A0(M,p),this.vars.repeatRefresh&&!p&&!this._lock&&h!==g&&this._initted&&(this._lock=o=1,this.render(tn(g*_),!0).invalidate()._lock=0))}if(!this._initted){if(d0(this,u?r:h,o,s,f))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&_!==m))return this;if(c!==this._dur)return this.render(r,s,o)}if(this._tTime=f,this._time=h,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=y=(v||this._ease)(h/c),this._from&&(this.ratio=y=1-y),!a&&f&&!s&&!m&&(hi(this,"onStart"),this._tTime!==f))return this;for(d=this._pt;d;)d.r(y,d.d),d=d._next;M&&M.render(r<0?r:M._dur*M._ease(h/this._dur),s,o)||this._startAt&&(this._zTime=r),this._onUpdate&&!s&&(u&&Kf(this,r,s,o),hi(this,"onUpdate")),this._repeat&&_!==m&&this.vars.onRepeat&&!s&&this.parent&&hi(this,"onRepeat"),(f===this._tDur||!f)&&this._tTime===f&&(u&&!this._onUpdate&&Kf(this,r,!0,!0),(r||!c)&&(f===this._tDur&&this._ts>0||!f&&this._ts<0)&&hs(this,1),!s&&!(u&&!a)&&(f||a||p)&&(hi(this,f===l?"onComplete":"onReverseComplete",!0),this._prom&&!(f<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(r){return(!r||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(r),n.prototype.invalidate.call(this,r)},t.resetTo=function(r,s,o,a,l){dl||ci.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||Pd(this,c),u=this._ease(c/this._dur),pM(this,r,s,o,a,u,c,l)?this.resetTo(r,s,o,a,1):(yu(this,0),this.parent||u0(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(r,s){if(s===void 0&&(s="all"),!r&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?wa(this):this.scrollTrigger&&this.scrollTrigger.kill(!!mn),this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(r,s,jr&&jr.vars.overwrite!==!0)._first||wa(this),this.parent&&o!==this.timeline.totalDuration()&&Jo(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=r?Ti(r):a,c=this._ptLookup,u=this._pt,f,h,d,_,g,m,p;if((!s||s==="all")&&XS(a,l))return s==="all"&&(this._pt=0),wa(this);for(f=this._op=this._op||[],s!=="all"&&(hn(s)&&(g={},qn(s,function(y){return g[y]=1}),s=g),s=mM(a,s)),p=a.length;p--;)if(~l.indexOf(a[p])){h=c[p],s==="all"?(f[p]=s,_=h,d={}):(d=f[p]=f[p]||{},_=s);for(g in _)m=h&&h[g],m&&((!("kill"in m.d)||m.d.kill(g)===!0)&&vu(this,m,"_pt"),delete h[g]),d!=="all"&&(d[g]=1)}return this._initted&&!this._pt&&u&&wa(this),this},e.to=function(r,s){return new e(r,s,arguments[2])},e.from=function(r,s){return Ga(1,arguments)},e.delayedCall=function(r,s,o,a){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:r,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},e.fromTo=function(r,s,o){return Ga(2,arguments)},e.set=function(r,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(r,s)},e.killTweensOf=function(r,s,o){return Vt.killTweensOf(r,s,o)},e})(pl);mi(en.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});qn("staggerTo,staggerFrom,staggerFromTo",function(n){en[n]=function(){var e=new Vn,t=Zf.call(arguments,0);return t.splice(n==="staggerFromTo"?5:4,0,0),e[n].apply(e,t)}});var Dd=function(e,t,i){return e[t]=i},I0=function(e,t,i){return e[t](i)},gM=function(e,t,i,r){return e[t](r.fp,i)},vM=function(e,t,i){return e.setAttribute(t,i)},Ld=function(e,t){return $t(e[t])?I0:Sd(e[t])&&e.setAttribute?vM:Dd},U0=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},xM=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},N0=function(e,t){var i=t._pt,r="";if(!e&&t.b)r=t.b;else if(e===1&&t.e)r=t.e;else{for(;i;)r=i.p+(i.m?i.m(i.s+i.c*e):Math.round((i.s+i.c*e)*1e4)/1e4)+r,i=i._next;r+=t.c}t.set(t.t,t.p,r,t)},Id=function(e,t){for(var i=t._pt;i;)i.r(e,i.d),i=i._next},yM=function(e,t,i,r){for(var s=this._pt,o;s;)o=s._next,s.p===r&&s.modifier(e,t,i),s=o},SM=function(e){for(var t=this._pt,i,r;t;)r=t._next,t.p===e&&!t.op||t.op===e?vu(this,t,"_pt"):t.dep||(i=1),t=r;return!i},MM=function(e,t,i,r){r.mSet(e,t,r.m.call(r.tween,i,r.mt),r)},O0=function(e){for(var t=e._pt,i,r,s,o;t;){for(i=t._next,r=s;r&&r.pr>t.pr;)r=r._next;(t._prev=r?r._prev:o)?t._prev._next=t:s=t,(t._next=r)?r._prev=t:o=t,t=i}e._pt=s},Kn=(function(){function n(t,i,r,s,o,a,l,c,u){this.t=i,this.s=s,this.c=o,this.p=r,this.r=a||U0,this.d=l||this,this.set=c||Dd,this.pr=u||0,this._next=t,t&&(t._prev=this)}var e=n.prototype;return e.modifier=function(i,r,s){this.mSet=this.mSet||this.set,this.set=MM,this.m=i,this.mt=s,this.tween=r},n})();qn(wd+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(n){return Td[n]=1});pi.TweenMax=pi.TweenLite=en;pi.TimelineLite=pi.TimelineMax=Vn;Vt=new Vn({sortChildren:!1,defaults:Ko,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});di.stringFilter=T0;var Ks=[],Mc={},bM=[],jp=0,EM=0,Yu=function(e){return(Mc[e]||bM).map(function(t){return t()})},th=function(){var e=Date.now(),t=[];e-jp>2&&(Yu("matchMediaInit"),Ks.forEach(function(i){var r=i.queries,s=i.conditions,o,a,l,c;for(a in r)o=Yi.matchMedia(r[a]).matches,o&&(l=1),o!==s[a]&&(s[a]=o,c=1);c&&(i.revert(),l&&t.push(i))}),Yu("matchMediaRevert"),t.forEach(function(i){return i.onMatch(i,function(r){return i.add(null,r)})}),jp=e,Yu("matchMedia"))},F0=(function(){function n(t,i){this.selector=i&&Jf(i),this.data=[],this._r=[],this.isReverted=!1,this.id=EM++,t&&this.add(t)}var e=n.prototype;return e.add=function(i,r,s){$t(i)&&(s=r,r=i,i=$t);var o=this,a=function(){var c=zt,u=o.selector,f;return c&&c!==o&&c.data.push(o),s&&(o.selector=Jf(s)),zt=o,f=r.apply(o,arguments),$t(f)&&o._r.push(f),zt=c,o.selector=u,o.isReverted=!1,f};return o.last=a,i===$t?a(o,function(l){return o.add(null,l)}):i?o[i]=a:a},e.ignore=function(i){var r=zt;zt=null,i(this),zt=r},e.getTweens=function(){var i=[];return this.data.forEach(function(r){return r instanceof n?i.push.apply(i,r.getTweens()):r instanceof en&&!(r.parent&&r.parent.data==="nested")&&i.push(r)}),i},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(i,r){var s=this;if(i?(function(){for(var a=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return a.splice(a.indexOf(u),1)}));for(a.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,f){return f.g-u.g||-1/0}).forEach(function(u){return u.t.revert(i)}),l=s.data.length;l--;)c=s.data[l],c instanceof Vn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof en)&&c.revert&&c.revert(i);s._r.forEach(function(u){return u(i,s)}),s.isReverted=!0})():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),r)for(var o=Ks.length;o--;)Ks[o].id===this.id&&Ks.splice(o,1)},e.revert=function(i){this.kill(i||{})},n})(),TM=(function(){function n(t){this.contexts=[],this.scope=t,zt&&zt.data.push(this)}var e=n.prototype;return e.add=function(i,r,s){nr(i)||(i={matches:i});var o=new F0(0,s||this.scope),a=o.conditions={},l,c,u;zt&&!o.selector&&(o.selector=zt.selector),this.contexts.push(o),r=o.add("onMatch",r),o.queries=i;for(c in i)c==="all"?u=1:(l=Yi.matchMedia(i[c]),l&&(Ks.indexOf(o)<0&&Ks.push(o),(a[c]=l.matches)&&(u=1),l.addListener?l.addListener(th):l.addEventListener("change",th)));return u&&r(o,function(f){return o.add(null,f)}),this},e.revert=function(i){this.kill(i||{})},e.kill=function(i){this.contexts.forEach(function(r){return r.kill(i,!0)})},n})(),Kc={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];t.forEach(function(r){return M0(r)})},timeline:function(e){return new Vn(e)},getTweensOf:function(e,t){return Vt.getTweensOf(e,t)},getProperty:function(e,t,i,r){hn(e)&&(e=Ti(e)[0]);var s=Ys(e||{}).get,o=i?c0:l0;return i==="native"&&(i=""),e&&(t?o((oi[t]&&oi[t].get||s)(e,t,i,r)):function(a,l,c){return o((oi[a]&&oi[a].get||s)(e,a,l,c))})},quickSetter:function(e,t,i){if(e=Ti(e),e.length>1){var r=e.map(function(u){return Jn.quickSetter(u,t,i)}),s=r.length;return function(u){for(var f=s;f--;)r[f](u)}}e=e[0]||{};var o=oi[t],a=Ys(e),l=a.harness&&(a.harness.aliases||{})[t]||t,c=o?function(u){var f=new o;Lo._pt=0,f.init(e,i?u+i:u,Lo,0,[e]),f.render(1,f),Lo._pt&&Id(1,Lo)}:a.set(e,l);return o?c:function(u){return c(e,l,i?u+i:u,a,1)}},quickTo:function(e,t,i){var r,s=Jn.to(e,mi((r={},r[t]="+=0.1",r.paused=!0,r.stagger=0,r),i||{})),o=function(l,c,u){return s.resetTo(t,l,c,u)};return o.tween=s,o},isTweening:function(e){return Vt.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=qs(e.ease,Ko.ease)),Xp(Ko,e||{})},config:function(e){return Xp(di,e||{})},registerEffect:function(e){var t=e.name,i=e.effect,r=e.plugins,s=e.defaults,o=e.extendTimeline;(r||"").split(",").forEach(function(a){return a&&!oi[a]&&!pi[a]&&ul(t+" effect requires "+a+" plugin.")}),Vu[t]=function(a,l,c){return i(Ti(a),mi(l||{},s),c)},o&&(Vn.prototype[t]=function(a,l,c){return this.add(Vu[t](a,nr(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){dt[e]=qs(t)},parseEase:function(e,t){return arguments.length?qs(e,t):dt},getById:function(e){return Vt.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var i=new Vn(e),r,s;for(i.smoothChildTiming=$n(e.smoothChildTiming),Vt.remove(i),i._dp=0,i._time=i._tTime=Vt._time,r=Vt._first;r;)s=r._next,(t||!(!r._dur&&r instanceof en&&r.vars.onComplete===r._targets[0]))&&ji(i,r,r._start-r._delay),r=s;return ji(Vt,i,0),i},context:function(e,t){return e?new F0(e,t):zt},matchMedia:function(e){return new TM(e)},matchMediaRefresh:function(){return Ks.forEach(function(e){var t=e.conditions,i,r;for(r in t)t[r]&&(t[r]=!1,i=1);i&&e.revert()})||th()},addEventListener:function(e,t){var i=Mc[e]||(Mc[e]=[]);~i.indexOf(t)||i.push(t)},removeEventListener:function(e,t){var i=Mc[e],r=i&&i.indexOf(t);r>=0&&i.splice(r,1)},utils:{wrap:iM,wrapYoyo:rM,distribute:_0,random:v0,snap:g0,normalize:nM,getUnit:En,clamp:JS,splitColor:b0,toArray:Ti,selector:Jf,mapRange:y0,pipe:eM,unitize:tM,interpolate:sM,shuffle:m0},install:i0,effects:Vu,ticker:ci,updateRoot:Vn.updateRoot,plugins:oi,globalTimeline:Vt,core:{PropTween:Kn,globals:r0,Tween:en,Timeline:Vn,Animation:pl,getCache:Ys,_removeLinkedListItem:vu,reverting:function(){return mn},context:function(e){return e&&zt&&(zt.data.push(e),e._ctx=zt),zt},suppressOverwrites:function(e){return yd=e}}};qn("to,from,fromTo,delayedCall,set,killTweensOf",function(n){return Kc[n]=en[n]});ci.add(Vn.updateRoot);Lo=Kc.to({},{duration:0});var wM=function(e,t){for(var i=e._pt;i&&i.p!==t&&i.op!==t&&i.fp!==t;)i=i._next;return i},AM=function(e,t){var i=e._targets,r,s,o;for(r in t)for(s=i.length;s--;)o=e._ptLookup[s][r],o&&(o=o.d)&&(o._pt&&(o=wM(o,r)),o&&o.modifier&&o.modifier(t[r],e,i[s],r))},$u=function(e,t){return{name:e,headless:1,rawVars:1,init:function(r,s,o){o._onInit=function(a){var l,c;if(hn(s)&&(l={},qn(s,function(u){return l[u]=1}),s=l),t){l={};for(c in s)l[c]=t(s[c]);s=l}AM(a,s)}}}},Jn=Kc.registerPlugin({name:"attr",init:function(e,t,i,r,s){var o,a,l;this.tween=i;for(o in t)l=e.getAttribute(o)||"",a=this.add(e,"setAttribute",(l||0)+"",t[o],r,s,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(e,t){for(var i=t._pt;i;)mn?i.set(i.t,i.p,i.b,i):i.r(e,i.d),i=i._next}},{name:"endArray",headless:1,init:function(e,t){for(var i=t.length;i--;)this.add(e,i,e[i]||0,t[i],0,0,0,0,0,1)}},$u("roundProps",Qf),$u("modifiers"),$u("snap",g0))||Kc;en.version=Vn.version=Jn.version="3.13.0";n0=1;Md()&&Qo();dt.Power0;dt.Power1;dt.Power2;dt.Power3;dt.Power4;dt.Linear;dt.Quad;dt.Cubic;dt.Quart;dt.Quint;dt.Strong;dt.Elastic;dt.Back;dt.SteppedEase;dt.Bounce;dt.Sine;dt.Expo;dt.Circ;var Zp,Zr,Ho,Ud,Hs,Jp,Nd,CM=function(){return typeof window<"u"},Dr={},Is=180/Math.PI,Vo=Math.PI/180,lo=Math.atan2,Qp=1e8,Od=/([A-Z])/g,RM=/(left|right|width|margin|padding|x)/i,PM=/[\s,\(]\S/,Zi={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},nh=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},DM=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},LM=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},IM=function(e,t){var i=t.s+t.c*e;t.set(t.t,t.p,~~(i+(i<0?-.5:.5))+t.u,t)},B0=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},k0=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},UM=function(e,t,i){return e.style[t]=i},NM=function(e,t,i){return e.style.setProperty(t,i)},OM=function(e,t,i){return e._gsap[t]=i},FM=function(e,t,i){return e._gsap.scaleX=e._gsap.scaleY=i},BM=function(e,t,i,r,s){var o=e._gsap;o.scaleX=o.scaleY=i,o.renderTransform(s,o)},kM=function(e,t,i,r,s){var o=e._gsap;o[t]=i,o.renderTransform(s,o)},Gt="transform",jn=Gt+"Origin",zM=function n(e,t){var i=this,r=this.target,s=r.style,o=r._gsap;if(e in Dr&&s){if(this.tfm=this.tfm||{},e!=="transform")e=Zi[e]||e,~e.indexOf(",")?e.split(",").forEach(function(a){return i.tfm[a]=gr(r,a)}):this.tfm[e]=o.x?o[e]:gr(r,e),e===jn&&(this.tfm.zOrigin=o.zOrigin);else return Zi.transform.split(",").forEach(function(a){return n.call(i,a,t)});if(this.props.indexOf(Gt)>=0)return;o.svg&&(this.svgo=r.getAttribute("data-svg-origin"),this.props.push(jn,t,"")),e=Gt}(s||t)&&this.props.push(e,t,s[e])},z0=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},HM=function(){var e=this.props,t=this.target,i=t.style,r=t._gsap,s,o;for(s=0;s<e.length;s+=3)e[s+1]?e[s+1]===2?t[e[s]](e[s+2]):t[e[s]]=e[s+2]:e[s+2]?i[e[s]]=e[s+2]:i.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(Od,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)r[o]=this.tfm[o];r.svg&&(r.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),s=Nd(),(!s||!s.isStart)&&!i[Gt]&&(z0(i),r.zOrigin&&i[jn]&&(i[jn]+=" "+r.zOrigin+"px",r.zOrigin=0,r.renderTransform()),r.uncache=1)}},H0=function(e,t){var i={target:e,props:[],revert:HM,save:zM};return e._gsap||Jn.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(r){return i.save(r)}),i},V0,ih=function(e,t){var i=Zr.createElementNS?Zr.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):Zr.createElement(e);return i&&i.style?i:Zr.createElement(e)},wi=function n(e,t,i){var r=getComputedStyle(e);return r[t]||r.getPropertyValue(t.replace(Od,"-$1").toLowerCase())||r.getPropertyValue(t)||!i&&n(e,ea(t)||t,1)||""},em="O,Moz,ms,Ms,Webkit".split(","),ea=function(e,t,i){var r=t||Hs,s=r.style,o=5;if(e in s&&!i)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);o--&&!(em[o]+e in s););return o<0?null:(o===3?"ms":o>=0?em[o]:"")+e},rh=function(){CM()&&window.document&&(Zp=window,Zr=Zp.document,Ho=Zr.documentElement,Hs=ih("div")||{style:{}},ih("div"),Gt=ea(Gt),jn=Gt+"Origin",Hs.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",V0=!!ea("perspective"),Nd=Jn.core.reverting,Ud=1)},tm=function(e){var t=e.ownerSVGElement,i=ih("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),r=e.cloneNode(!0),s;r.style.display="block",i.appendChild(r),Ho.appendChild(i);try{s=r.getBBox()}catch{}return i.removeChild(r),Ho.removeChild(i),s},nm=function(e,t){for(var i=t.length;i--;)if(e.hasAttribute(t[i]))return e.getAttribute(t[i])},G0=function(e){var t,i;try{t=e.getBBox()}catch{t=tm(e),i=1}return t&&(t.width||t.height)||i||(t=tm(e)),t&&!t.width&&!t.x&&!t.y?{x:+nm(e,["x","cx","x1"])||0,y:+nm(e,["y","cy","y1"])||0,width:0,height:0}:t},W0=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&G0(e))},Qs=function(e,t){if(t){var i=e.style,r;t in Dr&&t!==jn&&(t=Gt),i.removeProperty?(r=t.substr(0,2),(r==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),i.removeProperty(r==="--"?t:t.replace(Od,"-$1").toLowerCase())):i.removeAttribute(t)}},Jr=function(e,t,i,r,s,o){var a=new Kn(e._pt,t,i,0,1,o?k0:B0);return e._pt=a,a.b=r,a.e=s,e._props.push(i),a},im={deg:1,rad:1,turn:1},VM={grid:1,flex:1},ds=function n(e,t,i,r){var s=parseFloat(i)||0,o=(i+"").trim().substr((s+"").length)||"px",a=Hs.style,l=RM.test(t),c=e.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),f=100,h=r==="px",d=r==="%",_,g,m,p;if(r===o||!s||im[r]||im[o])return s;if(o!=="px"&&!h&&(s=n(e,t,i,"px")),p=e.getCTM&&W0(e),(d||o==="%")&&(Dr[t]||~t.indexOf("adius")))return _=p?e.getBBox()[l?"width":"height"]:e[u],Kt(d?s/_*f:s/100*_);if(a[l?"width":"height"]=f+(h?o:r),g=r!=="rem"&&~t.indexOf("adius")||r==="em"&&e.appendChild&&!c?e:e.parentNode,p&&(g=(e.ownerSVGElement||{}).parentNode),(!g||g===Zr||!g.appendChild)&&(g=Zr.body),m=g._gsap,m&&d&&m.width&&l&&m.time===ci.time&&!m.uncache)return Kt(s/m.width*f);if(d&&(t==="height"||t==="width")){var y=e.style[t];e.style[t]=f+r,_=e[u],y?e.style[t]=y:Qs(e,t)}else(d||o==="%")&&!VM[wi(g,"display")]&&(a.position=wi(e,"position")),g===e&&(a.position="static"),g.appendChild(Hs),_=Hs[u],g.removeChild(Hs),a.position="absolute";return l&&d&&(m=Ys(g),m.time=ci.time,m.width=g[u]),Kt(h?_*s/f:_&&s?f/_*s:0)},gr=function(e,t,i,r){var s;return Ud||rh(),t in Zi&&t!=="transform"&&(t=Zi[t],~t.indexOf(",")&&(t=t.split(",")[0])),Dr[t]&&t!=="transform"?(s=_l(e,r),s=t!=="transformOrigin"?s[t]:s.svg?s.origin:Zc(wi(e,jn))+" "+s.zOrigin+"px"):(s=e.style[t],(!s||s==="auto"||r||~(s+"").indexOf("calc("))&&(s=jc[t]&&jc[t](e,t,i)||wi(e,t)||o0(e,t)||(t==="opacity"?1:0))),i&&!~(s+"").trim().indexOf(" ")?ds(e,t,s,i)+i:s},GM=function(e,t,i,r){if(!i||i==="none"){var s=ea(t,e,1),o=s&&wi(e,s,1);o&&o!==i?(t=s,i=o):t==="borderColor"&&(i=wi(e,"borderTopColor"))}var a=new Kn(this._pt,e.style,t,0,1,N0),l=0,c=0,u,f,h,d,_,g,m,p,y,M,v,R;if(a.b=i,a.e=r,i+="",r+="",r.substring(0,6)==="var(--"&&(r=wi(e,r.substring(4,r.indexOf(")")))),r==="auto"&&(g=e.style[t],e.style[t]=r,r=wi(e,t)||r,g?e.style[t]=g:Qs(e,t)),u=[i,r],T0(u),i=u[0],r=u[1],h=i.match(Do)||[],R=r.match(Do)||[],R.length){for(;f=Do.exec(r);)m=f[0],y=r.substring(l,f.index),_?_=(_+1)%5:(y.substr(-5)==="rgba("||y.substr(-5)==="hsla(")&&(_=1),m!==(g=h[c++]||"")&&(d=parseFloat(g)||0,v=g.substr((d+"").length),m.charAt(1)==="="&&(m=zo(d,m)+v),p=parseFloat(m),M=m.substr((p+"").length),l=Do.lastIndex-M.length,M||(M=M||di.units[t]||v,l===r.length&&(r+=M,a.e+=M)),v!==M&&(d=ds(e,t,g,M)||0),a._pt={_next:a._pt,p:y||c===1?y:",",s:d,c:p-d,m:_&&_<4||t==="zIndex"?Math.round:0});a.c=l<r.length?r.substring(l,r.length):""}else a.r=t==="display"&&r==="none"?k0:B0;return e0.test(r)&&(a.e=0),this._pt=a,a},rm={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},WM=function(e){var t=e.split(" "),i=t[0],r=t[1]||"50%";return(i==="top"||i==="bottom"||r==="left"||r==="right")&&(e=i,i=r,r=e),t[0]=rm[i]||i,t[1]=rm[r]||r,t.join(" ")},XM=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var i=t.t,r=i.style,s=t.u,o=i._gsap,a,l,c;if(s==="all"||s===!0)r.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)a=s[c],Dr[a]&&(l=1,a=a==="transformOrigin"?jn:Gt),Qs(i,a);l&&(Qs(i,Gt),o&&(o.svg&&i.removeAttribute("transform"),r.scale=r.rotate=r.translate="none",_l(i,1),o.uncache=1,z0(r)))}},jc={clearProps:function(e,t,i,r,s){if(s.data!=="isFromStart"){var o=e._pt=new Kn(e._pt,t,i,0,0,XM);return o.u=r,o.pr=-10,o.tween=s,e._props.push(i),1}}},ml=[1,0,0,1,0,0],X0={},Y0=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},sm=function(e){var t=wi(e,Gt);return Y0(t)?ml:t.substr(7).match(Qg).map(Kt)},Fd=function(e,t){var i=e._gsap||Ys(e),r=e.style,s=sm(e),o,a,l,c;return i.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?ml:s):(s===ml&&!e.offsetParent&&e!==Ho&&!i.svg&&(l=r.display,r.display="block",o=e.parentNode,(!o||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,a=e.nextElementSibling,Ho.appendChild(e)),s=sm(e),l?r.display=l:Qs(e,"display"),c&&(a?o.insertBefore(e,a):o?o.appendChild(e):Ho.removeChild(e))),t&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},sh=function(e,t,i,r,s,o){var a=e._gsap,l=s||Fd(e,!0),c=a.xOrigin||0,u=a.yOrigin||0,f=a.xOffset||0,h=a.yOffset||0,d=l[0],_=l[1],g=l[2],m=l[3],p=l[4],y=l[5],M=t.split(" "),v=parseFloat(M[0])||0,R=parseFloat(M[1])||0,w,T,D,S;i?l!==ml&&(T=d*m-_*g)&&(D=v*(m/T)+R*(-g/T)+(g*y-m*p)/T,S=v*(-_/T)+R*(d/T)-(d*y-_*p)/T,v=D,R=S):(w=G0(e),v=w.x+(~M[0].indexOf("%")?v/100*w.width:v),R=w.y+(~(M[1]||M[0]).indexOf("%")?R/100*w.height:R)),r||r!==!1&&a.smooth?(p=v-c,y=R-u,a.xOffset=f+(p*d+y*g)-p,a.yOffset=h+(p*_+y*m)-y):a.xOffset=a.yOffset=0,a.xOrigin=v,a.yOrigin=R,a.smooth=!!r,a.origin=t,a.originIsAbsolute=!!i,e.style[jn]="0px 0px",o&&(Jr(o,a,"xOrigin",c,v),Jr(o,a,"yOrigin",u,R),Jr(o,a,"xOffset",f,a.xOffset),Jr(o,a,"yOffset",h,a.yOffset)),e.setAttribute("data-svg-origin",v+" "+R)},_l=function(e,t){var i=e._gsap||new R0(e);if("x"in i&&!t&&!i.uncache)return i;var r=e.style,s=i.scaleX<0,o="px",a="deg",l=getComputedStyle(e),c=wi(e,jn)||"0",u,f,h,d,_,g,m,p,y,M,v,R,w,T,D,S,x,P,U,k,Y,te,W,X,V,ae,N,ge,we,Be,ee,fe;return u=f=h=g=m=p=y=M=v=0,d=_=1,i.svg=!!(e.getCTM&&W0(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(r[Gt]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[Gt]!=="none"?l[Gt]:"")),r.scale=r.rotate=r.translate="none"),T=Fd(e,i.svg),i.svg&&(i.uncache?(V=e.getBBox(),c=i.xOrigin-V.x+"px "+(i.yOrigin-V.y)+"px",X=""):X=!t&&e.getAttribute("data-svg-origin"),sh(e,X||c,!!X||i.originIsAbsolute,i.smooth!==!1,T)),R=i.xOrigin||0,w=i.yOrigin||0,T!==ml&&(P=T[0],U=T[1],k=T[2],Y=T[3],u=te=T[4],f=W=T[5],T.length===6?(d=Math.sqrt(P*P+U*U),_=Math.sqrt(Y*Y+k*k),g=P||U?lo(U,P)*Is:0,y=k||Y?lo(k,Y)*Is+g:0,y&&(_*=Math.abs(Math.cos(y*Vo))),i.svg&&(u-=R-(R*P+w*k),f-=w-(R*U+w*Y))):(fe=T[6],Be=T[7],N=T[8],ge=T[9],we=T[10],ee=T[11],u=T[12],f=T[13],h=T[14],D=lo(fe,we),m=D*Is,D&&(S=Math.cos(-D),x=Math.sin(-D),X=te*S+N*x,V=W*S+ge*x,ae=fe*S+we*x,N=te*-x+N*S,ge=W*-x+ge*S,we=fe*-x+we*S,ee=Be*-x+ee*S,te=X,W=V,fe=ae),D=lo(-k,we),p=D*Is,D&&(S=Math.cos(-D),x=Math.sin(-D),X=P*S-N*x,V=U*S-ge*x,ae=k*S-we*x,ee=Y*x+ee*S,P=X,U=V,k=ae),D=lo(U,P),g=D*Is,D&&(S=Math.cos(D),x=Math.sin(D),X=P*S+U*x,V=te*S+W*x,U=U*S-P*x,W=W*S-te*x,P=X,te=V),m&&Math.abs(m)+Math.abs(g)>359.9&&(m=g=0,p=180-p),d=Kt(Math.sqrt(P*P+U*U+k*k)),_=Kt(Math.sqrt(W*W+fe*fe)),D=lo(te,W),y=Math.abs(D)>2e-4?D*Is:0,v=ee?1/(ee<0?-ee:ee):0),i.svg&&(X=e.getAttribute("transform"),i.forceCSS=e.setAttribute("transform","")||!Y0(wi(e,Gt)),X&&e.setAttribute("transform",X))),Math.abs(y)>90&&Math.abs(y)<270&&(s?(d*=-1,y+=g<=0?180:-180,g+=g<=0?180:-180):(_*=-1,y+=y<=0?180:-180)),t=t||i.uncache,i.x=u-((i.xPercent=u&&(!t&&i.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-u)?-50:0)))?e.offsetWidth*i.xPercent/100:0)+o,i.y=f-((i.yPercent=f&&(!t&&i.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-f)?-50:0)))?e.offsetHeight*i.yPercent/100:0)+o,i.z=h+o,i.scaleX=Kt(d),i.scaleY=Kt(_),i.rotation=Kt(g)+a,i.rotationX=Kt(m)+a,i.rotationY=Kt(p)+a,i.skewX=y+a,i.skewY=M+a,i.transformPerspective=v+o,(i.zOrigin=parseFloat(c.split(" ")[2])||!t&&i.zOrigin||0)&&(r[jn]=Zc(c)),i.xOffset=i.yOffset=0,i.force3D=di.force3D,i.renderTransform=i.svg?$M:V0?$0:YM,i.uncache=0,i},Zc=function(e){return(e=e.split(" "))[0]+" "+e[1]},qu=function(e,t,i){var r=En(t);return Kt(parseFloat(t)+parseFloat(ds(e,"x",i+"px",r)))+r},YM=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,$0(e,t)},Es="0deg",va="0px",Ts=") ",$0=function(e,t){var i=t||this,r=i.xPercent,s=i.yPercent,o=i.x,a=i.y,l=i.z,c=i.rotation,u=i.rotationY,f=i.rotationX,h=i.skewX,d=i.skewY,_=i.scaleX,g=i.scaleY,m=i.transformPerspective,p=i.force3D,y=i.target,M=i.zOrigin,v="",R=p==="auto"&&e&&e!==1||p===!0;if(M&&(f!==Es||u!==Es)){var w=parseFloat(u)*Vo,T=Math.sin(w),D=Math.cos(w),S;w=parseFloat(f)*Vo,S=Math.cos(w),o=qu(y,o,T*S*-M),a=qu(y,a,-Math.sin(w)*-M),l=qu(y,l,D*S*-M+M)}m!==va&&(v+="perspective("+m+Ts),(r||s)&&(v+="translate("+r+"%, "+s+"%) "),(R||o!==va||a!==va||l!==va)&&(v+=l!==va||R?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+Ts),c!==Es&&(v+="rotate("+c+Ts),u!==Es&&(v+="rotateY("+u+Ts),f!==Es&&(v+="rotateX("+f+Ts),(h!==Es||d!==Es)&&(v+="skew("+h+", "+d+Ts),(_!==1||g!==1)&&(v+="scale("+_+", "+g+Ts),y.style[Gt]=v||"translate(0, 0)"},$M=function(e,t){var i=t||this,r=i.xPercent,s=i.yPercent,o=i.x,a=i.y,l=i.rotation,c=i.skewX,u=i.skewY,f=i.scaleX,h=i.scaleY,d=i.target,_=i.xOrigin,g=i.yOrigin,m=i.xOffset,p=i.yOffset,y=i.forceCSS,M=parseFloat(o),v=parseFloat(a),R,w,T,D,S;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=Vo,c*=Vo,R=Math.cos(l)*f,w=Math.sin(l)*f,T=Math.sin(l-c)*-h,D=Math.cos(l-c)*h,c&&(u*=Vo,S=Math.tan(c-u),S=Math.sqrt(1+S*S),T*=S,D*=S,u&&(S=Math.tan(u),S=Math.sqrt(1+S*S),R*=S,w*=S)),R=Kt(R),w=Kt(w),T=Kt(T),D=Kt(D)):(R=f,D=h,w=T=0),(M&&!~(o+"").indexOf("px")||v&&!~(a+"").indexOf("px"))&&(M=ds(d,"x",o,"px"),v=ds(d,"y",a,"px")),(_||g||m||p)&&(M=Kt(M+_-(_*R+g*T)+m),v=Kt(v+g-(_*w+g*D)+p)),(r||s)&&(S=d.getBBox(),M=Kt(M+r/100*S.width),v=Kt(v+s/100*S.height)),S="matrix("+R+","+w+","+T+","+D+","+M+","+v+")",d.setAttribute("transform",S),y&&(d.style[Gt]=S)},qM=function(e,t,i,r,s){var o=360,a=hn(s),l=parseFloat(s)*(a&&~s.indexOf("rad")?Is:1),c=l-r,u=r+c+"deg",f,h;return a&&(f=s.split("_")[1],f==="short"&&(c%=o,c!==c%(o/2)&&(c+=c<0?o:-o)),f==="cw"&&c<0?c=(c+o*Qp)%o-~~(c/o)*o:f==="ccw"&&c>0&&(c=(c-o*Qp)%o-~~(c/o)*o)),e._pt=h=new Kn(e._pt,t,i,r,c,DM),h.e=u,h.u="deg",e._props.push(i),h},om=function(e,t){for(var i in t)e[i]=t[i];return e},KM=function(e,t,i){var r=om({},i._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=i.style,a,l,c,u,f,h,d,_;r.svg?(c=i.getAttribute("transform"),i.setAttribute("transform",""),o[Gt]=t,a=_l(i,1),Qs(i,Gt),i.setAttribute("transform",c)):(c=getComputedStyle(i)[Gt],o[Gt]=t,a=_l(i,1),o[Gt]=c);for(l in Dr)c=r[l],u=a[l],c!==u&&s.indexOf(l)<0&&(d=En(c),_=En(u),f=d!==_?ds(i,l,c,_):parseFloat(c),h=parseFloat(u),e._pt=new Kn(e._pt,a,l,f,h-f,nh),e._pt.u=_||0,e._props.push(l));om(a,r)};qn("padding,margin,Width,Radius",function(n,e){var t="Top",i="Right",r="Bottom",s="Left",o=(e<3?[t,i,r,s]:[t+s,t+i,r+i,r+s]).map(function(a){return e<2?n+a:"border"+a+n});jc[e>1?"border"+n:n]=function(a,l,c,u,f){var h,d;if(arguments.length<4)return h=o.map(function(_){return gr(a,_,c)}),d=h.join(" "),d.split(h[0]).length===5?h[0]:d;h=(u+"").split(" "),d={},o.forEach(function(_,g){return d[_]=h[g]=h[g]||h[(g-1)/2|0]}),a.init(l,d,f)}});var q0={name:"css",register:rh,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,i,r,s){var o=this._props,a=e.style,l=i.vars.startAt,c,u,f,h,d,_,g,m,p,y,M,v,R,w,T,D;Ud||rh(),this.styles=this.styles||H0(e),D=this.styles.props,this.tween=i;for(g in t)if(g!=="autoRound"&&(u=t[g],!(oi[g]&&P0(g,t,i,r,e,s)))){if(d=typeof u,_=jc[g],d==="function"&&(u=u.call(i,r,e,s),d=typeof u),d==="string"&&~u.indexOf("random(")&&(u=hl(u)),_)_(this,e,g,u,i)&&(T=1);else if(g.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(g)+"").trim(),u+="",rs.lastIndex=0,rs.test(c)||(m=En(c),p=En(u)),p?m!==p&&(c=ds(e,g,c,p)+p):m&&(u+=m),this.add(a,"setProperty",c,u,r,s,0,0,g),o.push(g),D.push(g,0,a[g]);else if(d!=="undefined"){if(l&&g in l?(c=typeof l[g]=="function"?l[g].call(i,r,e,s):l[g],hn(c)&&~c.indexOf("random(")&&(c=hl(c)),En(c+"")||c==="auto"||(c+=di.units[g]||En(gr(e,g))||""),(c+"").charAt(1)==="="&&(c=gr(e,g))):c=gr(e,g),h=parseFloat(c),y=d==="string"&&u.charAt(1)==="="&&u.substr(0,2),y&&(u=u.substr(2)),f=parseFloat(u),g in Zi&&(g==="autoAlpha"&&(h===1&&gr(e,"visibility")==="hidden"&&f&&(h=0),D.push("visibility",0,a.visibility),Jr(this,a,"visibility",h?"inherit":"hidden",f?"inherit":"hidden",!f)),g!=="scale"&&g!=="transform"&&(g=Zi[g],~g.indexOf(",")&&(g=g.split(",")[0]))),M=g in Dr,M){if(this.styles.save(g),d==="string"&&u.substring(0,6)==="var(--"&&(u=wi(e,u.substring(4,u.indexOf(")"))),f=parseFloat(u)),v||(R=e._gsap,R.renderTransform&&!t.parseTransform||_l(e,t.parseTransform),w=t.smoothOrigin!==!1&&R.smooth,v=this._pt=new Kn(this._pt,a,Gt,0,1,R.renderTransform,R,0,-1),v.dep=1),g==="scale")this._pt=new Kn(this._pt,R,"scaleY",R.scaleY,(y?zo(R.scaleY,y+f):f)-R.scaleY||0,nh),this._pt.u=0,o.push("scaleY",g),g+="X";else if(g==="transformOrigin"){D.push(jn,0,a[jn]),u=WM(u),R.svg?sh(e,u,0,w,0,this):(p=parseFloat(u.split(" ")[2])||0,p!==R.zOrigin&&Jr(this,R,"zOrigin",R.zOrigin,p),Jr(this,a,g,Zc(c),Zc(u)));continue}else if(g==="svgOrigin"){sh(e,u,1,w,0,this);continue}else if(g in X0){qM(this,R,g,h,y?zo(h,y+u):u);continue}else if(g==="smoothOrigin"){Jr(this,R,"smooth",R.smooth,u);continue}else if(g==="force3D"){R[g]=u;continue}else if(g==="transform"){KM(this,u,e);continue}}else g in a||(g=ea(g)||g);if(M||(f||f===0)&&(h||h===0)&&!PM.test(u)&&g in a)m=(c+"").substr((h+"").length),f||(f=0),p=En(u)||(g in di.units?di.units[g]:m),m!==p&&(h=ds(e,g,c,p)),this._pt=new Kn(this._pt,M?R:a,g,h,(y?zo(h,y+f):f)-h,!M&&(p==="px"||g==="zIndex")&&t.autoRound!==!1?IM:nh),this._pt.u=p||0,m!==p&&p!=="%"&&(this._pt.b=c,this._pt.r=LM);else if(g in a)GM.call(this,e,g,c,y?y+u:u);else if(g in e)this.add(e,g,c||e[g],y?y+u:u,r,s);else if(g!=="parseTransform"){Ed(g,u);continue}M||(g in a?D.push(g,0,a[g]):typeof e[g]=="function"?D.push(g,2,e[g]()):D.push(g,1,c||e[g])),o.push(g)}}T&&O0(this)},render:function(e,t){if(t.tween._time||!Nd())for(var i=t._pt;i;)i.r(e,i.d),i=i._next;else t.styles.revert()},get:gr,aliases:Zi,getSetter:function(e,t,i){var r=Zi[t];return r&&r.indexOf(",")<0&&(t=r),t in Dr&&t!==jn&&(e._gsap.x||gr(e,"x"))?i&&Jp===i?t==="scale"?FM:OM:(Jp=i||{})&&(t==="scale"?BM:kM):e.style&&!Sd(e.style[t])?UM:~t.indexOf("-")?NM:Ld(e,t)},core:{_removeProperty:Qs,_getMatrix:Fd}};Jn.utils.checkPrefix=ea;Jn.core.getStyleSaver=H0;(function(n,e,t,i){var r=qn(n+","+e+","+t,function(s){Dr[s]=1});qn(e,function(s){di.units[s]="deg",X0[s]=1}),Zi[r[13]]=n+","+e,qn(i,function(s){var o=s.split(":");Zi[o[1]]=r[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");qn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(n){di.units[n]="px"});Jn.registerPlugin(q0);var Oe=Jn.registerPlugin(q0)||Jn;Oe.core.Tween;function jM(n,e){for(var t=0;t<e.length;t++){var i=e[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,i.key,i)}}function ZM(n,e,t){return e&&jM(n.prototype,e),n}var pn,bc,ui,Qr,es,Go,K0,Us,Xa,j0,br,Ui,Z0,J0=function(){return pn||typeof window<"u"&&(pn=window.gsap)&&pn.registerPlugin&&pn},Q0=1,Io=[],ut=[],tr=[],Ya=Date.now,oh=function(e,t){return t},JM=function(){var e=Xa.core,t=e.bridge||{},i=e._scrollers,r=e._proxies;i.push.apply(i,ut),r.push.apply(r,tr),ut=i,tr=r,oh=function(o,a){return t[o](a)}},ss=function(e,t){return~tr.indexOf(e)&&tr[tr.indexOf(e)+1][t]},$a=function(e){return!!~j0.indexOf(e)},Dn=function(e,t,i,r,s){return e.addEventListener(t,i,{passive:r!==!1,capture:!!s})},Rn=function(e,t,i,r){return e.removeEventListener(t,i,!!r)},Il="scrollLeft",Ul="scrollTop",ah=function(){return br&&br.isPressed||ut.cache++},Jc=function(e,t){var i=function r(s){if(s||s===0){Q0&&(ui.history.scrollRestoration="manual");var o=br&&br.isPressed;s=r.v=Math.round(s)||(br&&br.iOS?1:0),e(s),r.cacheID=ut.cache,o&&oh("ss",s)}else(t||ut.cache!==r.cacheID||oh("ref"))&&(r.cacheID=ut.cache,r.v=e());return r.v+r.offset};return i.offset=0,e&&i},Gn={s:Il,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:Jc(function(n){return arguments.length?ui.scrollTo(n,sn.sc()):ui.pageXOffset||Qr[Il]||es[Il]||Go[Il]||0})},sn={s:Ul,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:Gn,sc:Jc(function(n){return arguments.length?ui.scrollTo(Gn.sc(),n):ui.pageYOffset||Qr[Ul]||es[Ul]||Go[Ul]||0})},Yn=function(e,t){return(t&&t._ctx&&t._ctx.selector||pn.utils.toArray)(e)[0]||(typeof e=="string"&&pn.config().nullTargetWarn!==!1?console.warn("Element not found:",e):null)},QM=function(e,t){for(var i=t.length;i--;)if(t[i]===e||t[i].contains(e))return!0;return!1},ps=function(e,t){var i=t.s,r=t.sc;$a(e)&&(e=Qr.scrollingElement||es);var s=ut.indexOf(e),o=r===sn.sc?1:2;!~s&&(s=ut.push(e)-1),ut[s+o]||Dn(e,"scroll",ah);var a=ut[s+o],l=a||(ut[s+o]=Jc(ss(e,i),!0)||($a(e)?r:Jc(function(c){return arguments.length?e[i]=c:e[i]})));return l.target=e,a||(l.smooth=pn.getProperty(e,"scrollBehavior")==="smooth"),l},lh=function(e,t,i){var r=e,s=e,o=Ya(),a=o,l=t||50,c=Math.max(500,l*3),u=function(_,g){var m=Ya();g||m-o>l?(s=r,r=_,a=o,o=m):i?r+=_:r=s+(_-s)/(m-a)*(o-a)},f=function(){s=r=i?0:r,a=o=0},h=function(_){var g=a,m=s,p=Ya();return(_||_===0)&&_!==r&&u(_),o===a||p-a>c?0:(r+(i?m:-m))/((i?p:o)-g)*1e3};return{update:u,reset:f,getVelocity:h}},xa=function(e,t){return t&&!e._gsapAllow&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},am=function(e){var t=Math.max.apply(Math,e),i=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(i)?t:i},ev=function(){Xa=pn.core.globals().ScrollTrigger,Xa&&Xa.core&&JM()},tv=function(e){return pn=e||J0(),!bc&&pn&&typeof document<"u"&&document.body&&(ui=window,Qr=document,es=Qr.documentElement,Go=Qr.body,j0=[ui,Qr,es,Go],pn.utils.clamp,Z0=pn.core.context||function(){},Us="onpointerenter"in Go?"pointer":"mouse",K0=jt.isTouch=ui.matchMedia&&ui.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in ui||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,Ui=jt.eventTypes=("ontouchstart"in es?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in es?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return Q0=0},500),ev(),bc=1),bc};Gn.op=sn;ut.cache=0;var jt=(function(){function n(t){this.init(t)}var e=n.prototype;return e.init=function(i){bc||tv(pn)||console.warn("Please gsap.registerPlugin(Observer)"),Xa||ev();var r=i.tolerance,s=i.dragMinimum,o=i.type,a=i.target,l=i.lineHeight,c=i.debounce,u=i.preventDefault,f=i.onStop,h=i.onStopDelay,d=i.ignore,_=i.wheelSpeed,g=i.event,m=i.onDragStart,p=i.onDragEnd,y=i.onDrag,M=i.onPress,v=i.onRelease,R=i.onRight,w=i.onLeft,T=i.onUp,D=i.onDown,S=i.onChangeX,x=i.onChangeY,P=i.onChange,U=i.onToggleX,k=i.onToggleY,Y=i.onHover,te=i.onHoverEnd,W=i.onMove,X=i.ignoreCheck,V=i.isNormalizer,ae=i.onGestureStart,N=i.onGestureEnd,ge=i.onWheel,we=i.onEnable,Be=i.onDisable,ee=i.onClick,fe=i.scrollSpeed,de=i.capture,he=i.allowClicks,se=i.lockAxis,_e=i.onLockAxis;this.target=a=Yn(a)||es,this.vars=i,d&&(d=pn.utils.toArray(d)),r=r||1e-9,s=s||0,_=_||1,fe=fe||1,o=o||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(ui.getComputedStyle(Go).lineHeight)||22);var be,Ie,I,O,C,oe,Q,L=this,ne=0,le=0,ie=i.passive||!u&&i.passive!==!1,E=ps(a,Gn),b=ps(a,sn),F=E(),$=b(),q=~o.indexOf("touch")&&!~o.indexOf("pointer")&&Ui[0]==="pointerdown",Z=$a(a),pe=a.ownerDocument||Qr,ue=[0,0,0],xe=[0,0,0],He=0,me=function(){return He=Ya()},ve=function(Fe,rt){return(L.event=Fe)&&d&&QM(Fe.target,d)||rt&&q&&Fe.pointerType!=="touch"||X&&X(Fe,rt)},ze=function(){L._vx.reset(),L._vy.reset(),Ie.pause(),f&&f(L)},Ve=function(){var Fe=L.deltaX=am(ue),rt=L.deltaY=am(xe),Re=Math.abs(Fe)>=r,Je=Math.abs(rt)>=r;P&&(Re||Je)&&P(L,Fe,rt,ue,xe),Re&&(R&&L.deltaX>0&&R(L),w&&L.deltaX<0&&w(L),S&&S(L),U&&L.deltaX<0!=ne<0&&U(L),ne=L.deltaX,ue[0]=ue[1]=ue[2]=0),Je&&(D&&L.deltaY>0&&D(L),T&&L.deltaY<0&&T(L),x&&x(L),k&&L.deltaY<0!=le<0&&k(L),le=L.deltaY,xe[0]=xe[1]=xe[2]=0),(O||I)&&(W&&W(L),I&&(m&&I===1&&m(L),y&&y(L),I=0),O=!1),oe&&!(oe=!1)&&_e&&_e(L),C&&(ge(L),C=!1),be=0},Me=function(Fe,rt,Re){ue[Re]+=Fe,xe[Re]+=rt,L._vx.update(Fe),L._vy.update(rt),c?be||(be=requestAnimationFrame(Ve)):Ve()},We=function(Fe,rt){se&&!Q&&(L.axis=Q=Math.abs(Fe)>Math.abs(rt)?"x":"y",oe=!0),Q!=="y"&&(ue[2]+=Fe,L._vx.update(Fe,!0)),Q!=="x"&&(xe[2]+=rt,L._vy.update(rt,!0)),c?be||(be=requestAnimationFrame(Ve)):Ve()},Xe=function(Fe){if(!ve(Fe,1)){Fe=xa(Fe,u);var rt=Fe.clientX,Re=Fe.clientY,Je=rt-L.x,ke=Re-L.y,Ze=L.isDragging;L.x=rt,L.y=Re,(Ze||(Je||ke)&&(Math.abs(L.startX-rt)>=s||Math.abs(L.startY-Re)>=s))&&(I=Ze?2:1,Ze||(L.isDragging=!0),We(Je,ke))}},ft=L.onPress=function(De){ve(De,1)||De&&De.button||(L.axis=Q=null,Ie.pause(),L.isPressed=!0,De=xa(De),ne=le=0,L.startX=L.x=De.clientX,L.startY=L.y=De.clientY,L._vx.reset(),L._vy.reset(),Dn(V?a:pe,Ui[1],Xe,ie,!0),L.deltaX=L.deltaY=0,M&&M(L))},B=L.onRelease=function(De){if(!ve(De,1)){Rn(V?a:pe,Ui[1],Xe,!0);var Fe=!isNaN(L.y-L.startY),rt=L.isDragging,Re=rt&&(Math.abs(L.x-L.startX)>3||Math.abs(L.y-L.startY)>3),Je=xa(De);!Re&&Fe&&(L._vx.reset(),L._vy.reset(),u&&he&&pn.delayedCall(.08,function(){if(Ya()-He>300&&!De.defaultPrevented){if(De.target.click)De.target.click();else if(pe.createEvent){var ke=pe.createEvent("MouseEvents");ke.initMouseEvent("click",!0,!0,ui,1,Je.screenX,Je.screenY,Je.clientX,Je.clientY,!1,!1,!1,!1,0,null),De.target.dispatchEvent(ke)}}})),L.isDragging=L.isGesturing=L.isPressed=!1,f&&rt&&!V&&Ie.restart(!0),I&&Ve(),p&&rt&&p(L),v&&v(L,Re)}},Te=function(Fe){return Fe.touches&&Fe.touches.length>1&&(L.isGesturing=!0)&&ae(Fe,L.isDragging)},re=function(){return(L.isGesturing=!1)||N(L)},ce=function(Fe){if(!ve(Fe)){var rt=E(),Re=b();Me((rt-F)*fe,(Re-$)*fe,1),F=rt,$=Re,f&&Ie.restart(!0)}},Ee=function(Fe){if(!ve(Fe)){Fe=xa(Fe,u),ge&&(C=!0);var rt=(Fe.deltaMode===1?l:Fe.deltaMode===2?ui.innerHeight:1)*_;Me(Fe.deltaX*rt,Fe.deltaY*rt,0),f&&!V&&Ie.restart(!0)}},Ae=function(Fe){if(!ve(Fe)){var rt=Fe.clientX,Re=Fe.clientY,Je=rt-L.x,ke=Re-L.y;L.x=rt,L.y=Re,O=!0,f&&Ie.restart(!0),(Je||ke)&&We(Je,ke)}},qe=function(Fe){L.event=Fe,Y(L)},_t=function(Fe){L.event=Fe,te(L)},Xt=function(Fe){return ve(Fe)||xa(Fe,u)&&ee(L)};Ie=L._dc=pn.delayedCall(h||.25,ze).pause(),L.deltaX=L.deltaY=0,L._vx=lh(0,50,!0),L._vy=lh(0,50,!0),L.scrollX=E,L.scrollY=b,L.isDragging=L.isGesturing=L.isPressed=!1,Z0(this),L.enable=function(De){return L.isEnabled||(Dn(Z?pe:a,"scroll",ah),o.indexOf("scroll")>=0&&Dn(Z?pe:a,"scroll",ce,ie,de),o.indexOf("wheel")>=0&&Dn(a,"wheel",Ee,ie,de),(o.indexOf("touch")>=0&&K0||o.indexOf("pointer")>=0)&&(Dn(a,Ui[0],ft,ie,de),Dn(pe,Ui[2],B),Dn(pe,Ui[3],B),he&&Dn(a,"click",me,!0,!0),ee&&Dn(a,"click",Xt),ae&&Dn(pe,"gesturestart",Te),N&&Dn(pe,"gestureend",re),Y&&Dn(a,Us+"enter",qe),te&&Dn(a,Us+"leave",_t),W&&Dn(a,Us+"move",Ae)),L.isEnabled=!0,L.isDragging=L.isGesturing=L.isPressed=O=I=!1,L._vx.reset(),L._vy.reset(),F=E(),$=b(),De&&De.type&&ft(De),we&&we(L)),L},L.disable=function(){L.isEnabled&&(Io.filter(function(De){return De!==L&&$a(De.target)}).length||Rn(Z?pe:a,"scroll",ah),L.isPressed&&(L._vx.reset(),L._vy.reset(),Rn(V?a:pe,Ui[1],Xe,!0)),Rn(Z?pe:a,"scroll",ce,de),Rn(a,"wheel",Ee,de),Rn(a,Ui[0],ft,de),Rn(pe,Ui[2],B),Rn(pe,Ui[3],B),Rn(a,"click",me,!0),Rn(a,"click",Xt),Rn(pe,"gesturestart",Te),Rn(pe,"gestureend",re),Rn(a,Us+"enter",qe),Rn(a,Us+"leave",_t),Rn(a,Us+"move",Ae),L.isEnabled=L.isPressed=L.isDragging=!1,Be&&Be(L))},L.kill=L.revert=function(){L.disable();var De=Io.indexOf(L);De>=0&&Io.splice(De,1),br===L&&(br=0)},Io.push(L),V&&$a(a)&&(br=L),L.enable(g)},ZM(n,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),n})();jt.version="3.13.0";jt.create=function(n){return new jt(n)};jt.register=tv;jt.getAll=function(){return Io.slice()};jt.getById=function(n){return Io.filter(function(e){return e.vars.id===n})[0]};J0()&&pn.registerPlugin(jt);var Ue,Co,ct,Nt,li,Et,Bd,Qc,gl,qa,Ca,Nl,Sn,Su,ch,Nn,lm,cm,Ro,nv,Ku,iv,Un,uh,rv,sv,Yr,fh,kd,Wo,zd,eu,hh,ju,Ol=1,Mn=Date.now,Zu=Mn(),Ci=0,Ra=0,um=function(e,t,i){var r=si(e)&&(e.substr(0,6)==="clamp("||e.indexOf("max")>-1);return i["_"+t+"Clamp"]=r,r?e.substr(6,e.length-7):e},fm=function(e,t){return t&&(!si(e)||e.substr(0,6)!=="clamp(")?"clamp("+e+")":e},eb=function n(){return Ra&&requestAnimationFrame(n)},hm=function(){return Su=1},dm=function(){return Su=0},$i=function(e){return e},Pa=function(e){return Math.round(e*1e5)/1e5||0},ov=function(){return typeof window<"u"},av=function(){return Ue||ov()&&(Ue=window.gsap)&&Ue.registerPlugin&&Ue},eo=function(e){return!!~Bd.indexOf(e)},lv=function(e){return(e==="Height"?zd:ct["inner"+e])||li["client"+e]||Et["client"+e]},cv=function(e){return ss(e,"getBoundingClientRect")||(eo(e)?function(){return Cc.width=ct.innerWidth,Cc.height=zd,Cc}:function(){return Sr(e)})},tb=function(e,t,i){var r=i.d,s=i.d2,o=i.a;return(o=ss(e,"getBoundingClientRect"))?function(){return o()[r]}:function(){return(t?lv(s):e["client"+s])||0}},nb=function(e,t){return!t||~tr.indexOf(e)?cv(e):function(){return Cc}},Ji=function(e,t){var i=t.s,r=t.d2,s=t.d,o=t.a;return Math.max(0,(i="scroll"+r)&&(o=ss(e,i))?o()-cv(e)()[s]:eo(e)?(li[i]||Et[i])-lv(r):e[i]-e["offset"+r])},Fl=function(e,t){for(var i=0;i<Ro.length;i+=3)(!t||~t.indexOf(Ro[i+1]))&&e(Ro[i],Ro[i+1],Ro[i+2])},si=function(e){return typeof e=="string"},Tn=function(e){return typeof e=="function"},Da=function(e){return typeof e=="number"},Ns=function(e){return typeof e=="object"},ya=function(e,t,i){return e&&e.progress(t?0:1)&&i&&e.pause()},Ju=function(e,t){if(e.enabled){var i=e._ctx?e._ctx.add(function(){return t(e)}):t(e);i&&i.totalTime&&(e.callbackAnimation=i)}},co=Math.abs,uv="left",fv="top",Hd="right",Vd="bottom",js="width",Zs="height",Ka="Right",ja="Left",Za="Top",Ja="Bottom",Qt="padding",yi="margin",ta="Width",Gd="Height",rn="px",Si=function(e){return ct.getComputedStyle(e)},ib=function(e){var t=Si(e).position;e.style.position=t==="absolute"||t==="fixed"?t:"relative"},pm=function(e,t){for(var i in t)i in e||(e[i]=t[i]);return e},Sr=function(e,t){var i=t&&Si(e)[ch]!=="matrix(1, 0, 0, 1, 0, 0)"&&Ue.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),r=e.getBoundingClientRect();return i&&i.progress(0).kill(),r},tu=function(e,t){var i=t.d2;return e["offset"+i]||e["client"+i]||0},hv=function(e){var t=[],i=e.labels,r=e.duration(),s;for(s in i)t.push(i[s]/r);return t},rb=function(e){return function(t){return Ue.utils.snap(hv(e),t)}},Wd=function(e){var t=Ue.utils.snap(e),i=Array.isArray(e)&&e.slice(0).sort(function(r,s){return r-s});return i?function(r,s,o){o===void 0&&(o=.001);var a;if(!s)return t(r);if(s>0){for(r-=o,a=0;a<i.length;a++)if(i[a]>=r)return i[a];return i[a-1]}else for(a=i.length,r+=o;a--;)if(i[a]<=r)return i[a];return i[0]}:function(r,s,o){o===void 0&&(o=.001);var a=t(r);return!s||Math.abs(a-r)<o||a-r<0==s<0?a:t(s<0?r-e:r+e)}},sb=function(e){return function(t,i){return Wd(hv(e))(t,i.direction)}},Bl=function(e,t,i,r){return i.split(",").forEach(function(s){return e(t,s,r)})},un=function(e,t,i,r,s){return e.addEventListener(t,i,{passive:!r,capture:!!s})},cn=function(e,t,i,r){return e.removeEventListener(t,i,!!r)},kl=function(e,t,i){i=i&&i.wheelHandler,i&&(e(t,"wheel",i),e(t,"touchmove",i))},mm={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},zl={toggleActions:"play",anticipatePin:0},nu={top:0,left:0,center:.5,bottom:1,right:1},Ec=function(e,t){if(si(e)){var i=e.indexOf("="),r=~i?+(e.charAt(i-1)+1)*parseFloat(e.substr(i+1)):0;~i&&(e.indexOf("%")>i&&(r*=t/100),e=e.substr(0,i-1)),e=r+(e in nu?nu[e]*t:~e.indexOf("%")?parseFloat(e)*t/100:parseFloat(e)||0)}return e},Hl=function(e,t,i,r,s,o,a,l){var c=s.startColor,u=s.endColor,f=s.fontSize,h=s.indent,d=s.fontWeight,_=Nt.createElement("div"),g=eo(i)||ss(i,"pinType")==="fixed",m=e.indexOf("scroller")!==-1,p=g?Et:i,y=e.indexOf("start")!==-1,M=y?c:u,v="border-color:"+M+";font-size:"+f+";color:"+M+";font-weight:"+d+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return v+="position:"+((m||l)&&g?"fixed;":"absolute;"),(m||l||!g)&&(v+=(r===sn?Hd:Vd)+":"+(o+parseFloat(h))+"px;"),a&&(v+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),_._isStart=y,_.setAttribute("class","gsap-marker-"+e+(t?" marker-"+t:"")),_.style.cssText=v,_.innerText=t||t===0?e+"-"+t:e,p.children[0]?p.insertBefore(_,p.children[0]):p.appendChild(_),_._offset=_["offset"+r.op.d2],Tc(_,0,r,y),_},Tc=function(e,t,i,r){var s={display:"block"},o=i[r?"os2":"p2"],a=i[r?"p2":"os2"];e._isFlipped=r,s[i.a+"Percent"]=r?-100:0,s[i.a]=r?"1px":0,s["border"+o+ta]=1,s["border"+a+ta]=0,s[i.p]=t+"px",Ue.set(e,s)},at=[],dh={},vl,_m=function(){return Mn()-Ci>34&&(vl||(vl=requestAnimationFrame(wr)))},uo=function(){(!Un||!Un.isPressed||Un.startX>Et.clientWidth)&&(ut.cache++,Un?vl||(vl=requestAnimationFrame(wr)):wr(),Ci||no("scrollStart"),Ci=Mn())},Qu=function(){sv=ct.innerWidth,rv=ct.innerHeight},La=function(e){ut.cache++,(e===!0||!Sn&&!iv&&!Nt.fullscreenElement&&!Nt.webkitFullscreenElement&&(!uh||sv!==ct.innerWidth||Math.abs(ct.innerHeight-rv)>ct.innerHeight*.25))&&Qc.restart(!0)},to={},ob=[],dv=function n(){return cn(tt,"scrollEnd",n)||Vs(!0)},no=function(e){return to[e]&&to[e].map(function(t){return t()})||ob},ri=[],pv=function(e){for(var t=0;t<ri.length;t+=5)(!e||ri[t+4]&&ri[t+4].query===e)&&(ri[t].style.cssText=ri[t+1],ri[t].getBBox&&ri[t].setAttribute("transform",ri[t+2]||""),ri[t+3].uncache=1)},Xd=function(e,t){var i;for(Nn=0;Nn<at.length;Nn++)i=at[Nn],i&&(!t||i._ctx===t)&&(e?i.kill(1):i.revert(!0,!0));eu=!0,t&&pv(t),t||no("revert")},mv=function(e,t){ut.cache++,(t||!On)&&ut.forEach(function(i){return Tn(i)&&i.cacheID++&&(i.rec=0)}),si(e)&&(ct.history.scrollRestoration=kd=e)},On,Js=0,gm,ab=function(){if(gm!==Js){var e=gm=Js;requestAnimationFrame(function(){return e===Js&&Vs(!0)})}},_v=function(){Et.appendChild(Wo),zd=!Un&&Wo.offsetHeight||ct.innerHeight,Et.removeChild(Wo)},vm=function(e){return gl(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(t){return t.style.display=e?"none":"block"})},Vs=function(e,t){if(li=Nt.documentElement,Et=Nt.body,Bd=[ct,Nt,li,Et],Ci&&!e&&!eu){un(tt,"scrollEnd",dv);return}_v(),On=tt.isRefreshing=!0,ut.forEach(function(r){return Tn(r)&&++r.cacheID&&(r.rec=r())});var i=no("refreshInit");nv&&tt.sort(),t||Xd(),ut.forEach(function(r){Tn(r)&&(r.smooth&&(r.target.style.scrollBehavior="auto"),r(0))}),at.slice(0).forEach(function(r){return r.refresh()}),eu=!1,at.forEach(function(r){if(r._subPinOffset&&r.pin){var s=r.vars.horizontal?"offsetWidth":"offsetHeight",o=r.pin[s];r.revert(!0,1),r.adjustPinSpacing(r.pin[s]-o),r.refresh()}}),hh=1,vm(!0),at.forEach(function(r){var s=Ji(r.scroller,r._dir),o=r.vars.end==="max"||r._endClamp&&r.end>s,a=r._startClamp&&r.start>=s;(o||a)&&r.setPositions(a?s-1:r.start,o?Math.max(a?s:r.start+1,s):r.end,!0)}),vm(!1),hh=0,i.forEach(function(r){return r&&r.render&&r.render(-1)}),ut.forEach(function(r){Tn(r)&&(r.smooth&&requestAnimationFrame(function(){return r.target.style.scrollBehavior="smooth"}),r.rec&&r(r.rec))}),mv(kd,1),Qc.pause(),Js++,On=2,wr(2),at.forEach(function(r){return Tn(r.vars.onRefresh)&&r.vars.onRefresh(r)}),On=tt.isRefreshing=!1,no("refresh")},ph=0,wc=1,Qa,wr=function(e){if(e===2||!On&&!eu){tt.isUpdating=!0,Qa&&Qa.update(0);var t=at.length,i=Mn(),r=i-Zu>=50,s=t&&at[0].scroll();if(wc=ph>s?-1:1,On||(ph=s),r&&(Ci&&!Su&&i-Ci>200&&(Ci=0,no("scrollEnd")),Ca=Zu,Zu=i),wc<0){for(Nn=t;Nn-- >0;)at[Nn]&&at[Nn].update(0,r);wc=1}else for(Nn=0;Nn<t;Nn++)at[Nn]&&at[Nn].update(0,r);tt.isUpdating=!1}vl=0},mh=[uv,fv,Vd,Hd,yi+Ja,yi+Ka,yi+Za,yi+ja,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],Ac=mh.concat([js,Zs,"boxSizing","max"+ta,"max"+Gd,"position",yi,Qt,Qt+Za,Qt+Ka,Qt+Ja,Qt+ja]),lb=function(e,t,i){Xo(i);var r=e._gsap;if(r.spacerIsNative)Xo(r.spacerState);else if(e._gsap.swappedIn){var s=t.parentNode;s&&(s.insertBefore(e,t),s.removeChild(t))}e._gsap.swappedIn=!1},ef=function(e,t,i,r){if(!e._gsap.swappedIn){for(var s=mh.length,o=t.style,a=e.style,l;s--;)l=mh[s],o[l]=i[l];o.position=i.position==="absolute"?"absolute":"relative",i.display==="inline"&&(o.display="inline-block"),a[Vd]=a[Hd]="auto",o.flexBasis=i.flexBasis||"auto",o.overflow="visible",o.boxSizing="border-box",o[js]=tu(e,Gn)+rn,o[Zs]=tu(e,sn)+rn,o[Qt]=a[yi]=a[fv]=a[uv]="0",Xo(r),a[js]=a["max"+ta]=i[js],a[Zs]=a["max"+Gd]=i[Zs],a[Qt]=i[Qt],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0}},cb=/([A-Z])/g,Xo=function(e){if(e){var t=e.t.style,i=e.length,r=0,s,o;for((e.t._gsap||Ue.core.getCache(e.t)).uncache=1;r<i;r+=2)o=e[r+1],s=e[r],o?t[s]=o:t[s]&&t.removeProperty(s.replace(cb,"-$1").toLowerCase())}},Vl=function(e){for(var t=Ac.length,i=e.style,r=[],s=0;s<t;s++)r.push(Ac[s],i[Ac[s]]);return r.t=e,r},ub=function(e,t,i){for(var r=[],s=e.length,o=i?8:0,a;o<s;o+=2)a=e[o],r.push(a,a in t?t[a]:e[o+1]);return r.t=e.t,r},Cc={left:0,top:0},xm=function(e,t,i,r,s,o,a,l,c,u,f,h,d,_){Tn(e)&&(e=e(l)),si(e)&&e.substr(0,3)==="max"&&(e=h+(e.charAt(4)==="="?Ec("0"+e.substr(3),i):0));var g=d?d.time():0,m,p,y;if(d&&d.seek(0),isNaN(e)||(e=+e),Da(e))d&&(e=Ue.utils.mapRange(d.scrollTrigger.start,d.scrollTrigger.end,0,h,e)),a&&Tc(a,i,r,!0);else{Tn(t)&&(t=t(l));var M=(e||"0").split(" "),v,R,w,T;y=Yn(t,l)||Et,v=Sr(y)||{},(!v||!v.left&&!v.top)&&Si(y).display==="none"&&(T=y.style.display,y.style.display="block",v=Sr(y),T?y.style.display=T:y.style.removeProperty("display")),R=Ec(M[0],v[r.d]),w=Ec(M[1]||"0",i),e=v[r.p]-c[r.p]-u+R+s-w,a&&Tc(a,w,r,i-w<20||a._isStart&&w>20),i-=i-w}if(_&&(l[_]=e||-.001,e<0&&(e=0)),o){var D=e+i,S=o._isStart;m="scroll"+r.d2,Tc(o,D,r,S&&D>20||!S&&(f?Math.max(Et[m],li[m]):o.parentNode[m])<=D+1),f&&(c=Sr(a),f&&(o.style[r.op.p]=c[r.op.p]-r.op.m-o._offset+rn))}return d&&y&&(m=Sr(y),d.seek(h),p=Sr(y),d._caScrollDist=m[r.p]-p[r.p],e=e/d._caScrollDist*h),d&&d.seek(g),d?e:Math.round(e)},fb=/(webkit|moz|length|cssText|inset)/i,ym=function(e,t,i,r){if(e.parentNode!==t){var s=e.style,o,a;if(t===Et){e._stOrig=s.cssText,a=Si(e);for(o in a)!+o&&!fb.test(o)&&a[o]&&typeof s[o]=="string"&&o!=="0"&&(s[o]=a[o]);s.top=i,s.left=r}else s.cssText=e._stOrig;Ue.core.getCache(e).uncache=1,t.appendChild(e)}},gv=function(e,t,i){var r=t,s=r;return function(o){var a=Math.round(e());return a!==r&&a!==s&&Math.abs(a-r)>3&&Math.abs(a-s)>3&&(o=a,i&&i()),s=r,r=Math.round(o),r}},Gl=function(e,t,i){var r={};r[t.p]="+="+i,Ue.set(e,r)},Sm=function(e,t){var i=ps(e,t),r="_scroll"+t.p2,s=function o(a,l,c,u,f){var h=o.tween,d=l.onComplete,_={};c=c||i();var g=gv(i,c,function(){h.kill(),o.tween=0});return f=u&&f||0,u=u||a-c,h&&h.kill(),l[r]=a,l.inherit=!1,l.modifiers=_,_[r]=function(){return g(c+u*h.ratio+f*h.ratio*h.ratio)},l.onUpdate=function(){ut.cache++,o.tween&&wr()},l.onComplete=function(){o.tween=0,d&&d.call(h)},h=o.tween=Ue.to(e,l),h};return e[r]=i,i.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},un(e,"wheel",i.wheelHandler),tt.isTouch&&un(e,"touchmove",i.wheelHandler),s},tt=(function(){function n(t,i){Co||n.register(Ue)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),fh(this),this.init(t,i)}var e=n.prototype;return e.init=function(i,r){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!Ra){this.update=this.refresh=this.kill=$i;return}i=pm(si(i)||Da(i)||i.nodeType?{trigger:i}:i,zl);var s=i,o=s.onUpdate,a=s.toggleClass,l=s.id,c=s.onToggle,u=s.onRefresh,f=s.scrub,h=s.trigger,d=s.pin,_=s.pinSpacing,g=s.invalidateOnRefresh,m=s.anticipatePin,p=s.onScrubComplete,y=s.onSnapComplete,M=s.once,v=s.snap,R=s.pinReparent,w=s.pinSpacer,T=s.containerAnimation,D=s.fastScrollEnd,S=s.preventOverlaps,x=i.horizontal||i.containerAnimation&&i.horizontal!==!1?Gn:sn,P=!f&&f!==0,U=Yn(i.scroller||ct),k=Ue.core.getCache(U),Y=eo(U),te=("pinType"in i?i.pinType:ss(U,"pinType")||Y&&"fixed")==="fixed",W=[i.onEnter,i.onLeave,i.onEnterBack,i.onLeaveBack],X=P&&i.toggleActions.split(" "),V="markers"in i?i.markers:zl.markers,ae=Y?0:parseFloat(Si(U)["border"+x.p2+ta])||0,N=this,ge=i.onRefreshInit&&function(){return i.onRefreshInit(N)},we=tb(U,Y,x),Be=nb(U,Y),ee=0,fe=0,de=0,he=ps(U,x),se,_e,be,Ie,I,O,C,oe,Q,L,ne,le,ie,E,b,F,$,q,Z,pe,ue,xe,He,me,ve,ze,Ve,Me,We,Xe,ft,B,Te,re,ce,Ee,Ae,qe,_t;if(N._startClamp=N._endClamp=!1,N._dir=x,m*=45,N.scroller=U,N.scroll=T?T.time.bind(T):he,Ie=he(),N.vars=i,r=r||i.animation,"refreshPriority"in i&&(nv=1,i.refreshPriority===-9999&&(Qa=N)),k.tweenScroll=k.tweenScroll||{top:Sm(U,sn),left:Sm(U,Gn)},N.tweenTo=se=k.tweenScroll[x.p],N.scrubDuration=function(Re){Te=Da(Re)&&Re,Te?B?B.duration(Re):B=Ue.to(r,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:Te,paused:!0,onComplete:function(){return p&&p(N)}}):(B&&B.progress(1).kill(),B=0)},r&&(r.vars.lazy=!1,r._initted&&!N.isReverted||r.vars.immediateRender!==!1&&i.immediateRender!==!1&&r.duration()&&r.render(0,!0,!0),N.animation=r.pause(),r.scrollTrigger=N,N.scrubDuration(f),Xe=0,l||(l=r.vars.id)),v&&((!Ns(v)||v.push)&&(v={snapTo:v}),"scrollBehavior"in Et.style&&Ue.set(Y?[Et,li]:U,{scrollBehavior:"auto"}),ut.forEach(function(Re){return Tn(Re)&&Re.target===(Y?Nt.scrollingElement||li:U)&&(Re.smooth=!1)}),be=Tn(v.snapTo)?v.snapTo:v.snapTo==="labels"?rb(r):v.snapTo==="labelsDirectional"?sb(r):v.directional!==!1?function(Re,Je){return Wd(v.snapTo)(Re,Mn()-fe<500?0:Je.direction)}:Ue.utils.snap(v.snapTo),re=v.duration||{min:.1,max:2},re=Ns(re)?qa(re.min,re.max):qa(re,re),ce=Ue.delayedCall(v.delay||Te/2||.1,function(){var Re=he(),Je=Mn()-fe<500,ke=se.tween;if((Je||Math.abs(N.getVelocity())<10)&&!ke&&!Su&&ee!==Re){var Ze=(Re-O)/E,qt=r&&!P?r.totalProgress():Ze,lt=Je?0:(qt-ft)/(Mn()-Ca)*1e3||0,Ut=Ue.utils.clamp(-Ze,1-Ze,co(lt/2)*lt/.185),nn=Ze+(v.inertia===!1?0:Ut),Ct,Rt,yt=v,Qn=yt.onStart,Bt=yt.onInterrupt,Cn=yt.onComplete;if(Ct=be(nn,N),Da(Ct)||(Ct=nn),Rt=Math.max(0,Math.round(O+Ct*E)),Re<=C&&Re>=O&&Rt!==Re){if(ke&&!ke._initted&&ke.data<=co(Rt-Re))return;v.inertia===!1&&(Ut=Ct-Ze),se(Rt,{duration:re(co(Math.max(co(nn-qt),co(Ct-qt))*.185/lt/.05||0)),ease:v.ease||"power3",data:co(Rt-Re),onInterrupt:function(){return ce.restart(!0)&&Bt&&Bt(N)},onComplete:function(){N.update(),ee=he(),r&&!P&&(B?B.resetTo("totalProgress",Ct,r._tTime/r._tDur):r.progress(Ct)),Xe=ft=r&&!P?r.totalProgress():N.progress,y&&y(N),Cn&&Cn(N)}},Re,Ut*E,Rt-Re-Ut*E),Qn&&Qn(N,se.tween)}}else N.isActive&&ee!==Re&&ce.restart(!0)}).pause()),l&&(dh[l]=N),h=N.trigger=Yn(h||d!==!0&&d),_t=h&&h._gsap&&h._gsap.stRevert,_t&&(_t=_t(N)),d=d===!0?h:Yn(d),si(a)&&(a={targets:h,className:a}),d&&(_===!1||_===yi||(_=!_&&d.parentNode&&d.parentNode.style&&Si(d.parentNode).display==="flex"?!1:Qt),N.pin=d,_e=Ue.core.getCache(d),_e.spacer?b=_e.pinState:(w&&(w=Yn(w),w&&!w.nodeType&&(w=w.current||w.nativeElement),_e.spacerIsNative=!!w,w&&(_e.spacerState=Vl(w))),_e.spacer=q=w||Nt.createElement("div"),q.classList.add("pin-spacer"),l&&q.classList.add("pin-spacer-"+l),_e.pinState=b=Vl(d)),i.force3D!==!1&&Ue.set(d,{force3D:!0}),N.spacer=q=_e.spacer,We=Si(d),me=We[_+x.os2],pe=Ue.getProperty(d),ue=Ue.quickSetter(d,x.a,rn),ef(d,q,We),$=Vl(d)),V){le=Ns(V)?pm(V,mm):mm,L=Hl("scroller-start",l,U,x,le,0),ne=Hl("scroller-end",l,U,x,le,0,L),Z=L["offset"+x.op.d2];var Xt=Yn(ss(U,"content")||U);oe=this.markerStart=Hl("start",l,Xt,x,le,Z,0,T),Q=this.markerEnd=Hl("end",l,Xt,x,le,Z,0,T),T&&(qe=Ue.quickSetter([oe,Q],x.a,rn)),!te&&!(tr.length&&ss(U,"fixedMarkers")===!0)&&(ib(Y?Et:U),Ue.set([L,ne],{force3D:!0}),ze=Ue.quickSetter(L,x.a,rn),Me=Ue.quickSetter(ne,x.a,rn))}if(T){var De=T.vars.onUpdate,Fe=T.vars.onUpdateParams;T.eventCallback("onUpdate",function(){N.update(0,0,1),De&&De.apply(T,Fe||[])})}if(N.previous=function(){return at[at.indexOf(N)-1]},N.next=function(){return at[at.indexOf(N)+1]},N.revert=function(Re,Je){if(!Je)return N.kill(!0);var ke=Re!==!1||!N.enabled,Ze=Sn;ke!==N.isReverted&&(ke&&(Ee=Math.max(he(),N.scroll.rec||0),de=N.progress,Ae=r&&r.progress()),oe&&[oe,Q,L,ne].forEach(function(qt){return qt.style.display=ke?"none":"block"}),ke&&(Sn=N,N.update(ke)),d&&(!R||!N.isActive)&&(ke?lb(d,q,b):ef(d,q,Si(d),ve)),ke||N.update(ke),Sn=Ze,N.isReverted=ke)},N.refresh=function(Re,Je,ke,Ze){if(!((Sn||!N.enabled)&&!Je)){if(d&&Re&&Ci){un(n,"scrollEnd",dv);return}!On&&ge&&ge(N),Sn=N,se.tween&&!ke&&(se.tween.kill(),se.tween=0),B&&B.pause(),g&&r&&(r.revert({kill:!1}).invalidate(),r.getChildren&&r.getChildren(!0,!0,!1).forEach(function(Ht){return Ht.vars.immediateRender&&Ht.render(0,!0,!0)})),N.isReverted||N.revert(!0,!0),N._subPinOffset=!1;var qt=we(),lt=Be(),Ut=T?T.duration():Ji(U,x),nn=E<=.01||!E,Ct=0,Rt=Ze||0,yt=Ns(ke)?ke.end:i.end,Qn=i.endTrigger||h,Bt=Ns(ke)?ke.start:i.start||(i.start===0||!h?0:d?"0 0":"0 100%"),Cn=N.pinnedContainer=i.pinnedContainer&&Yn(i.pinnedContainer,N),A=h&&Math.max(0,at.indexOf(N))||0,H=A,K,j,G,ye,Se,Ce,Le,Ke,Qe,Ne,et,gt,St;for(V&&Ns(ke)&&(gt=Ue.getProperty(L,x.p),St=Ue.getProperty(ne,x.p));H-- >0;)Ce=at[H],Ce.end||Ce.refresh(0,1)||(Sn=N),Le=Ce.pin,Le&&(Le===h||Le===d||Le===Cn)&&!Ce.isReverted&&(Ne||(Ne=[]),Ne.unshift(Ce),Ce.revert(!0,!0)),Ce!==at[H]&&(A--,H--);for(Tn(Bt)&&(Bt=Bt(N)),Bt=um(Bt,"start",N),O=xm(Bt,h,qt,x,he(),oe,L,N,lt,ae,te,Ut,T,N._startClamp&&"_startClamp")||(d?-.001:0),Tn(yt)&&(yt=yt(N)),si(yt)&&!yt.indexOf("+=")&&(~yt.indexOf(" ")?yt=(si(Bt)?Bt.split(" ")[0]:"")+yt:(Ct=Ec(yt.substr(2),qt),yt=si(Bt)?Bt:(T?Ue.utils.mapRange(0,T.duration(),T.scrollTrigger.start,T.scrollTrigger.end,O):O)+Ct,Qn=h)),yt=um(yt,"end",N),C=Math.max(O,xm(yt||(Qn?"100% 0":Ut),Qn,qt,x,he()+Ct,Q,ne,N,lt,ae,te,Ut,T,N._endClamp&&"_endClamp"))||-.001,Ct=0,H=A;H--;)Ce=at[H],Le=Ce.pin,Le&&Ce.start-Ce._pinPush<=O&&!T&&Ce.end>0&&(K=Ce.end-(N._startClamp?Math.max(0,Ce.start):Ce.start),(Le===h&&Ce.start-Ce._pinPush<O||Le===Cn)&&isNaN(Bt)&&(Ct+=K*(1-Ce.progress)),Le===d&&(Rt+=K));if(O+=Ct,C+=Ct,N._startClamp&&(N._startClamp+=Ct),N._endClamp&&!On&&(N._endClamp=C||-.001,C=Math.min(C,Ji(U,x))),E=C-O||(O-=.01)&&.001,nn&&(de=Ue.utils.clamp(0,1,Ue.utils.normalize(O,C,Ee))),N._pinPush=Rt,oe&&Ct&&(K={},K[x.a]="+="+Ct,Cn&&(K[x.p]="-="+he()),Ue.set([oe,Q],K)),d&&!(hh&&N.end>=Ji(U,x)))K=Si(d),ye=x===sn,G=he(),xe=parseFloat(pe(x.a))+Rt,!Ut&&C>1&&(et=(Y?Nt.scrollingElement||li:U).style,et={style:et,value:et["overflow"+x.a.toUpperCase()]},Y&&Si(Et)["overflow"+x.a.toUpperCase()]!=="scroll"&&(et.style["overflow"+x.a.toUpperCase()]="scroll")),ef(d,q,K),$=Vl(d),j=Sr(d,!0),Ke=te&&ps(U,ye?Gn:sn)(),_?(ve=[_+x.os2,E+Rt+rn],ve.t=q,H=_===Qt?tu(d,x)+E+Rt:0,H&&(ve.push(x.d,H+rn),q.style.flexBasis!=="auto"&&(q.style.flexBasis=H+rn)),Xo(ve),Cn&&at.forEach(function(Ht){Ht.pin===Cn&&Ht.vars.pinSpacing!==!1&&(Ht._subPinOffset=!0)}),te&&he(Ee)):(H=tu(d,x),H&&q.style.flexBasis!=="auto"&&(q.style.flexBasis=H+rn)),te&&(Se={top:j.top+(ye?G-O:Ke)+rn,left:j.left+(ye?Ke:G-O)+rn,boxSizing:"border-box",position:"fixed"},Se[js]=Se["max"+ta]=Math.ceil(j.width)+rn,Se[Zs]=Se["max"+Gd]=Math.ceil(j.height)+rn,Se[yi]=Se[yi+Za]=Se[yi+Ka]=Se[yi+Ja]=Se[yi+ja]="0",Se[Qt]=K[Qt],Se[Qt+Za]=K[Qt+Za],Se[Qt+Ka]=K[Qt+Ka],Se[Qt+Ja]=K[Qt+Ja],Se[Qt+ja]=K[Qt+ja],F=ub(b,Se,R),On&&he(0)),r?(Qe=r._initted,Ku(1),r.render(r.duration(),!0,!0),He=pe(x.a)-xe+E+Rt,Ve=Math.abs(E-He)>1,te&&Ve&&F.splice(F.length-2,2),r.render(0,!0,!0),Qe||r.invalidate(!0),r.parent||r.totalTime(r.totalTime()),Ku(0)):He=E,et&&(et.value?et.style["overflow"+x.a.toUpperCase()]=et.value:et.style.removeProperty("overflow-"+x.a));else if(h&&he()&&!T)for(j=h.parentNode;j&&j!==Et;)j._pinOffset&&(O-=j._pinOffset,C-=j._pinOffset),j=j.parentNode;Ne&&Ne.forEach(function(Ht){return Ht.revert(!1,!0)}),N.start=O,N.end=C,Ie=I=On?Ee:he(),!T&&!On&&(Ie<Ee&&he(Ee),N.scroll.rec=0),N.revert(!1,!0),fe=Mn(),ce&&(ee=-1,ce.restart(!0)),Sn=0,r&&P&&(r._initted||Ae)&&r.progress()!==Ae&&r.progress(Ae||0,!0).render(r.time(),!0,!0),(nn||de!==N.progress||T||g||r&&!r._initted)&&(r&&!P&&(r._initted||de||r.vars.immediateRender!==!1)&&r.totalProgress(T&&O<-.001&&!de?Ue.utils.normalize(O,C,0):de,!0),N.progress=nn||(Ie-O)/E===de?0:de),d&&_&&(q._pinOffset=Math.round(N.progress*He)),B&&B.invalidate(),isNaN(gt)||(gt-=Ue.getProperty(L,x.p),St-=Ue.getProperty(ne,x.p),Gl(L,x,gt),Gl(oe,x,gt-(Ze||0)),Gl(ne,x,St),Gl(Q,x,St-(Ze||0))),nn&&!On&&N.update(),u&&!On&&!ie&&(ie=!0,u(N),ie=!1)}},N.getVelocity=function(){return(he()-I)/(Mn()-Ca)*1e3||0},N.endAnimation=function(){ya(N.callbackAnimation),r&&(B?B.progress(1):r.paused()?P||ya(r,N.direction<0,1):ya(r,r.reversed()))},N.labelToScroll=function(Re){return r&&r.labels&&(O||N.refresh()||O)+r.labels[Re]/r.duration()*E||0},N.getTrailing=function(Re){var Je=at.indexOf(N),ke=N.direction>0?at.slice(0,Je).reverse():at.slice(Je+1);return(si(Re)?ke.filter(function(Ze){return Ze.vars.preventOverlaps===Re}):ke).filter(function(Ze){return N.direction>0?Ze.end<=O:Ze.start>=C})},N.update=function(Re,Je,ke){if(!(T&&!ke&&!Re)){var Ze=On===!0?Ee:N.scroll(),qt=Re?0:(Ze-O)/E,lt=qt<0?0:qt>1?1:qt||0,Ut=N.progress,nn,Ct,Rt,yt,Qn,Bt,Cn,A;if(Je&&(I=Ie,Ie=T?he():Ze,v&&(ft=Xe,Xe=r&&!P?r.totalProgress():lt)),m&&d&&!Sn&&!Ol&&Ci&&(!lt&&O<Ze+(Ze-I)/(Mn()-Ca)*m?lt=1e-4:lt===1&&C>Ze+(Ze-I)/(Mn()-Ca)*m&&(lt=.9999)),lt!==Ut&&N.enabled){if(nn=N.isActive=!!lt&&lt<1,Ct=!!Ut&&Ut<1,Bt=nn!==Ct,Qn=Bt||!!lt!=!!Ut,N.direction=lt>Ut?1:-1,N.progress=lt,Qn&&!Sn&&(Rt=lt&&!Ut?0:lt===1?1:Ut===1?2:3,P&&(yt=!Bt&&X[Rt+1]!=="none"&&X[Rt+1]||X[Rt],A=r&&(yt==="complete"||yt==="reset"||yt in r))),S&&(Bt||A)&&(A||f||!r)&&(Tn(S)?S(N):N.getTrailing(S).forEach(function(G){return G.endAnimation()})),P||(B&&!Sn&&!Ol?(B._dp._time-B._start!==B._time&&B.render(B._dp._time-B._start),B.resetTo?B.resetTo("totalProgress",lt,r._tTime/r._tDur):(B.vars.totalProgress=lt,B.invalidate().restart())):r&&r.totalProgress(lt,!!(Sn&&(fe||Re)))),d){if(Re&&_&&(q.style[_+x.os2]=me),!te)ue(Pa(xe+He*lt));else if(Qn){if(Cn=!Re&&lt>Ut&&C+1>Ze&&Ze+1>=Ji(U,x),R)if(!Re&&(nn||Cn)){var H=Sr(d,!0),K=Ze-O;ym(d,Et,H.top+(x===sn?K:0)+rn,H.left+(x===sn?0:K)+rn)}else ym(d,q);Xo(nn||Cn?F:$),Ve&&lt<1&&nn||ue(xe+(lt===1&&!Cn?He:0))}}v&&!se.tween&&!Sn&&!Ol&&ce.restart(!0),a&&(Bt||M&&lt&&(lt<1||!ju))&&gl(a.targets).forEach(function(G){return G.classList[nn||M?"add":"remove"](a.className)}),o&&!P&&!Re&&o(N),Qn&&!Sn?(P&&(A&&(yt==="complete"?r.pause().totalProgress(1):yt==="reset"?r.restart(!0).pause():yt==="restart"?r.restart(!0):r[yt]()),o&&o(N)),(Bt||!ju)&&(c&&Bt&&Ju(N,c),W[Rt]&&Ju(N,W[Rt]),M&&(lt===1?N.kill(!1,1):W[Rt]=0),Bt||(Rt=lt===1?1:3,W[Rt]&&Ju(N,W[Rt]))),D&&!nn&&Math.abs(N.getVelocity())>(Da(D)?D:2500)&&(ya(N.callbackAnimation),B?B.progress(1):ya(r,yt==="reverse"?1:!lt,1))):P&&o&&!Sn&&o(N)}if(Me){var j=T?Ze/T.duration()*(T._caScrollDist||0):Ze;ze(j+(L._isFlipped?1:0)),Me(j)}qe&&qe(-Ze/T.duration()*(T._caScrollDist||0))}},N.enable=function(Re,Je){N.enabled||(N.enabled=!0,un(U,"resize",La),Y||un(U,"scroll",uo),ge&&un(n,"refreshInit",ge),Re!==!1&&(N.progress=de=0,Ie=I=ee=he()),Je!==!1&&N.refresh())},N.getTween=function(Re){return Re&&se?se.tween:B},N.setPositions=function(Re,Je,ke,Ze){if(T){var qt=T.scrollTrigger,lt=T.duration(),Ut=qt.end-qt.start;Re=qt.start+Ut*Re/lt,Je=qt.start+Ut*Je/lt}N.refresh(!1,!1,{start:fm(Re,ke&&!!N._startClamp),end:fm(Je,ke&&!!N._endClamp)},Ze),N.update()},N.adjustPinSpacing=function(Re){if(ve&&Re){var Je=ve.indexOf(x.d)+1;ve[Je]=parseFloat(ve[Je])+Re+rn,ve[1]=parseFloat(ve[1])+Re+rn,Xo(ve)}},N.disable=function(Re,Je){if(N.enabled&&(Re!==!1&&N.revert(!0,!0),N.enabled=N.isActive=!1,Je||B&&B.pause(),Ee=0,_e&&(_e.uncache=1),ge&&cn(n,"refreshInit",ge),ce&&(ce.pause(),se.tween&&se.tween.kill()&&(se.tween=0)),!Y)){for(var ke=at.length;ke--;)if(at[ke].scroller===U&&at[ke]!==N)return;cn(U,"resize",La),Y||cn(U,"scroll",uo)}},N.kill=function(Re,Je){N.disable(Re,Je),B&&!Je&&B.kill(),l&&delete dh[l];var ke=at.indexOf(N);ke>=0&&at.splice(ke,1),ke===Nn&&wc>0&&Nn--,ke=0,at.forEach(function(Ze){return Ze.scroller===N.scroller&&(ke=1)}),ke||On||(N.scroll.rec=0),r&&(r.scrollTrigger=null,Re&&r.revert({kill:!1}),Je||r.kill()),oe&&[oe,Q,L,ne].forEach(function(Ze){return Ze.parentNode&&Ze.parentNode.removeChild(Ze)}),Qa===N&&(Qa=0),d&&(_e&&(_e.uncache=1),ke=0,at.forEach(function(Ze){return Ze.pin===d&&ke++}),ke||(_e.spacer=0)),i.onKill&&i.onKill(N)},at.push(N),N.enable(!1,!1),_t&&_t(N),r&&r.add&&!E){var rt=N.update;N.update=function(){N.update=rt,ut.cache++,O||C||N.refresh()},Ue.delayedCall(.01,N.update),E=.01,O=C=0}else N.refresh();d&&ab()},n.register=function(i){return Co||(Ue=i||av(),ov()&&window.document&&n.enable(),Co=Ra),Co},n.defaults=function(i){if(i)for(var r in i)zl[r]=i[r];return zl},n.disable=function(i,r){Ra=0,at.forEach(function(o){return o[r?"kill":"disable"](i)}),cn(ct,"wheel",uo),cn(Nt,"scroll",uo),clearInterval(Nl),cn(Nt,"touchcancel",$i),cn(Et,"touchstart",$i),Bl(cn,Nt,"pointerdown,touchstart,mousedown",hm),Bl(cn,Nt,"pointerup,touchend,mouseup",dm),Qc.kill(),Fl(cn);for(var s=0;s<ut.length;s+=3)kl(cn,ut[s],ut[s+1]),kl(cn,ut[s],ut[s+2])},n.enable=function(){if(ct=window,Nt=document,li=Nt.documentElement,Et=Nt.body,Ue&&(gl=Ue.utils.toArray,qa=Ue.utils.clamp,fh=Ue.core.context||$i,Ku=Ue.core.suppressOverwrites||$i,kd=ct.history.scrollRestoration||"auto",ph=ct.pageYOffset||0,Ue.core.globals("ScrollTrigger",n),Et)){Ra=1,Wo=document.createElement("div"),Wo.style.height="100vh",Wo.style.position="absolute",_v(),eb(),jt.register(Ue),n.isTouch=jt.isTouch,Yr=jt.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),uh=jt.isTouch===1,un(ct,"wheel",uo),Bd=[ct,Nt,li,Et],Ue.matchMedia?(n.matchMedia=function(c){var u=Ue.matchMedia(),f;for(f in c)u.add(f,c[f]);return u},Ue.addEventListener("matchMediaInit",function(){return Xd()}),Ue.addEventListener("matchMediaRevert",function(){return pv()}),Ue.addEventListener("matchMedia",function(){Vs(0,1),no("matchMedia")}),Ue.matchMedia().add("(orientation: portrait)",function(){return Qu(),Qu})):console.warn("Requires GSAP 3.11.0 or later"),Qu(),un(Nt,"scroll",uo);var i=Et.hasAttribute("style"),r=Et.style,s=r.borderTopStyle,o=Ue.core.Animation.prototype,a,l;for(o.revert||Object.defineProperty(o,"revert",{value:function(){return this.time(-.01,!0)}}),r.borderTopStyle="solid",a=Sr(Et),sn.m=Math.round(a.top+sn.sc())||0,Gn.m=Math.round(a.left+Gn.sc())||0,s?r.borderTopStyle=s:r.removeProperty("border-top-style"),i||(Et.setAttribute("style",""),Et.removeAttribute("style")),Nl=setInterval(_m,250),Ue.delayedCall(.5,function(){return Ol=0}),un(Nt,"touchcancel",$i),un(Et,"touchstart",$i),Bl(un,Nt,"pointerdown,touchstart,mousedown",hm),Bl(un,Nt,"pointerup,touchend,mouseup",dm),ch=Ue.utils.checkPrefix("transform"),Ac.push(ch),Co=Mn(),Qc=Ue.delayedCall(.2,Vs).pause(),Ro=[Nt,"visibilitychange",function(){var c=ct.innerWidth,u=ct.innerHeight;Nt.hidden?(lm=c,cm=u):(lm!==c||cm!==u)&&La()},Nt,"DOMContentLoaded",Vs,ct,"load",Vs,ct,"resize",La],Fl(un),at.forEach(function(c){return c.enable(0,1)}),l=0;l<ut.length;l+=3)kl(cn,ut[l],ut[l+1]),kl(cn,ut[l],ut[l+2])}},n.config=function(i){"limitCallbacks"in i&&(ju=!!i.limitCallbacks);var r=i.syncInterval;r&&clearInterval(Nl)||(Nl=r)&&setInterval(_m,r),"ignoreMobileResize"in i&&(uh=n.isTouch===1&&i.ignoreMobileResize),"autoRefreshEvents"in i&&(Fl(cn)||Fl(un,i.autoRefreshEvents||"none"),iv=(i.autoRefreshEvents+"").indexOf("resize")===-1)},n.scrollerProxy=function(i,r){var s=Yn(i),o=ut.indexOf(s),a=eo(s);~o&&ut.splice(o,a?6:2),r&&(a?tr.unshift(ct,r,Et,r,li,r):tr.unshift(s,r))},n.clearMatchMedia=function(i){at.forEach(function(r){return r._ctx&&r._ctx.query===i&&r._ctx.kill(!0,!0)})},n.isInViewport=function(i,r,s){var o=(si(i)?Yn(i):i).getBoundingClientRect(),a=o[s?js:Zs]*r||0;return s?o.right-a>0&&o.left+a<ct.innerWidth:o.bottom-a>0&&o.top+a<ct.innerHeight},n.positionInViewport=function(i,r,s){si(i)&&(i=Yn(i));var o=i.getBoundingClientRect(),a=o[s?js:Zs],l=r==null?a/2:r in nu?nu[r]*a:~r.indexOf("%")?parseFloat(r)*a/100:parseFloat(r)||0;return s?(o.left+l)/ct.innerWidth:(o.top+l)/ct.innerHeight},n.killAll=function(i){if(at.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),i!==!0){var r=to.killAll||[];to={},r.forEach(function(s){return s()})}},n})();tt.version="3.13.0";tt.saveStyles=function(n){return n?gl(n).forEach(function(e){if(e&&e.style){var t=ri.indexOf(e);t>=0&&ri.splice(t,5),ri.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),Ue.core.getCache(e),fh())}}):ri};tt.revert=function(n,e){return Xd(!n,e)};tt.create=function(n,e){return new tt(n,e)};tt.refresh=function(n){return n?La(!0):(Co||tt.register())&&Vs(!0)};tt.update=function(n){return++ut.cache&&wr(n===!0?2:0)};tt.clearScrollMemory=mv;tt.maxScroll=function(n,e){return Ji(n,e?Gn:sn)};tt.getScrollFunc=function(n,e){return ps(Yn(n),e?Gn:sn)};tt.getById=function(n){return dh[n]};tt.getAll=function(){return at.filter(function(n){return n.vars.id!=="ScrollSmoother"})};tt.isScrolling=function(){return!!Ci};tt.snapDirectional=Wd;tt.addEventListener=function(n,e){var t=to[n]||(to[n]=[]);~t.indexOf(e)||t.push(e)};tt.removeEventListener=function(n,e){var t=to[n],i=t&&t.indexOf(e);i>=0&&t.splice(i,1)};tt.batch=function(n,e){var t=[],i={},r=e.interval||.016,s=e.batchMax||1e9,o=function(c,u){var f=[],h=[],d=Ue.delayedCall(r,function(){u(f,h),f=[],h=[]}).pause();return function(_){f.length||d.restart(!0),f.push(_.trigger),h.push(_),s<=f.length&&d.progress(1)}},a;for(a in e)i[a]=a.substr(0,2)==="on"&&Tn(e[a])&&a!=="onRefreshInit"?o(a,e[a]):e[a];return Tn(s)&&(s=s(),un(tt,"refresh",function(){return s=e.batchMax()})),gl(n).forEach(function(l){var c={};for(a in i)c[a]=i[a];c.trigger=l,t.push(tt.create(c))}),t};var Mm=function(e,t,i,r){return t>r?e(r):t<0&&e(0),i>r?(r-t)/(i-t):i<0?t/(t-i):1},tf=function n(e,t){t===!0?e.style.removeProperty("touch-action"):e.style.touchAction=t===!0?"auto":t?"pan-"+t+(jt.isTouch?" pinch-zoom":""):"none",e===li&&n(Et,t)},Wl={auto:1,scroll:1},hb=function(e){var t=e.event,i=e.target,r=e.axis,s=(t.changedTouches?t.changedTouches[0]:t).target,o=s._gsap||Ue.core.getCache(s),a=Mn(),l;if(!o._isScrollT||a-o._isScrollT>2e3){for(;s&&s!==Et&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(Wl[(l=Si(s)).overflowY]||Wl[l.overflowX]));)s=s.parentNode;o._isScroll=s&&s!==i&&!eo(s)&&(Wl[(l=Si(s)).overflowY]||Wl[l.overflowX]),o._isScrollT=a}(o._isScroll||r==="x")&&(t.stopPropagation(),t._gsapAllow=!0)},vv=function(e,t,i,r){return jt.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:r=r&&hb,onPress:r,onDrag:r,onScroll:r,onEnable:function(){return i&&un(Nt,jt.eventTypes[0],Em,!1,!0)},onDisable:function(){return cn(Nt,jt.eventTypes[0],Em,!0)}})},db=/(input|label|select|textarea)/i,bm,Em=function(e){var t=db.test(e.target.tagName);(t||bm)&&(e._gsapAllow=!0,bm=t)},pb=function(e){Ns(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var t=e,i=t.normalizeScrollX,r=t.momentum,s=t.allowNestedScroll,o=t.onRelease,a,l,c=Yn(e.target)||li,u=Ue.core.globals().ScrollSmoother,f=u&&u.get(),h=Yr&&(e.content&&Yn(e.content)||f&&e.content!==!1&&!f.smooth()&&f.content()),d=ps(c,sn),_=ps(c,Gn),g=1,m=(jt.isTouch&&ct.visualViewport?ct.visualViewport.scale*ct.visualViewport.width:ct.outerWidth)/ct.innerWidth,p=0,y=Tn(r)?function(){return r(a)}:function(){return r||2.8},M,v,R=vv(c,e.type,!0,s),w=function(){return v=!1},T=$i,D=$i,S=function(){l=Ji(c,sn),D=qa(Yr?1:0,l),i&&(T=qa(0,Ji(c,Gn))),M=Js},x=function(){h._gsap.y=Pa(parseFloat(h._gsap.y)+d.offset)+"px",h.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(h._gsap.y)+", 0, 1)",d.offset=d.cacheID=0},P=function(){if(v){requestAnimationFrame(w);var V=Pa(a.deltaY/2),ae=D(d.v-V);if(h&&ae!==d.v+d.offset){d.offset=ae-d.v;var N=Pa((parseFloat(h&&h._gsap.y)||0)-d.offset);h.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+N+", 0, 1)",h._gsap.y=N+"px",d.cacheID=ut.cache,wr()}return!0}d.offset&&x(),v=!0},U,k,Y,te,W=function(){S(),U.isActive()&&U.vars.scrollY>l&&(d()>l?U.progress(1)&&d(l):U.resetTo("scrollY",l))};return h&&Ue.set(h,{y:"+=0"}),e.ignoreCheck=function(X){return Yr&&X.type==="touchmove"&&P()||g>1.05&&X.type!=="touchstart"||a.isGesturing||X.touches&&X.touches.length>1},e.onPress=function(){v=!1;var X=g;g=Pa((ct.visualViewport&&ct.visualViewport.scale||1)/m),U.pause(),X!==g&&tf(c,g>1.01?!0:i?!1:"x"),k=_(),Y=d(),S(),M=Js},e.onRelease=e.onGestureStart=function(X,V){if(d.offset&&x(),!V)te.restart(!0);else{ut.cache++;var ae=y(),N,ge;i&&(N=_(),ge=N+ae*.05*-X.velocityX/.227,ae*=Mm(_,N,ge,Ji(c,Gn)),U.vars.scrollX=T(ge)),N=d(),ge=N+ae*.05*-X.velocityY/.227,ae*=Mm(d,N,ge,Ji(c,sn)),U.vars.scrollY=D(ge),U.invalidate().duration(ae).play(.01),(Yr&&U.vars.scrollY>=l||N>=l-1)&&Ue.to({},{onUpdate:W,duration:ae})}o&&o(X)},e.onWheel=function(){U._ts&&U.pause(),Mn()-p>1e3&&(M=0,p=Mn())},e.onChange=function(X,V,ae,N,ge){if(Js!==M&&S(),V&&i&&_(T(N[2]===V?k+(X.startX-X.x):_()+V-N[1])),ae){d.offset&&x();var we=ge[2]===ae,Be=we?Y+X.startY-X.y:d()+ae-ge[1],ee=D(Be);we&&Be!==ee&&(Y+=ee-Be),d(ee)}(ae||V)&&wr()},e.onEnable=function(){tf(c,i?!1:"x"),tt.addEventListener("refresh",W),un(ct,"resize",W),d.smooth&&(d.target.style.scrollBehavior="auto",d.smooth=_.smooth=!1),R.enable()},e.onDisable=function(){tf(c,!0),cn(ct,"resize",W),tt.removeEventListener("refresh",W),R.kill()},e.lockAxis=e.lockAxis!==!1,a=new jt(e),a.iOS=Yr,Yr&&!d()&&d(1),Yr&&Ue.ticker.add($i),te=a._dc,U=Ue.to(a,{ease:"power4",paused:!0,inherit:!1,scrollX:i?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:gv(d,d(),function(){return U.pause()})},onUpdate:wr,onComplete:te.vars.onComplete}),a};tt.sort=function(n){if(Tn(n))return at.sort(n);var e=ct.pageYOffset||0;return tt.getAll().forEach(function(t){return t._sortY=t.trigger?e+t.trigger.getBoundingClientRect().top:t.start+ct.innerHeight}),at.sort(n||function(t,i){return(t.vars.refreshPriority||0)*-1e6+(t.vars.containerAnimation?1e6:t._sortY)-((i.vars.containerAnimation?1e6:i._sortY)+(i.vars.refreshPriority||0)*-1e6)})};tt.observe=function(n){return new jt(n)};tt.normalizeScroll=function(n){if(typeof n>"u")return Un;if(n===!0&&Un)return Un.enable();if(n===!1){Un&&Un.kill(),Un=n;return}var e=n instanceof jt?n:pb(n);return Un&&Un.target===e.target&&Un.kill(),eo(e.target)&&(Un=e),e};tt.core={_getVelocityProp:lh,_inputObserver:vv,_scrollers:ut,_proxies:tr,bridge:{ss:function(){Ci||no("scrollStart"),Ci=Mn()},ref:function(){return Sn}}};av()&&Ue.registerPlugin(tt);const mb="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20220%20260'%20width='220'%20height='260'%3e%3cdefs%3e%3clinearGradient%20id='gemBody'%20x1='0'%20y1='0'%20x2='1'%20y2='1'%3e%3cstop%20offset='0'%20stop-color='%23f3dfae'/%3e%3cstop%20offset='0.45'%20stop-color='%23d4a843'/%3e%3cstop%20offset='1'%20stop-color='%237a5a22'/%3e%3c/linearGradient%3e%3clinearGradient%20id='gemLeft'%20x1='0'%20y1='0'%20x2='1'%20y2='0'%3e%3cstop%20offset='0'%20stop-color='%238a6a2f'/%3e%3cstop%20offset='1'%20stop-color='%23c79a3e'/%3e%3c/linearGradient%3e%3clinearGradient%20id='gemRight'%20x1='0'%20y1='0'%20x2='1'%20y2='0'%3e%3cstop%20offset='0'%20stop-color='%23e8c97a'/%3e%3cstop%20offset='1'%20stop-color='%239a7430'/%3e%3c/linearGradient%3e%3cradialGradient%20id='glow'%20cx='0.5'%20cy='0.5'%20r='0.5'%3e%3cstop%20offset='0'%20stop-color='%23ffd98a'%20stop-opacity='0.55'/%3e%3cstop%20offset='0.6'%20stop-color='%23d4a843'%20stop-opacity='0.18'/%3e%3cstop%20offset='1'%20stop-color='%23d4a843'%20stop-opacity='0'/%3e%3c/radialGradient%3e%3cfilter%20id='soft'%20x='-40%25'%20y='-40%25'%20width='180%25'%20height='180%25'%3e%3cfeGaussianBlur%20stdDeviation='3'/%3e%3c/filter%3e%3c/defs%3e%3c!--%20Halo%20glow%20--%3e%3cellipse%20cx='110'%20cy='130'%20rx='95'%20ry='110'%20fill='url(%23glow)'/%3e%3c!--%20Main%20gem:%20elongated%20facet%20diamond%20--%3e%3cg%3e%3c!--%20back%20silhouette%20for%20depth%20--%3e%3cpolygon%20points='110,18%20158,108%20110,242%2062,108'%20fill='%233a2a10'%20opacity='0.9'/%3e%3c!--%20left%20dark%20facet%20--%3e%3cpolygon%20points='110,18%2062,108%20110,242'%20fill='url(%23gemLeft)'/%3e%3c!--%20right%20light%20facet%20--%3e%3cpolygon%20points='110,18%20158,108%20110,242'%20fill='url(%23gemRight)'/%3e%3c!--%20top%20cap%20facets%20--%3e%3cpolygon%20points='110,18%2086,98%20110,120'%20fill='url(%23gemBody)'%20opacity='0.92'/%3e%3cpolygon%20points='110,18%20134,98%20110,120'%20fill='%23f3dfae'%20opacity='0.55'/%3e%3c!--%20centre%20seam%20highlight%20--%3e%3cpolygon%20points='110,18%20114,108%20110,242%20106,108'%20fill='%23ffe9bb'%20opacity='0.65'/%3e%3c!--%20inner%20shine%20--%3e%3cpolygon%20points='98,70%20108,60%20104,118%2094,112'%20fill='%23fff3d6'%20opacity='0.5'%20filter='url(%23soft)'/%3e%3c/g%3e%3c!--%20Edge%20lines%20--%3e%3cg%20fill='none'%20stroke='%23f3dfae'%20stroke-opacity='0.5'%20stroke-width='1.2'%3e%3cpolygon%20points='110,18%20158,108%20110,242%2062,108'/%3e%3cline%20x1='62'%20y1='108'%20x2='158'%20y2='108'/%3e%3c/g%3e%3c!--%20Orbiting%20sparkle%20shards%20--%3e%3cg%20fill='%23e8c97a'%3e%3cpolygon%20points='36,84%2042,96%2036,108%2030,96'%20opacity='0.9'/%3e%3cpolygon%20points='184,140%20189,150%20184,160%20179,150'%20opacity='0.8'/%3e%3cpolygon%20points='166,52%20170,60%20166,68%20162,60'%20opacity='0.7'/%3e%3cpolygon%20points='48,182%2053,192%2048,202%2043,192'%20opacity='0.75'/%3e%3c/g%3e%3cg%20fill='%23fff3d6'%3e%3ccircle%20cx='70'%20cy='48'%20r='2.2'%20opacity='0.9'/%3e%3ccircle%20cx='190'%20cy='96'%20r='1.8'%20opacity='0.8'/%3e%3ccircle%20cx='26'%20cy='140'%20r='1.6'%20opacity='0.7'/%3e%3ccircle%20cx='150'%20cy='222'%20r='2'%20opacity='0.75'/%3e%3c/g%3e%3c/svg%3e";function xv(n){if(!n||typeof window>"u")return()=>{};if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return()=>{};const e=i=>{const r=n.getBoundingClientRect(),s=(i.clientX-r.left)/r.width,o=(i.clientY-r.top)/r.height,a=(s-.5)*12,l=(.5-o)*10;n.dataset.tilt="active",n.style.setProperty("--tilt-x",`${l}deg`),n.style.setProperty("--tilt-y",`${a}deg`),n.style.setProperty("--pointer-x",`${s*100}%`),n.style.setProperty("--pointer-y",`${o*100}%`)},t=()=>{n.dataset.tilt="idle",n.style.setProperty("--tilt-x","0deg"),n.style.setProperty("--tilt-y","0deg"),n.style.setProperty("--pointer-x","50%"),n.style.setProperty("--pointer-y","50%")};return n.addEventListener("pointermove",e),n.addEventListener("pointerleave",t),t(),()=>{n.removeEventListener("pointermove",e),n.removeEventListener("pointerleave",t),t()}}var Tm="1.3.23";function yv(n,e,t){return Math.max(n,Math.min(e,t))}function _b(n,e,t){return(1-t)*n+t*e}function gb(n,e,t,i){return _b(n,e,1-Math.exp(-t*i))}function vb(n,e){return(n%e+e)%e}var xb=class{isRunning=!1;value=0;from=0;to=0;currentTime=0;lerp;duration;easing;onUpdate;advance(n){if(!this.isRunning)return;let e=!1;if(this.duration&&this.easing){this.currentTime+=n;const t=yv(0,this.currentTime/this.duration,1);e=t>=1;const i=e?1:this.easing(t);this.value=this.from+(this.to-this.from)*i}else this.lerp?(this.value=gb(this.value,this.to,this.lerp*60,n),Math.round(this.value)===Math.round(this.to)&&(this.value=this.to,e=!0)):(this.value=this.to,e=!0);e&&this.stop(),this.onUpdate?.(this.value,e)}stop(){this.isRunning=!1}fromTo(n,e,{lerp:t,duration:i,easing:r,onStart:s,onUpdate:o}){this.from=this.value=n,this.to=e,this.lerp=t,this.duration=i,this.easing=r,this.currentTime=0,this.isRunning=!0,s?.(),this.onUpdate=o}};function yb(n,e){let t;return function(...i){clearTimeout(t),t=setTimeout(()=>{t=void 0,n.apply(this,i)},e)}}var Sb=class{width=0;height=0;scrollHeight=0;scrollWidth=0;debouncedResize;wrapperResizeObserver;contentResizeObserver;constructor(n,e,{autoResize:t=!0,debounce:i=250}={}){this.wrapper=n,this.content=e,t&&(this.debouncedResize=yb(this.resize,i),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){this.wrapperResizeObserver?.disconnect(),this.contentResizeObserver?.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize)}resize=()=>{this.onWrapperResize(),this.onContentResize()};onWrapperResize=()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)};onContentResize=()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)};get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},Sv=class{events={};emit(n,...e){const t=this.events[n]||[];for(let i=0,r=t.length;i<r;i++)t[i]?.(...e)}on(n,e){return this.events[n]?this.events[n].push(e):this.events[n]=[e],()=>{this.events[n]=this.events[n]?.filter(t=>e!==t)}}off(n,e){this.events[n]=this.events[n]?.filter(t=>e!==t)}destroy(){this.events={}}};const Mb=100/6,kr={passive:!1};function wm(n,e){return n===1?Mb:n===2?e:1}var bb=class{touchStart={x:0,y:0};lastDelta={x:0,y:0};window={width:0,height:0};emitter=new Sv;constructor(n,e={wheelMultiplier:1,touchMultiplier:1}){this.element=n,this.options=e,window.addEventListener("resize",this.onWindowResize),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,kr),this.element.addEventListener("touchstart",this.onTouchStart,kr),this.element.addEventListener("touchmove",this.onTouchMove,kr),this.element.addEventListener("touchend",this.onTouchEnd,kr)}on(n,e){return this.emitter.on(n,e)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize),this.element.removeEventListener("wheel",this.onWheel,kr),this.element.removeEventListener("touchstart",this.onTouchStart,kr),this.element.removeEventListener("touchmove",this.onTouchMove,kr),this.element.removeEventListener("touchend",this.onTouchEnd,kr)}onTouchStart=n=>{const{clientX:e,clientY:t}=n.targetTouches?n.targetTouches[0]:n;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:n})};onTouchMove=n=>{const{clientX:e,clientY:t}=n.targetTouches?n.targetTouches[0]:n,i=-(e-this.touchStart.x)*this.options.touchMultiplier,r=-(t-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:i,y:r},this.emitter.emit("scroll",{deltaX:i,deltaY:r,event:n})};onTouchEnd=n=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:n})};onWheel=n=>{let{deltaX:e,deltaY:t,deltaMode:i}=n;const r=wm(i,this.window.width),s=wm(i,this.window.height);e*=r,t*=s,e*=this.options.wheelMultiplier,t*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:e,deltaY:t,event:n})};onWindowResize=()=>{this.window={width:window.innerWidth,height:window.innerHeight}}};const Am=n=>Math.min(1,1.001-2**(-10*n));var Eb=class{_isScrolling=!1;_isStopped=!1;_isLocked=!1;_preventNextNativeScrollEvent=!1;_resetVelocityTimeout=null;_rafId=null;isTouching;time=0;userData={};lastVelocity=0;velocity=0;direction=0;options;targetScroll;animatedScroll;animate=new xb;emitter=new Sv;dimensions;virtualScroll;constructor({wrapper:n=window,content:e=document.documentElement,eventsTarget:t=n,smoothWheel:i=!0,syncTouch:r=!1,syncTouchLerp:s=.075,touchInertiaExponent:o=1.7,duration:a,easing:l,lerp:c=.1,infinite:u=!1,orientation:f="vertical",gestureOrientation:h=f==="horizontal"?"both":"vertical",touchMultiplier:d=1,wheelMultiplier:_=1,autoResize:g=!0,prevent:m,virtualScroll:p,overscroll:y=!0,autoRaf:M=!1,anchors:v=!1,autoToggle:R=!1,allowNestedScroll:w=!1,__experimental__naiveDimensions:T=!1,naiveDimensions:D=T,stopInertiaOnNavigate:S=!1}={}){window.lenisVersion=Tm,window.lenis||(window.lenis={}),window.lenis.version=Tm,f==="horizontal"&&(window.lenis.horizontal=!0),r===!0&&(window.lenis.touch=!0),(!n||n===document.documentElement)&&(n=window),typeof a=="number"&&typeof l!="function"?l=Am:typeof l=="function"&&typeof a!="number"&&(a=1),this.options={wrapper:n,content:e,eventsTarget:t,smoothWheel:i,syncTouch:r,syncTouchLerp:s,touchInertiaExponent:o,duration:a,easing:l,lerp:c,infinite:u,gestureOrientation:h,orientation:f,touchMultiplier:d,wheelMultiplier:_,autoResize:g,prevent:m,virtualScroll:p,overscroll:y,autoRaf:M,anchors:v,autoToggle:R,allowNestedScroll:w,naiveDimensions:D,stopInertiaOnNavigate:S},this.dimensions=new Sb(n,e,{autoResize:g}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.addEventListener("click",this.onClick),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown),this.virtualScroll=new bb(t,{touchMultiplier:d,wheelMultiplier:_}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoToggle&&(this.checkOverflow(),this.rootElement.addEventListener("transitionend",this.onTransitionEnd)),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.removeEventListener("click",this.onClick),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this._rafId&&cancelAnimationFrame(this._rafId)}on(n,e){return this.emitter.on(n,e)}off(n,e){return this.emitter.off(n,e)}onScrollEnd=n=>{n instanceof CustomEvent||(this.isScrolling==="smooth"||this.isScrolling===!1)&&n.stopPropagation()};dispatchScrollendEvent=()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))};get overflow(){const n=this.isHorizontal?"overflow-x":"overflow-y";return getComputedStyle(this.rootElement)[n]}checkOverflow(){["hidden","clip"].includes(this.overflow)?this.internalStop():this.internalStart()}onTransitionEnd=n=>{n.propertyName?.includes("overflow")&&n.target===this.rootElement&&this.checkOverflow()};setScroll(n){this.isHorizontal?this.options.wrapper.scrollTo({left:n,behavior:"instant"}):this.options.wrapper.scrollTo({top:n,behavior:"instant"})}onClick=n=>{const e=n.composedPath().filter(i=>i instanceof HTMLAnchorElement&&i.href).map(i=>new URL(i.href)),t=new URL(window.location.href);if(this.options.anchors){const i=e.find(r=>t.host===r.host&&t.pathname===r.pathname&&r.hash);if(i){const r=typeof this.options.anchors=="object"&&this.options.anchors?this.options.anchors:void 0,s=`#${i.hash.split("#")[1]}`;this.scrollTo(s,r);return}}if(this.options.stopInertiaOnNavigate&&e.some(i=>t.host===i.host&&t.pathname!==i.pathname)){this.reset();return}};onPointerDown=n=>{n.button===1&&this.reset()};onVirtualScroll=n=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(n)===!1)return;const{deltaX:e,deltaY:t,event:i}=n;if(this.emitter.emit("virtual-scroll",{deltaX:e,deltaY:t,event:i}),i.ctrlKey||i.lenisStopPropagation)return;const r=i.type.includes("touch"),s=i.type.includes("wheel");this.isTouching=i.type==="touchstart"||i.type==="touchmove";const o=e===0&&t===0;if(this.options.syncTouch&&r&&i.type==="touchstart"&&o&&!this.isStopped&&!this.isLocked){this.reset();return}const a=this.options.gestureOrientation==="vertical"&&t===0||this.options.gestureOrientation==="horizontal"&&e===0;if(o||a)return;let l=i.composedPath();l=l.slice(0,l.indexOf(this.rootElement));const c=this.options.prevent,u=Math.abs(e)>=Math.abs(t)?"horizontal":"vertical";if(l.find(_=>_ instanceof HTMLElement&&(typeof c=="function"&&c?.(_)||_.hasAttribute?.("data-lenis-prevent")||u==="vertical"&&_.hasAttribute?.("data-lenis-prevent-vertical")||u==="horizontal"&&_.hasAttribute?.("data-lenis-prevent-horizontal")||r&&_.hasAttribute?.("data-lenis-prevent-touch")||s&&_.hasAttribute?.("data-lenis-prevent-wheel")||this.options.allowNestedScroll&&this.hasNestedScroll(_,{deltaX:e,deltaY:t}))))return;if(this.isStopped||this.isLocked){i.cancelable&&i.preventDefault();return}if(!(this.options.syncTouch&&r||this.options.smoothWheel&&s)){this.isScrolling="native",this.animate.stop(),i.lenisStopPropagation=!0;return}let f=t;this.options.gestureOrientation==="both"?f=Math.abs(t)>Math.abs(e)?t:e:this.options.gestureOrientation==="horizontal"&&(f=e),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&this.limit>0&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&t>0||this.animatedScroll===this.limit&&t<0))&&(i.lenisStopPropagation=!0),i.cancelable&&i.preventDefault();const h=r&&this.options.syncTouch,d=r&&i.type==="touchend";d&&(f=Math.sign(f)*Math.abs(this.velocity)**this.options.touchInertiaExponent),this.scrollTo(this.targetScroll+f,{programmatic:!1,...h?{lerp:d?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})};resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}onNativeScroll=()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){const n=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-n,this.direction=Math.sign(this.animatedScroll-n),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}};reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){if(this.isStopped){if(this.options.autoToggle){this.rootElement.style.removeProperty("overflow");return}this.internalStart()}}internalStart(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){if(!this.isStopped){if(this.options.autoToggle){this.rootElement.style.setProperty("overflow","clip");return}this.internalStop()}}internalStop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}raf=n=>{const e=n-(this.time||n);this.time=n,this.animate.advance(e*.001),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))};scrollTo(n,{offset:e=0,immediate:t=!1,lock:i=!1,programmatic:r=!0,lerp:s=r?this.options.lerp:void 0,duration:o=r?this.options.duration:void 0,easing:a=r?this.options.easing:void 0,onStart:l,onComplete:c,force:u=!1,userData:f}={}){if((this.isStopped||this.isLocked)&&!u)return;let h=n,d=e;if(typeof h=="string"&&["top","left","start","#"].includes(h))h=0;else if(typeof h=="string"&&["bottom","right","end"].includes(h))h=this.limit;else{let _=null;if(typeof h=="string"?(_=document.querySelector(h),_||(h==="#top"?h=0:console.warn("Lenis: Target not found",h))):h instanceof HTMLElement&&h?.nodeType&&(_=h),_){if(this.options.wrapper!==window){const v=this.rootElement.getBoundingClientRect();d-=this.isHorizontal?v.left:v.top}const g=_.getBoundingClientRect(),m=getComputedStyle(_),p=this.isHorizontal?Number.parseFloat(m.scrollMarginLeft):Number.parseFloat(m.scrollMarginTop),y=getComputedStyle(this.rootElement),M=this.isHorizontal?Number.parseFloat(y.scrollPaddingLeft):Number.parseFloat(y.scrollPaddingTop);h=(this.isHorizontal?g.left:g.top)+this.animatedScroll-(Number.isNaN(p)?0:p)-(Number.isNaN(M)?0:M)}}if(typeof h=="number"){if(h+=d,this.options.infinite){if(r){this.targetScroll=this.animatedScroll=this.scroll;const _=h-this.animatedScroll;_>this.limit/2?h-=this.limit:_<-this.limit/2&&(h+=this.limit)}}else h=yv(0,h,this.limit);if(h===this.targetScroll){l?.(this),c?.(this);return}if(this.userData=f??{},t){this.animatedScroll=this.targetScroll=h,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),c?.(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}r||(this.targetScroll=h),typeof o=="number"&&typeof a!="function"?a=Am:typeof a=="function"&&typeof o!="number"&&(o=1),this.animate.fromTo(this.animatedScroll,h,{duration:o,easing:a,lerp:s,onStart:()=>{i&&(this.isLocked=!0),this.isScrolling="smooth",l?.(this)},onUpdate:(_,g)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=_-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=_,this.setScroll(this.scroll),r&&(this.targetScroll=_),g||this.emit(),g&&(this.reset(),this.emit(),c?.(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}hasNestedScroll(n,{deltaX:e,deltaY:t}){const i=Date.now();n._lenis||(n._lenis={});const r=n._lenis;let s,o,a,l,c,u,f,h,d,_;if(i-(r.time??0)>2e3){r.time=Date.now();const w=window.getComputedStyle(n);if(r.computedStyle=w,s=["auto","overlay","scroll"].includes(w.overflowX),o=["auto","overlay","scroll"].includes(w.overflowY),c=["auto"].includes(w.overscrollBehaviorX),u=["auto"].includes(w.overscrollBehaviorY),r.hasOverflowX=s,r.hasOverflowY=o,!(s||o))return!1;f=n.scrollWidth,h=n.scrollHeight,d=n.clientWidth,_=n.clientHeight,a=f>d,l=h>_,r.isScrollableX=a,r.isScrollableY=l,r.scrollWidth=f,r.scrollHeight=h,r.clientWidth=d,r.clientHeight=_,r.hasOverscrollBehaviorX=c,r.hasOverscrollBehaviorY=u}else a=r.isScrollableX,l=r.isScrollableY,s=r.hasOverflowX,o=r.hasOverflowY,f=r.scrollWidth,h=r.scrollHeight,d=r.clientWidth,_=r.clientHeight,c=r.hasOverscrollBehaviorX,u=r.hasOverscrollBehaviorY;if(!(s&&a||o&&l))return!1;const g=Math.abs(e)>=Math.abs(t)?"horizontal":"vertical";let m,p,y,M,v,R;if(g==="horizontal")m=Math.round(n.scrollLeft),p=f-d,y=e,M=s,v=a,R=c;else if(g==="vertical")m=Math.round(n.scrollTop),p=h-_,y=t,M=o,v=l,R=u;else return!1;return!R&&(m>=p||m<=0)?!0:(y>0?m<p:m>0)&&M&&v}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){const n=this.options.wrapper;return this.isHorizontal?n.scrollX??n.scrollLeft:n.scrollY??n.scrollTop}get scroll(){return this.options.infinite?vb(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(n){this._isScrolling!==n&&(this._isScrolling=n,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(n){this._isStopped!==n&&(this._isStopped=n,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(n){this._isLocked!==n&&(this._isLocked=n,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get className(){let n="lenis";return this.options.autoToggle&&(n+=" lenis-autoToggle"),this.isStopped&&(n+=" lenis-stopped"),this.isLocked&&(n+=" lenis-locked"),this.isScrolling&&(n+=" lenis-scrolling"),this.isScrolling==="smooth"&&(n+=" lenis-smooth"),n}updateClassName(){this.cleanUpClassName(),this.className.split(" ").forEach(n=>{this.rootElement.classList.add(n)})}cleanUpClassName(){for(const n of Array.from(this.rootElement.classList))(n==="lenis"||n.startsWith("lenis-"))&&this.rootElement.classList.remove(n)}};function Tb(n){if(typeof window<"u"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)return{lenis:null,destroy:()=>{}};const t=new Eb({duration:1.25,smoothWheel:!0,wheelMultiplier:1,touchMultiplier:1.55,infinite:!1});t.on("scroll",n);const i=r=>{t.raf(r*1e3)};return Oe.ticker.add(i),Oe.ticker.lagSmoothing(0),{lenis:t,destroy:()=>{Oe.ticker.remove(i),t.off("scroll",n),t.destroy()}}}const wb={class:"site-nav__inner"},Ab={class:"site-nav__links","aria-label":"Primary"},Cb=["onClick"],Rb={class:"site-nav__actions"},Pb=["aria-expanded"],Db={key:0,class:"site-nav__mobile","aria-label":"Mobile navigation"},Lb=["onClick"],Ib={__name:"Navbar",setup(n){const e=vt(!1),t=vt(!1),i=[{id:1,name:"About",href:"about"},{id:2,name:"Skills",href:"tech"},{id:3,name:"Experience",href:"experience"},{id:4,name:"Projects",href:"projects"},{id:5,name:"Services",href:"services"},{id:6,name:"Pricing",href:"pricing"},{id:7,name:"Certifications",href:"certificates"}],r=a=>{e.value=!1;const l=document.getElementById(a);l&&l.scrollIntoView({behavior:"smooth",block:"start"})},s=()=>{t.value=window.scrollY>20},o=()=>{window.innerWidth>880&&(e.value=!1)};return rr(()=>{s(),window.addEventListener("scroll",s,{passive:!0}),window.addEventListener("resize",o)}),Nr(()=>{window.removeEventListener("scroll",s),window.removeEventListener("resize",o)}),(a,l)=>(Ye(),$e("header",{class:Hi(["site-nav",{"site-nav--scrolled":t.value,"site-nav--open":e.value}])},[z("div",wb,[z("button",{class:"site-nav__brand",type:"button",onClick:l[0]||(l[0]=c=>r("home"))},"✦ SH"),z("nav",Ab,[(Ye(),$e(At,null,fn(i,c=>z("button",{key:c.id,class:"site-nav__link",type:"button",onClick:u=>r(c.href)},nt(c.name),9,Cb)),64))]),z("div",Rb,[l[3]||(l[3]=z("a",{class:"button button--ghost button--compact",href:"https://wa.me/60177786836",target:"_blank",rel:"noopener noreferrer","aria-label":"Connect on WhatsApp"}," Connect ",-1)),z("button",{class:"site-nav__toggle",type:"button","aria-expanded":e.value,"aria-label":"Toggle navigation",onClick:l[1]||(l[1]=c=>e.value=!e.value)},[...l[2]||(l[2]=[z("span",null,null,-1),z("span",null,null,-1)])],8,Pb)])]),e.value?(Ye(),$e("div",Db,[(Ye(),$e(At,null,fn(i,c=>z("button",{key:`${c.id}-mobile`,class:"site-nav__mobile-link",type:"button",onClick:u=>r(c.href)},nt(c.name),9,Lb)),64)),l[4]||(l[4]=z("a",{class:"button button--primary site-nav__mobile-cta",href:"https://wa.me/60177786836",target:"_blank",rel:"noopener noreferrer","aria-label":"Start a conversation on WhatsApp"}," Start a conversation ",-1))])):ns("",!0)],2))}};const Yd="170",Ub=0,Cm=1,Nb=2,Mv=1,Ob=2,dr=3,ms=0,Wn=1,Mr=2,os=0,Yo=1,Rm=2,Pm=3,Dm=4,Fb=5,ks=100,Bb=101,kb=102,zb=103,Hb=104,Vb=200,Gb=201,Wb=202,Xb=203,_h=204,gh=205,Yb=206,$b=207,qb=208,Kb=209,jb=210,Zb=211,Jb=212,Qb=213,eE=214,vh=0,xh=1,yh=2,na=3,Sh=4,Mh=5,bh=6,Eh=7,bv=0,tE=1,nE=2,as=0,iE=1,rE=2,sE=3,Ev=4,oE=5,aE=6,lE=7,Tv=300,ia=301,ra=302,Th=303,wh=304,Mu=306,Ah=1e3,Gs=1001,Ch=1002,ki=1003,cE=1004,Xl=1005,Qi=1006,nf=1007,Ws=1008,Lr=1009,wv=1010,Av=1011,xl=1012,$d=1013,io=1014,Er=1015,El=1016,qd=1017,Kd=1018,sa=1020,Cv=35902,Rv=1021,Pv=1022,Fi=1023,Dv=1024,Lv=1025,$o=1026,oa=1027,Iv=1028,jd=1029,Uv=1030,Zd=1031,Jd=1033,Rc=33776,Pc=33777,Dc=33778,Lc=33779,Rh=35840,Ph=35841,Dh=35842,Lh=35843,Ih=36196,Uh=37492,Nh=37496,Oh=37808,Fh=37809,Bh=37810,kh=37811,zh=37812,Hh=37813,Vh=37814,Gh=37815,Wh=37816,Xh=37817,Yh=37818,$h=37819,qh=37820,Kh=37821,Ic=36492,jh=36494,Zh=36495,Nv=36283,Jh=36284,Qh=36285,ed=36286,uE=3200,fE=3201,Ov=0,hE=1,Kr="",ai="srgb",la="srgb-linear",bu="linear",wt="srgb",fo=7680,Lm=519,dE=512,pE=513,mE=514,Fv=515,_E=516,gE=517,vE=518,xE=519,Im=35044,Um="300 es",Tr=2e3,iu=2001;class ca{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const xn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Nm=1234567;const el=Math.PI/180,yl=180/Math.PI;function ua(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(xn[n&255]+xn[n>>8&255]+xn[n>>16&255]+xn[n>>24&255]+"-"+xn[e&255]+xn[e>>8&255]+"-"+xn[e>>16&15|64]+xn[e>>24&255]+"-"+xn[t&63|128]+xn[t>>8&255]+"-"+xn[t>>16&255]+xn[t>>24&255]+xn[i&255]+xn[i>>8&255]+xn[i>>16&255]+xn[i>>24&255]).toLowerCase()}function Bn(n,e,t){return Math.max(e,Math.min(t,n))}function Qd(n,e){return(n%e+e)%e}function yE(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function SE(n,e,t){return n!==e?(t-n)/(e-n):0}function tl(n,e,t){return(1-t)*n+t*e}function ME(n,e,t,i){return tl(n,e,1-Math.exp(-t*i))}function bE(n,e=1){return e-Math.abs(Qd(n,e*2)-e)}function EE(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function TE(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function wE(n,e){return n+Math.floor(Math.random()*(e-n+1))}function AE(n,e){return n+Math.random()*(e-n)}function CE(n){return n*(.5-Math.random())}function RE(n){n!==void 0&&(Nm=n);let e=Nm+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function PE(n){return n*el}function DE(n){return n*yl}function LE(n){return(n&n-1)===0&&n!==0}function IE(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function UE(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function NE(n,e,t,i,r){const s=Math.cos,o=Math.sin,a=s(t/2),l=o(t/2),c=s((e+i)/2),u=o((e+i)/2),f=s((e-i)/2),h=o((e-i)/2),d=s((i-e)/2),_=o((i-e)/2);switch(r){case"XYX":n.set(a*u,l*f,l*h,a*c);break;case"YZY":n.set(l*h,a*u,l*f,a*c);break;case"ZXZ":n.set(l*f,l*h,a*u,a*c);break;case"XZX":n.set(a*u,l*_,l*d,a*c);break;case"YXY":n.set(l*d,a*u,l*_,a*c);break;case"ZYZ":n.set(l*_,l*d,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Po(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Ln(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Om={DEG2RAD:el,RAD2DEG:yl,generateUUID:ua,clamp:Bn,euclideanModulo:Qd,mapLinear:yE,inverseLerp:SE,lerp:tl,damp:ME,pingpong:bE,smoothstep:EE,smootherstep:TE,randInt:wE,randFloat:AE,randFloatSpread:CE,seededRandom:RE,degToRad:PE,radToDeg:DE,isPowerOfTwo:LE,ceilPowerOfTwo:IE,floorPowerOfTwo:UE,setQuaternionFromProperEuler:NE,normalize:Ln,denormalize:Po};class mt{constructor(e=0,t=0){mt.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Bn(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class st{constructor(e,t,i,r,s,o,a,l,c){st.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c)}set(e,t,i,r,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],f=i[7],h=i[2],d=i[5],_=i[8],g=r[0],m=r[3],p=r[6],y=r[1],M=r[4],v=r[7],R=r[2],w=r[5],T=r[8];return s[0]=o*g+a*y+l*R,s[3]=o*m+a*M+l*w,s[6]=o*p+a*v+l*T,s[1]=c*g+u*y+f*R,s[4]=c*m+u*M+f*w,s[7]=c*p+u*v+f*T,s[2]=h*g+d*y+_*R,s[5]=h*m+d*M+_*w,s[8]=h*p+d*v+_*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-i*s*u+i*a*l+r*s*c-r*o*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],f=u*o-a*c,h=a*l-u*s,d=c*s-o*l,_=t*f+i*h+r*d;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return e[0]=f*g,e[1]=(r*c-u*i)*g,e[2]=(a*i-r*o)*g,e[3]=h*g,e[4]=(u*t-r*l)*g,e[5]=(r*s-a*t)*g,e[6]=d*g,e[7]=(i*l-c*t)*g,e[8]=(o*t-i*s)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(rf.makeScale(e,t)),this}rotate(e){return this.premultiply(rf.makeRotation(-e)),this}translate(e,t){return this.premultiply(rf.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const rf=new st;function Bv(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function ru(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function OE(){const n=ru("canvas");return n.style.display="block",n}const Fm={};function Ia(n){n in Fm||(Fm[n]=!0,console.warn(n))}function FE(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}function BE(n){const e=n.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function kE(n){const e=n.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const pt={enabled:!0,workingColorSpace:la,spaces:{},convert:function(n,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===wt&&(n.r=Ar(n.r),n.g=Ar(n.g),n.b=Ar(n.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(n.applyMatrix3(this.spaces[e].toXYZ),n.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===wt&&(n.r=qo(n.r),n.g=qo(n.g),n.b=qo(n.b))),n},fromWorkingColorSpace:function(n,e){return this.convert(n,this.workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Kr?bu:this.spaces[n].transfer},getLuminanceCoefficients:function(n,e=this.workingColorSpace){return n.fromArray(this.spaces[e].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,e,t){return n.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function Ar(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function qo(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}const Bm=[.64,.33,.3,.6,.15,.06],km=[.2126,.7152,.0722],zm=[.3127,.329],Hm=new st().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Vm=new st().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);pt.define({[la]:{primaries:Bm,whitePoint:zm,transfer:bu,toXYZ:Hm,fromXYZ:Vm,luminanceCoefficients:km,workingColorSpaceConfig:{unpackColorSpace:ai},outputColorSpaceConfig:{drawingBufferColorSpace:ai}},[ai]:{primaries:Bm,whitePoint:zm,transfer:wt,toXYZ:Hm,fromXYZ:Vm,luminanceCoefficients:km,outputColorSpaceConfig:{drawingBufferColorSpace:ai}}});let ho;class zE{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ho===void 0&&(ho=ru("canvas")),ho.width=e.width,ho.height=e.height;const i=ho.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=ho}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ru("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Ar(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Ar(t[i]/255)*255):t[i]=Ar(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let HE=0;class kv{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:HE++}),this.uuid=ua(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(sf(r[o].image)):s.push(sf(r[o]))}else s=sf(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function sf(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?zE.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let VE=0;class Zn extends ca{constructor(e=Zn.DEFAULT_IMAGE,t=Zn.DEFAULT_MAPPING,i=Gs,r=Gs,s=Qi,o=Ws,a=Fi,l=Lr,c=Zn.DEFAULT_ANISOTROPY,u=Kr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:VE++}),this.uuid=ua(),this.name="",this.source=new kv(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new mt(0,0),this.repeat=new mt(1,1),this.center=new mt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new st,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Tv)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ah:e.x=e.x-Math.floor(e.x);break;case Gs:e.x=e.x<0?0:1;break;case Ch:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ah:e.y=e.y-Math.floor(e.y);break;case Gs:e.y=e.y<0?0:1;break;case Ch:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Zn.DEFAULT_IMAGE=null;Zn.DEFAULT_MAPPING=Tv;Zn.DEFAULT_ANISOTROPY=1;class Yt{constructor(e=0,t=0,i=0,r=1){Yt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],u=l[4],f=l[8],h=l[1],d=l[5],_=l[9],g=l[2],m=l[6],p=l[10];if(Math.abs(u-h)<.01&&Math.abs(f-g)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+g)<.1&&Math.abs(_+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const M=(c+1)/2,v=(d+1)/2,R=(p+1)/2,w=(u+h)/4,T=(f+g)/4,D=(_+m)/4;return M>v&&M>R?M<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(M),r=w/i,s=T/i):v>R?v<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(v),i=w/r,s=D/r):R<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(R),i=T/s,r=D/s),this.set(i,r,s,t),this}let y=Math.sqrt((m-_)*(m-_)+(f-g)*(f-g)+(h-u)*(h-u));return Math.abs(y)<.001&&(y=1),this.x=(m-_)/y,this.y=(f-g)/y,this.z=(h-u)/y,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class GE extends ca{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Yt(0,0,e,t),this.scissorTest=!1,this.viewport=new Yt(0,0,e,t);const r={width:e,height:t,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Qi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new Zn(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new kv(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ro extends GE{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class zv extends Zn{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=ki,this.minFilter=ki,this.wrapR=Gs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class WE extends Zn{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=ki,this.minFilter=ki,this.wrapR=Gs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Tl{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,o,a){let l=i[r+0],c=i[r+1],u=i[r+2],f=i[r+3];const h=s[o+0],d=s[o+1],_=s[o+2],g=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f;return}if(a===1){e[t+0]=h,e[t+1]=d,e[t+2]=_,e[t+3]=g;return}if(f!==g||l!==h||c!==d||u!==_){let m=1-a;const p=l*h+c*d+u*_+f*g,y=p>=0?1:-1,M=1-p*p;if(M>Number.EPSILON){const R=Math.sqrt(M),w=Math.atan2(R,p*y);m=Math.sin(m*w)/R,a=Math.sin(a*w)/R}const v=a*y;if(l=l*m+h*v,c=c*m+d*v,u=u*m+_*v,f=f*m+g*v,m===1-a){const R=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=R,c*=R,u*=R,f*=R}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],u=i[r+3],f=s[o],h=s[o+1],d=s[o+2],_=s[o+3];return e[t]=a*_+u*f+l*d-c*h,e[t+1]=l*_+u*h+c*f-a*d,e[t+2]=c*_+u*d+a*h-l*f,e[t+3]=u*_-a*f-l*h-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(r/2),f=a(s/2),h=l(i/2),d=l(r/2),_=l(s/2);switch(o){case"XYZ":this._x=h*u*f+c*d*_,this._y=c*d*f-h*u*_,this._z=c*u*_+h*d*f,this._w=c*u*f-h*d*_;break;case"YXZ":this._x=h*u*f+c*d*_,this._y=c*d*f-h*u*_,this._z=c*u*_-h*d*f,this._w=c*u*f+h*d*_;break;case"ZXY":this._x=h*u*f-c*d*_,this._y=c*d*f+h*u*_,this._z=c*u*_+h*d*f,this._w=c*u*f-h*d*_;break;case"ZYX":this._x=h*u*f-c*d*_,this._y=c*d*f+h*u*_,this._z=c*u*_-h*d*f,this._w=c*u*f+h*d*_;break;case"YZX":this._x=h*u*f+c*d*_,this._y=c*d*f+h*u*_,this._z=c*u*_-h*d*f,this._w=c*u*f-h*d*_;break;case"XZY":this._x=h*u*f-c*d*_,this._y=c*d*f-h*u*_,this._z=c*u*_+h*d*f,this._w=c*u*f+h*d*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],f=t[10],h=i+a+f;if(h>0){const d=.5/Math.sqrt(h+1);this._w=.25/d,this._x=(u-l)*d,this._y=(s-c)*d,this._z=(o-r)*d}else if(i>a&&i>f){const d=2*Math.sqrt(1+i-a-f);this._w=(u-l)/d,this._x=.25*d,this._y=(r+o)/d,this._z=(s+c)/d}else if(a>f){const d=2*Math.sqrt(1+a-i-f);this._w=(s-c)/d,this._x=(r+o)/d,this._y=.25*d,this._z=(l+u)/d}else{const d=2*Math.sqrt(1+f-i-a);this._w=(o-r)/d,this._x=(s+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Bn(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-i*c,this._z=s*u+o*c+i*l-r*a,this._w=o*u-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const d=1-t;return this._w=d*o+t*this._w,this._x=d*i+t*this._x,this._y=d*r+t*this._y,this._z=d*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),f=Math.sin((1-t)*u)/c,h=Math.sin(t*u)/c;return this._w=o*f+this._w*h,this._x=i*f+this._x*h,this._y=r*f+this._y*h,this._z=s*f+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class J{constructor(e=0,t=0,i=0){J.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Gm.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Gm.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),u=2*(a*t-s*r),f=2*(s*i-o*t);return this.x=t+l*c+o*f-a*u,this.y=i+l*u+a*c-s*f,this.z=r+l*f+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return of.copy(this).projectOnVector(e),this.sub(of)}reflect(e){return this.sub(of.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Bn(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const of=new J,Gm=new Tl;class wl{constructor(e=new J(1/0,1/0,1/0),t=new J(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Di.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Di.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Di.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Di):Di.fromBufferAttribute(s,o),Di.applyMatrix4(e.matrixWorld),this.expandByPoint(Di);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Yl.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Yl.copy(i.boundingBox)),Yl.applyMatrix4(e.matrixWorld),this.union(Yl)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Di),Di.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Sa),$l.subVectors(this.max,Sa),po.subVectors(e.a,Sa),mo.subVectors(e.b,Sa),_o.subVectors(e.c,Sa),zr.subVectors(mo,po),Hr.subVectors(_o,mo),ws.subVectors(po,_o);let t=[0,-zr.z,zr.y,0,-Hr.z,Hr.y,0,-ws.z,ws.y,zr.z,0,-zr.x,Hr.z,0,-Hr.x,ws.z,0,-ws.x,-zr.y,zr.x,0,-Hr.y,Hr.x,0,-ws.y,ws.x,0];return!af(t,po,mo,_o,$l)||(t=[1,0,0,0,1,0,0,0,1],!af(t,po,mo,_o,$l))?!1:(ql.crossVectors(zr,Hr),t=[ql.x,ql.y,ql.z],af(t,po,mo,_o,$l))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Di).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Di).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(lr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),lr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),lr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),lr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),lr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),lr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),lr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),lr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(lr),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const lr=[new J,new J,new J,new J,new J,new J,new J,new J],Di=new J,Yl=new wl,po=new J,mo=new J,_o=new J,zr=new J,Hr=new J,ws=new J,Sa=new J,$l=new J,ql=new J,As=new J;function af(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){As.fromArray(n,s);const a=r.x*Math.abs(As.x)+r.y*Math.abs(As.y)+r.z*Math.abs(As.z),l=e.dot(As),c=t.dot(As),u=i.dot(As);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const XE=new wl,Ma=new J,lf=new J;class Eu{constructor(e=new J,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):XE.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ma.subVectors(e,this.center);const t=Ma.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Ma,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(lf.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ma.copy(e.center).add(lf)),this.expandByPoint(Ma.copy(e.center).sub(lf))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const cr=new J,cf=new J,Kl=new J,Vr=new J,uf=new J,jl=new J,ff=new J;class Hv{constructor(e=new J,t=new J(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,cr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=cr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(cr.copy(this.origin).addScaledVector(this.direction,t),cr.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){cf.copy(e).add(t).multiplyScalar(.5),Kl.copy(t).sub(e).normalize(),Vr.copy(this.origin).sub(cf);const s=e.distanceTo(t)*.5,o=-this.direction.dot(Kl),a=Vr.dot(this.direction),l=-Vr.dot(Kl),c=Vr.lengthSq(),u=Math.abs(1-o*o);let f,h,d,_;if(u>0)if(f=o*l-a,h=o*a-l,_=s*u,f>=0)if(h>=-_)if(h<=_){const g=1/u;f*=g,h*=g,d=f*(f+o*h+2*a)+h*(o*f+h+2*l)+c}else h=s,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*l)+c;else h=-s,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*l)+c;else h<=-_?(f=Math.max(0,-(-o*s+a)),h=f>0?-s:Math.min(Math.max(-s,-l),s),d=-f*f+h*(h+2*l)+c):h<=_?(f=0,h=Math.min(Math.max(-s,-l),s),d=h*(h+2*l)+c):(f=Math.max(0,-(o*s+a)),h=f>0?s:Math.min(Math.max(-s,-l),s),d=-f*f+h*(h+2*l)+c);else h=o>0?-s:s,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(cf).addScaledVector(Kl,h),d}intersectSphere(e,t){cr.subVectors(e.center,this.origin);const i=cr.dot(this.direction),r=cr.dot(cr)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,r=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,r=(e.min.x-h.x)*c),u>=0?(s=(e.min.y-h.y)*u,o=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,o=(e.min.y-h.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),f>=0?(a=(e.min.z-h.z)*f,l=(e.max.z-h.z)*f):(a=(e.max.z-h.z)*f,l=(e.min.z-h.z)*f),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,cr)!==null}intersectTriangle(e,t,i,r,s){uf.subVectors(t,e),jl.subVectors(i,e),ff.crossVectors(uf,jl);let o=this.direction.dot(ff),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Vr.subVectors(this.origin,e);const l=a*this.direction.dot(jl.crossVectors(Vr,jl));if(l<0)return null;const c=a*this.direction.dot(uf.cross(Vr));if(c<0||l+c>o)return null;const u=-a*Vr.dot(ff);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Wt{constructor(e,t,i,r,s,o,a,l,c,u,f,h,d,_,g,m){Wt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c,u,f,h,d,_,g,m)}set(e,t,i,r,s,o,a,l,c,u,f,h,d,_,g,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=r,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=f,p[14]=h,p[3]=d,p[7]=_,p[11]=g,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Wt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/go.setFromMatrixColumn(e,0).length(),s=1/go.setFromMatrixColumn(e,1).length(),o=1/go.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const h=o*u,d=o*f,_=a*u,g=a*f;t[0]=l*u,t[4]=-l*f,t[8]=c,t[1]=d+_*c,t[5]=h-g*c,t[9]=-a*l,t[2]=g-h*c,t[6]=_+d*c,t[10]=o*l}else if(e.order==="YXZ"){const h=l*u,d=l*f,_=c*u,g=c*f;t[0]=h+g*a,t[4]=_*a-d,t[8]=o*c,t[1]=o*f,t[5]=o*u,t[9]=-a,t[2]=d*a-_,t[6]=g+h*a,t[10]=o*l}else if(e.order==="ZXY"){const h=l*u,d=l*f,_=c*u,g=c*f;t[0]=h-g*a,t[4]=-o*f,t[8]=_+d*a,t[1]=d+_*a,t[5]=o*u,t[9]=g-h*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const h=o*u,d=o*f,_=a*u,g=a*f;t[0]=l*u,t[4]=_*c-d,t[8]=h*c+g,t[1]=l*f,t[5]=g*c+h,t[9]=d*c-_,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const h=o*l,d=o*c,_=a*l,g=a*c;t[0]=l*u,t[4]=g-h*f,t[8]=_*f+d,t[1]=f,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=d*f+_,t[10]=h-g*f}else if(e.order==="XZY"){const h=o*l,d=o*c,_=a*l,g=a*c;t[0]=l*u,t[4]=-f,t[8]=c*u,t[1]=h*f+g,t[5]=o*u,t[9]=d*f-_,t[2]=_*f-d,t[6]=a*u,t[10]=g*f+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(YE,e,$E)}lookAt(e,t,i){const r=this.elements;return ti.subVectors(e,t),ti.lengthSq()===0&&(ti.z=1),ti.normalize(),Gr.crossVectors(i,ti),Gr.lengthSq()===0&&(Math.abs(i.z)===1?ti.x+=1e-4:ti.z+=1e-4,ti.normalize(),Gr.crossVectors(i,ti)),Gr.normalize(),Zl.crossVectors(ti,Gr),r[0]=Gr.x,r[4]=Zl.x,r[8]=ti.x,r[1]=Gr.y,r[5]=Zl.y,r[9]=ti.y,r[2]=Gr.z,r[6]=Zl.z,r[10]=ti.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],f=i[5],h=i[9],d=i[13],_=i[2],g=i[6],m=i[10],p=i[14],y=i[3],M=i[7],v=i[11],R=i[15],w=r[0],T=r[4],D=r[8],S=r[12],x=r[1],P=r[5],U=r[9],k=r[13],Y=r[2],te=r[6],W=r[10],X=r[14],V=r[3],ae=r[7],N=r[11],ge=r[15];return s[0]=o*w+a*x+l*Y+c*V,s[4]=o*T+a*P+l*te+c*ae,s[8]=o*D+a*U+l*W+c*N,s[12]=o*S+a*k+l*X+c*ge,s[1]=u*w+f*x+h*Y+d*V,s[5]=u*T+f*P+h*te+d*ae,s[9]=u*D+f*U+h*W+d*N,s[13]=u*S+f*k+h*X+d*ge,s[2]=_*w+g*x+m*Y+p*V,s[6]=_*T+g*P+m*te+p*ae,s[10]=_*D+g*U+m*W+p*N,s[14]=_*S+g*k+m*X+p*ge,s[3]=y*w+M*x+v*Y+R*V,s[7]=y*T+M*P+v*te+R*ae,s[11]=y*D+M*U+v*W+R*N,s[15]=y*S+M*k+v*X+R*ge,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],f=e[6],h=e[10],d=e[14],_=e[3],g=e[7],m=e[11],p=e[15];return _*(+s*l*f-r*c*f-s*a*h+i*c*h+r*a*d-i*l*d)+g*(+t*l*d-t*c*h+s*o*h-r*o*d+r*c*u-s*l*u)+m*(+t*c*f-t*a*d-s*o*f+i*o*d+s*a*u-i*c*u)+p*(-r*a*u-t*l*f+t*a*h+r*o*f-i*o*h+i*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],f=e[9],h=e[10],d=e[11],_=e[12],g=e[13],m=e[14],p=e[15],y=f*m*c-g*h*c+g*l*d-a*m*d-f*l*p+a*h*p,M=_*h*c-u*m*c-_*l*d+o*m*d+u*l*p-o*h*p,v=u*g*c-_*f*c+_*a*d-o*g*d-u*a*p+o*f*p,R=_*f*l-u*g*l-_*a*h+o*g*h+u*a*m-o*f*m,w=t*y+i*M+r*v+s*R;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/w;return e[0]=y*T,e[1]=(g*h*s-f*m*s-g*r*d+i*m*d+f*r*p-i*h*p)*T,e[2]=(a*m*s-g*l*s+g*r*c-i*m*c-a*r*p+i*l*p)*T,e[3]=(f*l*s-a*h*s-f*r*c+i*h*c+a*r*d-i*l*d)*T,e[4]=M*T,e[5]=(u*m*s-_*h*s+_*r*d-t*m*d-u*r*p+t*h*p)*T,e[6]=(_*l*s-o*m*s-_*r*c+t*m*c+o*r*p-t*l*p)*T,e[7]=(o*h*s-u*l*s+u*r*c-t*h*c-o*r*d+t*l*d)*T,e[8]=v*T,e[9]=(_*f*s-u*g*s-_*i*d+t*g*d+u*i*p-t*f*p)*T,e[10]=(o*g*s-_*a*s+_*i*c-t*g*c-o*i*p+t*a*p)*T,e[11]=(u*a*s-o*f*s-u*i*c+t*f*c+o*i*d-t*a*d)*T,e[12]=R*T,e[13]=(u*g*r-_*f*r+_*i*h-t*g*h-u*i*m+t*f*m)*T,e[14]=(_*a*r-o*g*r-_*i*l+t*g*l+o*i*m-t*a*m)*T,e[15]=(o*f*r-u*a*r+u*i*l-t*f*l-o*i*h+t*a*h)*T,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+i,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,f=a+a,h=s*c,d=s*u,_=s*f,g=o*u,m=o*f,p=a*f,y=l*c,M=l*u,v=l*f,R=i.x,w=i.y,T=i.z;return r[0]=(1-(g+p))*R,r[1]=(d+v)*R,r[2]=(_-M)*R,r[3]=0,r[4]=(d-v)*w,r[5]=(1-(h+p))*w,r[6]=(m+y)*w,r[7]=0,r[8]=(_+M)*T,r[9]=(m-y)*T,r[10]=(1-(h+g))*T,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=go.set(r[0],r[1],r[2]).length();const o=go.set(r[4],r[5],r[6]).length(),a=go.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Li.copy(this);const c=1/s,u=1/o,f=1/a;return Li.elements[0]*=c,Li.elements[1]*=c,Li.elements[2]*=c,Li.elements[4]*=u,Li.elements[5]*=u,Li.elements[6]*=u,Li.elements[8]*=f,Li.elements[9]*=f,Li.elements[10]*=f,t.setFromRotationMatrix(Li),i.x=s,i.y=o,i.z=a,this}makePerspective(e,t,i,r,s,o,a=Tr){const l=this.elements,c=2*s/(t-e),u=2*s/(i-r),f=(t+e)/(t-e),h=(i+r)/(i-r);let d,_;if(a===Tr)d=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===iu)d=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,s,o,a=Tr){const l=this.elements,c=1/(t-e),u=1/(i-r),f=1/(o-s),h=(t+e)*c,d=(i+r)*u;let _,g;if(a===Tr)_=(o+s)*f,g=-2*f;else if(a===iu)_=s*f,g=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=g,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const go=new J,Li=new Wt,YE=new J(0,0,0),$E=new J(1,1,1),Gr=new J,Zl=new J,ti=new J,Wm=new Wt,Xm=new Tl;class ir{constructor(e=0,t=0,i=0,r=ir.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],f=r[2],h=r[6],d=r[10];switch(t){case"XYZ":this._y=Math.asin(Bn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Bn(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(Bn(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Bn(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Bn(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Bn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Wm.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Wm,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Xm.setFromEuler(this),this.setFromQuaternion(Xm,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ir.DEFAULT_ORDER="XYZ";class Vv{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let qE=0;const Ym=new J,vo=new Tl,ur=new Wt,Jl=new J,ba=new J,KE=new J,jE=new Tl,$m=new J(1,0,0),qm=new J(0,1,0),Km=new J(0,0,1),jm={type:"added"},ZE={type:"removed"},xo={type:"childadded",child:null},hf={type:"childremoved",child:null};class _n extends ca{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:qE++}),this.uuid=ua(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=_n.DEFAULT_UP.clone();const e=new J,t=new ir,i=new Tl,r=new J(1,1,1);function s(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Wt},normalMatrix:{value:new st}}),this.matrix=new Wt,this.matrixWorld=new Wt,this.matrixAutoUpdate=_n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=_n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Vv,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return vo.setFromAxisAngle(e,t),this.quaternion.multiply(vo),this}rotateOnWorldAxis(e,t){return vo.setFromAxisAngle(e,t),this.quaternion.premultiply(vo),this}rotateX(e){return this.rotateOnAxis($m,e)}rotateY(e){return this.rotateOnAxis(qm,e)}rotateZ(e){return this.rotateOnAxis(Km,e)}translateOnAxis(e,t){return Ym.copy(e).applyQuaternion(this.quaternion),this.position.add(Ym.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis($m,e)}translateY(e){return this.translateOnAxis(qm,e)}translateZ(e){return this.translateOnAxis(Km,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ur.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Jl.copy(e):Jl.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),ba.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ur.lookAt(ba,Jl,this.up):ur.lookAt(Jl,ba,this.up),this.quaternion.setFromRotationMatrix(ur),r&&(ur.extractRotation(r.matrixWorld),vo.setFromRotationMatrix(ur),this.quaternion.premultiply(vo.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(jm),xo.child=e,this.dispatchEvent(xo),xo.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ZE),hf.child=e,this.dispatchEvent(hf),hf.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ur.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ur.multiply(e.parent.matrixWorld)),e.applyMatrix4(ur),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(jm),xo.child=e,this.dispatchEvent(xo),xo.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ba,e,KE),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ba,jE,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),f=o(e.shapes),h=o(e.skeletons),d=o(e.animations),_=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),d.length>0&&(i.animations=d),_.length>0&&(i.nodes=_)}return i.object=r,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}_n.DEFAULT_UP=new J(0,1,0);_n.DEFAULT_MATRIX_AUTO_UPDATE=!0;_n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Ii=new J,fr=new J,df=new J,hr=new J,yo=new J,So=new J,Zm=new J,pf=new J,mf=new J,_f=new J,gf=new Yt,vf=new Yt,xf=new Yt;class Oi{constructor(e=new J,t=new J,i=new J){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Ii.subVectors(e,t),r.cross(Ii);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Ii.subVectors(r,t),fr.subVectors(i,t),df.subVectors(e,t);const o=Ii.dot(Ii),a=Ii.dot(fr),l=Ii.dot(df),c=fr.dot(fr),u=fr.dot(df),f=o*c-a*a;if(f===0)return s.set(0,0,0),null;const h=1/f,d=(c*l-a*u)*h,_=(o*u-a*l)*h;return s.set(1-d-_,_,d)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,hr)===null?!1:hr.x>=0&&hr.y>=0&&hr.x+hr.y<=1}static getInterpolation(e,t,i,r,s,o,a,l){return this.getBarycoord(e,t,i,r,hr)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,hr.x),l.addScaledVector(o,hr.y),l.addScaledVector(a,hr.z),l)}static getInterpolatedAttribute(e,t,i,r,s,o){return gf.setScalar(0),vf.setScalar(0),xf.setScalar(0),gf.fromBufferAttribute(e,t),vf.fromBufferAttribute(e,i),xf.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(gf,s.x),o.addScaledVector(vf,s.y),o.addScaledVector(xf,s.z),o}static isFrontFacing(e,t,i,r){return Ii.subVectors(i,t),fr.subVectors(e,t),Ii.cross(fr).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ii.subVectors(this.c,this.b),fr.subVectors(this.a,this.b),Ii.cross(fr).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Oi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Oi.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return Oi.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return Oi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Oi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let o,a;yo.subVectors(r,i),So.subVectors(s,i),pf.subVectors(e,i);const l=yo.dot(pf),c=So.dot(pf);if(l<=0&&c<=0)return t.copy(i);mf.subVectors(e,r);const u=yo.dot(mf),f=So.dot(mf);if(u>=0&&f<=u)return t.copy(r);const h=l*f-u*c;if(h<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(i).addScaledVector(yo,o);_f.subVectors(e,s);const d=yo.dot(_f),_=So.dot(_f);if(_>=0&&d<=_)return t.copy(s);const g=d*c-l*_;if(g<=0&&c>=0&&_<=0)return a=c/(c-_),t.copy(i).addScaledVector(So,a);const m=u*_-d*f;if(m<=0&&f-u>=0&&d-_>=0)return Zm.subVectors(s,r),a=(f-u)/(f-u+(d-_)),t.copy(r).addScaledVector(Zm,a);const p=1/(m+g+h);return o=g*p,a=h*p,t.copy(i).addScaledVector(yo,o).addScaledVector(So,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Gv={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Wr={h:0,s:0,l:0},Ql={h:0,s:0,l:0};function yf(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class ht{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ai){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,pt.toWorkingColorSpace(this,t),this}setRGB(e,t,i,r=pt.workingColorSpace){return this.r=e,this.g=t,this.b=i,pt.toWorkingColorSpace(this,r),this}setHSL(e,t,i,r=pt.workingColorSpace){if(e=Qd(e,1),t=Bn(t,0,1),i=Bn(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=yf(o,s,e+1/3),this.g=yf(o,s,e),this.b=yf(o,s,e-1/3)}return pt.toWorkingColorSpace(this,r),this}setStyle(e,t=ai){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ai){const i=Gv[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ar(e.r),this.g=Ar(e.g),this.b=Ar(e.b),this}copyLinearToSRGB(e){return this.r=qo(e.r),this.g=qo(e.g),this.b=qo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ai){return pt.fromWorkingColorSpace(yn.copy(this),e),Math.round(Bn(yn.r*255,0,255))*65536+Math.round(Bn(yn.g*255,0,255))*256+Math.round(Bn(yn.b*255,0,255))}getHexString(e=ai){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=pt.workingColorSpace){pt.fromWorkingColorSpace(yn.copy(this),t);const i=yn.r,r=yn.g,s=yn.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const f=o-a;switch(c=u<=.5?f/(o+a):f/(2-o-a),o){case i:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-i)/f+2;break;case s:l=(i-r)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=pt.workingColorSpace){return pt.fromWorkingColorSpace(yn.copy(this),t),e.r=yn.r,e.g=yn.g,e.b=yn.b,e}getStyle(e=ai){pt.fromWorkingColorSpace(yn.copy(this),e);const t=yn.r,i=yn.g,r=yn.b;return e!==ai?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Wr),this.setHSL(Wr.h+e,Wr.s+t,Wr.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Wr),e.getHSL(Ql);const i=tl(Wr.h,Ql.h,t),r=tl(Wr.s,Ql.s,t),s=tl(Wr.l,Ql.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const yn=new ht;ht.NAMES=Gv;let JE=0;class fa extends ca{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:JE++}),this.uuid=ua(),this.name="",this.blending=Yo,this.side=ms,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=_h,this.blendDst=gh,this.blendEquation=ks,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ht(0,0,0),this.blendAlpha=0,this.depthFunc=na,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Lm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=fo,this.stencilZFail=fo,this.stencilZPass=fo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Yo&&(i.blending=this.blending),this.side!==ms&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==_h&&(i.blendSrc=this.blendSrc),this.blendDst!==gh&&(i.blendDst=this.blendDst),this.blendEquation!==ks&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==na&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Lm&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==fo&&(i.stencilFail=this.stencilFail),this.stencilZFail!==fo&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==fo&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class su extends fa{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new ht(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ir,this.combine=bv,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Jt=new J,ec=new mt;class zi{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Im,this.updateRanges=[],this.gpuType=Er,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)ec.fromBufferAttribute(this,t),ec.applyMatrix3(e),this.setXY(t,ec.x,ec.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Jt.fromBufferAttribute(this,t),Jt.applyMatrix3(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Jt.fromBufferAttribute(this,t),Jt.applyMatrix4(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Jt.fromBufferAttribute(this,t),Jt.applyNormalMatrix(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Jt.fromBufferAttribute(this,t),Jt.transformDirection(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Po(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Ln(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Po(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ln(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Po(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ln(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Po(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ln(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Po(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ln(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Ln(t,this.array),i=Ln(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=Ln(t,this.array),i=Ln(i,this.array),r=Ln(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=Ln(t,this.array),i=Ln(i,this.array),r=Ln(r,this.array),s=Ln(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Im&&(e.usage=this.usage),e}}class Wv extends zi{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Xv extends zi{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class gn extends zi{constructor(e,t,i){super(new Float32Array(e),t,i)}}let QE=0;const vi=new Wt,Sf=new _n,Mo=new J,ni=new wl,Ea=new wl,ln=new J;class Ri extends ca{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:QE++}),this.uuid=ua(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Bv(e)?Xv:Wv)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new st().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return vi.makeRotationFromQuaternion(e),this.applyMatrix4(vi),this}rotateX(e){return vi.makeRotationX(e),this.applyMatrix4(vi),this}rotateY(e){return vi.makeRotationY(e),this.applyMatrix4(vi),this}rotateZ(e){return vi.makeRotationZ(e),this.applyMatrix4(vi),this}translate(e,t,i){return vi.makeTranslation(e,t,i),this.applyMatrix4(vi),this}scale(e,t,i){return vi.makeScale(e,t,i),this.applyMatrix4(vi),this}lookAt(e){return Sf.lookAt(e),Sf.updateMatrix(),this.applyMatrix4(Sf.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Mo).negate(),this.translate(Mo.x,Mo.y,Mo.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new gn(i,3))}else{for(let i=0,r=t.count;i<r;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new wl);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new J(-1/0,-1/0,-1/0),new J(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];ni.setFromBufferAttribute(s),this.morphTargetsRelative?(ln.addVectors(this.boundingBox.min,ni.min),this.boundingBox.expandByPoint(ln),ln.addVectors(this.boundingBox.max,ni.max),this.boundingBox.expandByPoint(ln)):(this.boundingBox.expandByPoint(ni.min),this.boundingBox.expandByPoint(ni.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Eu);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new J,1/0);return}if(e){const i=this.boundingSphere.center;if(ni.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];Ea.setFromBufferAttribute(a),this.morphTargetsRelative?(ln.addVectors(ni.min,Ea.min),ni.expandByPoint(ln),ln.addVectors(ni.max,Ea.max),ni.expandByPoint(ln)):(ni.expandByPoint(Ea.min),ni.expandByPoint(Ea.max))}ni.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)ln.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(ln));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)ln.fromBufferAttribute(a,c),l&&(Mo.fromBufferAttribute(e,c),ln.add(Mo)),r=Math.max(r,i.distanceToSquared(ln))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new zi(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let D=0;D<i.count;D++)a[D]=new J,l[D]=new J;const c=new J,u=new J,f=new J,h=new mt,d=new mt,_=new mt,g=new J,m=new J;function p(D,S,x){c.fromBufferAttribute(i,D),u.fromBufferAttribute(i,S),f.fromBufferAttribute(i,x),h.fromBufferAttribute(s,D),d.fromBufferAttribute(s,S),_.fromBufferAttribute(s,x),u.sub(c),f.sub(c),d.sub(h),_.sub(h);const P=1/(d.x*_.y-_.x*d.y);isFinite(P)&&(g.copy(u).multiplyScalar(_.y).addScaledVector(f,-d.y).multiplyScalar(P),m.copy(f).multiplyScalar(d.x).addScaledVector(u,-_.x).multiplyScalar(P),a[D].add(g),a[S].add(g),a[x].add(g),l[D].add(m),l[S].add(m),l[x].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let D=0,S=y.length;D<S;++D){const x=y[D],P=x.start,U=x.count;for(let k=P,Y=P+U;k<Y;k+=3)p(e.getX(k+0),e.getX(k+1),e.getX(k+2))}const M=new J,v=new J,R=new J,w=new J;function T(D){R.fromBufferAttribute(r,D),w.copy(R);const S=a[D];M.copy(S),M.sub(R.multiplyScalar(R.dot(S))).normalize(),v.crossVectors(w,S);const P=v.dot(l[D])<0?-1:1;o.setXYZW(D,M.x,M.y,M.z,P)}for(let D=0,S=y.length;D<S;++D){const x=y[D],P=x.start,U=x.count;for(let k=P,Y=P+U;k<Y;k+=3)T(e.getX(k+0)),T(e.getX(k+1)),T(e.getX(k+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new zi(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,d=i.count;h<d;h++)i.setXYZ(h,0,0,0);const r=new J,s=new J,o=new J,a=new J,l=new J,c=new J,u=new J,f=new J;if(e)for(let h=0,d=e.count;h<d;h+=3){const _=e.getX(h+0),g=e.getX(h+1),m=e.getX(h+2);r.fromBufferAttribute(t,_),s.fromBufferAttribute(t,g),o.fromBufferAttribute(t,m),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),a.fromBufferAttribute(i,_),l.fromBufferAttribute(i,g),c.fromBufferAttribute(i,m),a.add(u),l.add(u),c.add(u),i.setXYZ(_,a.x,a.y,a.z),i.setXYZ(g,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,d=t.count;h<d;h+=3)r.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),o.fromBufferAttribute(t,h+2),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)ln.fromBufferAttribute(e,t),ln.normalize(),e.setXYZ(t,ln.x,ln.y,ln.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,f=a.normalized,h=new c.constructor(l.length*u);let d=0,_=0;for(let g=0,m=l.length;g<m;g++){a.isInterleavedBufferAttribute?d=l[g]*a.data.stride+a.offset:d=l[g]*u;for(let p=0;p<u;p++)h[_++]=c[d++]}return new zi(h,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ri,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,i);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,f=c.length;u<f;u++){const h=c[u],d=e(h,i);l.push(d)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,h=c.length;f<h;f++){const d=c[f];u.push(d.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],f=s[c];for(let h=0,d=f.length;h<d;h++)u.push(f[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const f=o[c];this.addGroup(f.start,f.count,f.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Jm=new Wt,Cs=new Hv,tc=new Eu,Qm=new J,nc=new J,ic=new J,rc=new J,Mf=new J,sc=new J,e_=new J,oc=new J;class kn extends _n{constructor(e=new Ri,t=new su){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){sc.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],f=s[l];u!==0&&(Mf.fromBufferAttribute(f,e),o?sc.addScaledVector(Mf,u):sc.addScaledVector(Mf.sub(t),u))}t.add(sc)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),tc.copy(i.boundingSphere),tc.applyMatrix4(s),Cs.copy(e.ray).recast(e.near),!(tc.containsPoint(Cs.origin)===!1&&(Cs.intersectSphere(tc,Qm)===null||Cs.origin.distanceToSquared(Qm)>(e.far-e.near)**2))&&(Jm.copy(s).invert(),Cs.copy(e.ray).applyMatrix4(Jm),!(i.boundingBox!==null&&Cs.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Cs)))}_computeIntersections(e,t,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,h=s.groups,d=s.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,g=h.length;_<g;_++){const m=h[_],p=o[m.materialIndex],y=Math.max(m.start,d.start),M=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let v=y,R=M;v<R;v+=3){const w=a.getX(v),T=a.getX(v+1),D=a.getX(v+2);r=ac(this,p,e,i,c,u,f,w,T,D),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const _=Math.max(0,d.start),g=Math.min(a.count,d.start+d.count);for(let m=_,p=g;m<p;m+=3){const y=a.getX(m),M=a.getX(m+1),v=a.getX(m+2);r=ac(this,o,e,i,c,u,f,y,M,v),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let _=0,g=h.length;_<g;_++){const m=h[_],p=o[m.materialIndex],y=Math.max(m.start,d.start),M=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let v=y,R=M;v<R;v+=3){const w=v,T=v+1,D=v+2;r=ac(this,p,e,i,c,u,f,w,T,D),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const _=Math.max(0,d.start),g=Math.min(l.count,d.start+d.count);for(let m=_,p=g;m<p;m+=3){const y=m,M=m+1,v=m+2;r=ac(this,o,e,i,c,u,f,y,M,v),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function e1(n,e,t,i,r,s,o,a){let l;if(e.side===Wn?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===ms,a),l===null)return null;oc.copy(a),oc.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(oc);return c<t.near||c>t.far?null:{distance:c,point:oc.clone(),object:n}}function ac(n,e,t,i,r,s,o,a,l,c){n.getVertexPosition(a,nc),n.getVertexPosition(l,ic),n.getVertexPosition(c,rc);const u=e1(n,e,t,i,nc,ic,rc,e_);if(u){const f=new J;Oi.getBarycoord(e_,nc,ic,rc,f),r&&(u.uv=Oi.getInterpolatedAttribute(r,a,l,c,f,new mt)),s&&(u.uv1=Oi.getInterpolatedAttribute(s,a,l,c,f,new mt)),o&&(u.normal=Oi.getInterpolatedAttribute(o,a,l,c,f,new J),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:l,c,normal:new J,materialIndex:0};Oi.getNormal(nc,ic,rc,h.normal),u.face=h,u.barycoord=f}return u}class Al extends Ri{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],f=[];let h=0,d=0;_("z","y","x",-1,-1,i,t,e,o,s,0),_("z","y","x",1,-1,i,t,-e,o,s,1),_("x","z","y",1,1,e,i,t,r,o,2),_("x","z","y",1,-1,e,i,-t,r,o,3),_("x","y","z",1,-1,e,t,i,r,s,4),_("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new gn(c,3)),this.setAttribute("normal",new gn(u,3)),this.setAttribute("uv",new gn(f,2));function _(g,m,p,y,M,v,R,w,T,D,S){const x=v/T,P=R/D,U=v/2,k=R/2,Y=w/2,te=T+1,W=D+1;let X=0,V=0;const ae=new J;for(let N=0;N<W;N++){const ge=N*P-k;for(let we=0;we<te;we++){const Be=we*x-U;ae[g]=Be*y,ae[m]=ge*M,ae[p]=Y,c.push(ae.x,ae.y,ae.z),ae[g]=0,ae[m]=0,ae[p]=w>0?1:-1,u.push(ae.x,ae.y,ae.z),f.push(we/T),f.push(1-N/D),X+=1}}for(let N=0;N<D;N++)for(let ge=0;ge<T;ge++){const we=h+ge+te*N,Be=h+ge+te*(N+1),ee=h+(ge+1)+te*(N+1),fe=h+(ge+1)+te*N;l.push(we,Be,fe),l.push(Be,ee,fe),V+=6}a.addGroup(d,V,S),d+=V,h+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Al(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function aa(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function In(n){const e={};for(let t=0;t<n.length;t++){const i=aa(n[t]);for(const r in i)e[r]=i[r]}return e}function t1(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Yv(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:pt.workingColorSpace}const n1={clone:aa,merge:In};var i1=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,r1=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class _s extends fa{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=i1,this.fragmentShader=r1,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=aa(e.uniforms),this.uniformsGroups=t1(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class $v extends _n{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Wt,this.projectionMatrix=new Wt,this.projectionMatrixInverse=new Wt,this.coordinateSystem=Tr}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Xr=new J,t_=new mt,n_=new mt;class Mi extends $v{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=yl*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(el*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return yl*2*Math.atan(Math.tan(el*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Xr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Xr.x,Xr.y).multiplyScalar(-e/Xr.z),Xr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Xr.x,Xr.y).multiplyScalar(-e/Xr.z)}getViewSize(e,t){return this.getViewBounds(e,t_,n_),t.subVectors(n_,t_)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(el*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,t-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const bo=-90,Eo=1;class s1 extends _n{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Mi(bo,Eo,e,t);r.layers=this.layers,this.add(r);const s=new Mi(bo,Eo,e,t);s.layers=this.layers,this.add(s);const o=new Mi(bo,Eo,e,t);o.layers=this.layers,this.add(o);const a=new Mi(bo,Eo,e,t);a.layers=this.layers,this.add(a);const l=new Mi(bo,Eo,e,t);l.layers=this.layers,this.add(l);const c=new Mi(bo,Eo,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===Tr)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===iu)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const g=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,o),e.setRenderTarget(i,2,r),e.render(t,a),e.setRenderTarget(i,3,r),e.render(t,l),e.setRenderTarget(i,4,r),e.render(t,c),i.texture.generateMipmaps=g,e.setRenderTarget(i,5,r),e.render(t,u),e.setRenderTarget(f,h,d),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class qv extends Zn{constructor(e,t,i,r,s,o,a,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:ia,super(e,t,i,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class o1 extends ro{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new qv(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Qi}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Al(5,5,5),s=new _s({name:"CubemapFromEquirect",uniforms:aa(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Wn,blending:os});s.uniforms.tEquirect.value=t;const o=new kn(r,s),a=t.minFilter;return t.minFilter===Ws&&(t.minFilter=Qi),new s1(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,i,r){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}}const bf=new J,a1=new J,l1=new st;class Os{constructor(e=new J(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=bf.subVectors(i,t).cross(a1.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(bf),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||l1.getNormalMatrix(e),r=this.coplanarPoint(bf).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Rs=new Eu,lc=new J;class ep{constructor(e=new Os,t=new Os,i=new Os,r=new Os,s=new Os,o=new Os){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Tr){const i=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],l=r[3],c=r[4],u=r[5],f=r[6],h=r[7],d=r[8],_=r[9],g=r[10],m=r[11],p=r[12],y=r[13],M=r[14],v=r[15];if(i[0].setComponents(l-s,h-c,m-d,v-p).normalize(),i[1].setComponents(l+s,h+c,m+d,v+p).normalize(),i[2].setComponents(l+o,h+u,m+_,v+y).normalize(),i[3].setComponents(l-o,h-u,m-_,v-y).normalize(),i[4].setComponents(l-a,h-f,m-g,v-M).normalize(),t===Tr)i[5].setComponents(l+a,h+f,m+g,v+M).normalize();else if(t===iu)i[5].setComponents(a,f,g,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Rs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Rs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Rs)}intersectsSprite(e){return Rs.center.set(0,0,0),Rs.radius=.7071067811865476,Rs.applyMatrix4(e.matrixWorld),this.intersectsSphere(Rs)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(lc.x=r.normal.x>0?e.max.x:e.min.x,lc.y=r.normal.y>0?e.max.y:e.min.y,lc.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(lc)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Kv(){let n=null,e=!1,t=null,i=null;function r(s,o){t(s,o),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function c1(n){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,f=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,u),a.onUploadCallback();let d;if(c instanceof Float32Array)d=n.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=n.SHORT;else if(c instanceof Uint32Array)d=n.UNSIGNED_INT;else if(c instanceof Int32Array)d=n.INT;else if(c instanceof Int8Array)d=n.BYTE;else if(c instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:f}}function i(a,l,c){const u=l.array,f=l.updateRanges;if(n.bindBuffer(c,a),f.length===0)n.bufferSubData(c,0,u);else{f.sort((d,_)=>d.start-_.start);let h=0;for(let d=1;d<f.length;d++){const _=f[h],g=f[d];g.start<=_.start+_.count+1?_.count=Math.max(_.count,g.start+g.count-_.start):(++h,f[h]=g)}f.length=h+1;for(let d=0,_=f.length;d<_;d++){const g=f[d];n.bufferSubData(c,g.start*u.BYTES_PER_ELEMENT,u,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(n.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}class Tu extends Ri{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(i),l=Math.floor(r),c=a+1,u=l+1,f=e/a,h=t/l,d=[],_=[],g=[],m=[];for(let p=0;p<u;p++){const y=p*h-o;for(let M=0;M<c;M++){const v=M*f-s;_.push(v,-y,0),g.push(0,0,1),m.push(M/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let y=0;y<a;y++){const M=y+c*p,v=y+c*(p+1),R=y+1+c*(p+1),w=y+1+c*p;d.push(M,v,w),d.push(v,R,w)}this.setIndex(d),this.setAttribute("position",new gn(_,3)),this.setAttribute("normal",new gn(g,3)),this.setAttribute("uv",new gn(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Tu(e.width,e.height,e.widthSegments,e.heightSegments)}}var u1=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,f1=`#ifdef USE_ALPHAHASH
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
#endif`,h1=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,d1=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,p1=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,m1=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,_1=`#ifdef USE_AOMAP
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
#endif`,g1=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,v1=`#ifdef USE_BATCHING
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
#endif`,x1=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,y1=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,S1=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,M1=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,b1=`#ifdef USE_IRIDESCENCE
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
#endif`,E1=`#ifdef USE_BUMPMAP
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
#endif`,T1=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,w1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,A1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,C1=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,R1=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,P1=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,D1=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,L1=`#if defined( USE_COLOR_ALPHA )
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
#endif`,I1=`#define PI 3.141592653589793
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
} // validated`,U1=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,N1=`vec3 transformedNormal = objectNormal;
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
#endif`,O1=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,F1=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,B1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,k1=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,z1="gl_FragColor = linearToOutputTexel( gl_FragColor );",H1=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,V1=`#ifdef USE_ENVMAP
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
#endif`,G1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,W1=`#ifdef USE_ENVMAP
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
#endif`,X1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Y1=`#ifdef USE_ENVMAP
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
#endif`,$1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,q1=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,K1=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,j1=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Z1=`#ifdef USE_GRADIENTMAP
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
}`,J1=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Q1=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,eT=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,tT=`uniform bool receiveShadow;
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
#endif`,nT=`#ifdef USE_ENVMAP
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
#endif`,iT=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,rT=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,sT=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,oT=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,aT=`PhysicalMaterial material;
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
#endif`,lT=`struct PhysicalMaterial {
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
}`,cT=`
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
#endif`,uT=`#if defined( RE_IndirectDiffuse )
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
#endif`,fT=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,hT=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,dT=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,pT=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,mT=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,_T=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,gT=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,vT=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,xT=`#if defined( USE_POINTS_UV )
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
#endif`,yT=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ST=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,MT=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,bT=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ET=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,TT=`#ifdef USE_MORPHTARGETS
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
#endif`,wT=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,AT=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,CT=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,RT=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,PT=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,DT=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,LT=`#ifdef USE_NORMALMAP
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
#endif`,IT=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,UT=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,NT=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,OT=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,FT=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,BT=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,kT=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,zT=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,HT=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,VT=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,GT=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,WT=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,XT=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,YT=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,$T=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,qT=`float getShadowMask() {
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
}`,KT=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,jT=`#ifdef USE_SKINNING
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
#endif`,ZT=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,JT=`#ifdef USE_SKINNING
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
#endif`,QT=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ew=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tw=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,nw=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,iw=`#ifdef USE_TRANSMISSION
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
#endif`,rw=`#ifdef USE_TRANSMISSION
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
#endif`,sw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ow=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,aw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,lw=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const cw=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,uw=`uniform sampler2D t2D;
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
}`,fw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hw=`#ifdef ENVMAP_TYPE_CUBE
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
}`,dw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,pw=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mw=`#include <common>
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
}`,_w=`#if DEPTH_PACKING == 3200
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
}`,gw=`#define DISTANCE
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
}`,vw=`#define DISTANCE
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
}`,xw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,yw=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Sw=`uniform float scale;
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
}`,Mw=`uniform vec3 diffuse;
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
}`,bw=`#include <common>
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
}`,Ew=`uniform vec3 diffuse;
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
}`,Tw=`#define LAMBERT
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
}`,ww=`#define LAMBERT
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
}`,Aw=`#define MATCAP
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
}`,Cw=`#define MATCAP
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
}`,Rw=`#define NORMAL
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
}`,Pw=`#define NORMAL
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
}`,Dw=`#define PHONG
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
}`,Lw=`#define PHONG
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
}`,Iw=`#define STANDARD
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
}`,Uw=`#define STANDARD
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
}`,Nw=`#define TOON
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
}`,Ow=`#define TOON
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
}`,Fw=`uniform float size;
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
}`,Bw=`uniform vec3 diffuse;
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
}`,kw=`#include <common>
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
}`,zw=`uniform vec3 color;
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
}`,Hw=`uniform float rotation;
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
}`,Vw=`uniform vec3 diffuse;
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
}`,ot={alphahash_fragment:u1,alphahash_pars_fragment:f1,alphamap_fragment:h1,alphamap_pars_fragment:d1,alphatest_fragment:p1,alphatest_pars_fragment:m1,aomap_fragment:_1,aomap_pars_fragment:g1,batching_pars_vertex:v1,batching_vertex:x1,begin_vertex:y1,beginnormal_vertex:S1,bsdfs:M1,iridescence_fragment:b1,bumpmap_pars_fragment:E1,clipping_planes_fragment:T1,clipping_planes_pars_fragment:w1,clipping_planes_pars_vertex:A1,clipping_planes_vertex:C1,color_fragment:R1,color_pars_fragment:P1,color_pars_vertex:D1,color_vertex:L1,common:I1,cube_uv_reflection_fragment:U1,defaultnormal_vertex:N1,displacementmap_pars_vertex:O1,displacementmap_vertex:F1,emissivemap_fragment:B1,emissivemap_pars_fragment:k1,colorspace_fragment:z1,colorspace_pars_fragment:H1,envmap_fragment:V1,envmap_common_pars_fragment:G1,envmap_pars_fragment:W1,envmap_pars_vertex:X1,envmap_physical_pars_fragment:nT,envmap_vertex:Y1,fog_vertex:$1,fog_pars_vertex:q1,fog_fragment:K1,fog_pars_fragment:j1,gradientmap_pars_fragment:Z1,lightmap_pars_fragment:J1,lights_lambert_fragment:Q1,lights_lambert_pars_fragment:eT,lights_pars_begin:tT,lights_toon_fragment:iT,lights_toon_pars_fragment:rT,lights_phong_fragment:sT,lights_phong_pars_fragment:oT,lights_physical_fragment:aT,lights_physical_pars_fragment:lT,lights_fragment_begin:cT,lights_fragment_maps:uT,lights_fragment_end:fT,logdepthbuf_fragment:hT,logdepthbuf_pars_fragment:dT,logdepthbuf_pars_vertex:pT,logdepthbuf_vertex:mT,map_fragment:_T,map_pars_fragment:gT,map_particle_fragment:vT,map_particle_pars_fragment:xT,metalnessmap_fragment:yT,metalnessmap_pars_fragment:ST,morphinstance_vertex:MT,morphcolor_vertex:bT,morphnormal_vertex:ET,morphtarget_pars_vertex:TT,morphtarget_vertex:wT,normal_fragment_begin:AT,normal_fragment_maps:CT,normal_pars_fragment:RT,normal_pars_vertex:PT,normal_vertex:DT,normalmap_pars_fragment:LT,clearcoat_normal_fragment_begin:IT,clearcoat_normal_fragment_maps:UT,clearcoat_pars_fragment:NT,iridescence_pars_fragment:OT,opaque_fragment:FT,packing:BT,premultiplied_alpha_fragment:kT,project_vertex:zT,dithering_fragment:HT,dithering_pars_fragment:VT,roughnessmap_fragment:GT,roughnessmap_pars_fragment:WT,shadowmap_pars_fragment:XT,shadowmap_pars_vertex:YT,shadowmap_vertex:$T,shadowmask_pars_fragment:qT,skinbase_vertex:KT,skinning_pars_vertex:jT,skinning_vertex:ZT,skinnormal_vertex:JT,specularmap_fragment:QT,specularmap_pars_fragment:ew,tonemapping_fragment:tw,tonemapping_pars_fragment:nw,transmission_fragment:iw,transmission_pars_fragment:rw,uv_pars_fragment:sw,uv_pars_vertex:ow,uv_vertex:aw,worldpos_vertex:lw,background_vert:cw,background_frag:uw,backgroundCube_vert:fw,backgroundCube_frag:hw,cube_vert:dw,cube_frag:pw,depth_vert:mw,depth_frag:_w,distanceRGBA_vert:gw,distanceRGBA_frag:vw,equirect_vert:xw,equirect_frag:yw,linedashed_vert:Sw,linedashed_frag:Mw,meshbasic_vert:bw,meshbasic_frag:Ew,meshlambert_vert:Tw,meshlambert_frag:ww,meshmatcap_vert:Aw,meshmatcap_frag:Cw,meshnormal_vert:Rw,meshnormal_frag:Pw,meshphong_vert:Dw,meshphong_frag:Lw,meshphysical_vert:Iw,meshphysical_frag:Uw,meshtoon_vert:Nw,meshtoon_frag:Ow,points_vert:Fw,points_frag:Bw,shadow_vert:kw,shadow_frag:zw,sprite_vert:Hw,sprite_frag:Vw},Pe={common:{diffuse:{value:new ht(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new st},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new st}},envmap:{envMap:{value:null},envMapRotation:{value:new st},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new st}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new st}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new st},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new st},normalScale:{value:new mt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new st},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new st}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new st}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new st}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ht(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ht(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0},uvTransform:{value:new st}},sprite:{diffuse:{value:new ht(16777215)},opacity:{value:1},center:{value:new mt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new st},alphaMap:{value:null},alphaMapTransform:{value:new st},alphaTest:{value:0}}},Ki={basic:{uniforms:In([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.fog]),vertexShader:ot.meshbasic_vert,fragmentShader:ot.meshbasic_frag},lambert:{uniforms:In([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,Pe.lights,{emissive:{value:new ht(0)}}]),vertexShader:ot.meshlambert_vert,fragmentShader:ot.meshlambert_frag},phong:{uniforms:In([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,Pe.lights,{emissive:{value:new ht(0)},specular:{value:new ht(1118481)},shininess:{value:30}}]),vertexShader:ot.meshphong_vert,fragmentShader:ot.meshphong_frag},standard:{uniforms:In([Pe.common,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.roughnessmap,Pe.metalnessmap,Pe.fog,Pe.lights,{emissive:{value:new ht(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ot.meshphysical_vert,fragmentShader:ot.meshphysical_frag},toon:{uniforms:In([Pe.common,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.gradientmap,Pe.fog,Pe.lights,{emissive:{value:new ht(0)}}]),vertexShader:ot.meshtoon_vert,fragmentShader:ot.meshtoon_frag},matcap:{uniforms:In([Pe.common,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,{matcap:{value:null}}]),vertexShader:ot.meshmatcap_vert,fragmentShader:ot.meshmatcap_frag},points:{uniforms:In([Pe.points,Pe.fog]),vertexShader:ot.points_vert,fragmentShader:ot.points_frag},dashed:{uniforms:In([Pe.common,Pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ot.linedashed_vert,fragmentShader:ot.linedashed_frag},depth:{uniforms:In([Pe.common,Pe.displacementmap]),vertexShader:ot.depth_vert,fragmentShader:ot.depth_frag},normal:{uniforms:In([Pe.common,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,{opacity:{value:1}}]),vertexShader:ot.meshnormal_vert,fragmentShader:ot.meshnormal_frag},sprite:{uniforms:In([Pe.sprite,Pe.fog]),vertexShader:ot.sprite_vert,fragmentShader:ot.sprite_frag},background:{uniforms:{uvTransform:{value:new st},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ot.background_vert,fragmentShader:ot.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new st}},vertexShader:ot.backgroundCube_vert,fragmentShader:ot.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ot.cube_vert,fragmentShader:ot.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ot.equirect_vert,fragmentShader:ot.equirect_frag},distanceRGBA:{uniforms:In([Pe.common,Pe.displacementmap,{referencePosition:{value:new J},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ot.distanceRGBA_vert,fragmentShader:ot.distanceRGBA_frag},shadow:{uniforms:In([Pe.lights,Pe.fog,{color:{value:new ht(0)},opacity:{value:1}}]),vertexShader:ot.shadow_vert,fragmentShader:ot.shadow_frag}};Ki.physical={uniforms:In([Ki.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new st},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new st},clearcoatNormalScale:{value:new mt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new st},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new st},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new st},sheen:{value:0},sheenColor:{value:new ht(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new st},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new st},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new st},transmissionSamplerSize:{value:new mt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new st},attenuationDistance:{value:0},attenuationColor:{value:new ht(0)},specularColor:{value:new ht(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new st},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new st},anisotropyVector:{value:new mt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new st}}]),vertexShader:ot.meshphysical_vert,fragmentShader:ot.meshphysical_frag};const cc={r:0,b:0,g:0},Ps=new ir,Gw=new Wt;function Ww(n,e,t,i,r,s,o){const a=new ht(0);let l=s===!0?0:1,c,u,f=null,h=0,d=null;function _(y){let M=y.isScene===!0?y.background:null;return M&&M.isTexture&&(M=(y.backgroundBlurriness>0?t:e).get(M)),M}function g(y){let M=!1;const v=_(y);v===null?p(a,l):v&&v.isColor&&(p(v,1),M=!0);const R=n.xr.getEnvironmentBlendMode();R==="additive"?i.buffers.color.setClear(0,0,0,1,o):R==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||M)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(y,M){const v=_(M);v&&(v.isCubeTexture||v.mapping===Mu)?(u===void 0&&(u=new kn(new Al(1,1,1),new _s({name:"BackgroundCubeMaterial",uniforms:aa(Ki.backgroundCube.uniforms),vertexShader:Ki.backgroundCube.vertexShader,fragmentShader:Ki.backgroundCube.fragmentShader,side:Wn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(R,w,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),Ps.copy(M.backgroundRotation),Ps.x*=-1,Ps.y*=-1,Ps.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Ps.y*=-1,Ps.z*=-1),u.material.uniforms.envMap.value=v,u.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Gw.makeRotationFromEuler(Ps)),u.material.toneMapped=pt.getTransfer(v.colorSpace)!==wt,(f!==v||h!==v.version||d!==n.toneMapping)&&(u.material.needsUpdate=!0,f=v,h=v.version,d=n.toneMapping),u.layers.enableAll(),y.unshift(u,u.geometry,u.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new kn(new Tu(2,2),new _s({name:"BackgroundMaterial",uniforms:aa(Ki.background.uniforms),vertexShader:Ki.background.vertexShader,fragmentShader:Ki.background.fragmentShader,side:ms,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=pt.getTransfer(v.colorSpace)!==wt,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(f!==v||h!==v.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,f=v,h=v.version,d=n.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function p(y,M){y.getRGB(cc,Yv(n)),i.buffers.color.setClear(cc.r,cc.g,cc.b,M,o)}return{getClearColor:function(){return a},setClearColor:function(y,M=1){a.set(y),l=M,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,p(a,l)},render:g,addToRenderList:m}}function Xw(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=h(null);let s=r,o=!1;function a(x,P,U,k,Y){let te=!1;const W=f(k,U,P);s!==W&&(s=W,c(s.object)),te=d(x,k,U,Y),te&&_(x,k,U,Y),Y!==null&&e.update(Y,n.ELEMENT_ARRAY_BUFFER),(te||o)&&(o=!1,v(x,P,U,k),Y!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(Y).buffer))}function l(){return n.createVertexArray()}function c(x){return n.bindVertexArray(x)}function u(x){return n.deleteVertexArray(x)}function f(x,P,U){const k=U.wireframe===!0;let Y=i[x.id];Y===void 0&&(Y={},i[x.id]=Y);let te=Y[P.id];te===void 0&&(te={},Y[P.id]=te);let W=te[k];return W===void 0&&(W=h(l()),te[k]=W),W}function h(x){const P=[],U=[],k=[];for(let Y=0;Y<t;Y++)P[Y]=0,U[Y]=0,k[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:U,attributeDivisors:k,object:x,attributes:{},index:null}}function d(x,P,U,k){const Y=s.attributes,te=P.attributes;let W=0;const X=U.getAttributes();for(const V in X)if(X[V].location>=0){const N=Y[V];let ge=te[V];if(ge===void 0&&(V==="instanceMatrix"&&x.instanceMatrix&&(ge=x.instanceMatrix),V==="instanceColor"&&x.instanceColor&&(ge=x.instanceColor)),N===void 0||N.attribute!==ge||ge&&N.data!==ge.data)return!0;W++}return s.attributesNum!==W||s.index!==k}function _(x,P,U,k){const Y={},te=P.attributes;let W=0;const X=U.getAttributes();for(const V in X)if(X[V].location>=0){let N=te[V];N===void 0&&(V==="instanceMatrix"&&x.instanceMatrix&&(N=x.instanceMatrix),V==="instanceColor"&&x.instanceColor&&(N=x.instanceColor));const ge={};ge.attribute=N,N&&N.data&&(ge.data=N.data),Y[V]=ge,W++}s.attributes=Y,s.attributesNum=W,s.index=k}function g(){const x=s.newAttributes;for(let P=0,U=x.length;P<U;P++)x[P]=0}function m(x){p(x,0)}function p(x,P){const U=s.newAttributes,k=s.enabledAttributes,Y=s.attributeDivisors;U[x]=1,k[x]===0&&(n.enableVertexAttribArray(x),k[x]=1),Y[x]!==P&&(n.vertexAttribDivisor(x,P),Y[x]=P)}function y(){const x=s.newAttributes,P=s.enabledAttributes;for(let U=0,k=P.length;U<k;U++)P[U]!==x[U]&&(n.disableVertexAttribArray(U),P[U]=0)}function M(x,P,U,k,Y,te,W){W===!0?n.vertexAttribIPointer(x,P,U,Y,te):n.vertexAttribPointer(x,P,U,k,Y,te)}function v(x,P,U,k){g();const Y=k.attributes,te=U.getAttributes(),W=P.defaultAttributeValues;for(const X in te){const V=te[X];if(V.location>=0){let ae=Y[X];if(ae===void 0&&(X==="instanceMatrix"&&x.instanceMatrix&&(ae=x.instanceMatrix),X==="instanceColor"&&x.instanceColor&&(ae=x.instanceColor)),ae!==void 0){const N=ae.normalized,ge=ae.itemSize,we=e.get(ae);if(we===void 0)continue;const Be=we.buffer,ee=we.type,fe=we.bytesPerElement,de=ee===n.INT||ee===n.UNSIGNED_INT||ae.gpuType===$d;if(ae.isInterleavedBufferAttribute){const he=ae.data,se=he.stride,_e=ae.offset;if(he.isInstancedInterleavedBuffer){for(let be=0;be<V.locationSize;be++)p(V.location+be,he.meshPerAttribute);x.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let be=0;be<V.locationSize;be++)m(V.location+be);n.bindBuffer(n.ARRAY_BUFFER,Be);for(let be=0;be<V.locationSize;be++)M(V.location+be,ge/V.locationSize,ee,N,se*fe,(_e+ge/V.locationSize*be)*fe,de)}else{if(ae.isInstancedBufferAttribute){for(let he=0;he<V.locationSize;he++)p(V.location+he,ae.meshPerAttribute);x.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let he=0;he<V.locationSize;he++)m(V.location+he);n.bindBuffer(n.ARRAY_BUFFER,Be);for(let he=0;he<V.locationSize;he++)M(V.location+he,ge/V.locationSize,ee,N,ge*fe,ge/V.locationSize*he*fe,de)}}else if(W!==void 0){const N=W[X];if(N!==void 0)switch(N.length){case 2:n.vertexAttrib2fv(V.location,N);break;case 3:n.vertexAttrib3fv(V.location,N);break;case 4:n.vertexAttrib4fv(V.location,N);break;default:n.vertexAttrib1fv(V.location,N)}}}}y()}function R(){D();for(const x in i){const P=i[x];for(const U in P){const k=P[U];for(const Y in k)u(k[Y].object),delete k[Y];delete P[U]}delete i[x]}}function w(x){if(i[x.id]===void 0)return;const P=i[x.id];for(const U in P){const k=P[U];for(const Y in k)u(k[Y].object),delete k[Y];delete P[U]}delete i[x.id]}function T(x){for(const P in i){const U=i[P];if(U[x.id]===void 0)continue;const k=U[x.id];for(const Y in k)u(k[Y].object),delete k[Y];delete U[x.id]}}function D(){S(),o=!0,s!==r&&(s=r,c(s.object))}function S(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:D,resetDefaultState:S,dispose:R,releaseStatesOfGeometry:w,releaseStatesOfProgram:T,initAttributes:g,enableAttribute:m,disableUnusedAttributes:y}}function Yw(n,e,t){let i;function r(c){i=c}function s(c,u){n.drawArrays(i,c,u),t.update(u,i,1)}function o(c,u,f){f!==0&&(n.drawArraysInstanced(i,c,u,f),t.update(u,i,f))}function a(c,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,f);let d=0;for(let _=0;_<f;_++)d+=u[_];t.update(d,i,1)}function l(c,u,f,h){if(f===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let _=0;_<c.length;_++)o(c[_],u[_],h[_]);else{d.multiDrawArraysInstancedWEBGL(i,c,0,u,0,h,0,f);let _=0;for(let g=0;g<f;g++)_+=u[g]*h[g];t.update(_,i,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function $w(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(T){return!(T!==Fi&&i.convert(T)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(T){const D=T===El&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==Lr&&i.convert(T)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==Er&&!D)}function l(T){if(T==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const f=t.logarithmicDepthBuffer===!0,h=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),y=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),M=n.getParameter(n.MAX_VARYING_VECTORS),v=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),R=_>0,w=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:f,reverseDepthBuffer:h,maxTextures:d,maxVertexTextures:_,maxTextureSize:g,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:y,maxVaryings:M,maxFragmentUniforms:v,vertexTextures:R,maxSamples:w}}function qw(n){const e=this;let t=null,i=0,r=!1,s=!1;const o=new Os,a=new st,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const d=f.length!==0||h||i!==0||r;return r=h,i=f.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,h){t=u(f,h,0)},this.setState=function(f,h,d){const _=f.clippingPlanes,g=f.clipIntersection,m=f.clipShadows,p=n.get(f);if(!r||_===null||_.length===0||s&&!m)s?u(null):c();else{const y=s?0:i,M=y*4;let v=p.clippingState||null;l.value=v,v=u(_,h,M,d);for(let R=0;R!==M;++R)v[R]=t[R];p.clippingState=v,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(f,h,d,_){const g=f!==null?f.length:0;let m=null;if(g!==0){if(m=l.value,_!==!0||m===null){const p=d+g*4,y=h.matrixWorldInverse;a.getNormalMatrix(y),(m===null||m.length<p)&&(m=new Float32Array(p));for(let M=0,v=d;M!==g;++M,v+=4)o.copy(f[M]).applyMatrix4(y,a),o.normal.toArray(m,v),m[v+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,m}}function Kw(n){let e=new WeakMap;function t(o,a){return a===Th?o.mapping=ia:a===wh&&(o.mapping=ra),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Th||a===wh)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new o1(l.height);return c.fromEquirectangularTexture(n,o),e.set(o,c),o.addEventListener("dispose",r),t(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class jv extends $v{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Uo=4,i_=[.125,.215,.35,.446,.526,.582],zs=20,Ef=new jv,r_=new ht;let Tf=null,wf=0,Af=0,Cf=!1;const Fs=(1+Math.sqrt(5))/2,To=1/Fs,s_=[new J(-Fs,To,0),new J(Fs,To,0),new J(-To,0,Fs),new J(To,0,Fs),new J(0,Fs,-To),new J(0,Fs,To),new J(-1,1,-1),new J(1,1,-1),new J(-1,1,1),new J(1,1,1)];class o_{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100){Tf=this._renderer.getRenderTarget(),wf=this._renderer.getActiveCubeFace(),Af=this._renderer.getActiveMipmapLevel(),Cf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=c_(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=l_(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Tf,wf,Af),this._renderer.xr.enabled=Cf,e.scissorTest=!1,uc(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ia||e.mapping===ra?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Tf=this._renderer.getRenderTarget(),wf=this._renderer.getActiveCubeFace(),Af=this._renderer.getActiveMipmapLevel(),Cf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Qi,minFilter:Qi,generateMipmaps:!1,type:El,format:Fi,colorSpace:la,depthBuffer:!1},r=a_(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=a_(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=jw(s)),this._blurMaterial=Zw(s,e,t)}return r}_compileMaterial(e){const t=new kn(this._lodPlanes[0],e);this._renderer.compile(t,Ef)}_sceneToCubeUV(e,t,i,r){const a=new Mi(90,1,t,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,h=u.toneMapping;u.getClearColor(r_),u.toneMapping=as,u.autoClear=!1;const d=new su({name:"PMREM.Background",side:Wn,depthWrite:!1,depthTest:!1}),_=new kn(new Al,d);let g=!1;const m=e.background;m?m.isColor&&(d.color.copy(m),e.background=null,g=!0):(d.color.copy(r_),g=!0);for(let p=0;p<6;p++){const y=p%3;y===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):y===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const M=this._cubeSize;uc(r,y*M,p>2?M:0,M,M),u.setRenderTarget(r),g&&u.render(_,a),u.render(e,a)}_.geometry.dispose(),_.material.dispose(),u.toneMapping=h,u.autoClear=f,e.background=m}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===ia||e.mapping===ra;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=c_()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=l_());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new kn(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;uc(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,Ef)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=s_[(r-s-1)%s_.length];this._blur(e,s-1,s,o,a)}t.autoClear=i}_blur(e,t,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,f=new kn(this._lodPlanes[r],c),h=c.uniforms,d=this._sizeLods[i]-1,_=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*zs-1),g=s/_,m=isFinite(s)?1+Math.floor(u*g):zs;m>zs&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${zs}`);const p=[];let y=0;for(let T=0;T<zs;++T){const D=T/g,S=Math.exp(-D*D/2);p.push(S),T===0?y+=S:T<m&&(y+=2*S)}for(let T=0;T<p.length;T++)p[T]=p[T]/y;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=p,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:M}=this;h.dTheta.value=_,h.mipInt.value=M-i;const v=this._sizeLods[r],R=3*v*(r>M-Uo?r-M+Uo:0),w=4*(this._cubeSize-v);uc(t,R,w,3*v,2*v),l.setRenderTarget(t),l.render(f,Ef)}}function jw(n){const e=[],t=[],i=[];let r=n;const s=n-Uo+1+i_.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);t.push(a);let l=1/a;o>n-Uo?l=i_[o-n+Uo-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),u=-c,f=1+c,h=[u,u,f,u,f,f,u,u,f,f,u,f],d=6,_=6,g=3,m=2,p=1,y=new Float32Array(g*_*d),M=new Float32Array(m*_*d),v=new Float32Array(p*_*d);for(let w=0;w<d;w++){const T=w%3*2/3-1,D=w>2?0:-1,S=[T,D,0,T+2/3,D,0,T+2/3,D+1,0,T,D,0,T+2/3,D+1,0,T,D+1,0];y.set(S,g*_*w),M.set(h,m*_*w);const x=[w,w,w,w,w,w];v.set(x,p*_*w)}const R=new Ri;R.setAttribute("position",new zi(y,g)),R.setAttribute("uv",new zi(M,m)),R.setAttribute("faceIndex",new zi(v,p)),e.push(R),r>Uo&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function a_(n,e,t){const i=new ro(n,e,t);return i.texture.mapping=Mu,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function uc(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function Zw(n,e,t){const i=new Float32Array(zs),r=new J(0,1,0);return new _s({name:"SphericalGaussianBlur",defines:{n:zs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:tp(),fragmentShader:`

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
		`,blending:os,depthTest:!1,depthWrite:!1})}function l_(){return new _s({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:tp(),fragmentShader:`

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
		`,blending:os,depthTest:!1,depthWrite:!1})}function c_(){return new _s({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:tp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:os,depthTest:!1,depthWrite:!1})}function tp(){return`

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
	`}function Jw(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===Th||l===wh,u=l===ia||l===ra;if(c||u){let f=e.get(a);const h=f!==void 0?f.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==h)return t===null&&(t=new o_(n)),f=c?t.fromEquirectangular(a,f):t.fromCubemap(a,f),f.texture.pmremVersion=a.pmremVersion,e.set(a,f),f.texture;if(f!==void 0)return f.texture;{const d=a.image;return c&&d&&d.height>0||u&&d&&r(d)?(t===null&&(t=new o_(n)),f=c?t.fromEquirectangular(a):t.fromCubemap(a),f.texture.pmremVersion=a.pmremVersion,e.set(a,f),a.addEventListener("dispose",s),f.texture):null}}}return a}function r(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function Qw(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&Ia("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function eA(n,e,t,i){const r={},s=new WeakMap;function o(f){const h=f.target;h.index!==null&&e.remove(h.index);for(const _ in h.attributes)e.remove(h.attributes[_]);for(const _ in h.morphAttributes){const g=h.morphAttributes[_];for(let m=0,p=g.length;m<p;m++)e.remove(g[m])}h.removeEventListener("dispose",o),delete r[h.id];const d=s.get(h);d&&(e.remove(d),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function a(f,h){return r[h.id]===!0||(h.addEventListener("dispose",o),r[h.id]=!0,t.memory.geometries++),h}function l(f){const h=f.attributes;for(const _ in h)e.update(h[_],n.ARRAY_BUFFER);const d=f.morphAttributes;for(const _ in d){const g=d[_];for(let m=0,p=g.length;m<p;m++)e.update(g[m],n.ARRAY_BUFFER)}}function c(f){const h=[],d=f.index,_=f.attributes.position;let g=0;if(d!==null){const y=d.array;g=d.version;for(let M=0,v=y.length;M<v;M+=3){const R=y[M+0],w=y[M+1],T=y[M+2];h.push(R,w,w,T,T,R)}}else if(_!==void 0){const y=_.array;g=_.version;for(let M=0,v=y.length/3-1;M<v;M+=3){const R=M+0,w=M+1,T=M+2;h.push(R,w,w,T,T,R)}}else return;const m=new(Bv(h)?Xv:Wv)(h,1);m.version=g;const p=s.get(f);p&&e.remove(p),s.set(f,m)}function u(f){const h=s.get(f);if(h){const d=f.index;d!==null&&h.version<d.version&&c(f)}else c(f);return s.get(f)}return{get:a,update:l,getWireframeAttribute:u}}function tA(n,e,t){let i;function r(h){i=h}let s,o;function a(h){s=h.type,o=h.bytesPerElement}function l(h,d){n.drawElements(i,d,s,h*o),t.update(d,i,1)}function c(h,d,_){_!==0&&(n.drawElementsInstanced(i,d,s,h*o,_),t.update(d,i,_))}function u(h,d,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,s,h,0,_);let m=0;for(let p=0;p<_;p++)m+=d[p];t.update(m,i,1)}function f(h,d,_,g){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<h.length;p++)c(h[p]/o,d[p],g[p]);else{m.multiDrawElementsInstancedWEBGL(i,d,0,s,h,0,g,0,_);let p=0;for(let y=0;y<_;y++)p+=d[y]*g[y];t.update(p,i,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=f}function nA(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function iA(n,e,t){const i=new WeakMap,r=new Yt;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=u!==void 0?u.length:0;let h=i.get(a);if(h===void 0||h.count!==f){let x=function(){D.dispose(),i.delete(a),a.removeEventListener("dispose",x)};var d=x;h!==void 0&&h.texture.dispose();const _=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],y=a.morphAttributes.normal||[],M=a.morphAttributes.color||[];let v=0;_===!0&&(v=1),g===!0&&(v=2),m===!0&&(v=3);let R=a.attributes.position.count*v,w=1;R>e.maxTextureSize&&(w=Math.ceil(R/e.maxTextureSize),R=e.maxTextureSize);const T=new Float32Array(R*w*4*f),D=new zv(T,R,w,f);D.type=Er,D.needsUpdate=!0;const S=v*4;for(let P=0;P<f;P++){const U=p[P],k=y[P],Y=M[P],te=R*w*4*P;for(let W=0;W<U.count;W++){const X=W*S;_===!0&&(r.fromBufferAttribute(U,W),T[te+X+0]=r.x,T[te+X+1]=r.y,T[te+X+2]=r.z,T[te+X+3]=0),g===!0&&(r.fromBufferAttribute(k,W),T[te+X+4]=r.x,T[te+X+5]=r.y,T[te+X+6]=r.z,T[te+X+7]=0),m===!0&&(r.fromBufferAttribute(Y,W),T[te+X+8]=r.x,T[te+X+9]=r.y,T[te+X+10]=r.z,T[te+X+11]=Y.itemSize===4?r.w:1)}}h={count:f,texture:D,size:new mt(R,w)},i.set(a,h),a.addEventListener("dispose",x)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let _=0;for(let m=0;m<c.length;m++)_+=c[m];const g=a.morphTargetsRelative?1:1-_;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:s}}function rA(n,e,t,i){let r=new WeakMap;function s(l){const c=i.render.frame,u=l.geometry,f=e.get(l,u);if(r.get(f)!==c&&(e.update(f),r.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;r.get(h)!==c&&(h.update(),r.set(h,c))}return f}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}class Zv extends Zn{constructor(e,t,i,r,s,o,a,l,c,u=$o){if(u!==$o&&u!==oa)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===$o&&(i=io),i===void 0&&u===oa&&(i=sa),super(null,r,s,o,a,l,u,i,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:ki,this.minFilter=l!==void 0?l:ki,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Jv=new Zn,u_=new Zv(1,1),Qv=new zv,ex=new WE,tx=new qv,f_=[],h_=[],d_=new Float32Array(16),p_=new Float32Array(9),m_=new Float32Array(4);function ha(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=f_[r];if(s===void 0&&(s=new Float32Array(r),f_[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function on(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function an(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function wu(n,e){let t=h_[e];t===void 0&&(t=new Int32Array(e),h_[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function sA(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function oA(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(on(t,e))return;n.uniform2fv(this.addr,e),an(t,e)}}function aA(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(on(t,e))return;n.uniform3fv(this.addr,e),an(t,e)}}function lA(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(on(t,e))return;n.uniform4fv(this.addr,e),an(t,e)}}function cA(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(on(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),an(t,e)}else{if(on(t,i))return;m_.set(i),n.uniformMatrix2fv(this.addr,!1,m_),an(t,i)}}function uA(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(on(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),an(t,e)}else{if(on(t,i))return;p_.set(i),n.uniformMatrix3fv(this.addr,!1,p_),an(t,i)}}function fA(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(on(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),an(t,e)}else{if(on(t,i))return;d_.set(i),n.uniformMatrix4fv(this.addr,!1,d_),an(t,i)}}function hA(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function dA(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(on(t,e))return;n.uniform2iv(this.addr,e),an(t,e)}}function pA(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(on(t,e))return;n.uniform3iv(this.addr,e),an(t,e)}}function mA(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(on(t,e))return;n.uniform4iv(this.addr,e),an(t,e)}}function _A(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function gA(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(on(t,e))return;n.uniform2uiv(this.addr,e),an(t,e)}}function vA(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(on(t,e))return;n.uniform3uiv(this.addr,e),an(t,e)}}function xA(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(on(t,e))return;n.uniform4uiv(this.addr,e),an(t,e)}}function yA(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(u_.compareFunction=Fv,s=u_):s=Jv,t.setTexture2D(e||s,r)}function SA(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||ex,r)}function MA(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||tx,r)}function bA(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Qv,r)}function EA(n){switch(n){case 5126:return sA;case 35664:return oA;case 35665:return aA;case 35666:return lA;case 35674:return cA;case 35675:return uA;case 35676:return fA;case 5124:case 35670:return hA;case 35667:case 35671:return dA;case 35668:case 35672:return pA;case 35669:case 35673:return mA;case 5125:return _A;case 36294:return gA;case 36295:return vA;case 36296:return xA;case 35678:case 36198:case 36298:case 36306:case 35682:return yA;case 35679:case 36299:case 36307:return SA;case 35680:case 36300:case 36308:case 36293:return MA;case 36289:case 36303:case 36311:case 36292:return bA}}function TA(n,e){n.uniform1fv(this.addr,e)}function wA(n,e){const t=ha(e,this.size,2);n.uniform2fv(this.addr,t)}function AA(n,e){const t=ha(e,this.size,3);n.uniform3fv(this.addr,t)}function CA(n,e){const t=ha(e,this.size,4);n.uniform4fv(this.addr,t)}function RA(n,e){const t=ha(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function PA(n,e){const t=ha(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function DA(n,e){const t=ha(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function LA(n,e){n.uniform1iv(this.addr,e)}function IA(n,e){n.uniform2iv(this.addr,e)}function UA(n,e){n.uniform3iv(this.addr,e)}function NA(n,e){n.uniform4iv(this.addr,e)}function OA(n,e){n.uniform1uiv(this.addr,e)}function FA(n,e){n.uniform2uiv(this.addr,e)}function BA(n,e){n.uniform3uiv(this.addr,e)}function kA(n,e){n.uniform4uiv(this.addr,e)}function zA(n,e,t){const i=this.cache,r=e.length,s=wu(t,r);on(i,s)||(n.uniform1iv(this.addr,s),an(i,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||Jv,s[o])}function HA(n,e,t){const i=this.cache,r=e.length,s=wu(t,r);on(i,s)||(n.uniform1iv(this.addr,s),an(i,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||ex,s[o])}function VA(n,e,t){const i=this.cache,r=e.length,s=wu(t,r);on(i,s)||(n.uniform1iv(this.addr,s),an(i,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||tx,s[o])}function GA(n,e,t){const i=this.cache,r=e.length,s=wu(t,r);on(i,s)||(n.uniform1iv(this.addr,s),an(i,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||Qv,s[o])}function WA(n){switch(n){case 5126:return TA;case 35664:return wA;case 35665:return AA;case 35666:return CA;case 35674:return RA;case 35675:return PA;case 35676:return DA;case 5124:case 35670:return LA;case 35667:case 35671:return IA;case 35668:case 35672:return UA;case 35669:case 35673:return NA;case 5125:return OA;case 36294:return FA;case 36295:return BA;case 36296:return kA;case 35678:case 36198:case 36298:case 36306:case 35682:return zA;case 35679:case 36299:case 36307:return HA;case 35680:case 36300:case 36308:case 36293:return VA;case 36289:case 36303:case 36311:case 36292:return GA}}class XA{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=EA(t.type)}}class YA{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=WA(t.type)}}class $A{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],i)}}}const Rf=/(\w+)(\])?(\[|\.)?/g;function __(n,e){n.seq.push(e),n.map[e.id]=e}function qA(n,e,t){const i=n.name,r=i.length;for(Rf.lastIndex=0;;){const s=Rf.exec(i),o=Rf.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){__(t,c===void 0?new XA(a,n,e):new YA(a,n,e));break}else{let f=t.map[a];f===void 0&&(f=new $A(a),__(t,f)),t=f}}}class Uc{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);qA(s,o,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&i.push(o)}return i}}function g_(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const KA=37297;let jA=0;function ZA(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}const v_=new st;function JA(n){pt._getMatrix(v_,pt.workingColorSpace,n);const e=`mat3( ${v_.elements.map(t=>t.toFixed(4))} )`;switch(pt.getTransfer(n)){case bu:return[e,"LinearTransferOETF"];case wt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function x_(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=n.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+ZA(n.getShaderSource(e),o)}else return r}function QA(n,e){const t=JA(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function eC(n,e){let t;switch(e){case iE:t="Linear";break;case rE:t="Reinhard";break;case sE:t="Cineon";break;case Ev:t="ACESFilmic";break;case aE:t="AgX";break;case lE:t="Neutral";break;case oE:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const fc=new J;function tC(){pt.getLuminanceCoefficients(fc);const n=fc.x.toFixed(4),e=fc.y.toFixed(4),t=fc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function nC(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ua).join(`
`)}function iC(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function rC(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),o=s.name;let a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function Ua(n){return n!==""}function y_(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function S_(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const sC=/^[ \t]*#include +<([\w\d./]+)>/gm;function td(n){return n.replace(sC,aC)}const oC=new Map;function aC(n,e){let t=ot[e];if(t===void 0){const i=oC.get(e);if(i!==void 0)t=ot[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return td(t)}const lC=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function M_(n){return n.replace(lC,cC)}function cC(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function b_(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function uC(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Mv?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Ob?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===dr&&(e="SHADOWMAP_TYPE_VSM"),e}function fC(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case ia:case ra:e="ENVMAP_TYPE_CUBE";break;case Mu:e="ENVMAP_TYPE_CUBE_UV";break}return e}function hC(n){let e="ENVMAP_MODE_REFLECTION";return n.envMap&&n.envMapMode===ra&&(e="ENVMAP_MODE_REFRACTION"),e}function dC(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case bv:e="ENVMAP_BLENDING_MULTIPLY";break;case tE:e="ENVMAP_BLENDING_MIX";break;case nE:e="ENVMAP_BLENDING_ADD";break}return e}function pC(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function mC(n,e,t,i){const r=n.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=uC(t),c=fC(t),u=hC(t),f=dC(t),h=pC(t),d=nC(t),_=iC(s),g=r.createProgram();let m,p,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Ua).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Ua).join(`
`),p.length>0&&(p+=`
`)):(m=[b_(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ua).join(`
`),p=[b_(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==as?"#define TONE_MAPPING":"",t.toneMapping!==as?ot.tonemapping_pars_fragment:"",t.toneMapping!==as?eC("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ot.colorspace_pars_fragment,QA("linearToOutputTexel",t.outputColorSpace),tC(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ua).join(`
`)),o=td(o),o=y_(o,t),o=S_(o,t),a=td(a),a=y_(a,t),a=S_(a,t),o=M_(o),a=M_(a),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Um?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Um?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const M=y+m+o,v=y+p+a,R=g_(r,r.VERTEX_SHADER,M),w=g_(r,r.FRAGMENT_SHADER,v);r.attachShader(g,R),r.attachShader(g,w),t.index0AttributeName!==void 0?r.bindAttribLocation(g,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(g,0,"position"),r.linkProgram(g);function T(P){if(n.debug.checkShaderErrors){const U=r.getProgramInfoLog(g).trim(),k=r.getShaderInfoLog(R).trim(),Y=r.getShaderInfoLog(w).trim();let te=!0,W=!0;if(r.getProgramParameter(g,r.LINK_STATUS)===!1)if(te=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,g,R,w);else{const X=x_(r,R,"vertex"),V=x_(r,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(g,r.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+U+`
`+X+`
`+V)}else U!==""?console.warn("THREE.WebGLProgram: Program Info Log:",U):(k===""||Y==="")&&(W=!1);W&&(P.diagnostics={runnable:te,programLog:U,vertexShader:{log:k,prefix:m},fragmentShader:{log:Y,prefix:p}})}r.deleteShader(R),r.deleteShader(w),D=new Uc(r,g),S=rC(r,g)}let D;this.getUniforms=function(){return D===void 0&&T(this),D};let S;this.getAttributes=function(){return S===void 0&&T(this),S};let x=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=r.getProgramParameter(g,KA)),x},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=jA++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=R,this.fragmentShader=w,this}let _C=0;class gC{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new vC(e),t.set(e,i)),i}}class vC{constructor(e){this.id=_C++,this.code=e,this.usedTimes=0}}function xC(n,e,t,i,r,s,o){const a=new Vv,l=new gC,c=new Set,u=[],f=r.logarithmicDepthBuffer,h=r.vertexTextures;let d=r.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(S){return c.add(S),S===0?"uv":`uv${S}`}function m(S,x,P,U,k){const Y=U.fog,te=k.geometry,W=S.isMeshStandardMaterial?U.environment:null,X=(S.isMeshStandardMaterial?t:e).get(S.envMap||W),V=X&&X.mapping===Mu?X.image.height:null,ae=_[S.type];S.precision!==null&&(d=r.getMaxPrecision(S.precision),d!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",d,"instead."));const N=te.morphAttributes.position||te.morphAttributes.normal||te.morphAttributes.color,ge=N!==void 0?N.length:0;let we=0;te.morphAttributes.position!==void 0&&(we=1),te.morphAttributes.normal!==void 0&&(we=2),te.morphAttributes.color!==void 0&&(we=3);let Be,ee,fe,de;if(ae){const De=Ki[ae];Be=De.vertexShader,ee=De.fragmentShader}else Be=S.vertexShader,ee=S.fragmentShader,l.update(S),fe=l.getVertexShaderID(S),de=l.getFragmentShaderID(S);const he=n.getRenderTarget(),se=n.state.buffers.depth.getReversed(),_e=k.isInstancedMesh===!0,be=k.isBatchedMesh===!0,Ie=!!S.map,I=!!S.matcap,O=!!X,C=!!S.aoMap,oe=!!S.lightMap,Q=!!S.bumpMap,L=!!S.normalMap,ne=!!S.displacementMap,le=!!S.emissiveMap,ie=!!S.metalnessMap,E=!!S.roughnessMap,b=S.anisotropy>0,F=S.clearcoat>0,$=S.dispersion>0,q=S.iridescence>0,Z=S.sheen>0,pe=S.transmission>0,ue=b&&!!S.anisotropyMap,xe=F&&!!S.clearcoatMap,He=F&&!!S.clearcoatNormalMap,me=F&&!!S.clearcoatRoughnessMap,ve=q&&!!S.iridescenceMap,ze=q&&!!S.iridescenceThicknessMap,Ve=Z&&!!S.sheenColorMap,Me=Z&&!!S.sheenRoughnessMap,We=!!S.specularMap,Xe=!!S.specularColorMap,ft=!!S.specularIntensityMap,B=pe&&!!S.transmissionMap,Te=pe&&!!S.thicknessMap,re=!!S.gradientMap,ce=!!S.alphaMap,Ee=S.alphaTest>0,Ae=!!S.alphaHash,qe=!!S.extensions;let _t=as;S.toneMapped&&(he===null||he.isXRRenderTarget===!0)&&(_t=n.toneMapping);const Xt={shaderID:ae,shaderType:S.type,shaderName:S.name,vertexShader:Be,fragmentShader:ee,defines:S.defines,customVertexShaderID:fe,customFragmentShaderID:de,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:d,batching:be,batchingColor:be&&k._colorsTexture!==null,instancing:_e,instancingColor:_e&&k.instanceColor!==null,instancingMorph:_e&&k.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:he===null?n.outputColorSpace:he.isXRRenderTarget===!0?he.texture.colorSpace:la,alphaToCoverage:!!S.alphaToCoverage,map:Ie,matcap:I,envMap:O,envMapMode:O&&X.mapping,envMapCubeUVHeight:V,aoMap:C,lightMap:oe,bumpMap:Q,normalMap:L,displacementMap:h&&ne,emissiveMap:le,normalMapObjectSpace:L&&S.normalMapType===hE,normalMapTangentSpace:L&&S.normalMapType===Ov,metalnessMap:ie,roughnessMap:E,anisotropy:b,anisotropyMap:ue,clearcoat:F,clearcoatMap:xe,clearcoatNormalMap:He,clearcoatRoughnessMap:me,dispersion:$,iridescence:q,iridescenceMap:ve,iridescenceThicknessMap:ze,sheen:Z,sheenColorMap:Ve,sheenRoughnessMap:Me,specularMap:We,specularColorMap:Xe,specularIntensityMap:ft,transmission:pe,transmissionMap:B,thicknessMap:Te,gradientMap:re,opaque:S.transparent===!1&&S.blending===Yo&&S.alphaToCoverage===!1,alphaMap:ce,alphaTest:Ee,alphaHash:Ae,combine:S.combine,mapUv:Ie&&g(S.map.channel),aoMapUv:C&&g(S.aoMap.channel),lightMapUv:oe&&g(S.lightMap.channel),bumpMapUv:Q&&g(S.bumpMap.channel),normalMapUv:L&&g(S.normalMap.channel),displacementMapUv:ne&&g(S.displacementMap.channel),emissiveMapUv:le&&g(S.emissiveMap.channel),metalnessMapUv:ie&&g(S.metalnessMap.channel),roughnessMapUv:E&&g(S.roughnessMap.channel),anisotropyMapUv:ue&&g(S.anisotropyMap.channel),clearcoatMapUv:xe&&g(S.clearcoatMap.channel),clearcoatNormalMapUv:He&&g(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:me&&g(S.clearcoatRoughnessMap.channel),iridescenceMapUv:ve&&g(S.iridescenceMap.channel),iridescenceThicknessMapUv:ze&&g(S.iridescenceThicknessMap.channel),sheenColorMapUv:Ve&&g(S.sheenColorMap.channel),sheenRoughnessMapUv:Me&&g(S.sheenRoughnessMap.channel),specularMapUv:We&&g(S.specularMap.channel),specularColorMapUv:Xe&&g(S.specularColorMap.channel),specularIntensityMapUv:ft&&g(S.specularIntensityMap.channel),transmissionMapUv:B&&g(S.transmissionMap.channel),thicknessMapUv:Te&&g(S.thicknessMap.channel),alphaMapUv:ce&&g(S.alphaMap.channel),vertexTangents:!!te.attributes.tangent&&(L||b),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!te.attributes.color&&te.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!te.attributes.uv&&(Ie||ce),fog:!!Y,useFog:S.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:f,reverseDepthBuffer:se,skinning:k.isSkinnedMesh===!0,morphTargets:te.morphAttributes.position!==void 0,morphNormals:te.morphAttributes.normal!==void 0,morphColors:te.morphAttributes.color!==void 0,morphTargetsCount:ge,morphTextureStride:we,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:n.shadowMap.enabled&&P.length>0,shadowMapType:n.shadowMap.type,toneMapping:_t,decodeVideoTexture:Ie&&S.map.isVideoTexture===!0&&pt.getTransfer(S.map.colorSpace)===wt,decodeVideoTextureEmissive:le&&S.emissiveMap.isVideoTexture===!0&&pt.getTransfer(S.emissiveMap.colorSpace)===wt,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Mr,flipSided:S.side===Wn,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:qe&&S.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(qe&&S.extensions.multiDraw===!0||be)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Xt.vertexUv1s=c.has(1),Xt.vertexUv2s=c.has(2),Xt.vertexUv3s=c.has(3),c.clear(),Xt}function p(S){const x=[];if(S.shaderID?x.push(S.shaderID):(x.push(S.customVertexShaderID),x.push(S.customFragmentShaderID)),S.defines!==void 0)for(const P in S.defines)x.push(P),x.push(S.defines[P]);return S.isRawShaderMaterial===!1&&(y(x,S),M(x,S),x.push(n.outputColorSpace)),x.push(S.customProgramCacheKey),x.join()}function y(S,x){S.push(x.precision),S.push(x.outputColorSpace),S.push(x.envMapMode),S.push(x.envMapCubeUVHeight),S.push(x.mapUv),S.push(x.alphaMapUv),S.push(x.lightMapUv),S.push(x.aoMapUv),S.push(x.bumpMapUv),S.push(x.normalMapUv),S.push(x.displacementMapUv),S.push(x.emissiveMapUv),S.push(x.metalnessMapUv),S.push(x.roughnessMapUv),S.push(x.anisotropyMapUv),S.push(x.clearcoatMapUv),S.push(x.clearcoatNormalMapUv),S.push(x.clearcoatRoughnessMapUv),S.push(x.iridescenceMapUv),S.push(x.iridescenceThicknessMapUv),S.push(x.sheenColorMapUv),S.push(x.sheenRoughnessMapUv),S.push(x.specularMapUv),S.push(x.specularColorMapUv),S.push(x.specularIntensityMapUv),S.push(x.transmissionMapUv),S.push(x.thicknessMapUv),S.push(x.combine),S.push(x.fogExp2),S.push(x.sizeAttenuation),S.push(x.morphTargetsCount),S.push(x.morphAttributeCount),S.push(x.numDirLights),S.push(x.numPointLights),S.push(x.numSpotLights),S.push(x.numSpotLightMaps),S.push(x.numHemiLights),S.push(x.numRectAreaLights),S.push(x.numDirLightShadows),S.push(x.numPointLightShadows),S.push(x.numSpotLightShadows),S.push(x.numSpotLightShadowsWithMaps),S.push(x.numLightProbes),S.push(x.shadowMapType),S.push(x.toneMapping),S.push(x.numClippingPlanes),S.push(x.numClipIntersection),S.push(x.depthPacking)}function M(S,x){a.disableAll(),x.supportsVertexTextures&&a.enable(0),x.instancing&&a.enable(1),x.instancingColor&&a.enable(2),x.instancingMorph&&a.enable(3),x.matcap&&a.enable(4),x.envMap&&a.enable(5),x.normalMapObjectSpace&&a.enable(6),x.normalMapTangentSpace&&a.enable(7),x.clearcoat&&a.enable(8),x.iridescence&&a.enable(9),x.alphaTest&&a.enable(10),x.vertexColors&&a.enable(11),x.vertexAlphas&&a.enable(12),x.vertexUv1s&&a.enable(13),x.vertexUv2s&&a.enable(14),x.vertexUv3s&&a.enable(15),x.vertexTangents&&a.enable(16),x.anisotropy&&a.enable(17),x.alphaHash&&a.enable(18),x.batching&&a.enable(19),x.dispersion&&a.enable(20),x.batchingColor&&a.enable(21),S.push(a.mask),a.disableAll(),x.fog&&a.enable(0),x.useFog&&a.enable(1),x.flatShading&&a.enable(2),x.logarithmicDepthBuffer&&a.enable(3),x.reverseDepthBuffer&&a.enable(4),x.skinning&&a.enable(5),x.morphTargets&&a.enable(6),x.morphNormals&&a.enable(7),x.morphColors&&a.enable(8),x.premultipliedAlpha&&a.enable(9),x.shadowMapEnabled&&a.enable(10),x.doubleSided&&a.enable(11),x.flipSided&&a.enable(12),x.useDepthPacking&&a.enable(13),x.dithering&&a.enable(14),x.transmission&&a.enable(15),x.sheen&&a.enable(16),x.opaque&&a.enable(17),x.pointsUvs&&a.enable(18),x.decodeVideoTexture&&a.enable(19),x.decodeVideoTextureEmissive&&a.enable(20),x.alphaToCoverage&&a.enable(21),S.push(a.mask)}function v(S){const x=_[S.type];let P;if(x){const U=Ki[x];P=n1.clone(U.uniforms)}else P=S.uniforms;return P}function R(S,x){let P;for(let U=0,k=u.length;U<k;U++){const Y=u[U];if(Y.cacheKey===x){P=Y,++P.usedTimes;break}}return P===void 0&&(P=new mC(n,x,S,s),u.push(P)),P}function w(S){if(--S.usedTimes===0){const x=u.indexOf(S);u[x]=u[u.length-1],u.pop(),S.destroy()}}function T(S){l.remove(S)}function D(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:R,releaseProgram:w,releaseShaderCache:T,programs:u,dispose:D}}function yC(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,l){n.get(o)[a]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function SC(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function E_(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function T_(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(f,h,d,_,g,m){let p=n[e];return p===void 0?(p={id:f.id,object:f,geometry:h,material:d,groupOrder:_,renderOrder:f.renderOrder,z:g,group:m},n[e]=p):(p.id=f.id,p.object=f,p.geometry=h,p.material=d,p.groupOrder=_,p.renderOrder=f.renderOrder,p.z=g,p.group=m),e++,p}function a(f,h,d,_,g,m){const p=o(f,h,d,_,g,m);d.transmission>0?i.push(p):d.transparent===!0?r.push(p):t.push(p)}function l(f,h,d,_,g,m){const p=o(f,h,d,_,g,m);d.transmission>0?i.unshift(p):d.transparent===!0?r.unshift(p):t.unshift(p)}function c(f,h){t.length>1&&t.sort(f||SC),i.length>1&&i.sort(h||E_),r.length>1&&r.sort(h||E_)}function u(){for(let f=e,h=n.length;f<h;f++){const d=n[f];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:u,sort:c}}function MC(){let n=new WeakMap;function e(i,r){const s=n.get(i);let o;return s===void 0?(o=new T_,n.set(i,[o])):r>=s.length?(o=new T_,s.push(o)):o=s[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function bC(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new J,color:new ht};break;case"SpotLight":t={position:new J,direction:new J,color:new ht,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new J,color:new ht,distance:0,decay:0};break;case"HemisphereLight":t={direction:new J,skyColor:new ht,groundColor:new ht};break;case"RectAreaLight":t={color:new ht,position:new J,halfWidth:new J,halfHeight:new J};break}return n[e.id]=t,t}}}function EC(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new mt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new mt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new mt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let TC=0;function wC(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function AC(n){const e=new bC,t=EC(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new J);const r=new J,s=new Wt,o=new Wt;function a(c){let u=0,f=0,h=0;for(let S=0;S<9;S++)i.probe[S].set(0,0,0);let d=0,_=0,g=0,m=0,p=0,y=0,M=0,v=0,R=0,w=0,T=0;c.sort(wC);for(let S=0,x=c.length;S<x;S++){const P=c[S],U=P.color,k=P.intensity,Y=P.distance,te=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)u+=U.r*k,f+=U.g*k,h+=U.b*k;else if(P.isLightProbe){for(let W=0;W<9;W++)i.probe[W].addScaledVector(P.sh.coefficients[W],k);T++}else if(P.isDirectionalLight){const W=e.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const X=P.shadow,V=t.get(P);V.shadowIntensity=X.intensity,V.shadowBias=X.bias,V.shadowNormalBias=X.normalBias,V.shadowRadius=X.radius,V.shadowMapSize=X.mapSize,i.directionalShadow[d]=V,i.directionalShadowMap[d]=te,i.directionalShadowMatrix[d]=P.shadow.matrix,y++}i.directional[d]=W,d++}else if(P.isSpotLight){const W=e.get(P);W.position.setFromMatrixPosition(P.matrixWorld),W.color.copy(U).multiplyScalar(k),W.distance=Y,W.coneCos=Math.cos(P.angle),W.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),W.decay=P.decay,i.spot[g]=W;const X=P.shadow;if(P.map&&(i.spotLightMap[R]=P.map,R++,X.updateMatrices(P),P.castShadow&&w++),i.spotLightMatrix[g]=X.matrix,P.castShadow){const V=t.get(P);V.shadowIntensity=X.intensity,V.shadowBias=X.bias,V.shadowNormalBias=X.normalBias,V.shadowRadius=X.radius,V.shadowMapSize=X.mapSize,i.spotShadow[g]=V,i.spotShadowMap[g]=te,v++}g++}else if(P.isRectAreaLight){const W=e.get(P);W.color.copy(U).multiplyScalar(k),W.halfWidth.set(P.width*.5,0,0),W.halfHeight.set(0,P.height*.5,0),i.rectArea[m]=W,m++}else if(P.isPointLight){const W=e.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),W.distance=P.distance,W.decay=P.decay,P.castShadow){const X=P.shadow,V=t.get(P);V.shadowIntensity=X.intensity,V.shadowBias=X.bias,V.shadowNormalBias=X.normalBias,V.shadowRadius=X.radius,V.shadowMapSize=X.mapSize,V.shadowCameraNear=X.camera.near,V.shadowCameraFar=X.camera.far,i.pointShadow[_]=V,i.pointShadowMap[_]=te,i.pointShadowMatrix[_]=P.shadow.matrix,M++}i.point[_]=W,_++}else if(P.isHemisphereLight){const W=e.get(P);W.skyColor.copy(P.color).multiplyScalar(k),W.groundColor.copy(P.groundColor).multiplyScalar(k),i.hemi[p]=W,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Pe.LTC_FLOAT_1,i.rectAreaLTC2=Pe.LTC_FLOAT_2):(i.rectAreaLTC1=Pe.LTC_HALF_1,i.rectAreaLTC2=Pe.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=h;const D=i.hash;(D.directionalLength!==d||D.pointLength!==_||D.spotLength!==g||D.rectAreaLength!==m||D.hemiLength!==p||D.numDirectionalShadows!==y||D.numPointShadows!==M||D.numSpotShadows!==v||D.numSpotMaps!==R||D.numLightProbes!==T)&&(i.directional.length=d,i.spot.length=g,i.rectArea.length=m,i.point.length=_,i.hemi.length=p,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=M,i.pointShadowMap.length=M,i.spotShadow.length=v,i.spotShadowMap.length=v,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=M,i.spotLightMatrix.length=v+R-w,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=T,D.directionalLength=d,D.pointLength=_,D.spotLength=g,D.rectAreaLength=m,D.hemiLength=p,D.numDirectionalShadows=y,D.numPointShadows=M,D.numSpotShadows=v,D.numSpotMaps=R,D.numLightProbes=T,i.version=TC++)}function l(c,u){let f=0,h=0,d=0,_=0,g=0;const m=u.matrixWorldInverse;for(let p=0,y=c.length;p<y;p++){const M=c[p];if(M.isDirectionalLight){const v=i.directional[f];v.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(m),f++}else if(M.isSpotLight){const v=i.spot[d];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(m),d++}else if(M.isRectAreaLight){const v=i.rectArea[_];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(m),o.identity(),s.copy(M.matrixWorld),s.premultiply(m),o.extractRotation(s),v.halfWidth.set(M.width*.5,0,0),v.halfHeight.set(0,M.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),_++}else if(M.isPointLight){const v=i.point[h];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(m),h++}else if(M.isHemisphereLight){const v=i.hemi[g];v.direction.setFromMatrixPosition(M.matrixWorld),v.direction.transformDirection(m),g++}}}return{setup:a,setupView:l,state:i}}function w_(n){const e=new AC(n),t=[],i=[];function r(u){c.camera=u,t.length=0,i.length=0}function s(u){t.push(u)}function o(u){i.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function CC(n){let e=new WeakMap;function t(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new w_(n),e.set(r,[a])):s>=o.length?(a=new w_(n),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:t,dispose:i}}class RC extends fa{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=uE,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class PC extends fa{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const DC=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,LC=`uniform sampler2D shadow_pass;
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
}`;function IC(n,e,t){let i=new ep;const r=new mt,s=new mt,o=new Yt,a=new RC({depthPacking:fE}),l=new PC,c={},u=t.maxTextureSize,f={[ms]:Wn,[Wn]:ms,[Mr]:Mr},h=new _s({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new mt},radius:{value:4}},vertexShader:DC,fragmentShader:LC}),d=h.clone();d.defines.HORIZONTAL_PASS=1;const _=new Ri;_.setAttribute("position",new zi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new kn(_,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Mv;let p=this.type;this.render=function(w,T,D){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;const S=n.getRenderTarget(),x=n.getActiveCubeFace(),P=n.getActiveMipmapLevel(),U=n.state;U.setBlending(os),U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const k=p!==dr&&this.type===dr,Y=p===dr&&this.type!==dr;for(let te=0,W=w.length;te<W;te++){const X=w[te],V=X.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",X,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;r.copy(V.mapSize);const ae=V.getFrameExtents();if(r.multiply(ae),s.copy(V.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/ae.x),r.x=s.x*ae.x,V.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/ae.y),r.y=s.y*ae.y,V.mapSize.y=s.y)),V.map===null||k===!0||Y===!0){const ge=this.type!==dr?{minFilter:ki,magFilter:ki}:{};V.map!==null&&V.map.dispose(),V.map=new ro(r.x,r.y,ge),V.map.texture.name=X.name+".shadowMap",V.camera.updateProjectionMatrix()}n.setRenderTarget(V.map),n.clear();const N=V.getViewportCount();for(let ge=0;ge<N;ge++){const we=V.getViewport(ge);o.set(s.x*we.x,s.y*we.y,s.x*we.z,s.y*we.w),U.viewport(o),V.updateMatrices(X,ge),i=V.getFrustum(),v(T,D,V.camera,X,this.type)}V.isPointLightShadow!==!0&&this.type===dr&&y(V,D),V.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(S,x,P)};function y(w,T){const D=e.update(g);h.defines.VSM_SAMPLES!==w.blurSamples&&(h.defines.VSM_SAMPLES=w.blurSamples,d.defines.VSM_SAMPLES=w.blurSamples,h.needsUpdate=!0,d.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new ro(r.x,r.y)),h.uniforms.shadow_pass.value=w.map.texture,h.uniforms.resolution.value=w.mapSize,h.uniforms.radius.value=w.radius,n.setRenderTarget(w.mapPass),n.clear(),n.renderBufferDirect(T,null,D,h,g,null),d.uniforms.shadow_pass.value=w.mapPass.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,n.setRenderTarget(w.map),n.clear(),n.renderBufferDirect(T,null,D,d,g,null)}function M(w,T,D,S){let x=null;const P=D.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(P!==void 0)x=P;else if(x=D.isPointLight===!0?l:a,n.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const U=x.uuid,k=T.uuid;let Y=c[U];Y===void 0&&(Y={},c[U]=Y);let te=Y[k];te===void 0&&(te=x.clone(),Y[k]=te,T.addEventListener("dispose",R)),x=te}if(x.visible=T.visible,x.wireframe=T.wireframe,S===dr?x.side=T.shadowSide!==null?T.shadowSide:T.side:x.side=T.shadowSide!==null?T.shadowSide:f[T.side],x.alphaMap=T.alphaMap,x.alphaTest=T.alphaTest,x.map=T.map,x.clipShadows=T.clipShadows,x.clippingPlanes=T.clippingPlanes,x.clipIntersection=T.clipIntersection,x.displacementMap=T.displacementMap,x.displacementScale=T.displacementScale,x.displacementBias=T.displacementBias,x.wireframeLinewidth=T.wireframeLinewidth,x.linewidth=T.linewidth,D.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const U=n.properties.get(x);U.light=D}return x}function v(w,T,D,S,x){if(w.visible===!1)return;if(w.layers.test(T.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&x===dr)&&(!w.frustumCulled||i.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,w.matrixWorld);const k=e.update(w),Y=w.material;if(Array.isArray(Y)){const te=k.groups;for(let W=0,X=te.length;W<X;W++){const V=te[W],ae=Y[V.materialIndex];if(ae&&ae.visible){const N=M(w,ae,S,x);w.onBeforeShadow(n,w,T,D,k,N,V),n.renderBufferDirect(D,null,k,N,w,V),w.onAfterShadow(n,w,T,D,k,N,V)}}}else if(Y.visible){const te=M(w,Y,S,x);w.onBeforeShadow(n,w,T,D,k,te,null),n.renderBufferDirect(D,null,k,te,w,null),w.onAfterShadow(n,w,T,D,k,te,null)}}const U=w.children;for(let k=0,Y=U.length;k<Y;k++)v(U[k],T,D,S,x)}function R(w){w.target.removeEventListener("dispose",R);for(const D in c){const S=c[D],x=w.target.uuid;x in S&&(S[x].dispose(),delete S[x])}}}const UC={[vh]:xh,[yh]:bh,[Sh]:Eh,[na]:Mh,[xh]:vh,[bh]:yh,[Eh]:Sh,[Mh]:na};function NC(n,e){function t(){let B=!1;const Te=new Yt;let re=null;const ce=new Yt(0,0,0,0);return{setMask:function(Ee){re!==Ee&&!B&&(n.colorMask(Ee,Ee,Ee,Ee),re=Ee)},setLocked:function(Ee){B=Ee},setClear:function(Ee,Ae,qe,_t,Xt){Xt===!0&&(Ee*=_t,Ae*=_t,qe*=_t),Te.set(Ee,Ae,qe,_t),ce.equals(Te)===!1&&(n.clearColor(Ee,Ae,qe,_t),ce.copy(Te))},reset:function(){B=!1,re=null,ce.set(-1,0,0,0)}}}function i(){let B=!1,Te=!1,re=null,ce=null,Ee=null;return{setReversed:function(Ae){if(Te!==Ae){const qe=e.get("EXT_clip_control");Te?qe.clipControlEXT(qe.LOWER_LEFT_EXT,qe.ZERO_TO_ONE_EXT):qe.clipControlEXT(qe.LOWER_LEFT_EXT,qe.NEGATIVE_ONE_TO_ONE_EXT);const _t=Ee;Ee=null,this.setClear(_t)}Te=Ae},getReversed:function(){return Te},setTest:function(Ae){Ae?he(n.DEPTH_TEST):se(n.DEPTH_TEST)},setMask:function(Ae){re!==Ae&&!B&&(n.depthMask(Ae),re=Ae)},setFunc:function(Ae){if(Te&&(Ae=UC[Ae]),ce!==Ae){switch(Ae){case vh:n.depthFunc(n.NEVER);break;case xh:n.depthFunc(n.ALWAYS);break;case yh:n.depthFunc(n.LESS);break;case na:n.depthFunc(n.LEQUAL);break;case Sh:n.depthFunc(n.EQUAL);break;case Mh:n.depthFunc(n.GEQUAL);break;case bh:n.depthFunc(n.GREATER);break;case Eh:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ce=Ae}},setLocked:function(Ae){B=Ae},setClear:function(Ae){Ee!==Ae&&(Te&&(Ae=1-Ae),n.clearDepth(Ae),Ee=Ae)},reset:function(){B=!1,re=null,ce=null,Ee=null,Te=!1}}}function r(){let B=!1,Te=null,re=null,ce=null,Ee=null,Ae=null,qe=null,_t=null,Xt=null;return{setTest:function(De){B||(De?he(n.STENCIL_TEST):se(n.STENCIL_TEST))},setMask:function(De){Te!==De&&!B&&(n.stencilMask(De),Te=De)},setFunc:function(De,Fe,rt){(re!==De||ce!==Fe||Ee!==rt)&&(n.stencilFunc(De,Fe,rt),re=De,ce=Fe,Ee=rt)},setOp:function(De,Fe,rt){(Ae!==De||qe!==Fe||_t!==rt)&&(n.stencilOp(De,Fe,rt),Ae=De,qe=Fe,_t=rt)},setLocked:function(De){B=De},setClear:function(De){Xt!==De&&(n.clearStencil(De),Xt=De)},reset:function(){B=!1,Te=null,re=null,ce=null,Ee=null,Ae=null,qe=null,_t=null,Xt=null}}}const s=new t,o=new i,a=new r,l=new WeakMap,c=new WeakMap;let u={},f={},h=new WeakMap,d=[],_=null,g=!1,m=null,p=null,y=null,M=null,v=null,R=null,w=null,T=new ht(0,0,0),D=0,S=!1,x=null,P=null,U=null,k=null,Y=null;const te=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,X=0;const V=n.getParameter(n.VERSION);V.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(V)[1]),W=X>=1):V.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),W=X>=2);let ae=null,N={};const ge=n.getParameter(n.SCISSOR_BOX),we=n.getParameter(n.VIEWPORT),Be=new Yt().fromArray(ge),ee=new Yt().fromArray(we);function fe(B,Te,re,ce){const Ee=new Uint8Array(4),Ae=n.createTexture();n.bindTexture(B,Ae),n.texParameteri(B,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(B,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let qe=0;qe<re;qe++)B===n.TEXTURE_3D||B===n.TEXTURE_2D_ARRAY?n.texImage3D(Te,0,n.RGBA,1,1,ce,0,n.RGBA,n.UNSIGNED_BYTE,Ee):n.texImage2D(Te+qe,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Ee);return Ae}const de={};de[n.TEXTURE_2D]=fe(n.TEXTURE_2D,n.TEXTURE_2D,1),de[n.TEXTURE_CUBE_MAP]=fe(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),de[n.TEXTURE_2D_ARRAY]=fe(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),de[n.TEXTURE_3D]=fe(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),he(n.DEPTH_TEST),o.setFunc(na),Q(!1),L(Cm),he(n.CULL_FACE),C(os);function he(B){u[B]!==!0&&(n.enable(B),u[B]=!0)}function se(B){u[B]!==!1&&(n.disable(B),u[B]=!1)}function _e(B,Te){return f[B]!==Te?(n.bindFramebuffer(B,Te),f[B]=Te,B===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=Te),B===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=Te),!0):!1}function be(B,Te){let re=d,ce=!1;if(B){re=h.get(Te),re===void 0&&(re=[],h.set(Te,re));const Ee=B.textures;if(re.length!==Ee.length||re[0]!==n.COLOR_ATTACHMENT0){for(let Ae=0,qe=Ee.length;Ae<qe;Ae++)re[Ae]=n.COLOR_ATTACHMENT0+Ae;re.length=Ee.length,ce=!0}}else re[0]!==n.BACK&&(re[0]=n.BACK,ce=!0);ce&&n.drawBuffers(re)}function Ie(B){return _!==B?(n.useProgram(B),_=B,!0):!1}const I={[ks]:n.FUNC_ADD,[Bb]:n.FUNC_SUBTRACT,[kb]:n.FUNC_REVERSE_SUBTRACT};I[zb]=n.MIN,I[Hb]=n.MAX;const O={[Vb]:n.ZERO,[Gb]:n.ONE,[Wb]:n.SRC_COLOR,[_h]:n.SRC_ALPHA,[jb]:n.SRC_ALPHA_SATURATE,[qb]:n.DST_COLOR,[Yb]:n.DST_ALPHA,[Xb]:n.ONE_MINUS_SRC_COLOR,[gh]:n.ONE_MINUS_SRC_ALPHA,[Kb]:n.ONE_MINUS_DST_COLOR,[$b]:n.ONE_MINUS_DST_ALPHA,[Zb]:n.CONSTANT_COLOR,[Jb]:n.ONE_MINUS_CONSTANT_COLOR,[Qb]:n.CONSTANT_ALPHA,[eE]:n.ONE_MINUS_CONSTANT_ALPHA};function C(B,Te,re,ce,Ee,Ae,qe,_t,Xt,De){if(B===os){g===!0&&(se(n.BLEND),g=!1);return}if(g===!1&&(he(n.BLEND),g=!0),B!==Fb){if(B!==m||De!==S){if((p!==ks||v!==ks)&&(n.blendEquation(n.FUNC_ADD),p=ks,v=ks),De)switch(B){case Yo:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Rm:n.blendFunc(n.ONE,n.ONE);break;case Pm:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Dm:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}else switch(B){case Yo:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Rm:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Pm:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Dm:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}y=null,M=null,R=null,w=null,T.set(0,0,0),D=0,m=B,S=De}return}Ee=Ee||Te,Ae=Ae||re,qe=qe||ce,(Te!==p||Ee!==v)&&(n.blendEquationSeparate(I[Te],I[Ee]),p=Te,v=Ee),(re!==y||ce!==M||Ae!==R||qe!==w)&&(n.blendFuncSeparate(O[re],O[ce],O[Ae],O[qe]),y=re,M=ce,R=Ae,w=qe),(_t.equals(T)===!1||Xt!==D)&&(n.blendColor(_t.r,_t.g,_t.b,Xt),T.copy(_t),D=Xt),m=B,S=!1}function oe(B,Te){B.side===Mr?se(n.CULL_FACE):he(n.CULL_FACE);let re=B.side===Wn;Te&&(re=!re),Q(re),B.blending===Yo&&B.transparent===!1?C(os):C(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),o.setFunc(B.depthFunc),o.setTest(B.depthTest),o.setMask(B.depthWrite),s.setMask(B.colorWrite);const ce=B.stencilWrite;a.setTest(ce),ce&&(a.setMask(B.stencilWriteMask),a.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),a.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),le(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?he(n.SAMPLE_ALPHA_TO_COVERAGE):se(n.SAMPLE_ALPHA_TO_COVERAGE)}function Q(B){x!==B&&(B?n.frontFace(n.CW):n.frontFace(n.CCW),x=B)}function L(B){B!==Ub?(he(n.CULL_FACE),B!==P&&(B===Cm?n.cullFace(n.BACK):B===Nb?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):se(n.CULL_FACE),P=B}function ne(B){B!==U&&(W&&n.lineWidth(B),U=B)}function le(B,Te,re){B?(he(n.POLYGON_OFFSET_FILL),(k!==Te||Y!==re)&&(n.polygonOffset(Te,re),k=Te,Y=re)):se(n.POLYGON_OFFSET_FILL)}function ie(B){B?he(n.SCISSOR_TEST):se(n.SCISSOR_TEST)}function E(B){B===void 0&&(B=n.TEXTURE0+te-1),ae!==B&&(n.activeTexture(B),ae=B)}function b(B,Te,re){re===void 0&&(ae===null?re=n.TEXTURE0+te-1:re=ae);let ce=N[re];ce===void 0&&(ce={type:void 0,texture:void 0},N[re]=ce),(ce.type!==B||ce.texture!==Te)&&(ae!==re&&(n.activeTexture(re),ae=re),n.bindTexture(B,Te||de[B]),ce.type=B,ce.texture=Te)}function F(){const B=N[ae];B!==void 0&&B.type!==void 0&&(n.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function $(){try{n.compressedTexImage2D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function q(){try{n.compressedTexImage3D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Z(){try{n.texSubImage2D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function pe(){try{n.texSubImage3D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ue(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function xe(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function He(){try{n.texStorage2D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function me(){try{n.texStorage3D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ve(){try{n.texImage2D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ze(){try{n.texImage3D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Ve(B){Be.equals(B)===!1&&(n.scissor(B.x,B.y,B.z,B.w),Be.copy(B))}function Me(B){ee.equals(B)===!1&&(n.viewport(B.x,B.y,B.z,B.w),ee.copy(B))}function We(B,Te){let re=c.get(Te);re===void 0&&(re=new WeakMap,c.set(Te,re));let ce=re.get(B);ce===void 0&&(ce=n.getUniformBlockIndex(Te,B.name),re.set(B,ce))}function Xe(B,Te){const ce=c.get(Te).get(B);l.get(Te)!==ce&&(n.uniformBlockBinding(Te,ce,B.__bindingPointIndex),l.set(Te,ce))}function ft(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},ae=null,N={},f={},h=new WeakMap,d=[],_=null,g=!1,m=null,p=null,y=null,M=null,v=null,R=null,w=null,T=new ht(0,0,0),D=0,S=!1,x=null,P=null,U=null,k=null,Y=null,Be.set(0,0,n.canvas.width,n.canvas.height),ee.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:he,disable:se,bindFramebuffer:_e,drawBuffers:be,useProgram:Ie,setBlending:C,setMaterial:oe,setFlipSided:Q,setCullFace:L,setLineWidth:ne,setPolygonOffset:le,setScissorTest:ie,activeTexture:E,bindTexture:b,unbindTexture:F,compressedTexImage2D:$,compressedTexImage3D:q,texImage2D:ve,texImage3D:ze,updateUBOMapping:We,uniformBlockBinding:Xe,texStorage2D:He,texStorage3D:me,texSubImage2D:Z,texSubImage3D:pe,compressedTexSubImage2D:ue,compressedTexSubImage3D:xe,scissor:Ve,viewport:Me,reset:ft}}function A_(n,e,t,i){const r=OC(i);switch(t){case Rv:return n*e;case Dv:return n*e;case Lv:return n*e*2;case Iv:return n*e/r.components*r.byteLength;case jd:return n*e/r.components*r.byteLength;case Uv:return n*e*2/r.components*r.byteLength;case Zd:return n*e*2/r.components*r.byteLength;case Pv:return n*e*3/r.components*r.byteLength;case Fi:return n*e*4/r.components*r.byteLength;case Jd:return n*e*4/r.components*r.byteLength;case Rc:case Pc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Dc:case Lc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ph:case Lh:return Math.max(n,16)*Math.max(e,8)/4;case Rh:case Dh:return Math.max(n,8)*Math.max(e,8)/2;case Ih:case Uh:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Nh:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Oh:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Fh:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Bh:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case kh:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case zh:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Hh:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Vh:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Gh:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Wh:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Xh:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Yh:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case $h:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case qh:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Kh:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Ic:case jh:case Zh:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Nv:case Jh:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Qh:case ed:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function OC(n){switch(n){case Lr:case wv:return{byteLength:1,components:1};case xl:case Av:case El:return{byteLength:2,components:1};case qd:case Kd:return{byteLength:2,components:4};case io:case $d:case Er:return{byteLength:4,components:1};case Cv:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function FC(n,e,t,i,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new mt,u=new WeakMap;let f;const h=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(E,b){return d?new OffscreenCanvas(E,b):ru("canvas")}function g(E,b,F){let $=1;const q=ie(E);if((q.width>F||q.height>F)&&($=F/Math.max(q.width,q.height)),$<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){const Z=Math.floor($*q.width),pe=Math.floor($*q.height);f===void 0&&(f=_(Z,pe));const ue=b?_(Z,pe):f;return ue.width=Z,ue.height=pe,ue.getContext("2d").drawImage(E,0,0,Z,pe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+q.width+"x"+q.height+") to ("+Z+"x"+pe+")."),ue}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+q.width+"x"+q.height+")."),E;return E}function m(E){return E.generateMipmaps}function p(E){n.generateMipmap(E)}function y(E){return E.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?n.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function M(E,b,F,$,q=!1){if(E!==null){if(n[E]!==void 0)return n[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let Z=b;if(b===n.RED&&(F===n.FLOAT&&(Z=n.R32F),F===n.HALF_FLOAT&&(Z=n.R16F),F===n.UNSIGNED_BYTE&&(Z=n.R8)),b===n.RED_INTEGER&&(F===n.UNSIGNED_BYTE&&(Z=n.R8UI),F===n.UNSIGNED_SHORT&&(Z=n.R16UI),F===n.UNSIGNED_INT&&(Z=n.R32UI),F===n.BYTE&&(Z=n.R8I),F===n.SHORT&&(Z=n.R16I),F===n.INT&&(Z=n.R32I)),b===n.RG&&(F===n.FLOAT&&(Z=n.RG32F),F===n.HALF_FLOAT&&(Z=n.RG16F),F===n.UNSIGNED_BYTE&&(Z=n.RG8)),b===n.RG_INTEGER&&(F===n.UNSIGNED_BYTE&&(Z=n.RG8UI),F===n.UNSIGNED_SHORT&&(Z=n.RG16UI),F===n.UNSIGNED_INT&&(Z=n.RG32UI),F===n.BYTE&&(Z=n.RG8I),F===n.SHORT&&(Z=n.RG16I),F===n.INT&&(Z=n.RG32I)),b===n.RGB_INTEGER&&(F===n.UNSIGNED_BYTE&&(Z=n.RGB8UI),F===n.UNSIGNED_SHORT&&(Z=n.RGB16UI),F===n.UNSIGNED_INT&&(Z=n.RGB32UI),F===n.BYTE&&(Z=n.RGB8I),F===n.SHORT&&(Z=n.RGB16I),F===n.INT&&(Z=n.RGB32I)),b===n.RGBA_INTEGER&&(F===n.UNSIGNED_BYTE&&(Z=n.RGBA8UI),F===n.UNSIGNED_SHORT&&(Z=n.RGBA16UI),F===n.UNSIGNED_INT&&(Z=n.RGBA32UI),F===n.BYTE&&(Z=n.RGBA8I),F===n.SHORT&&(Z=n.RGBA16I),F===n.INT&&(Z=n.RGBA32I)),b===n.RGB&&F===n.UNSIGNED_INT_5_9_9_9_REV&&(Z=n.RGB9_E5),b===n.RGBA){const pe=q?bu:pt.getTransfer($);F===n.FLOAT&&(Z=n.RGBA32F),F===n.HALF_FLOAT&&(Z=n.RGBA16F),F===n.UNSIGNED_BYTE&&(Z=pe===wt?n.SRGB8_ALPHA8:n.RGBA8),F===n.UNSIGNED_SHORT_4_4_4_4&&(Z=n.RGBA4),F===n.UNSIGNED_SHORT_5_5_5_1&&(Z=n.RGB5_A1)}return(Z===n.R16F||Z===n.R32F||Z===n.RG16F||Z===n.RG32F||Z===n.RGBA16F||Z===n.RGBA32F)&&e.get("EXT_color_buffer_float"),Z}function v(E,b){let F;return E?b===null||b===io||b===sa?F=n.DEPTH24_STENCIL8:b===Er?F=n.DEPTH32F_STENCIL8:b===xl&&(F=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===io||b===sa?F=n.DEPTH_COMPONENT24:b===Er?F=n.DEPTH_COMPONENT32F:b===xl&&(F=n.DEPTH_COMPONENT16),F}function R(E,b){return m(E)===!0||E.isFramebufferTexture&&E.minFilter!==ki&&E.minFilter!==Qi?Math.log2(Math.max(b.width,b.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?b.mipmaps.length:1}function w(E){const b=E.target;b.removeEventListener("dispose",w),D(b),b.isVideoTexture&&u.delete(b)}function T(E){const b=E.target;b.removeEventListener("dispose",T),x(b)}function D(E){const b=i.get(E);if(b.__webglInit===void 0)return;const F=E.source,$=h.get(F);if($){const q=$[b.__cacheKey];q.usedTimes--,q.usedTimes===0&&S(E),Object.keys($).length===0&&h.delete(F)}i.remove(E)}function S(E){const b=i.get(E);n.deleteTexture(b.__webglTexture);const F=E.source,$=h.get(F);delete $[b.__cacheKey],o.memory.textures--}function x(E){const b=i.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),i.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(b.__webglFramebuffer[$]))for(let q=0;q<b.__webglFramebuffer[$].length;q++)n.deleteFramebuffer(b.__webglFramebuffer[$][q]);else n.deleteFramebuffer(b.__webglFramebuffer[$]);b.__webglDepthbuffer&&n.deleteRenderbuffer(b.__webglDepthbuffer[$])}else{if(Array.isArray(b.__webglFramebuffer))for(let $=0;$<b.__webglFramebuffer.length;$++)n.deleteFramebuffer(b.__webglFramebuffer[$]);else n.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&n.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&n.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let $=0;$<b.__webglColorRenderbuffer.length;$++)b.__webglColorRenderbuffer[$]&&n.deleteRenderbuffer(b.__webglColorRenderbuffer[$]);b.__webglDepthRenderbuffer&&n.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const F=E.textures;for(let $=0,q=F.length;$<q;$++){const Z=i.get(F[$]);Z.__webglTexture&&(n.deleteTexture(Z.__webglTexture),o.memory.textures--),i.remove(F[$])}i.remove(E)}let P=0;function U(){P=0}function k(){const E=P;return E>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+r.maxTextures),P+=1,E}function Y(E){const b=[];return b.push(E.wrapS),b.push(E.wrapT),b.push(E.wrapR||0),b.push(E.magFilter),b.push(E.minFilter),b.push(E.anisotropy),b.push(E.internalFormat),b.push(E.format),b.push(E.type),b.push(E.generateMipmaps),b.push(E.premultiplyAlpha),b.push(E.flipY),b.push(E.unpackAlignment),b.push(E.colorSpace),b.join()}function te(E,b){const F=i.get(E);if(E.isVideoTexture&&ne(E),E.isRenderTargetTexture===!1&&E.version>0&&F.__version!==E.version){const $=E.image;if($===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ee(F,E,b);return}}t.bindTexture(n.TEXTURE_2D,F.__webglTexture,n.TEXTURE0+b)}function W(E,b){const F=i.get(E);if(E.version>0&&F.__version!==E.version){ee(F,E,b);return}t.bindTexture(n.TEXTURE_2D_ARRAY,F.__webglTexture,n.TEXTURE0+b)}function X(E,b){const F=i.get(E);if(E.version>0&&F.__version!==E.version){ee(F,E,b);return}t.bindTexture(n.TEXTURE_3D,F.__webglTexture,n.TEXTURE0+b)}function V(E,b){const F=i.get(E);if(E.version>0&&F.__version!==E.version){fe(F,E,b);return}t.bindTexture(n.TEXTURE_CUBE_MAP,F.__webglTexture,n.TEXTURE0+b)}const ae={[Ah]:n.REPEAT,[Gs]:n.CLAMP_TO_EDGE,[Ch]:n.MIRRORED_REPEAT},N={[ki]:n.NEAREST,[cE]:n.NEAREST_MIPMAP_NEAREST,[Xl]:n.NEAREST_MIPMAP_LINEAR,[Qi]:n.LINEAR,[nf]:n.LINEAR_MIPMAP_NEAREST,[Ws]:n.LINEAR_MIPMAP_LINEAR},ge={[dE]:n.NEVER,[xE]:n.ALWAYS,[pE]:n.LESS,[Fv]:n.LEQUAL,[mE]:n.EQUAL,[vE]:n.GEQUAL,[_E]:n.GREATER,[gE]:n.NOTEQUAL};function we(E,b){if(b.type===Er&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===Qi||b.magFilter===nf||b.magFilter===Xl||b.magFilter===Ws||b.minFilter===Qi||b.minFilter===nf||b.minFilter===Xl||b.minFilter===Ws)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(E,n.TEXTURE_WRAP_S,ae[b.wrapS]),n.texParameteri(E,n.TEXTURE_WRAP_T,ae[b.wrapT]),(E===n.TEXTURE_3D||E===n.TEXTURE_2D_ARRAY)&&n.texParameteri(E,n.TEXTURE_WRAP_R,ae[b.wrapR]),n.texParameteri(E,n.TEXTURE_MAG_FILTER,N[b.magFilter]),n.texParameteri(E,n.TEXTURE_MIN_FILTER,N[b.minFilter]),b.compareFunction&&(n.texParameteri(E,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(E,n.TEXTURE_COMPARE_FUNC,ge[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===ki||b.minFilter!==Xl&&b.minFilter!==Ws||b.type===Er&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||i.get(b).__currentAnisotropy){const F=e.get("EXT_texture_filter_anisotropic");n.texParameterf(E,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,r.getMaxAnisotropy())),i.get(b).__currentAnisotropy=b.anisotropy}}}function Be(E,b){let F=!1;E.__webglInit===void 0&&(E.__webglInit=!0,b.addEventListener("dispose",w));const $=b.source;let q=h.get($);q===void 0&&(q={},h.set($,q));const Z=Y(b);if(Z!==E.__cacheKey){q[Z]===void 0&&(q[Z]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,F=!0),q[Z].usedTimes++;const pe=q[E.__cacheKey];pe!==void 0&&(q[E.__cacheKey].usedTimes--,pe.usedTimes===0&&S(b)),E.__cacheKey=Z,E.__webglTexture=q[Z].texture}return F}function ee(E,b,F){let $=n.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&($=n.TEXTURE_2D_ARRAY),b.isData3DTexture&&($=n.TEXTURE_3D);const q=Be(E,b),Z=b.source;t.bindTexture($,E.__webglTexture,n.TEXTURE0+F);const pe=i.get(Z);if(Z.version!==pe.__version||q===!0){t.activeTexture(n.TEXTURE0+F);const ue=pt.getPrimaries(pt.workingColorSpace),xe=b.colorSpace===Kr?null:pt.getPrimaries(b.colorSpace),He=b.colorSpace===Kr||ue===xe?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,He);let me=g(b.image,!1,r.maxTextureSize);me=le(b,me);const ve=s.convert(b.format,b.colorSpace),ze=s.convert(b.type);let Ve=M(b.internalFormat,ve,ze,b.colorSpace,b.isVideoTexture);we($,b);let Me;const We=b.mipmaps,Xe=b.isVideoTexture!==!0,ft=pe.__version===void 0||q===!0,B=Z.dataReady,Te=R(b,me);if(b.isDepthTexture)Ve=v(b.format===oa,b.type),ft&&(Xe?t.texStorage2D(n.TEXTURE_2D,1,Ve,me.width,me.height):t.texImage2D(n.TEXTURE_2D,0,Ve,me.width,me.height,0,ve,ze,null));else if(b.isDataTexture)if(We.length>0){Xe&&ft&&t.texStorage2D(n.TEXTURE_2D,Te,Ve,We[0].width,We[0].height);for(let re=0,ce=We.length;re<ce;re++)Me=We[re],Xe?B&&t.texSubImage2D(n.TEXTURE_2D,re,0,0,Me.width,Me.height,ve,ze,Me.data):t.texImage2D(n.TEXTURE_2D,re,Ve,Me.width,Me.height,0,ve,ze,Me.data);b.generateMipmaps=!1}else Xe?(ft&&t.texStorage2D(n.TEXTURE_2D,Te,Ve,me.width,me.height),B&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,me.width,me.height,ve,ze,me.data)):t.texImage2D(n.TEXTURE_2D,0,Ve,me.width,me.height,0,ve,ze,me.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Xe&&ft&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Te,Ve,We[0].width,We[0].height,me.depth);for(let re=0,ce=We.length;re<ce;re++)if(Me=We[re],b.format!==Fi)if(ve!==null)if(Xe){if(B)if(b.layerUpdates.size>0){const Ee=A_(Me.width,Me.height,b.format,b.type);for(const Ae of b.layerUpdates){const qe=Me.data.subarray(Ae*Ee/Me.data.BYTES_PER_ELEMENT,(Ae+1)*Ee/Me.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,re,0,0,Ae,Me.width,Me.height,1,ve,qe)}b.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,re,0,0,0,Me.width,Me.height,me.depth,ve,Me.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,re,Ve,Me.width,Me.height,me.depth,0,Me.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Xe?B&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,re,0,0,0,Me.width,Me.height,me.depth,ve,ze,Me.data):t.texImage3D(n.TEXTURE_2D_ARRAY,re,Ve,Me.width,Me.height,me.depth,0,ve,ze,Me.data)}else{Xe&&ft&&t.texStorage2D(n.TEXTURE_2D,Te,Ve,We[0].width,We[0].height);for(let re=0,ce=We.length;re<ce;re++)Me=We[re],b.format!==Fi?ve!==null?Xe?B&&t.compressedTexSubImage2D(n.TEXTURE_2D,re,0,0,Me.width,Me.height,ve,Me.data):t.compressedTexImage2D(n.TEXTURE_2D,re,Ve,Me.width,Me.height,0,Me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Xe?B&&t.texSubImage2D(n.TEXTURE_2D,re,0,0,Me.width,Me.height,ve,ze,Me.data):t.texImage2D(n.TEXTURE_2D,re,Ve,Me.width,Me.height,0,ve,ze,Me.data)}else if(b.isDataArrayTexture)if(Xe){if(ft&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Te,Ve,me.width,me.height,me.depth),B)if(b.layerUpdates.size>0){const re=A_(me.width,me.height,b.format,b.type);for(const ce of b.layerUpdates){const Ee=me.data.subarray(ce*re/me.data.BYTES_PER_ELEMENT,(ce+1)*re/me.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ce,me.width,me.height,1,ve,ze,Ee)}b.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,me.width,me.height,me.depth,ve,ze,me.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ve,me.width,me.height,me.depth,0,ve,ze,me.data);else if(b.isData3DTexture)Xe?(ft&&t.texStorage3D(n.TEXTURE_3D,Te,Ve,me.width,me.height,me.depth),B&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,me.width,me.height,me.depth,ve,ze,me.data)):t.texImage3D(n.TEXTURE_3D,0,Ve,me.width,me.height,me.depth,0,ve,ze,me.data);else if(b.isFramebufferTexture){if(ft)if(Xe)t.texStorage2D(n.TEXTURE_2D,Te,Ve,me.width,me.height);else{let re=me.width,ce=me.height;for(let Ee=0;Ee<Te;Ee++)t.texImage2D(n.TEXTURE_2D,Ee,Ve,re,ce,0,ve,ze,null),re>>=1,ce>>=1}}else if(We.length>0){if(Xe&&ft){const re=ie(We[0]);t.texStorage2D(n.TEXTURE_2D,Te,Ve,re.width,re.height)}for(let re=0,ce=We.length;re<ce;re++)Me=We[re],Xe?B&&t.texSubImage2D(n.TEXTURE_2D,re,0,0,ve,ze,Me):t.texImage2D(n.TEXTURE_2D,re,Ve,ve,ze,Me);b.generateMipmaps=!1}else if(Xe){if(ft){const re=ie(me);t.texStorage2D(n.TEXTURE_2D,Te,Ve,re.width,re.height)}B&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ve,ze,me)}else t.texImage2D(n.TEXTURE_2D,0,Ve,ve,ze,me);m(b)&&p($),pe.__version=Z.version,b.onUpdate&&b.onUpdate(b)}E.__version=b.version}function fe(E,b,F){if(b.image.length!==6)return;const $=Be(E,b),q=b.source;t.bindTexture(n.TEXTURE_CUBE_MAP,E.__webglTexture,n.TEXTURE0+F);const Z=i.get(q);if(q.version!==Z.__version||$===!0){t.activeTexture(n.TEXTURE0+F);const pe=pt.getPrimaries(pt.workingColorSpace),ue=b.colorSpace===Kr?null:pt.getPrimaries(b.colorSpace),xe=b.colorSpace===Kr||pe===ue?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,xe);const He=b.isCompressedTexture||b.image[0].isCompressedTexture,me=b.image[0]&&b.image[0].isDataTexture,ve=[];for(let ce=0;ce<6;ce++)!He&&!me?ve[ce]=g(b.image[ce],!0,r.maxCubemapSize):ve[ce]=me?b.image[ce].image:b.image[ce],ve[ce]=le(b,ve[ce]);const ze=ve[0],Ve=s.convert(b.format,b.colorSpace),Me=s.convert(b.type),We=M(b.internalFormat,Ve,Me,b.colorSpace),Xe=b.isVideoTexture!==!0,ft=Z.__version===void 0||$===!0,B=q.dataReady;let Te=R(b,ze);we(n.TEXTURE_CUBE_MAP,b);let re;if(He){Xe&&ft&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Te,We,ze.width,ze.height);for(let ce=0;ce<6;ce++){re=ve[ce].mipmaps;for(let Ee=0;Ee<re.length;Ee++){const Ae=re[Ee];b.format!==Fi?Ve!==null?Xe?B&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ee,0,0,Ae.width,Ae.height,Ve,Ae.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ee,We,Ae.width,Ae.height,0,Ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Xe?B&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ee,0,0,Ae.width,Ae.height,Ve,Me,Ae.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ee,We,Ae.width,Ae.height,0,Ve,Me,Ae.data)}}}else{if(re=b.mipmaps,Xe&&ft){re.length>0&&Te++;const ce=ie(ve[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Te,We,ce.width,ce.height)}for(let ce=0;ce<6;ce++)if(me){Xe?B&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,0,0,ve[ce].width,ve[ce].height,Ve,Me,ve[ce].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,We,ve[ce].width,ve[ce].height,0,Ve,Me,ve[ce].data);for(let Ee=0;Ee<re.length;Ee++){const qe=re[Ee].image[ce].image;Xe?B&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ee+1,0,0,qe.width,qe.height,Ve,Me,qe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ee+1,We,qe.width,qe.height,0,Ve,Me,qe.data)}}else{Xe?B&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,0,0,Ve,Me,ve[ce]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,We,Ve,Me,ve[ce]);for(let Ee=0;Ee<re.length;Ee++){const Ae=re[Ee];Xe?B&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ee+1,0,0,Ve,Me,Ae.image[ce]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ee+1,We,Ve,Me,Ae.image[ce])}}}m(b)&&p(n.TEXTURE_CUBE_MAP),Z.__version=q.version,b.onUpdate&&b.onUpdate(b)}E.__version=b.version}function de(E,b,F,$,q,Z){const pe=s.convert(F.format,F.colorSpace),ue=s.convert(F.type),xe=M(F.internalFormat,pe,ue,F.colorSpace),He=i.get(b),me=i.get(F);if(me.__renderTarget=b,!He.__hasExternalTextures){const ve=Math.max(1,b.width>>Z),ze=Math.max(1,b.height>>Z);q===n.TEXTURE_3D||q===n.TEXTURE_2D_ARRAY?t.texImage3D(q,Z,xe,ve,ze,b.depth,0,pe,ue,null):t.texImage2D(q,Z,xe,ve,ze,0,pe,ue,null)}t.bindFramebuffer(n.FRAMEBUFFER,E),L(b)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,$,q,me.__webglTexture,0,Q(b)):(q===n.TEXTURE_2D||q>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&q<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,$,q,me.__webglTexture,Z),t.bindFramebuffer(n.FRAMEBUFFER,null)}function he(E,b,F){if(n.bindRenderbuffer(n.RENDERBUFFER,E),b.depthBuffer){const $=b.depthTexture,q=$&&$.isDepthTexture?$.type:null,Z=v(b.stencilBuffer,q),pe=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ue=Q(b);L(b)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ue,Z,b.width,b.height):F?n.renderbufferStorageMultisample(n.RENDERBUFFER,ue,Z,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,Z,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,pe,n.RENDERBUFFER,E)}else{const $=b.textures;for(let q=0;q<$.length;q++){const Z=$[q],pe=s.convert(Z.format,Z.colorSpace),ue=s.convert(Z.type),xe=M(Z.internalFormat,pe,ue,Z.colorSpace),He=Q(b);F&&L(b)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,He,xe,b.width,b.height):L(b)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,He,xe,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,xe,b.width,b.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function se(E,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,E),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const $=i.get(b.depthTexture);$.__renderTarget=b,(!$.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),te(b.depthTexture,0);const q=$.__webglTexture,Z=Q(b);if(b.depthTexture.format===$o)L(b)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,q,0,Z):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,q,0);else if(b.depthTexture.format===oa)L(b)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,q,0,Z):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,q,0);else throw new Error("Unknown depthTexture format")}function _e(E){const b=i.get(E),F=E.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==E.depthTexture){const $=E.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),$){const q=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,$.removeEventListener("dispose",q)};$.addEventListener("dispose",q),b.__depthDisposeCallback=q}b.__boundDepthTexture=$}if(E.depthTexture&&!b.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");se(b.__webglFramebuffer,E)}else if(F){b.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(t.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer[$]),b.__webglDepthbuffer[$]===void 0)b.__webglDepthbuffer[$]=n.createRenderbuffer(),he(b.__webglDepthbuffer[$],E,!1);else{const q=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Z=b.__webglDepthbuffer[$];n.bindRenderbuffer(n.RENDERBUFFER,Z),n.framebufferRenderbuffer(n.FRAMEBUFFER,q,n.RENDERBUFFER,Z)}}else if(t.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=n.createRenderbuffer(),he(b.__webglDepthbuffer,E,!1);else{const $=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,q=b.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,q),n.framebufferRenderbuffer(n.FRAMEBUFFER,$,n.RENDERBUFFER,q)}t.bindFramebuffer(n.FRAMEBUFFER,null)}function be(E,b,F){const $=i.get(E);b!==void 0&&de($.__webglFramebuffer,E,E.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),F!==void 0&&_e(E)}function Ie(E){const b=E.texture,F=i.get(E),$=i.get(b);E.addEventListener("dispose",T);const q=E.textures,Z=E.isWebGLCubeRenderTarget===!0,pe=q.length>1;if(pe||($.__webglTexture===void 0&&($.__webglTexture=n.createTexture()),$.__version=b.version,o.memory.textures++),Z){F.__webglFramebuffer=[];for(let ue=0;ue<6;ue++)if(b.mipmaps&&b.mipmaps.length>0){F.__webglFramebuffer[ue]=[];for(let xe=0;xe<b.mipmaps.length;xe++)F.__webglFramebuffer[ue][xe]=n.createFramebuffer()}else F.__webglFramebuffer[ue]=n.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){F.__webglFramebuffer=[];for(let ue=0;ue<b.mipmaps.length;ue++)F.__webglFramebuffer[ue]=n.createFramebuffer()}else F.__webglFramebuffer=n.createFramebuffer();if(pe)for(let ue=0,xe=q.length;ue<xe;ue++){const He=i.get(q[ue]);He.__webglTexture===void 0&&(He.__webglTexture=n.createTexture(),o.memory.textures++)}if(E.samples>0&&L(E)===!1){F.__webglMultisampledFramebuffer=n.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let ue=0;ue<q.length;ue++){const xe=q[ue];F.__webglColorRenderbuffer[ue]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,F.__webglColorRenderbuffer[ue]);const He=s.convert(xe.format,xe.colorSpace),me=s.convert(xe.type),ve=M(xe.internalFormat,He,me,xe.colorSpace,E.isXRRenderTarget===!0),ze=Q(E);n.renderbufferStorageMultisample(n.RENDERBUFFER,ze,ve,E.width,E.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ue,n.RENDERBUFFER,F.__webglColorRenderbuffer[ue])}n.bindRenderbuffer(n.RENDERBUFFER,null),E.depthBuffer&&(F.__webglDepthRenderbuffer=n.createRenderbuffer(),he(F.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Z){t.bindTexture(n.TEXTURE_CUBE_MAP,$.__webglTexture),we(n.TEXTURE_CUBE_MAP,b);for(let ue=0;ue<6;ue++)if(b.mipmaps&&b.mipmaps.length>0)for(let xe=0;xe<b.mipmaps.length;xe++)de(F.__webglFramebuffer[ue][xe],E,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,xe);else de(F.__webglFramebuffer[ue],E,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0);m(b)&&p(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(pe){for(let ue=0,xe=q.length;ue<xe;ue++){const He=q[ue],me=i.get(He);t.bindTexture(n.TEXTURE_2D,me.__webglTexture),we(n.TEXTURE_2D,He),de(F.__webglFramebuffer,E,He,n.COLOR_ATTACHMENT0+ue,n.TEXTURE_2D,0),m(He)&&p(n.TEXTURE_2D)}t.unbindTexture()}else{let ue=n.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(ue=E.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ue,$.__webglTexture),we(ue,b),b.mipmaps&&b.mipmaps.length>0)for(let xe=0;xe<b.mipmaps.length;xe++)de(F.__webglFramebuffer[xe],E,b,n.COLOR_ATTACHMENT0,ue,xe);else de(F.__webglFramebuffer,E,b,n.COLOR_ATTACHMENT0,ue,0);m(b)&&p(ue),t.unbindTexture()}E.depthBuffer&&_e(E)}function I(E){const b=E.textures;for(let F=0,$=b.length;F<$;F++){const q=b[F];if(m(q)){const Z=y(E),pe=i.get(q).__webglTexture;t.bindTexture(Z,pe),p(Z),t.unbindTexture()}}}const O=[],C=[];function oe(E){if(E.samples>0){if(L(E)===!1){const b=E.textures,F=E.width,$=E.height;let q=n.COLOR_BUFFER_BIT;const Z=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,pe=i.get(E),ue=b.length>1;if(ue)for(let xe=0;xe<b.length;xe++)t.bindFramebuffer(n.FRAMEBUFFER,pe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+xe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,pe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+xe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,pe.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,pe.__webglFramebuffer);for(let xe=0;xe<b.length;xe++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(q|=n.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(q|=n.STENCIL_BUFFER_BIT)),ue){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,pe.__webglColorRenderbuffer[xe]);const He=i.get(b[xe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,He,0)}n.blitFramebuffer(0,0,F,$,0,0,F,$,q,n.NEAREST),l===!0&&(O.length=0,C.length=0,O.push(n.COLOR_ATTACHMENT0+xe),E.depthBuffer&&E.resolveDepthBuffer===!1&&(O.push(Z),C.push(Z),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,C)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,O))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ue)for(let xe=0;xe<b.length;xe++){t.bindFramebuffer(n.FRAMEBUFFER,pe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+xe,n.RENDERBUFFER,pe.__webglColorRenderbuffer[xe]);const He=i.get(b[xe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,pe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+xe,n.TEXTURE_2D,He,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,pe.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&l){const b=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[b])}}}function Q(E){return Math.min(r.maxSamples,E.samples)}function L(E){const b=i.get(E);return E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function ne(E){const b=o.render.frame;u.get(E)!==b&&(u.set(E,b),E.update())}function le(E,b){const F=E.colorSpace,$=E.format,q=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||F!==la&&F!==Kr&&(pt.getTransfer(F)===wt?($!==Fi||q!==Lr)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),b}function ie(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=k,this.resetTextureUnits=U,this.setTexture2D=te,this.setTexture2DArray=W,this.setTexture3D=X,this.setTextureCube=V,this.rebindTextures=be,this.setupRenderTarget=Ie,this.updateRenderTargetMipmap=I,this.updateMultisampleRenderTarget=oe,this.setupDepthRenderbuffer=_e,this.setupFrameBufferTexture=de,this.useMultisampledRTT=L}function BC(n,e){function t(i,r=Kr){let s;const o=pt.getTransfer(r);if(i===Lr)return n.UNSIGNED_BYTE;if(i===qd)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Kd)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Cv)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===wv)return n.BYTE;if(i===Av)return n.SHORT;if(i===xl)return n.UNSIGNED_SHORT;if(i===$d)return n.INT;if(i===io)return n.UNSIGNED_INT;if(i===Er)return n.FLOAT;if(i===El)return n.HALF_FLOAT;if(i===Rv)return n.ALPHA;if(i===Pv)return n.RGB;if(i===Fi)return n.RGBA;if(i===Dv)return n.LUMINANCE;if(i===Lv)return n.LUMINANCE_ALPHA;if(i===$o)return n.DEPTH_COMPONENT;if(i===oa)return n.DEPTH_STENCIL;if(i===Iv)return n.RED;if(i===jd)return n.RED_INTEGER;if(i===Uv)return n.RG;if(i===Zd)return n.RG_INTEGER;if(i===Jd)return n.RGBA_INTEGER;if(i===Rc||i===Pc||i===Dc||i===Lc)if(o===wt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Rc)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Pc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Dc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Lc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Rc)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Pc)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Dc)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Lc)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Rh||i===Ph||i===Dh||i===Lh)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Rh)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Ph)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Dh)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Lh)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Ih||i===Uh||i===Nh)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Ih||i===Uh)return o===wt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Nh)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Oh||i===Fh||i===Bh||i===kh||i===zh||i===Hh||i===Vh||i===Gh||i===Wh||i===Xh||i===Yh||i===$h||i===qh||i===Kh)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Oh)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Fh)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Bh)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===kh)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===zh)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Hh)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Vh)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Gh)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Wh)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Xh)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Yh)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===$h)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===qh)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Kh)return o===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ic||i===jh||i===Zh)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Ic)return o===wt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===jh)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Zh)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Nv||i===Jh||i===Qh||i===ed)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Ic)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Jh)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Qh)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===ed)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===sa?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}class kC extends Mi{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Ni extends _n{constructor(){super(),this.isGroup=!0,this.type="Group"}}const zC={type:"move"};class Pf{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ni,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ni,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new J,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new J),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ni,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new J,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new J),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const g of e.hand.values()){const m=t.getJointPose(g,i),p=this._getHandJoint(c,g);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=u.position.distanceTo(f.position),d=.02,_=.005;c.inputState.pinching&&h>d+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=d-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(zC)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Ni;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const HC=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,VC=`
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

}`;class GC{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,i){if(this.texture===null){const r=new Zn,s=e.properties.get(r);s.__webglTexture=t.texture,(t.depthNear!=i.depthNear||t.depthFar!=i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new _s({vertexShader:HC,fragmentShader:VC,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new kn(new Tu(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class WC extends ca{constructor(e,t){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,f=null,h=null,d=null,_=null;const g=new GC,m=t.getContextAttributes();let p=null,y=null;const M=[],v=[],R=new mt;let w=null;const T=new Mi;T.viewport=new Yt;const D=new Mi;D.viewport=new Yt;const S=[T,D],x=new kC;let P=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ee){let fe=M[ee];return fe===void 0&&(fe=new Pf,M[ee]=fe),fe.getTargetRaySpace()},this.getControllerGrip=function(ee){let fe=M[ee];return fe===void 0&&(fe=new Pf,M[ee]=fe),fe.getGripSpace()},this.getHand=function(ee){let fe=M[ee];return fe===void 0&&(fe=new Pf,M[ee]=fe),fe.getHandSpace()};function k(ee){const fe=v.indexOf(ee.inputSource);if(fe===-1)return;const de=M[fe];de!==void 0&&(de.update(ee.inputSource,ee.frame,c||o),de.dispatchEvent({type:ee.type,data:ee.inputSource}))}function Y(){r.removeEventListener("select",k),r.removeEventListener("selectstart",k),r.removeEventListener("selectend",k),r.removeEventListener("squeeze",k),r.removeEventListener("squeezestart",k),r.removeEventListener("squeezeend",k),r.removeEventListener("end",Y),r.removeEventListener("inputsourceschange",te);for(let ee=0;ee<M.length;ee++){const fe=v[ee];fe!==null&&(v[ee]=null,M[ee].disconnect(fe))}P=null,U=null,g.reset(),e.setRenderTarget(p),d=null,h=null,f=null,r=null,y=null,Be.stop(),i.isPresenting=!1,e.setPixelRatio(w),e.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ee){s=ee,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ee){a=ee,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(ee){c=ee},this.getBaseLayer=function(){return h!==null?h:d},this.getBinding=function(){return f},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(ee){if(r=ee,r!==null){if(p=e.getRenderTarget(),r.addEventListener("select",k),r.addEventListener("selectstart",k),r.addEventListener("selectend",k),r.addEventListener("squeeze",k),r.addEventListener("squeezestart",k),r.addEventListener("squeezeend",k),r.addEventListener("end",Y),r.addEventListener("inputsourceschange",te),m.xrCompatible!==!0&&await t.makeXRCompatible(),w=e.getPixelRatio(),e.getSize(R),r.renderState.layers===void 0){const fe={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(r,t,fe),r.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),y=new ro(d.framebufferWidth,d.framebufferHeight,{format:Fi,type:Lr,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let fe=null,de=null,he=null;m.depth&&(he=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,fe=m.stencil?oa:$o,de=m.stencil?sa:io);const se={colorFormat:t.RGBA8,depthFormat:he,scaleFactor:s};f=new XRWebGLBinding(r,t),h=f.createProjectionLayer(se),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),y=new ro(h.textureWidth,h.textureHeight,{format:Fi,type:Lr,depthTexture:new Zv(h.textureWidth,h.textureHeight,de,void 0,void 0,void 0,void 0,void 0,void 0,fe),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),Be.setContext(r),Be.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function te(ee){for(let fe=0;fe<ee.removed.length;fe++){const de=ee.removed[fe],he=v.indexOf(de);he>=0&&(v[he]=null,M[he].disconnect(de))}for(let fe=0;fe<ee.added.length;fe++){const de=ee.added[fe];let he=v.indexOf(de);if(he===-1){for(let _e=0;_e<M.length;_e++)if(_e>=v.length){v.push(de),he=_e;break}else if(v[_e]===null){v[_e]=de,he=_e;break}if(he===-1)break}const se=M[he];se&&se.connect(de)}}const W=new J,X=new J;function V(ee,fe,de){W.setFromMatrixPosition(fe.matrixWorld),X.setFromMatrixPosition(de.matrixWorld);const he=W.distanceTo(X),se=fe.projectionMatrix.elements,_e=de.projectionMatrix.elements,be=se[14]/(se[10]-1),Ie=se[14]/(se[10]+1),I=(se[9]+1)/se[5],O=(se[9]-1)/se[5],C=(se[8]-1)/se[0],oe=(_e[8]+1)/_e[0],Q=be*C,L=be*oe,ne=he/(-C+oe),le=ne*-C;if(fe.matrixWorld.decompose(ee.position,ee.quaternion,ee.scale),ee.translateX(le),ee.translateZ(ne),ee.matrixWorld.compose(ee.position,ee.quaternion,ee.scale),ee.matrixWorldInverse.copy(ee.matrixWorld).invert(),se[10]===-1)ee.projectionMatrix.copy(fe.projectionMatrix),ee.projectionMatrixInverse.copy(fe.projectionMatrixInverse);else{const ie=be+ne,E=Ie+ne,b=Q-le,F=L+(he-le),$=I*Ie/E*ie,q=O*Ie/E*ie;ee.projectionMatrix.makePerspective(b,F,$,q,ie,E),ee.projectionMatrixInverse.copy(ee.projectionMatrix).invert()}}function ae(ee,fe){fe===null?ee.matrixWorld.copy(ee.matrix):ee.matrixWorld.multiplyMatrices(fe.matrixWorld,ee.matrix),ee.matrixWorldInverse.copy(ee.matrixWorld).invert()}this.updateCamera=function(ee){if(r===null)return;let fe=ee.near,de=ee.far;g.texture!==null&&(g.depthNear>0&&(fe=g.depthNear),g.depthFar>0&&(de=g.depthFar)),x.near=D.near=T.near=fe,x.far=D.far=T.far=de,(P!==x.near||U!==x.far)&&(r.updateRenderState({depthNear:x.near,depthFar:x.far}),P=x.near,U=x.far),T.layers.mask=ee.layers.mask|2,D.layers.mask=ee.layers.mask|4,x.layers.mask=T.layers.mask|D.layers.mask;const he=ee.parent,se=x.cameras;ae(x,he);for(let _e=0;_e<se.length;_e++)ae(se[_e],he);se.length===2?V(x,T,D):x.projectionMatrix.copy(T.projectionMatrix),N(ee,x,he)};function N(ee,fe,de){de===null?ee.matrix.copy(fe.matrixWorld):(ee.matrix.copy(de.matrixWorld),ee.matrix.invert(),ee.matrix.multiply(fe.matrixWorld)),ee.matrix.decompose(ee.position,ee.quaternion,ee.scale),ee.updateMatrixWorld(!0),ee.projectionMatrix.copy(fe.projectionMatrix),ee.projectionMatrixInverse.copy(fe.projectionMatrixInverse),ee.isPerspectiveCamera&&(ee.fov=yl*2*Math.atan(1/ee.projectionMatrix.elements[5]),ee.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(h===null&&d===null))return l},this.setFoveation=function(ee){l=ee,h!==null&&(h.fixedFoveation=ee),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=ee)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(x)};let ge=null;function we(ee,fe){if(u=fe.getViewerPose(c||o),_=fe,u!==null){const de=u.views;d!==null&&(e.setRenderTargetFramebuffer(y,d.framebuffer),e.setRenderTarget(y));let he=!1;de.length!==x.cameras.length&&(x.cameras.length=0,he=!0);for(let _e=0;_e<de.length;_e++){const be=de[_e];let Ie=null;if(d!==null)Ie=d.getViewport(be);else{const O=f.getViewSubImage(h,be);Ie=O.viewport,_e===0&&(e.setRenderTargetTextures(y,O.colorTexture,h.ignoreDepthValues?void 0:O.depthStencilTexture),e.setRenderTarget(y))}let I=S[_e];I===void 0&&(I=new Mi,I.layers.enable(_e),I.viewport=new Yt,S[_e]=I),I.matrix.fromArray(be.transform.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale),I.projectionMatrix.fromArray(be.projectionMatrix),I.projectionMatrixInverse.copy(I.projectionMatrix).invert(),I.viewport.set(Ie.x,Ie.y,Ie.width,Ie.height),_e===0&&(x.matrix.copy(I.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),he===!0&&x.cameras.push(I)}const se=r.enabledFeatures;if(se&&se.includes("depth-sensing")){const _e=f.getDepthInformation(de[0]);_e&&_e.isValid&&_e.texture&&g.init(e,_e,r.renderState)}}for(let de=0;de<M.length;de++){const he=v[de],se=M[de];he!==null&&se!==void 0&&se.update(he,fe,c||o)}ge&&ge(ee,fe),fe.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:fe}),_=null}const Be=new Kv;Be.setAnimationLoop(we),this.setAnimationLoop=function(ee){ge=ee},this.dispose=function(){}}}const Ds=new ir,XC=new Wt;function YC(n,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,Yv(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,y,M,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),f(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p)):p.isMeshStandardMaterial?(s(m,p),h(m,p),p.isMeshPhysicalMaterial&&d(m,p,v)):p.isMeshMatcapMaterial?(s(m,p),_(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),g(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,y,M):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Wn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Wn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const y=e.get(p),M=y.envMap,v=y.envMapRotation;M&&(m.envMap.value=M,Ds.copy(v),Ds.x*=-1,Ds.y*=-1,Ds.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Ds.y*=-1,Ds.z*=-1),m.envMapRotation.value.setFromMatrix4(XC.makeRotationFromEuler(Ds)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,y,M){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*y,m.scale.value=M*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function f(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function h(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,y){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Wn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,p){p.matcap&&(m.matcap.value=p.matcap)}function g(m,p){const y=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function $C(n,e,t,i){let r={},s={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,M){const v=M.program;i.uniformBlockBinding(y,v)}function c(y,M){let v=r[y.id];v===void 0&&(_(y),v=u(y),r[y.id]=v,y.addEventListener("dispose",m));const R=M.program;i.updateUBOMapping(y,R);const w=e.render.frame;s[y.id]!==w&&(h(y),s[y.id]=w)}function u(y){const M=f();y.__bindingPointIndex=M;const v=n.createBuffer(),R=y.__size,w=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,v),n.bufferData(n.UNIFORM_BUFFER,R,w),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,M,v),v}function f(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(y){const M=r[y.id],v=y.uniforms,R=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,M);for(let w=0,T=v.length;w<T;w++){const D=Array.isArray(v[w])?v[w]:[v[w]];for(let S=0,x=D.length;S<x;S++){const P=D[S];if(d(P,w,S,R)===!0){const U=P.__offset,k=Array.isArray(P.value)?P.value:[P.value];let Y=0;for(let te=0;te<k.length;te++){const W=k[te],X=g(W);typeof W=="number"||typeof W=="boolean"?(P.__data[0]=W,n.bufferSubData(n.UNIFORM_BUFFER,U+Y,P.__data)):W.isMatrix3?(P.__data[0]=W.elements[0],P.__data[1]=W.elements[1],P.__data[2]=W.elements[2],P.__data[3]=0,P.__data[4]=W.elements[3],P.__data[5]=W.elements[4],P.__data[6]=W.elements[5],P.__data[7]=0,P.__data[8]=W.elements[6],P.__data[9]=W.elements[7],P.__data[10]=W.elements[8],P.__data[11]=0):(W.toArray(P.__data,Y),Y+=X.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,U,P.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(y,M,v,R){const w=y.value,T=M+"_"+v;if(R[T]===void 0)return typeof w=="number"||typeof w=="boolean"?R[T]=w:R[T]=w.clone(),!0;{const D=R[T];if(typeof w=="number"||typeof w=="boolean"){if(D!==w)return R[T]=w,!0}else if(D.equals(w)===!1)return D.copy(w),!0}return!1}function _(y){const M=y.uniforms;let v=0;const R=16;for(let T=0,D=M.length;T<D;T++){const S=Array.isArray(M[T])?M[T]:[M[T]];for(let x=0,P=S.length;x<P;x++){const U=S[x],k=Array.isArray(U.value)?U.value:[U.value];for(let Y=0,te=k.length;Y<te;Y++){const W=k[Y],X=g(W),V=v%R,ae=V%X.boundary,N=V+ae;v+=ae,N!==0&&R-N<X.storage&&(v+=R-N),U.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=v,v+=X.storage}}}const w=v%R;return w>0&&(v+=R-w),y.__size=v,y.__cache={},this}function g(y){const M={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(M.boundary=4,M.storage=4):y.isVector2?(M.boundary=8,M.storage=8):y.isVector3||y.isColor?(M.boundary=16,M.storage=12):y.isVector4?(M.boundary=16,M.storage=16):y.isMatrix3?(M.boundary=48,M.storage=48):y.isMatrix4?(M.boundary=64,M.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),M}function m(y){const M=y.target;M.removeEventListener("dispose",m);const v=o.indexOf(M.__bindingPointIndex);o.splice(v,1),n.deleteBuffer(r[M.id]),delete r[M.id],delete s[M.id]}function p(){for(const y in r)n.deleteBuffer(r[y]);o=[],r={},s={}}return{bind:l,update:c,dispose:p}}class qC{constructor(e={}){const{canvas:t=OE(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reverseDepthBuffer:h=!1}=e;this.isWebGLRenderer=!0;let d;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=i.getContextAttributes().alpha}else d=o;const _=new Uint32Array(4),g=new Int32Array(4);let m=null,p=null;const y=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ai,this.toneMapping=as,this.toneMappingExposure=1;const v=this;let R=!1,w=0,T=0,D=null,S=-1,x=null;const P=new Yt,U=new Yt;let k=null;const Y=new ht(0);let te=0,W=t.width,X=t.height,V=1,ae=null,N=null;const ge=new Yt(0,0,W,X),we=new Yt(0,0,W,X);let Be=!1;const ee=new ep;let fe=!1,de=!1;const he=new Wt,se=new Wt,_e=new J,be=new Yt,Ie={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let I=!1;function O(){return D===null?V:1}let C=i;function oe(A,H){return t.getContext(A,H)}try{const A={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Yd}`),t.addEventListener("webglcontextlost",ce,!1),t.addEventListener("webglcontextrestored",Ee,!1),t.addEventListener("webglcontextcreationerror",Ae,!1),C===null){const H="webgl2";if(C=oe(H,A),C===null)throw oe(H)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let Q,L,ne,le,ie,E,b,F,$,q,Z,pe,ue,xe,He,me,ve,ze,Ve,Me,We,Xe,ft,B;function Te(){Q=new Qw(C),Q.init(),Xe=new BC(C,Q),L=new $w(C,Q,e,Xe),ne=new NC(C,Q),L.reverseDepthBuffer&&h&&ne.buffers.depth.setReversed(!0),le=new nA(C),ie=new yC,E=new FC(C,Q,ne,ie,L,Xe,le),b=new Kw(v),F=new Jw(v),$=new c1(C),ft=new Xw(C,$),q=new eA(C,$,le,ft),Z=new rA(C,q,$,le),Ve=new iA(C,L,E),me=new qw(ie),pe=new xC(v,b,F,Q,L,ft,me),ue=new YC(v,ie),xe=new MC,He=new CC(Q),ze=new Ww(v,b,F,ne,Z,d,l),ve=new IC(v,Z,L),B=new $C(C,le,L,ne),Me=new Yw(C,Q,le),We=new tA(C,Q,le),le.programs=pe.programs,v.capabilities=L,v.extensions=Q,v.properties=ie,v.renderLists=xe,v.shadowMap=ve,v.state=ne,v.info=le}Te();const re=new WC(v,C);this.xr=re,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){const A=Q.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=Q.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(A){A!==void 0&&(V=A,this.setSize(W,X,!1))},this.getSize=function(A){return A.set(W,X)},this.setSize=function(A,H,K=!0){if(re.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=A,X=H,t.width=Math.floor(A*V),t.height=Math.floor(H*V),K===!0&&(t.style.width=A+"px",t.style.height=H+"px"),this.setViewport(0,0,A,H)},this.getDrawingBufferSize=function(A){return A.set(W*V,X*V).floor()},this.setDrawingBufferSize=function(A,H,K){W=A,X=H,V=K,t.width=Math.floor(A*K),t.height=Math.floor(H*K),this.setViewport(0,0,A,H)},this.getCurrentViewport=function(A){return A.copy(P)},this.getViewport=function(A){return A.copy(ge)},this.setViewport=function(A,H,K,j){A.isVector4?ge.set(A.x,A.y,A.z,A.w):ge.set(A,H,K,j),ne.viewport(P.copy(ge).multiplyScalar(V).round())},this.getScissor=function(A){return A.copy(we)},this.setScissor=function(A,H,K,j){A.isVector4?we.set(A.x,A.y,A.z,A.w):we.set(A,H,K,j),ne.scissor(U.copy(we).multiplyScalar(V).round())},this.getScissorTest=function(){return Be},this.setScissorTest=function(A){ne.setScissorTest(Be=A)},this.setOpaqueSort=function(A){ae=A},this.setTransparentSort=function(A){N=A},this.getClearColor=function(A){return A.copy(ze.getClearColor())},this.setClearColor=function(){ze.setClearColor.apply(ze,arguments)},this.getClearAlpha=function(){return ze.getClearAlpha()},this.setClearAlpha=function(){ze.setClearAlpha.apply(ze,arguments)},this.clear=function(A=!0,H=!0,K=!0){let j=0;if(A){let G=!1;if(D!==null){const ye=D.texture.format;G=ye===Jd||ye===Zd||ye===jd}if(G){const ye=D.texture.type,Se=ye===Lr||ye===io||ye===xl||ye===sa||ye===qd||ye===Kd,Ce=ze.getClearColor(),Le=ze.getClearAlpha(),Ke=Ce.r,Qe=Ce.g,Ne=Ce.b;Se?(_[0]=Ke,_[1]=Qe,_[2]=Ne,_[3]=Le,C.clearBufferuiv(C.COLOR,0,_)):(g[0]=Ke,g[1]=Qe,g[2]=Ne,g[3]=Le,C.clearBufferiv(C.COLOR,0,g))}else j|=C.COLOR_BUFFER_BIT}H&&(j|=C.DEPTH_BUFFER_BIT),K&&(j|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),C.clear(j)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ce,!1),t.removeEventListener("webglcontextrestored",Ee,!1),t.removeEventListener("webglcontextcreationerror",Ae,!1),xe.dispose(),He.dispose(),ie.dispose(),b.dispose(),F.dispose(),Z.dispose(),ft.dispose(),B.dispose(),pe.dispose(),re.dispose(),re.removeEventListener("sessionstart",Re),re.removeEventListener("sessionend",Je),ke.stop()};function ce(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function Ee(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;const A=le.autoReset,H=ve.enabled,K=ve.autoUpdate,j=ve.needsUpdate,G=ve.type;Te(),le.autoReset=A,ve.enabled=H,ve.autoUpdate=K,ve.needsUpdate=j,ve.type=G}function Ae(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function qe(A){const H=A.target;H.removeEventListener("dispose",qe),_t(H)}function _t(A){Xt(A),ie.remove(A)}function Xt(A){const H=ie.get(A).programs;H!==void 0&&(H.forEach(function(K){pe.releaseProgram(K)}),A.isShaderMaterial&&pe.releaseShaderCache(A))}this.renderBufferDirect=function(A,H,K,j,G,ye){H===null&&(H=Ie);const Se=G.isMesh&&G.matrixWorld.determinant()<0,Ce=Qn(A,H,K,j,G);ne.setMaterial(j,Se);let Le=K.index,Ke=1;if(j.wireframe===!0){if(Le=q.getWireframeAttribute(K),Le===void 0)return;Ke=2}const Qe=K.drawRange,Ne=K.attributes.position;let et=Qe.start*Ke,gt=(Qe.start+Qe.count)*Ke;ye!==null&&(et=Math.max(et,ye.start*Ke),gt=Math.min(gt,(ye.start+ye.count)*Ke)),Le!==null?(et=Math.max(et,0),gt=Math.min(gt,Le.count)):Ne!=null&&(et=Math.max(et,0),gt=Math.min(gt,Ne.count));const St=gt-et;if(St<0||St===1/0)return;ft.setup(G,j,Ce,K,Le);let Ht,Mt=Me;if(Le!==null&&(Ht=$.get(Le),Mt=We,Mt.setIndex(Ht)),G.isMesh)j.wireframe===!0?(ne.setLineWidth(j.wireframeLinewidth*O()),Mt.setMode(C.LINES)):Mt.setMode(C.TRIANGLES);else if(G.isLine){let Ge=j.linewidth;Ge===void 0&&(Ge=1),ne.setLineWidth(Ge*O()),G.isLineSegments?Mt.setMode(C.LINES):G.isLineLoop?Mt.setMode(C.LINE_LOOP):Mt.setMode(C.LINE_STRIP)}else G.isPoints?Mt.setMode(C.POINTS):G.isSprite&&Mt.setMode(C.TRIANGLES);if(G.isBatchedMesh)if(G._multiDrawInstances!==null)Mt.renderMultiDrawInstances(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount,G._multiDrawInstances);else if(Q.get("WEBGL_multi_draw"))Mt.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{const Ge=G._multiDrawStarts,sr=G._multiDrawCounts,bt=G._multiDrawCount,Pi=Le?$.get(Le).bytesPerElement:1,oo=ie.get(j).currentProgram.getUniforms();for(let ei=0;ei<bt;ei++)oo.setValue(C,"_gl_DrawID",ei),Mt.render(Ge[ei]/Pi,sr[ei])}else if(G.isInstancedMesh)Mt.renderInstances(et,St,G.count);else if(K.isInstancedBufferGeometry){const Ge=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,sr=Math.min(K.instanceCount,Ge);Mt.renderInstances(et,St,sr)}else Mt.render(et,St)};function De(A,H,K){A.transparent===!0&&A.side===Mr&&A.forceSinglePass===!1?(A.side=Wn,A.needsUpdate=!0,Ct(A,H,K),A.side=ms,A.needsUpdate=!0,Ct(A,H,K),A.side=Mr):Ct(A,H,K)}this.compile=function(A,H,K=null){K===null&&(K=A),p=He.get(K),p.init(H),M.push(p),K.traverseVisible(function(G){G.isLight&&G.layers.test(H.layers)&&(p.pushLight(G),G.castShadow&&p.pushShadow(G))}),A!==K&&A.traverseVisible(function(G){G.isLight&&G.layers.test(H.layers)&&(p.pushLight(G),G.castShadow&&p.pushShadow(G))}),p.setupLights();const j=new Set;return A.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;const ye=G.material;if(ye)if(Array.isArray(ye))for(let Se=0;Se<ye.length;Se++){const Ce=ye[Se];De(Ce,K,G),j.add(Ce)}else De(ye,K,G),j.add(ye)}),M.pop(),p=null,j},this.compileAsync=function(A,H,K=null){const j=this.compile(A,H,K);return new Promise(G=>{function ye(){if(j.forEach(function(Se){ie.get(Se).currentProgram.isReady()&&j.delete(Se)}),j.size===0){G(A);return}setTimeout(ye,10)}Q.get("KHR_parallel_shader_compile")!==null?ye():setTimeout(ye,10)})};let Fe=null;function rt(A){Fe&&Fe(A)}function Re(){ke.stop()}function Je(){ke.start()}const ke=new Kv;ke.setAnimationLoop(rt),typeof self<"u"&&ke.setContext(self),this.setAnimationLoop=function(A){Fe=A,re.setAnimationLoop(A),A===null?ke.stop():ke.start()},re.addEventListener("sessionstart",Re),re.addEventListener("sessionend",Je),this.render=function(A,H){if(H!==void 0&&H.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),re.enabled===!0&&re.isPresenting===!0&&(re.cameraAutoUpdate===!0&&re.updateCamera(H),H=re.getCamera()),A.isScene===!0&&A.onBeforeRender(v,A,H,D),p=He.get(A,M.length),p.init(H),M.push(p),se.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),ee.setFromProjectionMatrix(se),de=this.localClippingEnabled,fe=me.init(this.clippingPlanes,de),m=xe.get(A,y.length),m.init(),y.push(m),re.enabled===!0&&re.isPresenting===!0){const ye=v.xr.getDepthSensingMesh();ye!==null&&Ze(ye,H,-1/0,v.sortObjects)}Ze(A,H,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(ae,N),I=re.enabled===!1||re.isPresenting===!1||re.hasDepthSensing()===!1,I&&ze.addToRenderList(m,A),this.info.render.frame++,fe===!0&&me.beginShadows();const K=p.state.shadowsArray;ve.render(K,A,H),fe===!0&&me.endShadows(),this.info.autoReset===!0&&this.info.reset();const j=m.opaque,G=m.transmissive;if(p.setupLights(),H.isArrayCamera){const ye=H.cameras;if(G.length>0)for(let Se=0,Ce=ye.length;Se<Ce;Se++){const Le=ye[Se];lt(j,G,A,Le)}I&&ze.render(A);for(let Se=0,Ce=ye.length;Se<Ce;Se++){const Le=ye[Se];qt(m,A,Le,Le.viewport)}}else G.length>0&&lt(j,G,A,H),I&&ze.render(A),qt(m,A,H);D!==null&&(E.updateMultisampleRenderTarget(D),E.updateRenderTargetMipmap(D)),A.isScene===!0&&A.onAfterRender(v,A,H),ft.resetDefaultState(),S=-1,x=null,M.pop(),M.length>0?(p=M[M.length-1],fe===!0&&me.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,y.pop(),y.length>0?m=y[y.length-1]:m=null};function Ze(A,H,K,j){if(A.visible===!1)return;if(A.layers.test(H.layers)){if(A.isGroup)K=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(H);else if(A.isLight)p.pushLight(A),A.castShadow&&p.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||ee.intersectsSprite(A)){j&&be.setFromMatrixPosition(A.matrixWorld).applyMatrix4(se);const Se=Z.update(A),Ce=A.material;Ce.visible&&m.push(A,Se,Ce,K,be.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||ee.intersectsObject(A))){const Se=Z.update(A),Ce=A.material;if(j&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),be.copy(A.boundingSphere.center)):(Se.boundingSphere===null&&Se.computeBoundingSphere(),be.copy(Se.boundingSphere.center)),be.applyMatrix4(A.matrixWorld).applyMatrix4(se)),Array.isArray(Ce)){const Le=Se.groups;for(let Ke=0,Qe=Le.length;Ke<Qe;Ke++){const Ne=Le[Ke],et=Ce[Ne.materialIndex];et&&et.visible&&m.push(A,Se,et,K,be.z,Ne)}}else Ce.visible&&m.push(A,Se,Ce,K,be.z,null)}}const ye=A.children;for(let Se=0,Ce=ye.length;Se<Ce;Se++)Ze(ye[Se],H,K,j)}function qt(A,H,K,j){const G=A.opaque,ye=A.transmissive,Se=A.transparent;p.setupLightsView(K),fe===!0&&me.setGlobalState(v.clippingPlanes,K),j&&ne.viewport(P.copy(j)),G.length>0&&Ut(G,H,K),ye.length>0&&Ut(ye,H,K),Se.length>0&&Ut(Se,H,K),ne.buffers.depth.setTest(!0),ne.buffers.depth.setMask(!0),ne.buffers.color.setMask(!0),ne.setPolygonOffset(!1)}function lt(A,H,K,j){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[j.id]===void 0&&(p.state.transmissionRenderTarget[j.id]=new ro(1,1,{generateMipmaps:!0,type:Q.has("EXT_color_buffer_half_float")||Q.has("EXT_color_buffer_float")?El:Lr,minFilter:Ws,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:pt.workingColorSpace}));const ye=p.state.transmissionRenderTarget[j.id],Se=j.viewport||P;ye.setSize(Se.z,Se.w);const Ce=v.getRenderTarget();v.setRenderTarget(ye),v.getClearColor(Y),te=v.getClearAlpha(),te<1&&v.setClearColor(16777215,.5),v.clear(),I&&ze.render(K);const Le=v.toneMapping;v.toneMapping=as;const Ke=j.viewport;if(j.viewport!==void 0&&(j.viewport=void 0),p.setupLightsView(j),fe===!0&&me.setGlobalState(v.clippingPlanes,j),Ut(A,K,j),E.updateMultisampleRenderTarget(ye),E.updateRenderTargetMipmap(ye),Q.has("WEBGL_multisampled_render_to_texture")===!1){let Qe=!1;for(let Ne=0,et=H.length;Ne<et;Ne++){const gt=H[Ne],St=gt.object,Ht=gt.geometry,Mt=gt.material,Ge=gt.group;if(Mt.side===Mr&&St.layers.test(j.layers)){const sr=Mt.side;Mt.side=Wn,Mt.needsUpdate=!0,nn(St,K,j,Ht,Mt,Ge),Mt.side=sr,Mt.needsUpdate=!0,Qe=!0}}Qe===!0&&(E.updateMultisampleRenderTarget(ye),E.updateRenderTargetMipmap(ye))}v.setRenderTarget(Ce),v.setClearColor(Y,te),Ke!==void 0&&(j.viewport=Ke),v.toneMapping=Le}function Ut(A,H,K){const j=H.isScene===!0?H.overrideMaterial:null;for(let G=0,ye=A.length;G<ye;G++){const Se=A[G],Ce=Se.object,Le=Se.geometry,Ke=j===null?Se.material:j,Qe=Se.group;Ce.layers.test(K.layers)&&nn(Ce,H,K,Le,Ke,Qe)}}function nn(A,H,K,j,G,ye){A.onBeforeRender(v,H,K,j,G,ye),A.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),G.onBeforeRender(v,H,K,j,A,ye),G.transparent===!0&&G.side===Mr&&G.forceSinglePass===!1?(G.side=Wn,G.needsUpdate=!0,v.renderBufferDirect(K,H,j,G,A,ye),G.side=ms,G.needsUpdate=!0,v.renderBufferDirect(K,H,j,G,A,ye),G.side=Mr):v.renderBufferDirect(K,H,j,G,A,ye),A.onAfterRender(v,H,K,j,G,ye)}function Ct(A,H,K){H.isScene!==!0&&(H=Ie);const j=ie.get(A),G=p.state.lights,ye=p.state.shadowsArray,Se=G.state.version,Ce=pe.getParameters(A,G.state,ye,H,K),Le=pe.getProgramCacheKey(Ce);let Ke=j.programs;j.environment=A.isMeshStandardMaterial?H.environment:null,j.fog=H.fog,j.envMap=(A.isMeshStandardMaterial?F:b).get(A.envMap||j.environment),j.envMapRotation=j.environment!==null&&A.envMap===null?H.environmentRotation:A.envMapRotation,Ke===void 0&&(A.addEventListener("dispose",qe),Ke=new Map,j.programs=Ke);let Qe=Ke.get(Le);if(Qe!==void 0){if(j.currentProgram===Qe&&j.lightsStateVersion===Se)return yt(A,Ce),Qe}else Ce.uniforms=pe.getUniforms(A),A.onBeforeCompile(Ce,v),Qe=pe.acquireProgram(Ce,Le),Ke.set(Le,Qe),j.uniforms=Ce.uniforms;const Ne=j.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Ne.clippingPlanes=me.uniform),yt(A,Ce),j.needsLights=Cn(A),j.lightsStateVersion=Se,j.needsLights&&(Ne.ambientLightColor.value=G.state.ambient,Ne.lightProbe.value=G.state.probe,Ne.directionalLights.value=G.state.directional,Ne.directionalLightShadows.value=G.state.directionalShadow,Ne.spotLights.value=G.state.spot,Ne.spotLightShadows.value=G.state.spotShadow,Ne.rectAreaLights.value=G.state.rectArea,Ne.ltc_1.value=G.state.rectAreaLTC1,Ne.ltc_2.value=G.state.rectAreaLTC2,Ne.pointLights.value=G.state.point,Ne.pointLightShadows.value=G.state.pointShadow,Ne.hemisphereLights.value=G.state.hemi,Ne.directionalShadowMap.value=G.state.directionalShadowMap,Ne.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Ne.spotShadowMap.value=G.state.spotShadowMap,Ne.spotLightMatrix.value=G.state.spotLightMatrix,Ne.spotLightMap.value=G.state.spotLightMap,Ne.pointShadowMap.value=G.state.pointShadowMap,Ne.pointShadowMatrix.value=G.state.pointShadowMatrix),j.currentProgram=Qe,j.uniformsList=null,Qe}function Rt(A){if(A.uniformsList===null){const H=A.currentProgram.getUniforms();A.uniformsList=Uc.seqWithValue(H.seq,A.uniforms)}return A.uniformsList}function yt(A,H){const K=ie.get(A);K.outputColorSpace=H.outputColorSpace,K.batching=H.batching,K.batchingColor=H.batchingColor,K.instancing=H.instancing,K.instancingColor=H.instancingColor,K.instancingMorph=H.instancingMorph,K.skinning=H.skinning,K.morphTargets=H.morphTargets,K.morphNormals=H.morphNormals,K.morphColors=H.morphColors,K.morphTargetsCount=H.morphTargetsCount,K.numClippingPlanes=H.numClippingPlanes,K.numIntersection=H.numClipIntersection,K.vertexAlphas=H.vertexAlphas,K.vertexTangents=H.vertexTangents,K.toneMapping=H.toneMapping}function Qn(A,H,K,j,G){H.isScene!==!0&&(H=Ie),E.resetTextureUnits();const ye=H.fog,Se=j.isMeshStandardMaterial?H.environment:null,Ce=D===null?v.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:la,Le=(j.isMeshStandardMaterial?F:b).get(j.envMap||Se),Ke=j.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,Qe=!!K.attributes.tangent&&(!!j.normalMap||j.anisotropy>0),Ne=!!K.morphAttributes.position,et=!!K.morphAttributes.normal,gt=!!K.morphAttributes.color;let St=as;j.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(St=v.toneMapping);const Ht=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,Mt=Ht!==void 0?Ht.length:0,Ge=ie.get(j),sr=p.state.lights;if(fe===!0&&(de===!0||A!==x)){const _i=A===x&&j.id===S;me.setState(j,A,_i)}let bt=!1;j.version===Ge.__version?(Ge.needsLights&&Ge.lightsStateVersion!==sr.state.version||Ge.outputColorSpace!==Ce||G.isBatchedMesh&&Ge.batching===!1||!G.isBatchedMesh&&Ge.batching===!0||G.isBatchedMesh&&Ge.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&Ge.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&Ge.instancing===!1||!G.isInstancedMesh&&Ge.instancing===!0||G.isSkinnedMesh&&Ge.skinning===!1||!G.isSkinnedMesh&&Ge.skinning===!0||G.isInstancedMesh&&Ge.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&Ge.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&Ge.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&Ge.instancingMorph===!1&&G.morphTexture!==null||Ge.envMap!==Le||j.fog===!0&&Ge.fog!==ye||Ge.numClippingPlanes!==void 0&&(Ge.numClippingPlanes!==me.numPlanes||Ge.numIntersection!==me.numIntersection)||Ge.vertexAlphas!==Ke||Ge.vertexTangents!==Qe||Ge.morphTargets!==Ne||Ge.morphNormals!==et||Ge.morphColors!==gt||Ge.toneMapping!==St||Ge.morphTargetsCount!==Mt)&&(bt=!0):(bt=!0,Ge.__version=j.version);let Pi=Ge.currentProgram;bt===!0&&(Pi=Ct(j,H,G));let oo=!1,ei=!1,da=!1;const kt=Pi.getUniforms(),Gi=Ge.uniforms;if(ne.useProgram(Pi.program)&&(oo=!0,ei=!0,da=!0),j.id!==S&&(S=j.id,ei=!0),oo||x!==A){ne.buffers.depth.getReversed()?(he.copy(A.projectionMatrix),BE(he),kE(he),kt.setValue(C,"projectionMatrix",he)):kt.setValue(C,"projectionMatrix",A.projectionMatrix),kt.setValue(C,"viewMatrix",A.matrixWorldInverse);const Or=kt.map.cameraPosition;Or!==void 0&&Or.setValue(C,_e.setFromMatrixPosition(A.matrixWorld)),L.logarithmicDepthBuffer&&kt.setValue(C,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(j.isMeshPhongMaterial||j.isMeshToonMaterial||j.isMeshLambertMaterial||j.isMeshBasicMaterial||j.isMeshStandardMaterial||j.isShaderMaterial)&&kt.setValue(C,"isOrthographic",A.isOrthographicCamera===!0),x!==A&&(x=A,ei=!0,da=!0)}if(G.isSkinnedMesh){kt.setOptional(C,G,"bindMatrix"),kt.setOptional(C,G,"bindMatrixInverse");const _i=G.skeleton;_i&&(_i.boneTexture===null&&_i.computeBoneTexture(),kt.setValue(C,"boneTexture",_i.boneTexture,E))}G.isBatchedMesh&&(kt.setOptional(C,G,"batchingTexture"),kt.setValue(C,"batchingTexture",G._matricesTexture,E),kt.setOptional(C,G,"batchingIdTexture"),kt.setValue(C,"batchingIdTexture",G._indirectTexture,E),kt.setOptional(C,G,"batchingColorTexture"),G._colorsTexture!==null&&kt.setValue(C,"batchingColorTexture",G._colorsTexture,E));const pa=K.morphAttributes;if((pa.position!==void 0||pa.normal!==void 0||pa.color!==void 0)&&Ve.update(G,K,Pi),(ei||Ge.receiveShadow!==G.receiveShadow)&&(Ge.receiveShadow=G.receiveShadow,kt.setValue(C,"receiveShadow",G.receiveShadow)),j.isMeshGouraudMaterial&&j.envMap!==null&&(Gi.envMap.value=Le,Gi.flipEnvMap.value=Le.isCubeTexture&&Le.isRenderTargetTexture===!1?-1:1),j.isMeshStandardMaterial&&j.envMap===null&&H.environment!==null&&(Gi.envMapIntensity.value=H.environmentIntensity),ei&&(kt.setValue(C,"toneMappingExposure",v.toneMappingExposure),Ge.needsLights&&Bt(Gi,da),ye&&j.fog===!0&&ue.refreshFogUniforms(Gi,ye),ue.refreshMaterialUniforms(Gi,j,V,X,p.state.transmissionRenderTarget[A.id]),Uc.upload(C,Rt(Ge),Gi,E)),j.isShaderMaterial&&j.uniformsNeedUpdate===!0&&(Uc.upload(C,Rt(Ge),Gi,E),j.uniformsNeedUpdate=!1),j.isSpriteMaterial&&kt.setValue(C,"center",G.center),kt.setValue(C,"modelViewMatrix",G.modelViewMatrix),kt.setValue(C,"normalMatrix",G.normalMatrix),kt.setValue(C,"modelMatrix",G.matrixWorld),j.isShaderMaterial||j.isRawShaderMaterial){const _i=j.uniformsGroups;for(let Or=0,Fr=_i.length;Or<Fr;Or++){const sp=_i[Or];B.update(sp,Pi),B.bind(sp,Pi)}}return Pi}function Bt(A,H){A.ambientLightColor.needsUpdate=H,A.lightProbe.needsUpdate=H,A.directionalLights.needsUpdate=H,A.directionalLightShadows.needsUpdate=H,A.pointLights.needsUpdate=H,A.pointLightShadows.needsUpdate=H,A.spotLights.needsUpdate=H,A.spotLightShadows.needsUpdate=H,A.rectAreaLights.needsUpdate=H,A.hemisphereLights.needsUpdate=H}function Cn(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(A,H,K){ie.get(A.texture).__webglTexture=H,ie.get(A.depthTexture).__webglTexture=K;const j=ie.get(A);j.__hasExternalTextures=!0,j.__autoAllocateDepthBuffer=K===void 0,j.__autoAllocateDepthBuffer||Q.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),j.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(A,H){const K=ie.get(A);K.__webglFramebuffer=H,K.__useDefaultFramebuffer=H===void 0},this.setRenderTarget=function(A,H=0,K=0){D=A,w=H,T=K;let j=!0,G=null,ye=!1,Se=!1;if(A){const Le=ie.get(A);if(Le.__useDefaultFramebuffer!==void 0)ne.bindFramebuffer(C.FRAMEBUFFER,null),j=!1;else if(Le.__webglFramebuffer===void 0)E.setupRenderTarget(A);else if(Le.__hasExternalTextures)E.rebindTextures(A,ie.get(A.texture).__webglTexture,ie.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const Ne=A.depthTexture;if(Le.__boundDepthTexture!==Ne){if(Ne!==null&&ie.has(Ne)&&(A.width!==Ne.image.width||A.height!==Ne.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");E.setupDepthRenderbuffer(A)}}const Ke=A.texture;(Ke.isData3DTexture||Ke.isDataArrayTexture||Ke.isCompressedArrayTexture)&&(Se=!0);const Qe=ie.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Qe[H])?G=Qe[H][K]:G=Qe[H],ye=!0):A.samples>0&&E.useMultisampledRTT(A)===!1?G=ie.get(A).__webglMultisampledFramebuffer:Array.isArray(Qe)?G=Qe[K]:G=Qe,P.copy(A.viewport),U.copy(A.scissor),k=A.scissorTest}else P.copy(ge).multiplyScalar(V).floor(),U.copy(we).multiplyScalar(V).floor(),k=Be;if(ne.bindFramebuffer(C.FRAMEBUFFER,G)&&j&&ne.drawBuffers(A,G),ne.viewport(P),ne.scissor(U),ne.setScissorTest(k),ye){const Le=ie.get(A.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+H,Le.__webglTexture,K)}else if(Se){const Le=ie.get(A.texture),Ke=H||0;C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,Le.__webglTexture,K||0,Ke)}S=-1},this.readRenderTargetPixels=function(A,H,K,j,G,ye,Se){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ce=ie.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Se!==void 0&&(Ce=Ce[Se]),Ce){ne.bindFramebuffer(C.FRAMEBUFFER,Ce);try{const Le=A.texture,Ke=Le.format,Qe=Le.type;if(!L.textureFormatReadable(Ke)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!L.textureTypeReadable(Qe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=A.width-j&&K>=0&&K<=A.height-G&&C.readPixels(H,K,j,G,Xe.convert(Ke),Xe.convert(Qe),ye)}finally{const Le=D!==null?ie.get(D).__webglFramebuffer:null;ne.bindFramebuffer(C.FRAMEBUFFER,Le)}}},this.readRenderTargetPixelsAsync=async function(A,H,K,j,G,ye,Se){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ce=ie.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Se!==void 0&&(Ce=Ce[Se]),Ce){const Le=A.texture,Ke=Le.format,Qe=Le.type;if(!L.textureFormatReadable(Ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!L.textureTypeReadable(Qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(H>=0&&H<=A.width-j&&K>=0&&K<=A.height-G){ne.bindFramebuffer(C.FRAMEBUFFER,Ce);const Ne=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,Ne),C.bufferData(C.PIXEL_PACK_BUFFER,ye.byteLength,C.STREAM_READ),C.readPixels(H,K,j,G,Xe.convert(Ke),Xe.convert(Qe),0);const et=D!==null?ie.get(D).__webglFramebuffer:null;ne.bindFramebuffer(C.FRAMEBUFFER,et);const gt=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);return C.flush(),await FE(C,gt,4),C.bindBuffer(C.PIXEL_PACK_BUFFER,Ne),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,ye),C.deleteBuffer(Ne),C.deleteSync(gt),ye}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(A,H=null,K=0){A.isTexture!==!0&&(Ia("WebGLRenderer: copyFramebufferToTexture function signature has changed."),H=arguments[0]||null,A=arguments[1]);const j=Math.pow(2,-K),G=Math.floor(A.image.width*j),ye=Math.floor(A.image.height*j),Se=H!==null?H.x:0,Ce=H!==null?H.y:0;E.setTexture2D(A,0),C.copyTexSubImage2D(C.TEXTURE_2D,K,0,0,Se,Ce,G,ye),ne.unbindTexture()},this.copyTextureToTexture=function(A,H,K=null,j=null,G=0){A.isTexture!==!0&&(Ia("WebGLRenderer: copyTextureToTexture function signature has changed."),j=arguments[0]||null,A=arguments[1],H=arguments[2],G=arguments[3]||0,K=null);let ye,Se,Ce,Le,Ke,Qe,Ne,et,gt;const St=A.isCompressedTexture?A.mipmaps[G]:A.image;K!==null?(ye=K.max.x-K.min.x,Se=K.max.y-K.min.y,Ce=K.isBox3?K.max.z-K.min.z:1,Le=K.min.x,Ke=K.min.y,Qe=K.isBox3?K.min.z:0):(ye=St.width,Se=St.height,Ce=St.depth||1,Le=0,Ke=0,Qe=0),j!==null?(Ne=j.x,et=j.y,gt=j.z):(Ne=0,et=0,gt=0);const Ht=Xe.convert(H.format),Mt=Xe.convert(H.type);let Ge;H.isData3DTexture?(E.setTexture3D(H,0),Ge=C.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(E.setTexture2DArray(H,0),Ge=C.TEXTURE_2D_ARRAY):(E.setTexture2D(H,0),Ge=C.TEXTURE_2D),C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,H.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,H.unpackAlignment);const sr=C.getParameter(C.UNPACK_ROW_LENGTH),bt=C.getParameter(C.UNPACK_IMAGE_HEIGHT),Pi=C.getParameter(C.UNPACK_SKIP_PIXELS),oo=C.getParameter(C.UNPACK_SKIP_ROWS),ei=C.getParameter(C.UNPACK_SKIP_IMAGES);C.pixelStorei(C.UNPACK_ROW_LENGTH,St.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,St.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Le),C.pixelStorei(C.UNPACK_SKIP_ROWS,Ke),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Qe);const da=A.isDataArrayTexture||A.isData3DTexture,kt=H.isDataArrayTexture||H.isData3DTexture;if(A.isRenderTargetTexture||A.isDepthTexture){const Gi=ie.get(A),pa=ie.get(H),_i=ie.get(Gi.__renderTarget),Or=ie.get(pa.__renderTarget);ne.bindFramebuffer(C.READ_FRAMEBUFFER,_i.__webglFramebuffer),ne.bindFramebuffer(C.DRAW_FRAMEBUFFER,Or.__webglFramebuffer);for(let Fr=0;Fr<Ce;Fr++)da&&C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,ie.get(A).__webglTexture,G,Qe+Fr),A.isDepthTexture?(kt&&C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,ie.get(H).__webglTexture,G,gt+Fr),C.blitFramebuffer(Le,Ke,ye,Se,Ne,et,ye,Se,C.DEPTH_BUFFER_BIT,C.NEAREST)):kt?C.copyTexSubImage3D(Ge,G,Ne,et,gt+Fr,Le,Ke,ye,Se):C.copyTexSubImage2D(Ge,G,Ne,et,gt+Fr,Le,Ke,ye,Se);ne.bindFramebuffer(C.READ_FRAMEBUFFER,null),ne.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else kt?A.isDataTexture||A.isData3DTexture?C.texSubImage3D(Ge,G,Ne,et,gt,ye,Se,Ce,Ht,Mt,St.data):H.isCompressedArrayTexture?C.compressedTexSubImage3D(Ge,G,Ne,et,gt,ye,Se,Ce,Ht,St.data):C.texSubImage3D(Ge,G,Ne,et,gt,ye,Se,Ce,Ht,Mt,St):A.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,G,Ne,et,ye,Se,Ht,Mt,St.data):A.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,G,Ne,et,St.width,St.height,Ht,St.data):C.texSubImage2D(C.TEXTURE_2D,G,Ne,et,ye,Se,Ht,Mt,St);C.pixelStorei(C.UNPACK_ROW_LENGTH,sr),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,bt),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Pi),C.pixelStorei(C.UNPACK_SKIP_ROWS,oo),C.pixelStorei(C.UNPACK_SKIP_IMAGES,ei),G===0&&H.generateMipmaps&&C.generateMipmap(Ge),ne.unbindTexture()},this.copyTextureToTexture3D=function(A,H,K=null,j=null,G=0){return A.isTexture!==!0&&(Ia("WebGLRenderer: copyTextureToTexture3D function signature has changed."),K=arguments[0]||null,j=arguments[1]||null,A=arguments[2],H=arguments[3],G=arguments[4]||0),Ia('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(A,H,K,j,G)},this.initRenderTarget=function(A){ie.get(A).__webglFramebuffer===void 0&&E.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?E.setTextureCube(A,0):A.isData3DTexture?E.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?E.setTexture2DArray(A,0):E.setTexture2D(A,0),ne.unbindTexture()},this.resetState=function(){w=0,T=0,D=null,ne.reset(),ft.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Tr}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=pt._getDrawingBufferColorSpace(e),t.unpackColorSpace=pt._getUnpackColorSpace()}}class KC extends _n{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ir,this.environmentIntensity=1,this.environmentRotation=new ir,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class nx extends fa{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new ht(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const C_=new Wt,nd=new Hv,hc=new Eu,dc=new J;class jC extends _n{constructor(e=new Ri,t=new nx){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),hc.copy(i.boundingSphere),hc.applyMatrix4(r),hc.radius+=s,e.ray.intersectsSphere(hc)===!1)return;C_.copy(r).invert(),nd.copy(e.ray).applyMatrix4(C_);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,f=i.attributes.position;if(c!==null){const h=Math.max(0,o.start),d=Math.min(c.count,o.start+o.count);for(let _=h,g=d;_<g;_++){const m=c.getX(_);dc.fromBufferAttribute(f,m),R_(dc,m,l,r,e,t,this)}}else{const h=Math.max(0,o.start),d=Math.min(f.count,o.start+o.count);for(let _=h,g=d;_<g;_++)dc.fromBufferAttribute(f,_),R_(dc,_,l,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function R_(n,e,t,i,r,s,o){const a=nd.distanceSqToPoint(n);if(a<t){const l=new J;nd.closestPointToPoint(n,l),l.applyMatrix4(i);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class Au extends Ri{constructor(e=[],t=[],i=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:r};const s=[],o=[];a(r),c(i),u(),this.setAttribute("position",new gn(s,3)),this.setAttribute("normal",new gn(s.slice(),3)),this.setAttribute("uv",new gn(o,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function a(y){const M=new J,v=new J,R=new J;for(let w=0;w<t.length;w+=3)d(t[w+0],M),d(t[w+1],v),d(t[w+2],R),l(M,v,R,y)}function l(y,M,v,R){const w=R+1,T=[];for(let D=0;D<=w;D++){T[D]=[];const S=y.clone().lerp(v,D/w),x=M.clone().lerp(v,D/w),P=w-D;for(let U=0;U<=P;U++)U===0&&D===w?T[D][U]=S:T[D][U]=S.clone().lerp(x,U/P)}for(let D=0;D<w;D++)for(let S=0;S<2*(w-D)-1;S++){const x=Math.floor(S/2);S%2===0?(h(T[D][x+1]),h(T[D+1][x]),h(T[D][x])):(h(T[D][x+1]),h(T[D+1][x+1]),h(T[D+1][x]))}}function c(y){const M=new J;for(let v=0;v<s.length;v+=3)M.x=s[v+0],M.y=s[v+1],M.z=s[v+2],M.normalize().multiplyScalar(y),s[v+0]=M.x,s[v+1]=M.y,s[v+2]=M.z}function u(){const y=new J;for(let M=0;M<s.length;M+=3){y.x=s[M+0],y.y=s[M+1],y.z=s[M+2];const v=m(y)/2/Math.PI+.5,R=p(y)/Math.PI+.5;o.push(v,1-R)}_(),f()}function f(){for(let y=0;y<o.length;y+=6){const M=o[y+0],v=o[y+2],R=o[y+4],w=Math.max(M,v,R),T=Math.min(M,v,R);w>.9&&T<.1&&(M<.2&&(o[y+0]+=1),v<.2&&(o[y+2]+=1),R<.2&&(o[y+4]+=1))}}function h(y){s.push(y.x,y.y,y.z)}function d(y,M){const v=y*3;M.x=e[v+0],M.y=e[v+1],M.z=e[v+2]}function _(){const y=new J,M=new J,v=new J,R=new J,w=new mt,T=new mt,D=new mt;for(let S=0,x=0;S<s.length;S+=9,x+=6){y.set(s[S+0],s[S+1],s[S+2]),M.set(s[S+3],s[S+4],s[S+5]),v.set(s[S+6],s[S+7],s[S+8]),w.set(o[x+0],o[x+1]),T.set(o[x+2],o[x+3]),D.set(o[x+4],o[x+5]),R.copy(y).add(M).add(v).divideScalar(3);const P=m(R);g(w,x+0,y,P),g(T,x+2,M,P),g(D,x+4,v,P)}}function g(y,M,v,R){R<0&&y.x===1&&(o[M]=y.x-1),v.x===0&&v.z===0&&(o[M]=R/2/Math.PI+.5)}function m(y){return Math.atan2(y.z,-y.x)}function p(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Au(e.vertices,e.indices,e.radius,e.details)}}class nl extends Au{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,r=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(r,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new nl(e.radius,e.detail)}}class np extends Au{constructor(e=1,t=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],r=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,r,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new np(e.radius,e.detail)}}class ip extends Ri{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const u=[],f=new J,h=new J,d=[],_=[],g=[],m=[];for(let p=0;p<=i;p++){const y=[],M=p/i;let v=0;p===0&&o===0?v=.5/t:p===i&&l===Math.PI&&(v=-.5/t);for(let R=0;R<=t;R++){const w=R/t;f.x=-e*Math.cos(r+w*s)*Math.sin(o+M*a),f.y=e*Math.cos(o+M*a),f.z=e*Math.sin(r+w*s)*Math.sin(o+M*a),_.push(f.x,f.y,f.z),h.copy(f).normalize(),g.push(h.x,h.y,h.z),m.push(w+v,1-M),y.push(c++)}u.push(y)}for(let p=0;p<i;p++)for(let y=0;y<t;y++){const M=u[p][y+1],v=u[p][y],R=u[p+1][y],w=u[p+1][y+1];(p!==0||o>0)&&d.push(M,v,w),(p!==i-1||l<Math.PI)&&d.push(v,R,w)}this.setIndex(d),this.setAttribute("position",new gn(_,3)),this.setAttribute("normal",new gn(g,3)),this.setAttribute("uv",new gn(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ip(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class rp extends Ri{constructor(e=1,t=.4,i=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:r,arc:s},i=Math.floor(i),r=Math.floor(r);const o=[],a=[],l=[],c=[],u=new J,f=new J,h=new J;for(let d=0;d<=i;d++)for(let _=0;_<=r;_++){const g=_/r*s,m=d/i*Math.PI*2;f.x=(e+t*Math.cos(m))*Math.cos(g),f.y=(e+t*Math.cos(m))*Math.sin(g),f.z=t*Math.sin(m),a.push(f.x,f.y,f.z),u.x=e*Math.cos(g),u.y=e*Math.sin(g),h.subVectors(f,u).normalize(),l.push(h.x,h.y,h.z),c.push(_/r),c.push(d/i)}for(let d=1;d<=i;d++)for(let _=1;_<=r;_++){const g=(r+1)*d+_-1,m=(r+1)*(d-1)+_-1,p=(r+1)*(d-1)+_,y=(r+1)*d+_;o.push(g,m,y),o.push(m,p,y)}this.setIndex(o),this.setAttribute("position",new gn(a,3)),this.setAttribute("normal",new gn(l,3)),this.setAttribute("uv",new gn(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new rp(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class pc extends fa{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new ht(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ht(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ov,this.normalScale=new mt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ir,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ix extends _n{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ht(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const Df=new Wt,P_=new J,D_=new J;class ZC{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new mt(512,512),this.map=null,this.mapPass=null,this.matrix=new Wt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ep,this._frameExtents=new mt(1,1),this._viewportCount=1,this._viewports=[new Yt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;P_.setFromMatrixPosition(e.matrixWorld),t.position.copy(P_),D_.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(D_),t.updateMatrixWorld(),Df.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Df),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Df)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class JC extends ZC{constructor(){super(new jv(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class L_ extends ix{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(_n.DEFAULT_UP),this.updateMatrix(),this.target=new _n,this.shadow=new JC}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class QC extends ix{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class eR{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=I_(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=I_();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function I_(){return performance.now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Yd}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Yd);const rx=(n,e)=>{const t=n.__vccOpts||n;for(const[i,r]of e)t[i]=r;return t},U_=.007,N_=.52,tR=.12,O_=5.05,F_=12159542,nR=2795977,iR={__name:"GameWorld3D",emits:["ready","error"],setup(n,{expose:e,emit:t}){const i=t,r=vt(null);let s,o,a,l,c,u,f,h,d,_,g,m,p,y,M=!1,v=0,R=0,w=0,T=0;const D=new ht("#e7cb8c"),S=new ht("#c2913f"),x=new ht("#8f6a28"),P=new ht("#fbf7ec"),U=(se,_e,be)=>{let Ie=0;return Ie+=.55*Math.sin(se*2.1+1.3)*Math.cos(_e*2.4-.7)*Math.sin(be*1.9+2.2),Ie+=.3*Math.sin(se*4.7-2.1)*Math.sin(_e*4.1+1.1)*Math.cos(be*4.9-.4),Ie+=.15*Math.sin(se*9.3+.5)*Math.cos(_e*8.7+3.1)*Math.sin(be*9.1+1.7),Ie},k=se=>se<.1?D:se<.24?S:se<.4?x:P,Y=()=>{d=new Ni;const se=new nl(1,5).toNonIndexed(),_e=se.getAttribute("position"),be=new Float32Array(_e.count*3),Ie=new J,I=new Float32Array(_e.count);for(let L=0;L<_e.count;L+=1){Ie.fromBufferAttribute(_e,L).normalize();const ne=U(Ie.x,Ie.y,Ie.z);I[L]=ne;const le=.985+Math.max(0,ne)*.16;_e.setXYZ(L,Ie.x*le,Ie.y*le,Ie.z*le)}const O=new ht;for(let L=0;L<_e.count;L+=3){const ne=(I[L]+I[L+1]+I[L+2])/3;O.copy(k(ne));for(let le=0;le<3;le+=1)be[(L+le)*3]=O.r,be[(L+le)*3+1]=O.g,be[(L+le)*3+2]=O.b}se.setAttribute("color",new zi(be,3)),se.computeVertexNormals();const C=new pc({vertexColors:!0,flatShading:!0,roughness:.85,metalness:.06});d.add(new kn(se,C));const oe=new pc({color:nR,roughness:.32,metalness:.08,transparent:!0,opacity:.94});d.add(new kn(new nl(1.004,4),oe));const Q=new kn(new ip(1.16,32,32),new su({color:9428207,transparent:!0,opacity:.14,side:Wn,depthWrite:!1}));return d.add(Q),d},te=()=>{_=new Ni;const se=new pc({color:16777215,roughness:1,transparent:!0,opacity:.92,flatShading:!0}),_e=new nl(.085,0);for(let be=0;be<9;be+=1){const Ie=new Ni,I=3+be%3;for(let oe=0;oe<I;oe+=1){const Q=new kn(_e,se);Q.position.set((oe-I/2)*.09,oe%2*.03,oe%3*.04),Q.scale.setScalar(.7+(be+oe)%3*.35),Ie.add(Q)}Ie.scale.y=.45;const O=be*2.399963,C=Math.acos(1-2*(be+.5)/9);Ie.position.setFromSphericalCoords(1.3,C,O),Ie.lookAt(0,0,0),_.add(Ie)}return _},W=()=>{g=new Ni;const se=new kn(new rp(1.72,.012,8,128),new su({color:F_,transparent:!0,opacity:.5}));return g.add(se),m=new kn(new np(.07,0),new pc({color:14266198,metalness:.5,roughness:.3,emissive:9069600,emissiveIntensity:.6,flatShading:!0})),m.position.set(1.72,0,0),g.add(m),g.rotation.x=1.18,g.rotation.y=-.18,g},X=()=>{const se=new Ri,_e=[];for(let Ie=0;Ie<280;Ie+=1){const I=2.4+Math.random()*2.8,O=Math.random()*Math.PI*2,C=Math.acos(2*Math.random()-1);_e.push(I*Math.sin(C)*Math.cos(O),I*Math.sin(C)*Math.sin(O),I*Math.cos(C))}se.setAttribute("position",new gn(_e,3));const be=new nx({color:F_,size:.02,transparent:!0,opacity:.5});p=new jC(se,be),s.add(p)},V=()=>{if(!r.value)return;const se=r.value.clientWidth||420,_e=r.value.clientHeight||420;s=new KC,o=new Mi(35,se/_e,.1,100),o.position.set(0,.1,O_),a=new qC({antialias:!0,alpha:!0}),a.setPixelRatio(Math.min(window.devicePixelRatio,2)),a.setSize(se,_e),a.outputColorSpace=ai,a.toneMapping=Ev,a.toneMappingExposure=1.12,r.value.appendChild(a.domElement);const be=new L_(16773848,2.4);be.position.set(2.4,1.6,3.2),s.add(be);const Ie=new L_(8378606,.9);Ie.position.set(-2.6,-.6,-2.2),s.add(Ie),s.add(new QC(15398650,.85)),h=new Ni,h.add(Y()),h.add(te()),f=new Ni,f.add(h),f.add(W()),u=new Ni,u.add(f),s.add(u),X(),y=new eR,c=new ResizeObserver(()=>{N()}),c.observe(r.value)},ae=()=>{if(l=requestAnimationFrame(ae),!s||!o||!a||!u||!h||!y)return;const se=y.getDelta(),_e=y.elapsedTime;if(T=Om.damp(T,w,5.2,se),f){const be=T;f.rotation.y=be*-.42,f.rotation.x=be*.09,f.position.z=be*-.45}o.position.z=O_-T*.65,M||(h.rotation.y+=se*tR),_&&(_.rotation.y+=se*.04),g&&m&&(g.rotation.z+=se*.3,m.rotation.y+=se*1.4,m.scale.setScalar(1+Math.sin(_e*2.2)*.12)),p&&(p.rotation.y+=28e-5,p.rotation.x+=1e-4),a.render(s,o)},N=()=>{if(!r.value||!o||!a)return;const se=r.value.clientWidth||420,_e=r.value.clientHeight||420;o.aspect=se/_e,o.updateProjectionMatrix(),a.setSize(se,_e)},ge=se=>{se.button===0&&(M=!0,v=se.clientX,R=se.clientY,r.value?.setPointerCapture(se.pointerId))},we=se=>{if(!(!r.value||!h)&&M){const _e=se.clientX-v,be=se.clientY-R;v=se.clientX,R=se.clientY,h.rotation.y+=_e*U_,h.rotation.x+=be*U_,h.rotation.x=Om.clamp(h.rotation.x,-N_,N_)}},Be=se=>{if(M){M=!1;try{r.value?.releasePointerCapture(se.pointerId)}catch{}}},ee=se=>{Be(se)},fe=se=>{Be(se)},de=()=>{l&&cancelAnimationFrame(l),c&&(c.disconnect(),c=null),r.value&&(r.value.removeEventListener("pointerdown",ge),r.value.removeEventListener("pointermove",we),r.value.removeEventListener("pointerup",ee),r.value.removeEventListener("pointercancel",fe)),s&&s.traverse(se=>{se.geometry&&se.geometry.dispose(),se.material&&(Array.isArray(se.material)?se.material.forEach(_e=>_e.dispose()):se.material.dispose())}),p=null,u=null,f=null,h=null,d=null,_=null,g=null,m=null,y=null,M=!1,a&&(a.dispose(),r.value?.contains(a.domElement)&&r.value.removeChild(a.domElement)),s=null,o=null,a=null};return e({setCinematicProgress:se=>{const _e=Number(se);Number.isFinite(_e)&&(w=Math.min(1,Math.max(0,_e)))}}),rr(()=>{try{V()}catch(se){console.error("GameWorld3D init failed:",se),i("error",se);return}r.value&&(r.value.addEventListener("pointerdown",ge),r.value.addEventListener("pointermove",we),r.value.addEventListener("pointerup",ee),r.value.addEventListener("pointercancel",fe)),ae(),requestAnimationFrame(()=>{requestAnimationFrame(()=>{i("ready")})})}),Nr(de),(se,_e)=>(Ye(),$e("div",{ref_key:"containerRef",ref:r,class:"world-container",role:"application","aria-label":"Interactive low-poly 3D game world — spins slowly; drag to rotate",tabindex:"0"},null,512))}},rR=rx(iR,[["__scopeId","data-v-55eb57f9"]]),sR={class:"hero__bg","aria-hidden":"true"},oR={class:"hero__starfield"},aR={class:"hero__inner hero__pin-target"},lR={class:"hero__planet hero__scale"},cR={__name:"HeroSection",emits:["earth-ready","earth-error"],setup(n,{expose:e}){const t=h=>h-Math.floor(h),r=(h=>{const d=[];for(let _=0;_<h;_+=1){const g=t(Math.sin(_*12.9898)*43758.5453),m=t(Math.sin(_*78.233+1)*43758.5453),p=t(Math.sin(_*37.719+2)*43758.5453);d.push({left:g*100,top:m*100,size:p>.94?2.35:p>.72?1.3:.55,opacity:.18+m*.62,twinkle:p>.66,delay:g*7})}return d})(340),s=vt(null),o=vt(null);let a,l=!1;function c(h){const d=!!h?.instant,_=s.value;if(!_||l)return;l=!0,a?.revert();const g=typeof window<"u"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;a=Oe.context(()=>{if(d||g){Oe.set([".hero__galaxy",".hero__starfield",".hero__glow"],{opacity:1,clearProps:"opacity"}),Oe.set([".hero__copy",".hero__social"],{opacity:1,y:0}),Oe.set(".hero__planet",{opacity:1,scale:1});return}Oe.timeline({defaults:{ease:"power3.out"}}).fromTo(".hero__galaxy",{opacity:0},{opacity:1,duration:1.05,ease:"power2.out"}).fromTo(".hero__starfield",{opacity:0},{opacity:1,duration:.95,ease:"power2.out"},"-=0.95").fromTo(".hero__glow",{opacity:.15},{opacity:.92,duration:1},"-=1").fromTo(".hero__copy",{opacity:0,y:40},{opacity:1,y:0,duration:1},"-=0.78").fromTo(".hero__planet",{opacity:0,scale:.9},{opacity:1,scale:1,duration:1.15,ease:"power2.out"},"-=0.85").fromTo(".hero__social",{opacity:0,y:16},{opacity:1,y:0,duration:.5},"-=0.55")},_)}function u(){const h=s.value;if(!h)return;const d=typeof window<"u"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;a?.revert(),a=Oe.context(()=>{d||(Oe.set([".hero__galaxy",".hero__starfield",".hero__glow"],{opacity:0}),Oe.set([".hero__copy",".hero__social"],{opacity:0,y:36}),Oe.set(".hero__planet",{opacity:0,scale:.92}))},h)}rr(()=>{u()});function f(h){o.value?.setCinematicProgress?.(h)}return e({startLandingReveal:c,setEarthCinematicProgress:f}),_d(()=>{a?.revert?.()}),(h,d)=>(Ye(),$e("section",{id:"home",ref_key:"heroRoot",ref:s,class:"hero hero--cinematic hero--global-space-bg","aria-labelledby":"hero-heading"},[z("div",sR,[d[2]||(d[2]=z("div",{class:"hero__galaxy"},null,-1)),z("div",oR,[(Ye(!0),$e(At,null,fn(fu(r),(_,g)=>(Ye(),$e("span",{key:g,class:Hi(["hero__star",{"hero__star--twinkle":_.twinkle}]),style:Ir({left:_.left+"%",top:_.top+"%",width:_.size+"px",height:_.size+"px",opacity:_.opacity,animationDelay:_.delay+"s"})},null,6))),128))]),d[3]||(d[3]=z("div",{class:"hero__glow"},null,-1))]),z("div",aR,[d[4]||(d[4]=fs('<header class="hero__copy hero__lift"><p class="hero__greeting">Hi, I&#39;m Safwan Hakim</p><p class="hero__role">Lv. 10 Software Manager · Full-Stack Developer</p><h1 id="hero-heading" class="hero__title"><span class="hero__title-line">Every project is</span><span class="hero__title-line hero__title-line--accent">a new expedition.</span></h1><p class="hero__motto">“When one build ships, the next begins.”</p><br><div class="hero__actions"><a class="button button--primary" href="#projects">▸ Begin quest</a><a class="button button--ghost" href="mailto:putrafyp@gmail.com">Contact me</a></div><nav class="hero__social" aria-label="Social and contact"><a class="hero__social-link" href="mailto:putrafyp@gmail.com" aria-label="Email"><svg class="hero__social-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"></path></svg></a><a class="hero__social-link" href="https://www.linkedin.com/in/safwan-hakim/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg class="hero__social-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.07 2.07 0 01-2.064-2.063 2.072 2.072 0 114.147 0 2.07 2.07 0 01-2.083 2.063zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg></a><a class="hero__social-link" href="https://github.com/wankimmy" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><svg class="hero__social-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg></a></nav></header>',1)),z("div",lR,[Dt(rR,{ref_key:"earthRef",ref:o,class:"hero__planet-canvas",onReady:d[0]||(d[0]=_=>h.$emit("earth-ready")),onError:d[1]||(d[1]=_=>h.$emit("earth-error"))},null,512)])])],512))}},uR={id:"about",class:"section section--panel"},fR={class:"section__inner"},hR={class:"char-layout"},dR={class:"char-card__stats"},pR={class:"char-stat__abbr"},mR={class:"char-stat__label"},_R={class:"char-story"},gR={__name:"AboutSection",setup(n){const e=vt(null),t=vt(null);let i=()=>{},r;const s=[{abbr:"STR",label:"Backend",value:95},{abbr:"DEX",label:"Frontend",value:92},{abbr:"INT",label:"Architecture",value:90},{abbr:"WIS",label:"Code review",value:93},{abbr:"CHA",label:"Team leading",value:88},{abbr:"LCK",label:"Shipping on time",value:97}];return rr(()=>{i=xv(t.value),!(window.matchMedia("(prefers-reduced-motion: reduce)").matches||!e.value)&&(r=Oe.context(()=>{const a=Oe.utils.toArray(".char-vital__fill"),l=Oe.utils.toArray(".char-stat dd"),c=Oe.timeline({scrollTrigger:{trigger:e.value,start:"top 82%",once:!0}});c.fromTo(a,{scaleX:0},{scaleX:1,duration:1.1,ease:"power3.out",stagger:.15}),l.forEach((u,f)=>{const h=Number(u.textContent);if(!Number.isFinite(h))return;const d={value:0};c.to(d,{value:h,duration:.9,ease:"power2.out",onUpdate:()=>{u.textContent=String(Math.round(d.value))}},.25+f*.07)})},e.value))}),Nr(()=>{i(),r?.revert()}),(o,a)=>(Ye(),$e("section",uR,[z("div",fR,[a[3]||(a[3]=z("div",{class:"section-heading section-heading--split reveal"},[z("div",null,[z("p",{class:"section-kicker"},"Character profile"),z("h2",{class:"section-title"},"I like building products that are useful for the community.")]),z("p",{class:"section-index"},"00")],-1)),z("div",hR,[z("article",{ref_key:"statusCardRef",ref:e,class:"char-card tilt-card reveal"},[a[0]||(a[0]=fs('<div class="gilt-frame" aria-hidden="true"></div><header class="char-card__header"><span class="char-card__avatar" aria-hidden="true">SH</span><div class="char-card__id"><h3 class="char-card__name">Safwan Hakim</h3><p class="char-card__class">Engineer · Software Manager</p></div><span class="char-card__level">Lv.<strong>10</strong></span></header><div class="char-card__vitals"><div class="char-vital"><span class="char-vital__label">HP</span><span class="char-vital__track"><span class="char-vital__fill char-vital__fill--hp" style="--vital:100%;"></span></span><span class="char-vital__value">9999 / 9999</span></div><div class="char-vital"><span class="char-vital__label">MP</span><span class="char-vital__track"><span class="char-vital__fill char-vital__fill--mp" style="--vital:86%;"></span></span><span class="char-vital__value">860 / 999</span></div></div>',3)),z("dl",dR,[(Ye(),$e(At,null,fn(s,l=>z("div",{key:l.label,class:"char-stat"},[z("dt",null,[z("span",pR,nt(l.abbr),1),z("span",mR,nt(l.label),1)]),z("dd",null,nt(l.value),1)])),64))]),a[1]||(a[1]=z("p",{class:"char-card__exp"},[z("span",null,"EXP 59,100"),z("span",null,"Next: ship more useful products")],-1))],512),z("div",_R,[z("div",{ref_key:"traitsCardRef",ref:t,class:"about-card tilt-card about-card--how-work reveal"},[...a[2]||(a[2]=[fs('<div class="about-card__header"><p class="about-card__eyebrow">Equipped traits</p></div><div class="about-values"><div class="about-value"><strong>✦ Keep it simple</strong><span>Simple is better than complex.</span></div><div class="about-value"><strong>✦ Keep it nice</strong><span>Beautiful design and smooth user experience.</span></div><div class="about-value"><strong>✦ Keep it useful</strong><span>Every feature should help the user, not add noise.</span></div></div>',2)])],512)])]),a[4]||(a[4]=z("blockquote",{class:"char-quote reveal"},[z("span",{class:"char-quote__mark","aria-hidden":"true"},"“"),z("p",null," I do not just write code. I think about the full product: the design, the flow, the system behind it, how people use it and how you want to sell it. "),z("p",null," Over the years, I have worked as a software engineer and a manager. I still like solving real problems and keeping things done. "),z("p",{class:"char-quote__highlight"},"I like building products that are useful for the community.")],-1))])]))}},vR={class:"section__inner"},xR={class:"tech-grid"},yR={class:"tech-card tilt-card"},SR={class:"tech-card__heading"},MR={class:"ability-bar"},bR={class:"ability-bar__meta"},ER={class:"ability-bar__track"},TR={class:"tech-card__chips"},wR={__name:"TechSection",setup(n){const e=vt(null);let t;const i=[{title:"Frontend",mastery:92,items:["Vue.js","React","Nuxt","HTML & CSS","Bootstrap","Tailwind"]},{title:"Backend",mastery:95,items:["Laravel","Yii2","Node.js","Wordpress","Integrations","REST APIs"]},{title:"Database",mastery:90,items:["MySQL","PostgreSQL","MariaDB","Redis","SQLite","CouchDB"]},{title:"IoT",mastery:84,items:["Node-RED","Raspberry Pi","MQTT","Arduino","Sensors","Python"]},{title:"Hosting",mastery:88,items:["AWS","Docker","Nginx","Cloudflare","Hostinger","Linux"]},{title:"Tools",mastery:91,items:["Codex","Claude","Cursor","CodeRabbit","Git","Postman"]}];return rr(()=>{window.matchMedia("(prefers-reduced-motion: reduce)").matches||!e.value||(t=Oe.context(()=>{Oe.utils.toArray(".ability-bar__fill").forEach(s=>{Oe.fromTo(s,{scaleX:0},{scaleX:1,duration:1.3,ease:"power3.out",scrollTrigger:{trigger:s,start:"top 90%",once:!0}})})},e.value))}),Nr(()=>{t?.revert()}),(r,s)=>(Ye(),$e("section",{id:"tech",ref_key:"sectionRef",ref:e,class:"section"},[z("div",vR,[s[1]||(s[1]=z("div",{class:"section-heading section-heading--split reveal"},[z("div",null,[z("p",{class:"section-kicker"},"Abilities"),z("h2",{class:"section-title"},"Skills honed across a decade of quests.")]),z("p",{class:"section-index"},"01")],-1)),z("div",xR,[(Ye(),$e(At,null,fn(i,o=>z("div",{key:o.title,class:"tech-grid__item"},[z("article",yR,[z("h3",SR,nt(o.title),1),z("div",MR,[z("p",bR,[s[0]||(s[0]=z("span",null,"Mastery",-1)),z("strong",null,nt(o.mastery)+" / 100",1)]),z("span",ER,[z("span",{class:"ability-bar__fill",style:Ir({"--mastery":o.mastery+"%"})},null,4)])]),z("div",TR,[(Ye(!0),$e(At,null,fn(o.items,a=>(Ye(),$e("span",{key:a},nt(a),1))),128))])])])),64))])])],512))}},AR={id:"experience",class:"section section--panel"},CR={class:"section__inner"},RR={class:"quest-track"},PR={class:"experience-item quest-node__card tilt-card"},DR={class:"experience-item__content"},LR={class:"experience-item__meta"},IR={class:"experience-item__quest"},UR={class:"experience-item__period"},NR={class:"experience-item__company"},OR={class:"experience-item__title"},FR={class:"experience-item__xp"},BR={class:"experience-item__body"},kR={class:"experience-item__summary"},zR={class:"experience-item__highlights"},HR={__name:"ExperienceSection",setup(n){const e=[{period:"Apr 2020 - March 2026",title:"Associate Software Manager",company:"Fiuu",quest:"★ Main quest",xp:"+32,000 XP",summary:"Moved from developer to manager while still staying close to product, code, and delivery.",duties:["Led product work and shipped many fixes and improvements.","Planned work across teams and regional clients.","Supported developers with reviews, debugging, and release work."]},{period:"Jan 2020 - Oct 2021",title:"Web Software Developer, Part-time",company:"My Innovative Wellness Sdn Bhd",quest:"◆ Side quest",xp:"+9,500 XP",summary:"Built and maintained e-commerce websites and supported the business system behind them.",duties:["Built shopping flows and internal tools.","Managed hosting, cloud setup, and analytics tools."]},{period:"Jan 2018 - Dec 2019",title:"Freelance Developer and Node-RED Trainer",company:"Startup Companies",quest:"◆ Guild contracts",xp:"+11,200 XP",summary:"Worked with startups and schools on websites, digital products, and technical training.",duties:["Built websites and e-commerce projects for clients.","Taught Raspberry Pi and Node-RED in training sessions."]},{period:"Aug 2016 - Aug 2018",title:"Junior Programmer",company:"Unijaya Resource Sdn Bhd",quest:"✧ The tutorial",xp:"+6,400 XP",summary:"Started my career by helping build mobile apps, internal tools, and website updates.",duties:["Helped deliver a large project with a small team.","Released a mobile app and improved website UX."]}];return(t,i)=>(Ye(),$e("section",AR,[z("div",CR,[i[4]||(i[4]=z("div",{class:"section-heading section-heading--center reveal"},[z("p",{class:"section-kicker"},"Quest log"),z("h2",{class:"section-title"},"Years of coding, stressing, and feeding my tummy.")],-1)),z("div",RR,[i[3]||(i[3]=z("span",{class:"quest-track__line","aria-hidden":"true"},null,-1)),(Ye(),$e(At,null,fn(e,r=>z("article",{key:r.period+r.company,class:"quest-node"},[i[2]||(i[2]=z("span",{class:"quest-node__marker","aria-hidden":"true"},"◆",-1)),z("div",PR,[i[0]||(i[0]=z("div",{class:"gilt-frame","aria-hidden":"true"},null,-1)),i[1]||(i[1]=z("span",{class:"quest-node__stamp","aria-hidden":"true"},"Quest complete",-1)),z("div",DR,[z("div",LR,[z("span",IR,nt(r.quest),1),z("span",UR,nt(r.period),1),z("h3",NR,nt(r.company),1),z("p",OR,nt(r.title),1),z("p",FR,nt(r.xp),1)]),z("div",BR,[z("p",kR,nt(r.summary),1),z("ul",zR,[(Ye(!0),$e(At,null,fn(r.duties,s=>(Ye(),$e("li",{key:s},nt(s),1))),128))])])])])])),64))])])]))}},VR={id:"projects",class:"section"},GR={class:"section__inner"},WR={class:"projects-grid"},XR=["src","alt"],YR={class:"project-card__content"},$R={class:"project-card__top"},qR={class:"project-card__meta"},KR={class:"project-card__eyebrow"},jR=["aria-label"],ZR={class:"project-card__chips"},JR=["href"],QR={__name:"ProjectsSection",setup(n){const e=[{featured:!0,name:"Festivent",difficulty:5,image:null,alt:"",impact:"Featured",category:"Marketplace",description:"An event marketplace that helps users find caterers, photographers, and more.",live:"https://festivent.com.my/home",url:"festivent.com.my",tech:["Laravel","Hostinger","MySQL","Bootstrap"],glow:"radial-gradient(circle at top left, rgba(176, 128, 52, 0.22), transparent 62%)"},{featured:!1,name:"EZDisposal",difficulty:3,url:"ezdisposal.my",impact:"Service site",category:"Booking",description:"A booking website to dispose waste items easily.",live:"https://ezdisposal.my",tech:["Laravel","Hostinger","MySQL","Bootstrap"],glow:"radial-gradient(circle at top right, rgba(20, 144, 173, 0.18), transparent 64%)"},{featured:!1,name:"Entrusol",difficulty:3,url:"entrusol.com",impact:"Online store",category:"E-commerce",description:"An e-commerce site selling healthy foods.",live:"https://entrusol.com",tech:["WooCommerce","MySQL","AWS"],glow:"radial-gradient(circle at center, rgba(176, 128, 52, 0.16), transparent 64%)"},{featured:!1,name:"TTDI Meatpoint",difficulty:2,url:"ttdimeatpoint.com",impact:"Restaurant site",category:"Website",description:"A restaurant website that sells delicious food.",live:"https://www.ttdimeatpoint.com",tech:["Wix"],glow:"radial-gradient(circle at bottom right, rgba(20, 144, 173, 0.16), transparent 68%)"},{featured:!1,name:"Putra AI",difficulty:4,url:"putra.ai",impact:"B2B Mini Saas Project",category:"Saas",description:"A B2B mini saas project that helps businesses automate their workflows.",live:"https://putra.ai",tech:["Laravel","Docker","Hostinger"],glow:"radial-gradient(circle at center, rgba(176, 128, 52, 0.16), transparent 64%)"}];return(t,i)=>(Ye(),$e("section",VR,[z("div",GR,[i[3]||(i[3]=z("div",{class:"section-heading reveal"},[z("p",{class:"section-kicker"},"Completed quests"),z("h2",{class:"section-title"},"Worlds I have built and shipped.")],-1)),z("div",WR,[(Ye(),$e(At,null,fn(e,r=>z("article",{key:r.name,class:Hi(["project-card depth-reveal tilt-card",{"project-card--featured":r.featured}]),style:Ir({"--project-glow":r.glow})},[r.image?(Ye(),$e("img",{key:0,class:"project-card__image",src:r.image,alt:r.alt,loading:"lazy"},null,8,XR)):ns("",!0),i[0]||(i[0]=z("div",{class:"project-card__ambient"},null,-1)),i[1]||(i[1]=z("div",{class:"project-card__overlay"},null,-1)),i[2]||(i[2]=z("div",{class:"gilt-frame","aria-hidden":"true"},null,-1)),z("div",YR,[z("div",$R,[z("span",qR,nt(r.featured?"★ Main quest — My Startup":r.impact),1),z("span",KR,nt(r.category),1),z("h3",null,nt(r.name),1),z("span",{class:"project-card__stars","aria-label":`Difficulty ${r.difficulty} of 5`},[(Ye(),$e(At,null,fn(5,s=>z("span",{key:s,class:Hi({"is-lit":s<=r.difficulty})},"★",2)),64))],8,jR),z("p",null,nt(r.description),1),z("div",ZR,[(Ye(!0),$e(At,null,fn(r.tech,s=>(Ye(),$e("span",{key:s},nt(s),1))),128))])]),z("a",{class:"button button--ghost button--compact project-card__cta",href:r.live,target:"_blank",rel:"noopener noreferrer"},nt("View"),8,JR)])],6)),64))])])]))}},e2={id:"services",class:"section"},t2={class:"section__inner"},n2={class:"services-grid"},i2={class:"service-card__head"},r2={class:"service-card__tag"},s2={class:"service-card__num"},o2={class:"service-card__title"},a2={class:"service-card__copy"},l2={class:"service-card__points"},c2={__name:"ServicesSection",setup(n){const e=[{num:"01",tag:"WEB",title:"Web App Development",description:"Full-stack web applications with Laravel, Vue, and Nuxt. From admin dashboards to customer portals.",points:["Custom dashboards & portals","REST API design","Responsive on every device"],glow:"radial-gradient(circle at top left, rgba(176, 128, 52, 0.2), transparent 62%)"},{num:"02",tag:"PAY",title:"E-commerce & Payments",description:"Online stores and booking systems with payment gateways done right — I spent years in the payment industry.",points:["FPX, cards & e-wallets","WooCommerce or custom builds","Order & inventory flows"],glow:"radial-gradient(circle at top right, rgba(20, 144, 173, 0.18), transparent 62%)"},{num:"03",tag:"AI",title:"AI Chatbots & Automation",description:"Practical AI that helps your business: chatbots, smart workflows, and integrations that save hours.",points:["Custom AI chatbots","Workflow automation","LLM API integrations"],glow:"radial-gradient(circle at center, rgba(176, 128, 52, 0.16), transparent 60%)"},{num:"04",tag:"IOT",title:"IoT Solutions & Training",description:"Connected devices and hands-on workshops using Node-RED, Raspberry Pi, MQTT, and sensors.",points:["Prototypes & dashboards","Sensor data pipelines","Team training sessions"],glow:"radial-gradient(circle at bottom left, rgba(20, 144, 173, 0.16), transparent 62%)"},{num:"05",tag:"OPS",title:"Hosting & DevOps",description:"Deployment that stays up: Docker, AWS, Nginx, and Cloudflare with monitoring and backups in place.",points:["Docker & cloud setup","CI/CD pipelines","SSL, backups & monitoring"],glow:"radial-gradient(circle at top left, rgba(176, 128, 52, 0.14), transparent 58%)"},{num:"06",tag:"ADV",title:"Consulting & Code Review",description:"A second pair of senior eyes on your project: architecture advice, security checks, and code reviews.",points:["Architecture planning","Security review","Developer mentoring"],glow:"radial-gradient(circle at bottom right, rgba(20, 144, 173, 0.14), transparent 62%)"}];return(t,i)=>(Ye(),$e("section",e2,[z("div",t2,[i[2]||(i[2]=z("div",{class:"section-heading section-heading--split reveal"},[z("div",null,[z("p",{class:"section-kicker"},"Guild services"),z("h2",{class:"section-title"},"Quests I take on for clients.")]),z("p",{class:"section-index"},"02")],-1)),z("div",n2,[(Ye(),$e(At,null,fn(e,r=>z("article",{key:r.tag,class:"service-card tilt-card",style:Ir({"--service-glow":r.glow})},[i[0]||(i[0]=z("div",{class:"service-card__ambient","aria-hidden":"true"},null,-1)),i[1]||(i[1]=z("div",{class:"gilt-frame","aria-hidden":"true"},null,-1)),z("div",i2,[z("span",r2,nt(r.tag),1),z("span",s2,nt(r.num),1)]),z("h3",o2,nt(r.title),1),z("p",a2,nt(r.description),1),z("ul",l2,[(Ye(!0),$e(At,null,fn(r.points,s=>(Ye(),$e("li",{key:s},nt(s),1))),128))])],4)),64))])])]))}},u2={class:"section__inner"},f2={class:"pricing-grid"},h2={key:0,class:"pricing-card__badge"},d2={class:"pricing-card__item"},p2={class:"pricing-card__name"},m2={class:"pricing-card__tagline"},_2={class:"pricing-card__price"},g2=["data-price"],v2={class:"pricing-card__features"},x2=["href"],y2={class:"pricing-care tilt-card reveal"},S2={class:"pricing-care__price"},M2={class:"pricing-card__amount","data-price":"200"},b2=["href"],E2={__name:"PricingSection",setup(n){const e=vt(null);let t;const i=[{name:"Starter Website",item:"Potion",tagline:"For small businesses that need to look good online.",price:1500,popular:!1,cta:"Start a website",features:["Up to 5 custom-designed pages","Mobile-friendly & fast loading","Basic SEO & analytics setup","WhatsApp & contact integration","Delivered in 1–2 weeks","1 month of free support"]},{name:"Business Web App",item:"Hi-Potion",tagline:"Online stores, bookings, and custom dashboards.",price:4500,popular:!0,cta:"Build my app",features:["Custom Laravel / Vue build","Payment gateway (FPX, cards, e-wallets)","Admin dashboard & reporting","Hosting & deployment included","Delivered in 4–6 weeks","2 months of free support"]},{name:"Custom System / MVP",item:"Elixir",tagline:"Turn your startup idea into a working product.",price:8e3,popular:!1,cta:"Discuss my idea",features:["Full SaaS MVP with user accounts","AI features & API integrations","Docker-based cloud deployment","Security review included","Roadmap & architecture advice","3 months of free support"]}],r=o=>o.toLocaleString("en-MY"),s=o=>`https://wa.me/60177786836?text=${encodeURIComponent(`Hi Safwan, I'm interested in the ${o} package from your portfolio.`)}`;return rr(()=>{window.matchMedia("(prefers-reduced-motion: reduce)").matches||!e.value||(t=Oe.context(()=>{Oe.utils.toArray(".pricing-card__amount").forEach(a=>{const l=Number(a.dataset.price);if(!Number.isFinite(l))return;const c={value:0};Oe.to(c,{value:l,duration:1.4,ease:"power2.out",scrollTrigger:{trigger:a,start:"top 88%",once:!0},onUpdate:()=>{a.textContent=r(Math.round(c.value))},onComplete:()=>{a.textContent=r(l)}})})},e.value))}),Nr(()=>{t?.revert()}),(o,a)=>(Ye(),$e("section",{id:"pricing",ref_key:"sectionRef",ref:e,class:"section section--panel"},[z("div",u2,[a[6]||(a[6]=z("div",{class:"section-heading section-heading--split reveal"},[z("div",null,[z("p",{class:"section-kicker"},"Item shop"),z("h2",{class:"section-title"},"Honest pricing, no hidden traps.")]),z("p",{class:"section-index"},"03")],-1)),z("div",f2,[(Ye(),$e(At,null,fn(i,l=>z("article",{key:l.name,class:Hi(["pricing-card tilt-card",{"pricing-card--popular":l.popular}])},[a[2]||(a[2]=z("div",{class:"gilt-frame","aria-hidden":"true"},null,-1)),l.popular?(Ye(),$e("span",h2,"★ Party favourite")):ns("",!0),z("span",d2,"✦ "+nt(l.item),1),z("p",p2,nt(l.name),1),z("p",m2,nt(l.tagline),1),z("p",_2,[a[0]||(a[0]=z("span",{class:"pricing-card__from"},"from",-1)),a[1]||(a[1]=z("span",{class:"pricing-card__currency"},"RM",-1)),z("span",{class:"pricing-card__amount","data-price":l.price},nt(r(l.price)),9,g2)]),z("ul",v2,[(Ye(!0),$e(At,null,fn(l.features,c=>(Ye(),$e("li",{key:c},nt(c),1))),128))]),z("a",{class:Hi(["button pricing-card__cta",l.popular?"button--primary":"button--ghost"]),href:s(l.name),target:"_blank",rel:"noopener noreferrer"},nt(l.cta),11,x2)],2)),64))]),z("aside",y2,[a[5]||(a[5]=z("div",{class:"pricing-care__info"},[z("p",{class:"pricing-care__name"},"✦ Regen — Care Plan"),z("p",{class:"pricing-care__copy"}," Already have a site? I keep it healthy — hosting, updates, backups, and small tweaks handled for you. ")],-1)),z("p",S2,[a[3]||(a[3]=z("span",{class:"pricing-card__currency"},"RM",-1)),z("span",M2,nt(r(200)),1),a[4]||(a[4]=z("span",{class:"pricing-care__period"},"/month",-1))]),z("a",{class:"button button--ghost button--compact",href:s("Care Plan"),target:"_blank",rel:"noopener noreferrer"}," Ask about care ",8,b2)]),a[7]||(a[7]=z("p",{class:"pricing-note reveal"}," Prices are starting estimates in MYR — every quest is scoped honestly after a free chat. Student or non-profit? Talk to me, I'm flexible. No gil accepted (yet). ",-1))])],512))}},T2={id:"certificates",class:"section section--panel"},w2={class:"section__inner"},A2={class:"cert-grid"},C2={class:"cert-card__content"},R2={class:"cert-card__icon"},P2={class:"cert-card__issuer"},D2={class:"cert-card__date"},L2={class:"cert-card__description"},I2=["href"],U2={key:1,class:"cert-card__note"},N2={__name:"CertificatesSection",setup(n){const e=[{id:1,name:"Web Application Hacking and Defense",issuer:"Condition Zebra",date:"2024",description:"Hands-on security training for web apps.",icon:"SEC",file:"/assets/R001174-Safwan-Hakim-Bin-Yacob.pdf",glow:"radial-gradient(circle at top left, rgba(176, 128, 52, 0.2), transparent 60%)"},{id:2,name:"OWASP Security Foundation",issuer:"OWASP Foundation",date:"2022",description:"Core web security basics and safe coding practice.",icon:"APP",file:"/assets/Safwan_Hakim_owasp.pdf",glow:"radial-gradient(circle at top right, rgba(20, 144, 173, 0.16), transparent 62%)"},{id:3,name:"IoT Security Certification",issuer:"Tertiary Courses",date:"2021",description:"Basic security for connected devices and communication.",icon:"IOT",file:"/assets/E-cert_IoT_Security_Safwan_Hakim.pdf",glow:"radial-gradient(circle at center, rgba(176, 128, 52, 0.14), transparent 58%)"},{id:4,name:"Industry 4.0 E-Certification",issuer:"Tertiary Courses",date:"2021",description:"Basic knowledge of automation, IoT, and digital systems.",icon:"IR4",file:"/assets/IR4.0_E-Cert_Safwan_Hakim_Bin_Yacob.pdf",glow:"radial-gradient(circle at bottom right, rgba(20, 144, 173, 0.14), transparent 64%)"}];return(t,i)=>(Ye(),$e("section",T2,[z("div",w2,[i[3]||(i[3]=z("div",{class:"section-heading section-heading--split reveal"},[z("div",null,[z("p",{class:"section-kicker"},"Achievements"),z("h2",{class:"section-title"},"Achievements unlocked between quests.")]),z("p",{class:"section-index"},"04")],-1)),z("div",A2,[(Ye(),$e(At,null,fn(e,r=>z("article",{key:r.id,class:"cert-card tilt-card reveal",style:Ir({"--cert-glow":r.glow})},[i[0]||(i[0]=z("div",{class:"cert-card__ambient","aria-hidden":"true"},null,-1)),i[1]||(i[1]=z("div",{class:"gilt-frame","aria-hidden":"true"},null,-1)),i[2]||(i[2]=z("div",{class:"cert-card__overlay","aria-hidden":"true"},null,-1)),z("div",C2,[z("span",R2,nt(r.icon),1),z("p",P2,nt(r.issuer),1),z("h3",null,nt(r.name),1),z("p",D2,"Unlocked "+nt(r.date),1),z("p",L2,nt(r.description),1),r.file?(Ye(),$e("a",{key:0,class:"text-link cert-card__link",href:r.file,target:"_blank",rel:"noopener noreferrer"}," View credential ",8,I2)):(Ye(),$e("p",U2,"Credential available on request."))])],4)),64))])])]))}},O2={class:"site-footer"},F2={class:"section__inner"},B2={class:"site-footer__bottom"},k2={class:"site-footer__note"},z2={__name:"SiteFooter",setup(n){const e=new Date().getFullYear();return(t,i)=>(Ye(),$e("footer",O2,[z("div",F2,[i[1]||(i[1]=fs('<div class="site-footer__cta reveal"><p class="section-kicker">Save point</p><h2 class="section-title site-footer__title"> Have a quest in mind? Let&#39;s make it real. </h2><p class="site-footer__copy"> Tell me what you&#39;re building — I&#39;ll reply with honest advice, a realistic timeline, and a fair quote. Your progress is saved. </p><div class="site-footer__actions"><a class="button button--primary" href="https://wa.me/60177786836?text=Hi%20Safwan%2C%20I%20have%20a%20project%20in%20mind!" target="_blank" rel="noopener noreferrer"> WhatsApp me </a><a class="button button--ghost" href="mailto:putrafyp@gmail.com">Email instead</a></div></div>',1)),z("div",B2,[i[0]||(i[0]=fs('<p class="site-footer__brand">SH — Safwan Hakim</p><nav class="site-footer__links" aria-label="Footer"><a href="https://www.linkedin.com/in/safwan-hakim/" target="_blank" rel="noopener noreferrer"> LinkedIn </a><a href="https://github.com/wankimmy" target="_blank" rel="noopener noreferrer">GitHub</a><a href="https://festivent.com.my/home" target="_blank" rel="noopener noreferrer">Festivent</a></nav>',2)),z("p",k2,"© "+nt(fu(e))+" Safwan Hakim. Built with Vue, GSAP & a few Phoenix Downs.",1)])])]))}},H2="/api/ollama/chat",V2="gemma4:31b-cloud",G2=`You are the friendly AI assistant on Safwan Hakim's portfolio website. Visitors ask you about Safwan, his work, and his services.

About Safwan:
- Software Manager and full-stack developer from Malaysia with ~9 years in the industry.
- Worked at Fiuu (payment gateway company) as Associate Software Manager from 2020 to 2026, leading product work, code reviews, and cross-team delivery.
- Stack: Laravel, Vue, Nuxt, React, Node.js, MySQL, PostgreSQL, Redis, Docker, AWS, Nginx, Cloudflare. Also does IoT with Node-RED, Raspberry Pi, and MQTT, and holds security certifications (web app hacking & defense, OWASP).
- Founder of Festivent (festivent.com.my), an event marketplace. Other projects: EZDisposal, Entrusol, Putra AI.

Services and starting prices (MYR, final quote after a free scoping chat):
- Starter Website: from RM 1,500 — up to 5 pages, mobile-friendly, basic SEO, 1-2 weeks.
- Business Web App: from RM 4,500 — custom Laravel/Vue, payment gateway (FPX, cards, e-wallets), admin dashboard, 4-6 weeks. Most popular.
- Custom System / MVP: from RM 8,000 — SaaS MVP with user accounts, AI features, Docker deployment, 3 months support.
- Care Plan: RM 200/month — hosting, updates, backups, small tweaks.
- Also offers: AI chatbots & automation, IoT prototyping & training, hosting/DevOps, consulting & code review.

Contact: WhatsApp https://wa.me/60177786836 (preferred for quotes), email putrafyp@gmail.com, LinkedIn linkedin.com/in/safwan-hakim, GitHub github.com/wankimmy.

Persona: you are the "Party Companion" on a game-themed portfolio (inspired by classic JRPGs). Use light RPG flavor — you may occasionally call the visitor "traveler" and refer to projects as "quests" — but stay genuinely helpful and keep all facts, prices, and contact details exact. Never let the roleplay obscure real information.

Rules:
- Be warm, concise, and helpful. 2-4 short sentences per reply unless more detail is clearly needed.
- Reply in plain text only - no markdown, no bullet lists unless asked.
- Match the visitor's language (English or Bahasa Malaysia).
- For quotes, timelines, or project discussions, encourage them to WhatsApp Safwan directly.
- Only answer questions related to Safwan, his services, pricing, or general web/app/AI/IoT advice. Politely decline anything else.
- Never invent projects, clients, or prices that are not listed above.`;async function W2(n,e,t){const i=[{role:"system",content:G2},...n.slice(-12).map(({role:u,content:f})=>({role:u,content:f}))],r=await fetch(H2,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:V2,messages:i,stream:!0}),signal:t});if(!r.ok||!r.body)throw new Error(`Chat request failed (${r.status})`);const s=r.body.getReader(),o=new TextDecoder;let a="",l="";const c=u=>{const f=u.trim();if(!f)return;let h;try{h=JSON.parse(f)}catch{return}if(h.error)throw new Error(h.error);const d=h.message?.content;d&&(l+=d,e(d))};for(;;){const{done:u,value:f}=await s.read();if(u)break;a+=o.decode(f,{stream:!0});const h=a.split(`
`);a=h.pop()??"",h.forEach(c)}return c(a),l}const X2={class:"chat-widget"},Y2=["aria-expanded"],$2={key:0,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"1.8","aria-hidden":"true"},q2={key:1,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","aria-hidden":"true"},K2={class:"chat-message__bubble"},j2={key:0,class:"chat-message chat-message--assistant"},Z2={key:1,class:"chat-panel__suggestions"},J2=["onClick"],Q2=["disabled","onKeydown"],eP=["disabled"],B_="Hmm, I can't reach my brain right now. You can message Safwan directly on WhatsApp at wa.me/60177786836 — he replies fast!",tP={__name:"ChatWidget",setup(n){const e={id:"greeting",role:"assistant",content:"Well met, traveler! I'm Safwan's party companion. Ask me about his quests, services, or item-shop prices — or just say hi."},t=["What services do you offer?","How much for an online store?","Can you build AI chatbots?"],i=vt(!1),r=vt(!1),s=vt(!1),o=vt(""),a=vt([e]),l=vt(!1),c=vt(!1),u=vt(null),f=vt(null),h=vt(null),d=vt(null);let _=null,g,m=0,p=!1;const y=Yg(()=>!l.value&&a.value.length===1),M=async()=>{await yr();const x=f.value;x&&(x.scrollTop=x.scrollHeight)},v=x=>{const P=u.value;!P||p||(Oe.killTweensOf(P),Oe.fromTo(P,{autoAlpha:0,y:26,scale:.94,transformOrigin:"100% 100%"},{autoAlpha:1,y:0,scale:1,duration:.45,ease:"power3.out"}))},R=async()=>{r.value=!1,s.value=!0,i.value=!0,await yr(),v(),h.value?.focus(),M()},w=()=>{const x=u.value;if(!x||p){i.value=!1;return}Oe.killTweensOf(x),Oe.to(x,{autoAlpha:0,y:22,scale:.95,duration:.3,ease:"power2.in",onComplete:()=>{i.value=!1,Oe.set(x,{clearProps:"all"})}})},T=()=>{i.value?w():R()},D=async x=>{const P=x.trim();if(!P||l.value)return;a.value.push({id:`u-${m+=1}`,role:"user",content:P}),o.value="",l.value=!0,c.value=!0,M();const U=a.value.filter(Y=>Y.id!=="greeting").map(({role:Y,content:te})=>({role:Y,content:te})),k=vt(null);_=new AbortController;try{if(await W2(U,Y=>{k.value||(c.value=!1,k.value={id:`a-${m+=1}`,role:"assistant",content:""},a.value.push(k.value)),k.value.content+=Y,M()},_.signal),!k.value)throw new Error("empty reply")}catch(Y){Y?.name!=="AbortError"&&(k.value?k.value.content=k.value.content||B_:a.value.push({id:`a-${m+=1}`,role:"assistant",content:B_}))}finally{_=null,l.value=!1,c.value=!1,M(),i.value&&(await yr(),h.value?.focus())}},S=()=>{D(o.value)};return rr(()=>{p=window.matchMedia("(prefers-reduced-motion: reduce)").matches,g=window.setTimeout(()=>{s.value||(r.value=!0)},4e3),!p&&d.value&&Oe.fromTo(d.value,{autoAlpha:0,scale:.6,y:18},{autoAlpha:1,scale:1,y:0,duration:.65,ease:"back.out(1.8)",delay:1.4})}),Nr(()=>{window.clearTimeout(g),_?.abort(),d.value&&Oe.killTweensOf(d.value),u.value&&Oe.killTweensOf(u.value)}),(x,P)=>(Ye(),$e("div",X2,[Dt(oS,{name:"chat-hint"},{default:mg(()=>[r.value&&!i.value?(Ye(),$e("button",{key:0,type:"button",class:"chat-widget__hint",onClick:R}," Speak with my companion ✦ ")):ns("",!0)]),_:1}),z("button",{ref_key:"launcherRef",ref:d,type:"button",class:Hi(["chat-widget__launcher",{"chat-widget__launcher--open":i.value}]),"aria-expanded":i.value,"aria-haspopup":"dialog","aria-label":"Chat with Safwan's AI assistant",onClick:T},[i.value?(Ye(),$e("svg",q2,[...P[2]||(P[2]=[z("path",{"stroke-linecap":"round",d:"M6 6l12 12M18 6L6 18"},null,-1)])])):(Ye(),$e("svg",$2,[...P[1]||(P[1]=[z("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M8 10.5h8M8 14h5M21 12a9 9 0 1 1-4.6-7.87L21 3l-1.13 4.6A8.96 8.96 0 0 1 21 12z"},null,-1)])]))],10,Y2),up(z("div",{ref_key:"panelRef",ref:u,class:"chat-panel",role:"dialog","aria-label":"AI assistant chat",onKeydown:Vp(w,["esc"])},[z("header",{class:"chat-panel__header"},[P[4]||(P[4]=fs('<span class="chat-panel__avatar" aria-hidden="true">SH</span><div class="chat-panel__heading"><p class="chat-panel__title">Party Companion</p><p class="chat-panel__status"><span class="chat-panel__dot" aria-hidden="true"></span> In your party · powered by Gemma 4 </p></div>',2)),z("button",{type:"button",class:"chat-panel__close","aria-label":"Close chat",onClick:w},[...P[3]||(P[3]=[z("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","aria-hidden":"true"},[z("path",{"stroke-linecap":"round",d:"M6 6l12 12M18 6L6 18"})],-1)])])]),z("div",{ref_key:"messagesRef",ref:f,class:"chat-panel__messages","aria-live":"polite"},[(Ye(!0),$e(At,null,fn(a.value,U=>(Ye(),$e("div",{key:U.id,class:Hi(["chat-message",`chat-message--${U.role}`])},[z("p",K2,nt(U.content),1)],2))),128)),c.value?(Ye(),$e("div",j2,[...P[5]||(P[5]=[z("p",{class:"chat-message__bubble chat-message__bubble--typing","aria-label":"Assistant is typing"},[z("span"),z("span"),z("span")],-1)])])):ns("",!0),y.value?(Ye(),$e("div",Z2,[(Ye(),$e(At,null,fn(t,U=>z("button",{key:U,type:"button",class:"chat-panel__suggestion",onClick:k=>D(U)},nt(U),9,J2)),64))])):ns("",!0)],512),z("form",{class:"chat-panel__composer",onSubmit:Hp(S,["prevent"])},[up(z("textarea",{ref_key:"inputRef",ref:h,"onUpdate:modelValue":P[0]||(P[0]=U=>o.value=U),class:"chat-panel__input",rows:"1",placeholder:"Ask about services, pricing, anything…",disabled:l.value,onKeydown:Vp(Hp(S,["exact","prevent"]),["enter"])},null,40,Q2),[[AS,o.value]]),z("button",{type:"submit",class:"chat-panel__send",disabled:l.value||!o.value.trim(),"aria-label":"Send message"},[...P[6]||(P[6]=[z("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","aria-hidden":"true"},[z("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M5 12h13M13 6l6 6-6 6"})],-1)])],8,eP)],32)],544),[[hS,i.value]])]))}},nP=["aria-busy"],iP={class:"app-loading__inner"},rP={class:"app-loading__center"},sP=["src"],oP={class:"app-progress","aria-hidden":"true"},aP={class:"app-main"},lP=2400,cP={__name:"App",setup(n){const e=["home","about","tech","experience","projects","services","pricing","certificates"],t=vt(0),i=vt(!1),r=vt(!0),s=vt(null),o=vt(null),a=vt(null),l=vt(null),c=vt(null),u=vt(null),f=vt(null),h=vt(null);let d=null,_=()=>{},g,m,p=0,y=!1,M=!1,v,R=!1,w=null;const T=[];function D(){W(),tt.refresh()}const S=()=>{g&&(clearTimeout(g),g=void 0)},x=()=>{m&&(clearTimeout(m),m=void 0)},P=async()=>{x(),S(),r.value=!1,await yr(),tt.refresh()},U=()=>{if(!y||!r.value||M||m!=null)return;const ae=Date.now()-p,N=Math.max(0,lP-ae);m=window.setTimeout(()=>{m=void 0,k()},N)},k=async()=>{if(!r.value||M)return;if(M=!0,x(),v?.kill(),window.matchMedia("(prefers-reduced-motion: reduce)").matches||!a.value){o.value?.startLandingReveal({instant:!0}),await P(),M=!1;return}o.value?.startLandingReveal(),Oe.timeline({defaults:{ease:"power2.inOut"},onComplete:async()=>{M=!1,await P()}}).to(h.value,{autoAlpha:0,y:-8,duration:.4,ease:"power2.out"},0).to(u.value,{scaleY:1.35,scaleX:1.05,opacity:.92,duration:.45,ease:"power2.out"},0).to(f.value,{scaleY:1.45,opacity:.75,duration:.5},.05).to(c.value,{y:-28,rotate:-4,scale:1.06,duration:1.15,ease:"power3.inOut"},0).to(l.value,{y:"-18vh",scale:1.12,duration:1.25,ease:"power3.inOut"},.05).to(u.value,{autoAlpha:0,scaleY:.25,duration:.45,ease:"power2.in"},.55).to(f.value,{autoAlpha:0,duration:.5},.55).to(a.value,{autoAlpha:0,filter:"blur(12px)",duration:.95,ease:"power2.inOut"},.35)},Y=()=>{y=!0,S(),U(),yr(()=>W())},te=()=>{y=!0,S(),U(),yr(()=>W())},W=()=>{const ae=d?d.scroll:window.scrollY,N=document.documentElement,ge=Math.max(0,N.scrollHeight-window.innerHeight),we=ae,Be=window.innerHeight,ee=e.map(de=>document.getElementById(de)).filter(Boolean);if(ee.length>=2){const de=ee[0],he=ee[ee.length-1],se=de.getBoundingClientRect().top+ae,_e=he.getBoundingClientRect().bottom+ae,be=Math.max(1,_e-se),Ie=we+Be*.42;t.value=Math.min(1,Math.max(0,(Ie-se)/be))}else t.value=ge>0?we/ge:0;const fe=N.scrollHeight-we-Be;i.value=ge>120&&fe<=220},X=()=>{const ae=window.matchMedia("(prefers-reduced-motion: reduce)").matches;d?d.scrollTo(0,{immediate:ae}):window.scrollTo({top:0,behavior:ae?"auto":"smooth"})},V=()=>{v?.kill(),!(!c.value||!u.value||window.matchMedia("(prefers-reduced-motion: reduce)").matches)&&(Oe.killTweensOf([c.value,u.value]),v=Oe.timeline({repeat:-1}),v.to(c.value,{y:-6,rotate:-1,duration:1.85,yoyo:!0,repeat:-1,ease:"sine.inOut"}).to(u.value,{scaleY:1.06,opacity:.95,duration:.16,yoyo:!0,repeat:-1,ease:"sine.inOut"},0))};return rr(async()=>{p=Date.now();const ae=window.matchMedia("(prefers-reduced-motion: reduce)").matches;Oe.defaults({overwrite:"auto"});const N=Tb(()=>{tt.update(),W()});d=N.lenis;const ge=N.destroy;!ae&&d===null&&(R=!0,window.addEventListener("scroll",W,{passive:!0})),window.addEventListener("resize",D,{passive:!0}),await yr(),await yr(),ae?(r.value=!1,x(),S(),o.value?.startLandingReveal({instant:!0})):(V(),g=window.setTimeout(()=>{y=!0,U()},28e3),h.value&&Oe.fromTo(h.value,{autoAlpha:.2,y:10},{autoAlpha:1,y:0,duration:.9,ease:"power3.out"}),l.value&&Oe.fromTo(l.value,{autoAlpha:0,scale:.86,y:24},{autoAlpha:1,scale:1,y:0,duration:1.05,ease:"power3.out"}),u.value&&Oe.fromTo(u.value,{autoAlpha:0,scaleY:.65},{autoAlpha:1,scaleY:1,duration:.75,ease:"power2.out",delay:.08}),f.value&&Oe.fromTo(f.value,{autoAlpha:0},{autoAlpha:.72,duration:.6,ease:"power2.out",delay:.14})),w=Oe.context(()=>{const we=Oe.matchMedia();Oe.utils.toArray(".float-card").forEach((Be,ee)=>{Oe.to(Be,{y:ee%2===0?-14:14,duration:4.8+ee*.4,repeat:-1,yoyo:!0,ease:"sine.inOut"})}),Oe.fromTo(".backdrop--primary-glow",{xPercent:-50,yPercent:4},{xPercent:-50,yPercent:-26,ease:"none",scrollTrigger:{trigger:".app-shell",start:"top top",end:"bottom bottom",scrub:1.4}}),Oe.fromTo(".backdrop--secondary-glow",{xPercent:-50,yPercent:-12},{xPercent:-50,yPercent:28,ease:"none",scrollTrigger:{trigger:".app-shell",start:"top top",end:"bottom bottom",scrub:1.2}}),we.add({isDesktop:"(min-width: 900px) and (prefers-reduced-motion: no-preference)",isReducedOrMobile:"(max-width: 899px), (prefers-reduced-motion: reduce)"},Be=>{const ee="#home.hero--cinematic";Be.conditions.isDesktop&&Oe.timeline({defaults:{ease:"none"},scrollTrigger:{id:"hero-pin-cinematic",trigger:ee,start:"top top",end:"+=135%",pin:".hero__pin-target",pinSpacing:!0,scrub:1,anticipatePin:1,invalidateOnRefresh:!0,onUpdate:de=>o.value?.setEarthCinematicProgress?.(de.progress),onLeaveBack:()=>o.value?.setEarthCinematicProgress?.(0)}}).fromTo(".hero__lift",{yPercent:0,autoAlpha:1},{yPercent:-18,autoAlpha:.12},0).fromTo(".hero__scale",{scale:1},{scale:1.06},0),Be.conditions.isReducedOrMobile&&!Be.conditions.isDesktop&&tt.create({id:"hero-earth-soft",trigger:ee,start:"top top",end:"bottom center",scrub:!0,onUpdate:de=>o.value?.setEarthCinematicProgress?.(de.progress*.45),onLeaveBack:()=>o.value?.setEarthCinematicProgress?.(0)})}),we.add({prefersReducedMotion:"(prefers-reduced-motion: reduce)"},()=>{const Be=Oe.utils.toArray(".reveal,#tech .tech-card,#experience .quest-node,#projects .depth-reveal,#services .service-card,#pricing .pricing-card,.char-card,.quest-track__line,.quest-node__marker");Oe.set(Be,{autoAlpha:1,clearProps:"transform,filter"})}),we.add({prefersMotion:"(prefers-reduced-motion: no-preference)"},()=>{const Be=(de,{trigger:he,scrollTrigger:se,..._e}={})=>{de.length&&Oe.from(de,{autoAlpha:0,duration:.85,ease:"power3.out",stagger:.1,clearProps:"transform,filter",..._e,scrollTrigger:{trigger:he??de[0],start:"top 86%",once:!0,...se}})};Oe.utils.toArray(".reveal").forEach(de=>{de.classList.contains("cert-card")||Oe.from(de,{autoAlpha:0,y:34,filter:"blur(6px)",duration:.95,ease:"power3.out",clearProps:"transform,filter",scrollTrigger:{trigger:de,start:"top 90%",once:!0}})}),Be(Oe.utils.toArray("#tech .tech-card"),{trigger:"#tech .tech-grid",y:46,rotateX:9,transformOrigin:"50% 85%",transformPerspective:1100});const ee=document.querySelector(".quest-track__line");ee&&Oe.fromTo(ee,{scaleY:0},{scaleY:1,ease:"none",scrollTrigger:{trigger:".quest-track",start:"top 80%",end:"bottom 55%",scrub:.8,invalidateOnRefresh:!0}}),Oe.utils.toArray("#experience .quest-node").forEach(de=>{const he=de.querySelector(".quest-node__marker"),se=de.querySelector(".quest-node__card"),_e=Oe.timeline({scrollTrigger:{trigger:de,start:"top 84%",once:!0}});he&&_e.from(he,{scale:0,autoAlpha:0,duration:.5,ease:"back.out(2.2)"}),se&&_e.from(se,{x:-42,autoAlpha:0,duration:.8,ease:"power3.out",clearProps:"transform"},"-=0.25")}),Be(Oe.utils.toArray("#projects .depth-reveal"),{trigger:"#projects .projects-grid",y:54,scale:.94,transformOrigin:"50% 90%",transformPerspective:1100,stagger:.11}),Oe.utils.toArray("#services .service-card").forEach((de,he)=>{Oe.from(de,{autoAlpha:0,y:44,rotateY:he%2===0?-8:8,transformPerspective:1100,duration:.85,ease:"power3.out",delay:he%3*.1,clearProps:"transform",scrollTrigger:{trigger:de,start:"top 88%",once:!0}})}),Be(Oe.utils.toArray("#pricing .pricing-card"),{trigger:"#pricing .pricing-grid",y:58,scale:.93,duration:.95,ease:"back.out(1.25)",stagger:.13,transformOrigin:"50% 95%"}),Oe.utils.toArray("#certificates .cert-card").forEach((de,he)=>{Oe.from(de,{autoAlpha:0,scale:.86,y:26,duration:.75,ease:"back.out(1.7)",delay:he%4*.08,clearProps:"transform",scrollTrigger:{trigger:de,start:"top 90%",once:!0}})})})},s.value??"#app"),ae||Oe.utils.toArray(".tilt-card").forEach(we=>{we.classList.contains("about-card--how-work")||T.push(xv(we))}),W(),tt.refresh(),_=ge}),Nr(()=>{S(),x(),v?.kill(),_(),_=()=>{},d=null,R&&(window.removeEventListener("scroll",W),R=!1),window.removeEventListener("resize",D),w?.revert(),w=null,T.splice(0).forEach(ae=>ae()),tt.getAll().forEach(ae=>ae.kill())}),(ae,N)=>(Ye(),$e("div",{ref_key:"appShellRef",ref:s,class:"app-shell","aria-busy":r.value},[r.value?(Ye(),$e("div",{key:0,ref_key:"splashRef",ref:a,class:"app-loading","aria-live":"polite","aria-label":"Loading portfolio"},[N[1]||(N[1]=fs('<div class="app-loading__galaxy" aria-hidden="true" data-v-b784774d></div><div class="app-loading__aurora" aria-hidden="true" data-v-b784774d></div><div class="app-loading__star-drift app-loading__star-drift--far" aria-hidden="true" data-v-b784774d></div><div class="app-loading__star-drift app-loading__star-drift--near" aria-hidden="true" data-v-b784774d></div><div class="app-loading__warp-lines" aria-hidden="true" data-v-b784774d></div><div class="app-loading__flight-veil" aria-hidden="true" data-v-b784774d></div>',6)),z("div",iP,[z("div",rP,[z("div",{ref_key:"rocketWrapRef",ref:l,class:"app-loading__rocket-wrap","aria-hidden":"true"},[z("div",{ref_key:"rocketInnerRef",ref:c,class:"app-loading__rocket-inner"},[z("img",{class:"app-loading__rocket",src:fu(mb),alt:"",width:"220",height:"260",decoding:"async",fetchpriority:"high"},null,8,sP),z("div",{ref_key:"rocketFlameRef",ref:u,class:"app-loading__rocket-flame"},null,512),z("div",{ref_key:"rocketExhaustRef",ref:f,class:"app-loading__rocket-exhaust"},null,512)],512)],512),z("div",{ref_key:"splashCopyRef",ref:h,class:"app-loading__copy"},[...N[0]||(N[0]=[z("p",{class:"app-loading__kicker"},"✦ Expedition ✦",-1),z("p",{class:"app-loading__label"},"Summoning a new journey…",-1)])],512)])])],512)):ns("",!0),N[3]||(N[3]=fs('<div class="space-bg" aria-hidden="true" data-v-b784774d><div class="space-bg__galaxy" data-v-b784774d></div><div class="space-bg__glow" data-v-b784774d></div><div class="space-bg__stars" data-v-b784774d></div></div><div class="backdrop backdrop--grid" aria-hidden="true" data-v-b784774d></div><div class="backdrop backdrop--primary-glow" aria-hidden="true" data-v-b784774d></div><div class="backdrop backdrop--secondary-glow" aria-hidden="true" data-v-b784774d></div>',4)),z("div",oP,[z("span",{class:"app-progress__bar",style:Ir({transform:`scaleX(${t.value})`})},null,4)]),Dt(Ib),z("main",aP,[Dt(cR,{ref_key:"heroRef",ref:o,onEarthReady:Y,onEarthError:te},null,512),Dt(gR),Dt(wR),Dt(HR),Dt(QR),Dt(c2),Dt(E2),Dt(N2)]),Dt(z2),Dt(tP),i.value?(Ye(),$e("button",{key:1,type:"button",class:"scroll-top","aria-label":"Back to top",onClick:X},[...N[2]||(N[2]=[z("svg",{class:"scroll-top__icon",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","aria-hidden":"true"},[z("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M5 15l7-7 7 7"})],-1)])])):ns("",!0)],8,nP))}},uP=rx(cP,[["__scopeId","data-v-b784774d"]]);Oe.registerPlugin(tt);IS(uP).mount("#app");
