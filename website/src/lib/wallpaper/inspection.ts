import './inspection.css';

export type InspectLandmark = { label: string; x: number; y: number; href?: string; sub?: string };
type Viewer = {
  addHandler: (name: string, callback: () => void) => void;
  viewport: { zoomTo: (zoom: number, point?: unknown, immediately?: boolean) => void; zoomBy: (factor: number) => void; panTo: (point: unknown, immediately?: boolean) => void; getHomeZoom: () => number };
  destroy: () => void;
};

function hasFramingViewport(viewport: Viewer['viewport']): viewport is Viewer['viewport'] & {
  getAspectRatio: () => number;
  getMaxZoom: () => number;
  fitBoundsWithConstraints: (bounds: unknown, immediately: boolean) => void;
} {
  return 'getAspectRatio' in viewport && typeof viewport.getAspectRatio === 'function'
    && 'getMaxZoom' in viewport && typeof viewport.getMaxZoom === 'function'
    && 'fitBoundsWithConstraints' in viewport && typeof viewport.fitBoundsWithConstraints === 'function';
}

/**
 * 8K deep-zoom inspector for the Living Ruins plate (ported from the standalone
 * kvnloo/living-ruins wallpaper). OpenSeadragon and the 7680x4320 DZI pyramid load
 * only when it opens; the archival master is a download link and is never decoded.
 */
export function openInspection(options: {
  assetBase: string;
  landmark?: InspectLandmark;
  onClose: (href?: string) => void;
}): () => void {
  const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  const controller = new AbortController();
  const overlay = document.createElement('div');
  overlay.className = 'ruins-inspection';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Inspect Living Ruins');
  overlay.innerHTML = '<div class="ruins-inspection__view" aria-label="Zoomable painting" tabindex="0"></div><div class="ruins-inspection__bar"><strong></strong><span class="ruins-inspection__status" role="status">Loading detail…</span><button type="button" data-zoom="in" aria-label="Zoom in">+</button><button type="button" data-zoom="out" aria-label="Zoom out">−</button><a class="ruins-inspection__download" hidden download>Download 8K</a><button type="button" data-content hidden></button><button type="button" data-close>Return to scene</button></div>';
  document.body.append(overlay);
  const view = overlay.querySelector<HTMLDivElement>('.ruins-inspection__view')!;
  const status = overlay.querySelector<HTMLElement>('.ruins-inspection__status')!;
  const title = overlay.querySelector<HTMLElement>('strong')!;
  const download = overlay.querySelector<HTMLAnchorElement>('.ruins-inspection__download')!;
  const content = overlay.querySelector<HTMLButtonElement>('[data-content]')!;
  const closeButton = overlay.querySelector<HTMLButtonElement>('[data-close]')!;
  title.textContent = options.landmark?.label ?? 'Explore the painting';
  if (options.landmark?.href) {
    content.hidden = false;
    content.textContent = `Read ${options.landmark.sub ?? options.landmark.label} →`;
  }
  let viewer: Viewer | null = null;
  let closed = false;
  function close(href?: string) {
    if (closed) return;
    closed = true;
    controller.abort();
    viewer?.destroy();
    document.removeEventListener('keydown', keydown);
    document.removeEventListener('visibilitychange', visibility);
    overlay.remove();
    previous?.focus();
    options.onClose(href);
  }
  function keydown(event: KeyboardEvent) {
    if (event.key === 'Escape') { event.preventDefault(); close(); }
    if (event.key === 'Tab') {
      const controls = Array.from(overlay.querySelectorAll<HTMLElement>('button:not([hidden]), a:not([hidden]), [tabindex="0"]'));
      const index = controls.indexOf(document.activeElement instanceof HTMLElement ? document.activeElement : view);
      if ((event.shiftKey && index <= 0) || (!event.shiftKey && index === controls.length - 1)) {
        event.preventDefault();
        controls[event.shiftKey ? controls.length - 1 : 0]?.focus();
      }
    }
  }
  function visibility() { if (document.hidden) close(); }
  document.addEventListener('keydown', keydown);
  document.addEventListener('visibilitychange', visibility);
  closeButton.onclick = () => close();
  content.onclick = () => close(options.landmark?.href);
  closeButton.focus();
  void (async () => {
  try {
    const manifestUrl = new URL('art/manifest.json', new URL(options.assetBase, document.baseURI));
    // The large viewer library and pyramid are loaded only for inspection.
    const [response, module] = await Promise.all([fetch(manifestUrl, { signal: controller.signal }), import('openseadragon')]);
    if (!response.ok) throw new Error('Manifest unavailable');
    const manifest: unknown = await response.json();
    if (closed) return;
    if (typeof manifest !== 'object' || !manifest || !('dzi' in manifest) || !('master8k' in manifest) || !('width' in manifest) || !('height' in manifest) || typeof manifest.dzi !== 'string' || typeof manifest.master8k !== 'string' || typeof manifest.width !== 'number' || typeof manifest.height !== 'number' || manifest.width <= 0 || manifest.height <= 0) throw new Error('Invalid art manifest');
    const aspect = manifest.height / manifest.width;
    const dragon = module.default;
    download.href = new URL(manifest.master8k, manifestUrl).href;
    download.hidden = false;
    viewer = dragon({ element: view, tileSources: new URL(manifest.dzi, manifestUrl).href, showNavigationControl: false, showNavigator: false, maxImageCacheCount: 201, imageLoaderLimit: 2, loadTilesWithAjax: true, timeout: 15000, blendTime: 0, animationTime: matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 0.5, visibilityRatio: 1, constrainDuringPan: true, gestureSettingsTouch: { pinchToZoom: true, flickEnabled: false }, immediateRender: false });
    const instance = viewer;
    instance.addHandler('open', () => {
      status.textContent = 'Drag to pan · pinch or scroll to zoom';
      if (options.landmark) {
        const viewport = instance.viewport;
        if (!hasFramingViewport(viewport) || !('Rect' in dragon) || typeof dragon.Rect !== 'function') {
          status.textContent = 'Detail framing unavailable. Drag to explore the painting.';
          return;
        }
        const viewportAspect = viewport.getAspectRatio();
        const zoom = Math.min(viewport.getMaxZoom(), 3 * Math.max(1, 1 / (aspect * viewportAspect)));
        const width = 1 / zoom;
        const height = width / viewportAspect;
        const x = Math.max(0, Math.min(1 - width, options.landmark.x - width / 2));
        const y = Math.max(0, Math.min(aspect - height, options.landmark.y * aspect - height / 2));
        const bounds: unknown = Reflect.construct(dragon.Rect, [x, y, width, height]);
        viewport.fitBoundsWithConstraints(bounds, matchMedia('(prefers-reduced-motion: reduce)').matches);
      }
    });
    instance.addHandler('open-failed', () => { status.textContent = 'Detail unavailable. Return to the scene and try again.'; });
    overlay.querySelector<HTMLButtonElement>('[data-zoom="in"]')!.onclick = () => instance.viewport.zoomBy(1.5);
    overlay.querySelector<HTMLButtonElement>('[data-zoom="out"]')!.onclick = () => instance.viewport.zoomBy(1 / 1.5);
  } catch (error) {
    if (!closed) status.textContent = 'Detail unavailable. Return to the scene and try again.';
  }
  })();
  return () => close();
}
