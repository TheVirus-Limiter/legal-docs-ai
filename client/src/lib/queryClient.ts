import { QueryClient, QueryFunction } from "@tanstack/react-query";

// Import mock API for static deployment
const isStaticDeployment = import.meta.env.VITE_STATIC_DEPLOYMENT === 'true';

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  // For static deployment, return mock response
  if (isStaticDeployment) {
    const { staticTemplates, staticBlogPosts } = await import('./static-data');
    
    if (url === '/api/templates') {
      return new Response(JSON.stringify(staticTemplates), { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    if (url === '/api/blog') {
      return new Response(JSON.stringify(staticBlogPosts), { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    if (url === '/api/generate-document' && method === 'POST') {
      const mockDoc = {
        documentId: Date.now(),
        title: "Generated Document",
        content: "This is a demo document generated for static deployment. Please note that AI generation requires a live server environment."
      };
      return new Response(JSON.stringify(mockDoc), { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
  
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const url = queryKey.join("/") as string;
    
    // For static deployment, return mock data
    if (isStaticDeployment) {
      const { staticTemplates, staticBlogPosts } = await import('./static-data');
      
      if (url === '/api/templates') {
        return staticTemplates;
      }
      
      if (url === '/api/blog') {
        return staticBlogPosts;
      }
      
      return null;
    }
    
    const res = await fetch(url, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
