// Backend health check utility
export const checkBackendHealth = async (): Promise<{ isHealthy: boolean; message: string }> => {
  try {
    console.log("Checking backend health...");
    
    const response = await fetch("http://localhost:3000/health", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      return { isHealthy: true, message: "Backend is running" };
    } else {
      return { isHealthy: false, message: `Backend responded with status: ${response.status}` };
    }
  } catch (error) {
    console.error("Backend health check failed:", error);
    return { 
      isHealthy: false, 
      message: "Cannot connect to backend. Please ensure the server is running on http://localhost:3000" 
    };
  }
};

// Alternative endpoints to try if main endpoint fails
export const tryAlternativeAuth = async (endpoint: string, data: Record<string, unknown>): Promise<Response> => {
  const endpoints = [
    `http://localhost:3000/${endpoint}`,
    `http://127.0.0.1:3000/${endpoint}`,
    // Add more alternative endpoints if needed
  ];

  let lastError;
  
  for (const url of endpoints) {
    try {
      console.log(`Trying endpoint: ${url}`);
      
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      console.log(`Response from ${url}:`, response.status);
      return response; // Return first successful response
      
    } catch (error) {
      console.error(`Failed to connect to ${url}:`, error);
      lastError = error;
      continue; // Try next endpoint
    }
  }
  
  // If all endpoints failed, throw the last error
  throw lastError;
};
