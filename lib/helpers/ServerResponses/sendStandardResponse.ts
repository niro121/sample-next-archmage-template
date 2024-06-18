import { NextResponse } from 'next/server';

export const sendStandardResponse = (
  responseData: any,
  statusCode: number,
  msg: string
) => {
  return new NextResponse(
    JSON.stringify({
      status: statusCode,
      message: msg || 'Response message is not available',
      data: {
        data: responseData || {}
      }
    }),
    { status: statusCode, headers: { 'Content-Type': 'application/json' } }
  );
};
