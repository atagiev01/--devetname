/**
 * Anti-Theft & Code Protection Utility
 */

export function getAntiTheftIframeScript(): string {
  return `<style id="__anti_theft_styles__">
  * {
    -webkit-user-select: none !important;
    -moz-user-select: none !important;
    -ms-user-select: none !important;
    user-select: none !important;
    -webkit-touch-callout: none !important;
  }
  input, textarea, select, [contenteditable="true"] {
    -webkit-user-select: text !important;
    -moz-user-select: text !important;
    -ms-user-select: text !important;
    user-select: text !important;
  }
  img, video, audio, source, svg {
    -webkit-user-drag: none !important;
    user-drag: none !important;
  }
  #__security_toast__ {
    position: fixed;
    top: 24px;
    left: 50%;
    transform: translateX(-50%) translateY(-20px);
    z-index: 999999;
    background: rgba(15, 15, 18, 0.94);
    border: 1px solid rgba(212, 175, 55, 0.6);
    color: #fef08a;
    padding: 10px 20px;
    border-radius: 9999px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    font-size: 13px;
    font-weight: 600;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
    opacity: 0;
    pointer-events: none;
    transition: all 0.35s ease;
  }
  #__security_toast__.show {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
</style>

<div id="__security_toast__" aria-live="polite">
  <span>Müəllif hüquqları qorunur. Kopyalama qadağandır.</span>
</div>

<script>
(function() {
  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || ('ontouchend' in window || navigator.maxTouchPoints > 0);
  
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
  }, true);

  document.addEventListener('keydown', function(e) {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
      e.preventDefault();
    }
  }, true);

  if (!isMobile) {
    setInterval(function() {
      var widthDiff = window.outerWidth - window.innerWidth;
      var heightDiff = window.outerHeight - window.innerHeight;
      if (widthDiff > 160 || heightDiff > 160) {
        // Desktop DevTools check
      }
    }, 1000);
  }
})();
</script>`;
}

export function minifyAndProtectHtml(html: string): string {
  if (!html) return '';
  return html
    .replace(/<!--(?!\[if)[\s\S]*?-->/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^\s*\/\/.*$/gm, '')
    .replace(/>\s{2,}</g, '><');
}

export function attachWindowAntiTheftGuards(): () => void {
  if (typeof window === 'undefined') return () => {};

  // Mobil cihaz yoxlanışı
  const isMobileDevice =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    'ontouchend' in window ||
    navigator.maxTouchPoints > 0;

  let toastEl: HTMLDivElement | null = null;
  let toastTimer: ReturnType<typeof setTimeout> | null = null;
  
  const showToast = (msg: string) => {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.setAttribute('id', '__app_security_toast__');
      Object.assign(toastEl.style, {
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%) translateY(-16px)',
        zIndex: '999999',
        background: 'rgba(15,15,18,0.94)',
        border: '1px solid rgba(212,175,55,0.6)',
        color: '#fef08a',
        padding: '10px 18px',
        borderRadius: '9999px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontSize: '13px',
        fontWeight: '600',
        opacity: '0',
        pointerEvents: 'none',
        transition: 'all 0.3s ease',
      });
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.style.opacity = '1';
    toastEl.style.transform = 'translateX(-50%) translateY(0)';
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      if (toastEl) {
        toastEl.style.opacity = '0';
        toastEl.style.transform = 'translateX(-50%) translateY(-16px)';
      }
    }, 2200);
  };

  const styleEl = document.createElement('style');
  styleEl.textContent = `
    body.__anti-theft-active *:not(input):not(textarea):not([contenteditable="true"]) {
      -webkit-user-select: none !important;
      user-select: none !important;
      -webkit-touch-callout: none !important;
    }
    body.__anti-theft-active img, body.__anti-theft-active video {
      -webkit-user-drag: none !important;
      user-drag: none !important;
    }
  `;
  document.head.appendChild(styleEl);
  document.body.classList.add('__anti-theft-active');

  const handleContextMenu = (e: MouseEvent) => {
    const target = e.target as HTMLElement | null;
    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;
    e.preventDefault();
    showToast('🔒 Sağ klik və yükləmə qadağandır');
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

    if (e.key === 'F12' || (cmdOrCtrl && e.shiftKey && ['I', 'i', 'J', 'j', 'C', 'c'].includes(e.key))) {
      e.preventDefault();
      showToast('🔒 Tərtibatçı menyusu bağlıdır');
    }
  };

  window.addEventListener('contextmenu', handleContextMenu, true);
  window.addEventListener('keydown', handleKeyDown, true);

  let blockOverlay: HTMLDivElement | null = null;

  const showBlockOverlay = () => {
    // MOBİL CİHAZDA HEÇ BİR HALDA PƏNCƏRƏNİ GÖSTƏRMƏ!
    if (isMobileDevice) return;

    if (blockOverlay) return;
    blockOverlay = document.createElement('div');
    blockOverlay.setAttribute('id', '__app_devtools_block__');
    Object.assign(blockOverlay.style, {
      position: 'fixed',
      inset: '0',
      zIndex: '2147483647',
      background: 'rgba(10,8,6,0.97)',
      color: '#f5ebd8',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '32px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    });
    blockOverlay.innerHTML =
      '<div style="font-size:34px;margin-bottom:12px;">🔒</div>' +
      '<div style="font-size:16px;font-weight:700;margin-bottom:6px;">Məzmun gizlədildi</div>' +
      '<div style="font-size:13px;color:#c9b896;max-width:320px;">Tərtibatçı paneli (DevTools) açıqdır. Davam etmək üçün onu bağlayın.</div>';
    document.body.appendChild(blockOverlay);
  };

  const hideBlockOverlay = () => {
    if (blockOverlay) {
      blockOverlay.remove();
      blockOverlay = null;
    }
    const existing = document.getElementById('__app_devtools_block__');
    if (existing) existing.remove();
  };

  let devtoolsInterval: ReturnType<typeof setInterval> | null = null;

  // YALNIZ DESKTOP ÜÇÜN ÇALIŞSIN
  if (!isMobileDevice) {
    let consecutiveHits = 0;
    devtoolsInterval = setInterval(() => {
      const widthDiff = window.outerWidth - window.innerWidth;
      const heightDiff = window.outerHeight - window.innerHeight;
      const sizeSuspicious = widthDiff > 160 || heightDiff > 160;

      let timingSuspicious = false;
      const t0 = performance.now();
      // eslint-disable-next-line no-debugger
      debugger;
      const t1 = performance.now();
      if (t1 - t0 > 150) timingSuspicious = true;

      if (sizeSuspicious || timingSuspicious) {
        consecutiveHits++;
        if (consecutiveHits >= 2) {
          showBlockOverlay();
        }
      } else {
        consecutiveHits = 0;
        hideBlockOverlay();
      }
    }, 1000);
  }

  return () => {
    window.removeEventListener('contextmenu', handleContextMenu, true);
    window.removeEventListener('keydown', handleKeyDown, true);
    if (devtoolsInterval) clearInterval(devtoolsInterval);
    document.body.classList.remove('__anti-theft-active');
    styleEl.remove();
    if (toastEl) toastEl.remove();
    hideBlockOverlay();
  };
}