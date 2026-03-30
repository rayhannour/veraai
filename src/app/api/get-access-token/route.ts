import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('🚀 API get-access-token called');
  
  try {
    // Vérifiez que les variables d'environnement sont chargées
    console.log('🔧 Environment check:');
    console.log('- VERA_URL_STREAM exists:', !!process.env.VERA_URL_STREAM);
    console.log('- VERA_TCKEN exists:', !!process.env.VERA_TCKEN);
    console.log('- NODE_ENV:', process.env.NODE_ENV);

    if (!process.env.VERA_URL_STREAM || !process.env.VERA_TCKEN) {
      console.error('❌ Missing environment variables');
      return NextResponse.json(
        { error: 'Server configuration error - missing environment variables' },
        { status: 500 }
      );
    }

    console.log('📡 Calling Vera API:', process.env.VERA_URL_STREAM);

    const response = await fetch(process.env.VERA_URL_STREAM, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.VERA_TCKEN,
      },
      body: JSON.stringify({}),
    });

    console.log('📊 Vera API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Vera API error response:', errorText);
      return NextResponse.json(
        { error: `Vera API responded with ${response.status}: ${errorText}` },
        { status: 500 }
      );
    }

    const data = await response.json();
    console.log('✅ Vera API success response:', data);
    
    if (!data?.data?.token) {
      console.error('❌ No token in response:', data);
      return NextResponse.json(
        { error: 'No token received from Vera API' },
        { status: 500 }
      );
    }

    console.log('🎉 Token successfully retrieved');
    return NextResponse.json({ token: data.data.token });
    
  } catch (error) {
    console.error('💥 Unexpected error in get-access-token:', error);
    return NextResponse.json(
      { error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}
