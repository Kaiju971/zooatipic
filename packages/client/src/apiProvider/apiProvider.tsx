import { FC, PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export const ApiProvider: FC<PropsWithChildren> = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools />
    {children}
  </QueryClientProvider>
);
