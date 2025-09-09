import axios from "axios";

const LOG_API = "http://20.244.56.144/evaluation-service/logs";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMjM0MWEwNWY3QGdtcml0LmVkdS5pbiIsImV4cCI6MTc1NzM5NjcxNywiaWF0IjoxNzU3Mzk1ODE3LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiN2YzYWJhMTctZGU2OS00NDliLWJiYTEtZWQyYzNmNGVlN2I4IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiZGl2YWthciBzYXRoaXZhZGEiLCJzdWIiOiIzZWNiMmM1MC1hMzFmLTRjYjYtYTM1MC1jMTVjZTJhMjEzMDMifSwiZW1haWwiOiIyMjM0MWEwNWY3QGdtcml0LmVkdS5pbiIsIm5hbWUiOiJkaXZha2FyIHNhdGhpdmFkYSIsInJvbGxObyI6IjIyMzQxYTA1ZjciLCJhY2Nlc3NDb2RlIjoiZWV0aE5lIiwiY2xpZW50SUQiOiIzZWNiMmM1MC1hMzFmLTRjYjYtYTM1MC1jMTVjZTJhMjEzMDMiLCJjbGllbnRTZWNyZXQiOiJCaHVkelJVQnV5S3dYWnNVIn0.GlMuJUDLNbp-8ThpCx_8h2bp00NX-uYFpIq47YCD8k0";

const validStacks = ["frontend"];
const validLevels = ["debug", "info", "warn", "error", "fatal"];
const frontendPackages = ["api", "component", "hook", "page", "state", "style"];
const sharedPackages = ["auth", "config", "middleware", "utils"];

export async function Log(stack, level, pkg, message) {
  try {
    if (!validStacks.includes(stack)) throw new Error("Invalid stack (frontend only)");
    if (!validLevels.includes(level)) throw new Error("Invalid log level");
    if (!(frontendPackages.includes(pkg) || sharedPackages.includes(pkg))) {
      throw new Error("Invalid package for frontend");
    }

    const payload = { stack, level, package: pkg, message };

    const response = await axios.post(LOG_API, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    console.log("Log sent:", response.data);
    return response.data;
  } catch (err) {
    console.error("Log failed:", err.message);
    return null;
  }
}
