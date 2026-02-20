/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  BiLogOutCircle,
  BiUser,
  BiReceipt,
  BiChevronDown,
} from "react-icons/bi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { authClient, useSession } from "@/lib/auth-client";

const user = {
  name: "",
  email: "",
  imageUrl: "",
};
interface SessionUser {
  id: string;
  name: string;
  emailVerified: boolean;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null;
}

interface SessionObject {
  id: string;
  token: string;
  userId: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
  userAgent?: string | null;
  ip?: string | null;
}

interface SessionData {
  user: SessionUser;
  session: SessionObject;
}

interface UserDetailProps {
  setOpen?: (open: boolean) => void;
  triggerClass?: string;
}

export const UserDetail = ({ setOpen, triggerClass }: UserDetailProps) => {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data: session, isPending, error, refetch } = useSession();

  const handleLinkClick =
    (href: string) =>
    (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      if (setOpen) setOpen(false); 
      setDropdownOpen(false); 
    };

    const handleSignOut=async()=>{
        await authClient.signOut();
        refetch();
    }

  return (
    <>
      {session ? (
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger
          className={cn(
            `sm:py-3 py-2 outline-none focus-visible:outline-none transition-all ${triggerClass}`
          )}
        >
          <div className="flex items-center gap-3 justify-between w-full relative">
            <div className="flex items-center gap-3 leading-tight w-full text-sm sm:mr-2">
              <Image
                className="h-8 w-8 min-w-8 rounded-full"
                src={
                  `https://cdn.pixelbin.io/v2/fyndacademy-hub-2024/original/frontend-fynd-academy/Default_User_Avatar.svg`
                }
                alt={session?.user?.name || user.name}
                width={120}
                height={120}
              />
              <span className="sm:block hidden overflow-hidden text-ellipsis pr-4 max-w-72 min-w-8 ">
                {session?.user?.name || user.name}
              </span>
            </div>
            <BiChevronDown className="sm:block hidden absolute right-0 top-1/2 -translate-y-1/2 h-4 mw-4 w-4 text-gray-400" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 z-100">
          <DropdownMenuItem className="p-0">
            <Link
              href="/account"
              className="flex items-center w-full h-full text-gray-600 p-2"
              onClick={handleLinkClick("/account")}
            >
              <BiUser className="h-4 w-4 mr-2" />
              Profile
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuItem className="p-0">
            <Button
              className="font-normal text-sm text-gray-600 p-2 w-full justify-start hover:underline-none gap-0"
              variant="link"
              size="sm"
              onClick={handleSignOut}
            >
              <BiLogOutCircle className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      ) : (
        <Link href="/login" className="sm:my-5 my-4 inline-block">
          <Button variant="default" size="sm" className="sm:px-5 px-3">
            Sign In
          </Button>
        </Link> 
      )}
    </>
  );
};
