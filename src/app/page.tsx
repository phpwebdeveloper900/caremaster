import Link from "next/link";
import { Button } from "@/components/ui/button"
import LoginForm from "./../components/auth/login-form"

export default function Home() {
  return (
    <div>
      <LoginForm />
    </div>
  )
}
