"use client";

import { User } from "@supabase/supabase-js";
import { Button } from "./ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { createClient } from "../../supabase/client";

export default function PricingCard({
  item,
  user,
}: {
  item: any;
  user: User | null;
}) {
  const supabase = createClient();

  const handleCheckout = async (priceId: string) => {
    if (!user) {
      window.location.href = "/login?redirect=pricing";
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke(
        "supabase-functions-create-checkout",
        {
          body: {
            price_id: priceId,
            user_id: user.id,
            return_url: `${window.location.origin}/dashboard`,
          },
          headers: {
            "X-Customer-Email": user.email || "",
          },
        },
      );

      if (error) {
        throw error;
      }

      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  return (
    <Card
      className={`w-full relative overflow-hidden rounded-2xl transition-all duration-200 ${ 
        item.popular
          ? "border-white/[0.12] bg-white/[0.04]"
          : "border-white/[0.05] bg-white/[0.015]"
      } hover:border-white/[0.12]`}
    >
      <CardHeader className="relative pb-0 pt-7 px-7">
        {item.popular && (
          <div className="inline-flex w-fit items-center px-2.5 py-0.5 text-[11px] font-medium text-white/50 bg-white/[0.05] border border-white/[0.07] rounded-full mb-4">
            Most popular
          </div>
        )}
        <CardTitle className="text-[15px] font-medium text-white/60 tracking-[-0.01em]">
          {item.name}
        </CardTitle>
        <CardDescription className="flex items-baseline gap-1 mt-3">
          <span className="text-[38px] font-semibold font-mono-data text-white/90 tracking-[-0.04em] leading-none">
            ${item?.amount / 100}
          </span>
          <span className="text-[13px] text-white/20 ml-0.5">/{item?.interval}</span>
        </CardDescription>
      </CardHeader>
      <CardFooter className="relative pt-5 pb-7 px-7">
        <Button
          onClick={async () => {
            await handleCheckout(item.id);
          }}
          className={`w-full py-5 text-[13px] font-medium rounded-full transition-all duration-200 ${
            item.popular
              ? "bg-white text-black hover:bg-white/90"
              : "bg-white/[0.05] text-white/50 hover:bg-white/[0.09] border border-white/[0.07]"
          }`}
        >
          Get started
        </Button>
      </CardFooter>
    </Card>
  );
}