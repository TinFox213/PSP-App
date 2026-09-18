import { describe, it, expect } from 'vitest';
import healthHandler from '../../api/health';

describe('Health Check API', () => {
  it('returns 200 OK with serverless architecture details', () => {
    let statusCode = 0;
    let responseData: any = null;

    const mockRes = {
      setHeader: () => {},
      status: (code: number) => {
        statusCode = code;
        return {
          json: (data: any) => {
            responseData = data;
          },
        };
      },
    };

    healthHandler({}, mockRes);

    expect(statusCode).toBe(200);
    expect(responseData).toBeDefined();
    expect(responseData.status).toBe('ok');
    expect(responseData.architecture).toBe('Vercel Serverless');
    expect(responseData.features).toContain('Differential Consumption Engine');
    expect(responseData.features).toContain('Offline-First PWA Support');
  });
});
