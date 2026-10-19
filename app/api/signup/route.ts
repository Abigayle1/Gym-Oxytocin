import { NextResponse } from "next/server";
import { google } from "googleapis";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      medicalCondition,
      conditionDetails,
      fitnessFocus,
      lastExercise,
    } = body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !medicalCondition ||
      !fitnessFocus ||
      !lastExercise
    ) {
      return NextResponse.json(
        { message: "Please complete all required fields." },
        { status: 400 }
      );
    }

    if (medicalCondition === "Yes" && !conditionDetails) {
      return NextResponse.json(
        { message: "Please enter the medical condition." },
        { status: 400 }
      );
    }

    /**
     * 1. Save to Google Sheets
     */
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({
      version: "v4",
      auth,
    });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Sheet1!A:I",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            new Date().toLocaleString(),
            firstName,
            lastName,
            email,
            phone,
            medicalCondition,
            conditionDetails || "N/A",
            fitnessFocus,
            lastExercise,
          ],
        ],
      },
    });

    /**
     * 2. Try to send email notification
     *
     * If email fails, do not fail the whole form submission.
     * The form data has already been saved to Google Sheets.
     */
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: process.env.OWNER_EMAIL,
        subject: "New Gym Oxytocin Signup",
        html: `
          <h2>New Signup Form Submission</h2>

          <p><strong>First Name:</strong> ${firstName}</p>
          <p><strong>Last Name:</strong> ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>

          <p><strong>Medical Condition:</strong> ${medicalCondition}</p>
          <p><strong>Condition Details:</strong> ${conditionDetails || "N/A"}</p>

          <p><strong>Fitness Focus:</strong> ${fitnessFocus}</p>
          <p><strong>Last Exercise:</strong> ${lastExercise}</p>
        `,
      });
    } catch (emailError) {
      console.error("Email notification failed:", emailError);
    }

    /**
     * 3. Return success once the form has been saved
     */
    return NextResponse.json(
      { message: "Form submitted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Signup submission error:", error);

    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}