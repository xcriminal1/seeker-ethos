import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/hooks/useTheme";
import { Palette } from "lucide-react";

export const ThemeSelector = () => {
  const { theme, setTheme, themes } = useTheme();

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Choose Your Theme
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {themes.map((themeOption) => (
            <Button
              key={themeOption.value}
              variant={theme === themeOption.value ? "default" : "outline"}
              onClick={() => setTheme(themeOption.value)}
              className={`h-20 flex flex-col items-center justify-center gap-2 ${themeOption.colors}`}
            >
              <div 
                className={`w-6 h-6 rounded-full ${
                  themeOption.value === 'light' ? 'bg-white border border-gray-300' :
                  themeOption.value === 'dark' ? 'bg-gray-900' :
                  themeOption.value === 'blue' ? 'bg-blue-500' :
                  themeOption.value === 'green' ? 'bg-green-500' :
                  'bg-purple-500'
                }`} 
              />
              <span className="text-sm font-medium">{themeOption.label}</span>
            </Button>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-4 text-center">
          Current theme: <span className="font-medium capitalize">{theme}</span>
        </p>
      </CardContent>
    </Card>
  );
};
