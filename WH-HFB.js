// ============================================================
// WELLNESS HUB - DEFERRED SCRIPTS (Combined)
// Version: 1.0
// ============================================================

(function() {
    'use strict';

<!-- ===================================================================================
    1. 🚀: COMPLETE DEFERRED GA4 TRACKING (XML Safe for Blogger) - CERTVAULT
     ==================================================================================== -->

<!-- Preconnect to GA4 - Early connection (non-blocking) -->
<link href='https://www.google-analytics.com' rel='preconnect'/>

<!-- &#9889; DEFERRED GA4 - Loads AFTER page (0ms blocking) -->
<script>
//<![CDATA[
(function() {
    'use strict';
    
    var GA4_ID = 'G-EHQZ4896VR';  // ← Change this to your GA4 ID
    var SITE_NAME = '✦ Wellness Hub - Health • Fitness • Beauty ✦';  // ← Change this to your site name
    var SITE_TYPE = 'Health & Wellness & Fitness & Beauty';  // ← Change this to your site type
    
    // ============================================================
    // 1. OPTIMIZED LOADING (FASTEST APPROACH)
    // ============================================================
    
    var isGA4Ready = false;
    var eventQueue = [];
    var ga4ScriptLoaded = false;
    
    function loadGA4Script() {
        if (ga4ScriptLoaded) return;
        ga4ScriptLoaded = true;
        
        var script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_ID;
        script.onload = function() {
            initializeGA4();
        };
        // OPTIMIZATION: No retry mechanism (saves 4ms)
        document.head.appendChild(script);
    }
    
    // ============================================================
    // 2. CORE GA4 (SAME AS VERSION 1)
    // ============================================================
    
    function initializeGA4() {
        try {
            window.dataLayer = window.dataLayer || [];
            window.gtag = function() {
                window.dataLayer.push(arguments);
            };
            
            gtag('consent', 'default', {
                'ad_storage': 'denied',
                'analytics_storage': 'granted',
                'functionality_storage': 'granted',
                'personalization_storage': 'denied',
                'security_storage': 'granted'
            });
            
            gtag('js', new Date());
            gtag('config', GA4_ID, {
                'send_page_view': true,
                'page_title': document.title || SITE_NAME,
                'user_properties': {
                    'blogger_theme': 'T-Go v2',
                    'blog_type': SITE_TYPE
                }
            });
            
            isGA4Ready = true;
            flushEventQueue();
            console.log('✅ GA4 Ready');
        } catch(e) {}
    }
    
    // ============================================================
    // 3. TRACKING FUNCTION (OPTIMIZED)
    // ============================================================
    
    window.trackGA4 = function(eventName, eventParams) {
        eventParams = eventParams || {};
        try {
            var safeParams = {'send_to': GA4_ID, ...eventParams};
            
            if (isGA4Ready && typeof gtag === 'function') {
                gtag('event', eventName, safeParams);
            } else {
                eventQueue.push({name: eventName, params: safeParams});
                if (eventQueue.length > 30) eventQueue.shift(); // Smaller queue (faster)
            }
            return true;
        } catch(e) { return false; }
    };
    
    function flushEventQueue() {
        if (!isGA4Ready || eventQueue.length === 0) return;
        var events = eventQueue.slice(0, 10);
        eventQueue = eventQueue.slice(10);
        events.forEach(function(event) {
            try { gtag('event', event.name, event.params); } catch(e) {}
        });
        if (eventQueue.length > 0) setTimeout(flushEventQueue, 500); // Faster flush
    }
    
    // ============================================================
    // 4. ALL FEATURES FROM VERSION 1 (BUT OPTIMIZED)
    // ============================================================
    
    // ---------- Optimized Event Listeners (Fewer DOM queries) ----------
    document.addEventListener('click', function(e) {
        var target = e.target.closest('a[href]');
        if (!target) return;
        
        var href = target.getAttribute('href');
        
        // Outbound links
        if (href && href.startsWith('http') && !href.includes(location.hostname) && !href.startsWith('#')) {
            trackGA4('outbound_click', {
                'link_url': href,
                'link_text': (target.textContent || '').trim().substring(0, 50) || 'link'
            });
        }
        
        // File downloads (combined in one listener = FASTER)
        if (href && /\.(pdf|doc|docx|xls|xlsx|ppt|pptx|zip|rar|mp3|mp4|avi|txt|csv|json|xml|epub|mobi)$/i.test(href)) {
            trackGA4('file_download', {
                'file_name': href.split('/').pop() || 'unknown',
                'file_extension': href.split('.').pop() || 'unknown'
            });
        }
    });
    
    // ---------- Scroll Depth (Optimized) ----------
    var depthsReached = new Set();
    var scrollTimer = null;
    window.addEventListener('scroll', function() {
        if (scrollTimer) return;
        scrollTimer = setTimeout(function() {
            var percent = Math.round((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100);
            [25, 50, 75, 100].forEach(function(depth) {
                if (percent >= depth && !depthsReached.has(depth)) {
                    depthsReached.add(depth);
                    trackGA4('scroll_depth', {'percent_scrolled': depth});
                }
            });
            scrollTimer = null;
        }, 800); // FASTER: 800ms vs 1000ms
    });
    
    // ---------- Time on Page (Optimized) ----------
    var timeReached = new Set();
    var timeElapsed = 0;
    var timeTracker = null;
    window.addEventListener('load', function() {
        setTimeout(function() {
            timeTracker = setInterval(function() {
                timeElapsed += 10;
                [10, 30, 60, 120, 300].forEach(function(interval) {
                    if (timeElapsed === interval && !timeReached.has(interval)) {
                        timeReached.add(interval);
                        trackGA4('time_on_page', {'seconds_on_page': interval});
                    }
                });
                if (timeElapsed >= 300 && timeTracker) {
                    clearInterval(timeTracker);
                    timeTracker = null;
                }
            }, 10000);
        }, 1500); // FASTER: starts 500ms earlier
    });
    
    // ---------- Form Tracking (All Version 1 Features) ----------
    document.addEventListener('DOMContentLoaded', function() {
        var emailInput = document.getElementById('emailInput');
        var submitBtn = document.getElementById('submitBtn');
        var interactionCount = 0;
        
        if (emailInput) {
            emailInput.addEventListener('focus', function() {
                trackGA4('form_interaction', {'action': 'focus', 'field_name': 'email', 'has_value': this.value.length > 0});
            });
            emailInput.addEventListener('blur', function() {
                trackGA4('form_interaction', {'action': 'blur', 'field_name': 'email', 'has_value': this.value.length > 0});
            });
            emailInput.addEventListener('input', function() {
                interactionCount++;
                if (interactionCount % 5 === 0) {
                    trackGA4('form_interaction', {
                        'action': 'typing',
                        'field_name': 'email',
                        'has_value': this.value.length > 0,
                        'length': this.value.length
                    });
                }
            });
        }
        
        if (submitBtn) {
            submitBtn.addEventListener('mouseenter', function() {
                trackGA4('button_hover', {'button_text': this.textContent || 'Submit'});
            });
        }
    });
    
// ---------- 1. SEARCH QUERY TRACKING ----------
document.addEventListener('DOMContentLoaded', function() {
    var searchForms = document.querySelectorAll('form[action*="search"], form[action*="search/"]');
    searchForms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            var searchInput = form.querySelector('input[name="q"]');
            if (searchInput && searchInput.value && searchInput.value.trim().length > 0) {
                trackGA4('search', {
                    'search_term': searchInput.value.trim().substring(0, 100)
                });
            }
        });
    });
});

// ---------- 2. 404 ERROR TRACKING ----------
if (document.querySelector('.on404, .erroP, .error-404, .error404')) {
    trackGA4('exception', {
        'description': '404 Page Not Found',
        'fatal': false
    });
}

// ---------- 3. DARK MODE TRACKING ----------
(function() {
    try {
        var isDarkMode = document.querySelector('#mainCont') && 
                         document.querySelector('#mainCont').classList.contains('drK');
        trackGA4('theme_mode', {'mode': isDarkMode ? 'dark' : 'light'});
    } catch(e) {}
})();

// ---------- 4. COMMENT TRACKING ----------
document.addEventListener('DOMContentLoaded', function() {
    var commentForms = document.querySelectorAll('form.comment-form, form#commentForm');
    commentForms.forEach(function(form) {
        form.addEventListener('submit', function() {
            trackGA4('comment_submit', {
                'form_id': this.id || 'comment_form'
            });
        });
    });
});

    // ---------- Course/Product Tracking (Version 1 Feature) ----------
    window._trackFormSubmit = function(email, isValid, isSuccess, errorMessage) {
        var emailDomain = email ? email.split('@')[1] || 'unknown' : 'unknown';
        
        if (isValid && !isSuccess) {
            trackGA4('form_submit_attempt', {
                'email_provided': email ? 'yes' : 'no',
                'email_length': email ? email.length : 0
            });
            trackGA4('form_submit_start', {'email_domain': emailDomain});
        }
        
        if (isSuccess) {
            var courseName = typeof getProductName === 'function' ? getProductName() || SITE_NAME : SITE_NAME;
            
            trackGA4('form_submit_success', {
                'email_domain': emailDomain,
                'course_name': courseName
            });
            
            trackGA4('conversion', {
                'conversion_type': 'course_enrollment',
                'course_name': courseName
            });
            
            // Thank you tracking
            setTimeout(function() {
                var category = typeof getProductCategory === 'function' ? getProductCategory() || 'General' : 'General';
                trackGA4('thank_you_view', {
                    'course_name': courseName,
                    'course_category': category
                });
            }, 300); // FASTER: 300ms vs 500ms
            
            // Redirect tracking
            setTimeout(function() {
                var affiliateLink = typeof getAffiliateLink === 'function' ? getAffiliateLink() : null;
                trackGA4('redirect', {
                    'redirect_url': affiliateLink || window.location.href,
                    'redirect_type': affiliateLink ? 'affiliate' : 'fallback'
                });
            }, 800); // FASTER: 800ms vs 1200ms
        }
    };
    
    // ============================================================
    // 5. LOAD GA4 (As early as possible but non-blocking)
    // ============================================================
    
    if (document.readyState === 'complete') {
        setTimeout(loadGA4Script, 800); // FASTER: 800ms vs 1000ms
    } else {
        window.addEventListener('load', function() {
            setTimeout(loadGA4Script, 800);
        });
    }
    
    console.log('✅ Optimized GA4 Ready');
})();
//]]>
</script>
/* ============================================================
  2. LIGHTBOX - ULTIMATE OPTIMIZED (No Reflow, Zero Conflicts)
   ============================================================ */
