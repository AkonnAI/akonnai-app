import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
})

async function sendEmail(
  to: string, subject: string, html: string
) {
  try {
    await transporter.sendMail({
      from: `"AKMIND" <${process.env.GMAIL_USER}>`,
      to, subject, html
    })
    console.log('Email sent to', to)
  } catch(e) {
    console.error('Email failed:', e)
  }
}

export async function sendWelcomeEmail(
  email: string, name: string
) {
  await sendEmail(
    email,
    'Welcome to AKMIND!',
    `<div style="font-family:Arial;max-width:600px;margin:0 auto">
      <div style="background:#4f46e5;padding:32px;text-align:center">
        <h1 style="color:white;margin:0">AKMIND</h1>
        <p style="color:#c7d2fe;margin:4px 0 0">
          Dream. Discover. Shine.
        </p>
      </div>
      <div style="padding:32px">
        <h2 style="color:#1e293b">Welcome, ${name}!</h2>
        <p style="color:#475569">
          Your AKMIND account is ready. 
          Start your AI learning journey today.
        </p>
        <div style="text-align:center;margin:24px 0">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}"
             style="background:#4f46e5;color:white;
                    padding:14px 28px;border-radius:10px;
                    text-decoration:none;font-weight:bold">
            Go to Dashboard →
          </a>
        </div>
      </div>
      <div style="background:#f8fafc;padding:16px;
                  text-align:center;color:#94a3b8;
                  font-size:12px">
        AKMIND by AkonnAI LLP, Bengaluru India
      </div>
    </div>`
  )
}

export async function sendAdminBookingNotification(
  booking: {
    parentName: string, email: string,
    phone: string, childName: string,
    course: string, date: string, time: string,
    id: string
  }
) {
  await sendEmail(
    process.env.SES_ADMIN_EMAIL || 
    process.env.GMAIL_USER!,
    `New Booking — ${booking.childName} (${booking.parentName})`,
    `<div style="font-family:Arial;max-width:600px">
      <h2 style="color:#4f46e5">New Demo Booking</h2>
      <table style="width:100%;border-collapse:collapse;
                    font-size:14px">
        <tr><td style="padding:8px;color:#64748b">
          Parent</td>
          <td style="padding:8px;font-weight:bold">
          ${booking.parentName}</td></tr>
        <tr><td style="padding:8px;color:#64748b">
          Email</td>
          <td style="padding:8px">${booking.email}</td></tr>
        <tr><td style="padding:8px;color:#64748b">
          Phone</td>
          <td style="padding:8px">${booking.phone}</td></tr>
        <tr><td style="padding:8px;color:#64748b">
          Child</td>
          <td style="padding:8px;font-weight:bold">
          ${booking.childName}</td></tr>
        <tr><td style="padding:8px;color:#64748b">
          Course</td>
          <td style="padding:8px">${booking.course}</td></tr>
        <tr><td style="padding:8px;color:#64748b">
          Date</td>
          <td style="padding:8px">
          ${booking.date} at ${booking.time}</td></tr>
        <tr><td style="padding:8px;color:#64748b">
          Booking ID</td>
          <td style="padding:8px;font-size:12px;
                     color:#94a3b8">${booking.id}</td></tr>
      </table>
    </div>`
  )
}

