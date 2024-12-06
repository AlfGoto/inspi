import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(request: Request) {
  const { hobbies, age, city, gender, additionalInfo, language, words, name } =
    await request.json();

  const result = await model.generateContent(
    `Give me only the first message (close to ${words} words) i can send to ${name}, ${gender}, ${age}yo with those infos and respond in ${language} infos : ${JSON.stringify(
      [hobbies, city, additionalInfo]
    )}`
  );

  console.log(result.response);

  return NextResponse.json(result.response.text());
}