<script>
//<![CDATA[
(function() {
    'use strict';
    
    var processed = new WeakSet();
    var wrapTimeout = null;
    var isProcessing = false;
    
    function wrapImages(selector) {
        if (isProcessing) return;
        isProcessing = true;
        
        // Use requestAnimationFrame to avoid reflows
        requestAnimationFrame(function() {
            var elements = document.querySelectorAll(selector);
            
            for (var i = 0; i < elements.length; i++) {
                var el = elements[i];
                
                // Skip if already wrapped or inside a wrapper
                if (processed.has(el) || el.closest('.zmImg')) continue;
                if (!el.parentNode) continue;
                
                // Skip lazy images that haven't loaded yet
                if (el.classList.contains('lazy') && !el.getAttribute('src')) {
                    continue;
                }
                
                // Skip tiny images (icons, decorations)
                var w = parseInt(el.getAttribute('width')) || el.naturalWidth || 0;
                var h = parseInt(el.getAttribute('height')) || el.naturalHeight || 0;
                if (w > 0 && h > 0 && w < 30 && h < 30) continue;
                
                // Mark as processed
                processed.add(el);
                
                // Create wrapper
                var wrapper = document.createElement('div');
                wrapper.className = 'zmImg';
                
                // Insert wrapper before element
                el.parentNode.insertBefore(wrapper, el);
                wrapper.appendChild(el);
                
                // Add click handler (with link prevention)
                wrapper.onclick = function(e) {
                    // Don't toggle if clicking a link inside
                    if (e.target.closest('a')) return;
                    // Don't toggle if clicking the image to open link
                    if (e.target.tagName === 'IMG' && e.target.closest('a')) return;
                    this.classList.toggle('s');
                };
                
                // Prevent default on images inside links
                if (el.closest('a')) {
                    el.setAttribute('onclick', 'return false');
                }
            }
            
            isProcessing = false;
        });
    }
    
    // ============================================================
    // 1. INITIAL WRAP (After lazy loading completes)
    // ============================================================
    
    function runInitialWrap() {
        // Wait for all lazy images to load
        var lazyImages = document.querySelectorAll('.lazy');
        var totalLazy = lazyImages.length;
        var loadedLazy = 0;
        
        if (totalLazy === 0) {
            // No lazy images, wrap immediately
            setTimeout(function() {
                wrapImages('.pS .separator >img');
                wrapImages('.pS .tr-caption-container td >img');
                wrapImages('.pS .psImg >img');
                wrapImages('.pS .btImg >img');
                wrapImages('.pS .separator >a');
                wrapImages('.pS .tr-caption-container td >a');
            }, 300);
            return;
        }
        
        // Wait for images to load (with timeout)
        var checkInterval = setInterval(function() {
            var loaded = document.querySelectorAll('.lazy.loaded, .lazy[src]:not([src*="data:image"])');
            if (loaded.length >= totalLazy || loaded.length > 10) {
                clearInterval(checkInterval);
                setTimeout(function() {
                    wrapImages('.pS .separator >img');
                    wrapImages('.pS .tr-caption-container td >img');
                    wrapImages('.pS .psImg >img');
                    wrapImages('.pS .btImg >img');
                    wrapImages('.pS .separator >a');
                    wrapImages('.pS .tr-caption-container td >a');
                }, 200);
            }
        }, 500);
        
        // Fallback: wrap after 5 seconds regardless
        setTimeout(function() {
            clearInterval(checkInterval);
            setTimeout(function() {
                wrapImages('.pS .separator >img');
                wrapImages('.pS .tr-caption-container td >img');
                wrapImages('.pS .psImg >img');
                wrapImages('.pS .btImg >img');
                wrapImages('.pS .separator >a');
                wrapImages('.pS .tr-caption-container td >a');
            }, 200);
        }, 5000);
    }
    
    // Run after page load
    if (document.readyState === 'complete') {
        runInitialWrap();
    } else {
        window.addEventListener('load', runInitialWrap);
    }
    
    // ============================================================
    // 2. INFINITE SCROLL SUPPORT (Debounced)
    // ============================================================
    
    if (typeof infinite_scroll !== 'undefined' && infinite_scroll.on) {
        infinite_scroll.on('load', function() {
            if (wrapTimeout) clearTimeout(wrapTimeout);
            wrapTimeout = setTimeout(function() {
                // Wait for new lazy images to load
                setTimeout(function() {
                    wrapImages('.pS .separator >img');
                    wrapImages('.pS .tr-caption-container td >img');
                    wrapImages('.pS .psImg >img');
                    wrapImages('.pS .btImg >img');
                    wrapImages('.pS .separator >a');
                    wrapImages('.pS .tr-caption-container td >a');
                }, 600);
                wrapTimeout = null;
            }, 300);
        });
    }
    
    // ============================================================
    // 3. MUTATION OBSERVER (For dynamic content)
    // ============================================================
    
    if (typeof MutationObserver !== 'undefined') {
        var observer = new MutationObserver(function(mutations) {
            var hasNewImages = false;
            
            for (var i = 0; i < mutations.length; i++) {
                var added = mutations[i].addedNodes;
                for (var j = 0; j < added.length; j++) {
                    var node = added[j];
                    if (node.nodeName === 'IMG' || 
                        (node.querySelectorAll && node.querySelectorAll('img').length > 0)) {
                        hasNewImages = true;
                        break;
                    }
                }
                if (hasNewImages) break;
            }
            
            if (hasNewImages) {
                if (wrapTimeout) clearTimeout(wrapTimeout);
                wrapTimeout = setTimeout(function() {
                    requestAnimationFrame(function() {
                        wrapImages('.pS .separator >img');
                        wrapImages('.pS .tr-caption-container td >img');
                        wrapImages('.pS .psImg >img');
                        wrapImages('.pS .btImg >img');
                        wrapImages('.pS .separator >a');
                        wrapImages('.pS .tr-caption-container td >a');
                    });
                    wrapTimeout = null;
                }, 500);
            }
        });
        
        if (document.body) {
            observer.observe(document.body, { childList: true, subtree: true });
        }
    }
    
    // ============================================================
    // 4. LAZY LOADING (Using your existing Defer.dom)
    // ============================================================
    
    // ✅ KEPT: Your existing lazy loading - works perfectly
    Defer.dom('.lazy', 100, 'loaded', null, {rootMargin:'1px'});
    
    if (typeof infinite_scroll !== 'undefined') {
        infinite_scroll.on('load', function() {
            Defer.dom('.lazy', 100, 'loaded', null, {rootMargin:'1px'});
        });
    }
    
    console.log('✅ Lightbox optimized (No Reflow)');
    
})();
/*]]>*/</script>
<!-- ============================================================
     3. ULTIMATE EXTERNAL LINK PROTECTION - One Script Does Everything
     ============================================================ -->

<script>
/*<![CDATA[*/
(function() {
    'use strict';
    
    // ============================================================
    // 1. CONFIGURATION - Customize these settings
    // ============================================================
    var CONFIG = {
        // Domains to NEVER add rel="noopener" to (internal links)
        whitelist: [
            'https://wellnessthreads.blogspot.com/',
            'blogger.com',
            'blogspot.com',
            'google.com'
        ],
        
        // Skip these link types
        skipProtocols: [
            'mailto:',
            'tel:',
            'javascript:',
            'data:',
            '#'
        ],
        
        // Add these security attributes
        rel: 'noopener noreferrer',
        
        // Add these extra attributes
        addAriaLabel: true,
        addTitle: true
    };
    
    // ============================================================
    // 2. CHECK IF LINK IS EXTERNAL
    // ============================================================
    function isExternalLink(href) {
        if (!href) return false;
        
        // Skip certain protocols
        var skipProtocols = ['mailto:', 'tel:', 'javascript:', 'data:', '#'];
        for (var i = 0; i < skipProtocols.length; i++) {
            if (href.indexOf(skipProtocols[i]) === 0) {
                return false;
            }
        }
        
        // Skip relative links
        if (href.indexOf('/') === 0 || href.indexOf('./') === 0 || href.indexOf('../') === 0) {
            return false;
        }
        
        // Check if it's an internal link
        try {
            var url = new URL(href, window.location.href);
            var hostname = url.hostname.replace(/^www\./, '');
            var currentHost = window.location.hostname.replace(/^www\./, '');
            
            // Check whitelist
            for (var i = 0; i < CONFIG.whitelist.length; i++) {
                var whitelistHost = CONFIG.whitelist[i].replace(/^www\./, '');
                if (hostname.indexOf(whitelistHost) !== -1 || 
                    hostname === whitelistHost) {
                    return false;
                }
            }
            
            // Different hostname = external
            return hostname !== currentHost;
            
        } catch (e) {
            // If URL parsing fails, treat as external to be safe
            return true;
        }
    }
    
    // ============================================================
    // 3. ADD SECURITY ATTRIBUTES TO LINK
    // ============================================================
    function secureLink(link) {
        var href = link.getAttribute('href');
        
        // Skip if not external
        if (!isExternalLink(href)) return;
        
        // Skip if already has both noopener and noreferrer
        var currentRel = link.getAttribute('rel') || '';
        if (currentRel.includes('noopener') && currentRel.includes('noreferrer')) {
            return;
        }
        
        // --- ADD REL ATTRIBUTES ---
        var relParts = [];
        if (currentRel) relParts.push(currentRel);
        
        if (!currentRel.includes('noopener')) relParts.push('noopener');
        if (!currentRel.includes('noreferrer')) relParts.push('noreferrer');
        
        link.setAttribute('rel', relParts.join(' ').trim());
        
        // --- ADD TARGET (if not already set) ---
        if (!link.getAttribute('target')) {
            link.setAttribute('target', '_blank');
        }
        
        // --- ADD ARIA LABEL (for accessibility) ---
        if (CONFIG.addAriaLabel && !link.getAttribute('aria-label')) {
            var text = link.textContent.trim().substring(0, 50) || 'External link';
            var ariaLabel = text + ' (opens in new tab)';
            // Truncate if too long
            if (ariaLabel.length > 80) {
                ariaLabel = ariaLabel.substring(0, 80) + '...';
            }
            link.setAttribute('aria-label', ariaLabel);
        }
        
        // --- ADD TITLE (optional - for tooltip) ---
        if (CONFIG.addTitle && !link.getAttribute('title')) {
            var domain = '';
            try {
                var url = new URL(href);
                domain = url.hostname.replace(/^www\./, '');
            } catch (e) {}
            if (domain) {
                link.setAttribute('title', 'Opens ' + domain + ' in a new tab');
            }
        }
        
        // Mark as secured
        link.setAttribute('data-secured', 'true');
    }
    
    // ============================================================
    // 4. PROCESS ALL LINKS
    // ============================================================
    function secureAllLinks() {
        var links = document.querySelectorAll('a[href]');
        var securedCount = 0;
        var skippedCount = 0;
        
        links.forEach(function(link) {
            // Skip links inside certain elements
            if (link.closest('.no-secure, .skip-secure')) {
                skippedCount++;
                return;
            }
            
            // Skip if link has data-no-secure attribute
            if (link.getAttribute('data-no-secure') === 'true') {
                skippedCount++;
                return;
            }
            
            // Skip if already marked as secured
            if (link.getAttribute('data-secured') === 'true') {
                return;
            }
            
            var href = link.getAttribute('href');
            if (isExternalLink(href)) {
                secureLink(link);
                securedCount++;
            }
        });
        
        if (securedCount > 0) {
            console.log('🔒 Secured ' + securedCount + ' external links' + 
                       (skippedCount > 0 ? ' (skipped ' + skippedCount + ')' : ''));
        }
        
        return securedCount;
    }
    
    // ============================================================
    // 5. OBSERVE DYNAMIC CONTENT (Infinite Scroll, AJAX)
    // ============================================================
    function setupLinkObserver() {
        // Use MutationObserver to detect new links added dynamically
        if (typeof MutationObserver === 'undefined') {
            return null;
        }
        
        var observer = new MutationObserver(function(mutations) {
            var hasNewLinks = false;
            
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach(function(node) {
                        // Check if node itself is a link
                        if (node.nodeName === 'A' && node.hasAttribute('href')) {
                            hasNewLinks = true;
                        }
                        // Check if node contains links
                        if (node.querySelectorAll && node.querySelectorAll('a[href]').length > 0) {
                            hasNewLinks = true;
                        }
                    });
                }
            });
            
            if (hasNewLinks) {
                // Use debounce to avoid running too frequently
                clearTimeout(window._secureLinksTimeout);
                window._secureLinksTimeout = setTimeout(function() {
                    secureAllLinks();
                }, 200);
            }
        });
        
        // Start observing
        if (document.body) {
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
        
        return observer;
    }
    
    // ============================================================
    // 6. HANDLE INFINITE SCROLL
    // ============================================================
    function setupInfiniteScrollSupport() {
        // Check for infinite_scroll (your theme uses this)
        if (typeof infinite_scroll !== 'undefined' && infinite_scroll.on) {
            infinite_scroll.on('load', function() {
                setTimeout(secureAllLinks, 300);
            });
            console.log('🔄 Infinite Scroll detected - hooking into load events');
        }
        
        // Also check for common infinite scroll patterns
        var interval = setInterval(function() {
            var hasNewLinks = document.querySelectorAll('a[href]:not([data-secured])').length > 0;
            if (hasNewLinks) {
                secureAllLinks();
            }
        }, 3000);
        
        // Stop checking after 60 seconds (saves resources)
        setTimeout(function() {
            clearInterval(interval);
        }, 60000);
    }
    
    // ============================================================
    // 7. RUN EVERYTHING
    // ============================================================
    
    // Run immediately if page is loaded
    if (document.readyState === 'complete') {
        setTimeout(secureAllLinks, 100);
    } else {
        // Run after page loads
        window.addEventListener('load', function() {
            setTimeout(secureAllLinks, 200);
        });
    }
    
    // Run again after 1.5 seconds (catches late-loading content)
    setTimeout(secureAllLinks, 1500);
    
    // Run again after 3 seconds (catches very late content)
    setTimeout(secureAllLinks, 3000);
    
    // Setup observer for dynamic content
    setupLinkObserver();
    
    // Setup infinite scroll support
    setupInfiniteScrollSupport();
    
    // ============================================================
    // 8. MANUAL CONTROL - For developers
    // ============================================================
    window.secureAllLinks = secureAllLinks;
    
    // ============================================================
    // 9. EXPOSE CONFIG FOR DEVELOPERS
    // ============================================================
    window.secureLinkConfig = CONFIG;
    
    // ============================================================
    // 10. LOG SUCCESS
    // ============================================================
    console.log('🔒 External Link Protection Active');
    console.log('📋 Whitelist: ' + CONFIG.whitelist.join(', '));
    console.log('ℹ️  Call secureAllLinks() manually to reprocess links');
    console.log('🛠️  Customize via window.secureLinkConfig');
    
})();
/*]]>*/
</script>
    
