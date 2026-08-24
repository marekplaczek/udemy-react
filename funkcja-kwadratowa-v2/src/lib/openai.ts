type ResponseContent = {
  type?: string;
  text?: string;
};

type ResponseOutput = {
  type?: string;
  content?: ResponseContent[];
};

type OpenAIResponse = {
  output?: ResponseOutput[];
  error?: { message?: string } | null;
};

export type OpenAIInputContent =
  | { type: "input_text"; text: string }
  | { type: "input_image"; image_url: string; detail?: "low" | "high" | "auto" };

export async function callOpenAI({
  instructions,
  content,
  maxOutputTokens = 1400,
}: {
  instructions: string;
  content: OpenAIInputContent[];
  maxOutputTokens?: number;
}) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("Brak OPENAI_API_KEY w środowisku serwera");
  }

  const model = process.env.OPENAI_MODEL || "gpt-5.6-terra";
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      instructions,
      input: [
        {
          role: "user",
          content,
        },
      ],
      max_output_tokens: maxOutputTokens,
      store: false,
    }),
  });

  const data = (await response.json()) as OpenAIResponse;
  if (!response.ok) {
    throw new Error(data.error?.message || `OpenAI API: HTTP ${response.status}`);
  }

  const text = (data.output || [])
    .filter((item) => item.type === "message")
    .flatMap((item) => item.content || [])
    .filter((item) => item.type === "output_text" && typeof item.text === "string")
    .map((item) => item.text)
    .join("\n")
    .trim();

  if (!text) {
    throw new Error("Model nie zwrócił odpowiedzi tekstowej");
  }

  return text;
}
