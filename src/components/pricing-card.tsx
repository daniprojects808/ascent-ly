"use client";

import { User } from "@supabase/supabase-js";
import { Button } from "./ui/button";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "./ui/card";
import { createClient } from "../../supabase/client";

export default function PricingCard({ item, user }: {
    item: any,
    user: User | null
}) {
    const supabase = createClient();

    // Handle checkout process
    const handleCheckout = async (priceId: string) => {
        if (!user) {
            // Redirect to login if user is not authenticated
            window.location.href = "/login?redirect=pricing";
            return;
        }


        try {
            const { data, error } = await supabase.functions.invoke('supabase-functions-create-checkout', {
                body: {
                    price_id: priceId,
                    user_id: user.id,
                    return_url: `${window.location.origin}/dashboard`,
                },
                headers: {
                    'X-Customer-Email': user.email || '',
                }
            });

            if (error) {
                throw error;
            }

            // Redirect to Stripe checkout
            if (data?.url) {
                window.location.href = data.url;
            } else {
                throw new Error('No checkout URL returned');
            }
        } catch (error) {
            console.error('Error creating checkout session:', error);
        }
    };

    return (
        <Card className={`w-full relative overflow-hidden rounded-xl transition-all duration-500 hover:scale-[1.02] ${item.popular ? 'border-cyan-500/30 bg-white/[0.04] shadow-[0_0_30px_rgba(6,182,212,0.1)]' : 'border-white/[0.06] bg-white/[0.02]'}`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        >
            {item.popular && (
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/[0.05] to-transparent" />
            )}
            <CardHeader className="relative pb-2">
                {item.popular && (
                    <div className="inline-flex w-fit items-center px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-4">
                        Most Popular
                    </div>
                )}
                <CardTitle className="font-display text-xl font-bold tracking-tight text-[#f5f1e8]">{item.name}</CardTitle>
                <CardDescription className="flex items-baseline gap-1.5 mt-3">
                    <span className="text-5xl font-bold font-mono-data text-[#f5f1e8]">${item?.amount / 100}</span>
                    <span className="text-sm text-[#f5f1e8]/30 font-body">/{item?.interval}</span>
                </CardDescription>
            </CardHeader>
            <CardFooter className="relative pt-6 pb-7">
                <Button
                    onClick={async () => {
                        await handleCheckout(item.id)
                    }}
                    className={`w-full py-6 text-base font-semibold rounded-lg transition-all duration-300 ${item.popular
                        ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white hover:from-cyan-400 hover:to-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.25)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]'
                        : 'bg-white/[0.06] text-[#f5f1e8]/80 hover:bg-white/[0.1] border border-white/[0.08]'
                        }`}
                >
                    Get Started
                </Button>
            </CardFooter>
        </Card>
    )
}