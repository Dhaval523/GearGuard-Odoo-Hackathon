import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

async def send_maintenance_email(payload: dict):
    """
    Sends an email notification when a new Maintenance Request is created.
    """
    recipient = payload.get("email") # Technician's email
    subject_text = payload.get("subject")
    eq_name = payload.get("equipmentName")

    # SMTP Configuration (Set these in your .env)
    SMTP_SERVER = "smtp.gmail.com"
    SMTP_PORT = 587
    SENDER_EMAIL = os.getenv("SENDER_EMAIL")
    SENDER_PASSWORD = os.getenv("SENDER_PASSWORD")

    msg = MIMEMultipart()
    msg['From'] = SENDER_EMAIL
    msg['To'] = recipient
    msg['Subject'] = f"New Maintenance Task: {subject_text}"

    body = f"Hello,\n\nA new maintenance request has been assigned for {eq_name}.\nSubject: {subject_text}\nPlease check your dashboard for details."
    msg.attach(MIMEText(body, 'plain'))

    try:
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(SENDER_EMAIL, SENDER_PASSWORD)
            server.send_message(msg)
            print(f"Worker: Email sent successfully to {recipient}")
    except Exception as e:
        print(f"Worker Error: Failed to send email: {e}")