

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

type UserButtonProps = {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
};

export default function UserButton({ user }: UserButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  if (!user) {
    return null;
  }

  const getUserInitials = () => {
    if (user.name) {
      return user.name
        .trim()
        .split(/\s+/)
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
    }

    return user.email?.slice(0, 2).toUpperCase() || "U";
  };

  const handleSignOut = async () => {
    try {
      setIsLoading(true);

      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.replace("/sign-in");
            router.refresh();
          },

          onError: (context) => {
            console.error("Sign out error:", context.error);
          },
        },
      });
    } catch (error) {
      console.error("Sign out error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DropdownMenu>
      {/* Avatar trigger */}
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            className="h-10 w-10 rounded-full p-0"
            disabled={isLoading}
            aria-label="Open user menu"
          />
        }
      >
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={user.image || undefined}
            alt={user.name || "User avatar"}
          />

          <AvatarFallback className="bg-primary font-medium text-primary-foreground">
            {getUserInitials()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      {/* Dropdown content */}
      <DropdownMenuContent align="end" className="w-64">
  {/* User details group */}
  <DropdownMenuGroup>
    <DropdownMenuLabel className="font-normal">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={user.image || undefined}
            alt={user.name || "User avatar"}
          />

          <AvatarFallback>
            {getUserInitials()}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0">
          <p className="truncate text-sm font-medium">
            {user.name || "User"}
          </p>

          <p className="truncate text-xs text-muted-foreground">
            {user.email || "Email not available"}
          </p>
        </div>
      </div>
    </DropdownMenuLabel>
  </DropdownMenuGroup>

  <DropdownMenuSeparator />

  {/* Action group */}
  <DropdownMenuGroup>
    <DropdownMenuItem
      onClick={handleSignOut}
      disabled={isLoading}
      className="cursor-pointer text-destructive focus:text-destructive"
    >
      <LogOut className="mr-2 h-4 w-4" />

      {isLoading ? "Signing out..." : "Sign out"}
    </DropdownMenuItem>
  </DropdownMenuGroup>
</DropdownMenuContent>
    </DropdownMenu>
  );
}