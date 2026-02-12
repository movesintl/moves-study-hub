import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface InviteAgentRequest {
  email: string;
  contact_person: string;
  company_name?: string;
  phone?: string;
}

const EXTERNAL_SUPABASE_URL = "https://hhzjzbxpdnehbgwvmimm.supabase.co";
const EXTERNAL_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhoemp6YnhwZG5laGJnd3ZtaW1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3NjA2ODAsImV4cCI6MjA3ODMzNjY4MH0.hRwUSUYg7mry2h_ZBXhdaqRPkrZKMPgLLMTIuikLImI";

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const serviceRoleKey = Deno.env.get("EXTERNAL_SUPABASE_SERVICE_ROLE_KEY")!;
    if (!serviceRoleKey) {
      throw new Error("EXTERNAL_SUPABASE_SERVICE_ROLE_KEY not configured");
    }

    const supabaseAdmin = createClient(EXTERNAL_SUPABASE_URL, serviceRoleKey);

    // Verify the caller is an admin using their auth token against the external project
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header");
    }

    const callerClient = createClient(EXTERNAL_SUPABASE_URL, EXTERNAL_ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user: caller } } = await callerClient.auth.getUser();
    if (!caller) throw new Error("Unauthorized");

    const { data: callerProfile } = await supabaseAdmin
      .from("user_profiles")
      .select("role")
      .eq("user_id", caller.id)
      .single();

    if (callerProfile?.role !== "admin") {
      throw new Error("Only admins can invite agents");
    }

    const { email, contact_person, company_name, phone }: InviteAgentRequest = await req.json();

    if (!email || !contact_person) {
      throw new Error("Email and contact person are required");
    }

    // Create the user with a magic link invitation
    const { data: inviteData, error: inviteError } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
      data: {
        role: 'agent',
        contact_person,
        company_name,
      },
      redirectTo: `https://moves-study-hub.lovable.app/auth`,
    });

    if (inviteError) {
      throw new Error(`Failed to invite agent: ${inviteError.message}`);
    }

    const userId = inviteData.user.id;

    // Set user role to agent
    await supabaseAdmin
      .from("user_profiles")
      .upsert({ user_id: userId, role: "agent" }, { onConflict: "user_id" });

    // Create agent record
    const { error: agentError } = await supabaseAdmin
      .from("agents")
      .insert({
        user_id: userId,
        email,
        contact_person,
        company_name: company_name || null,
        phone: phone || null,
        is_active: true,
        invited_at: new Date().toISOString(),
      });

    if (agentError) {
      throw new Error(`Failed to create agent record: ${agentError.message}`);
    }

    return new Response(
      JSON.stringify({ success: true, message: "Agent invited successfully" }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error inviting agent:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
