import "next-auth";

// next-authの拡張
declare module "next-auth" {
  interface User {
    id?: string;
  }

  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
  }
}