export async function sendParentBookingConfirmation(
  email: string,
  booking: {
    parentName: string, childName: string,
    course: string, date: string, time: string,
    id: string
  },
  demoToken?: string
) {
  const demoLink = demoToken
    ? `${process.env.DEMO_APP_URL || 'http://demo.akmind.com'}?token=${demoToken}`
    : null

  await sendEmail(
    email,
    'Your AKMIND Demo is Confirmed!',
    `<div style="font-family:Arial;max-width:600px;
                 margin:0 auto">
      <div style="background:#4f46e5;padding:32px;
                  text-align:center">
        <h1 style="color:white;margin:0">AKMIND</h1>
        <p style="color:#c7d2fe;margin:4px 0 0">
          Dream. Discover. Shine.
        </p>
      </div>
      <div style="padding:32px">
        <h2 style="color:#1e293b">
          Hi ${booking.parentName}!
        </h2>
        <p style="color:#475569">
          Your demo class for 
          <strong>${booking.childName}</strong> 
          is confirmed.
        </p>
        <div style="background:#f8fafc;
                    border-radius:12px;padding:20px;
                    margin:20px 0">
          <table style="width:100%;font-size:14px">
            <tr>
              <td style="color:#64748b;padding:6px 0">
                Program</td>
              <td style="font-weight:bold;padding:6px 0">
                ${booking.course}</td>
            </tr>
            <tr>
              <td style="color:#64748b;padding:6px 0">
                Date</td>
              <td style="padding:6px 0">
                ${booking.date}</td>
            </tr>
            <tr>
              <td style="color:#64748b;padding:6px 0">
                Time</td>
              <td style="padding:6px 0">
                ${booking.time}</td>
            </tr>
          </table>
        </div>

        ${demoLink ? `
        <div style="background:#eef2ff;
                    border-radius:12px;padding:20px;
                    margin:20px 0;
                    border:1px solid #c7d2fe">
          <p style="color:#3730a3;font-weight:bold;
                    margin:0 0 8px">
            🎮 Start Your Free Demo Now!
          </p>
          <p style="color:#4338ca;font-size:13px;
                    margin:0 0 16px">
            ${booking.childName} can start 
            4 free AI lessons right now 
            while waiting for the live class.
          </p>
          <div style="text-align:center">
            <a href="${demoLink}"
               style="background:#4f46e5;color:white;
                      padding:12px 24px;
                      border-radius:10px;
                      text-decoration:none;
                      font-weight:bold;
                      font-size:14px">
              Start Demo Lessons →
            </a>
          </div>
        </div>
        ` : ''}

        <p style="color:#94a3b8;font-size:12px;
                  margin-top:24px">
          A mentor will contact you with the 
          video call link before your session.
          Questions? Email hello@akmind.com
        </p>
      </div>
      <div style="background:#f8fafc;padding:16px;
                  text-align:center;color:#94a3b8;
                  font-size:12px">
        AKMIND by AkonnAI LLP, Bengaluru India
      </div>
    </div>`
  )
}

export async function sendCareerApplicationAdmin(
  app: {
    name: string, email: string,
    phone: string, role: string,
    message: string
  }
) {
  await sendEmail(
    process.env.SES_ADMIN_EMAIL ||
    process.env.GMAIL_USER!,
    `New Application — ${app.role} — ${app.name}`,
    `<div style="font-family:Arial;max-width:600px">
      <h2 style="color:#4f46e5">New Job Application</h2>
      <table style="width:100%;border-collapse:collapse;
                    font-size:14px">
        <tr><td style="padding:8px;color:#64748b">
          Name</td>
          <td style="padding:8px">${app.name}</td></tr>
        <tr><td style="padding:8px;color:#64748b">
          Email</td>
          <td style="padding:8px">${app.email}</td></tr>
        <tr><td style="padding:8px;color:#64748b">
          Phone</td>
          <td style="padding:8px">${app.phone}</td></tr>
        <tr><td style="padding:8px;color:#64748b">
          Role</td>
          <td style="padding:8px;font-weight:bold">
          ${app.role}</td></tr>
        <tr><td style="padding:8px;color:#64748b">
          Message</td>
          <td style="padding:8px">${app.message}</td></tr>
      </table>
    </div>`
  )
}

export async function sendCareerApplicationConfirmation(
  email: string, name: string, role: string
) {
  await sendEmail(
    email,
    'Application Received — AKMIND',
    `<div style="font-family:Arial;max-width:600px;
                 margin:0 auto">
      <div style="background:#4f46e5;padding:32px;
                  text-align:center">
        <h1 style="color:white;margin:0">AKMIND</h1>
      </div>
      <div style="padding:32px">
        <h2 style="color:#1e293b">
          Thanks, ${name}!
        </h2>
        <p style="color:#475569">
          We received your application for 
          <strong>${role}</strong>.
          Our team will review it and get 
          back to you within 3 working days.
        </p>
      </div>
    </div>`
  )
}
