import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export async function createMessage(body: string, to: string) {
    if (!body || !to) {
        throw new Error('Body and recipient number are required');
    }

    try {
        const message = await client.messages.create({
            body,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: `+91${to}`,
        });
        console.log(message.toJSON())
        // Twilio returns success with message.sid even if there are errors
        // Check for specific error conditions
        if (message.errorCode) {
            throw new Error(`Twilio Error ${message.errorCode}: ${message.errorMessage}`);
        }

        return message;

    } catch (error) {
        // Handle specific Twilio errors
        if (error instanceof Error) {
            throw error;
        }
        // Handle unexpected errors
        throw new Error('Failed to send message');
    }
}