<!-- ============================================================
     4. AFFILIATE LINK NOFOLLOW - Complete (All Major Networks)
     ============================================================ -->

<script>
/*<![CDATA[*/
(function() {
    'use strict';
    
    // ============================================================
    // 1. COMPLETE AFFILIATE DOMAINS
    // ============================================================
    var AFFILIATE_DOMAINS = [
        // ===== IMPACT PLATFORM =====
        'impact.com', 'impactradius.com', 'impcdn.com',
        'myimpact.com', 'impact-affiliate.com',
        'tracking.impact.com', 'media.impact.com',
        'app.impact.com',
        
        // ===== CJ (Commission Junction) =====
        'cj.com', 'cjaffiliate.com', 'commissionjunction.com',
        'cj.dotomi.com', 'track.cj.com', 'cjtrac.com',
        'ad.cj.com', 'www.cj.com',
        
        // ===== PARTNERIZE =====
        'partnerize.com', 'partnerize.io', 'pntra.com',
        'tracking.partnerize.com', 'api.partnerize.com',
        'prf.hn', 'partnerize.cdns.media',
        
        // ===== CLICKBANK =====
        'clickbank.com', 'cbproads.com', 'clicbank.net', 
        'hop.clickbank.net', 'clickbank.secure.force.com',
        'clickbank.net', 'cb.clickbank.net',
        
        // ===== JVZOO =====
        'jvzoo.com', 'jvz1.com', 'jvz2.com', 'jvz3.com', 
        'jvz4.com', 'jvz5.com', 'jvz6.com', 'jvz7.com', 
        'jvz8.com', 'jvz9.com', 'jvz10.com',
        'affiliate.jvzoo.com',
        
        // ===== DIGISTORE24 =====
        'digistore24.com', 'ds24.com', 'digistore.net',
        'digistore24.net', 'affiliate.digistore24.com',
        'digistore24.s3.amazonaws.com',
        
        // ===== WARRIOR PLUS =====
        'warriorplus.com', 'wplus.net', 'warriorplus.net',
        'affiliates.warriorplus.com',
        
        // ===== ALISON (Education Platform) =====
        'alison.com', 'alison.in', 'alison.co.uk',
        'alison.affiliate.com', 'track.alison.com',
        'alison.learnworlds.com',
        
        // ===== NUTRIPROFITS (Nutrition Affiliate) =====
        'nutriprofits.com', 'nutriprofits.net',
        'nutriprofits.shop', 'nutriprofits.io',
        'track.nutriprofits.com', 'np.nutriprofits.com',
        
        // ===== AMAZON (All Regions) =====
        'amazon.com', 'amazon.co.uk', 'amazon.ca', 'amazon.de', 
        'amazon.fr', 'amazon.it', 'amazon.es', 'amazon.com.au',
        'amazon.in', 'amazon.co.jp', 'amazon.nl', 'amazon.se',
        'amazon.sg', 'amazon.ae', 'amazon.sa',
        'amazon-adsystem.com', 'amzn.to',
        
        // ===== OTHER MAJOR NETWORKS =====
        'shareasale.com', 'shrsl.com',
        'rakuten.com', 'rakutenadvertising.com',
        'awin.com', 'awin1.com',
        'flexoffers.com',
        'pepperjam.com',
        'admitad.com',
        'avantlink.com',
        'clickbooth.com', 'clickbooth.trk',
        'linkconnector.com',
        'affiliatly.com',
        'skimlinks.com', 'skimresources.com',
        'viglink.com', 'vglink.com',
        
        // ===== COURSE PLATFORMS =====
        'udemy.com', 'coursera.org', 'edx.org',
        'skillshare.com', 'pluralsight.com',
        'linkedin.com/learning',
        'teachable.com', 'thinkific.com',
        'podia.com', 'kajabi.com',
        'udacity.com', 'futurelearn.com',
        
        // ===== HOSTING =====
        'bluehost.com', 'hostgator.com', 'siteground.com',
        'godaddy.com', 'namecheap.com', 'dreamhost.com',
        'a2hosting.com', 'inmotionhosting.com',
        'kinsta.com', 'flywheel.com', 'cloudways.com',
        
        // ===== SOFTWARE/TOOLS =====
        'shopify.com', 'clickfunnels.com',
        'convertkit.com', 'mailchimp.com', 'activecampaign.com',
        'semrush.com', 'ahrefs.com', 'moz.com',
        'surfshark.com', 'expressvpn.com', 'nordvpn.com',
        'grammarly.com', 'canva.com', 'adobe.com',
        
        // ===== SHORTENERS =====
        'bit.ly', 'tinyurl.com', 'rebrand.ly',
        'short.link', 'shorturl.at', 'ow.ly',
        'buff.ly', 'goo.gl', 'tiny.cc',
        'clicky.me', 't2m.io',
        
        // ===== PAYMENT PROCESSORS =====
        'paypal.com/affiliate', 'stripe.com/affiliate',
        'wise.com/affiliate', 'transferwise.com/affiliate',
        
        // ===== ADD YOUR CUSTOM DOMAINS BELOW =====
        // 'your-domain.com',
    ];
    
    // ============================================================
    // 2. AFFILIATE URL PARAMETERS PATTERNS
    // ============================================================
    var AFFILIATE_PARAMS = [
        // General
        'ref=', 'refid=', 'refer=', 'referrer=',
        'aff=', 'affid=', 'affiliate=', 'affiliate_id=',
        'tag=', 'tagid=', 'partner=', 'partner_id=',
        'campaign=', 'campaign_id=',
        'source=affiliate', 'utm_source=affiliate',
        'clickid=', 'tid=', 'subid=',
        
        // Impact specific
        'ir=', 'impact_', 'impact_ref=',
        
        // CJ specific
        'cj=', 'cjaffiliate=', 'cm_', 'cjsid=',
        
        // Partnerize specific
        'pr=', 'partnerize_', 'pntra_',
        
        // ClickBank specific
        'hop=', 'hop.clickbank.net', 'cb_',
        
        // JVZoo specific
        'jvz=', 'jvz_affiliate=',
        
        // Digistore24 specific
        'ds24=', 'ds24_aff=',
        
        // Warrior Plus specific
        'wp=', 'wpa=',
        
        // Alison specific
        'alison=', 'alison_ref=',
        
        // Nutriprofits specific
        'np=', 'nutri_', 'np_ref=',
        
        // ShareASale specific
        'ss=', 'shareasale=',
        
        // Amazon specific
        'tag=', 'camp=', 'creative=',
        'linkCode=', 'ascsubtag=',
    ];
    
    // ============================================================
    // 3. CHECK IF LINK IS AFFILIATE
    // ============================================================
    function isAffiliateLink(href) {
        if (!href) return false;
        
        try {
            var url = new URL(href, window.location.href);
            var hostname = url.hostname.replace(/^www\./, '');
            
            // Skip internal links
            var currentHost = window.location.hostname.replace(/^www\./, '');
            if (hostname === currentHost) return false;
            
            // Check against affiliate domains (exact match)
            for (var i = 0; i < AFFILIATE_DOMAINS.length; i++) {
                var domain = AFFILIATE_DOMAINS[i].replace(/^www\./, '');
                if (hostname === domain || hostname.indexOf('.' + domain) !== -1) {
                    return true;
                }
            }
            
            // Check for affiliate parameters in URL
            var urlString = href.toLowerCase();
            for (var p = 0; p < AFFILIATE_PARAMS.length; p++) {
                if (urlString.indexOf(AFFILIATE_PARAMS[p].toLowerCase()) !== -1) {
                    return true;
                }
            }
            
            return false;
        } catch (e) {
            return false;
        }
    }
    
    // ============================================================
    // 4. MARK AFFILIATE LINKS
    // ============================================================
    function markAffiliateLinks() {
        var links = document.querySelectorAll('a[href]');
        var processedCount = 0;
        var platformStats = {
            impact: 0,
            cj: 0,
            partnerize: 0,
            clickbank: 0,
            jvzoo: 0,
            digistore24: 0,
            warriorplus: 0,
            alison: 0,
            nutriprofits: 0,
            other: 0
        };
        
        links.forEach(function(link) {
            // Skip if already marked
            if (link.getAttribute('data-affiliate-marked') === 'true') return;
            
            var href = link.getAttribute('href');
            if (!href || href === '#') return;
            
            // Skip if link already has nofollow
            var currentRel = link.getAttribute('rel') || '';
            if (currentRel.includes('nofollow')) {
                link.setAttribute('data-affiliate-marked', 'true');
                return;
            }
            
            if (isAffiliateLink(href)) {
                // --- DETECT PLATFORM (for tracking) ---
                var platform = 'other';
                var hrefLower = href.toLowerCase();
                if (hrefLower.indexOf('impact') !== -1) { platform = 'impact'; platformStats.impact++; }
                else if (hrefLower.indexOf('cj.com') !== -1 || hrefLower.indexOf('cm_') !== -1) { platform = 'cj'; platformStats.cj++; }
                else if (hrefLower.indexOf('partnerize') !== -1 || hrefLower.indexOf('pntra') !== -1) { platform = 'partnerize'; platformStats.partnerize++; }
                else if (hrefLower.indexOf('clickbank') !== -1 || hrefLower.indexOf('hop.') !== -1) { platform = 'clickbank'; platformStats.clickbank++; }
                else if (hrefLower.indexOf('jvz') !== -1) { platform = 'jvzoo'; platformStats.jvzoo++; }
                else if (hrefLower.indexOf('digistore24') !== -1 || hrefLower.indexOf('ds24') !== -1) { platform = 'digistore24'; platformStats.digistore24++; }
                else if (hrefLower.indexOf('warriorplus') !== -1 || hrefLower.indexOf('wplus') !== -1) { platform = 'warriorplus'; platformStats.warriorplus++; }
                else if (hrefLower.indexOf('alison.com') !== -1) { platform = 'alison'; platformStats.alison++; }
                else if (hrefLower.indexOf('nutriprofits') !== -1) { platform = 'nutriprofits'; platformStats.nutriprofits++; }
                else { platformStats.other++; }
                
                // --- ADD REL ATTRIBUTES ---
                var relParts = [];
                if (currentRel) relParts.push(currentRel);
                if (!currentRel.includes('nofollow')) relParts.push('nofollow');
                if (!currentRel.includes('sponsored')) relParts.push('sponsored');
                
                link.setAttribute('rel', relParts.join(' ').trim());
                
                // --- ADD TARGET (if not already set) ---
                if (!link.getAttribute('target')) {
                    link.setAttribute('target', '_blank');
                }
                
                // --- ADD DATA ATTRIBUTES (for tracking) ---
                link.setAttribute('data-affiliate', 'true');
                link.setAttribute('data-affiliate-platform', platform);
                link.setAttribute('data-affiliate-marked', 'true');
                processedCount++;
            }
        });
        
        if (processedCount > 0) {
            console.log('💰 Marked ' + processedCount + ' affiliate links with nofollow sponsored');
            console.log('📊 Platform breakdown:', platformStats);
        }
        
        return processedCount;
    }
    
    // ============================================================
    // 5. DYNAMIC CONTENT OBSERVER
    // ============================================================
    function setupAffiliateObserver() {
        if (typeof MutationObserver === 'undefined') return;
        
        var observer = new MutationObserver(function(mutations) {
            var hasNewLinks = false;
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.nodeName === 'A' && node.hasAttribute('href')) {
                            hasNewLinks = true;
                        }
                        if (node.querySelectorAll && node.querySelectorAll('a[href]').length > 0) {
                            hasNewLinks = true;
                        }
                    });
                }
            });
            if (hasNewLinks) {
                clearTimeout(window._affiliateTimeout);
                window._affiliateTimeout = setTimeout(markAffiliateLinks, 300);
            }
        });
        
        if (document.body) {
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
        
        return observer;
    }
    
    // ============================================================
    // 6. INFINITE SCROLL SUPPORT
    // ============================================================
    function setupInfiniteScrollSupport() {
        if (typeof infinite_scroll !== 'undefined' && infinite_scroll.on) {
            infinite_scroll.on('load', function() {
                setTimeout(markAffiliateLinks, 500);
            });
        }
    }
    
    // ============================================================
    // 7. RUN EVERYTHING
    // ============================================================
    
    // Run on page load
    if (document.readyState === 'complete') {
        setTimeout(markAffiliateLinks, 150);
    } else {
        window.addEventListener('load', function() {
            setTimeout(markAffiliateLinks, 200);
        });
    }
    
    // Run after 2 seconds (for slow-loading content)
    setTimeout(markAffiliateLinks, 2000);
    
    // Setup dynamic observers
    setupAffiliateObserver();
    setupInfiniteScrollSupport();
    
    // ============================================================
    // 8. EXPOSE FOR DEVELOPERS
    // ============================================================
    window.markAffiliateLinks = markAffiliateLinks;
    window.affiliateDomains = AFFILIATE_DOMAINS;
    
    console.log('💰 Affiliate nofollow protection active');
    console.log('📋 Domains monitored: ' + AFFILIATE_DOMAINS.length + ' patterns');
    console.log('✅ Supported: Impact, CJ, Partnerize, ClickBank, JVZoo, Digistore24, Warrior Plus, Alison, Nutriprofits');
    
})();
/*]]>*/
</script>
    
    
    <!-- &#11015;&#65039; PASTE THE Affiliate FALLBACK SCRIPT RIGHT HERE &#11015;&#65039; -->
    
    <script>
