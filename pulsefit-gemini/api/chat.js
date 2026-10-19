export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  if (req.method !== 'POST') return res.status(405).json({ error: 'Use POST for chat messages.' })
  if (!process.env.GEMINI_API_KEY) return res.status(503).json({ error: 'AI is not configured yet. Add GEMINI_API_KEY in Vercel Environment Variables.' })

  const { message, history = [] } = req.body || {}
  if (typeof message !== 'string' || !message.trim()) return res.status(400).json({ error: 'Please enter a message.' })
  if (message.length > 1500) return res.status(400).json({ error: 'Please keep messages under 1500 characters.' })

  const safeHistory = Array.isArray(history) ? history.slice(-8).filter(item =>
    item && ['user', 'assistant', 'model'].includes(item.role) && typeof item.content === 'string'
  ).map(item => ({
    role: item.role === 'assistant' ? 'model' : item.role,
    parts: [{ text: item.content.slice(0, 1500) }]
  })) : []

  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent', {
      method: 'POST',
      headers: {
        'x-goog-api-key': process.env.GEMINI_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: 'You are PulseFit AI, a friendly, concise assistant for a fitness studio website. Answer general questions about fitness, beginner-friendly training, recovery, classes and the sample PulseFit services. Do not claim that demo class times, bookings, prices, addresses, or staff profiles are verified or real. The Obama profile is a fictional website mock-up, not a real employment or endorsement claim. Do not diagnose medical conditions; encourage users to consult a qualified professional for medical concerns. Keep replies welcoming and practical.' }] },
        contents: [...safeHistory, { role: 'user', parts: [{ text: message.trim() }] }],
        generationConfig: { maxOutputTokens: 350, temperature: 0.7 }
      })
    })
    const data = await response.json()
    if (!response.ok) {
      console.error('Gemini API request failed:', response.status, data?.error?.status || '')
      return res.status(502).json({ error: 'The AI provider could not complete the request. Check your Gemini API key and its quota.' })
    }
    const reply = (data.candidates || []).flatMap(candidate => candidate.content?.parts || []).map(part => part.text || '').join('').trim()
    if (!reply) return res.status(502).json({ error: 'The AI returned an empty response. Please try again.' })
    return res.status(200).json({ reply })
  } catch (error) {
    console.error('PulseFit chat error:', error.message)
    return res.status(500).json({ error: 'The AI service is temporarily unavailable.' })
  }
}
