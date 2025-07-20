"use client";

import Loading from "@/common/Loading";
import { useGetUsers } from "@/hooks/useAuth";
import UsersTable from "./UsersTable";
import { JSX } from "react";
import { User } from "@/types/authTypes";
import ResponsiveAdminHeader from "../ResponsiveAdminHeader";

function UsersPage(): JSX.Element {
  const { data, isLoading } = useGetUsers();
  const users: User[] = data?.users ?? [];

  if (isLoading) return <Loading />;

  return (
    <div className="p-4">
      <ResponsiveAdminHeader title="Users Information" />
      <UsersTable users={users ?? []} />
    </div>
  );
}

export default UsersPage;
