import { NextRequest } from "next/server";

interface User {
  id: string;
  email: string;
  role: "ADMIN" | "USER";
}

interface ResponseData {
  data?: {
    user?: User;
  };
}

export default async function middlewareAuth(
  req: NextRequest
): Promise<User | undefined> {
  const cookieHeader = req.headers.get("cookie") || "";

  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "";

  const { data }: ResponseData = await fetch(
    // `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
    `${baseUrl}/user/profile`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        cookie: cookieHeader,
      },
    }
  ).then((res) => res.json());

  return data?.user;
}
