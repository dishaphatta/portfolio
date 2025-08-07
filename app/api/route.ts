export async function POST(req: Request) {
    const { ip } = await req.json()

    const res = await fetch(`https://api.abuseipdb.com/api/v2/check?ipAddress=${ip}&maxAgeInDays=90`, {
        method: "GET",
        headers: {
            Key: process.env.ABUSEIPDB_API_KEY || "", // keep this in .env
            Accept: "application/json",
        },
    })

    const data = await res.json()
    return new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
    })
}
