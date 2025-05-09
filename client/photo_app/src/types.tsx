type APIResult = {
  message: string;
  code: number;
  data?: object | null;
};

interface Metadata {
  name: string;
  camera: string | null;
  lens: string | null;
  iso: string | null;
  shutter: string | null;
  aperture: string | null;
}

interface Photo {
  id: number;
  url: string;
  metadata: Metadata;
}

export type { APIResult, Metadata, Photo };
