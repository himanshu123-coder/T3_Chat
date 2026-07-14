// import { currentUser } from "@/module/authentication/actions";
// import UserButton from "@/module/authentication/components/user-button";
// import Image from "next/image";

// export default  async function Home() {
//   const user = await currentUser()
//   return (
//    <div>
//     <UserButton user={user} />
//    </div>
//   );
// }
import { currentUser } from "@/module/authentication/actions";
import UserButton from "@/module/authentication/components/user-button";

export default async function Home() {
  const user = await currentUser();

  return (
    <div className="p-5">
      <UserButton user={user} />
    </div>
  );
}