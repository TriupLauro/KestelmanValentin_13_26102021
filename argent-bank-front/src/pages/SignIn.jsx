import MainLayout from "../layouts/MainLayout";
import SignInForm from "../components/SignInForm";

function SignIn() {
    return (
        <MainLayout>
            <main className="main bg-dark">
                <section className="sign-in-content">
                    <i className="fa fa-user-circle sign-in-icon"></i>
                    <h1>Sign In</h1>
                    <SignInForm />
                </section>
            </main>
        </MainLayout>
    )
}

export default SignIn