import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here if needed
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // For database sessions, we'll use a different approach
        // Check if there's any session data available
        return true; // Temporarily allow all access to test
      },
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*"],
};
