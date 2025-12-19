module.exports=[70406,(e,t,r)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},93695,(e,t,r)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},18622,(e,t,r)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},56704,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},24725,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},24361,(e,t,r)=>{t.exports=e.x("util",()=>require("util"))},14747,(e,t,r)=>{t.exports=e.x("path",()=>require("path"))},88877,e=>{"use strict";var t=e.i(47909),r=e.i(74017),a=e.i(96250),o=e.i(59756),n=e.i(61916),i=e.i(14444),s=e.i(37092),l=e.i(69741),p=e.i(16795),d=e.i(87718),c=e.i(95169),u=e.i(47587),g=e.i(66012),x=e.i(49663),m=e.i(26937),h=e.i(10372),f=e.i(93695);e.i(52474);var y=e.i(220),v=e.i(89171),b=e.i(29508);async function R(e){try{let t=await e.formData(),r=t.get("name"),a=t.get("email"),o=t.get("phone"),n=t.get("message")||"",i=t.get("resume");if(!r||!a||!o||!i)return v.NextResponse.json({error:"All required fields must be filled"},{status:400});let s=process.env.ADMIN_EMAIL||"admin@Finovest.com";process.env.ADMIN_NAME;let l=b.default.createTransport({host:process.env.EMAIL_HOST||"smtp.gmail.com",port:process.env.EMAIL_PORT||587,secure:!1,auth:{user:process.env.EMAIL_USER,pass:process.env.EMAIL_PASSWORD}}),p=Buffer.from(await i.arrayBuffer()),d=i.name||"resume.pdf",c={from:process.env.EMAIL_FROM||'"Finovest Careers" <noreply@Finovest.com>',to:s,subject:`New Career Application: ${r}`,html:`
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af;">New Career Application Received</h2>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Applicant Details:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280;"><strong>Name:</strong></td>
                <td style="padding: 8px 0; color: #374151;">${r}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;"><strong>Email:</strong></td>
                <td style="padding: 8px 0; color: #374151;">${a}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;"><strong>Phone:</strong></td>
                <td style="padding: 8px 0; color: #374151;">${o}</td>
              </tr>
              ${n?`
              <tr>
                <td style="padding: 8px 0; color: #6b7280;"><strong>Message:</strong></td>
                <td style="padding: 8px 0; color: #374151;">${n}</td>
              </tr>
              `:""}
              <tr>
                <td style="padding: 8px 0; color: #6b7280;"><strong>Submitted At:</strong></td>
                <td style="padding: 8px 0; color: #374151;">${new Date().toLocaleString()}</td>
              </tr>
            </table>
          </div>
          
          <p style="color: #4b5563;">
            The applicant's resume is attached to this email. Please review the application and follow up with the candidate.
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">
              This email was automatically generated from the Finovest Careers portal.
            </p>
          </div>
        </div>
      `,attachments:[{filename:d,content:p,contentType:i.type||"application/pdf"}]},u={from:process.env.EMAIL_FROM||'"Finovest Careers" <noreply@Finovest.com>',to:a,subject:"Thank You for Your Application - Finovest",html:`
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #1e40af; margin-bottom: 10px;">Thank You for Your Application!</h1>
            <p style="color: #6b7280;">We have received your application for a career opportunity at Finovest.</p>
          </div>
          
          <div style="background-color: #f0f9ff; padding: 25px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">Application Details:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280;"><strong>Applicant Name:</strong></td>
                <td style="padding: 8px 0; color: #374151;">${r}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;"><strong>Position Applied:</strong></td>
                <td style="padding: 8px 0; color: #374151;">Multiple Opportunities</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;"><strong>Application Date:</strong></td>
                <td style="padding: 8px 0; color: #374151;">${new Date().toLocaleDateString()}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280;"><strong>Reference ID:</strong></td>
                <td style="padding: 8px 0; color: #374151;">MARG-${Date.now().toString().slice(-8)}</td>
              </tr>
            </table>
          </div>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">What Happens Next?</h3>
            <ol style="color: #4b5563; padding-left: 20px;">
              <li style="margin-bottom: 8px;">Our HR team will review your application</li>
              <li style="margin-bottom: 8px;">If your profile matches our requirements, we will contact you for the next steps</li>
              <li style="margin-bottom: 8px;">The selection process may include interviews and assessments</li>
              <li>You will be notified about the status of your application via email</li>
            </ol>
          </div>
          
          <div style="margin-top: 30px; padding: 20px; background-color: #fef3c7; border-radius: 8px; border-left: 4px solid #d97706;">
            <h3 style="color: #92400e; margin-top: 0;">Important Information:</h3>
            <ul style="color: #92400e; padding-left: 20px;">
              <li style="margin-bottom: 5px;">Please ensure your contact information is accurate</li>
              <li style="margin-bottom: 5px;">Keep an eye on your email (including spam folder) for updates</li>
              <li>The typical response time is 7-10 business days</li>
            </ul>
          </div>
          
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
            <p style="color: #6b7280; font-size: 14px;">
              For any queries, please contact our HR department at <a href="mailto:hr@Finovest.com" style="color: #3b82f6;">hr@Finovest.com</a>
            </p>
            <p style="color: #9ca3af; font-size: 12px; margin-top: 10px;">
              Finovest Chit Fund Pvt. Ltd.<br />
              Building Trust Since 1962
            </p>
          </div>
        </div>
      `};return await l.sendMail(c),await l.sendMail(u),v.NextResponse.json({success:!0,message:"Application submitted successfully. Confirmation email sent.",referenceId:`MARG-${Date.now().toString().slice(-8)}`})}catch(e){return console.error("Error processing application:",e),v.NextResponse.json({error:"Failed to process application. Please try again later."},{status:500})}}e.s(["POST",()=>R],75458);var w=e.i(75458);let A=new t.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/api/careers/apply/route",pathname:"/api/careers/apply",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/app/api/careers/apply/route.js",nextConfigOutput:"",userland:w}),{workAsyncStorage:E,workUnitAsyncStorage:C,serverHooks:T}=A;function M(){return(0,a.patchFetch)({workAsyncStorage:E,workUnitAsyncStorage:C})}async function N(e,t,a){A.isDev&&(0,o.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let v="/api/careers/apply/route";v=v.replace(/\/index$/,"")||"/";let b=await A.prepare(e,t,{srcPage:v,multiZoneDraftMode:!1});if(!b)return t.statusCode=400,t.end("Bad Request"),null==a.waitUntil||a.waitUntil.call(a,Promise.resolve()),null;let{buildId:R,params:w,nextConfig:E,parsedUrl:C,isDraftMode:T,prerenderManifest:M,routerServerContext:N,isOnDemandRevalidate:P,revalidateOnlyGenerated:S,resolvedPathname:I,clientReferenceManifest:O,serverActionsManifest:_}=b,k=(0,l.normalizeAppPath)(v),D=!!(M.dynamicRoutes[k]||M.routes[I]),q=async()=>((null==N?void 0:N.render404)?await N.render404(e,t,C,!1):t.end("This page could not be found"),null);if(D&&!T){let e=!!M.routes[I],t=M.dynamicRoutes[k];if(t&&!1===t.fallback&&!e){if(E.experimental.adapterPath)return await q();throw new f.NoFallbackError}}let F=null;!D||A.isDev||T||(F="/index"===(F=I)?"/":F);let j=!0===A.isDev||!D,H=D&&!j;_&&O&&(0,i.setReferenceManifestsSingleton)({page:v,clientReferenceManifest:O,serverActionsManifest:_,serverModuleMap:(0,s.createServerModuleMap)({serverActionsManifest:_})});let $=e.method||"GET",U=(0,n.getTracer)(),L=U.getActiveScopeSpan(),K={params:w,prerenderManifest:M,renderOpts:{experimental:{authInterrupts:!!E.experimental.authInterrupts},cacheComponents:!!E.cacheComponents,supportsDynamicResponse:j,incrementalCache:(0,o.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:E.cacheLife,waitUntil:a.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,a)=>A.onRequestError(e,t,a,N)},sharedContext:{buildId:R}},B=new p.NodeNextRequest(e),G=new p.NodeNextResponse(t),W=d.NextRequestAdapter.fromNodeNextRequest(B,(0,d.signalFromNodeResponse)(t));try{let i=async e=>A.handle(W,K).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let r=U.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==c.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let a=r.get("next.route");if(a){let t=`${$} ${a}`;e.setAttributes({"next.route":a,"http.route":a,"next.span_name":t}),e.updateName(t)}else e.updateName(`${$} ${v}`)}),s=!!(0,o.getRequestMeta)(e,"minimalMode"),l=async o=>{var n,l;let p=async({previousCacheEntry:r})=>{try{if(!s&&P&&S&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let n=await i(o);e.fetchMetrics=K.renderOpts.fetchMetrics;let l=K.renderOpts.pendingWaitUntil;l&&a.waitUntil&&(a.waitUntil(l),l=void 0);let p=K.renderOpts.collectedTags;if(!D)return await (0,g.sendResponse)(B,G,n,K.renderOpts.pendingWaitUntil),null;{let e=await n.blob(),t=(0,x.toNodeOutgoingHttpHeaders)(n.headers);p&&(t[h.NEXT_CACHE_TAGS_HEADER]=p),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==K.renderOpts.collectedRevalidate&&!(K.renderOpts.collectedRevalidate>=h.INFINITE_CACHE)&&K.renderOpts.collectedRevalidate,a=void 0===K.renderOpts.collectedExpire||K.renderOpts.collectedExpire>=h.INFINITE_CACHE?void 0:K.renderOpts.collectedExpire;return{value:{kind:y.CachedRouteKind.APP_ROUTE,status:n.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:a}}}}catch(t){throw(null==r?void 0:r.isStale)&&await A.onRequestError(e,t,{routerKind:"App Router",routePath:v,routeType:"route",revalidateReason:(0,u.getRevalidateReason)({isStaticGeneration:H,isOnDemandRevalidate:P})},N),t}},d=await A.handleResponse({req:e,nextConfig:E,cacheKey:F,routeKind:r.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:M,isRoutePPREnabled:!1,isOnDemandRevalidate:P,revalidateOnlyGenerated:S,responseGenerator:p,waitUntil:a.waitUntil,isMinimalMode:s});if(!D)return null;if((null==d||null==(n=d.value)?void 0:n.kind)!==y.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==d||null==(l=d.value)?void 0:l.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});s||t.setHeader("x-nextjs-cache",P?"REVALIDATED":d.isMiss?"MISS":d.isStale?"STALE":"HIT"),T&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let c=(0,x.fromNodeOutgoingHttpHeaders)(d.value.headers);return s&&D||c.delete(h.NEXT_CACHE_TAGS_HEADER),!d.cacheControl||t.getHeader("Cache-Control")||c.get("Cache-Control")||c.set("Cache-Control",(0,m.getCacheControlHeader)(d.cacheControl)),await (0,g.sendResponse)(B,G,new Response(d.value.body,{headers:c,status:d.value.status||200})),null};L?await l(L):await U.withPropagatedContext(e.headers,()=>U.trace(c.BaseServerSpan.handleRequest,{spanName:`${$} ${v}`,kind:n.SpanKind.SERVER,attributes:{"http.method":$,"http.target":e.url}},l))}catch(t){if(t instanceof f.NoFallbackError||await A.onRequestError(e,t,{routerKind:"App Router",routePath:k,routeType:"route",revalidateReason:(0,u.getRevalidateReason)({isStaticGeneration:H,isOnDemandRevalidate:P})}),D)throw t;return await (0,g.sendResponse)(B,G,new Response(null,{status:500})),null}}e.s(["handler",()=>N,"patchFetch",()=>M,"routeModule",()=>A,"serverHooks",()=>T,"workAsyncStorage",()=>E,"workUnitAsyncStorage",()=>C],88877)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__b0893e0e._.js.map