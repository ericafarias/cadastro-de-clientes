import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const AppQueryProvider = (props: React.PropsWithChildren) => {
    return (
        // Provide the client to your App
        <QueryClientProvider client={queryClient}>
            {props.children}
        </QueryClientProvider>
    );
};
