import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge'

export default async function GET(req) {
    const { searchParams } = req.nextUrl;
    const postTitle = searchParams.get('title');

    const font = fetch(
        new URL('/public/fonts/helvetica-bold.ttf', import.meta.url)
    ).then((res) => res.arrayBuffer());
    const fontData = await font;

    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    backgroundImage: 'url(https://kenneth.io/images/og/og_bg.png)',
                }}
            >
                <div
                    style={{
                        marginLeft: 200,
                        marginRight: 640,
                        display: 'flex',
                        fontSize: 60,
                        fontWeight: 'bold',
                        fontFamily: 'Helvetica',
                        letterSpacing: '-0.05em',
                        color: '#000000',
                        lineHeight: '90px',
                        whiteSpace: 'pre-wrap',
                    }}
                >
                    {postTitle}
                </div>
            </div>
        ),
        {
            width: 1920,
            height: 1080,
            fonts: [
                {
                    name: 'Helvetica',
                    data: fontData,
                    weight: 800
                },
            ]
        }
    );
}