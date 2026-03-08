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
      className={`w-full relative overflow-hidden rounded-2xl transition-all duration-300 ${
        item.popular
          ? "border-white/[0.1] bg-white/[0.03]"
          : "border-white/[0.04] bg-white/[0.015]"
      } hover:border-white/[0.1]`}
    >
      <CardHeader className="relative pb-2 pt-8 px-8">
        {item.popular && (
          <div className="inline-flex w-fit items-center px-3 py-1 text-[11px] font-medium text-white/60 bg-white/[0.06] border border-white/[0.06] rounded-full mb-4">
            Most Popular
          </div>
        )}
        <CardTitle className="text-[16px] font-medium text-white/80 tracking-[-0.01em]">
          {item.name}
        </CardTitle>
        <CardDescription className="flex items-baseline gap-1 mt-4">
          <span className="text-4xl font-semibold font-mono-data text-white tracking-tighter">
            ${item?.amount / 100}
          </span>
          <span className="text-[13px] text-white/20">/{item?.interval}</span>
        </CardDescription>
      </CardHeader>
      <CardFooter className="relative pt-6 pb-8 px-8">
        <Button
          onClick={async () => {
            await handleCheckout(item.id);
          }}
          className={`w-full py-5 text-[14px] font-medium rounded-full transition-all duration-200 ${
            item.popular
              ? "bg-white text-black hover:bg-white/90"
              : "bg-white/[0.06] text-white/60 hover:bg-white/[0.1] border border-white/[0.06]"
          }`}
        >
          Get Started
        </Button>
      </CardFooter>
    </Card>
  );
}