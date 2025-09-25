import { FilterProps } from "../../../types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Get search parameters from the request
    const searchParams = request.nextUrl.searchParams;
    const manufacturer = searchParams.get("manufacturer") || "";
    const year = searchParams.get("year") || "2022";
    const model = searchParams.get("model") || "";
    const limit = searchParams.get("limit") || "10";
    const fuel = searchParams.get("fuel") || "";

    // Server-only API key (not exposed to client)
    const API_KEY = process.env.RAPID_API_KEY;

    if (!API_KEY) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    // Set headers for RapidAPI request
    const headers: HeadersInit = {
      "X-RapidAPI-Key": API_KEY,
      "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
    };

    // Build the API URL
    const apiUrl = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`;

    // Make the request to RapidAPI
    const response = await fetch(apiUrl, { headers });

    if (!response.ok) {
      throw new Error(`RapidAPI request failed: ${response.status}`);
    }

    const result = await response.json();

    // Return the data
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching cars:", error);
    return NextResponse.json(
      { error: "Failed to fetch cars data" },
      { status: 500 }
    );
  }
}