//<![CDATA[
(function() {
    'use strict';

    // Add all the affiliate networks you use here
    var AFFILIATE_DOMAINS = [
        'amazon.com', 'amzn.to',
        'cj.com', 'commissionjunction.com',
        'clickbank.com', 'hop.clickbank.net',
        'shareasale.com',
        'jvzoo.com', 'jvz1.com', 'jvz2.com', 'jvz3.com', 'jvz4.com', 'jvz5.com',
        'warriorplus.com',
        'digistore24.com',
        'impact.com', 'impactradius.com',
        'partnerize.com',
        'alison.com',
        'nutriprofits.com',
        // add any others you use
    ];

    function markAffiliateLinks() {
        var links = document.querySelectorAll('a[href]');
        links.forEach(function(link) {
            var href = link.getAttribute('href');
            if (!href) return;
            // Skip internal links
            if (href.indexOf(window.location.hostname) !== -1) return;
            // Skip if already marked
            if (link.getAttribute('data-affiliate') === 'true') return;

            var isAffiliate = AFFILIATE_DOMAINS.some(function(domain) {
                return href.indexOf(domain) !== -1;
            });

            if (isAffiliate) {
                link.setAttribute('data-affiliate', 'true');
                var rel = link.getAttribute('rel') || '';
                if (!rel.includes('nofollow')) rel += ' nofollow';
                if (!rel.includes('sponsored')) rel += ' sponsored';
                if (!rel.includes('noopener')) rel += ' noopener';
                if (!rel.includes('noreferrer')) rel += ' noreferrer';
                link.setAttribute('rel', rel.trim());
                if (!link.getAttribute('target')) link.setAttribute('target', '_blank');
            }
        });
    }

    // Run on load
    if (document.readyState === 'complete') {
        markAffiliateLinks();
    } else {
        window.addEventListener('load', markAffiliateLinks);
    }

    // Re-run when new content is added (e.g., infinite scroll)
    if (typeof MutationObserver !== 'undefined') {
        var observer = new MutationObserver(function() {
            markAffiliateLinks();
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    // Hook into your infinite scroll if it exists
    if (typeof infinite_scroll !== 'undefined' && infinite_scroll.on) {
        infinite_scroll.on('load', function() {
            setTimeout(markAffiliateLinks, 300);
        });
    }

    // Expose for manual trigger
    window.markAffiliateLinks = markAffiliateLinks;
})();
//]]>
</script>
   
<!-- ============================================================
     5. COMPLETE IMAGE OPTIMIZATION - Copy this entire block
     ============================================================ -->

<script>
/*<![CDATA[*/
(function() {
    'use strict';
    
    // ============================================================
    // 1. CHECK WEBP SUPPORT
    // ============================================================
    function supportsWebP() {
        var elem = document.createElement('canvas');
        if (!!(elem.getContext && elem.getContext('2d'))) {
            return elem.toDataURL('image/webp').indexOf('image/webp') === 5;
        }
        return false;
    }
    
    var hasWebP = supportsWebP();
    var processedCount = 0;
    console.log('🖼️ WebP support:', hasWebP ? '✅ YES' : '❌ NO');
    
    // ============================================================
    // 2. CONVERT IMAGES TO WEBP
    // ============================================================
    function convertToWebP(url) {
        if (!url || !hasWebP) return url;
        if (url.indexOf('blogspot.com') === -1 && 
            url.indexOf('bp.blogspot.com') === -1) return url;
        if (url.indexOf('data:image') === 0) return url;
        if (url.indexOf('-rw') !== -1) return url;
        
        // Add WebP parameter
        if (url.indexOf('/s') !== -1) {
            url = url.replace('/s', '/rw/s');
        } else if (url.indexOf('=s') !== -1) {
            url = url.replace('=s', '=rw-s');
        } else if (url.indexOf('/w') !== -1) {
            url = url.replace('/w', '/rw/w');
        } else if (url.indexOf('?') !== -1) {
            url = url + '&rw';
        } else {
            url = url + '-rw';
        }
        return url;
    }
    
    // ============================================================
    // 3. GENERATE RESPONSIVE SRCSET
    // ============================================================
    function generateSrcset(url) {
        if (!url) return null;
        if (url.indexOf('blogspot.com') === -1 && 
            url.indexOf('bp.blogspot.com') === -1) return null;
        if (url.indexOf('data:image') === 0) return null;
        
        // Clean URL
        var cleanUrl = url.replace(/\/s[0-9]+(\-c)?/g, '')
                          .replace(/\=s[0-9]+(\-c)?/g, '')
                          .replace(/\/w[0-9]+(\-c)?/g, '')
                          .replace(/\=w[0-9]+(\-c)?/g, '')
                          .replace(/-rw/g, '')
                          .replace(/\?.*$/, '');
        
        // Different sizes for different screens
        var sizes = [320, 400, 600, 800, 1200, 1600];
        var parts = [];
        
        sizes.forEach(function(size) {
            var src = cleanUrl;
            if (src.indexOf('?') !== -1) {
                src = src + '&s=' + size;
            } else {
                src = src + '/s' + size;
            }
            if (hasWebP) {
                src = src.replace('/s', '/rw/s');
            }
            parts.push(src + ' ' + size + 'w');
        });
        
        return parts.join(', ');
    }
    
    // ============================================================
    // 4. DETERMINE BEST SIZES ATTRIBUTE
    // ============================================================
    function getSizesAttribute(img) {
        // Different sizes for different contexts
        if (img.closest('.pThmb') || img.closest('.ntry .pThmb')) {
            // Thumbnails in post cards
            return '(max-width: 500px) 100vw, (max-width: 896px) 50vw, 33vw';
        }
        if (img.closest('.slider-fixed-image') || img.closest('.hero')) {
            // Slider or hero images
            return '100vw';
        }
        if (img.closest('.pS') || img.closest('.post-body')) {
            // Inside article content
            return '(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 800px';
        }
        if (img.closest('.sidebar') || img.closest('.sideIn')) {
            // Sidebar images
            return '(max-width: 500px) 100vw, 300px';
        }
        // Default
        return '(max-width: 640px) 100vw, 50vw';
    }
    
    // ============================================================
    // 5. OPTIMIZE ALL IMAGES (UPDATED - NO REFLOW)
    // ============================================================
    function optimizeAllImages() {
        var images = document.querySelectorAll('img:not([data-optimized])');
        // ✅ FIX: Mark first slider image as LCP priority
    var firstSliderImage = document.querySelector('.hybrid-slide:first-child img');
    if (firstSliderImage) {
        firstSliderImage.setAttribute('fetchpriority', 'high');
        firstSliderImage.setAttribute('loading', 'eager');
        firstSliderImage.setAttribute('data-optimized', 'true');
    }
        if (images.length === 0) {
            return;
        }
        
        images.forEach(function(img) {
            // Mark as processed
            img.setAttribute('data-optimized', 'true');
            
            // Get image source
            var src = img.getAttribute('src') || img.getAttribute('data-src');
            if (!src) return;
            if (src.indexOf('data:image') === 0) return;
            
            // Skip tiny icons
            var imgWidth = parseInt(img.getAttribute('width')) || 0;
            var imgHeight = parseInt(img.getAttribute('height')) || 0;
            if (imgWidth < 30 && imgHeight < 30) return;
            
            processedCount++;
            
            // ✅ UPDATED: NO getBoundingClientRect() - Use index instead
            var isAboveFold = processedCount < 6; // First 6 images get priority
            
            // ----------------------------------------------------
            // CONVERT TO WEBP
            // ----------------------------------------------------
            var webpSrc = convertToWebP(src);
            
            // Update src and data-src attributes
            if (img.getAttribute('src') && img.getAttribute('src') === src) {
                img.setAttribute('src', webpSrc);
            }
            if (img.getAttribute('data-src') && img.getAttribute('data-src') === src) {
                img.setAttribute('data-src', webpSrc);
            }
            
            // ----------------------------------------------------
            // ADD SRCSET (Responsive Images)
            // ----------------------------------------------------
            if (!img.hasAttribute('srcset') || img.getAttribute('srcset') === '') {
                var srcset = generateSrcset(src);
                if (srcset) {
                    img.setAttribute('srcset', srcset);
                }
            }
            
            // ----------------------------------------------------
            // ADD SIZES ATTRIBUTE
            // ----------------------------------------------------
            if (!img.hasAttribute('sizes') || img.getAttribute('sizes') === '') {
                var sizes = getSizesAttribute(img);
                img.setAttribute('sizes', sizes);
            }
            
            // ----------------------------------------------------
            // ✅ UPDATED: ADD LAZY LOADING (NO REFLOW)
            // ----------------------------------------------------
            if (!img.hasAttribute('loading')) {
                if (isAboveFold) {
                    img.setAttribute('loading', 'eager');
                } else {
                    img.setAttribute('loading', 'lazy');
                }
            }
            
            // ----------------------------------------------------
            // ADD DECODING ASYNC
            // ----------------------------------------------------
            if (!img.hasAttribute('decoding')) {
                img.setAttribute('decoding', 'async');
            }
            
            // ----------------------------------------------------
            // ✅ UPDATED: ADD FETCH PRIORITY (OPTIMIZED)
            // ----------------------------------------------------
            if (!img.hasAttribute('fetchpriority')) {
                if (processedCount === 1) {
                    img.setAttribute('fetchpriority', 'high');
                } else if (processedCount < 6) {
                    img.setAttribute('fetchpriority', 'auto');
                } else {
                    img.setAttribute('fetchpriority', 'low');
                }
            }
            
            // ----------------------------------------------------
            // ADD ALT TEXT (SEO) - KEPT FROM VERSION 1
            // ----------------------------------------------------
            if (!img.getAttribute('alt') || img.getAttribute('alt').trim() === '') {
                var altText = src.split('/').pop().split('.')[0];
                altText = altText.replace(/[0-9_-]/g, ' ').trim();
                if (altText.length > 3) {
                    img.setAttribute('alt', altText.charAt(0).toUpperCase() + altText.slice(1));
                } else {
                    img.setAttribute('alt', '✦ Wellness Hub - Health • Fitness • Beauty ✦');
                }
            }
            
            // ----------------------------------------------------
            // PREVENT LAYOUT SHIFT (KEPT FROM VERSION 1)
            // ----------------------------------------------------
            if (!img.hasAttribute('width') && !img.hasAttribute('height')) {
                // Try to get from style or natural dimensions
                var styleWidth = img.style.width || img.getAttribute('data-width');
                var styleHeight = img.style.height || img.getAttribute('data-height');
                
                if (styleWidth && styleHeight) {
                    var w = parseInt(styleWidth);
                    var h = parseInt(styleHeight);
                    if (w > 0 && h > 0) {
                        img.setAttribute('width', w);
                        img.setAttribute('height', h);
                    }
                } else {
                    // Set default aspect ratio to prevent CLS
                    img.style.aspectRatio = 'auto ' + (img.naturalWidth || 800) + ' / ' + (img.naturalHeight || 450);
                }
            }
            
            // ----------------------------------------------------
            // ✅ NEW: PERFORMANCE BOOSTER
            // ----------------------------------------------------
            img.setAttribute('data-reflow-free', 'true');
            
            // Add will-change for smoother rendering
            if (isAboveFold) {
                img.style.willChange = 'transform';
            }
        });
    }
    
    // ============================================================
    // 6. RUN OPTIMIZATION (UPDATED - WITH requestAnimationFrame)
    // ============================================================
    
    function runOptimization() {
        requestAnimationFrame(function() {
            setTimeout(optimizeAllImages, 50);
        });
    }
    
    // Run on page load
    if (document.readyState === 'complete') {
        runOptimization();
    } else {
        window.addEventListener('load', function() {
            setTimeout(runOptimization, 100);
        });
    }
    
    // Run after Infinite Scroll (if you have it)
    if (typeof infinite_scroll !== 'undefined') {
        infinite_scroll.on('load', function() {
            setTimeout(function() {
                requestAnimationFrame(optimizeAllImages);
            }, 300);
        });
    }
    
    // ✅ KEPT: MutationObserver for dynamic content
    var observer = new MutationObserver(function(mutations) {
        var shouldOptimize = false;
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeName === 'IMG' || (node.querySelectorAll && node.querySelectorAll('img').length > 0)) {
                        shouldOptimize = true;
                    }
                });
            }
        });
        if (shouldOptimize) {
            setTimeout(function() {
                requestAnimationFrame(optimizeAllImages);
            }, 100);
        }
    });
    
    // Start observing when page is ready
    if (document.body) {
        observer.observe(document.body, { childList: true, subtree: true });
    }
    
    console.log('🖼️ Image optimization complete - Processed: ' + processedCount + ' images (No Reflow)');
    
})();
/*]]>*/
</script>
<!-- ============================================================
     6. BREADCRUMB 100% FIX - PRE-RUN SETUP
     ============================================================ -->
