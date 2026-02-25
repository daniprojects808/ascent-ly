import { Message } from "@/components/form-message";
import Navbar from "@/components/navbar";
import SignUpForm from "@/components/sign-up-form";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;

  return (
    <>
      <Navbar />
      <SignUpForm message={searchParams} />
    </>
  );
}
