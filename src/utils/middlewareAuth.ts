// import { NextRequest } from 'next/server';
// import { toStringCookies } from './toStringCookies';

// type UserRole = "ADMIN" | "USER";

// interface User {
//     id: string
//     email: string
//     role: UserRole
// }

// interface ResponseData {
//     data?: {
//         user?: User;
//     }
// }

// export default async function middlewareAuth(req: NextRequest): Promise<User | undefined> {
//     const { data }: ResponseData = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
//         {
//             method: "GET",
//             credentials: "include",
//             headers: {
//                 cookie: toStringCookies(req.cookies)
//             }
//         }
//     ).then((res) => res.json())
//     const { user } = data || {}
//     return user
// }

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

  const { data }: ResponseData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
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
