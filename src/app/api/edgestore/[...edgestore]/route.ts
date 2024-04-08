import { ALLOWED_IMAGE_TYPES } from '@/constants';
import { initEdgeStore } from '@edgestore/server';
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';

const es = initEdgeStore.create();

const edgeStoreRouter = es.router({
  userProfileImages: es.imageBucket({
    maxSize: 1024 * 1024 * 5,
    accept: ALLOWED_IMAGE_TYPES,
  }),
});

const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
});

export { handler as GET, handler as POST };

export type EdgeStoreRouter = typeof edgeStoreRouter;
