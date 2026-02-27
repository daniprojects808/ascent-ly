import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Extract bearer token from Authorization header
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Missing or invalid Authorization header. Expected: Bearer <token>" },
        { status: 401 }
      );
    }

    const token = authHeader.replace("Bearer ", "");

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Create a Supabase client with the user's bearer token
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    // Verify the token and get the user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { job_title, company_name, job_url, status, notes, date_applied } = body;

    // Validate required fields
    if (!company_name || typeof company_name !== "string") {
      return NextResponse.json(
        { error: "company_name is required and must be a string" },
        { status: 400 }
      );
    }

    // Validate status if provided
    const validStatuses = ["not_started", "in_progress", "completed"];
    const applicationStatus = status && validStatuses.includes(status) ? status : "not_started";

    // Insert the application
    const { data, error: insertError } = await supabase
      .from("applications")
      .insert({
        user_id: user.id,
        position_title: job_title || "Untitled Position",
        company_name: company_name.trim(),
        job_url: job_url || null,
        status: applicationStatus,
        notes: notes || null,
        applied_date: date_applied || new Date().toISOString().split("T")[0],
      })
      .select()
      .single();

    if (insertError) {
      console.error("Insert error:", insertError);
      return NextResponse.json(
        { error: "Failed to create application", details: insertError.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Application created successfully",
        data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