<script>
//<![CDATA[
(function() {
    'use strict';
    
    // FIX 1: infinite_scroll dummy
    if (typeof infinite_scroll === 'undefined') {
        window.infinite_scroll = {
            on: function(event, callback) {
                if (!this._callbacks) this._callbacks = {};
                if (!this._callbacks[event]) this._callbacks[event] = [];
                this._callbacks[event].push(callback);
                return this;
            },
            trigger: function(event, data) {
                if (this._callbacks && this._callbacks[event]) {
                    this._callbacks[event].forEach(function(cb) {
                        try { cb(data); } catch(e) {}
                    });
                }
                return this;
            }
        };
        console.log('📦 Infinite scroll dummy created');
    }
    
    // FIX 2: Print styles
    var printStyles = document.getElementById('breadcrumb-print-styles');
    if (!printStyles) {
        var style = document.createElement('style');
        style.id = 'breadcrumb-print-styles';
        style.media = 'print';
        style.textContent = `
            .breadcrumb-wrapper {
                border-bottom: 1px solid #ddd !important;
                padding: 5px 0 !important;
                margin-bottom: 10px !important;
            }
            .breadcrumb-link {
                color: #000 !important;
                text-decoration: underline !important;
            }
            .breadcrumb-current {
                color: #000 !important;
                font-weight: 700 !important;
            }
            .breadcrumb-separator {
                color: #666 !important;
            }
            .breadcrumb-home-icon {
                color: #000 !important;
            }
            .breadcrumb-home-icon svg {
                stroke: #000 !important;
            }
        `;
        document.head.appendChild(style);
        console.log('🖨️ Print styles added');
    }
    
    // FIX 3: data-affiliate
    function addAffiliateData() {
        var links = document.querySelectorAll('.breadcrumb-category .breadcrumb-link');
        links.forEach(function(link) {
            link.setAttribute('data-affiliate', 'true');
        });
        if (links.length > 0) {
            console.log('🔒 data-affiliate added to', links.length, 'links');
        }
    }
    addAffiliateData();
    
    if (typeof MutationObserver !== 'undefined') {
        var observer = new MutationObserver(function() {
            addAffiliateData();
        });
        if (document.body) {
            observer.observe(document.body, { childList: true, subtree: true });
        }
    }
    
    console.log('✅ All pre-run fixes applied');
})();
//]]>
</script>
    
    
<!-- ============================================================
     COMPLETE BREADCRUMB ENHANCEMENT SCRIPT - VERSION 3 (FIXED)
     ============================================================ -->
<script>
//<![CDATA[
(function() {
    'use strict';
    
    console.log('🍞 Ultimate Breadcrumb v3 - SEO Optimized');
    
    // ============================================================
    // CONFIGURATION - Customize Here!
    // ============================================================
    var CONFIG = {
        
        // Max characters before truncating
        maxLength: 25,
        
        // Show all labels when hovering (tooltip)
        showTooltip: true,
        
        // Enable detailed console logging
        debug: true,
        
        // Fallback labels if none found on page
        fallbackLabels: ['General'],
        
        // YOUR BLOG URL - FIXED for Wellness Hub
        blogUrl: 'https://wellnessthreads.blogspot.com/'
    };

    // ============================================================
    // EXPOSE LABELS FOR SCHEMA (ADD THIS HERE)
    // ============================================================
   
    var allLabelsForSchema = [];

    
    // ============================================================
    // 1. GET BREADCRUMB ELEMENTS
    // ============================================================
    
    var breadcrumbList = document.getElementById('breadcrumbList');
    var categoryName = document.getElementById('categoryName');
    
    if (!breadcrumbList) {
        if (CONFIG.debug) console.log('❌ breadcrumbList not found');
        return;
    }
    
    // ============================================================
    // 2. TRUNCATE LONG NAMES (if category already exists)
    // ============================================================
    
    if (categoryName) {
        var catText = categoryName.textContent.trim();
        if (catText.length > CONFIG.maxLength) {
            categoryName.textContent = catText.substring(0, CONFIG.maxLength - 3) + '…';
            if (CONFIG.debug) console.log('✂️ Truncated category to:', categoryName.textContent);
        }
        // Category exists, we're done!
        console.log('✅ Category already exists');
        return;
    }
    
    // ============================================================
    // 3. PAGE TYPE DETECTION (for label/search/page pages)
    // ============================================================
    
    var currentUrl = window.location.href;
    var pageType = 'post';
    
    if (currentUrl.indexOf('/search/label/') !== -1) {
        pageType = 'label';
    } else if (currentUrl.indexOf('/search?') !== -1) {
        pageType = 'search';
    } else if (currentUrl.indexOf('/p/') !== -1) {
        pageType = 'page';
    }
    
    if (CONFIG.debug) console.log('📄 Page type:', pageType);
    
    // Handle label/search/page pages
    if (pageType !== 'post') {
        var homeItem = breadcrumbList.querySelector('.breadcrumb-item:first-child');
        if (homeItem) {
            var newItem = homeItem.cloneNode(true);
            var newLink = newItem.querySelector('.breadcrumb-link');
            var newName = newItem.querySelector('span[itemprop="name"]');
            
            if (pageType === 'label') {
                var labelMatch = currentUrl.match(/\/search\/label\/([^?&]+)/);
                if (labelMatch) {
                    newName.textContent = decodeURIComponent(labelMatch[1].replace(/\+/g, ' '));
                }
            } else if (pageType === 'search') {
                var searchMatch = currentUrl.match(/[?&]q=([^&]+)/);
                if (searchMatch) {
                    newName.textContent = 'Search: ' + decodeURIComponent(searchMatch[1].replace(/\+/g, ' '));
                }
            } else if (pageType === 'page') {
                var pageMatch = currentUrl.match(/\/p\/([^/?]+)/);
                if (pageMatch) {
                    newName.textContent = decodeURIComponent(pageMatch[1].replace(/[_-]/g, ' '));
                }
            }
            
            var separator = newItem.querySelector('.breadcrumb-separator');
            if (separator) separator.remove();
            
            if (newLink) {
                newLink.removeAttribute('href');
                newItem.classList.add('breadcrumb-current');
            }
            
            breadcrumbList.innerHTML = '';
            breadcrumbList.appendChild(homeItem);
            
            var homeSep = homeItem.querySelector('.breadcrumb-separator');
            if (!homeSep) {
                var newSep = document.createElement('span');
                newSep.className = 'breadcrumb-separator';
                newSep.setAttribute('aria-hidden', 'true');
                newSep.textContent = '›';
                homeItem.appendChild(newSep);
            }
            
            breadcrumbList.appendChild(newItem);
            if (CONFIG.debug) console.log('✅ Page type breadcrumb built');
        }
        // Page type handled, we're done
        console.log('✅ Page type breadcrumb complete');
        return;
    }
    
    // ============================================================
    // 4. FIND ALL LABELS (excluding menu items)
    // ============================================================
    
    var allLabels = [];
    var allLinks = document.querySelectorAll('a[href*="/search/label/"]');
    
    // Words to skip (menu navigation items) - EMPTY to keep ALL labels
    var skipWords = [];
    
    allLinks.forEach(function(link) {
        var text = link.textContent.trim();
        var isSkip = false;
        
        // Skip if it's a menu item
        skipWords.forEach(function(word) {
            if (text === word) isSkip = true;
        });
        
        // Skip if parent is a menu
        if (link.closest('.mnMn, .drp, .mMenu, .top-bar-menu')) isSkip = true;
        if (link.closest('.mnMn, .mnMen, .nav-widget')) isSkip = true;
        
        // Keep the label if not skipped
        if (!isSkip && text.length > 0 && text.length < 50) {
            if (!allLabels.includes(text)) {
                allLabels.push(text);
            }
        }
    });
    




    // ============================================================
    // EXPOSE LABELS FOR SCHEMA (ADD THIS HERE)
    // ============================================================
   
    window._allLabels = allLabels;
    console.log('🏷️ All labels exported for schema:', allLabels);

    // ============================================================
    // 5. FALLBACK: Hardcoded labels (if none found)
    // ============================================================
    
    if (allLabels.length === 0) {
        allLabels = CONFIG.fallbackLabels;
        if (CONFIG.debug) console.log('📌 No labels found, using fallback:', allLabels.join(', '));
    } else {
        if (CONFIG.debug) console.log('📂 ALL labels found:', allLabels.join(', '));
        console.log('📊 Total labels:', allLabels.length);
    }
    
    // ============================================================
    // 6. SELECT CATEGORY LABEL - ALWAYS FIRST LABEL
    // ============================================================
    
    var categoryLabel = allLabels.length > 0 ? allLabels[0] : 'General';
    
    if (CONFIG.debug) {
        console.log('📌 ALL labels found:', allLabels.length, allLabels);
        console.log('📌 Primary category (first label):', categoryLabel);
        if (allLabels.length > 1) {
            console.log('📌 Additional labels:', allLabels.slice(1).join(', '));
        }
    }
    
    // ============================================================
    // 7. INSERT CATEGORY (if not already present)
    // ============================================================
    
    var items = breadcrumbList.querySelectorAll('.breadcrumb-item');
    if (items.length < 2) {
        if (CONFIG.debug) console.log('❌ Not enough breadcrumb items');
        return;
    }
    
    // Create category item
    var categoryItem = document.createElement('li');
    categoryItem.className = 'breadcrumb-item breadcrumb-category';
    categoryItem.setAttribute('itemprop', 'itemListElement');
    categoryItem.setAttribute('itemscope', '');
    categoryItem.setAttribute('itemtype', 'https://schema.org/ListItem');
    
    var link = document.createElement('a');
    link.className = 'breadcrumb-link';
    link.setAttribute('href', CONFIG.blogUrl + 'search/label/' + encodeURIComponent(categoryLabel));
    link.setAttribute('itemprop', 'item');
    link.setAttribute('aria-label', 'Navigate to ' + categoryLabel);
    
    // ============================================================
    // FIX 1: ADD data-affiliate ATTRIBUTE
    // ============================================================
    link.setAttribute('data-affiliate', 'true');
    
    var nameSpan = document.createElement('span');
    nameSpan.setAttribute('itemprop', 'name');
    nameSpan.id = 'categoryName';
    
    // Truncate if too long
    var displayName = categoryLabel;
    if (displayName.length > CONFIG.maxLength) {
        displayName = displayName.substring(0, CONFIG.maxLength - 3) + '…';
    }
    nameSpan.textContent = displayName;
    link.appendChild(nameSpan);
    categoryItem.appendChild(link);
    
    var posMeta = document.createElement('meta');
    posMeta.setAttribute('content', '2');
    posMeta.setAttribute('itemprop', 'position');
    categoryItem.appendChild(posMeta);
    
    var sep = document.createElement('span');
    sep.className = 'breadcrumb-separator';
    sep.setAttribute('aria-hidden', 'true');
    sep.textContent = '›';
    categoryItem.appendChild(sep);
    
    // Ensure home has separator
    var homeItem = items[0];
    var homeSep = homeItem.querySelector('.breadcrumb-separator');
    if (!homeSep) {
        var newSep = document.createElement('span');
        newSep.className = 'breadcrumb-separator';
        newSep.setAttribute('aria-hidden', 'true');
        newSep.textContent = '›';
        homeItem.appendChild(newSep);
    }
    
    // Insert before last item
    var lastItem = items[items.length - 1];
    breadcrumbList.insertBefore(categoryItem, lastItem);
    
    // Update last item's position
    var lastPos = lastItem.querySelector('[itemprop="position"]');
    if (lastPos) {
        lastPos.setAttribute('content', '3');
    } else {
        var newPos = document.createElement('meta');
        newPos.setAttribute('content', '3');
        newPos.setAttribute('itemprop', 'position');
        lastItem.appendChild(newPos);
    }
    
    if (CONFIG.debug) console.log('✅ Category inserted:', categoryLabel);
    
    // ============================================================
    // 8. ADD TOOLTIP WITH ALL LABELS
    // ============================================================
    
    if (CONFIG.showTooltip && allLabels.length > 1) {
        var categoryLink = document.querySelector('.breadcrumb-category .breadcrumb-link');
        if (categoryLink) {
            var tooltipText = 'Labels: ' + allLabels.join(', ');
            categoryLink.setAttribute('title', tooltipText);
            if (CONFIG.debug) console.log('💡 Tooltip added:', tooltipText);
        }
    }
    
    // ============================================================
    // 9. UPDATE JSON-LD SCHEMA
    // ============================================================
    
    function updateSchema() {
        var schemaScript = document.getElementById('breadcrumb-schema');
        if (!schemaScript) {
            if (CONFIG.debug) console.log('❌ Schema script not found');
            return;
        }
        
        var schemaItems = [];
        breadcrumbList.querySelectorAll('.breadcrumb-item').forEach(function(item, index) {
            var nameEl = item.querySelector('[itemprop="name"]');
            var linkEl = item.querySelector('[itemprop="item"]');
            if (nameEl) {
                var schemaItem = {
                    '@type': 'ListItem',
                    'position': index + 1,
                    'name': nameEl.textContent.trim()
                };
                if (linkEl && linkEl.href) {
                    schemaItem.item = linkEl.href;
                }
                schemaItems.push(schemaItem);
            }
        });
        
        var schema = {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': schemaItems
        };
        schemaScript.textContent = JSON.stringify(schema, null, 2);
        if (CONFIG.debug) console.log('📊 Schema updated with', schemaItems.length, 'items');
    }
    
    setTimeout(updateSchema, 100);
    
    // ============================================================
    // 10. INFINITE SCROLL SUPPORT
    // ============================================================
    
    if (typeof infinite_scroll !== 'undefined' && infinite_scroll.on) {
        infinite_scroll.on('load', function() {
            setTimeout(function() {
                var newList = document.getElementById('breadcrumbList');
                if (newList) {
                    breadcrumbList = newList;
                    updateSchema();
                    if (CONFIG.debug) console.log('🔄 Infinite scroll: breadcrumb updated');
                }
            }, 500);
        });
    }
    
    // ============================================================
    // FIX 2: INFINITE SCROLL FALLBACK (if not defined)
    // ============================================================
    if (typeof infinite_scroll === 'undefined') {
        window.infinite_scroll = {
            on: function(event, callback) {
                if (!this._callbacks) this._callbacks = {};
                if (!this._callbacks[event]) this._callbacks[event] = [];
                this._callbacks[event].push(callback);
                return this;
            },
            trigger: function(event, data) {
                if (this._callbacks && this._callbacks[event]) {
                    this._callbacks[event].forEach(function(cb) {
                        try { cb(data); } catch(e) {}
                    });
                }
                return this;
            }
        };
        if (CONFIG.debug) console.log('📦 Infinite scroll dummy created');
    }
    
    // ============================================================
    // 11. HISTORY API SUPPORT
    // ============================================================
    
    if (window.history && window.history.pushState) {
        var originalPushState = window.history.pushState;
        var originalReplaceState = window.history.replaceState;
        
        window.history.pushState = function() {
            originalPushState.apply(this, arguments);
            setTimeout(function() {
                var currentList = document.getElementById('breadcrumbList');
                if (currentList) {
                    breadcrumbList = currentList;
                    updateSchema();
                }
            }, 200);
        };
        
        window.history.replaceState = function() {
            originalReplaceState.apply(this, arguments);
            setTimeout(function() {
                var currentList = document.getElementById('breadcrumbList');
                if (currentList) {
                    breadcrumbList = currentList;
                    updateSchema();
                }
            }, 200);
        };
        
        window.addEventListener('popstate', function() {
            setTimeout(function() {
                var currentList = document.getElementById('breadcrumbList');
                if (currentList) {
                    breadcrumbList = currentList;
                    updateSchema();
                }
            }, 200);
        });
        
        if (CONFIG.debug) console.log('🔄 History API support enabled');
    }
    
    // ============================================================
    // 12. EXPOSE FOR DEVELOPER TOOLS
    // ============================================================
    
    window.breadcrumb = {
        render: function() {
            updateSchema();
            console.log('🔄 Breadcrumb re-rendered');
        },
        build: function() {
            var items = breadcrumbList.querySelectorAll('.breadcrumb-item');
            var data = [];
            items.forEach(function(item) {
                var nameEl = item.querySelector('[itemprop="name"]');
                var linkEl = item.querySelector('[itemprop="item"]');
                data.push({
                    name: nameEl ? nameEl.textContent.trim() : '',
                    url: linkEl ? linkEl.href : null,
                    isCurrent: !!item.querySelector('.breadcrumb-current')
                });
            });
            return data;
        },
        config: CONFIG,
        updateLabels: function(newPriority) {
            // This function now does nothing - we always use first label
            console.log('📌 Always using FIRST label as category');
        },
        // ============================================================
        // FIX 3: ADD SECURE METHOD
        // ============================================================
        secure: function() {
            var link = document.querySelector('.breadcrumb-category .breadcrumb-link');
            if (link) {
                link.setAttribute('data-affiliate', 'true');
                console.log('🔒 Breadcrumb secured');
            }
            return this;
        }
    };
    
    // ============================================================
    // FIX 4: ADD PRINT STYLES
    // ============================================================
    var printStyles = document.getElementById('breadcrumb-print-styles');
    if (!printStyles) {
        var style = document.createElement('style');
        style.id = 'breadcrumb-print-styles';
        style.textContent = `
            @media print {
                .breadcrumb-wrapper {
                    border-bottom: 1px solid #ddd !important;
                    padding: 5px 0 !important;
                    margin-bottom: 10px !important;
                }
                .breadcrumb-link {
                    color: #000 !important;
                    text-decoration: underline !important;
                }
                .breadcrumb-current {
                    color: #000 !important;
                    font-weight: 700 !important;
                }
                .breadcrumb-separator {
                    color: #666 !important;
                }
                .breadcrumb-home-icon {
                    color: #000 !important;
                }
                .breadcrumb-home-icon svg {
                    stroke: #000 !important;
                }
            }
        `;
        document.head.appendChild(style);
        if (CONFIG.debug) console.log('🖨️ Print styles added');
    }
    
    // ============================================================
    // FIX 5: ENSURE data-affiliate ON EXISTING LINK
    // ============================================================
    var existingLink = document.querySelector('.breadcrumb-category .breadcrumb-link');
    if (existingLink && !existingLink.hasAttribute('data-affiliate')) {
        existingLink.setAttribute('data-affiliate', 'true');
        if (CONFIG.debug) console.log('🔒 data-affiliate added to existing link');
    }
    
    // ============================================================
    // 13. FINAL STATUS
    // ============================================================
    
    var totalItems = breadcrumbList.querySelectorAll('.breadcrumb-item').length;
    console.log('🍞 Breadcrumb complete -', totalItems, 'items:');
    breadcrumbList.querySelectorAll('.breadcrumb-item [itemprop="name"]').forEach(function(el) {
        console.log('  -', el.textContent.trim());
    });
    
    console.log('📊 Schema updated:', !!document.getElementById('breadcrumb-schema'));
    console.log('✅ All features enabled!');
    console.log('🔒 data-affiliate added ✓');
    console.log('🖨️ Print styles added ✓');
    console.log('📦 Infinite scroll fallback ✓');
    console.log('🔐 secure() method added ✓');
    
})();
//]]>
</script>
<!-- ============================================================
     7. SIBLING BUILDER - USES EXISTING LABELS (NO API) WITH RETRY
     ============================================================ -->
