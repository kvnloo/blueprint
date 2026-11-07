declare module 'openseadragon' {
  type Viewer = {
    addHandler: (name: string, callback: () => void) => void;
    viewport: { zoomTo: (zoom: number, point?: unknown, immediately?: boolean) => void; zoomBy: (factor: number) => void; panTo: (point: unknown, immediately?: boolean) => void; getHomeZoom: () => number };
    destroy: () => void;
  };
  const create: ((options: Record<string, unknown>) => Viewer) & { Point: new (x: number, y: number) => unknown };
  export default create;
}
