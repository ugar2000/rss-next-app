'use server'

import Posts from "@/components/Posts";
import {fetchPosts} from "@/utils/api";
import {redirect} from "next/navigation";
import {PaginatedPosts} from "@/types";

async function getData(): Promise<PaginatedPosts> {
    try {
        console.log('fetching posts')
        return await fetchPosts(12, 1)
    } catch (e) {
        console.log(e)
        redirect('/error')
    }
}


export default async function Home() {
  const data = await getData()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-start justify-between flex-col font-mono text-sm lg:flex">
        <Posts data={data} />
      </div>
    </main>
  );
}
