import React from "react";
import HeroSection from "../components/HeroSection";
import FeatureItem from "../components/FeatureItem";
import ChatIcon from "../assets/icon-chat.png"
import MoneyIcon from "../assets/icon-money.png"
import SecurityIcon from "../assets/icon-security.png"
import MainLayout from "../layouts/MainLayout";

function HomePage() {
    return (
        <>
            <MainLayout>
                <main>
                    <HeroSection />
                    <section className="features">
                        <h2 className="sr-only">Features</h2>
                        <FeatureItem
                            picture={ChatIcon}
                            pictureAlt="Chat icon"
                            title="You are our #1 priority"
                            description="Need to talk to a representative? You can get in touch through our
                                    24/7 chat or through a phone call in less than 5 minutes."
                        />
                        <FeatureItem
                            picture={MoneyIcon}
                            pictureAlt="Money Icon"
                            title="More savings means higher rates"
                            description="The more you save with us, the higher your interest rate will be!"
                        />
                        <FeatureItem
                            picture={SecurityIcon}
                            pictureAlt="Security Icon"
                            title="Security you can trust"
                            description="We use top of the line encryption to make sure your data and money
            is always safe."
                        />
                    </section>
                </main>
            </MainLayout>
        </>
    )
}

export default HomePage