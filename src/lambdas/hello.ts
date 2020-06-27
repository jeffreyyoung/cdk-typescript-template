import { corsHeaders } from "../utils/corsHeaders";

exports.handler = async (event: any) => {
  console.log('request:', JSON.stringify(event, undefined, 2));
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/plain', ...corsHeaders },
    body: `Hello, CDK! You've hit ${event?.path}\n`
  };
};