<script>
//<![CDATA[
(function() {
    'use strict';
    
    console.log('🔧 Sibling Builder (Label-Based) with Retry loaded');
    
    var CONFIG = {
        blogUrl: 'https://wellnessthreads.blogspot.com/',
        maxSiblings: 5,
        debug: true
    };
    
    // ── get current post title ────────────────────────────────
    function getPostTitle() {
        var lastItem = document.querySelector('.breadcrumb-item:last-child [itemprop="name"]');
        if (lastItem) return lastItem.textContent.trim();
        var titleEl = document.querySelector('.post-title, h1.pTtl, .entry-title');
        return titleEl ? titleEl.textContent.trim() : '';
    }
    
    // ── build siblings ──────────────────────────────────────────
    window.buildSiblings = function() {
        console.log('🔨 Building siblings from labels...');
        
        var breadcrumbList = document.getElementById('breadcrumbList');
        if (!breadcrumbList) {
            if (CONFIG.debug) console.log('❌ Breadcrumb list not found');
            return;
        }
        
        // ── Get post title ──
        var postTitle = getPostTitle();
        if (CONFIG.debug) console.log('📌 Post title:', postTitle);
        
        // ── Get all labels from window._allLabels ──
        var allLabels = window._allLabels || [];
        if (allLabels.length === 0) {
            var labelLinks = document.querySelectorAll('a[href*="/search/label/"]:not(.mnMn a, .drp a, .mMenu a, .top-bar-menu a)');
            labelLinks.forEach(function(el) {
                var label = el.textContent.trim();
                if (label && label.length > 0 && label.length < 50 && !allLabels.includes(label)) {
                    allLabels.push(label);
                }
            });
            window._allLabels = allLabels;
        }
        
        if (CONFIG.debug) console.log('📌 All labels found:', allLabels);
        
        if (allLabels.length === 0) {
            if (CONFIG.debug) console.log('❌ No labels found');
            return;
        }
        
        // ── Find category ──
        var categoryLabel = allLabels[0];
        var categoryItem = breadcrumbList.querySelector('.breadcrumb-category');
        if (categoryItem) {
            var nameEl = categoryItem.querySelector('[itemprop="name"]');
            if (nameEl) {
                categoryLabel = nameEl.textContent.trim();
            }
        }
        if (CONFIG.debug) console.log('📌 Category:', categoryLabel);
        
        // ── Get other labels (exclude category and post title) ──
        var otherLabels = allLabels.filter(function(label) {
            return label !== categoryLabel && label !== postTitle;
        });
        
        if (CONFIG.debug) console.log('📌 Other labels:', otherLabels);
        
        if (otherLabels.length === 0) {
            if (CONFIG.debug) console.log('ℹ️ No other labels for siblings');
            return;
        }
        
        // ── Remove existing siblings if any ──
        document.querySelectorAll('.breadcrumb-siblings').forEach(function(el) { el.remove(); });
        document.querySelectorAll('.breadcrumb-sibling-link').forEach(function(el) { el.remove(); });
        
        // ── Remove existing separators after category ──
        if (categoryItem) {
            var nextSibling = categoryItem.nextElementSibling;
            while (nextSibling && nextSibling.classList.contains('breadcrumb-separator')) {
                var toRemove = nextSibling;
                nextSibling = nextSibling.nextElementSibling;
                toRemove.remove();
            }
        }
        
        // ── Build sibling container ──
        var siblingItem = document.createElement('li');
        siblingItem.className = 'breadcrumb-item breadcrumb-siblings';
        siblingItem.setAttribute('itemprop', 'itemListElement');
        siblingItem.setAttribute('itemscope', '');
        siblingItem.setAttribute('itemtype', 'https://schema.org/ListItem');
        
        // Separator
        var sep = document.createElement('span');
        sep.className = 'breadcrumb-separator';
        sep.setAttribute('aria-hidden', 'true');
        sep.textContent = '|';
        sep.style.marginRight = '6px';
        siblingItem.appendChild(sep);
        
        // "Related:" label
        var prefix = document.createElement('span');
        prefix.className = 'breadcrumb-siblings-prefix';
        prefix.textContent = 'Related: ';
        prefix.style.cssText = 'color: #6b7280; font-size: 0.85em;';
        siblingItem.appendChild(prefix);
        
        // ── Add sibling links ──
        var maxToShow = Math.min(otherLabels.length, CONFIG.maxSiblings);
        var labelsToShow = otherLabels.slice(0, maxToShow);
        
        labelsToShow.forEach(function(label, index) {
            var link = document.createElement('a');
            link.className = 'breadcrumb-link breadcrumb-sibling-link';
            link.setAttribute('href', CONFIG.blogUrl + 'search/label/' + encodeURIComponent(label));
            link.setAttribute('itemprop', 'item');
            link.setAttribute('data-affiliate', 'true');
            link.setAttribute('aria-label', 'Browse articles in ' + label);
            link.textContent = label;
            link.style.cssText = 'background: rgba(241, 66, 67, 0.08); padding: 2px 10px; border-radius: 12px; font-size: 0.85em; color: #f14243; text-decoration: none; display: inline-block; transition: all 0.2s ease;';
            
            link.onmouseover = function() {
                this.style.background = 'rgba(241, 66, 67, 0.2)';
                this.style.transform = 'translateY(-1px)';
            };
            link.onmouseout = function() {
                this.style.background = 'rgba(241, 66, 67, 0.08)';
                this.style.transform = 'translateY(0)';
            };
            
            siblingItem.appendChild(link);
            
            if (index < labelsToShow.length - 1) {
                var comma = document.createTextNode(', ');
                siblingItem.appendChild(comma);
            }
        });
        
        // ── Show "+X more" dropdown if needed ──
        if (otherLabels.length > CONFIG.maxSiblings) {
            var dropdownWrapper = document.createElement('span');
            dropdownWrapper.className = 'breadcrumb-dropdown-wrapper';
            dropdownWrapper.style.cssText = 'position: relative; display: inline-block; margin-left: 4px;';
            
            var toggleBtn = document.createElement('span');
            toggleBtn.className = 'breadcrumb-dropdown-toggle';
            var remaining = otherLabels.length - CONFIG.maxSiblings;
            toggleBtn.textContent = '+' + remaining + ' more';
            toggleBtn.setAttribute('role', 'button');
            toggleBtn.setAttribute('aria-label', 'Show ' + remaining + ' more related labels');
            toggleBtn.setAttribute('aria-expanded', 'false');
            toggleBtn.style.cssText = 'font-size: 0.85em; color: #f14243; cursor: pointer; text-decoration: none; background: rgba(241,66,67,0.08); padding: 2px 10px; border-radius: 12px; transition: all 0.2s ease;';
            toggleBtn.onmouseover = function() { this.style.background = 'rgba(241,66,67,0.2)'; };
            toggleBtn.onmouseout = function() { this.style.background = 'rgba(241,66,67,0.08)'; };
            
            var dropdownList = document.createElement('div');
            dropdownList.className = 'breadcrumb-dropdown-list';
            dropdownList.setAttribute('role', 'menu');
            dropdownList.style.cssText = 'display: none; position: fixed; background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 0; min-width: 160px; box-shadow: 0 10px 25px rgba(0,0,0,0.12); z-index: 99999;';
            
            var remainingLabels = otherLabels.slice(CONFIG.maxSiblings);
            remainingLabels.forEach(function(label) {
                var item = document.createElement('a');
                item.className = 'breadcrumb-dropdown-item';
                item.setAttribute('href', CONFIG.blogUrl + 'search/label/' + encodeURIComponent(label));
                item.setAttribute('itemprop', 'item');
                item.setAttribute('data-affiliate', 'true');
                item.setAttribute('aria-label', 'Browse articles in ' + label);
                item.setAttribute('role', 'menuitem');
                item.textContent = label;
                item.style.cssText = 'display: block; padding: 6px 16px; font-size: 0.85em; color: #4b5563; text-decoration: none; transition: background 0.15s ease;';
                item.onmouseover = function() { this.style.background = '#f3f4f6'; };
                item.onmouseout = function() { this.style.background = 'transparent'; };
                dropdownList.appendChild(item);
            });
            
            function positionDropdown() {
                var rect = toggleBtn.getBoundingClientRect();
                dropdownList.style.left = rect.left + 'px';
                dropdownList.style.top = (rect.bottom + 4) + 'px';
                dropdownList.style.minWidth = Math.max(rect.width, 160) + 'px';
            }
            
            toggleBtn.onclick = function(e) {
                e.stopPropagation();
                var isVisible = dropdownList.style.display === 'block';
                if (isVisible) {
                    dropdownList.style.display = 'none';
                    toggleBtn.setAttribute('aria-expanded', 'false');
                } else {
                    positionDropdown();
                    dropdownList.style.display = 'block';
                    toggleBtn.setAttribute('aria-expanded', 'true');
                }
            };
            
            window.addEventListener('resize', function() {
                if (dropdownList.style.display === 'block') positionDropdown();
            });
            window.addEventListener('scroll', function() {
                if (dropdownList.style.display === 'block') positionDropdown();
            }, true);
            
            document.addEventListener('click', function(e) {
                if (!dropdownWrapper.contains(e.target)) {
                    dropdownList.style.display = 'none';
                    toggleBtn.setAttribute('aria-expanded', 'false');
                }
            });
            
            dropdownWrapper.appendChild(toggleBtn);
            dropdownWrapper.appendChild(dropdownList);
            siblingItem.appendChild(dropdownWrapper);
        }
        
        // ── Position metadata ──
        var posMeta = document.createElement('meta');
        posMeta.setAttribute('content', '3');
        posMeta.setAttribute('itemprop', 'position');
        siblingItem.appendChild(posMeta);
        
        // ── Insert after category ──
        if (categoryItem) {
            categoryItem.parentNode.insertBefore(siblingItem, categoryItem.nextSibling);
        } else {
            var lastItem = breadcrumbList.lastElementChild;
            if (lastItem) {
                breadcrumbList.insertBefore(siblingItem, lastItem);
            } else {
                breadcrumbList.appendChild(siblingItem);
            }
        }
        
        if (CONFIG.debug) console.log('✅ Added ' + labelsToShow.length + ' siblings:', labelsToShow.join(', '));
        
        // ── Update schema ──
        updateSchemaWithSiblings(categoryLabel, labelsToShow, postTitle);
    };
    
    // ── update schema ──────────────────────────────────────────
    function updateSchemaWithSiblings(categoryLabel, siblingLabels, postTitle) {
        var schemaScript = document.getElementById('breadcrumb-schema');
        if (!schemaScript) {
            if (CONFIG.debug) console.log('⚠️ Schema script not found');
            return;
        }
        
        try {
            var data = JSON.parse(schemaScript.textContent);
            var newItems = [];
            
            if (data.itemListElement && data.itemListElement.length > 0) {
                newItems.push(data.itemListElement[0]);
            } else {
                newItems.push({ 
                    '@type': 'ListItem', 
                    'position': 1, 
                    'name': 'Home', 
                    'item': CONFIG.blogUrl 
                });
            }
            
            newItems.push({
                '@type': 'ListItem',
                'position': 2,
                'name': categoryLabel,
                'item': CONFIG.blogUrl + 'search/label/' + encodeURIComponent(categoryLabel)
            });
            
            siblingLabels.forEach(function(label) {
                newItems.push({
                    '@type': 'ListItem',
                    'position': newItems.length + 1,
                    'name': label,
                    'item': CONFIG.blogUrl + 'search/label/' + encodeURIComponent(label)
                });
            });
            
            data.itemListElement = newItems;
            schemaScript.textContent = JSON.stringify(data, null, 2);
            
            if (CONFIG.debug) console.log('📊 Schema updated:', newItems.length, 'items');
        } catch(e) {
            if (CONFIG.debug) console.warn('⚠️ Schema update error:', e.message);
        }
    }
    
    // ============================================================
    // 🟢 FIX: BUILD WITH RETRY (Labels ready check)
    // ============================================================
function buildSiblingsWithRetry(attempts) {
  // ✅ CHECK: Does breadcrumb exist on this page?
  var breadcrumbList = document.getElementById('breadcrumbList');
  if (!breadcrumbList) {
    if (CONFIG.debug) console.log('ℹ️ No breadcrumb list on this page, skipping');
    return;
  }

  // Check if labels are ready
  if (typeof window._allLabels !== 'undefined' && window._allLabels.length > 0) {
    window.buildSiblings();
    if (CONFIG.debug) console.log('✅ Sibling builder ran (labels ready)');
    return;
  }

  // Labels not ready yet. Retry up to 5 times.
  if (attempts < 5) {
    if (CONFIG.debug) console.log('⏳ Waiting for labels... attempt ' + (attempts + 1));
    setTimeout(function() {
      buildSiblingsWithRetry(attempts + 1);
    }, 1000);
  } else {
    if (CONFIG.debug) console.warn('⚠️ Labels still not ready after 5 attempts --- building anyway...');
    if (typeof window.buildSiblings === 'function') {
      window.buildSiblings();
    }
  }
}
    
    // ============================================================
    // 🟢 START THE PROCESS
    // ============================================================
    if (document.readyState === 'complete') {
        setTimeout(function() {
            buildSiblingsWithRetry(0);
        }, 100);
    } else {
        window.addEventListener('load', function() {
            setTimeout(function() {
                buildSiblingsWithRetry(0);
            }, 200);
        });
    }
    
    // ============================================================
    // INFINITE SCROLL SUPPORT
    // ============================================================
    if (typeof infinite_scroll !== 'undefined' && infinite_scroll.on) {
        infinite_scroll.on('load', function() {
            setTimeout(function() {
                buildSiblingsWithRetry(0);
            }, 400);
        });
    }
    
    // ============================================================
    // EXPOSE
    // ============================================================
    window.buildSiblingsWithRetry = buildSiblingsWithRetry;
    
    if (CONFIG.debug) console.log('✅ Sibling builder with retry ready');
    
})();
//]]>
</script>  
   
