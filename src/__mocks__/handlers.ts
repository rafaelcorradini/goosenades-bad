import { http, HttpResponse } from 'msw';

const BASE_URL = 'https://goosenades.com.br';

export const handlers = [
  http.get(`${BASE_URL}/maps`, () => {
    return HttpResponse.json([
      {
        id: 'mirage-id',
        name: 'Mirage',
        logo: '/logos/mirage.webp',
        image: '/background/mirage.webp',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'dust2-id',
        name: 'Dust 2',
        logo: '/logos/dust2.webp',
        image: '/background/dust2.webp',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]);
  }),
  http.get(`${BASE_URL}/maps/mirage-id/nades`, () => {
    return HttpResponse.json([
      {
        id: 'smoke-window-tr-spawn',
        name: 'TR Spawn Smoke Window',
        type: 'smoke',
        thumb_url: '/lineups/images/mirage-window-1.webp',
        line_up_video_url: '/lineups/videos/mirage-window-1.webm',
        gamep_map: 'mirage-id',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'flash-a-ramp',
        name: 'A Ramp Flash',
        type: 'flash',
        thumb_url: '/lineups/images/mirage-window-1.webp',
        line_up_video_url: '/lineups/videos/mirage-window-1.webm',
        gamep_map: 'mirage-id',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'molotov-palace',
        name: 'Palace Molotov',
        type: 'molotov',
        thumb_url: '/lineups/images/mirage-window-1.webp',
        line_up_video_url: '/lineups/videos/mirage-window-1.webm',
        gamep_map: 'mirage-id',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'molotov-default',
        name: 'Default Molotov',
        type: 'molotov',
        thumb_url: '/lineups/images/mirage-window-1.webp',
        line_up_video_url: '/lineups/videos/mirage-window-1.webm',
        gamep_map: 'mirage-id',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'molotov-smoke',
        name: 'Connector Smoke',
        type: 'smoke',
        thumb_url: '/lineups/images/mirage-window-1.webp',
        line_up_video_url: '/lineups/videos/mirage-window-1.webm',
        gamep_map: 'mirage-id',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]);
  }),
  http.get(`${BASE_URL}/nades/:id`, ({ params }) => {
    const nadeId = params.id;

    // Mock data for specific nades
    const nades = {
      'smoke-window-tr-spawn': {
        id: 'smoke-window-tr-spawn',
        name: 'TR Spawn Smoke Window',
        type: 'smoke',
        thumb_url: '/lineups/images/mirage-window-1.webp',
        line_up_video_url: '/lineups/videos/mirage-window-1.webm',
        gamep_map: 'mirage-id',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      'flash-a-ramp': {
        id: 'flash-a-ramp',
        name: 'A Ramp Flash',
        type: 'flash',
        thumb_url: '/lineups/images/mirage-window-1.webp',
        line_up_video_url: '/lineups/videos/mirage-window-1.webm',
        gamep_map: 'mirage-id',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      'molotov-palace': {
        id: 'molotov-palace',
        name: 'Palace Molotov',
        type: 'molotov',
        thumb_url: '/lineups/images/mirage-window-1.webp',
        line_up_video_url: '/lineups/videos/mirage-window-1.webm',
        gamep_map: 'mirage-id',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      'molotov-default': {
        id: 'molotov-default',
        name: 'Default Molotov',
        type: 'molotov',
        thumb_url: '/lineups/images/mirage-window-1.webp',
        line_up_video_url: '/lineups/videos/mirage-window-1.webm',
        gamep_map: 'mirage-id',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      'molotov-smoke': {
        id: 'molotov-smoke',
        name: 'Connector Smoke',
        type: 'smoke',
        thumb_url: '/lineups/images/mirage-window-1.webp',
        line_up_video_url: '/lineups/videos/mirage-window-1.webm',
        gamep_map: 'mirage-id',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };

    // Return the specific nade if it exists, otherwise return a 404
    if (nades[nadeId as string]) {
      return HttpResponse.json(nades[nadeId as string]);
    } else {
      return new HttpResponse(null, { status: 404 });
    }
  }),

  // Mock for rating a nade
  http.post(`${BASE_URL}/nades/:id`, async ({ params, request }) => {
    const nadeId = params.id;
    const nades = {
      'smoke-window-tr-spawn': true,
      'flash-a-ramp': true,
      'molotov-palace': true,
      'molotov-default': true,
      'molotov-smoke': true,
    };

    // Check if the nade exists
    if (!nades[nadeId as string]) {
      return new HttpResponse(null, { status: 404 });
    }

    try {
      // Parse the request body to get the rating
      const body = await request.json();

      // In a real implementation, you would save the rating
      // For the mock, we just return a success response
      console.log(`Rated nade ${nadeId} with rating ${body.rating_of_nade}`);

      return new HttpResponse(null, { status: 200 });
    } catch (error) {
      return new HttpResponse(null, { status: 400 });
    }
  }),

  http.post(`${BASE_URL}/nades/:id/bookmark`, () => {
    return new HttpResponse(null, { status: 500 });
  }),

  http.post(`${BASE_URL}/nades/:id/rate`, () => {
    return new HttpResponse(null, { status: 500 });
  }),
];
