import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const formData = new FormData();
    formData.append("access_key", process.env.WEB3FORMS_KEY!);
    formData.append("Heading", "This message came from contact us form");
    formData.append("Name", data.name);
    formData.append("Email", data.email);
    formData.append("reachingOut", data.reachingOut || "N/A");
    formData.append("Message", data.message);

    const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
    });

    const result = await response.json();

    if (result.success) {
        return NextResponse.json({ success: true });
    } else {
        return NextResponse.json({ success: false, error: "Form submission failed" }, { status: 400 });
    }

    } catch (error) {
        console.error("Contact API Error:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
