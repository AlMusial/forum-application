using Microsoft.AspNetCore.Http;

namespace forumApp.API.Helpers
{
    public static class Extensions
    {
        public static void AddApplicationError(this HttpResponse response, string message)
        {
            // dodanie dodatkowych nagłówkow aby przesłać wyjątki
            response.Headers.Add("Application-Error", message); // przekazujemy tutaj tresc bledu
            response.Headers.Add("Access-Control-Expose-Headers", "Application-Error"); // pozwalamy na jego wyswietlenie aplikacji w angularze
            response.Headers.Add("Access-Control-Allow-Origin", "*"); // * czyli dla kazdego
        }
    }
}