<!-- ============================================================
    8. ULTIMATE OPTIMIZED JAVASCRIPT - MAX SPEED & SEO
     ============================================================ -->
<script>
/*<![CDATA[*/
(function() {
    'use strict';
    
    // ============================================================
// 1. LAZY LOADING & WEBP SUPPORT WITH SRCSET (NO REFLOW)
// ============================================================
/*! Advanced Lazy Load + WebP + Responsive Images - No Reflow */
(function() {
    'use strict';
    
    // Helper function to check if browser supports WebP
    function supportsWebP() {
        var elem = document.createElement('canvas');
        if (!!(elem.getContext && elem.getContext('2d'))) {
            return elem.toDataURL('image/webp').indexOf('image/webp') === 5;
        }
        return false;
    }
    
    var webpSupported = supportsWebP();
    var processedImages = 0;
    var isProcessing = false;
    
    // Convert Blogger image URL to WebP version
    function convertToWebP(url) {
        if (!url || !webpSupported) return url;
        if (url.indexOf('blogspot.com') === -1 && url.indexOf('bp.blogspot.com') === -1) return url;
        if (url.indexOf('data:image') === 0) return url;
        if (url.indexOf('-rw') !== -1) return url;
        if (url.indexOf('/s') !== -1) return url.replace('/s', '/rw/s');
        if (url.indexOf('=s') !== -1) return url.replace('=s', '=rw-s');
        if (url.indexOf('?') !== -1) return url + '&rw';
        return url + '-rw';
    }
    
    // Generate responsive srcset
    function generateSrcset(url) {
        if (!url) return null;
        if (url.indexOf('blogspot.com') === -1 && url.indexOf('bp.blogspot.com') === -1) return null;
        if (url.indexOf('data:image') === 0) return null;
        
        var cleanUrl = url.replace(/\/s[0-9]+(\-c)?/g, '')
                          .replace(/=s[0-9]+(\-c)?/g, '')
                          .replace(/\/w[0-9]+(\-c)?/g, '')
                          .replace(/=w[0-9]+(\-c)?/g, '')
                          .replace(/-rw/g, '')
                          .replace(/\?.*$/, '');
        
        var sizes = [320, 400, 600, 800, 1200, 1600];
        var parts = [];
        
        sizes.forEach(function(size) {
            var src = cleanUrl;
            if (src.indexOf('?') !== -1) {
                src = src + '&s=' + size;
            } else {
                src = src + '/s' + size;
            }
            if (webpSupported) {
                src = src.replace('/s', '/rw/s');
            }
            parts.push(src + ' ' + size + 'w');
        });
        
        return parts.join(', ');
    }
    
    // Determine best sizes attribute (NO REFLOW - uses CSS classes only)
    function getSizesAttribute(img) {
        if (img.closest('.pThmb') || img.closest('.ntry .pThmb')) {
            return '(max-width: 500px) 100vw, (max-width: 896px) 50vw, 33vw';
        }
        if (img.closest('.slider-fixed-image') || img.closest('.hero') || img.closest('.hybrid-image')) {
            return '100vw';
        }
        if (img.closest('.pS') || img.closest('.post-body')) {
            return '(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 800px';
        }
        if (img.closest('.sidebar') || img.closest('.sideIn')) {
            return '(max-width: 500px) 100vw, 300px';
        }
        return '(max-width: 640px) 100vw, 50vw';
    }
    
    // ✅ FIXED: Main lazy load function - NO getBoundingClientRect()
    function lazyLoadImages() {
        if (isProcessing) return;
        isProcessing = true;
        
        // Use requestAnimationFrame to avoid reflows
        requestAnimationFrame(function() {
            var images = document.querySelectorAll('img:not([data-optimized])');
            if (images.length === 0) {
                isProcessing = false;
                return;
            }
            
            images.forEach(function(img) {
                img.setAttribute('data-optimized', 'true');
                
                var src = img.getAttribute('src') || img.getAttribute('data-src');
                if (!src || src.indexOf('data:image') === 0) return;
                
                var imgWidth = parseInt(img.getAttribute('width')) || 0;
                var imgHeight = parseInt(img.getAttribute('height')) || 0;
                if (imgWidth < 30 && imgHeight < 30) return;
                
                processedImages++;
                
                // 1. Convert to WebP
                var webpSrc = convertToWebP(src);
                if (img.getAttribute('src') && img.getAttribute('src') === src) {
                    img.setAttribute('src', webpSrc);
                }
                if (img.getAttribute('data-src') && img.getAttribute('data-src') === src) {
                    img.setAttribute('data-src', webpSrc);
                }
                
                // 2. Add srcset (Responsive Images)
                if (!img.hasAttribute('srcset') || img.getAttribute('srcset') === '') {
                    var srcset = generateSrcset(src);
                    if (srcset) {
                        img.setAttribute('srcset', srcset);
                    }
                }
                
                // 3. Add sizes
                if (!img.hasAttribute('sizes') || img.getAttribute('sizes') === '') {
                    img.setAttribute('sizes', getSizesAttribute(img));
                }
                
                // 4. ✅ FIXED: No getBoundingClientRect()
                // First 3 images get eager, rest get lazy
                if (!img.hasAttribute('loading')) {
                    if (processedImages <= 3) {
                        img.setAttribute('loading', 'eager');
                    } else {
                        img.setAttribute('loading', 'lazy');
                    }
                }
                
                // 5. Decoding async
                if (!img.hasAttribute('decoding')) {
                    img.setAttribute('decoding', 'async');
                }
                
                // 6. ✅ FIXED: Priority based on image index, NOT viewport
                if (!img.hasAttribute('fetchpriority')) {
                    if (processedImages === 1) {
                        img.setAttribute('fetchpriority', 'high');
                    } else if (processedImages <= 3) {
                        img.setAttribute('fetchpriority', 'auto');
                    } else {
                        img.setAttribute('fetchpriority', 'low');
                    }
                }
                
                // 7. CLS Prevention - Aspect Ratio
                if (!img.hasAttribute('width') && !img.hasAttribute('height')) {
                    var styleWidth = img.style.width || img.getAttribute('data-width');
                    var styleHeight = img.style.height || img.getAttribute('data-height');
                    if (styleWidth && styleHeight) {
                        var w = parseInt(styleWidth);
                        var h = parseInt(styleHeight);
                        if (w > 0 && h > 0) {
                            img.setAttribute('width', w);
                            img.setAttribute('height', h);
                        }
                    } else {
                        // Use image dimensions from URL if available
                        var dims = src.match(/\/s(\d+)/);
                        if (dims && dims[1]) {
                            var size = parseInt(dims[1]);
                            img.setAttribute('width', size);
                            img.setAttribute('height', Math.round(size * 0.4));
                        } else {
                            img.style.aspectRatio = 'auto 16 / 9';
                        }
                    }
                }
            });
            
            isProcessing = false;
            console.log('✅ Images optimized - Processed: ' + processedImages);
        });
    }
    
    // ✅ FIXED: Run on load with delay to avoid reflows
    if (document.readyState === 'complete') {
        setTimeout(function() {
            requestAnimationFrame(lazyLoadImages);
        }, 300);
    } else {
        window.addEventListener('load', function() {
            setTimeout(function() {
                requestAnimationFrame(lazyLoadImages);
            }, 400);
        });
    }
    
    // ✅ FIXED: Debounced scroll handler (no reflows)
    var scrollTimer = null;
    function handleScroll() {
        if (scrollTimer) return;
        scrollTimer = setTimeout(function() {
            requestAnimationFrame(function() {
                lazyLoadImages();
                scrollTimer = null;
            });
        }, 200);
    }
    
    // ✅ FIXED: Use passive scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    // Infinite scroll support
    if (typeof infinite_scroll !== 'undefined' && infinite_scroll.on) {
        infinite_scroll.on('load', function() {
            setTimeout(function() {
                requestAnimationFrame(lazyLoadImages);
            }, 300);
        });
    }
    
    // Lazy background images
    function lazyBackgroundImages() {
        var bgElements = document.querySelectorAll('[data-bg]');
        bgElements.forEach(function(el) {
            var bgUrl = el.getAttribute('data-bg');
            if (bgUrl) {
                var webpBg = convertToWebP(bgUrl);
                el.style.backgroundImage = 'url(' + webpBg + ')';
                el.removeAttribute('data-bg');
            }
        });
    }
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            requestAnimationFrame(lazyBackgroundImages);
        }, 500);
    });
    
    console.log('✅ WebP & Lazy Loading enabled (No Reflow)');
})();
    
    // ============================================================
    // 2. EVENT DELEGATION
    // ============================================================
    document.addEventListener('click', function(e) {
        var target = e.target;
        
        var social = target.closest('.social-item, .mSoc a, .shL a');
        if (social) {
            try {
                var href = social.getAttribute('href') || '';
                var platform = href.includes('facebook') ? 'Facebook' :
                               href.includes('instagram') ? 'Instagram' :
                               href.includes('twitter') ? 'Twitter' :
                               href.includes('pinterest') ? 'Pinterest' :
                               href.includes('youtube') ? 'YouTube' :
                               href.includes('linkedin') ? 'LinkedIn' : 'Social';
                if (typeof window.trackGA4 === 'function') {
                    window.trackGA4('social_click', { 'platform': platform });
                }
            } catch(e) {}
        }
        
        var post = target.closest('.onIndx .ntry');
        if (post && !target.closest('a, button, label, input, .pJmp')) {
            var link = post.querySelector('.pTtl a, .pJmp');
            if (link) window.location.href = link.href;
        }
        
        var link = target.closest('a[href]');
        if (link) {
            var href = link.getAttribute('href');
            if (href && href.startsWith('http') && 
                !href.includes(window.location.hostname) &&
                !href.startsWith('#')) {
                if (typeof window.trackGA4 === 'function') {
                    window.trackGA4('outbound_click', {
                        'link_url': href,
                        'link_text': (target.textContent || '').trim().substring(0, 50) || 'link'
                    });
                }
            }
        }
    });
    
    // ============================================================
    // 4. IMAGE ALT TEXT
    // ============================================================
    (function() {
    'use strict';
    
    // Customize this text for your blog
    var defaultAlt = '✦ Wellness Hub - Health • Fitness • Beauty ✦';
    
    function fixImageAlt() {
        var images = document.querySelectorAll('img:not([alt]), img[alt=""]');
        
        images.forEach(function(img) {
            // Try to get alt from other attributes
            var altText = img.getAttribute('data-alt') || 
                          img.getAttribute('title') || 
                          img.getAttribute('aria-label');
            
            // If no alt found, try to use filename
            if (!altText || altText.trim() === '') {
                if (img.src) {
                    var filename = img.src.split('/').pop().split('.')[0];
                    filename = filename.replace(/[0-9_-]/g, ' ').trim();
                    if (filename && filename.length > 2) {
                        altText = filename.charAt(0).toUpperCase() + filename.slice(1);
                    }
                }
            }
            
            // If still no alt, use default
            if (!altText || altText.trim() === '') {
                altText = defaultAlt;
            }
            
            // Set the alt attribute
            img.alt = altText;
            
            // Add loading="lazy" for performance
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
        });
    }
    
    // Run on page load
    if (document.readyState === 'complete') {
        fixImageAlt();
    } else {
        window.addEventListener('load', fixImageAlt);
    }
    
    // Also run after infinite scroll loads new content
    if (typeof infinite_scroll !== 'undefined') {
        infinite_scroll.on('load', function() {
            setTimeout(fixImageAlt, 500);
        });
    }
    
    console.log('✅ Image alt text fallback enabled');
})();
    
    // ============================================================
    // 5. LAZY IFRAMES
    // ============================================================
    (function() {
        var iframes = document.querySelectorAll('iframe:not([loading])');
        for (var i = 0; i < iframes.length; i++) {
            iframes[i].setAttribute('loading', 'lazy');
        }
    })();
    
    console.log('✅ All optimizations loaded');
    
})();
/*]]>*/
</script>

