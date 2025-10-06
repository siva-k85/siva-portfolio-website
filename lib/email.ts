import { Resend } from 'resend'

export async function sendEmail({ name, email, message }:{name:string,email:string,message:string}) {
  if (!process.env.RESEND_API_KEY) {
    console.log('Email would be sent:', { name, email, message })
    return
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  await resend.emails.send({
    from: 'noreply@sivakomaragiri.com',
    to: 'sivak85@cmu.edu',
    subject: `Portfolio contact from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`
  })
}