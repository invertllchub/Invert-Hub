import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();


    const web3Form = new FormData();
    web3Form.append("access_key", process.env.WEB3FORMS_KEY!);
    web3Form.append("Job Title", data.get("Job Title") as string);
    web3Form.append("Full Name", data.get("Full Name") as string);
    web3Form.append("Gender", data.get("Gender") as string);
    web3Form.append("Email", data.get("Email") as string);
    web3Form.append("Phone Number", data.get("Phone Number") as string);
    web3Form.append("CoverLetter", data.get("CoverLetter") as string);
    web3Form.append("CV_Link", data.get("CV_Link") as string);


    const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: web3Form,
    });

    const result = await response.json();

    if (result.success) {
        return NextResponse.json({ success: true });
    } else {
        return NextResponse.json(
            { success: false, error: "Form submission failed" },
            { status: 400 }
        );
    }
    } catch (error) {
        console.error("Job Application API Error:", error);
        return NextResponse.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