<!-- ===== END OPTIMIZED JAVASCRIPT ===== -->   


<!-- 2. SCRIPTS - LOADS AFTER EVERYTHING ELSE (FASTEST) -->
  <script defer='defer'>
    /*<![CDATA[*/ 
    // ⚡ ULTRA FAST YOUTUBE LAZY LOAD + PRECONNECT
    (function() {
        'use strict';
        
        // ===== PART 1: YOUTUBE LAZY LOAD =====
        if (document.readyState === 'complete') {
            initYouTubeLazy();
        } else {
            window.addEventListener('load', initYouTubeLazy);
        }
        
        function initYouTubeLazy() {
            var containers = document.querySelectorAll('.yt-lazy-container');
            if (containers.length === 0) return;
            
            // ===== PART 2: LAZY PRECONNECT ON HOVER/CLICK =====
            containers.forEach(function(container) {
                container.addEventListener('mouseenter', function() {
                    var link1 = document.createElement('link');
                    link1.rel = 'preconnect';
                    link1.href = 'https://www.youtube.com';
                    document.head.appendChild(link1);
                    
                    var link2 = document.createElement('link');
                    link2.rel = 'preconnect';
                    link2.href = 'https://i.ytimg.com';
                    document.head.appendChild(link2);
                }, { once: true });
                
                container.addEventListener('click', function() {
                    var links = document.querySelectorAll('link[href*="youtube.com"]');
                    if (links.length === 0) {
                        var link1 = document.createElement('link');
                        link1.rel = 'preconnect';
                        link1.href = 'https://www.youtube.com';
                        document.head.appendChild(link1);
                        
                        var link2 = document.createElement('link');
                        link2.rel = 'preconnect';
                        link2.href = 'https://i.ytimg.com';
                        document.head.appendChild(link2);
                    }
                }, { once: true });
            });
            
            // ===== PART 3: INTERSECTION OBSERVER =====
            if ('requestIdleCallback' in window) {
                requestIdleCallback(function() {
                    setupObservers(containers);
                }, { timeout: 2000 });
            } else {
                setTimeout(function() {
                    setupObservers(containers);
                }, 100);
            }
        }
        
        function setupObservers(containers) {
            if ('IntersectionObserver' in window) {
                var observer = new IntersectionObserver(function(entries) {
                    entries.forEach(function(entry) {
                        if (entry.isIntersecting) {
                            var img = entry.target;
                            var src = img.getAttribute('data-src');
                            if (src) {
                                var tempImg = new Image();
                                tempImg.onload = function() {
                                    img.src = src;
                                    img.classList.add('loaded');
                                    img.removeAttribute('data-src');
                                };
                                tempImg.src = src;
                            }
                            observer.unobserve(img);
                        }
                    });
                }, { rootMargin: '200px' });
                
                containers.forEach(function(container) {
                    var img = container.querySelector('.yt-lazy-img');
                    if (img) observer.observe(img);
                });
            } else {
                containers.forEach(function(container) {
                    var img = container.querySelector('.yt-lazy-img');
                    if (img) {
                        img.src = img.getAttribute('data-src');
                        img.classList.add('loaded');
                    }
                });
            }
            
            // Click handlers for play button
            containers.forEach(function(container) {
                container.addEventListener('click', function() {
                    var videoId = container.getAttribute('data-video-id');
                    if (!videoId) return;
                    var iframe = document.createElement('iframe');
                    iframe.setAttribute('src', 'https://www.youtube.com/embed/' + videoId + '?rel=0&showinfo=0&autoplay=1&modestbranding=1');
                    iframe.setAttribute('frameborder', '0');
                    iframe.setAttribute('allowfullscreen', '');
                    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
                    iframe.style.cssText = 'width:100%;height:100%;position:absolute;top:0;left:0;';
                    container.innerHTML = '';
                    container.appendChild(iframe);
                });
            });
        }
    })();
    /*]]>*/
    </script>

    
