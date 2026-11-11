var e=5350343;function t(t,{count:n=220,lite:r=!1,drag:i=1.6,turbulence:a=1,buoyancy:o=1}={}){let s=n,c=new Float32Array(s*3),l=new Float32Array(s),u=new Float32Array(s),d=new Float32Array(s).fill(1),f=new Float32Array(s*2),p=new Float32Array(s),m=new Float32Array(s*3),h=new Float32Array(s),g=new Float32Array(s),_=new Float32Array(s),v=new Float32Array(s),y=new Float32Array(s),b=new Float32Array(s),x=new Float32Array(s),S=new Float32Array(s),C=new Float32Array(s),w=new Float32Array(s),T=new Float32Array(s),E=new Float32Array(s),D=new Float32Array(s),O=new Float32Array(s),k=new t.PlaneGeometry(2,2),A=(e,n,r)=>{let i=new t.InstancedBufferAttribute(e,n);return i.setUsage(t.DynamicDrawUsage),k.setAttribute(r,i),i},j=A(c,3,`aPos`),M=A(l,1,`aSize`),N=A(u,1,`aRoll`),P=A(d,1,`aAge`),F=A(f,2,`aSeed`),I=A(p,1,`aHeat`),L=A(m,3,`aVel`),R=new t.ShaderMaterial({vertexShader:`
attribute vec3 aPos;
attribute float aSize;
attribute float aRoll;
attribute float aAge;
attribute vec2 aSeed;
attribute float aHeat;
attribute vec3 aVel;
varying vec2 vP;
varying float vAge;
varying float vHeat;
varying vec2 vSeed;
#include <clipping_planes_pars_vertex>
void main() {
  vP = position.xy;
  vAge = aAge;
  vHeat = aHeat;
  vSeed = aSeed;
  vec4 mv = viewMatrix * modelMatrix * vec4(aPos, 1.0);
  // a puff streaks along its own motion on screen: long along the velocity, round across it
  vec2 d2 = (viewMatrix * modelMatrix * vec4(aVel, 0.0)).xy;
  float sp = length(d2);
  vec2 along = sp > 1e-5 ? d2 / sp : vec2(0.0, 1.0);
  vec2 across = vec2(-along.y, along.x);
  float stretch = 1.0 + clamp(length(aVel) * 0.06, 0.0, 0.45);
  vec2 corner = (across * position.x + along * position.y * stretch) * aSize;
  mv.xy += corner;
  vec4 mvPosition = mv;
  #include <clipping_planes_vertex>
  gl_Position = projectionMatrix * mv;
}
`,fragmentShader:`
#include <clipping_planes_pars_fragment>
uniform float uTime;
uniform float uGain;
varying vec2 vP;
varying float vAge;
varying float vHeat;
varying vec2 vSeed;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
float fbm(vec2 p) {
  float s = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    s += a * vnoise(p);
    p = p * 2.03 + vec2(17.1, 9.2);
    a *= 0.5;
  }
  return s;
}

// blackbody-like ramp in linear HDR: white-hot, pale yellow, orange, red
// white-hot is the small core only: most of the flame is orange, the rim red
vec3 ramp(float t) {
  vec3 c = mix(vec3(0.16, 0.025, 0.006), vec3(0.95, 0.24, 0.045), smoothstep(0.15, 0.36, t));
  c = mix(c, vec3(1.7, 0.66, 0.14), smoothstep(0.36, 0.56, t));
  c = mix(c, vec3(2.3, 1.3, 0.38), smoothstep(0.56, 0.78, t));
  c = mix(c, vec3(2.0, 1.55, 0.75), smoothstep(0.86, 1.1, t));
  return c;
}

void main() {
  #include <clipping_planes_fragment>
  float f = clamp(vAge, 0.0, 1.0);
  vec2 p = vP;
  // the flame rises: the noise scrolls up and is warped by a second field
  vec2 scroll = vec2(0.0, -uTime * 1.1 - vSeed.x * 4.0);
  vec2 sp = p * 1.25 + vSeed * 7.0;
  vec2 w = vec2(fbm(sp * 1.5 + scroll * 0.6), fbm(sp * 1.5 + vec2(5.2, 1.3) + scroll * 0.6));
  vec2 q = p + (w - 0.5) * (0.85 + 0.45 * f);
  float r = length(q * vec2(1.0, 0.8));
  float body = 1.0 - smoothstep(0.3, 1.0, r);
  float e = fbm(q * 2.7 + scroll * 1.3 + vSeed * 11.0);
  // fine tongues at the edge: a higher-frequency field pulls the ragged rim apart
  float fine = vnoise(q * 6.5 + scroll * 2.6 + vSeed * 17.0);
  e = e * 0.75 + fine * 0.35;

  // erosion: the puff breaks into tongues as its age pushes against the noise.
  // a hard circular limit keeps every puff round, whatever the warp does to its corners
  float disc = 1.0 - smoothstep(0.55, 0.98, length(p));
  float n = e * 1.15 + body * 0.5 - 0.5 - f * 0.95;
  float mask = smoothstep(0.0, 0.3, n) * disc;
  // hot edges: a thin band just inside the eroded rim burns brightest
  float rim = smoothstep(0.0, 0.12, n) * (1.0 - smoothstep(0.12, 0.3, n));

  // temperature: hotter at the core, cooler toward the ragged edge, cooling with age
  float temp = vHeat * (1.05 - 0.9 * f) + (e - 0.5) * 0.6 + body * 0.1 - (1.0 - body) * 0.12;
  temp = clamp(temp, 0.0, 1.2);

  // smoke: what has cooled below the glow and is old enough to be smoke
  float smoke = (1.0 - smoothstep(0.14, 0.4, temp)) * smoothstep(0.3, 0.75, f);
  // smoke is lit warm grey-brown, lighter than the night sky, so a trail shows against it
  vec3 smokeCol = vec3(0.34, 0.29, 0.25) * (0.55 + 0.6 * e) * (0.7 + 0.3 * rim);

  float glowMask = mask * (1.0 - smoke);
  vec3 emission = ramp(temp) * glowMask * (0.9 + 0.5 * rim) * uGain;
  float alpha = smoke * mask * 0.6;
  // premultiplied: emission adds light, smoke darkens what is behind it
  vec3 rgb = emission + smokeCol * alpha;
  gl_FragColor = vec4(rgb, alpha);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`,uniforms:{uTime:{value:0},uGain:{value:r?.3:.45}},transparent:!0,blending:t.CustomBlending,blendSrc:t.OneFactor,blendDst:t.OneMinusSrcAlphaFactor,blendSrcAlpha:t.OneFactor,blendDstAlpha:t.OneMinusSrcAlphaFactor,depthWrite:!1,side:t.DoubleSide,clipping:!0}),z=new t.InstancedMesh(k,R,s);z.frustumCulled=!1,z.name=`flame`;let B=e,V=()=>(B=Math.imul(B,1664525)+1013904223>>>0,B/4294967296),H=0,U=e=>{S[e]=0,x[e]=0,C[e]=0,l[e]=0,d[e]=1};for(let e=0;e<s;e++)U(e);return{mesh:z,emit(e,t,n,r,i,a,o,c,l){if(!(c>0)||!(o>0))return;let u=H;H=(H+1)%s,h[u]=e,g[u]=t,_[u]=n,v[u]=r,y[u]=i,b[u]=a,x[u]=0,S[u]=c,C[u]=o,O[u]=l<0?0:l>1?1:l,w[u]=V()*6.283,T[u]=(V()-.5)*2.4,E[u]=V(),D[u]=V(),f[u*2]=E[u],f[u*2+1]=D[u]},update(e,t,n=1/0,r=-1/0){let f=e>.05?.05:e>0?e:0;R.uniforms.uTime.value=t;let k=.15;for(let e=0;e<s;e++){if(S[e]<=0)continue;let t=x[e]+f;if(t>=S[e]){U(e);continue}x[e]=t;let s=t/S[e],A=O[e],j=Math.max(0,1-i*f),M=v[e]*j,N=y[e]*j,P=b[e]*j,F=a*(.5+2.4*s)*f;M+=Math.sin(t*5.3+E[e]*6.283)*F,P+=Math.cos(t*4.1+D[e]*6.283)*F,N+=Math.cos(t*6.7+D[e]*6.283)*F*.45,N+=o*(.25+1.5*A*(1-s))*f,v[e]=M,y[e]=N,b[e]=P,h[e]+=M*f,g[e]+=N*f,_[e]+=P*f;let I=C[e]*(1+.6*s),L=g[e];L>n-k&&(I*=Math.max(0,(n-L)/k)),L<r+k&&(I*=Math.max(0,(L-r)/k)),I<0&&(I=0);let R=e*3;c[R]=h[e],c[R+1]=g[e],c[R+2]=_[e],l[e]=I,u[e]=w[e]+T[e]*t,d[e]=s,p[e]=A,m[R]=M,m[R+1]=N,m[R+2]=P}j.needsUpdate=!0,M.needsUpdate=!0,N.needsUpdate=!0,P.needsUpdate=!0,F.needsUpdate=!0,I.needsUpdate=!0,L.needsUpdate=!0},seed(){B=e},clear(){for(let e=0;e<s;e++)U(e);B=e,H=0,M.needsUpdate=!0,P.needsUpdate=!0},dispose(){z.removeFromParent(),k.dispose(),R.dispose()}}}export{t};