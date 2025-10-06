export async function verifyRecaptcha(token: string): Promise<boolean> {
  if (process.env.NODE_ENV === 'test') {
    return true
  }
  if (!token) return false

  const projectId = process.env.RECAPTCHA_PROJECT_ID
  const apiKey = process.env.RECAPTCHA_API_KEY
  const siteKey = process.env.RECAPTCHA_SITE_KEY

  if (!projectId || !apiKey || !siteKey) {
    console.error('reCAPTCHA environment variables are not set.')
    // In development, allow through if env vars not set
    return process.env.NODE_ENV === 'development'
  }

  const url = `https://recaptchaenterprise.googleapis.com/v1/projects/${projectId}/assessments?key=${apiKey}`

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event: {
          token: token,
          siteKey: siteKey,
          expectedAction: 'CONTACT_FORM_SUBMIT',
        },
      }),
    })

    const data = await response.json()

    // Check for token validity and score
    if (data.tokenProperties?.valid && data.riskAnalysis?.score >= 0.7) {
      return true
    }

    console.log('reCAPTCHA validation failed:', {
      valid: data.tokenProperties?.valid,
      score: data.riskAnalysis?.score,
    })
    return false
  } catch (error) {
    console.error('reCAPTCHA verification failed:', error)
    return false
  }
}
