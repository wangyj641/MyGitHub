'use client'

import React, { useCallback, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Github, User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { connect } from 'react-redux'
import { logout } from '../store/store'
import { withRouter } from 'next/router'
import Link from 'next/link'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// NOTICE: {} is needed to be an props object
function Header({
  router,
  user,
  logout,
}: {
  router: any;
  user?: {
    id: string;
    login: string;
    avatar_url: string;
  };
  logout: () => void;
}) {
  //console.log('---------------- Header ----------------')
  const urlQuery = router.query.q;

  const [search, setSearch] = useState(urlQuery || "");

  const handleSearchChange = useCallback(
    (event: any) => {
      console.log("---------------- handleSearchChange ----------------");
      setSearch(event.target.value);
    },
    [setSearch]
  );

  const handleOnSearch = useCallback(() => {
    console.log("---------------- handleOnSearch ----------------");
    console.log(search);
    router.push(`/search?q=${search}`);
  }, [search]);

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  return (
    <div className="flex h-20 w-full items-center justify-between border-b border-gray-200 bg-black">
      <div className="relative flex items-center sm:flex left-4">
        <Link href={"/"} passHref>
          <Github color="red" />
        </Link>
        <Input
          type="search"
          placeholder="Find a repository..."
          value={search}
          onChange={handleSearchChange}
          className="relative left-2 w-60"
        />
        <Button
          type="submit"
          onClick={handleOnSearch}
          className="relative left-3"
        >
          Search
        </Button>
      </div>

      <div className="flex items-center justify-center">
        {user && user.id ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="relative right-40 overflow-visible">
              <a href="/">
                <Avatar>
                  <AvatarImage src={user.avatar_url} />
                  <AvatarFallback>User</AvatarFallback>
                </Avatar>
              </a>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{user.login}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <a href="javascript:void(0)">Logout</a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <a href={`/prepare-auth?url=${router.asPath}`}>
                  <User className="relative right-40" color="red" />
                </a>
              </TooltipTrigger>
              <TooltipContent className="relative right-20">
                <p>Please login</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  );
}

export default connect(
  (state: any) => {
    return {
      user: state.user,
    };
  },
  (dispatch: any) => {
    return {
      logout: () => dispatch(logout()),
    };
  }
)(withRouter(Header));
