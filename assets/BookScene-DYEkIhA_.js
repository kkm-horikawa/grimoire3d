import{T as jn,A as io,F as zi,a as ro,c as ao}from"./index-8E35cdp1.js";import{U as Lt,c as oo,N as Dt,S as Zt,C as Ke,R as so,e as it,w as Qe,V as dt,l as Xi,a as hi,M as At,F as ma,W as Ki,b as Ft,d as at,L as jt,H as Wt,D as wt,B as Mt,f as sn,g as De,h as xt,p as co,i as Rn,j as qi,k as lo,m as pt,O as wi,n as tt,E as fo,o as ft,P as an,A as uo,q as Zn,r as Nt,s as nn,t as cn,u as En,v as Qt,x as Bn,y as po,z as _a,G as Tn,I as ht,J as Gn,K as tn,Q as Hn,T as ho,X as mo,Y as dn,Z as _o,_ as go,$ as vo,a0 as So,a1 as xo,a2 as Eo,a3 as To,a4 as Mo,a5 as Ao,a6 as Ro,a7 as bo,a8 as Co,a9 as Po,aa as Lo,ab as wo,ac as ga,ad as Vn,ae as In,af as gn,ag as va,ah as yt,ai as Do,aj as Uo,ak as Di,al as Io,am as Ui,an as No,ao as yo,ap as Fo,aq as Oo,ar as ze,as as Bo,at as Go,au as Ot,av as Vt,aw as Nn,ax as Ho,ay as kt,az as vn,aA as Gt,aB as Sa,aC as Vo,aD as xa,aE as Ea,aF as Ta,aG as kn,aH as Ma,aI as Aa,aJ as Ra,aK as Ii,aL as ko,aM as Wo,aN as zo,aO as Xo,aP as ba,aQ as Ko,aR as qo,aS as Yo,aT as Qn,aU as Jn,aV as ei,aW as ti,aX as Yi,aY as $i,aZ as ji,a_ as Zi,a$ as Qi,b0 as Ji,b1 as er,b2 as tr,b3 as nr,b4 as ir,b5 as rr,b6 as ar,b7 as or,b8 as sr,b9 as cr,ba as lr,bb as fr,bc as ur,bd as dr,be as pr,bf as hr,bg as mr,bh as _r,bi as gr,bj as vr,bk as Sr,bl as xr,bm as Er,bn as Tr,bo as Mr,bp as Ar,bq as Rr,br as mi,bs as _i,bt as gi,bu as vi,bv as Si,bw as xi,bx as Ei,by as $o,bz as br,bA as jo,bB as yn,bC as Zo,bD as Cr,bE as Pr,bF as Lr,bG as Ti,bH as Mi,bI as Ca,bJ as Qo,bK as gt,bL as zn,bM as Jo,bN as es,bO as Pa,bP as La,bQ as wr,bR as Ni,bS as wa,bT as Da,bU as Ua,bV as Ia,bW as Na,bX as ya,bY as Fa,bZ as Dr,b_ as Oa,b$ as Mn,c0 as ln,c1 as rn,c2 as ts,c3 as ns,c4 as is,c5 as Ur,c6 as rs,c7 as as,c8 as os,c9 as ss,ca as cs,cb as ls,cc as fs,cd as Wn,ce as us,cf as ds,cg as ps,ch as Ai,ci as Ba,cj as hs,ck as xn,cl as Ga,cm as Ut,cn as ms,co as _s,cp as Ri,cq as gs,cr as yi,cs as vs,ct as Ha,cu as Ss,cv as xs,cw as Es,cx as Ts,cy as ni,cz as Ms,cA as An,cB as As,cC as Rs,cD as bs,cE as Cs,cF as Ps,cG as Ls,cH as ii,cI as Fn,cJ as ws,cK as Ds,cL as Us,cM as Is,cN as Va,cO as Ns,cP as Ir,cQ as Nr,cR as yr,cS as ys,cT as Fs,cU as Os,cV as Bs,cW as Gs,cX as Hs}from"./three-core-CJ3jBvFE.js";import{t as Fr,r as Vs}from"./BookReader-DqI80zVd.js";function ka(){let e=null,n=!1,t=null,i=null;function r(a,o){t(a,o),i=e.requestAnimationFrame(r)}return{start:function(){n!==!0&&t!==null&&(i=e.requestAnimationFrame(r),n=!0)},stop:function(){e.cancelAnimationFrame(i),n=!1},setAnimationLoop:function(a){t=a},setContext:function(a){e=a}}}function ks(e){const n=new WeakMap;function t(s,l){const u=s.array,g=s.usage,d=u.byteLength,_=e.createBuffer();e.bindBuffer(l,_),e.bufferData(l,u,g),s.onUploadCallback();let x;if(u instanceof Float32Array)x=e.FLOAT;else if(typeof Float16Array<"u"&&u instanceof Float16Array)x=e.HALF_FLOAT;else if(u instanceof Uint16Array)s.isFloat16BufferAttribute?x=e.HALF_FLOAT:x=e.UNSIGNED_SHORT;else if(u instanceof Int16Array)x=e.SHORT;else if(u instanceof Uint32Array)x=e.UNSIGNED_INT;else if(u instanceof Int32Array)x=e.INT;else if(u instanceof Int8Array)x=e.BYTE;else if(u instanceof Uint8Array)x=e.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)x=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:_,type:x,bytesPerElement:u.BYTES_PER_ELEMENT,version:s.version,size:d}}function i(s,l,u){const g=l.array,d=l.updateRanges;if(e.bindBuffer(u,s),d.length===0)e.bufferSubData(u,0,g);else{d.sort((x,D)=>x.start-D.start);let _=0;for(let x=1;x<d.length;x++){const D=d[_],T=d[x];T.start<=D.start+D.count+1?D.count=Math.max(D.count,T.start+T.count-D.start):(++_,d[_]=T)}d.length=_+1;for(let x=0,D=d.length;x<D;x++){const T=d[x];e.bufferSubData(u,T.start*g.BYTES_PER_ELEMENT,g,T.start,T.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(s){return s.isInterleavedBufferAttribute&&(s=s.data),n.get(s)}function a(s){s.isInterleavedBufferAttribute&&(s=s.data);const l=n.get(s);l&&(e.deleteBuffer(l.buffer),n.delete(s))}function o(s,l){if(s.isInterleavedBufferAttribute&&(s=s.data),s.isGLBufferAttribute){const g=n.get(s);(!g||g.version<s.version)&&n.set(s,{buffer:s.buffer,type:s.type,bytesPerElement:s.elementSize,version:s.version});return}const u=n.get(s);if(u===void 0)n.set(s,t(s,l));else if(u.version<s.version){if(u.size!==s.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(u.buffer,s,l),u.version=s.version}}return{get:r,remove:a,update:o}}var Ws=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,zs=`#ifdef USE_ALPHAHASH
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
#endif`,Xs=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ks=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,qs=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ys=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,$s=`#ifdef USE_AOMAP
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
#endif`,js=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Zs=`#ifdef USE_BATCHING
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
#endif`,Qs=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Js=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ec=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,tc=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,nc=`#ifdef USE_IRIDESCENCE
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
#endif`,ic=`#ifdef USE_BUMPMAP
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
#endif`,rc=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,ac=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,oc=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,sc=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,cc=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,lc=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,fc=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,uc=`#if defined( USE_COLOR_ALPHA )
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
#endif`,dc=`#define PI 3.141592653589793
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
} // validated`,pc=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,hc=`vec3 transformedNormal = objectNormal;
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
#endif`,mc=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,_c=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,gc=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,vc=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Sc="gl_FragColor = linearToOutputTexel( gl_FragColor );",xc=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ec=`#ifdef USE_ENVMAP
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
#endif`,Tc=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Mc=`#ifdef USE_ENVMAP
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
#endif`,Ac=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Rc=`#ifdef USE_ENVMAP
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
#endif`,bc=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Cc=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Pc=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Lc=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,wc=`#ifdef USE_GRADIENTMAP
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
}`,Dc=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Uc=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ic=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Nc=`uniform bool receiveShadow;
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
#endif`,yc=`#ifdef USE_ENVMAP
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
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
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
#endif`,Fc=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Oc=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Bc=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Gc=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Hc=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
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
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
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
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
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
#endif`,Vc=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
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
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
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
		return v;
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
	vec3 f0 = material.specularColorBlended;
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
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
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
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
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
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
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
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( vec3( 1.0 ) - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
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
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,kc=`
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
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
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
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
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
#endif`,Wc=`#if defined( RE_IndirectDiffuse )
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
#endif`,zc=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Xc=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Kc=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,qc=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Yc=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,$c=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,jc=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Zc=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Qc=`#if defined( USE_POINTS_UV )
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
#endif`,Jc=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,el=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,tl=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,nl=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,il=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,rl=`#ifdef USE_MORPHTARGETS
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
#endif`,al=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ol=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,sl=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,cl=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ll=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,fl=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,ul=`#ifdef USE_NORMALMAP
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
#endif`,dl=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,pl=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,hl=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ml=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,_l=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,gl=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,vl=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Sl=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,xl=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,El=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Tl=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ml=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Al=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
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
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
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
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
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
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * 6.28318530718;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * 6.28318530718;
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 0, 5, phi ).x + bitangent * vogelDiskSample( 0, 5, phi ).y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 1, 5, phi ).x + bitangent * vogelDiskSample( 1, 5, phi ).y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 2, 5, phi ).x + bitangent * vogelDiskSample( 2, 5, phi ).y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 3, 5, phi ).x + bitangent * vogelDiskSample( 3, 5, phi ).y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 4, 5, phi ).x + bitangent * vogelDiskSample( 4, 5, phi ).y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadow = step( depth, dp );
			#else
				shadow = step( dp, depth );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Rl=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,bl=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Cl=`float getShadowMask() {
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
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
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
}`,Pl=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ll=`#ifdef USE_SKINNING
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
#endif`,wl=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Dl=`#ifdef USE_SKINNING
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
#endif`,Ul=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Il=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Nl=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,yl=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Fl=`#ifdef USE_TRANSMISSION
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
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Ol=`#ifdef USE_TRANSMISSION
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
#endif`,Bl=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Gl=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Hl=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Vl=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const kl=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Wl=`uniform sampler2D t2D;
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
}`,zl=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Xl=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Kl=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ql=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Yl=`#include <common>
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
}`,$l=`#if DEPTH_PACKING == 3200
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
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,jl=`#define DISTANCE
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
}`,Zl=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
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
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Ql=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Jl=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ef=`uniform float scale;
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
}`,tf=`uniform vec3 diffuse;
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
}`,nf=`#include <common>
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
}`,rf=`uniform vec3 diffuse;
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
}`,af=`#define LAMBERT
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
}`,of=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
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
}`,sf=`#define MATCAP
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
}`,cf=`#define MATCAP
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
}`,lf=`#define NORMAL
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
}`,ff=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
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
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,uf=`#define PHONG
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
}`,df=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
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
}`,pf=`#define STANDARD
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
}`,hf=`#define STANDARD
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
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
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
}`,mf=`#define TOON
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
}`,_f=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
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
}`,gf=`uniform float size;
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
}`,vf=`uniform vec3 diffuse;
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
}`,Sf=`#include <common>
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
}`,xf=`uniform vec3 color;
uniform float opacity;
#include <common>
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
}`,Ef=`uniform float rotation;
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
}`,Tf=`uniform vec3 diffuse;
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
}`,Ue={alphahash_fragment:Ws,alphahash_pars_fragment:zs,alphamap_fragment:Xs,alphamap_pars_fragment:Ks,alphatest_fragment:qs,alphatest_pars_fragment:Ys,aomap_fragment:$s,aomap_pars_fragment:js,batching_pars_vertex:Zs,batching_vertex:Qs,begin_vertex:Js,beginnormal_vertex:ec,bsdfs:tc,iridescence_fragment:nc,bumpmap_pars_fragment:ic,clipping_planes_fragment:rc,clipping_planes_pars_fragment:ac,clipping_planes_pars_vertex:oc,clipping_planes_vertex:sc,color_fragment:cc,color_pars_fragment:lc,color_pars_vertex:fc,color_vertex:uc,common:dc,cube_uv_reflection_fragment:pc,defaultnormal_vertex:hc,displacementmap_pars_vertex:mc,displacementmap_vertex:_c,emissivemap_fragment:gc,emissivemap_pars_fragment:vc,colorspace_fragment:Sc,colorspace_pars_fragment:xc,envmap_fragment:Ec,envmap_common_pars_fragment:Tc,envmap_pars_fragment:Mc,envmap_pars_vertex:Ac,envmap_physical_pars_fragment:yc,envmap_vertex:Rc,fog_vertex:bc,fog_pars_vertex:Cc,fog_fragment:Pc,fog_pars_fragment:Lc,gradientmap_pars_fragment:wc,lightmap_pars_fragment:Dc,lights_lambert_fragment:Uc,lights_lambert_pars_fragment:Ic,lights_pars_begin:Nc,lights_toon_fragment:Fc,lights_toon_pars_fragment:Oc,lights_phong_fragment:Bc,lights_phong_pars_fragment:Gc,lights_physical_fragment:Hc,lights_physical_pars_fragment:Vc,lights_fragment_begin:kc,lights_fragment_maps:Wc,lights_fragment_end:zc,logdepthbuf_fragment:Xc,logdepthbuf_pars_fragment:Kc,logdepthbuf_pars_vertex:qc,logdepthbuf_vertex:Yc,map_fragment:$c,map_pars_fragment:jc,map_particle_fragment:Zc,map_particle_pars_fragment:Qc,metalnessmap_fragment:Jc,metalnessmap_pars_fragment:el,morphinstance_vertex:tl,morphcolor_vertex:nl,morphnormal_vertex:il,morphtarget_pars_vertex:rl,morphtarget_vertex:al,normal_fragment_begin:ol,normal_fragment_maps:sl,normal_pars_fragment:cl,normal_pars_vertex:ll,normal_vertex:fl,normalmap_pars_fragment:ul,clearcoat_normal_fragment_begin:dl,clearcoat_normal_fragment_maps:pl,clearcoat_pars_fragment:hl,iridescence_pars_fragment:ml,opaque_fragment:_l,packing:gl,premultiplied_alpha_fragment:vl,project_vertex:Sl,dithering_fragment:xl,dithering_pars_fragment:El,roughnessmap_fragment:Tl,roughnessmap_pars_fragment:Ml,shadowmap_pars_fragment:Al,shadowmap_pars_vertex:Rl,shadowmap_vertex:bl,shadowmask_pars_fragment:Cl,skinbase_vertex:Pl,skinning_pars_vertex:Ll,skinning_vertex:wl,skinnormal_vertex:Dl,specularmap_fragment:Ul,specularmap_pars_fragment:Il,tonemapping_fragment:Nl,tonemapping_pars_fragment:yl,transmission_fragment:Fl,transmission_pars_fragment:Ol,uv_pars_fragment:Bl,uv_pars_vertex:Gl,uv_vertex:Hl,worldpos_vertex:Vl,background_vert:kl,background_frag:Wl,backgroundCube_vert:zl,backgroundCube_frag:Xl,cube_vert:Kl,cube_frag:ql,depth_vert:Yl,depth_frag:$l,distance_vert:jl,distance_frag:Zl,equirect_vert:Ql,equirect_frag:Jl,linedashed_vert:ef,linedashed_frag:tf,meshbasic_vert:nf,meshbasic_frag:rf,meshlambert_vert:af,meshlambert_frag:of,meshmatcap_vert:sf,meshmatcap_frag:cf,meshnormal_vert:lf,meshnormal_frag:ff,meshphong_vert:uf,meshphong_frag:df,meshphysical_vert:pf,meshphysical_frag:hf,meshtoon_vert:mf,meshtoon_frag:_f,points_vert:gf,points_frag:vf,shadow_vert:Sf,shadow_frag:xf,sprite_vert:Ef,sprite_frag:Tf},oe={common:{diffuse:{value:new Ke(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ze}},envmap:{envMap:{value:null},envMapRotation:{value:new ze},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ze},normalScale:{value:new ft(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ke(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ke(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0},uvTransform:{value:new ze}},sprite:{diffuse:{value:new Ke(16777215)},opacity:{value:1},center:{value:new ft(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}}},Pt={basic:{uniforms:gt([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.fog]),vertexShader:Ue.meshbasic_vert,fragmentShader:Ue.meshbasic_frag},lambert:{uniforms:gt([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,oe.lights,{emissive:{value:new Ke(0)}}]),vertexShader:Ue.meshlambert_vert,fragmentShader:Ue.meshlambert_frag},phong:{uniforms:gt([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,oe.lights,{emissive:{value:new Ke(0)},specular:{value:new Ke(1118481)},shininess:{value:30}}]),vertexShader:Ue.meshphong_vert,fragmentShader:Ue.meshphong_frag},standard:{uniforms:gt([oe.common,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.roughnessmap,oe.metalnessmap,oe.fog,oe.lights,{emissive:{value:new Ke(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ue.meshphysical_vert,fragmentShader:Ue.meshphysical_frag},toon:{uniforms:gt([oe.common,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.gradientmap,oe.fog,oe.lights,{emissive:{value:new Ke(0)}}]),vertexShader:Ue.meshtoon_vert,fragmentShader:Ue.meshtoon_frag},matcap:{uniforms:gt([oe.common,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,{matcap:{value:null}}]),vertexShader:Ue.meshmatcap_vert,fragmentShader:Ue.meshmatcap_frag},points:{uniforms:gt([oe.points,oe.fog]),vertexShader:Ue.points_vert,fragmentShader:Ue.points_frag},dashed:{uniforms:gt([oe.common,oe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ue.linedashed_vert,fragmentShader:Ue.linedashed_frag},depth:{uniforms:gt([oe.common,oe.displacementmap]),vertexShader:Ue.depth_vert,fragmentShader:Ue.depth_frag},normal:{uniforms:gt([oe.common,oe.bumpmap,oe.normalmap,oe.displacementmap,{opacity:{value:1}}]),vertexShader:Ue.meshnormal_vert,fragmentShader:Ue.meshnormal_frag},sprite:{uniforms:gt([oe.sprite,oe.fog]),vertexShader:Ue.sprite_vert,fragmentShader:Ue.sprite_frag},background:{uniforms:{uvTransform:{value:new ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ue.background_vert,fragmentShader:Ue.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ze}},vertexShader:Ue.backgroundCube_vert,fragmentShader:Ue.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ue.cube_vert,fragmentShader:Ue.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ue.equirect_vert,fragmentShader:Ue.equirect_frag},distance:{uniforms:gt([oe.common,oe.displacementmap,{referencePosition:{value:new De},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ue.distance_vert,fragmentShader:Ue.distance_frag},shadow:{uniforms:gt([oe.lights,oe.fog,{color:{value:new Ke(0)},opacity:{value:1}}]),vertexShader:Ue.shadow_vert,fragmentShader:Ue.shadow_frag}};Pt.physical={uniforms:gt([Pt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ze},clearcoatNormalScale:{value:new ft(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ze},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ze},sheen:{value:0},sheenColor:{value:new Ke(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ze},transmissionSamplerSize:{value:new ft},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ze},attenuationDistance:{value:0},attenuationColor:{value:new Ke(0)},specularColor:{value:new Ke(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ze},anisotropyVector:{value:new ft},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ze}}]),vertexShader:Ue.meshphysical_vert,fragmentShader:Ue.meshphysical_frag};const Pn={r:0,b:0,g:0},Kt=new Ni,Mf=new At;function Af(e,n,t,i,r,a,o){const s=new Ke(0);let l=a===!0?0:1,u,g,d=null,_=0,x=null;function D(M){let A=M.isScene===!0?M.background:null;return A&&A.isTexture&&(A=(M.backgroundBlurriness>0?t:n).get(A)),A}function T(M){let A=!1;const b=D(M);b===null?f(s,l):b&&b.isColor&&(f(b,1),A=!0);const P=e.xr.getEnvironmentBlendMode();P==="additive"?i.buffers.color.setClear(0,0,0,1,o):P==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(e.autoClear||A)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function p(M,A){const b=D(A);b&&(b.isCubeTexture||b.mapping===zn)?(g===void 0&&(g=new pt(new La(1,1,1),new Ot({name:"BackgroundCubeMaterial",uniforms:wr(Pt.backgroundCube.uniforms),vertexShader:Pt.backgroundCube.vertexShader,fragmentShader:Pt.backgroundCube.fragmentShader,side:Mt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),g.geometry.deleteAttribute("normal"),g.geometry.deleteAttribute("uv"),g.onBeforeRender=function(P,N,X){this.matrixWorld.copyPosition(X.matrixWorld)},Object.defineProperty(g.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(g)),Kt.copy(A.backgroundRotation),Kt.x*=-1,Kt.y*=-1,Kt.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Kt.y*=-1,Kt.z*=-1),g.material.uniforms.envMap.value=b,g.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,g.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,g.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,g.material.uniforms.backgroundRotation.value.setFromMatrix4(Mf.makeRotationFromEuler(Kt)),g.material.toneMapped=at.getTransfer(b.colorSpace)!==tt,(d!==b||_!==b.version||x!==e.toneMapping)&&(g.material.needsUpdate=!0,d=b,_=b.version,x=e.toneMapping),g.layers.enableAll(),M.unshift(g,g.geometry,g.material,0,0,null)):b&&b.isTexture&&(u===void 0&&(u=new pt(new Ii(2,2),new Ot({name:"BackgroundMaterial",uniforms:wr(Pt.background.uniforms),vertexShader:Pt.background.vertexShader,fragmentShader:Pt.background.fragmentShader,side:sn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),Object.defineProperty(u.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(u)),u.material.uniforms.t2D.value=b,u.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,u.material.toneMapped=at.getTransfer(b.colorSpace)!==tt,b.matrixAutoUpdate===!0&&b.updateMatrix(),u.material.uniforms.uvTransform.value.copy(b.matrix),(d!==b||_!==b.version||x!==e.toneMapping)&&(u.material.needsUpdate=!0,d=b,_=b.version,x=e.toneMapping),u.layers.enableAll(),M.unshift(u,u.geometry,u.material,0,0,null))}function f(M,A){M.getRGB(Pn,Pa(e)),i.buffers.color.setClear(Pn.r,Pn.g,Pn.b,A,o)}function C(){g!==void 0&&(g.geometry.dispose(),g.material.dispose(),g=void 0),u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0)}return{getClearColor:function(){return s},setClearColor:function(M,A=1){s.set(M),l=A,f(s,l)},getClearAlpha:function(){return l},setClearAlpha:function(M){l=M,f(s,l)},render:T,addToRenderList:p,dispose:C}}function Rf(e,n){const t=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},r=_(null);let a=r,o=!1;function s(S,U,V,G,W){let K=!1;const B=d(G,V,U);a!==B&&(a=B,u(a.object)),K=x(S,G,V,W),K&&D(S,G,V,W),W!==null&&n.update(W,e.ELEMENT_ARRAY_BUFFER),(K||o)&&(o=!1,A(S,U,V,G),W!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,n.get(W).buffer))}function l(){return e.createVertexArray()}function u(S){return e.bindVertexArray(S)}function g(S){return e.deleteVertexArray(S)}function d(S,U,V){const G=V.wireframe===!0;let W=i[S.id];W===void 0&&(W={},i[S.id]=W);let K=W[U.id];K===void 0&&(K={},W[U.id]=K);let B=K[G];return B===void 0&&(B=_(l()),K[G]=B),B}function _(S){const U=[],V=[],G=[];for(let W=0;W<t;W++)U[W]=0,V[W]=0,G[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:V,attributeDivisors:G,object:S,attributes:{},index:null}}function x(S,U,V,G){const W=a.attributes,K=U.attributes;let B=0;const H=V.getAttributes();for(const j in H)if(H[j].location>=0){const me=W[j];let xe=K[j];if(xe===void 0&&(j==="instanceMatrix"&&S.instanceMatrix&&(xe=S.instanceMatrix),j==="instanceColor"&&S.instanceColor&&(xe=S.instanceColor)),me===void 0||me.attribute!==xe||xe&&me.data!==xe.data)return!0;B++}return a.attributesNum!==B||a.index!==G}function D(S,U,V,G){const W={},K=U.attributes;let B=0;const H=V.getAttributes();for(const j in H)if(H[j].location>=0){let me=K[j];me===void 0&&(j==="instanceMatrix"&&S.instanceMatrix&&(me=S.instanceMatrix),j==="instanceColor"&&S.instanceColor&&(me=S.instanceColor));const xe={};xe.attribute=me,me&&me.data&&(xe.data=me.data),W[j]=xe,B++}a.attributes=W,a.attributesNum=B,a.index=G}function T(){const S=a.newAttributes;for(let U=0,V=S.length;U<V;U++)S[U]=0}function p(S){f(S,0)}function f(S,U){const V=a.newAttributes,G=a.enabledAttributes,W=a.attributeDivisors;V[S]=1,G[S]===0&&(e.enableVertexAttribArray(S),G[S]=1),W[S]!==U&&(e.vertexAttribDivisor(S,U),W[S]=U)}function C(){const S=a.newAttributes,U=a.enabledAttributes;for(let V=0,G=U.length;V<G;V++)U[V]!==S[V]&&(e.disableVertexAttribArray(V),U[V]=0)}function M(S,U,V,G,W,K,B){B===!0?e.vertexAttribIPointer(S,U,V,W,K):e.vertexAttribPointer(S,U,V,G,W,K)}function A(S,U,V,G){T();const W=G.attributes,K=V.getAttributes(),B=U.defaultAttributeValues;for(const H in K){const j=K[H];if(j.location>=0){let ge=W[H];if(ge===void 0&&(H==="instanceMatrix"&&S.instanceMatrix&&(ge=S.instanceMatrix),H==="instanceColor"&&S.instanceColor&&(ge=S.instanceColor)),ge!==void 0){const me=ge.normalized,xe=ge.itemSize,Ge=n.get(ge);if(Ge===void 0)continue;const ye=Ge.buffer,rt=Ge.type,nt=Ge.bytesPerElement,z=rt===e.INT||rt===e.UNSIGNED_INT||ge.gpuType===ba;if(ge.isInterleavedBufferAttribute){const $=ge.data,de=$.stride,Pe=ge.offset;if($.isInstancedInterleavedBuffer){for(let Z=0;Z<j.locationSize;Z++)f(j.location+Z,$.meshPerAttribute);S.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let Z=0;Z<j.locationSize;Z++)p(j.location+Z);e.bindBuffer(e.ARRAY_BUFFER,ye);for(let Z=0;Z<j.locationSize;Z++)M(j.location+Z,xe/j.locationSize,rt,me,de*nt,(Pe+xe/j.locationSize*Z)*nt,z)}else{if(ge.isInstancedBufferAttribute){for(let $=0;$<j.locationSize;$++)f(j.location+$,ge.meshPerAttribute);S.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=ge.meshPerAttribute*ge.count)}else for(let $=0;$<j.locationSize;$++)p(j.location+$);e.bindBuffer(e.ARRAY_BUFFER,ye);for(let $=0;$<j.locationSize;$++)M(j.location+$,xe/j.locationSize,rt,me,xe*nt,xe/j.locationSize*$*nt,z)}}else if(B!==void 0){const me=B[H];if(me!==void 0)switch(me.length){case 2:e.vertexAttrib2fv(j.location,me);break;case 3:e.vertexAttrib3fv(j.location,me);break;case 4:e.vertexAttrib4fv(j.location,me);break;default:e.vertexAttrib1fv(j.location,me)}}}}C()}function b(){X();for(const S in i){const U=i[S];for(const V in U){const G=U[V];for(const W in G)g(G[W].object),delete G[W];delete U[V]}delete i[S]}}function P(S){if(i[S.id]===void 0)return;const U=i[S.id];for(const V in U){const G=U[V];for(const W in G)g(G[W].object),delete G[W];delete U[V]}delete i[S.id]}function N(S){for(const U in i){const V=i[U];if(V[S.id]===void 0)continue;const G=V[S.id];for(const W in G)g(G[W].object),delete G[W];delete V[S.id]}}function X(){m(),o=!0,a!==r&&(a=r,u(a.object))}function m(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:s,reset:X,resetDefaultState:m,dispose:b,releaseStatesOfGeometry:P,releaseStatesOfProgram:N,initAttributes:T,enableAttribute:p,disableUnusedAttributes:C}}function bf(e,n,t){let i;function r(u){i=u}function a(u,g){e.drawArrays(i,u,g),t.update(g,i,1)}function o(u,g,d){d!==0&&(e.drawArraysInstanced(i,u,g,d),t.update(g,i,d))}function s(u,g,d){if(d===0)return;n.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,u,0,g,0,d);let x=0;for(let D=0;D<d;D++)x+=g[D];t.update(x,i,1)}function l(u,g,d,_){if(d===0)return;const x=n.get("WEBGL_multi_draw");if(x===null)for(let D=0;D<u.length;D++)o(u[D],g[D],_[D]);else{x.multiDrawArraysInstancedWEBGL(i,u,0,g,0,_,0,d);let D=0;for(let T=0;T<d;T++)D+=g[T]*_[T];t.update(D,i,1)}}this.setMode=r,this.render=a,this.renderInstances=o,this.renderMultiDraw=s,this.renderMultiDrawInstances=l}function Cf(e,n,t,i){let r;function a(){if(r!==void 0)return r;if(n.has("EXT_texture_filter_anisotropic")===!0){const N=n.get("EXT_texture_filter_anisotropic");r=e.getParameter(N.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(N){return!(N!==Nt&&i.convert(N)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function s(N){const X=N===Wt&&(n.has("EXT_color_buffer_half_float")||n.has("EXT_color_buffer_float"));return!(N!==Lt&&i.convert(N)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&N!==Gt&&!X)}function l(N){if(N==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";N="mediump"}return N==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let u=t.precision!==void 0?t.precision:"highp";const g=l(u);g!==u&&(Qe("WebGLRenderer:",u,"not supported, using",g,"instead."),u=g);const d=t.logarithmicDepthBuffer===!0,_=t.reversedDepthBuffer===!0&&n.has("EXT_clip_control"),x=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),D=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),T=e.getParameter(e.MAX_TEXTURE_SIZE),p=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),f=e.getParameter(e.MAX_VERTEX_ATTRIBS),C=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),M=e.getParameter(e.MAX_VARYING_VECTORS),A=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),b=e.getParameter(e.MAX_SAMPLES),P=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:s,precision:u,logarithmicDepthBuffer:d,reversedDepthBuffer:_,maxTextures:x,maxVertexTextures:D,maxTextureSize:T,maxCubemapSize:p,maxAttributes:f,maxVertexUniforms:C,maxVaryings:M,maxFragmentUniforms:A,maxSamples:b,samples:P}}function Pf(e){const n=this;let t=null,i=0,r=!1,a=!1;const o=new Oo,s=new ze,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,_){const x=d.length!==0||_||i!==0||r;return r=_,i=d.length,x},this.beginShadows=function(){a=!0,g(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(d,_){t=g(d,_,0)},this.setState=function(d,_,x){const D=d.clippingPlanes,T=d.clipIntersection,p=d.clipShadows,f=e.get(d);if(!r||D===null||D.length===0||a&&!p)a?g(null):u();else{const C=a?0:i,M=C*4;let A=f.clippingState||null;l.value=A,A=g(D,_,M,x);for(let b=0;b!==M;++b)A[b]=t[b];f.clippingState=A,this.numIntersection=T?this.numPlanes:0,this.numPlanes+=C}};function u(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),n.numPlanes=i,n.numIntersection=0}function g(d,_,x,D){const T=d!==null?d.length:0;let p=null;if(T!==0){if(p=l.value,D!==!0||p===null){const f=x+T*4,C=_.matrixWorldInverse;s.getNormalMatrix(C),(p===null||p.length<f)&&(p=new Float32Array(f));for(let M=0,A=x;M!==T;++M,A+=4)o.copy(d[M]).applyMatrix4(C,s),o.normal.toArray(p,A),p[A+3]=o.constant}l.value=p,l.needsUpdate=!0}return n.numPlanes=T,n.numIntersection=0,p}}function Lf(e){let n=new WeakMap;function t(o,s){return s===Ti?o.mapping=Mn:s===Mi&&(o.mapping=ln),o}function i(o){if(o&&o.isTexture){const s=o.mapping;if(s===Ti||s===Mi)if(n.has(o)){const l=n.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const u=new Sa(l.height);return u.fromEquirectangularTexture(e,o),n.set(o,u),o.addEventListener("dispose",r),t(u.texture,o.mapping)}else return null}}return o}function r(o){const s=o.target;s.removeEventListener("dispose",r);const l=n.get(s);l!==void 0&&(n.delete(s),l.dispose())}function a(){n=new WeakMap}return{get:i,dispose:a}}const Ht=4,Or=[.125,.215,.35,.446,.526,.582],$t=20,wf=256,pn=new wi,Br=new Ke;let ri=null,ai=0,oi=0,si=!1;const Df=new De;class Gr{constructor(n){this._renderer=n,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(n,t=0,i=.1,r=100,a={}){const{size:o=256,position:s=Df}=a;ri=this._renderer.getRenderTarget(),ai=this._renderer.getActiveCubeFace(),oi=this._renderer.getActiveMipmapLevel(),si=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(n,i,r,l,s),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(n,t=null){return this._fromTexture(n,t)}fromCubemap(n,t=null){return this._fromTexture(n,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=kr(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Vr(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(n){this._lodMax=Math.floor(Math.log2(n)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let n=0;n<this._lodMeshes.length;n++)this._lodMeshes[n].geometry.dispose()}_cleanup(n){this._renderer.setRenderTarget(ri,ai,oi),this._renderer.xr.enabled=si,n.scissorTest=!1,en(n,0,0,n.width,n.height)}_fromTexture(n,t){n.mapping===Mn||n.mapping===ln?this._setSize(n.image.length===0?16:n.image[0].width||n.image[0].image.width):this._setSize(n.image.width/4),ri=this._renderer.getRenderTarget(),ai=this._renderer.getActiveCubeFace(),oi=this._renderer.getActiveMipmapLevel(),si=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(n,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const n=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:ht,minFilter:ht,generateMipmaps:!1,type:Wt,format:Nt,colorSpace:xt,depthBuffer:!1},r=Hr(n,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==n||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Hr(n,t,i);const{_lodMax:a}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Uf(a)),this._blurMaterial=Nf(a,n,t),this._ggxMaterial=If(a,n,t)}return r}_compileMaterial(n){const t=new pt(new Rn,n);this._renderer.compile(t,pn)}_sceneToCubeUV(n,t,i,r,a){const l=new an(90,1,t,i),u=[1,-1,1,1,1,1],g=[1,1,1,-1,-1,-1],d=this._renderer,_=d.autoClear,x=d.toneMapping;d.getClearColor(Br),d.toneMapping=Dt,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new pt(new La,new rn({name:"PMREM.Background",side:Mt,depthWrite:!1,depthTest:!1})));const T=this._backgroundBox,p=T.material;let f=!1;const C=n.background;C?C.isColor&&(p.color.copy(C),n.background=null,f=!0):(p.color.copy(Br),f=!0);for(let M=0;M<6;M++){const A=M%3;A===0?(l.up.set(0,u[M],0),l.position.set(a.x,a.y,a.z),l.lookAt(a.x+g[M],a.y,a.z)):A===1?(l.up.set(0,0,u[M]),l.position.set(a.x,a.y,a.z),l.lookAt(a.x,a.y+g[M],a.z)):(l.up.set(0,u[M],0),l.position.set(a.x,a.y,a.z),l.lookAt(a.x,a.y,a.z+g[M]));const b=this._cubeSize;en(r,A*b,M>2?b:0,b,b),d.setRenderTarget(r),f&&d.render(T,l),d.render(n,l)}d.toneMapping=x,d.autoClear=_,n.background=C}_textureToCubeUV(n,t){const i=this._renderer,r=n.mapping===Mn||n.mapping===ln;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=kr()),this._cubemapMaterial.uniforms.flipEnvMap.value=n.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Vr());const a=r?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=a;const s=a.uniforms;s.envMap.value=n;const l=this._cubeSize;en(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,pn)}_applyPMREM(n){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let a=1;a<r;a++)this._applyGGXFilter(n,a-1,a);t.autoClear=i}_applyGGXFilter(n,t,i){const r=this._renderer,a=this._pingPongRenderTarget,o=this._ggxMaterial,s=this._lodMeshes[i];s.material=o;const l=o.uniforms,u=i/(this._lodMeshes.length-1),g=t/(this._lodMeshes.length-1),d=Math.sqrt(u*u-g*g),_=0+u*1.25,x=d*_,{_lodMax:D}=this,T=this._sizeLods[i],p=3*T*(i>D-Ht?i-D+Ht:0),f=4*(this._cubeSize-T);l.envMap.value=n.texture,l.roughness.value=x,l.mipInt.value=D-t,en(a,p,f,3*T,2*T),r.setRenderTarget(a),r.render(s,pn),l.envMap.value=a.texture,l.roughness.value=0,l.mipInt.value=D-i,en(n,p,f,3*T,2*T),r.setRenderTarget(n),r.render(s,pn)}_blur(n,t,i,r,a){const o=this._pingPongRenderTarget;this._halfBlur(n,o,t,i,r,"latitudinal",a),this._halfBlur(o,n,i,i,r,"longitudinal",a)}_halfBlur(n,t,i,r,a,o,s){const l=this._renderer,u=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&it("blur direction must be either latitudinal or longitudinal!");const g=3,d=this._lodMeshes[r];d.material=u;const _=u.uniforms,x=this._sizeLods[i]-1,D=isFinite(a)?Math.PI/(2*x):2*Math.PI/(2*$t-1),T=a/D,p=isFinite(a)?1+Math.floor(g*T):$t;p>$t&&Qe(`sigmaRadians, ${a}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${$t}`);const f=[];let C=0;for(let N=0;N<$t;++N){const X=N/T,m=Math.exp(-X*X/2);f.push(m),N===0?C+=m:N<p&&(C+=2*m)}for(let N=0;N<f.length;N++)f[N]=f[N]/C;_.envMap.value=n.texture,_.samples.value=p,_.weights.value=f,_.latitudinal.value=o==="latitudinal",s&&(_.poleAxis.value=s);const{_lodMax:M}=this;_.dTheta.value=D,_.mipInt.value=M-i;const A=this._sizeLods[r],b=3*A*(r>M-Ht?r-M+Ht:0),P=4*(this._cubeSize-A);en(t,b,P,3*A,2*A),l.setRenderTarget(t),l.render(d,pn)}}function Uf(e){const n=[],t=[],i=[];let r=e;const a=e-Ht+1+Or.length;for(let o=0;o<a;o++){const s=Math.pow(2,r);n.push(s);let l=1/s;o>e-Ht?l=Or[o-e+Ht-1]:o===0&&(l=0),t.push(l);const u=1/(s-2),g=-u,d=1+u,_=[g,g,d,g,d,d,g,g,d,d,g,d],x=6,D=6,T=3,p=2,f=1,C=new Float32Array(T*D*x),M=new Float32Array(p*D*x),A=new Float32Array(f*D*x);for(let P=0;P<x;P++){const N=P%3*2/3-1,X=P>2?0:-1,m=[N,X,0,N+2/3,X,0,N+2/3,X+1,0,N,X,0,N+2/3,X+1,0,N,X+1,0];C.set(m,T*D*P),M.set(_,p*D*P);const S=[P,P,P,P,P,P];A.set(S,f*D*P)}const b=new Rn;b.setAttribute("position",new Vt(C,T)),b.setAttribute("uv",new Vt(M,p)),b.setAttribute("faceIndex",new Vt(A,f)),i.push(new pt(b,null)),r>Ht&&r--}return{lodMeshes:i,sizeLods:n,sigmas:t}}function Hr(e,n,t){const i=new Ft(e,n,t);return i.texture.mapping=zn,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function en(e,n,t,i,r){e.viewport.set(n,t,i,r),e.scissor.set(n,t,i,r)}function If(e,n,t){return new Ot({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:wf,CUBEUV_TEXEL_WIDTH:1/n,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Xn(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 3.2: Transform view direction to hemisphere configuration
				vec3 Vh = normalize(vec3(alpha * V.x, alpha * V.y, V.z));

				// Section 4.1: Orthonormal basis
				float lensq = Vh.x * Vh.x + Vh.y * Vh.y;
				vec3 T1 = lensq > 0.0 ? vec3(-Vh.y, Vh.x, 0.0) / sqrt(lensq) : vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(Vh, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + Vh.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * Vh;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:kt,depthTest:!1,depthWrite:!1})}function Nf(e,n,t){const i=new Float32Array($t),r=new De(0,1,0);return new Ot({name:"SphericalGaussianBlur",defines:{n:$t,CUBEUV_TEXEL_WIDTH:1/n,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Xn(),fragmentShader:`

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
		`,blending:kt,depthTest:!1,depthWrite:!1})}function Vr(){return new Ot({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Xn(),fragmentShader:`

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
		`,blending:kt,depthTest:!1,depthWrite:!1})}function kr(){return new Ot({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Xn(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:kt,depthTest:!1,depthWrite:!1})}function Xn(){return`

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
	`}function yf(e){let n=new WeakMap,t=null;function i(s){if(s&&s.isTexture){const l=s.mapping,u=l===Ti||l===Mi,g=l===Mn||l===ln;if(u||g){let d=n.get(s);const _=d!==void 0?d.texture.pmremVersion:0;if(s.isRenderTargetTexture&&s.pmremVersion!==_)return t===null&&(t=new Gr(e)),d=u?t.fromEquirectangular(s,d):t.fromCubemap(s,d),d.texture.pmremVersion=s.pmremVersion,n.set(s,d),d.texture;if(d!==void 0)return d.texture;{const x=s.image;return u&&x&&x.height>0||g&&x&&r(x)?(t===null&&(t=new Gr(e)),d=u?t.fromEquirectangular(s):t.fromCubemap(s),d.texture.pmremVersion=s.pmremVersion,n.set(s,d),s.addEventListener("dispose",a),d.texture):null}}}return s}function r(s){let l=0;const u=6;for(let g=0;g<u;g++)s[g]!==void 0&&l++;return l===u}function a(s){const l=s.target;l.removeEventListener("dispose",a);const u=n.get(l);u!==void 0&&(n.delete(l),u.dispose())}function o(){n=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function Ff(e){const n={};function t(i){if(n[i]!==void 0)return n[i];const r=e.getExtension(i);return n[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&hi("WebGLRenderer: "+i+" extension not supported."),r}}}function Of(e,n,t,i){const r={},a=new WeakMap;function o(d){const _=d.target;_.index!==null&&n.remove(_.index);for(const D in _.attributes)n.remove(_.attributes[D]);_.removeEventListener("dispose",o),delete r[_.id];const x=a.get(_);x&&(n.remove(x),a.delete(_)),i.releaseStatesOfGeometry(_),_.isInstancedBufferGeometry===!0&&delete _._maxInstanceCount,t.memory.geometries--}function s(d,_){return r[_.id]===!0||(_.addEventListener("dispose",o),r[_.id]=!0,t.memory.geometries++),_}function l(d){const _=d.attributes;for(const x in _)n.update(_[x],e.ARRAY_BUFFER)}function u(d){const _=[],x=d.index,D=d.attributes.position;let T=0;if(x!==null){const C=x.array;T=x.version;for(let M=0,A=C.length;M<A;M+=3){const b=C[M+0],P=C[M+1],N=C[M+2];_.push(b,P,P,N,N,b)}}else if(D!==void 0){const C=D.array;T=D.version;for(let M=0,A=C.length/3-1;M<A;M+=3){const b=M+0,P=M+1,N=M+2;_.push(b,P,P,N,N,b)}}else return;const p=new(is(_)?ts:ns)(_,1);p.version=T;const f=a.get(d);f&&n.remove(f),a.set(d,p)}function g(d){const _=a.get(d);if(_){const x=d.index;x!==null&&_.version<x.version&&u(d)}else u(d);return a.get(d)}return{get:s,update:l,getWireframeAttribute:g}}function Bf(e,n,t){let i;function r(_){i=_}let a,o;function s(_){a=_.type,o=_.bytesPerElement}function l(_,x){e.drawElements(i,x,a,_*o),t.update(x,i,1)}function u(_,x,D){D!==0&&(e.drawElementsInstanced(i,x,a,_*o,D),t.update(x,i,D))}function g(_,x,D){if(D===0)return;n.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,x,0,a,_,0,D);let p=0;for(let f=0;f<D;f++)p+=x[f];t.update(p,i,1)}function d(_,x,D,T){if(D===0)return;const p=n.get("WEBGL_multi_draw");if(p===null)for(let f=0;f<_.length;f++)u(_[f]/o,x[f],T[f]);else{p.multiDrawElementsInstancedWEBGL(i,x,0,a,_,0,T,0,D);let f=0;for(let C=0;C<D;C++)f+=x[C]*T[C];t.update(f,i,1)}}this.setMode=r,this.setIndex=s,this.render=l,this.renderInstances=u,this.renderMultiDraw=g,this.renderMultiDrawInstances=d}function Gf(e){const n={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,o,s){switch(t.calls++,o){case e.TRIANGLES:t.triangles+=s*(a/3);break;case e.LINES:t.lines+=s*(a/2);break;case e.LINE_STRIP:t.lines+=s*(a-1);break;case e.LINE_LOOP:t.lines+=s*a;break;case e.POINTS:t.points+=s*a;break;default:it("WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:n,render:t,programs:null,autoReset:!0,reset:r,update:i}}function Hf(e,n,t){const i=new WeakMap,r=new dt;function a(o,s,l){const u=o.morphTargetInfluences,g=s.morphAttributes.position||s.morphAttributes.normal||s.morphAttributes.color,d=g!==void 0?g.length:0;let _=i.get(s);if(_===void 0||_.count!==d){let m=function(){N.dispose(),i.delete(s),s.removeEventListener("dispose",m)};_!==void 0&&_.texture.dispose();const x=s.morphAttributes.position!==void 0,D=s.morphAttributes.normal!==void 0,T=s.morphAttributes.color!==void 0,p=s.morphAttributes.position||[],f=s.morphAttributes.normal||[],C=s.morphAttributes.color||[];let M=0;x===!0&&(M=1),D===!0&&(M=2),T===!0&&(M=3);let A=s.attributes.position.count*M,b=1;A>n.maxTextureSize&&(b=Math.ceil(A/n.maxTextureSize),A=n.maxTextureSize);const P=new Float32Array(A*b*4*d),N=new Ca(P,A,b,d);N.type=Gt,N.needsUpdate=!0;const X=M*4;for(let S=0;S<d;S++){const U=p[S],V=f[S],G=C[S],W=A*b*4*S;for(let K=0;K<U.count;K++){const B=K*X;x===!0&&(r.fromBufferAttribute(U,K),P[W+B+0]=r.x,P[W+B+1]=r.y,P[W+B+2]=r.z,P[W+B+3]=0),D===!0&&(r.fromBufferAttribute(V,K),P[W+B+4]=r.x,P[W+B+5]=r.y,P[W+B+6]=r.z,P[W+B+7]=0),T===!0&&(r.fromBufferAttribute(G,K),P[W+B+8]=r.x,P[W+B+9]=r.y,P[W+B+10]=r.z,P[W+B+11]=G.itemSize===4?r.w:1)}}_={count:d,texture:N,size:new ft(A,b)},i.set(s,_),s.addEventListener("dispose",m)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(e,"morphTexture",o.morphTexture,t);else{let x=0;for(let T=0;T<u.length;T++)x+=u[T];const D=s.morphTargetsRelative?1:1-x;l.getUniforms().setValue(e,"morphTargetBaseInfluence",D),l.getUniforms().setValue(e,"morphTargetInfluences",u)}l.getUniforms().setValue(e,"morphTargetsTexture",_.texture,t),l.getUniforms().setValue(e,"morphTargetsTextureSize",_.size)}return{update:a}}function Vf(e,n,t,i){let r=new WeakMap;function a(l){const u=i.render.frame,g=l.geometry,d=n.get(l,g);if(r.get(d)!==u&&(n.update(d),r.set(d,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",s)===!1&&l.addEventListener("dispose",s),r.get(l)!==u&&(t.update(l.instanceMatrix,e.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,e.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){const _=l.skeleton;r.get(_)!==u&&(_.update(),r.set(_,u))}return d}function o(){r=new WeakMap}function s(l){const u=l.target;u.removeEventListener("dispose",s),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}const kf={[Fa]:"LINEAR_TONE_MAPPING",[ya]:"REINHARD_TONE_MAPPING",[Na]:"CINEON_TONE_MAPPING",[Ia]:"ACES_FILMIC_TONE_MAPPING",[Ua]:"AGX_TONE_MAPPING",[Da]:"NEUTRAL_TONE_MAPPING",[wa]:"CUSTOM_TONE_MAPPING"};function Wf(e,n,t,i,r){const a=new Ft(n,t,{type:e,depthBuffer:i,stencilBuffer:r}),o=new Ft(n,t,{type:Wt,depthBuffer:!1,stencilBuffer:!1}),s=new Rn;s.setAttribute("position",new qi([-1,3,0,-1,-1,0,3,-1,0],3)),s.setAttribute("uv",new qi([0,2,0,0,2,0],2));const l=new lo({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new pt(s,l),g=new wi(-1,1,1,-1,0,1);let d=null,_=null,x=!1,D,T=null,p=[],f=!1;this.setSize=function(C,M){a.setSize(C,M),o.setSize(C,M);for(let A=0;A<p.length;A++){const b=p[A];b.setSize&&b.setSize(C,M)}},this.setEffects=function(C){p=C,f=p.length>0&&p[0].isRenderPass===!0;const M=a.width,A=a.height;for(let b=0;b<p.length;b++){const P=p[b];P.setSize&&P.setSize(M,A)}},this.begin=function(C,M){if(x||C.toneMapping===Dt&&p.length===0)return!1;if(T=M,M!==null){const A=M.width,b=M.height;(a.width!==A||a.height!==b)&&this.setSize(A,b)}return f===!1&&C.setRenderTarget(a),D=C.toneMapping,C.toneMapping=Dt,!0},this.hasRenderPass=function(){return f},this.end=function(C,M){C.toneMapping=D,x=!0;let A=a,b=o;for(let P=0;P<p.length;P++){const N=p[P];if(N.enabled!==!1&&(N.render(C,b,A,M),N.needsSwap!==!1)){const X=A;A=b,b=X}}if(d!==C.outputColorSpace||_!==C.toneMapping){d=C.outputColorSpace,_=C.toneMapping,l.defines={},at.getTransfer(d)===tt&&(l.defines.SRGB_TRANSFER="");const P=kf[_];P&&(l.defines[P]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=A.texture,C.setRenderTarget(T),C.render(u,g),T=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){a.dispose(),o.dispose(),s.dispose(),l.dispose()}}const Wa=new Wn,bi=new Bn(1,1),za=new Ca,Xa=new os,Ka=new as,Wr=[],zr=[],Xr=new Float32Array(16),Kr=new Float32Array(9),qr=new Float32Array(4);function fn(e,n,t){const i=e[0];if(i<=0||i>0)return e;const r=n*t;let a=Wr[r];if(a===void 0&&(a=new Float32Array(r),Wr[r]=a),n!==0){i.toArray(a,0);for(let o=1,s=0;o!==n;++o)s+=t,e[o].toArray(a,s)}return a}function ct(e,n){if(e.length!==n.length)return!1;for(let t=0,i=e.length;t<i;t++)if(e[t]!==n[t])return!1;return!0}function lt(e,n){for(let t=0,i=n.length;t<i;t++)e[t]=n[t]}function Kn(e,n){let t=zr[n];t===void 0&&(t=new Int32Array(n),zr[n]=t);for(let i=0;i!==n;++i)t[i]=e.allocateTextureUnit();return t}function zf(e,n){const t=this.cache;t[0]!==n&&(e.uniform1f(this.addr,n),t[0]=n)}function Xf(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2f(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(ct(t,n))return;e.uniform2fv(this.addr,n),lt(t,n)}}function Kf(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3f(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else if(n.r!==void 0)(t[0]!==n.r||t[1]!==n.g||t[2]!==n.b)&&(e.uniform3f(this.addr,n.r,n.g,n.b),t[0]=n.r,t[1]=n.g,t[2]=n.b);else{if(ct(t,n))return;e.uniform3fv(this.addr,n),lt(t,n)}}function qf(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4f(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(ct(t,n))return;e.uniform4fv(this.addr,n),lt(t,n)}}function Yf(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(ct(t,n))return;e.uniformMatrix2fv(this.addr,!1,n),lt(t,n)}else{if(ct(t,i))return;qr.set(i),e.uniformMatrix2fv(this.addr,!1,qr),lt(t,i)}}function $f(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(ct(t,n))return;e.uniformMatrix3fv(this.addr,!1,n),lt(t,n)}else{if(ct(t,i))return;Kr.set(i),e.uniformMatrix3fv(this.addr,!1,Kr),lt(t,i)}}function jf(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(ct(t,n))return;e.uniformMatrix4fv(this.addr,!1,n),lt(t,n)}else{if(ct(t,i))return;Xr.set(i),e.uniformMatrix4fv(this.addr,!1,Xr),lt(t,i)}}function Zf(e,n){const t=this.cache;t[0]!==n&&(e.uniform1i(this.addr,n),t[0]=n)}function Qf(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2i(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(ct(t,n))return;e.uniform2iv(this.addr,n),lt(t,n)}}function Jf(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3i(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else{if(ct(t,n))return;e.uniform3iv(this.addr,n),lt(t,n)}}function eu(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4i(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(ct(t,n))return;e.uniform4iv(this.addr,n),lt(t,n)}}function tu(e,n){const t=this.cache;t[0]!==n&&(e.uniform1ui(this.addr,n),t[0]=n)}function nu(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2ui(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(ct(t,n))return;e.uniform2uiv(this.addr,n),lt(t,n)}}function iu(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3ui(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else{if(ct(t,n))return;e.uniform3uiv(this.addr,n),lt(t,n)}}function ru(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4ui(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(ct(t,n))return;e.uniform4uiv(this.addr,n),lt(t,n)}}function au(e,n,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r);let a;this.type===e.SAMPLER_2D_SHADOW?(bi.compareFunction=t.isReversedDepthBuffer()?Di:Ui,a=bi):a=Wa,t.setTexture2D(n||a,r)}function ou(e,n,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(n||Xa,r)}function su(e,n,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(n||Ka,r)}function cu(e,n,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(n||za,r)}function lu(e){switch(e){case 5126:return zf;case 35664:return Xf;case 35665:return Kf;case 35666:return qf;case 35674:return Yf;case 35675:return $f;case 35676:return jf;case 5124:case 35670:return Zf;case 35667:case 35671:return Qf;case 35668:case 35672:return Jf;case 35669:case 35673:return eu;case 5125:return tu;case 36294:return nu;case 36295:return iu;case 36296:return ru;case 35678:case 36198:case 36298:case 36306:case 35682:return au;case 35679:case 36299:case 36307:return ou;case 35680:case 36300:case 36308:case 36293:return su;case 36289:case 36303:case 36311:case 36292:return cu}}function fu(e,n){e.uniform1fv(this.addr,n)}function uu(e,n){const t=fn(n,this.size,2);e.uniform2fv(this.addr,t)}function du(e,n){const t=fn(n,this.size,3);e.uniform3fv(this.addr,t)}function pu(e,n){const t=fn(n,this.size,4);e.uniform4fv(this.addr,t)}function hu(e,n){const t=fn(n,this.size,4);e.uniformMatrix2fv(this.addr,!1,t)}function mu(e,n){const t=fn(n,this.size,9);e.uniformMatrix3fv(this.addr,!1,t)}function _u(e,n){const t=fn(n,this.size,16);e.uniformMatrix4fv(this.addr,!1,t)}function gu(e,n){e.uniform1iv(this.addr,n)}function vu(e,n){e.uniform2iv(this.addr,n)}function Su(e,n){e.uniform3iv(this.addr,n)}function xu(e,n){e.uniform4iv(this.addr,n)}function Eu(e,n){e.uniform1uiv(this.addr,n)}function Tu(e,n){e.uniform2uiv(this.addr,n)}function Mu(e,n){e.uniform3uiv(this.addr,n)}function Au(e,n){e.uniform4uiv(this.addr,n)}function Ru(e,n,t){const i=this.cache,r=n.length,a=Kn(t,r);ct(i,a)||(e.uniform1iv(this.addr,a),lt(i,a));let o;this.type===e.SAMPLER_2D_SHADOW?o=bi:o=Wa;for(let s=0;s!==r;++s)t.setTexture2D(n[s]||o,a[s])}function bu(e,n,t){const i=this.cache,r=n.length,a=Kn(t,r);ct(i,a)||(e.uniform1iv(this.addr,a),lt(i,a));for(let o=0;o!==r;++o)t.setTexture3D(n[o]||Xa,a[o])}function Cu(e,n,t){const i=this.cache,r=n.length,a=Kn(t,r);ct(i,a)||(e.uniform1iv(this.addr,a),lt(i,a));for(let o=0;o!==r;++o)t.setTextureCube(n[o]||Ka,a[o])}function Pu(e,n,t){const i=this.cache,r=n.length,a=Kn(t,r);ct(i,a)||(e.uniform1iv(this.addr,a),lt(i,a));for(let o=0;o!==r;++o)t.setTexture2DArray(n[o]||za,a[o])}function Lu(e){switch(e){case 5126:return fu;case 35664:return uu;case 35665:return du;case 35666:return pu;case 35674:return hu;case 35675:return mu;case 35676:return _u;case 5124:case 35670:return gu;case 35667:case 35671:return vu;case 35668:case 35672:return Su;case 35669:case 35673:return xu;case 5125:return Eu;case 36294:return Tu;case 36295:return Mu;case 36296:return Au;case 35678:case 36198:case 36298:case 36306:case 35682:return Ru;case 35679:case 36299:case 36307:return bu;case 35680:case 36300:case 36308:case 36293:return Cu;case 36289:case 36303:case 36311:case 36292:return Pu}}class wu{constructor(n,t,i){this.id=n,this.addr=i,this.cache=[],this.type=t.type,this.setValue=lu(t.type)}}class Du{constructor(n,t,i){this.id=n,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Lu(t.type)}}class Uu{constructor(n){this.id=n,this.seq=[],this.map={}}setValue(n,t,i){const r=this.seq;for(let a=0,o=r.length;a!==o;++a){const s=r[a];s.setValue(n,t[s.id],i)}}}const ci=/(\w+)(\])?(\[|\.)?/g;function Yr(e,n){e.seq.push(n),e.map[n.id]=n}function Iu(e,n,t){const i=e.name,r=i.length;for(ci.lastIndex=0;;){const a=ci.exec(i),o=ci.lastIndex;let s=a[1];const l=a[2]==="]",u=a[3];if(l&&(s=s|0),u===void 0||u==="["&&o+2===r){Yr(t,u===void 0?new wu(s,e,n):new Du(s,e,n));break}else{let d=t.map[s];d===void 0&&(d=new Uu(s),Yr(t,d)),t=d}}}class On{constructor(n,t){this.seq=[],this.map={};const i=n.getProgramParameter(t,n.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){const s=n.getActiveUniform(t,o),l=n.getUniformLocation(t,s.name);Iu(s,l,this)}const r=[],a=[];for(const o of this.seq)o.type===n.SAMPLER_2D_SHADOW||o.type===n.SAMPLER_CUBE_SHADOW||o.type===n.SAMPLER_2D_ARRAY_SHADOW?r.push(o):a.push(o);r.length>0&&(this.seq=r.concat(a))}setValue(n,t,i,r){const a=this.map[t];a!==void 0&&a.setValue(n,i,r)}setOptional(n,t,i){const r=t[i];r!==void 0&&this.setValue(n,i,r)}static upload(n,t,i,r){for(let a=0,o=t.length;a!==o;++a){const s=t[a],l=i[s.id];l.needsUpdate!==!1&&s.setValue(n,l.value,r)}}static seqWithValue(n,t){const i=[];for(let r=0,a=n.length;r!==a;++r){const o=n[r];o.id in t&&i.push(o)}return i}}function $r(e,n,t){const i=e.createShader(n);return e.shaderSource(i,t),e.compileShader(i),i}const Nu=37297;let yu=0;function Fu(e,n){const t=e.split(`
