# CaseGen

This project is a Vite + React application for generating and managing practice cases. The frontend expects an API server that exposes endpoints under `/api`.

### ChatGPT integration

`server.js` provides a small Express server which forwards `/api/integrations/invoke-llm` requests to the OpenAI API. Set an `OPENAI_API_KEY` environment variable before starting the server.

## Running the app

```bash
npm install
npm run dev
```
The frontend can be configured with a `VITE_API_BASE_URL` environment variable if your API server runs on a different host.

To start the API server used for ChatGPT integration:

```bash
OPENAI_API_KEY=your-key node server.js
```

## Building the app

```bash
npm run build
```

## Payments configuration

Create a `.env` file based on `.env.example` and set `VITE_STRIPE_PAYMENT_LINK` to the payment link generated in your Stripe account.
