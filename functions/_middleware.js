// Send visitors from old addresses (monsai3.pages.dev, www.) to the main domain
const MAIN = "xn--b3c0aajv0abd1b2fggi8qqcwcg.com";
export async function onRequest(context) {
  const url = new URL(context.request.url);
  const host = url.hostname;
  const isPreview = host.endsWith(".monsai3.pages.dev"); // keep preview deployments working
  if (!isPreview && (host === "monsai3.pages.dev" || host === "www." + MAIN)) {
    url.hostname = MAIN;
    url.protocol = "https:";
    return Response.redirect(url.toString(), 301);
  }
  return context.next();
}
