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

    console.log('📡 Calling Vera API with LiveAvatar configuration');

    // Make sure to use the new LiveAvatar endpoint, bypassing the sunset URL
    const liveAvatarUrl = process.env.VERA_URL_STREAM || "https://api.liveavatar.com";



    const response = await fetch(`${liveAvatarUrl}/v1/sessions/token`, {
      method: "POST",
      headers: {
        "X-API-KEY": process.env.VERA_TCKEN,
        "Content-Type": "application/json",
      },
      /*body: JSON.stringify({
        mode: "CUSTOM",
        avatar_id: "073b60a9-89a8-45aa-8902-c358f64d2852"
      }),*/
      body: JSON.stringify({
        mode: "FULL",
        avatar_id: "073b60a9-89a8-45aa-8902-c358f64d2852",
        avatar_persona: {
          voice_id: "c2527536-6d1f-4412-a643-53a3497dada9",
          context_id: "5b9dba8a-aa31-11f0-a6ee-066a7fa2e369",
          language: "en",
        },
      }),
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

    if (!data?.data?.session_token) {
      console.error('❌ No token in response:', data);
      return NextResponse.json(
        { error: 'No token received from LiveAvatar API' },
        { status: 500 }
      );
    }

    console.log('🎉 Token successfully retrieved');
    return NextResponse.json({ token: data.data.session_token });

  } catch (error) {
    console.error('💥 Unexpected error in get-access-token:', error);
    return NextResponse.json(
      { error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}
