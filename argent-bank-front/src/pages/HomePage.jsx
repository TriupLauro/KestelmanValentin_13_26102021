import HeroSection from "../components/HeroSection";
import FeatureItem from "../components/FeatureItem";
import chatIcon from "../../../designs/img/icon-chat.png";
import moneyIcon from "../../../designs/img/icon-money.png";
import securityIcon from "../../../designs/img/icon-security.png";
import MainLayout from "../layouts/MainLayout";

function HomePage() {
    return (
        <MainLayout>
            <main>
                <HeroSection />
                <section className="features">
                    <h2 className="sr-only">Features</h2>
                    <FeatureItem
                        title="You are our #1 priority"
                        content="Need to talk to a representative? You can get in touch through our
                               24/7 chat or through a phone call in less than 5 minutes."
                        iconImg={chatIcon}
                    />
                    <FeatureItem
                        title="More savings means higher rates"
                        content="The more you save with us, the higher your interest rate will be!"
                        iconImg={moneyIcon}
                    />
                    <FeatureItem
                        title="Security you can trust"
                        content="We use top of the line encryption to make sure your data and money
                               is always safe."
                        iconImg={securityIcon}
                    />
                </section>
            </main>
        </MainLayout>
    )
}

export default HomePage