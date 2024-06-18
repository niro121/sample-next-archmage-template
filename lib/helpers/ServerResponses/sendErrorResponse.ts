import { NextResponse } from 'next/server';

export const sendErrorResponse = (error: Error, statusCode: number) => {
  return new NextResponse(
    JSON.stringify({
      status: statusCode,
      data: {
        msg: error.message || 'An unknown error occurred.'
      }
    }),
    { status: statusCode, headers: { 'Content-Type': 'application/json' } }
  );
};

// export default sendErrorResponse;