`),i=[],r=Math.max(n-6,0),a=Math.min(n+6,t.length);for(let o=r;o<a;o++){const s=o+1;i.push(`${s===n?">":" "} ${s}: ${t[o]}`)}return i.join(`
`)}const jr=new ze;function Ou(e){at._getMatrix(jr,at.workingColorSpace,e);const n=`mat3( ${jr.elements.map(t=>t.toFixed(4))} )`;switch(at.getTransfer(e)){case Oa:return[n,"LinearTransferOETF"];case tt:return[n,"sRGBTransferOETF"];default:return Qe("WebGLProgram: Unsupported color space: ",e),[n,"LinearTransferOETF"]}}function Zr(e,n,t){const i=e.getShaderParameter(n,e.COMPILE_STATUS),a=(e.getShaderInfoLog(n)||"").trim();if(i&&a==="")return"";const o=/ERROR: 0:(\d+)/.exec(a);if(o){const s=parseInt(o[1]);return t.toUpperCase()+`

`+a+`

`+Fu(e.getShaderSource(n),s)}else return a}function Bu(e,n){const t=Ou(n);return[`vec4 ${e}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const Gu={[Fa]:"Linear",[ya]:"Reinhard",[Na]:"Cineon",[Ia]:"ACESFilmic",[Ua]:"AgX",[Da]:"Neutral",[wa]:"Custom"};function Hu(e,n){const t=Gu[n];return t===void 0?(Qe("WebGLProgram: Unsupported toneMapping:",n),"vec3 "+e+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+e+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Ln=new De;function Vu(){at.getLuminanceCoefficients(Ln);const e=Ln.x.toFixed(4),n=Ln.y.toFixed(4),t=Ln.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${n}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function ku(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Sn).join(`
`)}function Wu(e){const n=[];for(const t in e){const i=e[t];i!==!1&&n.push("#define "+t+" "+i)}return n.join(`
`)}function zu(e,n){const t={},i=e.getProgramParameter(n,e.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const a=e.getActiveAttrib(n,r),o=a.name;let s=1;a.type===e.FLOAT_MAT2&&(s=2),a.type===e.FLOAT_MAT3&&(s=3),a.type===e.FLOAT_MAT4&&(s=4),t[o]={type:a.type,location:e.getAttribLocation(n,o),locationSize:s}}return t}function Sn(e){return e!==""}function Qr(e,n){const t=n.numSpotLightShadows+n.numSpotLightMaps-n.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,n.numDirLights).replace(/NUM_SPOT_LIGHTS/g,n.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,n.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,n.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,n.numPointLights).replace(/NUM_HEMI_LIGHTS/g,n.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,n.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,n.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,n.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,n.numPointLightShadows)}function Jr(e,n){return e.replace(/NUM_CLIPPING_PLANES/g,n.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,n.numClippingPlanes-n.numClipIntersection)}const Xu=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ci(e){return e.replace(Xu,qu)}const Ku=new Map;function qu(e,n){let t=Ue[n];if(t===void 0){const i=Ku.get(n);if(i!==void 0)t=Ue[i],Qe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',n,i);else throw new Error("Can not resolve #include <"+n+">")}return Ci(t)}const Yu=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ea(e){return e.replace(Yu,$u)}function $u(e,n,t,i){let r="";for(let a=parseInt(n);a<parseInt(t);a++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return r}function ta(e){let n=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision==="highp"?n+=`
#define HIGH_PRECISION`:e.precision==="mediump"?n+=`
#define MEDIUM_PRECISION`:e.precision==="lowp"&&(n+=`
#define LOW_PRECISION`),n}const ju={[Nn]:"SHADOWMAP_TYPE_PCF",[vn]:"SHADOWMAP_TYPE_VSM"};function Zu(e){return ju[e.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Qu={[Mn]:"ENVMAP_TYPE_CUBE",[ln]:"ENVMAP_TYPE_CUBE",[zn]:"ENVMAP_TYPE_CUBE_UV"};function Ju(e){return e.envMap===!1?"ENVMAP_TYPE_CUBE":Qu[e.envMapMode]||"ENVMAP_TYPE_CUBE"}const ed={[ln]:"ENVMAP_MODE_REFRACTION"};function td(e){return e.envMap===!1?"ENVMAP_MODE_REFLECTION":ed[e.envMapMode]||"ENVMAP_MODE_REFLECTION"}const nd={[fs]:"ENVMAP_BLENDING_MULTIPLY",[ls]:"ENVMAP_BLENDING_MIX",[cs]:"ENVMAP_BLENDING_ADD"};function id(e){return e.envMap===!1?"ENVMAP_BLENDING_NONE":nd[e.combine]||"ENVMAP_BLENDING_NONE"}function rd(e){const n=e.envMapCubeUVHeight;if(n===null)return null;const t=Math.log2(n)-2,i=1/n;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function ad(e,n,t,i){const r=e.getContext(),a=t.defines;let o=t.vertexShader,s=t.fragmentShader;const l=Zu(t),u=Ju(t),g=td(t),d=id(t),_=rd(t),x=ku(t),D=Wu(a),T=r.createProgram();let p,f,C=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,D].filter(Sn).join(`
`),p.length>0&&(p+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,D].filter(Sn).join(`
`),f.length>0&&(f+=`
`)):(p=[ta(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,D,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+g:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Sn).join(`
`),f=[ta(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,D,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.envMap?"#define "+g:"",t.envMap?"#define "+d:"",_?"#define CUBEUV_TEXEL_WIDTH "+_.texelWidth:"",_?"#define CUBEUV_TEXEL_HEIGHT "+_.texelHeight:"",_?"#define CUBEUV_MAX_MIP "+_.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Dt?"#define TONE_MAPPING":"",t.toneMapping!==Dt?Ue.tonemapping_pars_fragment:"",t.toneMapping!==Dt?Hu("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ue.colorspace_pars_fragment,Bu("linearToOutputTexel",t.outputColorSpace),Vu(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Sn).join(`
`)),o=Ci(o),o=Qr(o,t),o=Jr(o,t),s=Ci(s),s=Qr(s,t),s=Jr(s,t),o=ea(o),s=ea(s),t.isRawShaderMaterial!==!0&&(C=`#version 300 es
`,p=[x,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,f=["#define varying in",t.glslVersion===Ur?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ur?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const M=C+p+o,A=C+f+s,b=$r(r,r.VERTEX_SHADER,M),P=$r(r,r.FRAGMENT_SHADER,A);r.attachShader(T,b),r.attachShader(T,P),t.index0AttributeName!==void 0?r.bindAttribLocation(T,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(T,0,"position"),r.linkProgram(T);function N(U){if(e.debug.checkShaderErrors){const V=r.getProgramInfoLog(T)||"",G=r.getShaderInfoLog(b)||"",W=r.getShaderInfoLog(P)||"",K=V.trim(),B=G.trim(),H=W.trim();let j=!0,ge=!0;if(r.getProgramParameter(T,r.LINK_STATUS)===!1)if(j=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(r,T,b,P);else{const me=Zr(r,b,"vertex"),xe=Zr(r,P,"fragment");it("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(T,r.VALIDATE_STATUS)+`

Material Name: `+U.name+`
Material Type: `+U.type+`

Program Info Log: `+K+`
`+me+`
`+xe)}else K!==""?Qe("WebGLProgram: Program Info Log:",K):(B===""||H==="")&&(ge=!1);ge&&(U.diagnostics={runnable:j,programLog:K,vertexShader:{log:B,prefix:p},fragmentShader:{log:H,prefix:f}})}r.deleteShader(b),r.deleteShader(P),X=new On(r,T),m=zu(r,T)}let X;this.getUniforms=function(){return X===void 0&&N(this),X};let m;this.getAttributes=function(){return m===void 0&&N(this),m};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=r.getProgramParameter(T,Nu)),S},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(T),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=yu++,this.cacheKey=n,this.usedTimes=1,this.program=T,this.vertexShader=b,this.fragmentShader=P,this}let od=0;class sd{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(n){const t=n.vertexShader,i=n.fragmentShader,r=this._getShaderStage(t),a=this._getShaderStage(i),o=this._getShaderCacheForMaterial(n);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(a)===!1&&(o.add(a),a.usedTimes++),this}remove(n){const t=this.materialCache.get(n);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(n),this}getVertexShaderID(n){return this._getShaderStage(n.vertexShader).id}getFragmentShaderID(n){return this._getShaderStage(n.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(n){const t=this.materialCache;let i=t.get(n);return i===void 0&&(i=new Set,t.set(n,i)),i}_getShaderStage(n){const t=this.shaderCache;let i=t.get(n);return i===void 0&&(i=new cd(n),t.set(n,i)),i}}class cd{constructor(n){this.id=od++,this.code=n,this.usedTimes=0}}function ld(e,n,t,i,r,a,o){const s=new rs,l=new sd,u=new Set,g=[],d=new Map,_=r.logarithmicDepthBuffer;let x=r.precision;const D={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function T(m){return u.add(m),m===0?"uv":`uv${m}`}function p(m,S,U,V,G){const W=V.fog,K=G.geometry,B=m.isMeshStandardMaterial?V.environment:null,H=(m.isMeshStandardMaterial?t:n).get(m.envMap||B),j=H&&H.mapping===zn?H.image.height:null,ge=D[m.type];m.precision!==null&&(x=r.getMaxPrecision(m.precision),x!==m.precision&&Qe("WebGLProgram.getParameters:",m.precision,"not supported, using",x,"instead."));const me=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,xe=me!==void 0?me.length:0;let Ge=0;K.morphAttributes.position!==void 0&&(Ge=1),K.morphAttributes.normal!==void 0&&(Ge=2),K.morphAttributes.color!==void 0&&(Ge=3);let ye,rt,nt,z;if(ge){const Ye=Pt[ge];ye=Ye.vertexShader,rt=Ye.fragmentShader}else ye=m.vertexShader,rt=m.fragmentShader,l.update(m),nt=l.getVertexShaderID(m),z=l.getFragmentShaderID(m);const $=e.getRenderTarget(),de=e.state.buffers.depth.getReversed(),Pe=G.isInstancedMesh===!0,Z=G.isBatchedMesh===!0,Te=!!m.map,Le=!!m.matcap,Ie=!!H,Fe=!!m.aoMap,He=!!m.lightMap,Me=!!m.bumpMap,ke=!!m.normalMap,E=!!m.displacementMap,qe=!!m.emissiveMap,Ve=!!m.metalnessMap,Xe=!!m.roughnessMap,le=m.anisotropy>0,v=m.clearcoat>0,c=m.dispersion>0,L=m.iridescence>0,k=m.sheen>0,Y=m.transmission>0,O=le&&!!m.anisotropyMap,Se=v&&!!m.clearcoatMap,ne=v&&!!m.clearcoatNormalMap,_e=v&&!!m.clearcoatRoughnessMap,Ce=L&&!!m.iridescenceMap,J=L&&!!m.iridescenceThicknessMap,re=k&&!!m.sheenColorMap,he=k&&!!m.sheenRoughnessMap,ve=!!m.specularMap,ie=!!m.specularColorMap,Ne=!!m.specularIntensityMap,R=Y&&!!m.transmissionMap,ce=Y&&!!m.thicknessMap,ee=!!m.gradientMap,fe=!!m.alphaMap,Q=m.alphaTest>0,q=!!m.alphaHash,te=!!m.extensions;let we=Dt;m.toneMapped&&($===null||$.isXRRenderTarget===!0)&&(we=e.toneMapping);const Je={shaderID:ge,shaderType:m.type,shaderName:m.name,vertexShader:ye,fragmentShader:rt,defines:m.defines,customVertexShaderID:nt,customFragmentShaderID:z,isRawShaderMaterial:m.isRawShaderMaterial===!0,glslVersion:m.glslVersion,precision:x,batching:Z,batchingColor:Z&&G._colorsTexture!==null,instancing:Pe,instancingColor:Pe&&G.instanceColor!==null,instancingMorph:Pe&&G.morphTexture!==null,outputColorSpace:$===null?e.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:xt,alphaToCoverage:!!m.alphaToCoverage,map:Te,matcap:Le,envMap:Ie,envMapMode:Ie&&H.mapping,envMapCubeUVHeight:j,aoMap:Fe,lightMap:He,bumpMap:Me,normalMap:ke,displacementMap:E,emissiveMap:qe,normalMapObjectSpace:ke&&m.normalMapType===es,normalMapTangentSpace:ke&&m.normalMapType===Jo,metalnessMap:Ve,roughnessMap:Xe,anisotropy:le,anisotropyMap:O,clearcoat:v,clearcoatMap:Se,clearcoatNormalMap:ne,clearcoatRoughnessMap:_e,dispersion:c,iridescence:L,iridescenceMap:Ce,iridescenceThicknessMap:J,sheen:k,sheenColorMap:re,sheenRoughnessMap:he,specularMap:ve,specularColorMap:ie,specularIntensityMap:Ne,transmission:Y,transmissionMap:R,thicknessMap:ce,gradientMap:ee,opaque:m.transparent===!1&&m.blending===yn&&m.alphaToCoverage===!1,alphaMap:fe,alphaTest:Q,alphaHash:q,combine:m.combine,mapUv:Te&&T(m.map.channel),aoMapUv:Fe&&T(m.aoMap.channel),lightMapUv:He&&T(m.lightMap.channel),bumpMapUv:Me&&T(m.bumpMap.channel),normalMapUv:ke&&T(m.normalMap.channel),displacementMapUv:E&&T(m.displacementMap.channel),emissiveMapUv:qe&&T(m.emissiveMap.channel),metalnessMapUv:Ve&&T(m.metalnessMap.channel),roughnessMapUv:Xe&&T(m.roughnessMap.channel),anisotropyMapUv:O&&T(m.anisotropyMap.channel),clearcoatMapUv:Se&&T(m.clearcoatMap.channel),clearcoatNormalMapUv:ne&&T(m.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:_e&&T(m.clearcoatRoughnessMap.channel),iridescenceMapUv:Ce&&T(m.iridescenceMap.channel),iridescenceThicknessMapUv:J&&T(m.iridescenceThicknessMap.channel),sheenColorMapUv:re&&T(m.sheenColorMap.channel),sheenRoughnessMapUv:he&&T(m.sheenRoughnessMap.channel),specularMapUv:ve&&T(m.specularMap.channel),specularColorMapUv:ie&&T(m.specularColorMap.channel),specularIntensityMapUv:Ne&&T(m.specularIntensityMap.channel),transmissionMapUv:R&&T(m.transmissionMap.channel),thicknessMapUv:ce&&T(m.thicknessMap.channel),alphaMapUv:fe&&T(m.alphaMap.channel),vertexTangents:!!K.attributes.tangent&&(ke||le),vertexColors:m.vertexColors,vertexAlphas:m.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,pointsUvs:G.isPoints===!0&&!!K.attributes.uv&&(Te||fe),fog:!!W,useFog:m.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:m.flatShading===!0&&m.wireframe===!1,sizeAttenuation:m.sizeAttenuation===!0,logarithmicDepthBuffer:_,reversedDepthBuffer:de,skinning:G.isSkinnedMesh===!0,morphTargets:K.morphAttributes.position!==void 0,morphNormals:K.morphAttributes.normal!==void 0,morphColors:K.morphAttributes.color!==void 0,morphTargetsCount:xe,morphTextureStride:Ge,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:m.dithering,shadowMapEnabled:e.shadowMap.enabled&&U.length>0,shadowMapType:e.shadowMap.type,toneMapping:we,decodeVideoTexture:Te&&m.map.isVideoTexture===!0&&at.getTransfer(m.map.colorSpace)===tt,decodeVideoTextureEmissive:qe&&m.emissiveMap.isVideoTexture===!0&&at.getTransfer(m.emissiveMap.colorSpace)===tt,premultipliedAlpha:m.premultipliedAlpha,doubleSided:m.side===wt,flipSided:m.side===Mt,useDepthPacking:m.depthPacking>=0,depthPacking:m.depthPacking||0,index0AttributeName:m.index0AttributeName,extensionClipCullDistance:te&&m.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(te&&m.extensions.multiDraw===!0||Z)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:m.customProgramCacheKey()};return Je.vertexUv1s=u.has(1),Je.vertexUv2s=u.has(2),Je.vertexUv3s=u.has(3),u.clear(),Je}function f(m){const S=[];if(m.shaderID?S.push(m.shaderID):(S.push(m.customVertexShaderID),S.push(m.customFragmentShaderID)),m.defines!==void 0)for(const U in m.defines)S.push(U),S.push(m.defines[U]);return m.isRawShaderMaterial===!1&&(C(S,m),M(S,m),S.push(e.outputColorSpace)),S.push(m.customProgramCacheKey),S.join()}function C(m,S){m.push(S.precision),m.push(S.outputColorSpace),m.push(S.envMapMode),m.push(S.envMapCubeUVHeight),m.push(S.mapUv),m.push(S.alphaMapUv),m.push(S.lightMapUv),m.push(S.aoMapUv),m.push(S.bumpMapUv),m.push(S.normalMapUv),m.push(S.displacementMapUv),m.push(S.emissiveMapUv),m.push(S.metalnessMapUv),m.push(S.roughnessMapUv),m.push(S.anisotropyMapUv),m.push(S.clearcoatMapUv),m.push(S.clearcoatNormalMapUv),m.push(S.clearcoatRoughnessMapUv),m.push(S.iridescenceMapUv),m.push(S.iridescenceThicknessMapUv),m.push(S.sheenColorMapUv),m.push(S.sheenRoughnessMapUv),m.push(S.specularMapUv),m.push(S.specularColorMapUv),m.push(S.specularIntensityMapUv),m.push(S.transmissionMapUv),m.push(S.thicknessMapUv),m.push(S.combine),m.push(S.fogExp2),m.push(S.sizeAttenuation),m.push(S.morphTargetsCount),m.push(S.morphAttributeCount),m.push(S.numDirLights),m.push(S.numPointLights),m.push(S.numSpotLights),m.push(S.numSpotLightMaps),m.push(S.numHemiLights),m.push(S.numRectAreaLights),m.push(S.numDirLightShadows),m.push(S.numPointLightShadows),m.push(S.numSpotLightShadows),m.push(S.numSpotLightShadowsWithMaps),m.push(S.numLightProbes),m.push(S.shadowMapType),m.push(S.toneMapping),m.push(S.numClippingPlanes),m.push(S.numClipIntersection),m.push(S.depthPacking)}function M(m,S){s.disableAll(),S.instancing&&s.enable(0),S.instancingColor&&s.enable(1),S.instancingMorph&&s.enable(2),S.matcap&&s.enable(3),S.envMap&&s.enable(4),S.normalMapObjectSpace&&s.enable(5),S.normalMapTangentSpace&&s.enable(6),S.clearcoat&&s.enable(7),S.iridescence&&s.enable(8),S.alphaTest&&s.enable(9),S.vertexColors&&s.enable(10),S.vertexAlphas&&s.enable(11),S.vertexUv1s&&s.enable(12),S.vertexUv2s&&s.enable(13),S.vertexUv3s&&s.enable(14),S.vertexTangents&&s.enable(15),S.anisotropy&&s.enable(16),S.alphaHash&&s.enable(17),S.batching&&s.enable(18),S.dispersion&&s.enable(19),S.batchingColor&&s.enable(20),S.gradientMap&&s.enable(21),m.push(s.mask),s.disableAll(),S.fog&&s.enable(0),S.useFog&&s.enable(1),S.flatShading&&s.enable(2),S.logarithmicDepthBuffer&&s.enable(3),S.reversedDepthBuffer&&s.enable(4),S.skinning&&s.enable(5),S.morphTargets&&s.enable(6),S.morphNormals&&s.enable(7),S.morphColors&&s.enable(8),S.premultipliedAlpha&&s.enable(9),S.shadowMapEnabled&&s.enable(10),S.doubleSided&&s.enable(11),S.flipSided&&s.enable(12),S.useDepthPacking&&s.enable(13),S.dithering&&s.enable(14),S.transmission&&s.enable(15),S.sheen&&s.enable(16),S.opaque&&s.enable(17),S.pointsUvs&&s.enable(18),S.decodeVideoTexture&&s.enable(19),S.decodeVideoTextureEmissive&&s.enable(20),S.alphaToCoverage&&s.enable(21),m.push(s.mask)}function A(m){const S=D[m.type];let U;if(S){const V=Pt[S];U=Qo.clone(V.uniforms)}else U=m.uniforms;return U}function b(m,S){let U=d.get(S);return U!==void 0?++U.usedTimes:(U=new ad(e,S,m,a),g.push(U),d.set(S,U)),U}function P(m){if(--m.usedTimes===0){const S=g.indexOf(m);g[S]=g[g.length-1],g.pop(),d.delete(m.cacheKey),m.destroy()}}function N(m){l.remove(m)}function X(){l.dispose()}return{getParameters:p,getProgramCacheKey:f,getUniforms:A,acquireProgram:b,releaseProgram:P,releaseShaderCache:N,programs:g,dispose:X}}function fd(){let e=new WeakMap;function n(o){return e.has(o)}function t(o){let s=e.get(o);return s===void 0&&(s={},e.set(o,s)),s}function i(o){e.delete(o)}function r(o,s,l){e.get(o)[s]=l}function a(){e=new WeakMap}return{has:n,get:t,remove:i,update:r,dispose:a}}function ud(e,n){return e.groupOrder!==n.groupOrder?e.groupOrder-n.groupOrder:e.renderOrder!==n.renderOrder?e.renderOrder-n.renderOrder:e.material.id!==n.material.id?e.material.id-n.material.id:e.z!==n.z?e.z-n.z:e.id-n.id}function na(e,n){return e.groupOrder!==n.groupOrder?e.groupOrder-n.groupOrder:e.renderOrder!==n.renderOrder?e.renderOrder-n.renderOrder:e.z!==n.z?n.z-e.z:e.id-n.id}function ia(){const e=[];let n=0;const t=[],i=[],r=[];function a(){n=0,t.length=0,i.length=0,r.length=0}function o(d,_,x,D,T,p){let f=e[n];return f===void 0?(f={id:d.id,object:d,geometry:_,material:x,groupOrder:D,renderOrder:d.renderOrder,z:T,group:p},e[n]=f):(f.id=d.id,f.object=d,f.geometry=_,f.material=x,f.groupOrder=D,f.renderOrder=d.renderOrder,f.z=T,f.group=p),n++,f}function s(d,_,x,D,T,p){const f=o(d,_,x,D,T,p);x.transmission>0?i.push(f):x.transparent===!0?r.push(f):t.push(f)}function l(d,_,x,D,T,p){const f=o(d,_,x,D,T,p);x.transmission>0?i.unshift(f):x.transparent===!0?r.unshift(f):t.unshift(f)}function u(d,_){t.length>1&&t.sort(d||ud),i.length>1&&i.sort(_||na),r.length>1&&r.sort(_||na)}function g(){for(let d=n,_=e.length;d<_;d++){const x=e[d];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:t,transmissive:i,transparent:r,init:a,push:s,unshift:l,finish:g,sort:u}}function dd(){let e=new WeakMap;function n(i,r){const a=e.get(i);let o;return a===void 0?(o=new ia,e.set(i,[o])):r>=a.length?(o=new ia,a.push(o)):o=a[r],o}function t(){e=new WeakMap}return{get:n,dispose:t}}function pd(){const e={};return{get:function(n){if(e[n.id]!==void 0)return e[n.id];let t;switch(n.type){case"DirectionalLight":t={direction:new De,color:new Ke};break;case"SpotLight":t={position:new De,direction:new De,color:new Ke,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new De,color:new Ke,distance:0,decay:0};break;case"HemisphereLight":t={direction:new De,skyColor:new Ke,groundColor:new Ke};break;case"RectAreaLight":t={color:new Ke,position:new De,halfWidth:new De,halfHeight:new De};break}return e[n.id]=t,t}}}function hd(){const e={};return{get:function(n){if(e[n.id]!==void 0)return e[n.id];let t;switch(n.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ft};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ft};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ft,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[n.id]=t,t}}}let md=0;function _d(e,n){return(n.castShadow?2:0)-(e.castShadow?2:0)+(n.map?1:0)-(e.map?1:0)}function gd(e){const n=new pd,t=hd(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)i.probe.push(new De);const r=new De,a=new At,o=new At;function s(u){let g=0,d=0,_=0;for(let m=0;m<9;m++)i.probe[m].set(0,0,0);let x=0,D=0,T=0,p=0,f=0,C=0,M=0,A=0,b=0,P=0,N=0;u.sort(_d);for(let m=0,S=u.length;m<S;m++){const U=u[m],V=U.color,G=U.intensity,W=U.distance;let K=null;if(U.shadow&&U.shadow.map&&(U.shadow.map.texture.format===Tn?K=U.shadow.map.texture:K=U.shadow.map.depthTexture||U.shadow.map.texture),U.isAmbientLight)g+=V.r*G,d+=V.g*G,_+=V.b*G;else if(U.isLightProbe){for(let B=0;B<9;B++)i.probe[B].addScaledVector(U.sh.coefficients[B],G);N++}else if(U.isDirectionalLight){const B=n.get(U);if(B.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){const H=U.shadow,j=t.get(U);j.shadowIntensity=H.intensity,j.shadowBias=H.bias,j.shadowNormalBias=H.normalBias,j.shadowRadius=H.radius,j.shadowMapSize=H.mapSize,i.directionalShadow[x]=j,i.directionalShadowMap[x]=K,i.directionalShadowMatrix[x]=U.shadow.matrix,C++}i.directional[x]=B,x++}else if(U.isSpotLight){const B=n.get(U);B.position.setFromMatrixPosition(U.matrixWorld),B.color.copy(V).multiplyScalar(G),B.distance=W,B.coneCos=Math.cos(U.angle),B.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),B.decay=U.decay,i.spot[T]=B;const H=U.shadow;if(U.map&&(i.spotLightMap[b]=U.map,b++,H.updateMatrices(U),U.castShadow&&P++),i.spotLightMatrix[T]=H.matrix,U.castShadow){const j=t.get(U);j.shadowIntensity=H.intensity,j.shadowBias=H.bias,j.shadowNormalBias=H.normalBias,j.shadowRadius=H.radius,j.shadowMapSize=H.mapSize,i.spotShadow[T]=j,i.spotShadowMap[T]=K,A++}T++}else if(U.isRectAreaLight){const B=n.get(U);B.color.copy(V).multiplyScalar(G),B.halfWidth.set(U.width*.5,0,0),B.halfHeight.set(0,U.height*.5,0),i.rectArea[p]=B,p++}else if(U.isPointLight){const B=n.get(U);if(B.color.copy(U.color).multiplyScalar(U.intensity),B.distance=U.distance,B.decay=U.decay,U.castShadow){const H=U.shadow,j=t.get(U);j.shadowIntensity=H.intensity,j.shadowBias=H.bias,j.shadowNormalBias=H.normalBias,j.shadowRadius=H.radius,j.shadowMapSize=H.mapSize,j.shadowCameraNear=H.camera.near,j.shadowCameraFar=H.camera.far,i.pointShadow[D]=j,i.pointShadowMap[D]=K,i.pointShadowMatrix[D]=U.shadow.matrix,M++}i.point[D]=B,D++}else if(U.isHemisphereLight){const B=n.get(U);B.skyColor.copy(U.color).multiplyScalar(G),B.groundColor.copy(U.groundColor).multiplyScalar(G),i.hemi[f]=B,f++}}p>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=oe.LTC_FLOAT_1,i.rectAreaLTC2=oe.LTC_FLOAT_2):(i.rectAreaLTC1=oe.LTC_HALF_1,i.rectAreaLTC2=oe.LTC_HALF_2)),i.ambient[0]=g,i.ambient[1]=d,i.ambient[2]=_;const X=i.hash;(X.directionalLength!==x||X.pointLength!==D||X.spotLength!==T||X.rectAreaLength!==p||X.hemiLength!==f||X.numDirectionalShadows!==C||X.numPointShadows!==M||X.numSpotShadows!==A||X.numSpotMaps!==b||X.numLightProbes!==N)&&(i.directional.length=x,i.spot.length=T,i.rectArea.length=p,i.point.length=D,i.hemi.length=f,i.directionalShadow.length=C,i.directionalShadowMap.length=C,i.pointShadow.length=M,i.pointShadowMap.length=M,i.spotShadow.length=A,i.spotShadowMap.length=A,i.directionalShadowMatrix.length=C,i.pointShadowMatrix.length=M,i.spotLightMatrix.length=A+b-P,i.spotLightMap.length=b,i.numSpotLightShadowsWithMaps=P,i.numLightProbes=N,X.directionalLength=x,X.pointLength=D,X.spotLength=T,X.rectAreaLength=p,X.hemiLength=f,X.numDirectionalShadows=C,X.numPointShadows=M,X.numSpotShadows=A,X.numSpotMaps=b,X.numLightProbes=N,i.version=md++)}function l(u,g){let d=0,_=0,x=0,D=0,T=0;const p=g.matrixWorldInverse;for(let f=0,C=u.length;f<C;f++){const M=u[f];if(M.isDirectionalLight){const A=i.directional[d];A.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),A.direction.sub(r),A.direction.transformDirection(p),d++}else if(M.isSpotLight){const A=i.spot[x];A.position.setFromMatrixPosition(M.matrixWorld),A.position.applyMatrix4(p),A.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),A.direction.sub(r),A.direction.transformDirection(p),x++}else if(M.isRectAreaLight){const A=i.rectArea[D];A.position.setFromMatrixPosition(M.matrixWorld),A.position.applyMatrix4(p),o.identity(),a.copy(M.matrixWorld),a.premultiply(p),o.extractRotation(a),A.halfWidth.set(M.width*.5,0,0),A.halfHeight.set(0,M.height*.5,0),A.halfWidth.applyMatrix4(o),A.halfHeight.applyMatrix4(o),D++}else if(M.isPointLight){const A=i.point[_];A.position.setFromMatrixPosition(M.matrixWorld),A.position.applyMatrix4(p),_++}else if(M.isHemisphereLight){const A=i.hemi[T];A.direction.setFromMatrixPosition(M.matrixWorld),A.direction.transformDirection(p),T++}}}return{setup:s,setupView:l,state:i}}function ra(e){const n=new gd(e),t=[],i=[];function r(g){u.camera=g,t.length=0,i.length=0}function a(g){t.push(g)}function o(g){i.push(g)}function s(){n.setup(t)}function l(g){n.setupView(t,g)}const u={lightsArray:t,shadowsArray:i,camera:null,lights:n,transmissionRenderTarget:{}};return{init:r,state:u,setupLights:s,setupLightsView:l,pushLight:a,pushShadow:o}}function vd(e){let n=new WeakMap;function t(r,a=0){const o=n.get(r);let s;return o===void 0?(s=new ra(e),n.set(r,[s])):a>=o.length?(s=new ra(e),o.push(s)):s=o[a],s}function i(){n=new WeakMap}return{get:t,dispose:i}}const Sd=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,xd=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Ed=[new De(1,0,0),new De(-1,0,0),new De(0,1,0),new De(0,-1,0),new De(0,0,1),new De(0,0,-1)],Td=[new De(0,-1,0),new De(0,-1,0),new De(0,0,1),new De(0,0,-1),new De(0,-1,0),new De(0,-1,0)],aa=new At,hn=new De,li=new De;function Md(e,n,t){let i=new ma;const r=new ft,a=new ft,o=new dt,s=new Bo,l=new Go,u={},g=t.maxTextureSize,d={[sn]:Mt,[Mt]:sn,[wt]:wt},_=new Ot({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ft},radius:{value:4}},vertexShader:Sd,fragmentShader:xd}),x=_.clone();x.defines.HORIZONTAL_PASS=1;const D=new Rn;D.setAttribute("position",new Vt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const T=new pt(D,_),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Nn;let f=this.type;this.render=function(P,N,X){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||P.length===0)return;P.type===Ho&&(Qe("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),P.type=Nn);const m=e.getRenderTarget(),S=e.getActiveCubeFace(),U=e.getActiveMipmapLevel(),V=e.state;V.setBlending(kt),V.buffers.depth.getReversed()===!0?V.buffers.color.setClear(0,0,0,0):V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);const G=f!==this.type;G&&N.traverse(function(W){W.material&&(Array.isArray(W.material)?W.material.forEach(K=>K.needsUpdate=!0):W.material.needsUpdate=!0)});for(let W=0,K=P.length;W<K;W++){const B=P[W],H=B.shadow;if(H===void 0){Qe("WebGLShadowMap:",B,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;r.copy(H.mapSize);const j=H.getFrameExtents();if(r.multiply(j),a.copy(H.mapSize),(r.x>g||r.y>g)&&(r.x>g&&(a.x=Math.floor(g/j.x),r.x=a.x*j.x,H.mapSize.x=a.x),r.y>g&&(a.y=Math.floor(g/j.y),r.y=a.y*j.y,H.mapSize.y=a.y)),H.map===null||G===!0){if(H.map!==null&&(H.map.depthTexture!==null&&(H.map.depthTexture.dispose(),H.map.depthTexture=null),H.map.dispose()),this.type===vn){if(B.isPointLight){Qe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}H.map=new Ft(r.x,r.y,{format:Tn,type:Wt,minFilter:ht,magFilter:ht,generateMipmaps:!1}),H.map.texture.name=B.name+".shadowMap",H.map.depthTexture=new Bn(r.x,r.y,Gt),H.map.depthTexture.name=B.name+".shadowMapDepth",H.map.depthTexture.format=cn,H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=yt,H.map.depthTexture.magFilter=yt}else{B.isPointLight?(H.map=new Sa(r.x),H.map.depthTexture=new Vo(r.x,Qt)):(H.map=new Ft(r.x,r.y),H.map.depthTexture=new Bn(r.x,r.y,Qt)),H.map.depthTexture.name=B.name+".shadowMap",H.map.depthTexture.format=cn;const me=e.state.buffers.depth.getReversed();this.type===Nn?(H.map.depthTexture.compareFunction=me?Di:Ui,H.map.depthTexture.minFilter=ht,H.map.depthTexture.magFilter=ht):(H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=yt,H.map.depthTexture.magFilter=yt)}H.camera.updateProjectionMatrix()}const ge=H.map.isWebGLCubeRenderTarget?6:1;for(let me=0;me<ge;me++){if(H.map.isWebGLCubeRenderTarget)e.setRenderTarget(H.map,me),e.clear();else{me===0&&(e.setRenderTarget(H.map),e.clear());const xe=H.getViewport(me);o.set(a.x*xe.x,a.y*xe.y,a.x*xe.z,a.y*xe.w),V.viewport(o)}if(B.isPointLight){const xe=H.camera,Ge=H.matrix,ye=B.distance||xe.far;ye!==xe.far&&(xe.far=ye,xe.updateProjectionMatrix()),hn.setFromMatrixPosition(B.matrixWorld),xe.position.copy(hn),li.copy(xe.position),li.add(Ed[me]),xe.up.copy(Td[me]),xe.lookAt(li),xe.updateMatrixWorld(),Ge.makeTranslation(-hn.x,-hn.y,-hn.z),aa.multiplyMatrices(xe.projectionMatrix,xe.matrixWorldInverse),H._frustum.setFromProjectionMatrix(aa,xe.coordinateSystem,xe.reversedDepth)}else H.updateMatrices(B);i=H.getFrustum(),A(N,X,H.camera,B,this.type)}H.isPointLightShadow!==!0&&this.type===vn&&C(H,X),H.needsUpdate=!1}f=this.type,p.needsUpdate=!1,e.setRenderTarget(m,S,U)};function C(P,N){const X=n.update(T);_.defines.VSM_SAMPLES!==P.blurSamples&&(_.defines.VSM_SAMPLES=P.blurSamples,x.defines.VSM_SAMPLES=P.blurSamples,_.needsUpdate=!0,x.needsUpdate=!0),P.mapPass===null&&(P.mapPass=new Ft(r.x,r.y,{format:Tn,type:Wt})),_.uniforms.shadow_pass.value=P.map.depthTexture,_.uniforms.resolution.value=P.mapSize,_.uniforms.radius.value=P.radius,e.setRenderTarget(P.mapPass),e.clear(),e.renderBufferDirect(N,null,X,_,T,null),x.uniforms.shadow_pass.value=P.mapPass.texture,x.uniforms.resolution.value=P.mapSize,x.uniforms.radius.value=P.radius,e.setRenderTarget(P.map),e.clear(),e.renderBufferDirect(N,null,X,x,T,null)}function M(P,N,X,m){let S=null;const U=X.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(U!==void 0)S=U;else if(S=X.isPointLight===!0?l:s,e.localClippingEnabled&&N.clipShadows===!0&&Array.isArray(N.clippingPlanes)&&N.clippingPlanes.length!==0||N.displacementMap&&N.displacementScale!==0||N.alphaMap&&N.alphaTest>0||N.map&&N.alphaTest>0||N.alphaToCoverage===!0){const V=S.uuid,G=N.uuid;let W=u[V];W===void 0&&(W={},u[V]=W);let K=W[G];K===void 0&&(K=S.clone(),W[G]=K,N.addEventListener("dispose",b)),S=K}if(S.visible=N.visible,S.wireframe=N.wireframe,m===vn?S.side=N.shadowSide!==null?N.shadowSide:N.side:S.side=N.shadowSide!==null?N.shadowSide:d[N.side],S.alphaMap=N.alphaMap,S.alphaTest=N.alphaToCoverage===!0?.5:N.alphaTest,S.map=N.map,S.clipShadows=N.clipShadows,S.clippingPlanes=N.clippingPlanes,S.clipIntersection=N.clipIntersection,S.displacementMap=N.displacementMap,S.displacementScale=N.displacementScale,S.displacementBias=N.displacementBias,S.wireframeLinewidth=N.wireframeLinewidth,S.linewidth=N.linewidth,X.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const V=e.properties.get(S);V.light=X}return S}function A(P,N,X,m,S){if(P.visible===!1)return;if(P.layers.test(N.layers)&&(P.isMesh||P.isLine||P.isPoints)&&(P.castShadow||P.receiveShadow&&S===vn)&&(!P.frustumCulled||i.intersectsObject(P))){P.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,P.matrixWorld);const G=n.update(P),W=P.material;if(Array.isArray(W)){const K=G.groups;for(let B=0,H=K.length;B<H;B++){const j=K[B],ge=W[j.materialIndex];if(ge&&ge.visible){const me=M(P,ge,m,S);P.onBeforeShadow(e,P,N,X,G,me,j),e.renderBufferDirect(X,null,G,me,P,j),P.onAfterShadow(e,P,N,X,G,me,j)}}}else if(W.visible){const K=M(P,W,m,S);P.onBeforeShadow(e,P,N,X,G,K,null),e.renderBufferDirect(X,null,G,K,P,null),P.onAfterShadow(e,P,N,X,G,K,null)}}const V=P.children;for(let G=0,W=V.length;G<W;G++)A(V[G],N,X,m,S)}function b(P){P.target.removeEventListener("dispose",b);for(const X in u){const m=u[X],S=P.target.uuid;S in m&&(m[S].dispose(),delete m[S])}}}const Ad={[Ei]:xi,[Si]:_i,[vi]:mi,[Hn]:gi,[xi]:Ei,[_i]:Si,[mi]:vi,[gi]:Hn};function Rd(e,n){function t(){let R=!1;const ce=new dt;let ee=null;const fe=new dt(0,0,0,0);return{setMask:function(Q){ee!==Q&&!R&&(e.colorMask(Q,Q,Q,Q),ee=Q)},setLocked:function(Q){R=Q},setClear:function(Q,q,te,we,Je){Je===!0&&(Q*=we,q*=we,te*=we),ce.set(Q,q,te,we),fe.equals(ce)===!1&&(e.clearColor(Q,q,te,we),fe.copy(ce))},reset:function(){R=!1,ee=null,fe.set(-1,0,0,0)}}}function i(){let R=!1,ce=!1,ee=null,fe=null,Q=null;return{setReversed:function(q){if(ce!==q){const te=n.get("EXT_clip_control");q?te.clipControlEXT(te.LOWER_LEFT_EXT,te.ZERO_TO_ONE_EXT):te.clipControlEXT(te.LOWER_LEFT_EXT,te.NEGATIVE_ONE_TO_ONE_EXT),ce=q;const we=Q;Q=null,this.setClear(we)}},getReversed:function(){return ce},setTest:function(q){q?$(e.DEPTH_TEST):de(e.DEPTH_TEST)},setMask:function(q){ee!==q&&!R&&(e.depthMask(q),ee=q)},setFunc:function(q){if(ce&&(q=Ad[q]),fe!==q){switch(q){case Ei:e.depthFunc(e.NEVER);break;case xi:e.depthFunc(e.ALWAYS);break;case Si:e.depthFunc(e.LESS);break;case Hn:e.depthFunc(e.LEQUAL);break;case vi:e.depthFunc(e.EQUAL);break;case gi:e.depthFunc(e.GEQUAL);break;case _i:e.depthFunc(e.GREATER);break;case mi:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}fe=q}},setLocked:function(q){R=q},setClear:function(q){Q!==q&&(ce&&(q=1-q),e.clearDepth(q),Q=q)},reset:function(){R=!1,ee=null,fe=null,Q=null,ce=!1}}}function r(){let R=!1,ce=null,ee=null,fe=null,Q=null,q=null,te=null,we=null,Je=null;return{setTest:function(Ye){R||(Ye?$(e.STENCIL_TEST):de(e.STENCIL_TEST))},setMask:function(Ye){ce!==Ye&&!R&&(e.stencilMask(Ye),ce=Ye)},setFunc:function(Ye,Rt,It){(ee!==Ye||fe!==Rt||Q!==It)&&(e.stencilFunc(Ye,Rt,It),ee=Ye,fe=Rt,Q=It)},setOp:function(Ye,Rt,It){(q!==Ye||te!==Rt||we!==It)&&(e.stencilOp(Ye,Rt,It),q=Ye,te=Rt,we=It)},setLocked:function(Ye){R=Ye},setClear:function(Ye){Je!==Ye&&(e.clearStencil(Ye),Je=Ye)},reset:function(){R=!1,ce=null,ee=null,fe=null,Q=null,q=null,te=null,we=null,Je=null}}}const a=new t,o=new i,s=new r,l=new WeakMap,u=new WeakMap;let g={},d={},_=new WeakMap,x=[],D=null,T=!1,p=null,f=null,C=null,M=null,A=null,b=null,P=null,N=new Ke(0,0,0),X=0,m=!1,S=null,U=null,V=null,G=null,W=null;const K=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let B=!1,H=0;const j=e.getParameter(e.VERSION);j.indexOf("WebGL")!==-1?(H=parseFloat(/^WebGL (\d)/.exec(j)[1]),B=H>=1):j.indexOf("OpenGL ES")!==-1&&(H=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),B=H>=2);let ge=null,me={};const xe=e.getParameter(e.SCISSOR_BOX),Ge=e.getParameter(e.VIEWPORT),ye=new dt().fromArray(xe),rt=new dt().fromArray(Ge);function nt(R,ce,ee,fe){const Q=new Uint8Array(4),q=e.createTexture();e.bindTexture(R,q),e.texParameteri(R,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(R,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let te=0;te<ee;te++)R===e.TEXTURE_3D||R===e.TEXTURE_2D_ARRAY?e.texImage3D(ce,0,e.RGBA,1,1,fe,0,e.RGBA,e.UNSIGNED_BYTE,Q):e.texImage2D(ce+te,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,Q);return q}const z={};z[e.TEXTURE_2D]=nt(e.TEXTURE_2D,e.TEXTURE_2D,1),z[e.TEXTURE_CUBE_MAP]=nt(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),z[e.TEXTURE_2D_ARRAY]=nt(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),z[e.TEXTURE_3D]=nt(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),$(e.DEPTH_TEST),o.setFunc(Hn),Me(!1),ke(br),$(e.CULL_FACE),Fe(kt);function $(R){g[R]!==!0&&(e.enable(R),g[R]=!0)}function de(R){g[R]!==!1&&(e.disable(R),g[R]=!1)}function Pe(R,ce){return d[R]!==ce?(e.bindFramebuffer(R,ce),d[R]=ce,R===e.DRAW_FRAMEBUFFER&&(d[e.FRAMEBUFFER]=ce),R===e.FRAMEBUFFER&&(d[e.DRAW_FRAMEBUFFER]=ce),!0):!1}function Z(R,ce){let ee=x,fe=!1;if(R){ee=_.get(ce),ee===void 0&&(ee=[],_.set(ce,ee));const Q=R.textures;if(ee.length!==Q.length||ee[0]!==e.COLOR_ATTACHMENT0){for(let q=0,te=Q.length;q<te;q++)ee[q]=e.COLOR_ATTACHMENT0+q;ee.length=Q.length,fe=!0}}else ee[0]!==e.BACK&&(ee[0]=e.BACK,fe=!0);fe&&e.drawBuffers(ee)}function Te(R){return D!==R?(e.useProgram(R),D=R,!0):!1}const Le={[dn]:e.FUNC_ADD,[mo]:e.FUNC_SUBTRACT,[ho]:e.FUNC_REVERSE_SUBTRACT};Le[us]=e.MIN,Le[ds]=e.MAX;const Ie={[wo]:e.ZERO,[Lo]:e.ONE,[Po]:e.SRC_COLOR,[Co]:e.SRC_ALPHA,[bo]:e.SRC_ALPHA_SATURATE,[Ro]:e.DST_COLOR,[Ao]:e.DST_ALPHA,[Mo]:e.ONE_MINUS_SRC_COLOR,[To]:e.ONE_MINUS_SRC_ALPHA,[Eo]:e.ONE_MINUS_DST_COLOR,[xo]:e.ONE_MINUS_DST_ALPHA,[So]:e.CONSTANT_COLOR,[vo]:e.ONE_MINUS_CONSTANT_COLOR,[go]:e.CONSTANT_ALPHA,[_o]:e.ONE_MINUS_CONSTANT_ALPHA};function Fe(R,ce,ee,fe,Q,q,te,we,Je,Ye){if(R===kt){T===!0&&(de(e.BLEND),T=!1);return}if(T===!1&&($(e.BLEND),T=!0),R!==Zo){if(R!==p||Ye!==m){if((f!==dn||A!==dn)&&(e.blendEquation(e.FUNC_ADD),f=dn,A=dn),Ye)switch(R){case yn:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case Lr:e.blendFunc(e.ONE,e.ONE);break;case Pr:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case Cr:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:it("WebGLState: Invalid blending: ",R);break}else switch(R){case yn:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case Lr:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case Pr:it("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Cr:it("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:it("WebGLState: Invalid blending: ",R);break}C=null,M=null,b=null,P=null,N.set(0,0,0),X=0,p=R,m=Ye}return}Q=Q||ce,q=q||ee,te=te||fe,(ce!==f||Q!==A)&&(e.blendEquationSeparate(Le[ce],Le[Q]),f=ce,A=Q),(ee!==C||fe!==M||q!==b||te!==P)&&(e.blendFuncSeparate(Ie[ee],Ie[fe],Ie[q],Ie[te]),C=ee,M=fe,b=q,P=te),(we.equals(N)===!1||Je!==X)&&(e.blendColor(we.r,we.g,we.b,Je),N.copy(we),X=Je),p=R,m=!1}function He(R,ce){R.side===wt?de(e.CULL_FACE):$(e.CULL_FACE);let ee=R.side===Mt;ce&&(ee=!ee),Me(ee),R.blending===yn&&R.transparent===!1?Fe(kt):Fe(R.blending,R.blendEquation,R.blendSrc,R.blendDst,R.blendEquationAlpha,R.blendSrcAlpha,R.blendDstAlpha,R.blendColor,R.blendAlpha,R.premultipliedAlpha),o.setFunc(R.depthFunc),o.setTest(R.depthTest),o.setMask(R.depthWrite),a.setMask(R.colorWrite);const fe=R.stencilWrite;s.setTest(fe),fe&&(s.setMask(R.stencilWriteMask),s.setFunc(R.stencilFunc,R.stencilRef,R.stencilFuncMask),s.setOp(R.stencilFail,R.stencilZFail,R.stencilZPass)),qe(R.polygonOffset,R.polygonOffsetFactor,R.polygonOffsetUnits),R.alphaToCoverage===!0?$(e.SAMPLE_ALPHA_TO_COVERAGE):de(e.SAMPLE_ALPHA_TO_COVERAGE)}function Me(R){S!==R&&(R?e.frontFace(e.CW):e.frontFace(e.CCW),S=R)}function ke(R){R!==$o?($(e.CULL_FACE),R!==U&&(R===br?e.cullFace(e.BACK):R===jo?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):de(e.CULL_FACE),U=R}function E(R){R!==V&&(B&&e.lineWidth(R),V=R)}function qe(R,ce,ee){R?($(e.POLYGON_OFFSET_FILL),(G!==ce||W!==ee)&&(e.polygonOffset(ce,ee),G=ce,W=ee)):de(e.POLYGON_OFFSET_FILL)}function Ve(R){R?$(e.SCISSOR_TEST):de(e.SCISSOR_TEST)}function Xe(R){R===void 0&&(R=e.TEXTURE0+K-1),ge!==R&&(e.activeTexture(R),ge=R)}function le(R,ce,ee){ee===void 0&&(ge===null?ee=e.TEXTURE0+K-1:ee=ge);let fe=me[ee];fe===void 0&&(fe={type:void 0,texture:void 0},me[ee]=fe),(fe.type!==R||fe.texture!==ce)&&(ge!==ee&&(e.activeTexture(ee),ge=ee),e.bindTexture(R,ce||z[R]),fe.type=R,fe.texture=ce)}function v(){const R=me[ge];R!==void 0&&R.type!==void 0&&(e.bindTexture(R.type,null),R.type=void 0,R.texture=void 0)}function c(){try{e.compressedTexImage2D(...arguments)}catch(R){it("WebGLState:",R)}}function L(){try{e.compressedTexImage3D(...arguments)}catch(R){it("WebGLState:",R)}}function k(){try{e.texSubImage2D(...arguments)}catch(R){it("WebGLState:",R)}}function Y(){try{e.texSubImage3D(...arguments)}catch(R){it("WebGLState:",R)}}function O(){try{e.compressedTexSubImage2D(...arguments)}catch(R){it("WebGLState:",R)}}function Se(){try{e.compressedTexSubImage3D(...arguments)}catch(R){it("WebGLState:",R)}}function ne(){try{e.texStorage2D(...arguments)}catch(R){it("WebGLState:",R)}}function _e(){try{e.texStorage3D(...arguments)}catch(R){it("WebGLState:",R)}}function Ce(){try{e.texImage2D(...arguments)}catch(R){it("WebGLState:",R)}}function J(){try{e.texImage3D(...arguments)}catch(R){it("WebGLState:",R)}}function re(R){ye.equals(R)===!1&&(e.scissor(R.x,R.y,R.z,R.w),ye.copy(R))}function he(R){rt.equals(R)===!1&&(e.viewport(R.x,R.y,R.z,R.w),rt.copy(R))}function ve(R,ce){let ee=u.get(ce);ee===void 0&&(ee=new WeakMap,u.set(ce,ee));let fe=ee.get(R);fe===void 0&&(fe=e.getUniformBlockIndex(ce,R.name),ee.set(R,fe))}function ie(R,ce){const fe=u.get(ce).get(R);l.get(ce)!==fe&&(e.uniformBlockBinding(ce,fe,R.__bindingPointIndex),l.set(ce,fe))}function Ne(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),g={},ge=null,me={},d={},_=new WeakMap,x=[],D=null,T=!1,p=null,f=null,C=null,M=null,A=null,b=null,P=null,N=new Ke(0,0,0),X=0,m=!1,S=null,U=null,V=null,G=null,W=null,ye.set(0,0,e.canvas.width,e.canvas.height),rt.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:$,disable:de,bindFramebuffer:Pe,drawBuffers:Z,useProgram:Te,setBlending:Fe,setMaterial:He,setFlipSided:Me,setCullFace:ke,setLineWidth:E,setPolygonOffset:qe,setScissorTest:Ve,activeTexture:Xe,bindTexture:le,unbindTexture:v,compressedTexImage2D:c,compressedTexImage3D:L,texImage2D:Ce,texImage3D:J,updateUBOMapping:ve,uniformBlockBinding:ie,texStorage2D:ne,texStorage3D:_e,texSubImage2D:k,texSubImage3D:Y,compressedTexSubImage2D:O,compressedTexSubImage3D:Se,scissor:re,viewport:he,reset:Ne}}function bd(e,n,t,i,r,a,o){const s=n.has("WEBGL_multisampled_render_to_texture")?n.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new ft,g=new WeakMap;let d;const _=new WeakMap;let x=!1;try{x=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function D(v,c){return x?new OffscreenCanvas(v,c):ss("canvas")}function T(v,c,L){let k=1;const Y=le(v);if((Y.width>L||Y.height>L)&&(k=L/Math.max(Y.width,Y.height)),k<1)if(typeof HTMLImageElement<"u"&&v instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&v instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&v instanceof ImageBitmap||typeof VideoFrame<"u"&&v instanceof VideoFrame){const O=Math.floor(k*Y.width),Se=Math.floor(k*Y.height);d===void 0&&(d=D(O,Se));const ne=c?D(O,Se):d;return ne.width=O,ne.height=Se,ne.getContext("2d").drawImage(v,0,0,O,Se),Qe("WebGLRenderer: Texture has been resized from ("+Y.width+"x"+Y.height+") to ("+O+"x"+Se+")."),ne}else return"data"in v&&Qe("WebGLRenderer: Image in DataTexture is too big ("+Y.width+"x"+Y.height+")."),v;return v}function p(v){return v.generateMipmaps}function f(v){e.generateMipmap(v)}function C(v){return v.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:v.isWebGL3DRenderTarget?e.TEXTURE_3D:v.isWebGLArrayRenderTarget||v.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function M(v,c,L,k,Y=!1){if(v!==null){if(e[v]!==void 0)return e[v];Qe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+v+"'")}let O=c;if(c===e.RED&&(L===e.FLOAT&&(O=e.R32F),L===e.HALF_FLOAT&&(O=e.R16F),L===e.UNSIGNED_BYTE&&(O=e.R8)),c===e.RED_INTEGER&&(L===e.UNSIGNED_BYTE&&(O=e.R8UI),L===e.UNSIGNED_SHORT&&(O=e.R16UI),L===e.UNSIGNED_INT&&(O=e.R32UI),L===e.BYTE&&(O=e.R8I),L===e.SHORT&&(O=e.R16I),L===e.INT&&(O=e.R32I)),c===e.RG&&(L===e.FLOAT&&(O=e.RG32F),L===e.HALF_FLOAT&&(O=e.RG16F),L===e.UNSIGNED_BYTE&&(O=e.RG8)),c===e.RG_INTEGER&&(L===e.UNSIGNED_BYTE&&(O=e.RG8UI),L===e.UNSIGNED_SHORT&&(O=e.RG16UI),L===e.UNSIGNED_INT&&(O=e.RG32UI),L===e.BYTE&&(O=e.RG8I),L===e.SHORT&&(O=e.RG16I),L===e.INT&&(O=e.RG32I)),c===e.RGB_INTEGER&&(L===e.UNSIGNED_BYTE&&(O=e.RGB8UI),L===e.UNSIGNED_SHORT&&(O=e.RGB16UI),L===e.UNSIGNED_INT&&(O=e.RGB32UI),L===e.BYTE&&(O=e.RGB8I),L===e.SHORT&&(O=e.RGB16I),L===e.INT&&(O=e.RGB32I)),c===e.RGBA_INTEGER&&(L===e.UNSIGNED_BYTE&&(O=e.RGBA8UI),L===e.UNSIGNED_SHORT&&(O=e.RGBA16UI),L===e.UNSIGNED_INT&&(O=e.RGBA32UI),L===e.BYTE&&(O=e.RGBA8I),L===e.SHORT&&(O=e.RGBA16I),L===e.INT&&(O=e.RGBA32I)),c===e.RGB&&(L===e.UNSIGNED_INT_5_9_9_9_REV&&(O=e.RGB9_E5),L===e.UNSIGNED_INT_10F_11F_11F_REV&&(O=e.R11F_G11F_B10F)),c===e.RGBA){const Se=Y?Oa:at.getTransfer(k);L===e.FLOAT&&(O=e.RGBA32F),L===e.HALF_FLOAT&&(O=e.RGBA16F),L===e.UNSIGNED_BYTE&&(O=Se===tt?e.SRGB8_ALPHA8:e.RGBA8),L===e.UNSIGNED_SHORT_4_4_4_4&&(O=e.RGBA4),L===e.UNSIGNED_SHORT_5_5_5_1&&(O=e.RGB5_A1)}return(O===e.R16F||O===e.R32F||O===e.RG16F||O===e.RG32F||O===e.RGBA16F||O===e.RGBA32F)&&n.get("EXT_color_buffer_float"),O}function A(v,c){let L;return v?c===null||c===Qt||c===En?L=e.DEPTH24_STENCIL8:c===Gt?L=e.DEPTH32F_STENCIL8:c===kn&&(L=e.DEPTH24_STENCIL8,Qe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):c===null||c===Qt||c===En?L=e.DEPTH_COMPONENT24:c===Gt?L=e.DEPTH_COMPONENT32F:c===kn&&(L=e.DEPTH_COMPONENT16),L}function b(v,c){return p(v)===!0||v.isFramebufferTexture&&v.minFilter!==yt&&v.minFilter!==ht?Math.log2(Math.max(c.width,c.height))+1:v.mipmaps!==void 0&&v.mipmaps.length>0?v.mipmaps.length:v.isCompressedTexture&&Array.isArray(v.image)?c.mipmaps.length:1}function P(v){const c=v.target;c.removeEventListener("dispose",P),X(c),c.isVideoTexture&&g.delete(c)}function N(v){const c=v.target;c.removeEventListener("dispose",N),S(c)}function X(v){const c=i.get(v);if(c.__webglInit===void 0)return;const L=v.source,k=_.get(L);if(k){const Y=k[c.__cacheKey];Y.usedTimes--,Y.usedTimes===0&&m(v),Object.keys(k).length===0&&_.delete(L)}i.remove(v)}function m(v){const c=i.get(v);e.deleteTexture(c.__webglTexture);const L=v.source,k=_.get(L);delete k[c.__cacheKey],o.memory.textures--}function S(v){const c=i.get(v);if(v.depthTexture&&(v.depthTexture.dispose(),i.remove(v.depthTexture)),v.isWebGLCubeRenderTarget)for(let k=0;k<6;k++){if(Array.isArray(c.__webglFramebuffer[k]))for(let Y=0;Y<c.__webglFramebuffer[k].length;Y++)e.deleteFramebuffer(c.__webglFramebuffer[k][Y]);else e.deleteFramebuffer(c.__webglFramebuffer[k]);c.__webglDepthbuffer&&e.deleteRenderbuffer(c.__webglDepthbuffer[k])}else{if(Array.isArray(c.__webglFramebuffer))for(let k=0;k<c.__webglFramebuffer.length;k++)e.deleteFramebuffer(c.__webglFramebuffer[k]);else e.deleteFramebuffer(c.__webglFramebuffer);if(c.__webglDepthbuffer&&e.deleteRenderbuffer(c.__webglDepthbuffer),c.__webglMultisampledFramebuffer&&e.deleteFramebuffer(c.__webglMultisampledFramebuffer),c.__webglColorRenderbuffer)for(let k=0;k<c.__webglColorRenderbuffer.length;k++)c.__webglColorRenderbuffer[k]&&e.deleteRenderbuffer(c.__webglColorRenderbuffer[k]);c.__webglDepthRenderbuffer&&e.deleteRenderbuffer(c.__webglDepthRenderbuffer)}const L=v.textures;for(let k=0,Y=L.length;k<Y;k++){const O=i.get(L[k]);O.__webglTexture&&(e.deleteTexture(O.__webglTexture),o.memory.textures--),i.remove(L[k])}i.remove(v)}let U=0;function V(){U=0}function G(){const v=U;return v>=r.maxTextures&&Qe("WebGLTextures: Trying to use "+v+" texture units while this GPU supports only "+r.maxTextures),U+=1,v}function W(v){const c=[];return c.push(v.wrapS),c.push(v.wrapT),c.push(v.wrapR||0),c.push(v.magFilter),c.push(v.minFilter),c.push(v.anisotropy),c.push(v.internalFormat),c.push(v.format),c.push(v.type),c.push(v.generateMipmaps),c.push(v.premultiplyAlpha),c.push(v.flipY),c.push(v.unpackAlignment),c.push(v.colorSpace),c.join()}function K(v,c){const L=i.get(v);if(v.isVideoTexture&&Ve(v),v.isRenderTargetTexture===!1&&v.isExternalTexture!==!0&&v.version>0&&L.__version!==v.version){const k=v.image;if(k===null)Qe("WebGLRenderer: Texture marked for update but no image data found.");else if(k.complete===!1)Qe("WebGLRenderer: Texture marked for update but image is incomplete");else{z(L,v,c);return}}else v.isExternalTexture&&(L.__webglTexture=v.sourceTexture?v.sourceTexture:null);t.bindTexture(e.TEXTURE_2D,L.__webglTexture,e.TEXTURE0+c)}function B(v,c){const L=i.get(v);if(v.isRenderTargetTexture===!1&&v.version>0&&L.__version!==v.version){z(L,v,c);return}else v.isExternalTexture&&(L.__webglTexture=v.sourceTexture?v.sourceTexture:null);t.bindTexture(e.TEXTURE_2D_ARRAY,L.__webglTexture,e.TEXTURE0+c)}function H(v,c){const L=i.get(v);if(v.isRenderTargetTexture===!1&&v.version>0&&L.__version!==v.version){z(L,v,c);return}t.bindTexture(e.TEXTURE_3D,L.__webglTexture,e.TEXTURE0+c)}function j(v,c){const L=i.get(v);if(v.isCubeDepthTexture!==!0&&v.version>0&&L.__version!==v.version){$(L,v,c);return}t.bindTexture(e.TEXTURE_CUBE_MAP,L.__webglTexture,e.TEXTURE0+c)}const ge={[Vn]:e.REPEAT,[Gn]:e.CLAMP_TO_EDGE,[ga]:e.MIRRORED_REPEAT},me={[yt]:e.NEAREST,[va]:e.NEAREST_MIPMAP_NEAREST,[gn]:e.NEAREST_MIPMAP_LINEAR,[ht]:e.LINEAR,[In]:e.LINEAR_MIPMAP_NEAREST,[jt]:e.LINEAR_MIPMAP_LINEAR},xe={[Fo]:e.NEVER,[yo]:e.ALWAYS,[No]:e.LESS,[Ui]:e.LEQUAL,[Io]:e.EQUAL,[Di]:e.GEQUAL,[Uo]:e.GREATER,[Do]:e.NOTEQUAL};function Ge(v,c){if(c.type===Gt&&n.has("OES_texture_float_linear")===!1&&(c.magFilter===ht||c.magFilter===In||c.magFilter===gn||c.magFilter===jt||c.minFilter===ht||c.minFilter===In||c.minFilter===gn||c.minFilter===jt)&&Qe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(v,e.TEXTURE_WRAP_S,ge[c.wrapS]),e.texParameteri(v,e.TEXTURE_WRAP_T,ge[c.wrapT]),(v===e.TEXTURE_3D||v===e.TEXTURE_2D_ARRAY)&&e.texParameteri(v,e.TEXTURE_WRAP_R,ge[c.wrapR]),e.texParameteri(v,e.TEXTURE_MAG_FILTER,me[c.magFilter]),e.texParameteri(v,e.TEXTURE_MIN_FILTER,me[c.minFilter]),c.compareFunction&&(e.texParameteri(v,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(v,e.TEXTURE_COMPARE_FUNC,xe[c.compareFunction])),n.has("EXT_texture_filter_anisotropic")===!0){if(c.magFilter===yt||c.minFilter!==gn&&c.minFilter!==jt||c.type===Gt&&n.has("OES_texture_float_linear")===!1)return;if(c.anisotropy>1||i.get(c).__currentAnisotropy){const L=n.get("EXT_texture_filter_anisotropic");e.texParameterf(v,L.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(c.anisotropy,r.getMaxAnisotropy())),i.get(c).__currentAnisotropy=c.anisotropy}}}function ye(v,c){let L=!1;v.__webglInit===void 0&&(v.__webglInit=!0,c.addEventListener("dispose",P));const k=c.source;let Y=_.get(k);Y===void 0&&(Y={},_.set(k,Y));const O=W(c);if(O!==v.__cacheKey){Y[O]===void 0&&(Y[O]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,L=!0),Y[O].usedTimes++;const Se=Y[v.__cacheKey];Se!==void 0&&(Y[v.__cacheKey].usedTimes--,Se.usedTimes===0&&m(c)),v.__cacheKey=O,v.__webglTexture=Y[O].texture}return L}function rt(v,c,L){return Math.floor(Math.floor(v/L)/c)}function nt(v,c,L,k){const O=v.updateRanges;if(O.length===0)t.texSubImage2D(e.TEXTURE_2D,0,0,0,c.width,c.height,L,k,c.data);else{O.sort((J,re)=>J.start-re.start);let Se=0;for(let J=1;J<O.length;J++){const re=O[Se],he=O[J],ve=re.start+re.count,ie=rt(he.start,c.width,4),Ne=rt(re.start,c.width,4);he.start<=ve+1&&ie===Ne&&rt(he.start+he.count-1,c.width,4)===ie?re.count=Math.max(re.count,he.start+he.count-re.start):(++Se,O[Se]=he)}O.length=Se+1;const ne=e.getParameter(e.UNPACK_ROW_LENGTH),_e=e.getParameter(e.UNPACK_SKIP_PIXELS),Ce=e.getParameter(e.UNPACK_SKIP_ROWS);e.pixelStorei(e.UNPACK_ROW_LENGTH,c.width);for(let J=0,re=O.length;J<re;J++){const he=O[J],ve=Math.floor(he.start/4),ie=Math.ceil(he.count/4),Ne=ve%c.width,R=Math.floor(ve/c.width),ce=ie,ee=1;e.pixelStorei(e.UNPACK_SKIP_PIXELS,Ne),e.pixelStorei(e.UNPACK_SKIP_ROWS,R),t.texSubImage2D(e.TEXTURE_2D,0,Ne,R,ce,ee,L,k,c.data)}v.clearUpdateRanges(),e.pixelStorei(e.UNPACK_ROW_LENGTH,ne),e.pixelStorei(e.UNPACK_SKIP_PIXELS,_e),e.pixelStorei(e.UNPACK_SKIP_ROWS,Ce)}}function z(v,c,L){let k=e.TEXTURE_2D;(c.isDataArrayTexture||c.isCompressedArrayTexture)&&(k=e.TEXTURE_2D_ARRAY),c.isData3DTexture&&(k=e.TEXTURE_3D);const Y=ye(v,c),O=c.source;t.bindTexture(k,v.__webglTexture,e.TEXTURE0+L);const Se=i.get(O);if(O.version!==Se.__version||Y===!0){t.activeTexture(e.TEXTURE0+L);const ne=at.getPrimaries(at.workingColorSpace),_e=c.colorSpace===tn?null:at.getPrimaries(c.colorSpace),Ce=c.colorSpace===tn||ne===_e?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,c.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,c.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,c.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ce);let J=T(c.image,!1,r.maxTextureSize);J=Xe(c,J);const re=a.convert(c.format,c.colorSpace),he=a.convert(c.type);let ve=M(c.internalFormat,re,he,c.colorSpace,c.isVideoTexture);Ge(k,c);let ie;const Ne=c.mipmaps,R=c.isVideoTexture!==!0,ce=Se.__version===void 0||Y===!0,ee=O.dataReady,fe=b(c,J);if(c.isDepthTexture)ve=A(c.format===nn,c.type),ce&&(R?t.texStorage2D(e.TEXTURE_2D,1,ve,J.width,J.height):t.texImage2D(e.TEXTURE_2D,0,ve,J.width,J.height,0,re,he,null));else if(c.isDataTexture)if(Ne.length>0){R&&ce&&t.texStorage2D(e.TEXTURE_2D,fe,ve,Ne[0].width,Ne[0].height);for(let Q=0,q=Ne.length;Q<q;Q++)ie=Ne[Q],R?ee&&t.texSubImage2D(e.TEXTURE_2D,Q,0,0,ie.width,ie.height,re,he,ie.data):t.texImage2D(e.TEXTURE_2D,Q,ve,ie.width,ie.height,0,re,he,ie.data);c.generateMipmaps=!1}else R?(ce&&t.texStorage2D(e.TEXTURE_2D,fe,ve,J.width,J.height),ee&&nt(c,J,re,he)):t.texImage2D(e.TEXTURE_2D,0,ve,J.width,J.height,0,re,he,J.data);else if(c.isCompressedTexture)if(c.isCompressedArrayTexture){R&&ce&&t.texStorage3D(e.TEXTURE_2D_ARRAY,fe,ve,Ne[0].width,Ne[0].height,J.depth);for(let Q=0,q=Ne.length;Q<q;Q++)if(ie=Ne[Q],c.format!==Nt)if(re!==null)if(R){if(ee)if(c.layerUpdates.size>0){const te=Dr(ie.width,ie.height,c.format,c.type);for(const we of c.layerUpdates){const Je=ie.data.subarray(we*te/ie.data.BYTES_PER_ELEMENT,(we+1)*te/ie.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,Q,0,0,we,ie.width,ie.height,1,re,Je)}c.clearLayerUpdates()}else t.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,Q,0,0,0,ie.width,ie.height,J.depth,re,ie.data)}else t.compressedTexImage3D(e.TEXTURE_2D_ARRAY,Q,ve,ie.width,ie.height,J.depth,0,ie.data,0,0);else Qe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else R?ee&&t.texSubImage3D(e.TEXTURE_2D_ARRAY,Q,0,0,0,ie.width,ie.height,J.depth,re,he,ie.data):t.texImage3D(e.TEXTURE_2D_ARRAY,Q,ve,ie.width,ie.height,J.depth,0,re,he,ie.data)}else{R&&ce&&t.texStorage2D(e.TEXTURE_2D,fe,ve,Ne[0].width,Ne[0].height);for(let Q=0,q=Ne.length;Q<q;Q++)ie=Ne[Q],c.format!==Nt?re!==null?R?ee&&t.compressedTexSubImage2D(e.TEXTURE_2D,Q,0,0,ie.width,ie.height,re,ie.data):t.compressedTexImage2D(e.TEXTURE_2D,Q,ve,ie.width,ie.height,0,ie.data):Qe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):R?ee&&t.texSubImage2D(e.TEXTURE_2D,Q,0,0,ie.width,ie.height,re,he,ie.data):t.texImage2D(e.TEXTURE_2D,Q,ve,ie.width,ie.height,0,re,he,ie.data)}else if(c.isDataArrayTexture)if(R){if(ce&&t.texStorage3D(e.TEXTURE_2D_ARRAY,fe,ve,J.width,J.height,J.depth),ee)if(c.layerUpdates.size>0){const Q=Dr(J.width,J.height,c.format,c.type);for(const q of c.layerUpdates){const te=J.data.subarray(q*Q/J.data.BYTES_PER_ELEMENT,(q+1)*Q/J.data.BYTES_PER_ELEMENT);t.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,q,J.width,J.height,1,re,he,te)}c.clearLayerUpdates()}else t.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,re,he,J.data)}else t.texImage3D(e.TEXTURE_2D_ARRAY,0,ve,J.width,J.height,J.depth,0,re,he,J.data);else if(c.isData3DTexture)R?(ce&&t.texStorage3D(e.TEXTURE_3D,fe,ve,J.width,J.height,J.depth),ee&&t.texSubImage3D(e.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,re,he,J.data)):t.texImage3D(e.TEXTURE_3D,0,ve,J.width,J.height,J.depth,0,re,he,J.data);else if(c.isFramebufferTexture){if(ce)if(R)t.texStorage2D(e.TEXTURE_2D,fe,ve,J.width,J.height);else{let Q=J.width,q=J.height;for(let te=0;te<fe;te++)t.texImage2D(e.TEXTURE_2D,te,ve,Q,q,0,re,he,null),Q>>=1,q>>=1}}else if(Ne.length>0){if(R&&ce){const Q=le(Ne[0]);t.texStorage2D(e.TEXTURE_2D,fe,ve,Q.width,Q.height)}for(let Q=0,q=Ne.length;Q<q;Q++)ie=Ne[Q],R?ee&&t.texSubImage2D(e.TEXTURE_2D,Q,0,0,re,he,ie):t.texImage2D(e.TEXTURE_2D,Q,ve,re,he,ie);c.generateMipmaps=!1}else if(R){if(ce){const Q=le(J);t.texStorage2D(e.TEXTURE_2D,fe,ve,Q.width,Q.height)}ee&&t.texSubImage2D(e.TEXTURE_2D,0,0,0,re,he,J)}else t.texImage2D(e.TEXTURE_2D,0,ve,re,he,J);p(c)&&f(k),Se.__version=O.version,c.onUpdate&&c.onUpdate(c)}v.__version=c.version}function $(v,c,L){if(c.image.length!==6)return;const k=ye(v,c),Y=c.source;t.bindTexture(e.TEXTURE_CUBE_MAP,v.__webglTexture,e.TEXTURE0+L);const O=i.get(Y);if(Y.version!==O.__version||k===!0){t.activeTexture(e.TEXTURE0+L);const Se=at.getPrimaries(at.workingColorSpace),ne=c.colorSpace===tn?null:at.getPrimaries(c.colorSpace),_e=c.colorSpace===tn||Se===ne?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,c.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,c.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,c.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,_e);const Ce=c.isCompressedTexture||c.image[0].isCompressedTexture,J=c.image[0]&&c.image[0].isDataTexture,re=[];for(let q=0;q<6;q++)!Ce&&!J?re[q]=T(c.image[q],!0,r.maxCubemapSize):re[q]=J?c.image[q].image:c.image[q],re[q]=Xe(c,re[q]);const he=re[0],ve=a.convert(c.format,c.colorSpace),ie=a.convert(c.type),Ne=M(c.internalFormat,ve,ie,c.colorSpace),R=c.isVideoTexture!==!0,ce=O.__version===void 0||k===!0,ee=Y.dataReady;let fe=b(c,he);Ge(e.TEXTURE_CUBE_MAP,c);let Q;if(Ce){R&&ce&&t.texStorage2D(e.TEXTURE_CUBE_MAP,fe,Ne,he.width,he.height);for(let q=0;q<6;q++){Q=re[q].mipmaps;for(let te=0;te<Q.length;te++){const we=Q[te];c.format!==Nt?ve!==null?R?ee&&t.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+q,te,0,0,we.width,we.height,ve,we.data):t.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+q,te,Ne,we.width,we.height,0,we.data):Qe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):R?ee&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+q,te,0,0,we.width,we.height,ve,ie,we.data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+q,te,Ne,we.width,we.height,0,ve,ie,we.data)}}}else{if(Q=c.mipmaps,R&&ce){Q.length>0&&fe++;const q=le(re[0]);t.texStorage2D(e.TEXTURE_CUBE_MAP,fe,Ne,q.width,q.height)}for(let q=0;q<6;q++)if(J){R?ee&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,re[q].width,re[q].height,ve,ie,re[q].data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,Ne,re[q].width,re[q].height,0,ve,ie,re[q].data);for(let te=0;te<Q.length;te++){const Je=Q[te].image[q].image;R?ee&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+q,te+1,0,0,Je.width,Je.height,ve,ie,Je.data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+q,te+1,Ne,Je.width,Je.height,0,ve,ie,Je.data)}}else{R?ee&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,ve,ie,re[q]):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,Ne,ve,ie,re[q]);for(let te=0;te<Q.length;te++){const we=Q[te];R?ee&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+q,te+1,0,0,ve,ie,we.image[q]):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+q,te+1,Ne,ve,ie,we.image[q])}}}p(c)&&f(e.TEXTURE_CUBE_MAP),O.__version=Y.version,c.onUpdate&&c.onUpdate(c)}v.__version=c.version}function de(v,c,L,k,Y,O){const Se=a.convert(L.format,L.colorSpace),ne=a.convert(L.type),_e=M(L.internalFormat,Se,ne,L.colorSpace),Ce=i.get(c),J=i.get(L);if(J.__renderTarget=c,!Ce.__hasExternalTextures){const re=Math.max(1,c.width>>O),he=Math.max(1,c.height>>O);Y===e.TEXTURE_3D||Y===e.TEXTURE_2D_ARRAY?t.texImage3D(Y,O,_e,re,he,c.depth,0,Se,ne,null):t.texImage2D(Y,O,_e,re,he,0,Se,ne,null)}t.bindFramebuffer(e.FRAMEBUFFER,v),qe(c)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,k,Y,J.__webglTexture,0,E(c)):(Y===e.TEXTURE_2D||Y>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&Y<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,k,Y,J.__webglTexture,O),t.bindFramebuffer(e.FRAMEBUFFER,null)}function Pe(v,c,L){if(e.bindRenderbuffer(e.RENDERBUFFER,v),c.depthBuffer){const k=c.depthTexture,Y=k&&k.isDepthTexture?k.type:null,O=A(c.stencilBuffer,Y),Se=c.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;qe(c)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,E(c),O,c.width,c.height):L?e.renderbufferStorageMultisample(e.RENDERBUFFER,E(c),O,c.width,c.height):e.renderbufferStorage(e.RENDERBUFFER,O,c.width,c.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,Se,e.RENDERBUFFER,v)}else{const k=c.textures;for(let Y=0;Y<k.length;Y++){const O=k[Y],Se=a.convert(O.format,O.colorSpace),ne=a.convert(O.type),_e=M(O.internalFormat,Se,ne,O.colorSpace);qe(c)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,E(c),_e,c.width,c.height):L?e.renderbufferStorageMultisample(e.RENDERBUFFER,E(c),_e,c.width,c.height):e.renderbufferStorage(e.RENDERBUFFER,_e,c.width,c.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Z(v,c,L){const k=c.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(e.FRAMEBUFFER,v),!(c.depthTexture&&c.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Y=i.get(c.depthTexture);if(Y.__renderTarget=c,(!Y.__webglTexture||c.depthTexture.image.width!==c.width||c.depthTexture.image.height!==c.height)&&(c.depthTexture.image.width=c.width,c.depthTexture.image.height=c.height,c.depthTexture.needsUpdate=!0),k){if(Y.__webglInit===void 0&&(Y.__webglInit=!0,c.depthTexture.addEventListener("dispose",P)),Y.__webglTexture===void 0){Y.__webglTexture=e.createTexture(),t.bindTexture(e.TEXTURE_CUBE_MAP,Y.__webglTexture),Ge(e.TEXTURE_CUBE_MAP,c.depthTexture);const Ce=a.convert(c.depthTexture.format),J=a.convert(c.depthTexture.type);let re;c.depthTexture.format===cn?re=e.DEPTH_COMPONENT24:c.depthTexture.format===nn&&(re=e.DEPTH24_STENCIL8);for(let he=0;he<6;he++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,re,c.width,c.height,0,Ce,J,null)}}else K(c.depthTexture,0);const O=Y.__webglTexture,Se=E(c),ne=k?e.TEXTURE_CUBE_MAP_POSITIVE_X+L:e.TEXTURE_2D,_e=c.depthTexture.format===nn?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(c.depthTexture.format===cn)qe(c)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,_e,ne,O,0,Se):e.framebufferTexture2D(e.FRAMEBUFFER,_e,ne,O,0);else if(c.depthTexture.format===nn)qe(c)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,_e,ne,O,0,Se):e.framebufferTexture2D(e.FRAMEBUFFER,_e,ne,O,0);else throw new Error("Unknown depthTexture format")}function Te(v){const c=i.get(v),L=v.isWebGLCubeRenderTarget===!0;if(c.__boundDepthTexture!==v.depthTexture){const k=v.depthTexture;if(c.__depthDisposeCallback&&c.__depthDisposeCallback(),k){const Y=()=>{delete c.__boundDepthTexture,delete c.__depthDisposeCallback,k.removeEventListener("dispose",Y)};k.addEventListener("dispose",Y),c.__depthDisposeCallback=Y}c.__boundDepthTexture=k}if(v.depthTexture&&!c.__autoAllocateDepthBuffer)if(L)for(let k=0;k<6;k++)Z(c.__webglFramebuffer[k],v,k);else{const k=v.texture.mipmaps;k&&k.length>0?Z(c.__webglFramebuffer[0],v,0):Z(c.__webglFramebuffer,v,0)}else if(L){c.__webglDepthbuffer=[];for(let k=0;k<6;k++)if(t.bindFramebuffer(e.FRAMEBUFFER,c.__webglFramebuffer[k]),c.__webglDepthbuffer[k]===void 0)c.__webglDepthbuffer[k]=e.createRenderbuffer(),Pe(c.__webglDepthbuffer[k],v,!1);else{const Y=v.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,O=c.__webglDepthbuffer[k];e.bindRenderbuffer(e.RENDERBUFFER,O),e.framebufferRenderbuffer(e.FRAMEBUFFER,Y,e.RENDERBUFFER,O)}}else{const k=v.texture.mipmaps;if(k&&k.length>0?t.bindFramebuffer(e.FRAMEBUFFER,c.__webglFramebuffer[0]):t.bindFramebuffer(e.FRAMEBUFFER,c.__webglFramebuffer),c.__webglDepthbuffer===void 0)c.__webglDepthbuffer=e.createRenderbuffer(),Pe(c.__webglDepthbuffer,v,!1);else{const Y=v.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,O=c.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,O),e.framebufferRenderbuffer(e.FRAMEBUFFER,Y,e.RENDERBUFFER,O)}}t.bindFramebuffer(e.FRAMEBUFFER,null)}function Le(v,c,L){const k=i.get(v);c!==void 0&&de(k.__webglFramebuffer,v,v.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),L!==void 0&&Te(v)}function Ie(v){const c=v.texture,L=i.get(v),k=i.get(c);v.addEventListener("dispose",N);const Y=v.textures,O=v.isWebGLCubeRenderTarget===!0,Se=Y.length>1;if(Se||(k.__webglTexture===void 0&&(k.__webglTexture=e.createTexture()),k.__version=c.version,o.memory.textures++),O){L.__webglFramebuffer=[];for(let ne=0;ne<6;ne++)if(c.mipmaps&&c.mipmaps.length>0){L.__webglFramebuffer[ne]=[];for(let _e=0;_e<c.mipmaps.length;_e++)L.__webglFramebuffer[ne][_e]=e.createFramebuffer()}else L.__webglFramebuffer[ne]=e.createFramebuffer()}else{if(c.mipmaps&&c.mipmaps.length>0){L.__webglFramebuffer=[];for(let ne=0;ne<c.mipmaps.length;ne++)L.__webglFramebuffer[ne]=e.createFramebuffer()}else L.__webglFramebuffer=e.createFramebuffer();if(Se)for(let ne=0,_e=Y.length;ne<_e;ne++){const Ce=i.get(Y[ne]);Ce.__webglTexture===void 0&&(Ce.__webglTexture=e.createTexture(),o.memory.textures++)}if(v.samples>0&&qe(v)===!1){L.__webglMultisampledFramebuffer=e.createFramebuffer(),L.__webglColorRenderbuffer=[],t.bindFramebuffer(e.FRAMEBUFFER,L.__webglMultisampledFramebuffer);for(let ne=0;ne<Y.length;ne++){const _e=Y[ne];L.__webglColorRenderbuffer[ne]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,L.__webglColorRenderbuffer[ne]);const Ce=a.convert(_e.format,_e.colorSpace),J=a.convert(_e.type),re=M(_e.internalFormat,Ce,J,_e.colorSpace,v.isXRRenderTarget===!0),he=E(v);e.renderbufferStorageMultisample(e.RENDERBUFFER,he,re,v.width,v.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+ne,e.RENDERBUFFER,L.__webglColorRenderbuffer[ne])}e.bindRenderbuffer(e.RENDERBUFFER,null),v.depthBuffer&&(L.__webglDepthRenderbuffer=e.createRenderbuffer(),Pe(L.__webglDepthRenderbuffer,v,!0)),t.bindFramebuffer(e.FRAMEBUFFER,null)}}if(O){t.bindTexture(e.TEXTURE_CUBE_MAP,k.__webglTexture),Ge(e.TEXTURE_CUBE_MAP,c);for(let ne=0;ne<6;ne++)if(c.mipmaps&&c.mipmaps.length>0)for(let _e=0;_e<c.mipmaps.length;_e++)de(L.__webglFramebuffer[ne][_e],v,c,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+ne,_e);else de(L.__webglFramebuffer[ne],v,c,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0);p(c)&&f(e.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Se){for(let ne=0,_e=Y.length;ne<_e;ne++){const Ce=Y[ne],J=i.get(Ce);let re=e.TEXTURE_2D;(v.isWebGL3DRenderTarget||v.isWebGLArrayRenderTarget)&&(re=v.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),t.bindTexture(re,J.__webglTexture),Ge(re,Ce),de(L.__webglFramebuffer,v,Ce,e.COLOR_ATTACHMENT0+ne,re,0),p(Ce)&&f(re)}t.unbindTexture()}else{let ne=e.TEXTURE_2D;if((v.isWebGL3DRenderTarget||v.isWebGLArrayRenderTarget)&&(ne=v.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),t.bindTexture(ne,k.__webglTexture),Ge(ne,c),c.mipmaps&&c.mipmaps.length>0)for(let _e=0;_e<c.mipmaps.length;_e++)de(L.__webglFramebuffer[_e],v,c,e.COLOR_ATTACHMENT0,ne,_e);else de(L.__webglFramebuffer,v,c,e.COLOR_ATTACHMENT0,ne,0);p(c)&&f(ne),t.unbindTexture()}v.depthBuffer&&Te(v)}function Fe(v){const c=v.textures;for(let L=0,k=c.length;L<k;L++){const Y=c[L];if(p(Y)){const O=C(v),Se=i.get(Y).__webglTexture;t.bindTexture(O,Se),f(O),t.unbindTexture()}}}const He=[],Me=[];function ke(v){if(v.samples>0){if(qe(v)===!1){const c=v.textures,L=v.width,k=v.height;let Y=e.COLOR_BUFFER_BIT;const O=v.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,Se=i.get(v),ne=c.length>1;if(ne)for(let Ce=0;Ce<c.length;Ce++)t.bindFramebuffer(e.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+Ce,e.RENDERBUFFER,null),t.bindFramebuffer(e.FRAMEBUFFER,Se.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+Ce,e.TEXTURE_2D,null,0);t.bindFramebuffer(e.READ_FRAMEBUFFER,Se.__webglMultisampledFramebuffer);const _e=v.texture.mipmaps;_e&&_e.length>0?t.bindFramebuffer(e.DRAW_FRAMEBUFFER,Se.__webglFramebuffer[0]):t.bindFramebuffer(e.DRAW_FRAMEBUFFER,Se.__webglFramebuffer);for(let Ce=0;Ce<c.length;Ce++){if(v.resolveDepthBuffer&&(v.depthBuffer&&(Y|=e.DEPTH_BUFFER_BIT),v.stencilBuffer&&v.resolveStencilBuffer&&(Y|=e.STENCIL_BUFFER_BIT)),ne){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,Se.__webglColorRenderbuffer[Ce]);const J=i.get(c[Ce]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,J,0)}e.blitFramebuffer(0,0,L,k,0,0,L,k,Y,e.NEAREST),l===!0&&(He.length=0,Me.length=0,He.push(e.COLOR_ATTACHMENT0+Ce),v.depthBuffer&&v.resolveDepthBuffer===!1&&(He.push(O),Me.push(O),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,Me)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,He))}if(t.bindFramebuffer(e.READ_FRAMEBUFFER,null),t.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),ne)for(let Ce=0;Ce<c.length;Ce++){t.bindFramebuffer(e.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+Ce,e.RENDERBUFFER,Se.__webglColorRenderbuffer[Ce]);const J=i.get(c[Ce]).__webglTexture;t.bindFramebuffer(e.FRAMEBUFFER,Se.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+Ce,e.TEXTURE_2D,J,0)}t.bindFramebuffer(e.DRAW_FRAMEBUFFER,Se.__webglMultisampledFramebuffer)}else if(v.depthBuffer&&v.resolveDepthBuffer===!1&&l){const c=v.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[c])}}}function E(v){return Math.min(r.maxSamples,v.samples)}function qe(v){const c=i.get(v);return v.samples>0&&n.has("WEBGL_multisampled_render_to_texture")===!0&&c.__useRenderToTexture!==!1}function Ve(v){const c=o.render.frame;g.get(v)!==c&&(g.set(v,c),v.update())}function Xe(v,c){const L=v.colorSpace,k=v.format,Y=v.type;return v.isCompressedTexture===!0||v.isVideoTexture===!0||L!==xt&&L!==tn&&(at.getTransfer(L)===tt?(k!==Nt||Y!==Lt)&&Qe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):it("WebGLTextures: Unsupported texture color space:",L)),c}function le(v){return typeof HTMLImageElement<"u"&&v instanceof HTMLImageElement?(u.width=v.naturalWidth||v.width,u.height=v.naturalHeight||v.height):typeof VideoFrame<"u"&&v instanceof VideoFrame?(u.width=v.displayWidth,u.height=v.displayHeight):(u.width=v.width,u.height=v.height),u}this.allocateTextureUnit=G,this.resetTextureUnits=V,this.setTexture2D=K,this.setTexture2DArray=B,this.setTexture3D=H,this.setTextureCube=j,this.rebindTextures=Le,this.setupRenderTarget=Ie,this.updateRenderTargetMipmap=Fe,this.updateMultisampleRenderTarget=ke,this.setupDepthRenderbuffer=Te,this.setupFrameBufferTexture=de,this.useMultisampledRTT=qe,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Cd(e,n){function t(i,r=tn){let a;const o=at.getTransfer(r);if(i===Lt)return e.UNSIGNED_BYTE;if(i===Ma)return e.UNSIGNED_SHORT_4_4_4_4;if(i===Aa)return e.UNSIGNED_SHORT_5_5_5_1;if(i===ko)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===Wo)return e.UNSIGNED_INT_10F_11F_11F_REV;if(i===zo)return e.BYTE;if(i===Xo)return e.SHORT;if(i===kn)return e.UNSIGNED_SHORT;if(i===ba)return e.INT;if(i===Qt)return e.UNSIGNED_INT;if(i===Gt)return e.FLOAT;if(i===Wt)return e.HALF_FLOAT;if(i===Ko)return e.ALPHA;if(i===qo)return e.RGB;if(i===Nt)return e.RGBA;if(i===cn)return e.DEPTH_COMPONENT;if(i===nn)return e.DEPTH_STENCIL;if(i===Yo)return e.RED;if(i===Ta)return e.RED_INTEGER;if(i===Tn)return e.RG;if(i===Ea)return e.RG_INTEGER;if(i===xa)return e.RGBA_INTEGER;if(i===Qn||i===Jn||i===ei||i===ti)if(o===tt)if(a=n.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===Qn)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Jn)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ei)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===ti)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=n.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===Qn)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Jn)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ei)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===ti)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Yi||i===$i||i===ji||i===Zi)if(a=n.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===Yi)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===$i)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ji)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Zi)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Qi||i===Ji||i===er||i===tr||i===nr||i===ir||i===rr)if(a=n.get("WEBGL_compressed_texture_etc"),a!==null){if(i===Qi||i===Ji)return o===tt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===er)return o===tt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC;if(i===tr)return a.COMPRESSED_R11_EAC;if(i===nr)return a.COMPRESSED_SIGNED_R11_EAC;if(i===ir)return a.COMPRESSED_RG11_EAC;if(i===rr)return a.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===ar||i===or||i===sr||i===cr||i===lr||i===fr||i===ur||i===dr||i===pr||i===hr||i===mr||i===_r||i===gr||i===vr)if(a=n.get("WEBGL_compressed_texture_astc"),a!==null){if(i===ar)return o===tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===or)return o===tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===sr)return o===tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===cr)return o===tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===lr)return o===tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===fr)return o===tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===ur)return o===tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===dr)return o===tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===pr)return o===tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===hr)return o===tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===mr)return o===tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===_r)return o===tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===gr)return o===tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===vr)return o===tt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Sr||i===xr||i===Er)if(a=n.get("EXT_texture_compression_bptc"),a!==null){if(i===Sr)return o===tt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===xr)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Er)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Tr||i===Mr||i===Ar||i===Rr)if(a=n.get("EXT_texture_compression_rgtc"),a!==null){if(i===Tr)return a.COMPRESSED_RED_RGTC1_EXT;if(i===Mr)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ar)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Rr)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===En?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:t}}const Pd=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Ld=`
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

}`;class wd{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(n,t){if(this.texture===null){const i=new Ra(n.texture);(n.depthNear!==t.depthNear||n.depthFar!==t.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=i}}getMesh(n){if(this.texture!==null&&this.mesh===null){const t=n.cameras[0].viewport,i=new Ot({vertexShader:Pd,fragmentShader:Ld,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new pt(new Ii(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Dd extends fo{constructor(n,t){super();const i=this;let r=null,a=1,o=null,s="local-floor",l=1,u=null,g=null,d=null,_=null,x=null,D=null;const T=typeof XRWebGLBinding<"u",p=new wd,f={},C=t.getContextAttributes();let M=null,A=null;const b=[],P=[],N=new ft;let X=null;const m=new an;m.viewport=new dt;const S=new an;S.viewport=new dt;const U=[m,S],V=new uo;let G=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(z){let $=b[z];return $===void 0&&($=new Zn,b[z]=$),$.getTargetRaySpace()},this.getControllerGrip=function(z){let $=b[z];return $===void 0&&($=new Zn,b[z]=$),$.getGripSpace()},this.getHand=function(z){let $=b[z];return $===void 0&&($=new Zn,b[z]=$),$.getHandSpace()};function K(z){const $=P.indexOf(z.inputSource);if($===-1)return;const de=b[$];de!==void 0&&(de.update(z.inputSource,z.frame,u||o),de.dispatchEvent({type:z.type,data:z.inputSource}))}function B(){r.removeEventListener("select",K),r.removeEventListener("selectstart",K),r.removeEventListener("selectend",K),r.removeEventListener("squeeze",K),r.removeEventListener("squeezestart",K),r.removeEventListener("squeezeend",K),r.removeEventListener("end",B),r.removeEventListener("inputsourceschange",H);for(let z=0;z<b.length;z++){const $=P[z];$!==null&&(P[z]=null,b[z].disconnect($))}G=null,W=null,p.reset();for(const z in f)delete f[z];n.setRenderTarget(M),x=null,_=null,d=null,r=null,A=null,nt.stop(),i.isPresenting=!1,n.setPixelRatio(X),n.setSize(N.width,N.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(z){a=z,i.isPresenting===!0&&Qe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(z){s=z,i.isPresenting===!0&&Qe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return u||o},this.setReferenceSpace=function(z){u=z},this.getBaseLayer=function(){return _!==null?_:x},this.getBinding=function(){return d===null&&T&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return D},this.getSession=function(){return r},this.setSession=async function(z){if(r=z,r!==null){if(M=n.getRenderTarget(),r.addEventListener("select",K),r.addEventListener("selectstart",K),r.addEventListener("selectend",K),r.addEventListener("squeeze",K),r.addEventListener("squeezestart",K),r.addEventListener("squeezeend",K),r.addEventListener("end",B),r.addEventListener("inputsourceschange",H),C.xrCompatible!==!0&&await t.makeXRCompatible(),X=n.getPixelRatio(),n.getSize(N),T&&"createProjectionLayer"in XRWebGLBinding.prototype){let de=null,Pe=null,Z=null;C.depth&&(Z=C.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,de=C.stencil?nn:cn,Pe=C.stencil?En:Qt);const Te={colorFormat:t.RGBA8,depthFormat:Z,scaleFactor:a};d=this.getBinding(),_=d.createProjectionLayer(Te),r.updateRenderState({layers:[_]}),n.setPixelRatio(1),n.setSize(_.textureWidth,_.textureHeight,!1),A=new Ft(_.textureWidth,_.textureHeight,{format:Nt,type:Lt,depthTexture:new Bn(_.textureWidth,_.textureHeight,Pe,void 0,void 0,void 0,void 0,void 0,void 0,de),stencilBuffer:C.stencil,colorSpace:n.outputColorSpace,samples:C.antialias?4:0,resolveDepthBuffer:_.ignoreDepthValues===!1,resolveStencilBuffer:_.ignoreDepthValues===!1})}else{const de={antialias:C.antialias,alpha:!0,depth:C.depth,stencil:C.stencil,framebufferScaleFactor:a};x=new XRWebGLLayer(r,t,de),r.updateRenderState({baseLayer:x}),n.setPixelRatio(1),n.setSize(x.framebufferWidth,x.framebufferHeight,!1),A=new Ft(x.framebufferWidth,x.framebufferHeight,{format:Nt,type:Lt,colorSpace:n.outputColorSpace,stencilBuffer:C.stencil,resolveDepthBuffer:x.ignoreDepthValues===!1,resolveStencilBuffer:x.ignoreDepthValues===!1})}A.isXRRenderTarget=!0,this.setFoveation(l),u=null,o=await r.requestReferenceSpace(s),nt.setContext(r),nt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function H(z){for(let $=0;$<z.removed.length;$++){const de=z.removed[$],Pe=P.indexOf(de);Pe>=0&&(P[Pe]=null,b[Pe].disconnect(de))}for(let $=0;$<z.added.length;$++){const de=z.added[$];let Pe=P.indexOf(de);if(Pe===-1){for(let Te=0;Te<b.length;Te++)if(Te>=P.length){P.push(de),Pe=Te;break}else if(P[Te]===null){P[Te]=de,Pe=Te;break}if(Pe===-1)break}const Z=b[Pe];Z&&Z.connect(de)}}const j=new De,ge=new De;function me(z,$,de){j.setFromMatrixPosition($.matrixWorld),ge.setFromMatrixPosition(de.matrixWorld);const Pe=j.distanceTo(ge),Z=$.projectionMatrix.elements,Te=de.projectionMatrix.elements,Le=Z[14]/(Z[10]-1),Ie=Z[14]/(Z[10]+1),Fe=(Z[9]+1)/Z[5],He=(Z[9]-1)/Z[5],Me=(Z[8]-1)/Z[0],ke=(Te[8]+1)/Te[0],E=Le*Me,qe=Le*ke,Ve=Pe/(-Me+ke),Xe=Ve*-Me;if($.matrixWorld.decompose(z.position,z.quaternion,z.scale),z.translateX(Xe),z.translateZ(Ve),z.matrixWorld.compose(z.position,z.quaternion,z.scale),z.matrixWorldInverse.copy(z.matrixWorld).invert(),Z[10]===-1)z.projectionMatrix.copy($.projectionMatrix),z.projectionMatrixInverse.copy($.projectionMatrixInverse);else{const le=Le+Ve,v=Ie+Ve,c=E-Xe,L=qe+(Pe-Xe),k=Fe*Ie/v*le,Y=He*Ie/v*le;z.projectionMatrix.makePerspective(c,L,k,Y,le,v),z.projectionMatrixInverse.copy(z.projectionMatrix).invert()}}function xe(z,$){$===null?z.matrixWorld.copy(z.matrix):z.matrixWorld.multiplyMatrices($.matrixWorld,z.matrix),z.matrixWorldInverse.copy(z.matrixWorld).invert()}this.updateCamera=function(z){if(r===null)return;let $=z.near,de=z.far;p.texture!==null&&(p.depthNear>0&&($=p.depthNear),p.depthFar>0&&(de=p.depthFar)),V.near=S.near=m.near=$,V.far=S.far=m.far=de,(G!==V.near||W!==V.far)&&(r.updateRenderState({depthNear:V.near,depthFar:V.far}),G=V.near,W=V.far),V.layers.mask=z.layers.mask|6,m.layers.mask=V.layers.mask&3,S.layers.mask=V.layers.mask&5;const Pe=z.parent,Z=V.cameras;xe(V,Pe);for(let Te=0;Te<Z.length;Te++)xe(Z[Te],Pe);Z.length===2?me(V,m,S):V.projectionMatrix.copy(m.projectionMatrix),Ge(z,V,Pe)};function Ge(z,$,de){de===null?z.matrix.copy($.matrixWorld):(z.matrix.copy(de.matrixWorld),z.matrix.invert(),z.matrix.multiply($.matrixWorld)),z.matrix.decompose(z.position,z.quaternion,z.scale),z.updateMatrixWorld(!0),z.projectionMatrix.copy($.projectionMatrix),z.projectionMatrixInverse.copy($.projectionMatrixInverse),z.isPerspectiveCamera&&(z.fov=po*2*Math.atan(1/z.projectionMatrix.elements[5]),z.zoom=1)}this.getCamera=function(){return V},this.getFoveation=function(){if(!(_===null&&x===null))return l},this.setFoveation=function(z){l=z,_!==null&&(_.fixedFoveation=z),x!==null&&x.fixedFoveation!==void 0&&(x.fixedFoveation=z)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(V)},this.getCameraTexture=function(z){return f[z]};let ye=null;function rt(z,$){if(g=$.getViewerPose(u||o),D=$,g!==null){const de=g.views;x!==null&&(n.setRenderTargetFramebuffer(A,x.framebuffer),n.setRenderTarget(A));let Pe=!1;de.length!==V.cameras.length&&(V.cameras.length=0,Pe=!0);for(let Ie=0;Ie<de.length;Ie++){const Fe=de[Ie];let He=null;if(x!==null)He=x.getViewport(Fe);else{const ke=d.getViewSubImage(_,Fe);He=ke.viewport,Ie===0&&(n.setRenderTargetTextures(A,ke.colorTexture,ke.depthStencilTexture),n.setRenderTarget(A))}let Me=U[Ie];Me===void 0&&(Me=new an,Me.layers.enable(Ie),Me.viewport=new dt,U[Ie]=Me),Me.matrix.fromArray(Fe.transform.matrix),Me.matrix.decompose(Me.position,Me.quaternion,Me.scale),Me.projectionMatrix.fromArray(Fe.projectionMatrix),Me.projectionMatrixInverse.copy(Me.projectionMatrix).invert(),Me.viewport.set(He.x,He.y,He.width,He.height),Ie===0&&(V.matrix.copy(Me.matrix),V.matrix.decompose(V.position,V.quaternion,V.scale)),Pe===!0&&V.cameras.push(Me)}const Z=r.enabledFeatures;if(Z&&Z.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&T){d=i.getBinding();const Ie=d.getDepthInformation(de[0]);Ie&&Ie.isValid&&Ie.texture&&p.init(Ie,r.renderState)}if(Z&&Z.includes("camera-access")&&T){n.state.unbindTexture(),d=i.getBinding();for(let Ie=0;Ie<de.length;Ie++){const Fe=de[Ie].camera;if(Fe){let He=f[Fe];He||(He=new Ra,f[Fe]=He);const Me=d.getCameraImage(Fe);He.sourceTexture=Me}}}}for(let de=0;de<b.length;de++){const Pe=P[de],Z=b[de];Pe!==null&&Z!==void 0&&Z.update(Pe,$,u||o)}ye&&ye(z,$),$.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:$}),D=null}const nt=new ka;nt.setAnimationLoop(rt),this.setAnimationLoop=function(z){ye=z},this.dispose=function(){}}}const qt=new Ni,Ud=new At;function Id(e,n){function t(p,f){p.matrixAutoUpdate===!0&&p.updateMatrix(),f.value.copy(p.matrix)}function i(p,f){f.color.getRGB(p.fogColor.value,Pa(e)),f.isFog?(p.fogNear.value=f.near,p.fogFar.value=f.far):f.isFogExp2&&(p.fogDensity.value=f.density)}function r(p,f,C,M,A){f.isMeshBasicMaterial||f.isMeshLambertMaterial?a(p,f):f.isMeshToonMaterial?(a(p,f),d(p,f)):f.isMeshPhongMaterial?(a(p,f),g(p,f)):f.isMeshStandardMaterial?(a(p,f),_(p,f),f.isMeshPhysicalMaterial&&x(p,f,A)):f.isMeshMatcapMaterial?(a(p,f),D(p,f)):f.isMeshDepthMaterial?a(p,f):f.isMeshDistanceMaterial?(a(p,f),T(p,f)):f.isMeshNormalMaterial?a(p,f):f.isLineBasicMaterial?(o(p,f),f.isLineDashedMaterial&&s(p,f)):f.isPointsMaterial?l(p,f,C,M):f.isSpriteMaterial?u(p,f):f.isShadowMaterial?(p.color.value.copy(f.color),p.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function a(p,f){p.opacity.value=f.opacity,f.color&&p.diffuse.value.copy(f.color),f.emissive&&p.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(p.map.value=f.map,t(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,t(f.alphaMap,p.alphaMapTransform)),f.bumpMap&&(p.bumpMap.value=f.bumpMap,t(f.bumpMap,p.bumpMapTransform),p.bumpScale.value=f.bumpScale,f.side===Mt&&(p.bumpScale.value*=-1)),f.normalMap&&(p.normalMap.value=f.normalMap,t(f.normalMap,p.normalMapTransform),p.normalScale.value.copy(f.normalScale),f.side===Mt&&p.normalScale.value.negate()),f.displacementMap&&(p.displacementMap.value=f.displacementMap,t(f.displacementMap,p.displacementMapTransform),p.displacementScale.value=f.displacementScale,p.displacementBias.value=f.displacementBias),f.emissiveMap&&(p.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,p.emissiveMapTransform)),f.specularMap&&(p.specularMap.value=f.specularMap,t(f.specularMap,p.specularMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest);const C=n.get(f),M=C.envMap,A=C.envMapRotation;M&&(p.envMap.value=M,qt.copy(A),qt.x*=-1,qt.y*=-1,qt.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(qt.y*=-1,qt.z*=-1),p.envMapRotation.value.setFromMatrix4(Ud.makeRotationFromEuler(qt)),p.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=f.reflectivity,p.ior.value=f.ior,p.refractionRatio.value=f.refractionRatio),f.lightMap&&(p.lightMap.value=f.lightMap,p.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,p.lightMapTransform)),f.aoMap&&(p.aoMap.value=f.aoMap,p.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,p.aoMapTransform))}function o(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,f.map&&(p.map.value=f.map,t(f.map,p.mapTransform))}function s(p,f){p.dashSize.value=f.dashSize,p.totalSize.value=f.dashSize+f.gapSize,p.scale.value=f.scale}function l(p,f,C,M){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.size.value=f.size*C,p.scale.value=M*.5,f.map&&(p.map.value=f.map,t(f.map,p.uvTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,t(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function u(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.rotation.value=f.rotation,f.map&&(p.map.value=f.map,t(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,t(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function g(p,f){p.specular.value.copy(f.specular),p.shininess.value=Math.max(f.shininess,1e-4)}function d(p,f){f.gradientMap&&(p.gradientMap.value=f.gradientMap)}function _(p,f){p.metalness.value=f.metalness,f.metalnessMap&&(p.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,p.metalnessMapTransform)),p.roughness.value=f.roughness,f.roughnessMap&&(p.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,p.roughnessMapTransform)),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)}function x(p,f,C){p.ior.value=f.ior,f.sheen>0&&(p.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),p.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(p.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,p.sheenColorMapTransform)),f.sheenRoughnessMap&&(p.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,p.sheenRoughnessMapTransform))),f.clearcoat>0&&(p.clearcoat.value=f.clearcoat,p.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(p.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,p.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(p.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Mt&&p.clearcoatNormalScale.value.negate())),f.dispersion>0&&(p.dispersion.value=f.dispersion),f.iridescence>0&&(p.iridescence.value=f.iridescence,p.iridescenceIOR.value=f.iridescenceIOR,p.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(p.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,p.iridescenceMapTransform)),f.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),f.transmission>0&&(p.transmission.value=f.transmission,p.transmissionSamplerMap.value=C.texture,p.transmissionSamplerSize.value.set(C.width,C.height),f.transmissionMap&&(p.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,p.transmissionMapTransform)),p.thickness.value=f.thickness,f.thicknessMap&&(p.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=f.attenuationDistance,p.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(p.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(p.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=f.specularIntensity,p.specularColor.value.copy(f.specularColor),f.specularColorMap&&(p.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,p.specularColorMapTransform)),f.specularIntensityMap&&(p.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,p.specularIntensityMapTransform))}function D(p,f){f.matcap&&(p.matcap.value=f.matcap)}function T(p,f){const C=n.get(f).light;p.referencePosition.value.setFromMatrixPosition(C.matrixWorld),p.nearDistance.value=C.shadow.camera.near,p.farDistance.value=C.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function Nd(e,n,t,i){let r={},a={},o=[];const s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function l(C,M){const A=M.program;i.uniformBlockBinding(C,A)}function u(C,M){let A=r[C.id];A===void 0&&(D(C),A=g(C),r[C.id]=A,C.addEventListener("dispose",p));const b=M.program;i.updateUBOMapping(C,b);const P=n.render.frame;a[C.id]!==P&&(_(C),a[C.id]=P)}function g(C){const M=d();C.__bindingPointIndex=M;const A=e.createBuffer(),b=C.__size,P=C.usage;return e.bindBuffer(e.UNIFORM_BUFFER,A),e.bufferData(e.UNIFORM_BUFFER,b,P),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,M,A),A}function d(){for(let C=0;C<s;C++)if(o.indexOf(C)===-1)return o.push(C),C;return it("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function _(C){const M=r[C.id],A=C.uniforms,b=C.__cache;e.bindBuffer(e.UNIFORM_BUFFER,M);for(let P=0,N=A.length;P<N;P++){const X=Array.isArray(A[P])?A[P]:[A[P]];for(let m=0,S=X.length;m<S;m++){const U=X[m];if(x(U,P,m,b)===!0){const V=U.__offset,G=Array.isArray(U.value)?U.value:[U.value];let W=0;for(let K=0;K<G.length;K++){const B=G[K],H=T(B);typeof B=="number"||typeof B=="boolean"?(U.__data[0]=B,e.bufferSubData(e.UNIFORM_BUFFER,V+W,U.__data)):B.isMatrix3?(U.__data[0]=B.elements[0],U.__data[1]=B.elements[1],U.__data[2]=B.elements[2],U.__data[3]=0,U.__data[4]=B.elements[3],U.__data[5]=B.elements[4],U.__data[6]=B.elements[5],U.__data[7]=0,U.__data[8]=B.elements[6],U.__data[9]=B.elements[7],U.__data[10]=B.elements[8],U.__data[11]=0):(B.toArray(U.__data,W),W+=H.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,V,U.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function x(C,M,A,b){const P=C.value,N=M+"_"+A;if(b[N]===void 0)return typeof P=="number"||typeof P=="boolean"?b[N]=P:b[N]=P.clone(),!0;{const X=b[N];if(typeof P=="number"||typeof P=="boolean"){if(X!==P)return b[N]=P,!0}else if(X.equals(P)===!1)return X.copy(P),!0}return!1}function D(C){const M=C.uniforms;let A=0;const b=16;for(let N=0,X=M.length;N<X;N++){const m=Array.isArray(M[N])?M[N]:[M[N]];for(let S=0,U=m.length;S<U;S++){const V=m[S],G=Array.isArray(V.value)?V.value:[V.value];for(let W=0,K=G.length;W<K;W++){const B=G[W],H=T(B),j=A%b,ge=j%H.boundary,me=j+ge;A+=ge,me!==0&&b-me<H.storage&&(A+=b-me),V.__data=new Float32Array(H.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=A,A+=H.storage}}}const P=A%b;return P>0&&(A+=b-P),C.__size=A,C.__cache={},this}function T(C){const M={boundary:0,storage:0};return typeof C=="number"||typeof C=="boolean"?(M.boundary=4,M.storage=4):C.isVector2?(M.boundary=8,M.storage=8):C.isVector3||C.isColor?(M.boundary=16,M.storage=12):C.isVector4?(M.boundary=16,M.storage=16):C.isMatrix3?(M.boundary=48,M.storage=48):C.isMatrix4?(M.boundary=64,M.storage=64):C.isTexture?Qe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Qe("WebGLRenderer: Unsupported uniform value type.",C),M}function p(C){const M=C.target;M.removeEventListener("dispose",p);const A=o.indexOf(M.__bindingPointIndex);o.splice(A,1),e.deleteBuffer(r[M.id]),delete r[M.id],delete a[M.id]}function f(){for(const C in r)e.deleteBuffer(r[C]);o=[],r={},a={}}return{bind:l,update:u,dispose:f}}const yd=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let bt=null;function Fd(){return bt===null&&(bt=new _a(yd,16,16,Tn,Wt),bt.name="DFG_LUT",bt.minFilter=ht,bt.magFilter=ht,bt.wrapS=Gn,bt.wrapT=Gn,bt.generateMipmaps=!1,bt.needsUpdate=!0),bt}class Od{constructor(n={}){const{canvas:t=oo(),context:i=null,depth:r=!0,stencil:a=!1,alpha:o=!1,antialias:s=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:u=!1,powerPreference:g="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:_=!1,outputBufferType:x=Lt}=n;this.isWebGLRenderer=!0;let D;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");D=i.getContextAttributes().alpha}else D=o;const T=x,p=new Set([xa,Ea,Ta]),f=new Set([Lt,Qt,kn,En,Ma,Aa]),C=new Uint32Array(4),M=new Int32Array(4);let A=null,b=null;const P=[],N=[];let X=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Dt,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const m=this;let S=!1;this._outputColorSpace=Zt;let U=0,V=0,G=null,W=-1,K=null;const B=new dt,H=new dt;let j=null;const ge=new Ke(0);let me=0,xe=t.width,Ge=t.height,ye=1,rt=null,nt=null;const z=new dt(0,0,xe,Ge),$=new dt(0,0,xe,Ge);let de=!1;const Pe=new ma;let Z=!1,Te=!1;const Le=new At,Ie=new De,Fe=new dt,He={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Me=!1;function ke(){return G===null?ye:1}let E=i;function qe(h,w){return t.getContext(h,w)}try{const h={alpha:!0,depth:r,stencil:a,antialias:s,premultipliedAlpha:l,preserveDrawingBuffer:u,powerPreference:g,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${so}`),t.addEventListener("webglcontextlost",we,!1),t.addEventListener("webglcontextrestored",Je,!1),t.addEventListener("webglcontextcreationerror",Ye,!1),E===null){const w="webgl2";if(E=qe(w,h),E===null)throw qe(w)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(h){throw it("WebGLRenderer: "+h.message),h}let Ve,Xe,le,v,c,L,k,Y,O,Se,ne,_e,Ce,J,re,he,ve,ie,Ne,R,ce,ee,fe,Q;function q(){Ve=new Ff(E),Ve.init(),ee=new Cd(E,Ve),Xe=new Cf(E,Ve,n,ee),le=new Rd(E,Ve),Xe.reversedDepthBuffer&&_&&le.buffers.depth.setReversed(!0),v=new Gf(E),c=new fd,L=new bd(E,Ve,le,c,Xe,ee,v),k=new Lf(m),Y=new yf(m),O=new ks(E),fe=new Rf(E,O),Se=new Of(E,O,v,fe),ne=new Vf(E,Se,O,v),Ne=new Hf(E,Xe,L),he=new Pf(c),_e=new ld(m,k,Y,Ve,Xe,fe,he),Ce=new Id(m,c),J=new dd,re=new vd(Ve),ie=new Af(m,k,Y,le,ne,D,l),ve=new Md(m,ne,Xe),Q=new Nd(E,v,Xe,le),R=new bf(E,Ve,v),ce=new Bf(E,Ve,v),v.programs=_e.programs,m.capabilities=Xe,m.extensions=Ve,m.properties=c,m.renderLists=J,m.shadowMap=ve,m.state=le,m.info=v}q(),T!==Lt&&(X=new Wf(T,t.width,t.height,r,a));const te=new Dd(m,E);this.xr=te,this.getContext=function(){return E},this.getContextAttributes=function(){return E.getContextAttributes()},this.forceContextLoss=function(){const h=Ve.get("WEBGL_lose_context");h&&h.loseContext()},this.forceContextRestore=function(){const h=Ve.get("WEBGL_lose_context");h&&h.restoreContext()},this.getPixelRatio=function(){return ye},this.setPixelRatio=function(h){h!==void 0&&(ye=h,this.setSize(xe,Ge,!1))},this.getSize=function(h){return h.set(xe,Ge)},this.setSize=function(h,w,F=!0){if(te.isPresenting){Qe("WebGLRenderer: Can't change size while VR device is presenting.");return}xe=h,Ge=w,t.width=Math.floor(h*ye),t.height=Math.floor(w*ye),F===!0&&(t.style.width=h+"px",t.style.height=w+"px"),X!==null&&X.setSize(t.width,t.height),this.setViewport(0,0,h,w)},this.getDrawingBufferSize=function(h){return h.set(xe*ye,Ge*ye).floor()},this.setDrawingBufferSize=function(h,w,F){xe=h,Ge=w,ye=F,t.width=Math.floor(h*F),t.height=Math.floor(w*F),this.setViewport(0,0,h,w)},this.setEffects=function(h){if(T===Lt){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(h){for(let w=0;w<h.length;w++)if(h[w].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}X.setEffects(h||[])},this.getCurrentViewport=function(h){return h.copy(B)},this.getViewport=function(h){return h.copy(z)},this.setViewport=function(h,w,F,y){h.isVector4?z.set(h.x,h.y,h.z,h.w):z.set(h,w,F,y),le.viewport(B.copy(z).multiplyScalar(ye).round())},this.getScissor=function(h){return h.copy($)},this.setScissor=function(h,w,F,y){h.isVector4?$.set(h.x,h.y,h.z,h.w):$.set(h,w,F,y),le.scissor(H.copy($).multiplyScalar(ye).round())},this.getScissorTest=function(){return de},this.setScissorTest=function(h){le.setScissorTest(de=h)},this.setOpaqueSort=function(h){rt=h},this.setTransparentSort=function(h){nt=h},this.getClearColor=function(h){return h.copy(ie.getClearColor())},this.setClearColor=function(){ie.setClearColor(...arguments)},this.getClearAlpha=function(){return ie.getClearAlpha()},this.setClearAlpha=function(){ie.setClearAlpha(...arguments)},this.clear=function(h=!0,w=!0,F=!0){let y=0;if(h){let I=!1;if(G!==null){const ae=G.texture.format;I=p.has(ae)}if(I){const ae=G.texture.type,ue=f.has(ae),se=ie.getClearColor(),pe=ie.getClearAlpha(),Ee=se.r,be=se.g,Ae=se.b;ue?(C[0]=Ee,C[1]=be,C[2]=Ae,C[3]=pe,E.clearBufferuiv(E.COLOR,0,C)):(M[0]=Ee,M[1]=be,M[2]=Ae,M[3]=pe,E.clearBufferiv(E.COLOR,0,M))}else y|=E.COLOR_BUFFER_BIT}w&&(y|=E.DEPTH_BUFFER_BIT),F&&(y|=E.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),E.clear(y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",we,!1),t.removeEventListener("webglcontextrestored",Je,!1),t.removeEventListener("webglcontextcreationerror",Ye,!1),ie.dispose(),J.dispose(),re.dispose(),c.dispose(),k.dispose(),Y.dispose(),ne.dispose(),fe.dispose(),Q.dispose(),_e.dispose(),te.dispose(),te.removeEventListener("sessionstart",Oi),te.removeEventListener("sessionend",Bi),zt.stop()};function we(h){h.preventDefault(),Xi("WebGLRenderer: Context Lost."),S=!0}function Je(){Xi("WebGLRenderer: Context Restored."),S=!1;const h=v.autoReset,w=ve.enabled,F=ve.autoUpdate,y=ve.needsUpdate,I=ve.type;q(),v.autoReset=h,ve.enabled=w,ve.autoUpdate=F,ve.needsUpdate=y,ve.type=I}function Ye(h){it("WebGLRenderer: A WebGL context could not be created. Reason: ",h.statusMessage)}function Rt(h){const w=h.target;w.removeEventListener("dispose",Rt),It(w)}function It(h){$a(h),c.remove(h)}function $a(h){const w=c.get(h).programs;w!==void 0&&(w.forEach(function(F){_e.releaseProgram(F)}),h.isShaderMaterial&&_e.releaseShaderCache(h))}this.renderBufferDirect=function(h,w,F,y,I,ae){w===null&&(w=He);const ue=I.isMesh&&I.matrixWorld.determinant()<0,se=Za(h,w,F,y,I);le.setMaterial(y,ue);let pe=F.index,Ee=1;if(y.wireframe===!0){if(pe=Se.getWireframeAttribute(F),pe===void 0)return;Ee=2}const be=F.drawRange,Ae=F.attributes.position;let Oe=be.start*Ee,je=(be.start+be.count)*Ee;ae!==null&&(Oe=Math.max(Oe,ae.start*Ee),je=Math.min(je,(ae.start+ae.count)*Ee)),pe!==null?(Oe=Math.max(Oe,0),je=Math.min(je,pe.count)):Ae!=null&&(Oe=Math.max(Oe,0),je=Math.min(je,Ae.count));const ot=je-Oe;if(ot<0||ot===1/0)return;fe.setup(I,y,se,F,pe);let st,Ze=R;if(pe!==null&&(st=O.get(pe),Ze=ce,Ze.setIndex(st)),I.isMesh)y.wireframe===!0?(le.setLineWidth(y.wireframeLinewidth*ke()),Ze.setMode(E.LINES)):Ze.setMode(E.TRIANGLES);else if(I.isLine){let Re=y.linewidth;Re===void 0&&(Re=1),le.setLineWidth(Re*ke()),I.isLineSegments?Ze.setMode(E.LINES):I.isLineLoop?Ze.setMode(E.LINE_LOOP):Ze.setMode(E.LINE_STRIP)}else I.isPoints?Ze.setMode(E.POINTS):I.isSprite&&Ze.setMode(E.TRIANGLES);if(I.isBatchedMesh)if(I._multiDrawInstances!==null)hi("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Ze.renderMultiDrawInstances(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount,I._multiDrawInstances);else if(Ve.get("WEBGL_multi_draw"))Ze.renderMultiDraw(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount);else{const Re=I._multiDrawStarts,$e=I._multiDrawCounts,We=I._multiDrawCount,vt=pe?O.get(pe).bytesPerElement:1,Jt=c.get(y).currentProgram.getUniforms();for(let St=0;St<We;St++)Jt.setValue(E,"_gl_DrawID",St),Ze.render(Re[St]/vt,$e[St])}else if(I.isInstancedMesh)Ze.renderInstances(Oe,ot,I.count);else if(F.isInstancedBufferGeometry){const Re=F._maxInstanceCount!==void 0?F._maxInstanceCount:1/0,$e=Math.min(F.instanceCount,Re);Ze.renderInstances(Oe,ot,$e)}else Ze.render(Oe,ot)};function Fi(h,w,F){h.transparent===!0&&h.side===wt&&h.forceSinglePass===!1?(h.side=Mt,h.needsUpdate=!0,Cn(h,w,F),h.side=sn,h.needsUpdate=!0,Cn(h,w,F),h.side=wt):Cn(h,w,F)}this.compile=function(h,w,F=null){F===null&&(F=h),b=re.get(F),b.init(w),N.push(b),F.traverseVisible(function(I){I.isLight&&I.layers.test(w.layers)&&(b.pushLight(I),I.castShadow&&b.pushShadow(I))}),h!==F&&h.traverseVisible(function(I){I.isLight&&I.layers.test(w.layers)&&(b.pushLight(I),I.castShadow&&b.pushShadow(I))}),b.setupLights();const y=new Set;return h.traverse(function(I){if(!(I.isMesh||I.isPoints||I.isLine||I.isSprite))return;const ae=I.material;if(ae)if(Array.isArray(ae))for(let ue=0;ue<ae.length;ue++){const se=ae[ue];Fi(se,F,I),y.add(se)}else Fi(ae,F,I),y.add(ae)}),b=N.pop(),y},this.compileAsync=function(h,w,F=null){const y=this.compile(h,w,F);return new Promise(I=>{function ae(){if(y.forEach(function(ue){c.get(ue).currentProgram.isReady()&&y.delete(ue)}),y.size===0){I(h);return}setTimeout(ae,10)}Ve.get("KHR_parallel_shader_compile")!==null?ae():setTimeout(ae,10)})};let qn=null;function ja(h){qn&&qn(h)}function Oi(){zt.stop()}function Bi(){zt.start()}const zt=new ka;zt.setAnimationLoop(ja),typeof self<"u"&&zt.setContext(self),this.setAnimationLoop=function(h){qn=h,te.setAnimationLoop(h),h===null?zt.stop():zt.start()},te.addEventListener("sessionstart",Oi),te.addEventListener("sessionend",Bi),this.render=function(h,w){if(w!==void 0&&w.isCamera!==!0){it("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;const F=te.enabled===!0&&te.isPresenting===!0,y=X!==null&&(G===null||F)&&X.begin(m,G);if(h.matrixWorldAutoUpdate===!0&&h.updateMatrixWorld(),w.parent===null&&w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),te.enabled===!0&&te.isPresenting===!0&&(X===null||X.isCompositing()===!1)&&(te.cameraAutoUpdate===!0&&te.updateCamera(w),w=te.getCamera()),h.isScene===!0&&h.onBeforeRender(m,h,w,G),b=re.get(h,N.length),b.init(w),N.push(b),Le.multiplyMatrices(w.projectionMatrix,w.matrixWorldInverse),Pe.setFromProjectionMatrix(Le,Ki,w.reversedDepth),Te=this.localClippingEnabled,Z=he.init(this.clippingPlanes,Te),A=J.get(h,P.length),A.init(),P.push(A),te.enabled===!0&&te.isPresenting===!0){const ue=m.xr.getDepthSensingMesh();ue!==null&&Yn(ue,w,-1/0,m.sortObjects)}Yn(h,w,0,m.sortObjects),A.finish(),m.sortObjects===!0&&A.sort(rt,nt),Me=te.enabled===!1||te.isPresenting===!1||te.hasDepthSensing()===!1,Me&&ie.addToRenderList(A,h),this.info.render.frame++,Z===!0&&he.beginShadows();const I=b.state.shadowsArray;if(ve.render(I,h,w),Z===!0&&he.endShadows(),this.info.autoReset===!0&&this.info.reset(),(y&&X.hasRenderPass())===!1){const ue=A.opaque,se=A.transmissive;if(b.setupLights(),w.isArrayCamera){const pe=w.cameras;if(se.length>0)for(let Ee=0,be=pe.length;Ee<be;Ee++){const Ae=pe[Ee];Hi(ue,se,h,Ae)}Me&&ie.render(h);for(let Ee=0,be=pe.length;Ee<be;Ee++){const Ae=pe[Ee];Gi(A,h,Ae,Ae.viewport)}}else se.length>0&&Hi(ue,se,h,w),Me&&ie.render(h),Gi(A,h,w)}G!==null&&V===0&&(L.updateMultisampleRenderTarget(G),L.updateRenderTargetMipmap(G)),y&&X.end(m),h.isScene===!0&&h.onAfterRender(m,h,w),fe.resetDefaultState(),W=-1,K=null,N.pop(),N.length>0?(b=N[N.length-1],Z===!0&&he.setGlobalState(m.clippingPlanes,b.state.camera)):b=null,P.pop(),P.length>0?A=P[P.length-1]:A=null};function Yn(h,w,F,y){if(h.visible===!1)return;if(h.layers.test(w.layers)){if(h.isGroup)F=h.renderOrder;else if(h.isLOD)h.autoUpdate===!0&&h.update(w);else if(h.isLight)b.pushLight(h),h.castShadow&&b.pushShadow(h);else if(h.isSprite){if(!h.frustumCulled||Pe.intersectsSprite(h)){y&&Fe.setFromMatrixPosition(h.matrixWorld).applyMatrix4(Le);const ue=ne.update(h),se=h.material;se.visible&&A.push(h,ue,se,F,Fe.z,null)}}else if((h.isMesh||h.isLine||h.isPoints)&&(!h.frustumCulled||Pe.intersectsObject(h))){const ue=ne.update(h),se=h.material;if(y&&(h.boundingSphere!==void 0?(h.boundingSphere===null&&h.computeBoundingSphere(),Fe.copy(h.boundingSphere.center)):(ue.boundingSphere===null&&ue.computeBoundingSphere(),Fe.copy(ue.boundingSphere.center)),Fe.applyMatrix4(h.matrixWorld).applyMatrix4(Le)),Array.isArray(se)){const pe=ue.groups;for(let Ee=0,be=pe.length;Ee<be;Ee++){const Ae=pe[Ee],Oe=se[Ae.materialIndex];Oe&&Oe.visible&&A.push(h,ue,Oe,F,Fe.z,Ae)}}else se.visible&&A.push(h,ue,se,F,Fe.z,null)}}const ae=h.children;for(let ue=0,se=ae.length;ue<se;ue++)Yn(ae[ue],w,F,y)}function Gi(h,w,F,y){const{opaque:I,transmissive:ae,transparent:ue}=h;b.setupLightsView(F),Z===!0&&he.setGlobalState(m.clippingPlanes,F),y&&le.viewport(B.copy(y)),I.length>0&&bn(I,w,F),ae.length>0&&bn(ae,w,F),ue.length>0&&bn(ue,w,F),le.buffers.depth.setTest(!0),le.buffers.depth.setMask(!0),le.buffers.color.setMask(!0),le.setPolygonOffset(!1)}function Hi(h,w,F,y){if((F.isScene===!0?F.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[y.id]===void 0){const Oe=Ve.has("EXT_color_buffer_half_float")||Ve.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[y.id]=new Ft(1,1,{generateMipmaps:!0,type:Oe?Wt:Lt,minFilter:jt,samples:Xe.samples,stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:at.workingColorSpace})}const ae=b.state.transmissionRenderTarget[y.id],ue=y.viewport||B;ae.setSize(ue.z*m.transmissionResolutionScale,ue.w*m.transmissionResolutionScale);const se=m.getRenderTarget(),pe=m.getActiveCubeFace(),Ee=m.getActiveMipmapLevel();m.setRenderTarget(ae),m.getClearColor(ge),me=m.getClearAlpha(),me<1&&m.setClearColor(16777215,.5),m.clear(),Me&&ie.render(F);const be=m.toneMapping;m.toneMapping=Dt;const Ae=y.viewport;if(y.viewport!==void 0&&(y.viewport=void 0),b.setupLightsView(y),Z===!0&&he.setGlobalState(m.clippingPlanes,y),bn(h,F,y),L.updateMultisampleRenderTarget(ae),L.updateRenderTargetMipmap(ae),Ve.has("WEBGL_multisampled_render_to_texture")===!1){let Oe=!1;for(let je=0,ot=w.length;je<ot;je++){const st=w[je],{object:Ze,geometry:Re,material:$e,group:We}=st;if($e.side===wt&&Ze.layers.test(y.layers)){const vt=$e.side;$e.side=Mt,$e.needsUpdate=!0,Vi(Ze,F,y,Re,$e,We),$e.side=vt,$e.needsUpdate=!0,Oe=!0}}Oe===!0&&(L.updateMultisampleRenderTarget(ae),L.updateRenderTargetMipmap(ae))}m.setRenderTarget(se,pe,Ee),m.setClearColor(ge,me),Ae!==void 0&&(y.viewport=Ae),m.toneMapping=be}function bn(h,w,F){const y=w.isScene===!0?w.overrideMaterial:null;for(let I=0,ae=h.length;I<ae;I++){const ue=h[I],{object:se,geometry:pe,group:Ee}=ue;let be=ue.material;be.allowOverride===!0&&y!==null&&(be=y),se.layers.test(F.layers)&&Vi(se,w,F,pe,be,Ee)}}function Vi(h,w,F,y,I,ae){h.onBeforeRender(m,w,F,y,I,ae),h.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,h.matrixWorld),h.normalMatrix.getNormalMatrix(h.modelViewMatrix),I.onBeforeRender(m,w,F,y,h,ae),I.transparent===!0&&I.side===wt&&I.forceSinglePass===!1?(I.side=Mt,I.needsUpdate=!0,m.renderBufferDirect(F,w,y,I,h,ae),I.side=sn,I.needsUpdate=!0,m.renderBufferDirect(F,w,y,I,h,ae),I.side=wt):m.renderBufferDirect(F,w,y,I,h,ae),h.onAfterRender(m,w,F,y,I,ae)}function Cn(h,w,F){w.isScene!==!0&&(w=He);const y=c.get(h),I=b.state.lights,ae=b.state.shadowsArray,ue=I.state.version,se=_e.getParameters(h,I.state,ae,w,F),pe=_e.getProgramCacheKey(se);let Ee=y.programs;y.environment=h.isMeshStandardMaterial?w.environment:null,y.fog=w.fog,y.envMap=(h.isMeshStandardMaterial?Y:k).get(h.envMap||y.environment),y.envMapRotation=y.environment!==null&&h.envMap===null?w.environmentRotation:h.envMapRotation,Ee===void 0&&(h.addEventListener("dispose",Rt),Ee=new Map,y.programs=Ee);let be=Ee.get(pe);if(be!==void 0){if(y.currentProgram===be&&y.lightsStateVersion===ue)return Wi(h,se),be}else se.uniforms=_e.getUniforms(h),h.onBeforeCompile(se,m),be=_e.acquireProgram(se,pe),Ee.set(pe,be),y.uniforms=se.uniforms;const Ae=y.uniforms;return(!h.isShaderMaterial&&!h.isRawShaderMaterial||h.clipping===!0)&&(Ae.clippingPlanes=he.uniform),Wi(h,se),y.needsLights=Ja(h),y.lightsStateVersion=ue,y.needsLights&&(Ae.ambientLightColor.value=I.state.ambient,Ae.lightProbe.value=I.state.probe,Ae.directionalLights.value=I.state.directional,Ae.directionalLightShadows.value=I.state.directionalShadow,Ae.spotLights.value=I.state.spot,Ae.spotLightShadows.value=I.state.spotShadow,Ae.rectAreaLights.value=I.state.rectArea,Ae.ltc_1.value=I.state.rectAreaLTC1,Ae.ltc_2.value=I.state.rectAreaLTC2,Ae.pointLights.value=I.state.point,Ae.pointLightShadows.value=I.state.pointShadow,Ae.hemisphereLights.value=I.state.hemi,Ae.directionalShadowMap.value=I.state.directionalShadowMap,Ae.directionalShadowMatrix.value=I.state.directionalShadowMatrix,Ae.spotShadowMap.value=I.state.spotShadowMap,Ae.spotLightMatrix.value=I.state.spotLightMatrix,Ae.spotLightMap.value=I.state.spotLightMap,Ae.pointShadowMap.value=I.state.pointShadowMap,Ae.pointShadowMatrix.value=I.state.pointShadowMatrix),y.currentProgram=be,y.uniformsList=null,be}function ki(h){if(h.uniformsList===null){const w=h.currentProgram.getUniforms();h.uniformsList=On.seqWithValue(w.seq,h.uniforms)}return h.uniformsList}function Wi(h,w){const F=c.get(h);F.outputColorSpace=w.outputColorSpace,F.batching=w.batching,F.batchingColor=w.batchingColor,F.instancing=w.instancing,F.instancingColor=w.instancingColor,F.instancingMorph=w.instancingMorph,F.skinning=w.skinning,F.morphTargets=w.morphTargets,F.morphNormals=w.morphNormals,F.morphColors=w.morphColors,F.morphTargetsCount=w.morphTargetsCount,F.numClippingPlanes=w.numClippingPlanes,F.numIntersection=w.numClipIntersection,F.vertexAlphas=w.vertexAlphas,F.vertexTangents=w.vertexTangents,F.toneMapping=w.toneMapping}function Za(h,w,F,y,I){w.isScene!==!0&&(w=He),L.resetTextureUnits();const ae=w.fog,ue=y.isMeshStandardMaterial?w.environment:null,se=G===null?m.outputColorSpace:G.isXRRenderTarget===!0?G.texture.colorSpace:xt,pe=(y.isMeshStandardMaterial?Y:k).get(y.envMap||ue),Ee=y.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,be=!!F.attributes.tangent&&(!!y.normalMap||y.anisotropy>0),Ae=!!F.morphAttributes.position,Oe=!!F.morphAttributes.normal,je=!!F.morphAttributes.color;let ot=Dt;y.toneMapped&&(G===null||G.isXRRenderTarget===!0)&&(ot=m.toneMapping);const st=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,Ze=st!==void 0?st.length:0,Re=c.get(y),$e=b.state.lights;if(Z===!0&&(Te===!0||h!==K)){const ut=h===K&&y.id===W;he.setState(y,h,ut)}let We=!1;y.version===Re.__version?(Re.needsLights&&Re.lightsStateVersion!==$e.state.version||Re.outputColorSpace!==se||I.isBatchedMesh&&Re.batching===!1||!I.isBatchedMesh&&Re.batching===!0||I.isBatchedMesh&&Re.batchingColor===!0&&I.colorTexture===null||I.isBatchedMesh&&Re.batchingColor===!1&&I.colorTexture!==null||I.isInstancedMesh&&Re.instancing===!1||!I.isInstancedMesh&&Re.instancing===!0||I.isSkinnedMesh&&Re.skinning===!1||!I.isSkinnedMesh&&Re.skinning===!0||I.isInstancedMesh&&Re.instancingColor===!0&&I.instanceColor===null||I.isInstancedMesh&&Re.instancingColor===!1&&I.instanceColor!==null||I.isInstancedMesh&&Re.instancingMorph===!0&&I.morphTexture===null||I.isInstancedMesh&&Re.instancingMorph===!1&&I.morphTexture!==null||Re.envMap!==pe||y.fog===!0&&Re.fog!==ae||Re.numClippingPlanes!==void 0&&(Re.numClippingPlanes!==he.numPlanes||Re.numIntersection!==he.numIntersection)||Re.vertexAlphas!==Ee||Re.vertexTangents!==be||Re.morphTargets!==Ae||Re.morphNormals!==Oe||Re.morphColors!==je||Re.toneMapping!==ot||Re.morphTargetsCount!==Ze)&&(We=!0):(We=!0,Re.__version=y.version);let vt=Re.currentProgram;We===!0&&(vt=Cn(y,w,I));let Jt=!1,St=!1,un=!1;const et=vt.getUniforms(),mt=Re.uniforms;if(le.useProgram(vt.program)&&(Jt=!0,St=!0,un=!0),y.id!==W&&(W=y.id,St=!0),Jt||K!==h){le.buffers.depth.getReversed()&&h.reversedDepth!==!0&&(h._reversedDepth=!0,h.updateProjectionMatrix()),et.setValue(E,"projectionMatrix",h.projectionMatrix),et.setValue(E,"viewMatrix",h.matrixWorldInverse);const _t=et.map.cameraPosition;_t!==void 0&&_t.setValue(E,Ie.setFromMatrixPosition(h.matrixWorld)),Xe.logarithmicDepthBuffer&&et.setValue(E,"logDepthBufFC",2/(Math.log(h.far+1)/Math.LN2)),(y.isMeshPhongMaterial||y.isMeshToonMaterial||y.isMeshLambertMaterial||y.isMeshBasicMaterial||y.isMeshStandardMaterial||y.isShaderMaterial)&&et.setValue(E,"isOrthographic",h.isOrthographicCamera===!0),K!==h&&(K=h,St=!0,un=!0)}if(Re.needsLights&&($e.state.directionalShadowMap.length>0&&et.setValue(E,"directionalShadowMap",$e.state.directionalShadowMap,L),$e.state.spotShadowMap.length>0&&et.setValue(E,"spotShadowMap",$e.state.spotShadowMap,L),$e.state.pointShadowMap.length>0&&et.setValue(E,"pointShadowMap",$e.state.pointShadowMap,L)),I.isSkinnedMesh){et.setOptional(E,I,"bindMatrix"),et.setOptional(E,I,"bindMatrixInverse");const ut=I.skeleton;ut&&(ut.boneTexture===null&&ut.computeBoneTexture(),et.setValue(E,"boneTexture",ut.boneTexture,L))}I.isBatchedMesh&&(et.setOptional(E,I,"batchingTexture"),et.setValue(E,"batchingTexture",I._matricesTexture,L),et.setOptional(E,I,"batchingIdTexture"),et.setValue(E,"batchingIdTexture",I._indirectTexture,L),et.setOptional(E,I,"batchingColorTexture"),I._colorsTexture!==null&&et.setValue(E,"batchingColorTexture",I._colorsTexture,L));const Et=F.morphAttributes;if((Et.position!==void 0||Et.normal!==void 0||Et.color!==void 0)&&Ne.update(I,F,vt),(St||Re.receiveShadow!==I.receiveShadow)&&(Re.receiveShadow=I.receiveShadow,et.setValue(E,"receiveShadow",I.receiveShadow)),y.isMeshGouraudMaterial&&y.envMap!==null&&(mt.envMap.value=pe,mt.flipEnvMap.value=pe.isCubeTexture&&pe.isRenderTargetTexture===!1?-1:1),y.isMeshStandardMaterial&&y.envMap===null&&w.environment!==null&&(mt.envMapIntensity.value=w.environmentIntensity),mt.dfgLUT!==void 0&&(mt.dfgLUT.value=Fd()),St&&(et.setValue(E,"toneMappingExposure",m.toneMappingExposure),Re.needsLights&&Qa(mt,un),ae&&y.fog===!0&&Ce.refreshFogUniforms(mt,ae),Ce.refreshMaterialUniforms(mt,y,ye,Ge,b.state.transmissionRenderTarget[h.id]),On.upload(E,ki(Re),mt,L)),y.isShaderMaterial&&y.uniformsNeedUpdate===!0&&(On.upload(E,ki(Re),mt,L),y.uniformsNeedUpdate=!1),y.isSpriteMaterial&&et.setValue(E,"center",I.center),et.setValue(E,"modelViewMatrix",I.modelViewMatrix),et.setValue(E,"normalMatrix",I.normalMatrix),et.setValue(E,"modelMatrix",I.matrixWorld),y.isShaderMaterial||y.isRawShaderMaterial){const ut=y.uniformsGroups;for(let _t=0,$n=ut.length;_t<$n;_t++){const Xt=ut[_t];Q.update(Xt,vt),Q.bind(Xt,vt)}}return vt}function Qa(h,w){h.ambientLightColor.needsUpdate=w,h.lightProbe.needsUpdate=w,h.directionalLights.needsUpdate=w,h.directionalLightShadows.needsUpdate=w,h.pointLights.needsUpdate=w,h.pointLightShadows.needsUpdate=w,h.spotLights.needsUpdate=w,h.spotLightShadows.needsUpdate=w,h.rectAreaLights.needsUpdate=w,h.hemisphereLights.needsUpdate=w}function Ja(h){return h.isMeshLambertMaterial||h.isMeshToonMaterial||h.isMeshPhongMaterial||h.isMeshStandardMaterial||h.isShadowMaterial||h.isShaderMaterial&&h.lights===!0}this.getActiveCubeFace=function(){return U},this.getActiveMipmapLevel=function(){return V},this.getRenderTarget=function(){return G},this.setRenderTargetTextures=function(h,w,F){const y=c.get(h);y.__autoAllocateDepthBuffer=h.resolveDepthBuffer===!1,y.__autoAllocateDepthBuffer===!1&&(y.__useRenderToTexture=!1),c.get(h.texture).__webglTexture=w,c.get(h.depthTexture).__webglTexture=y.__autoAllocateDepthBuffer?void 0:F,y.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(h,w){const F=c.get(h);F.__webglFramebuffer=w,F.__useDefaultFramebuffer=w===void 0};const eo=E.createFramebuffer();this.setRenderTarget=function(h,w=0,F=0){G=h,U=w,V=F;let y=null,I=!1,ae=!1;if(h){const se=c.get(h);if(se.__useDefaultFramebuffer!==void 0){le.bindFramebuffer(E.FRAMEBUFFER,se.__webglFramebuffer),B.copy(h.viewport),H.copy(h.scissor),j=h.scissorTest,le.viewport(B),le.scissor(H),le.setScissorTest(j),W=-1;return}else if(se.__webglFramebuffer===void 0)L.setupRenderTarget(h);else if(se.__hasExternalTextures)L.rebindTextures(h,c.get(h.texture).__webglTexture,c.get(h.depthTexture).__webglTexture);else if(h.depthBuffer){const be=h.depthTexture;if(se.__boundDepthTexture!==be){if(be!==null&&c.has(be)&&(h.width!==be.image.width||h.height!==be.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");L.setupDepthRenderbuffer(h)}}const pe=h.texture;(pe.isData3DTexture||pe.isDataArrayTexture||pe.isCompressedArrayTexture)&&(ae=!0);const Ee=c.get(h).__webglFramebuffer;h.isWebGLCubeRenderTarget?(Array.isArray(Ee[w])?y=Ee[w][F]:y=Ee[w],I=!0):h.samples>0&&L.useMultisampledRTT(h)===!1?y=c.get(h).__webglMultisampledFramebuffer:Array.isArray(Ee)?y=Ee[F]:y=Ee,B.copy(h.viewport),H.copy(h.scissor),j=h.scissorTest}else B.copy(z).multiplyScalar(ye).floor(),H.copy($).multiplyScalar(ye).floor(),j=de;if(F!==0&&(y=eo),le.bindFramebuffer(E.FRAMEBUFFER,y)&&le.drawBuffers(h,y),le.viewport(B),le.scissor(H),le.setScissorTest(j),I){const se=c.get(h.texture);E.framebufferTexture2D(E.FRAMEBUFFER,E.COLOR_ATTACHMENT0,E.TEXTURE_CUBE_MAP_POSITIVE_X+w,se.__webglTexture,F)}else if(ae){const se=w;for(let pe=0;pe<h.textures.length;pe++){const Ee=c.get(h.textures[pe]);E.framebufferTextureLayer(E.FRAMEBUFFER,E.COLOR_ATTACHMENT0+pe,Ee.__webglTexture,F,se)}}else if(h!==null&&F!==0){const se=c.get(h.texture);E.framebufferTexture2D(E.FRAMEBUFFER,E.COLOR_ATTACHMENT0,E.TEXTURE_2D,se.__webglTexture,F)}W=-1},this.readRenderTargetPixels=function(h,w,F,y,I,ae,ue,se=0){if(!(h&&h.isWebGLRenderTarget)){it("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let pe=c.get(h).__webglFramebuffer;if(h.isWebGLCubeRenderTarget&&ue!==void 0&&(pe=pe[ue]),pe){le.bindFramebuffer(E.FRAMEBUFFER,pe);try{const Ee=h.textures[se],be=Ee.format,Ae=Ee.type;if(!Xe.textureFormatReadable(be)){it("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Xe.textureTypeReadable(Ae)){it("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}w>=0&&w<=h.width-y&&F>=0&&F<=h.height-I&&(h.textures.length>1&&E.readBuffer(E.COLOR_ATTACHMENT0+se),E.readPixels(w,F,y,I,ee.convert(be),ee.convert(Ae),ae))}finally{const Ee=G!==null?c.get(G).__webglFramebuffer:null;le.bindFramebuffer(E.FRAMEBUFFER,Ee)}}},this.readRenderTargetPixelsAsync=async function(h,w,F,y,I,ae,ue,se=0){if(!(h&&h.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let pe=c.get(h).__webglFramebuffer;if(h.isWebGLCubeRenderTarget&&ue!==void 0&&(pe=pe[ue]),pe)if(w>=0&&w<=h.width-y&&F>=0&&F<=h.height-I){le.bindFramebuffer(E.FRAMEBUFFER,pe);const Ee=h.textures[se],be=Ee.format,Ae=Ee.type;if(!Xe.textureFormatReadable(be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Xe.textureTypeReadable(Ae))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Oe=E.createBuffer();E.bindBuffer(E.PIXEL_PACK_BUFFER,Oe),E.bufferData(E.PIXEL_PACK_BUFFER,ae.byteLength,E.STREAM_READ),h.textures.length>1&&E.readBuffer(E.COLOR_ATTACHMENT0+se),E.readPixels(w,F,y,I,ee.convert(be),ee.convert(Ae),0);const je=G!==null?c.get(G).__webglFramebuffer:null;le.bindFramebuffer(E.FRAMEBUFFER,je);const ot=E.fenceSync(E.SYNC_GPU_COMMANDS_COMPLETE,0);return E.flush(),await co(E,ot,4),E.bindBuffer(E.PIXEL_PACK_BUFFER,Oe),E.getBufferSubData(E.PIXEL_PACK_BUFFER,0,ae),E.deleteBuffer(Oe),E.deleteSync(ot),ae}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(h,w=null,F=0){const y=Math.pow(2,-F),I=Math.floor(h.image.width*y),ae=Math.floor(h.image.height*y),ue=w!==null?w.x:0,se=w!==null?w.y:0;L.setTexture2D(h,0),E.copyTexSubImage2D(E.TEXTURE_2D,F,0,0,ue,se,I,ae),le.unbindTexture()};const to=E.createFramebuffer(),no=E.createFramebuffer();this.copyTextureToTexture=function(h,w,F=null,y=null,I=0,ae=null){ae===null&&(I!==0?(hi("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ae=I,I=0):ae=0);let ue,se,pe,Ee,be,Ae,Oe,je,ot;const st=h.isCompressedTexture?h.mipmaps[ae]:h.image;if(F!==null)ue=F.max.x-F.min.x,se=F.max.y-F.min.y,pe=F.isBox3?F.max.z-F.min.z:1,Ee=F.min.x,be=F.min.y,Ae=F.isBox3?F.min.z:0;else{const Et=Math.pow(2,-I);ue=Math.floor(st.width*Et),se=Math.floor(st.height*Et),h.isDataArrayTexture?pe=st.depth:h.isData3DTexture?pe=Math.floor(st.depth*Et):pe=1,Ee=0,be=0,Ae=0}y!==null?(Oe=y.x,je=y.y,ot=y.z):(Oe=0,je=0,ot=0);const Ze=ee.convert(w.format),Re=ee.convert(w.type);let $e;w.isData3DTexture?(L.setTexture3D(w,0),$e=E.TEXTURE_3D):w.isDataArrayTexture||w.isCompressedArrayTexture?(L.setTexture2DArray(w,0),$e=E.TEXTURE_2D_ARRAY):(L.setTexture2D(w,0),$e=E.TEXTURE_2D),E.pixelStorei(E.UNPACK_FLIP_Y_WEBGL,w.flipY),E.pixelStorei(E.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),E.pixelStorei(E.UNPACK_ALIGNMENT,w.unpackAlignment);const We=E.getParameter(E.UNPACK_ROW_LENGTH),vt=E.getParameter(E.UNPACK_IMAGE_HEIGHT),Jt=E.getParameter(E.UNPACK_SKIP_PIXELS),St=E.getParameter(E.UNPACK_SKIP_ROWS),un=E.getParameter(E.UNPACK_SKIP_IMAGES);E.pixelStorei(E.UNPACK_ROW_LENGTH,st.width),E.pixelStorei(E.UNPACK_IMAGE_HEIGHT,st.height),E.pixelStorei(E.UNPACK_SKIP_PIXELS,Ee),E.pixelStorei(E.UNPACK_SKIP_ROWS,be),E.pixelStorei(E.UNPACK_SKIP_IMAGES,Ae);const et=h.isDataArrayTexture||h.isData3DTexture,mt=w.isDataArrayTexture||w.isData3DTexture;if(h.isDepthTexture){const Et=c.get(h),ut=c.get(w),_t=c.get(Et.__renderTarget),$n=c.get(ut.__renderTarget);le.bindFramebuffer(E.READ_FRAMEBUFFER,_t.__webglFramebuffer),le.bindFramebuffer(E.DRAW_FRAMEBUFFER,$n.__webglFramebuffer);for(let Xt=0;Xt<pe;Xt++)et&&(E.framebufferTextureLayer(E.READ_FRAMEBUFFER,E.COLOR_ATTACHMENT0,c.get(h).__webglTexture,I,Ae+Xt),E.framebufferTextureLayer(E.DRAW_FRAMEBUFFER,E.COLOR_ATTACHMENT0,c.get(w).__webglTexture,ae,ot+Xt)),E.blitFramebuffer(Ee,be,ue,se,Oe,je,ue,se,E.DEPTH_BUFFER_BIT,E.NEAREST);le.bindFramebuffer(E.READ_FRAMEBUFFER,null),le.bindFramebuffer(E.DRAW_FRAMEBUFFER,null)}else if(I!==0||h.isRenderTargetTexture||c.has(h)){const Et=c.get(h),ut=c.get(w);le.bindFramebuffer(E.READ_FRAMEBUFFER,to),le.bindFramebuffer(E.DRAW_FRAMEBUFFER,no);for(let _t=0;_t<pe;_t++)et?E.framebufferTextureLayer(E.READ_FRAMEBUFFER,E.COLOR_ATTACHMENT0,Et.__webglTexture,I,Ae+_t):E.framebufferTexture2D(E.READ_FRAMEBUFFER,E.COLOR_ATTACHMENT0,E.TEXTURE_2D,Et.__webglTexture,I),mt?E.framebufferTextureLayer(E.DRAW_FRAMEBUFFER,E.COLOR_ATTACHMENT0,ut.__webglTexture,ae,ot+_t):E.framebufferTexture2D(E.DRAW_FRAMEBUFFER,E.COLOR_ATTACHMENT0,E.TEXTURE_2D,ut.__webglTexture,ae),I!==0?E.blitFramebuffer(Ee,be,ue,se,Oe,je,ue,se,E.COLOR_BUFFER_BIT,E.NEAREST):mt?E.copyTexSubImage3D($e,ae,Oe,je,ot+_t,Ee,be,ue,se):E.copyTexSubImage2D($e,ae,Oe,je,Ee,be,ue,se);le.bindFramebuffer(E.READ_FRAMEBUFFER,null),le.bindFramebuffer(E.DRAW_FRAMEBUFFER,null)}else mt?h.isDataTexture||h.isData3DTexture?E.texSubImage3D($e,ae,Oe,je,ot,ue,se,pe,Ze,Re,st.data):w.isCompressedArrayTexture?E.compressedTexSubImage3D($e,ae,Oe,je,ot,ue,se,pe,Ze,st.data):E.texSubImage3D($e,ae,Oe,je,ot,ue,se,pe,Ze,Re,st):h.isDataTexture?E.texSubImage2D(E.TEXTURE_2D,ae,Oe,je,ue,se,Ze,Re,st.data):h.isCompressedTexture?E.compressedTexSubImage2D(E.TEXTURE_2D,ae,Oe,je,st.width,st.height,Ze,st.data):E.texSubImage2D(E.TEXTURE_2D,ae,Oe,je,ue,se,Ze,Re,st);E.pixelStorei(E.UNPACK_ROW_LENGTH,We),E.pixelStorei(E.UNPACK_IMAGE_HEIGHT,vt),E.pixelStorei(E.UNPACK_SKIP_PIXELS,Jt),E.pixelStorei(E.UNPACK_SKIP_ROWS,St),E.pixelStorei(E.UNPACK_SKIP_IMAGES,un),ae===0&&w.generateMipmaps&&E.generateMipmap($e),le.unbindTexture()},this.initRenderTarget=function(h){c.get(h).__webglFramebuffer===void 0&&L.setupRenderTarget(h)},this.initTexture=function(h){h.isCubeTexture?L.setTextureCube(h,0):h.isData3DTexture?L.setTexture3D(h,0):h.isDataArrayTexture||h.isCompressedArrayTexture?L.setTexture2DArray(h,0):L.setTexture2D(h,0),le.unbindTexture()},this.resetState=function(){U=0,V=0,G=null,le.reset(),fe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ki}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(n){this._outputColorSpace=n;const t=this.getContext();t.drawingBufferColorSpace=at._getDrawingBufferColorSpace(n),t.unpackColorSpace=at._getUnpackColorSpace()}}function oa(e,n){if(n===ps)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),e;if(n===Ai||n===Ba){let t=e.getIndex();if(t===null){const o=[],s=e.getAttribute("position");if(s!==void 0){for(let l=0;l<s.count;l++)o.push(l);e.setIndex(o),t=e.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),e}const i=t.count-2,r=[];if(n===Ai)for(let o=1;o<=i;o++)r.push(t.getX(0)),r.push(t.getX(o)),r.push(t.getX(o+1));else for(let o=0;o<i;o++)o%2===0?(r.push(t.getX(o)),r.push(t.getX(o+1)),r.push(t.getX(o+2))):(r.push(t.getX(o+2)),r.push(t.getX(o+1)),r.push(t.getX(o)));r.length/3!==i&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const a=e.clone();return a.setIndex(r),a.clearGroups(),a}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",n),e}class Bd extends hs{constructor(n){super(n),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Wd(t)}),this.register(function(t){return new zd(t)}),this.register(function(t){return new Jd(t)}),this.register(function(t){return new ep(t)}),this.register(function(t){return new tp(t)}),this.register(function(t){return new Kd(t)}),this.register(function(t){return new qd(t)}),this.register(function(t){return new Yd(t)}),this.register(function(t){return new $d(t)}),this.register(function(t){return new kd(t)}),this.register(function(t){return new jd(t)}),this.register(function(t){return new Xd(t)}),this.register(function(t){return new Qd(t)}),this.register(function(t){return new Zd(t)}),this.register(function(t){return new Hd(t)}),this.register(function(t){return new np(t)}),this.register(function(t){return new ip(t)})}load(n,t,i,r){const a=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const u=xn.extractUrlBase(n);o=xn.resolveURL(u,this.path)}else o=xn.extractUrlBase(n);this.manager.itemStart(n);const s=function(u){r?r(u):console.error(u),a.manager.itemError(n),a.manager.itemEnd(n)},l=new Ga(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(n,function(u){try{a.parse(u,o,function(g){t(g),a.manager.itemEnd(n)},s)}catch(g){s(g)}},i,s)}setDRACOLoader(n){return this.dracoLoader=n,this}setKTX2Loader(n){return this.ktx2Loader=n,this}setMeshoptDecoder(n){return this.meshoptDecoder=n,this}register(n){return this.pluginCallbacks.indexOf(n)===-1&&this.pluginCallbacks.push(n),this}unregister(n){return this.pluginCallbacks.indexOf(n)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(n),1),this}parse(n,t,i,r){let a;const o={},s={},l=new TextDecoder;if(typeof n=="string")a=JSON.parse(n);else if(n instanceof ArrayBuffer)if(l.decode(new Uint8Array(n,0,4))===qa){try{o[Be.KHR_BINARY_GLTF]=new rp(n)}catch(d){r&&r(d);return}a=JSON.parse(o[Be.KHR_BINARY_GLTF].content)}else a=JSON.parse(l.decode(n));else a=n;if(a.asset===void 0||a.asset.version[0]<2){r&&r(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const u=new gp(a,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});u.fileLoader.setRequestHeader(this.requestHeader);for(let g=0;g<this.pluginCallbacks.length;g++){const d=this.pluginCallbacks[g](u);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),s[d.name]=d,o[d.name]=!0}if(a.extensionsUsed)for(let g=0;g<a.extensionsUsed.length;++g){const d=a.extensionsUsed[g],_=a.extensionsRequired||[];switch(d){case Be.KHR_MATERIALS_UNLIT:o[d]=new Vd;break;case Be.KHR_DRACO_MESH_COMPRESSION:o[d]=new ap(a,this.dracoLoader);break;case Be.KHR_TEXTURE_TRANSFORM:o[d]=new op;break;case Be.KHR_MESH_QUANTIZATION:o[d]=new sp;break;default:_.indexOf(d)>=0&&s[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}u.setExtensions(o),u.setPlugins(s),u.parse(i,r)}parseAsync(n,t){const i=this;return new Promise(function(r,a){i.parse(n,t,r,a)})}}function Gd(){let e={};return{get:function(n){return e[n]},add:function(n,t){e[n]=t},remove:function(n){delete e[n]},removeAll:function(){e={}}}}const Be={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class Hd{constructor(n){this.parser=n,this.name=Be.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const n=this.parser,t=this.parser.json.nodes||[];for(let i=0,r=t.length;i<r;i++){const a=t[i];a.extensions&&a.extensions[this.name]&&a.extensions[this.name].light!==void 0&&n._addNodeRef(this.cache,a.extensions[this.name].light)}}_loadLight(n){const t=this.parser,i="light:"+n;let r=t.cache.get(i);if(r)return r;const a=t.json,l=((a.extensions&&a.extensions[this.name]||{}).lights||[])[n];let u;const g=new Ke(16777215);l.color!==void 0&&g.setRGB(l.color[0],l.color[1],l.color[2],xt);const d=l.range!==void 0?l.range:0;switch(l.type){case"directional":u=new Ri(g),u.target.position.set(0,0,-1),u.add(u.target);break;case"point":u=new _s(g),u.distance=d;break;case"spot":u=new ms(g),u.distance=d,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,u.angle=l.spot.outerConeAngle,u.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,u.target.position.set(0,0,-1),u.add(u.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return u.position.set(0,0,0),Ct(u,l),l.intensity!==void 0&&(u.intensity=l.intensity),u.name=t.createUniqueName(l.name||"light_"+n),r=Promise.resolve(u),t.cache.add(i,r),r}getDependency(n,t){if(n==="light")return this._loadLight(t)}createNodeAttachment(n){const t=this,i=this.parser,a=i.json.nodes[n],s=(a.extensions&&a.extensions[this.name]||{}).light;return s===void 0?null:this._loadLight(s).then(function(l){return i._getNodeRef(t.cache,s,l)})}}class Vd{constructor(){this.name=Be.KHR_MATERIALS_UNLIT}getMaterialType(){return rn}extendParams(n,t,i){const r=[];n.color=new Ke(1,1,1),n.opacity=1;const a=t.pbrMetallicRoughness;if(a){if(Array.isArray(a.baseColorFactor)){const o=a.baseColorFactor;n.color.setRGB(o[0],o[1],o[2],xt),n.opacity=o[3]}a.baseColorTexture!==void 0&&r.push(i.assignTexture(n,"map",a.baseColorTexture,Zt))}return Promise.all(r)}}class kd{constructor(n){this.parser=n,this.name=Be.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(n,t){const r=this.parser.json.materials[n];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const a=r.extensions[this.name].emissiveStrength;return a!==void 0&&(t.emissiveIntensity=a),Promise.resolve()}}class Wd{constructor(n){this.parser=n,this.name=Be.KHR_MATERIALS_CLEARCOAT}getMaterialType(n){const i=this.parser.json.materials[n];return!i.extensions||!i.extensions[this.name]?null:Ut}extendMaterialParams(n,t){const i=this.parser,r=i.json.materials[n];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const a=[],o=r.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&a.push(i.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&a.push(i.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(a.push(i.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const s=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ft(s,s)}return Promise.all(a)}}class zd{constructor(n){this.parser=n,this.name=Be.KHR_MATERIALS_DISPERSION}getMaterialType(n){const i=this.parser.json.materials[n];return!i.extensions||!i.extensions[this.name]?null:Ut}extendMaterialParams(n,t){const r=this.parser.json.materials[n];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const a=r.extensions[this.name];return t.dispersion=a.dispersion!==void 0?a.dispersion:0,Promise.resolve()}}class Xd{constructor(n){this.parser=n,this.name=Be.KHR_MATERIALS_IRIDESCENCE}getMaterialType(n){const i=this.parser.json.materials[n];return!i.extensions||!i.extensions[this.name]?null:Ut}extendMaterialParams(n,t){const i=this.parser,r=i.json.materials[n];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const a=[],o=r.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&a.push(i.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&a.push(i.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(a)}}class Kd{constructor(n){this.parser=n,this.name=Be.KHR_MATERIALS_SHEEN}getMaterialType(n){const i=this.parser.json.materials[n];return!i.extensions||!i.extensions[this.name]?null:Ut}extendMaterialParams(n,t){const i=this.parser,r=i.json.materials[n];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const a=[];t.sheenColor=new Ke(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=r.extensions[this.name];if(o.sheenColorFactor!==void 0){const s=o.sheenColorFactor;t.sheenColor.setRGB(s[0],s[1],s[2],xt)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&a.push(i.assignTexture(t,"sheenColorMap",o.sheenColorTexture,Zt)),o.sheenRoughnessTexture!==void 0&&a.push(i.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(a)}}class qd{constructor(n){this.parser=n,this.name=Be.KHR_MATERIALS_TRANSMISSION}getMaterialType(n){const i=this.parser.json.materials[n];return!i.extensions||!i.extensions[this.name]?null:Ut}extendMaterialParams(n,t){const i=this.parser,r=i.json.materials[n];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const a=[],o=r.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&a.push(i.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(a)}}class Yd{constructor(n){this.parser=n,this.name=Be.KHR_MATERIALS_VOLUME}getMaterialType(n){const i=this.parser.json.materials[n];return!i.extensions||!i.extensions[this.name]?null:Ut}extendMaterialParams(n,t){const i=this.parser,r=i.json.materials[n];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const a=[],o=r.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&a.push(i.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const s=o.attenuationColor||[1,1,1];return t.attenuationColor=new Ke().setRGB(s[0],s[1],s[2],xt),Promise.all(a)}}class $d{constructor(n){this.parser=n,this.name=Be.KHR_MATERIALS_IOR}getMaterialType(n){const i=this.parser.json.materials[n];return!i.extensions||!i.extensions[this.name]?null:Ut}extendMaterialParams(n,t){const r=this.parser.json.materials[n];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const a=r.extensions[this.name];return t.ior=a.ior!==void 0?a.ior:1.5,Promise.resolve()}}class jd{constructor(n){this.parser=n,this.name=Be.KHR_MATERIALS_SPECULAR}getMaterialType(n){const i=this.parser.json.materials[n];return!i.extensions||!i.extensions[this.name]?null:Ut}extendMaterialParams(n,t){const i=this.parser,r=i.json.materials[n];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const a=[],o=r.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&a.push(i.assignTexture(t,"specularIntensityMap",o.specularTexture));const s=o.specularColorFactor||[1,1,1];return t.specularColor=new Ke().setRGB(s[0],s[1],s[2],xt),o.specularColorTexture!==void 0&&a.push(i.assignTexture(t,"specularColorMap",o.specularColorTexture,Zt)),Promise.all(a)}}class Zd{constructor(n){this.parser=n,this.name=Be.EXT_MATERIALS_BUMP}getMaterialType(n){const i=this.parser.json.materials[n];return!i.extensions||!i.extensions[this.name]?null:Ut}extendMaterialParams(n,t){const i=this.parser,r=i.json.materials[n];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const a=[],o=r.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&a.push(i.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(a)}}class Qd{constructor(n){this.parser=n,this.name=Be.KHR_MATERIALS_ANISOTROPY}getMaterialType(n){const i=this.parser.json.materials[n];return!i.extensions||!i.extensions[this.name]?null:Ut}extendMaterialParams(n,t){const i=this.parser,r=i.json.materials[n];if(!r.extensions||!r.extensions[this.name])return Promise.resolve();const a=[],o=r.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&a.push(i.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(a)}}class Jd{constructor(n){this.parser=n,this.name=Be.KHR_TEXTURE_BASISU}loadTexture(n){const t=this.parser,i=t.json,r=i.textures[n];if(!r.extensions||!r.extensions[this.name])return null;const a=r.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(i.extensionsRequired&&i.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(n,a.source,o)}}class ep{constructor(n){this.parser=n,this.name=Be.EXT_TEXTURE_WEBP}loadTexture(n){const t=this.name,i=this.parser,r=i.json,a=r.textures[n];if(!a.extensions||!a.extensions[t])return null;const o=a.extensions[t],s=r.images[o.source];let l=i.textureLoader;if(s.uri){const u=i.options.manager.getHandler(s.uri);u!==null&&(l=u)}return i.loadTextureImage(n,o.source,l)}}class tp{constructor(n){this.parser=n,this.name=Be.EXT_TEXTURE_AVIF}loadTexture(n){const t=this.name,i=this.parser,r=i.json,a=r.textures[n];if(!a.extensions||!a.extensions[t])return null;const o=a.extensions[t],s=r.images[o.source];let l=i.textureLoader;if(s.uri){const u=i.options.manager.getHandler(s.uri);u!==null&&(l=u)}return i.loadTextureImage(n,o.source,l)}}class np{constructor(n){this.name=Be.EXT_MESHOPT_COMPRESSION,this.parser=n}loadBufferView(n){const t=this.parser.json,i=t.bufferViews[n];if(i.extensions&&i.extensions[this.name]){const r=i.extensions[this.name],a=this.parser.getDependency("buffer",r.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return a.then(function(s){const l=r.byteOffset||0,u=r.byteLength||0,g=r.count,d=r.byteStride,_=new Uint8Array(s,l,u);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(g,d,_,r.mode,r.filter).then(function(x){return x.buffer}):o.ready.then(function(){const x=new ArrayBuffer(g*d);return o.decodeGltfBuffer(new Uint8Array(x),g,d,_,r.mode,r.filter),x})})}else return null}}class ip{constructor(n){this.name=Be.EXT_MESH_GPU_INSTANCING,this.parser=n}createNodeMesh(n){const t=this.parser.json,i=t.nodes[n];if(!i.extensions||!i.extensions[this.name]||i.mesh===void 0)return null;const r=t.meshes[i.mesh];for(const u of r.primitives)if(u.mode!==Tt.TRIANGLES&&u.mode!==Tt.TRIANGLE_STRIP&&u.mode!==Tt.TRIANGLE_FAN&&u.mode!==void 0)return null;const o=i.extensions[this.name].attributes,s=[],l={};for(const u in o)s.push(this.parser.getDependency("accessor",o[u]).then(g=>(l[u]=g,l[u])));return s.length<1?null:(s.push(this.parser.createNodeMesh(n)),Promise.all(s).then(u=>{const g=u.pop(),d=g.isGroup?g.children:[g],_=u[0].count,x=[];for(const D of d){const T=new At,p=new De,f=new yi,C=new De(1,1,1),M=new gs(D.geometry,D.material,_);for(let A=0;A<_;A++)l.TRANSLATION&&p.fromBufferAttribute(l.TRANSLATION,A),l.ROTATION&&f.fromBufferAttribute(l.ROTATION,A),l.SCALE&&C.fromBufferAttribute(l.SCALE,A),M.setMatrixAt(A,T.compose(p,f,C));for(const A in l)if(A==="_COLOR_0"){const b=l[A];M.instanceColor=new vs(b.array,b.itemSize,b.normalized)}else A!=="TRANSLATION"&&A!=="ROTATION"&&A!=="SCALE"&&D.geometry.setAttribute(A,l[A]);Ha.prototype.copy.call(M,D),this.parser.assignFinalMaterial(M),x.push(M)}return g.isGroup?(g.clear(),g.add(...x),g):x[0]}))}}const qa="glTF",mn=12,sa={JSON:1313821514,BIN:5130562};class rp{constructor(n){this.name=Be.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(n,0,mn),i=new TextDecoder;if(this.header={magic:i.decode(new Uint8Array(n.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==qa)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const r=this.header.length-mn,a=new DataView(n,mn);let o=0;for(;o<r;){const s=a.getUint32(o,!0);o+=4;const l=a.getUint32(o,!0);if(o+=4,l===sa.JSON){const u=new Uint8Array(n,mn+o,s);this.content=i.decode(u)}else if(l===sa.BIN){const u=mn+o;this.body=n.slice(u,u+s)}o+=s}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class ap{constructor(n,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Be.KHR_DRACO_MESH_COMPRESSION,this.json=n,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(n,t){const i=this.json,r=this.dracoLoader,a=n.extensions[this.name].bufferView,o=n.extensions[this.name].attributes,s={},l={},u={};for(const g in o){const d=Pi[g]||g.toLowerCase();s[d]=o[g]}for(const g in n.attributes){const d=Pi[g]||g.toLowerCase();if(o[g]!==void 0){const _=i.accessors[n.attributes[g]],x=on[_.componentType];u[d]=x.name,l[d]=_.normalized===!0}}return t.getDependency("bufferView",a).then(function(g){return new Promise(function(d,_){r.decodeDracoFile(g,function(x){for(const D in x.attributes){const T=x.attributes[D],p=l[D];p!==void 0&&(T.normalized=p)}d(x)},s,u,xt,_)})})}}class op{constructor(){this.name=Be.KHR_TEXTURE_TRANSFORM}extendTexture(n,t){return(t.texCoord===void 0||t.texCoord===n.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(n=n.clone(),t.texCoord!==void 0&&(n.channel=t.texCoord),t.offset!==void 0&&n.offset.fromArray(t.offset),t.rotation!==void 0&&(n.rotation=t.rotation),t.scale!==void 0&&n.repeat.fromArray(t.scale),n.needsUpdate=!0),n}}class sp{constructor(){this.name=Be.KHR_MESH_QUANTIZATION}}class Ya extends ys{constructor(n,t,i,r){super(n,t,i,r)}copySampleValue_(n){const t=this.resultBuffer,i=this.sampleValues,r=this.valueSize,a=n*r*3+r;for(let o=0;o!==r;o++)t[o]=i[a+o];return t}interpolate_(n,t,i,r){const a=this.resultBuffer,o=this.sampleValues,s=this.valueSize,l=s*2,u=s*3,g=r-t,d=(i-t)/g,_=d*d,x=_*d,D=n*u,T=D-u,p=-2*x+3*_,f=x-_,C=1-p,M=f-_+d;for(let A=0;A!==s;A++){const b=o[T+A+s],P=o[T+A+l]*g,N=o[D+A+s],X=o[D+A]*g;a[A]=C*b+M*P+p*N+f*X}return a}}const cp=new yi;class lp extends Ya{interpolate_(n,t,i,r){const a=super.interpolate_(n,t,i,r);return cp.fromArray(a).normalize().toArray(a),a}}const Tt={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},on={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},ca={9728:yt,9729:ht,9984:va,9985:In,9986:gn,9987:jt},la={33071:Gn,33648:ga,10497:Vn},fi={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Pi={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Bt={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},fp={CUBICSPLINE:void 0,LINEAR:Va,STEP:Is},ui={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function up(e){return e.DefaultMaterial===void 0&&(e.DefaultMaterial=new An({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:sn})),e.DefaultMaterial}function Yt(e,n,t){for(const i in t.extensions)e[i]===void 0&&(n.userData.gltfExtensions=n.userData.gltfExtensions||{},n.userData.gltfExtensions[i]=t.extensions[i])}function Ct(e,n){n.extras!==void 0&&(typeof n.extras=="object"?Object.assign(e.userData,n.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+n.extras))}function dp(e,n,t){let i=!1,r=!1,a=!1;for(let u=0,g=n.length;u<g;u++){const d=n[u];if(d.POSITION!==void 0&&(i=!0),d.NORMAL!==void 0&&(r=!0),d.COLOR_0!==void 0&&(a=!0),i&&r&&a)break}if(!i&&!r&&!a)return Promise.resolve(e);const o=[],s=[],l=[];for(let u=0,g=n.length;u<g;u++){const d=n[u];if(i){const _=d.POSITION!==void 0?t.getDependency("accessor",d.POSITION):e.attributes.position;o.push(_)}if(r){const _=d.NORMAL!==void 0?t.getDependency("accessor",d.NORMAL):e.attributes.normal;s.push(_)}if(a){const _=d.COLOR_0!==void 0?t.getDependency("accessor",d.COLOR_0):e.attributes.color;l.push(_)}}return Promise.all([Promise.all(o),Promise.all(s),Promise.all(l)]).then(function(u){const g=u[0],d=u[1],_=u[2];return i&&(e.morphAttributes.position=g),r&&(e.morphAttributes.normal=d),a&&(e.morphAttributes.color=_),e.morphTargetsRelative=!0,e})}function pp(e,n){if(e.updateMorphTargets(),n.weights!==void 0)for(let t=0,i=n.weights.length;t<i;t++)e.morphTargetInfluences[t]=n.weights[t];if(n.extras&&Array.isArray(n.extras.targetNames)){const t=n.extras.targetNames;if(e.morphTargetInfluences.length===t.length){e.morphTargetDictionary={};for(let i=0,r=t.length;i<r;i++)e.morphTargetDictionary[t[i]]=i}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function hp(e){let n;const t=e.extensions&&e.extensions[Be.KHR_DRACO_MESH_COMPRESSION];if(t?n="draco:"+t.bufferView+":"+t.indices+":"+di(t.attributes):n=e.indices+":"+di(e.attributes)+":"+e.mode,e.targets!==void 0)for(let i=0,r=e.targets.length;i<r;i++)n+=":"+di(e.targets[i]);return n}function di(e){let n="";const t=Object.keys(e).sort();for(let i=0,r=t.length;i<r;i++)n+=t[i]+":"+e[t[i]]+";";return n}function Li(e){switch(e){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function mp(e){return e.search(/\.jpe?g($|\?)/i)>0||e.search(/^data\:image\/jpeg/)===0?"image/jpeg":e.search(/\.webp($|\?)/i)>0||e.search(/^data\:image\/webp/)===0?"image/webp":e.search(/\.ktx2($|\?)/i)>0||e.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const _p=new At;class gp{constructor(n={},t={}){this.json=n,this.extensions={},this.plugins={},this.options=t,this.cache=new Gd,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let i=!1,r=-1,a=!1,o=-1;if(typeof navigator<"u"){const s=navigator.userAgent;i=/^((?!chrome|android).)*safari/i.test(s)===!0;const l=s.match(/Version\/(\d+)/);r=i&&l?parseInt(l[1],10):-1,a=s.indexOf("Firefox")>-1,o=a?s.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||i&&r<17||a&&o<98?this.textureLoader=new Ss(this.options.manager):this.textureLoader=new xs(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Ga(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(n){this.extensions=n}setPlugins(n){this.plugins=n}parse(n,t){const i=this,r=this.json,a=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([i.getDependencies("scene"),i.getDependencies("animation"),i.getDependencies("camera")])}).then(function(o){const s={scene:o[0][r.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:r.asset,parser:i,userData:{}};return Yt(a,s,r),Ct(s,r),Promise.all(i._invokeAll(function(l){return l.afterRoot&&l.afterRoot(s)})).then(function(){for(const l of s.scenes)l.updateMatrixWorld();n(s)})}).catch(t)}_markDefs(){const n=this.json.nodes||[],t=this.json.skins||[],i=this.json.meshes||[];for(let r=0,a=t.length;r<a;r++){const o=t[r].joints;for(let s=0,l=o.length;s<l;s++)n[o[s]].isBone=!0}for(let r=0,a=n.length;r<a;r++){const o=n[r];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(i[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(n,t){t!==void 0&&(n.refs[t]===void 0&&(n.refs[t]=n.uses[t]=0),n.refs[t]++)}_getNodeRef(n,t,i){if(n.refs[t]<=1)return i;const r=i.clone(),a=(o,s)=>{const l=this.associations.get(o);l!=null&&this.associations.set(s,l);for(const[u,g]of o.children.entries())a(g,s.children[u])};return a(i,r),r.name+="_instance_"+n.uses[t]++,r}_invokeOne(n){const t=Object.values(this.plugins);t.push(this);for(let i=0;i<t.length;i++){const r=n(t[i]);if(r)return r}return null}_invokeAll(n){const t=Object.values(this.plugins);t.unshift(this);const i=[];for(let r=0;r<t.length;r++){const a=n(t[r]);a&&i.push(a)}return i}getDependency(n,t){const i=n+":"+t;let r=this.cache.get(i);if(!r){switch(n){case"scene":r=this.loadScene(t);break;case"node":r=this._invokeOne(function(a){return a.loadNode&&a.loadNode(t)});break;case"mesh":r=this._invokeOne(function(a){return a.loadMesh&&a.loadMesh(t)});break;case"accessor":r=this.loadAccessor(t);break;case"bufferView":r=this._invokeOne(function(a){return a.loadBufferView&&a.loadBufferView(t)});break;case"buffer":r=this.loadBuffer(t);break;case"material":r=this._invokeOne(function(a){return a.loadMaterial&&a.loadMaterial(t)});break;case"texture":r=this._invokeOne(function(a){return a.loadTexture&&a.loadTexture(t)});break;case"skin":r=this.loadSkin(t);break;case"animation":r=this._invokeOne(function(a){return a.loadAnimation&&a.loadAnimation(t)});break;case"camera":r=this.loadCamera(t);break;default:if(r=this._invokeOne(function(a){return a!=this&&a.getDependency&&a.getDependency(n,t)}),!r)throw new Error("Unknown type: "+n);break}this.cache.add(i,r)}return r}getDependencies(n){let t=this.cache.get(n);if(!t){const i=this,r=this.json[n+(n==="mesh"?"es":"s")]||[];t=Promise.all(r.map(function(a,o){return i.getDependency(n,o)})),this.cache.add(n,t)}return t}loadBuffer(n){const t=this.json.buffers[n],i=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&n===0)return Promise.resolve(this.extensions[Be.KHR_BINARY_GLTF].body);const r=this.options;return new Promise(function(a,o){i.load(xn.resolveURL(t.uri,r.path),a,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(n){const t=this.json.bufferViews[n];return this.getDependency("buffer",t.buffer).then(function(i){const r=t.byteLength||0,a=t.byteOffset||0;return i.slice(a,a+r)})}loadAccessor(n){const t=this,i=this.json,r=this.json.accessors[n];if(r.bufferView===void 0&&r.sparse===void 0){const o=fi[r.type],s=on[r.componentType],l=r.normalized===!0,u=new s(r.count*o);return Promise.resolve(new Vt(u,o,l))}const a=[];return r.bufferView!==void 0?a.push(this.getDependency("bufferView",r.bufferView)):a.push(null),r.sparse!==void 0&&(a.push(this.getDependency("bufferView",r.sparse.indices.bufferView)),a.push(this.getDependency("bufferView",r.sparse.values.bufferView))),Promise.all(a).then(function(o){const s=o[0],l=fi[r.type],u=on[r.componentType],g=u.BYTES_PER_ELEMENT,d=g*l,_=r.byteOffset||0,x=r.bufferView!==void 0?i.bufferViews[r.bufferView].byteStride:void 0,D=r.normalized===!0;let T,p;if(x&&x!==d){const f=Math.floor(_/x),C="InterleavedBuffer:"+r.bufferView+":"+r.componentType+":"+f+":"+r.count;let M=t.cache.get(C);M||(T=new u(s,f*x,r.count*x/g),M=new Es(T,x/g),t.cache.add(C,M)),p=new Ns(M,l,_%x/g,D)}else s===null?T=new u(r.count*l):T=new u(s,_,r.count*l),p=new Vt(T,l,D);if(r.sparse!==void 0){const f=fi.SCALAR,C=on[r.sparse.indices.componentType],M=r.sparse.indices.byteOffset||0,A=r.sparse.values.byteOffset||0,b=new C(o[1],M,r.sparse.count*f),P=new u(o[2],A,r.sparse.count*l);s!==null&&(p=new Vt(p.array.slice(),p.itemSize,p.normalized)),p.normalized=!1;for(let N=0,X=b.length;N<X;N++){const m=b[N];if(p.setX(m,P[N*l]),l>=2&&p.setY(m,P[N*l+1]),l>=3&&p.setZ(m,P[N*l+2]),l>=4&&p.setW(m,P[N*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}p.normalized=D}return p})}loadTexture(n){const t=this.json,i=this.options,a=t.textures[n].source,o=t.images[a];let s=this.textureLoader;if(o.uri){const l=i.manager.getHandler(o.uri);l!==null&&(s=l)}return this.loadTextureImage(n,a,s)}loadTextureImage(n,t,i){const r=this,a=this.json,o=a.textures[n],s=a.images[t],l=(s.uri||s.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const u=this.loadImageSource(t,i).then(function(g){g.flipY=!1,g.name=o.name||s.name||"",g.name===""&&typeof s.uri=="string"&&s.uri.startsWith("data:image/")===!1&&(g.name=s.uri);const _=(a.samplers||{})[o.sampler]||{};return g.magFilter=ca[_.magFilter]||ht,g.minFilter=ca[_.minFilter]||jt,g.wrapS=la[_.wrapS]||Vn,g.wrapT=la[_.wrapT]||Vn,g.generateMipmaps=!g.isCompressedTexture&&g.minFilter!==yt&&g.minFilter!==ht,r.associations.set(g,{textures:n}),g}).catch(function(){return null});return this.textureCache[l]=u,u}loadImageSource(n,t){const i=this,r=this.json,a=this.options;if(this.sourceCache[n]!==void 0)return this.sourceCache[n].then(d=>d.clone());const o=r.images[n],s=self.URL||self.webkitURL;let l=o.uri||"",u=!1;if(o.bufferView!==void 0)l=i.getDependency("bufferView",o.bufferView).then(function(d){u=!0;const _=new Blob([d],{type:o.mimeType});return l=s.createObjectURL(_),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+n+" is missing URI and bufferView");const g=Promise.resolve(l).then(function(d){return new Promise(function(_,x){let D=_;t.isImageBitmapLoader===!0&&(D=function(T){const p=new Wn(T);p.needsUpdate=!0,_(p)}),t.load(xn.resolveURL(d,a.path),D,void 0,x)})}).then(function(d){return u===!0&&s.revokeObjectURL(l),Ct(d,o),d.userData.mimeType=o.mimeType||mp(o.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),d});return this.sourceCache[n]=g,g}assignTexture(n,t,i,r){const a=this;return this.getDependency("texture",i.index).then(function(o){if(!o)return null;if(i.texCoord!==void 0&&i.texCoord>0&&(o=o.clone(),o.channel=i.texCoord),a.extensions[Be.KHR_TEXTURE_TRANSFORM]){const s=i.extensions!==void 0?i.extensions[Be.KHR_TEXTURE_TRANSFORM]:void 0;if(s){const l=a.associations.get(o);o=a.extensions[Be.KHR_TEXTURE_TRANSFORM].extendTexture(o,s),a.associations.set(o,l)}}return r!==void 0&&(o.colorSpace=r),n[t]=o,o})}assignFinalMaterial(n){const t=n.geometry;let i=n.material;const r=t.attributes.tangent===void 0,a=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(n.isPoints){const s="PointsMaterial:"+i.uuid;let l=this.cache.get(s);l||(l=new Ts,ni.prototype.copy.call(l,i),l.color.copy(i.color),l.map=i.map,l.sizeAttenuation=!1,this.cache.add(s,l)),i=l}else if(n.isLine){const s="LineBasicMaterial:"+i.uuid;let l=this.cache.get(s);l||(l=new Ms,ni.prototype.copy.call(l,i),l.color.copy(i.color),l.map=i.map,this.cache.add(s,l)),i=l}if(r||a||o){let s="ClonedMaterial:"+i.uuid+":";r&&(s+="derivative-tangents:"),a&&(s+="vertex-colors:"),o&&(s+="flat-shading:");let l=this.cache.get(s);l||(l=i.clone(),a&&(l.vertexColors=!0),o&&(l.flatShading=!0),r&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(s,l),this.associations.set(l,this.associations.get(i))),i=l}n.material=i}getMaterialType(){return An}loadMaterial(n){const t=this,i=this.json,r=this.extensions,a=i.materials[n];let o;const s={},l=a.extensions||{},u=[];if(l[Be.KHR_MATERIALS_UNLIT]){const d=r[Be.KHR_MATERIALS_UNLIT];o=d.getMaterialType(),u.push(d.extendParams(s,a,t))}else{const d=a.pbrMetallicRoughness||{};if(s.color=new Ke(1,1,1),s.opacity=1,Array.isArray(d.baseColorFactor)){const _=d.baseColorFactor;s.color.setRGB(_[0],_[1],_[2],xt),s.opacity=_[3]}d.baseColorTexture!==void 0&&u.push(t.assignTexture(s,"map",d.baseColorTexture,Zt)),s.metalness=d.metallicFactor!==void 0?d.metallicFactor:1,s.roughness=d.roughnessFactor!==void 0?d.roughnessFactor:1,d.metallicRoughnessTexture!==void 0&&(u.push(t.assignTexture(s,"metalnessMap",d.metallicRoughnessTexture)),u.push(t.assignTexture(s,"roughnessMap",d.metallicRoughnessTexture))),o=this._invokeOne(function(_){return _.getMaterialType&&_.getMaterialType(n)}),u.push(Promise.all(this._invokeAll(function(_){return _.extendMaterialParams&&_.extendMaterialParams(n,s)})))}a.doubleSided===!0&&(s.side=wt);const g=a.alphaMode||ui.OPAQUE;if(g===ui.BLEND?(s.transparent=!0,s.depthWrite=!1):(s.transparent=!1,g===ui.MASK&&(s.alphaTest=a.alphaCutoff!==void 0?a.alphaCutoff:.5)),a.normalTexture!==void 0&&o!==rn&&(u.push(t.assignTexture(s,"normalMap",a.normalTexture)),s.normalScale=new ft(1,1),a.normalTexture.scale!==void 0)){const d=a.normalTexture.scale;s.normalScale.set(d,d)}if(a.occlusionTexture!==void 0&&o!==rn&&(u.push(t.assignTexture(s,"aoMap",a.occlusionTexture)),a.occlusionTexture.strength!==void 0&&(s.aoMapIntensity=a.occlusionTexture.strength)),a.emissiveFactor!==void 0&&o!==rn){const d=a.emissiveFactor;s.emissive=new Ke().setRGB(d[0],d[1],d[2],xt)}return a.emissiveTexture!==void 0&&o!==rn&&u.push(t.assignTexture(s,"emissiveMap",a.emissiveTexture,Zt)),Promise.all(u).then(function(){const d=new o(s);return a.name&&(d.name=a.name),Ct(d,a),t.associations.set(d,{materials:n}),a.extensions&&Yt(r,d,a),d})}createUniqueName(n){const t=As.sanitizeNodeName(n||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(n){const t=this,i=this.extensions,r=this.primitiveCache;function a(s){return i[Be.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(s,t).then(function(l){return fa(l,s,t)})}const o=[];for(let s=0,l=n.length;s<l;s++){const u=n[s],g=hp(u),d=r[g];if(d)o.push(d.promise);else{let _;u.extensions&&u.extensions[Be.KHR_DRACO_MESH_COMPRESSION]?_=a(u):_=fa(new Rn,u,t),r[g]={primitive:u,promise:_},o.push(_)}}return Promise.all(o)}loadMesh(n){const t=this,i=this.json,r=this.extensions,a=i.meshes[n],o=a.primitives,s=[];for(let l=0,u=o.length;l<u;l++){const g=o[l].material===void 0?up(this.cache):this.getDependency("material",o[l].material);s.push(g)}return s.push(t.loadGeometries(o)),Promise.all(s).then(function(l){const u=l.slice(0,l.length-1),g=l[l.length-1],d=[];for(let x=0,D=g.length;x<D;x++){const T=g[x],p=o[x];let f;const C=u[x];if(p.mode===Tt.TRIANGLES||p.mode===Tt.TRIANGLE_STRIP||p.mode===Tt.TRIANGLE_FAN||p.mode===void 0)f=a.isSkinnedMesh===!0?new Rs(T,C):new pt(T,C),f.isSkinnedMesh===!0&&f.normalizeSkinWeights(),p.mode===Tt.TRIANGLE_STRIP?f.geometry=oa(f.geometry,Ba):p.mode===Tt.TRIANGLE_FAN&&(f.geometry=oa(f.geometry,Ai));else if(p.mode===Tt.LINES)f=new bs(T,C);else if(p.mode===Tt.LINE_STRIP)f=new Cs(T,C);else if(p.mode===Tt.LINE_LOOP)f=new Ps(T,C);else if(p.mode===Tt.POINTS)f=new Ls(T,C);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+p.mode);Object.keys(f.geometry.morphAttributes).length>0&&pp(f,a),f.name=t.createUniqueName(a.name||"mesh_"+n),Ct(f,a),p.extensions&&Yt(r,f,p),t.assignFinalMaterial(f),d.push(f)}for(let x=0,D=d.length;x<D;x++)t.associations.set(d[x],{meshes:n,primitives:x});if(d.length===1)return a.extensions&&Yt(r,d[0],a),d[0];const _=new ii;a.extensions&&Yt(r,_,a),t.associations.set(_,{meshes:n});for(let x=0,D=d.length;x<D;x++)_.add(d[x]);return _})}loadCamera(n){let t;const i=this.json.cameras[n],r=i[i.type];if(!r){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return i.type==="perspective"?t=new an(Fn.radToDeg(r.yfov),r.aspectRatio||1,r.znear||1,r.zfar||2e6):i.type==="orthographic"&&(t=new wi(-r.xmag,r.xmag,r.ymag,-r.ymag,r.znear,r.zfar)),i.name&&(t.name=this.createUniqueName(i.name)),Ct(t,i),Promise.resolve(t)}loadSkin(n){const t=this.json.skins[n],i=[];for(let r=0,a=t.joints.length;r<a;r++)i.push(this._loadNodeShallow(t.joints[r]));return t.inverseBindMatrices!==void 0?i.push(this.getDependency("accessor",t.inverseBindMatrices)):i.push(null),Promise.all(i).then(function(r){const a=r.pop(),o=r,s=[],l=[];for(let u=0,g=o.length;u<g;u++){const d=o[u];if(d){s.push(d);const _=new At;a!==null&&_.fromArray(a.array,u*16),l.push(_)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[u])}return new ws(s,l)})}loadAnimation(n){const t=this.json,i=this,r=t.animations[n],a=r.name?r.name:"animation_"+n,o=[],s=[],l=[],u=[],g=[];for(let d=0,_=r.channels.length;d<_;d++){const x=r.channels[d],D=r.samplers[x.sampler],T=x.target,p=T.node,f=r.parameters!==void 0?r.parameters[D.input]:D.input,C=r.parameters!==void 0?r.parameters[D.output]:D.output;T.node!==void 0&&(o.push(this.getDependency("node",p)),s.push(this.getDependency("accessor",f)),l.push(this.getDependency("accessor",C)),u.push(D),g.push(T))}return Promise.all([Promise.all(o),Promise.all(s),Promise.all(l),Promise.all(u),Promise.all(g)]).then(function(d){const _=d[0],x=d[1],D=d[2],T=d[3],p=d[4],f=[];for(let M=0,A=_.length;M<A;M++){const b=_[M],P=x[M],N=D[M],X=T[M],m=p[M];if(b===void 0)continue;b.updateMatrix&&b.updateMatrix();const S=i._createAnimationTracks(b,P,N,X,m);if(S)for(let U=0;U<S.length;U++)f.push(S[U])}const C=new Ds(a,void 0,f);return Ct(C,r),C})}createNodeMesh(n){const t=this.json,i=this,r=t.nodes[n];return r.mesh===void 0?null:i.getDependency("mesh",r.mesh).then(function(a){const o=i._getNodeRef(i.meshCache,r.mesh,a);return r.weights!==void 0&&o.traverse(function(s){if(s.isMesh)for(let l=0,u=r.weights.length;l<u;l++)s.morphTargetInfluences[l]=r.weights[l]}),o})}loadNode(n){const t=this.json,i=this,r=t.nodes[n],a=i._loadNodeShallow(n),o=[],s=r.children||[];for(let u=0,g=s.length;u<g;u++)o.push(i.getDependency("node",s[u]));const l=r.skin===void 0?Promise.resolve(null):i.getDependency("skin",r.skin);return Promise.all([a,Promise.all(o),l]).then(function(u){const g=u[0],d=u[1],_=u[2];_!==null&&g.traverse(function(x){x.isSkinnedMesh&&x.bind(_,_p)});for(let x=0,D=d.length;x<D;x++)g.add(d[x]);return g})}_loadNodeShallow(n){const t=this.json,i=this.extensions,r=this;if(this.nodeCache[n]!==void 0)return this.nodeCache[n];const a=t.nodes[n],o=a.name?r.createUniqueName(a.name):"",s=[],l=r._invokeOne(function(u){return u.createNodeMesh&&u.createNodeMesh(n)});return l&&s.push(l),a.camera!==void 0&&s.push(r.getDependency("camera",a.camera).then(function(u){return r._getNodeRef(r.cameraCache,a.camera,u)})),r._invokeAll(function(u){return u.createNodeAttachment&&u.createNodeAttachment(n)}).forEach(function(u){s.push(u)}),this.nodeCache[n]=Promise.all(s).then(function(u){let g;if(a.isBone===!0?g=new Us:u.length>1?g=new ii:u.length===1?g=u[0]:g=new Ha,g!==u[0])for(let d=0,_=u.length;d<_;d++)g.add(u[d]);if(a.name&&(g.userData.name=a.name,g.name=o),Ct(g,a),a.extensions&&Yt(i,g,a),a.matrix!==void 0){const d=new At;d.fromArray(a.matrix),g.applyMatrix4(d)}else a.translation!==void 0&&g.position.fromArray(a.translation),a.rotation!==void 0&&g.quaternion.fromArray(a.rotation),a.scale!==void 0&&g.scale.fromArray(a.scale);if(!r.associations.has(g))r.associations.set(g,{});else if(a.mesh!==void 0&&r.meshCache.refs[a.mesh]>1){const d=r.associations.get(g);r.associations.set(g,{...d})}return r.associations.get(g).nodes=n,g}),this.nodeCache[n]}loadScene(n){const t=this.extensions,i=this.json.scenes[n],r=this,a=new ii;i.name&&(a.name=r.createUniqueName(i.name)),Ct(a,i),i.extensions&&Yt(t,a,i);const o=i.nodes||[],s=[];for(let l=0,u=o.length;l<u;l++)s.push(r.getDependency("node",o[l]));return Promise.all(s).then(function(l){for(let g=0,d=l.length;g<d;g++)a.add(l[g]);const u=g=>{const d=new Map;for(const[_,x]of r.associations)(_ instanceof ni||_ instanceof Wn)&&d.set(_,x);return g.traverse(_=>{const x=r.associations.get(_);x!=null&&d.set(_,x)}),d};return r.associations=u(a),a})}_createAnimationTracks(n,t,i,r,a){const o=[],s=n.name?n.name:n.uuid,l=[];Bt[a.path]===Bt.weights?n.traverse(function(_){_.morphTargetInfluences&&l.push(_.name?_.name:_.uuid)}):l.push(s);let u;switch(Bt[a.path]){case Bt.weights:u=Nr;break;case Bt.rotation:u=yr;break;case Bt.translation:case Bt.scale:u=Ir;break;default:switch(i.itemSize){case 1:u=Nr;break;case 2:case 3:default:u=Ir;break}break}const g=r.interpolation!==void 0?fp[r.interpolation]:Va,d=this._getArrayFromAccessor(i);for(let _=0,x=l.length;_<x;_++){const D=new u(l[_]+"."+Bt[a.path],t.array,d,g);r.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(D),o.push(D)}return o}_getArrayFromAccessor(n){let t=n.array;if(n.normalized){const i=Li(t.constructor),r=new Float32Array(t.length);for(let a=0,o=t.length;a<o;a++)r[a]=t[a]*i;t=r}return t}_createCubicSplineTrackInterpolant(n){n.createInterpolant=function(i){const r=this instanceof yr?lp:Ya;return new r(this.times,this.values,this.getValueSize()/3,i)},n.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function vp(e,n,t){const i=n.attributes,r=new Fs;if(i.POSITION!==void 0){const s=t.json.accessors[i.POSITION],l=s.min,u=s.max;if(l!==void 0&&u!==void 0){if(r.set(new De(l[0],l[1],l[2]),new De(u[0],u[1],u[2])),s.normalized){const g=Li(on[s.componentType]);r.min.multiplyScalar(g),r.max.multiplyScalar(g)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const a=n.targets;if(a!==void 0){const s=new De,l=new De;for(let u=0,g=a.length;u<g;u++){const d=a[u];if(d.POSITION!==void 0){const _=t.json.accessors[d.POSITION],x=_.min,D=_.max;if(x!==void 0&&D!==void 0){if(l.setX(Math.max(Math.abs(x[0]),Math.abs(D[0]))),l.setY(Math.max(Math.abs(x[1]),Math.abs(D[1]))),l.setZ(Math.max(Math.abs(x[2]),Math.abs(D[2]))),_.normalized){const T=Li(on[_.componentType]);l.multiplyScalar(T)}s.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}r.expandByVector(s)}e.boundingBox=r;const o=new Os;r.getCenter(o.center),o.radius=r.min.distanceTo(r.max)/2,e.boundingSphere=o}function fa(e,n,t){const i=n.attributes,r=[];function a(o,s){return t.getDependency("accessor",o).then(function(l){e.setAttribute(s,l)})}for(const o in i){const s=Pi[o]||o.toLowerCase();s in e.attributes||r.push(a(i[o],s))}if(n.indices!==void 0&&!e.index){const o=t.getDependency("accessor",n.indices).then(function(s){e.setIndex(s)});r.push(o)}return at.workingColorSpace!==xt&&"COLOR_0"in i&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${at.workingColorSpace}" not supported.`),Ct(e,n),vp(e,n,t),Promise.all(r).then(function(){return n.targets!==void 0?dp(e,n.targets,t):e})}const Sp=new URL(""+new URL("open-nWGD2hyb.glb",import.meta.url).href,import.meta.url).href,ua=3.88,_n={position:[0,-3.78985,24.21046],rotation:[.149987,0,0],lens:88.6082},da=new yi().setFromAxisAngle(new De(1,0,0),-Math.PI/2);function pa(e){const n=new Set,t=new Set,i=new Set;e.traverse(r=>{if(r instanceof pt){n.add(r.geometry);for(const a of Array.isArray(r.material)?r.material:[r.material]){t.add(a);for(const o of Object.values(a))o instanceof Wn&&i.add(o)}}});for(const r of n)r.dispose();for(const r of t)r.dispose();for(const r of i)r.dispose(),typeof ImageBitmap<"u"&&r.source.data instanceof ImageBitmap&&r.source.data.close()}function pi(e){const n=e.geometry.getAttribute("position"),t=new Map;for(let s=0;s<n.count;s++){const l=n.getX(s),u=t.get(l)??[];u.push(s),t.set(l,u)}const i=[...t].sort(([s],[l])=>s-l).map(([,s])=>s.sort((l,u)=>n.getZ(l)-n.getZ(u))),r=2,a=Array.from({length:r},(s,l)=>Array.from({length:r},(u,g)=>{const d=i[Math.round(g/(r-1)*(i.length-1))];return d?.[Math.round(l/(r-1)*(d.length-1))]??0})),o=new De;return s=>a.map(l=>l.map(u=>(e.getVertexPosition(u,o),o.applyMatrix4(e.matrixWorld).project(s),{x:(o.x+1)/2,y:(1-o.y)/2})))}function ha(e){const n=e[0],t=e.at(-1),i=n?.[0],r=n?.at(-1),a=t?.[0],o=t?.at(-1);if(!i||!r||!a||!o)throw new Error("Empty paper mesh");return{topLeft:i,topRight:r,bottomLeft:a,bottomRight:o}}function wn(e,n){const t=new Vt(new Float32Array(e.geometry.getAttribute("position").count*3),3);return e.geometry.setAttribute(n,t),t}function Dn(e,n,t){const i=new At().multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse).multiply(e.matrixWorld),r=new De,a=new dt;for(let o=0;o<n.count;o+=1)e.getVertexPosition(o,r),a.set(r.x,r.y,r.z,1).applyMatrix4(i),n.setXYZ(o,a.x,a.y,a.w);n.needsUpdate=!0}function Un(e,n){const t=e.morphTargetInfluences;if(t)for(let i=0;i<t.length;i+=1)t[i]=Math.max(0,1-Math.abs(n*4-(i+1)))}function xp(e,n,t,i,r){const a=e.geometry.getAttribute("position");let o=-1/0;for(let _=0;_<a.count;_++)o=Math.max(o,a.getX(_));const s=Array.from({length:a.count},(_,x)=>x).filter(_=>a.getX(_)>=o-1e-5).sort((_,x)=>a.getZ(_)-a.getZ(x)),l=Array.from({length:9},()=>new De),u={value:0},g={value:l};for(const _ of[n,t]){if(!(_.material instanceof An))continue;const x=_.material.clone();_.material=x;const D=_===t;x.customProgramCacheKey=()=>D?"paper-shadow-right":"paper-shadow-left",x.onBeforeCompile=T=>{T.uniforms.sheetEdge=g,T.uniforms.sheetShadow=u,T.uniforms.paperInk=D?i.right:i.left,T.uniforms.printTurning=r,T.vertexShader=`attribute vec3 inkFrontFrame; varying vec3 flatInkFrame; varying vec3 paperPosition;
`+T.vertexShader.replace("#include <uv_vertex>",`#include <uv_vertex>
flatInkFrame=inkFrontFrame;`).replace("#include <project_vertex>",`#include <project_vertex>
paperPosition=(modelMatrix*vec4(transformed,1.)).xyz;`),T.fragmentShader=`uniform vec3 sheetEdge[9]; uniform float sheetShadow; varying vec3 paperPosition;
uniform sampler2D paperInk; uniform float printTurning; varying vec3 flatInkFrame;
float castCoverage(float x,float extent,float blur){
          return (1.-smoothstep(extent-blur,extent+blur,x))*smoothstep(-.08,.11,x);
        }
        float foldCoverage(float x,float reach,float width){
          return (1.-smoothstep(reach,reach+width,-x))*(1.-smoothstep(-.022,.08,x));
        }
`+T.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
        if(printTurning>0.){
          vec4 printed=texture2D(paperInk,flatInkFrame.xy/flatInkFrame.z*.5+.5);
          diffuseColor.rgb=mix(diffuseColor.rgb,printed.rgb,printed.a);
        }
        float row = clamp((paperPosition.z+${ua/2})/${ua}*8.,0.,7.9999);
        int i=int(floor(row));
        vec3 tip=mix(sheetEdge[i],sheetEdge[i+1],fract(row));
        float height=max(tip.y-paperPosition.y,0.);
        float x=paperPosition.x;
        // Rows can cross the spine at different times as a leaf flexes.
        float rightSide=smoothstep(-.18,.18,tip.x);
        float extent=abs(tip.x)*.96;
        float blur=.06+height*.24;
        float coverage=mix(castCoverage(-x,extent,blur),castCoverage(x,extent,blur),rightSide);
        // The far end receives more fill than the near fold.
        float nearFold=smoothstep(-1.7,1.8,paperPosition.z);
        float contact=mix(.67,1.,nearFold);
        float shade=clamp(sheetShadow*coverage*contact,0.,1.);
        diffuseColor.rgb*=mix(vec3(1.),vec3(.37,.18,.06),shade);
        // The paper curves over the binding, blocking fill on the other side too.
        float lean=smoothstep(0.,.25,abs(tip.x));
        float creaseWidth=mix(.3,1.33,nearFold)*mix(.3,1.,lean);
        float foldReach=.22*nearFold*nearFold*nearFold*lean;
        float crease=mix(foldCoverage(-x,foldReach,creaseWidth),
          foldCoverage(x,foldReach,creaseWidth),rightSide);
        float occlusion=clamp(sheetShadow*crease*mix(.36,1.1,nearFold)*lean,0.,1.);
        diffuseColor.rgb*=mix(vec3(1.),vec3(.31,.135,.045),occlusion);
        `)}}const d=new De;return _=>{u.value=Math.min(1,8*_,8*(1-_)),l.forEach((x,D)=>{const T=s[Math.round(D/8*(s.length-1))];T!==void 0&&(e.getVertexPosition(T,d),x.copy(e.localToWorld(d)))})}}function Ep(e,n,t,i,r){const a=new Od({alpha:!0,antialias:!0,powerPreference:"low-power"});a.setClearColor(0,0);const o=a.getContext(),s=o.getExtension("WEBGL_debug_renderer_info"),l=s&&/swiftshader|llvmpipe|software rasterizer|basic render/i.test(String(o.getParameter(s.UNMASKED_RENDERER_WEBGL))),u=a.domElement;u.setAttribute("aria-hidden","true"),Object.assign(u.style,{width:"100%",height:"100%",display:"block"}),e.append(u);const g=new Bs,d=new _a(new Uint8Array([0,0,0,0]),1,1);d.needsUpdate=!0;const _={left:{value:d},right:{value:d},front:{value:d},back:{value:d}},x={value:0};function D(Z,Te){if(!(Te&&Z.value.source.data===Te))if(Z.value!==d&&Z.value.dispose(),Te){const Le=new Hs(Te);Le.colorSpace=Zt,Le.anisotropy=Math.min(4,a.capabilities.getMaxAnisotropy()),Z.value=Le}else Z.value=d}const T=new an(30,1,.1,65),p=new Gs(16777215,12038579,2.05);p.color.setRGB(1.035,1.09,1.125);const f=new Ri(16777215,1.4);f.position.set(-.6,8,.5);const C=new Ri(16777215,.42);C.position.set(4,4,4);const M=new pt(new Ii(15,12),new Ot({transparent:!0,depthWrite:!1,vertexShader:`varying vec2 local;
        void main(){ local=position.xy; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }`,fragmentShader:`varying vec2 local;
        void main(){
          vec2 d=abs(local-vec2(.015,-.075))-vec2(3.42,1.96);
          float outside=length(max(d,0.))+min(max(d.x,d.y),0.);
          float shadow=.64*exp(-max(outside,0.)*10.)+.12*exp(-max(outside,0.)*3.);
          float bounce=.46*exp(-pow((local.y+2.12)/.45,2.)-pow(local.x/1.65,4.));
          float alpha=shadow+bounce*(1.-shadow);
          vec3 color=(shadow*vec3(.014,.002,.003)+(1.-shadow)*bounce*vec3(.45,.105,.095))/max(.0001,alpha);
          gl_FragColor=vec4(color,alpha);
        }`}));M.rotation.x=-Math.PI/2,M.position.y=-.085,M.renderOrder=-1,g.add(p,f,C,M);let A=n,b,P,N,X,m,S,U,V=!1,G=!1,W=0,K=1,B=1,H=0,j=null,ge;const me=new At;function xe(){const Z=Fn.clamp((1920-K)/640,0,1),Te=1+.085474*Z;b&&(b.scale.x=Te),M.scale.x=Te,T.position.fromArray(_n.position),T.position.y+=Z*(-1.795895-_n.position[1]),T.position.applyQuaternion(da);const[Le,Ie,Fe]=_n.rotation;if(T.quaternion.setFromEuler(new Ni(Le+Z*(.069131-Le),Ie,Fe,"ZYX")).premultiply(da),T.aspect=K/B,T.fov=Fn.radToDeg(2*Math.atan(18/((_n.lens+Z*(86.64898-_n.lens))*T.aspect))),T.updateProjectionMatrix(),T.updateMatrixWorld(),A&&b&&m&&U){b.updateMatrixWorld(!0);const He=[...m(T).flat(),...U(T).flat()],Me=Math.min(...He.map(v=>v.x)),ke=Math.max(...He.map(v=>v.x)),E=Math.min(...He.map(v=>v.y)),qe=Math.max(...He.map(v=>v.y)),Ve=Vs(K,B),Xe=Ve.width/(K*(ke-Me)),le=Ve.height/(B*(qe-E));me.set(Xe,0,0,Xe*(1-Me-ke),0,le,0,le*(E+qe-1),0,0,1,0,0,0,0,1),T.projectionMatrix.premultiply(me),T.projectionMatrixInverse.copy(T.projectionMatrix).invert()}}function Ge(Z){if(W=0,V||G||!b||!N||!m||!S)return;let Te=null;if(ge&&j){const Fe=Math.min((Z-ge.start)/670,1),He=Fe*Fe*(3-2*Fe),Me=j.plan.direction>0?1:0;H=Fn.lerp(ge.from,Me,He),Fe===1&&(ge=void 0,Te=j)}Un(N,H),e.dataset.turning=j?"true":"false",x.value=j?1:0,X?.(H),xe(),a.render(g,T);const Le=m(T),Ie=S(T);e.dispatchEvent(new CustomEvent("grimoire-projection",{bubbles:!0,detail:{left:ha(Le),right:ha(Ie)}})),Te&&r(Te),ge&&ye()}function ye(){!V&&!G&&!W&&(W=requestAnimationFrame(Ge))}function rt(Z){Z.preventDefault(),G=!0,cancelAnimationFrame(W),W=0,i(!1)}function nt(){G=!1,!(!b||!m||!S)&&(Ge(performance.now()),i(!0))}function z(){!e.clientWidth||!e.clientHeight||(K=e.clientWidth,B=e.clientHeight,a.setPixelRatio(l?Math.min(1,1024/K):Math.min(window.devicePixelRatio||1,1.5,2200/K)),a.setSize(K,B,!1),ye())}function $(Z){A=Z,ye()}function de(Z){if(j===Z)return;j=Z;for(const Le of Fr)D(_[Le],Z?.ink[Le]??null);const Te=performance.now();H=Z?.plan.direction===-1?1:0,ge=Z?{start:Te,from:H}:void 0,cancelAnimationFrame(W),Z&&P?.(),Ge(Te)}const Pe=new ResizeObserver(z);return Pe.observe(e),u.addEventListener("webglcontextlost",rt),u.addEventListener("webglcontextrestored",nt),z(),new Bd().load(Sp,({scene:Z})=>{if(V)return pa(Z);b=Z;const Te=Z.getObjectByName("LeftPage"),Le=Z.getObjectByName("RightPage");if(!(Te instanceof pt&&Le instanceof pt)){i(!1);return}const Ie=wn(Le,"inkFrontFrame"),Fe=wn(Le,"inkBackFrame"),He=wn(Te,"inkFrontFrame");if(Le.material instanceof An){const ke=Le.material;ke.onBeforeCompile=E=>{E.uniforms.frontInk=_.front,E.uniforms.backInk=_.back,E.uniforms.printTurning=x,E.vertexShader=`attribute vec3 inkFrontFrame; attribute vec3 inkBackFrame; varying vec3 frontFrame; varying vec3 backFrame;
            ${E.vertexShader.replace("#include <uv_vertex>",`#include <uv_vertex>
frontFrame=inkFrontFrame;backFrame=inkBackFrame;`)}`,E.fragmentShader=`uniform sampler2D frontInk; uniform sampler2D backInk; uniform float printTurning; varying vec3 frontFrame; varying vec3 backFrame;
            ${E.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
              if(printTurning>0.){
                vec4 ink;
                if(gl_FrontFacing){
                  ink=texture2D(frontInk,frontFrame.xy/frontFrame.z*.5+.5);
                }else{
                  diffuseColor.rgb*=vec3(.73,.65,.54);
                  ink=texture2D(backInk,backFrame.xy/backFrame.z*.5+.5);
                }
                diffuseColor.rgb=mix(diffuseColor.rgb,ink.rgb,ink.a);
              }`)}`}}N=Le,m=pi(Te),S=pi(Le);const Me=Z.getObjectByName("UnderPage");if(Z.traverse(ke=>{if(!(ke instanceof pt)||!(ke.material instanceof An))return;const E=ke.material.name;if(E==="Cut edges"){ke.material.onBeforeCompile=le=>{le.fragmentShader=le.fragmentShader.replace("#include <opaque_fragment>",`
              vec3 edgeNormal=inverseTransformDirection(normal,viewMatrix);
              float endGrain=smoothstep(.44,.94,abs(edgeNormal.z));
              outgoingLight*=mix(vec3(1.),vec3(.57,.42,.33),endGrain);
              #include <opaque_fragment>`)},ke.material.customProgramCacheKey=()=>"paper-stack-edges";return}const qe=E==="Antique gold";if(!qe&&E!=="Oxblood leather")return;const{dye:Ve,light:Xe}=ao("",t);ke.material.onBeforeCompile=le=>{!qe&&Ve&&(le.fragmentShader=le.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
              float leatherGrain = dot(diffuseColor.rgb, vec3(.55,.30,.15));
              diffuseColor.rgb = leatherGrain * vec3(${Ve});`)),le.fragmentShader=le.fragmentShader.replace("#include <opaque_fragment>",`
            vec3 reflected=inverseTransformDirection(reflect(-normalize(vViewPosition),normal),viewMatrix);
            float angle=atan(reflected.x,reflected.y);
            float strip=exp(-.5*pow((angle-${qe?".075":".74"})/(${qe?".21+.22":".075+.16"}*roughnessFactor),2.))*smoothstep(-.5,.1,reflected.y);
            ${qe?"outgoingLight=outgoingLight*vec3(.93,.94,1.22)+vec3(.39,.29,.15)*strip;":`outgoingLight+=vec3(${Xe})*strip;`}
            #include <opaque_fragment>`)},ke.material.customProgramCacheKey=()=>qe?"foil-studio":`leather-studio-${t}`}),Me instanceof pt){Me.geometry===Te.geometry&&(Me.geometry=Me.geometry.clone());const ke=wn(Me,"inkFrontFrame");P=()=>{xe(),Z.updateMatrixWorld(!0),Dn(Te,He,T),Dn(Me,ke,T),Un(Le,0),Dn(Le,Ie,T),Un(Le,1),Dn(Le,Fe,T),Un(Le,H)},U=pi(Me),X=xp(Le,Te,Me,_,x)}g.add(Z),Ge(performance.now()),i(!G)},void 0,()=>{V||i(!1)}),{setFittedRead:$,setTurn:de,dispose(){V=!0,Pe.disconnect(),cancelAnimationFrame(W),u.removeEventListener("webglcontextlost",rt),u.removeEventListener("webglcontextrestored",nt);for(const Z of Fr)_[Z].value!==d&&_[Z].value.dispose();d.dispose(),b&&pa(b),M.geometry.dispose(),M.material.dispose(),a.dispose(),u.remove()}}}function Rp(e){const n=jn(null),t=jn(e);t.current=e;const i=jn(null);return io(()=>{if(n.current){try{i.current=Ep(n.current,t.current.fittedRead,t.current.binding,r=>t.current.onReady(r),r=>t.current.onTurnDone(r))}catch{t.current.onReady(!1)}return()=>{i.current?.dispose(),i.current=null}}},[]),zi(()=>{i.current?.setFittedRead(e.fittedRead)},[e.fittedRead]),zi(()=>{i.current?.setTurn(e.turn)},[e.turn]),ro("div",{ref:n,style:{position:"absolute",inset:0}})}export{Rp as default};
