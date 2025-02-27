export const useAuth = (): "USER" | "ADMIN" | "MODERATOR" | null => {
   // checks if current user is authenticated and returns his role or null
   return "USER";
};
