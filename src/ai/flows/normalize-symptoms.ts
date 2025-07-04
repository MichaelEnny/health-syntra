// src/ai/flows/normalize-symptoms.ts
'use server';
/**
 * @fileOverview Normalizes user-entered symptoms using natural language processing.
 *
 * - normalizeSymptoms - A function that normalizes symptoms from natural language.
 * - NormalizeSymptomsInput - The input type for the normalizeSymptoms function.
 * - NormalizeSymptomsOutput - The return type for the normalizeSymptoms function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const NormalizeSymptomsInputSchema = z.object({
  symptoms: z
    .string()
    .describe("The user's symptoms described in natural language."),
});
export type NormalizeSymptomsInput = z.infer<typeof NormalizeSymptomsInputSchema>;

const NormalizeSymptomsOutputSchema = z.object({
  normalizedSymptoms: z
    .string()
    .describe("The user's symptoms, normalized into a standard format."),
});
export type NormalizeSymptomsOutput = z.infer<typeof NormalizeSymptomsOutputSchema>;

export async function normalizeSymptoms(input: NormalizeSymptomsInput): Promise<NormalizeSymptomsOutput> {
  return normalizeSymptomsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'normalizeSymptomsPrompt',
  input: {schema: NormalizeSymptomsInputSchema},
  output: {schema: NormalizeSymptomsOutputSchema},
  prompt: `You are a medical AI assistant responsible for normalizing user-reported symptoms into standardized medical terminology.

User Symptoms: {{{symptoms}}}

Convert the user's symptoms into a concise, clear, and standardized string.
Your response MUST be a JSON object with a single key "normalizedSymptoms".

Example:
User input: "my head is pounding and my nose is runny"
Your output:
{
  "normalizedSymptoms": "Severe headache, rhinorrhea"
}

Now, process the provided user symptoms.`,
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
       {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_NONE',
      },
    ]
  }
});

const normalizeSymptomsFlow = ai.defineFlow(
  {
    name: 'normalizeSymptomsFlow',
    inputSchema: NormalizeSymptomsInputSchema,
    outputSchema: NormalizeSymptomsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
