const CACHE_NAME = 'CV_Assignment_Site-v1';
const CACHE_URLS =[
    '404.html',
    'bannerImg.jpg',
    'css_des1.html',
    'css_des2.html',
    'index.html',
    'js_page.html',
    'qualifications.html',
    'serviceworker.js',
    'skills.html',
    'TEMPLATE.html',
    'data/font/ubuntu-regular-webfont.woff',
    'data/font/ubuntu-regular-webfont.woff2',
    'data/img/favicon/android-chrome-192x192.png',
    'data/img/favicon/android-chrome-256x256.png',
    'data/img/favicon/android-chrome-512x512.png',
    'data/img/favicon/apple-touch-icon.png',
    'data/img/favicon/browserconfig.xml',
    'data/img/favicon/favicon.ico',
    'data/img/favicon/favicon-16x16.png',
    'data/img/favicon/favicon-32x32.png',
    'data/img/favicon/mstile-150x150.png',
    'data/img/favicon/safari-pinned-tab.svg',
    'data/img/favicon/site.webmanifest',
    'data/img/orig/css1screenshot.JPG',
    'data/img/orig/css_des1_scrnsht.webp',
    'data/img/orig/css_des2_scrnsht.webp',
    'data/img/orig/imgix-klWUhr-wPJ8-unsplash.jpg',
    'data/img/orig/jspagescreenshot.JPG',
    'data/img/orig/stephen-dawson-qwtCeJ5cLYs-unsplash.jpg',
    'data/img/orig/tab-vector-html5-6-transparent.png',
    'data/img/resized/desktop/aboutme.webp',
    'data/img/resized/desktop/banneraddex.JPG',
    'data/img/resized/desktop/bannerImg.webp',
    'data/img/resized/desktop/codeimg.webp',
    'data/img/resized/desktop/CSSJSimg.webp',
    'data/img/resized/desktop/jobimg.webp',
    'data/img/resized/desktop/pentestimg1.webp',
    'data/img/resized/desktop/pentestimg2.webp',
    'data/img/resized/desktop/pentestimg3.webp',
    'data/img/resized/desktop/skillsimg.webp',
    'data/img/resized/desktop/workexperienceimg.webp',
    'data/img/resized/mobile/aboutme.webp',
    'data/img/resized/mobile/bannerImg.webp',
    'data/img/resized/mobile/codeimg.webp',
    'data/img/resized/mobile/jobimg.webp',
    'data/img/resized/mobile/pentestimg1.webp',
    'data/img/resized/mobile/pentestimg2.webp',
    'data/img/resized/mobile/pentestimg3.webp',
    'data/img/resized/skillsimg.webp',
    'data/img/bannerImg.jpg',
    'data/img/codeimg.jpg',
    'data/img/jobimg.jpg',
    'data/img/LogoImg.png',
    'data/img/MainBoxAboutMeImg.jpg',
    'data/json/caffeine_supplement.json',
    'data/json/manifest.json',
    'scripts/caffeine.js',
    'scripts/caffeine2.js',
    'styles/css_1.css',
    'styles/css_2.css',
    'styles/css_2_2.css',
    'styles/main.css',
    'styles/main2.css'
];

//set up cache and files to add to it
//...

//add all URLs to cache when installed
self.addEventListener("install", function(event){
    console.log("Service worker installed");
    event.waitUntil(
        //create and open cache
        caches.open(CACHE_NAME)
            .then(function(cache){
                console.log("Cache opened");
                //add all URLs to cache
                return cache.addAll(CACHE_URLS);
            })
    );
});

//On activate update the cache with the new version and clean out old caches
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName.startsWith('CV_Assignment_Site-') && CACHE_NAME !== cacheName) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

//add all URLs to cache when installed
//...
//user has navigated to page - fetch required assets
self.addEventListener("fetch", function(event){
    event.respondWith(
        caches.match(event.request).then(function(response){
            //check whether asset is in cache
            if(response){
                //asset in cache, so return it
                console.log(`Return ${event.request.url} from cache`);
                return response;
            }
            //asset not in cache so fetch asset from network
            console.log(`Fetch ${event.request.url} from network`);
            return fetch(event.request);
        })
    );
});

