import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

export async function POST(request: Request) {
  let { hobbies, age, city, gender, additionalInfo, language, words, name } =
    await request.json();

  if (!name) {
    name = ",";
  } else {
    name = `${name},`;
  }
  if (gender === "other") {
    gender = ",";
  } else {
    gender = `${gender},`;
  }
  let prompt = `Create a first message for a meeting app, keeping it around ${words} words. Please incorporate the following details:  the person i'm sending this is ${name} ${gender} ${age}yo in ${language}`;
  if (hobbies.length > 0)
    prompt += " and their hobbies are " + JSON.stringify(hobbies);
  if (city.length > 0) prompt += " live in " + city;
  if (additionalInfo.length > 0)
    prompt += " additionnals infos : " + additionalInfo;

  console.log(prompt);
  const result = await model.generateContent(prompt);

  console.log(result.response);

  return NextResponse.json(result.response.text());
}
