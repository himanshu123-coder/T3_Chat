"use client"
import React from "react";
import{Button} from '@/components/ui/button'
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

 const SignInPage =()=>{

    return (
        <section className="flex flex-col items-center justify-center min-h-screen bg-background px-4 py-16 md:py-32">
            <div className="flex flex-row justify-center items-center gap-x-2">
                <h1 className="text-3xl font-extrabold text-foreground">Wellcome to</h1>
                { <Image src = "/t3.svg" alt = "logo" width={142 }height={142} /> }
            </div>
            <p className="mt-2 text-lg text-muted-foreground font-semibold">
                Sign un below (we 'll increrase your message limits if you do )

            </p>
            <Button
            variant={"default"}
            className={
                "max-w-sm mt-5 w-full px-7 py-7 flex flex-row justify-center items-center cursor-pointer"
            }
            onClick={()=>authClient.signIn.social({
                provider:"github",
                callbackURL:"/"
            })}
            >
                { <Image src ={"github_logo.svg"} alt = {"github"} width={24} height={24} /> }
                <span className="font-bold ml-2">
                    Sign in with Github
                </span>

            </Button>
        </section>
    )
 }

 export default SignInPage