"use client";
import Image from "next/image";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";
import { useState, useEffect } from "react";
interface Answer {
  headline: String;
  details: string;
}
export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState<any>();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setAnswer(null);
    setLoading(true);
    const response = await fetch("/api/gemini", {
      method: "POST",
      body: JSON.stringify({
        prompt: prompt,
      }),
    });
    const reqData = await response.json();
    setAnswer(reqData.data);
    console.log(answer);

    setLoading(false);
  };

  return (
    <div className="px-5 py-2">
      <h2 className="text-2xl font-bold">My Little GPT </h2>
      <div>
        <input
          type="text"
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
          placeholder="enter the prompt"
          className="border-2 border-neutral-600 min-w-[50%] min-h-[5vh] px-4 my-2"
        />
        <button
          className="px-2 py-2 bg-black text-white mx-2"
          onClick={() => {
            fetchData();
          }}
        >
          Search
        </button>
      </div>
      <div>{loading && <div>...is loading</div>}</div>
      <div>
        {answer !== null && (
          <div>
            <p>{answer?.headline}</p>
            <p>{answer?.response}</p>
            {/* <h2 className="font-semibold text-lg">
              Krishna Score : {answer?.krishnaScore}
            </h2>
            <h3>
              {" "}
              <span className="font-semibold">Summary</span>{" "}
              {answer?.KrishnaScoreDescription}
            </h3>
            <div>
              <h2 className="font-semibold">
                Here are some suggestions to improve your score{" "}
              </h2>
              {answer?.recommendations.map((rec: any) => {
                return <li>{rec.text}</li>;
              })}
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
}
