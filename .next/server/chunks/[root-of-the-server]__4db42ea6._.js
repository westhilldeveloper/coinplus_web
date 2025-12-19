module.exports=[70406,(e,t,a)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},93695,(e,t,a)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},18622,(e,t,a)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},56704,(e,t,a)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,a)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},24725,(e,t,a)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},24361,(e,t,a)=>{t.exports=e.x("util",()=>require("util"))},14747,(e,t,a)=>{t.exports=e.x("path",()=>require("path"))},41013,e=>{"use strict";var t=e.i(47909),a=e.i(74017),r=e.i(96250),i=e.i(59756),s=e.i(61916),n=e.i(14444),l=e.i(37092),d=e.i(69741),o=e.i(16795),c=e.i(87718),u=e.i(95169),p=e.i(47587),v=e.i(66012),h=e.i(49663),x=e.i(26937),m=e.i(10372),f=e.i(93695);e.i(52474);var g=e.i(220),R=e.i(89171),b=e.i(29508);async function E(e){try{let{to:t,subject:a,formData:r}=await e.json(),i=b.default.createTransport({service:"gmail",auth:{user:process.env.EMAIL_USER,pass:process.env.EMAIL_PASSWORD}}),s=`
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(to right, #3b82f6, #1d4ed8); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #1f2937; }
            .value { color: #4b5563; }
            .divider { border-top: 2px solid #e5e7eb; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Enquiry - Margadarsi Chit Fund</h1>
              <p>Submitted on: ${new Date().toLocaleString()}</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${r.name}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${r.email}</div>
              </div>
              <div class="field">
                <div class="label">Phone Number:</div>
                <div class="value">${r.phone}</div>
              </div>
              <div class="field">
                <div class="label">Chit Value:</div>
                <div class="value">${r.chitValue}</div>
              </div>
              <div class="field">
                <div class="label">Tenure:</div>
                <div class="value">${r.tenure}</div>
              </div>
              <div class="field">
                <div class="label">Occupation:</div>
                <div class="value">${r.occupation}</div>
              </div>
              <div class="field">
                <div class="label">Monthly Income:</div>
                <div class="value">${r.monthlyIncome}</div>
              </div>
              <div class="field">
                <div class="label">State:</div>
                <div class="value">${r.state}</div>
              </div>
              <div class="field">
                <div class="label">Branch:</div>
                <div class="value">${r.branch}</div>
              </div>
              <div class="divider"></div>
              <div class="field">
                <div class="label">Additional Message:</div>
                <div class="value">${r.message||"No additional message provided."}</div>
              </div>
              <div class="field">
                <div class="label">Consent Given:</div>
                <div class="value">${r.consent?"Yes":"No"}</div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,n={from:`"Margadarsi Enquiry" <${process.env.EMAIL_USER}>`,to:t,subject:a,html:s};return await i.sendMail(n),R.NextResponse.json({success:!0,message:"Email sent successfully"})}catch(e){return console.error("Error sending email:",e),R.NextResponse.json({success:!1,error:e.message},{status:500})}}e.s(["POST",()=>E],26184);var w=e.i(26184);let y=new t.AppRouteRouteModule({definition:{kind:a.RouteKind.APP_ROUTE,page:"/api/send-email/route",pathname:"/api/send-email",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/app/api/send-email/route.js",nextConfigOutput:"",userland:w}),{workAsyncStorage:C,workUnitAsyncStorage:A,serverHooks:N}=y;function S(){return(0,r.patchFetch)({workAsyncStorage:C,workUnitAsyncStorage:A})}async function T(e,t,r){y.isDev&&(0,i.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let R="/api/send-email/route";R=R.replace(/\/index$/,"")||"/";let b=await y.prepare(e,t,{srcPage:R,multiZoneDraftMode:!1});if(!b)return t.statusCode=400,t.end("Bad Request"),null==r.waitUntil||r.waitUntil.call(r,Promise.resolve()),null;let{buildId:E,params:w,nextConfig:C,parsedUrl:A,isDraftMode:N,prerenderManifest:S,routerServerContext:T,isOnDemandRevalidate:P,revalidateOnlyGenerated:O,resolvedPathname:q,clientReferenceManifest:M,serverActionsManifest:k}=b,_=(0,d.normalizeAppPath)(R),j=!!(S.dynamicRoutes[_]||S.routes[q]),$=async()=>((null==T?void 0:T.render404)?await T.render404(e,t,A,!1):t.end("This page could not be found"),null);if(j&&!N){let e=!!S.routes[q],t=S.dynamicRoutes[_];if(t&&!1===t.fallback&&!e){if(C.experimental.adapterPath)return await $();throw new f.NoFallbackError}}let I=null;!j||y.isDev||N||(I="/index"===(I=q)?"/":I);let U=!0===y.isDev||!j,H=j&&!U;k&&M&&(0,n.setReferenceManifestsSingleton)({page:R,clientReferenceManifest:M,serverActionsManifest:k,serverModuleMap:(0,l.createServerModuleMap)({serverActionsManifest:k})});let D=e.method||"GET",F=(0,s.getTracer)(),L=F.getActiveScopeSpan(),K={params:w,prerenderManifest:S,renderOpts:{experimental:{authInterrupts:!!C.experimental.authInterrupts},cacheComponents:!!C.cacheComponents,supportsDynamicResponse:U,incrementalCache:(0,i.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:C.cacheLife,waitUntil:r.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,a,r)=>y.onRequestError(e,t,r,T)},sharedContext:{buildId:E}},B=new o.NodeNextRequest(e),V=new o.NodeNextResponse(t),G=c.NextRequestAdapter.fromNodeNextRequest(B,(0,c.signalFromNodeResponse)(t));try{let n=async e=>y.handle(G,K).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let a=F.getRootSpanAttributes();if(!a)return;if(a.get("next.span_type")!==u.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${a.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let r=a.get("next.route");if(r){let t=`${D} ${r}`;e.setAttributes({"next.route":r,"http.route":r,"next.span_name":t}),e.updateName(t)}else e.updateName(`${D} ${R}`)}),l=!!(0,i.getRequestMeta)(e,"minimalMode"),d=async i=>{var s,d;let o=async({previousCacheEntry:a})=>{try{if(!l&&P&&O&&!a)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let s=await n(i);e.fetchMetrics=K.renderOpts.fetchMetrics;let d=K.renderOpts.pendingWaitUntil;d&&r.waitUntil&&(r.waitUntil(d),d=void 0);let o=K.renderOpts.collectedTags;if(!j)return await (0,v.sendResponse)(B,V,s,K.renderOpts.pendingWaitUntil),null;{let e=await s.blob(),t=(0,h.toNodeOutgoingHttpHeaders)(s.headers);o&&(t[m.NEXT_CACHE_TAGS_HEADER]=o),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let a=void 0!==K.renderOpts.collectedRevalidate&&!(K.renderOpts.collectedRevalidate>=m.INFINITE_CACHE)&&K.renderOpts.collectedRevalidate,r=void 0===K.renderOpts.collectedExpire||K.renderOpts.collectedExpire>=m.INFINITE_CACHE?void 0:K.renderOpts.collectedExpire;return{value:{kind:g.CachedRouteKind.APP_ROUTE,status:s.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:a,expire:r}}}}catch(t){throw(null==a?void 0:a.isStale)&&await y.onRequestError(e,t,{routerKind:"App Router",routePath:R,routeType:"route",revalidateReason:(0,p.getRevalidateReason)({isStaticGeneration:H,isOnDemandRevalidate:P})},T),t}},c=await y.handleResponse({req:e,nextConfig:C,cacheKey:I,routeKind:a.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:S,isRoutePPREnabled:!1,isOnDemandRevalidate:P,revalidateOnlyGenerated:O,responseGenerator:o,waitUntil:r.waitUntil,isMinimalMode:l});if(!j)return null;if((null==c||null==(s=c.value)?void 0:s.kind)!==g.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==c||null==(d=c.value)?void 0:d.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});l||t.setHeader("x-nextjs-cache",P?"REVALIDATED":c.isMiss?"MISS":c.isStale?"STALE":"HIT"),N&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let u=(0,h.fromNodeOutgoingHttpHeaders)(c.value.headers);return l&&j||u.delete(m.NEXT_CACHE_TAGS_HEADER),!c.cacheControl||t.getHeader("Cache-Control")||u.get("Cache-Control")||u.set("Cache-Control",(0,x.getCacheControlHeader)(c.cacheControl)),await (0,v.sendResponse)(B,V,new Response(c.value.body,{headers:u,status:c.value.status||200})),null};L?await d(L):await F.withPropagatedContext(e.headers,()=>F.trace(u.BaseServerSpan.handleRequest,{spanName:`${D} ${R}`,kind:s.SpanKind.SERVER,attributes:{"http.method":D,"http.target":e.url}},d))}catch(t){if(t instanceof f.NoFallbackError||await y.onRequestError(e,t,{routerKind:"App Router",routePath:_,routeType:"route",revalidateReason:(0,p.getRevalidateReason)({isStaticGeneration:H,isOnDemandRevalidate:P})}),j)throw t;return await (0,v.sendResponse)(B,V,new Response(null,{status:500})),null}}e.s(["handler",()=>T,"patchFetch",()=>S,"routeModule",()=>y,"serverHooks",()=>N,"workAsyncStorage",()=>C,"workUnitAsyncStorage",()=>A],41013)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__4db42ea6._.js.map