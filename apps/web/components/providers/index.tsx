import { ThemeProvider } from "@repo/ui/components/theme/provider";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      {children}
    </ThemeProvider>
  );
}

export { Providers };
