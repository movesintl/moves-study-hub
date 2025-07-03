import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BulkEmailRequest {
  recipients: { email: string; name: string }[];
  subject: string;
  content: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { recipients, subject, content }: BulkEmailRequest = await req.json();

    if (!recipients || recipients.length === 0) {
      throw new Error("No recipients provided");
    }

    if (!subject || !content) {
      throw new Error("Subject and content are required");
    }

    console.log(`Sending bulk email to ${recipients.length} recipients`);

    // Send emails in batches to avoid rate limits
    const batchSize = 10;
    const results = [];

    for (let i = 0; i < recipients.length; i += batchSize) {
      const batch = recipients.slice(i, i + batchSize);
      
      const batchPromises = batch.map(async (recipient) => {
        try {
          const emailResponse = await resend.emails.send({
            from: "Moves International <onboarding@resend.dev>",
            to: [recipient.email],
            subject: subject,
            html: `
              <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
                <h2>Hello ${recipient.name}!</h2>
                <div style="line-height: 1.6; margin: 20px 0;">
                  ${content.replace(/\n/g, '<br>')}
                </div>
                <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
                <p style="color: #666; font-size: 14px;">
                  This email was sent to you because you opted in to receive updates from Moves International.
                  <br><br>
                  If you no longer wish to receive these emails, please contact us.
                </p>
                <p style="color: #666; font-size: 12px;">
                  <strong>Moves International</strong><br>
                  Your trusted partner in international education
                </p>
              </div>
            `,
          });

          return {
            email: recipient.email,
            success: true,
            messageId: emailResponse.data?.id,
          };
        } catch (error) {
          console.error(`Failed to send email to ${recipient.email}:`, error);
          return {
            email: recipient.email,
            success: false,
            error: error.message,
          };
        }
      });

      const batchResults = await Promise.allSettled(batchPromises);
      results.push(...batchResults.map(r => r.status === 'fulfilled' ? r.value : r.reason));

      // Add a small delay between batches
      if (i + batchSize < recipients.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    const successCount = results.filter(r => r.success).length;
    const failureCount = results.filter(r => !r.success).length;

    console.log(`Bulk email campaign completed: ${successCount} sent, ${failureCount} failed`);

    return new Response(JSON.stringify({
      success: true,
      totalSent: successCount,
      totalFailed: failureCount,
      results: results,
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-bulk-email function:", error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);