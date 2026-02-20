import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    const result = await supabase.from('SELECT 1')
    return Response.json({ connected: true, result: result })
  } catch (error) {
    console.error('DB error:', error)
    return new Response('Database error', { status: 500 })
  }
}
